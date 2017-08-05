'use strict';

module.exports = {
	'fbAuth': {
		'clientID': process.env.FB_KEY,
		'clientSecret': process.env.FB_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/fb/callback'
	}
};
