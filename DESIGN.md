---
name: "Josh Nebreja Portfolio"
description: "A portrait-led developer portfolio in black, white and caramel."
colors:
  bg: "#090909"
  ink: "#f5f5f3"
  soft: "#a9a6a3"
  line: "#33312f"
  accent: "#b87945"
  accent-ink: "#110e0b"
  accent-dark: "#55351e"
  page-bg: "#0d0d0d"
  stack-surface: "#121212"
typography:
  display:
    fontFamily: "GeneralSans, Arial, sans-serif"
    fontSize: "12.8vw"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "GeneralSans, Arial, sans-serif"
    fontSize: "clamp(36px, 4.05vw, 60px)"
    fontWeight: 500
    lineHeight: 1.16
    letterSpacing: "-0.04em"
  about:
    fontFamily: "GeneralSans, Arial, sans-serif"
    fontSize: "clamp(30px, 3.9vw, 57px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.04em"
  title:
    fontFamily: "GeneralSans, Arial, sans-serif"
    fontSize: "clamp(28px, 3.3vw, 47px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.04em"
  contact-display:
    fontFamily: "GeneralSans, Arial, sans-serif"
    fontSize: "clamp(76px, 6.5vw, 100px)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  contact-accent:
    fontFamily: "DMSerifText, Georgia, serif"
    fontWeight: 400
  body:
    fontFamily: "GeneralSans, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "GeneralSans, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
rounded:
  square: "0"
  media: "5px"
  preview: "0"
  card: "12px"
  certificate: "14px"
  dialog: "18px"
  stack: "20px"
  reference-pill: "50px"
  chip: "30px"
  pill: "40px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "28px"
  xl: "40px"
  section: "100px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.pill}"
    padding: "13px 24px"
  button-primary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    rounded: "{rounded.chip}"
    padding: "8px 15px"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "6px 4px"
  navigation-control:
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    size: "60px"
  tech-chip:
    rounded: "{rounded.chip}"
    padding: "10px 18px"
  project-row:
    textColor: "{colors.ink}"
    padding: "35px 0"
  reference-pill:
    backgroundColor: "#1a1a1a"
    textColor: "{colors.ink}"
    rounded: "{rounded.reference-pill}"
    padding: "11px 24px"
  contact-submit:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.reference-pill}"
    padding: "12px 32px"
  project-live:
    backgroundColor: "#fff"
    textColor: "#0a0a0a"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  stack-category:
    backgroundColor: "{colors.stack-surface}"
    rounded: "{rounded.stack}"
    padding: "38px 36px"
  tool-pill:
    backgroundColor: "#ffffff08"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
  contribution-card:
    rounded: "{rounded.card}"
    padding: "28px"
---

# Design System: Josh Nebreja Portfolio

## Overview

**Creative North Star: "Portrait-led developer portfolio"**

A near-black canvas lets the centered portrait, large white General Sans and original work media lead. Caramel marks emphasis and interaction; quiet separators organize long lists without turning the page into a dashboard. The visual and interaction direction is the user-selected Sean Paul reference, adapted to Josh’s content.

The composition is spacious and direct. A longer portrait overlaps one desktop name line; circular controls open a sliding side drawer; large editorial text gives way to fine-lined project and experience rows. Motion connects content through reversible scene transitions, optional desktop wheel inertia, native image viewers and curved destination-labeled page curtains. Project case studies, all works, the complete stack and the conversational contact form have dedicated pages. Touch keeps native scrolling; reduced-motion and Save-Data modes retain readable static content.

**Key Characteristics:**
- Portrait and large type establish hierarchy.
- Black and white carry the canvas; caramel signals emphasis and action.
- Hairlines, circular controls and restrained rounded frames provide structure.
- Original media retain their colors.
- Continuous motion resolves to readable static content when disabled.

## Colors

The palette is quiet black and warm white with a caramel accent. Frontmatter owns normative values, extracted from CSS custom properties in `css/style.css` and literal component rules in `css/pages.css`.

### Primary

