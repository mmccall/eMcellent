"use strict";

var expect = require('chai').expect;
var render = require('../../lib/render.js');

var testObject = {};

describe('Render Labels >', function () {

    it('Absent Test', function (done) {
        var result = render.appendLabel(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' ');
        done();
    });

    it('Empty Test', function (done) {
        testObject.lineLabel = "";
        var result = render.appendLabel(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' ');
        done();
    });

    it('Basic Test', function (done) {
        testObject.lineLabel = "HELLO WORLD";
        var result = render.appendLabel(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('HELLO WORLD ');
        done();
    });

    it('Append Basic Test', function (done) {
        testObject.lineLabel = "HELLO WORLD";
        var result = render.appendLabel(testObject, "HELLO WORLD ");
        expect(result).to.exist;
        expect(result).to.equal('HELLO WORLD HELLO WORLD ');
        done();
    });

});
