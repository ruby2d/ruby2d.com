---
title: Colors
layout: learn
---

{% include warning.html icon="🚧" message="This page is a work in progress!" %}

`Ruby2d::Color` is a class that represents colors in Ruby2D. It can be instantiated with a keyword [(based on css)](http://clrs.cc/), a hexidecimal value or an array containing a collection of red, green, blue, and alpha (transparency) values expressed as a `Float` from `0.0` to `1.0`.

## Initialization via keyword

Colors can be created from a keyword string, like this:

```ruby
Color.new('name_of_color')
```

<p style="line-height:2.75rem">Where <code>'name_of_color'</code> might be one of: <span class="color-example navy">navy</span>, <span class="color-example blue">blue</span>, <span class="color-example aqua">aqua</span>, <span class="color-example teal">teal</span>, <span class="color-example olive">olive</span>, <span class="color-example green">green</span>, <span class="color-example lime">lime</span>, <span class="color-example yellow">yellow</span>, <span class="color-example orange">orange</span>, <span class="color-example red">red</span>, <span class="color-example brown">brown</span>, <span class="color-example fuchsia">fuchsia</span>, <span class="color-example purple">purple</span>, <span class="color-example maroon">maroon</span>, <span class="color-example white">white</span>, <span class="color-example silver">silver</span>, <span class="color-example gray">gray</span>, <span class="color-example black">black</span>.</p>

One additional keyword is `'random'`, which will always create a randomly generated color, like this:

```ruby
Color.new('random')
```

## Initialization via hex

Color can be initialized via hex string, very similarly to css. When done via hex value, examples from above might be replicated like this:

```ruby
Color.new('#001F3F') #=> navy
Color.new('#0074D9') #=> blue
Color.new('#7FDBFF') #=> aqua
```

Any correct hex value will work fine.

## Initialization via array of values

If you wish to have direct control over red, green, blue and alpha channels when creating your color, you can pass an array of 4 numbers to achieve this, like this:

```ruby
# Red, fully opaque
Color.new([1, 0, 0, 1])

# Equivalent to above, a mixture of integers and floats
Color.new([1.0, 0, 0, 0.0])

# Red, fully transparent
Color.new([1, 0, 0, 0])

# Red, half transparent
Color.new([0.1, 0.0, 0.0, 0.5])
```

## `#r`, `#g`, `#b`

You can use `#r`, `#g`, and `#b` methods to return red, green and blue channels respectively, as a value between 0 and 1:

```ruby
color = Color.new('fuchsia')
color.r #=> 0.9411764705882353
color.g #=> 0.0705882352941176
color.b #=> 0.7450980392156863
```

## `#a`, `#opacity`

You can use `#a` method (or it's alias, `#opacity`), to return alpha channel, as a value between 0 and 1:

```ruby
color = Color.new([0.1, 0.2, 0.3, 0.4])
color.a       #=> 0.4
color.opacity #=> 0.4
```

## `#opacity=`

You can use `#opacity=` method to set the opacity of a color:

```ruby
color = Color.new([0.1, 0.2, 0.3, 0.4])
color.opacity = 0.9
```



{% comment %}
# Cool color example

```ruby
require 'ruby2d'

set title: "Hello Color Triangle"

t = Triangle.new(
  x1: 320, y1:  50,
  x2: 540, y2: 430,
  x3: 100, y3: 430
)

update do
  t.color = [
    [0.0, 0.0, 0.0, 1.0],
    [0.0, 0.0, 0.0, 1.0],
    [get(:mouse_x)/100.0, get(:mouse_y)/100.0, 0.0, 1.0]
  ]
end

show
```

<!--  -->

# Color

`Ruby2D::Color`

A color can be either a keyword ([based on CSS](http://clrs.cc)), a hexadecimal value, or an array containing a collection of red, green, blue, and alpha values expressed as a `Float` from `0.0` to `1.0`.

## Constructor

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

## Accessors

`r`, `g`, `b`, `a` color values can be read.

## Examples

```ruby
Color.new('red')
Color.new('#ff0000')  # also red

# Red, fully opaque
Color.new([1, 0, 0, 1])

# Equivalent to above, a mixture of integers and floats
Color.new([1.0, 0, 0, 0.0])

# Red, fully transparent
Color.new([1, 0, 0, 0])  

# Red, half transparent
Color.new([0.1, 0.0, 0.0, 0.5])

# Coloring a shape, all the same red square
Square.new(color: 'red')
Square.new(color: [1, 0, 0, 1])
Square.new(color: '#ff0000')
```

{% endcomment %}
