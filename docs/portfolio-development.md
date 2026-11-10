# Brad Josh Nebreja — Personal Portfolio

A cinematic portfolio showcasing my web development, UI/UX design, and QA work, alongside my experience, skills, certifications, and CV.

**[Visit my portfolio](https://nebreja-portfolio-website.vercel.app/)**

## Features

- Responsive desktop and mobile layouts with a black, white, and mocha interface with original-color media.
- Circular navigation control, a curved side-panel menu, and professional social icons.
- A centered portrait, large mobile name marquee, and reversible scroll-filled typography.
- Scroll-stacked services and original, lazily loaded 3D device scenes using self-hosted Three.js.
- Reversible scroll-driven typography with reduced-motion and Save-Data support.
- In-page project stories and certificate previews in glass dialogs.
- Four Selected Works, a five-certificate carousel, Tech Stack, experience, and public GitHub activity.
- Downloadable CV and contact form.

## Selected Works

| Project | Overview | Live site |
| --- | --- | --- |
| CPC Centralized System | Sales, production, inventory, and logistics operations. | Private to protect client information. |
| Checkpoint | Bus-stop and arrivals website, with development and QA contributions. | [Checkpoint](https://onroute.cloud/) |
| CinemaBuddy | A 2024 school project featuring UI design and a Figma prototype. | [CinemaBuddy](https://cinema-buddy.vercel.app/) |
| Personal Portfolio | This website, presenting my work and professional background. | [Portfolio](https://nebreja-portfolio-website.vercel.app/) |

## Technology

HTML, CSS, JavaScript ES modules, native Web Components, and JSON. General Sans is served locally with its Fontshare license. The optional device scenes use self-hosted MIT-licensed Three.js 0.180.0 and original procedural geometry, with existing screenshots as screen textures. Web3Forms handles contact submissions; Vercel hosts the public website and the read-only GitHub activity function.

No build step or package installation is required. The Tech Stack section represents my broader skills, rather than this website's runtime dependencies.

## Run Locally

From the repository root, start a static HTTP server:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open [localhost:8000](http://127.0.0.1:8000/). Use HTTP instead of opening index.html directly because the site fetches JSON and uses JavaScript modules. XAMPP or a VS Code static server can also serve the project root.

## Project Structure

| Path | Purpose |
| --- | --- |
| index.html | Main page, hero, About, experience, and contact |
| data/content.json | Projects, galleries, certificates, tools, and contact configuration |
| css/ | Main and component styles |
| js/script.js | Components, navigation, dialogs, galleries, and contact behavior |
| js/motion.js | Scroll-driven typography and section animations |
| js/devices.js | Optional 3D device scenes, loaded near their sections |
| js/contributions.js | Accessible contribution calendar and dated fallback |
| api/github.js | Cached public GitHub activity endpoint for Vercel |
| data/github-contributions.json | Verified GitHub snapshot for network/service outages |
| assets/ | Portraits, screenshots, certificates, fonts, logos, and CV |
| tests/ | Browser, content, and motion checks |
| docs/ | Design notes and development documentation |

## Updating Content

- Edit data/content.json for Selected Works, project galleries, certificates, and Tech Stack.
- Edit index.html for the hero, About, experience, and contact details.
- Save media in assets/ and update the corresponding paths and alternative text.
- When replacing the CV, update both the hero and contact download links.
- Adjust presentation in css/ and animation in js/motion.js.

HTML files use two-space indentation for readable editing in VS Code.

## Contact Form

The form uses public configuration from data/content.json. It includes validation, spam protection, duplicate-submission prevention, timeout handling, and an email-draft fallback when configuration is missing. Never add private credentials or email passwords to frontend files.

Browser checks intercept contact requests locally and do not send real messages or verify inbox delivery.

## Verification

Run from the project root with Python and Node.js installed:

```sh
python verify_assets.py
python -m unittest discover -s tests -p "test_*.py"
node --test tests/motion.test.mjs tests/word-motion.test.mjs
node --test tests/github.test.cjs tests/contributions.test.mjs
```

With the local server running:

```sh
python verify.py http://127.0.0.1:8000
```

Open /tests/browser.html and click **Run checks** for interaction checks. /tests/visual.html provides a responsive review harness. Viewport emulation does not replace physical-device testing.

## Deployment

The public website is hosted on Vercel. Local changes appear publicly after the configured production branch is pushed and Vercel completes deployment. Serve the repository root as a static website; no build command is required.

Vercel runs the Node.js function in api/github.js without an additional npm dependency. It reads only the owner's fixed public GitHub calendar URL, validates the returned days/counts, and caches activity for an hour. It accepts GET/HEAD only and requires no GitHub token. On a plain static server, the calendar keeps its dated verified snapshot when the live endpoint is unavailable. Development design metadata is excluded from Vercel with .vercelignore.

The 3D runtime is optional: project media and all site controls remain available without it. Rendering pauses offscreen, uses a 30fps ceiling and a maximum 1.5 device pixel ratio, and honors reduced motion/Save-Data. Existing raster media carry source provenance in metadata or format-compatible JSON sidecars; these are source records, not duplicate image versions. Media pixels were verified unchanged against the pre-redesign backup.

## Contact and Ownership

[GitHub](https://github.com/Josh-L30) · [LinkedIn](https://www.linkedin.com/in/josh-nebreja-894248402/) · [Facebook](https://www.facebook.com/brad.josh.nebreja) · [Email](mailto:bradjosh.nebreja05@gmail.com)

Personal content, CV, and portraits belong to Brad Josh Nebreja. Project materials, certification marks, fonts, and third-party logos belong to their respective owners. See existing notices in docs/.
