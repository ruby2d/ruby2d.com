# Click, click, click

The mouse works the same way: `on :mouse_down` fires whenever you click, and the event tells you where, via `event.x` and `event.y`. Pass those straight into a new `Circle` and every click leaves a splash of color behind.

Notice there's no update loop here at all. The shapes stick around on their own once created; events just decide *when* new ones appear.

**Try this:** change `:mouse_down` to `:mouse_move`, then sweep your cursor across the window like a paintbrush. When you're done admiring your work, try `10 + rand(60)` for the radius to get wilder splotches.
