---
title: Shapes
subtitle: Learn how to draw common geometric shapes
next_topic: images
layout: learn
---

{% comment %}
TODO: Talk about setting a color for each vertex, or corner, of a shape.

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
{% endcomment %}


A number of shapes can be drawn, such as [triangles](#triangles), [squares](#squares), [rectangles](#rectangles), [quadrilaterals](#quadrilaterals), [lines](#lines), and [circles](#circles). All instance attributes on all shapes can be read and set individually on a new object, for example:

```ruby
t = Triangle.new
t.x1 = 50
t.y3 = 25
t.color = 'red'
```

# Triangles

Create a new triangle using:

```ruby
Triangle.new
```

Here are all the optional instance attributes:

```ruby
Triangle.new(
  x1: 50,  y1: 0,
  x2: 100, y2: 100,
  x3: 0,   y3: 100,
  color: 'red',
  z: 100
)
```

# Squares

Create a square using:

```ruby
Square.new
```

Here are all the optional instance attributes:

```ruby
Square.new(
  x: 100, y: 200,
  size: 125,
  color: 'blue',
  z: 10
)
```

# Rectangles

Create a rectangle using:

```ruby
Rectangle.new
```

Here are all the optional instance attributes:

```ruby
Rectangle.new(
  x: 125, y: 250,
  width: 200, height: 150,
  color: 'teal',
  z: 20
)
```

# Quadrilaterals

Create a quadrilateral using:

```ruby
Quad.new
```

Here are all the optional instance attributes:

```ruby
Quad.new(
  x1: 275, y1: 175,
  x2: 375, y2: 225,
  x3: 300, y3: 350,
  x4: 250, y4: 250,
  color: 'aqua',
  z: 10
)
```

# Lines

Create a line using:

```ruby
Line.new
```

Here are all the optional instance attributes:

```ruby
Line.new(
  x1: 125, y1: 100,
  x2: 350, y2: 400,
  width: 25,
  color: 'lime',
  z: 20
)
```

# Circles

Create a circle using:

```ruby
Circle.new
```

Here are all the optional instance attributes:

```ruby
Circle.new(
  x: 200, y: 175,
  radius: 150,
  sectors: 32,
  color: 'fuchsia',
  z: 10
)
```

Continue to the [next topic »](/learn/{{ page.next_topic }})
