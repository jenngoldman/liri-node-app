require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
moment().format();
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

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
};

// ---------------------------------------------------------------------------------------------------

// Functions.
function getConcertInfo() {
    if (secondInput === "") {
        console.log("");
        return;
    }
    axios.get("https://rest.bandsintown.com/artists/" + secondInput + "/events?app_id=codingbootcamp").then(function(response) {
        if (response.data.length === 0) {
            console.log("\n=====================\n \nThis artist isn't currently touring! Please try another artist.\n\n===================\n");
        } else {
            for (i = 0; i < response.data.length; i ++) {
                var results = response.data;
                var currentResult = results[i];
                var venueName = currentResult.venue.name;
                var venueLocation = currentResult.venue.city + ", " + currentResult.venue.region + ", " + currentResult.venue.country;
                var eventDate = moment(currentResult.datetime);
                eventDate = eventDate.format("MM/DD/YYYY");
            }
            console.log("\n=============\n" + "\nVenue Name: " + venueName + "\nVenue Location: " + venueLocation + "\nDate: " + eventDate + "\n\n=============\n");
        }
    })
};

function getSpotifyInfo() {
    if (secondInput === "") {
        secondInput = "The Sign, Ace of Base"
    }
    spotify.search({ 
        type: 'track', 
        query: secondInput,
        limit: 1,
    }).then(function(response) {
        var artist = response.tracks.items[0].artists[0].name;
        var song = response.tracks.items[0].name;
        var previewLink = response.tracks.items[0].external_urls.spotify;
        var album = response.tracks.items[0].album.name;

        console.log("\n=====================\n" + "\nArtist: " + artist + "\nSong: " + song + "\nPreview Song: " + previewLink + "\nAlbum Name: " + album + "\n\n=====================\n");
      })
      .catch(function(err) {
        console.log(err);
      }); 
  };

function getMovieInfo() {
    if (secondInput === "") {
        secondInput = "Mr Nobody";
        console.log(secondInput);
    };

    axios.get("http://www.omdbapi.com/?t=" + secondInput + "&apikey=trilogy").then(
    function(response) {
        var results = response.data;
        var title = results.Title;
        var year = results.Year;
        var imdbRating = results.imdbRating;
        var rating = response.data.Ratings[1].Value;
        var country = results.Country;
        var language = results.Language;
        var plot = results.Plot;
        var actors = results.Actors;

     console.log("\n====================\n" + "\nTitle: " + title + "\nYear: " + year + "\nIMDB Rating: " + imdbRating + "\nRotten Tomatoes: " + rating + "\nCountry: " + country + "\nLanguage: " + language + "\nPlot: " + plot + "\nActors: " + actors + "\n\n====================\n")
       }
    )
    .catch(function(error) {
        console.log(error);
    })
};

function readRandomFile() {
    fs.readFile('./random.txt', 'UTF8', function(err, data) {
        if (err) {
            console.log(error);
        };
        var dataArr = data.split(",");
        firstInput = dataArr[0];
        secondInput = dataArr[1];
        console.log("Input 1: " + dataArr[0]);
        console.log("Input 2: " + dataArr[1]);
        getSpotifyInfo(secondInput);
    });
};