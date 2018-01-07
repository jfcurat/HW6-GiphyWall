//array of strings - to be used as gif genres
//possible topics: music (general), guitar, cats, dogs, food, videogames, tech, camping, hiking, fishing, fish?
var topics = ['topic1', 'topic2', 'topic3', 'topic4', 'topic5', 'topic6', 'topic7', 'topic8', 'topic9', 'topic10'];
console.log('starting topics = ' + topics);

//jQuery to save the value from the input box as var and add to topics array, put in function to call on click of submit new topic button
var boxTerm = $('#topic-entry-input').val().trim();
console.log('boxTerm = ' + boxTerm);
topics.push(boxTerm);
console.log('after .push(boxTerm), topics = ' + topics);

//break out the query string parameters into vars
var url = 'https://api.giphy.com/v1/gifs/search?';
var apiKey = 'api_key=nvNb9MHt4xzv60kubg11U9BF7A6Mkr92';
var searchTerm = '&q=test' //+ boxTerm; //use + for spaces
var gifsAmount = '&limit=10';

var queryURL = url + apiKey + searchTerm + gifsAmount;
console.log('queryURL = ' + queryURL);

//don't use rating in search, but display above each gif. can make <p> elements containing rating.
//&rating=(string, limits results to rating y,g,pg,pg-13,r)

$('#submit-topic').on('click', function() {
	var topicToAdd = $('#topic-entry-input').val().trim();
	console.log('topicToAdd = ' + topicToAdd);
	console.log('topics array after topicToAdd is')
})

$.ajax({
	url: queryURL,
	method: 'GET'
}).done(function(response) {
	console.log('response = ' + response);
});

//need to make buttons w/ value data-topic of the text-input submission
//then make the button's data-topic populate the boxTerm to fill-in the var searchTerm correctly to pass to var queryURL
//append button to button-display-zone. make label value of data-topic
//$('#button-display-zone').append('<button>').innerHTML(boxTerm);

$('button').on('click', function() {
	var gifsTopic = $(this).attr('data-topic');
});