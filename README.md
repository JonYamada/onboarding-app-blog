# Project Title

A simple training app used for the purposes of on-boarding new developers at WP Engine

## Description

This app is a blogging platform which contains articles. The app will build up many articles over it’s lifetime. To
assist in organising this content, we want to implement an automatic archive system. This will keep the content
organised and easy to browse.

## Getting Started

Ensure `rvm` is installed and install ruby 2.7.4 using `rvm install 2.7.4`\
This project uses postgresql so make sure to run `brew install postgresql` on your machine.

### Installing

`bundle install`\
`yarn`

### Executing program

`rails s`\
`HMR=true bin/webpack-dev-server`\
or run Procfile `foreman start -f Procfile.dev` though this can be temperamental

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
