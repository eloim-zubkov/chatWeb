const checkLoggedIn = require('../../middlewares/checkLoggedIn');
const validate = require('../../utils/validate');

module.exports = (app) => {
	app.get('/api/name', (req, res) => {
		res.status(200).send(req.signedCookies.name);
	});

	app.patch('/api/name', (req, res) => {
		const params = validate(req, {
			name: {
				type: 'string',
				required: true,
				minLength: 3
			}
		});

		res.cookie('name', params.name, {signed: true});
		res.send(req.signedCookies.name);
	});

	app.delete('/api/name', checkLoggedIn(), (req, res) => {
		res.clearCookie('name');
		res.sendStatus(200);
	});
};
