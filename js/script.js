import { initContactStage } from "./contact-stage.js";
import { initSmoothScroll, scrollController } from "./smooth-scroll.js";
import { data, node, fillImage, arrowIcon } from "./site-utils.js";
import {
  beginLayer,
  endLayer,
  openImage,
  initMediaViewer,
} from "./media-viewer.js";
import { initPageTransitions } from "./page-transitions.js";
class PortfolioProjects extends HTMLElement {
  async connectedCallback() {
    try {
      const config = await data;
      const list = node("div", "project-list");
      const preview = node("div", "project-preview");
      preview.setAttribute("aria-hidden", "true");
      const previewTrack = node("div", "project-preview-track");
      preview.append(previewTrack, node("span", "preview-label", "View"));
      config.projectGroups.forEach((group, index) => {
        const project = config.projects.find(
          (item) => item.id === group.projectIds[0],
        );
        const previewCell = node("div", "project-preview-cell"),
          previewImage = node("img");
        previewImage.alt = "";
        fillImage(previewImage, project.image, "380px");
        previewCell.append(previewImage);
        previewTrack.append(previewCell);
        const row = node("article", "project-row");
        row.dataset.family = group.id;
        row.classList.toggle(
          "compact-featured",
          ["portfolio", "checkpoint"].includes(project.id),
        );
        const content = node("div");
        const main = node("a", "project-main");

        main.dataset.transitionTitle = group.title;
        main.href = "project.html?project=" + encodeURIComponent(project.id);
        main.setAttribute("aria-label", "Explore " + group.title);
        const image = node("img", "project-mobile-image");
        fillImage(image, project.image, "(max-width:767px) 90vw, 340px");
        image.alt = group.title + " preview";
        image.loading = "lazy";
        main.append(
          image,
          node("h3", "", group.title),
          node("p", "", group.focus),
        );
        content.append(main);
        row.append(
          content,
          node("span", "project-number", String(index + 1).padStart(2, "0")),
        );
        row.addEventListener("click", (event) => {
          if (!event.target.closest("a,button")) main.click();
        });
        list.append(row);
        row.addEventListener("pointerenter", (event) => {
          if (
            event.pointerType !== "mouse" ||
            !matchMedia("(hover:hover) and (min-width:1025px)").matches
          )
            return;
          previewTrack.style.transform = `translateY(${-index * 214}px)`;
          preview.classList.add("is-visible");
        });
        row.addEventListener("pointermove", (event) => {
          preview.style.setProperty(
            "--preview-x",
            Math.min(innerWidth - 400, Math.max(20, event.clientX - 190)) +
              "px",
          );
          preview.style.setProperty(
            "--preview-y",
            Math.min(innerHeight - 234, Math.max(20, event.clientY - 107)) +
              "px",
          );
        });
        row.addEventListener("pointerleave", () =>
          preview.classList.remove("is-visible"),
        );
        main.addEventListener("click", () =>
          preview.classList.remove("is-visible"),
        );
      });
      this.replaceChildren(list, preview);
    } catch {
      this.replaceChildren(
        node(
          "p",
          "component-error",
          "Projects could not load. Please refresh to try again.",
        ),
      );
    }
  }
}

class PortfolioStack extends HTMLElement {
  async connectedCallback() {
    try {
      const { stack, stackGroups } = await data;
      const groups = node("div", "stack-groups");
      stackGroups.forEach((group) => {
        const section = node("div", "tech-group");
        const list = node("ul", "tech-list");
        list.setAttribute("aria-label", group.title);
        section.append(node("h3", "tech-group-title", group.title), list);
        group.tools.forEach((name) => {
          const item = stack.find((tool) => tool.name === name);
          if (!item) return;
          const chip = node("li", "tech-chip");
          const logo = node("img", "tech-logo");
          logo.src = new URL("../" + item.logo, import.meta.url).href;
          logo.alt = "";
          logo.width = 22;
          logo.height = 22;
          logo.loading = "lazy";
          logo.decoding = "async";
          chip.append(logo, node("span", "", item.name));
          list.append(chip);
        });
        if (list.childElementCount) groups.append(section);
      });
      const viewport = node("div", "stack-marquee");
      viewport.setAttribute("role", "region");
      viewport.setAttribute(
        "aria-label",
        "Featured technologies � focus to pause",
      );
      viewport.tabIndex = 0;
      const track = node("div", "stack-marquee-track");
      track.append(groups);
      for (let i = 0; i < 2; i++) {
        const replica = groups.cloneNode(true);
        replica.className = "stack-groups stack-replica";
        replica.setAttribute("aria-hidden", "true");
        replica.inert = true;
        track.append(replica);
      }
      viewport.append(track);
      this.replaceChildren(viewport);
      const motion = new IntersectionObserver(([entry]) => {
        viewport.classList.toggle("is-visible", entry.isIntersecting);
      });
      motion.observe(viewport);
    } catch {
      this.replaceChildren(
        node(
          "p",
          "component-error",
          "The technology list could not load. Please refresh to try again.",
        ),
      );
    }
  }
}

