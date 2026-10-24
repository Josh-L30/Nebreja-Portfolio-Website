# Brad Josh Nebreja — cinematic portfolio

Static HTML, CSS, native JavaScript components and JSON content. No build step or package installation is required.

## Local preview

From this directory run Python 3.10+:

    python -m http.server 8000 --bind 127.0.0.1

Open http://127.0.0.1:8000 over HTTP, not file://, because components fetch JSON and use ES modules.

## Design and behavior

The approved cinematic studio direction uses a dark background, local Clash Display and Satoshi typography, authentic project imagery and a strictly black/white interface. A redesigned optional light appearance uses the same layout. The saved brad-theme preference is respected; the default is dark.

Three visible project families contain four current work entries: CPC system/dashboard, Checkpoint, and CinemaBuddy. All 16 current screenshots, responsive previews, certificates, tools, education details, CV and professional links remain available. Large native dialogs open project stories within the page; nested full-image views preserve gallery selection. Closing each layer restores focus; closing the project restores page position. Checkpoint uses two supplied screenshots; CinemaBuddy uses one supplied image. Retired galleries and the walkthrough are no longer exposed. Both projects have live-site links.

Motion is progressive enhancement in js/motion.js. Headings fill from outline to solid and words rise and sharpen continuously with scrolling, including reverse scrolling at all widths. Phones avoid continuous blur. The layered hero has a restrained desktop exit; smaller screens keep it static. Other entrances are short. Reduced motion and Save-Data disable travel and dialog animations; motion-module failure does not prevent controls or content from working. Normal wheel/touch scrolling is never intercepted.

## Files

- index.html: page structure, direct CV/contact fallbacks and metadata.
- data/content.json: four work entries, three project groups, galleries, credentials, tools and existing contact configuration.
- css/style.css: layout, theme tokens, dialogs, responsive and motion presentation.
- css/components.css: shared contact form styling.
- js/script.js: native components, data loading, galleries, dialogs, navigation, appearance and preserved contact behavior.
- js/motion.js: optional continuous word reveals, entrances and hero exit.
- DESIGN.md and docs/superpowers/: approved design and implementation plan.

Visible profile, experience, education and About copy still lives in index.html; duplicate JSON fields are reference content. No framework/backend migration was performed. The nested Nebreja-Portfolio-Website directory was not modified.

## Contact integrity

The current public configuration enables Web3Forms. The contact component and its configuration were preserved during the redesign. Existing validation, honeypot, pending-state duplicate prevention, 15-second timeout, text retention on failure, and strict success === true checking remain intact. No real message was submitted during redesign verification; tests intercept every POST locally. Provider acceptance is not proof of inbox delivery. A missing endpoint/key retains the email-draft fallback. Never enter an email password or private token into the public configuration.

## Verification

    python verify_assets.py
    python verify.py http://127.0.0.1:8000
    python -m unittest discover -s tests -p "test_*.py"
    node --test tests/motion.test.mjs tests/word-motion.test.mjs

For in-browser interaction checks open /tests/browser.html and press Run checks. All POSTs are intercepted by the test page; it does not send messages. /tests/visual.html is a development-only responsive review harness. Neither harness is linked from the portfolio. See docs/cinematic-browser-checks.md and docs/PERFORMANCE.md for results and limits. Physical devices and real inbox delivery have not been tested in this redesign.

Social sharing uses assets/brad-hero-social-v3.jpg, a 1200x630 crop/resize of an actual final dark-hero browser capture. Regenerate it when the hero changes. Existing canonical and professional destination URLs are preserved. No push or deployment was performed.

Personal content, CV and media belong to Brad and their respective owners. Existing third-party logo/component notices remain in docs/; no external imagery or new runtime dependency was added.

Latest content: Checkpoint replaces Game Mechanics; repository README and package manifests reviewed at 8aee85c. Added Node.js, MongoDB, Tailwind CSS, Vite, Leaflet and Motion to the tech stack. Flat original text replaces the glass bevel. User-supplied live URLs: https://onroute.cloud/ and https://cinema-buddy.vercel.app/.
