---
title: Ruby 2D on Windows
subtitle: Learn how to set up your Ruby environment on Windows
layout: learn
---

Ruby 2D works with 64-bit Windows and is tested on the latest releases of Windows 10 (but will probably work with previous versions as well). While there are several ways to get Ruby on Windows, Ruby 2D requires a [MinGW](https://en.wikipedia.org/wiki/MinGW) environment. We recommend using the latest [RubyInstaller for Windows](https://rubyinstaller.org), which is based on [MSYS2](http://www.msys2.org) (the Ruby 2.3 and older installers are no longer supported). You can download and run the installer, or use [Chocolatey](https://chocolatey.org) to get Ruby and MSYS2 — instructions for both are below.

Show instructions for: <a id="rubyinstaller-link" href="javascript:showRubyInstaller()">RubyInstaller (recommended)</a> or <a id="chocolatey-link" href="javascript:showChocolatey()">Chocolatey</a>

## Install Ruby

<div class="rubyinstaller" markdown="1">

1. Go to [RubyInstaller download page](https://rubyinstaller.org/downloads) and download the latest Ruby+Devkit 64-bit release (the one with `x64` in the name).

2. Run the installer (leaving the default options is fine). When finished installing, keep the "Run 'ridk install'" option selected to install MSYS2 and the development toolchain.

3. When prompted for "Which components shall be installed", just press "enter" to install all of them. When finished installing, press "enter" again to quit.

</div>

<div class="chocolatey" markdown="1">

1. [Install Chocolatey](https://chocolatey.org/install).

2. Install the [Ruby](https://chocolatey.org/packages/ruby) and [MSYS2](https://chocolatey.org/packages/msys2) packages with `choco install ruby msys2`

3. To be able to build native gem extensions, install the MinGW compiler toolchain by opening a MinGW 64-bit command prompt (located at `C:\tools\msys64\mingw64.exe`) and running:
```
pacman -S make mingw-w64-x86_64-gcc
```

</div>

## Launching Ruby

There are a couple ways to launch a Ruby environment:

- **For a traditional command prompt (`cmd.exe`) experience**, choose the "Start Command Prompt with Ruby" shortcut from the Start menu.

<div class="rubyinstaller" markdown="1">
- **For a Bash-like experience**, use a MinGW 64-bit command prompt from `C:\Ruby26-x64\msys64\mingw64.exe` (your Ruby directory might differ based on the version you installed). Make sure to add `ruby` to your `$PATH` variable, for example by running the following (again, your Ruby directory might be different):
  ```
  echo 'export PATH=$PATH:/c/Ruby26-x64/bin' >> ~/.bash_profile
  ```
  To get access to Ruby in the current shell, run `source ~/.bash_profile`. Ruby should now be available for this and all new shells. Try running `ruby --version` to check. At this time, you might also want to create a convenient shortcut to the `mingw64.exe` shell.
</div>
<div class="chocolatey" markdown="1">
- **For a Bash-like experience**, use a MinGW 64-bit command prompt from `C:\tools\msys64\mingw64.exe`. Make sure to add `ruby` to your `$PATH` variable, for example by running the following (your Ruby directory might be different):
  ```
  echo 'export PATH=$PATH:/c/tools/ruby26/bin' >> ~/.bash_profile
  ```
  To get access to Ruby in the current shell, run `source ~/.bash_profile`. Ruby should now be available for this and all new shells. Try running `ruby --version` to check. At this time, you might also want to create a convenient shortcut to the `mingw64.exe` shell.
</div>

That's it! Head back to the "get started" guide and [write your first 2D app »](/learn/get-started)

<script>

function hideAll() {
  var classes = document.querySelectorAll('.rubyinstaller, .chocolatey'),
    i = 0,
    l = classes.length;

  for (i; i < l; i++) {
    classes[i].style.display = 'none';
  }

  document.getElementById('rubyinstaller-link').classList.remove('active');
  document.getElementById('chocolatey-link').classList.remove('active');
}

function showRubyInstaller() {
  hideAll();
  var classes = document.querySelectorAll('.rubyinstaller'),
    i = 0,
    l = classes.length;

  for (i; i < l; i++) {
    classes[i].style.display = 'block';
  }

  document.getElementById('rubyinstaller-link').classList.add('active');
}

function showChocolatey() {
  hideAll();
  var classes = document.querySelectorAll('.chocolatey'),
    i = 0,
    l = classes.length;

  for (i; i < l; i++) {
    classes[i].style.display = 'block';
  }

  document.getElementById('chocolatey-link').classList.add('active');
}

showRubyInstaller();

</script>
