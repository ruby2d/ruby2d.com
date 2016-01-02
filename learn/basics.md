---
title: Basics
subtitle: Learn the basics of creating 2D apps
permalink: /learn/basics/

contents:
  - text: Concepts
    link: "#core-concepts"
  - text: Window
    link: "#the-window"
  - text: Colors
    link: "#colors"
  - text: Shapes
    link: "#shapes"
#  - text: Audio
#    link: "#audio"
  - text: Input
    link: "#input"
  - text: Building
    link: "#building"
---

# Core Concepts

Ruby 2D is designed to make creating 2D applications as simple as possible. When requiring the gem, a [Domain-Specific Language (DSL)](https://en.wikipedia.org/wiki/Domain-specific_language) is made available.

```ruby
require 'ruby2d'

# DSL is now available
```

The DSL methods are `set`, `get`, `on`, `update`, `show`, and `clear`.


# The Window

In Ruby 2D, everything revolves around the window. It renders all visual content, captures input, controls audio, and more. When requiring `ruby2d`, the window object is created and managed behind the scenes.

Set the window attributes like so:

```ruby
set title: "My App"
set width: 700
set height: 500
```

Can also set multiple attributes at one time:

```ruby
set width: 700, height: 500, title: "My App"
```

Similarly, get attributes like this:

```ruby
get :title
get :width
get :height
get :fps
```

When you're ready to show the window, simply call the `show` method.

## The Loop

The window runs a loop where all the action takes place. This runs 60 times per second by default.

## Update

The update block is called by the window loop. It's optional, but necessary to make your app dynamic.

```ruby
update do
  # update the app state here
end
```

When the `show` method is called, the window appears and starts calling the `update` block as long as the window is visible.

# Colors

The `Color` class represents colors. They can be a named string or an array of `Float` or `Fixnum`, for example:

```ruby
'red'  
[1.0, 0.5, 0.0, 1.0]
[255, 127, 0, 255]
```

Named colors are taken from [clrs.cc](http://clrs.cc). Each vertex of a shape has a color object attached to it. So, in the case of a square, there are four:

```ruby
Square.new(0, 0, 50,
[
  [1.0, 1.0, 1.0, 1.0],
  [0.0, 0.0, 0.0, 0.0],
  [  0,   0,   0,   0],
  [1.0, 1.0, 1.0, 1.0]
])
```


# Shapes

Ruby 2D provides some basic shapes, like triangles, quadrilaterals, rectangles, and squares. Each has methods to update its attributes, such as location, size, and color, for example:

```ruby
s = Square.new    # Create a new square

s.x = 100         # Set the 'x' coordinate
s.y = 200         # Set the 'y' coordinate
s.size = 50       # Set the size to 50 pixels
s.color = 'blue'  # Set the color
```

Below are examples of how to use each shape.

## Triangles

```ruby
Triangle.new
Triangle.new(x1, y1, x2, y2, x3, y3, color)
```

## Quadrilaterals

```ruby
Quad.new
Quad.new(x1, y1, x2, y2, x3, y3, x4, y4, color)
```

## Rectangles

```ruby
Rectangle.new
Rectangle.new(x1, y1, x2, y2, color)
```

## Squares

```ruby
Square.new
Square.new(x1, y1, x2, y2, color)
```

<!--
# Audio

Ruby 2D can play all types of audio.

## Sounds

In Ruby 2D, sounds are short audio samples. You might use the `Sound`class to create an effect, like a crash or snare drum.

```ruby
snd = Sound.new(file_path)
snd.play
snd.stop
```

## Music

`Music` are longer audio samples, like a song you might play in the background.

```ruby
mus = Music.new(file_path)
mus.play
mus.pause
mus.resume
mus.stop
mus.fadeout(ms)  # the duration in milliseconds
```
-->


# Input

Use the `on` method to define a block and respond to an input event. The general pattern looks like this:

```ruby
on input_device: 'attribute' do
  # do something
end
```

## Mouse

Read the mouse cursor's position using `get`:

```ruby
get :mouse_x
get :mouse_y
```

<!--
Then capture and respond to input like so:

```ruby
on mouse: 'left' do
  puts "Left mouse button clicked"
end
```

Here are the available input strings:

```ruby
'left'
'right'
'down'   # left mouse button press...
'up'     # ...and release
'any'    # any button press
```
-->

## Keyboard

Use `key:` to respond to a single key press.

```ruby
on key: 'a' do
  puts "Key pressed: A"
end
```

Use `key_down:` for when a key is held down, like for continuous movement of a game character.

```ruby
on key_down: 'right' do
  puts "Right arrow down"
end
```

For a list of all possible keys, see the [scancode reference](https://wiki.libsdl.org/SDL_Scancode) (under the column "Key Name").


<!--
# Building

Building, releasing, and distributing apps.

```bash
ruby2d build native app.rb
```

```bash
ruby2d build web app.rb
```

```bash
ruby2d package app.rb
ruby2d package app
```

```bash
ruby2d build web electron app.rb
```


# The Classical Approach

While using the DSL can get you started quickly, keeping the scope clean and focusing on classes to organize stuff might make more sense for your project. Alternatively, you can skip the DSL and use a pure object-oriented approach. Simply require `ruby2d/base` instead of just `ruby2d`.

Classical would look like this, explicitly creating and calling methods on the window:

```ruby
require 'ruby2d/base'

window = Window.new(width: 300, height: 200)

square = Square.new
square.color = 'red'

window.add(square)
window.show
```
-->
