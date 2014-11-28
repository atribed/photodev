// Things I need.
var http = require('http'),
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler');

// Server.
var devApp = express();

// DB stuff.
var db = mongoose.connect('mongodb://localhost/devwork');

mongoose.connection.once('connected', function() {
    console.log("Connected to db devwork.")
});

// Middle-ware things.
devApp.use(bodyParser.urlencoded({extended: true}));
devApp.use(express.static(path.join(__dirname + '/public')));
devApp.use(errorhandler());

// API wonders.
var api = require('./api.js');

devApp.get('/api', function (req, res) {
  res.send('API is running');
});

devApp.get('/api/films', api.getAll);
devApp.get('/api/films/:id', api.getById);
devApp.get('/api/films/developer/:developer', api.getByDev);
devApp.post('/api/films', api.post);
devApp.delete('/api/films/:id', api.remove);

// Listen to 9090.
devApp.listen(9090);
