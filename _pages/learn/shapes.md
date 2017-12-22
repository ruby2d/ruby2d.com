---
title: Shapes
layout: learn
---

{% include warning.html icon="🚧" message="This page is a work in progress!" %}

# Square

Most basic shape you can draw with is a square. In it's basic form it is as simple as

```ruby
Square.new
```

Let's look at some way with which we can manipulate the square:

## x, y

`x` and `y` determine position of the squares top left edge in the window. Default values for both `x` and `y` are `0`, so the example above, if expanded, would look like this:

```ruby
Square.new(x: 0, y: 0)
```

But, of course, you can set it to any values you want:

```ruby
Square.new(x: 100, y: 200)
```

You can get the values of `x` and `y` from a square like this:

```ruby
square = Square.new
square.x #=> 0
square.y #=> 0
```

And also, you can set `x` and `y` to a square after it was initialized, like this:

```ruby
square = Square.new
square.x = 100
square.y = 150
```

## size

`size` is a measure of squares width and height. By default it is equal to `100`, so the initial example, if expanded, would look like this:

```ruby
Square.new(size: 100)
```

You can read the value of size from a square like this:

```ruby
square = Square.new
square.size #=> 100
```

And also you can set the size in a square like this:

```ruby
square = Square.new
square.size = 150
```

## color

You can use `color` property to determine, of course, what color the triangle is. By default, the color is `'white'`, so initial example, if expanded, would look like this:

```ruby
Square.new(color: 'white')
```

Value passed to the attribute of color is then passed to `Color` instance, so all features of `Color` instantiation apply here.

For a square, there are two ways of managing color:

1. You can pass a single color value, that will be used for the entire shape
2. You can pass an array of 4 color values, that will be used for each edge

Example of the second behavior would be:

```ruby
Square.new(color: ['red', 'green', 'blue', 'yellow'])
```

You can read the value of squares color like this:

```ruby
square = Square.new
square.color # => Color.new('white')
```

This returns an instance of `Color` class, or an instance of `Color::Set` class. `Color::Set` represents an array of colors, and their grouped features, if multiple colors were used for squares creation.

You can update color for square like this:

```ruby
square = Square.new
square.color = 'red'
```

## Square class reference

`Ruby2D::Square < Rectangle`

### Accessors

All attributes in the constructor can be read and written.

### Constructor

```ruby
Square.new(x: 0, y: 0, size: 100, z: 0, color: 'white')
# Where `color` is any valid Ruby 2D color,
# or set of four colors (for each vertex) in an array.
```

### Examples

```ruby
Square.new

Square.new(x: 50, y: 50, size: 125)

Square.new(x: 25, y: 200, size: 150, color: 'green')

s = Square.new(
  x: 200, y: 50, size: 100,
  color: ['red', 'white', 'blue', 'random']
)

s.color = '#0019ff'

s.x = 75
s.y = 175
s.size = 200
```

# Rectangle

Rectangle is very similar to Square, with one major difference: it allows manipulation of `height` and `width` independently, where Square only allows a single value to manipulate both of those values.

Basic example of rectangle would look like this:

```ruby
Rectangle.new
```

## width and height

`width` is a value that determines horizontal size of the rectangle, and `height` determines vertical size. Their default values are `200` for width, and `100` for height, so the initial example, if expanded, would look like this:

```ruby
Rectangle.new(width: 200, height: 100)
```

You can read the value of `width` and `height` like this:

```ruby
rectangle = Rectangle.new
rectangle.width #=> 200
rectangle.height #=> 100
```

You can set the value of `width` and `height` like this:

```ruby
rectangle = Rectangle.new
rectangle.width = 250
rectangle.width = 50
```

## x, y, color

Rectangle class also allows managing of `x`, `y` and `color` attributes in the same way Square does.

## Rectangle class reference

`Ruby2D::Rectangle < Quad`

### Constructor

