---
title: Native
description: Learn how to build a native executable of your app
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

- On **Windows**, There are more ways to compile:  1. using **gcc.exe** (mingw) or 2. using **cl.exe** (MSVC). Now I explain only the 2. method

     ❕ 🔧 In Windows you have to downolad Visual Studio with 'Build Tools for Visual Studio c/c++'.

  - <ins>Building using CL.exe:</ins>
  1. **Download the dependencies (mruby and simple2d) from their page.** Links:  
  <u>https://github.com/simple2d/simple2d</u>  
  <u>https://mruby.org/downloads/</u>  
  _Important: you should download the visual c++ source in the Latest release (currently 1.2.0) tab in simple2d. As for mruby (current version: 3.0.0) luckily, the source code contains both the code for mingw and msvc build._
    
  2. **Build the source codes**  
  Firstly, _mruby_:  
  ``` bash
  # 1. unpack the zip file
  # 2. open 'x64 Native Tools Command Prompt for VS' and navigate to the mruby project root
  # 3. in the project root navigate to build_config\ 
  cd build_config
  # 4. Search for a file, named default.rb, open it with a text editor.
  # 5. find a code line that looks like this: 
  conf.toolchain
  # 6. modify it to: 
  conf.toolchain :visualcpp
  # 7. save the file, close it and navigate back to the project root with cd
  cd .. 
  # 8. build mruby
  rake -v
  # 9. Lastly after the compillation succeded, add the newly created bin/ folder's path to the PATH env-variable. In my case it looks like this: (you may have sth different):
  C:\Users\wapper\Documents\libs\ruby2d_compillation\mruby-3.0.0\bin
  ```
  If everything went well, by typing ``mruby -v`` you sould get sth like this message:  
  ```
  mruby 3.0.0 (2021-03-05)
  ```
  As for Simple2d, it's already been built so we just have to unzip the file. 

  3. **Creating the `build` folder**  
  The purpose of this folder is to contain all the neccesarry files that are required for the build. You have to assemble this folder once then just copy it to your different project's root directories and you can compille your app thereafter. That simple 😁.
  - So the folder's structure: 

  <br>

  <img style="margin-bottom:-2rem; width: 100%; max-width: 752px" src="/assets/img/learn/build_folder_hierarchy.jpg">
   
  <br><br>

  - Firstly, into `includes/` copy these file(s)/folder(s): 

  <br>

  ```
  1. the whole mruby's inlcude-folder's content 
  2. from the root of simple2d:
   - simple2d.h
   - glew.h
   - SDL2 (the whole folder).
  3. lastly copy the ruby2d.h file. For me, (you may have a different one) it is located in path_to_your_ruby\ruby\Ruby30-x64\lib\ruby\gems\3.0.0\gems\ruby2d-0.10.0\ext\ruby2d\ruby2d.h
  ```

  <br>

  if you did it well, you should get this result in the `includes/` folder:  

  <br>

  <img style="margin-bottom:-2rem; width: 100%; max-width: 752px" src="/assets/img/learn/build_includes.jpg">
  
  <br>
  <br>
  <br>

  - Secondly, into `libs/` copy these file(s) / folder(s):

  <br>
  
  ```
  1. from the root of simple2d:
    - simple2d.lib
  2. from path_to_mruby\mruby-3.0.0\build\host\lib\:
    - libmruby.flags.mak
    - libmruby.lib
    - libmruby_core.lib
  ```

  if you did it well, you should get this result in the `libs/` folder: 

  <img style="margin-bottom:-2rem; width: 100%; max-width: 752px" src="/assets/img/learn/build_libs.jpg">  

  <br>
  <br>
  <br>

  - Thirdly, into `dlls/` copy these file(s) / folder(s):

  <br>

  ```
  from the root of simple2d:
    - all *.dll files
  ```
  
  if you did it well, you should get this result in the `dlls/` folder: 

  <img style="margin-bottom:-2rem; width: 100%; max-width: 752px" src="/assets/img/learn/build_dlls.jpg">  

  <br>
  <br>
  <br>

  - Lastly, copy the entire `ruby2d-0.10.0/ext/ruby2d/` dir's content to the root of the build directory. You can find them in (you may have different path) `path_to_ruby\ruby\Ruby30-x64\lib\ruby\gems\3.0.0\gems\ruby2d-0.10.0\ext\ruby2d\`  

  <br>

  if you did it well, you should get this final result in the `build/` folder: 

  <video width="100%" class="sprite-video" src="/assets/img/learn/build_folder_finally.mp4" autoplay loop muted playsinline></video>

  4. **Last step: Hack the build.rb file**  
  The default `build.rb` file that we're going to use when compilling the app is not designed for msvc building so we have to replace it with a hacked one:  
  https://pastebin.com/6MceGEhJ  
  Replace the old build.rb with the hacked one above. The replaceable file location is at:  
  (you may have different path) `path_to_ruby\ruby\Ruby30-x64\lib\ruby\gems\3.0.0\gems\ruby2d-0.10.0\lib\ruby2d\cli\build.rb`  
  <br>
  With that modification we changed the build command. In the new build.rb file at line 113, you can actually modify that command. For instance, specify the program type (with console window or without console) with  
  `/SUBSYSTEM:CONSOLE`  or
  `/SUBSYSTEM:WINDOWS`.  
  Or you can even add .rc information file containing name, version, logo, copright, author, etc.. to your executable. More about .rc files on https://docs.microsoft.com/en-us/cpp/windows/resource-files-visual-studio?view=msvc-160

  <br>

  Now we are able to compile our executable. Don't forget to copy this `build\` folder that we have just made into the source dir where your program's entry - like main.rb - are located.

<br>

Using the "Hello Triangle" script you wrote above, run the following to build a native version of the app: (in windows use **x64 Native Command Prompt for VS** as your command line)

```
ruby2d build --native app.rb
```

(Only in Unix) Notice a `build/` directory was created containing an executable named either `app`. In Windows, app.exe can be found in the project root

The executable is a compiled, native version of your app. It can run on any system, similar to the one you built it on, without the need for the full Ruby interpreter to be present. Let's try running the native app on the command line:

```bash
# Enter the `build/` directory
cd build

# Run on Unix-like systems
./app

# Run on Windows
app.exe
```

If something isn't working or you just have some questions, feel free to join on Discord 😁 . 

Continue to the [next topic ▸](/learn/{{ page.next_topic }})
