---
title: Ruby 2D on macOS
subtitle: Learn how to set up your Ruby environment on the Mac
layout: learn
---

macOS comes pre-installed with Ruby 🥳, but doesn't have Ruby's development libraries needed to build native extensions 😩. No problem though — there are a few tools we can use to set up a proper Ruby development environment. 😎

## Using Homebrew

Our favorite, and perhaps the easiest, is using [Homebrew](https://brew.sh). After installing Homebrew (see their website for details), you can install Ruby using: `brew install ruby`

Make sure to add Ruby to your `$PATH` variable, for example by running:
```
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.bash_profile
```
To get access to Ruby in the current shell, run `source ~/.bash_profile`. Ruby should now be available for this and all new shells. Try running `ruby --version` to check.

## Multiple Ruby versions with rbenv

Even better, if you want to switch Ruby versions on-the-fly, you can use [rbenv](https://github.com/rbenv/rbenv). Install with Homebrew using `brew install rbenv ruby-build`

Then, add `eval "$(rbenv init -)"` to your `~/.bash_profile`. Install a Ruby version and set it as the global default like so:

```
rbenv install 2.6.2
rbenv global 2.6.2
```

Check to make sure everything is set up by running the following (the `$` symbol represents the prompt):
```
$ rbenv versions
  system
* 2.6.2 (set by /home/<me>/.rbenv/version)
$ ruby -e "puts 'Hello Ruby'"
Hello Ruby
```

That's it! Head back to the "get started" guide and [write your first 2D app »](/learn/get-started)