```ruby
Rectangle.new(x: 0, y: 0, width: 200, height: 100, z: 0, color: 'white')
# Where `color` is any valid Ruby 2D color,
# or set of four colors (for each vertex) in an array.
```

### Accessors

All attributes in the constructor can be read and written.

### Examples

```ruby
Rectangle.new

Rectangle.new(x: 50, y: 50, width: 100, height: 50)

Rectangle.new(x: 50, y: 125, width: 50, height: 125, color: 'green')

r = Rectangle.new(
  x: 275, y: 75, width: 150, height: 200,
  color: ['#1dff00', '#fa00ff', '#00edff', '#c7ff00']
)

r.color = [1, 0.4, 0.28, 0.82]

r.x = 168
r.y = 100
r.width = 250
r.height = 75
```

# Quad

Quads allow you to draw 4-edged shapes organised in any way you want.

Basic example of quad will look like this:

```ruby
Quad.new
```

Lets see how we can manipulate its position:

## x1, y1, x2, y2, x3, y3, x4, y4

Pairs of `(x, y)` pairs from `(x1, y1)` to `(x4, y4)` represent the position of quads edges. They have a default value, so the basic example, if expanded, would look like this:

```ruby
Quad.new({
  x1: 0,   y1: 0,
  x2: 100, y2: 0,
  x3: 100, y3: 100,
  x4: 0,   y4: 100
})
```

And of course, each of those values can be get:

```ruby
quad = Quad.new
quad.x1 #=> 0
quad.y1 #=> 0
quad.x2 #=> 100
quad.y2 #=> 0
quad.x3 #=> 100
quad.y3 #=> 100
quad.x4 #=> 0
quad.y4 #=> 100
```

And set:

```ruby
quad = Quad.new
quad.x1 = 50
quad.y1 = 50
quad.x2 = 150
quad.y2 = 50
quad.x3 = 150
quad.y3 = 150
quad.x4 = 50
quad.y4 = 150
```

## color

Quad allows management of color the same way Rectangle and Square do. Please review it's documentation for more details.

## Quadrilateral class reference

`Ruby2D::Quad`

### Constructor

```ruby
Quad.new(x1: 0, y1: 0, x2: 100, y2: 0, x3: 100, y3: 100, x4: 0, y4: 100, z: 0, color: 'white')
# Where `color` is any valid Ruby 2D color,
# or set of four colors (for each vertex) in an array.
```

### Accessors

All attributes in the constructor can be read and written.

### Examples

```ruby
Quad.new

Quad.new(x1: 50, y1: 50, x2: 150, y2: 50, x3: 175, y3: 75, x4: 75, y4: 75)

Quad.new(x1: 75, y1: 100, x2: 125, y2: 100, x3: 150, y3: 150, x4: 50, y4: 150, color: 'blue')

q = Quad.new(
  x1: 225, y1: 25,
  x2: 350, y2: 50,
  x3: 375, y3: 125,
  x4: 275, y4: 125,
  color: ['yellow', '#ff8c00', [0, 0, 0, 0], 'maroon']
)

q.color = 'olive'

q.x3 = 275
q.y3 = 75
```

# Triangle

Triangle allows you to, unsurprisingly, draw triangles.

Basic example of triangle will look like this:

```ruby
Triangle.new
```

Let's see how we can manipulate its position:

## x1, y1, x2, y2, x3, y3

Pairs of `(x, y)` pairs from `(x1, y1)` to `(x3, y3)` represent the position of triangle edges. They have a default value, so the basic example, if expanded, would look like this:

```ruby
Triangle.new({
  x1: 50,  y1: 0,
  x2: 100, y2: 100,
  x3: 0,   y3: 100,
})
```

Each of those values can be get:

```ruby
triangle = Triangle.new
triangle.x1 #=> 50
triangle.y1 #=> 0
triangle.x2 #=> 100
triangle.y2 #=> 100
triangle.x3 #=> 0
triangle.y3 #=> 100
```

And set:

