# Cinematic redesign browser verification

24 October 2026. Source: root NebrejaPortfolio checkout on local cinematic-portfolio branch. The nested checkout was not modified. Baseline was clean at 9e5b19b, with a source backup in the conversation workspace.

## Evidence

- tests/browser.html: 77/77 checks passed in the in-app Chromium browser after fixes.
- tests/test_content.py: 2/2 content-preservation checks passed.
- tests/motion.test.mjs: signature progress clamps to its bounds.
- verify_assets.py: local references and responsive galleries preserved.
- verify.py: HTTP/module/styles/content smoke check.
- Real keyboard Escape: image closes while project stays open; second Escape closes project and restores the CPC trigger.
- Visual review at 320/390px and desktop: dark hero, project presentation and interactions inspected. Four-width layout checks cover 320/390/768/1440 in both appearances.
- Body/secondary text contrast checked from computed colors in both themes. Native focus outlines use the accent color.
- Reduced-motion preference changes, Save-Data, static dialog fallback, failed preview recovery, five certificate viewers and nested focus/scroll behavior checked.
- Form provider accept/reject, HTTP failure, malformed JSON, simulated network/timeout errors and duplicate submission checked with intercepted requests only. Actual provider timing/delivery is not claimed.

Baseline browser harness: 35/44 passed; the expected new default-dark/showcase/signature behavior and old focus/scroll defects failed. After redesign: 44/44, then expanded 74/74. Independent review identified CSS dialog travel under Save-Data. New tests reproduced both static-dialog failures; a targeted 200% text enlargement test also reproduced narrow-screen overflow. Shared preference state and layout reflow fixed all three; final suite 77/77.

## Independent review

Read-only frontend review found one actionable P2: Save-Data did not disable the CSS dialog entrance. Fixed by exposing static-motion state to CSS, including connection/preference changes and optional-module failure. The reviewer confirmed the contact component was unchanged and unique gallery paths were preserved. Reviewer Git access and additional browser connectivity were limited, so source/baseline comparison was used rather than a fully executed independent browser suite.

## Manual limitations and rulings

- Viewport tests and simulated motion/Save-Data are not physical-device or OS-setting tests. Real iOS/Android keyboard, safe areas and browser chrome still require hardware.
- The headless Taste inspector could not run reliably (Chrome/Edge subprocess/CDP timeouts). No zero-FAIL inspector or Lighthouse score is claimed. In-app Chromium evidence and static lint were used instead.
- Existing input borders are intentional form affordances. Project/certificate image numbering is functional gallery navigation rather than decorative section numbering; zero-padding was removed.
- Existing Nunito Sans and all real imagery were reused; no new type/asset dependency was needed.
- No separate worktree was made: clean baseline, separate feature branch, and recoverable source backup protect the requested live local folder. No main-branch edits, push, merge or deployment.
- 200% text was simulated by doubling computed sizes of text-bearing elements at 320px; that passes after wrapping fixes, but does not substitute for every OS/browser accessibility setting.
- Source and native-module loading failures leave direct HTML contact/CV/navigation available. Native JS controls still require JavaScript as before.

## Reproduce

Serve this root over HTTP. Run the commands in README.md. Open tests/browser.html and press Run checks. The result must end 77/77 passed. Inspect tests/visual.html at each width and both appearances. Never test delivery with a real POST without the owner's authorization.
