---
title: Roadmap
permalink: /roadmap/
---

✅ = Completed
❌ = Not working
⚠️ = Untested (but should work)

# Officially supported platforms

- **OS X** (tested on 10.11.2 – [El Capitan](http://www.apple.com/osx/)) – Interpreted / Native
- **Linux** (tested on [Ubuntu](http://www.ubuntu.com/desktop) 15.10) – Interpreted / Native
- **Raspberry Pi** ([Raspbian](https://www.raspbian.org) – tested on Jessie, released 11/2015) – Interpreted / Native
- **Web** (produces embeddable HTML and JavaScript – for browsers supporting [WebGL](http://caniuse.com/#feat=webgl))
- Eventually supporting:
  - Windows 10 – Interpreted / Native
  - iOS – Native
  - Android – Native

# Platforms currently supported (as of [v0.2.0](https://github.com/ruby2d/ruby2d/releases))

Platform     | Interpreted | Native
-------------|-------------|-------
OS X         | ✅          | ❌
Linux        | ✅          | ❌
Raspberry Pi | ❌          | ❌
Web          | ❌          | –

## App packaging support

Method                              | Status
------------------------------------|-------
OS X `.app`                         | ❌
[Electron](http://electron.atom.io) | ❌

# On deck

- Get [`testcard`](https://github.com/ruby2d/ruby2d/blob/master/tests/testcard.rb) working on Raspberry Pi (interpreted)
- Add basic controller support (axis 0/1 and buttons)
- Build natively
- Build for web:
  - Create JavaScript file
  - Create HTML with embedded JavaScript
  - Create desktop app using [Electron](http://electron.atom.io)
- Add classical mode (not using the DSL), like [Sinatra's modular style](http://www.sinatrarb.com/intro.html#Modular%20vs.%20Classic%20Style)
