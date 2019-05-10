# LIRI-Bot, or "Tim"

### Overview

For this class assignment, I built an application conforming to this assignment's specifications. This GitHub project is the result of that effort. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI, aka Tim, is a command line node app that takes in parameters and gives the user useful data back

But since "Liri" unlike Siri isn't a real name, I decided to call this bot Tim, in memory of the late outlaw and psychonautical explorer Timothy Leary.

### Commands

To use liri.js, invoke `node liri.js` from the command line.

If you don't include any allowable command line arguments after the line above, the application will attempt to read in the file random.txt and look for allowable commands there. The function and output of the application is the same whether entering the commands and parameters from the command line or from the file random.txt.

Also, if specify the command "do-what-it-says"  from the command line, it will similarly read in the file random.txt.

The allowable commands (command line arguments or entered in random.txt) are as follows:

`node liri.js spotify-this-song <song name>`: this command uses the Spotify API to locate album and artist information for the specified track title.

`node liri.js movie-this <movie name>`: this command uses the IMDB API to return information about the speficied film.

`node liri.js concert-this <band name>`: this command uses the bandsintown.com API to return information about scheduled, upcoming events featuring the specified band.

`node liri.js do-what-it-says`: This line, whether followed with additional arguments or not, is equivalent to invoking the application without any commands whatsoever, and the application will attempt to read in random.txt and perform the action specified there (if one of the above allowable commands).

### Logfile output

All of the output you see from the command line is also logged to the logfile log.txt.

### Web server

The application also outputs a file called results.html featuring the same information which is logged in the log.txt file, but in a browser-friendly format. When combined with the simple web server included in this application, it provides a browser view of the same information.

To start the web server and view the results.html file in your browser, invoke `node server.js` and while it is running you can point your browser on your local machine to http://localhost:8000 to see the output.
