---
title: Colors
description: Learn about how to create and assign colors
next_topic: shapes
layout: learn
---

Colors can be set for all objects in the window. Every renderable object has a `color` method you can use to get and set colors:

```ruby
# Create a new, green square
Square.new(color: 'green')

# Create a square, then set its color later
s = Square.new
s.color = 'blue'

# Use hexadecimal values to set a color
s.color = '#ff0000'

# Use red, green, blue, alpha values to set the color
s.color = [1.0, 0.5, 0.2, 1.0]

# Feeling lucky? Use a random color
s.color = 'random'
```

# The Color class

Colors are represented by the `Color` class. You can create them from keywords [(based on clrs.cc)](https://clrs.cc/), hexadecimal values, or an array of red, green, blue, and alpha (transparency) values:

```ruby
c = Color.new('red')
c = Color.new('#FF0000')
c = Color.new([1.0, 0.0, 0.0, 1.0])
```

Each channel is a number from `0.0` to `1.0`, the standard graphics convention. Integers and floats read the same way, so `[1.0, 0.5, 0.0]` is orange, `[1, 0, 0]` is full-intensity red (`0` and `1` are the ends of the scale), and `[0, 0, 0]` is black. If you already have 0–255 byte values, use a [hex string](#hex-colors) instead. A channel outside the `0.0` to `1.0` range triggers a one-time warning and is clamped back into range. That keeps a stray 0–255 value from crashing, but it won't rescue the color: `[255, 128, 0]` clamps to `[1.0, 1.0, 0.0]` and comes out yellow, not the orange you meant.

Once you have a color, you can read and modify its components:

```ruby
c.r          # => red component (0.0..1.0)
c.g          # => green component
c.b          # => blue component
c.a          # => alpha component
c.opacity    # => alias for .a
c.opacity = 0.5
c.to_a       # => [r, g, b, a]
```

A couple handy class methods for validation:

```ruby
Color.valid?('red')    # => true
Color.hex?('#FF0000')  # => true
```

> **Note**: `colour` is accepted as a synonym for `color` everywhere. The same applies to compound names like `stroke_colour:`, `hover_colour:`, and `label_colour:`.

# Named colors

<p style="line-height:2.5rem">A color keyword can be any one of the following: <span class="color-example navy">navy</span> <span class="color-example blue">blue</span> <span class="color-example aqua">aqua</span> <span class="color-example teal">teal</span> <span class="color-example olive">olive</span> <span class="color-example green">green</span> <span class="color-example lime">lime</span> <span class="color-example yellow">yellow</span> <span class="color-example orange">orange</span> <span class="color-example red">red</span> <span class="color-example brown">brown</span> <span class="color-example fuchsia">fuchsia</span> <span class="color-example purple">purple</span> <span class="color-example maroon">maroon</span> <span class="color-example white">white</span> <span class="color-example silver">silver</span> <span class="color-example gray">gray</span> <span class="color-example black">black</span></p>

Additionally, use `'random'` to produce a random color value.

# Hex colors

Hex strings work with 3, 6, or 8 characters (the last two for alpha):

```ruby
s.color = '#F00'        # short form
s.color = '#FF0000'     # full form
s.color = '#FF000080'   # with 50% transparency
```

# Per-vertex colors

Shapes that support per-vertex coloring accept an array of colors, one per vertex. This lets you create some fun gradient effects:

```ruby
Triangle.new(
  color: ['red', 'green', 'blue']  # one per vertex
)

Square.new(
  color: ['red', 'blue', 'green', 'yellow']  # one per corner
)
```

# Opacity

All renderable objects support opacity through the `opacity:` keyword when creating them:

```ruby
Square.new(x: 0, y: 0, size: 100, color: 'red', opacity: 0.5)
```

Or read and change it later:

```ruby
shape.opacity         # => 0.5
shape.opacity = 0.25
```

`shape.color.opacity = 0.25` works too, if you'd rather go through the color. For shapes with per-vertex colors, setting `opacity` fades the whole shape evenly, and reading it gives you back the first vertex's value. On a `Canvas` or `Image`, `opacity` adjusts the tint, just like `opacity:` does when you create one.

Continue to the [next topic](/learn/{{ page.next_topic }}){:.next-topic}
