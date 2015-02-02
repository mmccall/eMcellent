eMcellent-parse
=========

[![Build Status](https://travis-ci.org/mmccall/eMcellent-parse.svg?branch=master)](https://travis-ci.org/mmccall/eMcellent-parse)


A most excellent M/MUMPS parsing library; eMcellent-parse takes input M/MUMPS code and transforms it into JSON-based representations of the code.  This can be used in translation and/or markup to make the source code more readily interpretable.

###Getting Started

The code is currently designed to only run in Node.js; it has no external dependencies outside of those which are available through Node.  However, to test, run `npm install` to download the `Grunt` Build tool and related dependencies.

###Functions

The library has two entry functions; note that both functions are synchronous.

####parseLine

`parseLine(inputString)`

Parses a single line of M/MUMPS code into the JSON representation.

`inputString` - A Line of M/MUMPS code.

####parseRoutine

`parseRoutine(inputString)`

Parses a routine of M/MUMPS code, returning an array of JSON representations marked up with line numbers.

`inputString` - An entire routine of M/MUMPS code, with lines separated by line feeds.

###Return Format

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

