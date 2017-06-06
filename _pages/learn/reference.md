---
title: Class reference
subtitle: Get the facts about each class and how to use them

contents:
  - text: Window
    link: "#window"
  - text: Color
    link: "#color"
  - text: Triangle
    link: "#triangle"
  - text: Quadrilateral
    link: "#quadrilateral"
  - text: Rectangle
    link: "#rectangle"
  - text: Square
    link: "#square"
  - text: Image
    link: "#image"
# - text: Sprite
#   link: "#sprite"
  - text: Text
    link: "#text"
  - text: Sound
    link: "#sound"
  - text: Music
    link: "#music"
---

In this documentation, `x` is the x-coordinate and `y` is the y-coordinate. When required to distinguish between multiple pairs of `x` and `y` coordinates, they will be numbered, for example: `x1`, `y1` or `x2`, `y2`.

# Window

In Ruby 2D, the user doesn't directly interact with the `Window` class, but rather through a [domain-specific language](https://en.wikipedia.org/wiki/domain-specific_language) (DSL) that is created when the library is required:

```ruby
require 'ruby2d'

# DSL is now available
```

DSL methods can now be used, which will handle all window management.

## DSL methods

| Method                | Used to... |
|-----------------------|------------|
| `set(<attributes>)`   | Set a window attribute. |
| `get(<attribute>)`    | Retrieve a window attribute. |
| `on(<event>,<block>)` | Specify a block to be called for a particular event. |
| `update(<block>)`     | Specify a block to be called every loop, or frame, of the window. |
| `clear`               | Clear all drawable objects in the window. |
| `show`                | Show the window. |
| `close`               | Close the window. |

## Setting attributes

Window attributes can be set by calling the DSL method `set` and passing a `Hash` containing one or multiple pairs of attributes `Symbol` keys and an acceptable value.

```ruby
set <attribute_symbol_name>: <value>
```

### Examples

```ruby
set title: "My Game"

set background: 'red'

set width: 800, height: 600
```

### Settable attributes

These are all the window attributes that can be set.

| Attribute          | Description |
|--------------------|-------------|
| `:title`           | The title of the window. Default: `"Ruby 2D"` |
| `:background`      | The background color of the window. Any valid Ruby 2D `Color` is acceptable. Default: `"black"` |
| `:width`           | The width of the window in pixels. Default: `640` |
| `:height`          | The height of the window in pixels. Default: `480` |
| `:viewport_width`  | The width of the viewport in pixels, the visible part of the window. Default is the width of the window at the time `show` is called. |
| `:viewport_height` | Same as `:viewport_width` above, but for setting the height. |
| `:resizable`       | Determines if the window can be resized, either `true` or `false`. Default: `false` |
| `:borderless`      | Determines if the window has a border, either `true` or `false`. Default: `false` |
| `:fullscreen`      | Determines if the window will be shown in fullscreen mode, either `true` or `false`. Default: `false` |
| `:diagnostics`     | Prints debugging information to the console, either `true` or `false`. This is mostly useful when working on Ruby 2D itself. Default: `false` |

## Getting attributes

The value of all attributes that can be `set` can also be retrieved using `get`. Unlike the `set` method, only one attribute value per `get` can be retrieved.

There are also a few extra attributes that can be retrieved through `get`:

| Attribute  | Description |
|------------|-------------|
| `:window`  | The window object itself, just in case you want to `inspect` it. |
| `:frames`  | The number of frames that have been rendered since the start. |
| `:fps`     | The current frame rate expressed in frames per second (a `Float`). |
| `:mouse_x` | The x-coordinate position of the mouse, relative to the window. |
| `:mouse_y` | The y-coordinate position of the mouse, relative to the window. |

### Examples

```ruby
get :title
puts(get :background)

# Set position of a square equal to the mouse
s = Square.new
s.x, s.y = get(:mouse_x), get(:mouse_y)
```

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

