# Steer with the keyboard

Your turn to drive. The `on` method listens for events, and `:key_held` fires every frame a key is down — perfect for steering. The block receives an `event`, and `event.key?` tells you which key it was.

One thing first: **click the window** so it can hear your keyboard. Then take the arrow keys for a spin.

There's also `:key_down`, which fires just *once* per press. Use `:key_held` for movement and `:key_down` for one-shot actions, like...

**Try this:** add this before `show`, then tap the space bar:

```ruby
on key_down: :space do
  ball.color = 'random'
end
```