- **Caramel (`accent`)**: emphasis words, focus rings, links, filled actions and selected controls.
- **Dark Caramel (`accent-dark`)**: preview backing and dark hover fills.
- **Caramel Ink (`accent-ink`)**: readable dark labels on caramel fills.

### Neutral

- **Near Black (`bg`)**: page ground.
- **Warm White (`ink`)**: primary text and icons.
- **Soft Gray (`soft`)**: supporting descriptions and metadata.
- **Warm Hairline (`line`)**: structural separators and card borders.
- **Secondary Ground (`page-bg`)**: dedicated project, works, stack and contact pages.
- **Stack Surface (`stack-surface`)**: textured category cards.

**The Caramel for Emphasis Rule.** Use caramel for meaningful emphasis, interactive fills, active states and focus; keep white as the primary reading color.

**The Original Media Rule.** Keep approved portrait, screenshot, certificate and tool pixels in their original colors; change presentation and crop without recoloring them.

GitHub activity has five observed fills: `#1d1c1a`, `#48301f`, `#79502f`, `#a66a38`, `#cf945b`, from empty to busiest. These encode real levels. Form success and error treatments use subdued green and clay, solely as status signals.

## Typography

**Display and Body Font:** GeneralSans, Arial, sans-serif. Local licensed WOFF2 files supply weights 400, 500 and 700.

General Sans links oversized editorial names and compact controls. The reference contact CTA adds self-hosted DMSerifText 400 italic only for its highlighted word; the body family stays unchanged. The font file is assets/fonts/dm-serif-text-italic.ttf and its OFL license is docs/DM-SERIF-TEXT-LICENSE.txt. Tight display tracking provides character while body text stays normally spaced.

### Hierarchy

- **Display:** frontmatter describes the desktop name. Mobile uses an18s seamless BRAD JOSH NEBREJA marquee at clamp(145px,35vw,180px) with an aria-hidden duplicate (one centered8.4vw full name under reduced motion or Save-Data), and hides the narrative subtitle. Desktop places the two words at the outer sides of an 80% width line so the portrait only overlaps an inner letter edge.
- **Headline:** fluid section statement; standard display statements become 35px on phones.
- **About:** 500-weight responsive statement from 30px to 57px, with 1.2 line-height and -0.04em tracking. Fill follows actual rendered lines left-to-right and reverses with scroll; emphasized words retain caramel.
- **Title:** project names, with intermediate size 35px and phone size 29px. Long names wrap naturally.
- **Body:** primary reading copy; soft descriptions and metadata commonly use 12–15px.
- **Label:** inline action typography. The reference’s retained uppercase section identifiers are local navigational labels, not a requirement to invent eyebrows.
- **Workflow:** 500-weight type from 58px to 110px, 0.88 line-height and -0.025em tracking; at 600px and below it uses clamp(48px, 12vw, 72px). Menu primary labels also use 500 weight. The centered home Contact statement uses the contact-display role; phones use clamp(58px, 12vw, 85px). Its caramel highlighted word uses the contact-accent role with italic style. The final footer override keeps its emphasis in General Sans.

**The One Typographic Voice Rule.** Use self-hosted General Sans for display, body and controls; reserve DM Serif Text italic for the reference contact CTA accent.

## Layout

The reading container is at most 1060px wide with 48px outer space on each side. At 767px and below it becomes viewport width minus 40px. Default section rhythm is 100px vertically, becoming 65px on phones; signature sections retain their observed spacing.

Desktop fixes the maker mark and circular menu in the top corners, socials at lower left and CV at lower right. The viewport-scale hero overlaps a centered, longer portrait with one name line and two side captions. Phones move socials into the hero and restrict CV to the hero; it hides past the opening. The full phone name stays readable within the hero bounds.

The main phone boundary is 767px; 1100px adjusts intermediate hero/project typography, and 359px handles compact phones. A 768px minimum query restores desktop workflow positioning. The home Contact CTA is centered in a section at least 75vh high; its form lives on contact.html. Phone project rows expose original thumbnails; hover-capable desktop devices receive supplemental pointer-follow previews. Contribution cells can scroll within their own container.

