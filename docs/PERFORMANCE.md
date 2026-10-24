# Cinematic redesign performance record

24 October 2026. Earlier Lighthouse scores described a previous visual design and are not performance evidence for this redesign.

The redesigned site adds no runtime dependency or build process. It retains one locally hosted font and existing responsive WebP previews. Original images load only through galleries; video remains preload none, opt-in, and released when its dialog closes. Image boxes reserve dimensions. The native motion module uses one-time IntersectionObservers, one near-viewport signature scene, and at most one scheduled animation frame; it has no continuous idle animation loop. Reduced-motion/Save-Data disable travel, including CSS dialog entrances.

Local verification used the in-app Chromium browser. Both themes fit at 320/390/768/1440px; text enlargement, nested dialogs, failed images, and motion fallbacks pass. Browser rendering and smooth interaction were visually checked. This is viewport emulation, not physical-device or field evidence.

The standalone headless Chrome/Edge inspector was attempted but failed with browser/CDP timeouts. Lighthouse is not installed and no new Lighthouse score, throttled LCP/CLS, or guaranteed frame rate is claimed. Before public release, run Lighthouse against this version under a documented mobile throttle and test on a real phone. Targets from the approved plan remain LCP <=2.5s, CLS <=.1, and mobile Lighthouse performance >=90; these targets are not measured results.

Contact-provider response cases were intercepted locally; no real network message or inbox-delivery verification was performed. Public deployment was not changed.
