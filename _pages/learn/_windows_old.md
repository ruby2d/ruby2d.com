---
title: Ruby 2D on Windows
description: Learn how to set up your environment and install dependencies
layout: learn
---

Ruby 2D works with 64-bit Windows and is tested on the latest releases of Windows 10, but will probably work with previous versions as well. While there are several ways to get Ruby on Windows, Ruby 2D requires a [MinGW](https://en.wikipedia.org/wiki/MinGW) environment. We recommend using the latest [RubyInstaller for Windows](https://rubyinstaller.org), which is based on [MSYS2](http://www.msys2.org) (the Ruby 2.3 and older installers are no longer supported). You can download and run the installer, or use [Chocolatey](https://chocolatey.org) to get Ruby and MSYS2 — instructions for both are below. If you already have Ruby installed, [skip ahead](#install-simple-2d) to the next section.

Show instructions for: <a id="rubyinstaller-link" href="javascript:showRubyInstaller()">RubyInstaller (recommended)</a> or <a id="chocolatey-link" href="javascript:showChocolatey()">Chocolatey</a>

# Install Ruby

<div class="rubyinstaller" markdown="1">

1. Go to [RubyInstaller download page](https://rubyinstaller.org/downloads) and download the latest Ruby+Devkit 64-bit release (the one with `x64` in the name).

2. Run the installer (leaving the default options is fine). When finished installing, keep the "Run 'ridk install'" option selected to install MSYS2 and the development toolchain.

3. When prompted for "Which components shall be installed", just press "enter" to install all of them. When finished installing, press "enter" again to quit.

4. Add Ruby to your MinGW environment, for example by running the following in a MinGW 64-bit command prompt (usually located at `C:\Ruby26-x64\msys64\mingw64.exe` — your Ruby directory might differ):
```
$ echo 'export PATH=$PATH:/c/Ruby26-x64/bin' >> ~/.bash_profile
```
At this time, you might want to create a convenient shortcut to the `mingw64.exe` shell.

5. To get access to Ruby in the current shell, run `source ~/.bash_profile`. Ruby should now be available for this and all new shells. Try running `ruby --version` to check.

</div>

<div class="chocolatey" markdown="1">

1. [Install Chocolatey](https://chocolatey.org/install).

2. Install the [Ruby package](https://chocolatey.org/packages/ruby) using `choco install ruby`

3. Install the [MSYS2 package](https://chocolatey.org/packages/msys2) using `choco install msys2`

4. Add Ruby to your MSYS2 environment, for example by running:
```
$ echo 'export PATH=$PATH:/c/tools/ruby25/bin' >> ~/.bash_profile
```

5. To be able to build native Ruby gem extensions, install the MinGW compiler toolchain by opening a MinGW 64-bit command prompt (located at `C:\tools\msys64\mingw64.exe`) and running:
```
$ pacman -S make mingw-w64-x86_64-gcc
```
At this time, you might want to create a convenient shortcut to the `mingw64.exe` shell.

</div>

# Install Simple 2D

1. Open a MinGW 64-bit command prompt, if you haven't already. <span class="rubyinstaller">This will be at `C:\Ruby26-x64\msys64\mingw64.exe` (your Ruby directory might differ)</span> <span class="chocolatey">This will be at `C:\tools\msys64\mingw64.exe`</span>

2. Copy, paste, and run the following snippet in the command prompt to download and install the latest [Simple 2D MinGW release](https://github.com/simple2d/simple2d/releases/latest):
```bash
url='https://raw.githubusercontent.com/simple2d/simple2d/master/bin/simple2d.sh'; which curl > /dev/null && cmd='curl -fsSL' || cmd='wget -qO -'; bash <($cmd $url) install
```

# Install Ruby 2D

You're now ready to install the gem! Make sure to use a MinGW 64-bit command prompt as you did when installing Simple 2D above.

```
$ gem install ruby2d
```

{% include warning.html icon="⚠️" message="When working with Ruby 2D, make sure to always use a MinGW 64-bit command prompt, rather than a standard one (cmd.exe) or the \"Start Command Prompt with Ruby\" found in the Start menu." %}

That's it! Head back to the "get started" guide and [write your first 2D app »](/learn/get-started/#writing-your-first-2d-app)


<style>
.active::before {
  content: "👉 ";
}
.active {
  font-weight: bold;
  text-decoration: none;
}
</style>


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
