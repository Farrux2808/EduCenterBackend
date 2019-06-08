var express = require('express'),
_       = require('lodash'),
config  = require('../config'),
jwt     = require('jsonwebtoken')
db      = require('../db');
var app = module.exports = express.Router();

function createToken(user) {
    return jwt.sign(_.omit(user, 'password'), config.secretKey);
}
function getUserDB(login, done) {

        // 1 - teacher
        db.get().query('SELECT * FROM Teacher WHERE login = ? LIMIT 1', [login], function(err, rows, fields) {
            if (err) throw err;
            done(rows[0]);

            });
}

function getStudent(name, done) {
    db.get().query('SELECT * FROM Student WHERE fullName = ? LIMIT 1', [name], function(err, rows, fields) {
      if (err) throw err;
      done(rows[0]);
    });
}

app.post('/register', function(req, res) { 
    console.log(req.body);
    if(req.body.role == 1){
        if (!req.body.login || !req.body.password) {
            return res.status(400).send("You must send the login and the password");
        }
        getUserDB(req.body.login ,function(user){
            if(user){
                    if(user.password == req.body.password){
                        res.status(201).send({
                            id_token: createToken(user),
                            teacherId: user.id,
                        });
                        console.log("User exists!");
                    }
                    else
                        console.log("Password and login does not match!");
            }
            else
            { 
                return res.status(400).send("User doesn't exist!");
            }
        });
    }

    if(req.body.role == 2){
        if (!req.body.fullName || !req.body.Group_id) {
            return res.status(400).send("You must send the fullName and the Group_id");
        }
        getStudent(req.body.fullName, function(student){
            if(!student){
                user = {
                    fullName: req.body.fullName,
                    Group_id: req.body.Group_id
                };
                db.get().query('INSERT INTO student SET ?', [user], function(err, result){
                    if (err) throw err;
                    newUser = {
                      id: result.insertId,
                      fullName: user.fullName,
                      Group_id: user.Group_id
                    };
                    res.status(201).send({
                      id_token: createToken(newUser),
                      Group_id: user.Group_id,
                      id: newUser.id
                    });
                  });
            }
            else 
            {
                res.status(201).send({
                    id_token: createToken(student),
                    Group_id: student.Group_id,
                    id: student.id
                });
            }
        });
    }

    if(req.body.role == 3){
        user = {
            status : "guest"
        }

        res.status(201).send({
            id_token : createToken(user)
        });
    }
    
});