```ruby
triangle = Triangle.new
triangle.x1 = 0
triangle.y1 = 0
triangle.x2 = 150
triangle.y2 = 150
triangle.x3 = 300
triangle.y3 = 100
```

## color

Color management for triangles looks almost exactly like it works for squares, rectangles and quads, with one major difference: You can specify 3 colors, for 3 triangles edges respectively, instead of 4 colors.

So, for example, if you want to build a triangle with 3 edges of different colors, you would do:

```ruby
Triangle.new(color: ["red", "green", "blue"]
```

As for other shapes, default color is white, so basic example, if expanded, would look like this:

```ruby
Triangle.new(color: "white")
```

## Triangle class reference

`Ruby2D::Triangle`

### Constructor

```ruby
Triangle.new(x1: 50, y1: 0, x2: 100, y2: 100, x3: 0, y3: 100, z: 0, color: 'white')
# Where `color` is any valid Ruby 2D color,
# or set of three colors (for each vertex) in an array.
```

### Accessors

All attributes in the constructor can be read and written.

### Examples

```ruby
Triangle.new

Triangle.new(x1: 50, y1: 0, x2: 100, y2: 100, x3: 0, y3: 100)

Triangle.new(x1: 0, y1: 200, x2: 150, y2: 200, x3: 0, y3: 300, color: 'red')

t = Triangle.new(
  x1: 320, y1: 50,
  x2: 540, y2: 430,
  x3: 100, y3: 430,
  color: ['red', '#2ECC40', [0.5, 0.2, 1.0, 0.8]]
)

t.color = ['lime', [1, 1, 0, 1], 'random']

t.x1 = 200; t.y1 = 150
t.y3 = 350
```

# Line

Line allows you to draw a straight line from one point to another. In it's simplest form, a line is drawn like this:

```ruby
Line.new
```

Lets see how we can configure its behavior:

## x1, y1, x2, y2

`(x1, y1)` and `(x2, y2)` points represent lines beginning and end, respectively. By default, the line starts at point `(0, 0)` and `(100, 100)`, so the simplest form, if expanded, would look like this:

```ruby
Line.new({
  x1: 0, y1: 0,
  x2: 0, y2: 0
})
```

Those values can also be get:

```ruby
line = Line.new
line.x1 #=> 0
line.y1 #=> 0
line.x2 #=> 100
line.y2 #=> 100
```

And set:

```ruby
line = Line.new
line.x1 = 50
line.y1 = 50
line.x2 = 150
line.y2 = 150
```

## width

You can decide the `width` of a triangle. The default width is `2`, so the basic example, if expanded, would look like this:

```ruby
Line.new(width: 2)
```

You can, of course, get and set the width:

```ruby
line = Line.new
line.width #=> 2
line.width = 5
line.width #=> 5
```

## color

TODO: Decide if we stick to allowing for 4 colors for line, or do we restrict for 1 color.



{% comment %}
// Potential content to work in ////////////////////////////////////////////////

In this documentation, `x` is the x-coordinate and `y` is the y-coordinate. When required to distinguish between multiple pairs of `x` and `y` coordinates, they will be numbered, for example: `x1`, `y1` or `x2`, `y2`.

# The coordinate system

Before we get right into drawing things, it's helpful to first understand some basics of 2D graphics programming. Just like you learned in your geometry math class, you can plot points, lines, and polygons in a two-dimensional coordinate system, where the horizontal axis is called the **x-axis** and the vertical axis is called the **y-axis**

[image of x, y coordinate system]

The center of this coordinate system, known as the origin, is where the axes intersect and both x and y are zero. In other words, the coordinates at the origin are `(0, 0)`. But unlike in your math class where the origin was usually centered or in the lower-left corner, in 2D graphics, the origin is more commonly in the upper-left corner and the y-axis is flipped.

[image of 2D coordinate system]

This makes sense because windows your operating system creates grow or shrink from the bottom-right when resized. When we all follow the same convention, it also makes things simpler.

