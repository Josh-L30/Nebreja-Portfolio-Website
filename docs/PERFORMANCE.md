# Scroll motion and performance verification

Local Lighthouse 13.5.0 in headless Microsoft Edge against the HTTP-served repository, cold navigation. Standard Lighthouse mobile simulated throttling and desktop preset, separate sequential runs. These are synthetic measurements, not physical-device or field guarantees.

| Run | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile before | 75 | 100 | 96 | 100 | 2.3 s | 0.55 | 0 ms |
| Mobile after | 99 | 100 | 100 | 100 | 1.8 s | 0.003 | 0 ms |
| Desktop after | 100 | 100 | 100 | 100 | 0.5 s | 0 | 0 ms |

Changes target measured issues: consolidate identical weight files into one preloaded variable font; preload content JSON; reserve async-component layout space; responsive certificate and portrait images; tiny certificate-picker previews; local favicon; visible-number accessible names. Large original images and video remain on demand. Source files stay readable rather than adding a build step for a small minification saving.

Scroll entrances use one IntersectionObserver with transform/opacity keyframes lasting 360ms. Each target is unobserved on first intersection; its animation class is removed on completion. Content is never hidden pending JavaScript. Reduced-motion and Save-Data users skip entrances. No scroll handler, requestAnimationFrame loop, WebGL or animation dependency is added.

With 4x CPU slowdown in local Edge viewport emulation, mobile and desktop each recorded 15 distinct one-time reveal events, no repeated event on revisiting, zero idle animations and no horizontal overflow. Reduced-motion and Save-Data modes recorded zero reveal events. This proves the implementation behavior, not a universal frame-rate guarantee.

Existing 320/390/768/1440px component checks and 390/1440px full-image-dialog checks pass. Contact endpoint remains null; no message is sent. Only the theme preference is stored locally; no analytics, tracking or backend was introduced. Production delivery is verified separately after pushing. Full Lighthouse HTML/JSON reports are kept with the conversation outputs.
