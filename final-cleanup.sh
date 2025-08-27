#!/bin/bash

echo "🧹 Final Branch Cleanup"
echo "======================="
echo ""
echo "This will delete the remaining fix-api-key-history branch."
echo "Make sure you've changed GitHub default to 'main' first!"
echo ""
read -p "Have you changed GitHub default branch to 'main'? (y/n): " confirm

if [[ $confirm != [yY] ]]; then
    echo "❌ Please change the GitHub default branch to 'main' first."
    exit 1
fi

echo ""
echo "🗑️  Deleting remaining fix-api-key-history branch..."
git push origin --delete fix-api-key-history

echo "📡 Updating local remote references..."
git fetch --prune

echo ""
echo "✅ Final cleanup completed!"
echo ""
echo "📋 Final branch status:"
git branch -a

echo ""
echo "🎉 Success! Your repository is now completely clean with 'main' as default!"