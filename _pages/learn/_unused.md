---
title: Unused
layout: learn
---


`Ruby2d::Color` is a class that represents colors in Ruby2D. It can be instantiated with a keyword [(based on css)](http://clrs.cc/), a hexadecimal value or an array containing a collection of red, green, blue, and alpha (transparency) values expressed as a `Float` from `0.0` to `1.0`.

## Initialization via keyword

Colors can be created from a keyword string, like this:

```ruby
Color.new('name_of_color')
```

<p style="line-height:2.75rem">Where <code>'name_of_color'</code> might be one of: <span class="color-example navy">navy</span>, <span class="color-example blue">blue</span>, <span class="color-example aqua">aqua</span>, <span class="color-example teal">teal</span>, <span class="color-example olive">olive</span>, <span class="color-example green">green</span>, <span class="color-example lime">lime</span>, <span class="color-example yellow">yellow</span>, <span class="color-example orange">orange</span>, <span class="color-example red">red</span>, <span class="color-example brown">brown</span>, <span class="color-example fuchsia">fuchsia</span>, <span class="color-example purple">purple</span>, <span class="color-example maroon">maroon</span>, <span class="color-example white">white</span>, <span class="color-example silver">silver</span>, <span class="color-example gray">gray</span>, <span class="color-example black">black</span>.</p>

One additional keyword is `'random'`, which will always create a randomly generated color, like this:

```ruby
Color.new('random')
```

## Initialization via hex

Color can be initialized via hex string, very similarly to css. When done via hex value, examples from above might be replicated like this:

```ruby
Color.new('#001F3F') #=> navy
Color.new('#0074D9') #=> blue
Color.new('#7FDBFF') #=> aqua
```

Any correct hex value will work fine.

## Initialization via array of values

If you wish to have direct control over red, green, blue and alpha channels when creating your color, you can pass an array of 4 numbers to achieve this, like this:

```ruby
# Red, fully opaque
Color.new([1, 0, 0, 1])

# Equivalent to above, a mixture of integers and floats
Color.new([1.0, 0, 0, 0.0])

# Red, fully transparent
Color.new([1, 0, 0, 0])

# Red, half transparent
Color.new([0.1, 0.0, 0.0, 0.5])
```

## `#r`, `#g`, `#b`

You can use `#r`, `#g`, and `#b` methods to return red, green and blue channels respectively, as a value between 0 and 1:

```ruby
color = Color.new('fuchsia')
color.r #=> 0.9411764705882353
color.g #=> 0.0705882352941176
color.b #=> 0.7450980392156863
```

## `#a`, `#opacity`

You can use `#a` method (or it's alias, `#opacity`), to return alpha channel, as a value between 0 and 1:

```ruby
color = Color.new([0.1, 0.2, 0.3, 0.4])
color.a       #=> 0.4
color.opacity #=> 0.4
```

## `#opacity=`

You can use `#opacity=` method to set the opacity of a color:

```ruby
color = Color.new([0.1, 0.2, 0.3, 0.4])
color.opacity = 0.9
```



# Cool color example

```ruby
require 'ruby2d'

set title: "Hello Color Triangle"

t = Triangle.new(
  x1: 320, y1:  50,
  x2: 540, y2: 430,
  x3: 100, y3: 430
)

update do
  t.color = [
    [0.0, 0.0, 0.0, 1.0],
    [0.0, 0.0, 0.0, 1.0],
    [get(:mouse_x)/100.0, get(:mouse_y)/100.0, 0.0, 1.0]
  ]
end

show
```

<!--  -->

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













Ruby 2D provides a way of capturing and reacting to users input, provided via mouse, keyboard or game controller. Let's look into how this is achieved.

# Mouse events

Mouse events are captured whenever users mouse performs an action. Lets look into different types of mouse events:

## mouse_down, mouse_up

`mouse_down` and `mouse_up` events happen when a mouse key is pressed down, and released respectively. This is a simple program that leverages those events:

```ruby
require 'ruby2d'

on :mouse_down do |e|
  puts "Mouse down key event caught!"
end

on :mouse_up do |e|
  puts "Mouse up key event caught!"
end

show
```

Very simple! That `e` param passed into the event block, is a `MouseEvent` object. It contains detailed information about the event. For `mouse_down` and `mouse_up` events it will contain the following information:

### type

`e.type` will equal to `:down` for a down event, and `:up` for an up event.

### button

`e.button` will contain information about which button was pressed. It will equal to `:left`, `:right` or `:middle`.

### x, y

`e.x` and `e.y` together describe the position on which the window was clicked.

## mouse_move

`mouse_move` event is fired when the mouse moves. Simple usage of this event would look like this:

```ruby
require 'ruby2d'

on :mouse_move do |e|
  puts "Mouse move event caught!"
end

show
```

This event is very useful for implementing behavior that requires reacting to users mouse position, such as hover feature on buttons. In case of this event, `MouseEvent` object contains the following information

### type

`e.type` for this event will always be equal to `:move`.

### x, y

`e.x` and `e.y` will describe the position of mouse pointer at the end, of the move event.

### delta_x, delta_y

`e.delta_x` and `e.delta_y` describe the difference between mouse pointers position at the beginning of the move event, and at the end. Roughly speaking, this is how much the mouse actually moved.

## mouse_scroll

Mouse scroll event happens when user scrolls with the middle button. Simple usage of this event would look like this:

```ruby
require 'ruby2d'

on :mouse_scroll do |e|
  puts "Mouse scroll event caught!"
end

show
```

`MouseEvent` object of this event will contain the following information:

### type

`e.type` for this event will always be equal to `:scroll`

### direction

`e.direction` for this event will always be equal to `:normal`

### delta_x, delta_y

`e.delta_x` will always be equal to `0`, and `e.delta_y` will be equal to either `-1` or `1`, based on the direction of scroll

# Keyboard events

Keyboard events are somewhat simpler than mouse events. There are three event types: `:key_down`, `:key_held` and `:key_up`. Those events are fired when the key is first pressed, on each frame for as long as long the key is held, and when the key is released, respectively. A simple program to take advantage of this feature would look like this:

```ruby
require 'ruby2d'

on :key_down do |e|
  puts "#{e.key} was pressed down!"
end

on :key_held do |e|
  puts "#{e.key} is held down!"
end

on :key_up do |e|
  puts "#{e.key} was released!"
end

show
```

`e` in this case is a `KeyEvent` object, and it's quite simpler than `MouseEvent`. It contains only 2 fields:

### type

`e.type` will be equal to `:down`, `:held` or `:up`, based on the event type that happened.

### key

`e.key` is a string containing the name of keyboard key that was pressed.

# Setting up multiple event handlers

Examples shown above present a good foundation, but as the codebase grows, you might want to be able to specify event handlers multiple times, in multiple places. This is as simple, as calling the `on` method as many times, as you want! Consider this example:

```ruby
require 'ruby2d'

on :mouse_down do
  puts "First event fired!"
end

on :mouse_down do
  puts "Second event fired!"
end

on :mouse_down do
  puts "Third event fired!"
end

show
```

Notice that whenever you press a mouse button down, all three events are fired in the order in which they were defined. You can specify as many event handlers as you want.

# Removing events

When you no longer need an event, you are allowed to remove it. This will require some initial planning. When you define an event handler, the definition will return an `EventDescriptor` object. In order to remove an event, you must pass this event descriptor to `off` method. Consider this example:

```ruby
require 'ruby2d'

event_descriptor = on :mouse_down do
  puts "Mouse down event caught!"
end

off(event_descriptor)

show
```

At the moment the window is showing, no events are set up!

# Setting up event handlers from non-root contexts

You might want to define event handlers dynamically, from within methods, or classes. This is also possible, just extend the class with the Ruby 2D domain-specific language (DSL) with `extend Ruby2D::DSL` in the class' `initialize` method.

For a last example here, we will do something more complex. Each left button click will create an interactive square. Each of those squares change color when it's hovered on, and disappear when right-clicked.

```ruby
require 'ruby2d'

interactive_squares = []

class InteractiveSquare
  def initialize(x, y)
    extend Ruby2D::DSL

    @square = Square.new(x: x, y: y, color: "green")

    @hover_event = on :mouse_move do |e|
      if @square.contains?(e.x, e.y)
        @square.color = "red"
      else
        @square.color = "green"
      end
    end

    @remove_event = on :mouse_up do |e|
      if e.button == :right
        if @square.contains?(e.x, e.y)
          self.remove
        end
      end
    end
  end

  def remove
    @square.remove
    off(@hover_event)
    off(@remove_event)
  end
end

on :mouse_down do |e|
  if e.button == :left
    interactive_squares << InteractiveSquare.new(e.x, e.y)
  end
end

show
```

The gotcha is the fact that you are not allowed to define new event while executing an event of the same kind.
