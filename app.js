const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();
var cors = require('cors');
const app = express();



// Routers import
const indexRouter = require('./routes/index');
const loginRegisterRouter = require('./routes/loginRegister');
const feedRouter = require('./routes/feedRouter');
const myHubRouter = require('./routes/myHubRouter');
const communitiesRouter = require('./routes/communitiesRouter');
const eventsRouter = require('./routes/eventsRouter');
const contactInfoRouter = require('./routes/contactInfoRouter');
const photosRouter = require('./routes/photosRouter');
const profileRouter = require('./routes/profileRouter');
const commercialRouter = require('./routes/commercialRouter')
const myprofileRouter = require('./routes/myprofileRouter');
const api = require('./api/router/apiRouter');
const adminRouter = require('./routes/adminRouter');
const moreRouter = require('./routes/moreRouter');
const callingRouter = require('./routes/callingRouter');


// import Database
const connectDB = require("./database/connection");



//  CORS-enabled for all origins!
app.use(cors());

// mongodb connection
connectDB();

// session
app.set("trust proxy", 1); // trust first proxy

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("admin", path.join(__dirname, "admin"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Router use
app.use('/', api, adminRouter, indexRouter, loginRegisterRouter, myprofileRouter, feedRouter, myHubRouter, communitiesRouter, eventsRouter, contactInfoRouter, photosRouter, profileRouter, commercialRouter, moreRouter, callingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

