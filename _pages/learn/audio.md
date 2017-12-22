---
title: Audio
layout: learn
---

{% include warning.html icon="🚧" message="This page is a work in progress!" %}

All good games require sound, be it sound effects, or music to build a mood. Introducing those features to your game on Ruby 2D is as simple as it can get!

# Sound

`Sound` class is designed to represent a single, one-time sound like cutting a tree, or hitting an enemy with a sword. It is as simple to use as:

```ruby
sound = Sound.new("path/to/sound/file")
sound.play
```

## Sound class reference

`Ruby2D::Sound`

### Constructor

```ruby
Sound.new(path)
# Where `path` is the audio file path
```

### Accessors

Read only: `path`

### Examples

```ruby
snd = Sound.new("boom.wav")

# Play the sound
snd.play
```

# Music

You can create a new `Music` instance like this:

```ruby
Music.new("path/to/music/file")
```

If no file is found at this location, an error will be raised.

There is, also, a couple simple methods that can be used with `Music`.

`play`, `pause`, `resume` and `stop` are control flow methods available for `Music` instance. They allow controlling whether the music is playing at the moment, or not. Example usage in code:

```ruby
music = Music.new("path/to/music/file")
music.play
music.pause
music.resume
music.stop
```

`fadeout` allows you to gradually silence the music. It requires a number of milliseconds, based on which the fadeout duration will be calculated. Example:

```ruby
music = Music.new("path/to/music/file")
music.fadeout(2000)
```

## Music class reference

`Ruby2D::Music`

### Constructor

```ruby
Music.new(path)
# Where `path` is the audio file path
```

### Accessors

Read and write: `loop`
Read only: `path`

### Examples

```ruby
mus = Music.new("song.mp3")

# Play the music
mus.play

# Pause the music
mus.pause

# Resume playing the music from where left off
mus.play

# Stop playing and rewind to the beginning
mus.stop

# Loop the music to repeat after finished playing
mus.loop = true

# Fade out music over 2 seconds (2000 milliseconds) and stop
mus.fadeout(2000)
```
