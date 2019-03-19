---
title: home
permalink: /
---

<div class="home-banner bg-ruby-red">
  <img src="/assets/img/logo.svg">
  <h1>Ruby 2D</h1>
  <h2>Make cross-platform 2D applications in Ruby</h2>
</div>

<div class="dt-ns dt--fixed-ns mv2 center mw8">
  <div class="dtc-ns tc pv4 ph3">
    <img width="85" src="/assets/img/feat1.svg">
    <h1 class="mv2 fw4">Interpreted</h1>
    <p class="mv1">Write your app as a classic Ruby script, just like you're used to.</p>
  </div>
  <div class="dtc-ns tc pv4 ph3">
    <img width="85" src="/assets/img/feat2.svg">
    <h1 class="mv2 fw4">Native</h1>
    <p class="mv1">Compile your app to native code and run on any device.</p>
  </div>
  <div class="dtc-ns tc pv4 ph3">
    <img width="85" src="/assets/img/feat3.svg">
    <h1 class="mv2 fw4">Web</h1>
    <p class="mv1">Build your app for the web using WebAssembly (coming soon).</p>
  </div>
</div>

<div class="pv3 ph2 tc bg-white bt bb bw1 b--tan-dark">
  <a class="link f2 underline-hover" href="/learn/get-started">Get started »</a>
  <p class="mv2 f4">Install the gem, read the guides, and <a href="/showcase">see what you can build!</a></p>
</div>

<div class="mt4 mw65 ph2 center" markdown="1">
With Ruby 2D, you can create 2D applications, games, and visualizations with ease. Just a few lines of code is enough to get you started.

```ruby
require 'ruby2d'

# Set the window size
set width: 300, height: 200

# Create a new shape
s = Square.new

# Give it some color
s.color = 'red'

# Show the window
show
```
</div>
