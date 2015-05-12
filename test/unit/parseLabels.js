"use strict";

var expect = require('chai').expect;
var parser = require('../../lib/parse.js');

describe('Parse Labels >', function () {

    it('Negative Single Space', function (done) {
        var testLine = ' HELLO WORLD';
        var result = parser.extractLabel(testLine, {});
        expect(result.lineLabel).to.not.exist;
        expect(result.lineLeadSpace).to.exist;
        expect(result.lineLeadSpace).to.equal(" ");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Negative Single Tab', function (done) {
        var testLine = '	HELLO WORLD';
        var result = parser.extractLabel(testLine, {});
        expect(result.lineLabel).to.not.exist;
        expect(result.lineLeadSpace).to.exist;
        expect(result.lineLeadSpace).to.equal("\t");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Negative Double Space', function (done) {
        var testLine = '  HELLO WORLD';
        var result = parser.extractLabel(testLine, {});
        expect(result.lineLabel).to.not.exist;
        expect(result.lineLeadSpace).to.exist;
        expect(result.lineLeadSpace).to.equal("  ");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Negative Double Tab', function (done) {
        var testLine = '\t\tHELLO WORLD';
        var result = parser.extractLabel(testLine, {});
        expect(result.lineLabel).to.not.exist;
        expect(result.lineLeadSpace).to.exist;
        expect(result.lineLeadSpace).to.equal("\t\t");
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

    it('Post-Label Space', function (done) {
        var testLine = 'WELL HELLO WORLD';
        var result = parser.extractLabel(testLine, {});
        expect(result.lineLeadSpace).to.exist;
        expect(result.lineLeadSpace).to.equal(" ");
        expect(result.lineLabel).to.exist;
        expect(result.lineLabel).to.equal('WELL');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Post-Label Spaces', function (done) {
        var testLine = 'WELL    HELLO WORLD';
        var result = parser.extractLabel(testLine, {});
        expect(result.lineLeadSpace).to.exist;
        expect(result.lineLeadSpace).to.equal("    ");
        expect(result.lineLabel).to.exist;
        expect(result.lineLabel).to.equal('WELL');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Post-Label Tab', function (done) {
        var testLine = 'WELL\tHELLO WORLD';
        var result = parser.extractLabel(testLine, {});
        expect(result.lineLeadSpace).to.exist;
        expect(result.lineLeadSpace).to.equal("\t");
        expect(result.lineLabel).to.exist;
        expect(result.lineLabel).to.equal('WELL');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Post-Label Tabs', function (done) {
        var testLine = 'WELL\t\tHELLO WORLD';
        var result = parser.extractLabel(testLine, {});
        expect(result.lineLeadSpace).to.exist;
        expect(result.lineLeadSpace).to.equal("\t\t");
        expect(result.lineLabel).to.exist;
        expect(result.lineLabel).to.equal('WELL');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('HELLO WORLD');
        done();
    });

    it('Post-Label Spacing No Content', function (done) {
        var testLine = 'WELL    ';
        var result = parser.extractLabel(testLine, {});
        expect(result.lineLeadSpace).to.exist;
        expect(result.lineLeadSpace).to.equal("    ");
        expect(result.lineLabel).to.exist;
        expect(result.lineLabel).to.equal('WELL');
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal('');
        done();
    });

    it('Empty Label Spacing No Content', function (done) {
        var testLine = '    ';
        var result = parser.extractLabel(testLine, {});
        expect(result.lineLeadSpace).to.exist;
        expect(result.lineLeadSpace).to.equal("    ");
        expect(result.lineLabel).to.not.exist;
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal("");
        done();
    });

    it('Empty Label Spacing No Content', function (done) {
        var testLine = 'WELL    ';
        var result = parser.extractLabel(testLine, {});
        expect(result.lineLeadSpace).to.exist;
        expect(result.lineLeadSpace).to.equal("    ");
        expect(result.lineLabel).to.exist;
        expect(result.lineLabel).to.equal("WELL");
        expect(result.lineExpression).to.exist;
        expect(result.lineExpression).to.equal("");
        done();
    });

});
