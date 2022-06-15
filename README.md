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

* actioncable (6.0.4.8)
* actionmailbox (6.0.4.8)
* actionmailer (6.0.4.8)
* actionpack (6.0.4.8)
* actiontext (6.0.4.8)
* actionview (6.0.4.8)
* activejob (6.0.4.8)
* activemodel (6.0.4.8)
* activerecord (6.0.4.8)
* activestorage (6.0.4.8)
* activesupport (6.0.4.8)
* addressable (2.8.0)
* bindex (0.8.1)
* bootsnap (1.11.1)
* builder (3.2.4)
* capybara (3.36.0)
* childprocess (4.1.0)
* coderay (1.1.3)
* concurrent-ruby (1.1.10)
* connection_pool (2.2.5)
* crass (1.0.6)
* debug (1.5.0)
* diff-lcs (1.5.0)
* erubi (1.10.0)
* execjs (2.8.1)
* factory_bot (4.10.0)
* factory_bot_rails (4.10.0)
* ffi (1.15.5)
* formatador (1.1.0)
* globalid (1.0.0)
* guard (2.18.0)
* guard-compat (1.2.1)
* guard-rspec (4.7.3)
* i18n (1.10.0)
* importmap-rails (1.0.3)
* io-console (0.5.11)
* irb (1.4.1)
* jbuilder (2.11.5)
* listen (3.7.1)
* loofah (2.18.0)
* lumberjack (1.2.8)
* mail (2.7.1)
* marcel (1.0.2)
* matrix (0.4.2)
* method_source (1.0.0)
* mini_mime (1.1.2)
* mini_portile2 (2.8.0)
* minitest (5.15.0)
* msgpack (1.5.1)
* nenv (0.3.0)
* nio4r (2.5.8)
* nokogiri (1.13.6)
* notiffany (0.1.3)
* pg (1.3.5)
* pry (0.14.1)
* public_suffix (4.0.7)
* puma (5.6.4)
* racc (1.6.0)
* rack (2.2.3.1)
* rack-proxy (0.7.2)
* rack-test (1.1.0)
* rails (6.0.4.8)
* rails-dom-testing (2.0.3)
* rails-html-sanitizer (1.4.2)
* railties (6.0.4.8)
* rainbow (3.1.1)
* rake (13.0.6)
* rb-fsevent (0.11.1)
* rb-inotify (0.10.1)
* react_on_rails (13.0.0)
* regexp_parser (2.3.1)
* reline (0.3.1)
* rexml (3.2.5)
* rspec (3.11.0)
* rspec-core (3.11.0)
* rspec-expectations (3.11.0)
* rspec-mocks (3.11.1)
* rspec-rails (5.0.3)
* rspec-support (3.11.0)
* rubyzip (2.3.2)
* selenium-webdriver (4.1.0)
* semantic_range (3.0.0)
* shakapacker (6.3.0)
* shellany (0.0.1)
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

* "@babel/preset-react": "^7.17.12",
* "@emotion/react": "^11.9.0",
* "@emotion/styled": "^11.8.1",
* "@mui/icons-material": "^5.8.0",
* "@mui/lab": "^5.0.0-alpha.83",
* "@mui/material": "^5.6.4",
* "@mui/styled-engine": "^5.6.1",
* "@mui/styled-engine-sc": "^5.6.1",
* "@rails/webpacker": "5.4.3",
* "@types/react-draft-wysiwyg": "^1.13.4",
* "@types/uuid": "^8.3.4",
* "axios": "^0.27.2",
* "babel-plugin-macros": "^3.1.0",
* "babel-plugin-transform-react-remove-prop-types": "^0.4.24",
* "css-loader": "^5.2.7",
* "css-minimizer-webpack-plugin": "^3.4.1",
* "draft-js": "^0.11.7",
* "draft-js-export-html": "^1.4.1",
* "formik": "^2.2.9",
* "html-react-parser": "^1.4.12",
* "loader-utils": "^3.2.0",
* "mini-css-extract-plugin": "^2.6.0",
* "prop-types": "^15.8.1",
* "react": "^18.1.0",
* "react-dom": "^18.1.0",
* "react-draft-wysiwyg": "^1.14.7",
* "react-hot-toast": "^2.2.0",
* "react-on-rails": "13.0.0",
* "shakapacker": "^6.3.0",
* "style-loader": "^2.0.0",
* "styled-components": "^5.3.5",
* "ts-loader": "8",
* "ts-node": "^10.8.0",
"typescript": "^4.6.4"

devDependencies:

* "jest-mock-axios": "^4.6.1",
* "@babel/preset-typescript": "^7.17.12",
* "@pmmmwh/react-refresh-webpack-plugin": "^0.5.6",
* "@testing-library/dom": "^8.13.0",
* "@testing-library/jest-dom": "^5.16.4",
* "@testing-library/react": "^13.3.0",
* "@types/jest": "^28.1.0",
* "@types/react-test-renderer": "^18.0.0",
* "jest": "^28.0.3",
* "jest-environment-jsdom": "^28.1.0",
* "node-notifier": "^10.0.1",
* "react-refresh": "^0.13.0",
* "react-test-renderer": "^18.1.0",
* "webpack": "^4.46.0",
* "webpack-cli": "^3.3.12",
* "webpack-dev-server": "^3"

### Installing

* TODO

### Executing program

`bundle install`\
`rails s`\
`HMR=true bin/webpack-dev-server`\
or run Procfile `foreman start -f Procfile.dev` those this can be temperamental

## Troubleshooting

If you're using a MacBook with the M1 chip, you may run into some architecture errors. Try:

* `arch -x86_64 /bin/zsh` or `arch -arm64 /bin/zsh`.
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
