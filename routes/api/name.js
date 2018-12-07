const crypto = require('crypto');
const config = require('../../config')();
const db = require('../../db');
const checkLoggedIn = require('../../middlewares/checkLoggedIn');
const validate = require('../../utils/validate');

function makeGetListCondition(params) {
	const condition = {};

	if (params.name){
		condition.name = new RegExp(params.name, 'i');
	}

	return condition;
}

module.exports = (app) => {
	app.get('/api/name', (req, res) => {
		res.status(200).send(req.signedCookies.name);
	});

	app.patch('/api/name', async (req, res) => {
		const params = validate(req, {
			name: {
				type: 'string',
				required: true,
				minLength: 3
			},
			password: {
				type: 'string'
			}
		});

		const user = await db.users.findOne(makeGetListCondition(params));
		const hash = crypto.createHmac('sha256', config.secret)
			.update(params.password)
			.digest('hex');

		if (hash === user.password) {
			res.cookie('name', params.name, {signed: true});
			res.send(req.signedCookies.name);
			return;
		}

		throw new Error('Wrong password');
	});

	app.delete('/api/name', checkLoggedIn(), (req, res) => {
		res.clearCookie('name');
		res.sendStatus(200);
	});
};
