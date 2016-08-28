---
title: Welcome Hacker Hours!
subtitle: Your guide to getting started
---

Ruby 2D is for those who love Ruby *and* making games, art, and other media apps. Ruby 2D is a gem, meaning it's a bunch of Ruby files and other assets for making 2D apps. Currently, it only runs on Mac and Linux, but hopefully Windows will be supported in time for the next meetup. **If you are running Windows**, you can use Ruby 2D with a virtual machine, like [VirtualBox](https://www.virtualbox.org), running [Ubuntu](http://www.ubuntu.com/desktop). This might take awhile to set up, so beware – you may want to choose a different project for today.

## Let's start contributing!

Before we can run our first Ruby 2D app, we'll need a few dependencies, namely a C library called [Simple 2D](https://github.com/simple2d/simple2d) which talks to the low-level graphics and input functionality of your OS. This will be the native extension used by the gem.

**If you're using a Mac...**

1. Make sure you have Homebrew installed. If you type `brew` in the command line and see "command not found", you can install Homebrew by following the instructions at [brew.sh](http://brew.sh).
2. Update Homebrew using `brew update && brew upgrade` if you need to.
3. Install Simple 2D from the development branch using `brew tap simple2d/tap`, then `brew install --HEAD simple2d`

**If you're on Linux...**

Install Simple 2D from the development branch by running this script on the command line:

```bash
url='https://raw.githubusercontent.com/simple2d/simple2d/master/simple2d.sh'; which curl > /dev/null && cmd='curl -fsSL' || cmd='wget -qO -'; bash <($cmd $url) install --HEAD
```

## Set up Ruby 2D for development

While normal people will install Ruby 2D using `gem install ruby2d`, you're a contributor, and therefore special. You'll need access to the entire Git repository to add new commits and send pull requests.

First, clone the repo by running `git clone --recursive https://github.com/ruby2d/ruby2d.git` (the `--recursive` flag will make sure you get the [`test_media`](https://github.com/simple2d/test_media) submodule).

Make sure you can run the Ruby 2D test card by `cd`-ing into the directory and running `rake testcard`. Since Ruby 2D is fairly new, the best way to see how to use the gem is to take a look at the examples in [tests/testcard.rb](https://github.com/ruby2d/ruby2d/blob/master/tests/testcard.rb).

You're now ready to choose an issue to work on! Here are a few that are newbie friendly:

* [#1: Allow colors to be created with RGB hex values](https://github.com/ruby2d/ruby2d/issues/1)
* [#7: Change text color](https://github.com/ruby2d/ruby2d/issues/7)
* [#16: Feature Request: catch-all on_key and on_controller callbacks](https://github.com/ruby2d/ruby2d/issues/16)

We're also looking for sample games and other demos to show off what Ruby 2D can do. Feel free to grab some [free art assets from Kenney](http://kenney.nl/assets) and get creative!

Thanks again for your contributions!
