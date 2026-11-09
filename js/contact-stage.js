export function initContactStage() {
  const title = document.querySelector(".contact-scroll-title");
  if (!title) return;
  const texts = [],
    walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) texts.push(walker.currentNode);
  const words = [];
  let total = 0;
  texts.forEach((text) => {
    const fragment = document.createDocumentFragment();
    text.textContent.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        fragment.append(document.createTextNode(part));
        return;
      }
      const word = document.createElement("span");
      word.className = "word";
      word.textContent = part;
      word.dataset.start = total;
      total += part.length + 1;
      word.dataset.end = total - 1;
      words.push(word);
      fragment.append(word);
    });
    text.replaceWith(fragment);
  });
  const reduced = matchMedia("(prefers-reduced-motion:reduce)");
  let frame = 0;
  function paint() {
    frame = 0;
    if (document.body.classList.contains("modal-open")) return;
    const start = innerHeight * (innerWidth <= 768 ? 0.85 : 0.88),
      end = innerHeight * (innerWidth <= 768 ? 0.5 : 0.35);
    const p = Math.max(
      0,
      Math.min(1, (start - title.getBoundingClientRect().top) / (start - end)),
    );
    const enabled = !reduced.matches && !navigator.connection?.saveData;
    words.forEach((word) => {
      const a = Number(word.dataset.start) / total,
        b = Number(word.dataset.end) / total,
        reveal = enabled ? Math.max(0, Math.min(1, (p - a) / (b - a))) : 1;
      word.style.setProperty("--cta-position", (1 - reveal) * 100 + "%");
      word.style.setProperty("--cta-blur", (1 - reveal) * 6 + "px");
    });
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(paint);
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  reduced.addEventListener("change", schedule);
  navigator.connection?.addEventListener("change", schedule);
  paint();
}
