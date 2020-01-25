var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');


var users = require('./routes/users');
var note = require('./routes/note');
var product = require('./routes/product');
var register = require('./routes/Register');
var registerget = require('./routes/RegisterGet');
var news = require('./routes/news');
var university = require('./routes/unversity');
var cafedra = require('./routes/cafedra');
var table = require('./routes/table');
var teacher = require('./routes/teacher');
var exam = require('./routes/exam');
var contacts = require('./routes/contacts');
var student = require('./routes/student');
var subject = require('./routes/subject');
var fapi = require('./routes/firstapi');
var app = express();
app.use(cors());
app.use(note);
app.use(product); 
app.use(users);
app.use(registerget);
app.use(news);
app.use(university);
app.use(cafedra);
app.use(table);
app.use(teacher);
app.use(exam);
app.use(contacts);
app.use(student);
app.use(subject);

/*
{
    "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJyciIsImVtYWlsIjoicnJAbHdjLnV6IiwiaWF0IjoxNTA1ODQwNTIzLCJleHAiOjE1MDU4NTg1MjN9.SGFTjDrtunAouWDS79j2cwcm23Q_ahFnkxSurekIEXM"
}
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(register); 
app.use(fapi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
