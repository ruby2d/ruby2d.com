---
title: Ruby 2D on Linux
description: Learn how to set up your Ruby environment on Linux
layout: learn
---

# Install Ruby

Installing Ruby with system package managers (e.g. apt, yum, pacman) can cause issues. We recommend using [rbenv](https://github.com/rbenv/rbenv), a lightweight Ruby version manager. Here's how to set it up:

1. Clone the rbenv repo into `~/.rbenv`:
```
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
```

2. Run the init command to set up rbenv in your shell:
```
~/.rbenv/bin/rbenv init
```
This will print instructions for adding rbenv to your shell profile. Follow those steps, then restart your terminal (or open a new tab) so the changes take effect.

3. Install [ruby-build](https://github.com/rbenv/ruby-build) as an rbenv plugin, which adds the `rbenv install` command:
```
git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build
```

4. [Install packages](https://github.com/rbenv/ruby-build/wiki#suggested-build-environment) to prepare your build environment.

5. Install Ruby and set it as your default. Version {{ site.ruby_version }} is the latest as we write this, and `rbenv install -l` will show you the newest available:
```
rbenv install {{ site.ruby_version }}
rbenv global {{ site.ruby_version }}
```

6. Check to make sure everything works (the `$` symbol represents the prompt):
```
$ ruby -e "puts 'Hello Ruby'"
Hello Ruby
```

# Install packages

Ruby 2D needs a few system packages for low-level graphics and hardware. Install the following for your Linux distribution:

**Ubuntu, Debian, and Mint**
```
sudo apt install libsdl3-dev libsdl3-image-dev libsdl3-mixer-dev libsdl3-ttf-dev
```

**CentOS and Fedora**
```
sudo yum install SDL3-devel SDL3_image-devel SDL3_mixer-devel SDL3_ttf-devel
```

**openSUSE**
```
sudo zypper install libSDL3-devel libSDL3_image-devel libSDL3_mixer-devel libSDL3_ttf-devel
```

**Arch**
```
sudo pacman -S sdl3 sdl3_image sdl3_mixer sdl3_ttf
```

SDL3 is fairly new, so if your distribution doesn't package it yet, you don't have to build it by hand: run [`ruby2d setup`](/learn/building#setting-up-other-platforms) and Ruby 2D will compile SDL3 (and mruby) for you, then wire it into the gem.

That's it! Head back to the "get started" guide and [write your first 2D app »](/learn/get-started)
