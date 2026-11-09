import { scrollController } from "./smooth-scroll.js";
import { clamp, serviceState } from "./scene-timeline.js";
export function initServices() {
  const section = document.querySelector(".services"),
    track = section.querySelector(".service-track");
  const cards = [...section.querySelectorAll(".service-card")],
    nav = section.querySelector(".service-pagination");
  const links = [...nav.querySelectorAll("a")],
    reduced = matchMedia("(prefers-reduced-motion:reduce)"),
    desktop = matchMedia("(min-width:1025px)");
  let frame = 0;
  const enabled = () => !reduced.matches && !navigator.connection?.saveData;
  function metrics() {
    const compact = !desktop.matches;
    const top = compact
      ? Math.min(
          120,
          (document.querySelector(".site-header")?.getBoundingClientRect()
            .bottom || 76) + 20,
        )
      : 0;
    const sceneHeight = compact
      ? Math.max(120, innerHeight - top - 20)
      : innerHeight;
    const photoHeight = Math.min(track.clientWidth / 1.6, sceneHeight);
    const unit = compact
      ? Math.max(photoHeight, Math.min(innerHeight * 0.45, 480))
      : innerHeight;
    return { compact, top, sceneHeight, photoHeight, unit };
  }
  const letters = cards.map((card) => {
    const ambience = document.createElement("div");
    ambience.className = "service-ambience";
    ambience.setAttribute("aria-hidden", "true");
    const background = card.querySelector(".service-media img").cloneNode();
    background.alt = "";
    ambience.append(background);
    card.prepend(ambience);
    const title = card.querySelector("h3"),
      text = title.textContent;
    title.setAttribute("aria-label", text);
    title.replaceChildren();
    const all = [];
    text.split(" ").forEach((word) => {
      const mask = document.createElement("span");
      mask.className = "service-title-word";
      mask.setAttribute("aria-hidden", "true");
      [...word].forEach((character) => {
        const letter = document.createElement("span");
        letter.className = "service-letter";
        letter.textContent = character;
        mask.append(letter);
        all.push(letter);
      });
      title.append(mask);
    });
    return all;
  });
  function paint() {
    frame = 0;
    const pinned = enabled(),
      { compact, top, sceneHeight, photoHeight, unit } = metrics();
    section.style.setProperty("--service-scene-height", sceneHeight + "px");
    section.style.setProperty("--service-photo-height", photoHeight + "px");
    section.style.setProperty(
      "--service-track-height",
      sceneHeight + unit * 3.4 + "px",
    );
    section.style.setProperty("--service-sticky-top", top + "px");
    section.classList.toggle("is-animated", pinned);
    const height = innerHeight,
      rect = track.getBoundingClientRect(),
      state = serviceState((top - rect.top) / (unit * 3.4));
    cards.forEach((card, index) => {
      const media = card.querySelector(".service-media");
      if (pinned) {
        card.style.transform = `translateY(${state.y[index]}%) scale(${index === 0 ? state.scale : 1})`;
        card.style.borderRadius = index === 0 ? state.radius + "px" : "0";
        media.style.transform = `translateY(${state.mediaY[index] * (compact ? 1 / 3 : 1)}%) scale(${index === 0 ? state.mediaScale : 1})`;
        card.style.pointerEvents = state.active === index ? "auto" : "none";
        letters[index].forEach((letter, i) => {
          const p = clamp((state.titles[index] - i * 0.007) / 0.25),
            ease = 1 - (1 - p) ** 2;
          letter.style.transform = `translateY(${125 * (1 - ease)}%) rotate(${15 * (1 - ease)}deg)`;
        });
      } else {
        card.style.transform = "";
        card.style.borderRadius = "";
        card.style.pointerEvents = "";
        media.style.transform = "";
        letters[index].forEach((letter) => {
          letter.style.transition = "none";
          letter.style.transform = "none";
        });
      }
    });
    nav.style.setProperty("--indicator", state.indicator);
    nav.style.transform = `translateY(${-(compact ? sceneHeight * 0.08 + 12 : height * 0.14 + 24) * (1 - clamp(state.t))}px)`;
    links.forEach((link, i) =>
      i === state.active
        ? link.setAttribute("aria-current", "step")
        : link.removeAttribute("aria-current"),
    );
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(paint);
  }
  links.forEach((link, i) =>
    link.addEventListener("click", (event) => {
      if (!enabled()) return;
      event.preventDefault();
      const { top, unit } = metrics();
      scrollController.to(
        scrollY +
          track.getBoundingClientRect().top +
          [1, 2.2, 3.4][i] * unit -
          top,
      );
    }),
  );
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  reduced.addEventListener("change", schedule);
  navigator.connection?.addEventListener("change", schedule);
  paint();
}
