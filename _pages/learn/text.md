---
title: Text
description: Learn how to draw text and use fonts
next_topic: sprites
layout: learn
---

Text can be rendered in the window using TrueType fonts. The simplest way:

```ruby
Text.new('Hello, Ruby 2D!')
```

Here are all the parameters:

| Parameter | Default | Description |
|---|---|---|
| `content` | (required) | The string to display (positional argument) |
| `x` | `0` | X position, or `:left` / `:center` / `:right` to [align to the window](/learn/2d-basics#aligning-to-the-window) |
| `y` | `0` | Y position, or `:top` / `:center` / `:bottom` to [align to the window](/learn/2d-basics#aligning-to-the-window) |
| `padding` | `0` | Gap from the window edge for [aligned axes](/learn/2d-basics#padding); override per-edge with `padding_top`, `padding_right`, `padding_bottom`, `padding_left` |
| `z` | `0` | Depth |
| `size` | `20` | Font size in points |
| `style` | `nil` | Font style |
| `font` | `Font.default` | Path to a `.ttf` font file |
| `rotate` | `0` | Rotation in degrees |
| `rx`, `ry` | Center | Rotation center |
| `color` | `'white'` | Text color |
| `opacity` | `nil` | Alpha override |
| `add` | `true` | Whether to add to the window immediately |

**Example:**

```ruby
text = Text.new('Score: 0', x: 10, y: 10, size: 24, color: 'yellow',
                font: '/path/to/font.ttf')
text.content = 'Score: 100'
text.size = 32
text.width   # => calculated width of the rendered text
text.height  # => calculated height of the rendered text
```

## Drawing text in render blocks

Just like images, you can draw text per-frame inside a `render` block:

```ruby
label = Text.new('FPS', add: false)

render do
  label.render(x: 10, y: 10, color: 'white')
end
```

# Bitmap text

If you don't want to deal with font files, `BitmapText` renders text using a built-in bitmap font, no TTF dependency needed:

```ruby
bt = BitmapText.new('Hello!')
```

| Parameter | Default | Description |
|---|---|---|
| `content` | (required) | The string to display (positional argument) |
| `x` | `0` | X position |
| `y` | `0` | Y position |
| `z` | `0` | Depth |
| `scale` | `3` | Size multiplier (a positive number; a float is truncated to a whole number) |
| `rotate` | `0` | Rotation in degrees |
| `rx`, `ry` | Center | Rotation center |
| `color` | `'white'` | Text color |
| `opacity` | `nil` | Alpha override |
| `add` | `true` | Whether to add to the window immediately |

**Example:**

```ruby
bt = BitmapText.new('Loading...', x: 10, y: 10, scale: 5, color: 'green')
bt.content = 'Ready!'
bt.scale = 4
bt.rotate = 15   # spins about the text's center; override with rx/ry
```

Bitmap text is great for quick prototyping or retro-style games where a pixel font fits the vibe.

# Fonts

The `Font` class provides utilities for discovering and loading system fonts.

**Example:**

```ruby
Font.all               # => ['arial', 'courier', ...] list of available font names
Font.path('arial')     # => '/Library/Fonts/Arial.ttf'
Font.default           # => path to the default font
```

Fonts are cached internally. You don't instantiate `Font` objects directly. They're managed behind the scenes by `Text`.

Continue to the [next topic ▸](/learn/{{ page.next_topic }})
