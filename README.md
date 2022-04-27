# Project Title

A simple training app used for the purposes of on-boarding new developers at WP Engine

## Description

This app is a blogging platform which contains articles. The app will build up many articles over it’s lifetime. To
assist in organising this content, we want to implement an automatic archive system. This will keep the content
organised and easy to browse.

## Getting Started

Ensure `rvm` is installed and install ruby 2.7.4 using `rvm install 2.7.4`\
This project uses postgresql so make sure to run `brew install postgresql` on your machine.

### Dependencies

* actioncable (6.0.4.7)
* actionmailbox (6.0.4.7)
* actionmailer (6.0.4.7)
* actionpack (6.0.4.7)
* actiontext (6.0.4.7)
* actionview (6.0.4.7)
* activejob (6.0.4.7)
* activemodel (6.0.4.7)
* activerecord (6.0.4.7)
* activestorage (6.0.4.7)
* activesupport (6.0.4.7)
* addressable (2.8.0)
* bindex (0.8.1)
* bootsnap (1.11.1)
* builder (3.2.4)
* capybara (3.36.0)
* childprocess (4.1.0)
* concurrent-ruby (1.1.10)
* connection_pool (2.2.5)
* crass (1.0.6)
* debug (1.5.0)
* diff-lcs (1.5.0)
* erubi (1.10.0)
* execjs (2.8.1)
* globalid (1.0.0)
* i18n (1.10.0)
* importmap-rails (1.0.3)
* io-console (0.5.11)
* irb (1.4.1)
* jbuilder (2.11.5)
* loofah (2.16.0)
* mail (2.7.1)
* marcel (1.0.2)
* matrix (0.4.2)
* method_source (1.0.0)
* mini_mime (1.1.2)
* mini_portile2 (2.8.0)
* minitest (5.15.0)
* msgpack (1.5.1)
* nio4r (2.5.8)
* nokogiri (1.13.4)
* pg (1.3.5)
* public_suffix (4.0.7)
* puma (5.6.4)
* racc (1.6.0)
* rack (2.2.3)
* rack-proxy (0.7.2)
* rack-test (1.1.0)
* rails (6.0.4.7)
* rails-dom-testing (2.0.3)
* rails-html-sanitizer (1.4.2)
* railties (6.0.4.7)
* rainbow (3.1.1)
* rake (13.0.6)
* react_on_rails (13.0.0)
* regexp_parser (2.3.1)
* reline (0.3.1)
* rexml (3.2.5)
* rspec-core (3.11.0)
* rspec-expectations (3.11.0)
* rspec-mocks (3.11.1)
* rspec-rails (5.0.3)
* rspec-support (3.11.0)
* rubyzip (2.3.2)
* selenium-webdriver (4.1.0)
* semantic_range (3.0.0)
* sprockets (4.0.3)
* sprockets-rails (3.4.2)
* stimulus-rails (1.0.4)
* thor (1.2.1)
* thread_safe (0.3.6)
* turbo-rails (1.0.1)
* tzinfo (1.2.9)
* web-console (4.2.0)
* webdrivers (5.0.0)
* webpacker (5.4.3)
* websocket-driver (0.7.5)
* websocket-extensions (0.1.5)
* xpath (3.2.0)
* zeitwerk (2.5.4)

dependencies:

* @babel/preset-react: 7.16.7,
* @rails/webpacker: 5.4.3,
* babel-plugin-macros: 3.1.0,
* babel-plugin-transform-react-remove-prop-types: 0.4.24,
* css-loader: 5.2.7,
* css-minimizer-webpack-plugin: 3.4.1,
* mini-css-extract-plugin: 2.6.0,
* prop-types: 15.8.1,
* react: 18.0.0,
* react-dom: 18.0.0,
* react-on-rails: 13.0.0,
* style-loader: 2.0.0

devDependencies:

* @pmmmwh/react-refresh-webpack-plugin: 0.5.5
* @testing-library/dom: 8.13.0
* @testing-library/react: 13.1.1
* cypress: 9.6.0
* react-refresh: 0.12.0
* webpack: 4.46.0
* webpack-cli: 3.3.12
* webpack-dev-server: 3

### Installing

* TODO

### Executing program


`bundle install`\
`rails s`

## Troubleshooting

If you're using a MacBook with the M1 chip, you may run into some architecture errors. Try \

* `arch -x86_64 /bin/zsh` or `arch -arm64 /bin/zsh`.\
* You can also trying prefixing your `brew commands` with `arch -x86_64 brew ...`
* `brew doctor` should return `Your system is ready to brew`

## Authors

Contributors names and contact info

Jonathon Yamada\
email: jonathon.yamada@wpengine.com

## Version History

* 0.1
    * Initial Release

## License

This project is not licensed

## Acknowledgments

* [awesome-readme-template](https://gist.github.com/DomPizzie/7a5ff55ffa9081f2de27c315f5018afc)
