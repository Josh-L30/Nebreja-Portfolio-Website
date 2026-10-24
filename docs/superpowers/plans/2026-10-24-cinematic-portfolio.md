# Cinematic Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Redesign Brad's portfolio for IT employers using the approved cinematic direction, restrained animation, one scroll-driven project reveal, and in-page case studies.

**Architecture:** Retain the static HTML, CSS, native custom elements, and JSON data. Replace the project carousel with three project-family showcases, preserve five individually accessible work entries, and reuse the native dialogs. Isolate animation behavior in a small native module; no framework or animation library is planned.

**Tech Stack:** HTML, CSS, JavaScript ES modules, JSON, existing optimized images, native dialog/IntersectionObserver/requestAnimationFrame, Python 3.10+ for existing verification scripts.

**Spec:** [Approved design](../specs/2026-10-24-cinematic-portfolio-design.md). The user approved the design on 24 October 2026; the user subsequently approved implementation.

## Global constraints

- Target C:/xampp/htdocs/NebrejaPortfolio/; do not modify the nested Nebreja-Portfolio-Website copy by default.
- Confirm active repository and hosting source before any product edits; preserve dirty work and establish a recoverable baseline.
- Keep the current static HTML/CSS/native JavaScript and JSON stack. No framework migration, build pipeline, database, or backend work.
- Dark is the primary presentation. Retain an optional light appearance; respect a stored appearance preference, otherwise start dark.
- Preserve all five existing work entries, all 29 unique source screenshots, the existing video, five certificates, education, CV, tool categories, and contact capabilities.
- Project details open within the main page. Closing returns to the originating control and page position.
- Only the CPC feature gets a scroll-linked sequence; other sections use short, one-time entrances.
- No pinned sequence, intercepted wheel/touch input, custom cursor, autoplay, or animation dependency.
- Mobile gets a static signature screenshot with a short entrance. Reduced motion and data-saver mode disable travel and scroll-linked movement.
- Typical transition durations are 180–450ms; complete hero entrance stays under roughly 800ms.
- Verify at 320, 390, 768, and 1440px. Target WCAG AA text contrast and visible focus.
- Do not invent project outcomes, professional experience, demo links, or delivery claims.
- Do not submit a real contact message during testing without authorization. No deployment is included.

## Review focus

- Missing/invalid content or failed animation initialization must leave a readable page with direct CV/contact links and clear component error feedback (Tasks 1, 3, 5).
- Rapid project switching, nested image views, and repeated Escape must preserve gallery state and restore focus/scroll correctly (Task 4).
- Changing reduced-motion preference during animation must immediately remove movement and keep content visible (Task 5).
- Narrow screens, long labels, enlarged text, and light appearance must remain readable without clipped controls or horizontal overflow (Tasks 2, 6).
- Provider rejection, timeouts, and duplicate contact submissions must preserve message text and report truthful status (Tasks 2, 6).

## File map

Paths below are relative to the confirmed portfolio root.

| File | Responsibility |
| --- | --- |
| index.html | New page hierarchy, hero, navigation, content sections, semantic dialogs, metadata |
| css/style.css | Replace accumulated layout/effect rules with coherent cinematic tokens, responsive layouts, motion and dialog presentation |
| css/components.css | Restyle form fields/status states consistently with both appearances |
| js/script.js | Keep data loading, custom elements, contact, galleries and dialogs; replace carousel renderer; integrate motion initialization |
| js/motion.js (new) | Progressive, optional one-time entrances and CPC scroll-linked reveal |
| data/content.json | Add project-family membership and factual case-study fields while retaining five entries and media references |
| verify.py | Replace obsolete carousel marker assertions with showcase/dialog assertions |
| verify_assets.py | Preserve asset checks; add family membership and unique screenshot coverage checks |
| docs/cinematic-browser-checks.md (new) | Reproducible browser scenarios and recorded results |
| docs/cinematic-content-baseline.json (new) | Existing entry IDs and unique media/CV/certificate paths for preservation checks |
| docs/PERFORMANCE.md, README.md | Final architecture, behavior, current verification and limitations |
| assets/brad-hero-social-v2.jpg (new) | Actual final hero capture used for social sharing |

