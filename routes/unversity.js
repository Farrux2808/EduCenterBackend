var express = require('express'),
jwt     = require('express-jwt'),
config  = require('../config'),
db      = require('../db');
var app = module.exports = express.Router();
var jwtCheck = jwt({
secret: config.secretKey
});

function getImages(done){
  db.get().query('SELECT * FROM UniversityImage',function(err, rows) {
      if (err) throw err;
      done(rows);
  });
}

function getUniversity(done){
    db.get().query('SELECT * FROM University',function(err, rows) {
        if (err) throw err;
        done(rows);
    });
  }
function getUniversityStaff(done){
    db.get().query('SELECT * FROM UniversityStaff',function(err, rows) {
        if (err) throw err;
        done(rows);
    });
  }

app.use('/universityimage', jwtCheck);
app.get('/universityimage/', function(req, res) {
  getImages(function(result) {
    res.status(200).send(result);
  });
});

app.use('/university', jwtCheck);
app.get('/university/', function(req, res) {
  getUniversity(function(result) {
    res.status(200).send(result);
  });
});

app.use('/universitystaff', jwtCheck);
app.get('/universitystaff/', function(req, res) {
  getUniversityStaff(function(result) {
    res.status(200).send(result);
  });
});

