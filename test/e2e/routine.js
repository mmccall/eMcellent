"use strict";

var expect = require('chai').expect;
var eMcellent = require('../../index.js');
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, '../sample/XINDEX.m');

var fileContents;

describe('Parse Entire XINDEX.m Routine >', function () {

    before(function(done) {
        fileContents = fs.readFileSync(filePath, 'utf8');
        done();
    });

    it('Ensure all lines are parsed', function (done) {
        var results = eMcellent.parseRoutine(fileContents);
        expect(results.length).to.equal(144);
        expect(results[results.length-1].lineNumber).to.equal(results.length);
        done();
    });

});