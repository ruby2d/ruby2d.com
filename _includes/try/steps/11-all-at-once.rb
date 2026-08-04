require 'ruby2d'

set background: '#16161a'

bubbles = []

on :mouse_down do |event|
  bubbles << Circle.new(
    x: event.x, y: event.y,
    radius: 5 + rand(20),
    color: 'random',
    opacity: 0.8)
end

update do
  bubbles.each do |bubble|
    bubble.y -= 2

    if bubble.y < -bubble.radius
      bubble.y = Window.height + bubble.radius
    end
  end
end

show
