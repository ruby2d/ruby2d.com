require 'ruby2d'

set background: '#16161a'

on :mouse_down do |event|
  Circle.new(
    x: event.x, y: event.y,
    radius: 10 + rand(30),
    color: 'random',
    opacity: 0.8)
end

show
