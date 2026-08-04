---
title: Canvas
description: Learn how to draw pixels and shapes on a canvas
next_topic: audio
layout: learn
---

The `Canvas` is a pixel-level drawing surface for procedural graphics. Think of it as a blank sheet you can paint on with code: fill shapes, draw outlines, stamp images, and render text, all onto a single texture.

# Creating a canvas

```ruby
canvas = Canvas.new(width: 200, height: 200)
```

| Parameter | Default | Description |
|---|---|---|
| `width` | (required) | Canvas width |
| `height` | (required) | Canvas height |
| `x` | `0` | X position |
| `y` | `0` | Y position |
| `z` | `0` | Depth |
| `rotate` | `0` | Rotation in degrees |
| `fill` | Transparent | Background fill color (RGBA array) |
| `tint` | `'white'` | Tint color, also used as the implicit color for `fill_*` / `stroke_*` / `draw_*` calls |
| `opacity` | `nil` | Alpha override |
| `add` | `true` | Whether to add to the window immediately |
| `visible` | `true` | Whether the canvas is drawn each frame |

The `tint` is multiplied against the canvas texture when it's drawn, so setting `tint: 'red'` colorizes everything you've painted onto the canvas without touching the pixels themselves. It also acts as the default color for any `fill_*` / `stroke_*` / `draw_*` call that doesn't pass `color:` explicitly.

# Filled shapes

Draw solid shapes directly onto the canvas:

```ruby
canvas.fill_rectangle(x: 10, y: 10, width: 50, height: 30, color: 'red')
canvas.fill_square(x: 10, y: 10, size: 50, color: 'blue')
canvas.fill_triangle(x1: 0, y1: 0, x2: 50, y2: 0, x3: 25, y3: 50, color: 'green')
canvas.fill_quad(x1: 0, y1: 0, x2: 50, y2: 0, x3: 50, y3: 50, x4: 0, y4: 50)
canvas.fill_circle(x: 100, y: 100, radius: 25, color: 'yellow')
canvas.fill_ellipse(x: 100, y: 100, xradius: 40, yradius: 20)
canvas.fill_polygon(points: [[x1, y1], [x2, y2], [x3, y3]], color: 'purple')
```

Fill methods also accept per-vertex colors by passing a plain array, the same way they work on shapes like `Triangle` and `Quad`:

```ruby
canvas.fill_triangle(x1: 0, y1: 0, x2: 100, y2: 0, x3: 50, y3: 100, color: ['red', 'green', 'blue'])
```

The number of colors required depends on the method:

| Method | Colors required |
|---|---|
| `fill_triangle` | 3 (one per vertex) |
| `fill_quad` | 4 (one per vertex) |
| `fill_rectangle` | 4 (top-left, top-right, bottom-right, bottom-left) |
| `fill_square` | 4 (same as `fill_rectangle`) |
| `fill_polygon` | One per point in the `points:` array |

Each color can be a named string (`'red'`), hex string (`'#FF0000'`), or RGBA float array (`[1.0, 0.0, 0.0, 1.0]`).

# Stroked (outlined) shapes

For shapes that have a fill counterpart, swap `fill_` for `stroke_` to draw just the outline:

```ruby
canvas.stroke_triangle(x1: 0, y1: 0, x2: 50, y2: 0, x3: 25, y3: 50, stroke_width: 1)
canvas.stroke_quad(x1: 0, y1: 0, x2: 50, y2: 0, x3: 50, y3: 50, x4: 0, y4: 50)
canvas.stroke_rectangle(x: 10, y: 10, width: 50, height: 30, stroke_width: 2)
canvas.stroke_square(x: 10, y: 10, size: 50)
canvas.stroke_circle(x: 100, y: 100, radius: 25, sectors: 30)
canvas.stroke_ellipse(x: 100, y: 100, xradius: 40, yradius: 20, sectors: 30)
```

Lines and polylines don't have a fill counterpart, so they keep the `draw_` prefix:

```ruby
canvas.draw_line(x1: 0, y1: 0, x2: 100, y2: 100, stroke_width: 2, color: 'white')
canvas.draw_polyline(points: [[x1, y1], [x2, y2]], stroke_width: 1, closed: false)
```

Set `closed: true` on `draw_polyline` to connect the last point back to the first, forming a closed polygon outline.

# Dashed lines

`draw_line` accepts `dash:` and `gap:` for segmented strokes. Pass a `dash:` greater than `0` and the line renders as dashes instead of one solid stroke:

```ruby
canvas.draw_line(x1: 0, y1: 0, x2: 200, y2: 0, stroke_width: 2,
                 dash: 10, gap: 5, color: 'white')
```

Hand `color:` a two-element array (`[start, end]`) and the dashes carry a smooth gradient from one end of the line to the other:

```ruby
canvas.draw_line(x1: 0, y1: 0, x2: 400, y2: 0, stroke_width: 6,
                 dash: 12, gap: 6, color: ['red', 'aqua'])
```

# Per-vertex stroke gradients

The `stroke_*` outline methods accept the same per-vertex color arrays that `fill_*` does, so a fading outline takes one extra argument:

```ruby
canvas.stroke_quad(x1: 0, y1: 0, x2: 100, y2: 0, x3: 100, y3: 100, x4: 0, y4: 100,
                   stroke_width: 4,
                   color: ['red', 'yellow', 'aqua', 'lime'])

canvas.draw_polyline(points: [[0, 0], [50, 100], [100, 0], [150, 100]],
                     stroke_width: 3,
                     color: ['red', 'green', 'blue', 'purple'])
```

`stroke_circle` and `stroke_ellipse` stay single-color: their sectors don't have a meaningful vertex order to interpolate between.

# Drawing many shapes at once

When you're drawing hundreds of same-colored primitives each frame (a grid, a swarm of particles, a tile map, a debug overlay), the per-call overhead adds up fast. Two batched methods let you hand over a whole pile of shapes in one go:

```ruby
canvas.draw_lines(segments: [[[x1, y1], [x2, y2]], ...],
                  stroke_width: 1, color: 'white')

canvas.fill_rectangles(rectangles: [[x, y, w, h], ...],
                       color: 'blue')
```

Each segment is a pair of `[x, y]` points and each rectangle is `[x, y, w, h]`. The pixels that land on screen are exactly what you'd get from a loop of `draw_line` or `fill_rectangle` calls, just a lot faster.

Say you want a background grid behind your scene. Without batching, you'd loop and call `draw_line` once per gridline; with batching, you gather the segments into a single array and draw the whole thing in one call:

```ruby
segments = []
10.times { |i| segments << [[0, i * 50], [500, i * 50]] }   # horizontal
10.times { |i| segments << [[i * 50, 0], [i * 50, 500]] }   # vertical
canvas.draw_lines(segments: segments, color: 'gray')
```

A batch shares one color and one `stroke_width`, so when the colors vary, the trick is to sort shapes into buckets and make one call per bucket. Picture a tile map — group the tiles by terrain, then draw each group together:

```ruby
grass, water = [], []
tiles.each do |tile|
  target = tile.water? ? water : grass
  target << [tile.x, tile.y, tile.size, tile.size]
end
canvas.fill_rectangles(rectangles: grass, color: 'green')
canvas.fill_rectangles(rectangles: water, color: 'blue')
```

A few things to know:

- Handing in an empty array is fine — nothing draws, nothing breaks.
- Each segment needs two `[x, y]` points and each rectangle needs four numbers (position and size). If the shape doesn't line up, you'll get an `ArgumentError`.

# Per-cell color grids

`fill_rectangles` is perfect when every cell shares a color, but for heatmaps, tile fields, or anything where each cell carries its *own* shade, the per-rect array shape stops being a good fit. Reach for `fill_pixel_grid` instead: you describe the grid once, then hand over a flat color buffer.