Above 1024px, animated services use a 440vh track with a sticky 100vh viewport: the 340vh scroll travel comprises a 100vh expansion and two 120vh upward wipes. At 1024px and below, the same reversible sequence pins beneath the header, using a viewport-filling scene and shorter scroll units. Wide contained photographs blend into same-photo blurred ambience. Reduced motion and Save-Data remove the pin and show three ordinary-flow 16:10 scenes with readable titles. Workflow and Experience rows span the viewport; desktop copy aligns to the 1060px reading container. Their device objects hide at 1024px and below. Five certificates use a centered coverflow. Four experience entries form an exclusive native-details list. There is no Education section.

## Elevation & Depth

Depth comes from portrait overlap, dark tonal surfaces, modal backdrops, photographic service layers, coverflow transforms and the original procedural Workflow laptop and Experience keyboard. About preview uses `0 20px 40px #0008`; device fallback `0 30px 50px #0008`; certificate cards `0 25px 45px #0005`. Native viewers use translucent dark surfaces and backdrop blur for functional separation.

**The Structural Depth Rule.** Reserve shadows and dimensional transforms for previews, device scenes, coverflow and modal layers; ordinary text rows remain flat.

## Shapes

Hairlines structure open lists. Menu, close and directional controls are circular; chips and filled actions use pill silhouettes. Media have small rounded corners; contribution and certificate cards are gently rounded; native viewers use the larger dialog radius. Contact inputs are square, transparent and underlined. The drawer has a temporary curved entry edge that settles to a straight panel. Floating project previews are frameless 380×214px image crops with zero corner radius; service expansion moves from 24px corners to square edges. Stack category cards use the stack radius and a subtle masked grid texture. Reference action pills use the reference-pill radius. The page curtain rounds its moving edge only during travel.

## Components

### Buttons

The home Contact and library actions use dark reference pills with white text, thin borders and a caramel circular fill on hover/focus. The separate conversational form uses an outlined pill whose caramel fill grows horizontally; its arrow shifts diagonally on hover. Project live links use white pills with dark text and become caramel on hover. The incumbent filled primary variant remains available. Outline retry controls use the same accent relationship. Circular carousel controls fill with caramel on hover. Buttons and links show a 2px caramel focus outline with 6px offset. Disabled controls reduce opacity; submission states use distinct success/error colors.

### Inputs / Fields

The separate contact.html form presents five conversational label/input pairs: required name, email and message, plus optional company and service. Desktop labels use uppercase fluid 20–36px type beside transparent underlined fields; at 768px and below fields stack, with phone labels at 20px. Inputs use 17–20px text, a 40px minimum height and caramel underline/shadow focus; the textarea grows from one row with a 350px maximum height. Real labels stay associated with fields, and status is politely announced.

Preserve Web3Forms configuration, hidden honeypot, pending duplicate guard, 15-second timeout, provider success validation, value retention on failure and reset only on confirmed success. Pending disables fields and submission; subsequent editing clears the prior status. The unavailable-provider fallback opens an email draft and retains text. Verification must intercept delivery rather than send real messages.

### Navigation

The maker link and circular menu sit above the page. A native dialog slides from the right with a temporary curved edge and staggered large links. Caramel, a small round marker and a vertical label roll indicate hover/current section. Labels use 500 weight and a 0.38s roll. Opening traps focus and locks page scroll; closing first sends labels downward, then slides the panel out after a 0.2s delay. The 0.45s panel exit completes the two-phase close at 650ms; reduced motion and Save-Data close immediately. Closing restores focus and scroll. Phones receive a full-width drawer.

### Chips

The homepage shows all33 original-color tool chips in a160s marquee with a View All link. stack.html contains all33 tools in six semantic category cards, including AI and merged Design & Programming. Cards have caramel uppercase headings, a dark ground, subtle grid texture and softly inset illumination; hover strengthens the border and shadow. The library uses three columns above 768px, two from 481–768px and one at 480px and below. Tool pills retain original logos, use small bordered translucent fills and scale slightly on hover. These identify tools; they are not filter selections.

### Project and experience rows

