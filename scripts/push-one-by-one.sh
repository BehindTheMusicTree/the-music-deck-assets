#!/bin/bash
# Push all pending changes to remote, one file per commit.

BRANCH=$(git rev-parse --abbrev-ref HEAD)
REMOTE=${1:-origin}

echo "Branch: $BRANCH -> remote: $REMOTE"
echo ""

# Collect all untracked/modified files, expanding directories
mapfile -t FILES < <(git status --porcelain | while IFS= read -r LINE; do
  FILE="${LINE:3}"
  if [ -d "$FILE" ]; then
    git ls-files --others --exclude-standard -- "$FILE"
  else
    echo "$FILE"
  fi
done)

for FILE in "${FILES[@]}"; do
  if [ -f "$FILE" ]; then
    git add -- "$FILE"
    MSG="add $FILE"
  else
    git rm --cached -- "$FILE" 2>/dev/null || git rm -- "$FILE" 2>/dev/null || true
    MSG="remove $FILE"
  fi

  if ! git diff --cached --quiet; then
    git commit -m "$MSG"
    for attempt in 1 2 3; do
      GIT_HTTP_LOW_SPEED_LIMIT=100 GIT_HTTP_LOW_SPEED_TIME=60 git push "$REMOTE" "$BRANCH" && break
      echo "push failed (attempt $attempt), retrying in 5s..."
      sleep 5
    done
    echo "pushed: $FILE"
  else
    echo "skipped (nothing staged): $FILE"
  fi
done

echo ""
echo "Done."
