---
title: Console
subtitle: Learn how to interact with your app on the console
layout: learn
---

Each time you want to change your Ruby 2D application you need to close the window, update your code, then run your program again. It's nice to be able to interact with our program while it's running to be able to gain feedback quickly. This is where the console feature comes in.

To use the console, run this command on your command line, replacing `game.rb` with the filename of your Ruby 2D program:

```bash
ruby2d console game.rb
```

Once your program has started, you'll be able to write Ruby code on the console to interact with your program. For example, to add some new text to our application, we could write on the console:

```ruby
Text.new("Hello")
```

## Common issues

If your program does not have an active 2D window, for example if `show` has yet to be called, or the window has been closed by calling `close`, or there was an error in your Ruby code causing the window to close, then the console will not be able to interact with your program and an error message will be displayed.
