"use strict";

var expect = require('chai').expect;
var parser = require('../../lib/parse.js');

describe('Parse Indentation >', function () {

    it('Basic Test', function (done) {
        var testLine = ' . . HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal(true);
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('No Line Start Indicator', function (done) {
        var testLine = '. . HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal(true);
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('No Interspacing', function (done) {
        var testLine = ' ..HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal(false);
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Multi Interspacing', function (done) {
        var testLine = ' .   . HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal(true);
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Multi Tab Interspacing', function (done) {
        var testLine = ' .\t\t. HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal(true);
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('No Trailing Spacing', function (done) {
        var testLine = ' . .HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal(true);
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Trailing Tab Spacing', function (done) {
        var testLine = ' . .\tHELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal(true);
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Trailing Period', function (done) {
        var testLine = ' .\t. HELLO WORLD.';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal(true);
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD.');
        done();
    });

    it('No indentation', function (done) {
        var testLine = ' HELLO WORLD.';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.not.exist;
        expect(result.lineExpression).to.exist;
        expect(result.lineIndentationSpace).to.not.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD.');
        done();
    });

    it('Single indentation', function (done) {
        var testLine = '.HELLO WORLD.';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(1);
        expect(result.lineExpression).to.exist;
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal(false);
        expect(result.lineExpression).to.equal('HELLO WORLD.');
        done();
    });

});
