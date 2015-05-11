"use strict";

var expect = require('chai').expect;
var render = require('../../lib/render.js');

var testObject = {};

describe('Render Indentation >', function () {

    it('Absent Test', function (done) {
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('');
        done();
    });

    it('Zero Test', function (done) {
        testObject.lineIndentationArray = [];
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('');
        done();
    });

    it('One Test Basic', function (done) {
        testObject.lineIndentationArray = [""];
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' .');
        done();
    });

    it('Two Test Basic', function (done) {
        testObject.lineIndentationArray = ["", ""];
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' ..');
        done();
    });

    it('One Test Indentation', function (done) {
        testObject.lineIndentationArray = [' '];
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' . ');
        done();
    });

    it('Two Test Indentation', function (done) {
        testObject.lineIndentationArray = [" ", " "];
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' . . ');
        done();
    });

    it('One Test Indentation False', function (done) {
        testObject.lineIndentationArray = [""];
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' .');
        done();
    });

    it('Two Test Indentation False', function (done) {
        testObject.lineIndentationArray = ["", ""];
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' ..');
        done();
    });

    it('Indentation Comment Test', function (done) {
        testObject.lineIndentationArray = ["   "];
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' .   ');
        done();
    });

    it('Variable Spacing Test', function (done) {
        testObject.lineIndentationArray = ["   ", " "];
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' .   . ');
        done();
    });

    it('Variable Tab Test', function (done) {
        testObject.lineIndentationArray = ["\t\t", "\t"];
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' .\t\t.\t');
        done();
    });

    it('Tab Spacing Mix Test', function (done) {
        testObject.lineIndentationArray = ["\t\t", " "];
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' .\t\t. ');
        done();
    });

    it('Empty Lead Spacing Test', function (done) {
        testObject.lineIndentationLead = " ";
        testObject.lineIndentationArray = ["\t\t", " "];
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' .\t\t. ');
        done();
    });

    it('Single Lead Spacing Test', function (done) {
        testObject.lineIndentationLead = " ";
        testObject.lineIndentationArray = ["\t\t", " "];
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' .\t\t. ');
        done();
    });

    it('Multi-Lead Spacing Test', function (done) {
        testObject.lineIndentationLead = "   ";
        testObject.lineIndentationArray = ["\t\t", " "];
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('   .\t\t. ');
        done();
    });

});
