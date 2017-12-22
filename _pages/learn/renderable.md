---
title: Renderable objects
layout: learn
---

{% include warning.html icon="🚧" message="This page is a work in progress!" %}

This page contains informations about basic classes used to render objects to the window.

# Common behavior

Since, since the end, all of those objects end up in the window, there is some common behavior they all present.

## z

`z` value is interpreted as z-index for rendered objects. Objects with higher `z` value will be rendered on the top of objects with smaller `z` value.

For all objects the default value of `z` is `0`. This means initialization for all objects can be expanded like this:

```ruby
Square.new(z: 0)
Rectangle.new(z: 0)
Quad.new(z: 0)
Triangle.new(z: 0)
```

And so on.

You can read the value of `z` like this:

```ruby
Square.new.z    #=> 0
Rectangle.new.z #=> 0
Quad.new.z      #=> 0
```

And so on.

You can update the value of `z` like this:

```ruby
square = Square.new
square.z = 1

rectangle = Rectangle.new
rectangle.z = 1
```

And so on.

## contains?

It is often useful to determine if given point on the window is contained by an object. You can do it easily with `contains?` method. For Square class, this would look like this:

```ruby
square = Square.new
square.contains?(10, 10) #=> true
square.contains?(110, 110) #=> false
```

First argument to the `contains?` method is the x coordinate, and second is the y coordinate of point in question.

The same interface is used for all classes explained below.
