"use strict";

var parser = require('./lib/parse.js');

function parseLine (inputString) {

	var tmpObject = {};

	//Run through each parsing step sequentially.
	tmpObject = parser.extractLabel(inputString, tmpObject);
	tmpObject = parser.extractComment(tmpObject.lineExpression, tmpObject);
	tmpObject = parser.extractIndentation(tmpObject.lineExpression, tmpObject);
	tmpObject = parser.extractRoutines(tmpObject.lineExpression, tmpObject);
	
	//Line Expression is no longer needed.
	delete tmpObject.lineExpression;
	return tmpObject;
}

function parseRoutine(inputString) {

	//Strip out carriage returns.
	//TODO:  Investigate escape quote checking, if CR/LF can be contained in text block.
	inputString = inputString.replace("\r", "");
	var inputArray = inputString.split('\n');

	var returnArray = [];

	for (var i=0;i<inputArray.length;i++) {
		var tmpLineObject = parseLine(inputArray[i]);
		tmpLineObject.lineNumber = i+1;
		returnArray.push(tmpLineObject);
	}

	return returnArray;

}

module.exports.parseLine = parseLine;
module.exports.parseRoutine = parseRoutine;
