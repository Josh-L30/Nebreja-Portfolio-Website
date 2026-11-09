import { data, node, arrowIcon } from "./site-utils.js";
export function setButtonStatus(button, state) {
  const labels = {
    idle: "Send message",
    pending: "Sending",
    success: "Message submitted",
    error: "Try again",
  };
  button.dataset.state = state;
  button.disabled = state === "pending";
  button.setAttribute("aria-busy", String(state === "pending"));
  const label =
    state === "idle" && button.dataset.idleLabel
      ? button.dataset.idleLabel
      : labels[state];
  button.replaceChildren(node("span", "", label), arrowIcon());
}

export function createField(field) {
  const wrapper = node("div", "ui-field");
  const label = node("label", "ui-label", field.label);
  const input = node(
    field.type === "textarea" ? "textarea" : "input",
    "ui-input",
  );
  input.id = `contact-${field.name}`;
  input.name = field.name;
  input.required = field.required !== false;
  if (field.placeholder) input.placeholder = field.placeholder;
  input.maxLength = field.maxLength;
  if (field.type !== "textarea") input.type = field.type;
  if (field.autocomplete) input.autocomplete = field.autocomplete;
  if (field.type === "textarea") input.rows = 1;
  label.htmlFor = input.id;
  wrapper.append(label, input);
  return wrapper;
}

class PortfolioContactForm extends HTMLElement {
  async connectedCallback() {
    try {
      const { contact } = await data;
      const canSend = Boolean(
        contact.endpoint &&
          (contact.provider !== "web3forms" || contact.accessKey),
      );
      const form = node("form", "contact-form");
      form.setAttribute("aria-label", "Contact Brad");
      const fields = node("div", "form-fields");
      const displayFields = [
        {
          ...contact.fields.find((f) => f.name === "name"),
          label: "Your name is",
          placeholder: "Your name *",
        },
        {
          name: "company",
          label: "You are from",
          placeholder: "Company or organization",
          type: "text",
          autocomplete: "organization",
          maxLength: 150,
          required: false,
        },
        {
          ...contact.fields.find((f) => f.name === "email"),
          label: "I can reach you at",
          placeholder: "you@example.com *",
        },
        {
          name: "service",
          label: "You need help in",
          placeholder: "UI/UX design, web development, prototyping",
          type: "text",
          maxLength: 200,
          required: false,
        },
        {
          ...contact.fields.find((f) => f.name === "message"),
          label: "Your message to me",
          placeholder: "Tell me about your opportunity or project *",
        },
      ];
      displayFields.forEach((field) => fields.append(createField(field)));
      const note = node(
        "p",
        "form-note",
        canSend
          ? "Your contact details and message go to Web3Forms for delivery."
          : "Opens a draft in your email app.",
      );
      note.id = "contact-note";
      form.setAttribute("aria-describedby", "contact-note");
      const status = node("p", "form-status");
      status.id = "contact-status";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      const botcheck = node("input");
      botcheck.type = "checkbox";
      botcheck.name = "botcheck";
      botcheck.hidden = true;
      botcheck.tabIndex = -1;
      botcheck.setAttribute("aria-hidden", "true");
      const submit = node("button", "primary ui-button");
      submit.type = "submit";
      function resetSubmit() {
        setButtonStatus(submit, "idle");
        if (!canSend) submit.textContent = "Open email draft";
      }
      submit.dataset.idleLabel = "Send it!";
      resetSubmit();
      const actions = node("div", "form-actions");
      actions.append(node("span", "submit-phrase", "And then"), submit, note);
      form.append(fields, botcheck, actions, status);
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (submit.disabled) return;
        if (!form.reportValidity()) return;
        const payload = Object.fromEntries(new FormData(form));
        for (const field of contact.fields) {
          if (!String(payload[field.name] || "").trim()) {
            form.elements.namedItem(field.name).focus();
            status.textContent = "Please complete every field.";
            return;
          }
        }
        if (botcheck.checked) {
          status.textContent =
            "Your message could not be submitted. Please try again.";
          return;
        }
        if (!canSend) {
          const subject = "Portfolio collaboration inquiry";
          const body = `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`;
          location.href = `mailto:${contact.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          status.textContent =
            "Your email draft has been opened. Send it from your email app. Your text is kept here.";
          return;
        }
        if (contact.provider === "web3forms")
          Object.assign(payload, {
            access_key: contact.accessKey,
            subject: "New portfolio collaboration inquiry",
            from_name: "Brad Nebreja Portfolio",
            botcheck: false,
          });
        setButtonStatus(submit, "pending");
        fields.querySelectorAll("input, textarea").forEach((input) => {
          input.disabled = true;
        });
        status.textContent = "";
        try {
          const response = await fetch(contact.endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(15000),
          });
          if (!response.ok) throw new Error("Submission rejected");
          const result = await response.json();
          if (result.success !== true)
            throw new Error("Provider did not accept submission");
          setButtonStatus(submit, "success");
          status.textContent =
            "Your message was submitted. Thank you for getting in touch.";
          form.reset();
        } catch {
          setButtonStatus(submit, "error");
          status.textContent =
            "Your message could not be sent. Please try again. Your text is still here.";
        } finally {
          fields.querySelectorAll("input, textarea").forEach((input) => {
            input.disabled = false;
          });
        }
      });
      form.addEventListener("input", () => {
        if (!submit.disabled) {
          resetSubmit();
          status.textContent = "";
        }
      });
      this.replaceChildren(form);
    } catch {
      this.replaceChildren(
        node(
          "p",
          "component-error",
          "The contact form could not load. Please refresh to try again.",
        ),
      );
    }
  }
}

customElements.define("portfolio-contact-form", PortfolioContactForm);
