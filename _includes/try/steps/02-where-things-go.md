# Where things go

Every shape gets a position with `x:` and `y:`. Here's the twist: the origin `(0, 0)` is the *top-left* corner of the window, and `y` grows *downward*. Odd at first, but it's how 2D graphics has worked for decades, and it becomes second nature fast.

This window is 640 pixels wide and 480 tall. A square's `x` and `y` are its own top-left corner, so the three squares below march from the origin down to the bottom-right corner.

**Try this:** add a fourth square in the bottom-left corner. (When you're there: what `x` and `y` put one dead center? The middle square is a hint.)
