---
title: Building
subtitle: Learn to build apps natively and for the web
layout: learn
---

Along with running as a standard, interpreted Ruby script, you can also build a native and web-based version of your app. [Opal](http://opalrb.org) is used to convert your app to JavaScript, and [MRuby](http://mruby.org) to compile it to native code. Opal is installed with the Ruby 2D gem, but you'll have to install MRuby separately.

On **macOS**, we recommend using [Homebrew](https://brew.sh) to install MRuby:

```
brew install mruby
```

On **Linux**, install MRuby and its development files using `apt`:

```
sudo apt install mruby libmruby-dev
```

{% include warning.html icon="⚠️" message="We don't yet have instructions for installing MRuby on <b>Windows</b>, but we're working on it!" %}

With MRuby installed, using the "Hello Triangle" script you wrote above, run the following to build a native and web-based version of the app:

```
ruby2d build app.rb
```

Notice a `build/` directory was created containing an executable named either `app` on Unix-like systems, or `app.exe` on Windows. There's also an HTML file named `app.html` and a JavaScript file, `app.js`.

The executable is a compiled, native version of your app. It can run on any system, similar to the one you built it on, without the need for the full Ruby interpreter to be present. Let's try running the native app on the command line:

```bash
# Enter the `build/` directory
cd build

# Run on Unix-like systems
./app

# Run on Windows
app.exe
```

The web version of your app was transpiled, a source-to-source compilation, from Ruby to JavaScript. The `app.html` file contains a `<script>` tag linking to the `app.js` file containing the code for your application. When you open the HTML file in a web browser, the script will run, the `<canvas>` element will be created (your window), and the triangle will appear. Try opening the HTML file by simply double clicking it.

Whether you run your script using the Ruby interpreter, build and run it natively, or build it for the web, the results will all be the same.
