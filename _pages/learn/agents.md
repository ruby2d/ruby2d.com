---
title: Using Ruby 2D with AI coding agents
description: Get the most out of AI coding agents when building with Ruby 2D
layout: learn
---

If you're using Claude, Codex, Cursor, or any other AI coding agent to help you build Ruby 2D apps, this guide will save you (and your agent) some time.

The catch: most coding agents only have fuzzy, out-of-date knowledge of small gems like ours. Left to guess, they'll invent methods that don't exist, or reach for whatever documentation they last saw on the web. The fix is to point them at a reliable reference that lives right on your machine, and we ship one inside the gem.

# The `agents` command

After installing the gem, you have a CLI command tailored specifically for coding agents:

```bash
ruby2d agents
```

This prints a short, agent-friendly help text listing every section of the API reference. Run it yourself once — it's worth seeing what your agent will see.

The reference itself is plain Markdown, which is exactly what coding agents want: easy to read, easy to grep, easy to feed in a piece at a time. And because it ships inside the gem, it always matches the version you have installed: nothing goes out of date, no stale web docs.

# How agents use it

There are three patterns, and the help text walks through all of them:

```bash
ruby2d agents all                  # Print the whole guide
ruby2d agents <section>            # Print one section
ruby2d agents all | grep -i <kw>   # Search across sections
```

Section names are case-insensitive and forgiving. `shapes`, `Shapes`, `getting-started`, `getting started`, and partial matches like `per-object` all resolve to the right section. An agent that's just discovered the command will naturally lean on `grep` when hunting for a keyword, or pull a single section like `ruby2d agents shapes` once it knows what it needs.

The full guide is small (around 60 KB at the time of writing), so most agents are happy to read the whole thing at once. The help text shows the current size when it runs, which is handy if you (or your agent) are mindful of how much you're handing the model.

# Prompting your agent

The simplest, most reliable thing you can add to your prompt is one short sentence:

> Use `ruby2d agents` to learn the API.

That's it. The agent does the rest. It lists sections, picks the relevant ones, greps for what it needs, and writes code against the actual API rather than a guess at it.

You don't strictly *need* to mention it. A capable agent will run `ruby2d` to read the top-level help, see `agents` listed there, and find its way over on its own. But naming the command directly saves a hop and removes some variance, especially with smaller or older models. Think of it as a worth-it nudge for higher-stakes prompts, not something you need to include every time.

# A few things to know

- **The output is plain Markdown, not styled help text.** It's designed to be piped, parsed, or read whole. If you'd rather browse the same content interactively yourself, use `ruby2d usage` instead. Same source, prettier presentation.
- **There's no network call.** The guide lives inside the gem, so this works offline and on locked-down machines. Your agent doesn't need internet access to learn the API.
- **`ruby2d agents` is a great companion to `ruby2d examples`, not a replacement.** Agents do their best work when they can see real, working code too. Use `ruby2d examples list` to see what's bundled, and `ruby2d examples source <name>` to print an example's source straight to stdout, perfect for piping into your agent's context. Pointing your agent at one or two relevant examples alongside the API reference is a winning combination.
