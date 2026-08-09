---
title: Input
description: Learn how to capture input from mice, keyboards, and gamepads
next_topic: buttons
layout: learn
---

It's easy to capture input from just about anything. Let's learn how to grab events from the keyboard, mouse, and gamepads.

Ruby 2D offers two styles for handling input:

- **Event handlers**: register callbacks with `on`, perfect for event-driven code
- **Polling**: check input state each frame inside `update`, great for game loops

# Keyboard

There are three kinds of keyboard events: when a key is **pressed** for the first time, while it's **held** down, and when it's **released**. The first and third happen once per press; the middle one fires every frame the key is down.

## Event handlers

The basic form gives you the full event payload:

```ruby
on :key_down do |event|
  puts "Pressed: #{event.key}"
end

on :key_held do |event|
  puts "Holding: #{event.key}"
end

on :key_up do |event|
  puts "Released: #{event.key}"
end
```

The `KeyEvent` has two fields: `type` (`:down`, `:held`, `:up`) and `key` (a lowercase string). To match by value, use `event.key?`. It accepts a symbol or string:

```ruby
on :key_down do |event|
  reset if event.key? :r
end
```

When you only care about a specific key, the kwarg form of `on` reads like a shortcut binding:

```ruby
on(key_down: :escape) { close }

on key_down: :space do
  fire
end
```

You can match several keys at once with an array, or bind the same action to events from different sources in one call:

```ruby
on key_down: [:left, :a] do
  player.move_left
end

on key_down: :right, gamepad_button_down: :dpad_right do
  player.move_right
end
```

Bareword keys take symbols (`:space`, `:escape`, `:r`), but the underlying field stays a string, so numbers and multi-word keys remain expressible:

```ruby
event.key? '1'           # numeric keys
event.key? 'left shift'  # multi-word names
```

## Polling

