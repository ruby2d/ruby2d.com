---
title: Technical architecture
subtitle: Learn how Ruby 2D is put together
---

<style>
  table th, table td {
    border-width: 3px;
  }
  td {
    text-align: center;
  }
</style>

<table>
  <thead>
    <tr>
      <th colspan="3">Your App</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="3" style="padding: 15px 12px"><a href="https://github.com/ruby2d/ruby2d">Ruby 2D</a>
        <table style="margin: 10px 0 0 0">
          <tr style="border:none">
            <td style="width:200px; border-width:2px"><a href="https://github.com/ruby2d/ruby2d/blob/master/ext/ruby2d/ruby2d.c">Native Extension</a></td>
            <td style="width:11px; padding:0; border:none"></td>
            <td style="width:200px; border-width:2px"><a href="https://github.com/ruby2d/ruby2d/blob/master/ext/ruby2d/ruby2d-opal.rb">Opal Extension</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="width:96px"><a href="https://en.wikipedia.org/wiki/Ruby_MRI">CRuby (MRI)</a></td>
      <td style="width:96px"><a href="http://mruby.org">MRuby</a></td>
      <td><a href="http://opalrb.org">Opal</a></td>
    </tr>
    <tr>
      <td colspan="2" style="padding: 15px 0"><a href="https://github.com/simple2d/simple2d">Simple 2D</a></td>
      <td><a href="https://github.com/simple2d/simple2d.js">Simple2D.js</a></td>
    </tr>
    <tr>
      <td><a href="https://www.libsdl.org">SDL</a><br></td>
      <td><a href="https://www.opengl.org">OpenGL</a><br>2, 3, ES</td>
      <td>Browser (<a href="https://developer.mozilla.org/webgl">WebGL</a>)</td>
    </tr>
    <tr>
      <td colspan="3" style="padding: 15px 12px"><a href="/platforms">Operating System</a></td>
    </tr>
  </tbody>
</table>
