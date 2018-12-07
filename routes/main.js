const ensureSignedIn = require('../middlewares/ensureLoggedIn');

module.exports = function(app) {
	app.get('*', ensureSignedIn(), (req, res) => {
		res.render('app');
	});
};
