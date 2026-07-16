# Ray's Portfolio

Personal website for Shou-Yi (Ray) Hung, including projects, publications, teaching, and CV. The production site is published with GitHub Pages at [shouyihung.com](https://shouyihung.com/).

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

## Update the homepage news

Edit `_data/news.yml` to add, remove, or change news items. Each item supports a date, a short sentence, and an optional internal link:

```yaml
- date: 2026-07-16
  text: "A short update goes here."
  url: "/publication/example"
```

The homepage sorts entries by `date` automatically and displays only the latest five. The file can contain more than five items; older entries remain stored but are not shown on the homepage.

## Credits

The original site structure is based on [Academic Pages](https://github.com/academicpages/academicpages.github.io) and [Minimal Mistakes](https://mademistakes.com/work/minimal-mistakes-jekyll-theme/).
