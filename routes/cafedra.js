var express = require('express'),
jwt     = require('express-jwt'),
config  = require('../config'),
db      = require('../db');
var app = module.exports = express.Router();
var jwtCheck = jwt({
secret: config.secretKey
});

function getCafedra(lang,done){
  if( lang == "uz" ){
    db.get().query('SELECT id, nameUz AS fullName FROM Cafedra',function(err, rows) {
      if (err) throw err;
      done(rows);
  });
  }
  else {
    db.get().query('SELECT id, nameRu AS fullName FROM Cafedra',function(err, rows) {
      if (err) throw err;
      done(rows);
  });
  }
  
}

function getCaferdaById(done){
    db.get().query('SELECT * FROM Cafedra',function(err, rows) {
        if (err) throw err;
        done(rows);
    });
  }

app.use('/cafedra', jwtCheck);
app.get('/cafedra/:lang?', function(req, res) {
  getCafedra(req.params.lang,function(result) {
    res.status(200).send(result);
  });
});

app.use('/cafedraid', jwtCheck);
app.get('/cafedraid/', function(req,res){
  getCaferdaById(function(result) {
    res.status(200).send(result);
  });
});


