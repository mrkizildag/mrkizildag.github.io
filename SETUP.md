# Zoa Public Web - Setup Instructions

## 📋 Quick Setup Guide

### Step 1: Install Dependencies

Navigate to the public-web folder and install:

```bash
cd public-web
npm install
```

### Step 2: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Open `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to find these:**
- Log in to [Supabase Dashboard](https://app.supabase.io)
- Select your project
- Go to Settings > API
- Copy the Project URL and anon/public key

### Step 3: Test Locally

Run the development server:
```bash
npm run dev
```

Open http://localhost:5173 in your browser to test.

---

## 🚀 Deploy to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new empty repository
2. Name it whatever you want (e.g., `zoa-landing`)
3. **Do NOT** initialize with README, .gitignore, or license

### Step 2: Configure GitHub Pages

1. Go to your repository Settings > Pages
2. Under "Build and deployment":
   - Source: **GitHub Actions** (not "Deploy from a branch")

### Step 3: Add Secrets

1. In your repository, go to Settings > Secrets and variables > Actions
2. Click "New repository secret"
3. Add these two secrets:
   - Name: `VITE_SUPABASE_URL`, Value: your Supabase URL
   - Name: `VITE_SUPABASE_ANON_KEY`, Value: your Supabase anon key

### Step 4: Push to GitHub

In the `public-web` folder:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add your remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 5: Wait for Deployment

1. Go to the "Actions" tab in your repository
2. You should see a workflow running
3. Wait for it to complete (usually 1-2 minutes)
4. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## ✅ Testing After Deployment

1. Visit your GitHub Pages URL
2. You should see the Welcome screen
3. Click "Get Started" to go to the signup page
4. Try creating an account with a test email
5. Check the Supabase dashboard to verify the user was created

---

## 🔧 Troubleshooting

### "Environment variables are missing"
- Make sure you added the secrets in GitHub repository settings
- Re-run the workflow from the Actions tab

### "Build failed"
- Check the Actions tab for error messages
- Make sure all dependencies are in package.json
- Try building locally first: `npm run build`

### "Page not found (404)"
- Make sure GitHub Pages is set to "GitHub Actions" not "Deploy from a branch"
- Check that the workflow completed successfully
- It may take a few minutes for the first deployment

### "Can't create account"
- Verify your Supabase credentials are correct
- Check Supabase dashboard > Authentication to ensure email auth is enabled
- Check browser console for error messages

---

## 📝 What's Included

- ✅ Welcome/Landing page with animations
- ✅ Sign up page
- ✅ Supabase authentication integration
- ✅ Responsive design
- ✅ Dark theme
- ✅ Form validation
- ✅ GitHub Actions for automatic deployment

---

## 🔄 Making Updates

After the initial deployment, any push to the main branch will automatically trigger a new deployment:

```bash
# Make your changes, then:
git add .
git commit -m "Your change description"
git push
```

The site will automatically rebuild and redeploy!
