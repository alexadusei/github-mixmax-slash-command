var sync = require('synchronize');
var request = require('request');
var MetaInspector = require('node-metainspector');

// The API that returns the in-email representation.
module.exports = function(req, res) {
    var user = req.query.text.trim();
    handleAccount(user, req, res);
};

function imgData(url) {
	var img = new Image();
	img.onload = function() {
		alert
	}
}

function handleAccount(user, req, res) {
    var response;
    var metadata;

	try {
		response = sync.await(request({
			url: 'https://api.github.com/users/' + user,
			'headers': {
				'user-agent': 'alexadusei'
			},
			json: true,
			timeout: 10 * 1000,
		}, sync.defer()));
	} catch (e) {
		res.status(500).send('Error');
		return;
	}

	// Scrape metadata from website to get the description using MetaInspector
	metadata = new MetaInspector(response.body.html_url, { timeout: 5000 });

	metadata.on("fetch", function() {
		// This resolver picks up both users and organizations, which have 
		// differing bios/names. Simple ternary operators decide what info to display
		var description = response.body.type == "User" ? metadata.description : response.body.bio;
		var userName = response.body.login;
		var name = response.body.name;
		var nameTitle;

		// Do some simple parsing for the name based on whether it's a person/org
		if (response.body.type == "User") {
			// Check for bot-users, who will have no name, but a username
			nameTitle = !name ? userName : userName + ' (' + name + ')';  
		} else {
			nameTitle = name;
		}

		// Use variables to reduce verbosity for the html variable
		var mmURL = "https://mixmax.com/r/unTQJgDzxhtPpY9Gu";
		var mmImgSrc = "https://emailapps.mixmax.com/img/badge_mixmax.png";
		var githubURL = response.body.html_url;

		var html = '<a href="' + githubURL + '"><img style="height:100px;float:left" src="' + response.body.avatar_url + '"></a>' +
		'<a style="color:black;text-decoration:none" href="' + githubURL + '">' +
		"<div style='margin-left:110px';padding-bottom:0px;font-family:'Consolas',sans-serif;>" +
	  	'<h3 style="padding:0px;margin:0px;">' + nameTitle + '</h3>' +
	  	'<p>' + description+ '</p>' +
	  	'<a style="float:right" href="' + mmURL + '">' +
	  	'<img style="height:20px;margin-right:5px;padding-bottom:0px;" src="' + mmImgSrc + '"></a>' +
		'</div></a>';

		res.json({
		    body: html
		});
	})

	metadata.on("error", function(err) {
		console.log("Error");
	})

	metadata.fetch();
}