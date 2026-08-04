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
