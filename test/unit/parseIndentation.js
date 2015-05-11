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
        expect(result.lineIndentationSpace).to.equal(' ');
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
        expect(result.lineIndentationSpace).to.equal(' ');
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
        expect(result.lineIndentationSpace).to.equal('');
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Multi Interspacing', function (done) {
        var testLine = ' .  .  HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal('  ');
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Multi Tab Interspacing', function (done) {
        var testLine = ' .\t\t.\t\tHELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal('\t\t');
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('No Trailing Spacing', function (done) {
        var testLine = ' ..HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal('');
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Trailing Tab Spacing', function (done) {
        var testLine = ' .\t.\tHELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal('\t');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Trailing Period', function (done) {
        var testLine = ' .\t.\tHELLO WORLD.';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal('\t');
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
        expect(result.lineIndentationSpace).to.equal('');
        expect(result.lineExpression).to.equal('HELLO WORLD.');
        done();
    });

    it('Third Indentation', function (done) {
        var testLine = '.   .   HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal('   ');
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Trailing Indentation', function (done) {
        var testLine = '.   HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(1);
        expect(result.lineExpression).to.exist;
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal('   ');
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Comment Indentation', function (done) {
        var testLine = ".   ;  special case with Workman's Comp";
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(1);
        expect(result.lineExpression).to.exist;
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal('   ');
        expect(result.lineExpression).to.equal(";  special case with Workman's Comp");
        console.log(result);
        done();
    });

    it('Empty Trailing Indentation', function (done) {
        var testLine = ".   ";
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(1);
        expect(result.lineExpression).to.exist;
        expect(result.lineIndentationSpace).to.exist;
        expect(result.lineIndentationSpace).to.equal('   ');
        expect(result.lineExpression).to.equal("");
        console.log(result);
        done();
    });

});
