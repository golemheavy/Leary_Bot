var Spotify = require('node-spotify-api');

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
			case "spotify-this-song": setTimeout(function(){logmsg("Attempting SPOTIFY-THIS-SONG");}, 0); setTimeout(function(){logmsg(spotifySong(strArr[3]));}, 0); break; //Spotify
			case "movie-this"		: logmsg("Attempting MOVIE-THIS"); break; // IMDB
			case "do-what-it-says"	: logmsg("Attempting DO-WHAT-IT-SAYS"); break; //Random input
			default: logmsg("please include an allowable argument as your first parameter"); return 0;
		}
	}(process.argv));
}, 0);

function spotifySong(trackTitle) {
	if (trackTitle) logmsg("\tspotifying track title: " + trackTitle);
	else {
		trackTitle = 'The Sign';
		logmsg("\tno track title provided. Default mode: 'The Sign' by Ace of Base");
	}
	
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
	
	spotify.search({
		type: 'track',
		query: trackTitle,
		limit: 1
	}, function(err, data) {
		if (err) {
			return logmsg('Error occurred: ' + err);
		}
		//logmsg(JSON.stringify(data, null, '\t'));
		//logmsg("\tArtist:\n\tTrack Title:\n\tSong Preview:\n\tAlbum:");
		logmsg("\tArtist:\t\t" + data.tracks.items[0].artists[0].name); // artist name
		logmsg("\tTrack Title:\t" + data.tracks.items[0].name); // track name
		logmsg("\tSong Preview:\t" + data.tracks.items[0].preview_url); // preview
		logmsg("\tfrom Album:\t" + data.tracks.items[0].album.name); // album name
		
	});
	
	return "spotifySong completed";
}