const PROFILE = "https://github.com/Josh-L30";

function validateActivity(value) {
  if (
    value?.username !== "Josh-L30" ||
    !Number.isFinite(Date.parse(value.updatedAt)) ||
    !Array.isArray(value.contributions) ||
    value.contributions.length < 300
  )
    throw new Error("Invalid activity");
  const seen = new Set();
  for (const day of value.contributions) {
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
      seen.has(day.date) ||
      !Number.isSafeInteger(day.count) ||
      day.count < 0 ||
      !Number.isInteger(day.level) ||
      day.level < 0 ||
      day.level > 4
    )
      throw new Error("Invalid activity");
    seen.add(day.date);
  }
  return {
    ...value,
    contributions: [...value.contributions].sort((a, b) =>
      a.date.localeCompare(b.date),
    ),
    total: value.contributions.reduce((sum, day) => sum + day.count, 0),
  };
}

export function defineContributions() {
  if (customElements.get("portfolio-contributions")) return;
  class PortfolioContributions extends HTMLElement {
    async connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      const status = document.createElement("p");
      status.setAttribute("role", "status");
      status.textContent = "Loading GitHub activity…";
      this.replaceChildren(status);
      let snapshot = null;
      try {
        const response = await fetch(
          new URL("../data/github-contributions.json", import.meta.url),
          { signal: this.controller.signal },
        );
        if (!response.ok) throw new Error("Snapshot unavailable");
        snapshot = validateActivity(await response.json());
        this.render(snapshot, false);
      } catch {
        /* The live endpoint can still provide data without the snapshot. */
      }
      // Static localhost servers do not run Vercel functions. Avoid a spurious
      // missing-endpoint error while keeping the verified calendar readable.
      if (
        snapshot &&
        ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname)
      )
        return;
      try {
        const response = await fetch(
          new URL("../api/github", import.meta.url),
          {
            signal: AbortSignal.any([
              this.controller.signal,
              AbortSignal.timeout(10000),
            ]),
          },
        );
        if (!response.ok) throw new Error("Live activity unavailable");
        const live = validateActivity(await response.json());
        if (this.isConnected) this.render(live, true);
      } catch {
        if (!this.isConnected) return;
        if (snapshot) this.dataset.activityState = "snapshot";
        else this.renderError();
      }
    }
    disconnectedCallback() {
      this.controller?.abort();
    }
    render(activity, live) {
      this.dataset.activityState = live ? "live" : "snapshot";
      const card = document.createElement("div");
      card.className = "contribution-card";
      const scroll = document.createElement("div");
      scroll.className = "contribution-scroll";
      scroll.tabIndex = 0;
      scroll.setAttribute(
        "aria-label",
        "Scrollable GitHub contribution calendar",
      );
      const calendar = document.createElement("div");
      calendar.className = "contribution-calendar";
      calendar.setAttribute("role", "img");
      calendar.setAttribute(
        "aria-label",
        `${activity.total} GitHub contributions from ${activity.contributions[0].date} to ${activity.contributions.at(-1).date}.`,
      );
      const group = document.createElement("div");
      group.className = "calendar-group";
      const months = document.createElement("div");
      months.className = "calendar-months";
      months.setAttribute("aria-hidden", "true");
      const calendarBody = document.createElement("div");
      calendarBody.className = "calendar-body";
      const weekdays = document.createElement("div");
      weekdays.className = "calendar-weekdays";
      weekdays.setAttribute("aria-hidden", "true");
      ["", "Mon", "", "Wed", "", "Fri", ""].forEach((label) => {
        const item = document.createElement("span");
        item.textContent = label;
        weekdays.append(item);
      });
      const firstDay = new Date(
        activity.contributions[0].date + "T00:00:00Z",
      ).getUTCDay();
      for (let i = 0; i < firstDay; i++) {
        const space = document.createElement("span");
        calendar.append(space);
      }
      let previousMonth = null;
      activity.contributions.forEach((day, index) => {
        const date = new Date(day.date + "T00:00:00Z");
        if (date.getUTCMonth() !== previousMonth) {
          const month = document.createElement("span");
          month.textContent = new Intl.DateTimeFormat("en", {
            month: "short",
            timeZone: "UTC",
          }).format(date);
          month.style.gridColumn = String(
            Math.floor((index + firstDay) / 7) + 1,
          );
          months.append(month);
          previousMonth = date.getUTCMonth();
        }
        const square = document.createElement("span");
        square.className = "contribution-day";
        square.dataset.level = String(day.level);
        square.title = `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`;
        calendar.append(square);
      });
      const footer = document.createElement("div");
      footer.className = "contribution-footer";
      const count = document.createElement("span");
      count.textContent = `${activity.total} contributions in the last year`;
      const updated = document.createElement("span");
      updated.textContent =
        (live ? "Updated " : "Verified snapshot · ") +
        new Intl.DateTimeFormat("en", {
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        }).format(new Date(activity.updatedAt));
      footer.append(count, updated);
      calendarBody.append(weekdays, calendar);
      group.append(months, calendarBody);
      scroll.append(group);
      card.append(scroll, footer);
      this.replaceChildren(card);
      scroll.scrollLeft = scroll.scrollWidth;
    }
    renderError() {
      this.dataset.activityState = "unavailable";
      const box = document.createElement("div");
      box.className = "contribution-card contribution-error";
      const message = document.createElement("p");
      message.setAttribute("role", "status");
      message.textContent = "GitHub activity is temporarily unavailable.";
      const retry = document.createElement("button");
      retry.type = "button";
      retry.textContent = "Try again";
      retry.addEventListener("click", () => this.connectedCallback());
      const link = document.createElement("a");
      link.href = PROFILE;
      link.textContent = "View activity on GitHub";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      box.append(message, retry, link);
      this.replaceChildren(box);
    }
  }
  customElements.define("portfolio-contributions", PortfolioContributions);
}

export { validateActivity };
