"use strict";

var expect = require('chai').expect;
var parser = require('../../lib/parse.js');

describe('Parse Indentation >', function () {

    it('Basic Test', function (done) {
        var testLine = ' . . HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentationArray).to.exist;
        expect(result.lineIndentationArray.length).to.equal(2);
        expect(result.lineIndentationArray[0]).to.equal(" ");
        expect(result.lineIndentationArray[1]).to.equal(" ");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('No Line Start Indicator', function (done) {
        var testLine = '. . HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentationArray).to.exist;
        expect(result.lineIndentationArray.length).to.equal(2);
        expect(result.lineIndentationArray[0]).to.equal(" ");
        expect(result.lineIndentationArray[1]).to.equal(" ");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('No Interspacing', function (done) {
        var testLine = ' ..HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentationArray).to.exist;
        expect(result.lineIndentationArray.length).to.equal(2);
        expect(result.lineIndentationArray[0]).to.equal("");
        expect(result.lineIndentationArray[1]).to.equal("");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Multi Interspacing', function (done) {
        var testLine = ' .  . HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentationArray).to.exist;
        expect(result.lineIndentationArray.length).to.equal(2);
        expect(result.lineIndentationArray[0]).to.equal("  ");
        expect(result.lineIndentationArray[1]).to.equal(" ");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Multi Tab Interspacing', function (done) {
        var testLine = ' .\t\t.\tHELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentationArray).to.exist;
        expect(result.lineIndentationArray.length).to.equal(2);
        expect(result.lineIndentationArray[0]).to.equal("\t\t");
        expect(result.lineIndentationArray[1]).to.equal("\t");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('No Trailing Spacing', function (done) {
        var testLine = ' . .HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentationArray).to.exist;
        expect(result.lineIndentationArray.length).to.equal(2);
        expect(result.lineIndentationArray[0]).to.equal(" ");
        expect(result.lineIndentationArray[1]).to.equal("");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Trailing Tab Spacing', function (done) {
        var testLine = ' ..\tHELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentationArray).to.exist;
        expect(result.lineIndentationArray.length).to.equal(2);
        expect(result.lineIndentationArray[0]).to.equal("");
        expect(result.lineIndentationArray[1]).to.equal("\t");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Trailing Period', function (done) {
        var testLine = ' .\t.\tHELLO WORLD.';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentationArray).to.exist;
        expect(result.lineIndentationArray.length).to.equal(2);
        expect(result.lineIndentationArray[0]).to.equal("\t");
        expect(result.lineIndentationArray[1]).to.equal("\t");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD.');
        done();
    });

    it('No indentation', function (done) {
        var testLine = ' HELLO WORLD.';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentationLead).to.exist;
        expect(result.lineIndentationLead).to.equal(" ");
        expect(result.lineIndentationArray).to.not.exist;
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD.');
        done();
    });

    it('Single indentation', function (done) {
        var testLine = ' .HELLO WORLD.';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentationLead).to.exist;
        expect(result.lineIndentationLead).to.equal(" ");
        expect(result.lineIndentationArray).to.exist;
        expect(result.lineIndentationArray.length).to.equal(1);
        expect(result.lineIndentationArray[0]).to.equal("");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD.');
        done();
    });

    it('Third Indentation', function (done) {
        var testLine = '.   .  HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentationLead).to.not.exist;
        expect(result.lineIndentationArray).to.exist;
        expect(result.lineIndentationArray.length).to.equal(2);
        expect(result.lineIndentationArray[0]).to.equal("   ");
        expect(result.lineIndentationArray[1]).to.equal("  ");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Trailing Indentation', function (done) {
        var testLine = '.   HELLO WORLD';
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentationLead).to.not.exist;
        expect(result.lineIndentationArray).to.exist;
        expect(result.lineIndentationArray.length).to.equal(1);
        expect(result.lineIndentationArray[0]).to.equal("   ");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Comment Indentation', function (done) {
        var testLine = ".   ;  HELLO WORLD";
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentationLead).to.not.exist;
        expect(result.lineIndentationArray).to.exist;
        expect(result.lineIndentationArray.length).to.equal(1);
        expect(result.lineIndentationArray[0]).to.equal("   ");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal(";  HELLO WORLD");
        done();
    });

    it('Empty Trailing Indentation', function (done) {
        var testLine = ".   ";
        var result = parser.extractIndentation(testLine, {});
        expect(result.lineIndentationLead).to.not.exist;
        expect(result.lineIndentationArray).to.exist;
        expect(result.lineIndentationArray.length).to.equal(1);
        expect(result.lineIndentationArray[0]).to.equal("   ");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal("");
        done();
    });

    it('Extra Leading Indentation', function (done) {
        var testLine = "    .W HELLO WORLD";
        var result = parser.extractIndentation(testLine, {});
        //console.log(result);
        expect(result.lineIndentationLead).to.exist;
        expect(result.lineIndentationLead).to.equal("    ");
        expect(result.lineIndentationArray).to.exist;
        expect(result.lineIndentationArray.length).to.equal(1);
        expect(result.lineIndentationArray[0]).to.equal("");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal("W HELLO WORLD");
        done();
    });

    it('Double Indentation with Comment', function (done) {
        var testLine = ' ..;HELLO WORLD.';
        var result = parser.extractIndentation(testLine, {});
        console.log(result);
        expect(result.lineIndentationLead).to.exist;
        expect(result.lineIndentationLead).to.equal(" ");
        expect(result.lineIndentationArray).to.exist;
        expect(result.lineIndentationArray.length).to.equal(2);
        expect(result.lineIndentationArray[0]).to.equal("");
        expect(result.lineIndentationArray[1]).to.equal("");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal(";HELLO WORLD.");
        done();
    });

});
