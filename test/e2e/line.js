"use strict";

var expect = require('chai').expect;
var eMcellent = require('../../index.js');
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, '../sample/XINDEX.m');

var fileContentArray;

describe('Parse 10 Lines of XINDEX.m >', function () {

    before(function(done) {
        var fileContents = fs.readFileSync(filePath, 'utf8');
        fileContentArray = fileContents.split('\n');
        done();
    });

    it('Test Line Zero', function (done) {
        var currentLine = fileContentArray[0];
        var results = eMcellent.parseLine(currentLine);
        expect(results.lineLabel).to.equal('XINDEX');
        expect(results.lineComment).to.equal('ISC/REL,GFT,GRK,RWF - INDEX & CROSS-REFERENCE ;08/04/08  13:19');
        done();
    });

    it('Test Line One', function (done) {
        var currentLine = fileContentArray[1];
        var results = eMcellent.parseLine(currentLine);
        expect(results.lineComment).to.equal(';7.3;TOOLKIT;**20,27,48,61,66,68,110,121,128,132,133**;Apr 25, 1995;Build 15');
        done();
    });

    it('Test Line Two', function (done) {
        var currentLine = fileContentArray[2];
        var results = eMcellent.parseLine(currentLine);
        expect(results.lineComment).to.equal(' Per VHA Directive 2004-038, this routine should not be modified.');
        done();
    });

    it('Test Line Three', function (done) {
        var currentLine = fileContentArray[3];
        var results = eMcellent.parseLine(currentLine);
        expect(results.lineRoutines[0].mRoutine).to.equal('G');
        expect(results.lineRoutines[0].mArguments).to.equal('^XINDX6');
        done();
    });

    it('Test Line Four', function (done) {
        var currentLine = fileContentArray[4];
        var results = eMcellent.parseLine(currentLine);
        expect(results.lineLabel).to.equal('SEP');
        expect(results.lineRoutines[0].mRoutine).to.equal('F');
        expect(results.lineRoutines[0].mArguments).to.equal('I=1:1');
        expect(results.lineRoutines[1].mRoutine).to.equal('S');
        expect(results.lineRoutines[1].mArguments).to.equal('CH=$E(LIN,I)');
        expect(results.lineRoutines[2].mRoutine).to.equal('D');
        expect(results.lineRoutines[2].mArguments).to.equal('QUOTE:CH=Q');
        expect(results.lineRoutines[3].mRoutine).to.equal('Q');
        expect(results.lineRoutines[3].mPostConditional).to.equal('" "[CH');
        done();
    });

    it('Test Line Five', function (done) {
        var currentLine = fileContentArray[5];
        var results = eMcellent.parseLine(currentLine);
        expect(results.lineRoutines[0].mRoutine).to.equal('S');
        expect(results.lineRoutines[0].mArguments).to.equal('ARG=$E(LIN,1,I-1)');
        expect(results.lineRoutines[1].mRoutine).to.equal('S');
        expect(results.lineRoutines[1].mArguments).to.equal('I=I+1');
        expect(results.lineRoutines[1].mPostConditional).to.equal('CH=" "');
        expect(results.lineRoutines[2].mRoutine).to.equal('S');
        expect(results.lineRoutines[2].mArguments).to.equal('LIN=$E(LIN,I,999)');
        expect(results.lineRoutines[3].mRoutine).to.equal('Q');
        done();
    });

    it('Test Line Six', function (done) {
        var currentLine = fileContentArray[6];
        var results = eMcellent.parseLine(currentLine);
        expect(results.lineLabel).to.equal('QUOTE');
        expect(results.lineRoutines[0].mRoutine).to.equal('F');
        expect(results.lineRoutines[0].mArguments).to.equal('I=I+1:1');
        expect(results.lineRoutines[1].mRoutine).to.equal('S');
        expect(results.lineRoutines[1].mArguments).to.equal('CH=$E(LIN,I)');
        expect(results.lineRoutines[2].mRoutine).to.equal('Q');
        expect(results.lineRoutines[2].mPostConditional).to.equal('CH=""!(CH=Q)');
        done();
    });

    it('Test Line Seven', function (done) {
        var currentLine = fileContentArray[7];
        var results = eMcellent.parseLine(currentLine);
        expect(results.lineRoutines[0].mRoutine).to.equal('Q');
        expect(results.lineRoutines[0].mArguments).to.equal('');
        expect(results.lineRoutines[0].mPostConditional).to.equal('CH]""');
        expect(results.lineRoutines[1].mRoutine).to.equal('S');
        expect(results.lineRoutines[1].mArguments).to.equal('ERR=6');
        expect(results.lineRoutines[2].mRoutine).to.equal('G');
        expect(results.lineRoutines[2].mArguments).to.equal('^XINDX1');
        done();
    });

    it('Test Line Eight', function (done) {
        var currentLine = fileContentArray[8];
        var results = eMcellent.parseLine(currentLine);
        expect(results.lineLabel).to.equal('ALIVE');
        expect(results.lineComment).to.equal('enter here from taskman');
        done();
    });

    it('Test Line Nine', function (done) {
        var currentLine = fileContentArray[9];
        var results = eMcellent.parseLine(currentLine);
        expect(results.lineRoutines[0].mRoutine).to.equal('D');
        expect(results.lineRoutines[0].mArguments).to.equal('SETUP^XINDX7');
        expect(results.lineComment).to.equal('Get ready to process');
        done();
    });

});