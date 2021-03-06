require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const app = express();

const app_name = require('./package.json').name;
const debug = process.env.ENV ? require('debug')(
  `${app_name}:${path.basename(__filename).split('.')[0]}`
) : null;



// require database configuration
require('./configs/db.config');
require('./configs/session.config')(app);


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// hbs.registerPartials(path.join(__dirname, "views", "partials"))
// app.get("/players", (req, res, next) => res.render("players"))


// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

app.use("/", require("./routes/toBorrow.routes"));
app.use("/", require("./routes/user.routes"));


// const toBorrow = require('./routes/toBorrow.routes');
// app.use('/', toBorrow);

// const user = require('./routes/user.routes');
// app.use('/', user);

module.exports = app;

// app.listen(3000, () => console.log('Emprestae project running on port 3000 🎧 🥁 🎸 🔊'));