Now to plot a point on this grid, we can choose an ordered pair of the form of `(x, y)`. In the windows that Ruby 2D creates, each point is equivalent to a single pixel. If you're using a high-DPI display (Apple calls these "retina" displays), a pixel is actually four (or 2-by-2) real pixels on the screen.

<!-- http://www.mathplanet.com/education/pre-algebra/introducing-algebra/coordinate-system-and-ordered-pairs -->

[image of a few points plotted, show w/h of window also]

Great, now that we know the basics, let's start drawing!

# Drawing shapes

There are several kinds of shapes you can draw, like triangles, quadrilaterals, rectangles, and squares. To get started, we just need to call on the appropriate class, give it some points, and instantiate the new shape. In these examples, we'll indicate a pair of coordinates by numbering them, for example to form a line, `x1, y1` would be the first point, and `x2, y2` would be the second point.

A triangle just needs three points:

```ruby
Triangle.new(x1, y1, x2, y2, x3, y3)
```

A quadrilateral takes four points:

```ruby
Quad.new(x1, y1, x2, y2, x3, y3, x4, y4)
```

For a rectangle, we need to provide the desired `x, y` position of the upper-left corner, and its width and height:

```ruby
Rectangle.new(x, y, width, height)
```

A square is the simplest shape. We just need an `x, y` position of the upper-left corner and its size.


```ruby
Square.new(x, y, size)
```

Great! Now let's try out some examples in a real window...

```ruby
require 'ruby2d'

Triangle.new(x1, y1, x2, y2, x3, y3)

Quad.new(x1, y1, x2, y2, x3, y3, x4, y4)

Rectangle.new(x, y, width, height)

Square.new(x, y, size)

show
```

When we create a new shape like this, Ruby 2D automatically adds it to the window. We probably want to hold on to a shape to do something with it later, so let's try saving a square a variable:

```ruby
require 'ruby2d'

box = Square.new

show
```

Now with our `box` variable, we can change the values of the square after we've created it. All the constructor parameters can be changed, for example, we can change the `x, y` and size of our square:

```ruby
box.x = 250
box.y = 400
box.size = 150
```

# Colors

Now, by default, shapes are just boring white, but they don't have to stay that way. Let's give them some color!

Each shape can be created with a valid color value, for example:

```ruby
Triangle.new(x1, y1, x2, y2, x3, y3, color)

Quad.new(x1, y1, x2, y2, x3, y3, x4, y4, color)

Rectangle.new(x, y, width, height, color)

Square.new(x, y, size, color)
```

If we save a shape to a variable, we can also change it's color later:

```ruby
pyramid = Triangle.new

pyramid.color = 'yellow'
```

Now, what's a "valid" color value? Well, it's any named keyword, a `red, green, blue, alpha` value, or a hexadecimal value (see the [reference documentation]() for details). Let's try some examples...

```ruby
brick = Square.new(0, 0, 50, 'red')
stump = Rectangle.new(x, y, 50, 100, 'brown')

diamond = Quad.new
diamond.color = 'silver'

thing = Triangle.new

thing.color = [r, g, b, a]
thing.color = '#FF00A1'
```

We can even color each vertex, or point, of a shape.

```ruby
shape = Triangle.new()

shape.color = [
  [r, g, b, a],
  [r, g, b, a],
  [r, g, b, a]
]

shape.color = [
  'yellow',
  'pink',
  'green'
]

shape.color = [
  '#FF0000',
  '#FF0000',
  '#FF0000'
]

shape.color = [
  'blue',
  [r, g, b, a],
  '#FF0000'
]
```

# Adding and removing shapes

When a shape is created, whether or not it's saved to a variable, it's added to the window.

```ruby
box = Square.new(0, 0, 50)
```

The shape can then be removed and re-added:

```ruby
box.remove

box.add
```

We can clear all drawable objects by simply calling `clear`.

You can see what drawable objects the window has by calling `get :objects`:

```ruby
puts(get :objects)
```

{% endcomment %}
