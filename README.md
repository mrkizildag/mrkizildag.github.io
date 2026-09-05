# mrkizildag.github.io

Personal site. One static page, no build step, no dependencies, no webfonts.

| File | What it is |
| --- | --- |
| `index.html` | The page. Content and styles both live here. |
| `404.html` | Not-found page. |
| `favicon.svg` | Monogram. |
| `portrait.jpg` | 640&times;960, 66 KB. |
| `.github/workflows/deploy.yml` | Copies those four files to GitHub Pages on push to `main`. |

## Design constraints

Two rules the page is built around, both easy to break by accident:

1. **It must never scroll** — no vertical or horizontal overflow at any
   viewport. Spacing and type vary continuously with viewport height
   (`--u` and `--step`) rather than stepping through fixed `max-height`
   tiers, because fixed steps always leave a size that falls between them.
   The binding cases are landscape phone (844&times;390) and short laptop
   (1024&times;500), not the obvious desktop and phone sizes.
2. **No webfonts.** The page is set in the system monospace stack. Beyond
   costing nothing to load, this removes a real failure mode: a fallback
   face usually sets *wider* than the webfont it replaces, which makes the
   page taller and can break rule 1 whenever the font CDN is unreachable.

`.portrait` pins `height: auto` in CSS. Without it the `height="960"` HTML
attribute overrides `aspect-ratio` and renders the image 960px tall.

## Running it locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Checking the no-scroll rule

`variants/_check.html` (git-ignored, never deployed) loads the page in an
exactly-sized iframe and reports real overflow. Note that headless Chrome
clamps its window to ~500px minimum width, so screenshots at small widths
are misleading — measure through the iframe instead.

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --virtual-time-budget=6000 \
  --user-data-dir=/tmp/chrome-throwaway --password-store=basic \
  --dump-dom "http://localhost:8000/variants/_check.html?f=../index.html&w=844&h=390" \
  2>/dev/null | grep -o '<title>[^<]*</title>'
```

`--password-store=basic` and `--user-data-dir` matter: without them Chrome
opens your real profile and triggers a macOS Keychain prompt.
