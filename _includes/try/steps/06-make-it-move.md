# Make it move

Meet the `update` loop, the heartbeat of every Ruby 2D app. Whatever you put inside the `update do ... end` block runs about 60 times a second, for as long as the window is open. Nudge a shape a tiny bit each beat and you get smooth motion.

Below, the ball's `x` grows by 2 every frame, so it glides right at about 120 pixels a second... and sails straight off the edge of the window. That's not a bug, it's your next lesson waiting to happen.

**Try this:** make it faster. Make it drift diagonally by changing `ball.y` too. Then try growing `ball.radius` a little each frame instead and see what that feels like.
