"use strict";

var expect = require('chai').expect;
var m = require('../index.js');







describe('Parse Labels >', function () {

    it('Negative 1', function (done) {
        var testLine = ' HELLO WORLD';
        var result = m.parseLine(testLine);
        expect(result.lineLabel).to.not.exist;
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Negative 2', function (done) {
        var testLine = '	HELLO WORLD';
        var result = m.parseLine(testLine);
        expect(result.lineLabel).to.not.exist;
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Positive 1', function (done) {
        var testLine = 'WELL	HELLO WORLD';
        var result = m.parseLine(testLine);
        expect(result.lineLabel).to.exist;
        expect(result.lineLabel).to.equal('WELL');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Positive 2', function (done) {
        var testLine = 'WELL HELLO WORLD';
        var result = m.parseLine(testLine);
        expect(result.lineLabel).to.exist;
        expect(result.lineLabel).to.equal('WELL');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

});