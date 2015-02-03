eMcellent-parse
=========

[![Build Status](https://travis-ci.org/mmccall/eMcellent-parse.svg?branch=master)](https://travis-ci.org/mmccall/eMcellent-parse) [![Coverage Status](https://coveralls.io/repos/mmccall/eMcellent-parse/badge.svg)](https://coveralls.io/r/mmccall/eMcellent-parse)

A most excellent M/MUMPS parsing library; eMcellent-parse takes input M/MUMPS code and transforms it into JSON-based representations of the code.  This can be used in translation and/or markup to make the source code more readily interpretable.

### Getting Started

The code is built to be run in either Node.js or the browser; it uses native Javascript parsing and has no intrinsic dependencies outside of those used during builds.

To use in Node.js, the package is available via `npm`.  To use locally, you will only need to install dependencies using `npm install`.  To test, the default `grunt` task will execute all test cases.

To use in the browser, install dependencies with `npm install`, and run `grunt build:browser`.  Browserify will convert the package into a Commonjs format, minify it, and output it to `/dist/emcellent.min.js`.

### Functions

The library has two entry functions; note that both functions are synchronous.

#### parseLine

`parseLine(inputString)`

Parses a single line of M/MUMPS code into the JSON representation.

`inputString` - A Line of M/MUMPS code.

#### parseRoutine

`parseRoutine(inputString)`

Parses a routine of M/MUMPS code, returning an array of JSON representations marked up with line numbers.

`inputString` - An entire routine of M/MUMPS code, with lines separated by line feeds.

### Return Format

Parsed lines will be returned in the below format; parseRoutine returns an array of these objects.

```
{
	lineLabel: String,
	lineNumber: Number,
	lineComment: String,
	lineIndentation: Number,
    lineRoutines: [{
        mRoutine: String,
        mArguments: String,
        mPostConditional: String,
    }]
}
```
### Contributions

Pull requests are welcome, just be sure to include test cases.
