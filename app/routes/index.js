'use strict';

var path = process.cwd();

//var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var DbHandler = require(path + '/app/controllers/dbHandler.server.js');
module.exports = function (app, db) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			console.log("logged in");
			return next();
		} else {
			res.redirect('/login');
		}
	}
	
	var dbHandler = new DbHandler(db);
	// app.route('/')
	// 	.get(dbHandler.getDatabse);
	//dbHandler.getDatabse;
	app.route('/')
		.get(function (req, res) {
			//dbHandler.getDatabse;
			res.sendFile(path + '/public/index.html');
		});

	// app.route('/login')
	// 	.get(function (req, res) {
	// 		res.sendFile(path + '/public/login.html');
	// 	});

	// app.route('/logout')
	// 	.get(function (req, res) {
	// 		req.logout();
	// 		res.redirect('/login');
	// 	});

	// app.route('/profile')
	// 	.get(isLoggedIn, function (req, res) {
	// 		res.sendFile(path + '/public/profile.html');
	// 	});

	// app.route('/api/:id')
	// 	.get(isLoggedIn, function (req, res) {
	// 		res.json(req.user.github);
	// 	});

	// app.route('/auth/github')
	// 	.get(passport.authenticate('github'));

	// app.route('/auth/github/callback')
	// 	.get(passport.authenticate('github', {
	// 		successRedirect: '/',
	// 		failureRedirect: '/login'
	// 	}));
	app.route('/polls')
		.get(dbHandler.getQuestion);
	// app.route('/polls/:id')
	// 	.get(dbHandler.getId);
	
	// app.route('/polls/:id')
	// 	.get(dbHandler.getId);
	// app.route('/polls/:id')
	// 	.get(function(req,res){

	// 			res.sendFile(path + '/public/option.html');
			
	// 		//dbHandler.getId;
	// 	});
	// app.route('/options/:id').get(function(req,res){

	// 			res.sendFile(path + '/public/option.html');
			
	// 		//dbHandler.getId;
	// 	});
	
	app.route('/options/:id')
		.get(dbHandler.getId);
		
	app.route('/pull/update')
		.post(dbHandler.addOptionCount);
	// app.post('/pull/update', function(req, res){
	// 	dbHandler.addOptionCount;
	// 	// console.log(req.body.id);
	// 	// console.log(req.body.vote);
	// });


	
};
