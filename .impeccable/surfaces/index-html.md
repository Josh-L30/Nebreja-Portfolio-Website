---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["css/style.css","js/script.js","js/motion.js","js/devices.js","css/scenes.css","js/services.js","js/scene-timeline.js","js/smooth-scroll.js"]
---

# Reference Portfolio Rebuild Implementation Plan

**Goal:** Rebuild Josh's portfolio with the layout and interactions of seanpaul.is-a.dev, using his own content and black, white and mocha brown.

**Architecture:** Preserve factual JSON, the portrait/CV/media, and proven contact and dialog handling. Replace the old page composition and stylesheet rather than adding another layer of overrides. Build browser-native responsive motion and a fault-tolerant live GitHub contribution calendar.

**Tech Stack:** Existing static HTML, CSS, ES modules and native Web Components.

**Spec:** User's 8 November brief and PRODUCT.md. Direct implementation and retention of Contact, socials, CV and policy pages are confirmed.

## Global constraints

- Hero: JOSH NEBREJA; existing photo, longer body crop; exact supplied left/right subtitles.
- Supplied About paragraph with clear, useful, look, function and help emphasized in mocha.
- View CV replaces What I Do; services are UI/UX Design, Web Development, Prototyping.
- Four existing project families and all their detail screens/live links/privacy notes.
- Existing four experience entries; AI, Code and Workflow only; existing 21-tool stack.
- Real Josh-L30 contributions with an honest unavailable state; five-certificate carousel.
- No Education, Recent Edits, Recent Designs or fabricated work statistics.
- Retain contact delivery behavior, policy pages, CV, social links and in-page viewers.
- Keyboard controls, focus restoration, mobile alignment and reduced-motion fallbacks.
- No commit/push/deploy requested.

## Direction contract

THESIS: A portrait-led developer portfolio, matching the supplied Sean Paul reference's visual and interaction grammar instead of the discarded stacked-name/deck layout.

OWN-WORLD: Near-black ground, white General Sans-style type, mocha interactive fills, fine gray separators, circular controls, generous margins, recognizable social/tool icons.

STORY: Meet Josh; understand his approach and services; explore four real projects and experience; inspect workflow, tools, GitHub activity and certificates; view CV or contact him.

FIRST VIEWPORT: One centered, longer portrait in front of a large single-line JOSH NEBREJA. Small maker link top-left, circular menu top-right, subtitle at each lower side, social rail lower-left and View CV lower-right. Mobile reflows into a readable portrait-led opening with a large name and accessible actions.

FORM: User-pinned reference, not an open concept selection; seed: none (user-pinned). Signature interactions: sliding curved side menu with staggered labels; reversible About text fill; a pinned 440vh service track with a .72-to-1 expansion and two 120vh upward wipes; image-follow project hover previews; original dimensional device scenes and scroll-filled workflow titles.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Implementation

- [x] Back up the current project; capture reference sections and interactions.
- [x] Replace HTML and CSS composition; retain original metadata, experience content and dialog hooks.
- [x] Replace project deck with hover-preview rows; reshape stack and certificates; implement menu, workflow, service and heading motion.
- [x] Load and validate real contribution data with a clear unavailable/retry path.
- [x] Verify content, keyboard/focus/scroll interactions, image galleries, five certificates, contact outcomes, 320/390/768/1440 widths, reduced motion and service failure states.
- [x] Inspect desktop/mobile screenshots against the reference, run the detector once, obtain a fresh finish review and record the completed design system.

## Review focus

Long project names at 320px; opening and closing nested dialogs without losing page scroll; GitHub outages/rate limits; swipe versus vertical scrolling in certificates; reduced-motion users receiving fully visible content.

## Review corrections

The fresh finish review requested stronger display weight/tracking, the oversized moving mobile name, convincing device depth, and removal of mobile fixed-CV overlap. The mobile name now uses a continuous large marquee with a complete static name under reduced motion. CV is positioned only within the mobile hero. Self-hosted MIT Three.js renders original procedural laptop geometry with metallic materials, lighting, keyboard geometry and existing project textures. No external model or new raster is used. The renderer loads near its scenes, limits pixel ratio/frame rate, pauses offscreen and has original-image fallbacks. This intentionally replaces the initial wireframe intention with dimensional devices closer to the reference. Native pointer, focus, Escape, menu navigation, certificate keyboard focus, real touch swipe, six viewport widths and policy-page checks passed (17 checks).

## User-rejected approximation: correction contract

