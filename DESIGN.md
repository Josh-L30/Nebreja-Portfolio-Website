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

- **Display:** frontmatter describes the desktop name. Mobile uses a22s seamless27vw BRAD JOSH marquee with an aria-hidden duplicate (one centered13.6vw name under reduced motion or Save-Data), and hides the narrative subtitle. Desktop places the two words at the outer sides of an 80% width line so the portrait only overlaps an inner letter edge.
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

The home CTA uses a centered large General Sans statement with one italic caramel DM Serif Text accent. Words fill and sharpen reversibly as the statement enters view; reduced motion and Save-Data show the complete unblurred title. The radial-fill pill leads to contact.html. The footer follows a conversation heading with three contact columns, then a divider and time/legal row, and an oversized owner name. Columns collapse responsively and the name remains contained.

### Motion

Internal page links use a curved labeled curtain: 0.85s cover followed by a 0.9s arrival reveal, both with cubic-bezier(0.76, 0, 0.24, 1). Native modifier-click, downloads, new-tab and external links bypass interception. Reduced motion and Save-Data use native navigation; browser back restores a clear page.

Entry uses the shared easing; menu movement uses its own easing. About fill is measured from responsive rendered lines, section titles reveal through letter masks, and previews use available pointer input. The row reveal uses cubic-bezier(0.16, 1, 0.3, 1). Reduced motion and Save-Data disable continuous movement and restore complete readable content.

Optional dynamically imported, self-hosted MIT Lenis 1.3.27 supplies desktop wheel inertia only for hover-capable viewports above 1024px: duration 1.6s, exponential easing and wheel multiplier 1.2. Navigation uses 1.5s. Touch remains native; reduced motion and Save-Data skip activation. Native dialogs stop/resume the controller and prevent nested scroll interception. Failure to import preserves native scrolling. Vendor code is assets/vendor/lenis.module.js; supporting styles are css/lenis.css and integration is js/smooth-scroll.js. Scene implementation is in css/scenes.css, js/services.js, js/scene-timeline.js, js/devices.js, js/motion.js and js/script.js. Dedicated pages and shared behavior use css/pages.css with js/site-utils.js, js/contact-form.js, js/media-viewer.js, js/page-transitions.js, js/contact-stage.js and js/detail-pages.js.

The header mark is a white six-face CSS3D cube using straightened textures from the original NBJ mark, with perspective and shaded sides. Fine-pointer hover and keyboard focus rotate it over 0.9s; the cube fades over 0.3s after a 0.48s delay and the caramel full name enters after 0.46s (0.42s transform, 0.32s opacity). The cube returns with a 0.06s opacity delay; touch first tap reveals and second follows Home. Reduced motion removes spin and transitions. Preserve the original initials in its face textures.

The Selected Works hover is a frameless380×214px image crop; full row links open project views, which retain live links. Homepage project action links and experience plus signs are removed. The experience keyboard carries a single shared legend atlas. The workflow screen uses assets/workflow-logo-screen.svg (black ground, centered NBJ, restrained orbital geometry), in both WebGL and fallback. Featured tools move in a160s continuous marquee; pause onhover/focus and offscreen, wrap into a static full list for reduced motion/Save-Data. Visual replicas are hidden from accessibility APIs and inert. The three approved service photographs are shipping; the six earlier photo previews remain outside the shipping site.

The large Contact footer name is BRAD JOSH in warm white with a downward alpha fade. The cube retains its original face geometry and white faces; the revealed full-name wordmark is caramel. The Workflow screen mark is white, retaining its original geometry and black orbital background. The user retained the existing lower-right mobile CV position; five earlier options remain historical artifacts outside the shipping website.

Compact service motion shares desktop's entrance/wipe timeline. The sticky scene fills the viewport below the header (top=min(120px, header bottom+20px); scene height=max(120px,viewport−top−20px)). The sharp selected photo uses its wide contained frame, with feathered edges into a static blurred same-photo ambience filling the surrounding scene. Compact photo height=min(track width/1.6, scene height), scroll unit=max(photo height,min(45vh,480px)), track height=scene height+3.4×scroll unit; desktop retains one viewport height per timeline unit with the existing440vh total track. Native vertical scrolling drives reversible progress. Navigation has44px touch controls and smooth01↔03 jumps. Reduced-motion/Save-Data uses ordinary16:10 flow and complete readable titles.

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
