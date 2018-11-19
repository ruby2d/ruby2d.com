---
title: Input
subtitle: Learn how to capture input from mice, keyboards, and game controllers
next_topic: native
layout: learn
---

It's easy to capture input from just about anything. Let's learn how to grab input events from the mouse, keyboard, and game controllers.

# Keyboard

There are three types of keyboard events captured by the window: when a key is pressed down, a key is being held down, and a key is released.

```ruby
on :key do |event|
  # All keyboard interaction
  puts event
end
```

```ruby
on :key_down do |event|
  # A key was pressed
  puts event.key
end
```

```ruby
on :key_held do |event|
  # A key is being held down
  puts event.key
end
```

```ruby
on :key_up do |event|
  # A key was released
  puts event.key
end
```

# Mouse

The coordinates of the mouse can be read like so:

```ruby
# Using the DSL
get: mouse_x
get: mouse_y

# Or using the `Window` class
Window.mouse_x
Window.mouse_y
```

Capture all mouse events:

```ruby
on :mouse do |event|
  # A mouse event occurred
  puts event
end
```

Capture events when a mouse button is pressed down:

```ruby
on :mouse_down do |event|
  # x and y coordinates of the mouse button event
  puts event.x, event.y

  # Read the button event
  case event.button
  when :left
    # Left mouse button pressed down
  when :middle
    # Middle mouse button pressed down
  when :right
    # Right mouse button pressed down
  end
end
```

Capture events when a mouse button is released:

```ruby
on :mouse_up do |event|
  # x and y coordinates of the mouse button event
  puts event.x, event.y

  # Read the button event
  case event.button
  when :left
    # Left mouse button released
  when :middle
    # Middle mouse button released
  when :right
    # Right mouse button released
  end
end
```

Capture events when the mouse is scrolled:

```ruby
on :mouse_scroll do |event|
  # Change in the x and y coordinates
  puts event.delta_x
  puts event.delta_y
end
```

Capture events when the mouse is moved:

```ruby
on :mouse_move do |event|
  # Change in the x and y coordinates
  puts event.delta_x
  puts event.delta_y

  # Position of the mouse
  puts event.x, event.y
end
```

# Controllers

All game controllers are automatically detected, added, and removed. There are two types of events captured by the window: axis motion and button presses. Buttons and axes are mapped to a generic Xbox controller layout.

To capture all controller events, use:

```ruby
on :controller do |event|
  # A controller event occurred
  puts event
end
```

To capture only analog stick axis motion, use:

```ruby
on :controller_axis do |event|
  case event.axis
  when :left_x
    # Left analog stick x axis
    puts event.value
  when :left_y
    # Left analog stick y axis
    puts event.value
  when :right_x
    # Right analog stick x axis
    puts event.value
  when :right_y
    # Right analog stick y axis
    puts event.value
  when :trigger_left
    # Left trigger axis
    puts event.value
  when :trigger_right
    # Right trigger axis
    puts event.value
  end
end
```

To capture when a button is pressed down, use:

```ruby
on :controller_button_down do |event|
  # A controller button was pressed
  puts event.button
end
```

To capture when a button is released, use:

```ruby
on :controller_button_up do |event|
  # A controller button was released
  puts event.button
end
```

Continue to the [next topic »](/learn/{{ page.next_topic }})
