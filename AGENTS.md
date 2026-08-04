# Writing for `_pages/learn/`

The learn articles are a friendly guide, not a reference manual. Match the voice of the surrounding pages when editing or adding content.

## Tone

- Conversational and warm — write like you're explaining something to a friend. "You," "we," "let's," and contractions all belong here.
- Joyful in small doses. A well-placed aside ("one of the few infinite loops you'll encounter that isn't a mistake", "Feeling lucky?") is great; forced enthusiasm isn't.
- Explain *why* before *how*. Motivation in plain language, then the code.
- Anticipate the reader. If something might feel odd, name it before they have to.
- Metaphors help when they're concrete — the update loop has a "heartbeat," `request_render` gives the window a "nudge."

## What to steer away from

- Spec-speak ("Valid values are...", "This method returns..."). Rephrase as something a person would say.
- Front-loaded caveats. Lead with what works; gotchas go at the end under a gentle heading like "A few things to know."
- Summary wrap-ups. End on the next-topic link, not a recap.
- Em dash overuse. A single well-placed dash lands a beat; a page peppered with them reads as a tic (and a tell of AI writing). Reach for commas, colons, periods, and parentheses first, and keep a dash only where it genuinely earns the pause.

## Conventions

- Section headings are `#` (H1), subsections `##`. Unusual, but consistent across the directory.
- Show code early and keep examples focused on one idea at a time.
- Tables are fine — and the one place terse language is welcome — for attribute and parameter reference.
- End with `Continue to the [next topic ▸](/learn/{{ page.next_topic }})` when `next_topic` is set.

When in doubt, read a neighboring article and trust your ear. If it sounds like a person talking, you're there.
