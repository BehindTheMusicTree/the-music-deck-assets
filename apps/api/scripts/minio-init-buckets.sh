#!/bin/sh
set -eu

mc alias set local "$MINIO_ENDPOINT" "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD"

for BUCKET in $MINIxO_BUCKETS; do
  echo "Creating bucket: $BUCKET"
  mc mb --ignore-existing "local/$BUCKET"

  if [ "${MINIO_PUBLIC:-false}" = "true" ]; then
    mc anonymous set download "local/$BUCKET"
  fi
done

echo "All buckets ready."
