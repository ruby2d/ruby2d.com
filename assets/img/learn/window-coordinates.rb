# Coordinate system
#
# Demonstrates that (0, 0) is the origin at the upper-left corner of the
# window, with x increasing to the right and y increasing downward.

require 'ruby2d'

set title: 'Ruby 2D — Coordinate System', width: 450, height: 350
set close_on_esc: true

# Colors
white  = 'white'
gray   = [0.45, 0.45, 0.45, 1.0]
red    = [1.0, 0.35, 0.35, 1.0]
green  = [0.35, 1.0, 0.55, 1.0]

# Origin is at the top-left corner of the window; axes start from there,
# offset slightly so the arrows and labels are fully visible
ox = 10
oy = 10

x_len = 340  # length of x-axis arrow shaft
y_len = 240  # length of y-axis arrow shaft
head  = 12   # arrowhead size

# --- Axes ---

# X axis (pointing right)
Line.new(x1: ox, y1: oy, x2: ox + x_len, y2: oy, width: 3, color: red)
Triangle.new(
  x1: ox + x_len + head, y1: oy,
  x2: ox + x_len,        y2: oy - head / 2,
  x3: ox + x_len,        y3: oy + head / 2,
  color: red
)

# Y axis (pointing down)
Line.new(x1: ox, y1: oy, x2: ox, y2: oy + y_len, width: 3, color: green)
Triangle.new(
  x1: ox,             y1: oy + y_len + head,
  x2: ox - head / 2,  y2: oy + y_len,
  x3: ox + head / 2,  y3: oy + y_len,
  color: green
)

# --- Tick marks and coordinate labels ---

ticks_x = [100, 200, 300]
ticks_y = [100, 200]

ticks_x.each do |val|
  Line.new(x1: ox + val, y1: oy, x2: ox + val, y2: oy + 10, width: 1, color: gray)
  Text.new(val.to_s, x: ox + val - 12, y: oy + 14, size: 16, color: gray)
end

ticks_y.each do |val|
  Line.new(x1: ox, y1: oy + val, x2: ox + 10, y2: oy + val, width: 1, color: gray)
  Text.new(val.to_s, x: ox + 14, y: oy + val - 10, size: 16, color: gray)
end

# --- Axis labels ---

Text.new('x', x: ox + x_len + head + 8, y: oy - 15, size: 28, color: red)
Text.new('y', x: ox + 8, y: oy + y_len + head + 4, size: 28, color: green)

# --- Origin dot and label ---

Circle.new(x: ox, y: oy, radius: 5, color: white)
Text.new('(0, 0)', x: ox + 12, y: oy + 8, size: 18, color: white)

show
