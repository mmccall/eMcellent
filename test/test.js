"use strict";

var expect = require('chai').expect;
var parser = require('../lib/parse.js');

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

describe('Parse Comments >', function () {

    it('Basic Test', function (done) {
        var testLine = ';HELLO WORLD';
        var result = parser.extractComment(testLine, {});
        expect(result.lineComment).to.exist;
        expect(result.lineComment).to.equal('HELLO WORLD');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('');
        done();
    });

    it('End of Line', function (done) {
        var testLine = 'OH HEY ;HELLO WORLD';
        var result = parser.extractComment(testLine, {});
        expect(result.lineComment).to.exist;
        expect(result.lineComment).to.equal('HELLO WORLD');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('OH HEY ');
        done();
    });

    it('Quoted Text', function (done) {
        var testLine = 'OH HEY ";HELLO WORLD"';
        var result = parser.extractComment(testLine, {});
        expect(result.lineComment).to.not.exist;
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('OH HEY ";HELLO WORLD"');
        done();
    });

    it('Semicolon Only', function (done) {
    	var testLine = 'OH HEY ;';
    	var result = parser.extractComment(testLine, {});
    	expect(result.lineComment).to.exist;
    	expect(result.lineComment).to.equal('');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('OH HEY ');
    	done();
    });

});

describe('Parse Indentation >', function () {

    it('Basic Test', function (done) {
        var testLine = ' .  . HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal(' HELLO WORLD');
        done();
    });

    it('No Line Start Indicator', function (done) {
        var testLine = '.  . HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal(' HELLO WORLD');
        done();
    });

    it('No Interspacing', function (done) {
        var testLine = ' .. HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal(' HELLO WORLD');
        done();
    });

    it('Multi Interspacing', function (done) {
        var testLine = ' .   . HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal(' HELLO WORLD');
        done();
    });

    it('Multi Tab Interspacing', function (done) {
        var testLine = ' .      . HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal(' HELLO WORLD');
        done();
    });

    it('No Trailing Spacing', function (done) {
        var testLine = ' . .HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Trailing Tab Spacing', function (done) {
        var testLine = ' . .    HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('    HELLO WORLD');
        done();
    });

    it('Trailing Period', function (done) {
        var testLine = ' .      . HELLO WORLD.';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal(' HELLO WORLD.');
        done();
    });

    it('No indentation', function (done) {
        var testLine = ' HELLO WORLD.';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.not.exist;
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal(' HELLO WORLD.');
        done();
    });

    it('Single indentation', function (done) {
        var testLine = '.HELLO WORLD.';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(1);
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD.');
        done();
    });

});