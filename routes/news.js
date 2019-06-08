var express = require('express'),
jwt     = require('express-jwt'),
config  = require('../config'),
db      = require('../db');
var app = module.exports = express.Router();
var jwtCheck = jwt({
secret: config.secretKey
});

function getNews(done){
  db.get().query('SELECT * FROM `News` ORDER BY `id` DESC',function(err, rows) {
      if (err) throw err;
      done(rows);
  });
}

function getNewsId(done){
    db.get().query('SELECT id FROM News',function(err, rows) {
        if (err) throw err;
        done(rows);
    });
  }
function updateCount(status,id,done){
  db.get().query('UPDATE `News` SET `viewCount`=? WHERE `id`=?',[status,id],function(err, rows) {
    if (err) throw err;
    done(rows);
});
}

function getNewsbyId(id,done){
  db.get().query('SELECT * FROM News WHERE id=?',[id],function(err, rows) {
      if (err) throw err;
      done(rows);
  });
}

//app.use('/newsbyid', jwtCheck);
app.get('/newsbyid/:id?', function(req, res) {
  getNewsbyId(req.params.id,function(result) {
    res.status(200).send(result);
  });
});

app.use('/news', jwtCheck);
app.get('/news/', function(req, res) {
  getNews(function(result) {
    res.status(200).send(result);
  });
});

//app.use('/newsid', jwtCheck);
app.get('/newsid/', function(req, res) {
  getNewsId(function(result) {
    res.status(200).send(result);
  });
});

//app.use('/newscount', jwtCheck);
app.get('/newscount/:status/:id?', function(req, res) {
  updateCount(req.params.status,req.params.id,function(result) {
      res.status(200).send(result);
  });
});

