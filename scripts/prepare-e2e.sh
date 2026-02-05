#!/bin/bash

# Script to prepare and build E2E tests for CodeceptJS
# This script compiles TypeScript and copies feature files to dist directory

set -e

echo "🔨 Building TypeScript files..."
npm run build

echo "📋 Fixing compiled config file..."
# Replace .ts with .js in the compiled config
sed -i "s|\./step_definitions/\([^/]*\)\.ts|./step_definitions/\1.js|g" dist/codecept.conf.js

echo "📋 Copying feature files to dist directory..."
rm -rf dist/features
cp -r features dist/

echo "✅ E2E tests preparation complete!"
echo ""
echo "You can now run tests with:"
echo "  npx codeceptjs run --config dist/codecept.conf.js"
