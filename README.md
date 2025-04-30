# michaelconan.github.io

My personal site, developed using Jekyll / Ruby and GitHub Pages.

## GitHub Pages Site

### Development References

Reminders to help with build and/or guide others.

- [Navigation guidance](https://planetjekyll.github.io/snippets/nav-with-data) - adapted to horizontal header bar
- [Github metadata usage](https://jekyll.github.io/github-metadata/site.github/)
  - To use this locally, set `JEKYLL_GITHUB_TOKEN` variable with a Personal Access Token

#### Local Testing

Refer to [pages docs](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)

- Navigate to site directory (`./docs`)
- Run `bundle exec jekyll serve`

## Subscription Mechanism

To maintain the use of a static webpage but incorporate limited subscriptions, I set up an RSS feed on the site (using `jekyll-feed`), then used Google Forms, Sheets and Apps Script to handle subscription requests and new blog notifications.
