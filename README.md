# Portfolio Website (Refactored)

This repository contains a clean, accessible, and responsive personal portfolio built with semantic HTML, modern CSS, and plain JavaScript — structured for easy customization and deployment.

## Quick preview (local)

Open a terminal in the project folder and run a simple static server. Examples (Windows `cmd.exe`):

Python 3 (recommended):
```cmd
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Files to edit

- `index.html` — main markup. Update titles, meta, hero text, project entries, image paths, and links.
- `style.css` — visual design. Adjust color variables in `:root`, spacing, and fonts.
- `script.js` — interactive behavior. Edit typed strings, contact form endpoint, and small UI interactions.
- `IMAGE/` and `logo/` — replace placeholder images and logos with optimized assets.

## Customization checklist

- Update `<title>` and `<meta>` tags in `index.html`.
- Replace the profile and project images in `IMAGE/` with appropriately sized and optimized images (WebP/AVIF recommended with fallbacks).
- Update links in the contact cards and footer. Use `rel="noopener noreferrer"` on external links that use `target="_blank"`.
- Replace the Formspree `action` attribute in the contact form with your endpoint, or wire the form to your backend.
- Review color variables in `style.css` and adjust `--accent-primary` for brand color.

## Accessibility & performance notes

- A keyboard-visible skip link is included for screen-reader and keyboard users.
- `prefers-reduced-motion` is respected (typed effect and transitions reduced when enabled).
- Images use `loading="lazy"` where appropriate; consider adding explicit `width`/`height` attributes to reduce layout shift.
- The site uses an IntersectionObserver-based animation system for performant reveal effects.

## Deploy

You can deploy this site to any static host (Netlify, Vercel, GitHub Pages). For a quick GitHub Pages deploy:

1. Push the repo to GitHub.
2. In the repository settings, enable GitHub Pages from the `main` (or `master`) branch and root folder.

## Credits

- Typed.js — typing animation used for hero (`https://github.com/mattboldt/typed.js`)

## License

This project is provided under the MIT License.