The user rejected the prior service/laptop implementation as insufficiently faithful. New evidence comes from live desktop/mobile inspection and the reference source in the workspace work/sean-reference. Desktop services: a 100vh viewport pinned for 340vh, expansion over the first 100vh, two upward wipes over 120vh each; image counter-scale and 18% opposing parallax; late masked-letter title reveals; continuous pill indicator. At <=1024px, three separate 100svh scenes, no pin, reversible centered title reveals and parallax.

Workflow and Experience use center-out white hover bands with black content. Workflow rows keep their height and expose their descriptions accessibly on touch/keyboard. The laptop rotates on all three axes with scroll and raycast pointer drag; Experience has an original procedural keyboard with the same interaction. Original geometry uses own project imagery; it does not reuse the reference's third-party GLB assets. About fills responsive lines left-to-right, project previews are square with a sliding image strip, menu labels roll vertically and close in two phases, stack pills flow across the width. Reduced motion/SaveData show static service content.

Verification now includes service timeline milestones in both directions, rendered 3D rotation and actual pointer drag, center-out hover masks, six viewport widths, mobile service height and touch description controls. This supersedes the old 17-check static fidelity claim.

Completion: fresh motion/composition review ship; 241 browser assertions,19 motion checks,18 native interaction/responsive checks,12 Node and6 Python tests passed. DESIGN.md and design.json now reflect implemented choreography. Device geometry remains an explicit adaptation. No commit/push/deploy.

## 9 November: reference views and realistic services

Latest request supersedes the prior in-page project constraint: match the reference's standalone project view, Tech Stack View All/dashboard and Contact experience. Preserve owner factual content and palette. Three service images use the reference's photographic compositions, edited with built-in image_gen only to insert owner project screens (CinemaBuddy and Checkpoint), keeping the laptop realism and avoiding the reference owner's name/portrait. Original generated PNGs are retained outside the project; lossless-dimension WebP encoding is the sole non-generative processing. Full prompts and origins in asset sidecars and outputs/reference-views/image-edit-prompts.json.

Project views: sticky320px sidebar, metadata/tool badges/live or privacy note, large ordered screenshot gallery and native accessible image viewer, next project, all works. Stack:12featured homepage pills, View All link,21tools in6grouped cards with mocha headings and grid texture from pinned reference. Contact:75vh centered scroll-filled CTA, DM Serif Text italic highlightedword, circularfillhover link, separate five-field conversational form; optionalcompany/service fields, requiredname/email/message; originalprovidercontract,errorretention,honeybot/pendingguard. Shared components replace oldprojectoverlay/inlineform. Page curtain labels and reversible anchor/back behavior; reduced/SaveData static.

Reference-view completion:169/169 migrated browser checks,35dedicated route/viewport checks,6next-project checks,9Python+12Node tests,assets/HTTP/syntax checks passed. Detector[];84rasters0missingprovenance. Fresh review requested one material fix (next-project pocket); verdict scored it resolved and ship. DESIGN.md/design.json updated to actual routes/components. Existing portrait,CV,categories,certificates and private-system note retained. No commit/push/deploy.


## 9 November: Home entry and project gallery corrections

Full homepage document loads and reloads start at Home, with native scroll restoration disabled and the incoming section hash cleared before rendering. In-page section navigation remains available. Back to Home on all four dedicated views points to index.html. CPC grouped screenshots are deduplicated by original source, preserving order and every distinct screen (13 total). The contribution/project-details disclosure is removed from every project view while factual source content is retained. Project and Works image View badges follow fine mouse pointers with the reference's easing, mocha fill and pointer-transparent fixed positioning. They hide on leave, scroll, blur or image opening; keyboard focus retains a centered badge; reduced motion tracks directly. No portrait, CV, source screenshot or contact content changed.


## Directional section navigation correction

Menu navigation restores the saved fixed-body scroll position and refreshes the smooth-scroll engine's document limit before unlocking it. Section transitions use the same scroll controller in both directions, with the existing scroll-padding offset. Native fallback respects immediate restoration; reduced motion remains instant. Full document reloads still start at Home.


## Caramel branding update

User requests BRAD JOSH for the hero, spaced either side of the portrait with minimal inner-edge occlusion. Desktop uses 12.8vw split lettering; mobile shows both words together at16vw instead of the former cropped marquee. All interface accents now use caramel #b87945 (dark variant #55351e), preserving original project/media colors. Header replaces builder text with the original NBJ cube silhouette in a transparent SVG luminance mask. On fine-pointer hover or keyboard focus, the cube rotates and shrinks into the full-name wordmark. Touch first tap reveals the name, next tap goes Home; outside tap restores the cube. Reduced motion removes spin/transition.


