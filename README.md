# Brad Josh Nebreja — Personal Portfolio

A cinematic portfolio showcasing my web development, UI/UX design, and QA work, alongside my experience, skills, education, certifications, and CV.

**[Visit my portfolio](https://nebreja-portfolio-website.vercel.app/)**

## Features

- Responsive desktop and mobile layouts with a black-and-white interface and original-color media.
- Glass navigation, animated mobile menu, and professional social links.
- Reversible scroll-driven typography with reduced-motion and Save-Data support.
- In-page project stories and certificate previews in glass dialogs.
- Four Selected Works, five certifications, Tech Stack, experience, and education.
- Downloadable CV, contact form, Privacy, and Terms pages.

## Selected Works

| Project | Overview | Live site |
| --- | --- | --- |
| CPC Centralized System | Sales, production, inventory, and logistics operations. | Private to protect client information. |
| Checkpoint | Bus-stop and arrivals website, with development and QA contributions. | [Checkpoint](https://onroute.cloud/) |
| CinemaBuddy | A 2024 school project featuring UI design and a Figma prototype. | [CinemaBuddy](https://cinema-buddy.vercel.app/) |
| Personal Portfolio | This website, presenting my work and professional background. | [Portfolio](https://nebreja-portfolio-website.vercel.app/) |

## Technology

HTML, CSS, JavaScript ES modules, native Web Components, and JSON. Fonts are served locally using Clash Display and Satoshi. Web3Forms handles contact submissions; Vercel hosts the public website.

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
| index.html | Main page, hero, About me, experience, education, and contact |
| privacy.html / terms.html | Portfolio policies |
| data/content.json | Projects, galleries, certificates, tools, and contact configuration |
| css/ | Main, component, and legal-page styles |
| js/script.js | Components, navigation, dialogs, galleries, and contact behavior |
| js/motion.js | Scroll-driven typography and section animations |
| assets/ | Portraits, screenshots, certificates, fonts, logos, and CV |
| tests/ | Browser, content, and motion checks |
| docs/ | Design notes and development documentation |

## Updating Content

- Edit data/content.json for Selected Works, project galleries, certificates, and Tech Stack.
- Edit index.html for the hero, About me, experience, education, and contact details.
- Save media in assets/ and update the corresponding paths and alternative text.
- When replacing the CV, update both the hero and contact download links.
- Adjust presentation in css/ and animation in js/motion.js.
- Keep Privacy and Terms accurate when changing external services or contact handling.

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
```

With the local server running:

```sh
python verify.py http://127.0.0.1:8000
```

Open /tests/browser.html and click **Run checks** for interaction checks. /tests/visual.html provides a responsive review harness. Viewport emulation does not replace physical-device testing.

## Deployment

The public website is hosted on Vercel. Local changes appear publicly after the configured production branch is pushed and Vercel completes deployment. Serve the repository root as a static website; no build command is required.

## Contact and Ownership

[GitHub](https://github.com/Josh-L30) · [LinkedIn](https://www.linkedin.com/in/josh-nebreja-894248402/) · [Facebook](https://www.facebook.com/brad.josh.nebreja) · [Email](mailto:bradjosh.nebreja05@gmail.com)

Personal content, CV, and portraits belong to Brad Josh Nebreja. Project materials, certification marks, fonts, and third-party logos belong to their respective owners. See existing notices in docs/.
