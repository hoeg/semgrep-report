#!/bin/bash

# nvm install 16.16.0
# nvm use 16.16.0

set -e

npm run lint
npm ci
npm run build
npm test
npm run package