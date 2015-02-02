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




}

module.exports.parseLine = parseLine;
module.exports.parseRoutine = parseRoutine;
