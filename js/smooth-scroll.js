// Match the reference's desktop wheel inertia; touch keeps native scrolling.
let Lenis;
let instance;
const reduced = matchMedia("(prefers-reduced-motion:reduce)");
const desktop = matchMedia("(hover:hover) and (min-width:1025px)");
export const scrollController = {
  stop() {
    instance?.stop();
  },
  start() {
    instance?.start();
  },
  to(top, options = {}) {
    if (instance) {
      // Fixed-body dialogs temporarily collapse the document's scroll limit.
      if (options.immediate) instance.resize();
      instance.scrollTo(top, { duration: 1.5, ...options });
    } else
      window.scrollTo({
        top,
        behavior: options.immediate || reduced.matches ? "instant" : "smooth",
      });
  },
};
export async function initSmoothScroll() {
  try {
    ({ default: Lenis } = await import("../assets/vendor/lenis.module.js"));
  } catch {
    return;
  }
  function sync() {
    const allowed =
      desktop.matches && !reduced.matches && !navigator.connection?.saveData;
    if (!allowed) {
      instance?.destroy();
      instance = null;
      return;
    }
    if (instance) return;
    instance = new Lenis({
      autoRaf: true,
      duration: 1.6,
      lerp: 0,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      wheelMultiplier: 1.2,
      syncTouch: false,
      prevent: (node) =>
        document.body.classList.contains("modal-open") ||
        Boolean(node.closest("dialog,[data-lenis-prevent]")),
    });
    if (document.body.classList.contains("modal-open")) instance.stop();
  }
  reduced.addEventListener("change", sync);
  desktop.addEventListener("change", sync);
  navigator.connection?.addEventListener("change", sync);
  window.addEventListener("pagehide", () => instance?.destroy(), {
    once: true,
  });
  sync();
}
