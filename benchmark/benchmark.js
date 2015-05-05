process.env.DEBUG = 'mock:benchmark';

var debug = require('debug')('mock:benchmark'),
    Mock = require('..'),
    mock = new Mock(__dirname + '/data');

debug('benchmark start');
debug('100 times execution for each test');

[
    '/', '/shop/123', '/ktv/check/123', '/ktv/orderinfo/123',
    '/ktv/return/fail', '/ktv/orders'
].forEach(function(uri) {
    for (var i=0; i<100; i++) {
        mock.get(uri);
    }
    debug(uri);
});
