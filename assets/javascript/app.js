//array of strings - to be used as gif genres
//possible topics: music (general), guitar, cats, dogs, food, videogames, tech, camping, hiking, fishing, fish?
var topics = ['topic1', 'topic2', 'topic3', 'topic4', 'topic5', 'topic6', 'topic7', 'topic8', 'topic9', 'topic10'];

//jQuery to save the value from the input box
var boxTerm = $("#id-of-input-box").val().trim();

//break out the query string parameters into vars
var url = 'https://api.giphy.com/v1/gifs/search?';
var apiKey = 'api_key=nvNb9MHt4xzv60kubg11U9BF7A6Mkr92';
var searchTerm = '&q=' + boxTerm; //use + for spaces
var gifsAmount = "&limit=10";

var queryURL = url + apiKey + searchTerm + gifsAmount; 
console.log(queryURL);

//don't use rating in search, but display above each gif.
//&rating=(string, limits results to rating y,g,pg,pg-13,r)

$.ajax({
	url: queryURL,
	method: 'GET'
}).done(function(response) {
	console.log(response);
});
