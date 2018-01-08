//array of strings - to be used as gif genres
var topics = ['metal', 'pizza', 'dogs', 'cats', 'videogames', 'computers', 'fishing',
	'cooking', 'derp', 'nic cage', 'steve brule', 'juggalo', 'space',
	'fatality', 'homer simpson', 'rum ham', 'prishpreed']; //had to leave the doug prishpreed even though it's the only gif ha

//function to make buttons render
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

//call makeButtons() to render starting buttons
makeButtons();

//jQuery to save the value from the input box as var and add to topics array
$('#submit-topic').on('click', function(event) {
	//to make using enter key not reload page
	event.preventDefault();

	var topicToAdd = $('#topic-entry-input').val().trim();
	topics.push(topicToAdd);

	//call makeButtons() to make buttons, including newTopic button
	makeButtons();

	//to make text input box clear after pressing enter or clicking submit button
	$('#topic-entry-input').val('');
});

//give the topic buttons a different class .gifTopicButtons so that this won't apply to the submit button.
$(document).on('click', '.gifTopicButtons', function() {
	var gifsTopic = $(this).attr('data-topic');

	//need to empty gif-wall-display-zone to prevent different topics from stacking
	$('#gif-wall-display-zone').empty();

	//break out the query string parameters into vars
	var url = 'https://api.giphy.com/v1/gifs/search?';
	var apiKey = 'api_key=nvNb9MHt4xzv60kubg11U9BF7A6Mkr92';
	var searchTerm = '&q=' + gifsTopic; //use + for spaces
	var gifsAmount = '&limit=10';
	var queryURL = url + apiKey + searchTerm + gifsAmount;

	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(response) {
		var resultsData = response.data;

		//loop thru results and populate gifAndRatingPostArea with ratings and gifs
		for (var i = 0; i < resultsData.length; i++) {
			var gifAndRatingPostArea = $('<span>');
			gifAndRatingPostArea.addClass('gifWallItem');

			var gifRating = 'Rating = ' + resultsData[i].rating + ' ';
			var ratingDisplay = $('<div>').text(gifRating);
			var gifImage = $('<img>');
			//make gifs start as still images. set attributes to be able to change state on click w/ other function
			gifImage.addClass('gifs');
			gifImage.attr('src', resultsData[i].images.fixed_height_still.url);
			gifImage.attr('data-still', resultsData[i].images.fixed_height_still.url);
			gifImage.attr('data-animate', resultsData[i].images.fixed_height.url);
			gifImage.attr('data-state', 'still');
			//append the gifs and ratings to the PostArea
			$('#gif-wall-display-zone').append(gifAndRatingPostArea)
			gifAndRatingPostArea.append(gifRating);
			gifAndRatingPostArea.append(gifImage);
		}
	});
});

//change animationState of the gifs when clicked
$(document).on('click', '.gifs', function() {
	var animationState = $(this).attr('data-state');
	//if gif is still, make it animate when clicked; if it's animated, make it stop
	if (animationState === 'still') {
		$(this).attr('src', $(this).attr('data-animate'));
		$(this).attr('data-state', 'animate');
	}
	else if (animationState === 'animate') {
		$(this).attr('src', $(this).attr('data-still'));
		$(this).attr('data-state', 'still');
	}
});
