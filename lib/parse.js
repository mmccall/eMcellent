"use strict";

//Extract Labels and Lead Spacing.
function extractLabel(inputLine, inputObject) {

    for (var i = 0; i <= inputLine.length; i++) {
        if (inputLine[i] !== " " && inputLine[i] !== "\t") {
            //If no leading chars, label.
            if (i === 0) {
                inputObject.lineLabel = inputLine.split(/[ \t]/, 1)[0];
                for (var ii = inputObject.lineLabel.length; ii <= inputLine.length; ii++) {
                    //After label spacing.
                    if (inputLine[ii] !== " " && inputLine[ii] !== "\t") {
                        inputObject.lineLeadSpace = inputLine.substring(inputObject.lineLabel.length, ii);
                        inputObject.lineExpression = inputLine.substring(ii);
                        break;
                    }
                    //After label spacing for empty lines.
                    if (ii === (inputLine.length - 1)) {
                        inputObject.lineLeadSpace = inputLine.substring(inputObject.lineLabel.length);
                        inputObject.lineExpression = "";
                        break;
                    }
                }
                break;
                //Unlabeled spacing with code.
            } else {
                inputObject.lineLeadSpace = inputLine.substring(0, i);
                inputObject.lineExpression = inputLine.substring(i);
                break;
            }
        }
        //Unlabeled spacing without code.
        if (i === (inputLine.length - 1)) {
            inputObject.lineLeadSpace = inputLine;
            inputObject.lineExpression = "";
            break;
        }
    }
    return inputObject;
}

//Extract Comments.
function extractComment(inputLine, inputObject) {

    //Semicolon identifies comments.
    if (inputLine.search(";") >= 0) {
        for (var i = 0; i < inputLine.length; i++) {
            if (inputLine[i] === ";") {
                //Check if semicolon is double quoted.
                if ((inputLine.substring(0, i).split("\"").length % 2 !== 0) && (inputLine.substring(i).split("\"").length % 2 !== 0)) {
                    inputObject.lineExpression = inputLine.substring(0, i);
                    inputObject.lineComment = inputLine.substring(i).substring(1);
                    break;
                } else {
                    //Check if semicolon has only trailing quote.
                    if (((inputLine.substring(0, i).replace("").split("\"").length % 2 !== 0) && (inputLine.substring(i).split("\"").length % 2 === 0))) {
                        inputObject.lineExpression = inputLine.substring(0, i);
                        inputObject.lineComment = inputLine.substring(i).substring(1);
                        break;
                    }
                    //If only quoted semicolons, set expression.
                    inputObject.lineExpression = inputLine;
                }
            }
        }
        return inputObject;
        //If no comments, set expression.
    } else {
        inputObject.lineExpression = inputLine;
        return inputObject;
    }
}

//Extract Indentation.
//Assumes inputLine has extracted comments/spacing.
function extractIndentation(inputLine, inputObject) {

    var lineIndentationArray = [];
    var lineIndentation = 0;
    var tmpPosStart = 0;
    var tmpPosEnd = 0;

    for (var i = 0; i <= inputLine.length; i++) {
        //Period identifies indentation.
        if (inputLine[i] === ".") {
            //Second period identifies sub-indentation, push to array.
            if (lineIndentation !== 0) {
                tmpPosEnd = i;
                lineIndentationArray.push(inputLine.substring(tmpPosStart, tmpPosEnd));
            }
            //Flag start position and presence.
            tmpPosStart = i + 1;
            lineIndentation++;
        } else {
            //End of indentation with code.
            if (inputLine[i] !== "." && inputLine[i] !== " " && inputLine[i] !== "\t") {
                //Make sure a period was found.
                if (lineIndentation !== 0) {
                    tmpPosEnd = i;
                    lineIndentationArray.push(inputLine.substring(tmpPosStart, tmpPosEnd));
                    inputObject.lineExpression = inputLine.substring(i);
                }
                break;
            }
            //End of indentation without code.
            if (i === (inputLine.length - 1)) {
                tmpPosEnd = i + 1;
                lineIndentationArray.push(inputLine.substring(tmpPosStart, tmpPosEnd));
                inputObject.lineExpression = inputLine.substring(i + 1);
                break;
            }
        }
    }
    //Only assign array if present.
    if (lineIndentationArray.length > 0) {
        inputObject.lineIndentationArray = lineIndentationArray;
    } else {
        inputObject.lineExpression = inputLine;
    }
    return inputObject;
}

//Divide routines and arguments into array, used by extractRoutines.
function splitRoutinesAndArguments(inputLine) {

    var lineCommands = [];
    var tmpCursor = 0;

    for (var i = 0; i <= inputLine.length; i++) {

        //Flag spaces/tabs as dividers.
        if (inputLine[i] === " " || inputLine[i] === "\t") {
            //Ensure space isn't quoted.
            if ((inputLine.substring(0, i).split("\"").length % 2 !== 0) && (inputLine.substring(i).split("\"").length % 2 !== 0)) {
                //If has content, push.
                if (inputLine.substring(tmpCursor, i).length > 0) {
                    lineCommands.push(inputLine.substring(tmpCursor, i));
                    //Otherwise, push empty commands.
                } else if (inputLine.substring(tmpCursor, i).length === 0 && (inputLine.substring(tmpCursor - 1, tmpCursor) === " " || inputLine.substring(tmpCursor - 1, tmpCursor) === "\t")) {
                    lineCommands.push(inputLine.substring(tmpCursor, i));
                }
                tmpCursor = i + 1;
            }
            //Flag splits at line end.
        } else if (i === inputLine.length) {
            //If has content, push.
            if (inputLine.substring(tmpCursor, i).length > 0) {
                lineCommands.push(inputLine.substring(tmpCursor, i));
                //Gather empty commands from end of line.
            } else if (i === tmpCursor && (inputLine.substring(i - 1, i) === " " || inputLine.substring(i - 1, i) === "/t")) {
                lineCommands.push('');
            }
            //tmpCursor = 0;
        }
    }
    return lineCommands;
}

