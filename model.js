var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Film = new Schema({
	developer: {type: String, required: true},
	film: {type: String, required: true},
	iso: {type: String, required: true},
	solution: {type: String, required: true},
	time: {type: Number, required: false}
});

var FilmModel = mongoose.model('Film', Film);

module.exports = function() {
	return FilmModel;
};
