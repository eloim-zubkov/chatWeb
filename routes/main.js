module.exports = function(app) {
	app.get('/signin', (req, res) => {
		res.render('cabinet');
	});

	app.get('*', (req, res) => {
		if (req.signedCookies && req.signedCookies.name) {
			res.render('cabinet');
		} else {
			res.redirect('/signin');
		}
	});
};
