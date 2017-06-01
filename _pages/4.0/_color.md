# Color

`Ruby2d::Color` is a class that represents colors in Ruby2D. It can be instantiated with a keyword [(based on css)](http://clrs.cc/), a hexidecimal value or an array containing a collection of red, green, blue, and alpha values expressed as a `Float` from `0.0` to `1.0`.

## Initialization via keyword

Color can be initialized via keyword string like this:

```ruby
Color.new('<keyword>')
```

<style>
  .showcase {
    height: 12px;
    width: 30px;
  }
</style>

Where keyword might be one of:

| Keyword | Showcase |
|-----------|-------------|
| navy | <div class='showcase' style='background-color: #001F3F'></div>|
| blue| <div class='showcase' style='background-color: #0074D9'></div>|
| aqua| <div class='showcase' style='background-color: #7FDBFF'></div>|
| teal| <div class='showcase' style='background-color: #39CCCC'></div>|
| olive| <div class='showcase' style='background-color: #3D9970'></div>|
| green| <div class='showcase' style='background-color: #2ECC40'></div>|
| lime| <div class='showcase' style='background-color: #01FF70'></div>|
| yellow| <div class='showcase' style='background-color: #FFDC00'></div>|
| orange| <div class='showcase' style='background-color: #FF851B'></div>|
| red| <div class='showcase' style='background-color: #FF4136'></div>|
| brown| <div class='showcase' style='background-color: #663300'></div>|
| fuchsia| <div class='showcase' style='background-color: #F012BE'></div>|
| purple| <div class='showcase' style='background-color: #B10DC9'></div>|
| maroon| <div class='showcase' style='background-color: #85144B'></div>|
| white| <div class='showcase' style='background-color: #FFFFFF'></div>|
| silver| <div class='showcase' style='background-color: #DDDDDD'></div>|
| gray| <div class='showcase' style='background-color: #AAAAAA'></div>|
| black| <div class='showcase' style='background-color: #111111'></div>|

One additional keyword is `'random'`, which will always create a randomly generated color. You can see it in action like by calling

```ruby
Color.new('random')
```

## Initialization via hex

Color can be initialized via hex string, very similarily to css. When done via hex value, examples from above might be replicated like this:

```ruby
Color.new('#001F3F') #=> navy
Color.new('#0074D9') #=> blue
Color.new('#7FDBFF') #=> aqua
```

Any correct hex value will work fine.

## Initialization via array of values

If you wish to have direct control over red, green, blue and alpha channels when creating your color, you can pass an array of 4 numbers to achieve this, like this:

```ruby
# Red, fully opaque
Color.new([1, 0, 0, 1])

# Equivalent to above, a mixture of integers and floats
Color.new([1.0, 0, 0, 0.0])

# Red, fully transparent
Color.new([1, 0, 0, 0])

# Red, half transparent
Color.new([0.1, 0.0, 0.0, 0.5])
```

## `#r`, `#g`, `#b`

You can use `#r`, `#g`, and `#b` methods to return red, green and blue channels respectively, as a value between 0 and 1:

```ruby
color = Color.new('fuchsia')
color.r #=> 0.9411764705882353
color.g #=> 0.0705882352941176
color.b #=> 0.7450980392156863
```

## `#a`, `#opacity`

You can use `#a` method (or it's alias, `#opacity`), to return alpha channel, as a value between 0 and 1:

```ruby
color = Color.new([0.1, 0.2, 0.3, 0.4])
color.a       #=> 0.4
color.opacity #=> 0.4
```

## `#opacity=`

You can use `#opacity=` method to set the opacity of a color:

```ruby
color = Color.new([0.1, 0.2, 0.3, 0.4])
color.opacity = 0.9
```
