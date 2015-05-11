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
        testObject.lineIndentation = 0;
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('');
        done();
    });

    it('One Test Basic', function (done) {
        testObject.lineIndentation = 1;
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' .');
        done();
    });

    it('Two Test Basic', function (done) {
        testObject.lineIndentation = 2;
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' ..');
        done();
    });

    it('One Test Indentation', function (done) {
        testObject.lineIndentation = 1;
        testObject.lineIndentationSpace = ' ';
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' . ');
        done();
    });

    it('Two Test Indentation', function (done) {
        testObject.lineIndentation = 2;
        testObject.lineIndentationSpace = ' ';
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' . . ');
        done();
    });

    it('One Test Indentation False', function (done) {
        testObject.lineIndentation = 1;
        testObject.lineIndentationSpace = '';
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' .');
        done();
    });

    it('Two Test Indentation False', function (done) {
        testObject.lineIndentation = 2;
        testObject.lineIndentationSpace = '';
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' ..');
        done();
    });

    it('Indentation Comment Test', function (done) {
        testObject.lineIndentation = 1;
        testObject.lineIndentationSpace = '   ';
        var result = render.appendIndentation(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' .   ');
        done();
    });

});