Homepage projects use open hairline rows that navigate to their dedicated case-study route; live actions remain inside project pages. On desktop hover/focus, the title moves 24px left and the category moves 24px right, both white; other hovered-list rows dim. The supplemental pointer-follow preview is a frameless 380×214px image crop that scales in over 0.7s and shifts its image strip in 214px increments over 0.55s when the active project changes. Tablet and phone thumbnails and dedicated galleries carry the same media. CPC dashboard screens belong inside its gallery, with privacy notice retained. Experience details open exclusively without plus symbols; expanded copy remains soft and readable. Hover/focus reveals a full-width white band outward from its center over 0.85s, with black title/preview copy above the device object.

### Service and workflow scenes

Services share one reversible entrance/wipe timeline across desktop, tablet and phone: scale 0.72 to 1 over the first timeline unit, image counter-scaling, then two upward wipes over 1.2 units each. Desktop uses one viewport height per unit and opposing 18% media parallax; compact scenes use shorter units and one-third of that media movement. Late masked-letter title reveals and a continuous caramel pagination pill follow progress. Number controls support smooth 01–03 jumps and have 44px touch height. Reduced motion and Save-Data show all three scenes statically.

The three service scenes use the user's selected original generated photographs: front-facing Midnight for UI/UX Design, right-facing Night Window for Web Development, and Prototype Lab for Prototyping. They replace the reference-derived photos. Above 1024px, retain the complete original 16:9 photographs with contain framing against black at 0.9 scale. Animated compact scenes contain the wide sharp photograph and feather its edges into blurred ambience cloned from that same approved image. Reduced-motion/Save-Data scenes use ordinary-flow 16:10 panels. Each shipping WebP has an adjacent full prompt/origin sidecar and embedded provenance. This presentation adds no raster assets; the hero portrait is unchanged.

Only Workflow and Experience use self-hosted Three.js with original procedural geometry, metallic surfaces, lighting and existing project textures. Workflow has a laptop with the original NBJ orbital screen; Experience has a keyboard with a shared key-legend atlas. Both rotate across three axes with section scroll, interpolate toward the pose by 0.08 per rendered frame, and support raycast-targeted pointer drag at 0.007 radians per pixel with pitch clamped to ±0.85 radians. They are adaptations rather than exact reference meshes. The reference MacBook GLB metadata identifies a Sketchfab Standard license, so it is not treated as a freely reusable asset. The photographic service edits carry their own provenance; other existing raster provenance remains unchanged.

Import occurs near scenes; rendering caps pixel ratio at 1.5 and motion around 30fps and pauses offscreen. Original static media remain available when WebGL fails. Save-Data skips WebGL; reduced motion renders a static scene. These safeguards do not establish measured performance on physical phones.

Workflow’s AI, Code and Workflow titles fill with scroll. Hover/focus and the persistent open state reveal the same center-out white band as Experience, with black title and description; desktop rows retain their height and keep descriptions above the device. Native touch/keyboard buttons expose descriptions through aria-expanded and aria-controls. At 1024px and below, expanded descriptions flow below their trigger.

### Contribution calendar

A rounded bordered frame contains the seven-row grid, month/day labels, level legend, source and status. Real Josh-L30 activity arrives through a same-origin cached endpoint. A verified dated snapshot stays labeled when live data cannot load; unavailable states retain the source and retry action.

### Certificates and viewers

Five original certificates form a coverflow. Only the current card is interactive; arrows, selection dots, keyboard and horizontal swipe change selection while vertical page scrolling stays available. Do not auto-advance. Native certificate and image viewers support Escape, focus restoration and nested scroll handling. The superseded in-page project-detail overlay is removed.

### Dedicated project and library pages

project.html?project=id keeps four project families and uses a sticky 320px desktop sidebar beside ordered, full-width screenshots. The sidebar carries breadcrumbs, factual description, metadata, original-color tool badges, live link or CPC privacy note, without an expandable story. It narrows to 280px at 1100px and below, then becomes ordinary flow at 900px and below. CPC includes 13 unique screens from its combined galleries; privacy still prevents a public live action. works.html is a four-project overview, with two columns becoming one on phones.

