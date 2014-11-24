var schema = require('./model.js');
var FilmModel = schema();

// Get everything in the DB
exports.getAll = function(req, res) {
  return FilmModel.find(function (err, films) {
    if (!err) {
      return res.send(films);
    } else {
      return console.log(err);
    }
  });
};

// Get by film developer.
exports.getByDev = function(req, res) {
  var query = FilmModel.where({ developer: req.params.developer});
  return query.find(req.params.developer).find(function (err, films) {
    if (!err) {
      return res.send(films);
    } else {
      return console.log(err);
    }
  });
};

// Get by ID.
exports.getById = function(req, res) {
  return FilmModel.findById(req.params.id, function(err, film) {
      if (!err) {
        return res.send(film);
      } else {
        return console.log(err);
      }
  });
};

// Add a new set of film stuff.
exports.post = function(req, res) {
  var film = new FilmModel({
    developer: req.body.developer,
    film: req.body.film,
    iso: req.body.iso,
    solution: req.body.solution,
    time: req.body.time
  });

  film.save(function (err) {
    if (!err) {
      return console.log('success: ', film);
    } else {
      return console.log(err);
    }
  });

  return res.send(film);
};

// Removes a film by ID.
exports.remove = function(req, res) {
  return FilmModel.findById(req.params.id, function(err, film) {
    return film.remove(function(err) {
      if (!err) {
        console.log(film.id + ' removed.');
        res.send('');
      } else {
        console.log(err);
      }
    });
  });
}