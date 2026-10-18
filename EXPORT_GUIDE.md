# Nexus3 Export & Deployment Guide

This guide explains how to export, build, and deploy the **Nexus3 Web3 B2B Curated Partnership Network** to any modern web host, specifically **Vercel**, **Netlify**, or **Cloudflare Pages**.

---

## 1. How to Export the Codebase

### Option A: Download / Git Push
1. Clone or download the source repository files to your local machine.
2. Initialize Git if not already done:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for Nexus3 Web3 B2B Network"
   ```
3. Push to your GitHub / GitLab / Bitbucket repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/your-username/nexus3-partnership-hub.git
   git push -u origin main
   ```

### Option B: Local Production Build (`/dist`)
1. Ensure Node.js 18+ is installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the production build command:
   ```bash
   npm run build
   ```
   This compiles all TypeScript and Tailwind CSS into an optimized, static `/dist` directory ready to be served by any web server (NGINX, Caddy, Apache, or static CDN).

---

## 2. Deploying to Vercel (Zero Config)

The repository already includes `vercel.json` configured for Vite SPA routing.

1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Run `vercel` in the project root:
   ```bash
   vercel
   ```
3. Or deploy via the Vercel Web Dashboard:
   - Go to [vercel.com/new](https://vercel.com/new) and import your Git repository.
   - Vercel automatically detects **Vite**.
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click **Deploy**.

---

## 3. Deploying to Netlify

The repository includes `public/_redirects` which automatically copies to `dist/_redirects` during the build to support client-side hash and SPA routing.

1. **Via Netlify Web Dashboard**:
   - Go to [app.netlify.com](https://app.netlify.com) and click **Add new site > Import an existing project**.
   - Select your GitHub repo.
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Click **Deploy Site**.
2. **Via Drag & Drop (Netlify Drop)**:
   - Run `npm run build` locally.
   - Drag the resulting `dist` folder into [app.netlify.com/drop](https://app.netlify.com/drop).

---

## 4. Deploying to Cloudflare Pages

1. In the Cloudflare Dashboard, go to **Workers & Pages > Create application > Pages > Connect to Git**.
2. Select your repository.
3. In the build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Click **Save and Deploy**.

---

## 5. In-App Data Export Features

You can also export live platform data directly from within the web interface at any time:
- **Public Directory**: Click **Export Dataset** to download all listed Web3 projects as `CSV` (spreadsheet) or `JSON`.
- **Partnership Hub**: Export curated partnership profiles with what they offer and seek.
- **Admin Console**: Navigate to the **Data Export & Backups** section to download the entire applications queue with reviewer notes and contact lists.
