#!/bin/sh

set -e

npm run dist-linux

docker run --rm -ti \
  --volume "$(pwd):/project" \
  --volume "${HOME}/.cache/electron:/root/.cache/electron" \
  --volume "${HOME}/.cache/electron-builder:/root/.cache/electron-builder" \
  -w /project \
  electronuserland/builder:wine \
  npm run dist-win

rm -rf dist/linux-unpacked/resources/server/win32/
rm -rf dist/win-unpacked/resources/server/linux/

exit 0
