Brad Josh Nebreja — Personal Portfolio

A responsive single-page portfolio website for **Brad Josh Nebreja**, an Information Technology student, web developer, UI/UX designer, and project lead based in Calamba City, Laguna, Philippines.

The site presents Brad's background, leadership experience, selected work, technical skills, certifications, education, and ways to get in touch. It is built as a lightweight static site using plain HTML, CSS, and JavaScript—no build step or framework required.

Highlights

- Responsive, mobile-friendly one-page layout
- Light and dark themes, with the visitor's preference saved in `localStorage`
- Accessible navigation with an active-section indicator and mobile menu
- Animated role headline, scroll progress bar, reveal effects, and count-up statistics
- Detailed project dialogs for the featured work
- Interactive, auto-advancing UI galleries that pause on hover or keyboard focus
- Full-size image dialog for project screens and certificate previews
- Video walkthrough for the CinemaBuddy prototype
- Client-side contact form validation with loading, success, and error states
- Optional Formspree integration for live contact-form delivery

Portfolio content:

About and experience

The site introduces Brad as an IT student focused on practical, user-centered digital tools. The experience timeline documents work as Capstone Project Lead and UI/UX Designer Lead for the Containerboard Packaging Corporation (CPC) centralized system.

Selected projects

| Project | Description | Main tools |
| --- | --- | --- |
| **CPC Centralized System** | A platform designed to centralize supply, production, inventory, logistics, and sales visibility. | HTML, CSS, JavaScript, PHP, React, Express.js, MS SQL, Laravel WebSocket |
| **CPC Dashboard Experience** | UI/UX dashboard concepts for monitoring operational data and reporting. | Figma, HTML, CSS, JavaScript |
| **Game Mechanics Website** | A first-year group project presenting game mechanics for *Masters of World Literature*. | HTML, CSS, JavaScript |
| **CinemaBuddy** | A mobile movie-discovery and personalized viewing-experience concept. | Figma, UI/UX design |
| **CinemaBuddy UX Walkthrough** | A video prototype walkthrough covering onboarding, account access, and movie discovery. | Figma, UX design, user flows |

The portfolio also includes skills, five certificate previews, and education history. Visitors can open project details, browse design screens, and inspect certificates without leaving the page.

Technology

- **HTML5** for semantic page structure
- **CSS3** for custom layout, responsive design, animation, and theme styling
- **Vanilla JavaScript** for all interaction and UI behavior
- **Native browser APIs** including `IntersectionObserver`, `HTMLDialogElement`, `localStorage`, and `fetch`
- **Devicon CDN** for selected skill icons

Project structure

```text
NebrejaPortfolio/
├── index.html                    # Page content, sections, assets, and dialogs
├── css/
│   └── style.css                 # Visual design, themes, responsiveness, and animations
├── js/
│   └── script.js                 # Navigation, galleries, modals, form behavior, and effects
├── assets/
│   ├── BJ.jpg                    # Profile photo
│   ├── Nebreja_CVitae.pdf        # Downloadable CV
│   ├── certificates/             # Certificate images
│   ├── UI/                       # Project and interface screenshots
│   └── video/                    # CinemaBuddy walkthrough video
├── verify.py                     # Basic local verification helper
└── verify_assets.py              # Asset-reference verification helper
```

Run locally

Because this is a static website, you can open `index.html` directly in a browser. For the closest local-server experience, serve the folder instead:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

If you use XAMPP, place the project in `htdocs` and visit the corresponding local URL, such as `http://localhost/NebrejaPortfolio/`.

Contact form configuration

The form works as a front-end demonstration by default: it validates inputs and displays a simulated success state, but does not send an email. To enable delivery through Formspree, define `window.FORMSPREE_ENDPOINT` before loading `js/script.js` in `index.html`:

```html
<script>
  window.FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id';
</script>
<script src="js/script.js"></script>
```

Replace `your-form-id` with the endpoint supplied by Formspree. The existing JavaScript sends JSON and retains the built-in validation and feedback states.

Customization guide

| To update | Where to change it |
| --- | --- |
| Name, biography, links, contact details, and section text | `index.html` |
| Resume/CV download | Replace `assets/Nebreja_CVitae.pdf`, or update the hero link in `index.html` |
| Profile photo | Replace `assets/BJ.jpg` and keep the filename, or change its image path in `index.html` |
| Project cards, images, and tags | The `#projects` section in `index.html` and the related assets in `assets/UI/` |
| Project modal copy | The `projectData` object in `js/script.js` |
| Certificates | The `#certifications` section and `assets/certificates/` |
| Colors, typography, breakpoints, and component styling | `css/style.css` |
| Contact endpoint | `window.FORMSPREE_ENDPOINT` before `js/script.js` loads |

Accessibility and usability

The portfolio uses semantic sections, descriptive labels, keyboard-operable gallery images, accessible modal controls, `aria-live` form feedback, and motion that supports browsing rather than blocking it. The layout adapts from desktop to mobile, while the navigation and gallery controls remain usable with a keyboard.

License

This portfolio and its personal content are intended for Brad Josh Nebreja's personal use. Please request permission before reusing the design assets, certificates, CV, profile image, or project materials.
