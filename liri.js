if (require("dotenv").config()) logmsg("loaded dotenv successfully");
else logmsg("failed to load dotenv");

var keys = require("./keys.js");
if (keys) logmsg("loaded keys.js");
else logmsg("failed to load keys.js");

logmsg("calling receiveCommandLineArguments()");
receiveCommandLineArguments(process.argv);

function receiveCommandLineArguments(strArr) {
	switch(strArr[2]) {
		case "concert-this"		: logmsg("Attempting CONCERT-THIS"); break; //Bands-In-Town
		case "spotify-this-song": logmsg("Attempting SPOTIFY-THIS-SONG"); logmsg(spotifySong()); break; //Spotify
		case "movie-this"		: logmsg("Attempting MOVIE-THIS"); break; // IMDB
		case "do-what-it-says"	: logmsg("Attempting DO-WHAT-IT-SAYS"); break; //Random input
		default: logmsg("please include an allowable argument as your first parameter"); return 0;
	}
}


function spotifySong() {
	return "spotifySong called";	
}

function logmsg(msgTextStr) {
	const fs = require('fs');
	fs.appendFile('log.txt', "\n" + msgTextStr, (err) => {  
    if (err) throw err;
    console.log(msgTextStr);
	});
}

//var spotify = new Spotify(keys[spotify]);


