var express = require('express'),
jwt     = require('express-jwt'),
config  = require('../config'),
db      = require('../db');
var app = module.exports = express.Router();
var jwtCheck = jwt({
secret: config.secretKey
});

function getSubjectbyId(id,lang,done){
    if(lang=="uz"){
        db.get().query('SELECT id,nameUz AS fullName FROM Subject WHERE Cafedra_id=?',[id],function(err, rows) {
            if (err) throw err;
            done(rows);
        });
    }
    else 
        {

        db.get().query('SELECT id,nameRu AS fullName FROM Subject WHERE Cafedra_id=?',[id],function(err, rows) {
            if (err) throw err;
            done(rows);
        });
    }
 
}

app.use('/subject', jwtCheck);
app.get('/subject/:id/:lang?', function(req, res) {
    getSubjectbyId(req.params.id, req.params.lang,function(result) {
    res.status(200).send(result);
  });
});


