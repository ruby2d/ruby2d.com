---
title: Get started
description: Learn how to start creating 2D apps in Ruby
next_topic: window
layout: learn
---

# Set up your Ruby environment

Ruby 2D makes use of low-level graphics and hardware, so you'll need a Ruby environment that can build native extensions. If you're new to Ruby and need some help, check out these guides: [**macOS**](/learn/macos), [**Windows**](/learn/windows), and [**Linux**](/learn/linux).

{% include tip.html icon="👋" message="<b>There's a new way to install Ruby 2D!</b> On macOS and Windows, you no longer have to install <i>any</i> dependencies — just go ahead and install the gem using any Ruby command prompt you'd like. On Linux, you'll still have to install some required packages, see below." %}

**On Linux**, you'll need to install a few packages before installing the gem, [see the instructions here](/learn/linux#install-packages).

# Install the gem

Now you're ready to install the Ruby 2D gem! On your command line, run:

```
gem install ruby2d
```

{% include tip.html icon="🤔" message="<b>Having problems installing the gem?</b> <a href=\"http://chat.ruby2d.com\">Get help on Discord in the <b>#support</b> channel</a>." %}

# Write your first 2D app

After installing the gem, create a new Ruby script called `triangle.rb` and add the following two lines.

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
ruby triangle.rb
```

You should see this impressive triangle...

<img style="margin-bottom:-2rem; width: 100%; max-width: 752px" src="/assets/img/learn/triangle-shadow.png">

Congrats, you just built your first Ruby 2D app! 🎉

# What's next?

There's a lot Ruby 2D can do. [Check out the showcase](/showcase) to see examples of what you can build. To keep learning, continue to the [next topic](/learn/{{ page.next_topic }}) or select one from the **contents** menu.
