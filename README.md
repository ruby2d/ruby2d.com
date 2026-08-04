# The Ruby 2D website

View at [ruby2d.com](https://www.ruby2d.com)

Run `rake` to build and view locally at `http://localhost:4000`

Run `rake update` to update all gem dependencies

## Styles

Edit styles in `_css/app.css` (Tailwind CSS v4 source). This file is not served directly — it gets compiled into `assets/css/app.css`, which is what the site uses.

`rake` compiles the CSS before serving, so the compiled file stays up to date locally. Before committing style changes, run `rake` to ensure `assets/css/app.css` is current, then commit both files.

> GitHub Pages runs Jekyll in safe mode, which disables custom plugins like `jekyll-tailwind`. Committing the pre-built CSS means GitHub Pages can serve the site without needing to run the plugin.