//Extracts Post-Conditionals from Routines, used by extractRoutines.
function extractPostConditional(inputObject, varObj, changedObj) {

    //Assign to new variable to truncate Routines.
    var tmpObject = inputObject;
    for (var i = 0; i < tmpObject.length; i++) {
        if (tmpObject[i].mRoutine) {
            //Semicolon indicates Post-Conditionals.
            var tmpIndex = tmpObject[i].mRoutine.indexOf(":");
            if (tmpIndex > -1) {
                tmpObject[i].mPostConditional = tmpObject[i].mRoutine.substring(tmpIndex + 1);
                tmpObject[i].mRoutine = tmpObject[i].mRoutine.substring(0, tmpIndex);

                //jrg - extract variables
                extractVars(tmpObject[i].mPostConditional,varObj,changedObj);

            }
        }
    }
    return tmpObject;
}

//Extract Routines.
//Assumes inputLine has extracted comments/spacing/indentation.
function extractRoutines(inputLine, inputObject) {

    var tmpFunction = {};
    var changedObj = {};
    var tmpFunctionArray = [];
    var varObj = {};
    var newedVarObj = {};
    var args,idx;

    //Divide Routines and Arguments.
    inputLine = inputLine.replace(/^\s+/,"");    //kill off any leading spaces that slipped through
    var splitLine = splitRoutinesAndArguments(inputLine);

    //Loop, even is function, odd is arguments.
    var i = 0;
    while (i < splitLine.length) {

        if (i % 2 === 0) {
            tmpFunction.mRoutine = splitLine[i];
        } else {

            tmpFunction.mArguments = splitLine[i];

            //Custom handler for trailing argument spacing.
            //Go until splitline hits a non empty val.
            var ii = i + 1;
            while (ii < splitLine.length) {
                if (splitLine[ii] === "") {
                    splitLine.splice(ii, 1);
                    tmpFunction.mArguments = tmpFunction.mArguments + " ";
                } else {
                    break;
                }
            }

            //jrg - extract variables
            args = tmpFunction.mArguments;
            //if it's a do, the peice before ( is the function.  Don't consider that a variable
            if (tmpFunction.mRoutine == "d")
            {
              idx = args.indexOf('(');
              if (idx > 0) {
                extractVars(args.substring(args.indexOf('(')+1,args.length),varObj,changedObj);
              }
            }

            else if (tmpFunction.mRoutine == "n") {
              extractVars(args,newedVarObj,changedObj);    //can't actually have changed vars here, we'll prevent the crash in case of typos
            }

            else {
              extractVars(args,varObj,changedObj);
            }


            tmpFunction.changedVars = changedObj;
            tmpFunctionArray.push(tmpFunction);
            tmpFunction = {};

        }

        //Last command doesn't always require parameter, so if odd number of pairs, push it.
        if (splitLine.length % 2 !== 0 && splitLine.length > 0 && i === (splitLine.length - 1)) {
            tmpFunction.mRoutine = splitLine[i];
            tmpFunctionArray.push(tmpFunction);
            tmpFunction = {};
        }

        i++;

    }

    //Extract and output Post Conditionals.
    var postConditionFunctionArray = extractPostConditional(tmpFunctionArray,varObj, changedObj);
    if (postConditionFunctionArray.length > 0) {
        inputObject.lineRoutines = postConditionFunctionArray;
    }

    inputObject.vars = varObj;
    inputObject.newedVars = newedVarObj;
    inputObject.changedVars = changedObj;
    return inputObject;
}

//jrg - function to add variables

function extractVars(str,obj,changedObj) {
  var x, changed, ary, i, j;
  str = str.replace(/"(.*?)"/g,"");   //kill anything inside of quotes
  var regex = /^[a-zA-Z][^^]*$/;        //ensure that we don't pick up constants or function calls
  if (str.indexOf("=") == -1) {
    str=str.substring(str.indexOf('(')+1,str.length);   //no equals, so this is a function call.  The function itself is not a variable
  }
  str = str.replace(/[-+*#_<>()!\[\]\\]/g,',');     //mod out by all of the seperators except equal

  var statements = str.split(',');
  for (i in statements) {
    changed = false;

    x=statements[i].replace(/[@\']/g,"");     //pick off negate and indirection

    if (x.indexOf('=') > 0) {
      ary = x.split('=');
      changedObj[ary[0]] = true;

      for (j in ary) {
        if (regex.test(ary[j])) {
          obj[ary[j].replace(':','')] = true;     //select statements occasionally produce the trailing colon
        }
      }

      continue;
    }

    if (x.charAt(0) == '.') {
      changed = true;
    }

    x = x.replace('.','');    //pick off reference
    if (regex.test(x)) {
      obj[x] = true;
      if (changed) {
        changedObj[x] = true;
      }
    }
  }

  return obj;
}




//Export all routines.
module.exports.extractLabel = extractLabel;
module.exports.extractComment = extractComment;
module.exports.extractIndentation = extractIndentation;
module.exports.splitRoutinesAndArguments = splitRoutinesAndArguments;
module.exports.extractPostConditional = extractPostConditional;
module.exports.extractRoutines = extractRoutines;
