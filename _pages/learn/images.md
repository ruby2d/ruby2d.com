---
title: Images
layout: learn
---

{% include warning.html icon="🚧" message="This page is a work in progress!" %}

Image allows you to bring image files to your window. In simplest form, it's usage looks like this:

```ruby
Image.new(path: "path/to/file")
```

where `path/to/file` must point to an image file. If there is no file at this path, an error will be raised, with message:

`Cannot find image file 'path/to/file'`

# x, y

`x` and `y` represent the position of top left corner of the image. By default, they are both equal to `0`, so the basic example, if expanded, would look like this:

```ruby
Image.new({
  x: 0, y: 0,
  path: "path/to/file"
})
```

Those values can always be get and set:

```ruby
image = Image.new(path: "path/to/file")
image.x = 10
image.y = 10
image.x #=> 10
image.y #=> 10
```

# color

`color` represents the background if an image. By the default it's `white`, so the default example, if expanded, would look like this:

```ruby
Image.new(path: "path/to/file", color: "white")
```

`color` can be get and set:

```ruby
image = Image.new(path: "path/to/file")
image.color = "red"
image.color #=> Color.new("red")
```

# Image class reference

`Ruby2D::Image`

## Constructor

At creation, `width` and `height` are set to the native size of the image.

```ruby
Image.new(x: 0, y: 0, path: <image_file>, z: 0, color: 'white')
# Where `path` is the image file path
```

## Accessors

Read and write: `x`, `y`, `width`, `height`, `color`
Read only: `path`

## Examples

```ruby
Image.new(path: 'balloon.png')

img = Image.new(x: 50, y: 175, path: 'assets/tile.bmp')

img.x = 75
img.y = 100

img.width = 125
img.height = 125

img.color = [0.8, 1.0, 0.5, 1.0]

puts img.path
```
