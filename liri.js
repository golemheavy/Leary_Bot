var logmsg = function(msgTextStr) {
		const fs = require('fs');
		fs.appendFile('log.txt', "\n\t" + msgTextStr, (err) => {  
		if (err) throw err;
		console.log(msgTextStr);
		});
	}

setTimeout(function(){
	if (require("dotenv").config()) logmsg("loaded dotenv successfully");
	else logmsg("failed to load dotenv");
}, 0);

setTimeout(function(){
	var keys = require("./keys.js");
	if (keys) logmsg("loaded keys.js");
	else logmsg("failed to load keys.js");
}, 0);

setTimeout(function(){
	logmsg("reading command line arguments.");
}, 0);

setTimeout(function(){
	(function(strArr) {
		switch(strArr[2]) {
			case "concert-this"		: logmsg("Attempting CONCERT-THIS"); break; //Bands-In-Town
			case "spotify-this-song": logmsg("Attempting SPOTIFY-THIS-SONG"); logmsg(spotifySong(strArr[3])); break; //Spotify
			case "movie-this"		: logmsg("Attempting MOVIE-THIS"); break; // IMDB
			case "do-what-it-says"	: logmsg("Attempting DO-WHAT-IT-SAYS"); break; //Random input
			default: logmsg("please include an allowable argument as your first parameter"); return 0;
		}
	}(process.argv));
}, 0);

function spotifySong(trackTitle) {
	if (trackTitle) logmsg("\tspotifying track title: " + trackTitle);
	else logmsg("\tno track title provided.");
	return "spotifySong completed";
}

//var spotify = new Spotify(keys[spotify]);