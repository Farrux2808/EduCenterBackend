var express = require('express'),
jwt     = require('express-jwt'),
config  = require('../config'),
db      = require('../db');
var app = module.exports = express.Router();
var jwtCheck = jwt({
secret: config.secretKey
});


function deleteStudent(id, done) {
    db.get().query('DELETE FROM `Student` WHERE id = ?', [id], function(err, rows, fields) {
      if (err) throw err;
      done(rows[0]);
    });
}

app.use('/studentdel/', jwtCheck);
app.delete('/studentdel/:id?', function(req, res) {
    deleteStudent(req.params.id,function(result) {
        var obj = {success:1};
        res.status(200).send(obj);
    });
  });