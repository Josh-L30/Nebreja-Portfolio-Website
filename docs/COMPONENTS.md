Carousel/contact/scroll polish: the extra CinemaBuddy demo link is visible only when either CinemaBuddy entry is selected and hidden for CPC/Game Mechanics. The form note is shortened to Required fields · via Web3Forms and stays one line at 320/390/768/1440px. Section entrances now fade from 0.1 opacity with a 20px rise over 420ms, triggered 64px inside the viewport. The duplicate nested form reveal is removed. Reduced motion and Save-Data skip all entrances; one-time observers still unobserve and remove animation classes.

Mobile viewer update: project dialogs use edge-to-edge viewport sizing and a borderless screenshot stage on small screens, including short landscape viewports. Dialogs are outside .site, so these rules use viewport media queries instead of container queries. Original-image viewers retain a synchronized thumbnail filmstrip on mobile; selection updates both the original viewer and project gallery. Keyboard arrows/Home/End and Escape work. Verified 320x640, 390x844, 600x900, 844x390 and desktop 1440x900 with no JS exceptions.

Latest interaction revision: CinemaBuddy demo has a dedicated visible trigger and appears first in its details dialog. The CinemaBuddy design entry also links its walkthrough. Mobile nav links appear in a separate floating dropdown without expanding the bar. Contact is wired for Web3Forms with strict JSON acceptance and a pending public recipient key; until configured, the explicit Open email draft fallback uses the entered form text. Local mocks do not prove delivery. See README contact setup.

Mobile navigation refinement: the text Menu control is replaced by a 44px three-line button that becomes an X when expanded. Accessible Open/Close navigation labels stay synchronized with aria-expanded. Escape closes the navigation and restores focus. Anchor selection also closes it. Verified at 320/390/768/1100/1440px with no overflow; reduced motion disables icon transitions.

Responsive hero fix: the portrait previously used absolute positioning on mobile and overlapped the intro at 430/600px. At <=600px it now occupies a grid cell spanning the name/role rows; intro, location and social links occupy full-width rows below. Verified 320/360/390/430/600/601/768/1024/1440px with normal and explicitly enlarged text: no portrait/text intersections or horizontal overflow. This is Edge viewport emulation, not a physical iOS Messenger test. Desktop placement remains in normal grid flow.

Current tech stack: six data-driven categories (Frontend, Backend, Databases & services, Programming languages, Design, Development & collaboration). All 17 existing tools and original logos are visible once, without the older expand/collapse control. Group membership is defined in data/content.json under stackGroups. Verified category headings, unique tool count, image decoding and no overflow at 320/390/768/1440px.

Mobile certificates: the folio now has Previous/Next with a live count and a five-thumbnail picker beneath it. Desktop keeps the title-based selector. Keyboard arrow/Home/End support and wrapping controls share one selection handler. Verified at 320/390/768/1440px, including a single thumbnail row on mobile and no horizontal overflow.

Mobile project layout: at 600px and below, the screen is followed by Previous/Next, the thumbnail picker, then the project copy. Checked at 320/390px with project selection, plus 768/1440px regression checks and no horizontal overflow.

Current image behavior: certificate originals and project full-size screens open in the shared near-fullscreen imageDialog, overriding previous new-tab references below. Native modal focus is restored on close. Escape closes only the image viewer; project details remain open. Loading errors display an inline message. Verified original-image decoding, viewport sizing, focus restoration, Close/Escape and failed loads at 390/1440px.

# Current repository refinement

The page uses locally hosted Nunito Sans and responsive top navigation. Certificate selectors include local 320px preview images. Project details open with the screenshot stage, manual controls and a horizontal thumbnail filmstrip; descriptions follow below. Filmstrip buttons expose aria-pressed and support Left/Right/Home/End. This supersedes older sidebar and plain-gallery notes below. No autoplay or new dependency was added.

# Reusable components and sources

This prototype stays on native HTML, CSS and JavaScript. It does not install the React versions of the referenced components.

