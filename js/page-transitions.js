// Native links remain usable when motion, storage, or JavaScript is unavailable.
export function initPageTransitions() {
  const reduced = matchMedia("(prefers-reduced-motion:reduce)");
  const overlay = document.createElement("div");
  overlay.className = "page-curtain";
  overlay.setAttribute("aria-hidden", "true");
  const label = document.createElement("span");
  overlay.append(label);
  document.body.append(overlay);
  const enabled = () => !reduced.matches && !navigator.connection?.saveData;
  try {
    const incoming = sessionStorage.getItem("portfolio-route-label");
    sessionStorage.removeItem("portfolio-route-label");
    if (incoming && enabled()) {
      label.textContent = incoming;
      overlay.classList.add("is-arriving");
      overlay.addEventListener(
        "animationend",
        () => overlay.classList.remove("is-arriving"),
        { once: true },
      );
    }
  } catch {}
  let leaving = false;
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      leaving = false;
      overlay.className = "page-curtain";
    }
  });
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.download ||
      link.target === "_blank"
    )
      return;
    const url = new URL(link.href, location.href);
    if (
      url.origin !== location.origin ||
      !/(?:index|project|works|stack|contact)\.html$/.test(url.pathname) ||
      (url.pathname === location.pathname && url.search === location.search) ||
      !enabled()
    )
      return;
    if (leaving) {
      event.preventDefault();
      return;
    }
    leaving = true;
    event.preventDefault();
    label.textContent =
      link.dataset.transitionTitle ||
      link.getAttribute("aria-label")?.replace(/^Explore /, "") ||
      link.textContent.trim() ||
      "Portfolio";
    try {
      sessionStorage.setItem("portfolio-route-label", label.textContent);
    } catch {}
    overlay.classList.add("is-leaving");
    setTimeout(() => location.assign(url.href), 850);
  });
}
