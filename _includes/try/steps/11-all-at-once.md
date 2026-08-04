# All at once

So far we've moved one shape at a time. Real apps juggle dozens, and the pattern is plain Ruby: keep your shapes in an array, and `each` over it in the update loop.

Here, every click drops a bubble into the `bubbles` array, and the update loop lifts them all a little each frame. When one floats off the top, it wraps around to the bottom for another lap. Two ideas you already know — events and the update loop — now working together.

**Try this:** give each bubble a sideways drift by also changing `bubble.x`. Then try `bubble.radius -= 0.1` and watch them shrink as they rise. (What happens when a radius hits zero? Only one way to find out.)
