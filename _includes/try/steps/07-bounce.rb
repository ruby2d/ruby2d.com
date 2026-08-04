require 'ruby2d'

set background: '#16161a'

ball = Circle.new(x: 320, y: 240, radius: 40, color: 'aqua')
speed = 4

update do
  ball.x += speed

  if ball.x + ball.radius > Window.width || ball.x - ball.radius < 0
    speed = -speed
  end
end

show
