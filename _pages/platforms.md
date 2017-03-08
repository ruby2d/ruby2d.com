---
title: Platform support
---

<!--
✅ = Completed
❌ = Not working
⚠️ = Untested (but should work)
-->

# Officially supported

- **macOS** (tested on 10.12.3 – [Sierra](http://www.apple.com/macos))
- **Windows** (tested on Windows 10 Pro 64-bit, version 1607)
- **Linux** (tested on [Ubuntu](http://www.ubuntu.com/desktop) 16.10)
  - Including single-board ARM computers, like [Raspberry Pi](https://www.raspberrypi.org) and [CHIP](https://getchip.com).
- **Web** (produces JavaScript for browsers supporting [WebGL](http://caniuse.com/#feat=webgl))
- Eventually supporting iOS, tvOS, and Android (native only)

# Currently supported (as of [v0.3.0](https://github.com/ruby2d/ruby2d/releases))

✅ = Completed
❌ = Not implemented
⚠️ = Untested (but might work)

Platform     | Interpreted | Native
-------------|-------------|-------
OS X         | ✅          | ✅
Windows      | ✅          | ⚠️
Linux        | ✅          | ✅
Linux/ARM    | ✅          | ✅
Web          | ✅          | –
iOS          | –           | ❌
tvOS         | –           | ❌
Android      | –           | ❌

# App packaging support

Method                              | Status
------------------------------------|-------
OS X application (".app" file)      | ❌
[Electron](http://electron.atom.io) | ❌
