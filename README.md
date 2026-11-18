# Ray's Portfolio

Personal website for Shou-Yi (Ray) Hung, including projects, publications, technical blog posts, teaching, and CV. The production site is published with GitHub Pages at [shouyihung.com](https://shouyihung.com/).

## Write a blog post

Add a Markdown file to `_posts/` named `YYYY-MM-DD-your-post-title.md`, for example:

````markdown
---
title: "Your technical post title"
date: 2026-11-17
excerpt: "A short summary of the problem, approach, or result."
tags:
  - Machine Learning
  - Engineering
---

Write your post in Markdown. Fenced code blocks support syntax highlighting:

```python
print("Hello, world!")
```
````

Posts automatically appear at `/blog/`, grouped by year with tag counts, tag filtering, search, and newest/oldest sorting. Each post has its own `/blog/your-post-title/` page, reading time, and links back to the archive and tags. Keep filename slugs unique. Filters are stored in the URL, so filtered views can be bookmarked and shared. Posts also appear in the existing RSS feed at `/feed.xml`.

Use `published: false` in the front matter to keep an unfinished post out of the site. This site enables future-dated content, so a future date alone does **not** keep a post unpublished. Update `content_updated` in `_config.yml` when publishing new content. The separate informal blog remains linked at the top of the Blog page.

## Serve locally with Docker

Docker is the recommended development setup. You do not need to install Ruby or Jekyll on your machine.

```bash
docker-compose up --build
```

Open [http://localhost:4000](http://localhost:4000). The container watches the repository and refreshes the browser when files change.

To stop the server, press `Ctrl+C`. To remove the container afterward:

```bash
docker-compose down
```

After the first build, you can start it again with:

```bash
docker-compose up
```

## Serve locally without Docker

Ruby and Bundler are required.

```bash
bundle install
bundle exec jekyll serve --livereload
```

Then open [http://localhost:4000](http://localhost:4000).

## Production build

To verify the same static output GitHub Pages will serve:

```bash
docker-compose run --rm site bundle exec jekyll build
```

The generated site is written to `_site/`.

## Deploy to GitHub Pages

The repository is configured for GitHub Pages and the custom domain in `CNAME`. Push changes to the `master` branch; GitHub Pages will build and publish the Jekyll site automatically.

In the GitHub repository settings, **Pages → Build and deployment** should use **Deploy from a branch**, with `master` and `/ (root)` selected.

## Theme behavior

The site follows the visitor's system light/dark preference on first load. The toggle in the navigation lets them override it, and the choice is remembered in the browser.

## Credits

The original site structure is based on [Academic Pages](https://github.com/academicpages/academicpages.github.io) and [Minimal Mistakes](https://mademistakes.com/work/minimal-mistakes-jekyll-theme/).
