---
title: The window
description: Learn how to create and configure a window
next_topic: 2d-basics
layout: learn
---

# Creating a window

As you saw in the ["get started" tutorial](/learn/get-started), the simplest thing you can do in Ruby 2D is require the gem and `show` the window:

```ruby
require 'ruby2d'

show
```

If you'd like to follow along, save this code to a file named `window.rb` and run it using the standard Ruby interpreter on the command line, like so:

```bash
ruby window.rb
```

You should see a black, empty window with a size of 640-by-480 pixels and a title bar with the text "Ruby 2D".

# Setting attributes

When you don't set any window attributes, the default values will be used. You can change these attributes by using the `set` method. Let's try changing the window title before we `show` it:

```ruby
require 'ruby2d'

set title: "Hello World!"

show
```

Notice the title bar of the window is now set to the new text we provided. The Ruby 2D domain-specific language (DSL) makes it easy to change things in a natural and intuitive way. Here, we're calling a method called `set` and passing it a `Hash` with a `Symbol` called `:title` as the key, and a `String` with the text `"Hello World!"` as the value.

Let's play with some other attributes. The black background is a little boring, so let's change it! We can `set` it to something more interesting, like the color blue:

```ruby
set background: 'blue'
```

Try some other colors, like `red`, `orange`, `lime`, `fuchsia`, or roll the dice with `random`. When there are multiple attributes we want to set, we can chain them together for convenience:

```ruby
set title: 'Howdy', background: 'navy'
```

Great! You've got the basics of setting attributes down. Here are all the attributes you can set:

