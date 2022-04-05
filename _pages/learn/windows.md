---
title: Ruby 2D on Windows
description: Learn how to set up your Ruby environment on Windows
layout: learn
---

While there are several ways to get Ruby on Windows, we recommend using the latest [RubyInstaller for Windows](https://rubyinstaller.org). To get started...

1. Go to the [RubyInstaller download page](https://rubyinstaller.org/downloads) and download the latest **Ruby+Devkit (x64)** version 3.1 or newer.

2. Run the installer (leaving the default options is fine). When finished installing, keep the `Run 'ridk install'` option selected to install MSYS2 and the development toolchain.

3. When prompted for "Which components shall be installed", just press "enter" to install everything needed. When finished installing, press "enter" again to quit.

To start using Ruby, we also recommend the new [Windows Terminal](https://docs.microsoft.com/en-us/windows/terminal/), which is easy to set up and provides access to multiple shells all in one view. You can [download it here](https://aka.ms/terminal) from the Microsoft Store for free.

After installing, open Windows Terminal and click the drop-down icon (`˅`) and select `Settings`. Click `+ Add a new profile` then `+ New empty profile`. Enter a name for the profile, like `Ruby` or whatever you like. For `Command line`, enter this text:

```
C:\Ruby31-x64\msys64\msys2_shell.cmd -defterm -here -no-start -ucrt64
```

(If you installed Ruby in a different location, update the path accordingly.) You can also set the `Starting directory` to anything you like, but we recommend just unchecking the box `Use parent process directory`, then `%USERPROFILE%` should appear. The rest of the fields are optional. Click `Save`.

{% include warning.html icon="💡" message="If you want this Ruby profile to be the default one when you open Windows Terminal, in <code>Settings</code>, click <code>Startup</code> and under <code>Default profile</code>, select the  profile you just created. Click <code>Save</code>." %}

Now, click the drop-down icon (`˅`) again and select your new Ruby profile. You should see a new tab open with a prompt that looks something like this:

<pre><code style="background: black; color: white;"><span style="color: limegreen;">Me@DESKTOP-PB7BDLT</span> <span style="color: #cc00cc;">UCRT64</span> <span style="color: gold;">/c/Users/Me</span>
$
</code></pre>

To give the shell access to Ruby, run the following command:

<pre><code style="background: black; color: white;">echo 'export PATH=$PATH:/c/Ruby31-x64/bin' >> ~/.bash_profile</code></pre>

(Again, if you installed Ruby in a different location, you'll need to update this directory path.) Run `source ~/.bash_profile` to make that change take effect in the current shell. Check to make sure Ruby is ready to go by running `ruby -v`. You should see Ruby print its version number and other information, like this:

<pre><code style="background: black; color: white;">$ ruby -v
ruby 3.1.1p18 (2022-02-18 revision 53f5fc4236) [x64-mingw-ucrt]
</code></pre>

That's it! You're ready to install the gem and [write your first 2D app »](/learn/get-started)
