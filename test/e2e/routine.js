"use strict";

var expect = require('chai').expect;
var eMcellent = require('../../index.js');
var fs = require('fs');
var path = require('path');
var jsdiff = require('diff');
var filePath = path.join(__dirname, '../sample/XINDEX.m');

var fileContents;
var parsedContents;

describe('Parse Entire XINDEX.m Routine >', function () {

    before(function (done) {
        fileContents = fs.readFileSync(filePath, 'utf8');
        done();
    });

    it('Ensure all lines are parsed', function (done) {
        parsedContents = eMcellent.parse(fileContents);
        expect(parsedContents.length).to.equal(144);
        expect(parsedContents[parsedContents.length - 1].lineNumber).to.equal(parsedContents.length);
        done();
    });

});

describe('Render Entire XINDEX.m Routine >', function () {

    it('Diff rendered file and source', function (done) {
        var results = eMcellent.render(parsedContents);
        //fs.writeFileSync(path.join(__dirname, '../sample/XINDEX.m2'), results);
        //fs.writeFileSync(path.join(__dirname, '../sample/XINDEX.json'), JSON.stringify(parsedContents, null, 10));
        jsdiff.diffLines(fileContents, results, function(err, diffRes) {
            if (err) {
                done(err);
            } else {
                expect(diffRes.length).to.equal(1);
                for (var i in diffRes) {
                    expect(diffRes[i].count).to.not.exist();
                    expect(diffRes[i].added).to.not.exist();
                    expect(diffRes[i].removed).to.not.exist();
                }
                done();
            }
        });
    });

});
