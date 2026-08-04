require 'ruby2d'

set background: '#16161a'

Square.new(x: 60,  y: 50, size: 130, color: 'orange')
Square.new(x: 255, y: 50, size: 130, color: '#7f5af0', opacity: 0.6)
Square.new(x: 450, y: 50, size: 130, color: 'random')

Square.new(x: 220, y: 240, size: 180,
  color: ['red', 'yellow', 'lime', 'blue'])

show
