---
title: Ruby 2D on Windows
subtitle: Learn how to set up your environment and install dependencies
layout: learn
---

Ruby 2D works with 64-bit Windows and is tested on the latest releases of Windows 10, but will probably work with previous versions as well. While there are several ways to get Ruby on Windows, Ruby 2D requires a [MinGW](https://en.wikipedia.org/wiki/MinGW) environment. We recommend using the latest [RubyInstaller for Windows](https://rubyinstaller.org), which is based on [MSYS2](http://www.msys2.org) (the Ruby 2.3 and older installer with DevKit is no longer supported). You can download and run the installer, or use [Chocolatey](https://chocolatey.org) to get Ruby and MSYS2 — instructions for both follow. If you already have Ruby installed, skip ahead to the next section.

# Installing Ruby

**To use the RubyInstaller...**

1. Go to [RubyInstaller download page](https://rubyinstaller.org/downloads) and download the latest 64-bit release (the one with `x64` in the name).

2. Run the installer (leaving the default options is fine).

3. When the installer is done, keep the "Run ridk install" option selected to install MSYS2 and the development toolchain and click "Finish".

4. When prompted for "Which components shall be installed", just press "enter".

5. When prompted with the MSYS2 Setup, leave the default options and keep clicking "Next", and then "Install". No need to "Run MSYS2 now" when finished.

6. Add Ruby to your MinGW environment, for example by adding `export PATH=$PATH:/c/Ruby25-x64/bin` (your Ruby directory might differ) to your `~/.bash_profile` (which will be in `C:\msys64\home\your_user_name`).

**To install Ruby using Chocolatey...**

1. [Install Chocolatey](https://chocolatey.org/install).

2. Install the [Ruby package](https://chocolatey.org/packages/ruby) using `choco install ruby`

3. Install the [MSYS2 package](https://chocolatey.org/packages/msys2) using `choco install msys2`

4. Add Ruby to your MinGW environment, for example by adding `export PATH=$PATH:/c/tools/ruby25/bin` (your Ruby directory might differ) to your `~/.bash_profile` (which will be in `C:\tools\msys64\home\your_user_name`).

5. To be able to build native Ruby gem extensions, install the MinGW compiler toolchain by opening a MinGW 64-bit command prompt (located at `C:\tools\msys64\mingw64.exe`) and running `pacman -S make mingw-w64-x86_64-gcc`

# Installing Simple 2D

1. Open a MinGW 64-bit command prompt (in the Start menu named "MSYS2 MinGW 64-bit" or at `C:\tools\msys64\mingw64.exe` if using Chocolatey).

2. Paste and run the following snippet to download and install the latest [Simple 2D MinGW release](https://github.com/simple2d/simple2d/releases/latest):
```bash
url='https://raw.githubusercontent.com/simple2d/simple2d/master/bin/simple2d.sh'; which curl > /dev/null && cmd='curl -fsSL' || cmd='wget -qO -'; bash <($cmd $url) install
```

# Using Ruby 2D on Windows

When working with Ruby 2D, make sure to use a MinGW 64-bit command prompt, rather than a standard one (`cmd.exe`) or the "Start Command Prompt with Ruby" found in the Start menu.

That's it! You're now ready to head back to the "get started" guide to [install the gem »](/learn/get-started/#install-the-gem)
