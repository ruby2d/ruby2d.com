---
title: Colors
description: Learn about how to create and assign colors
next_topic: shapes
layout: learn
---

{% comment %}
TODO:
  - British spelling, colour 🇬🇧
{% endcomment %}


Colors can be set for all objects in the window. All have a `color` method that can be used to get and set colors, for example:

```ruby
# Create a new, green square
Square.new(color: 'green')

# Create a square, then set its color later
s = Square.new
s.color = 'blue'

# Use hexadecimal values to set a color
s.color = '#ff0000'

# Use red, green, blue, alpha values to set the color
s.color = [1, 0.5, 0.2, 1]
```

Colors are represented by the `Color` class. Colors can be created from keywords [(based on css)](http://clrs.cc/), a hexadecimal value or an array containing a collection of red, green, blue, and alpha (transparency) values expressed as a `Float` from `0.0` to `1.0`. Here are some examples for creating colors:

```ruby
Color.new
Color.new(<keyword>)
Color.new(<hex>)
Color.new([r, g, b, a])
# Where...
#   `r` is red
#   `g` is green
#   `b` is blue
#   `a` is the alpha channel, which affects opacity
```

<p style="line-height:2.5rem">A color keyword can be any one of the following: <span class="color-example navy">navy</span> <span class="color-example blue">blue</span> <span class="color-example aqua">aqua</span> <span class="color-example teal">teal</span> <span class="color-example olive">olive</span> <span class="color-example green">green</span> <span class="color-example lime">lime</span> <span class="color-example yellow">yellow</span> <span class="color-example orange">orange</span> <span class="color-example red">red</span> <span class="color-example brown">brown</span> <span class="color-example fuchsia">fuchsia</span> <span class="color-example purple">purple</span> <span class="color-example maroon">maroon</span> <span class="color-example white">white</span> <span class="color-example silver">silver</span> <span class="color-example gray">gray</span> <span class="color-example black">black</span></p>

Additionally, use `'random'` to produce a random color value.

# Opacity

Change the opacity, or transparency, of an object by using the `opacity` method on its color:

```ruby
square.color.opacity = 0.5
```

Continue to the [next topic ▸](/learn/{{ page.next_topic }})
