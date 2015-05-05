# Monkey [![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url]

> Data mapping system

## Installation

    npm install --save monkeyjs


## Usage

    var Mock = require('monkeyjs');
    // create mock with data directory
    var mock = new Mock('./data-dir');
    // get mock data by HTTP request
    var data = mock.get({
        "uri": "/deal/123456",
        "method": "POST",
    });

For implementation detail, see [docs](docs/Home.md), for more example, see [test](./test).


## More

* test: npm test
* coverage: npm run test-cov
* benchmark: npm run benchmark


## Contribute

1. Install [git-hooks](https://github.com/git-hooks/git-hooks)
2. Execute `git hooks install`
3. Write source code
4. Write unit test
5. Create pull request


[npm-image]: https://img.shields.io/npm/v/monkeyjs.svg?style=flat
[npm-url]: https://npmjs.org/package/monkeyjs
[travis-image]: https://img.shields.io/travis/meituan/monkey.svg?style=flat
[travis-url]: https://travis-ci.org/meituan/monkey
[coveralls-image]: https://img.shields.io/coveralls/meituan/monkey.svg?style=flat
[coveralls-url]: https://coveralls.io/r/meituan/monkey?branch=master
