# Working on This Site in VS Code

## Step 1 — Get the files into one folder

1. Download `personal-website.zip` (shared alongside this file).
2. Move it somewhere permanent, e.g. `Documents/personal-website.zip`.
3. Unzip it:
   - **Mac:** double-click the zip file.
   - **Windows:** right-click → "Extract All."
4. You should now have a folder called `personal-website` containing all the
   `.html` files, `style.css`, and these guide files.

## Step 2 — Open the folder in VS Code

1. Open VS Code.
2. Go to **File → Open Folder...** (not "Open File").
3. Select the `personal-website` folder you just unzipped.
4. The left sidebar (Explorer) now lists every file — click any `.html` or
   `.css` file to open and edit it.

## Step 3 — Install Live Server (so you can preview as you edit)

1. Click the **Extensions** icon in the far-left sidebar (looks like four
   squares, one detached).
2. Search for **"Live Server"** by Ritwick Dey.
3. Click **Install**.

To use it: right-click `index.html` in the Explorer sidebar → **"Open with
Live Server."** Your browser opens the site automatically, and it
refreshes itself every time you save a file — no manual reloading, no
terminal commands needed.

(If you'd rather not install an extension, the terminal method from
`README.md` — `python3 -m http.server 8000` — works too.)

## Step 4 — Edit and save

1. Click a file in the Explorer to open it in the editor.
2. Make your changes.
3. Save with **Cmd+S** (Mac) or **Ctrl+S** (Windows).
4. If Live Server is running, your browser tab updates automatically.

Follow `GETTING-STARTED.md` for exactly what to change first — bio, photo,
resume, links, a blog post, and project content.

## Step 5 — When you're ready to publish

VS Code has built-in Git support (the icon that looks like a branching
line, in the left sidebar):

1. Click that icon → **"Initialize Repository."**
2. Stage your changes (the `+` icon next to each file, or "Stage All").
3. Type a commit message (e.g. "Add my bio and photo") and click the
   checkmark to commit.
4. Click **"Publish Branch"** — VS Code will prompt you to sign in to
   GitHub and create a repository for you.
5. Once pushed, follow the "Deploy with GitHub Pages" section in
   `README.md` to turn it into a live URL.

You can repeat steps 3–4 in VS Code's Source Control panel every time you
make new edits — it's the same "save → commit → publish" loop each time.
