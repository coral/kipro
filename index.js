"use strict";

var events = require("events");
var _ = require("underscore");
var request = require("request");
var fs = require("fs");
var host = "0.0.0.0";


function KiPro (newHost) {
	host = newHost;
}

KiPro.prototype.getParameter = function (parameter, cb) {
	
	query('config?action=get&paramid=' + parameter, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	var response = JSON.parse(body);
		  	cb(response);
		}
	});
}

KiPro.prototype.setParameter = function (parameter, value, cb) {
	
	query('config?action=set&paramid=' + parameter + '&value=' + value, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	var response = JSON.parse(body);
		  	cb(response);
		}
	});
}

KiPro.prototype.getClips = function (cb) {

	query('clips?action=get_clips', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	var response = JSON.parse(body);
		  	cb(response);
		}
	});

}

KiPro.prototype.getPlaylists = function (cb) {

	query('clips?action=get_playlists', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	var response = JSON.parse(body);
		  	cb(response);
		}
	});

}

KiPro.prototype.getMedia = function (file, location, cb) {

	//Setup the transfer logic
	function download()
	{
		console.log("Transfer of " + file + "initiated.");
		request('http://'+host+'/media/' + file).pipe(fs.createWriteStream(location));
		console.log("Transfer of " + file + "completed.");
		cb(file, location);
	}

	//Check if KiPro is in DATA-LAN mode
	KiPro.prototype.getParameter("eParamID_MediaState", function(cb) {
		if(cb.value==0) {
			KiPro.prototype.setParameter("eParamID_MediaState", 1, download);
		} else 
		{
			download();
		}

	});


}

function query(action, cb)
{
	request('http://'+host+'/'+action, cb);
}

exports.KiPro = KiPro