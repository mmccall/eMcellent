"use strict";

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

this.extractLabel = extractLabel;

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
                    return inputObject;
                } else {
                    inputObject.lineExpression = inputLine;
                    return inputObject;
                }
            }
        }
    } else {
        inputObject.lineExpression = inputLine;
        return inputObject;
    }
}

this.extractComment = extractComment;

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
    for (var posIS = 0; posIS < inputLine.length; posIS++) {
        if (inputLine[posIS] === ".") {
            indentationCount++;
            if (indentationCount === lineIndentation) {
                lineExpression = inputLine.substring(posIS + 1);
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

this.extractIndentation = extractIndentation;