eMcellent-parse
=========

[![Build Status](https://travis-ci.org/mmccall/eMcellent-parse.svg?branch=master)](https://travis-ci.org/mmccall/eMcellent-parse) [![Coverage Status](https://coveralls.io/repos/mmccall/eMcellent-parse/badge.svg)](https://coveralls.io/r/mmccall/eMcellent-parse)

A most excellent M/MUMPS parsing library; eMcellent-parse takes input M/MUMPS code and transforms it into JSON-based representations of the code.  This can be used in translation and/or markup to make the source code more readily interpretable.

### Getting Started

The code is built to be run in either Node.js or the browser; it uses native Javascript parsing and has no intrinsic dependencies outside of those used during builds.

To use in Node.js, the package is available via `npm`.  To use locally, you will only need to install dependencies using `npm install`.  To test, the default `grunt` task will execute all test cases.

To use in the browser, install dependencies with `npm install`, and run `grunt build:browser`.  Browserify will convert the package into a Commonjs format, minify it, and output it to `/dist/emcellent-parse.min.js`.

### Functions

The library has two entry functions; note that both functions are synchronous.  In the browser, these can be accessed as elements of the mParse object (ex. `mParse.parse();` ).

#### parse()

`parse(inputString)`

Parses a line or lines of M/MUMPS code into the JSON representation.

`inputString` - A Line of M/MUMPS code, or an entire routine.

#### render()

`render(inputJSON)`

Renders either a single JSON representation, or an Array of JSON representations as text.

`inputJSON` - A JSON object or array of JSON objects representing MUMPS code.

### JSON Format

Parsed lines will be returned in the below format; this is the format for rendering objects as well.

```
{
	lineNumber: Number,  //Number of the Line.
	lineLeadSpace: String,  //Variable Starting Spacing.
	lineLabel: String,  //Label of the Line of Code.
	lineComment: String,  //Comment field of the Line of Code.
	lineIndentationArray: [String],  //Array of Indentations, represents nesting.
    lineRoutines: [{
        mRoutine: String,  //A MUMPS Routine.
        mArguments: String,  //Arguments for the MUMPS Routine.
        mPostConditional: String,  //Post Conditional Arguments for the Routine.
    }]
}
```
### Contributions

Pull requests are welcome, just be sure to include test cases.

This code is licensed under Apache 2.0.