Screenshot triggers open a native enlarged-image dialog with its close control on the right, original-aspect imagery and a thumbnail filmstrip. Preserve arrow keys, Escape, focus trapping/restoration and nested-scroll behavior.

The next-project ending has an oversized 48–92px title and a centered preview pocket at most 680px wide. Above 768px with hover and motion available, its 135px preview grows upward to 220px on hover or keyboard focus, the title dims to 0.15 opacity and a 78px caramel Next badge follows fine-pointer input. The layout retains its compact pocket during expansion. Touch/mobile, reduced motion and static mode retain a complete static preview. The next URL and All Works action remain native links.

### Contact stage and footer

The home CTA uses a centered large General Sans statement with a caramel accent in the same General Sans family and weight. Words fill and sharpen reversibly as the statement enters view; reduced motion and Save-Data show the complete unblurred title. The radial-fill pill leads to contact.html. The footer follows a conversation heading with three contact columns, then a divider and time/legal row, and an oversized owner name. Columns collapse responsively and the name remains contained.

### Motion

Internal page links use a curved labeled curtain: 0.85s cover followed by a 0.9s arrival reveal, both with cubic-bezier(0.76, 0, 0.24, 1). Native modifier-click, downloads, new-tab and external links bypass interception. Reduced motion and Save-Data use native navigation; browser back restores a clear page.

Entry uses the shared easing; menu movement uses its own easing. About fill is measured from responsive rendered lines, section titles reveal through letter masks, and previews use available pointer input. The row reveal uses cubic-bezier(0.16, 1, 0.3, 1). Reduced motion and Save-Data disable continuous movement and restore complete readable content.

Optional dynamically imported, self-hosted MIT Lenis 1.3.27 supplies desktop wheel inertia only for hover-capable viewports above 1024px: duration 1.6s, exponential easing and wheel multiplier 1.2. Navigation uses 1.5s. Touch remains native; reduced motion and Save-Data skip activation. Native dialogs stop/resume the controller and prevent nested scroll interception. Failure to import preserves native scrolling. Vendor code is assets/vendor/lenis.module.js; supporting styles are css/lenis.css and integration is js/smooth-scroll.js. Scene implementation is in css/scenes.css, js/services.js, js/scene-timeline.js, js/devices.js, js/motion.js and js/script.js. Dedicated pages and shared behavior use css/pages.css with js/site-utils.js, js/contact-form.js, js/media-viewer.js, js/page-transitions.js, js/contact-stage.js and js/detail-pages.js.

The header mark is a white six-face CSS3D cube using straightened textures from the original NBJ mark, with perspective and shaded sides. Fine-pointer hover and keyboard focus rotate it over 0.9s; the cube fades over 0.3s after a 0.48s delay and the caramel full name enters after 0.46s (0.42s transform, 0.32s opacity). The cube returns with a 0.06s opacity delay; touch first tap reveals and second follows Home. Reduced motion removes spin and transitions. Preserve the original initials in its face textures.

The Selected Works hover is a frameless380×214px image crop; full row links open project views, which retain live links. Homepage project action links and experience plus signs are removed. The experience keyboard carries a single shared legend atlas. The workflow screen uses assets/workflow-logo-screen.svg (black ground, centered NBJ, restrained orbital geometry), in both WebGL and fallback. Featured tools move in a160s continuous marquee; pause onhover/focus and offscreen, wrap into a static full list for reduced motion/Save-Data. Visual replicas are hidden from accessibility APIs and inert. The three approved service photographs are shipping; the six earlier photo previews remain outside the shipping site.

The large Contact footer name is BRAD JOSH in warm white with a downward alpha fade. The cube retains its original face geometry and white faces; the revealed full-name wordmark is caramel. The Workflow screen mark is white, retaining its original geometry and black orbital background. The user retained the existing lower-right mobile CV position; five earlier options remain historical artifacts outside the shipping website.

