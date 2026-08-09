// Entry point for the vendored editor bundle. `rake editor` bundles this into
// assets/js/prism-editor.js as an IIFE exposing everything below on the global
// `PrismEditor`, which is what assets/try/playground.js mounts.
//
// Only the pieces the playground actually uses are imported. Left out on
// purpose: the search widget (a whole UI and stylesheet for something a
// 40-line example doesn't need), indent guides and invisibles (visual noise),
// tag matching (markup only), and selection-match highlighting.

import { createEditor } from "prism-code-editor"
import {
  editorCommands,
  editHistory,
  defaultKeymap,
  addEditorHotkey,
} from "prism-code-editor/commands"
import { cursorPosition } from "prism-code-editor/cursor"
import { matchBrackets } from "prism-code-editor/match-brackets"
import { highlightBracketPairs } from "prism-code-editor/highlight-brackets"

// The Ruby grammar, then the Ruby editing behavior — comment tokens for
// Cmd+/ and the rules that decide when a new line gets indented.
import "prism-code-editor/prism/languages/ruby"
import "prism-code-editor/languages/ruby"

export {
  createEditor,
  editorCommands,
  editHistory,
  defaultKeymap,
  addEditorHotkey,
  cursorPosition,
  matchBrackets,
  highlightBracketPairs,
}
