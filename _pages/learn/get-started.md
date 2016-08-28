---
title: Get Started
---

{% include warning.html icon="⚠️" message="<b>Warning:</b> This project is still under development and many things have yet to be implemented. <a href=\"/roadmap\">Check out the roadmap</a> to get an overview of what's working, the platforms currently supported, and what's in progress." %}

{% include warning.html icon="❗" message="Ruby 2D only supports <b>OS X</b> (10.11+) and <b>Linux</b> (Ubuntu) for now. More platforms coming soon." %}

Ruby 2D lets you create 2D applications with ease, and run them just about anywhere. One dependency you'll need is a graphics and media library called [Simple 2D](https://github.com/simple2d/simple2d).

- **On OS X**, the Ruby 2D gem will use [Homebrew](http://brew.sh) to install this library. You don't have to use Homebrew, but it makes things much simpler. Check out the [`simple2d.rb` formula](https://github.com/simple2d/homebrew-tap/blob/master/simple2d.rb) to see exactly what gets installed.

- **On Linux**, install this library by following [these instructions](https://github.com/simple2d/simple2d#welcome-to-simple-2d).

When you're ready, install the Ruby 2D gem:

```bash
gem install ruby2d
```

## Writing Your First App

After installing the gem, create a new Ruby script called `app.rb` and add the following two lines.

```ruby
require 'ruby2d'

show
```

This is the simplest Ruby 2D application you can write. The `require` statement tells Ruby to use the gem, and the `show` method tells Ruby 2D to show the empty window. Let's add a shape to make this window more interesting. Add the following triangle to your `app.rb` file.

```ruby
require 'ruby2d'

Triangle.new(320, 50, 540, 430, 100, 430,
[
  [1.0, 0, 0, 1.0],
  [0, 1.0, 0, 1.0],
  [0, 0, 1.0, 1.0]
])

show
```

Great! You can now run the app in several ways...

### Running as a Script

Just like other Ruby scripts you're probably use to, this one can be run from the command line just the same.

```bash
ruby app.rb
```

The window should appear with the triangle at the center. When you're done, close it using the buttons on the window title bar, or by pressing the `escape` key.

### Running Natively

{% include warning.html icon="❗" message="Building native apps is not yet implemented 😕" %}

You can also compile and run Ruby 2D apps natively, with the help of [mruby](http://www.mruby.org). This is useful when distributing applications to platforms where the Ruby interpreter may not be available, or you want your app to be lean and maximize performance.

From the command line, we can use the `ruby2d` utility. Run the following to build the application:

```bash
ruby2d build native app.rb
```

This will create a `/build` directory if one does not exist. Your `app.rb` file will be read and combined with the Ruby 2D library to produce a new `.rb` file in that directory. mruby will create intermediate code from that file, generate a `.c` source file, then compile it to an executable. The final app can now be run from the command line using `./build/app`.

### Running in a Web Browser

{% include warning.html icon="❗" message="Building web apps is also not yet implemented 😢" %}

For even greater distribution, apps can be compiled to JavaScript using [Opal](http://opalrb.org), and run in any modern browser.

From the command line, run the following:

```bash
ruby2d build web app.rb
```

This command will also create `/build` directory, if one does not exist, and generate an HTML file linked to an `app.js` JavaScript file. Open the `index.html` file in your browser and enjoy!

# What's Next?

[Explore the documentation](/learn) to read more about everything Ruby 2D can do.
