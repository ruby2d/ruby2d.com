---
title: Ruby 2D on macOS
description: Learn how to set up your Ruby environment on the Mac
layout: learn
---

macOS comes with a system Ruby, but it doesn't have the development libraries needed to build native extensions. No problem though, we can use [Homebrew](https://brew.sh) to get a proper Ruby environment set up in no time.

# Install rbenv with Homebrew

If you don't already have Homebrew, head over to [brew.sh](https://brew.sh) and follow the install instructions. Once that's ready, install [rbenv](https://github.com/rbenv/rbenv) (a lightweight Ruby version manager) using:

```
brew install rbenv
```

Next, run the init command to set up rbenv in your shell:

```
rbenv init
```

This will print instructions for adding rbenv to your shell profile. Follow those steps, then restart your terminal (or open a new tab) so the changes take effect.

# Install Ruby

Now you can install Ruby and set it as your default. Version {{ site.ruby_version }} is the latest as we write this, and `rbenv install -l` will show you the newest available:

```
rbenv install {{ site.ruby_version }}
rbenv global {{ site.ruby_version }}
```

Check to make sure everything works (the `$` symbol represents the prompt):

```
$ ruby -e "puts 'Hello Ruby'"
Hello Ruby
```

That's it! Head back to the "get started" guide and [write your first 2D app »](/learn/get-started)
