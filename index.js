"use strict";

var events = require("events");
var _ = require("underscore");
var request = require("request");
var host = "0.0.0.0";


function KiPro (newHost) {
	host = newHost;
}

KiPro.prototype.getParameter = function (parameter) {
	
	query('config?action=get&paramid=' + parameter, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	var response = JSON.parse(body);
		  	cb(response);
		}
	});
}

KiPro.prototype.setParameter = function (parameter, value) {
	
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

function query(action, cb)
{
	request('http://'+host+'/'+action, cb);
}

exports.KiPro = KiPro