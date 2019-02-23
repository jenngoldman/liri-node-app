require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
moment().format();
var Spotify = require("node-spotify-api");

var firstInput = process.argv[2];
var secondInput = process.argv.slice(3).join(" ");


if (firstInput === "concert-this") {
    getConcertInfo();
} else if (firstInput === "spotify-this-song") {
    getSpotifyInfo();
} else if (firstInput === "movie-this") {
    getMovieInfo();
} else if (firstInput === "do-what-it-says") {
    readRandomFile();
}

// ---------------------------------------------------------------------------------------------------
// Functions.
function getConcertInfo() {
    axios.get("https://rest.bandsintown.com/artists/" + secondInput + "/events?app_id=codingbootcamp").then(function(response) {
        var results = response.data;
        for (i = 0; i < results.length; i ++) {
            var currentResult = results[i];
            var venueName = currentResult.venue.name;
            var venueLocation = currentResult.venue.city + ", " + currentResult.venue.region + ", " + currentResult.venue.country;
            var eventDate = moment(currentResult.datetime);
            eventDate = eventDate.format("MM/DD/YYYY");
        }
        console.log("\nVenue Name: " + venueName + "\nVenue Location: " + venueLocation + "\nDate: " + eventDate);
    })
};

function getSpotifyInfo() {
    var spotify = new Spotify(keys.spotify);
    if (secondInput === "") {
        secondInput = "The Sign";
    }

    spotify.search({ 
        type: "track",
        query: secondInput,
        limit: 1
    }).then(function(response) {
        
    });
};

function getMovieInfo() {
    if (secondInput === " ") {
        secondInput === "Mr. Nobody";
    };

    axios.get("http://www.omdbapi.com/?t=" + secondInput + "&apikey=trilogy").then(
    function(response) {
        var results = response.data;
        var title = results.Title;
        var year = results.Year;
        var imdbRating = results.imdbRating;
        var country = results.Country;
        var language = results.Language;
        var plot = results.Plot;
        var actors = results.Actors;

     console.log("\nTitle: " + title + "\nYear: " + year + "\nIMDB Rating: " + imdbRating + "\nCountry: " + country + "\nLanguage: " + language + "\nPlot: " + plot + "\nActors: " + actors + "\n---------------------------------")
       }
    );
};

function readRandomFile() {
    fs.readFile('./random.txt', 'UTF8', function(err, data) {
        if (err) {
            console.log("I can't read!");
        }
        getSpotifyInfo();
    });
};
