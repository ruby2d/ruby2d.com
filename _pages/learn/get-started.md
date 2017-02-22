---
title: Get started
---

Ruby 2D lets you create 2D applications with ease, and run them just about anywhere. Before we get started, we'll need to get a library Ruby 2D uses to create native graphics called Simple 2D, which you can install using [these instructions](https://github.com/simple2d/simple2d#getting-started).

When you're ready, install the Ruby 2D gem:

```bash
gem install ruby2d
```

# Writing your first 2D app

After installing the gem, create a new Ruby script called `app.rb` and add the following two lines.

```ruby
require 'ruby2d'

show
```

TODO: Ruby 2D adds a domain-specific language to make creating 2D apps easy and shit.

This is the simplest Ruby 2D application you can write. The `require` statement tells Ruby to use the gem, and the `show` method tells Ruby 2D to show the empty window. Let's make this window more interesting by giving it a name and adding a shape. We'll use the `set` method to change the title of the window and add a colorful triangle.

```ruby
require 'ruby2d'

set title: "Hello Triangle"

Triangle.new(
  320,  50,
  540, 430,
  100, 430,
  ['red', 'green', 'blue']
)

show
```

Great! Now save your script and run it on the command line using:

```bash
ruby app.rb
```

You should see something like this...

<div style="margin-bottom:-35px;text-align:center">
  <img style="margin:0;width:100%;max-width:736px" src="/assets/img/triangle-shadow.png">
</div>

# Building natively and for the web

Along with running your app as a standard Ruby script, you can also build a native or web-based version. Using the "Hello Triangle" script you wrote above, run the following:

```bash
ruby2d build app.rb
```

Notice a `build/` directory was be created containing an executable named either `app` on Unix-like systems, or `app.exe` on Windows. There's also an HTML file named `app.html` and a JavaScript file, `app.js`.

The executable is a compiled version of your app using [MRuby](http://mruby.org). It can run on any system, similar to the one you built it on, without the need for the Ruby interpreter to be installed. Try running it from the command line:

```bash
# on Unix-like systems
./app

# on Windows
app.exe
```

The web version was transpiled, a source-to-source compilation, to JavaScript using [Opal](http://opalrb.org). The `app.html` file contains a `<script>` tag linking to `app.js`, so when you open it a web browser, the script will run and the window will be created. Try opening the HTML file just by double clicking it.

Whether you run your script using the Ruby interpreter, build and run it natively, or in a web browser, the result should all be the same.

# What's next?

Ready to learn more? [Explore the documentation](/learn) to discover everything Ruby 2D can do.