Do not split unrelated components or migrate every content section into JSON. Existing contact exports setButtonStatus(button, state) and createField(field) remain available. Preserve existing IDs projectDialog, imageDialog, detailTitle, detailImage, detailVideo, detailGallery, galleryPrevious, galleryNext, galleryCount, galleryOriginal, closeDialog, closeImage, fullImage and imageStatus unless an audited consumer requires changing one.

## Task 1: Confirm source and capture a preservation baseline

**Files:** Create docs/cinematic-content-baseline.json and docs/cinematic-browser-checks.md; update verify_assets.py.

**Interfaces:** Consumes existing HTML and content.json. Produces a baseline containing project IDs, unique original gallery paths, responsive image paths, certificate image paths, video paths and CV link. Later checks compare these sets, not duplicated gallery-entry counts.

- [ ] Confirm filesystem write access and Git status for the root portfolio. If Git remains inaccessible, resolve that access before edits; do not reset, delete, or rewrite either checkout. Inspect root/nested Git identity and available deployment configuration. If no hosting configuration exists, use the user-named root for local work and record that production-source identity is unverified.
- [ ] Establish a recoverable source snapshot that includes uncommitted user files; do not commit unrelated work. Record which checkout is targeted.
- [ ] Serve the confirmed root over HTTP. Run the existing verify_assets.py and verify.py against that URL. Save baseline screenshots at all four widths in dark/light modes and capture current navigation, gallery, nested-dialog and form behavior.
- [ ] Build the baseline manifest from actual content. Add preservation assertions: project IDs equal cpc/dashboard/gamemechanics/cinemabuddy/cinemabuddyux, certificate count equals 5, unique original gallery count equals 29, and the manifest's video/CV/media sets remain present. Validate failure using a temporary altered content copy, never by deleting real assets.
- [ ] Record baseline performance under one documented browser/Lighthouse configuration. If Lighthouse is unavailable, record that limitation and use browser network/layout/interaction evidence; do not claim a numeric score.
- [ ] Save the approved design and this plan under docs/superpowers/specs/2026-10-24-cinematic-portfolio-design.md and docs/superpowers/plans/2026-10-24-cinematic-portfolio.md when project write access is available. Record Task 1 results and checkpoint only task-owned changes.

## Task 2: Build the cinematic page foundation

**Files:** Modify index.html, css/style.css, css/components.css, and js/script.js.

**Interfaces:** Keep the four existing custom element tags and dialog IDs. Navigation owns home/work/about/contact anchors; existing experience/stack/certifications/education anchors remain valid. Keep brad-theme as the stored appearance key.

- [ ] Add browser scenarios to docs/cinematic-browser-checks.md for default dark, stored light/dark, blocked localStorage, mobile menu open/Escape/outside click/anchor dismissal, keyboard CV/contact access, and text enlargement. Check the current site to establish which assertions fail relative to the new design.
- [ ] Rebuild the navigation and hero using the approved B direction. Keep Brad's real portrait, name, role, proposed positioning, two primary destinations, and direct HTML contact/CV fallbacks. Remove unsupported hero counters rather than substituting new ones.
- [ ] Replace old sidebar/carousel-specific layout rules with a consistent near-black/off-white/mint token system and a corresponding light palette. Keep the local font initially. Structure About, experience, tools, education, credentials and contact in the approved order. Preserve true source content and professional destinations.
- [ ] Update appearance initialization so stored light and dark both work and no preference means dark. Guard storage failures. Mobile menu must not move the page's layout when opened; preserve visible focus and appropriately labeled controls.
- [ ] Restyle the existing form without changing its provider/payload/validation flow. Inspect configuration without printing access keys. Document configured delivery versus draft behavior accurately.
- [ ] Run asset/HTTP checks and browser scenarios at 390/1440px in both appearances; verify no content disappears with animation disabled. Checkpoint Task 2.

## Task 3: Replace carousel with project-family showcases

**Files:** Modify data/content.json, js/script.js, css/style.css, verify.py, and verify_assets.py.

