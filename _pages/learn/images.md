---
title: Images
subtitle: Learn how to use images
next_topic: sprites
layout: learn
---

Images in many popular formats can be drawn in the window. To draw an image in the window, use the following, providing the image file path:

```ruby
Image.new('star.png')
```

Here are all the possible instance attributes:

```ruby
Image.new(
  'star.png',
  x: 400, y: 200,
  width: 50, height: 25,
  color: [1.0, 0.5, 0.2, 1.0],
  rotate: 90,
  z: 10
)
```

Continue to the [next topic »](/learn/{{ page.next_topic }})
