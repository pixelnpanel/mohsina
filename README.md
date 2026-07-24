# Mohsina Binte Rahman — Portfolio

Personal portfolio website. Static HTML, CSS, and vanilla JavaScript — no build step,
no dependencies, hosted free on GitHub Pages.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All page content (hero, profile, skills, experience, education, publications, projects, credentials, contact) |
| `styles.css` | All styling, including responsive and print rules |
| `script.js` | Mobile nav, scroll reveal, active-section highlighting |

## Editing

Everything is plain text — open the files in any editor.

- **Change wording, add a job, add a publication** → `index.html`
- **Change colors** → the `:root` block at the top of `styles.css` (`--navy-800`, `--accent`, …)
- **Change section order** → move the `<section>` blocks in `index.html` and the matching
  links in the `<nav>`

After editing, commit and push — GitHub Pages redeploys automatically in about a minute.

```bash
git add -A && git commit -m "Update portfolio content" && git push
```

## Previewing locally

```bash
python3 -m http.server 8765
```

Then open <http://localhost:8765>. Opening `index.html` directly by double-clicking also
works, but serving it is closer to how GitHub Pages behaves.

## Adding a downloadable CV

Export the CV from Word as PDF, save it here as `Mohsina-Rahman-CV.pdf`, remove the
`*.docx` line from `.gitignore` if needed, and add a button in the hero section of
`index.html`:

```html
<a class="btn btn-ghost" href="Mohsina-Rahman-CV.pdf" download>Download CV</a>
```

Use a version of the CV with the street address removed before publishing it.

## Notes

- The source `.docx` is git-ignored on purpose: it contains a home address, and this
  repository is public.
- Fonts load from Google Fonts. If they fail, the page falls back to system fonts.
