---
title: Images
description: Learn how to use images
next_topic: text
layout: learn
---

Images in many popular formats can be drawn in the window. To draw an image, just provide the file path:

```ruby
Image.new('star.png')
```

Here are all the parameters:

| Parameter | Default | Description |
|---|---|---|
| `path` | (required) | Path to the image file (positional argument) |
| `x` | `0` | X position, or `:left` / `:center` / `:right` to [align to the window](/learn/2d-basics#aligning-to-the-window) |
| `y` | `0` | Y position, or `:top` / `:center` / `:bottom` to [align to the window](/learn/2d-basics#aligning-to-the-window) |
| `padding` | `0` | Gap from the window edge for [aligned axes](/learn/2d-basics#padding); override per-edge with `padding_top`, `padding_right`, `padding_bottom`, `padding_left` |
| `z` | `0` | Depth |
| `width` | Native width | Display width |
| `height` | Native height | Display height |
| `rotate` | `0` | Rotation in degrees |
| `rx`, `ry` | Center | Rotation center |
| `tint` | `'white'` | Tint color (multiplies the image's pixels) |
| `opacity` | `nil` | Alpha override |
| `add` | `true` | Whether to add to the window immediately |

**Example:**

```ruby
img = Image.new('hero.png', x: 100, y: 100, width: 64, height: 64)
img.x = 200
img.rotate = 45
img.tint = 'red'    # multiply the image's pixels by red
```

Setting `tint:` to `'white'` (the default) leaves the image's colors untouched. Anything else multiplies in: `'red'` keeps only the red channel, `'#888'` darkens the whole thing by half, and so on.

# SVG images

SVGs work just like any other image. Pass the path to `Image.new` and you're done. The one wrinkle is that they're rasterized once at load time, so they're not infinitely scalable like SVGs on the web. To keep small upscales and rotations crisp, Ruby 2D rasterizes at twice your requested size when you pass `width:` and `height:`; without those, it uses the SVG's intrinsic size.

When you do want to resize an SVG at runtime and keep the edges sharp, ask for a fresh rasterization with `resize!`:

```ruby
bee = Image.new('bee.svg', width: 64, height: 64)
bee.resize!(256, 256)   # re-rasterize crisp at the new size

bee.width = 400         # just scales the existing raster
bee.resize!             # commit the current width/height to a fresh raster
```

`resize!` works on raster images (PNG, JPG, BMP) too. It re-decodes the source from disk and resamples to the new size, useful for trimming GPU memory when you're displaying a large source small. It's not free, so call it on size changes, not every frame.

> One thing to know: `resize!` isn't supported on sprites built from a `SpriteSheet` — they all share a single backing texture, so re-rasterizing one would corrupt the rest. It raises `Ruby2D::Error`. To change just that sprite's display size, set its `width`/`height`; for a true re-rasterization, use a standalone `Image`.

# Drawing images in render blocks

If you want to draw an image per-frame without creating a persistent object, create it with `add: false` and call `render` on it inside a `render` block:

```ruby
img = Image.new('tile.png', add: false)

render do
  img.render(x: 50, y: 50, width: 32, height: 32)
end
```

This is handy for things like repeating tile backgrounds or dynamic image placement where you control exactly when and where the image appears each frame.

# Hiding without removing

If you want to keep an image in the scene (so it holds its z-order and per-object event handlers) but skip drawing it for a few frames, use `.hide` and `.show`:

```ruby
img.hide              # stops drawing, keeps z-order and event handlers
img.show              # draws again
img.visible = false   # same thing as .hide
```

Reach for `.remove` and `.add` when you actually want the image out of the scene; reach for `.hide` and `.show` for a cheap per-frame toggle.

Continue to the [next topic](/learn/{{ page.next_topic }}){:.next-topic}
