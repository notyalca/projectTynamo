var assert = require('chai').assert;
var routeIngestion = require('../lib/utils/routeIngestion.js');

describe('routeIngestion', function () {
    describe('convertToTree', function (){
        it('should turn a single route into a simple lookup tree', function(){
            var routeDef = '{"routes":' +
                '[{"path": "/myexample",' +
                '"method": "GET",' +
                '"handler": {"type": "text","message": "hello everyone","code": 200}' +
                '}]}';
            routeDef = JSON.parse(routeDef);
            var tree = routeIngestion.convertToTree(routeDef);
            assert.equal(tree.myexample.hasOwnProperty('handler'), true);
            assert.equal(tree.myexample.handler.hasOwnProperty('GET'), true);
            assert.equal(tree.myexample.handler.GET.type, 'text');
            assert.equal(tree.myexample.handler.GET.message, 'hello everyone');
            assert.equal(tree.myexample.handler.GET.code, 200);
        });
    });
});