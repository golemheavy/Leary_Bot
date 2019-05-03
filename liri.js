function logmsg (msgTextStr) {
	
	const fs = require('fs');
	try {
		fs.appendFileSync('log.txt', "\n\t" + msgTextStr, (err) => {
			if (err) throw err;
		});
	}
	catch (err) {
		console.log("Error: ");
		console.log(err);
	}
	console.log(msgTextStr);
	try {
		//write out html document results.html
		msgTextStr.split("\t").join("&emsp;&emsp;").split("\n").join("<br />");
		fs.appendFileSync('results.html', `<p style="margin:0;">&emsp;` + msgTextStr + `</p>`, (err) => {  
			if (err) throw err;
		});
	}
	catch (err) {
		console.log("Error: ");
		console.log(err);
	}
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

var moment = require('moment');
if (keys) logmsg("loaded moment");
else logmsg("failed to load moment");


logmsg("------------executing liri-bot.js----------------");

logmsg("reading command line arguments.");

(function(strArr) {
	
	var multiWordParam = "";
	for (let i = 3; i < strArr.length; i++) {
		if (multiWordParam) multiWordParam += "+";
		multiWordParam += strArr[i];
	};
	
	let command = "";
	if (strArr[2]) command = strArr[2];
	
	switch(command.trim().toLowerCase()) {
		case "concert-this"		: logmsg("Attempting CONCERT-THIS"); bandsInTown(multiWordParam); break; //Bands-In-Town
		case "spotify-this-song": logmsg("Attempting SPOTIFY-THIS-SONG"); spotifySong(multiWordParam); break; //Spotify
		case "movie-this"		: logmsg("Attempting MOVIE-THIS"); imdbCall(multiWordParam); break; // IMDB
		case "do-what-it-says"	: logmsg("Attempting DO-WHAT-IT-SAYS"); randomInput(); break; //Random input
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
			let command = "";
			let param = "";
			if (dataArr.length > 0) { // put the argument concatenation logic here in this branch
				param = dataArr[1].split('"').join().trim().split(" ").join("+");
			}
			//else if (dataArr.length === 0){} // then there is no param, leave it as an empty string, but set command
			
			command = dataArr[0].trim().toLowerCase();
		
			switch(command) {
				case "concert-this"		: logmsg("Attempting CONCERT-THIS"); bandsInTown(param); break; //Bands-In-Town
				case "spotify-this-song": logmsg("Attempting SPOTIFY-THIS-SONG"); spotifySong(param); break; //Spotify
				case "movie-this"		: logmsg("Attempting MOVIE-THIS"); imdbCall(param); break; // IMDB
				default: logmsg("The input in the provided file does not conform to one of the allowable commands: concert-this, spotify-this-song, or movie-this."); randomInput; return 0;
			}
			
		}
	});
}

function bandsInTown(str) {
	var bandName = "Weird+Al"; 
	if (str) {
		if (str.includes(" ")) str.split(" ").join("+");
		bandName = str;
	}
	logmsg("Looking for concert dates for band: " + bandName.split("+").join(" "));
	axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp").then(function (response) {
		var x;
		var dataObj = response.data;
		for (x in dataObj) {
				
				let region = response.data[x].venue.region.toString().trim();
				if (region) region += ", ";
				logmsg("\n\tEvent " + (parseInt(x) + parseInt(1)) + ":");
				logmsg("\tVenue:\t\t" + dataObj[x].venue.name);
				logmsg("\tVenue location:\t" + dataObj[x].venue.city + ", " + region + dataObj[x].venue.country);
				let dateVal = moment(dataObj[x].datetime).format().toString().split("-").slice(0,3);
				logmsg("\tDate:\t\t" + dateVal[1] + "/" + dateVal[2].slice(0,2) + "/" + dateVal[0]);
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
		
		logmsg("\tspotifying track title: " + trackTitle.split("+").join(" "));
		
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
	else {
		
		logmsg("\tno track title provided. Default mode: 'The Sign' by Ace of Base");
 
		var spotify = new Spotify({
			id: process.env.SPOTIFY_ID,
			secret: process.env.SPOTIFY_SECRET
		});
		spotify.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE').then(function(data) {
			logmsg("\tArtist:\t\t" + data.artists[0].name); // artist name
			logmsg("\tTrack Title:\t" + data.name); // track name
			logmsg("\tSong Preview:\t" + data.preview_url); // preview
			logmsg("\tfrom Album:\t" + data.album.name); // album name
		})
		.catch(function(err) {
			console.error('Error occurred: ' + err); 
		});
	}
}

function imdbCall(str) {
	
	var movie = "Mr.+Nobody";
	if (str) {
		if (str.includes(" ")) str.split(" ").join("+");
		movie = str;
	}
	logmsg ("Getting IMDB data for movie: " + movie.split("+").join(" "));
	axios.get("https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy").then(function (response) {
		let responseObj = response;
		
		responseObj.title = response.data.Title;
		responseObj.year = response.data.Year;
		responseObj.imdbRating = response.data.imdbRating;
		try {
			throw responseObj.rottenTRating = response.data.Ratings[1].Value;
		}
		catch (res)
		{
			if (res.toString().startsWith("TypeError")) responseObj.rottenTRating = "no record";
			else responseObj.rottenTRating = res;
		}
		responseObj.country = response.data.Country;
		responseObj.language = response.data.Language;
		responseObj.synopsis = response.data.Plot;
		responseObj.cast = response.data.Actors;
		
		logmsg("\tMovie Title:\t\t" + responseObj.title);					// * Title of the movie.
		logmsg("\tYear Released:\t\t" + responseObj.year);					// * Year the movie came out.
		logmsg("\tIMDB Rating:\t\t" + responseObj.imdbRating);				// * IMDB Rating of the movie.
		logmsg("\tRotten Tomatoes Rating:\t" + responseObj.rottenTRating);	// * Rotten Tomatoes Rating of the movie.
		logmsg("\tCountries Produced in:\t" + responseObj.country);			// * Country where the movie was produced.
		logmsg("\tLanguage:\t\t" + responseObj.language);					// * Language of the movie.
		logmsg("\tPlot synopsis:\t\t" + responseObj.synopsis);				// * Plot of the movie.
		logmsg("\tCast:\t\t\t" + responseObj.cast);							// * Actors in the movie.
	})
	.catch(function (error) {
		logmsg(error);
	});
}