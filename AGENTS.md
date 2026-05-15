# AGENTS.md - VantaxDigital Website

## Project Type
Vanilla static HTML/CSS/JS website. No build system, no package.json.

## Entry Point
- `index.html` at root - open this file in a browser to view the site

## Directory Structure
```
src/
├── app/          # Main application logic (main.js, layout)
├── assets/       # Images, icons, fonts
├── components/  # Reusable components (ui/, features/)
├── core/         # Core utilities
├── features/    # Page sections (apps-software, contacto, desarrollo-web, nosotros, partner-agencias, seo, social-media)
├── services/    # Service modules
└── shared/       # Shared resources (styles/global.css)
```

## Development
- No npm scripts or build commands - edit files directly
- Use a local server (e.g., `python -m http.server 8000`) to test changes
- Global styles: `src/shared/styles/global.css`

## Git Workflow
`.agents/workflows/flujo-magico.md` contains a GitHub workflow but has outdated hardcoded paths. Use standard git commands instead:
```bash
git add -A
git commit -m "message"
git push -u origin $(git rev-parse --abbrev-ref HEAD)
```