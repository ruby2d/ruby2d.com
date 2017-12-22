---
title: Text
layout: learn
---

{% include warning.html icon="🚧" message="This page is a work in progress!" %}

Text is a class that allows showing a pieces of writing in the window. In it's basic form it can be used like this:

```ruby
Text.new(font: "path/to/font")
```

Which will render a default "Hello world!" message.

You can manage those properties in a text:

# x, y

`x` and `y` determine the top left edge of the text. The behavior for them is exactly the same as for image or square.

# text

`text` determines the message presented on window. It defaults to `"Hello World!"`.

You can pass it in constructor, you can also get and set it.

# size

`size` determines the size of a font. The default is `20`, you can pass it inside a constructor, get and set it.

# width and height

Texts `width` and `height` depend on text, font and size. Those properties are useful when composing more complex visual features, like menus, or buttons.

```ruby
text = Text.new(font: "/path/to/font")
text.width
text.height
```

# color

You can set color in a constructor, get and set it like examples above. The default is "white".

# Text class reference

`Ruby2D::Text`

## Constructor

```ruby
Text.new(x: 0, y: 0, text: "Hello World!", size: 20, font: <file_path>, z: 0, color: 'white')
# Where `path` is the font file path
```

## Accessors

Read and write: `x`, `y`, `message`, `color`
Read only: `size`, `path`

## Examples

```ruby
txt = Text.new(x: 25, y: 50, text: 'hello!', size: 20, font: 'vera.ttf')

txt.text = "A new message!"

txt.color = 'fuchsia'
```
