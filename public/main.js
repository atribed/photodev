// Get data.
var getRequest = function(url) {
	var xmlHttp = null;

	xmlHttp = new XMLHttpRequest();
	xmlHttp.open('GET', url, false);
	xmlHttp.send(null);

	var responseText = xmlHttp.responseText;
	console.log('response: ', responseText);
	return JSON.parse(responseText);
};

var displayFilms = function() {
	console.group('updateDiv');

	var selectElem = document.getElementById('selectDev');
	var requestUrl = '/api/films/developer/' + selectElem.value;

	var requestResult = getRequest(requestUrl);
	console.log(requestResult);

	var requestResultLength = requestResult.length;

	var displayDiv = document.getElementById('display');

	for (var i=0; i < requestResultLength; i++) {
		var inputHtml = '<input type=\"checkbox\" class=\"film-input\" id=\"' +
			requestResult[i]._id + '\">'
		var displayHtml = inputHtml + requestResult[i].film + '<br>';
		displayDiv.innerHTML += displayHtml;
	}

	console.groupEnd();
};

var getDevTime = function() {
	var filmInputs = document.getElementsByClassName('film-input');
	for (var i=0, l = filmInputs.length; i < l; i++) {
		var filmInput = filmInputs[i];
		if (filmInput.checked) {

			// Will get all this down from the initial request.
			var requestUrl = '/api/films/' + filmInput.id;
			console.log(requestUrl);
			var filmResponse = getRequest(requestUrl);

			console.log('dev time: ', filmResponse.time);
			return filmResponse.time;
		}
	}
};

var displayTimes = function() {
	var timeContainer = document.getElementById('times');
	var devTimeRequest = getDevTime();
	var devTime = devTimeRequest/60;

	timeContainer.innerHTML = 'Development Time: ' + devTime + ' minutes';
};

var updateFilmOnChange = function() {
	console.log('updateOnChange');
	document.getElementById('selectDev').addEventListener('change', displayFilms, false);
};

updateFilmOnChange();

