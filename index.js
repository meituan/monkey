var fs = require('fs');
var path = require('path');
var util = require('util');
var qs = require('querystring');
var debug = require('debug')('mock:mock');
var _ = require('lodash');
var Locator = require('mock-locator');
var Request = require('mock-request2');
var Response = require('mock-response');

/**
 * Initialize a `Mock` instance.
 *
 * @constructor
 * @param {string} mount Root directory of mock data
 * @param {Object} options
 * @param {boolean} options.params Whether to supply response with additional
 * request and response params, default to true
 */
function Mock(mount, options) {
    // convert to absolute path
    this.mount = mount;
    this.options = options || {};
    this.options.params = this.options.params === undefined ? true : this.options.params;
    this.locator = new Locator(mount);

    debug('mount at %s', this.mount);
}

/**
 * Get simulate data by HTTP request.
 *
 * @param {Object|string} req HTTP request
 * @return {Response|null} Simulate data, null if no match found
 *
 * Example:
 *
 *     res = {
 *         'status': 200,
 *         //'some other extra meta data': 'blanblan',
 *         'body': {
 *             'hello': 'world'
 *             // other extra simulate data
 *         }
 *     };
 */
Mock.prototype.get = function(req) {
    debug('request', req);
    var res, match;

    req = new Request(req);
    debug('parsed request', req);

    match = this.locator.find(req);
    debug('match', match);
    if (!match) {
        return null;
    }

    if (this.options.params) {
        res = new Response(match.path, {
            mount: this.mount,
            overrides: req.params,
            params: match.params,
        });
    } else {
        res = new Response(match.path, {
            mount: this.mount,
        });
    }
    debug('response', res);

    return res;
};

/**
 * Get multiple simulate once.
 * @param {Array|Object} reqs Array or hash of requests.
 * @return {Array|Object}
 */
Mock.prototype.mget = function(reqs) {
    if (_.isArray(reqs)) {
        return reqs.map(function(req) {
            return this.get(req);
        }, this);
    }

    var ress = {};
    _.forOwn(reqs, function(req, key) {
        ress[key] = this.get(req);
    }, this);
    return ress;
};

/**
 * Get simulate data by function call.
 *
 * Usage:
 *
 *     mock.getByRPC('funcName', ['hello', 2])
 *
 * Will match response file
 *
 *     /funcName?0=hello&1=2
 *
 * @param {string|Array.<string>} funcName
 * @param {Array=} args
 */
Mock.prototype.getByRPC = function(funcName, args) {
    if (_.isArray(funcName)) {
        funcName = funcName.join('/');
    }
    args = args || [];

    return this.get(util.format('/%s?%s', funcName, qs.stringify(args)));
};

/**
 * Export simulate data to file system.
 * @param {Object|string} req HTTP request
 * @param {string} type Simulate data type, eg json, html etc
 * @param {string} content Simulate data
 */
Mock.prototype.set = function(req, type, content) {
    req = new Request(req);
    req.pathname.reduce(function(prefix, segment, index) {
        prefix = path.join(prefix, segment);

        if (index === req.pathname.length - 1) {
            prefix = prefix + '.' + req.method.toUpperCase() + '.' + type.toLowerCase();
            fs.writeFileSync(prefix, content, 'utf8');
            return;
        }

        if (!fs.existsSync(prefix)) {
            fs.mkdirSync(prefix);
        }

        return prefix;
    }, this.mount);
};

module.exports = Mock;