class PortfolioCertificates extends HTMLElement {
  async connectedCallback() {
    try {
      const { certificates } = await data;
      let current = 0;
      const stage = node("div", "certificate-stage");
      stage.setAttribute("role", "region");
      stage.setAttribute("aria-roledescription", "carousel");
      stage.setAttribute("aria-label", "Professional certificates");
      const list = node("div", "certificate-list");
      const controls = node("div", "certificate-controls");
      const previous = node("button");
      previous.type = "button";
      previous.setAttribute("aria-label", "Previous certificate");
      const prevIcon = arrowIcon();
      prevIcon.style.rotate = "-135deg";
      previous.append(prevIcon);
      const next = node("button");
      next.type = "button";
      next.setAttribute("aria-label", "Next certificate");
      const nextIcon = arrowIcon();
      nextIcon.style.rotate = "45deg";
      next.append(nextIcon);
      const count = node("span");
      count.setAttribute("aria-live", "polite");
      count.setAttribute("aria-atomic", "true");
      const dots = node("div", "certificate-dots");
      dots.setAttribute("aria-label", "Choose a certificate");
      const select = (index) => {
        current = (index + certificates.length) % certificates.length;
        [...list.children].forEach((link, i) => {
          let offset = i - current;
          if (offset > 2) offset -= certificates.length;
          if (offset < -2) offset += certificates.length;
          link.style.setProperty("--offset", String(offset));
          link.style.setProperty("--scale", offset === 0 ? "1" : ".82");
          link.style.setProperty(
            "--angle",
            offset === 0 ? "0deg" : offset * 4 + "deg",
          );
          link.style.setProperty(
            "--opacity",
            Math.abs(offset) > 1 ? "0" : offset === 0 ? "1" : ".4",
          );
          link.style.setProperty("--z", String(3 - Math.abs(offset)));
          link.classList.toggle("is-current", i === current);
          link.inert = i !== current;
          link.setAttribute("aria-hidden", String(i !== current));
          link.tabIndex = i === current ? 0 : -1;
        });
        [...dots.children].forEach((dot, i) =>
          dot.setAttribute("aria-pressed", String(i === current)),
        );
        count.textContent =
          String(current + 1).padStart(2, "0") +
          " / " +
          String(certificates.length).padStart(2, "0");
      };
      certificates.forEach((certificate, index) => {
        const link = node("a", "certificate-item");
        link.href = new URL(
          "../" + (certificate.displayImage || certificate.image),
          import.meta.url,
        ).href;
        link.setAttribute(
          "aria-label",
          "View certificate: " + certificate.title,
        );
        const image = node("img", "certificate-thumb");
        image.src = new URL("../" + certificate.preview, import.meta.url).href;
        image.alt = "";
        image.width = certificate.width;
        image.height = certificate.height;
        image.loading = "lazy";
        image.decoding = "async";
        const copy = node("div", "certificate-copy");
        copy.append(
          node("h3", "", certificate.title),
          node("p", "", certificate.issuer + " · " + certificate.year),
        );
        const action = node("span", "certificate-action", "View certificate");
        action.append(arrowIcon());
        link.append(image, copy, action);
        list.append(link);
        const dot = node("button", "certificate-dot");
        dot.type = "button";
        dot.setAttribute("aria-label", "Show " + certificate.title);
        dot.addEventListener("click", () => select(index));
        dots.append(dot);
      });
      previous.addEventListener("click", () => select(current - 1));
      next.addEventListener("click", () => select(current + 1));
      stage.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
          return;
        const focusOnCard =
          document.activeElement?.matches(".certificate-item");
        event.preventDefault();
        select(
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? certificates.length - 1
              : current + (event.key === "ArrowRight" ? 1 : -1),
        );
        if (focusOnCard) list.children[current].focus({ preventScroll: true });
      });
      let start = null;
      list.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "mouse") return;
        start = { x: event.clientX, y: event.clientY };
      });
      list.addEventListener("pointerup", (event) => {
        if (!start) return;
        const dx = event.clientX - start.x,
          dy = event.clientY - start.y;
        start = null;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
          select(current + (dx < 0 ? 1 : -1));
          list.dataset.swiped = "true";
          setTimeout(() => delete list.dataset.swiped, 300);
        }
      });
      list.addEventListener("pointercancel", () => {
        start = null;
      });
      list.addEventListener(
        "click",
        (event) => {
          if (list.dataset.swiped) {
            event.preventDefault();
            event.stopPropagation();
          }
        },
        true,
      );
      controls.append(previous, count, next);
      stage.append(list, controls, dots);
      this.replaceChildren(stage);
      select(0);
    } catch {
      this.replaceChildren(
        node(
          "p",
          "component-error",
          "Certificates could not load. Please refresh to try again.",
        ),
      );
    }
  }
}

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const syncMotionPreference = () =>
  document.documentElement.toggleAttribute(
    "data-motion-static",
    reducedMotion.matches || Boolean(navigator.connection?.saveData),
  );
