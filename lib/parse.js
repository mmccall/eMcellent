"use strict";

//Extract Line Label.
function extractLabel(inputLine, inputObject) {

    var lineLabel = "";
    var lineExpression = "";
    var lineLeadSpace = "";

    for (var i = 0; i <= inputLine.length; i++) {

        if (inputLine[i] !== " " && inputLine[i] !== "\t") {

            //If first entry, it's a label.
            if (i === 0) {
                lineLabel = inputLine.split(/[ \t]/, 1)[0];
                for (var ii = lineLabel.length; ii <= inputLine.length; ii++) {
                    if (inputLine[ii] !== " " && inputLine[ii] !== "\t") {
                        lineLeadSpace = inputLine.substring(lineLabel.length, ii);
                        lineExpression = inputLine.substring(ii);
                        break;
                    }

                    if (ii === (inputLine.length - 1)) {
                        lineLeadSpace = inputLine.substring(lineLabel.length);
                        lineExpression = "";
                        break;
                    }

                }
                break;
            } else {
                lineLeadSpace = inputLine.substring(0, i);
                lineExpression = inputLine.substring(i);
                break;
            }
        }

        //console.log('ln:' + inputLine[i]);
        //console.log(i);
        //console.log(inputLine.length);

        if (i === (inputLine.length - 1)) {
            //console.log('hit');
            lineLeadSpace = inputLine;
            lineExpression = "";
            break;
        }

    }

    if (lineLabel) {
        inputObject.lineLabel = lineLabel;
    }

    if (lineLeadSpace) {
        inputObject.lineLeadSpace = lineLeadSpace;
    }

    inputObject.lineExpression = lineExpression;
    return inputObject;

    /*if (inputLine.substring(0, 1) === " " || inputLine.substring(0, 1) === "\t") {
        //inputObject.lineLabel = "";
        inputObject.lineExpression = inputLine.substring(1);
    } else {
        var arrayLabels = inputLine.split(/[ \t]/, 1);
        inputObject.lineLabel = arrayLabels[0];
        inputObject.lineExpression = inputLine.substring(inputObject.lineLabel.length + 1);
    }

    return inputObject;*/

}

