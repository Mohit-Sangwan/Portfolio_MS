# Deployment Guide

## Automatic Deployment (GitHub Actions)

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### How it works:
- Every push to the `main` branch triggers an automated build and deployment
- The workflow runs in `.github/workflows/deploy.yml`
- Built files are automatically deployed to GitHub Pages

### Enable GitHub Pages:
1. Go to repository Settings → Pages
2. Set Source to "Deploy from a branch"
3. Select `gh-pages` branch and `/root` folder
4. Save

---

## Manual Deployment

### Build the project:
```bash
npm run build
```

### Preview the build:
```bash
npm run preview
```

### Deploy to GitHub Pages manually:
```bash
npm run build
npx gh-pages -d dist
```

---

## Vercel Deployment (Alternative)

### One-click deployment:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mohit-Sangwan/Portfolio_MS)

### Manual Vercel deployment:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

---

## Netlify Deployment (Alternative)

### One-click deployment:
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Mohit-Sangwan/Portfolio_MS)

### Manual Netlify deployment:
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify deploy --prod --dir=dist`

---

## Environment Variables

No environment variables required for basic deployment. For email functionality (future enhancement), add:
- VITE_SENDGRID_API_KEY (for SendGrid integration)
- VITE_EMAIL_FROM (sender email address)

---

## CI/CD Pipeline Features

✅ Automatic builds on push to main
✅ Optimized production builds
✅ Automatic deployment to GitHub Pages
✅ Zero-downtime deployments
✅ Automatic cache busting

---

## Post-Deployment

After deployment, your portfolio will be live at:
- **GitHub Pages**: `https://mohit-sangwan.github.io/Portfolio_MS/`
- **Custom Domain** (if configured): `https://portfolio.mohit-sangwan.dev`
- **Vercel** (if deployed): `https://portfolio-ms.vercel.app/`
- **Netlify** (if deployed): `https://mohit-sangwan-portfolio.netlify.app/`

---

## Troubleshooting

### Pages showing 404:
- Ensure `gh-pages` branch exists in repository
- Check branch protection rules aren't blocking deployments
- Verify base path in `vite.config.ts`

### Build failures:
- Check GitHub Actions logs in repository
- Ensure all dependencies are installed: `npm install`
- Verify Node version compatibility: `node --version` (should be 18+)

### Custom domain not working:
- Update CNAME file in repository root
- Update DNS records pointing to GitHub Pages
- Wait for DNS propagation (up to 24 hours)
