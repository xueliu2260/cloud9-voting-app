'use strict';

var express = require('express');

var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var app = express()
    ,render = require('express-render')(app);
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

render.init({
    render_engine: 'underscore'
  , template_type: 'ejs'
  , views_directory: './'
})
//var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
//var MongoClient = mongodb.MongoClient;
var test = require('assert');
// // Connection URL. This is where your mongodb server is running.

// //(Focus on This Variable)
//var url = 'mongodb://liuerbaozi2260:zja900530@ds137220.mlab.com:37220/glitch-project';      
// //(Focus on This Variable)
var collection;
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/amchars', express.static(process.cwd() + '/amchars'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use('/node_modules', express.static(process.cwd() + '/node_modules'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);


// MongoClient.connect(url, function (err, db) {
//     if (err) {
//       console.log('Unable to connect to the mongoDB server. Error:', err);
//       } else {
//       console.log('Connection established to ', url);
// // 		routes(app, db, passport);
//       }
//   })
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
