# vaproh.space

my personal corner of the internet. built with [hugo](https://gohugo.io) and a custom theme (`themes/vaproh-theme/`).

plain html, a little css, almost no javascript. it loads before you finish blinking.

## sections

- home, archive (writing), projects, photos, uses, about, socials

## local dev

```bash
hugo server
```

then open http://localhost:1313

## build

```bash
hugo --gc --minify
```

output goes to `public/`.

## structure

```
content/            markdown for every page
themes/vaproh-theme/ the whole theme: layouts, css, js
static/img/         project screenshots
data/photos.toml    photo captions, keyed by filename
```

## project pages

each project is a bundle under `content/projects/<name>/` with frontmatter (title, description, link, image, tags) and the readme as the body. clicking a card on the projects page opens a modal with the screenshot and the readme.
