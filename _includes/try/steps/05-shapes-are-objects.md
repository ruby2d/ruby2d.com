# Shapes are objects

Here's the idea that unlocks everything else: shapes are ordinary Ruby objects. Assign one to a variable and you can change it after it's made — move it, recolor it, resize it, just by assigning to its attributes.

Below, the ball is created small, teal, and centered... and then three lines change its position, color, and size. All of that happens before `show` opens the window, so you only ever see the final result. Which raises a fun question: what if we could keep changing it *while the window is open?* Hold that thought for the next step.

**Try this:** comment out the three change lines (select them and press ⌘/ or Ctrl+/) and run it to see the ball as it started. Then add a line of your own, like `ball.opacity = 0.5`.
