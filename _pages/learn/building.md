---
title: Building
description: Learn how to package your app as a native executable or for the web
layout: learn
---

When your app is ready to share, the `ruby2d build` command packages it up. It can produce two things: a **native executable** that runs on its own, without Ruby installed, and a **web build** that runs in any browser. Run it with no flags and you get both at once:

```bash
ruby2d build app.rb
```

Or target just one with `--native` or `--web`. Either way, your Ruby is compiled with [mruby](https://mruby.org) rather than the CRuby interpreter you develop with, which is worth [keeping in mind](#a-note-on-mruby) for both targets.

# Native

`ruby2d build --native app.rb` compiles your app into a standalone native executable under `build/native/`. On macOS you also get an `App.app` bundle you can double-click or drop into your Applications folder. To run what you just built, use `launch`:

```bash
ruby2d launch --native
```

The build targets the machine it runs on, so build on a Mac to get a Mac app, build on Windows to get a Windows app, and so on. There's no cross-compiling.

Under the hood, a native build links [SDL3](https://libsdl.org) and mruby in as static libraries. Ruby 2D bundles these for the most common setups, where building works with no extra steps at all:

- **macOS** on Apple silicon
- **Windows** on x86-64 and ARM64

On anything else — Linux, Intel Macs, BSD — you'll need to get SDL3 in place once. [Setting up other platforms](#setting-up-other-platforms) walks through it.

# Web

Ruby 2D apps can also be compiled to WebAssembly and run directly in a browser — no plugins, no Ruby installation required on the player's machine. This part uses [Emscripten](https://emscripten.org), which provides the `emcc` compiler, so make sure it's installed and on your `PATH` before building for the web. (On platforms without the bundled libraries you'll also need the `mrbc` compiler; [Setting up other platforms](#setting-up-other-platforms) covers it.)

```bash
ruby2d build --web app.rb
```

If `emcc` isn't installed, a plain `ruby2d build` quietly skips the web build and still produces the native app. Ask for the web build explicitly with `--web` and the missing compiler becomes an error instead, so you find out right away.

## Output

A web build produces the following files inside a `build/web/` directory:

| File | Description |
|---|---|
| `app.html` | The HTML shell page |
| `app.js` | The compiled JavaScript/Wasm loader |
| `app.wasm` | The WebAssembly binary |
| `app.data` | Bundled asset data (always produced — includes the default font, plus anything from `--assets`) |

Open `app.html` in a browser to run your app.

When you deploy these files, serve them with gzip or Brotli compression. `app.wasm` is by far the biggest of the four and compresses to roughly a third of its size, which noticeably speeds up that first load. Most static hosts and CDNs (GitHub Pages, Netlify, Cloudflare, and friends) do this for you automatically; if you run your own server, switch it on there.

## Launching a local server

After building, you can preview your app with the built-in local server:

```bash
ruby2d launch --web
```

This starts a simple HTTP server and opens the app in your default browser. (Browsers require a server for WebAssembly. Double-clicking `app.html` won't work.)

## Bundling assets

If your app loads images, audio, or other files at runtime, bundle them into the build with `--assets`:

```bash
ruby2d build --web --assets assets/ app.rb
```

The contents of `assets/` will be available at the same relative path inside the WebAssembly environment, so your existing file paths should just work.

## Custom HTML page

Ruby 2D wraps your app in a default HTML page, but you can supply your own with `--template`:

```bash
ruby2d build --web --template page.html app.rb
```

Your template just has to load the compiled app and give it a canvas to draw on. The easiest way to start is from the built-in page: run a plain `ruby2d build --web`, copy the generated `build/web/app.html`, and edit from there. The essentials it sets up are:

- A `<canvas id="canvas">` element for rendering.
- A `Module` object whose `canvas` property points at that element (and, optionally, a `print` function to capture output).
- `<script async src="app.js"></script>` to load the compiled app.

For a [single-file](#single-file-output) build, the template is handed to Emscripten as its [shell file](https://emscripten.org/docs/tools_reference/emcc.html) instead, so it follows that format: drop a `{% raw %}{{{ SCRIPT }}}{% endraw %}` placeholder where the inlined app code should go, rather than a `<script src>` tag.

## Single-file output

Want to share your app as one self-contained file? The `--single-file` option merges everything into a single HTML file with no external dependencies:

```bash
ruby2d build --web --single-file app.rb
```

This is handy for sharing demos or uploading to sites that accept a single HTML file.

## Frame rate

On the web, the render loop is driven by the browser's `requestAnimationFrame`, so your app runs at the display's refresh rate, including the fast ones (120Hz and up). Write your motion to be [frame-rate independent with `dt`](/learn/window#moving-things-at-a-steady-speed) so it looks the same whatever the refresh rate. This matters even more on the web than on the desktop: a busy scene may not keep up with a native frame rate, since mruby is slower than CRuby and WebAssembly trails native code.

A couple of browser specifics worth knowing:

- **Chrome** and **Firefox** run at the full refresh rate by default.
- **Safari** caps `requestAnimationFrame` at 60Hz unless you turn off the **"Prefer Page Rendering Updates near 60fps"** flag (Safari › Develop › Feature Flags). With it off, Safari matches the display refresh rate too.

# Setting up other platforms

On the common setups, everything you need is already bundled. On anything else — Linux, Intel Macs, BSD — you'll get the libraries in place once, and the same step covers both targets: SDL3 for native builds, and the `mrbc` compiler for web builds. If SDL3 isn't found when you install the gem, Ruby 2D installs _without_ its native extension and prints instructions for finishing the job. (You'll see the same note if you try to run an app before it's set up.) You've got two ways to complete it.

## Install SDL3 with your package manager

Install SDL3, then rebuild the extension:

```bash
# Debian / Ubuntu
sudo apt install libsdl3-dev libsdl3-image-dev libsdl3-mixer-dev libsdl3-ttf-dev
gem pristine ruby2d
```

Use whatever your distribution calls the SDL3 packages — the install message spells out the exact command for your system, and the [Linux setup guide](/learn/linux#install-packages) lists the common distros. SDL3 is fairly new, so if your package repository doesn't carry it yet, use the next option instead.

## Let Ruby 2D build the libraries

`ruby2d setup` compiles SDL3 and mruby for you, no system packages required:

```bash
ruby2d setup
```

It clones and builds both from source (so it needs `git`, `cmake`, and a C compiler, and takes a few minutes), caches the result, and rebuilds the extension. It prints where it cached everything when it runs. These are the same libraries a build links against, and it provides `mrbc` for web builds too, so this one step covers running _and_ building apps, native or web.

A couple of handy flags:

```bash
ruby2d setup --force   # rebuild even if the libraries are already there
ruby2d setup --clean   # remove the built libraries for this platform
```

It's worth re-running `ruby2d setup` after you upgrade Ruby 2D, since a newer version may pin newer SDL or mruby.

# A note on mruby

Both native and web builds use [mruby](https://mruby.org), a lightweight, embeddable implementation of Ruby, rather than the standard CRuby/MRI interpreter you use during development. For most Ruby 2D apps this won't matter, but it's good to be aware of a few differences:

- **Standard library:** mruby has a smaller standard library. Some classes and methods you're used to from CRuby may not be available or may behave slightly differently.
- **Gems:** most gems won't work in mruby, since they're written for CRuby. Stick to plain Ruby code and the Ruby 2D API in the parts of your app that get compiled.
- **C extensions:** not supported. mruby can use its own native extensions (mrbgems), but standard CRuby gems with C extensions won't compile.
- **`require`:** mruby handles `require` differently. `require 'ruby2d'` works as expected, but requiring gems or standard library files may not.

The practical upshot: write your game logic in straightforward Ruby, lean on the Ruby 2D API, and you'll generally be fine. If something works in development but breaks in a build, mruby compatibility is a good first thing to check.

# Cleaning up

To remove the `build/` directory and start fresh:

```bash
ruby2d build --clean
```
