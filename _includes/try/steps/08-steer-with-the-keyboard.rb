require 'ruby2d'

set background: '#16161a'

ball = Circle.new(x: 320, y: 240, radius: 40, color: 'aqua')

on :key_held do |event|
  ball.x -= 5 if event.key? :left
  ball.x += 5 if event.key? :right
  ball.y -= 5 if event.key? :up
  ball.y += 5 if event.key? :down
end

show
