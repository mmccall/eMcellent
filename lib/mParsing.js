/*---------------------------------------------------------------------------
Copyright 2013 Matthew McCall.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
---------------------------------------------------------------------------*/

var mSyntax = require('./mSyntax.js');
var mPackages = require('./mPackages.js');

//Exports allow access in app.js
exports.mParse = mParse;

//This function deconstructs the text-based input into a JSON Array.
function mParse (inputCode, mParseCallback) {
  //Count the lines and iterate each one.
  var returnArray = [];
  var returnCode = {};
  var splitLines = inputCode.split("\r\n");
  var returnCommArray = [];

  //Instantiate all variables.
  var lineNum = null;
  var lineLabel = "";
  var lineExpression = "";
  var lineComment = "";
  var lineIndentation = 0;
  var lineCommands = [];
  var lineRoutines = [];
  var lineParams = [];
  var linePostConditional = "";

  //Walk each line.
  for (i=0;i<splitLines.length;i++) {
    
    //Some basic input validation, so bots don't blow up the database.
    if (splitLines.length < 2) {
      throw "Routines must be at least one line long."
    }
    if (splitLines[1].substring(0,1) !== " " & splitLines[1].substring(0,1) !== "\t") {
      throw "Routines must have an indented second line.";
    }

    //Extract Line Number.
    lineNum = i;

    //Extract Line Label.
    if (splitLines[i].substring(0,1) === " " || splitLines[i].substring(0,1) === "\t") {
    lineLabel = "";
    lineExpression = splitLines[i].substring(1);
    } else {
     var arrayLabels = splitLines[i].split(/[ \t]/, 1);
     lineLabel = arrayLabels[0];
     lineExpression = splitLines[i].substring(lineLabel.length + 1);
    }

    //Extract Line Comments.
    if (lineExpression.search(";") >= 0) {
      for (posComm=0;posComm<lineExpression.length;posComm++) {
        if (lineExpression[posComm] === ";") {
          if ((lineExpression.substring(0,posComm).split("\"").length % 2 !== 0) && (lineExpression.substring(posComm).split("\"").length % 2 !== 0)) {
          lineComment = lineExpression.substring(posComm);
          lineExpression = lineExpression.replace(lineComment, "");
          lineComment = lineComment.substring(1);
          }
        }
      }
    }

    //Extract Indentation.
    var indentSplit = lineExpression.split(" ");
    lineIndentation = 0;
    lineExpression = "";
    for (posIS=0;posIS < indentSplit.length; posIS++) {
      if (indentSplit[posIS].substring(0,1) === ".") {
        lineIndentation = lineIndentation + indentSplit[posIS].lastIndexOf("\.") + 1;
      } else {
        lineExpression = lineExpression + " " + indentSplit[posIS];
      }
    }

/*
    if (lineExpression.substring(0,1) === ".") {
    lineIndentation = lineExpression.split(" ", 1)[0].lastIndexOf("\.") + 1;
    lineExpression = lineExpression.substring(lineIndentation);
    console.log(lineExpression);
    } else {
      lineIndentation = 0;
    }
*/

    //Extract Expressions to array.
    var prePosLE = 0
    for(posLE=0;posLE <= lineExpression.length;posLE++) { 
      if (lineExpression[posLE] === " ") {
        if ((lineExpression.substring(0,posLE).split("\"").length % 2 !== 0) && (lineExpression.substring(posLE).split("\"").length % 2 !== 0)) {
          if (lineExpression.substring(prePosLE,posLE).length > 0) {
            lineCommands.push(lineExpression.substring(prePosLE,posLE));
          } else if (lineExpression.substring(prePosLE,posLE).length === 0 && lineExpression.substring(prePosLE - 1, prePosLE) === " ") {
            lineCommands.push(lineExpression.substring(prePosLE,posLE));
          }
          prePosLE = posLE + 1;
        }
      } else if (posLE === lineExpression.length) {
      if (lineExpression.substring(prePosLE,posLE).length > 0) {lineCommands.push(lineExpression.substring(prePosLE,posLE))};
      prePosLE = 0;
      }
    }

    //Extract Routines & Arguments.
    var lineCommandArray = [];
    var lineFuncArray = [];
    for (posLC=0;posLC<lineCommands.length;posLC++) {
      if (posLC % 2 === 0) {
      lineFuncArray.push(lineCommands[posLC]);
      } else {
      lineFuncArray.push(lineCommands[posLC]);
      lineCommandArray.push(lineFuncArray);
      lineFuncArray = [];
      }
      //Last command doesn't always require parameter, so if Odd Number of Pairs, push it.
      if (lineCommands.length % 2 !== 0 && lineCommands.length > 0 && posLC === (lineCommands.length - 1)) {
      lineCommandArray.push(lineFuncArray);
      lineFuncArray = [];
      }
    }
    //Extract PostConditionals from functions.        
    for (posPC=0;posPC<lineCommandArray.length;posPC++) {
      if (lineCommandArray[posPC][0].match(":") !== null) {
      linePostConditional = lineCommandArray[posPC][0].substring(lineCommandArray[posPC][0].split(":")[0].length + 1);
      lineCommandArray[posPC][0] = lineCommandArray[posPC][0].split(":")[0];
      lineCommandArray[posPC][2] = linePostConditional;
      }
    }

    var lineJSON = {
    "lineNumber": lineNum,
    "lineIndentation": lineIndentation,
    }

    if (lineLabel !== "") {lineJSON["lineLabel"] = lineLabel};
    if (lineComment !== "") {lineJSON["lineComment"] = lineComment};

    if (lineCommandArray) {
      for (posJSON=0;posJSON<lineCommandArray.length;posJSON++) {  
      var commJSON = {};
      commJSON["commandNumber"] = posJSON;
        for (posJSON1=0;posJSON1<lineCommandArray[posJSON].length;posJSON1++) {
          if (posJSON1 === 0) {
          commJSON["command"] = lineCommandArray[posJSON][posJSON1];
          } else if (posJSON1 === 1) {
          commJSON["parameterString"] = lineCommandArray[posJSON][posJSON1];
          } else if (posJSON1 === 2) {
          commJSON["postConditionals"] = lineCommandArray[posJSON][posJSON1];
          }
        }
      returnCommArray.push(commJSON);
      }
    }

  if(returnCommArray.length > 0) {lineJSON["commands"] = returnCommArray};
  returnArray.push(lineJSON);

  //Wipe used variables.
  lineLabel = "";
  lineIndentation = "";
  parseResults = "";
  lineComment = "";
  lineNum = null;
  lineCommands = [];
  returnCommArray = [];

  }
  //Function Level descriptors.
  returnCode["mCode"] = returnArray;

  //Perform Syntax application on JSON Object.
  returnCode = mSyntax.applyCommands(returnCode);
  returnCode = mSyntax.applyFnSET(returnCode);

  var packageCode = mPackages.appendPackageData(returnCode, function(response) {
      mParseCallback(response);
  });
}