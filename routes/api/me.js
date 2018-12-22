const ensureLoggedIn = require('../../middlewares/ensureLoggedIn');

module.exports = (app) => {
	app.get(
		'/api/me',
		ensureLoggedIn(),
		(req, res) => res.json(req.session.user)
	);
};
