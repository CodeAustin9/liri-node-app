require("dotenv").config();

var request = require('request');

var keys = require("./key.js");
var Twitter = require('twitter');
var userinput = process.argv[2];
var Spotify = require('node-spotify-api');
var userInput2 = process.argv[3];     

function twitter() {
    var client = new Twitter(keys.twitter);
    console.log("working");
    var params = { screen_name: 'realDonaldTrump' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (var i = 0; i < 20; i++) {
                console.log(tweets[i].text);
            }
        }
    });
}



function spotify(userInput2) {
var spotify = new Spotify(keys.spotify);
var query = userInput2;
    if(!userInput2) {
        query = 'The Sign';
    }
      spotify.search({ type: 'track', query: query, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log("Artist Name: " + data.tracks.items[0].artists[0].name); 
      console.log("Album Name: " + data.tracks.items[0].album.name);
      console.log("Album Link" + data.tracks.items[0].album.href);
      console.log("Song Name: " + data.tracks.items[0].name);
      });  



}
function omdb() {

request("http://www.omdbapi.com/?apikey=trilogy&t=Mr.+Nobody", function(error, response, body) {
    console.log(JSON.parse(body));
});

} function doWhatItSays() {

}

function userInput() {
    if (userinput === "my-tweets") {
        twitter()
    }
    else if (userinput === "spotify-this-song") {
        spotify(userInput2);
    }
    else if (userinput === "movie-this") {
        omdb()
    }
    else if (userinput === "do-what-it-says") {
        doWhatItSays()
    }

}
userInput();
