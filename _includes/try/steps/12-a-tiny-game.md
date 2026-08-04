# A tiny game

Let's put it all together: a ball you steer, a gem to chase, and a score that climbs. Steering is the `:key_held` handler from before (click the window first!). The new trick is `contains?`, which every shape has — it answers whether a point is inside it. Each frame, the update loop asks the gem whether the ball's center has arrived; if so, score a point and send the gem somewhere new.

That's a real game, and more importantly, that's the whole Ruby 2D mental model: create shapes, change them in the update loop, react to events. Everything else is more of the same.

**Try this:** make it yours. Speed up the ball, shrink the gem, make it flee to a random color each time it's caught. When you're ready for more, the [Learn](/learn) pages go deeper on everything you've seen, and [Get started](/learn/get-started) shows you how to install the gem and run all of this on your own machine.
