var express = require('express'),
config  = require('../config'),
db      = require('../db');
jwt     = require('express-jwt');
var app = module.exports = express.Router();
var jwtCheck = jwt({
    secret: config.secretKey
    });
    
function getFaculty(done){
    db.get().query('SELECT * FROM Faculty', function(err, rows) {
        if (err) throw err;
        done(rows);
    });
}

function getCourse(facultyId,done){
    db.get().query('SELECT * FROM Course WHERE Faculty_id=?',[facultyId], function(err, rows) {
        if (err) throw err;
        done(rows);
    });
}

function getStudent(groupId,done){
    db.get().query('SELECT * FROM Student WHERE Group_id=?',[groupId], function(err, rows) {
        if (err) throw err;
        done(rows);
    });
}

function getGroup(courseId,done){
    db.get().query('SELECT * FROM `Group` WHERE `Course_id`=?',[courseId], function(err, rows) {
        if (err) throw err;
        done(rows);
    });
}


app.use('/getfaculty', jwtCheck);
app.get('/getfaculty', function(req, res) {
    getFaculty(function(result) {
        res.status(200).send(result);
    });
});


app.use('/getcourse', jwtCheck);
app.get('/getcourse/:facultyId?', function(req, res) {
    getCourse(req.params.facultyId, function(result) {
        res.status(200).send(result);
    });
});

app.use('/getstudent', jwtCheck);
app.get('/getstudent/:groupId?', function(req, res) {
    getStudent(req.params.groupId, function(result) {
        res.status(200).send(result);
    });
});

app.use('/getgroup', jwtCheck);
app.get('/getgroup/:courseId?', function(req, res) {
    getGroup(req.params.courseId, function(result) {
        res.status(200).send(result);
    });
});