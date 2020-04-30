require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var input = process.argv[3];

var dataOutPut = function (data) {
  console.log(data);

  fs.appendFileSync("log.txt", "\r\n" + data, function (err) {
    if (err) {
      return console.log(err);
    }
  });
};

// require packages

var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

// create variables for default if missing info

var defaultConcert = "Celine Dion";
var defaultSpotify = "The Sign";
var defaultMovie = "Mr. Nobody";

// add switch statements to execute code block

switch (command) {
  case "concert-this":
    if (input === undefined) {
      input = defaultConcert;
    }
    concertThis(input);
    break;
  case "spotify-this-song":
    if (input === undefined) {
      input = defaultSpotify;
    }
    spotifySong(input);
    break;
  case "movie-this":
    if (input === undefined) {
      input = defaultMovie;
    }
    movieThis(input);
    break;
  case "do-what-it-says":
    doThis(input);
    break;
}

// Start function for concert-this

function concertThis(input) {
  var artist = input;

  //Search parameters for concert info

  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp"
    )
    .then(function (response) {
      // console.log(response.data[0].venue.name)
      for (var i = 0; i < 5; i++) {
        // console.log("Name of the venue:", response.data[i].venue.name);

        dataOutPut("-------------------------------------------------------");
        dataOutPut("Name of the venue:" + response.data[i].venue.name);
        dataOutPut("Venue location:" + response.data[i].venue.city);
        var eventDate = moment(response.data[i].datetime).format("MM/DD/YYYY");
        dataOutPut("Date of the Event:" + eventDate);
        dataOutPut("-------------------------------------------------------");
      }
    });
}

// Start function for spotify-this-song

function spotifySong(input) {
  var songInput = input;

  // Search paramters for songs.

  spotify.search({ type: "track", query: songInput }).then(function (response) {
    for (var i = 0; i < 5; i++) {
      dataOutPut("-------------------------------------------------------");
      dataOutPut("Artist: " + response.tracks.items[i].album.artists[0].name);
      dataOutPut("Album: " + response.tracks.items[i].album.name);
      dataOutPut(
        "Preview link of song: " +
          response.tracks.items[i].album.external_urls.spotify
      );
      dataOutPut("-------------------------------------------------------");
    }
  });
}

// Start function for movie-this

function movieThis(input) {
  var movieInput = input;

  //search parameters for movies

  axios
    .get(
      "https://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy"
    )
    .then(function (response) {
      // console.log(response.data);
      dataOutPut("-------------------------------------------------------");
      dataOutPut("Movie Title: " + response.data.Title);
      dataOutPut("Year of Release: " + response.data.Year);
      dataOutPut("IMDB Rating: " + response.data.imdbRating);
      dataOutPut("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      dataOutPut("Country Movie was Produced: " + response.data.Country);
      dataOutPut("Movie Language: " + response.data.Language);
      dataOutPut("Movie Plot: " + response.data.Plot);
      dataOutPut("Movie Actors: " + response.data.Actors);
      dataOutPut("-------------------------------------------------------");
    });

  if (input === "Mr. Nobody") {
    dataOutPut("-------------------------------------------------------");
    dataOutPut(
      "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/"
    );
    dataOutPut("It's on Netflix!");
    dataOutPut("-------------------------------------------------------");
  }
}

function doThis() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    var dataArr = data.split(",");
    // console.log(dataArr);

    var command = dataArr[0];
    var input = dataArr[1];
    // console.log(command);
    // console.log(input);

    switch (command) {
      case "concert-this":
        if (input === undefined) {
          input = defaultConcert;
        }
        concertThis(input);
        break;
      case "spotify-this-song":
        if (input === undefined) {
          input = defaultSpotify;
        }
        spotifySong(input);
        break;
      case "movie-this":
        if (input === undefined) {
          input = defaultMovie;
        }
        movieThis(input);
        break;
    }
  });
}
