---
title: Sprites
layout: learn
---

{% include warning.html icon="🚧" message="This page is a work in progress!" %}

# Sprite

`Ruby2D::Sprite`

## Constructor

```ruby
Sprite.new(x, y, <path>)
# where <path> is the sprite sheet image path
```

## Accessors

## Examples

```ruby
spr = Sprite.new(0, 0, "character.png")

spr.clip(x, y, w, h, frames)

spr.next
```
