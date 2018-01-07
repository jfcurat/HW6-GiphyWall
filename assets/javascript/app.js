//array of strings - to be used as gif genres
//possible topics: music (general), guitar, cats, dogs, food, videogames, tech, camping, hiking, fishing, fish?
var topics = ['topic1', 'topic2', 'topic3', 'topic4', 'topic5', 'topic6', 'topic7', 'topic8', 'topic9', 'topic10'];
console.log('starting topics = ' + topics);

//then make the button's data-topic populate the boxTerm to fill-in the var searchTerm correctly to pass to var queryURL
function makeButtons() {
	//fix duplicate button lists problem
	$('#button-display-zone').empty();
	//loop thru topics array and make a button for each topic w/ class .gifTopicButtons, and attribute data-topic and text set to topics index.
	for (var i = 0; i < topics.length; i++) {
		var newButton = $('<button>');
		newButton.addClass('gifTopicButtons');
		newButton.attr('data-topic', topics[i]);
		newButton.text(topics[i]);
		$('#button-display-zone').append(newButton);
	}
}

//to display starting buttons
makeButtons();

//jQuery to save the value from the input box as var and add to topics array, put in function to call on click of submit new topic button
$('#submit-topic').on('click', function(event) {
	event.preventDefault(); //to make using enter key not reload page
	var topicToAdd = $('#topic-entry-input').val().trim();
	console.log('topicToAdd = ' + topicToAdd);
	topics.push(topicToAdd);
	console.log('topics array after .push(topicToAdd) is: ' + topics);

	makeButtons();

	$('#topic-entry-input').val(''); //to make text input box clear after pressing enter or clicking submit button
});

//give the topic buttons a different class .gifTopicButtons so that this won't apply to the submit button.
$('.gifTopicButtons').on('click', function() {
	var gifsTopic = $(this).attr('data-topic');
	console.log("gifsTopic is: " + gifsTopic);
	//break out the query string parameters into vars
	var url = 'https://api.giphy.com/v1/gifs/search?';
	var apiKey = 'api_key=nvNb9MHt4xzv60kubg11U9BF7A6Mkr92';
	var searchTerm = '&q=' + gifsTopic; //use + for spaces
	var gifsAmount = '&limit=10';

	var queryURL = url + apiKey + searchTerm + gifsAmount;
	console.log('queryURL = ' + queryURL);
	//don't use rating in search, but display above each gif. can make <p> elements containing rating.
	//&rating=(string, limits results to rating y,g,pg,pg-13,r)
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(response) {
		//console.log('response = ' + response);
		var results = response.data;
		//console.log('var results = ' + results);

	});
});
