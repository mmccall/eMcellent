"use strict";

var expect = require('chai').expect;
var render = require('../../lib/render.js');

describe('Render Comments >', function () {

    it('Absent Test', function (done) {
        var testObject = {};
        var result = render.appendComment(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('');
        done();
    });

    it('Empty Test', function (done) {
        var testObject = {};
        testObject.lineComment = " ";
        var result = render.appendComment(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('; ');
        done();
    });

    it('Basic Test', function (done) {
        var testObject = {};
        testObject.lineComment = "HELLO";
        var result = render.appendComment(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(';HELLO');
        done();
    });

    it('Append Basic Test', function (done) {
        var testObject = {};
        testObject.lineComment = "HELLO WORLD";
        var result = render.appendComment(testObject, "HELLO WORLD ");
        expect(result).to.exist;
        expect(result).to.equal('HELLO WORLD ;HELLO WORLD');
        done();
    });

});