Compact service motion shares desktop's entrance/wipe timeline. The sticky scene fills the viewport below the header (top=min(120px, header bottom+20px); scene height=max(120px,viewport−top−20px)). One sharp cover-fit photograph fills each compact scene; there is no blurred duplicate, feathered edge, inset photo frame, or letterbox. Adjacent planes share their edges during the two wipes. Compact photo height=min(track width/1.6, scene height), scroll unit=max(photo height,min(45vh,480px)), track height=scene height+3.4×scroll unit; desktop retains one viewport height per timeline unit with the existing440vh total track. Native vertical scrolling drives reversible progress. Navigation has44px touch controls and smooth01↔03 jumps. Reduced-motion/Save-Data uses ordinary16:10 flow and complete readable titles.

Current branding: original white six-face cube,0.9s spin,0.48s forward cube fade delay/0.06s return delay with0.3s opacity; caramel name enters after0.46s over0.32s opacity/0.42s transform. Workflow's same NBJ mark is white. The accepted CV position stays lower right.

## Do's and Don'ts

### Do:
- Do retain the centered portrait and single desktop name, with a complete static mobile name when motion is disabled.
- Do keep native buttons, details and dialogs with visible focus, Escape handling and focus restoration.
- Do keep original media and factual portfolio content intact.
- Do provide touch and keyboard equivalents for hover exploration.
- Do retain photographic service compositions with owner-screen provenance, and keep procedural 3D confined to Workflow and Experience.
- Do preserve all four project groups, CPC privacy, all 33 library tools and the contact delivery/error-retention contract.
- Do keep the accepted mobile CV action at the hero lower-right and clear of content.
- Do preserve the chosen reference’s section-heading treatment on this surface as an explicit user-pinned exception.

### Don't:
- Don't restore the superseded stacked outlined name, floating capsule navigation, orange theme or optional light theme.
- Don't replace General Sans as the display/body family or spread the contact-only DM Serif Text accent to other roles.
- Don't make the moving marquee the only way to read the owner’s name.
- Don't fabricate GitHub counts or hide a cached snapshot’s age.
- Don't turn the local section-label exception into a blanket rule for new surfaces.


## Accepted refinements — 10 November 2026

About uses nine caramel keywords (clear, useful, look, function, help, AI, learning, challenging, staying competitive), each with a short text-only message on mouse hover, keyboard focus or touch. The dark 280px message follows the pointer, stays within the viewport, and dismisses on Escape/outside tap. Previous photo previews are superseded.

Compact Experience and Workflow rows replace the label with a short explanation on a center-out white reveal. The row keeps its height; a second tap closes it, and another row closes the previous one. Native Experience details and named Workflow buttons retain keyboard semantics. Experience has no bullets and orders Checkpoint (2026), CPC lead (2025–26), CPC UI/UX (2025–26), CinemaBuddy (2024). Desktop keeps its existing hover layout with summarized descriptions.

Desktop features four project groups. Tablet/phone feature only Personal Portfolio and Checkpoint; All Works still opens all four. The supplied latest portfolio screenshot is the portfolio cover and gallery image. Approved Midnight, right-facing Night Window and Prototype Lab photos now show the supplied portfolio screenshot, supplied CPC screenshot, and CinemaBuddy-in-Figma screens respectively. Compact scenes fill below the header with one unframed photograph per plane; ordinary-flow static fallback remains.

Mobile marquee is BRAD JOSH NEBREJA at18s, with one accessible label and an aria-hidden exact duplicate. Tablet/phone secondary navigation groups Experience, Tech Stack, Contributions, Credentials horizontally on one line immediately above the socials. Compact drawers are up to600px wide; labels scale from11px to14px and retain44px touch height. GitHub social naming remains GitHub. The contact work accent uses the heading font family; home and Contact footers omit Privacy/Terms and Back to top controls. Privacy and Terms pages, footer links and their unused styles are removed throughout the project. View CV stays lower right.


## Compact laptop framing correction — 10 November 2026

Portrait viewports use dedicated2:3 editorial versions of the three approved scenes, with the whole laptop framed inside naturally extended room/desk photography. Landscape touch viewports use the original wide photographs. Desktop fine-pointer views retain the original photos and framing. Native picture source selection follows viewport orientation; reduced-motion/Save-Data explicitly select the original wide files for ordinary-flow cards.

