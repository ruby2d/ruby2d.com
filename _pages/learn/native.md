---
title: Native
subtitle: Learn how to build a native executable of your app
next_topic: web
layout: learn
---

{% include warning.html icon="⚠️" message="<b>Warning:</b> This is experimental! You can try it out, but it may not work well." %}

Ruby programs are simply text files that can be run by a Ruby interpreter, like [MRI / CRuby](https://en.wikipedia.org/wiki/Ruby_MRI). Did you know you can also compile your programs to native code using MRuby.

First, you'll need to install MRuby:

- On **macOS**, we recommend using [Homebrew](https://brew.sh) to install MRuby and Simple 2D:
```
brew install mruby
brew tap simple2d/tap
brew install simple2d
```

- On **Linux**, use your package manager:
  ```bash
  # Ubuntu, Debian, and Mint
  sudo apt install mruby libmruby-dev

  # Other Linux distributions, search your package manager
  ```
  If your distribution, doesn't have an MRuby package, compile and install [from source](https://github.com/mruby/mruby) instead.
  Next, install Simple 2D using [these instructions](https://github.com/simple2d/simple2d#on-linux).

- On **Windows**, we don't yet have instructions, but we're working on it!

With MRuby installed, using the "Hello Triangle" script you wrote above, run the following to build a native and web-based version of the app:

```
ruby2d build <options> app.rb
```

Here are all the options you can set:

| Option          | Description |
|-----------------|-------------|
| `--native`      | Compile and create a native executable file. |
| `--web`         | Build for the web. (This feature is currently disabled while it is being upgraded.) |
| `--macos`       | Create a MacOS app bundle.  |
| `--ios`         | Create an iOS app. |
| `--tvos`        | Create a tvOS app. |
| `--all`         | Build for every platform supported by the current system. |
| `--clean`       | Clean up the build directory. |
| `--debug`       | Print debugging info and keep all intermediate files generated. |

Notice a `build/` directory was created containing an executable named either `app` on Unix-like systems, or `app.exe` on Windows.

The executable is a compiled, native version of your app. It can run on any system, similar to the one you built it on, without the need for the full Ruby interpreter to be present. Let's try running the native app on the command line:

```bash
# Enter the `build/` directory
cd build

# Run on Unix-like systems
./app

# Run on Windows
app.exe
```

### Limitations
The MRuby compiler does not support gems other than Ruby2D being included by `require`. It also does not support `load`.

Continue to the [next topic »](/learn/{{ page.next_topic }})
