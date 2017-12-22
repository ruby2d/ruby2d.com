---
title: Ruby 2D on Windows
subtitle: Learn how to set up your environment and install dependencies
layout: learn
---

{% include warning.html icon="🚧" message="This page is a work in progress!" %}

# Requirements

Ruby 2D works with 64-bit Windows and is tested on the latest releases of Windows 10, but will probably work with previous versions as well. Although there are several ways to install Ruby on Windows, Ruby 2D needs a [MinGW](http://www.mingw.org) environment to run. We recommend using the [RubyInstaller for Windows](https://rubyinstaller.org) to install Ruby, which is built with MinGW.

If you don't yet have Ruby installed, follow the instructions below. Otherwise, skip ahead to the next section.

# Installing Ruby

1. Download and install [RubyInstaller for Windows](https://rubyinstaller.org/downloads). This must be an `x64` version — here's a direct link to download the latest release, [Ruby 2.3.3 (x64)](https://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.3.3-x64.exe). When choosing an install path, we recommend something simple, like `C:\ruby`
![RubyInstaller](/assets/img/rubyinstaller.png)

2. Download and install the corresponding RubyInstaller Development Kit (DevKit), also available on the [downloads page](https://rubyinstaller.org/downloads). Here's a direct link to download the [Ruby 2.0 x64 DevKit](https://dl.bintray.com/oneclick/rubyinstaller/DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe). Extract it to a simple place, like `C:\devkit`
![RubyInstaller DevKit](/assets/img/devkit-1.png)

3. Open the Ruby command prompt (find it by searching for "Start Command Prompt with Ruby") and enter the DevKit directory, for example with `cd C:\devkit`

4. Initialize and install the DevKit by running:
```
ruby dk.rb init
ruby dk.rb install
```

5. To add MinGW tools to your command prompt, run the `devkitvars.bat` script, for example using `C:\devkit\devkitvars.bat`

6. Add `/usr/local/bin` to your path, for example by running:
```
set PATH=%PATH%;c:\devkit\local\bin
```

For additional help with the DevKit, see the [RubyInstaller wiki](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit).

<!--  
new windows instructions

1. Go to [RubyInstaller download page](https://rubyinstaller.org/downloads) and download the [latest 64-bit release](https://github.com/oneclick/rubyinstaller2/releases/download/rubyinstaller-2.4.2-2/rubyinstaller-2.4.2-2-x64.exe)

2. Run the installer, default options.

3. Keep option selected to run "ridk install" to install MSYS2 and development toolchain.

4. When prompted for the components to install, just press "enter".

5. When prompted to install MSYS2, leave default options and click "next" and "install"
-->

# Installing Simple 2D

1. Download the [latest release](https://github.com/simple2d/simple2d/releases/latest) of the Simple 2D Windows installer for MinGW.

2. Extract the contents the `.zip` file, for example by right clicking and selecting "Extract All...".

3. In the Ruby command prompt, `cd` into the extracted directory and run `bash install.sh` and follow the instructions to install Simple 2D.

You're now ready to head back to the "get started" guide to [install the gem »](/learn/get-started/#install-the-gem)