**Interfaces:** Add top-level projectGroups entries: {id, title, projectIds}. Fixed mapping: cpc -> [cpc,dashboard]; gamemechanics -> [gamemechanics]; cinemabuddy -> [cinemabuddy,cinemabuddyux]. Existing projects array, IDs, galleries, images and video fields retain their meanings. Every launch control uses data-project with an existing entry ID. The CPC visual gets data-signature-visual for Task 5.

- [ ] Add membership checks: exactly three unique families, five entries assigned exactly once, all referenced IDs exist. Verify rejection using a temporary duplicate/missing-ID fixture.
- [ ] Rewrite PortfolioProjects.connectedCallback() to render three visible, image-led articles in source order. CPC contains separate launch controls for the system and dashboard; CinemaBuddy contains concept and walkthrough launch controls. Do not hide all but one family behind a picker.
- [ ] Give every entry an accessible descriptive launch button, factual summary, role/status, responsive image and appropriate source/demo destination only if one already exists. Keep current component loading/error feedback and reserve image dimensions.
- [ ] Update verify.py to assert actual new showcase hooks rather than the obsolete project-picker marker. Keep custom element, gallery and dialog assertions; retain five-entry/five-certificate checks.
- [ ] Verify all five entries open the correct existing media; unique original screenshot count remains 29, and the walkthrough remains available without autoplay. Check network/content failures produce an understandable message and leave navigation/contact usable. Checkpoint Task 3.

## Task 4: Redesign in-page case studies and image viewing

**Files:** Modify index.html, js/script.js, css/style.css, data/content.json, and docs/cinematic-browser-checks.md.

**Interfaces:** Optional project.caseStudy fields: {status, problem, contribution, approach, result}; each is plain factual text derived from existing content, omitted when unsupported. openProject(projectId, triggerElement) opens projectDialog; openImage keeps existing gallery linkage. Store originating trigger and page position per modal layer. galleryIndex remains the shared selected project-image index.

- [ ] Record browser assertions for a project opened halfway down the page, thumbnail/arrow navigation, full-image opening, two successive Escape presses, close buttons, and focus restoration. Include rapid clicks and a failed image request. Run before implementation to document gaps.
- [ ] Refactor the existing delegated launch handler into openProject(projectId, triggerElement). Populate the case study with truthful problem/contribution/approach/result text and gallery; omit empty headings and unsupported outcome statements.
- [ ] Build the desktop overlay and phone sheet inside native dialogs. Keep title and Close reachable, gallery controls operable, meaningful alt text, thumbnail selection and loading/error feedback. Keep video preload none and playback opt-in; pause and release video when the project closes.
- [ ] Track nested modal state so closing the image restores focus inside the case study without unlocking the background. Closing the project restores its original trigger and page position. Escape affects only the topmost modal. Prevent duplicate openings and preserve the selected image.
- [ ] Verify keyboard focus stays in the active modal; background cannot scroll; all five entries and all certificates work. Confirm a long title and portrait-oriented image fit at 320px. Checkpoint Task 4.

## Task 5: Add restrained motion and the signature scene

**Files:** Create js/motion.js; modify js/script.js and css/style.css.

**Interfaces:** js/motion.js exports initMotion(root: Document | Element = document): () => void. It observes existing descendants plus dynamically rendered project/custom-element children, deduplicates targets, and returns cleanup. Data hooks: data-reveal, data-signature-visual. Initialize through an optional dynamic import with a handled rejection so motion failure cannot stop navigation/dialog/form setup.

