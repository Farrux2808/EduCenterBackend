var express = require('express'),
jwt     = require('express-jwt'),
config  = require('../config'),
db      = require('../db');
var app = module.exports = express.Router();
var jwtCheck = jwt({
secret: config.secretKey
});

function getContacts(done){

        db.get().query('SELECT * FROM Contacts', function(err, rows) {
            if (err) throw err;
            done(rows);
        });
}


app.use('/getcontacts', jwtCheck);
app.get('/getcontacts', function(req, res) {
    getContacts(function(result) {
      res.status(200).send(result);
  });
});