```ruby
colors = Array.new(100 * 75 * 4, 0.0)   # rgba per cell, 0.0..1.0
# ...fill `colors` however you like...
canvas.fill_pixel_grid(cols: 100, rows: 75, cell_w: 8, cell_h: 8,
                       x: 0, y: 0, colors: colors)
```

Cell `(c, r)` lands at `(x + c*cell_w, y + r*cell_h)` and reads its color from `colors[(r*cols + c)*4..]`: four floats for red, green, blue, alpha. Cells whose alpha is `0` are skipped, so you can punch holes in the grid for free.

The win is the same one `fill_rectangles` gets you, scaled up: one call hands over the whole grid instead of one per cell.

# Opacity

Every method that takes `color:` accepts an `opacity:` keyword too, a quick way to draw the same shape a little more see-through without building a whole new `Color`. Pass a value from `0.0` to `1.0` and it stands in for the color's alpha for that one call:

```ruby
canvas.draw_line(x1: 0, y1: 0, x2: 100, y2: 100, color: 'red', opacity: 0.35)
canvas.fill_rectangle(x: 0, y: 0, width: 50, height: 50, color: 'blue', opacity: 0.5)
```

The `Color` object you hand in isn't touched. The override lives just for the draw. Leave `opacity:` off and whatever alpha the color already has is used as-is.

When you're drawing a shape with per-vertex colors, `opacity:` applies to every color in the set, a one-line way to fade the whole fill without rebuilding its palette:

```ruby
canvas.fill_rectangle(
  x: 0, y: 0, width: 100, height: 100,
  color: ['red', 'green', 'blue', 'yellow'],
  opacity: 0.35
)
```

`draw_polyline` goes one step further. Its `opacity:` can be an array with one value per vertex, and SDL interpolates smoothly between them along the path:

```ruby
canvas.draw_polyline(
  points: [[50, 200], [150, 150], [250, 200], [350, 120]],
  stroke_width: 2, color: 'orange',
  opacity: [1.0, 1.0, 1.0, 0.35]
)
```

This is great for indicator lines where the projected tail should fade out, something that previously meant splitting into separate `draw_line` calls with a visible seam at the junction.

# Drawing images and text onto a canvas

You can stamp images and text directly onto the canvas surface:

```ruby
img = Image.new('texture.png', add: false)
canvas.draw_image(img, x: 10, y: 10, width: 64, height: 64)

label = Text.new('Canvas text', add: false)
canvas.draw_text(label, x: 10, y: 80, color: 'yellow')
```

# Update and clear

Call `update` to apply any pending pixel changes to the canvas texture:

```ruby
canvas.update         # apply pending pixel changes
```

To reset the canvas:

```ruby
canvas.clear          # reset to the fill color
canvas.clear('red')   # clear to a specific color
canvas.clear(nil, x: 10, y: 10, width: 50, height: 50)  # clear just a region
```

# On-demand rendering

If your window is in [`:on_demand` mode](/learn/window#on-demand-rendering), painting onto a canvas already counts as "something changed": `fill_*`, `stroke_*`, `draw_*`, `clear`, and `update` each queue a frame for you. No need to follow them up with a `request_render`. (In `:continuous` mode it's a no-op. A frame's coming next tick anyway.)

The shortcut stops at the canvas surface, though. Tweaking a regular shape's attributes (`rect.x = 100`, `circle.color = 'red'`) still needs a `request_render` of your own.

# Drawing a canvas in render blocks

Like images and text, a canvas can be drawn per-frame from inside a `render` block, handy when you want to stamp the same canvas at different positions, sizes, or tints without creating multiple persistent objects:

```ruby
canvas = Canvas.new(width: 64, height: 64, add: false)
# ...paint something onto the canvas...

render do
  canvas.render(x: 10, y: 10)
  canvas.render(x: 100, y: 10, rotate: 45, tint: 'red', opacity: 0.5)
end
```

Any of `x:`, `y:`, `width:`, `height:`, `rotate:`, `tint:`, and `opacity:` can be passed as a per-frame override.

Continue to the [next topic ▸](/learn/{{ page.next_topic }})
