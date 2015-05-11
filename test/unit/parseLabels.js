"use strict";

var expect = require('chai').expect;
var parser = require('../../lib/parse.js');

describe('Parse Labels >', function () {

    it('Negative Space', function (done) {
        var testLine = ' HELLO WORLD';
        var result = parser.extractLabel(testLine, {});
        expect(result.lineLabel).to.not.exist;
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Negative Tab', function (done) {
        var testLine = '	HELLO WORLD';
        var result = parser.extractLabel(testLine, {});
        expect(result.lineLabel).to.not.exist;
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Positive Tab', function (done) {
        var testLine = 'WELL	HELLO WORLD';
        var result = parser.extractLabel(testLine, {});
        expect(result.lineLabel).to.exist;
        expect(result.lineLabel).to.equal('WELL');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Positive Space', function (done) {
        var testLine = 'WELL HELLO WORLD';
        var result = parser.extractLabel(testLine, {});
        expect(result.lineLabel).to.exist;
        expect(result.lineLabel).to.equal('WELL');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

});