Compact service media now has no overscan, no image scale, and no vertical media parallax. The card entrance and contiguous, reversible01–03 wipes remain. The sticky scene starts at the header bottom (capped120px) and fills the remaining height through the viewport bottom. Touch iPads above1024px use compact framing too, avoiding the desktop contain/0.9-scale black bands. Native Experience summary/list markers are explicitly suppressed, including Safari’s disclosure marker. This supersedes earlier compact cover-cropping and vertical menu instructions.


## iPad Pro1032px layout and scene pacing — 10 November2026

The compact row breakpoint is now1100px plus all coarse non-hover touch viewports, covering iPad Pro13 at1032×1376 and1376×1032. Both Experience and Workflow use the in-place touch descriptions; their desktop device art and expanded paragraphs are hidden. Experience ARIA visibility uses the same media query as CSS. The1032px row regression was caused by the older1024px cutoff, not remaining list items.

Service scroll units now span one full scene height on compact screens, matching desktop pacing (entrance1unit, then two upward slides of1.2units each). Native touch events drive the same reversible card transforms; responsive full-laptop pictures remain unchanged. Entry CSS URLs and the dynamically imported service module use ipad-motion-3 to refresh cached assets.


## Accepted covered-photo reveal on compact screens

The first laptop retains its existing scale entrance. Scenes2and3 keep their full photos stationary within the pinned viewport and are progressively uncovered bottom-to-top with an inset clip mask. Each later scene is stacked above the earlier one; the unmasked portion covers the previous photo. Scrolling upward reverses the same mask. This replaces the prior compact sliding-strip interpretation; desktop retains its existing translated cards and image parallax. No extra overscan, cropping, image scaling, framing or new photography is added. Number navigation, title choreography, scene-height pacing and reduced-motion/Save-Data fallback remain.


### Edge-to-edge laptop scenes

Compact laptop scenes now pin at viewport top0 and use the full innerHeight. The fixed navigation overlays the photograph; no header-height spacer or rectangular black band is reserved. First-scene scale entrance and scenes2/3 covered-photo masks remain.


### Compact top-edge reveal correction

Only the top edge of scenes2/3 is masked (8% maximum, capped64px). Incoming photos overlay the previous scene with a short upward slide; the outgoing photo remains underneath. Each transition takes0.6viewport of scrolling instead of1.2; first entrance stays1viewport. Total pinned scroll is2.2viewports instead of3.4. Navigation destinations use1,1.6,2.2units. Full-screen coverage, approved photo framing, desktop motion and reduced-motion fallback remain. This supersedes the earlier whole-photo compact mask.


### Stationary-photo correction for compact top-edge reveals

Photos2/3 now have zero translation throughout their transitions. Only the top inset cover animates (maximum8%/64px); the image and card bounds remain fixed at the viewport origin. A brief0.1viewport opacity blend introduces the incoming fixed image, avoiding a panel slide or full-height wipe. The narrow cover then clears within the retained0.6viewport reveal phase. First entrance, full-screen layout and desktop animation are unchanged. This supersedes the previous incoming-slide wording.


### Shared desktop edge choreography — supersedes compact mask experiments

All viewports now render the same serviceState card translations and inner media counter-motion. Each outgoing bottom edge and incoming top edge form one continuous boundary. The inner photo moves at0.712of the edge velocity, reproducing desktop parallax and the progressive reveal of the following photograph. Removed custom inset masks, opacity blends and fixed-card overrides. Compact still uses shorter0.6viewport transition distances and the original1viewport entrance.

To preserve the full laptop framing without black gaps, the compact media surface is160% high at top−30%, matching desktop’s motion surface. The photo inside is viewport-sized (62.5% of that surface) and centered at18.75%. The card clips the counter-moving photo, whose bounds cover every exposed part throughout either transition. Fullscreen pinning, approved responsive images, navigation and reduced-motion fallback remain.


### Immediate About messages

