
"use strict"

var fs = require('fs');
var _ = require('lodash');
var expect = require('chai').expect;
var eMcellent = require('../../index.js');
var path = require('path');
var recursive = require('recursive-readdir');

var config = {};

config.src = "../../../VistA-M/Packages";
config.target = "./target";


config.throttle = 1;


recursive(path.join(__dirname, config.src), ["*.zwr", ".DS_Store"], function(err, files) {

	if (config.throttle) {
		files.splice(config.throttle, files.length - config.throttle);
	}

	for (var i in files) {
		console.log(files[i]);
		processFile(files[i], function(err, data) {



		});
	}



});


function processFile(inputPath, callback) {

	fs.readFile(inputPath, {encoding: 'utf8'}, function (err, data) {
		if (err) {callback(err)};
		var parseResults = eMcellent.parse(data);
		console.log(fileResults);



	});



}




/*
var walk = function (dir, done) {
	var results = [];
	fs.readdir(dir, function(err, list) {
		if (err) return done(err);
		var pending = list.length;
		if (!pending) return done(null, results);
		list.forEach(function(file) {
			fs.stat(file, function(err, stat) {
				if (stat && stat.isDirectory()) {
					walk(file, function(err, res) {
						results = results.concat(res);
						if (!--pending) done(null, results);
					});
				} else {
					results.push(file);
					if (!--pending) done(null, results);
				}
			});
		});
	});

}

walk(, function(err, results) {

	console.log(results);

});*/