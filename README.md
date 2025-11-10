# Khizar Haider – React Portfolio

A fully responsive single-page portfolio built with React 19, Vite, and CSS Modules.  
The site highlights Khizar's background, experience, and featured projects while serving optimized, hashed assets that work the same in development and production.

## Tech Stack
- React 19 with functional components and hooks
- Vite (Rolldown 7.x) for fast dev server and production builds
- CSS Modules for scoped styling + global CSS variables
- FontSource (Outfit & Roboto) and locally hosted PNG/WebP assets

## Application Flow
1. `src/main.jsx` mounts `<App />`, loads global styles, and registers the font files.
2. `<App />` wraps the page with `App.module.css`, defines the main layout, and renders:
   - `Navbar` – sticky navigation with a mobile toggle menu.
   - `Hero` – quick introduction, CTA, and floating illustration.
   - `About` – summary cards describing focus areas.
   - `Experience` – skills grid and history timeline populated from JSON.
   - `Projects` – cards built from `src/data/projects.json`.
   - `Contact` – social links plus icons referenced via `getImageUrl`.
3. Images referenced from JSON call `getImageUrl` (`src/utils.js`), which uses `import.meta.glob` to resolve hashed asset URLs so builds stay in sync with `npm run preview`.

## Project Structure
```
src/
  components/
    Hero | About | Experience | Projects | Contact | Navbar
  data/
    projects.json   # card content + image paths (e.g., "projects/rentify.png")
    skills.json     # skill badges and icons
    history.json    # employment timeline
  assets/           # served via Vite's bundler (see getImageUrl)
  App.jsx / App.module.css
  utils.js         # getImageUrl helper
```

## Running Locally
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the dev server**
   ```bash
   npm run dev
   ```
   Vite prints a local and network URL; open either in your browser.
3. **Create a production build**
   ```bash
   npm run build
   ```
4. **Preview the build locally**
   ```bash
   npm run preview
   ```

## Customizing Content
- Update project cards: edit `src/data/projects.json`.
- Modify skills/history: edit the corresponding JSON files and add matching images into `assets/<category>/`.
- Swap hero/about/contact imagery: update files under `assets/hero`, `assets/about`, `assets/contact`, etc.
- Add new sections by creating a component in `src/components`, styling it with a `.module.css` file, and importing it into `App.jsx`.

## Deployment Notes
- `vite.config.js` sets `base: './'` so all bundles use relative paths; this keeps assets working on static hosts like GitHub Pages or Netlify.
- Always run `npm run preview` after `npm run build` to double-check that hashed assets and CSS load correctly before pushing to production.

Happy hacking! Feel free to fork, customize, and extend the portfolio. PRs and ideas are welcome. 
