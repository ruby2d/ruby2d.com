---
title: The window
subtitle: Creating and configuring a window in Ruby 2D
---

# Creating a window

As you saw in the [getting started](/learn/get-started) tutorial, the simplest window you can create is one where you require Ruby 2D and call the `show` method:

```ruby
require 'ruby2d'

show
```

Follow along by saving this code to a file called `window.rb` and run it using the standard Ruby interpreter on the command line, like so:

```bash
ruby window.rb
```

You should see a black, empty window with a size of 640-by-480 pixels, and a title bar with the text "Ruby 2D".

# Setting attributes

When you don't set any window attributes, the default values will be used. You can change these attributes by using the `set` method.

Let's try changing the title before we `show` the window:

```ruby
set title: "Hello World!"
```

Notice the title bar of the window is now set to the new text we provided. The Ruby 2D domain-specific language (DSL) makes it easy to change things in a natural and intuitive way. Here, we're calling a method called `set` and passing it a `Hash` with a`Symbol` called `:title` as the key, and a `String` with the text `"Hello World!` as the value. Alternatively, we could write it this way to make these details more explicit:

```ruby
set( { :title => "Hello World!" } )
```

This is a bit verbose, especially for Ruby, so we'll stick to the style in the original example.

Let's play with some other attributes. The black background is a little boring, so let's change it! We can `set` it to something more interesting, like the color blue:

```ruby
set :background 'blue'
```

Try some other colors, like `red`, `orange`, `lime`, `fuchsia`, or roll the dice with `random`. When there are multiple attributes we want to set, we can chain them together for convenience:

```ruby
set title: 'Howdy', background: 'navy'
```

Great! You've got the basics of setting attributes down. [View the class reference](/learn/reference) to see all the the window attributes we can set.

# Getting attributes

Sometimes it's also helpful to get the value of a window attribute, so there's a method for that too called `get`:

```ruby
get :width  # returns `640`, for example
```

For every attribute you can `set`, you can also `get` its value by providing the `Symbol`. Also, unlike `set`, you can only `get` one attribute at a time.

There are also a few extra attributes that you can get, [see the class reference](/learn/reference) for those.

| Attribute | Description |
|-----------|-------------|
| `:window` | The window object itself, just in case you want to `inspect` it. |
| `:fps` | The current frame rate expressed in frames per second (a `Float`). |
| `:mouse_x` | The x-coordinate position of the mouse, relative to the window. |
| `:mouse_y` | The y-coordinate position of the mouse, relative to the window. |

# The update loop

The window also manages the update loop, one of the few infinite loops in programming you'll encounter that isn't a mistake. Every window has a heartbeat, a loop that runs at 60 times per second, or as close to it as the computer's performance allows. Using the `update` method, we can enter this loop and make the window come to life!

For example, say we're bored with the current window we have now, with that static background color. Let's try changing it to a random color every second. Here's a complete Ruby program to do just that:

```ruby
require 'ruby2d'

tick = 0

update do
  if tick % 60 == 0
    set background: 'random'
  end
  tick += 1
end

show
```

Ahh, much better! First, we set a variable called `tick` to `0`. Then, we enter the `update` loop and `do` something interesting, like dividing `tick` by 60 and checking if its remainder equals 0. Each cycle of the loop, we increment `tick` by one. When the remainder _does_ equal 0, we know a second has passed (assuming the window is running at about 60 frames per second), and we `set` the background color to `'random'`. Pretty cool, huh?

# Closing the window

When you're done with a window, there's nothing left to do but close it. In the examples above, you probably closed the window by clicking the "close" button on the title bar itself, or perhaps using the keyboard (with "Command-Q" on a Mac or "ALT+F4" on Windows), or using a menu bar, or right-clicking its icon, or whatever. The point is, you had to do it through the user interface in some way. But, what if instead you wanted to close the window with code? Well, there's a method for that too!

Using `close`, you can programmatically close the window after calling `show`. This can be a bit tricky because once you show the window, you enter the window's infinite loop and the code that follows won't be reached until _after_ the window is closed and the loop is exited:

```ruby
require 'ruby2d'

show

# You'll never get here!
close
```

Don't worry, this isn't some catch-22 — we just have to make sure to call `close` from _within_ the loop. Here's an example of a complete Ruby program where `close` is called after the window is shown and while the loop is running, taking advantage of the `update` method you learned about earlier.

```ruby
require 'ruby2d'

t = Time.now

update do
  # Close the window after 5 seconds
  if Time.now - t > 5 then close end
end

show
```

Each turn of the window's loop, it checks if the time we saved in variable `t` is greater than five seconds earlier than the current time. When it is, `close` is called and the window goes away.

# That's it!

You've learned all there is to know about the window in Ruby 2D. More guides will be added in the future, but for now, [head back home](/learn).

<!-- Check out the next guide, [shapes and colors.](/learn/guides/shapes-colors) -->
