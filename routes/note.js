var express = require('express'),
jwt     = require('express-jwt'),
config  = require('../config'),
db      = require('../db');
var app = module.exports = express.Router();
var jwtCheck = jwt({
secret: config.secretKey
});

function getAnnounts(status,done){
  db.get().query('SELECT * FROM Announcement WHERE status=? ORDER BY id DESC ',[status], function(err, rows) {
      if (err) throw err;
      done(rows);
  });
}

function getNotesId(status,done){
  db.get().query('SELECT id FROM Announcement WHERE status=?',[status],function(err, rows) {
      if (err) throw err;
      done(rows);
  });
}

app.use('/announcement', jwtCheck);
app.get('/announcement/:status?', function(req, res) {
  getAnnounts(req.params.status, function(result) {
      res.status(200).send(result);
  });
});

app.use('/announcementid', jwtCheck);
app.get('/announcementid/:status?', function(req, res) {
  getNotesId(req.params.status, function(result) {
      res.status(200).send(result);
  });
});
