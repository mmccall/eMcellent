"use strict";

function parseLine (inputString) {

	var returnObject = {};
	var tmpObject = {};

	tmpObject = extractLabel(inputString, tmpObject);
	
	returnObject = tmpObject;
	return returnObject;
}

this.parseLine = parseLine;



//Extract Line Label.
function extractLabel (inputLine, inputObject) {

    if (inputLine.substring(0,1) === " " || inputLine.substring(0,1) === "\t") {
    	//inputObject.lineLabel = "";
    	inputObject.lineExpression = inputLine.substring(1);
    } else {
     	var arrayLabels = inputLine.split(/[ \t]/, 1);
     	inputObject.lineLabel = arrayLabels[0];
     	inputObject.lineExpression = inputLine.substring(inputObject.lineLabel.length + 1);
    }

    return inputObject;

}


