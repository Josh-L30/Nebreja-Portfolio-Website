import { uniqueGallery } from "./project-gallery.js";
import { initViewCursor } from "./view-cursor.js";
import { data, node, fillImage, arrowIcon } from "./site-utils.js";
import { initMediaViewer, openImage } from "./media-viewer.js";
import { initPageTransitions } from "./page-transitions.js";
import { initSmoothScroll } from "./smooth-scroll.js";
const year = {
  cpc: "2025–2026",
  dashboard: "2025–2026",
  checkpoint: "2026",
  cinemabuddy: "2024",
  portfolio: "2026",
  praisepoint: "2026",
};
const projectURL = (id) => "project.html?project=" + encodeURIComponent(id);
function chip(tool) {
  const item = node("li", "tool-pill"),
    image = node("img");
  image.src = new URL("../" + tool.logo, import.meta.url).href;
  image.alt = "";
  image.width = 20;
  image.height = 20;
  image.loading = "lazy";
  item.append(image, node("span", "", tool.name));
  return item;
}
function routeLink(title, href, className) {
  const link = node("a", className, title);
  link.href = href;
  link.dataset.transitionTitle = title;
  return link;
}
function meta(label, content) {
  const group = node("div", "project-meta-row");
  group.append(node("dt", "", label));
  const value = node("dd");
  typeof content === "string" ? value.append(content) : value.append(content);
  group.append(value);
  return group;
}
function renderStack(config) {
  const library = document.getElementById("stackLibrary");
  if (!library) return;
  library.replaceChildren(
    ...config.stackGroups.map((group) => {
      const category = node("section", "stack-category"),
        title = node("h2", "", group.title),
        list = node("ul", "tool-pills");
      group.tools.forEach((name) => {
        const tool = config.stack.find((t) => t.name === name);
        if (tool) list.append(chip(tool));
      });
      category.append(title, list);
      return category;
    }),
  );
}
function renderWorks(config) {
  const grid = document.getElementById("worksGrid");
  if (!grid) return;
  grid.replaceChildren(
    ...config.projectGroups.map((group) => {
      const project = config.projects.find((p) => p.id === group.projectIds[0]);
      const card = node("article", "work-card"),
        link = routeLink(group.title, projectURL(project.id), "work-card-link");
      const image = node("img");
      fillImage(image, project.image, "(max-width:767px) 90vw, 45vw");
      image.alt = group.title + " preview";
      image.loading = "lazy";
      const media = node("div", "work-card-media");
      media.append(image, node("span", "media-view-badge", "View"));
      link.replaceChildren(
        media,
        node("h2", "", group.title),
        node("p", "", group.focus),
      );
      card.append(link);
      return card;
    }),
  );
}
function renderProject(config) {
  const root = document.getElementById("projectContent");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("project") || "cpc";
  const group = config.projectGroups.find((g) => g.projectIds.includes(id)),
    project = config.projects.find((p) => p.id === id);
  if (!project || !group) {
    root.replaceChildren(
      node("h1", "", "Project not found"),
      node("p", "", "Choose one of my selected works to explore its details."),
      routeLink("Selected Works", "works.html", "reference-pill"),
    );
    return;
  }
  document.title = group.title + " | Josh Nebreja";
  document.querySelector("meta[name=description]").content = group.description;
  const layout = node("div", "project-layout"),
    sidebar = node("aside", "project-sidebar");
  sidebar.dataset.lenisPrevent = "";
  const crumbs = node("nav", "project-breadcrumbs");
  crumbs.setAttribute("aria-label", "Breadcrumb");
  crumbs.append(
    routeLink("Works", "works.html", ""),
    node("span", "breadcrumb-separator", "/"),
    node("span", "", group.title),
  );
  sidebar.append(
    crumbs,
    node("h1", "", group.title),
    node("p", "project-description", project.summary),
  );
  if (project.liveUrl) {
    const live = routeLink("Live site", project.liveUrl, "project-live");
    live.target = "_blank";
    live.rel = "noopener noreferrer";
    live.append(arrowIcon());
    sidebar.append(live);
  }
  if (project.privacyNote)
    sidebar.append(node("p", "project-privacy-note", project.privacyNote));
  const pills = node("ul", "tool-pills");
  project.tags.forEach((name) => {
    const tool = config.stack.find(
      (t) => t.name.toLowerCase() === name.toLowerCase(),
    );
    pills.append(tool ? chip(tool) : node("li", "tool-pill", name));
  });
  const facts = node("dl", "project-meta");
  facts.append(
    meta("Category", project.categories.join(" · ")),
    meta("Stack", pills),
    meta("Year", year[project.id]),
  );
  sidebar.append(facts);
  const gallery = uniqueGallery(
    config.projects.filter((p) => group.projectIds.includes(p.id)),
  );
  const media = node("div", "project-media-list");
  gallery.forEach((screen, index) => {
    const figure = node("figure", "project-media"),
      link = node("a", "project-shot");
    link.href = screen.original;
    link.setAttribute(
      "aria-label",
      "View " + group.title + " / " + screen.label,
    );
    const image = node("img");
    fillImage(image, screen.image, "(max-width:900px) 95vw, 75vw");
    image.alt = group.title + " — " + screen.label;
    image.loading = index ? "lazy" : "eager";
    if (!index) image.fetchPriority = "high";
    link.append(image, node("span", "media-view-badge", "View"));
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openImage(gallery, index, link);
    });
    figure.append(link);
    media.append(figure);
  });
  layout.append(sidebar, media);
  root.replaceChildren(layout);
  const next =
      config.projectGroups[
        (config.projectGroups.indexOf(group) + 1) % config.projectGroups.length
      ],
    nextProject = config.projects.find((p) => p.id === next.projectIds[0]);
  const nextSection = node("section", "next-project"),
    card = node("div", "next-project-card"),
    pocket = node("div", "next-preview-pocket");
  const nextLink = routeLink(
    next.title + " preview",
    projectURL(nextProject.id),
    "next-project-link",
  );
  nextLink.dataset.transitionTitle = next.title;
  nextLink.setAttribute("aria-label", "Explore " + next.title);
  const nextImage = node("img");
  fillImage(nextImage, nextProject.image, "(max-width:767px) 95vw, 680px");
  nextImage.alt = next.title + " preview";
  nextImage.loading = "lazy";
  nextLink.replaceChildren(nextImage);
  pocket.append(nextLink);
  card.append(node("h2", "next-project-title", next.title), pocket);
  nextSection.append(
    node("p", "next-project-label", "Next project"),
    card,
    node("hr"),
    routeLink("All Works · 4", "works.html", "reference-pill"),
  );
  const badge = node("div", "next-cursor-badge", "Next");
  badge.setAttribute("aria-hidden", "true");
  document.body.append(badge);
  const showBadge = (event) => {
    if (
      event.pointerType !== "mouse" ||
      !matchMedia("(hover:hover) and (min-width:769px)").matches ||
      matchMedia("(prefers-reduced-motion:reduce)").matches ||
      navigator.connection?.saveData
    )
      return;
    badge.style.left = event.clientX + "px";
    badge.style.top = event.clientY + "px";
    badge.classList.add("is-visible");
  };
  nextLink.addEventListener("pointerenter", showBadge);
  nextLink.addEventListener("pointermove", showBadge);
  ["pointerleave", "click"].forEach((event) =>
    nextLink.addEventListener(event, () =>
      badge.classList.remove("is-visible"),
    ),
  );
  root.append(nextSection);
}
function updateClock() {
  document.querySelectorAll(".page-clock").forEach(
    (clock) =>
      (clock.textContent =
        new Intl.DateTimeFormat("en-PH", {
          timeZone: "Asia/Manila",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()) + " PHT"),
  );
}
updateClock();
setInterval(updateClock, 60000);
initPageTransitions();
initSmoothScroll();
initMediaViewer();
if (document.querySelector("portfolio-contact-form"))
  import("./contact-form.js").catch(() => {
    const form = document.querySelector("portfolio-contact-form");
    form.replaceChildren(
      node(
        "p",
        "",
        "The form could not load. You can still email me at bradjosh.nebreja05@gmail.com.",
      ),
    );
  });
try {
  const config = await data;
  renderStack(config);
  renderWorks(config);
  renderProject(config);
  initViewCursor();
} catch {
  const target = document.querySelector(
    "#projectContent,#stackLibrary,#worksGrid",
  );
  if (target) {
    target.replaceChildren(
      node(
        "p",
        "component-error",
        "This content could not load. Refresh to try again, or return to the homepage.",
      ),
      routeLink("Back to Home", "index.html", "reference-pill"),
    );
  }
}