- **PortfolioProjects**: one custom element renders every project from `content.json`, with one consistent card and native dialog interaction. Its restrained hover-depth treatment adapts the CSS perspective/rotation approach from [Animata Case Study Card](https://animata.design/docs/card/case-study-card) by Adriana Fruchter. The original book opening, extra panels, sliding tab and intense rotation are omitted.
- **PortfolioContactForm**: one custom element builds the form from the field definitions in `content.json`.
- **createField**: one native field component creates explicit labels, autocomplete, limits and required inputs for all three fields.
- **setButtonStatus**: one shared button-state controller adapts the idle/loading/success pattern from [Animata Status Button](https://animata.design/docs/button/status-button) by hari. It omits React/Motion, demo timers and icons, and uses actual request results when an endpoint is configured.
- Shared styling lives in `ui-components.css`; the current layout, soft shadows, glass surfaces and subtle hover depth live in `portfolio.css`. Older `depth.css` and `glass-stack.css` files are archived and are not loaded.
- **PortfolioStack** renders Brad's 17 existing tools as original-color logo chips. Eight featured tools are visible initially; a keyboard-operable control expands the other nine. Data and source URLs live in `content.json`. Logos are local Devicon originals plus the existing Microsoft 365/Loop assets, with the Devicon license in `DEVICON-LICENSE.txt`.
- **PortfolioCertificates** restores all five certificate titles, issuers, years and original images from Brad's repository. Small WebP thumbnails are loaded lazily; activating a row opens the unchanged original in a separate tab. This preserves existing claims and does not independently validate credentials.
- `portfolio.css` limits backdrop blur to the small mobile navigation toolbar. Reduced-transparency/high-contrast preferences and browsers without backdrop-filter receive solid surfaces. No animated refraction or background loops are used.

## Full source content revision

Current showcase overrides the earlier grid: PortfolioProjects now has five selectable slides, a manual thumbnail picker and Previous/Next controls. Decorative neighboring covers are hidden from assistive technology. Only the active project is exposed; project dialogs retain the complete galleries and video. PortfolioCertificates uses a distinct framed folio with five numbered button selectors, one visible original-file link and readable 960px previews. Both selectors expose aria-pressed; all native buttons support keyboard activation. The project picker additionally supports arrow/Home/End navigation. No auto-advance or additional dependency was added.

The project component presents one featured image-led case study followed by four gallery cards. A shared template renders source technology tags, preview frames and screen counts. Responsive images use larger sizes appropriate to the new layout. All cards retain native button semantics and the shared project-details dialog. The composition adapts the emphasis of the user's supplied portfolio screenshots without reproducing its overlapping screen carousel.

The desktop sidebar and compact profile follow the reference site's reading flow, with responsive section navigation on smaller screens. All five public work entries, both experience roles and their bullets, both education entries, six skill groups, original About paragraphs, contact details, CV and five certificates are retained from Brad's repository. Source statistics remain attributed claims, not independently verified facts.

Project details use one reusable native dialog with manually controlled galleries. All 29 unique source screenshots have responsive WebP previews and links to their original files. The original CinemaBuddy walkthrough is available only when its project is opened, with native controls, no autoplay and preload set to none. Closing the dialog removes the media source. The original unlinked automation detail is retained in JSON without inventing another public project.

Animata is MIT licensed. Its notice is retained in `ANIMATA-LICENSE.md`. These are vanilla adaptations, not unmodified installed library components.

## Current contact behavior

The user confirmed that Brad has no existing form endpoint. `contact.endpoint` is therefore null. Required fields and email validation work, but submitting the live preview never sends a message or claims success. The form explicitly explains that it is a preview and retains the visitor's text.

The configurable request path has been tested against a local test server for loading, duplicate-submission protection, rejection, acceptance and text retention. Those checks are not proof of real email delivery. Configure a verified form service separately before publishing.

Serve this folder through HTTP to load the JavaScript module and JSON content. Browser `file://` access is not supported.
