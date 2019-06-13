---
title: Audio
subtitle: Learn how to play sounds and music
next_topic: input
layout: learn
---

Ruby 2D supports a number of popular audio formats, including WAV, MP3, Ogg Vorbis, and FLAC. There are two kinds of audio concepts: sounds and music. Sounds are intended to be short samples, played without interruption, like an effect. Music is for longer pieces which can be played, paused, stopped, resumed, and faded out, like a background soundtrack.

# Sounds

```ruby
boom = Sound.new('boom.wav')

# Play the sound
boom.play
```

# Music

```ruby
song = Music.new('song.mp3')

# Play the music
song.play

# Pause the music
song.pause

# Resume playing the music from where left off
song.resume

# Stop playing and rewind to the beginning
song.stop

# Loop the music to repeat after finished playing
song.loop = true

# Fade out music over 2 seconds (2000 milliseconds) and stop
song.fadeout(2000)

# Adjust the volume from 0 to 100%
song.volume = 50

# Use the `Music` class to also adjust the volume
Music.volume = 80
```

Continue to the [next topic »](/learn/{{ page.next_topic }})
