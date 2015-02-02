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
        var testLine = ' .\t\t. HELLO WORLD';
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
        var testLine = ' . .\tHELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentation).to.exist;
        expect(result.lineIndentation).to.equal(2);
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('\tHELLO WORLD');
        done();
    });

    it('Trailing Period', function (done) {
        var testLine = ' .\t. HELLO WORLD.';
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

describe('Split Routines and Arguments >', function () {

    it('Basic Test', function (done) {
        var testLine = ' HELLO WORLD';
        var result = parser.splitRoutinesAndArguments(testLine, {});
        expect(result).to.exist;
        expect(result.length).to.equal(2);
        expect(result[0]).to.equal('HELLO');
        expect(result[1]).to.equal('WORLD');
        done();
    });

    it('No Indentation', function (done) {
        var testLine = 'HELLO WORLD';
        var result = parser.splitRoutinesAndArguments(testLine, {});
        expect(result).to.exist;
        expect(result.length).to.equal(2);
        expect(result[0]).to.equal('HELLO');
        expect(result[1]).to.equal('WORLD');
        done();
    });

    it('Tab Indentation', function (done) {
        var testLine = '\tHELLO WORLD';
        var result = parser.splitRoutinesAndArguments(testLine, {});
        expect(result).to.exist;
        expect(result.length).to.equal(2);
        expect(result[0]).to.equal('HELLO');
        expect(result[1]).to.equal('WORLD');
        done();
    });

    it('Empty Arguments', function (done) {
        var testLine = 'HELLO  WORLD';
        var result = parser.splitRoutinesAndArguments(testLine, {});
        expect(result).to.exist;
        expect(result.length).to.equal(3);
        expect(result[0]).to.equal('HELLO');
        expect(result[1]).to.equal('');
        expect(result[2]).to.equal('WORLD');
        done();
    });

    it('Present Arguments', function (done) {
        var testLine = 'HELLO BIG WORLD';
        var result = parser.splitRoutinesAndArguments(testLine, {});
        expect(result).to.exist;
        expect(result.length).to.equal(3);
        expect(result[0]).to.equal('HELLO');
        expect(result[1]).to.equal('BIG');
        expect(result[2]).to.equal('WORLD');
        done();
    });

    it('Last Line Arguments', function (done) {
        var testLine = 'HELLO BIG OLD WORLD';
        var result = parser.splitRoutinesAndArguments(testLine, {});
        expect(result).to.exist;
        expect(result.length).to.equal(4);
        expect(result[0]).to.equal('HELLO');
        expect(result[1]).to.equal('BIG');
        expect(result[2]).to.equal('OLD');
        expect(result[3]).to.equal('WORLD');
        done();
    });

    it('Last Line Space', function (done) {
        var testLine = 'HELLO BIG OLD WORLD ';
        var result = parser.splitRoutinesAndArguments(testLine, {});
        expect(result).to.exist;
        expect(result.length).to.equal(4);
        expect(result[0]).to.equal('HELLO');
        expect(result[1]).to.equal('BIG');
        expect(result[2]).to.equal('OLD');
        expect(result[3]).to.equal('WORLD');
        done();
    });

    it('Last Line Empty Arguments', function (done) {
        var testLine = 'HELLO BIG OLD WORLD  ';
        var result = parser.splitRoutinesAndArguments(testLine, {});
        expect(result).to.exist;
        expect(result.length).to.equal(5);
        expect(result[0]).to.equal('HELLO');
        expect(result[1]).to.equal('BIG');
        expect(result[2]).to.equal('OLD');
        expect(result[3]).to.equal('WORLD');
        expect(result[4]).to.equal('');
        done();
    });

    it('Quoted Arguments Basic Test', function (done) {
        var testLine = 'HELLO \"BIG\" OLD WORLD  ';
        var result = parser.splitRoutinesAndArguments(testLine, {});
        expect(result).to.exist;
        expect(result.length).to.equal(5);
        expect(result[0]).to.equal('HELLO');
        expect(result[1]).to.equal('\"BIG\"');
        expect(result[2]).to.equal('OLD');
        expect(result[3]).to.equal('WORLD');
        expect(result[4]).to.equal('');
        done();
    });

    it('Quoted Arguments Bigger Quote', function (done) {
        var testLine = 'HELLO \"BIG OLD\" WORLD  ';
        var result = parser.splitRoutinesAndArguments(testLine, {});
        expect(result).to.exist;
        expect(result.length).to.equal(4);
        expect(result[0]).to.equal('HELLO');
        expect(result[1]).to.equal('\"BIG OLD\"');
        expect(result[2]).to.equal('WORLD');
        expect(result[3]).to.equal('');
        done();
    });

    it('Two Quoted Arguments', function (done) {
        var testLine = 'HELLO \"BIG\" OLD \"WORLD\"  ';
        var result = parser.splitRoutinesAndArguments(testLine, {});
        expect(result).to.exist;
        expect(result.length).to.equal(5);
        expect(result[0]).to.equal('HELLO');
        expect(result[1]).to.equal('\"BIG\"');
        expect(result[2]).to.equal('OLD');
        expect(result[3]).to.equal('\"WORLD\"');
        expect(result[4]).to.equal('');
        done();
    });

});

describe('Extract Routines and Arguments >', function () {

    it('Basic Test', function (done) {
        var testLine = 'HELLO WORLD';
        var result = parser.extractRoutines(testLine, {});
        expect(result.lineRoutines).to.exist;
        expect(result.lineRoutines.length).to.equal(1);
        expect(result.lineRoutines[0].mRoutine).to.equal('HELLO');
        expect(result.lineRoutines[0].mArguments).to.equal('WORLD');
        done();
    });

    it('Routine No Arguments', function (done) {
        var testLine = 'HELLO';
        var result = parser.extractRoutines(testLine, {});
        expect(result.lineRoutines).to.exist;
        expect(result.lineRoutines.length).to.equal(1);
        expect(result.lineRoutines[0].mRoutine).to.equal('HELLO');
        expect(result.lineRoutines[0].mArguments).to.not.exist;
        done();
    });

    it('Routine Empty Arguments', function (done) {
        var testLine = 'HELLO  ';
        var result = parser.extractRoutines(testLine, {});
        expect(result.lineRoutines).to.exist;
        expect(result.lineRoutines.length).to.equal(1);
        expect(result.lineRoutines[0].mRoutine).to.equal('HELLO');
        expect(result.lineRoutines[0].mArguments).to.exist;
        expect(result.lineRoutines[0].mArguments).to.equal('');
        done();
    });

    it('Routine Empty Arguments Second Routine', function (done) {
        var testLine = 'HELLO  WORLD';
        var result = parser.extractRoutines(testLine, {});
        expect(result.lineRoutines).to.exist;
        expect(result.lineRoutines.length).to.equal(2);
        expect(result.lineRoutines[0].mRoutine).to.equal('HELLO');
        expect(result.lineRoutines[0].mArguments).to.exist;
        expect(result.lineRoutines[0].mArguments).to.equal('');
        expect(result.lineRoutines[1].mRoutine).to.equal('WORLD');
        expect(result.lineRoutines[1].mArguments).to.not.exist;
        done();
    });

    it('Routine Empty Arguments Second Routine Trailing Space', function (done) {
        var testLine = 'HELLO  WORLD ';
        var result = parser.extractRoutines(testLine, {});
        expect(result.lineRoutines).to.exist;
        expect(result.lineRoutines.length).to.equal(2);
        expect(result.lineRoutines[0].mRoutine).to.equal('HELLO');
        expect(result.lineRoutines[0].mArguments).to.exist;
        expect(result.lineRoutines[0].mArguments).to.equal('');
        expect(result.lineRoutines[1].mRoutine).to.equal('WORLD');
        expect(result.lineRoutines[1].mArguments).to.not.exist;
        done();
    });

    it('Multiple Routine/Args Pairing', function (done) {
        var testLine = 'HELLO TO THE WORLD';
        var result = parser.extractRoutines(testLine, {});
        expect(result.lineRoutines).to.exist;
        expect(result.lineRoutines.length).to.equal(2);
        expect(result.lineRoutines[0].mRoutine).to.equal('HELLO');
        expect(result.lineRoutines[0].mArguments).to.equal('TO');
        expect(result.lineRoutines[1].mRoutine).to.equal('THE');
        expect(result.lineRoutines[1].mArguments).to.equal('WORLD');
        done();
    });

    it('Multiple Routine/Args Pairing Empty Last Param', function (done) {
        var testLine = 'HELLO WELCOME TO THE WORLD';
        var result = parser.extractRoutines(testLine, {});
        expect(result.lineRoutines).to.exist;
        expect(result.lineRoutines.length).to.equal(3);
        expect(result.lineRoutines[0].mRoutine).to.equal('HELLO');
        expect(result.lineRoutines[0].mArguments).to.equal('WELCOME');
        expect(result.lineRoutines[1].mRoutine).to.equal('TO');
        expect(result.lineRoutines[1].mArguments).to.equal('THE');
        expect(result.lineRoutines[2].mRoutine).to.equal('WORLD');
        expect(result.lineRoutines[2].mArguments).to.not.exist;
        done();
    });

    it('Multiple Routine/Args Pairing Empty Last Param Spacing', function (done) {
        var testLine = 'HELLO WELCOME TO THE WORLD ';
        var result = parser.extractRoutines(testLine, {});
        expect(result.lineRoutines).to.exist;
        expect(result.lineRoutines.length).to.equal(3);
        expect(result.lineRoutines[0].mRoutine).to.equal('HELLO');
        expect(result.lineRoutines[0].mArguments).to.equal('WELCOME');
        expect(result.lineRoutines[1].mRoutine).to.equal('TO');
        expect(result.lineRoutines[1].mArguments).to.equal('THE');
        expect(result.lineRoutines[2].mRoutine).to.equal('WORLD');
        expect(result.lineRoutines[2].mArguments).to.not.exist;
        done();
    });

});


describe('Extract Post-Conditionals >', function () {

    it('Basic Test', function (done) {
        var testLine = 'HELLO:TOTHE WORLD';
        var result = parser.extractRoutines(testLine, {});
        expect(result.lineRoutines).to.exist;
        expect(result.lineRoutines.length).to.equal(1);
        expect(result.lineRoutines[0].mRoutine).to.equal('HELLO');
        expect(result.lineRoutines[0].mArguments).to.equal('WORLD');
        expect(result.lineRoutines[0].mPostConditional).to.equal('TOTHE');
        done();
    });

    it('Empty Post-Conditional', function (done) {
        var testLine = 'HELLO: WORLD';
        var result = parser.extractRoutines(testLine, {});
        expect(result.lineRoutines).to.exist;
        expect(result.lineRoutines.length).to.equal(1);
        expect(result.lineRoutines[0].mRoutine).to.equal('HELLO');
        expect(result.lineRoutines[0].mArguments).to.equal('WORLD');
        expect(result.lineRoutines[0].mPostConditional).to.equal('');
        done();
    });

    it('Single Post-Conditional', function (done) {
        var testLine = ' HELLO:WORLD';
        var result = parser.extractRoutines(testLine, {});
        expect(result.lineRoutines).to.exist;
        expect(result.lineRoutines.length).to.equal(1);
        expect(result.lineRoutines[0].mRoutine).to.equal('HELLO');
        expect(result.lineRoutines[0].mArguments).to.not.exist;
        expect(result.lineRoutines[0].mPostConditional).to.equal('WORLD');
        done();
    });

});