# GitHub Pages builds this site without jekyll-tailwind, so the generated
# stylesheet is committed as a deploy artifact. It has to be synced *after*
# a build — syncing first would commit the previous build's CSS.
BUILT_CSS = "_site/assets/css/app.css"
DEPLOY_CSS = "assets/css/app.css"

task default: :serve

desc "Build the site and sync the generated CSS for deploy"
task :build do
  abort "build failed" unless system "bundle exec jekyll build --trace"
  abort "no #{BUILT_CSS} — did jekyll-tailwind run?" unless File.exist?(BUILT_CSS)
  FileUtils.cp BUILT_CSS, DEPLOY_CSS
  puts "synced #{DEPLOY_CSS}"
end

desc "Build, sync the deploy CSS, then serve"
task serve: :build do
  system "bundle exec jekyll serve --trace --baseurl \"\" --drafts"
end

task :update do
  system "bundle update --all"
end

# The /try and /examples editor is prism-code-editor, bundled from _build/editor
# and committed the same way as the CSS above: GitHub Pages runs no JavaScript
# build, so the artifact has to be in the repo. Only needs re-running when the
# entry file or the pinned version in _build/editor/package.json changes.
EDITOR_SRC = "_build/editor"
EDITOR_JS  = "assets/js/prism-editor.js"
EDITOR_CSS = "assets/css/prism-editor.css"
EDITOR_PKG = "prism-code-editor"

# Selectors and custom properties that the editor rules in _css/app.css reach
# into. They belong to the library, so a release that renames one takes the
# site's styling with it — and quietly: nothing errors, the rules just stop
# matching and the editor loses its type, colors and gutter. Checked after
# every build so a rename can't pass unnoticed.
EDITOR_CSS_HOOKS = %w[
  .prism-code-editor .pce-line .pce-wrapper show-line-numbers active-bracket
  --pce-bg --pce-cursor --pce-selection --pce-line-number --pce-bg-highlight
  --padding-left --padding-inline --number-spacing
].freeze

def editor_pinned_version
  require "json"
  JSON.parse(File.read("#{EDITOR_SRC}/package.json")).dig("dependencies", EDITOR_PKG)
end

def build_editor_bundle
  abort "node not found — install node to rebuild the editor bundle" unless system "which node > /dev/null 2>&1"
  abort "npm install failed" unless system "cd #{EDITOR_SRC} && npm install --no-audit --no-fund"

  banner = "/* prism-code-editor, bundled for ruby2d.com — do not edit. See _build/editor and `rake editor`. */"
  abort "esbuild failed" unless system <<~SH
    cd #{EDITOR_SRC} && ./node_modules/.bin/esbuild entry.js \
      --bundle --minify --format=iife --global-name=PrismEditor \
      --target=es2019 --banner:js='#{banner}' \
      --outfile=../../#{EDITOR_JS}
  SH

  # The editor's layout stylesheet ships unminified in the package; the token
  # colors live in _css/app.css so they can use the site's syntax palette.
  layout = "#{EDITOR_SRC}/node_modules/prism-code-editor/dist/layout.css"
  abort "no #{layout} — did npm install run?" unless File.exist?(layout)
  File.write EDITOR_CSS, "#{banner}\n#{File.read(layout).strip}\n"

  puts "built #{EDITOR_JS} (#{File.size(EDITOR_JS) / 1024}K) and #{EDITOR_CSS}"
  check_editor_css_hooks
end

def check_editor_css_hooks
  stylesheet = File.read(EDITOR_CSS)
  missing = EDITOR_CSS_HOOKS.reject { |hook| stylesheet.include?(hook) }
  return true if missing.empty?

  warn ""
  warn "!! #{missing.size} of the hooks _css/app.css styles the editor through are gone:"
  missing.each { |hook| warn "     #{hook}" }
  warn "   The build succeeded, so nothing will fail — the editor will just render"
  warn "   unstyled. Check the release notes and update the editor rules in"
  warn "   _css/app.css to match before committing."
  warn ""
  false
end

desc "Rebuild the vendored code editor bundle (needs node)"
task :editor do
  build_editor_bundle
end

namespace :editor do
  desc "Update the editor library to its latest release and rebuild"
  task :update do
    abort "node not found — install node to update the editor" unless system "which node > /dev/null 2>&1"

    was = editor_pinned_version
    # --save-exact because the pin is deliberate: npm would otherwise write a
    # caret range and let the vendored bundle drift from the lockfile.
    abort "npm install failed" unless system "cd #{EDITOR_SRC} && npm install #{EDITOR_PKG}@latest --save-exact --no-audit --no-fund"
    now = editor_pinned_version

    if was == now
      puts "#{EDITOR_PKG} is already at #{now} — nothing to rebuild"
      next
    end

    puts "#{EDITOR_PKG} #{was} → #{now}"
    before = File.size(EDITOR_JS)
    build_editor_bundle
    puts "bundle #{before / 1024}K → #{File.size(EDITOR_JS) / 1024}K"
    puts ""
    puts "Next: `rake build`, then open /try and /examples and check the editor —"
    puts "typing, undo, Cmd+Enter, and the line-number gutter. The gutter rules in"
    puts "_css/app.css work around library behavior and are the most likely to need"
    puts "revisiting; each one says why it exists."
  end
end
