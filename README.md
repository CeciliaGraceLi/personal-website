# Cecilia Li — Personal Site

A single-page portfolio (Hero, About, Projects, Experience, Skills, What
I'm Exploring, Blog preview, Resume, Contact) plus a few linked subpages
for project case studies and blog posts. Light, professional theme —
plain HTML/CSS, no frameworks, no build step.

## Files

```
index.html             Main site — all sections live here, linked by anchor (#about, #projects, etc.)
wage-inequality.html    Full case study: Wage Inequality Econometric Analysis
predictive-risk.html    Full case study: Predictive Risk Analytics
blog.html               Blog hub — links to all posts
fidelity-hr-analytics.html        Blog post template/example
style.css               Shared stylesheet (numbered, commented sections, light + dark theme)
site.js                 Shared behavior: dark mode, mobile nav, scroll-spy, reveal animations,
                         animated counters, scroll progress bar, loading screen
assets/resume.pdf        Your resume — embedded on the Resume section and used by the Download button
assets/photo-hero-bg.jpg Your photo — used as the hero background and in the About section
README.md               This file
GETTING-STARTED.md      Step-by-step: what to edit and where
VSCODE-SETUP.md         How to open and preview this in VS Code
```

Note: earlier drafts of this site had separate `projects.html`,
`leadership.html`, and `catalyst.html` pages. Those are no longer linked
from the nav — Projects now lives at `index.html#projects`, and the
Student Union / dining feedback story is folded into the Experience
section as its own card.

## What's new in this pass

- **Dark mode** — toggle in the nav, remembered via `localStorage`.
- **Scroll-spy nav** — the current section highlights itself as you scroll.
- **Animated stats, timeline, and skill bars** — trigger once each scrolls
  into view (see `site.js`).
- **Hero photo** — your actual photo, used as a full-width background with
  a gradient fade rather than a cut-out silhouette. Edit
  `.hero-bg-photo`'s `background-position` in `style.css` if you want to
  reframe it later.
- All interactive behavior lives in one file, `site.js`, included on
  every page — nothing to duplicate when you add new pages.

## Preview it locally

```bash
cd path/to/this/folder
python3 -m http.server 8000
```

Visit `http://localhost:8000`. (Or use the VS Code "Live Server"
extension — see `VSCODE-SETUP.md`.)

## Updating your resume

`assets/resume.pdf` is already your real resume. To update it later, just
replace that file with a new export (keep the filename `resume.pdf` so
the embed and download button keep working).

## Deploy with GitHub Pages (free hosting)

1. Create a GitHub repo (e.g. `ceciliagraceli.github.io` for a root
   domain, or any name for a project site).
2. Push these files to the repo's `main` branch.
3. In the repo, go to **Settings → Pages**, set the source to the `main`
   branch, root folder.
4. GitHub gives you a live URL within a minute or two.

## Suggested next steps

1. Fill in the `[bracketed]` placeholder in `fidelity-hr-analytics.html` with your
   real reflection, or write a new post (see `GETTING-STARTED.md`, Step 6).
2. Add a real headshot (see Step 3 in `GETTING-STARTED.md`).
3. Double-check the GitHub links on the two project cards — they currently
   point to your profile (`github.com/CeciliaGraceLi`); update them once
   you've pushed the actual project repos.
4. Deploy to GitHub Pages so you have a live link to share.

## A few ideas worth considering later

- **Open Graph tags** (`<meta property="og:...">`) so the link looks good
  when shared in LinkedIn/email/Slack — happy to add these once the site
  has a real deployed URL and photo.
- **Favicon** — a small branded tab icon; a quick addition once you're
  happy with the content.
- A one-line **"currently open to Summer 2027 internships"** note near
  the hero, if that's accurate — recruiters scan for this.

## Learning notes

`style.css` is organized into 19 numbered sections, each with a comment
explaining the CSS concept it demonstrates (CSS variables, sticky nav,
Grid card layout, pill-shaped tags, media queries, etc.).
