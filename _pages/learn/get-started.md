---
title: Get started
subtitle: Ruby 2D lets you create 2D applications with ease using Ruby, and run them just about anywhere
layout: learn
---

## Set up your environment and install dependencies

Before installing the gem, we'll need to install a few dependencies, namely a native graphics engine Ruby 2D will use behind the scenes called [Simple 2D](https://github.com/simple2d/simple2d).

On **macOS**, we recommend using [Homebrew](https://brew.sh) and running:

```bash
brew tap simple2d/tap
brew install simple2d
```

**Troubleshooting macOS High Sierra**
```bash
Error: Could not symlink Frameworks/Simple2D
$ mkdir -m 777 /usr/local/Frameworks
$ brew link simple2d
```

On **Linux**, run the install script by pasting this snippet in your terminal:

```bash
url='https://raw.githubusercontent.com/simple2d/simple2d/master/bin/simple2d.sh'; which curl > /dev/null && cmd='curl -fsSL' || cmd='wget -qO -'; bash <($cmd $url) install
```

On **Windows**, learn how to [set up your environment »](/learn/windows)

## Install the gem

Now you're ready to install the Ruby 2D gem:

```bash
gem install ruby2d
```

# Writing your first 2D app

After installing the gem, create a new Ruby script called `app.rb` and add the following two lines.

```ruby
require 'ruby2d'

show
```

This is the simplest Ruby 2D application you can write. The `require` statement adds the Ruby 2D domain-specific language and classes, and the `show` method tells Ruby 2D to show the empty window. Let's make this window more interesting by giving it a name and adding a shape. We'll use the `set` method to change the title of the window and add a colorful triangle.

```ruby
require 'ruby2d'

set title: "Hello Triangle"

Triangle.new(
  x1: 320, y1:  50,
  x2: 540, y2: 430,
  x3: 100, y3: 430,
  color: ['red', 'green', 'blue']
)

show
```

Great! Now save your script and run it on the command line using:

```bash
ruby app.rb
```

You should see this impressive triangle...

<img style="margin-bottom:-2rem" src="/assets/img/triangle-shadow.png">

Congrats, you just built your first Ruby 2D app! 🎉

# Building natively and for the web

Along with running as a standard, interpreted Ruby script, you can also build a native and web-based version of your app. [Opal](http://opalrb.org) is used to convert your app to JavaScript, and [MRuby](http://mruby.org) to compile it to native code. Opal is installed with the Ruby 2D gem, but you'll have to install MRuby separately.

On **macOS**, we recommend using [Homebrew](https://brew.sh) to install MRuby:

```bash
brew install mruby
```

On **Linux**, install MRuby and its development files using `apt`:

```bash
sudo apt install mruby libmruby-dev
```

{% include warning.html icon="⚠️" message="We don't yet have instructions for installing MRuby on <b>Windows</b>, but we're working on it!" %}

With MRuby installed, using the "Hello Triangle" script you wrote above, run the following to build a native and web-based version of the app:

```bash
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
