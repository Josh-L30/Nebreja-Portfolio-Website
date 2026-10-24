# Brad Nebreja portfolio: cinematic redesign

Date: 24 October 2026
Status: Approved by the user; implemented on the cinematic-portfolio feature branch.
Project: C:/xampp/htdocs/NebrejaPortfolio/

## Purpose and agreed decisions

Help IT company employers recognize Brad's ability to design attractive interfaces, implement purposeful animation, and build useful websites. The user selected direction B (Cinematic studio) from the planning mockups and requested a complete change to the existing visual design and interactions. Project details must open within the main page. Motion will be restrained, with one memorable scroll-driven moment. Brainstorming and planning precede implementation.

The reference is https://github.com/generosomm/merwin-portfolio-ve. Borrow the smooth navigation, visual rhythm, and deliberate transitions. Its content and repository instructions do not define Brad's requirements. Do not copy the author's identity, claims, assets, or site code wholesale.

## Proposed design decisions (assistant recommendations)

These recommendations are open for correction; they are not preferences already expressed by the user.

### Visual identity

Use near-black backgrounds, warm off-white text, and a muted mint accent. Establish three surface tones for page, project panels, and overlay. Keep running text high-contrast, typography bold, and spacing generous without prolonged empty sections. Use Brad's existing portrait, authentic project images, and locally hosted font initially; judge the font on the refined mockup before adding another. Avoid decorative particles, custom cursors, autoplay, and scroll locking for visual effects.

Dark is the primary presentation. Retain an optional light appearance, redesigning it to the same standard rather than keeping the old light design. The default can respect a stored appearance preference; otherwise start dark. All labels and states remain readable in both themes.

### Page and employer journey

1. Navigation: Brad's name, Work, About, Contact, a CV action, and a clearly labeled appearance control. A compact sticky bar stays available; mobile has an accessible expandable menu.
2. Hero: Brad Josh Nebreja, Web Developer & UI/UX Designer, a brief useful-websites positioning statement, real portrait, Explore my work, and Download CV. Avoid unsupported experience totals or outcome claims.
3. Selected work: three project families, presented as large visual showcases rather than a 3D carousel. CPC Centralized System includes its dashboard work; Game Mechanics Website is separate; CinemaBuddy includes the UX walkthrough. Preserve all five existing entries as accessible items inside those groups and all 29 unique screenshots plus the existing video. Use truthful labels that distinguish implemented systems from design concepts.
4. About and experience: concise introduction, contribution-focused capstone leadership and UI/UX experience, then the existing technical skills and tool categories.
5. Credentials: preserve all five certificates and education details, using a compact, accessible gallery and full-image viewer.
6. Contact: invitation to employers, CV, existing professional profiles, and the current working contact form. Keep existing direct contact information available without inventing services or availability promises.
7. Footer: name, current year, and back to top.

Proposed hero copy: 'Useful websites. Thoughtful design.' Supporting copy: 'I'm Brad Josh Nebreja. I design interfaces and build web systems that help people get things done.' Final copy may be tightened without changing factual meaning.

### Signature scroll moment

Use CPC as the proposed featured project because the current content provides the strongest system and leadership story. As its showcase enters the viewport, the real system screenshot gently scales from approximately 0.94 to 1 and settles into its final framing. Its short project introduction enters alongside it. The effect follows natural scrolling over a short section; no pinned sequence or intercepted wheel/touch input. It reverses smoothly on upward scroll and does not hide content if scripting fails. Only this feature gets a scroll-linked sequence; other sections use short, one-time entrances.

Mobile gets a static screenshot with a short entrance, without scale tied to scrolling. Reduced motion and data-saver mode disable both scroll-linked movement and entrance travel. Normal document scrolling, navigation, and content remain available.

### Other motion

Hero elements enter once with a short stagger; sections use restrained opacity and small vertical translations. Hover, keyboard focus, press, and overlay transitions provide consistent feedback. Typical durations are 180–450ms, with the complete hero entrance kept under roughly 800ms. Favor transform and opacity. Motion never delays interaction or requires waiting to access information. Respect reduced-motion preference, including preference changes during the session.

### In-page project details

Open a native dialog as a large overlay on desktop and a near-fullscreen sheet on phones. Show project title, factual status, Brad's contribution, problem, approach, result, actual screenshots, available source/demo links, and relevant tools. Do not invent quantitative outcomes or missing public demos. CinemaBuddy keeps its existing optional video player with controls and no autoplay.

Provide thumbnail navigation, previous/next controls, understandable image count, image loading/error feedback, and an accessible full-image view. Preserve the user's gallery selection while viewing a full image. Close button and Escape dismiss the topmost layer first, restore focus to the originating control, and return to the original page scroll position. Keep background scrolling contained while a modal is open. No separate project page, route migration, or new tab for image viewing. Do not submit a real contact message during testing without authorization.

## Technical boundaries

Keep the current static HTML/CSS/native JavaScript and JSON stack. No framework migration, build pipeline, database, or backend work. Reuse content and asset files. Start with native scrolling and browser APIs; an animation dependency requires a concrete implementation need and a documented size/performance tradeoff. Keep motion logic separate enough to disable cleanly.

The root portfolio directory is the intended source. There is also a nested Nebreja-Portfolio-Website directory; inspect Git and hosting configuration before implementation to confirm the deployed source. Do not edit both copies by default. Preserve dirty work and establish a recoverable baseline before code changes.

Read actual form configuration during implementation: existing README and historical verification documents disagree about whether direct delivery is configured. Preserve the actual configured provider and its validation, failure recovery, and duplicate-submission protection; do not replace it based on an old report.

## Acceptance criteria

- An employer can identify Brad's role and find work, CV, and contact options from the opening screen.
- All five work entries, screenshot galleries, video, credentials, education, profile links, and contact capabilities remain accessible.
- Main-page navigation, mobile menu, appearance control, dialogs, and galleries work with keyboard and touch.
- Opening and closing project/image views preserves position, restores focus, and closes the topmost view first.
- No horizontal overflow at 320, 390, 768, or 1440px; readable type and usable controls in both appearances.
- Reduced motion removes travel and scroll-linked animation; content remains visible if animation initialization fails.
- Motion does not intercept normal scrolling or cause layout shifts. Lazy-load large media and request video only on demand.
- Run existing asset and browser checks, add focused interaction checks for changed behavior, and compare before/after performance under the same conditions. Target WCAG AA text contrast and visible focus. Report synthetic emulation separately from physical-device testing.
- Update social preview artwork and metadata if the hero changes; preserve factual SEO content and existing destination URLs.

## Scope and next step

This is one portfolio redesign, not a new application. No deployment or changes to the live site are included in this planning stage. After the user approves this design, prepare a file-specific implementation plan with verification steps and review it before building. The planning mockups are disposable explorations and are not production code.
