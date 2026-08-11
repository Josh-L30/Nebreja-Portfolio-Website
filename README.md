# Brad Josh Nebreja Portfolio

A static personal portfolio website for a web developer and UI/UX designer using plain HTML, CSS, and vanilla JavaScript.

## Local usage

You can open the site directly by opening `index.html` in a browser, or serve the folder locally with a simple static server.

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Serve locally

From this folder, run one of the following:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000

## Files

- `index.html` — single-page HTML content and page structure.
- `css/style.css` — full responsive styling and layout.
- `js/script.js` — responsive navigation, scroll effects, animations, counters, modal, and contact form behavior.
- `assets/favicon.svg` — favicon asset.
- `assets/Nebreja_BradJosh_Resume_Harvard.pdf` — CV / resume file. Update the PDF if you have a final version.

## Customization

### Resume PDF

Replace the file at `assets/Nebreja_BradJosh_Resume_Harvard.pdf` with your final resume PDF. The existing `Download CV` button in the Hero section points to that file.

### Headshot / Avatar

The current personal photo placeholder is a circular styled avatar created with CSS. To replace it with a real headshot, update the CSS inside `css/style.css` or swap in an `<img>` inside the `.avatar-image` area in `index.html`.

### EmailJS / Formspree setup

The contact form is ready to submit through a form endpoint. Right now it uses a front-end placeholder flow so the page works locally without an API key.

To connect it to EmailJS:

1. Create your EmailJS account and get your `publicKey`, service ID, and template ID.
2. In the `contactForm` submit handler inside `js/script.js`, replace the placeholder values:

```js
const payload = {
  service_id: 'service_placeholder',
  template_id: 'template_placeholder',
  user_id: 'public_key_placeholder',
  template_params: { ... }
};
```

3. Add the correct EmailJS script tag before `js/script.js`:

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
```

4. Enable EmailJS in your code by setting `window.EMAILJS_PUBLIC_KEY` and using the correct service/template IDs.

To connect it to Formspree instead:

1. Create a Formspree form endpoint.
2. Replace the Ajax submission in the contact form handler with a `fetch()` request to your endpoint.
3. Keep the same success and error UX in the front-end.
