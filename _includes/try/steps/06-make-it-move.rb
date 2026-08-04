require 'ruby2d'

set background: '#16161a'

ball = Circle.new(x: 0, y: 240, radius: 40, color: 'aqua')

update do
  ball.x += 2
end

show
