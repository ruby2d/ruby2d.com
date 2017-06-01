# Basic Renderable Objects

This page contains informations about basic classess used to render objects to the window.

## Common behavior

Since, since the end, all of those objects end up in the window, there is some common behavior they all present.

### z

`z` value is interpreted as z-index for rendered objects. Objects with higher `z` value will be rendered on the top of objects with smaller `z` value.

For all objects the default value of `z` is `0`. This means initialisation for all objects can be expanded like this:

```
Square.new(z: 0)
Rectangle.new(z: 0)
Quad.new(z: 0)
Triangle.new(z: 0)
```

And so on.

You can read the value of `z` like this:

```
Square.new.z    #=> 0
Rectangle.new.z #=> 0
Quad.new.z      #=> 0
```

And so on.

You can update the value of `z` like this:

```
square = Square.new
square.z = 1

rectangle = Rectangle.new
rectangle.z = 1
```

And so on.

### contains?

It is often useful to determine if given point on the window is contained by an object. You can do it easily with `contains?` method. For Square class, this would look like this:

```
square = Square.new
square.contains?(10, 10) #=> true
square.contains?(110, 110) #=> false
```

First argument to the `contains?` method is the x coordinate, and second is the y coordinate of point in question.

The same interface is used for all classess explained below.

## Square

Most basic shape you can draw with is a square. In it's basic form it is as simple as

```
Square.new
```

Let's look at some way with which we can manipulate the square:

### x, y

`x` and `y` determine position of the squares top left edge in the window. Default values for both `x` and `y` are `0`, so the example above, if expanded, would look like this:

```
Square.new(x: 0, y: 0)
```

But, of course, you can set it to any values you want:

```
Square.new(x: 100, y: 200)
```

You can get the values of `x` and `y` from a square like this:

```
square = Square.new
square.x #=> 0
square.y #=> 0
```

And also, you can set `x` and `y` to a square after it was initilized, like this:

```
square = Square.new
square.x = 100
square.y = 150
```

### size

`size` is a measure of squares width and height. By default it is equal to `100`, so the initial example, if expanded, would look like this:

```
Square.new(size: 100)
```

You can read the value of size from a square like this:

```
square = Square.new
square.size #=> 100
```

And also you can set the size in a square like this:

```
square = Square.new
square.size = 150
```

### color

You can use `color` property to determine, of course, what color the triangle is. By default, the color is `'white'`, so initial example, if expanded, would look like this:

```
Square.new(color: 'white')
```

Value passed to the attribute of color is then passed to `Color` instance, so all features of `Color` instantiation apply here.

For a square, there are two ways of managing color:

1. You can pass a single color value, that will be used for the entire shape
2. You can pass an array of 4 color values, that will be used for each edge

Example of the second behavior would be:

```
Square.new(color: ['red', 'green', 'blue', 'yellow'])
```

You can read the value of squares color like this:

```
square = Square.new
square.color # => Color.new('white')
```

This returns an instance of `Color` class, or an instance of `Color::Set` class. `Color::Set` represents an array of colors, and their grouped features, if multiple colors were used for squares creation.

You can update color for square like this:

```
square = Square.new
square.color = 'red'
```

## Rectangle

Rectangle is very similiar to Square, with one major difference: it allows manipulation of `height` and `width` independently, where Square only allows a single value to manipulate both of those values.

Basic example of rectangle would look like this:

```
Rectangle.new
```

### width and height

`width` is a value that determines horizontal size of the rectangle, and `height` determines vertical size. Their default values are `200` for width, and `100` for height, so the initial example, if expanded, would look like this:

```
Rectangle.new(width: 200, height: 100)
```

You can read the value of `width` and `height` like this:

```
rectangle = Rectangle.new
rectangle.width #=> 200
rectangle.height #=> 100
```

You can set the value of `width` and `height` like this:

```
rectangle = Rectangle.new
rectangle.width = 250
rectangle.width = 50
```

### x, y, color

Rectangle class also allows managing of `x`, `y` and `color` attributes in the same way Square does.

## Quad

Quads allow you to draw 4-edged shapes organised in any way you want.

Basic example of quad will look like this:

```
Quad.new
```

