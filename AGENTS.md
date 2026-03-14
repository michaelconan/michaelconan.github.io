# AGENTS.md — michaelconan.github.io

## Project Summary

This is a personal Jekyll / GitHub Pages site for Michael Conan — a technology consultant at PwC Dublin, originally from Portland, Oregon. The site is deployed from the `docs/` directory via the `gh-pages` branch and uses the Cayman remote theme.

**Structure:**
- `docs/` — Jekyll site root (served by GitHub Pages)
  - `_posts/` — published blog posts (filename format: `YYYY-MM-DD-slug.md`)
  - `_drafts/` — unpublished draft posts
  - `_data/` — structured YAML data (profiles, projects, navigation)
  - `_includes/` — custom HTML includes (e.g. `head-custom.html`)
  - `assets/css/style.scss` — custom CSS overriding the Cayman theme
  - `index.md` — home/about page
  - `blog.md` — blog listing with Google Form + Substack subscription iframes
  - `profile.md` — professional background and skills
  - `projects.md` — auto-populated from GitHub public repos via `jekyll-github-metadata`
- `subscription/` — Google Apps Script for email subscription notifications
- `Makefile` — build/serve shortcuts

**Content tone:** Personal, reflective, British English spellings (the author lives in Dublin). Posts cover personal life, travel, family, faith, and technology. Tech posts often relate to the author's consulting work with data, AI, automation, and personal productivity tooling (Jira, HubSpot, Notion).

---

## How Agents Should Help

### Blog Post Revision

When revising or drafting blog posts in `docs/_posts/` or `docs/_drafts/`:

- **Preserve voice:** Michael's writing is measured, thoughtful, and personal. Avoid adding enthusiasm, hype, or listicle patterns not already present.
- **British English:** Use British spellings and conventions (e.g. *organised*, *colour*, *practise* (verb), *programme*). The author is American-born but writes in British English.
- **Front matter:** Every published post requires front matter with at minimum `layout: post`, `title`, `categories`, and ideally `description` and `tags`. The `layout` line is sometimes commented out in drafts — un-comment it when publishing.
- **Categories and tags:** Posts are grouped by category on the blog page. Existing categories include `personal` and `tech`. Tags can be freeform.
- **Filename convention:** `YYYY-MM-DD-kebab-case-title.md` — use the actual publish date.
- **Do not add emojis** unless they already appear in the draft title or body.
- **Excerpts:** Jekyll uses the first paragraph as the excerpt shown on the blog listing. Keep the opening paragraph tight and representative.

### Site Enhancement

When making changes to the site layout, styles, or content pages:

- **Theme:** The site uses `pages-themes/cayman@v0.2.0` as a remote theme. Custom overrides go in `assets/css/style.scss` and `_includes/head-custom.html`. Avoid forking the theme.
- **CSS:** The custom stylesheet extends the Cayman base. Keep additions scoped and minimal.
- **Navigation and data:** Site navigation and profile links are driven by YAML in `docs/_data/`. Prefer editing data files over hardcoding values in layouts.
- **Subscription mechanism:** The email subscription flow uses a Google Form embedded as an iframe in `blog.md`. Do not replace or remove this without confirming with the author.
- **Jekyll plugins:** Only plugins whitelisted by GitHub Pages are available in production. Do not add arbitrary plugins without verifying compatibility.
- **Local testing:** Navigate to `docs/` and run `bundle exec jekyll serve`. Set `JEKYLL_GITHUB_TOKEN` for the `site.github` metadata to resolve locally.

### Git and PR Workflow

- The site is deployed from the **`gh-pages`** branch (default branch).
- Feature branches should be opened as PRs targeting `gh-pages`, not `main`.
- Commit messages should be short and descriptive. Prefix with a conventional type where it fits: `feat:`, `fix:`, `content:`, `style:`, `chore:`.
- Do not push directly to `gh-pages`.

### What to Avoid

- Do not rewrite or substantially restructure posts without explicit instruction.
- Do not change the author's personal details or opinions in text.
- Do not add tracking scripts, third-party embeds, or external dependencies without confirmation.
- Do not alter the subscription iframes or Google Analytics configuration.
