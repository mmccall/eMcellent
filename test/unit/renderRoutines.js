"use strict";

var expect = require('chai').expect;
var render = require('../../lib/render.js');

var testObject = {};

describe('Render Routines >', function () {

    it('Absent Test', function (done) {
        var result = render.appendRoutines(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('');
        done();
    });

    it('-Routine', function (done) {
        testObject.lineRoutines = [{}];
        var result = render.appendRoutines(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('');
        done();
    });

    it('+Routine -Arguments', function (done) {
        testObject.lineRoutines = [{
            mRoutine: "W"
        }];
        var result = render.appendRoutines(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' W');
        done();
    });

    it('-Routine +Arguments', function (done) {
        testObject.lineRoutines = [{
            mArguments: "HELLO WORLD"
        }];
        var result = render.appendRoutines(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('');
        done();
    });

    it('+Routine +Arguments', function (done) {
        testObject.lineRoutines = [{
            mRoutine: "W",
            mArguments: "HELLO WORLD"
        }];
        var result = render.appendRoutines(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' W HELLO WORLD');
        done();
    });

    it('+Routine -Arguments +PostConditional', function (done) {
        testObject.lineRoutines = [{
            mRoutine: "W",
            mPostConditional: "HOWRU"
        }];
        var result = render.appendRoutines(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' W:HOWRU');
        done();
    });

    it('-Routine -Arguments +PostConditional', function (done) {
        testObject.lineRoutines = [{
            mPostConditional: "HOWRU"
        }];
        var result = render.appendRoutines(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal('');
        done();
    });

    it('+Routine +Arguments +PostConditional', function (done) {
        testObject.lineRoutines = [{
            mRoutine: "W",
            mArguments: "HELLO WORLD",
            mPostConditional: "HOWRU"
        }];
        var result = render.appendRoutines(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' W:HOWRU HELLO WORLD');
        done();
    });

    it('Empty Routine +Arguments +PostConditional', function (done) {
        testObject.lineRoutines = [{
            mRoutine: "",
            mArguments: "HELLO WORLD",
            mPostConditional: "HOWRU"
        }];
        var result = render.appendRoutines(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' :HOWRU HELLO WORLD');
        done();
    });

    it('Leading Space', function (done) {
        testObject.lineRoutines = [{
            mRoutine: "W"
        }];
        var result = render.appendRoutines(testObject, " ");
        expect(result).to.exist;
        expect(result).to.equal(' W');
        done();
    });

    it('No Leading Space', function (done) {
        testObject.lineRoutines = [{
            mRoutine: "W"
        }];
        var result = render.appendRoutines(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' W');
        done();
    });

    it('Multiple Routines', function (done) {
        testObject.lineRoutines = [{
            mRoutine: "W",
            mArguments: "HELLO WORLD",
            mPostConditional: "HOWRU"
        }, {
            mRoutine: "D",
            mArguments: "SOMETHING"
        }];
        var result = render.appendRoutines(testObject, "");
        expect(result).to.exist;
        expect(result).to.equal(' W:HOWRU HELLO WORLD D SOMETHING');
        done();
    });

});