syncMotionPreference();
reducedMotion.addEventListener("change", syncMotionPreference);
navigator.connection?.addEventListener("change", syncMotionPreference);
function revealOnce(element) {
  element.dataset.reveal = "";
}
// Motion is optional: a failed module cannot disable the site's controls.
import("./motion.js")
  .then(({ initMotion }) => initMotion(document))
  .catch(() => {
    document.documentElement.dataset.wordMotion = "unavailable";
  });
customElements.define("portfolio-projects", PortfolioProjects);

customElements.define("portfolio-stack", PortfolioStack);
customElements.define("portfolio-certificates", PortfolioCertificates);

initMediaViewer();
document.addEventListener("click", (event) => {
  const link = event.target.closest(".certificate-item");
  if (!link) return;
  event.preventDefault();
  openImage(
    [{ original: link.href, label: link.querySelector("h3").textContent }],
    0,
    link,
  );
});
const socials = document.querySelector(".social-rail");
for (const selector of [".hero-socials", ".footer-socials"]) {
  const target = document.querySelector(selector);
  if (target)
    target.replaceChildren(
      ...[...socials.children].map((source) => {
        const link = source.cloneNode(true);
        if (selector === ".footer-socials")
          link.replaceChildren(
            node(
              "span",
              "",
              link
                .getAttribute("aria-label")
                .replace("Brad on ", "")
                .replace("Email Brad", "Email"),
            ),
          );
        return link;
      }),
    );
}
const menuSocials = node("div", "menu-profile-links");
[...socials.children].forEach((source) => {
  const link = source.cloneNode(true);
  const label = link
    .getAttribute("aria-label")
    .replace("Brad on ", "")
    .replace("Email Brad", "Email");
  link.append(node("span", "", label));
  menuSocials.append(link);
});
document.querySelector(".menu-socials").append(menuSocials);
const mobileMenu = document.getElementById("mobileMenu");
const menuToggle = document.getElementById("menuToggle");
let menuDestination = null,
  menuClosing = false;
function closeMenu() {
  if (!mobileMenu.open || menuClosing) return;
  menuClosing = true;
  mobileMenu.classList.add("closing");
  setTimeout(
    () => mobileMenu.close(),
    reducedMotion.matches || navigator.connection?.saveData ? 0 : 650,
  );
}
menuToggle.addEventListener("click", () => {
  beginLayer(mobileMenu, menuToggle);
  mobileMenu.classList.remove("closing");
  mobileMenu.showModal();
  menuToggle.setAttribute("aria-expanded", "true");
  document.getElementById("closeMenu").focus({ preventScroll: true });
});
document.getElementById("closeMenu").addEventListener("click", closeMenu);
mobileMenu.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeMenu();
});
mobileMenu.addEventListener("close", () => {
  endLayer(mobileMenu);
  menuClosing = false;
  mobileMenu.classList.remove("closing");
  menuToggle.setAttribute("aria-expanded", "false");
  if (menuDestination) {
    const destination = menuDestination;
    menuDestination = null;
    requestAnimationFrame(() => {
      const padding =
        parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop,
        ) || 0;
      scrollController.to(
        destination.getBoundingClientRect().top + scrollY - padding,
        {
          immediate: reducedMotion.matches,
        },
      );
    });
  }
});
mobileMenu.querySelectorAll('a[href^="#"]').forEach((link) =>
  link.addEventListener("click", (event) => {
    event.preventDefault();
    menuDestination = document.querySelector(link.hash);
    closeMenu();
  }),
);
mobileMenu.addEventListener("click", (event) => {
  if (event.target !== mobileMenu) return;
  const r = mobileMenu.getBoundingClientRect();
  if (
    event.clientX < r.left ||
    event.clientX > r.right ||
    event.clientY < r.top ||
    event.clientY > r.bottom
  )
    closeMenu();
});
const sectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      mobileMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
        if (link.hash === "#" + entry.target.id)
          link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }
  },
  { rootMargin: "-15% 0px -60% 0px" },
);
document
  .querySelectorAll("main>section[id]")
  .forEach((section) => sectionObserver.observe(section));
