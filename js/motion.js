// Optional browser-native motion. Content and controls work without this module.
const roots = new WeakMap();
const clamp = (value) => Math.min(1, Math.max(0, value));
export function sceneProgress(top, height) {
  return clamp((height * 0.85 - top) / (height * 0.65));
}
export function wordProgress(top, height, textHeight = 0, type = "heading") {
  const range =
    type === "statement"
      ? Math.max(height * 0.62, textHeight * 0.9)
      : height * 0.37;
  return clamp((height * (type === "statement" ? 0.9 : 0.92) - top) / range);
}
export function wordExitProgress(bottom, height) {
  return clamp((height * 0.2 - bottom) / (height * 0.2 + 80));
}

export function initMotion(root = document) {
  roots.get(root)?.();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const allowed = () => !reduced.matches && !navigator.connection?.saveData;
  const titleTargets = [...root.querySelectorAll(".reveal-title")];
  const copies = [...root.querySelectorAll(".scroll-copy")];
  const fills = [...root.querySelectorAll(".scroll-fill")];
  const laptop = root.querySelector(".mini-laptop");
  const workflow = root.querySelector(".workflow-stage");
  const listenerCleanups = [];
  let frame = 0;

  function splitWords(element) {
    if (element.dataset.wordsReady) return;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    let index = 0;
    nodes.forEach((text) => {
      const fragment = document.createDocumentFragment();
      text.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) fragment.append(document.createTextNode(part));
        else {
          const span = document.createElement("span");
          span.className = "word";
          span.textContent = part;
          span.style.setProperty("--i", String(index++));
          fragment.append(span);
        }
      });
      text.replaceWith(fragment);
    });
    element.dataset.wordsReady = "true";
  }
  [...titleTargets, ...copies].forEach(splitWords);
  titleTargets.forEach((title) => {
    if (title.dataset.lettersReady) return;
    let index = 0;
    title.querySelectorAll(".word").forEach((word) => {
      const letters = [...word.textContent].map((character) => {
        const span = document.createElement("span");
        span.className = "letter";
        span.textContent = character;
        span.style.setProperty("--letter-index", String(index++));
        return span;
      });
      word.replaceChildren(...letters);
    });
    title.dataset.lettersReady = "true";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) =>
        entry.target.classList.toggle(
          "in-view",
          entry.isIntersecting || entry.boundingClientRect.top < 0,
        ),
      );
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  titleTargets.forEach((target) => observer.observe(target));

  function paint() {
    frame = 0;
    if (document.hidden || document.body.classList.contains("modal-open"))
      return;
    const height = innerHeight;
    const enabled = allowed();
    const hero = root.querySelector(".hero");
    if (hero) {
      const travel = enabled ? Math.min(scrollY, hero.offsetHeight) : 0;
      hero.style.setProperty("--hero-shift", -travel * 0.4 + "px");
      hero.style.setProperty("--copy-shift", -travel * 0.28 + "px");
      hero.style.setProperty("--portrait-scroll", travel * 0.15 + "px");
      root
        .querySelector(".fixed-cv")
        ?.classList.toggle(
          "is-past-hero",
          hero.getBoundingClientRect().bottom < 160,
        );
    }
    copies.forEach((copy) => {
      const rect = copy.getBoundingClientRect();
      const words = [...copy.querySelectorAll(".word")];
      const start = height * (innerWidth > 1024 ? 0.88 : 0.85);
      const end = height * (innerWidth > 1024 ? 0.4 : 0.45);
      const progress = clamp((start - rect.top) / (start - end));
      const lines = [];
      words.forEach((word) => {
        const top = Math.round(word.getBoundingClientRect().top);
        let line = lines.find((line) => Math.abs(line.top - top) < 3);
        if (!line) {
          line = { top, words: [] };
          lines.push(line);
        }
        line.words.push(word);
      });
      lines.forEach((line, index) => {
        const first = line.words[0].getBoundingClientRect(),
          last = line.words.at(-1).getBoundingClientRect();
        const edge =
          first.left +
          (last.right - first.left) * clamp(progress * lines.length - index);
        line.words.forEach((word) => {
          const r = word.getBoundingClientRect();
          word.style.setProperty(
            "--word-fill",
            enabled ? clamp((edge - r.left) / r.width) * 100 + "%" : "100%",
          );
          word.style.setProperty("--word-opacity", "1");
        });
      });
    });
    fills.forEach((fill) =>
      fill.style.setProperty(
        "--fill",
        enabled
          ? wordProgress(fill.getBoundingClientRect().top, height) * 100 + "%"
          : "100%",
      ),
    );
    if (laptop && workflow) {
      const rect = workflow.getBoundingClientRect();
      const progress = sceneProgress(rect.top, height);
      laptop.style.transform = enabled
        ? `rotateX(-12deg) rotateY(${-30 + progress * 25}deg) rotateZ(${12 - progress * 16}deg)`
        : "rotateX(-10deg) rotateY(-20deg)";
    }
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(paint);
  }
  function sync() {
    root.documentElement?.classList.toggle("motion-ready", allowed());
    root.documentElement?.toggleAttribute("data-motion-static", !allowed());
    if (!allowed())
      titleTargets.forEach((target) => target.classList.add("in-view"));
    schedule();
  }
  function listen(target, name, fn, options) {
    target.addEventListener(name, fn, options);
    listenerCleanups.push(() => target.removeEventListener(name, fn, options));
  }
  listen(window, "scroll", schedule, { passive: true });
  listen(window, "resize", schedule, { passive: true });
  listen(document, "visibilitychange", schedule);
  listen(reduced, "change", sync);
  if (navigator.connection) listen(navigator.connection, "change", sync);
  root.querySelectorAll(".magnetic").forEach((element) => {
    listen(element, "pointermove", (event) => {
      if (!allowed() || event.pointerType !== "mouse") return;
      const rect = element.getBoundingClientRect();
      element.style.translate = `${(event.clientX - rect.left - rect.width / 2) * 0.16}px ${(event.clientY - rect.top - rect.height / 2) * 0.2}px`;
    });
    listen(element, "pointerleave", () => {
      element.style.translate = "";
    });
  });
  const hero = root.querySelector(".hero");
  if (hero) {
    listen(hero, "pointermove", (event) => {
      if (!allowed() || event.pointerType !== "mouse") return;
      hero.style.setProperty(
        "--portrait-x",
        (event.clientX / innerWidth - 0.5) * 15 + "px",
      );
    });
    listen(hero, "pointerleave", () =>
      hero.style.setProperty("--portrait-x", "0px"),
    );
  }
  sync();
  document.documentElement.dataset.wordMotion = "ready";
  const cleanup = () => {
    observer.disconnect();
    listenerCleanups.forEach((fn) => fn());
    if (frame) cancelAnimationFrame(frame);
    root.documentElement?.classList.remove("motion-ready");
  };
  roots.set(root, cleanup);
  return cleanup;
}
