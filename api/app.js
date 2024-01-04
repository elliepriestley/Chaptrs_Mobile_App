const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const JWT = require('jsonwebtoken');
const cors = require('cors');

const booksRouter = require('./routes/books');
const bookclubsRouter = require('./routes/bookclubs');
const authenticationRouter = require('./routes/authentication');
const usersRouter = require('./routes/users');
const sessionsRouter = require('./routes/sessions');

const app = express();

// setup for receiving JSON
app.use(cors());
app.use(express.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((_, __, next) => {
  setTimeout(() => {
    next();
  }, 1000);
});

// route setup
app.use('/books', booksRouter);
app.use('/bookclubs', bookclubsRouter);
app.use('/tokens', authenticationRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // respond with details of the error
  res.status(err.status || 500).json({ message: 'server error' });
});

module.exports = app;
