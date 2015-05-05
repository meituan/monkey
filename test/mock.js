var fs = require('fs');
var path = require('path');
var temp = require('temp');
var Mock = require('..');

describe('Mock', function(){
    var mount = './test/fixtures',
        mock;

    beforeEach(function() {
        mock = new Mock(mount);
    });

    describe('get', function() {
        it('should fetch simulate data', function() {
            var res = mock.get('/simple');
            res.body.should.eql({'hello': 'world'});
        });

        it('should allow disable params', function() {
            var res = mock.get('/params/something');
            res.body.should.eql({
                'hi': 'something',
                'hello': 'world',
            });

            mock = new Mock(mount, {params: false});
            res = mock.get('/params/something');
            res.body.should.eql({
                'hello': 'world',
            });
        });
    });

    describe('mget', function() {
        it('should handle array of requests', function() {
            var ress = mock.mget(['/simple', '/rpc']);
            ress.should.eql([
                {'body': {'hello': 'world'}, 'status': 200},
                {'body': {'child': 'child'}},
            ]);
        });

        it('should handle hash of requests', function() {
            var ress = mock.mget({
                a: '/simple',
                b: '/rpc',
            });
            ress.should.eql({
                a: {'body': {'hello': 'world'}, 'status': 200},
                b: {'body': {'child': 'child'}},
            });
        });
    });

    describe('getByRPC', function() {
        it('should allow member to be string', function() {
            var res = mock.getByRPC('rpc', [1, 2]);
            res.body.should.eql({
                'child': 'child'
            });
        });

        it('should support array as function name', function() {
            var res = mock.getByRPC(['rpc']);
            res.body.should.eql({
                'child': 'child'
            });
        });
    });

    describe('set', function() {
        var mount = temp.mkdirSync('mock-set');
        var mock = new Mock(mount);

        it('should create parent directories', function() {
            var req = {uri: '/path/to/ajax', method: 'post'};
            var content = JSON.stringify({hello: 'world'});
            mock.set(req, 'json', content);
            var location = path.join(mount, 'path', 'to', 'ajax.POST.json');
            fs.existsSync(location).should.be.ok;
            fs.readFileSync(location, 'utf8').should.eql(content);
        });
    });
});