| Attribute | Type | Default | Description |
|---|---|---|---|
| `title` | String | `'Ruby 2D'` | Window title bar text |
| `width` | Integer | `640` | Window width in pixels |
| `height` | Integer | `480` | Window height in pixels |
| `background` | Color | Black | Window background color |
| `icon` | String | `nil` | Path to a window icon image |
| `fps_cap` | Integer | `nil` | Maximum frames per second |
| `render_mode` | Symbol | `:continuous` | `:continuous` or `:on_demand` (see [On-demand rendering](#on-demand-rendering)) |
| `resizable` | Boolean | `false` | Whether the window can be resized |
| `highdpi` | Boolean | `true` | Enable high-DPI rendering |
| `pixel_scale` | Boolean | `false` | Scale rendering to match pixel density |
| `viewport_width` | Integer | Same as `width` | Drawable area width |
| `viewport_height` | Integer | Same as `height` | Drawable area height |
| `viewport` | Symbol | `:letterbox` | Viewport scaling mode for resizable windows |
| `cursor` | Symbol | `:visible` | `:visible`, `:hidden`, or a system cursor symbol (see [Cursor Control](#cursor-control)) |
| `show_fps` | Boolean | `false` | Display an FPS counter |
| `diagnostics` | Boolean | `false` | Print diagnostic messages |
| `close_on_esc` | Boolean | `false` | Close the window when Escape is pressed |

Here's a more complete example using several attributes together:

```ruby
set title: 'My App'
set width: 800, height: 600
set background: 'navy'
set fps_cap: 60
set icon: 'icon.png'
set resizable: true
set highdpi: true
set show_fps: true
set close_on_esc: true
```

# Pixel scale

On high-DPI screens (like Retina displays), the operating system scales things so a 640×480 window looks the same physical size as it would on a standard display. This is great most of the time, but if you want access to every individual pixel on screen, you can enable pixel scaling:

```ruby
set pixel_scale: true
```

With this enabled, your drawing area grows to match the actual pixel density of the display. On a 2× Retina screen, a 640×480 window gives you a 1280×960 drawing area — twice the detail!

You'll still use `width` and `height` for setting the window size. To get the actual drawing area in pixels, use `viewport_width` and `viewport_height`. These values are available once the window is shown, so you'll want to use them inside the `update` loop:

```ruby
set width: 640, height: 480, pixel_scale: true

canvas = nil

update do
  next if canvas
  canvas = Canvas.new(width: Window.viewport_width, height: Window.viewport_height)
end

show
```

If you want to make a full-screen app with pixel scaling, use `display_width` and `display_height` to set the window size:

```ruby
set width: Window.display_width, height: Window.display_height, pixel_scale: true
```

# Viewport scaling

When a window can be resized (or runs on a high-DPI display, or uses pixel scaling), the drawing area and the window are no longer necessarily the same size. The `viewport` attribute decides how your content gets mapped onto whatever space is available:

```ruby
set viewport: :integer
```

| Mode | What it does |
|---|---|
| `:letterbox` | (default) Scales to fit while keeping the aspect ratio; any leftover space shows as bars. |
| `:stretch` | Scales to fill the window, ignoring the aspect ratio — content can distort. |
| `:integer` | Scales by whole-number multiples only, so pixel art stays crisp; may leave a border. |
| `:overscan` | Scales to fill the window while keeping the aspect ratio, cropping whatever spills over the edges. |
| `:expand` | Doesn't scale a fixed canvas — grows the drawing area to match the window, so more of your scene becomes visible as it gets bigger. |
| `:fixed` | No scaling at all; draws the viewport at 1:1 and centers it in the window. |

Reach for `:integer` when you're making a pixel-art game and want every pixel to stay sharp, and `:expand` when you'd rather show more of the world than zoom into it.

# Getting attributes

Sometimes it's also helpful to get the value of a window attribute, so there's a method for that too called `get`:

```ruby
get :width  # returns `640`, for example
```

For every attribute you can `set`, you can also `get` its value by providing the `Symbol`. You can only `get` one attribute at a time. Here are some extra read-only attributes you can get:

| Attribute | Description |
|---|---|
| `:window` | The window object itself, just in case you want to `inspect` it |
| `:frames` | The number of frames that have been rendered since the start |
| `:fps` | The current frame rate expressed in frames per second |
| `:fps_cap` | The current FPS cap, if one has been set |
| `:mouse_x` | The x-coordinate position of the mouse, relative to the window |
| `:mouse_y` | The y-coordinate position of the mouse, relative to the window |
| `:display_width` | The width of the display (screen) in logical pixels |
| `:display_height` | The height of the display (screen) in logical pixels |
| `:display_pixel_width` | The width of the display in physical pixels (differs from `:display_width` on HiDPI screens) |
| `:display_pixel_height` | The height of the display in physical pixels (differs from `:display_height` on HiDPI screens) |

# The Window class

When you `require 'ruby2d'`, a new window is instantiated for you by calling `Ruby2D::Window.new`. Sometimes it might be convenient to reference the `Window` class directly, for example when retrieving attributes:

```ruby
Window.title          # returns "Ruby 2D"
Window.width          # returns 640
Window.height         # returns 480
Window.fps            # current FPS
Window.mouse_x        # mouse x position
Window.mouse_y        # mouse y position
Window.display_width          # display size in logical pixels
Window.display_height
Window.display_pixel_width    # display size in physical pixels
Window.display_pixel_height
```

## Screenshots

Want to capture what's on screen? You can save a screenshot at any time:

```ruby
screenshot './my_screenshot.png'  # save to a specific path
screenshot                        # auto-generated timestamped filename

Window.screenshot './my_screenshot.png'  # also available on the Window class
```

The image gets written at the end of the frame you asked for it in, so `screenshot` hands the path back a moment before the file actually lands on disk. By the time your next `update` runs, it's there.

Asking for a screenshot also forces that frame to draw, so a capture in [on-demand rendering](#on-demand-rendering) will never hand you a stale, parked frame. That's also why this saves the image even though the window closes in the same tick:

```ruby
update do
  screenshot './my_screenshot.png'
  close
end
```

One thing to know: taking a screenshot after the window has closed raises an error, since there's no frame left to write.

## Cursor control

You can show, hide, or change the mouse cursor with a single setter:

```ruby
set cursor: :hidden   # hide the cursor
set cursor: :visible  # show the default cursor

# Or directly:
Window.cursor = :hidden
Window.cursor = :visible
Window.cursor         # => :default, :hidden, :pointer, etc.
```

`:visible` is a set-only convenience meaning "show the default arrow." When you read `Window.cursor` back, a plain visible cursor reports as `:default` (or a system-cursor name), never `:visible`.

### System cursors

The same setter takes any of the system-provided cursor shapes:

```ruby
set cursor: :pointer
set cursor: :crosshair
# ...and more, see table below

# Or directly:
Window.cursor = :pointer
```

| Value | Description |
|---|---|
| `:default` | Default arrow pointer |
| `:pointer` | Pointing hand (links, buttons) |
| `:text` | I-beam (text fields) |
| `:crosshair` | Crosshair / precision pointer |
| `:move` | Four-way move arrow |
| `:wait` | Busy / loading |
| `:progress` | Busy with arrow |
| `:not_allowed` | Slashed circle |
| `:ew_resize` | Horizontal resize (left–right) |
| `:ns_resize` | Vertical resize (up–down) |
| `:nwse_resize` | Diagonal resize (NW–SE) |
| `:nesw_resize` | Diagonal resize (NE–SW) |
| `:n_resize` | Edge resize: north |
| `:ne_resize` | Edge resize: north-east |
| `:e_resize` | Edge resize: east |
| `:se_resize` | Edge resize: south-east |
| `:s_resize` | Edge resize: south |
| `:sw_resize` | Edge resize: south-west |
| `:w_resize` | Edge resize: west |
| `:nw_resize` | Edge resize: north-west |

# The Window class pattern

For more structured applications, you can subclass `Ruby2D::Window` directly. This gives you a self-contained game or app class with polling-based input methods (more on those in the [input](/learn/input) section):

```ruby
require 'ruby2d/core'

class Game < Ruby2D::Window
  def initialize
    super(title: 'My Game', width: 800, height: 600)
    @player = Square.new(x: 100, y: 100, size: 50, color: 'blue')
  end

  def update
    @player.x += 1 if key_held? :right
    @player.x -= 1 if key_held? :left
  end
end

Game.new.show
```

Note we `require 'ruby2d/core'` instead of `require 'ruby2d'`: this loads the classes without the DSL mixin, so everything stays neatly inside your class.

# The update loop

The window also manages the update loop, one of the few infinite loops in programming you'll encounter that isn't a mistake. Every window has a heartbeat, a loop that runs as fast as your display refreshes (or up to your `fps_cap`). Using the `update` method, we can enter this loop and make the window come to life!

Say we're bored with the static background we currently have. Let's try changing it to a random color periodically:

```ruby
require 'ruby2d'

tick = 0

update do
  if tick % 60 == 0
    set background: 'random'
  end
  tick += 1
end

show
```

How does this work? First, we set a variable called `tick` to `0`. Then, we enter the `update` loop and `do` something interesting, like dividing `tick` by 60 and checking if its remainder equals 0. Each cycle of the loop, we increment `tick` by one. When the remainder _does_ equal 0, we `set` the background color to `'random'`.

## Moving things at a steady speed

There's a subtle catch once you start animating with the loop: it runs once _per frame_, and not every display refreshes at the same rate. If you nudge a shape along by a fixed amount each frame:

```ruby
update do
  @box.x += 1   # one pixel per frame
end
```

It travels at 60 pixels per second on a 60Hz screen, but 120 pixels per second on a 120Hz one. Same code, twice the speed.

The fix is to think in _seconds_ rather than frames. The `update` block can take a single argument (call it `dt`, for "delta time"), which is the number of seconds that passed since the last update. Multiply your motion by it and everything moves at the same real-world speed, whatever the refresh rate:

```ruby
update do |dt|
  @box.x += 60 * dt   # always 60 pixels per second, on any display
end
```

In the [Window class pattern](#the-window-class-pattern), the same value is available as `delta_time`:

```ruby
class Game < Ruby2D::Window
  def update
    @box.x += 60 * delta_time
  end
end
```

A couple of details worth knowing: `dt` is `0.0` on the very first frame (nothing has elapsed yet), and it's capped at `0.1` seconds, so if the window stalls or you drag it around, your animation won't lurch forward by a huge jump when things pick back up.

## Absolute time with `elapsed`

`dt` tells you how long the _last_ frame took, which is just what you want for motion. But sometimes you care about total time instead: how long since the program started, whether a cooldown has finished, when to fire the next thing. For that, reach for `elapsed`.

`elapsed` is the number of seconds since your program started. It starts near `0` and only ever counts upward, which makes it perfect for "has enough time passed?" checks, especially inside event handlers, which don't get a `dt` of their own:

```ruby
# Fire at most once every half second, even on a flurry of clicks
on :mouse_down do
  next unless elapsed >= (@next_shot || 0)
  shoot
  @next_shot = elapsed + 0.5
end
```

You might reach for `Time.now` here out of habit, but resist it. On the web and in native builds your code runs on mruby, where `Time.now` is a coarse wall clock (its millisecond values actually overflow in the browser) and `Process.clock_gettime` doesn't exist at all. `dt` and `elapsed` sidestep all of that and read the same everywhere. Save `Time.now` for real-world dates and times.

# The render block

In addition to `update`, there's also a `render` block that runs every frame _after_ update. This is useful for one-off drawing with the class-level `.render` methods (shapes you want to draw each frame without creating persistent objects):

```ruby
render do
  Rectangle.render(x: 0, y: 0, width: 50, height: 50, color: 'red')
end
```

Objects created with `.new` are rendered automatically. The `render` block is only needed when you want to do custom per-frame drawing.

## Placing the block in the z-order

By default, whatever the `render` block draws lands on top of everything, in front of every object you created with `.new`. That's usually just right: the block is where the live, per-frame action happens, so you want to see it.

But not always. Imagine a game with a world that scrolls past under the action and a score panel that stays put in the corner. If the per-frame drawing sweeps over that panel, your score vanishes behind it. What you really want is three layers: a backdrop underneath, the moving world in the middle, and the panel on top of both.

Pass `z:` to slot the block anywhere in the [z-order](/learn/shapes), right alongside your `.new` objects:

```ruby
render do … end                 # :foreground (default), on top of everything
render z: :background do … end  # behind everything
render z: 10 do … end           # slotted in at depth 10, the same scale as an object's z
```

With a number, the rule is simple: objects at that `z` or lower draw first, then the block, then everything above. (`:foreground` and `:background` are just the two far ends of that scale.) So the three-layer scene falls out naturally:

```ruby
Quad.new(...)             # backdrop at a low z, drawn first
render z: 10 do ... end   # the per-frame world, in the middle
Text.new(..., z: 20)      # the panel on top, safely above the action
```

One rule of thumb before you reach for it: only set `z:` when the block's drawing actually overlaps a persistent object. If your panel sits in its own reserved strip, well clear of the drawing, the default is already correct and adding `z:` is just noise. It earns its place when the drawing roams over a persistent object, or when you have persistent layers on both sides of the block.

# On-demand rendering

Normally, Ruby 2D draws a fresh frame every tick of the loop, perfect for games and animations, where something new is happening all the time. But what if your app only changes when the user does something? A chart that updates on a click, a dashboard that refreshes every now and then, a text editor waiting patiently for you to type. Drawing 60 identical frames a second for an app that's just sitting there is a lot of work for your GPU to do for nothing!

For apps like these, Ruby 2D has a second mode called on-demand rendering. In this mode, the window only draws a new frame when you ask it to:

```ruby
require 'ruby2d'

set title: 'My App', render_mode: :on_demand

show
```

The two possible values are `:continuous` (the default, drawing every tick) and `:on_demand` (drawing only when asked).

## Asking for a frame

Once you're in on-demand mode, the window will happily sit there doing nothing until you give it a nudge. That nudge is called `request_render`. Call it whenever you change something on screen:

```ruby
on :mouse_down do |e|
  @selected = hit_test(e.x, e.y)
  request_render
end

on :key_down do |e|
  case e.key
  when 'up'    then scroll(-10); request_render
  when 'down'  then scroll( 10); request_render
  end
end
```

Call it as many times as you like. If you call it ten times in one tick, you'll still only get one frame. It's also safe to call from any thread, so don't worry about where it happens.

Ruby 2D will also draw a frame on its own in a few situations where you'd expect one: the very first frame when the window opens, when the operating system asks for a redraw (like after resizing or moving the window to another display), and when you take a screenshot. Everything else is up to you.

## What still happens every tick

On-demand mode only skips the drawing work. Everything else in the loop keeps ticking along as usual, so your app stays nice and responsive:

- Events still fire (`on :key_down`, `on :mouse_move`, and friends)
- The `update` block still runs
- Mouse position is still tracked (`Window.mouse_x`, `Window.mouse_y`)
- Frame pacing still respects your `fps_cap`

And `Window.frames` still counts ticks of the loop (not drawn frames), so it behaves exactly the same in both modes.

## Animations in on-demand mode

What if you want something that animates on its own, like a blinking cursor or a little spinner? No problem, just call `request_render` whenever it's time for the animation to move forward. Here's a cursor that blinks every half second:

```ruby
update do
  if elapsed - (@last_blink || 0) >= 0.5
    @caret_visible = !@caret_visible
    @last_blink = elapsed
    request_render
  end
end
```

This is by design — you're in charge of what's worth a frame.

## Switching modes on the fly

You can swap between modes whenever you like, even after `show` has been called. A fresh frame is guaranteed on the next tick after switching, so you'll never be left looking at a stale window.

## A few things to know

- The FPS counter (`show_fps: true`) and `diagnostics` still work in on-demand mode, but they'll only update when a frame is actually drawn, which is usually exactly what you want.
- `on :key_held` fires every tick, so rendering in response to it defeats the whole point. Use `:key_down` and `:key_up` with your own state instead.
- If you're making a game, stick with the default `:continuous` mode. On-demand is for apps that spend most of their time waiting.

# Closing the window

When you're done with a window, there's nothing left to do but close it. You probably closed windows in the examples above by clicking the close button on the title bar, or using a keyboard shortcut. But what if you want to close the window with code? There's a method for that!

The trick is that `close` needs to be called from _within_ the loop, since after `show` is called, the loop takes over. Here's an example that closes the window after 5 seconds:

```ruby
require 'ruby2d'

update do
  # Close the window after 5 seconds
  close if elapsed > 5
end

show
```

Or, if you just want Escape to close the window, there's a shortcut for that:

```ruby
set close_on_esc: true
```

## Close event

The `:close` event fires just before the window closes, whether the user clicks the OS close button or `close` is called programmatically. Use it to run any cleanup logic on the way out:

```ruby
on :close do
  puts 'Goodbye!'
end
```

Only one `:close` handler can be registered at a time. Registering a new one replaces the previous.

`close` and `on(:close)` work together. Calling `close` also fires the `:close` handler before shutting down:

```ruby
update do
  close if get(:frames) > 300
end

on :close do
  puts 'Closing after 300 frames'
end
```

## On the web

A page can't close itself, only the person viewing it can. So on [the web](/learn/building#web), `close` does nothing: the `:close` handler doesn't run, and your app keeps going. Anything you'd put after a `close`, like a farewell screen or a final score, wants to be drawn rather than waited for. A quit the viewer initiates still fires `on(:close)`.

# That's it!

You've learned all there is to know about the window in Ruby 2D. Continue to the [next topic ▸](/learn/{{ page.next_topic }})
