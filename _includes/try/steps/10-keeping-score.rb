require 'ruby2d'

set background: '#16161a'

count = 0
label = Text.new('Circles: 0', x: 10, y: 10, size: 24, color: 'white', z: 1)

on :mouse_down do |event|
  Circle.new(
    x: event.x, y: event.y,
    radius: 10 + rand(30),
    color: 'random',
    opacity: 0.8)

  count += 1
  label.content = "Circles: #{count}"
end

show
