"use strict";

var events = require("events");
var _ = require("underscore");
var request = require("request");
var fs = require("fs");
var host = "0.0.0.0";

var downloadInstances = 0;
var maxDownloadInstances = 1;
var downloadQueue = [];


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

KiPro.prototype.getMedia = function (file, location, callb) {

	//Setup the transfer logic
	function download()
	{
		downloadQueue.push({host: 'http://'+host+'/media/' + file, file: file, location: location, cb: callb});
		downloader();
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

function downloader()
{

	if(downloadQueue.length > 0)
	{
		if(downloadInstances < maxDownloadInstances)
		{
			pop(downloadQueue.pop());
		}
	}

	function pop(dl)
	{
		downloadInstances++;
		console.log("Transfer of " + dl.host + " initiated.");
		request(dl.host)
		.on('error', function(err) {
			console.log(err)
			downloadInstances--;
			dl.cb(false);
			downloader();
		})
		.on('end', function(end)
		{
			console.log("Transfer of " + dl.host + " completed.");
			downloadInstances--;
			dl.cb(true, dl.location, dl.file);
			downloader();
		})
		.pipe(fs.createWriteStream(dl.location));
	}
	
}

function query(action, cb)
{
	request('http://'+host+'/'+action, cb);
}

exports.KiPro = KiPro