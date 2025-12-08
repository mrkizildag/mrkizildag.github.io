# Zoa Public Landing Page

Public landing page for Zoa sports app - where athletes connect and compete.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or pnpm installed

### Installation

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Create a `.env` file from the example:
```bash
cp .env.example .env
```

3. Add your Supabase credentials to `.env`:
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📦 Deploy to GitHub Pages

### Setup

1. Create a new empty GitHub repository
2. In your repository, go to Settings > Pages
3. Under "Build and deployment", select "GitHub Actions" as the source

### Deploy

1. Initialize git (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Add your remote repository:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

3. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

4. Add your Supabase credentials as repository secrets:
   - Go to Settings > Secrets and variables > Actions
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`

5. Push to GitHub:
```bash
git push -u origin main
```

Your site will be automatically deployed to `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Supabase** - Backend and authentication
- **Lucide React** - Icons

## 📱 Features

- Welcome/Landing screen with animations
- Sign up page with Supabase authentication
- Responsive design
- Dark theme
- Form validation

## 📄 License

Private - All rights reserved
