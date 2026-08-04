require 'ruby2d'

set background: '#16161a'

Circle.new(x: 320, y: 130, radius: 70, color: 'aqua')

Rectangle.new(x: 60, y: 270, width: 220, height: 130, color: 'fuchsia')

Triangle.new(
  x1: 480, y1: 250,
  x2: 580, y2: 420,
  x3: 380, y3: 420,
  color: 'yellow')

Line.new(x1: 40, y1: 40, x2: 600, y2: 60,
  stroke_width: 5, color: ['red', 'blue'])

show
