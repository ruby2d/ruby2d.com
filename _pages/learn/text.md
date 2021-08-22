---
title: Text
description: Learn how draw text
next_topic: audio
layout: learn
---

Text with OpenType fonts (`.ttf` or `.otf` file extension) can be drawn in the window like so:

```ruby
Text.new('Hello')
```

Here are all the possible instance attributes:

```ruby
Text.new(
  'Hello',
  x: 150, y: 470,
  font: 'vera.ttf',
  style: 'bold',
  size: 20,
  color: 'blue',
  rotate: 90,
  z: 10
)
```

Continue to the [next topic ▸](/learn/{{ page.next_topic }})
