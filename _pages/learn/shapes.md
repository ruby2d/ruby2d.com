---
title: Shapes
description: Learn how to draw common geometric shapes
next_topic: images
layout: learn
---

A number of shapes can be drawn in the window: [triangles](#triangles), [squares](#squares), [rectangles](#rectangles), [quadrilaterals](#quadrilaterals), [lines](#lines), [circles](#circles), [ellipses](#ellipses), [polygons](#polygons), and [polylines](#polylines). All shapes are automatically added to the window when created, and they share some common features:

```ruby
shape.x           # x position
shape.y           # y position
shape.z           # depth (drawing order); higher z is drawn on top
shape.z = 10      # changing z re-inserts the object in the correct order
shape.width       # width
shape.height      # height
shape.color       # the color or color set
shape.color = 'blue'
shape.opacity     # alpha (0.0..1.0)
shape.opacity = 0.5
shape.add         # add to the window (done automatically on creation)
shape.remove      # remove from the window
shape.show        # make visible (without changing z-order)
shape.hide        # stop drawing this frame, but keep its place in the scene
shape.visible?    # true if currently drawn
shape.contains?(x, y)  # hit-testing
```

All instance attributes can be read and set individually on any shape:

```ruby
t = Triangle.new
t.x1 = 50
t.y3 = 25
t.color = 'red'
```

# Anchor points

What `shape.x` and `shape.y` mean depends on the kind of shape, but there's a simple rule:

- **Vertex-defined shapes** (`Triangle`, `Quad`, `Polygon`, `Polyline`) anchor at the **centroid**.
- **Bounding-box shapes** (`Rectangle`, `Square`) anchor at the **top-left** corner.
- **Center-defined shapes** (`Circle`, `Ellipse`) anchor at the **center**.

Setting `shape.x =` translates the whole shape so its anchor lands at the new position. The anchor is also the default pivot for rotation, except on `Rectangle` and `Square`, which rotate around the bounding-box center rather than the top-left.

Bounding-box shapes (`Rectangle`, `Square`) and center-anchored shapes (`Circle`, `Ellipse`) also accept symbols for `x:` and `y:` to [align them to the window](/learn/2d-basics#aligning-to-the-window). Each aligns its bounding box, and the anchor follows. The vertex-anchored shapes (`Triangle`, `Quad`, `Polygon`, `Polyline`) don't: with no edge to hug, passing a symbol raises a clear error.

# Fill and stroke

Every closed shape (`Triangle`, `Quad`, `Rectangle`, `Square`, `Circle`, `Ellipse`, and `Polygon`) accepts a fill, a stroke (outline), or both:

| Parameter | Default | Description |
|---|---|---|
| `fill` | `true` | Whether to draw the filled interior |
| `stroke_width` | `0` | Outline thickness; `0` means no outline |
| `stroke_color` | Same as `color` | Outline color |

A few examples:

```ruby
# Just an outline — no fill
Rectangle.new(x: 10, y: 10, width: 100, height: 60,
              fill: false, stroke_width: 3, stroke_color: 'red')

# Filled with a contrasting outline
Circle.new(x: 100, y: 100, radius: 40,
           color: 'navy', stroke_width: 2, stroke_color: 'white')
```

`opacity:` applies to both the fill and the stroke at the same time. Sharp corners use miter joins, clamped at four times the stroke width (the same limit SVG uses), so very acute angles cap cleanly instead of spiking off into space.

`Line` and `Polyline` are stroke-only: they don't take `fill:` or `stroke_color:`. Use `color:` and `stroke_width:` for those.

# Triangles

Create a triangle using:

```ruby
Triangle.new
```

Here are all the parameters:

| Parameter | Default | Description |
|---|---|---|
| `x1` | `50` | Vertex 1 x |
| `y1` | `0` | Vertex 1 y |
| `x2` | `100` | Vertex 2 x |
| `y2` | `100` | Vertex 2 y |
| `x3` | `0` | Vertex 3 x |
| `y3` | `100` | Vertex 3 y |
| `z` | `0` | Depth |
| `rotate` | `0` | Rotation in degrees |
| `rx`, `ry` | Centroid | Rotation center |
| `color` | `'white'` | Color (single or 3-element array for per-vertex) |
| `fill` | `true` | Whether to fill the interior |
| `stroke_width` | `0` | Outline thickness |
| `stroke_color` | Same as `color` | Outline color (single or 3-element array) |
| `opacity` | `nil` | Alpha override |

**Example:**

```ruby
tri = Triangle.new(x1: 50, y1: 0, x2: 100, y2: 100, x3: 0, y3: 100, color: 'green')
tri.x = 200    # translates all vertices (x and y refer to the centroid)
tri.color = 'red'

# Outline-only triangle with a per-vertex gradient stroke
Triangle.new(x1: 0, y1: 100, x2: 100, y2: 100, x3: 50, y3: 0,
             fill: false, stroke_width: 6,
             stroke_color: ['red', 'yellow', 'aqua'])

# Or pass the same vertices as point pairs
Triangle.new(points: [[50, 0], [100, 100], [0, 100]], color: 'green')
```

# Squares

Create a square using:

```ruby
Square.new
```

| Parameter | Default | Description |
|---|---|---|
| `x` | `0` | Top-left x, or `:left` / `:center` / `:right` to [align to the window](/learn/2d-basics#aligning-to-the-window) |
| `y` | `0` | Top-left y, or `:top` / `:center` / `:bottom` to [align to the window](/learn/2d-basics#aligning-to-the-window) |
| `padding` | `0` | Gap from the window edge for [aligned axes](/learn/2d-basics#padding); override per-edge with `padding_top`, `padding_right`, `padding_bottom`, `padding_left` |
| `size` | `100` | Side length |
| `z` | `0` | Depth |
| `rotate` | `0` | Rotation in degrees |
| `rx`, `ry` | Center | Rotation center |
| `color` | `'white'` | Color (single or 4-element array for per-vertex) |
| `fill` | `true` | Whether to fill the interior |
| `stroke_width` | `0` | Outline thickness |
| `stroke_color` | Same as `color` | Outline color (single or 4-element array) |
| `opacity` | `nil` | Alpha override |

**Example:**

```ruby
sq = Square.new(x: 10, y: 10, size: 50)
sq.size = 75
```

# Rectangles

Create a rectangle using:

```ruby
Rectangle.new
```

| Parameter | Default | Description |
|---|---|---|
| `x` | `0` | Top-left x, or `:left` / `:center` / `:right` to [align to the window](/learn/2d-basics#aligning-to-the-window) |
| `y` | `0` | Top-left y, or `:top` / `:center` / `:bottom` to [align to the window](/learn/2d-basics#aligning-to-the-window) |
| `padding` | `0` | Gap from the window edge for [aligned axes](/learn/2d-basics#padding); override per-edge with `padding_top`, `padding_right`, `padding_bottom`, `padding_left` |
| `width` | `200` | Width |
| `height` | `100` | Height |
| `z` | `0` | Depth |
| `rotate` | `0` | Rotation in degrees |
| `rx`, `ry` | Center | Rotation center |
| `color` | `'white'` | Color (single or 4-element array for per-vertex) |
| `fill` | `true` | Whether to fill the interior |
| `stroke_width` | `0` | Outline thickness |
| `stroke_color` | Same as `color` | Outline color (single or 4-element array) |
| `opacity` | `nil` | Alpha override |

**Example:**

```ruby
rect = Rectangle.new(x: 10, y: 10, width: 100, height: 50)
rect.width = 200
rect.height = 100
```

# Quadrilaterals

A quadrilateral defined by four vertices in clockwise order:

```ruby
Quad.new
```

| Parameter | Default | Description |
|---|---|---|
| `x1`, `y1` | `0, 0` | Top-left vertex |
| `x2`, `y2` | `100, 0` | Top-right vertex |
| `x3`, `y3` | `100, 100` | Bottom-right vertex |
| `x4`, `y4` | `0, 100` | Bottom-left vertex |
| `z` | `0` | Depth |
| `rotate` | `0` | Rotation in degrees |
| `rx`, `ry` | Centroid | Rotation center |
| `color` | `'white'` | Color (single or 4-element array for per-vertex) |
| `fill` | `true` | Whether to fill the interior |
| `stroke_width` | `0` | Outline thickness |
| `stroke_color` | Same as `color` | Outline color (single or 4-element array) |
| `opacity` | `nil` | Alpha override |

**Example:**

```ruby
quad = Quad.new(x1: 0, y1: 0, x2: 80, y2: 0, x3: 100, y3: 100, x4: 20, y4: 100)
quad.x = 150   # translates all four vertices so the centroid lands at x = 150
quad.color = ['red', 'green', 'blue', 'yellow']

# Or pass the same vertices as point pairs
Quad.new(points: [[0, 0], [80, 0], [100, 100], [20, 100]])
```

`quad.x` and `quad.y` are the centroid of the four vertices. That's the same convention `Triangle`, `Polygon`, and `Polyline` use. If you want top-left anchor semantics, reach for `Rectangle` or `Square`; if you specifically want vertex 1, read `quad.x1` directly.

# Lines

Create a line using:

```ruby
Line.new
```

| Parameter | Default | Description |
|---|---|---|
| `x1` | `0` | Start x |
| `y1` | `0` | Start y |
| `x2` | `100` | End x |
| `y2` | `100` | End y |
| `z` | `0` | Depth |
| `stroke_width` | `1` | Line thickness |
| `dash` | `0` | Dash length (0 means solid) |
| `gap` | `5` | Gap between dashes |
| `rotate` | `0` | Rotation in degrees |
| `rx`, `ry` | Midpoint | Rotation center |
| `color` | `'white'` | Single color, or `[start, end]` for a gradient |
| `opacity` | `nil` | Alpha override |

**Example:**

```ruby
line = Line.new(x1: 0, y1: 0, x2: 200, y2: 200)
line.length  # => geometric length of the line
line.x1 = 50
line.stroke_width = 5

# A dashed line that fades from red to aqua along its length
Line.new(x1: 0, y1: 0, x2: 400, y2: 0, stroke_width: 6,
         dash: 12, gap: 6, color: ['red', 'aqua'])

# Or pass the endpoints as point pairs
Line.new(points: [[0, 0], [200, 200]])
```

Pass two colors to `color:` and Ruby 2D interpolates between them along the line. If the line is dashed, the gradient carries smoothly from one dash to the next so the whole stroke reads as a single fade.

# Circles

Create a circle using:

```ruby
Circle.new
```

| Parameter | Default | Description |
|---|---|---|
| `x` | `0` | Center x, or `:left` / `:center` / `:right` to [align to the window](/learn/2d-basics#aligning-to-the-window) |
| `y` | `0` | Center y, or `:top` / `:center` / `:bottom` to [align to the window](/learn/2d-basics#aligning-to-the-window) |
| `padding` | `0` | Gap from the window edge for [aligned axes](/learn/2d-basics#padding); override per-edge with `padding_top`, `padding_right`, `padding_bottom`, `padding_left` |
| `z` | `0` | Depth |
| `radius` | `50` | Radius |
| `sectors` | `30` | Number of triangle sectors (smoothness) |
| `rotate` | `0` | Rotation in degrees |
| `rx`, `ry` | Center | Rotation center |
| `color` | `'white'` | Single color only |
| `fill` | `true` | Whether to fill the interior |
| `stroke_width` | `0` | Outline thickness |
| `stroke_color` | Same as `color` | Outline color |
| `opacity` | `nil` | Alpha override |

**Example:**

```ruby
circle = Circle.new(x: 200, y: 200, radius: 40, color: 'blue', sectors: 60)
circle.radius = 60
circle.color = 'purple'
```

# Ellipses

An ellipse is like a circle that's been stretched along one axis:

```ruby
Ellipse.new(x: 100, y: 100, xradius: 60, yradius: 30)
```

| Parameter | Default | Description |
|---|---|---|
| `x` | `0` | Center x, or `:left` / `:center` / `:right` to [align to the window](/learn/2d-basics#aligning-to-the-window) |
| `y` | `0` | Center y, or `:top` / `:center` / `:bottom` to [align to the window](/learn/2d-basics#aligning-to-the-window) |
| `padding` | `0` | Gap from the window edge for [aligned axes](/learn/2d-basics#padding); override per-edge with `padding_top`, `padding_right`, `padding_bottom`, `padding_left` |
| `z` | `0` | Depth |
| `xradius` | `50` | Horizontal radius |
| `yradius` | `30` | Vertical radius |
| `sectors` | `30` | Number of triangle sectors (smoothness) |
| `rotate` | `0` | Rotation in degrees |
| `rx`, `ry` | Center | Rotation center |
| `color` | `'white'` | Single color only |
| `fill` | `true` | Whether to fill the interior |
| `stroke_width` | `0` | Outline thickness |
| `stroke_color` | Same as `color` | Outline color |
| `opacity` | `nil` | Alpha override |

Hit-testing uses the actual ellipse equation, so `contains?` is true for points genuinely inside the curve, not just inside its bounding box. It tilts with the shape when you rotate, too, so clicks and hovers land on the oval you actually see.

# Polygons

A polygon is any closed shape with three or more vertices, defined as a list of `[x, y]` point pairs:

```ruby
Polygon.new(points: [[50, 0], [100, 50], [75, 100], [25, 100], [0, 50]])
```

| Parameter | Default | Description |
|---|---|---|
| `points` | (required) | Array of `[x, y]` pairs |
| `z` | `0` | Depth |
| `rotate` | `0` | Rotation in degrees |
| `rx`, `ry` | Centroid | Rotation center |
| `color` | `'white'` | Color (single or one per vertex) |
| `fill` | `true` | Whether to fill the interior |
| `stroke_width` | `0` | Outline thickness |
| `stroke_color` | Same as `color` | Outline color (single or one per vertex) |
| `opacity` | `nil` | Alpha override |

**Example:**

```ruby
hex = Polygon.new(
  points: [[50, 0], [100, 25], [100, 75], [50, 100], [0, 75], [0, 25]],
  color: ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
)
```

Hit-testing uses an even-odd ray cast, so concave polygons (stars, arrows, gears) work correctly.

# Polylines

A polyline is a connected sequence of line segments, handy for paths, charts, and outlines. It's open by default, but can join back to its first point with `closed: true`:

```ruby
Polyline.new(points: [[0, 0], [50, 100], [100, 0], [150, 100]])
```

| Parameter | Default | Description |
|---|---|---|
| `points` | (required) | Array of `[x, y]` pairs |
| `z` | `0` | Depth |
| `stroke_width` | `1` | Line thickness |
| `rotate` | `0` | Rotation in degrees |
| `rx`, `ry` | Centroid | Rotation center |
| `color` | `'white'` | Color (single, or one per vertex for a gradient along the path) |
| `opacity` | `nil` | Alpha override (single value, or one per vertex) |
| `closed` | `false` | Connect the last point back to the first |

**Example:**

```ruby
# A simple zigzag path
Polyline.new(points: [[0, 0], [50, 100], [100, 0], [150, 100]],
             stroke_width: 3, color: 'orange')

# Per-vertex opacity — the tail fades out
Polyline.new(
  points: [[50, 200], [150, 150], [250, 200], [350, 120]],
  stroke_width: 3, color: 'orange',
  opacity: [1.0, 1.0, 1.0, 0.35]
)

# A closed outline — the last point joins back to the first.
# It's just the outline, though; for a filled version, use Polygon.
Polyline.new(points: [[100, 100], [200, 100], [200, 200], [100, 200]],
             stroke_width: 2, color: 'white', closed: true)
```

Just like `color:`, `opacity:` accepts either a single value that applies everywhere, or an array with one entry per vertex. When you pass an array, SDL interpolates smoothly between the values along each segment (handy for chart indicator lines with a faded projection tail, or any path that should trail off at one end).

The getter mirrors whatever you set: an array when per-vertex is active, the scalar alpha otherwise. Assigning a single value reverts to uniform opacity.

`contains?` measures perpendicular distance to each segment and returns `true` when the point is within `stroke_width / 2`.

# Per-vertex stroke gradients

Wherever a shape has natural vertices, the stroke can fade between colors around its perimeter, not just the fill. Pass an array of colors to `stroke_color:` (or `color:` on `Polyline`) with one entry per vertex, and Ruby 2D interpolates between them along the outline:

```ruby
Quad.new(x1: 0, y1: 0, x2: 100, y2: 0, x3: 100, y3: 100, x4: 0, y4: 100,
         fill: false, stroke_width: 4,
         stroke_color: ['red', 'yellow', 'aqua', 'lime'])
```

This works on `Triangle` (3 colors), `Quad` / `Rectangle` / `Square` (4), and `Polygon` / `Polyline` (one per vertex). `Circle` and `Ellipse` stay single-color, since their sectors don't have a meaningful vertex order.

If you give a shape a per-vertex fill and don't set `stroke_color:`, the stroke automatically picks up the same gradient, handy when you want the outline to trace the edge of the fill exactly.

# Rotation

All shapes support rotation via the `rotate` attribute, specified in degrees. Each shape has a sensible default pivot (the centroid for vertex-defined shapes, the bounding-box center for `Rectangle` and `Square`, and the anchor itself for circles and ellipses), and you can override it with `rx` and `ry`:

```ruby
rect = Rectangle.new(x: 100, y: 100, width: 50, height: 50, rotate: 45)
rect.rotate = 90
rect.rx = 0    # rotate around the origin instead
rect.ry = 0
```

An `Ellipse` tilts right along with everything else, which is the only way to sit an oval on a diagonal. (A `Circle` accepts `rotate` too, but since it looks the same at every angle, nothing appears to change.)

```ruby
ell = Ellipse.new(x: 200, y: 150, xradius: 80, yradius: 30,
                  color: 'teal', rotate: 30)
ell.rotate = 90    # update any time
```

# Visibility vs. scene-graph membership

Every shape has two independent lifecycle controls, and it pays to know which one to reach for.

**Scene-graph membership** is whether the object exists in the window's collection at all. Use `add: false` to construct a shape without registering it, and `.add` / `.remove` to flip that later. Removing a shape pulls it out of iteration, z-ordering, and per-object event dispatch entirely.

**Visibility** is whether the shape draws this frame. Use `.show` / `.hide` (or set `visible:` directly) to toggle it. Hidden shapes keep their slot, their z-order, and their per-object events — only the drawing is skipped.

Reach for `.hide` and `.show` when you want a cheap per-frame toggle (a blinking cursor, a UI overlay you flick on and off, a paused entity that should still respond to clicks). Reach for `.remove` and `.add` for genuine lifecycle changes: spawn-on-trigger entities, render-block-only shapes, anything you don't want participating in the scene at all.

```ruby
hud = Rectangle.new(x: 0, y: 0, width: 800, height: 40, color: 'navy', z: 10)
hud.hide              # stops drawing, keeps its z-order
hud.show              # draws again
hud.visible = false   # same thing as .hide

# add: false constructs without registering — useful for spawn-on-trigger
# entities or render-block overrides
powerup = Square.new(x: 200, y: 200, size: 32, color: 'yellow', add: false)
powerup.add  # later, when triggered
```

# One-shot rendering

Every shape has a class-level `.render` method for one-off drawing inside a `render` block. These don't create persistent objects — they're drawn fresh each frame and accept the same kwargs as `.new`, including the full color vocabulary (names, hex strings, arrays, `Color` objects, per-vertex arrays) and `opacity:`:

```ruby
render do
  Rectangle.render(x: 0, y: 0, width: 50, height: 50, color: 'red')
  Circle.render(x: 100, y: 100, radius: 25, color: '#00ff00')
  Triangle.render(x1: 0, y1: 0, x2: 50, y2: 0, x3: 25, y3: 50,
                  color: ['red', 'green', 'blue'])
end
```

Continue to the [next topic](/learn/{{ page.next_topic }}){:.next-topic}