- [ ] Add browser scenarios for motion enabled, prefers-reduced-motion at load and changed mid-session, Save-Data, narrow viewport, repeated upward/downward scrolling, module-load failure, and a scroll with a modal open.
- [ ] Implement progressive one-time reveals with visible base styles. Use 180–450ms transitions, a short stagger totaling under roughly 800ms for the hero, and immediate display for reduced-motion/data-saver users. Observer absence must leave content visible.
- [ ] Implement the CPC visual's desktop-only transform from scale .94 to 1 over its viewport-entry range, clamped to those endpoints. Use passive scroll observation and at most one scheduled requestAnimationFrame; attach only while the scene is near the viewport and cancel when idle, disabled, hidden, or disposed. Do not animate layout properties or intercept input.
- [ ] At widths below 768px use a static signature visual with a short one-time entrance. Reduced-motion/data-saver uses a static visual with no entrance travel at every width. Recalculate progress on resize, including return from mobile to desktop; preference changes immediately reset transforms and reveal all content.
- [ ] Use consistent hover/press/focus feedback and short dialog transitions. Native dialog focus/open/close behavior takes priority over animation completion; rapid dismissal must not strand a layer or lock scrolling.
- [ ] Verify no idle animation loop, no duplicate listeners after repeated initialization, no hidden content under failed module loading, and no movement in reduced mode. Inspect motion visually while scrolling both directions. Checkpoint Task 5.

## Task 6: Verify the complete employer journey and document results

**Files:** Modify verify.py, verify_assets.py, README.md, docs/PERFORMANCE.md, docs/cinematic-browser-checks.md, and index.html. Create assets/brad-hero-social-v2.jpg from the final actual hero.

**Interfaces:** Final verification consumes the baseline manifest and existing asset/HTTP scripts. Browser observations are recorded with viewport, appearance, motion preference, result, and evidence path. No production traffic or real form submission is required.

- [ ] Run all preservation/HTTP checks with Python 3.10+. Example: `<python> verify_assets.py`; start `<python> -m http.server 8000 --bind 127.0.0.1` in the confirmed root; run `<python> verify.py http://127.0.0.1:8000`. Expected output is PASS with no missing assets or altered entry counts.
- [ ] Execute the documented browser scenarios using available browser automation. At 320/390/768/1440px assert document scrollWidth <= clientWidth, no clipped navigation or modal actions, and legible project/certificate content in both appearances. Also inspect 200% text enlargement and long labels.
- [ ] Test keyboard-only navigation, focus visibility, mobile menu dismissal, all five entry launches, gallery boundary controls, nested Escape/focus/scroll restoration, certificate previews, CV and professional destinations. Check contrast numerically against WCAG AA (4.5:1 normal text, 3:1 large text; 3:1 meaningful UI boundaries/focus).
- [ ] Intercept contact-provider requests before submission and exercise accepted response, JSON rejection, HTTP failure, malformed JSON, timeout, network failure and double click. Assert success only on validated acceptance, text retained after failure, and exactly one request while pending. Verify draft mode separately in a test configuration without changing the real public config. Do not send an actual email.
- [ ] Test reduced-motion preference changes, Save-Data, failed motion import and failed image/content requests. Check console errors, stopped video on close, and absence of unnecessary video downloads. Inspect actual screenshots, not just DOM assertions.
- [ ] Compare performance using the same baseline configuration; investigate material LCP/CLS/interaction regressions. Use targets LCP <=2.5s, CLS <=.1 and Lighthouse mobile performance >=90 when that tool is available; report measured results and limitations honestly. Viewport emulation is not physical-device evidence.
- [ ] Capture the final hero into a 1200x630 social image, update versioned OG/Twitter URLs and alt text, and preserve canonical destinations. Re-run asset/HTTP checks after the final change.
- [ ] Update README and performance/browser records to describe actual final behavior and results, removing obsolete carousel and contradictory delivery claims. Review the complete diff, checkpoint only task-owned files, and present the local result for review. Do not deploy or push without a subsequent request.

## Self-review

The six tasks cover the approved content structure, both appearances, all five entries and preserved assets, in-page detail flows, one signature scene, motion fallbacks, contact integrity, metadata, and verification. All five review-focus conditions have explicit owning scenarios. Newly introduced interfaces are limited to projectGroups, optional caseStudy text, openProject, and initMotion; existing gallery/content IDs remain stable. No new runtime dependencies are planned.

## Execution recommendation

Recommend native execution: implement the six tasks in this chat, with intermediate checks and a final independent review. The work shares one page, one content source, and tightly connected dialog/motion behavior, so serial implementation is the clearest fit. Subagent-driven execution is available if the user prefers review after every task. Neither method begins until the user has reviewed this plan.
