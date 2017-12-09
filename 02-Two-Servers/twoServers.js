// Require/import the HTTP module
var http = require("http");
var twitter = require("twitter");
var keys = require("./keys.js");

// Define a port to listen for incoming requests
var PORT1 = 7000;
var PORT2 = 7500;

var goodWords = ["smart", "pretty", "gentle", "kind", "helpful", "successful"];
var badWords = ["silly", "ugly", "rude", "not kind", "useless", "loser"];

var client = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});

// Create a generic function to handle requests and responses
function handleRequest(request, response) {

    // Send the below string to the client when the user visits the PORT URL
    var randGood = goodWords[Math.floor(Math.random() * goodWords.length)];
    console.log(randGood);
    response.end(randGood + request.url);
    // response.end(badWords + request.url);
    
}

// Use the Node HTTP package to create our server.
// Pass the handleRequest function to empower it with functionality.
var server = http.createServer(handleRequest);

// Start our server so that it can begin listening to client requests.
server.listen(PORT1, function () {

    // Log (server-side) when our server has started
    console.log("Server1 listening on: http://localhost:" + PORT1);

    

});

function handleRequest2(request, response) {
    
        // Send the below string to the client when the user visits the PORT URL
        // response.end(goodWords + request.url);
        var randBad = badWords[Math.floor(Math.random() * badWords.length)];
        console.log(randBad);
        response.end(randBad + request.url);
        
    }
    
    // Use the Node HTTP package to create our server.
    // Pass the handleRequest function to empower it with functionality.
    var server2 = http.createServer(handleRequest2);

server2.listen(PORT2, function () {

    // Log (server-side) when our server has started
    console.log("Server2 listening on: http://localhost:" + PORT2);

    
});

function myTweets() {
    client.get("statuses/user_timeline", function (error, tweets, response) {
        if (error) {
            return console.log(error);
        }
        for (var i = 0; i < tweets.length; i++) {
            if (tweets[i].text !== "undefined") {
                var j = i + 1;
                console.log(j + ". " + tweets[i].text + " Time created: " + tweets[i].user.created_at);

            } else {
                tweets[i].text = "null";
                console.log(i + ". " + tweets[i].text + tweets[i].user.created_at);
            }
        }
    })
};

myTweets();