Lets see how we can manipulate its position:

### x1, y1, x2, y2, x3, y3, x4, y4

Pairs of `(x, y)` pairs from `(x1, y1)` to `(x4, y4)` represent the position of quads edges. They have a default value, so the basic example, if expanded, would look like this:

```
Quad.new({
  x1: 0,   y1: 0,
    x2: 100, y2: 0,
    x3: 100, y3: 100,
    x4: 0,   y4: 100
})
```

And of course, each of those values can be get:

```
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

```
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

### color

Quad allows management of `color the same way Rectangle and Square do. Please review it's documentation for more details.


## Triangle

Triangle allows you to, unsurprisingly, draw triangles.

Basic example of triangle will look like this:

```
Triangle.new
```
Lets see how we can manipulate its position:

### x1, y1, x2, y2, x3, y3

Pairs of `(x, y)` pairs from `(x1, y1)` to `(x3, y3)` represent the position of triangle edges. They have a default value, so the basic example, if expanded, would look like this:

```
Triangle.new({
  x1: 50,  y1: 0,
  x2: 100, y2: 100,
  x3: 0,   y3: 100,
})
```

Each of those values can be get:

```
triangle = Triangle.new
triangle.x1 #=> 50
triangle.y1 #=> 0
triangle.x2 #=> 100
triangle.y2 #=> 100
triangle.x3 #=> 0
triangle.y3 #=> 100
```

And set:

```
triangle = Triangle.new
triangle.x1 = 0
triangle.y1 = 0
triangle.x2 = 150
triangle.y2 = 150
triangle.x3 = 300
triangle.y3 = 100
```

### color

Color management for triangles looks almost exactly like it works for squares, rectangles and quads, with one major difference: You can specify 3 colors, for 3 triangles edges respectively, instead of 4 colors.

So, for example, if you want to build a triangle with 3 edges of different colors, you would do:

```
Triangle.new(color: ["red", "green", "blue"]
```

As for other shapes, default color is white, so basic example, if expanded, would look like this:

```
Triangle.new(color: "white")
```

## Line

Line allows you to draw a straight line from one point to another. In it's simplest form, a line is drawn like this:

```
Line.new
```

Lets see how we can configure its behavior:

### x1, y1, x2, y2

`(x1, y1)` and `(x2, y2)` points represent lines beginning and end, respectively. By default, the line starts at point `(0, 0)` and `(100, 100)`, so the simplest form, if expanded, would look like this:

```
Line.new({
  x1: 0, y1: 0,
  x2: 0, y2: 0
})
```

Those values can also be get:

```
line = Line.new
line.x1 #=> 0
line.y1 #=> 0
line.x2 #=> 100
line.y2 #=> 100
```

And set:

```
line = Line.new
line.x1 = 50
line.y1 = 50
line.x2 = 150
line.y2 = 150
```

### width

You can decide the `width` of a triangle. The default width is `2`, so the basic example, if expanded, would look like this:

```
Line.new(width: 2)
```

You can, of course, get and set the width:

```
line = Line.new
line.width #=> 2
line.width = 5
line.width #=> 5
```

### color

TODO: Decide if we stick to allowing for 4 colors for line, or do we restrict for 1 color.

## Image

Image allows you to bring image files to your window.

In simplest form, it's usage looks like this:

```
Image.new(path: "/path/to/file")
```

where `/path/to/file` must point to an image file. If there is no file at this path, an error will be raised, with message:

`Cannot find image file '/path/to/file'`

### x, y

`x` and `y` represent the position of top left corner of the image. By default, they are both equal to `0`, so the basic example, if expanded, would look like this:

```
Image.new({
  x: 0, y: 0,
  path: "/path/to/file"
})
```

Those values can always be get and set:

```
image = Image.new(path: "/path/to/file")
image.x = 10
image.y = 10
image.x #=> 10
image.y #=> 10
```

### color

`color` represents the background if an image. By the default it's `white`, so the default example, if expanded, would look like this:

```
Image.new(path: "/path/to/file", color: "white")
```

`color` can be get and set:

```
image = Image.new(path: "/path/to/file")
image.color = "red"
image.color #=> Color.new("red")
```

## Text

To be added.
