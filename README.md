# Brad Josh Nebreja | Portfolio

Responsive static portfolio built with HTML, CSS and native JavaScript components. No build step or package install is required.

## Run locally

```sh
python -m http.server 8000
```

Open http://localhost:8000. Use HTTP rather than opening index.html directly because the components fetch JSON and use ES modules.

## Design and content

- Three-link top navigation (Projects, Experience, Contact) and a compact profile, full experience, education, About and contact details.
- Manual 3D project carousel with five entries, thumbnail controls and keyboard navigation. Image-first project details include a keyboard-operable thumbnail filmstrip, all 29 unique source screenshots and an on-demand video walkthrough.
- Certificate folio with five thumbnail credential selectors and an in-page full-size image viewer.
- Six categorized groups of original-color local tool logos, light/dark themes with saved preference, reduced-motion and reduced-transparency fallbacks.
- locally hosted Nunito Sans typography, responsive WebP previews, lazy images and no carousel autoplay or animation library.

## Files to edit

| Content | Location |
| --- | --- |
| Main page copy and section structure | index.html |
| Projects, galleries, tools, certificates and contact configuration | data/content.json |
| Page layout and effects | css/style.css |
| Shared form styles | css/components.css |
| Components, selectors, dialogs and navigation | js/script.js |
| Original media and optimized previews | assets/ |
| Component sources and license notices | docs/ |

Profile, experience, education and About values are also retained in JSON for reference; those sections currently render from index.html. Edit their HTML when changing visible copy.

## Contact form

Direct sending is enabled with the recipient-provided public key and verified through one successful production-browser submission. Brad still needs to confirm inbox/spam receipt. Direct sending uses the Web3Forms browser API. To replace its key, generate a public access key for bradjosh.nebreja05@gmail.com at https://web3forms.com/#start, retrieve it from Brad's email and set contact.accessKey in data/content.json. The access key aliases the recipient email and is intended for public client-side use; never enter an email password or private API token. Provider documentation: https://docs.web3forms.com/getting-started/installation and https://docs.web3forms.com/getting-started/api-reference.

Until the key is supplied, the form is clearly labelled Open email draft and opens the visitor's email app with Brad's address, subject and entered text. It retains the text and never claims to have sent it. With a key, it POSTs the validated name, email and message to Web3Forms. Success requires both a successful HTTP response and success === true in the JSON body. Rejections, malformed responses, network failures and timeouts retain the text. Pending submissions disable repeat requests. A hidden botcheck field is included. Messages are not stored by this site; the configured service processes them.

Mock tests cover provider acceptance, JSON rejection (including the string false), HTTP failure, malformed JSON, network failure and duplicate prevention. No real email delivery has been verified until the recipient's access key is configured and a live test is acknowledged.

## Verification

```sh
python verify_assets.py
python verify.py
```

Asset verification checks local HTML and JSON references, responsive galleries and certificate previews. Browser smoke verification expects the HTTP server on port 8000, or pass its URL as the first argument. Latest local Chrome evidence is recorded in docs/verification.json. The 320, 390, 768 and 1440px checks are viewport emulation, not physical-device tests. No deployment has been performed.

Personal content, CV, certificates and project media belong to Brad and their respective owners. Third-party component adaptations and logo licenses are documented in docs/.

Full-size project screens and certificates open in a near-fullscreen native dialog, with loading/error feedback and Close/Escape dismissal. Closing the image returns to the underlying project and restores focus. No image preview opens a new tab.

## Scroll motion and performance

Sections use short one-time transform/opacity reveals. Reduced-motion and data-saver users skip them. See docs/PERFORMANCE.md for measured Lighthouse results and test limitations. The local variable font is preloaded once, async content reserves space, and certificate/portrait images use responsive sizes.

## Website icon and social sharing

The browser favicon and Apple touch icon use Brad's existing portrait. Open Graph and Twitter large-card metadata are included directly in the HTML head, with absolute public URLs. The 1200x630 JPEG at assets/brad-hero-social-v1.jpg is captured from the actual light-theme hero design. Regenerate the image and update its versioned filename in the metadata when the hero changes. Previously cached platform previews may require a rescrape after publishing.

CinemaBuddy video is available through the always-visible Watch CinemaBuddy video demo button under the project picker and inside the CinemaBuddy project. The native player appears near the top of the details dialog, uses preload none and never autoplays. Original video metadata verified locally: 204.513 seconds, 1920x1080. Mobile navigation opens a separate absolute-positioned dropdown, leaving the sticky navbar's height unchanged; outside clicks, Escape and anchor selection dismiss it.
