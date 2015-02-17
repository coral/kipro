"use strict";

var KiPro = require("./index.js").KiPro;


var kipro = new KiPro("10.47.15.135");

kipro.getClips(function (response) {
	  console.log(response);
});

/*
kipro.getMedia("RECORDING_1.mov", "test.mov", function(file, location) {
	console.log(file, location)
});
kipro.getMedia("RECORDING_2.mov", "test2.mov", function(file, location) {
	console.log(file, location)
});

*/
