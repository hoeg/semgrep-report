#!/bin/bash

set -e

#npm run lint
#npm ci
npm run build
npm test
npm run package