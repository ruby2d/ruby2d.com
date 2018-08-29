---
title: Release testing
layout: article
---

A guide for how to test a release on [macOS](#macos), [Linux](#linux), and [Windows](#windows).

# macOS

From a clean install with latest updates...

Install [Homebrew](https://brew.sh)

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Install Ruby

```bash
# Adapted from https://gist.github.com/blacktm/9191560
brew install rbenv ruby-build

read -d '' String <<"EOF"
# rbenv
eval "$(rbenv init -)"
EOF

echo -e "\n${String}\n" >> ~/.bash_profile

CONFIGURE_OPTS="--disable-install-doc" rbenv install 2.4.1 --verbose

rbenv global 2.4.1

echo "gem: --no-document" > ~/.gemrc

source ~/.bash_profile
```

Install MRuby

```bash
brew install mruby
```

Install Simple 2D

```bash
brew tap simple2d/tap
brew install simple2d
```

Install Ruby 2D and run tests

```bash
cd Desktop/
git clone --recursive https://github.com/ruby2d/ruby2d.git
cd ruby2d/
git checkout v#.#.#-release
gem install bundler
bundle install
rake

for env in mri native web; do
  for test in testcard contains z_index key mouse controller audio; do
    if [[ $test == 'controller' ]]; then continue; fi
    rake test:$env $test
    if [[ $env == 'web' ]]; then
      echo; read -p "Press enter to continue..."
    fi
  done
done
```

# Linux

From a clean install with latest updates...

Install Ruby

```bash
sudo apt install -y git

git clone https://github.com/rbenv/rbenv.git ~/.rbenv

read -d '' String <<"EOF"
# rbenv
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
EOF

echo -e "\n${String}" >> ~/.bashrc
eval "${String}"

git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build

sudo apt update
sudo apt install -y autoconf bison build-essential libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm3 libgdbm-dev

CONFIGURE_OPTS="--disable-install-doc --enable-shared" rbenv install 2.4.1 --verbose

rbenv global 2.4.1

echo "gem: --no-document" > ~/.gemrc

source ~/.bashrc
```

Install MRuby

```bash
sudo apt install mruby libmruby-dev
```

Install Simple 2D

```bash
url='https://raw.githubusercontent.com/simple2d/simple2d/master/bin/simple2d.sh'; which curl > /dev/null && cmd='curl -fsSL' || cmd='wget -qO -'; bash <($cmd $url) install
```

Install Ruby 2D and run tests

```bash
cd Desktop/
git clone --recursive https://github.com/ruby2d/ruby2d.git
cd ruby2d/
git checkout v#.#.#-release
gem install bundler
bundle install
rake

for env in mri native web; do
  for test in testcard contains z_index key mouse controller audio; do
    if [[ $test == 'controller' ]]; then continue; fi
    rake test:$env $test
    if [[ $env == 'web' ]]; then
      echo; read -p "Press enter to continue..."
    fi
  done
done
```

# Windows

From a clean install with latest updates...

1. Follow the Ruby 2D Windows [install instructions](http://www.ruby2d.com/learn/windows)

2. Run the following:

```bash
git clone --recursive https://github.com/ruby2d/ruby2d.git
cd ruby2d/
git checkout v#.#.#-release
gem install bundler
bundle install
rake

for test in testcard contains z_index key mouse controller audio; do
  rake test:mri $test
done
```