const keys = document.querySelector(".keyboard-keys");
for (let i = 0; i < 48; i++) keys.append(node("i"));
// Short, text-only context on hover, keyboard focus, and tap.
const aboutMessages = {
  clear: "I simplify complex ideas so people can understand what to do next.",
  useful: "I build around real tasks, making each feature serve a purpose.",
  look: "I give typography, spacing, and visual hierarchy the same care as the code.",
  function: "I connect responsive interfaces to features that work reliably.",
  help: "I design for people, making everyday tasks easier to complete.",
  AI: "I use AI to explore ideas and support my work, then review and test the results.",
  learning:
    "I keep practicing, exploring new tools, and learning from feedback.",
  challenging: "I question old habits and try better ways to design and build.",
  "staying competitive":
    "I stay curious about new technology and turn what I learn into practical skills.",
};
const aboutPreview = node("div", "about-preview");
aboutPreview.id = "aboutPreview";
aboutPreview.setAttribute("role", "tooltip");
aboutPreview.hidden = true;
const aboutPreviewCaption = node("p");
aboutPreview.append(aboutPreviewCaption);
document.body.append(aboutPreview);
let aboutTrigger = null;
let positionAbout = null;
function hideAboutPreview() {
  aboutPreview.hidden = true;
  aboutTrigger?.removeAttribute("aria-describedby");
  aboutTrigger = null;
  positionAbout = null;
}
document.querySelectorAll("#about strong").forEach((strong) => {
  const label = strong.textContent.trim();
  const button = node("button", "about-keyword", label);
  button.type = "button";
  button.setAttribute("aria-description", aboutMessages[label]);
  strong.replaceChildren(button);
  const position = (event) => {
    const r = button.getBoundingClientRect();
    const width = aboutPreview.offsetWidth;
    const x =
      event?.pointerType === "mouse" ? event.clientX : r.left + r.width / 2;
    const y =
      event?.pointerType === "mouse" ? event.clientY + 22 : r.bottom + 12;
    aboutPreview.style.left =
      Math.min(innerWidth - width - 16, Math.max(16, x - width / 2)) + "px";
    aboutPreview.style.top =
      Math.min(innerHeight - aboutPreview.offsetHeight - 16, Math.max(16, y)) +
      "px";
  };
  const show = (event) => {
    aboutTrigger?.removeAttribute("aria-describedby");
    aboutTrigger = button;
    button.setAttribute("aria-describedby", "aboutPreview");
    positionAbout = () => position();
    aboutPreviewCaption.textContent = aboutMessages[label];
    aboutPreview.hidden = false;
    position(event);
  };
  button.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") show(event);
  });
  button.addEventListener("pointermove", (event) => {
    if (aboutTrigger === button && event.pointerType === "mouse")
      position(event);
  });
  button.addEventListener("pointerleave", () => {
    if (document.activeElement !== button) hideAboutPreview();
  });
  button.addEventListener("focus", show);
  button.addEventListener("blur", hideAboutPreview);
  button.addEventListener("click", show);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideAboutPreview();
});
document.addEventListener("pointerdown", (event) => {
  if (!event.target.closest(".about-keyword")) hideAboutPreview();
});
window.addEventListener(
  "scroll",
  () => {
    const r = aboutTrigger?.getBoundingClientRect();
    if (r && document.activeElement === aboutTrigger) positionAbout?.();
    else hideAboutPreview();
  },
  { passive: true },
);
window.addEventListener("resize", hideAboutPreview);
function updateLocalTime() {
  document.getElementById("localTime").textContent =
    new Intl.DateTimeFormat("en-PH", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Manila",
      hour12: true,
    }).format(new Date()) + " PHT";
}
updateLocalTime();
setInterval(updateLocalTime, 60000);
document.querySelector(".hero").classList.add("ready");
import("./contributions.js")
  .then(({ defineContributions }) => defineContributions())
  .catch(() => {
    const target = document.querySelector("portfolio-contributions");
    if (target)
      target.textContent =
        "Activity could not load. View Josh-L30 on GitHub using the link above.";
  });

