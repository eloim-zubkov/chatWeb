const ensureSignedIn = require('../middlewares/ensureLoggedIn');

module.exports = function(app) {
	app.get('/signin', (req, res) => {
		res.render('app');
	});

	app.get('*', ensureSignedIn, (req, res) => {
		if (req.signedCookies.name) {
			res.render('app');
		} else {
			res.redirect('/signin');
		}
	});
};
