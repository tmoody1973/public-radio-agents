#!/bin/bash

echo "🔄 GitHub Branch Cleanup Script"
echo "==============================="
echo ""
echo "⚠️  IMPORTANT: Make sure you've changed the default branch to 'fix-api-key-history' in GitHub first!"
echo ""
read -p "Have you changed the default branch in GitHub? (y/n): " confirm

if [[ $confirm != [yY] ]]; then
    echo "❌ Please change the default branch in GitHub first, then run this script again."
    exit 1
fi

echo ""
echo "🚀 Starting branch cleanup..."

# Step 1: Delete old main branch locally
echo "🗑️  Deleting old main branch locally..."
git branch -D main

# Step 2: Rename current branch to main
echo "🏷️  Renaming fix-api-key-history to main..."
git branch -m fix-api-key-history main

# Step 3: Force push new main to GitHub
echo "⬆️  Pushing new main branch to GitHub..."
git push origin main --force

# Step 4: Update remote tracking
echo "🔗 Updating remote tracking..."
git push --set-upstream origin main

# Step 5: Clean up old remote branches
echo "🧹 Cleaning up old remote branches..."
git push origin --delete main-clean
git push origin --delete fix-api-key-history

# Step 6: Update local remote references
echo "📡 Updating local remote references..."
git fetch --prune

echo ""
echo "✅ Branch cleanup completed!"
echo ""
echo "📋 Final verification:"
git branch -a
echo ""
echo "🎉 Your repository now has 'main' as the default branch with clean history!"