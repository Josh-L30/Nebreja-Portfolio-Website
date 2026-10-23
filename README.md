# Brad Josh Nebreja | Portfolio

Responsive static portfolio built with HTML, CSS and native JavaScript components. No build step or package install is required.

## Run locally

```sh
python -m http.server 8000
```

Open http://localhost:8000. Use HTTP rather than opening index.html directly because the components fetch JSON and use ES modules.

## Design and content

- Three-link top navigation (Projects, Experience, Contact) and a compact profile, full experience, education, About and contact details.
- Manual 3D project carousel with five entries, thumbnail controls and keyboard navigation. Image-first project details include a keyboard-operable thumbnail filmstrip, all 29 unique source screenshots and an on-demand video walkthrough.
- Certificate folio with five thumbnail credential selectors and an in-page full-size image viewer.
- Six categorized groups of original-color local tool logos, light/dark themes with saved preference, reduced-motion and reduced-transparency fallbacks.
- locally hosted Nunito Sans typography, responsive WebP previews, lazy images and no carousel autoplay or animation library.

## Files to edit

| Content | Location |
| --- | --- |
| Main page copy and section structure | index.html |
| Projects, galleries, tools, certificates and contact configuration | data/content.json |
| Page layout and effects | css/style.css |
| Shared form styles | css/components.css |
| Components, selectors, dialogs and navigation | js/script.js |
| Original media and optimized previews | assets/ |
| Component sources and license notices | docs/ |

Profile, experience, education and About values are also retained in JSON for reference; those sections currently render from index.html. Edit their HTML when changing visible copy.

## Contact form

No sending endpoint is configured. The form validates name, email and message, clearly states that messages are not sent, and retains unsent text. It never displays simulated success.

To connect a service, set contact.endpoint in data/content.json to a verified endpoint that accepts a JSON POST containing name, email and message, supports browser CORS and returns a successful HTTP status only after acceptance. Test real delivery before publishing. Never put private credentials in client-side files. Local mock checks do not prove email delivery.

## Verification

```sh
python verify_assets.py
python verify.py
```

Asset verification checks local HTML and JSON references, responsive galleries and certificate previews. Browser smoke verification expects the HTTP server on port 8000, or pass its URL as the first argument. Latest local Chrome evidence is recorded in docs/verification.json. The 320, 390, 768 and 1440px checks are viewport emulation, not physical-device tests. No deployment has been performed.

Personal content, CV, certificates and project media belong to Brad and their respective owners. Third-party component adaptations and logo licenses are documented in docs/.

Full-size project screens and certificates open in a near-fullscreen native dialog, with loading/error feedback and Close/Escape dismissal. Closing the image returns to the underlying project and restores focus. No image preview opens a new tab.

## Scroll motion and performance

Sections use short one-time transform/opacity reveals. Reduced-motion and data-saver users skip them. See docs/PERFORMANCE.md for measured Lighthouse results and test limitations. The local variable font is preloaded once, async content reserves space, and certificate/portrait images use responsive sizes.

## Website icon and social sharing

The browser favicon and Apple touch icon use Brad's existing portrait. Open Graph and Twitter large-card metadata are included directly in the HTML head, with absolute public URLs. The 1200x630 JPEG at assets/brad-hero-social-v1.jpg is captured from the actual light-theme hero design. Regenerate the image and update its versioned filename in the metadata when the hero changes. Previously cached platform previews may require a rescrape after publishing.
