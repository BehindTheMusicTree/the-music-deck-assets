#!/bin/bash
# Push all pending changes to remote, one file per commit.
#
# Clears the index first so nothing pre-staged is bundled into the first commit.
# Rename lines (old -> new) are staged using the destination path.

set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

BRANCH=$(git rev-parse --abbrev-ref HEAD)
REMOTE=${1:-origin}

echo "Branch: $BRANCH -> remote: $REMOTE"
echo ""

# Drop any staged changes so each commit only contains one path.
if git rev-parse --verify HEAD >/dev/null 2>&1; then
  git restore --staged . 2>/dev/null || git reset --mixed HEAD --quiet
else
  echo "No commits yet; refusing to unstage (ambiguous). Commit an initial README first."
  exit 1
fi

strip_quotes() {
  local s="$1"
  case "$s" in
    \"*\") s="${s#\"}"; s="${s%\"}" ;;
  esac
  printf '%s' "$s"
}

# Collect all untracked/modified files, expanding directories
mapfile -t FILES < <(git status --porcelain | while IFS= read -r LINE; do
  [ -z "$LINE" ] && continue
  FILE="${LINE:3}"
  FILE="$(strip_quotes "$FILE")"
  if [[ "$FILE" == *" -> "* ]]; then
    echo "$FILE"
    continue
  fi
  if [ -d "$FILE" ]; then
    git ls-files --others --exclude-standard -- "$FILE"
  else
    echo "$FILE"
  fi
done)

for FILE in "${FILES[@]}"; do
  [ -z "$FILE" ] && continue

  TARGET="$FILE"
  if [[ "$TARGET" == *" -> "* ]]; then
    TARGET="${TARGET#* -> }"
    TARGET="$(strip_quotes "$TARGET")"
  fi

  if [ -e "$TARGET" ] || [ -L "$TARGET" ]; then
    git add -- "$TARGET"
    MSG="add $TARGET"
  else
    if git rm --cached -- "$TARGET" 2>/dev/null || git rm -- "$TARGET" 2>/dev/null; then
      MSG="remove $TARGET"
    else
      echo "skipped (cannot stage): $FILE"
      continue
    fi
  fi

  if ! git diff --cached --quiet; then
    git commit -m "$MSG"
    pushed_ok=0
    for attempt in 1 2 3; do
      if GIT_HTTP_LOW_SPEED_LIMIT=100 GIT_HTTP_LOW_SPEED_TIME=60 git push "$REMOTE" "$BRANCH"; then
        pushed_ok=1
        break
      fi
      echo "push failed (attempt $attempt), retrying in 5s..."
      sleep 5
    done
    if [[ "$pushed_ok" -eq 1 ]]; then
      echo "pushed: $FILE"
    else
      echo "abort: push failed after 3 attempts (fix remote, then re-run from: $FILE)" >&2
      exit 1
    fi
  else
    echo "skipped (nothing staged): $FILE"
  fi
done

echo ""
echo "Done."
