---
title: Tilesets
description: Learn how to draw tiles from a tileset image
next_topic: text
layout: learn
---

Tilesets are images containing multiple unique tiles. These tiles can be drawn to the screen multiple times in interesting combinations to produce things like backgrounds or draw larger objects.


Let's start with the 2x2 tileset below which has with 4 different tiles:

<img class="sprite-sheet" src="/assets/img/learn/tileset.png">

Each tile is 84 pixels tall and wide so this is what we'll set our tile width and height to be. The tileset image has a 1 pixel padding around the entire image and a 2 pixel spacing between each tile, so we'll set those values as well. Let's define our tileset using our image:


```ruby
tileset = Tileset.new(
  'tileset.png',
  tile_width: 84,
  tile_height: 84,
  padding: 1,
  spacing: 2,
)
```

Now that our tileset is defined we can define our individual tiles by giving them a name and specifying their x and y co-ordinates, here we go:

```ruby
tileset.define_tile('red', 0, 0)
tileset.define_tile('blue', 1, 0)
tileset.define_tile('green', 0, 1)
tileset.define_tile('purple', 1, 1)
```

Now that we have defined some tiles we can draw them to the screen. Let's draw our purple and red tiles:

```ruby
tileset.set_tile('blue', [
    { x: 0,  y: 0 },
    { x: 84, y: 0 },
    { x: 0,  y: 84 }
])

tileset.set_tile('red', [
    { x: 84,  y: 84 }
])
```


Our tiles now look like this drawn to the screen:

<img class="sprite-sheet" src="/assets/img/learn/tileset_drawn.png">


One more thing we can do with tilesets is scale/rotate and flip them.


### Scaling

We can scale all of our tiles by specifying the scale attribute (default: 1) on our tileset:

```ruby
tileset = Tileset.new(
  'tileset.png',
  tile_width: 84,
  tile_height: 84,
  padding: 1,
  spacing: 2,
  scale: 2
)
```

By setting our scale to 2, each tile will be drawn with twice the width and height, in our example that would result in 168x168 pixel tiles

### Rotating

We can rotate our tiles by setting the `rotate` attribute when defining them

```ruby
tileset.define_tile('red', 0, 0, rotate: 90)
```

### Flipping

We can set the `flip` attribute to flip our tiles. It can either be set to `horizontal`, `vertical` or `both`

```ruby
tileset.define_tile('red', 0, 0, flip: :both)
```

Continue to the [next topic ▸](/learn/{{ page.next_topic }})