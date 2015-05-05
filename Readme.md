# Mock
> Monkey backend: Data mapping system

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

For implementation detail, see [docs](browse/docs/Home.md), for more example, see [test](./test).


## Misc

* test: npm test
* coverage: npm run test-cov
* benchmark: npm run benchmark

## Benchmark

    mock:benchmark benchmark start +0ms
    mock:benchmark 100 times execution for each test +2ms
    mock:benchmark / +3s
    mock:benchmark /shop/123 +41ms
    mock:benchmark /ktv/check/123 +9s
    mock:benchmark /ktv/orderinfo/123 +4s
    mock:benchmark /ktv/return/fail +26ms
    mock:benchmark /ktv/orders +18s


## Contribute

1. Install [git-hooks](https://github.com/git-hooks/git-hooks)
2. Execute `git hooks install`
3. Write function
4. Write unit test
5. Create pull request

NOTE: Never create pull request with failed tests.
