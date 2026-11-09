// A single pointer-only badge shared by gallery images and Works previews.
export function initViewCursor() {
  const targets = document.querySelectorAll(".project-shot, .work-card-media");
  if (!targets.length) return;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const badge = document.createElement("div");
  badge.className = "view-cursor";
  badge.setAttribute("aria-hidden", "true");
  const label = document.createElement("span");
  label.textContent = "View";
  badge.append(label);
  document.body.append(badge);
  let x = 0,
    y = 0,
    targetX = 0,
    targetY = 0,
    textX = 0,
    textY = 0,
    frame = 0;
  const draw = () => {
    frame = 0;
    x += (targetX - x) * (reduced.matches ? 1 : 0.15);
    y += (targetY - y) * (reduced.matches ? 1 : 0.15);
    textX += ((targetX - x) * 0.35 - textX) * 0.16;
    textY += ((targetY - y) * 0.35 - textY) * 0.16;
    badge.style.left = `${x}px`;
    badge.style.top = `${y}px`;
    label.style.transform = reduced.matches
      ? ""
      : `translate(${textX}px, ${textY}px)`;
    if (
      Math.abs(targetX - x) +
        Math.abs(targetY - y) +
        Math.abs(textX) +
        Math.abs(textY) >
      0.1
    )
      frame = requestAnimationFrame(draw);
  };
  const hide = () => {
    badge.classList.remove("is-visible");
    cancelAnimationFrame(frame);
    frame = 0;
  };
  const move = (event) => {
    if (
      !finePointer.matches ||
      event.pointerType !== "mouse" ||
      document.body.classList.contains("modal-open")
    )
      return;
    targetX = event.clientX;
    targetY = event.clientY;
    if (!badge.classList.contains("is-visible")) {
      x = targetX;
      y = targetY;
      textX = textY = 0;
      badge.classList.add("is-visible");
    }
    if (!frame) draw();
  };
  targets.forEach((target) => {
    target.addEventListener("pointerenter", move);
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerleave", hide);
    target.addEventListener("pointerdown", hide);
    target.addEventListener("click", hide);
  });
  window.addEventListener("scroll", hide, { passive: true });
  window.addEventListener("blur", hide);
  document.addEventListener("visibilitychange", hide);
  finePointer.addEventListener("change", hide);
}
