# 🔄 GitHub Branch Cleanup Instructions

## Current Status
- ✅ Clean branch pushed as `main-clean`
- ⚠️ Old `main` branch still exists (contains API key history)
- 🎯 Goal: Replace main branch with clean version

## Step-by-Step Instructions

### Step 1: Change Default Branch in GitHub
1. Go to **GitHub.com** → Your repository: `https://github.com/tmoody1973/public-radio-agents`
2. Click **Settings** tab (right side of repository navigation)
3. Click **Branches** in the left sidebar
4. Under **Default branch**, click the **switch branches** button
5. Select **`main-clean`** from the dropdown
6. Click **Update**
7. Click **I understand, update the default branch** in the confirmation dialog

### Step 2: Delete the Old Main Branch
1. Stay in **Settings** → **Branches**
2. Find the **`main`** branch in the branch list
3. Click the **trash can icon** 🗑️ next to it
4. Confirm the deletion

### Step 3: Rename main-clean to main
Now we'll rename the clean branch to `main`:

1. Go back to the **Code** tab of your repository
2. Click the **branch dropdown** (should show `main-clean`)
3. Or use the command line method below:

## Command Line Method (Alternative)

If you prefer to do this via command line:

```bash
# Step 1: Delete the old main branch locally
git branch -D main

# Step 2: Rename our clean branch locally  
git branch -m fix-api-key-history main

# Step 3: Force push the new main (after GitHub default is changed)
git push origin main --force

# Step 4: Delete the old remote branches
git push origin --delete main-clean
```

**⚠️ Important**: Only run the force push AFTER you've changed the default branch in GitHub to `main-clean`!

## Verification Steps

After completing the cleanup:

1. **Check GitHub repository** - Default branch should be `main`
2. **Verify clean history** - No API keys in any commit
3. **Test clone** - `git clone` should get the clean version
4. **Confirm .env.example** - Should only contain template values

## Expected Final State

- ✅ **Default branch**: `main` (clean version)
- ✅ **Branch history**: No API keys in any commit
- ✅ **Environment template**: Safe placeholder values only
- ✅ **Repository**: Ready for public sharing/deployment

## If Something Goes Wrong

If you encounter any issues:
1. The `fix-api-key-history` branch still exists as a backup
2. Your local `.env.local` with real API keys is unchanged
3. You can always reset and try again

## Final Verification Command

After cleanup, run this to verify no API keys in history:
```bash
git log --all --full-history --grep="sk-proj" --grep="sk-ant"
```
Should return no results! ✅

---

**Once completed, your repository will be completely clean and safe for public use!** 🎉