var express = require('express'),
jwt     = require('express-jwt'),
config  = require('../config'),
db      = require('../db');
var app = module.exports = express.Router();
var jwtCheck = jwt({
secret: config.secretKey
});

function getExam(status,id,done){
    if(status == 1) {
        db.get().query('SELECT `room`,`ExamType`.`nameUz` AS examNameUz,`date`,`ExamType`.`nameRu` AS examNameRu,`Group`.`name` AS GroupName, `Subject`.`nameUz` AS SubNameUz,`Subject`.`nameRu` AS SubNameRu,`Teacher`.`fullNameUz` AS TeachNameUz,`Teacher`.`fullNameRu` AS TeachNameRu FROM `Exam` JOIN `Subject`,`Teacher`,`Group`,`ExamType` WHERE `Subject`.`id`=`Exam`.`Subject_id` AND `Teacher`.`id` = `Exam`.`Teacher_id` AND `Group`.`id`=`Exam`.`Group_id`AND `ExamType`.`id` = `ExamType_id` AND Teacher_id=?',[id], function(err, rows) {
            if (err) throw err;
            done(rows);
        });
    }
    else 
    {
        db.get().query('SELECT `room`,`ExamType_id`,`ExamType`.`nameUz` AS examNameUz,`date`,`ExamType`.`nameRu` AS examNameRu,`Group`.`name` AS GroupName, `Subject`.`nameUz` AS SubNameUz,`Subject`.`nameRu` AS SubNameRu,`Teacher`.`fullNameUz` AS TeachNameUz,`Teacher`.`fullNameRu` AS TeachNameRu FROM `Exam` JOIN `Subject`,`Teacher`,`Group`,`ExamType` WHERE `Subject`.`id`=`Exam`.`Subject_id` AND `Teacher`.`id` = `Exam`.`Teacher_id` AND `Group`.`id`=`Exam`.`Group_id` AND `ExamType_id` = `ExamType`.`id` AND Group_id=?',[id], function(err, rows) {
            if (err) throw err;
            done(rows);
        });  
    }
  
}


app.use('/getexam', jwtCheck);
app.get('/getexam/:status/:id?', function(req, res) {
    getExam(req.params.status, req.params.id,function(result) {
      res.status(200).send(result);
  });
});

