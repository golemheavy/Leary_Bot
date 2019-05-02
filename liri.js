function logmsg (msgTextStr) {
	const fs = require('fs');
	fs.appendFileSync('log.txt', "\n\t" + msgTextStr, (err) => {  
		if (err) throw err;
	});
	console.log(msgTextStr);
	//write out html document results.html
	msgTextStr.split("\t").join("&emsp;&emsp;").split("\n").join("<br />");
	fs.appendFileSync('results.html', `<p style="margin:0;">&emsp;` + msgTextStr + `</p>`, (err) => {  
		if (err) throw err;
	});
}

logmsg("----------Loading Data and Packages--------------");

var Spotify = require('node-spotify-api');
if (Spotify) logmsg("Spotify loaded.");
var axios = require('axios');
if (axios) logmsg("Axios loaded.");

if (require("dotenv").config()) logmsg("loaded dotenv successfully");
else logmsg("failed to load dotenv");

var keys = require("./keys.js");
if (keys) logmsg("loaded keys.js");
else logmsg("failed to load keys.js");

logmsg("------------executing liri-bot.js----------------");

logmsg("reading command line arguments.");

(function(strArr) {
	switch(strArr[2]) {
		case "concert-this"		: logmsg("Attempting CONCERT-THIS"); bandsInTown(strArr[3]); break; //Bands-In-Town
		case "spotify-this-song": logmsg("Attempting SPOTIFY-THIS-SONG"); spotifySong(strArr[3]); break; //Spotify
		case "movie-this"		: logmsg("Attempting MOVIE-THIS"); imdbCall(strArr[3]); break; // IMDB
		case "do-what-it-says"	: logmsg("Attempting DO-WHAT-IT-SAYS"); break; //Random input
		default: logmsg("Because you didn't include any command line arguments, the file random.txt will be read for parameter input."); randomInput(); return;//return 0;
	}
}(process.argv));


function randomInput() {
	logmsg("Executing file(random.txt) input");
	const fs = require('fs');
	fs.readFile('random.txt', function(err, data) {
		var dataString = data.toString();
		if (dataString) {
			var dataArr = dataString.split(",");
			if (dataArr[1].includes('"')) var param = dataArr[1].split('"')[1];
			else param = dataArr[1];
			switch(dataArr[0]) {
				case "concert-this"		: logmsg("Attempting CONCERT-THIS"); bandsInTown(param); break; //Bands-In-Town
				case "spotify-this-song": logmsg("Attempting SPOTIFY-THIS-SONG"); spotifySong(param); break; //Spotify
				case "movie-this"		: logmsg("Attempting MOVIE-THIS"); imdbCall(param); break; // IMDB
				default: logmsg("The input in the provided file does not conform to one of the allowable commands: concert-this, spotify-this-song, or movie-this."); randomInput; return 0;
			}
			
		}
	});
}

function bandsInTown(str) {
	var bandName = "WeirdAl";
	if (str) {
		if (str.includes(" ")) str.split(" ").join("+");
		bandName = str;
	}
	axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp").then(function (response) {
		//logmsg(JSON.stringify(response));
		var x;
		var dataObj = response.data;
		for (x in dataObj) {
			
				logmsg("\n\tEvent " + (parseInt(x) + parseInt(1)) + ":");
				logmsg("\tVenue:\t\t" + dataObj[x].venue.name);
				logmsg("\tVenue location:\t" + dataObj[x].venue.city + ", " + response.data[x].venue.region + ", " + dataObj[x].venue.country);
				logmsg("\tDatetime:\t" + dataObj[x].datetime);
			
		}
		
	})
	.catch(function (error) {
		logmsg(error);
	});
}

function spotifySong(trackTitle) {

	var spotify = new Spotify({
		id: process.env.SPOTIFY_ID,
		secret: process.env.SPOTIFY_SECRET
	});

	if (trackTitle) {
		
		logmsg("\tspotifying track title: " + trackTitle);
		
		spotify.search({
			type: 'track',
			query: trackTitle,
			limit: 1
		}, function(err, data) {
			if (err) {
				return logmsg('Error occurred: ' + err);
			}
			logmsg("\tArtist:\t\t" + data.tracks.items[0].artists[0].name); // artist name
			logmsg("\tTrack Title:\t" + data.tracks.items[0].name); // track name
			logmsg("\tSong Preview:\t" + data.tracks.items[0].preview_url); // preview
			logmsg("\tfrom Album:\t" + data.tracks.items[0].album.name); // album name
		});
	}
	else { // fix this branch -- can't get the desired song to return by searching on the title alone
		trackTitle = 'The Sign';
		logmsg("\tno track title provided. Default mode: 'The Sign' by Ace of Base");
	}
	
	// return "spotifySong completed"; // I removed the logmsg of this function's output due to synchronization issues
}

function imdbCall(str) {
	
	var movie = "Mr.+Nobody";
	if (str) {
		if (str.includes(" ")) str.split(" ").join("+");
		movie = str;
	}
	axios.get("https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy").then(function (response) {
		logmsg("\tMovie Title:\t\t" + response.data.Title); // * Title of the movie.
		logmsg("\tYear Released:\t\t" + response.data.Year); // * Year the movie came out.
		logmsg("\tIMDB Rating:\t\t" + response.data.imdbRating); // * IMDB Rating of the movie.
		logmsg("\tRotten Tomatoes Rating:\t" + response.data.Ratings[1].Value); // * Rotten Tomatoes Rating of the movie.
		logmsg("\tCountries Produced in:\t" + response.data.Country); // * Country where the movie was produced.
		logmsg("\tLanguage:\t\t" + response.data.Language); // * Language of the movie.
		logmsg("\tPlot synopsis:\t\t" + response.data.Plot); // * Plot of the movie.
		logmsg("\tActors:\t\t" + response.data.Actors); // * Actors in the movie.
	})
	.catch(function (error) {
		logmsg(error);
	});
}