When using the [Window class pattern](/learn/window#the-window-class-pattern), you can check key state directly in `update`:

```ruby
def update
  close if key_pressed? :escape
  @x += 1 if key_held? :right
  puts 'released space' if key_released? :space
end
```

The names match the events: `key_pressed?` is true only on the frame the key was first pressed, `key_held?` is true every frame the key is currently down, and `key_released?` is true only on the frame it lifted.

# Mouse

The mouse position is always available:

```ruby
# Using the DSL
get :mouse_x
get :mouse_y

# Or using the Window class
Window.mouse_x
Window.mouse_y
```

When you want both at once, `mouse_position` returns them as `[x, y]`:

```ruby
mx, my = mouse_position
```

## Event handlers

Mouse buttons mirror the keyboard's three-event model, pressed once, held every frame, released once:

```ruby
on :mouse_down do |event|
  puts "#{event.button} pressed at (#{event.x}, #{event.y})"
end

on :mouse_held do |event|
  paint(event.x, event.y) if event.button? :left
end

on :mouse_up do |event|
  puts "#{event.button} released at (#{event.x}, #{event.y})"
end

on :mouse_scroll do |event|
  puts "Scrolled #{event.direction}: dx=#{event.delta_x} dy=#{event.delta_y}"
end

on :mouse_move do |event|
  puts "Mouse at (#{event.x}, #{event.y})"
end

on :mouse_leave do
  pause_input_effects   # cursor left the window
end
```

The `MouseEvent` has fields: `type`, `button`, `direction`, `x`, `y`, `delta_x`, `delta_y`. Use `event.button?(:left)` to test the button by value, and `event.position` / `event.delta` when you want the pair: `mx, my = event.position`. `:mouse_enter` and `:mouse_leave` are payload-free: only `type` is set; call `mouse_position` if you need to know where the cursor is.

The kwarg form filters by button too:

```ruby
on(mouse_down: :left) { puts 'click!' }

on mouse_down: :right, mouse_held: :right do
  draw_continuously
end
```

`:mouse_move`, `:mouse_scroll`, `:mouse_enter`, and `:mouse_leave` don't carry a matchable value, so use the basic form for those.

## Polling

```ruby
def update
  puts 'left click' if mouse_pressed? :left
  puts 'right released' if mouse_released? :right
  paint(mouse_x, mouse_y) if mouse_held? :left

  if mouse_scrolled?
    puts mouse_scroll_direction
    puts mouse_scroll_delta_x
    puts mouse_scroll_delta_y
  end

  if mouse_moved?
    puts mouse_move_delta_x
    puts mouse_move_delta_y
  end

  puts mouse_x
  puts mouse_y
  paint(mouse_x, mouse_y) if mouse_inside?   # cursor is over the window
end
```

# Gamepads

Game controllers (gamepads) are automatically detected as they're plugged in and unplugged. Each one shows up as a `Gamepad` object you can hold onto, query, and talk to directly.

`window.gamepads` is the list of pads currently connected, in the order they joined:

```ruby
def update
  gamepads.each do |pad|
    # ...
  end
end
```

That makes single-pad games tidy: when no one's plugged in, the loop just doesn't run.

## Connecting and disconnecting

Two events bracket a pad's life. `:gamepad_connect` fires when one shows up (including once for each pad already plugged in when `show` is called), and `:gamepad_disconnect` fires when one is removed.

```ruby
on :gamepad_connect do |pad|
  puts "#{pad.name} connected"
end

on :gamepad_disconnect do |pad|
  puts "#{pad.name} disconnected"
end
```

A reconnected pad is a *new* `Gamepad` object. Ruby 2D doesn't try to guess that the device you just plugged back in is the same one you had before. The old object stays valid but reports `connected? == false`; calling `held?` or `axis` on it returns safe defaults rather than raising. That makes `Gamepad` instances safe to use as `Hash` keys — pin a player to a pad and the identity stays put for the life of the connection.

## Buttons and axes

Face buttons are named by **position**, not by the labels printed on the pad. Picture the four face buttons as a compass: `:south` is the bottom button (A on Xbox, B on Nintendo, ✕ on PlayStation), `:north` is the top, `:east` is the right, `:west` is the left.

This sounds odd at first, but it lets your code work uniformly across every gamepad without caring which letter the manufacturer chose. If you'd rather use the label-style names, define your own constants:

```ruby
A, B, X, Y = :south, :east, :west, :north
```

The full button set:

| Group     | Names                                                                  |
|---        |---                                                                     |
| Face      | `:south`, `:east`, `:west`, `:north`                                   |
| Center    | `:back`, `:guide`, `:start`                                            |
| Sticks    | `:left_stick`, `:right_stick`                                          |
| Shoulders | `:left_shoulder`, `:right_shoulder`                                    |
| D-pad     | `:dpad_up`, `:dpad_down`, `:dpad_left`, `:dpad_right`                  |
| Extras    | `:misc1`, `:paddle1`..`:paddle4`, `:touchpad`                          |

And the axes:

| Axis             | Range         |
|---               |---            |
| `:left_x`        | `-1.0..1.0`   |
| `:left_y`        | `-1.0..1.0`   |
| `:right_x`       | `-1.0..1.0`   |
| `:right_y`       | `-1.0..1.0`   |
| `:left_trigger`  | `0.0..1.0`    |
| `:right_trigger` | `0.0..1.0`    |

Not every pad has every button or axis. `pad.has?(:button, :paddle1)` or `pad.has?(:axis, :left_trigger)` will tell you for sure.

## Event handlers

Gamepad buttons come in three flavors (down, held, and up) plus an axis event. Each block receives the originating `Gamepad` first, followed by whatever's relevant:

```ruby
on :gamepad_button_down do |pad, button|
  puts "#{pad.name} pressed #{button}"
end

on :gamepad_button_held do |pad, button|
  # ...
end

on :gamepad_button_up do |pad, button|
  # ...
end

on :gamepad_axis do |pad, axis, value|
  steer(pad, value) if axis == :left_x
end
```

The kwarg form filters by name:

```ruby
on(gamepad_button_down: :south) { jump }

on gamepad_axis: :left_x do |pad, _, value|
  player.dx = value
end
```

Pass a hash when you want to filter on multiple fields at once — handy when you want events from a *specific* pad:

```ruby
on gamepad_button_down: { gamepad: pad1, button: :south } do
  player1.jump
end
```

## Polling

When you have a `Gamepad` in hand, ask it directly:

```ruby
def update
  gamepads.each do |pad|
    player_for(pad).jump if pad.pressed? :south
    player_for(pad).dx = pad.axis(:left_x)
  end
end
```

The methods mirror the events: `pad.pressed?` is true on the frame the button was first pressed, `pad.held?` is true every frame it's down, and `pad.released?` fires on the frame it lifts. `pad.axis(:left_x)` gives you the current value.

Asking about a button or axis the pad doesn't have isn't an error: `held?` returns `false`, `axis` returns `0.0`. So you can poll freely without guarding every call.

## Dead zones

Sticks are noisy at rest. Each pad applies a small dead zone to the sticks (`0.05` by default), so tiny drifts read as zero and you don't see phantom motion when no one's touching the stick. It's symmetric around zero, so anything inside `±0.05` reads as `0.0`.

Triggers are exempt: they rest at zero and rarely drift, so the full `0.0..1.0` range stays usable.

```ruby
pad.dead_zone        # => 0.05
pad.dead_zone = 0.0  # turn it off entirely
```

The dead zone applies to both events and polling. `:gamepad_axis` events deliver the dead-zoned value, and successive events with the same dead-zoned value are suppressed, so handlers don't get spammed by motion entirely inside the dead zone. To bypass it for a one-off reading, pass `raw: true`:

```ruby
pad.axis(:left_x, raw: true)
```

## Rumble and LEDs

Pads that support haptics can rumble, and a few light up:

```ruby
pad.rumble(strength: 0.5, duration: 0.2)
pad.rumble(low: 0.5, high: 1.0, duration: 0.2)
pad.rumble_triggers(left: 1.0, right: 0.0, duration: 0.1)
pad.led = [255, 0, 128]
```

The rumble calls are best-effort. If the pad doesn't have haptics, or it's been disconnected, they return `false` instead of raising. So you can wire up feedback without wrapping every call in a capability check, and reach for `pad.has?(:rumble)` only when you actually need to know. The `pad.led =` setter is a little different: like any Ruby assignment it evaluates to the value you assigned, not a success flag, so if you need to know whether the light actually changed, call `pad.set_led([255, 0, 128])` and check its `false`-on-failure return.

## Custom mappings

Ruby 2D ships with a generous library of gamepad mappings, but if you've got an unusual pad you can supply your own. Drop them in `~/.ruby2d/gamepads.txt`. They're loaded automatically when the window opens. To pull in extra files, or to register a mapping inline, call `add_gamepad_mapping` before `show`:

```ruby
add_gamepad_mapping('/path/to/extras.txt')
add_gamepad_mapping('03000000...,My Pad,a:b0,b:b1,...')
```

The argument is smart: a path to an existing file gets loaded as a mapping file, anything else is treated as a single SDL mapping string. The format is the standard SDL gamepad mapping format, so the [community SDL_GameControllerDB](https://github.com/mdqinc/SDL_GameControllerDB) works as-is.

## A few things to know

Pads are listed in the order they connected, *not* by player number. `gamepads[0]` is "first plugged in still present", not "Player 1". For stable player slots, hang onto the `Gamepad` you assigned and don't expect the array index to mean anything.

Mappings are keyed by GUID, which is stable across reboots and machines for the same hardware. But the USB and Bluetooth versions of one pad have *different* GUIDs, and on macOS, renaming a pad in System Settings will invalidate any GUID-keyed mappings you wrote against it.

Beyond what we've seen, `pad.id`, `pad.name`, `pad.type` (`:xbox`, `:playstation`, `:nintendo`, `:generic`, or `:unknown`), `pad.connected?`, and `pad.battery` (`:wired`, `:full`, `:medium`, `:low`, `:empty`, or `nil`) round out what each pad can tell you about itself. If you ever need the full picture, `pad.debug_info` returns a hash with the GUID, USB vendor/product/version, real type, touchpad count, and the resolved mapping string, useful when something isn't working as expected.

# Managing event handlers

The `on` method returns an `EventDescriptor` that you can use to unregister the handler later with `off`:

```ruby
handler = on :key_down do |event|
  puts event.key
end

# Later, when you no longer need it:
off handler
```

The kwarg form returns a single descriptor when there's one filter, or an array of descriptors when you pass several. `off` accepts either.

This is useful for things like switching game states: register handlers for a menu, then remove them when gameplay starts.

# Per-object events

Any renderable object can register its own event handlers for mouse interactions.

| Object Event    | Description                                                                  | Filter by |
|---              |---                                                                           |---        |
| `:mouse_down`   | Button pressed on the object                                                 | button    |
| `:mouse_held`   | Every frame while held — fires on the object originally pressed              | button    |
| `:mouse_up`     | Button released — fires on the originally-pressed object                     | button    |
| `:mouse_scroll` | Scroll wheel while hovering                                                  | —         |
| `:click`        | Press and release on the same object                                         | button    |
| `:drag`         | Mouse moved while pressed on the object                                      | button    |
| `:hover`        | Mouse enters the object                                                      | —         |
| `:hover_out`    | Mouse leaves the object                                                      | —         |

Events are dispatched to the topmost (highest z-order) interactive object at the mouse position. `:mouse_held`, `:drag`, and `:mouse_up` are sticky. Once a press starts on an object, those events belong to it: `:mouse_held` and `:drag` keep firing every frame until release, and `:mouse_up` always lands on the press target, even if the cursor wandered off in the meantime. If you happen to release over a *different* interactive object, that object also gets a `:mouse_up`. `:click` only fires when press and release land on the same object.

**Example:**

```ruby
rect = Rectangle.new(x: 100, y: 100, width: 80, height: 80, color: 'blue')

rect.on :click do |event|
  puts "Clicked at (#{event.x}, #{event.y})"
end

rect.on :hover do |event|
  rect.color = 'yellow'
end

rect.on :hover_out do |event|
  rect.color = 'blue'
end

rect.on :mouse_down do |event|
  puts "Mouse down: #{event.button}"
end

rect.on :mouse_held do |event|
  rect.color = pulse(rect.color)  # keeps pulsing while held
end

rect.on :mouse_up do |event|
  puts "Mouse up"
end

rect.on :drag do |event|
  rect.x += event.delta_x
  rect.y += event.delta_y
end

rect.on :mouse_scroll do |event|
  puts "Scrolled #{event.direction}"
end
```

The kwarg form of `on` works on per-object handlers too, same shape as the window-level version:

```ruby
rect.on(click: :left) { open }                       # filter by button
rect.on click: [:left, :right] do                    # array → match any
  flash
end
rect.on mouse_down: :right, click: :right do         # multi-event
  show_menu
end
```

`:hover`, `:hover_out`, and `:mouse_scroll` don't carry a button to filter on, so use the basic form for those.

Remove a per-object handler:

```ruby
handler = rect.on(:click) { puts 'clicked' }
rect.off(handler)
```

And check if an object has handlers:

```ruby
rect.interactive?          # any handlers at all?
rect.interactive?(:click)  # handlers for :click specifically?
```

Continue to the [next topic](/learn/{{ page.next_topic }}){:.next-topic}
