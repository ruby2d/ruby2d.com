---
title: Ruby 2D on Windows
description: Learn how to set up your Ruby environment on Windows
layout: learn
---

The easiest way to get Ruby on Windows is with [RubyInstaller](https://rubyinstaller.org). Here's how to get set up.

# Install Ruby

1. Go to the [RubyInstaller download page](https://rubyinstaller.org/downloads) and download the latest **Ruby+Devkit** version (4.0 or newer). Choose the **x64** or **arm** installer depending on your system.

2. Run the installer (the default options are fine). When the installer finishes, it will open a terminal and ask "Which components shall be installed?" Enter `1,2,3` to update everything, then press enter again when it's finished.

3. After the install completes, the installer will recommend opening a Ruby-enabled terminal. Go ahead and use that to start working with Ruby right away.

Check to make sure everything works (the `$` symbol represents the prompt):

```
$ ruby -e "puts 'Hello Ruby'"
Hello Ruby
```

That's it! You're ready to install the gem and [write your first 2D app »](/learn/get-started)
