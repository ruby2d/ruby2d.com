---
title: Console
subtitle: Learn how to interact with your app on the console
layout: learn
---


Each time you want to change your ruby 2d application you need to close the window, update your code then run your program again.

It's nice to be able to interact with our program while it's running to be able to gain feedback quickly, this is where the console feature comes in.

To use the console run this command on your command line, replacing `game.rb` with the filename of your ruby2d program:

```bash
ruby console game.rb
```

Once your program has started you'll be able to write ruby code on the console to interact with your program, for example to add some new text to our application we could write on the console:

```ruby
Text.new("Hello")
```

### Common issues

If your program does not have an active 2d window, for example if `show` has yet to be called, the window has been closed by calling `close`, or there was an error in your ruby code causing the window to close, then the console will not be able to interact with your program, instead you will see an error message.
