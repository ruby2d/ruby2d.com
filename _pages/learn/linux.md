---
title: Ruby 2D on Linux
subtitle: Learn how to set up your environment on Linux
layout: learn
---

# Install Ruby

We recommend managing Ruby versions using [rbenv](https://github.com/rbenv/rbenv). To set it up:

1. Check out rbenv into `~/.rbenv`:
```bash
$ git clone https://github.com/rbenv/rbenv.git ~/.rbenv
```

2. Install [ruby-build](https://github.com/rbenv/ruby-build) as an rbenv plugin, which will add the `rbenv install` command:
```bash
$ git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

3. Add rbenv to your path and initialize by adding the following to your `~/.bashrc` or `~/.bash_profile`:
```bash
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
```

4. Reload the current shell to get access to rbenv:
```bash
$ source ~/.bashrc  # or ~/.bash_profile
```

5. [Install packages](https://github.com/rbenv/ruby-build/wiki#suggested-build-environment) to prepare your build environment.

6. Install the latest version of Ruby (2.5.1 in this case), and don't generate RDoc to save time (plus, docs are online):
```bash
$ CONFIGURE_OPTS="--disable-install-doc --enable-shared" rbenv install 2.5.1 --verbose
```

7. Set Ruby 2.5.1 as the global default:
```bash
$ rbenv global 2.5.1
```

8. Don't install docs for gems
```bash
$ echo "gem: --no-document" > ~/.gemrc
```

9. Check to make sure everything works:
```
$ rbenv versions
  system
* 2.5.1 (set by /home/<me>/.rbenv/version)
$ ruby -e "puts 'Hello Ruby'"
Hello Ruby
```

# Install Simple 2D

Ruby 2D requires a native graphics engine called Simple 2D, which relies on SDL. Install SDL packages for your Linux distribution:

- Ubuntu/Debian/Mint:
```bash
$ sudo apt install -y libsdl2-dev libsdl2-image-dev libsdl2-mixer-dev libsdl2-ttf-dev
```

- CentOS/Fedora:
```bash
# `dnf install` on Fedora 22+
$ sudo yum install -y SDL2-devel SDL2_image-devel SDL2_mixer-devel SDL2_ttf-devel
```

- Arch:
```bash
$ sudo pacman -S sdl2 sdl2_image sdl2_mixer sdl2_ttf
```

Next, download the source for the [latest version](https://github.com/simple2d/simple2d/releases/latest) and run `make && sudo make install`

# Install Ruby 2D

You're now ready to install the gem!

```
$ gem install ruby2d
```

That's it! Head back to the "get started" guide and [write your first 2D app »](/learn/get-started#writing-your-first-2d-app)
