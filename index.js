"use strict";

var parser = require('./lib/parse.js');

function parseLine (inputString) {

	var returnObject = {};
	var tmpObject = {};

	tmpObject = parser.extractLabel(inputString, tmpObject);
	tmpObject = parser.extractComment(tmpObject.lineExpression, tmpObject)
	
	returnObject = tmpObject;
	return returnObject;
}

this.parseLine = parseLine;


