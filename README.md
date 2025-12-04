# Mohit Sangwan - Professional Portfolio

A modern, responsive single-page application (SPA) built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**.

## Project Structure

```
.
├── src/
│   ├── App.tsx          # Main portfolio component with all sections
│   ├── main.tsx         # React entry point
│   └── index.css        # Tailwind directives & custom styles
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## Features

✨ **Professional-Grade Design**
- Dark/Light mode support
- Responsive layout (mobile, tablet, desktop)
- Smooth scroll navigation
- Modern typography and visual hierarchy

🎯 **Core Sections**
- Hero section with key metrics dashboard
- About me with expertise highlights
- Experience timeline with achievements
- Featured projects with tech stack badges
- Skills grid organized by category
- Certifications and education
- Contact form and information sidebar
- Footer with social links

⚡ **Performance & Quality**
- TypeScript for type safety
- Utility-first CSS (Tailwind)
- Optimized rendering with React hooks
- Semantic HTML for accessibility
- Icon integration via lucide-react

## Setup & Installation

### Prerequisites
- Node.js 16+ and npm/yarn

### Steps

1. **Navigate to the project directory**
   ```bash
   cd d:\Mohit\M\Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will open in your browser (usually `http://localhost:5173`)

4. **Build for production**
   ```bash
   npm run build
   ```
   Output will be in the `dist/` directory.

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Customization

### Update Personal Information
Edit the `personalInfo` object in `src/App.tsx`:
```typescript
const personalInfo = {
  name: "Your Name",
  email: "your.email@example.com",
  // ...
};
```

### Add/Modify Projects
Update the `projects` array in `src/App.tsx` to add new project cards.

### Update Skills
Modify the `skillCategories` array to add or remove skills.

### Adjust Styling
- Tailwind classes are used throughout. See `tailwind.config.js` for theme extensions.
- Custom CSS in `src/index.css` for animations and utilities.

## Dark Mode

The portfolio automatically respects the system's dark mode preference. Users can also have browser-based toggles (if implemented).

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repo to Vercel
3. Vercel automatically builds and deploys on push

### Netlify
1. Push your code to GitHub
2. Connect your repo to Netlify
3. Set build command to `npm run build` and output directory to `dist`

### Other Platforms
Build the app with `npm run build` and deploy the `dist/` folder to your hosting provider.

## Technologies Used

| Category | Technology |
|----------|-----------|
| **Framework** | React 18 |
| **Language** | TypeScript 5.4 |
| **Build Tool** | Vite 5.2 |
| **Styling** | Tailwind CSS 3.5 |
| **Icons** | lucide-react |
| **CSS Processing** | PostCSS 8.4 |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization Tips

1. **Image Optimization**: Replace external image URLs with optimized local images.
2. **Code Splitting**: Consider breaking `App.tsx` into smaller components if it grows.
3. **Lazy Loading**: Implement React.lazy() for sections below the fold.
4. **Analytics**: Add your preferred analytics tool (Google Analytics, etc.).

## Accessibility

- Semantic HTML structure (`<section>`, `<nav>`, `<footer>`)
- Proper heading hierarchy
- Color contrast meets WCAG AA standards
- Keyboard-navigable menu

## License

Copyright © 2025 Mohit Sangwan. All rights reserved.

## Support

For questions or issues, reach out via:
- **Email**: sangwan.mohit6@gmail.com
- **LinkedIn**: [Mohit Sangwan](https://www.linkedin.com/in/mohit-s-87594186)
# Portfolio_MS
