# AGENTS.md - VantaxDigital Website

## Project Type
Vanilla static HTML/CSS/JS website. No build system, no package.json.

## Entry Point
- `index.html` at root - open this file in a browser to view the site

## Directory Structure
```
project-root/
├── index.html              # Homepage (at root)
├── pages/                  # Page-centric architecture (each page self-contained)
│   ├── desarrollo-web/
│   │   └── index.html
│   ├── apps-software/
│   │   └── index.html
│   ├── seo/
│   │   └── index.html
│   ├── social-media/
│   │   └── index.html
│   ├── contacto/
│   │   └── index.html
│   ├── nosotros/
│   │   └── index.html
│   └── partner-agencias/
│       └── index.html
└── src/
    ├── assets/             # Images and icons
    │   ├── images/         # PNG, WebP, AVIF images
    │   └── icons/          # SVG icons
    ├── styles/
    │   ├── global.css     # Global styles
    │   └── pages.css      # Shared page styles
    └── scripts/
        ├── navbar-footer.js  # Shared navbar and footer
        └── main.js           # Global functionality (FAQ, forms, animations)
```

## Development
- No npm scripts or build commands - edit files directly
- Use a local server (e.g., `python -m http.server 8000`) to test changes
- Global styles: `src/styles/global.css`
- Page-specific styles: `src/styles/pages.css`

## Available Skills
The project has specialized skills for specific tasks:
- **accessibility**: Audit and improve web accessibility (WCAG 2.2)
- **frontend-design**: Create production-grade frontend interfaces
- **seo**: Optimize for search engine visibility

Use the `skill` tool to load these when working on related tasks.

## Git Workflow
Use standard git commands:
```bash
git add -A
git commit -m "message"
git push -u origin $(git rev-parse --abbrev-ref HEAD)
```

## Configuration
- `.agents/skills/` - Contains skill definitions and references
- `skills-lock.json` - Lock file for skill versions
- `.git/opencode/` - Opencode configuration