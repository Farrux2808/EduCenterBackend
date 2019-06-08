var express = require('express'),
jwt     = require('express-jwt'),
config  = require('../config'),
db      = require('../db');
var app = module.exports = express.Router();
var jwtCheck = jwt({
secret: config.secretKey
});

function getTeacherbyId(id,lang,done){
    if(lang=="uz"){
        db.get().query('SELECT id,fullNameUz AS fullName, infoUz AS info, birthday FROM Teacher WHERE id=?',[id],function(err, rows) {
            if (err) throw err;
            done(rows);
        });
    }
    else 
        {

        db.get().query('SELECT id,fullNameRu AS fullName, infoRu AS info, birthday FROM Teacher WHERE id=?',[id],function(err, rows) {
            if (err) throw err;
            done(rows);
        });
    }
 
}

function getTeacherbyCaferda(id,lang,done){
    if(lang == "uz") {
        db.get().query('SELECT id, fullNameUz AS fullName FROM Teacher WHERE Cafedra_id=?',[id],function(err, rows) {
            if (err) throw err;
            done(rows);
        });
    }
    else 
    {
        db.get().query('SELECT id, fullNameRu AS fullName FROM Teacher WHERE Cafedra_id=?',[id],function(err, rows) {
            if (err) throw err;
            done(rows);
        });
    }
    
}

app.use('/teacherid', jwtCheck);
app.get('/teacherid/:id/:lang?', function(req, res) {
  getTeacherbyId(req.params.id, req.params.lang,function(result) {
    res.status(200).send(result);
  });
});

app.use('/teachercafedra', jwtCheck);
app.get('/teachercafedra/:id/:lang?', function(req, res) {
  getTeacherbyCaferda(req.params.id, req.params.lang,function(result) {
    res.status(200).send(result);
  });
});


