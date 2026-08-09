---
title: Audio
description: Learn how to play sounds and music
next_topic: input
layout: learn
---

Ruby 2D supports a number of popular audio formats, including WAV, MP3, Ogg Vorbis, and FLAC. The `Audio` class handles everything, whether you're playing a quick sound effect or looping a background track.

# Playing audio

```ruby
# A one-shot sound effect
bang = Audio.new('bang.wav')
bang.play

# A looping background track
music = Audio.new('theme.ogg', loop: true)
music.play
```

| Parameter | Default | Description |
|---|---|---|
| `path` | (required) | Path to an audio file (positional argument) |
| `loop` | `false` | Whether to loop playback |

Once you have an audio object, you can control it like this:

```ruby
audio.play
audio.pause
audio.resume
audio.stop              # stop immediately
audio.stop(500)         # fade out over 500 ms
audio.length            # duration in seconds
audio.volume            # current volume (0.0–1.0)
audio.volume = 0.8
audio.loop = true
audio.looping?          # true if this track is set to loop
```

You can also control the overall mixer volume, which affects all audio:

```ruby
Audio.volume             # get the mixer volume (0.0–1.0)
Audio.volume = 0.5       # set the mixer volume
```

# A few things to know

Each `Audio` plays on a single voice, so calling `play` again while a sound is still going restarts it rather than layering a second copy on top. That's usually what you want for music, but for effects that fire in quick succession (gunshots, coin pickups), you'll want a separate `Audio` for each overlapping voice, cycling through them as you go:

```ruby
bangs = Array.new(4) { Audio.new('bang.wav') }
i = 0
on :key_down do
  bangs[i].play              # round-robin across voices so repeats overlap
  i = (i + 1) % bangs.size
end
```

Continue to the [next topic](/learn/{{ page.next_topic }}){:.next-topic}
