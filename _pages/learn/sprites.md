---
title: Sprites
description: Learn how to create sprite animations
next_topic: tilesets
layout: learn
---

Sprites are special images that can be used to create animations, kind of like a [flip book](https://en.wikipedia.org/wiki/Flip_book). To create a sprite animation, first you'll need an image which contains each frame of your animation. Let's start with a simple example.

Take this sprite sheet of a coin rotating:

<img class="sprite-sheet" src="/assets/img/learn/coin.png" width="504" height="84" alt="">

Each frame is 84 pixels wide, so that's what we'll set as our clipping width. The clipping height will automatically be set as the image height. Let's also have the coin animation advance to the next frame at 300 milliseconds and loop when it gets to the end. Our coin should look like it's continuously rotating in a smooth animation. Here's how we'll create the sprite in Ruby:

```ruby
coin = Sprite.new(
  'coin.png',
  clip_width: 84,
  time: 300,
  loop: true
)
```

We can then play the sprite animation by using the `play` method:

```ruby
coin.play
```

Here's what our animation looks like:

<video width="140" height="120" class="sprite-video" src="/assets/img/learn/coin.mp4" autoplay loop muted playsinline></video>

Just like regular images, you can also set the `x` and `y` position of the sprite, along with its `width`, `height`, and `tint`. Sprites also accept symbols like `x: :center` and `y: :bottom` to [align to the window](/learn/2d-basics#aligning-to-the-window), with optional `padding:` for breathing room. To stop the sprite playing in this example, simply call `coin.stop`.

Some sprite sheets are meant to be played once, like an explosion. Take this sprite image:

<img class="sprite-sheet" src="/assets/img/learn/boom.png" width="762" height="127" alt="">

To play this through, we'll set the clip width to be 127 pixels and the frames to advance every 75 milliseconds.

```ruby
boom = Sprite.new(
  'boom.png',
  clip_width: 127,
  time: 75
)
```

Let's play this animation, but also print a message when it's done:

```ruby
boom.play do
  puts "Animation finished!"
end
```

When a non-looping animation reaches its last frame, the sprite holds on that frame until you call `stop` or play something else. It doesn't snap back to the start on its own. The block, if you passed one, fires once at that moment.

Here's what our animation looks like:

<video width="154" height="139" class="sprite-video" src="/assets/img/learn/boom.mp4" autoplay loop muted playsinline></video>

So far, we've only focused on a single animation, but what if we want to have many in a single sprite sheet? A perfect example might be a hero character in our game, where the sprite sheet image might look like this:

<img class="sprite-sheet" src="/assets/img/learn/hero.png" width="546" height="99" alt="">

The sheet has seven images of the character in four different poses: standing, walking, climbing, and cheering. When creating a new instance from the `Sprite` class, we can use the `animations` attribute to set multiple animations. Each animation needs a name and a frame range, using Ruby's `..` range operator. Let's see what this would look like.

```ruby
hero = Sprite.new(
  'hero.png',
  width: 78,
  height: 99,
  clip_width: 78,
  time: 250,
  animations: {
    walk: 1..2,
    climb: 3..4,
    cheer: 5..6
  }
)
```

We could combine this with [input](/learn/input) events to animate the sprite with arrow keys:

```ruby
on(key_down: :left)  { hero.play animation: :walk,  loop: true, flip: :horizontal }
on(key_down: :right) { hero.play animation: :walk,  loop: true }
on(key_down: :up)    { hero.play animation: :climb, loop: true }
on(key_down: :down)  { hero.play animation: :climb, loop: true, flip: :vertical }
on(key_down: :c)     { hero.play animation: :cheer }
```

Here's what each animation looks like:

<video width="150" height="135" class="sprite-video" src="/assets/img/learn/hero.mp4" autoplay loop muted playsinline></video>

In the most complex case, we may want to specify a _different_ clipping rectangle for every frame. Instead of an animation frame range, we provide an array containing the size of the clipping rectangle and the time in milliseconds it should be displayed. Take this sprite atlas with numbers of different sizes scattered about:

<img class="sprite-sheet" src="/assets/img/learn/atlas.png" width="106" height="137" alt="">

We can "cut out" each number like so:


```ruby
atlas = Sprite.new(
  'atlas.png',
  animations: {
    count: [
      {
        x: 0, y: 0,
        width: 35, height: 41,
        time: 300
      },
      {
        x: 26, y: 46,
        width: 35, height: 38,
        time: 400
      },
      {
        x: 65, y: 10,
        width: 32, height: 41,
        time: 500
      },
      {
        x: 10, y: 99,
        width: 32, height: 38,
        time: 600
      },
      {
        x: 74, y: 80,
        width: 32, height: 38,
        time: 700
      }
    ]
  }
)
```

Then play the `:count` animation on a loop like so:

```ruby
atlas.play animation: :count, loop: true
```

Here's what the animation looks like:

<video width="100" height="100" class="sprite-video" src="/assets/img/learn/atlas.mp4" autoplay loop muted playsinline></video>

# Stopping animations

You can stop a sprite animation at any time:

```ruby
sprite.stop              # stop and revert to the default animation's frame
sprite.stop(:walk)       # stop only if :walk is currently playing
```

# Pausing and speed

Sometimes you don't want to stop an animation outright: you just want to freeze it for a beat or play it back at a different rate.

```ruby
sprite.pause      # freeze on the current frame
sprite.resume     # carry on from where you paused
sprite.paused?    # => true / false
```

`pause` is idempotent (calling it on a sprite that isn't doing anything is just a no-op), and `play` or `stop` both clear the paused state for you.

For speed, set a multiplier on top of `time:`:

```ruby
sprite.speed = 2.0   # twice as fast
sprite.speed = 0.5   # half speed
sprite.speed = 0     # frozen, but not technically paused
```

The per-frame duration becomes `time / speed`. Reverse playback isn't a thing — negative values clamp to zero.

A couple of state predicates round out the picture:

```ruby
sprite.playing?     # currently advancing through frames?
sprite.looping?     # is the current animation set to loop?
```

`playing?` is true while the sprite is actively animating, and false when it's idle, paused, or holding on the last frame of a finished non-looping animation.

# Sprite sheets

You've seen how to chop frames out of an atlas image by hand, passing `x`, `y`, `width`, and `height` for every frame. That works, but most asset tools (TexturePacker, Aseprite, the asset packs from Kenney.nl) ship a sidecar XML or JSON file naming each frame for you. The `SpriteSheet` class reads those files directly, so you can refer to frames by name instead of pixel coordinates:

```ruby
sheet = SpriteSheet.new('characters.xml')

sheet.frame_names              # => ['character_beige_idle', 'character_beige_walk_a', ...]
sheet['character_beige_idle']  # => { x: 1285, y: 0, width: 256, height: 256 }
sheet.frame?('not_a_frame')    # => false
```

Two formats are supported, picked from the file extension:

- **Sparrow XML** (TexturePacker "Generic XML", Kenney.nl asset packs): `.xml`
- **TexturePacker JSON**: `.json` (both the hash form and the array form)

The texture image referenced inside the atlas is loaded relative to the atlas file's directory, so as long as the `.xml` (or `.json`) and the `.png` live next to each other, you're set. `TextureAtlas` is an alias if that name fits your vocabulary better.

To use a sprite sheet, hand it to `Sprite.new` in place of the image path:

```ruby
hero = Sprite.new(sheet, frame: 'character_beige_idle', x: 100, y: 100)
```

That gives you a static sprite showing one named frame. For an animation, list the frame names instead of frame ranges:

```ruby
walker = Sprite.new(sheet, animations: {
  idle: ['character_beige_idle'],
  walk: %w[character_beige_walk_a character_beige_walk_b]
})

walker.play(animation: :walk, loop: true)
```

You can mix per-frame timing in too by passing `{ name:, time: }` hashes:

```ruby
runner = Sprite.new(sheet, animations: {
  run: [
    { name: 'character_beige_walk_a', time: 80 },
    { name: 'character_beige_walk_b', time: 120 }
  ]
})
```

Every sprite built from the same `SpriteSheet` shares one GPU texture, so you can construct dozens of sprites against a single sheet without paying for it again.

You can also swap the static frame at runtime:

```ruby
hero.frame                            # => 'character_beige_idle'
hero.frame = 'character_beige_jump'
```

Setting `frame =` updates the clip rect, stops any playing animation, and (if you didn't pass an explicit `width:` / `height:` at construction) resizes the sprite to match the new frame.

## Sprite, SpriteSheet, or Tileset?

A quick rule of thumb when you're choosing between them:

- **`Sprite`**: one animated thing on screen. Characters, projectiles, effects.
- **`SpriteSheet`**: a *resource*, not a drawable. Use it when many sprites share one packed atlas: each sprite stays independent (its own position, its own animation), and they all share one texture.
- **[`Tileset`](/learn/tilesets)**: when you want many *static* placements of cells from a grid in a single batched draw call. No per-cell animation, no per-cell state.

The line between a busy `SpriteSheet`-backed scene and a `Tileset` is scene-graph cost: 100 sprites from one sheet are 100 entries (each independently animatable, each free to move); a `Tileset` with 100 placements is 1 entry, batched into one render call.

## A few things to know

A horizontal-strip image gets a `:default` animation spanning all frames for free. Atlas-backed sprites built from a `SpriteSheet` don't — define your own `:default` if you need one.

TexturePacker can pack frames rotated 90° (the `"rotated": true` flag). Ruby 2D doesn't draw rotated atlas frames yet. Building a `Sprite` against one raises an error. For now, repack the atlas with rotation disabled.

Trimmed frames *are* supported. When the packing tool crops transparent edges from each frame, the atlas stores the original (un-trimmed) frame size and the offset of the trimmed pixels within it. Ruby 2D draws those frames at their original logical size. `sprite.width` and `sprite.height` reflect the un-trimmed footprint, and the packed pixels render at the correct offset. If the atlas carries trim metadata, it just works.

# Drawing sprites in render blocks

Just like images, sprites can be drawn per-frame inside a `render` block:

```ruby
sprite = Sprite.new('sheet.png', clip_width: 32, clip_height: 32, add: false)

render do
  sprite.render(x: 10, y: 10, clip_x: 64, clip_y: 0, clip_width: 32, clip_height: 32)
end
```

Continue to the [next topic ▸](/learn/{{ page.next_topic }})
