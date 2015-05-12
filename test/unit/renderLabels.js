"use strict";

var expect = require('chai').expect;
var render = require('../../lib/render.js');

describe('Render Labels >', function () {

    it('Absent Test', function (done) {
        var testObject = {};
        var result = render.appendLabel(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('');
        done();
    });

    it('Empty Test', function (done) {
        var testObject = {};
        testObject.lineLabel = "WELL";
        testObject.lineLeadSpace = " ";
        var result = render.appendLabel(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('WELL ');
        done();
    });

    it('Leading Space Test', function (done) {
        var testObject = {};
        testObject.lineLeadSpace = "    ";
        var result = render.appendLabel(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('    ');
        done();
    });

    it('Leading Tab Test', function (done) {
        var testObject = {};
        testObject.lineLeadSpace = "\t\t";
        var result = render.appendLabel(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('\t\t');
        done();
    });

    it('Basic Test', function (done) {
        var testObject = {};
        testObject.lineLabel = "HELLO";
        var result = render.appendLabel(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('HELLO');
        done();
    });

    it('Append Basic Test', function (done) {
        var testObject = {};
        testObject.lineLabel = "HELLO WORLD";
        var result = render.appendLabel(testObject, "HELLO WORLD ");
        expect(result).to.exist;
        expect(result).to.equal('HELLO WORLD HELLO WORLD');
        done();
    });

    it('Append Basic Test Space', function (done) {
        var testObject = {};
        testObject.lineLabel = "HELLO";
        testObject.lineLeadSpace = " ";
        var result = render.appendLabel(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('HELLO ');
        done();
    });

    it('Append Basic Test Spaces', function (done) {
        var testObject = {};
        testObject.lineLabel = "HELLO";
        testObject.lineLeadSpace = "    ";
        var result = render.appendLabel(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('HELLO    ');
        done();
    });

    it('Append Basic Test Tab', function (done) {
        var testObject = {};
        testObject.lineLabel = "HELLO";
        testObject.lineLeadSpace = "\t";
        var result = render.appendLabel(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('HELLO\t');
        done();
    });

    it('Append Basic Test Tabs', function (done) {
        var testObject = {};
        testObject.lineLabel = "HELLO";
        testObject.lineLeadSpace = "\t\t";
        var result = render.appendLabel(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('HELLO\t\t');
        done();
    });

});