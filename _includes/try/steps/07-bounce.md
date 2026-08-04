# Bounce

Time to stop losing balls off the edge. The trick is one `if` inside the update loop: when the ball reaches a wall, flip its speed to negative and it heads back the other way. Congratulations, this is game logic — the same check-and-react pattern behind every pong, brick, and platformer.

`Window.width` is the window's width in pixels, and since the ball's `x` is its center, we add and subtract `radius` so it bounces off its edge rather than its middle.

**Try this:** the real fun is making it bounce vertically too. Add a `speed_y`, move `ball.y` each frame, and bounce off `Window.height`. Start the two speeds at different values, like 4 and 3, and enjoy the show.
