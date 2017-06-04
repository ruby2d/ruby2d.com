# Audio

All good games require sound, be it sound effects, or music to build a mood. Introducing those features to your game on ruby2d is as simple as it can get!

## Music

You can create a new `Music` instance like this:

```
Music.new("/path/to/music/file")
```

If no file is found at this location, an error will be raised.

There is, also, a couple simple methods that can be used with a `Music`

### play, pause, resume, stop

`play`, `pause`, `resume` and `stop` are control flow methods available for `Music` instance. They allow controlling whether the music is playing at the moment, or not. Example usage in code:

```
music = Music.new("/path/to/music/file")
music.play
music.pause
music.resume
music.stop
```

### `fadeout`

`fadeout` allows you to gradually silence the music. It requires a number of milliseconds, based on which the fadeout duration will be calculated. Example:

```
music = Music.new("/path/to/music/file")
music.fadeout(2000)
```

## Sound

`Sound` class is designed to represent a single, one-time sound like cutting a tree, or hitting an enemy with a sword. It is as simple to use as:

```
sound = Sound.new("/path/to/sound/file")
sound.play
```
