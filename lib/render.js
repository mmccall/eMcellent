"use strict";

//Append Line Label.
function appendLabel(inputObject, inputLine) {

    if (inputObject.lineLabel) {
        inputLine = inputLine + inputObject.lineLabel;
    }

    return inputLine;

}

module.exports.appendLabel = appendLabel;

function appendComment(inputObject, inputLine) {

    if (inputObject.hasOwnProperty("lineComment")) {

        inputLine = inputLine + " ;" + inputObject.lineComment;

    }

    return inputLine;

}

module.exports.appendComment = appendComment;

function appendIndentation(inputObject, inputLine) {

    if (inputObject.lineIndentation) {

        var tmpIndentation = " ";
        for (var i = 0; i < inputObject.lineIndentation; i++) {

            if (inputObject.lineIndentationSpace === true) {
                tmpIndentation = tmpIndentation + ". ";
            } else {
                tmpIndentation = tmpIndentation + ".";

            }



            /*
            if (i !== (inputObject.lineIndentation - 1)) {

                tmpIndentation = tmpIndentation + ". ";
            } else {
                tmpIndentation = tmpIndentation + ".";
            }*/

        }

        inputLine = inputLine + tmpIndentation;

    }

    return inputLine;

}

module.exports.appendIndentation = appendIndentation;

function appendRoutines(inputObject, inputLine) {

    // console.log(inputObject.lineRoutines);

    if (inputObject.lineRoutines) {
        for (var i in inputObject.lineRoutines) {
            if (inputObject.lineRoutines[i].mRoutine) {

                //Leave off leading space for first routine.
                if (i === "0") {
                    if (inputLine === "") {
                        inputLine = " ";
                    }
                        inputLine = inputLine + inputObject.lineRoutines[i].mRoutine;    
                    
                } else {
                    inputLine = inputLine + " " + inputObject.lineRoutines[i].mRoutine;
                }

                if (inputObject.lineRoutines[i].mPostConditional) {
                    inputLine = inputLine + ":" + inputObject.lineRoutines[i].mPostConditional;
                }

                if (inputObject.lineRoutines[i].hasOwnProperty("mArguments")) {
                    inputLine = inputLine + " " + inputObject.lineRoutines[i].mArguments;
                }
            }

        }
    }

    return inputLine;

}

module.exports.appendRoutines = appendRoutines;

