---
title: Technical Architecture
permalink: /learn/tech/
---

{% include warning.html icon="⚠️" message="In progress! This page will contain details on the technical implementation." %}

In interpreted and native modes, Ruby 2D uses [Simple 2D](https://github.com/simple2d), an open-source graphics engine written in C. Everything is rendered in OpenGL or OpenGLES depending on the platform.

| Your App                                                 |
| :------------------------------------------------------: |
| Ruby 2D                                                  |
| Simple 2D                                                |
| OpenGL / GLES                                            |
| [Simple DirectMedia Layer (SDL)](https://www.libsdl.org) |
| Operating System                                         |
| Hardware                                                 |

On the web...

| Your App                                                 |
| :------------------------------------------------------: |
| Ruby 2D                                                  |
| Simple2D.js                                              |
| WebGL                                                    |
| Browser                                                  |
| Operating System                                         |
| Hardware                                                 |
