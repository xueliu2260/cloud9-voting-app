'use strict';

var path = process.cwd();

//var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var DbHandler = require(path + '/app/controllers/dbHandler.server.js');
module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			//console.log("logged in");
			return next();
			
		} else {
			res.redirect('/');
		}
	}
	
	var dbHandler = new DbHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.route('/profile')
		.get(isLoggedIn, dbHandler.getUserInfo);

	app.route('/api/:id')
		.get(function (req, res) {
			if(req.isAuthenticated()){
				res.json(req.user.fb);
			}
			
		});
		
	app.route('/pull/:id')
		.get(dbHandler.getOptions);
	
	app.route('/pull/update')
		.post(dbHandler.addOptionCount);
		
	app.route('/auth/fb')
		.get(passport.authenticate('facebook'));

	app.route('/auth/fb/callback')
		.get(passport.authenticate('facebook', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));
	app.route('/polls')
		.get(dbHandler.getQuestion);

	app.route('/new/pull')
		.get(function(req, res){
			if(req.isAuthenticated()){
				res.render(path + '/public/newPoll.ejs', {userName: req.user.fb.displayName});
			}else{
				req.redirect('/');
			}
		});
	app.route('/new/pull')
		.post(isLoggedIn, dbHandler.addNewPull);
};
