// Front-end logic.
// Everything is still a draft. Incredibly inefficient at the moment.
// Next steps include legitimization and writing testable functions.

// Object of times used for photo development.
// NB: Times with a value of null are defined through user interaction.
var TIMES = {
    'DEV': null,
    'FIXER': null,
    'HYPO': 120,
    'STOPBATH': 30,
    'RINSE': 300
};

// Determines whether or not space bar can start a timer.
var TIMER_RUNNING = false;

// Initial step for the different development processes.
var TIMER_STEP = 0;

// Timer control.
var TIMER = {
    start: function(time, message) {
        TIMER_RUNNING = true;

        this.interval = setInterval(function() {
            var timerDiv = document.getElementById('timer');
            if (time <= 0) {
                TIMER_RUNNING = false;
                timerDiv.innerHTML = message;
                clearInterval(this.interval);
            } else {
                time = time - 1;
                var minutes = Math.floor(time / 60);
                var seconds = time % 60;
                var printedSeconds = seconds > 9 ? seconds : '0' + seconds;
                timerDiv.innerHTML = minutes + ':' + printedSeconds;
            }
        }, 50);
    },
    stop: function() {
        clearInterval(this.interval);
    }
};

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


// Creates inputs based on server response.
var displayFilms = function() {
    var selectElem = document.getElementById('selectDev');
    var requestUrl = '/api/films/developer/' + selectElem.value;
    var requestResult = getRequest(requestUrl);
    var requestResultLength = requestResult.length;

    var displayDiv = document.getElementById('display');

    // Clears previous HTML incase user changes what was in the dropdown.
    displayDiv.innerHTML = '';

    document.getElementById('headerFilms').style.display = 'block';

    for (var i = 0; i < requestResultLength; i++) {
        var thisInput = document.createElement('input');
        thisInput.id = requestResult[i]._id;
        thisInput.type = 'checkbox';
        thisInput.className = 'film-input';
        thisInput.setAttribute('data-devtime', requestResult[i].time);

        displayDiv.appendChild(thisInput);

        var displayHtml = requestResult[i].film + '<br>';
        displayDiv.innerHTML += displayHtml;
    }
};


// Binds function that displays film options to the developer selection dropdown.
var updateFilmOnChange = function() {
    document.getElementById('selectDev').addEventListener('change',
            displayFilms, false);
};


// Event delegation for input binding.
var setTime = function(e) {
    if (e.target.className === 'film-input' && e.target.checked === true) {
        var timeContainer = document.getElementById('times');
        var devTimeAttr = e.target.getAttribute('data-devtime');
        var devTimeSeconds = parseInt(devTimeAttr);
        TIMES.DEV = devTimeSeconds;
        var devTime = devTimeSeconds / 60;

        startTimerListener();

        document.getElementById('headerTimes').style.display = 'block';
        document.getElementById('startTime').style.display = 'block';
        timeContainer.innerHTML = 'Development Time: ' + devTime + ' minutes';

    }
};


// Binds function that sets development time to inputs via event delegation.
var updateTimeOnChange = function() {
    var displayDiv = document.getElementById('display');
    displayDiv.addEventListener('change', setTime, false);
};

// Acts based on stage in development process.
var startTimer = function() {
    var stepDiv = document.getElementById('timerStep');
    TIMER.stop();
    switch (TIMER_STEP) {
        case 0:
            document.getElementById('timerHeader').style.display = 'block';
            TIMER_STEP++;
            TIMER.start(TIMES.DEV, 'DEV COMPLETE');
            stepDiv.innerHTML = '(developer)'
            document.getElementById('startTime').innerHTML = 'Next';
            document.getElementById('startTime').className = 'btn btn-warning btn-large';
            break;
        case 1:
            TIMER_STEP++;
            TIMER.start(TIMES.STOPBATH, 'STOPBATH COMPLETE');
            stepDiv.innerHTML = '(stopbath)'
            break;
        case 2:
            TIMER_STEP++;

            var rapidFixer = document.getElementById('rapid');
            TIMES.FIXER = rapidFixer.checked ? 120 : 600;

            TIMER.start(TIMES.FIXER, 'FIXER COMPLETE');
            stepDiv.innerHTML = '(fixer)'
            break;
        case 3:
            TIMER_STEP++;
            TIMER.start(TIMES.HYPO, 'HYPO COMPLETE');
            stepDiv.innerHTML = '(hypo)'
            break;
        case 4:
            TIMER.start(TIMES.RINSE, 'RINSE COMPLETE');
            stepDiv.innerHTML = '(rinse)'
            break;
        default:
            console.log('oops');
            break;
    }
};

// Binds listeners.
var startTimerListener = function() {
    // Spacebar triggers the timer to start and move forward if finished before
    // the timer runs out.
    var startOnKeydown = function(e) {
        console.log(e.keyCode);
        if (e.keyCode === 32) {
            startTimer();
        }
    };

    window.addEventListener('keydown', startOnKeydown, false);
    document.getElementById('startTime').addEventListener('click',
            startTimer, false);
};


updateTimeOnChange();
updateFilmOnChange();
