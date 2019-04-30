if (require("dotenv").config()) writeMessage("loaded dotenv successfully");
else writeMessage("failed to load dotenv");

var keys = require("./keys.js");
if (keys) writeMessage("loaded keys.js");
else writeMessage("failed to load keys.js");


function writeMessage(msgTextStr) {
	const fs = require('fs');
	fs.appendFile('log.txt', "\n" + msgTextStr, (err) => {  
    if (err) throw err;
    console.log(msgTextStr);
});
}





// var spotify = new Spotify(keys[spotify]);
//
//
//Make it so liri.js can take in one of the following commands:

//concert-this

//spotify-this-song

//movie-this

//do-what-it-says
