#!/bin/bash

set -e

npm run lint
npm run build
npm test
npm run package