var express = require('express'),
jwt     = require('express-jwt'),
config  = require('../config'),
db      = require('../db');
var app = module.exports = express.Router();
var jwtCheck = jwt({
secret: config.secretKey
});

function getTable(status,id,done){
    if(status == 1) {
        db.get().query('SELECT `Teacher_id`,`Group_id`,`pair`,`room`,`type`, `isEven`, `Day_id`,`Group`.`name` AS GroupName, `Subject`.`nameUz` AS SubNameUz,`Subject`.`nameRu` AS SubNameRu,`Teacher`.`fullNameUz` AS TeachNameUz,`Teacher`.`fullNameRu` AS TeachNameRu FROM `TimeTable` JOIN `Subject`,`Teacher`,`Group` WHERE `Subject`.`id`=`TimeTable`.`Subject_id` AND `Teacher`.`id` = `TimeTable`.`Teacher_id` AND `Group`.`id`=`TimeTable`.`Group_id` AND Teacher_id=?',[id], function(err, rows) {
            if (err) throw err;
            done(rows);
        });
    }
    else 
    {
        db.get().query('SELECT `Teacher_id`,`Group_id`,`pair`,`room`,`type`, `isEven`,`Day_id`, `Group`.`name` AS GroupName, `Subject`.`nameUz` AS SubNameUz,`Subject`.`nameRu` AS SubNameRu,`Teacher`.`fullNameUz` AS TeachNameUz,`Teacher`.`fullNameRu` AS TeachNameRu FROM `TimeTable` JOIN `Subject`,`Teacher`,`Group` WHERE `Subject`.`id`=`TimeTable`.`Subject_id` AND `Teacher`.`id` = `TimeTable`.`Teacher_id` AND `Group`.`id`=`TimeTable`.`Group_id` AND Group_id=?',[id], function(err, rows) {
            if (err) throw err;
            done(rows);
        });  
    }
  
}

function getTablebyDay(status,id,day,done){
    if(status == 1) {
        db.get().query('SELECT `Teacher_id`, `pair`,`Group_id`,`room`,`type`, `isEven`, `Day_id`,`Group`.`name` AS GroupName, `Subject`.`nameUz` AS SubNameUz,`Subject`.`nameRu` AS SubNameRu,`Teacher`.`fullNameUz` AS TeachNameUz,`Teacher`.`fullNameRu` AS TeachNameRu FROM `TimeTable` JOIN `Subject`,`Teacher`,`Group` WHERE `Subject`.`id`=`TimeTable`.`Subject_id` AND `Teacher`.`id` = `TimeTable`.`Teacher_id` AND `Group`.`id`=`TimeTable`.`Group_id` AND Teacher_id=? AND Day_id=?',[id,day], function(err, rows) {
            if (err) throw err;
            done(rows);
        });
    }
    else 
    {
        db.get().query('SELECT `Teacher_id`,`pair`,`room`,`Group_id`,`type`, `isEven`,`Day_id`, `Group`.`name` AS GroupName, `Subject`.`nameUz` AS SubNameUz,`Subject`.`nameRu` AS SubNameRu,`Teacher`.`fullNameUz` AS TeachNameUz,`Teacher`.`fullNameRu` AS TeachNameRu FROM `TimeTable` JOIN `Subject`,`Teacher`,`Group` WHERE `Subject`.`id`=`TimeTable`.`Subject_id` AND `Teacher`.`id` = `TimeTable`.`Teacher_id` AND `Group`.`id`=`TimeTable`.`Group_id` AND Group_id=? AND Day_id=?',[id,day], function(err, rows) {
            if (err) throw err;
            done(rows);
        });  
    }
  
}

app.use('/table', jwtCheck);
app.get('/table/:status/:id?', function(req, res) {
  getTable(req.params.status, req.params.id,function(result) {
      res.status(200).send(result);
  });
});

app.use('/tablebyday', jwtCheck);
app.get('/tablebyday/:status/:id/:day?', function(req, res) {
    getTablebyDay(req.params.status, req.params.id, req.params.day,function(result) {
      res.status(200).send(result);
  });
});