# Triangle

`Ruby2D::Triangle`

## Constructor

```ruby
Triangle.new(x1: 50, y1: 0, x2: 100, y2: 100, x3: 0, y3: 100, z: 0, color: 'white')
# Where `color` is any valid Ruby 2D color,
# or set of three colors (for each vertex) in an array.
```

## Accessors

All attributes in the constructor can be read and written.

## Examples

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

# Quadrilateral

`Ruby2D::Quad`

## Constructor

```ruby
Quad.new(x1: 0, y1: 0, x2: 100, y2: 0, x3: 100, y3: 100, x4: 0, y4: 100, z: 0, color: 'white')
# Where `color` is any valid Ruby 2D color,
# or set of four colors (for each vertex) in an array.
```

## Accessors

All attributes in the constructor can be read and written.

## Examples

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

# Rectangle

`Ruby2D::Rectangle < Quad`

## Constructor

```ruby
Rectangle.new(x: 0, y: 0, width: 200, height: 100, z: 0, color: 'white')
# Where `color` is any valid Ruby 2D color,
# or set of four colors (for each vertex) in an array.
```

## Accessors

All attributes in the constructor can be read and written.

## Examples

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

# Square

`Ruby2D::Square < Rectangle`

## Accessors

All attributes in the constructor can be read and written.

## Constructor

```ruby
Square.new(x: 0, y: 0, size: 100, z: 0, color: 'white')
# Where `color` is any valid Ruby 2D color,
# or set of four colors (for each vertex) in an array.
```

## Examples

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

# Image

`Ruby2D::Image`

## Constructor

At creation, `width` and `height` are set to the native size of the image.

```ruby
Image.new(x: 0, y: 0, path: <image_file>, z: 0, color: 'white')
# Where `path` is the image file path
```

## Accessors

Read and write: `x`, `y`, `width`, `height`, `color`
Read only: `path`

## Examples

```ruby
Image.new(path: 'balloon.png')

img = Image.new(x: 50, y: 175, path: 'assets/tile.bmp')

img.x = 75
img.y = 100

img.width = 125
img.height = 125

img.color = [0.8, 1.0, 0.5, 1.0]

puts img.path
```

<!--
# Sprite

`Ruby2D::Sprite`

## Constructor

```ruby
Sprite.new(x, y, <path>)
# where <path> is the sprite sheet image path
```

## Accessors

## Examples

```ruby
spr = Sprite.new(0, 0, "character.png")

spr.clip(x, y, w, h, frames)

spr.next
```
-->

# Text

`Ruby2D::Text`

## Constructor

```ruby
Text.new(x: 0, y: 0, text: "Hello World!", size: 20, font: <file_path>, z: 0, color: 'white')
# Where `path` is the font file path
```

## Accessors

Read and write: `x`, `y`, `message`, `color`
Read only: `size`, `path`

## Examples

```ruby
txt = Text.new(x: 25, y: 50, text: 'hello!', size: 20, font: 'vera.ttf')

txt.text = "A new message!"

txt.color = 'fuchsia'
```

# Sound

`Ruby2D::Sound`

## Constructor

```ruby
Sound.new(path)
# Where `path` is the audio file path
```

## Accessors

Read only: `path`

## Examples

```ruby
snd = Sound.new("boom.wav")

# Play the sound
snd.play
```

# Music

`Ruby2D::Music`

## Constructor

```ruby
Music.new(path)
# Where `path` is the audio file path
```

## Accessors

Read and write: `loop`
Read only: `path`

## Examples

```ruby
mus = Music.new("song.mp3")

# Play the music
mus.play

# Pause the music
mus.pause

# Resume playing the music from where left off
mus.play

# Stop playing and rewind to the beginning
mus.stop

# Loop the music to repeat after finished playing
mus.loop = true

# Fade out music over 2 seconds (2000 milliseconds) and stop
mus.fadeout(2000)
```
