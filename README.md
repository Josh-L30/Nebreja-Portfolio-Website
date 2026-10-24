# Brad Josh Nebreja — cinematic portfolio

Static HTML, CSS, native JavaScript components and JSON content. No build step or package installation is required.

## Local preview

From this directory run Python 3.10+:

    python -m http.server 8000 --bind 127.0.0.1

Open http://127.0.0.1:8000 over HTTP, not file://, because components fetch JSON and use ES modules.

## Design and behavior

The approved cinematic studio direction uses a dark background, bold local Nunito Sans typography, authentic project imagery and muted mint accents. A redesigned optional light appearance uses the same layout. The saved brad-theme preference is respected; the default is dark.

Three visible project families contain all five original work entries: CPC system/dashboard, Game Mechanics, and CinemaBuddy/concept walkthrough. All 29 unique original screenshots, responsive previews, certificates, tools, education details, CV and professional links remain available. Large native dialogs open project stories within the page; nested full-image views preserve gallery selection. Closing each layer restores focus; closing the project restores page position. Video is opt-in, never autoplays, and is paused/released on close.

Motion is progressive enhancement in js/motion.js. The CPC preview gently scales from .94 to 1 on desktop as it enters view. Other entrances are short and happen once. Mobile uses a static signature visual. Reduced motion and Save-Data disable travel and dialog animations; motion-module failure does not prevent controls or content from working. Normal wheel/touch scrolling is never intercepted.

## Files

- index.html: page structure, direct CV/contact fallbacks and metadata.
- data/content.json: five work entries, three project groups, galleries, credentials, tools and existing contact configuration.
- css/style.css: layout, theme tokens, dialogs, responsive and motion presentation.
- css/components.css: shared contact form styling.
- js/script.js: native components, data loading, galleries, dialogs, navigation, appearance and preserved contact behavior.
- js/motion.js: optional entrances and one scroll-linked visual.
- DESIGN.md and docs/superpowers/: approved design and implementation plan.

Visible profile, experience, education and About copy still lives in index.html; duplicate JSON fields are reference content. No framework/backend migration was performed. The nested Nebreja-Portfolio-Website directory was not modified.

## Contact integrity

The current public configuration enables Web3Forms. The contact component and its configuration were preserved during the redesign. Existing validation, honeypot, pending-state duplicate prevention, 15-second timeout, text retention on failure, and strict success === true checking remain intact. No real message was submitted during redesign verification; tests intercept every POST locally. Provider acceptance is not proof of inbox delivery. A missing endpoint/key retains the email-draft fallback. Never enter an email password or private token into the public configuration.

## Verification

    python verify_assets.py
    python verify.py http://127.0.0.1:8000
    python -m unittest discover -s tests -p "test_*.py"
    node --test tests/motion.test.mjs

For in-browser interaction checks open /tests/browser.html and press Run checks. All POSTs are intercepted by the test page; it does not send messages. /tests/visual.html is a development-only responsive review harness. Neither harness is linked from the portfolio. See docs/cinematic-browser-checks.md and docs/PERFORMANCE.md for results and limits. Physical devices and real inbox delivery have not been tested in this redesign.

Social sharing uses assets/brad-hero-social-v2.jpg, a 1200x630 crop/resize of an actual final dark-hero browser capture. Regenerate it when the hero changes. Existing canonical and professional destination URLs are preserved. No push or deployment was performed.

Personal content, CV and media belong to Brad and their respective owners. Existing third-party logo/component notices remain in docs/; no external imagery or new runtime dependency was added.