All nine highlighted About words show their full message synchronously on pointer entry, with no fade/slide entrance. Ongoing page scroll preserves the popup while its word remains hovered, retaining the latest pointer position. Keyboard focus, touch activation, Escape and outside dismissal remain.


## Reference mobile hero, stationary menu control and About entrance

Reference checked at390×844. Phone hero is90svh with650px minimum; portrait95% height. Bare subtitle uses26.5px General Sans400,1.4line-height, left20px and bottom270px with width fitting the owner’s longer copy (small-phone24px/bottom245px). It has no rectangular backing. Socials use30px icons,44px touch targets and55px center spacing, at bottom225px (195px below360px). Name sits bottom90px (60px small phone), with full-name groups and an aria-hidden duplicate. CV remains lower right within the hero.

Entrance uses the reference’s2s cubic-bezier(.2,.8,.2,1) upward perspective motion: header/portrait0delay, marquee entrance.35s, arrow/subtitle.4s, social icons.4/.5/.6/.7s. The independent18s marquee track begins immediately, including while its outer wrapper enters. Reduced motion and Save-Data restore readable static content. Static Tech Stack groups explicitly take available width so they wrap without horizontal overflow.

The native menu dialog is stationary. Only its new menu-surface and curve animate; the close control is outside that moving surface and aligned to the toggle’s exact bounds, accounting for scrollbar gutter and viewport resizing. Panel entry.85s; exit.45s after.2s content departure. Opening header animation runs only on the initial mobile entry and does not restart on resizing.

About messages start the reference-style scale0→1 pop synchronously on hover, with0s delay and.75s cubic-bezier(.76,0,.24,1). Text is not opacity-faded; pointer positioning eases over.1s. This latest visual request supersedes the earlier animation:none choice. Keyboard focus, touch, Escape, outside dismissal and hovered-word persistence during scroll remain.


### Menu icon morph

The two22×2px bars start4px above/below center, translate to the same center and rotate±45° over.4s cubic-bezier(.76,0,.24,1), matching the reference icon geometry/timing. Native-dialog close control uses the same two bars instead of a pre-drawn SVG X, aligned to the original button and animated after its base pose is committed. Close/Escape/navigation reverse the morph while the panel exits; the underlying header button returns to its two-line pose concurrently. Background and stroke colors ease with the icon. Reduced motion removes transitions.


### Full-width desktop laptop scenes

Removed the desktop photograph’s0.9scale and contained inset. Animated desktop scenes now use a viewport-sized, cover-fit photo centered in the existing160% counter-motion surface (top18.75%,height62.5%). Photos reach both scene edges without side gutters, while the same scale entrance and connected-edge/parallax transitions remain. Verified all three photos at1280,1440,1920and2560px widths.


### Header brand hover colors

Header cube stays white at rest, smoothly tints caramel #b87945 during the existing hover/focus/touch spin, and returns white on exit. The revealed full-name wordmark is white #fff. White face textures use multiply blending so the existing geometry and shading remain. Spin and name-reveal timings are unchanged. This supersedes the previous caramel-wordmark rule.


### Scroll-dismissed compact row fills

On tablet/mobile, an opened Experience or Workflow row closes when the page moves6px from its activation position. The existing white-fill transition retracts and restores the label. Taps stay open while stationary; tiny2px positioning jitter is ignored. Desktop behavior remains unchanged. The passive listener does not cancel scrolling or blur controls; native details and Workflow ARIA state reset together. Closed compact Experience rows cannot retain the white fill through focus-visible or hover. Verified both scroll directions, touch swipes, reduced motion and keyboard focus.


## 10 November: PraisePoint project

PraisePoint is the fifth Selected Works family and uses the existing desktop project row, All Works card, sticky project sidebar, pointer-follow View badge and image viewer. Its eight supplied screenshots retain their original colors; the login screenshot is the cover and first gallery image. Keep the compact homepage selection of Personal Portfolio and Checkpoint; All Works exposes all five projects at every size. React, TypeScript, Tailwind CSS, Vite, Supabase and Firebase use local original-color icons. TypeScript joins Frontend, bringing the library to 34 tools.
