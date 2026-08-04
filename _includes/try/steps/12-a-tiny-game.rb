require 'ruby2d'

set background: '#16161a'

player = Circle.new(x: 320, y: 240, radius: 25, color: 'aqua')
gem    = Square.new(x: 100, y: 100, size: 25, color: 'yellow')
label  = Text.new('Score: 0', x: 10, y: 10, size: 24, color: 'white', z: 1)
score  = 0

on :key_held do |event|
  player.x -= 5 if event.key? :left
  player.x += 5 if event.key? :right
  player.y -= 5 if event.key? :up
  player.y += 5 if event.key? :down
end

update do
  if gem.contains?(player.x, player.y)
    score += 1
    label.content = "Score: #{score}"

    gem.x = rand(Window.width - gem.size)
    gem.y = rand(Window.height - gem.size)
  end
end

show
