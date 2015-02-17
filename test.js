"use strict";

var KiPro = require("./index.js").KiPro;


var kipro = new KiPro("10.47.15.135");
/*
kipro.getClips(function (response) {
	  console.log(response);
});
*/

kipro.getMedia("RECORDING_1.mov", "test.mov", function(file, location) {
	console.log(file, location)
});
kipro.getMedia("RECORDING_2.mov", "test2.mov", function(file, location) {
	console.log(file, location)
});
/*
var test = new Date('02/17/15 10:26:47');
var newDate = "" + test.getFullYear()  + numPad0(test.getMonth()+1) + test.getDate();
console.log(newDate);

function numPad0( str ){
	var cStr = str.toString();
	if( cStr.length < 2 ){
		 str = 0 + cStr;
	}
	return str;
}*/