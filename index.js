
/*
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
*/

require("dotenv").config();

const express      = require('express');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const cors         = require('cors');
// const User = require("./models/User");
// const mongoose = require("mongoose");
const indexRouter = require('./routes/v1/index');
const userRouter = require('./routes/v1/user');
const loginRouter = require('./routes/v1/login');
const badgeRouter = require('./routes/v1/badge');
const meRouter = require('./routes/v1/me');
const mongodb     = require('./db/mongo');

mongodb.initClientDbConnection();

const app = express();

/*
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connection to db established"));
app.use(express.json());

*/

app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/me', meRouter);
app.use('/badge', badgeRouter);

app.use(function(req, res, next) {
    res.status(404).json({name: 'Gatsby', version: '3.0', status: 404, message: 'not_found'});
});

app.listen(process.env.PORT, () =>
  console.log(`Gatsby server has started at port ${process.env.PORT}`)
);

// module.exports = app;