//Extract Comments.
function extractComment(inputLine, inputObject) {

    if (inputLine.search(";") >= 0) {

        var lineComment = "";

        for (var posComm = 0; posComm < inputLine.length; posComm++) {
            if (inputLine[posComm] === ";") {
                //Check to ensure semicolon not used in text block.
                //console.log('lead');
                //console.log(posComm);
                //console.log(inputLine.substring(0, posComm).split("\"").length % 2);
                //console.log(inputLine.substring(posComm).split("\"").length % 2);
                //console.log('----');

                //Logic says if there is no leading and trailing quote.  Could also be if there is only a leading quote or trailing quote.
                if ((inputLine.substring(0, posComm).replace("").split("\"").length % 2 !== 0) && (inputLine.substring(posComm).split("\"").length % 2 !== 0)) {
                    lineComment = inputLine.substring(posComm);
                    inputObject.lineExpression = inputLine.substring(0, posComm);
                    inputObject.lineComment = lineComment.substring(1);
                    break;
                } else {
                    if (((inputLine.substring(0, posComm).replace("").split("\"").length % 2 !== 0) && (inputLine.substring(posComm).split("\"").length % 2 === 0))) {
                        lineComment = inputLine.substring(posComm);
                        inputObject.lineExpression = inputLine.substring(0, posComm);
                        inputObject.lineComment = lineComment.substring(1);
                        break;
                    }

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
    var lineIndentationSpace = "";
    var lineIndentationArray = [];

    var tmpPosStart = 0;
    var tmpPosEnd = 0;

    var lineEntry;

    for (var strPos = 0; strPos <= inputLine.length; strPos++) {

        if (inputLine[strPos] === ".") {

            //if not first indentation, flag it.
            if (lineIndentation !== 0) {
                tmpPosEnd = strPos;
                //console.log("'" + inputLine.substring(tmpPosStart, tmpPosEnd) + "'");
                lineEntry = inputLine.substring(tmpPosStart, tmpPosEnd);
                lineIndentationArray.push(lineEntry);
            }

            tmpPosStart = strPos + 1;
            lineIndentation++;

        } else {

            //If you hit a non space, tab, or dot, take the string.
            if (inputLine[strPos] !== "." && inputLine[strPos] !== " " && inputLine[strPos] !== "\t") {

                if (lineIndentation !== 0) {
                    tmpPosEnd = strPos;
                    lineEntry = inputLine.substring(tmpPosStart, tmpPosEnd);
                    lineExpression = inputLine.substring(strPos);
                    lineIndentationArray.push(lineEntry);

                }

                break;

            }

            //If empty line, need to handle corner case.
            if (strPos === (inputLine.length - 1)) {

                tmpPosEnd = strPos + 1;
                lineEntry = inputLine.substring(tmpPosStart, tmpPosEnd);
                lineExpression = inputLine.substring(strPos + 1);
                lineIndentationArray.push(lineEntry);
                break;

            }

        }

    }

    //console.log(lineIndentationArray);

    if (lineIndentationArray.length > 0) {

        inputObject.lineIndentationArray = lineIndentationArray;
        inputObject.lineExpression = lineExpression;
    } else {
        inputObject.lineExpression = inputLine;
    }

    return inputObject;

    /*



        //Remove starting tab or space if present.
        if (inputLine.substring(0, 1) === " " || inputLine.substring(0, 1) === "\t") {
            inputLine = inputLine.substring(1);
        }

        //First position dot indicates indentation.
        if (inputLine.substring(0, 1) === ".") {

            //Variable for containing post period content.
            var tmpContents = "";
            var tmpPosStart = 0;
            var tmpPosEnd = 0;

            //Loop to find dots and spaces.
            for (var posIS = 0; posIS < inputLine.length; posIS++) {

                //If you find a dot, see if there is trailing space.
                if (inputLine[posIS] === ".") {

                    //if not first indentation, flag it.
                    if (lineIndentation !== 0) {
                        tmpPosEnd = posIS;
                        //console.log("'" + inputLine.substring(tmpPosStart, tmpPosEnd) + "'");
                        lineIndentationSpace = inputLine.substring(tmpPosStart, tmpPosEnd);
                        lineIndentationArray.push(lineIndentationSpace);
                    }

                    tmpPosStart = posIS + 1;
                    lineIndentation++;

                } else {

                    //If you hit a non space, tab, or dot, take the string.
                    if (inputLine[posIS] !== "." && inputLine[posIS] !== " " && inputLine[posIS] !== "\t") {
                        tmpPosEnd = posIS;
                        lineIndentationSpace = inputLine.substring(tmpPosStart, tmpPosEnd);
                        lineExpression = inputLine.substring(posIS);
                        lineIndentationArray.push(lineIndentationSpace);
                        break;

                    }

                    //If empty line, need to handle corner case.
                    if (posIS === (inputLine.length - 1)) {
                        tmpPosEnd = posIS + 1;
                        lineIndentationSpace = inputLine.substring(tmpPosStart, tmpPosEnd);
                        lineIndentationArray.push(lineIndentationSpace);
                        lineExpression = inputLine.substring(posIS + 1);
                        break;

                    }

                }

            }
        } */

    /*

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
    } */

    /*
    if (lineIndentation > 0) {
        inputObject.lineIndentationArray = lineIndentationArray;
        inputObject.lineExpression = lineExpression;
    } else {
        inputObject.lineExpression = inputLine;
    }

    return inputObject; */

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

            /*
            console.log('cursor: ' + tmpCursor);
            console.log('iter: ' + i);
            console.log('cursor_letter: ' + inputLine[i]);
            console.log('iter_letter: ' + inputLine[tmpCursor]);
            */

            if (inputLine.substring(tmpCursor, i).length > 0) {
                lineCommands.push(inputLine.substring(tmpCursor, i));
                //if iter and cursor both at end
            } else if (i === tmpCursor && (inputLine.substring(i - 1, i) === " " || inputLine.substring(i - 1, i) === "/t")) {
                lineCommands.push('');

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
