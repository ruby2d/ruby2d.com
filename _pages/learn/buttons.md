---
title: Buttons
description: Learn how to create clickable UI buttons
next_topic: building
layout: learn
---

The `Button` class gives you a clickable UI element with an optional label and hover effect, handy for menus, toolbars, or anything that needs a good old-fashioned click.

# Creating a button

```ruby
btn = Button.new(x: 100, y: 200, width: 150, height: 40,
                 label: 'Click Me', color: '#333') do |event|
  puts 'Button clicked!'
end
```

| Parameter | Default | Description |
|---|---|---|
| `visual` | `nil` | An existing shape to use as the button (positional, optional) |
| `x` | `0` | X position, or `:left` / `:center` / `:right` to [align to the window](/learn/2d-basics#aligning-to-the-window) |
| `y` | `0` | Y position, or `:top` / `:center` / `:bottom` to [align to the window](/learn/2d-basics#aligning-to-the-window) |
| `padding` | `0` | Gap from the window edge for [aligned axes](/learn/2d-basics#padding); override per-edge with `padding_top`, `padding_right`, `padding_bottom`, `padding_left` |
| `z` | `0` | Depth |
| `width` | `200` | Width |
| `height` | `50` | Height |
| `label` | `nil` | Button label text |
| `color` | `'#333'` | Background color |
| `hover_color` | `nil` | Color on hover; pass `:auto` to auto-lighten the base color, or any color value |
| `pressed_color` | `nil` | Color while pressed; pass `:auto` to auto-darken the base color, or any color value |
| `stroke_color` | `nil` | Border color (self-rendered buttons only) |
| `stroke_width` | `0` | Border width in pixels (self-rendered buttons only) |
| `label_color` | `'white'` | Label text color |
| `hover_label_color` | `nil` | Label color on hover |
| `pressed_label_color` | `nil` | Label color while pressed |
| `label_size` | `20` | Label font size |
| Block | `nil` | Click handler |

The trailing block is sugar for `:click`, so the most common case stays a one-liner.

# Hover and pressed tints

By default, a button doesn't change appearance on hover or press: your visual is yours, and we won't repaint it without permission. When you do want feedback, `hover_color` and `pressed_color` each take a color or the symbol `:auto`:

```ruby
Button.new(x: 100, y: 100, width: 80, height: 26,
           label:         'RUMBLE',
           color:         '#333',
           hover_color:   '#444',
           pressed_color: '#ff9800') do
  pad&.rumble(strength: 0.8, duration: 0.4)
end
```

Pass `:auto` and Button picks a tint for you. `hover_color: :auto` lightens the base color, `pressed_color: :auto` darkens it:

```ruby
Button.new(x:, y:, ..., color: '#808080',
           hover_color:   :auto,   # auto-lightened
           pressed_color: :auto)   # auto-darkened
```

Want the label to swap too? `hover_label_color:` and `pressed_label_color:` are right there.

Pressed wins over hover — if the cursor is hovering *and* pressing, the pressed tint shows. Drag the cursor off mid-press and the rest color comes back; drag back on while still held and the press tint re-engages. Release over empty air and everything still cleans up the way you'd expect.

# Outline

Self-rendered buttons accept `stroke_color:` and `stroke_width:` for a border:

```ruby
Button.new(x: 100, y: 100, width: 80, height: 26,
           label:        'GO',
           color:        '#1e1e1e',
           stroke_color: '#888',
           stroke_width: 1)
```

The stroke stays put across hover and pressed transitions. Only the fill swaps. Wrapped buttons control their own stroke through the underlying shape, so these kwargs apply only to the self-rendered form.

# Beyond click

A button isn't only for clicks. `Button#on` accepts the full set of [per-object events](/learn/input#per-object-events) (`:click`, `:mouse_down`, `:mouse_up`, `:mouse_held`, `:hover`, `:hover_out`, `:drag`, and `:mouse_scroll`), so a "press to arm, release to fire" button (lit while held, rumbling a gamepad while pressed, that sort of thing) is right there:

```ruby
btn = Button.new(x: 0, y: 0, width: 100, height: 40, color: '#333')

btn.on(:mouse_down) { btn.color = '#555' }
btn.on(:mouse_up)   { btn.color = '#333' }
btn.on(:click)      { fire }
btn.on(:hover)      { puts 'enter' }
btn.on(:hover_out)  { puts 'leave' }
```

The kwarg form filters by mouse button, just like elsewhere in the input system:

```ruby
btn.on(click: :left)           { puts 'left click' }
btn.on(click: [:left, :right]) { puts 'either click' }
```

# Custom visual buttons

Want a circle button? Or a triangle? Wrap any shape as a button:

```ruby
circle = Circle.new(x: 200, y: 200, radius: 30, color: 'tomato')
btn = Button.new(circle) { puts 'Circle clicked!' }
```

The button hugs the shape: move the circle and the hit area moves with it, and a wrapped `Circle` only fires inside the actual circle, not its bounding box. It works the other way too, setting `btn.x` / `btn.y` moves the wrapped shape, its hit region, and any label all together. Wrapping doesn't tint the shape on its own. `hover_color:` and `pressed_color:` are still yours to set, and they mutate the wrapped shape's fill on hover and press, then restore it on release:

```ruby
Button.new(circle, hover_color: :auto, pressed_color: :auto)
Button.new(circle, hover_color: '#ff8800', pressed_color: '#cc4400')
```

The label-color kwargs and the stroke kwargs don't apply to wrapped buttons: those are for the self-rendered form. And while a tint is configured, leave the wrapped shape's color alone in your own code: Button caches the rest color at construction and will restore it on release.

# Just a hit area

Sometimes you've already drawn the visual yourself (pixel art on a [Canvas](/learn/canvas), say), and you just want a region of the window that listens for clicks and hovers. Leave off `label`, `color`, and `stroke_color`, and the button renders nothing; it quietly watches the box you gave it:

```ruby
Button.new(x: 12, y: 10, width: 26, height: 26) do
  # handle click
end
```

Click, hover, and drag still fire just the same — there's just nothing to look at. And since it draws nothing at all, a hit-area button without handlers won't get in the way of events meant for shapes drawn underneath it.

# Button methods

```ruby
btn.x = 50
btn.y = 50
btn.label = 'New Label'
btn.label           # => current label string or nil
btn.contains?(x, y) # hit-testing
btn.remove          # remove from the window
btn.add             # add back to the window
```

Continue to the [next topic ▸](/learn/{{ page.next_topic }})