/*
//Extract Line Label.
function extractLabel(inputLine, inputObject) {

    if (inputLine.substring(0, 1) === " " || inputLine.substring(0, 1) === "\t") {
        //inputObject.lineLabel = "";
        inputObject.lineExpression = inputLine.substring(1);
    } else {
        var arrayLabels = inputLine.split(/[ \t]/, 1);
        inputObject.lineLabel = arrayLabels[0];
        inputObject.lineExpression = inputLine.substring(inputObject.lineLabel.length + 1);
    }

    return inputObject;

}

//Extract Comments.
function extractComment(inputLine, inputObject) {
    if (inputLine.search(";") >= 0) {
        for (var posComm = 0; posComm < inputLine.length; posComm++) {
            if (inputLine[posComm] === ";") {
                //Check to ensure semicolon not used in text block.
                if ((inputLine.substring(0, posComm).split("\"").length % 2 !== 0) && (inputLine.substring(posComm).split("\"").length % 2 !== 0)) {
                    var lineComment = inputLine.substring(posComm);
                    inputObject.lineExpression = inputLine.replace(lineComment, "");
                    inputObject.lineComment = lineComment.substring(1);
                    break;
                } else {
                    inputObject.lineExpression = inputLine;
                }
            }
        }

        return inputObject;

    } else {
        inputObject.lineExpression = inputLine;
        return inputObject;
    }
}

//Assumes no comments or labels.
function extractIndentation(inputLine, inputObject) {

    var lineIndentation = 0;
    var lineExpression = "";

    //Flatten all spaces and tabs from string.
    var parseLine = inputLine.replace(/[\s\t]/g, "");

    //First char must be ".", get indentation count.
    if (parseLine.substring(0, 1) === ".") {
        for (var posIS = 0; posIS < parseLine.length; posIS++) {
            if (parseLine[posIS] === ".") {
                lineIndentation++;
            } else {
                break;
            }
        }
    }

    //Use indentation count to filter string.
    var indentationCount = 0;
    for (var posIC = 0; posIC < inputLine.length; posIC++) {
        if (inputLine[posIC] === ".") {
            indentationCount++;
            if (indentationCount === lineIndentation) {
                lineExpression = inputLine.substring(posIC + 1);
                break;
            }
        }
    }

    if (lineIndentation > 0) {
        inputObject.lineIndentation = lineIndentation;
        inputObject.lineExpression = lineExpression;
    } else {
        inputObject.lineExpression = inputLine;
    }

    return inputObject;

}

//Assumes no comments, labels, or indentation.
//Parses routines and arguments into array.
function splitRoutinesAndArguments(inputLine) {

    var lineCommands = [];

    //Extract Expressions to array.
    var tmpCursor = 0;
    for (var i = 0; i <= inputLine.length; i++) {

        if (inputLine[i] === " " || inputLine[i] === "\t") {

            //Make sure space isn't in a quote block, inline quotes are '""', so this approach works.
            if ((inputLine.substring(0, i).split("\"").length % 2 !== 0) && (inputLine.substring(i).split("\"").length % 2 !== 0)) {
                //If it actually has content, push.
                if (inputLine.substring(tmpCursor, i).length > 0) {
                    lineCommands.push(inputLine.substring(tmpCursor, i));
                    //Otherwise, push if empty commands.
                } else if (inputLine.substring(tmpCursor, i).length === 0 && (inputLine.substring(tmpCursor - 1, tmpCursor) === " " || inputLine.substring(tmpCursor - 1, tmpCursor) === "\t")) {
                    lineCommands.push(inputLine.substring(tmpCursor, i));
                }
                tmpCursor = i + 1;
            }

        } else if (i === inputLine.length) {
            if (inputLine.substring(tmpCursor, i).length > 0) {
                lineCommands.push(inputLine.substring(tmpCursor, i));
            }
            tmpCursor = 0;
        }
    }

    return lineCommands;

}

//Called After routine extraction, splits postconditionals from input.
//Accepts the Array created in extractRoutines.
function extractPostConditional(inputObject) {

    var tmpObject = inputObject;

    for (var i = 0; i < tmpObject.length; i++) {
        if (tmpObject[i].mRoutine) {
            var tmpIndex = tmpObject[i].mRoutine.indexOf(":");
            if (tmpIndex > -1) {
                tmpObject[i].mPostConditional = tmpObject[i].mRoutine.substring(tmpIndex + 1);
                tmpObject[i].mRoutine = tmpObject[i].mRoutine.substring(0, tmpIndex);
            }
        }
    }

    return tmpObject;
}

//Takes input Line and Object and splits into Routines/Arguments.
function extractRoutines(inputLine, inputObject) {

    var splitLine = splitRoutinesAndArguments(inputLine);
    var tmpFunction = {};
    var tmpFunctionArray = [];

    //Loop, even is function, odd is arguments.
    for (var i = 0; i < splitLine.length; i++) {
        if (i % 2 === 0) {
            tmpFunction.mRoutine = splitLine[i];
        } else {
            tmpFunction.mArguments = splitLine[i];
            tmpFunctionArray.push(tmpFunction);
            tmpFunction = {};
        }

        //Last command doesn't always require parameter, so if odd number of pairs, push it.
        if (splitLine.length % 2 !== 0 && splitLine.length > 0 && i === (splitLine.length - 1)) {
            tmpFunction.mRoutine = splitLine[i];
            tmpFunctionArray.push(tmpFunction);
            tmpFunction = {};
        }
    }

    var postConditionFunctionArray = extractPostConditional(tmpFunctionArray);

    if (postConditionFunctionArray.length > 0) {
        inputObject.lineRoutines = postConditionFunctionArray;
    }

    return inputObject;

}

module.exports.extractLabel = extractLabel;
module.exports.extractComment = extractComment;
module.exports.extractIndentation = extractIndentation;
module.exports.splitRoutinesAndArguments = splitRoutinesAndArguments;
module.exports.extractPostConditional = extractPostConditional;
module.exports.extractRoutines = extractRoutines;
*/