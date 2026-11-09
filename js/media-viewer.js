import { node, fillImage } from "./site-utils.js";
import { scrollController } from "./smooth-scroll.js";
const layers = [];
export function beginLayer(modal, trigger) {
  if (layers.some((layer) => layer.modal === modal)) return;
  if (!layers.length) {
    scrollController.stop();
    document.body.dataset.lockY = String(scrollY);
    document.body.style.setProperty("--locked-top", `-${scrollY}px`);
    document.body.classList.add("modal-open");
  }
  layers.push({ modal, trigger });
}
export function endLayer(modal) {
  const index = layers.findIndex((layer) => layer.modal === modal);
  if (index < 0) return;
  const [layer] = layers.splice(index, 1);
  if (!layers.length) {
    const y = Number(document.body.dataset.lockY || 0);
    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("--locked-top");
    window.scrollTo({ top: y, behavior: "instant" });
    scrollController.to(y, { immediate: true, force: true });
    scrollController.start();
  }
  if (layer.trigger?.isConnected) layer.trigger.focus({ preventScroll: true });
}
let dialog,
  items = [],
  active = 0;
function paintImage() {
  const item = items[active],
    image = dialog.querySelector("#fullImage"),
    status = dialog.querySelector("#imageStatus");
  dialog.querySelector("#imageTitle").textContent =
    items.length > 1
      ? `${item.label} · ${active + 1} / ${items.length}`
      : item.label;
  image.hidden = true;
  status.textContent = "Loading full-size image…";
  image.alt = item.label;
  image.onload = () => {
    image.hidden = false;
    status.textContent = "";
  };
  image.onerror = () => {
    status.textContent =
      "This image could not load. Close the viewer and try again.";
  };
  image.src = new URL(item.original, document.baseURI).href;
  dialog
    .querySelectorAll(".gallery-thumbnail")
    .forEach((button, i) =>
      button.setAttribute("aria-pressed", String(i === active)),
    );
}
export function initMediaViewer() {
  if (dialog) return;
  dialog = document.getElementById("imageDialog");
  if (!dialog) {
    dialog = node("dialog");
    dialog.id = "imageDialog";
    dialog.setAttribute("aria-labelledby", "imageTitle");
    dialog.innerHTML =
      '<div class="image-viewer-header"><h2 id="imageTitle">Image preview</h2><button id="closeImage" type="button" aria-label="Close image viewer" title="Close image viewer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div><p id="imageStatus" role="status"></p><img id="fullImage" alt="" hidden>';
    document.body.append(dialog);
  }
  const strip = node("div", "image-filmstrip");
  strip.setAttribute("aria-label", "Choose a full-size project screen");
  dialog.append(strip);
  dialog
    .querySelector("#closeImage")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => endLayer(dialog));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      dialog.close();
      return;
    }
    if (
      !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key) ||
      items.length < 2
    )
      return;
    event.preventDefault();
    active =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? items.length - 1
          : (active + (event.key === "ArrowRight" ? 1 : -1) + items.length) %
            items.length;
    paintImage();
    if (event.target.closest(".image-filmstrip"))
      strip.children[active]?.focus();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      dialog.close();
  });
}
export function openImage(
  gallery,
  index = 0,
  trigger = document.activeElement,
) {
  initMediaViewer();
  items = gallery;
  active = Math.max(0, Math.min(index, items.length - 1));
  if (!items.length) return;
  const strip = dialog.querySelector(".image-filmstrip");
  strip.replaceChildren();
  strip.hidden = items.length < 2;
  if (items.length > 1)
    items.forEach((item, i) => {
      const button = node("button", "gallery-thumbnail");
      button.type = "button";
      button.setAttribute("aria-label", `Show ${item.label}`);
      const image = node("img");
      image.alt = "";
      image.loading = "lazy";
      if (item.image) fillImage(image, item.image, "100px");
      else image.src = new URL(item.original, document.baseURI).href;
      button.append(image, node("span", "", String(i + 1)));
      button.addEventListener("click", () => {
        active = i;
        paintImage();
      });
      strip.append(button);
    });
  paintImage();
  if (!dialog.open) {
    beginLayer(dialog, trigger);
    dialog.showModal();
  }
  dialog.querySelector("#closeImage").focus({ preventScroll: true });
  dialog.scrollTop = 0;
}
