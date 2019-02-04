---
title: Ruby 2D on Linux
subtitle: Learn how to set up your environment and install dependencies
layout: learn
---

# Install Ruby

Installing Ruby with package managers (e.g. apt, yum, pacman) can cause issues. We recommend using a Ruby version manager instead, like [rbenv](https://github.com/rbenv/rbenv). Here's how to set it up:

1. First, clone the rbenv repo into `~/.rbenv`:
```
$ git clone https://github.com/rbenv/rbenv.git ~/.rbenv
```

2. Install [ruby-build](https://github.com/rbenv/ruby-build) as an rbenv plugin, which will add the `rbenv install` command:
```
$ git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

3. Add rbenv to your path and initialize it by adding the following to your `~/.bashrc` or `.bash_profile`:
```bash
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
```

4. Get access to rbenv by loading the new shell config using:
```
$ source ~/.bashrc  # or `~/.bash_profile`
```

5. [Install packages](https://github.com/rbenv/ruby-build/wiki#suggested-build-environment) to prepare your build environment.

6. Install the latest version of Ruby (2.6.1 in this case):
```
$ rbenv install 2.6.1
```

7. Set Ruby 2.6.1 as the global default:
```
$ rbenv global 2.6.1
```

8. Check to make sure everything works:
```
$ rbenv versions
  system
* 2.6.1 (set by /home/<me>/.rbenv/version)
$ ruby -e "puts 'Hello Ruby'"
Hello Ruby
```

# Install Simple 2D

Ruby 2D requires a native graphics engine called Simple 2D, which relies on [SDL](https://www.libsdl.org). The simplest way to install Simple 2D is by [running the install script from the web](https://github.com/simple2d/simple2d#on-linux).

You can also install SDL packages manually and install Simple 2D from source by doing the following:
1. Install SDL packages for your Linux distribution.
- Ubuntu, Debian, and Mint:
```
$ sudo apt install libsdl2-dev libsdl2-image-dev libsdl2-mixer-dev libsdl2-ttf-dev
```
- CentOS and Fedora:
```
# Or `dnf install` on Fedora
$ sudo yum install SDL2-devel SDL2_image-devel SDL2_mixer-devel SDL2_ttf-devel
```
- openSUSE:
```
$ sudo zypper install libSDL2-devel libSDL2_image-devel libSDL2_mixer-devel libSDL2_ttf-devel
```
- Arch:
```
$ sudo pacman -S sdl2 sdl2_image sdl2_mixer sdl2_ttf
```

2. Next, download the source code for the [latest version of Simple 2D](https://github.com/simple2d/simple2d/releases/latest) and run:
```
$ make && sudo make install
```

# Install Ruby 2D

You're now ready to install the gem!

```
$ gem install ruby2d
```

That's it! Head back to the "get started" guide and [write your first 2D app »](/learn/get-started/#writing-your-first-2d-app)