// Load the optional 3D runtime only near a device scene, never for the hero.
const deviceLoader = new IntersectionObserver(
  (entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    deviceLoader.disconnect();
    if (!navigator.connection?.saveData) {
      import("./devices.js")
        .then(({ initDevices }) => initDevices())
        .catch(() => {});
    }
  },
  { rootMargin: "300px" },
);
document
  .querySelectorAll(".workflow,.experience")
  .forEach((section) => deviceLoader.observe(section));
import("./services.js?v=covered-reveal-4")
  .then(({ initServices }) => {
    initServices();
  })
  .catch(() => {});
// One accessible description; desktop hover reveals it without expanding the row.
document.querySelectorAll(".workflow-item").forEach((item, index) => {
  const summary = item.querySelector("summary"),
    description = item.querySelector("p");
  const button = document.createElement("button");
  button.type = "button";
  button.className = "workflow-trigger";
  button.setAttribute("aria-label", summary.textContent.trim());
  button.setAttribute("aria-expanded", "false");
  description.id = "workflow-description-" + index;
  button.setAttribute("aria-controls", description.id);
  button.replaceChildren(...summary.childNodes);
  const article = document.createElement("article");
  article.className = item.className;
  const replacement = node(
    "span",
    "workflow-replacement",
    description.textContent.trim(),
  );
  replacement.setAttribute("aria-hidden", "true");
  button.append(replacement);
  article.append(button, description);
  item.replaceWith(article);
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") !== "true";
    document.querySelectorAll(".workflow-item.is-open").forEach((other) => {
      if (other === article) return;
      other.classList.remove("is-open");
      other.querySelector("button").setAttribute("aria-expanded", "false");
      other.querySelector("button").removeAttribute("aria-describedby");
    });
    button.setAttribute("aria-expanded", String(expanded));
    if (expanded) button.setAttribute("aria-describedby", description.id);
    else button.removeAttribute("aria-describedby");
    article.classList.toggle("is-open", expanded);
  });
});
document.querySelectorAll(".experience details").forEach((item) => {
  const preview = document.createElement("span");
  preview.className = "experience-preview";
  preview.setAttribute("aria-hidden", "true");
  preview.textContent = item.querySelector(
    ".experience-description",
  ).textContent;
  const summary = item.querySelector("summary");
  summary.append(preview);
  const compactRows = matchMedia(
    "(max-width:1100px), (hover:none) and (pointer:coarse)",
  );
  const syncRow = () => {
    preview.setAttribute("aria-hidden", String(!compactRows.matches));
    if (compactRows.matches && item.open) {
      document
        .querySelectorAll(".experience details[open]")
        .forEach((other) => {
          if (other !== item) other.open = false;
        });
    }
  };
  summary.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      item.open = false;
      summary.focus();
    }
  });
  item.addEventListener("toggle", syncRow);
  compactRows.addEventListener("change", syncRow);
  syncRow();
});
document.querySelectorAll(".menu-primary a").forEach((link) => {
  const label = link.textContent,
    mask = node("span", "menu-link-text"),
    roll = node("span", "menu-link-roll");
  roll.append(node("span", "", label));
  const copy = node("span", "", label);
  copy.setAttribute("aria-hidden", "true");
  roll.append(copy);
  mask.append(roll);
  link.replaceChildren(mask);
});

initSmoothScroll();

initPageTransitions();

initContactStage();

// Touch has no hover: one tap reveals the full name; the next follows Home.
const brandMark = document.querySelector(".brand");
brandMark.addEventListener("click", (event) => {
  if (
    matchMedia("(hover: none)").matches &&
    !brandMark.classList.contains("is-revealed")
  ) {
    event.preventDefault();
    brandMark.classList.add("is-revealed");
  }
});
document.addEventListener("pointerdown", (event) => {
  if (!brandMark.contains(event.target))
    brandMark.classList.remove("is-revealed");
});
