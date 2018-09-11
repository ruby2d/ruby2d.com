---
title: 2D basics
layout: learn
---

{% include warning.html icon="🚧" message="This page is a work in progress!" %}

This page contains information about the basic classes used to render objects to the window.

# Common behavior

Since, in the end, all of those objects end up in the window, there is some common behavior they all share.

## z

`z` value is interpreted as the z-index for rendered objects. An object with a higher `z` value will be rendered on top of an object with a lower `z` value.

For all objects, the default value of `z` is `0`. This means initialization for all objects can be expanded like this:

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

It is often useful to determine if a given point on the window is contained within an object. You can do this easily with the `#contains?` method. For the Square class, this would look like this:

```ruby
square = Square.new
square.contains?(10, 10) #=> true
square.contains?(110, 110) #=> false
```

The first argument to the `#contains?` method is the x coordinate, and the second is the y coordinate of the point in question.

The same interface is used for all classes explained below.
