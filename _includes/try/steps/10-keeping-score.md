# Keeping score

Words are drawn with `Text`, and like every shape, a `Text` is an object you can change: assign to its `content` and the window shows the new string. That's all a score display is — a variable that counts, and a label that repeats it.

The `z: 1` keeps the label on top. Objects are normally drawn in the order they're created, so without it, a well-aimed circle would paint right over your score. Higher `z` wins.

**Try this:** make the label report your click's coordinates instead: `label.content = "#{event.x}, #{event.y}"`. Handy trick, that one — it's how you find coordinates for placing shapes.
