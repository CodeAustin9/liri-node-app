require("dotenv").config();

var request = require('request');

var keys = require("./key.js");
var Twitter = require('twitter');
var userinput = process.argv[2];
var Spotify = require('node-spotify-api');
var userInput2 = process.argv[3];     
var fs = require("fs");


function twitter() {
    var client = new Twitter(keys.twitter);
    var params = { screen_name: 'realDonaldTrump' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (var i = 0; i < 20; i++) {
                console.log(tweets[i].text);
                console.log("------------");
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
function omdb(userInput2) {
    var query = userInput2;
    if(!userInput2) {
        query = 'Mr. Nobody';
    }
request("http://www.omdbapi.com/?apikey=trilogy&t=" + query, function(error, response, body) {
    var jsonData = JSON.parse(body);
 
    console.log("Movie Title: " + jsonData.Title);
    console.log("Movie Year: " + jsonData.Year);
    console.log("Movie Release: " + jsonData.Released);
    console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Source);
    console.log("Movie Country: " + jsonData.Country);
    console.log("Movie Language: " + jsonData.Language);
    console.log("Movie Plot: " + jsonData.Plot);
    console.log("Movie Actors: " + jsonData.Actors);
   
 
});

} function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        

        // Then split it by commas (to make it more readable)
        // .split converts string into array
        // .join converts array into string
        var actionsArr = data.split(", ");

        // We will then re-display the content as an array for later use.
       

        
        userInput2 = actionsArr[1];
        userinput = actionsArr[0];
        userInput();
    });

}

function userInput() {
    if (userinput === "my-tweets") {
        twitter()
    }
    else if (userinput === "spotify-this-song") {
        spotify(userInput2);
    }
    else if (userinput === "movie-this") {
        omdb(userInput2);
    }
    else if (userinput === "do-what-it-says") {
        doWhatItSays()
    
    }

}
userInput();