## 9 November: refinement and original service-photo previews

Hero words move closer: desktop name line is80% wide atleft10%, portrait unchanged; mobile retains its complete readable name. Header logo uses six physical CSS3D faces with perspective and original NBJ face textures, not a rotating flat image. Rotation lasts1.8s; cube fades after1s and full name enters after1.1s. Focus/touch/reduced-motion behavior remains. Selected Works has four main project links only; redundant Explore Project/Live Site actions are removed from homepage rows while live links remain inside project pages. Hover previews are image-only380×214px with no colored frame or padding. Experiences keep their accessible accordion behavior without plus symbols; the 3D keyboard now carries key legends. Workflow's moving laptop displays a centered NBJ mark on an original black/car­amel orbital screen, with the same source as its fallback. Tech Stack uses a70s linear marquee, two aria-hidden/inert replicas, pauses offscreen/onhover/onkeyboardfocus, and becomes a wrapped complete list under reduced motion/Save-Data.

Six original AI-generated laptop-photo concepts are saved outside the website in the task workspace outputs/refinement-round/laptop-options, with full prompt sidecars. They are preview-only pending the user's choice of three; current service photos remain unchanged. No deployment requested.


## Approved service photo selection

User selected the front-facing Midnight image for UI/UX Design, Night Window for Web Development re-staged to face right with upright screen/keyboard, and Prototype Lab for Prototyping. These replace all three previous reference-derived service photographs in the existing service-design/development/prototype WebP assets. Each is1672×941, original aspect preserved, with prompt/origin sidecars and embedded provenance. Service media uses contain framing on the black ground; phone images use140% width with subject-aware horizontal placement. Existing pinned expansion, wipes, title reveals and reversible parallax are unchanged. Original selected PNGs remain in the task workspace.


## Responsive presentation and stack expansion

User requested wider, more distant laptop framing. Desktop photos retain contain framing at0.9scale; at1024px and below, each service is a16:10 edge-to-edge panel, cover-fit with16% media overscan and reversible ±6% parallax to avoid black bands. Header physical cube now uses caramel via multiply face blending,1.25s rotation,0.7s forward fade delay,0.75s wordmark delay and0.45s fades. Mobile hides the narrative subtitle and restores a22s seamless BRAD JOSH marquee at27vw using two identical groups; the duplicate is aria-hidden. Reduced-motion/Save-Data remains a complete static name. Contact's large owner name is BRAD JOSH with a vertical fade at the letter ends.

Tech Stack has33 tools in six categories. Databases & Services adds Vercel, Supabase, Cloudflare; Design & Programming merges Java/Python/C++ with Figma/Canva; AI replaces Programming Languages with Gemini, OpenAI, Claude, Antigravity, Grok, Copilot (GitHub Copilot icon), Cursor AI; Development & Collaboration adds Git/GitHub. All33 appear in the160s homepage marquee and full library, with local icons. New brand icons are from Devicon/LobeHub with sources in data/content.json and MIT notices in assets/licenses.

Five mobile CV placements are preview-only in workspace outputs/responsive-refresh/mobile-cv-previews, served on8021: beside socials, lower left, lower center, full-width lower bar, header action. The current live mobile CV position is retained pending the user's selection.


## Compact scene motion and final brand adjustment

User confirmed retaining View CV at its current lower-right mobile position; the five alternatives are historical previews only. The service sequence now uses the same .72→1 entrance, two upward wipes, reversing progress, title reveals and moving01–03 indicator on phone/tablet as desktop. Compact scenes pin below the fixed header and fill the remaining viewport. Each selected sharp laptop photo retains its wide contained framing, softly blending into a blurred background from the same photo so the scene has no empty letterbox. Compact scroll units are shorter than desktop; number controls have44px touch height. Native touch scroll is passive/unhijacked and the section releases normally. Reduced-motion/Save-Data shows all three static16:10 scenes with readable titles and no pinning.

The physical six-face cube is white again, including the Workflow screen mark. Header spin is0.9s; name appears after0.46s with0.32s opacity/0.42s transform, in caramel #b87945. Cube forward opacity delay0.48s and return delay0.06s with0.3s fade maintain the smooth crossfade. Full-name touch/focus behavior remains.
