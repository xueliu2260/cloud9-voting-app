'use strict';

var FBStrategy = require('passport-facebook').Strategy;
var User = require('../models/users');
var configAuth = require('./auth');

module.exports = function (passport) {
	console.log("in passport");
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new FBStrategy({
		clientID: configAuth.fbAuth.clientID,
		clientSecret: configAuth.fbAuth.clientSecret,
		callbackURL: configAuth.fbAuth.callbackURL
	},
	function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'fb.id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();

					newUser.fb.id = profile.id;
					newUser.fb.username = profile.username;
					newUser.fb.displayName = profile.displayName;
					newUser.fb.publicRepos = profile._json.public_repos;

					newUser.save(function (err) {
						if (err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
		});
	}));
};
