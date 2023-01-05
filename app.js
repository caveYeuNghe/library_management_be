var createError = require('http-errors');
var express = require('express');
var expressSession = require("express-session");
var logger = require('morgan');
var mongoose = require('mongoose');
var debug = require('debug')('library-management:server');

var adminRouter = require('./routes/admin');
var booksRouter = require('./routes/books');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({secret: "secret"}));

app.use('/books', booksRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).send();
});


// connect to mongo db
const url = "mongodb+srv://admin:Hf0FcbKMB7MU96Cx@cluster0.osaykd4.mongodb.net/?retryWrites=true&w=majority"
const connect = mongoose.connect(url);
connect.then((db) => {
  debug("Connected to the database.");
}, (err) => {
  console.error(err);
  process.exit(1);
});

module.exports = app;
