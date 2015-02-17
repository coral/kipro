"use strict";

var KiPro = require("./index.js").KiPro;

var kipro = new KiPro("10.47.15.135");

kipro.getClips(function (response) {
	  console.log(response);
});