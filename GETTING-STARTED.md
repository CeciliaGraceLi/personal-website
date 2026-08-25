# Getting Started — Fill In What's Left

Most of the real content (bio, experience, skills, resume) is already in
place, pulled from your resume. This walks through what's left: adding a
photo, checking your links, and writing blog posts going forward.

**Tip:** Use Cmd+F / Ctrl+F to search for the text mentioned below.

---

## Step 1 — Preview the site as you go

```bash
cd path/to/this/folder
python3 -m http.server 8000
```

Open `http://localhost:8000`. Keep this running and refresh the browser
after each edit. (Or use VS Code's "Live Server" extension — see
`VSCODE-SETUP.md`.)

---

## Step 2 — Your hero photo

`assets/photo-cutout.png` is already in place — it's a background-removed
crop of your photo, cropped at the shoulder so it layers cleanly over the
big "Cecilia / Li" text in the hero (see `index.html`, the
`.hero-photo-cutout` div).

If you'd rather swap in a different photo later: save a new cutout (PNG,
transparent background) into `assets/` and either overwrite
`photo-cutout.png` or update the `src` in `index.html`'s
`.hero-photo-cutout` block to point at the new filename. Tools like
remove.bg or Photoshop's "Remove Background" work well for this — aim for
a similar shoulders-up crop so it fits the same space.

---

## Step 3 — Double-check your links

In `index.html`, search for `github.com/CeciliaGraceLi` — it's used in
three places (Hero, and both project cards' "GitHub ↗" links). Right now
all three point at your GitHub profile. Once you push the Wage Inequality
and Predictive Risk projects to their own repos, update each project
card's link to point directly at that repo instead of your profile, e.g.:

```html
<a href="https://github.com/CeciliaGraceLi/wage-inequality-analysis" ...>
```

Also confirm `li.ceciliagrace@gmail.com` (Contact section) and your
LinkedIn URL are still correct.

---

## Step 4 — Write a blog post

1. **Duplicate the template.** Copy `fidelity-hr-analytics.html` and rename the copy
   to something like `blog-post-2.html`.
2. **Edit the new file:**
   - `<title>` tag
   - `<p class="eyebrow">July 2026</p>` → the real date
   - `<h1>...</h1>` → your post's title
   - The placeholder text inside `<div class="detail-block">` → your
     actual writing. The `<ul>` bullet list is just a thinking prompt —
     delete it once you've used it to structure your paragraphs.
3. **Link it from the blog hub.** Open `blog.html`, copy one
   `<a class="card">...</a>` block in the `card-grid`, and point it at
   your new file:

```html
<a href="blog-post-2.html" class="card">
  <p class="card-tag">August 2026</p>
  <h3>Your Post Title Here</h3>
  <p>One sentence describing what the post is about.</p>
</a>
```

4. **Also add it to the Blog preview on the homepage** (`index.html`,
   `id="blog"` section) if you want your newest post to show up there too
   — swap in the new file/title/date the same way.

Repeat for every new post.

---

## Step 5 — Fill in project case study details you skipped

`wage-inequality.html` and `predictive-risk.html` are already written
using the real facts from your resume. If you want to add more detail —
specific R², p-values, accuracy/precision numbers, or a confusion matrix
— look for the `<div class="stat-row">` blocks and add a new `<div
class="stat">` following the same pattern:

```html
<div class="stat">
  <div class="value">0.42</div>
  <div class="label">R²</div>
</div>
```

---

## Once everything's filled in

Deploy it — see the "Deploy with GitHub Pages" section in `README.md`.
