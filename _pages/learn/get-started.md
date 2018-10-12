---
title: Get started
subtitle: Learn how to start creating 2D apps in Ruby
next_topic: window
layout: learn
---

## Set up your environment and install dependencies

Before installing the gem, we'll need to install a few dependencies, namely a native graphics engine Ruby 2D will use behind the scenes called [Simple 2D](https://github.com/simple2d/simple2d).

- On **macOS**, we recommend using [Homebrew](https://brew.sh) and running:
```
brew tap simple2d/tap
brew install simple2d
```
- On **Linux**, learn how to [set up your environment »](/learn/linux)
- On **Windows**, learn how to [set up your environment »](/learn/windows)

## Install the gem

Now you're ready to install the Ruby 2D gem:

```
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

```
ruby app.rb
```

You should see this impressive triangle...

<img style="margin-bottom:-2rem; width: 100%; max-width: 752px" src="/assets/img/triangle-shadow.png">

Congrats, you just built your first Ruby 2D app! 🎉

# What's next?

There's a lot Ruby 2D can do. Continue to the [next topic](/learn/{{ page.next_topic }}) or select one from the [contents menu](#). 👆
