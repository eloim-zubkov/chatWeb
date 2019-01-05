const crypto = require('crypto');
const _ = require('underscore');
const config = require('../../config')();
const db = require('../../db');
const checkLoggedIn = require('../../middlewares/checkLoggedIn');
const checkAdminRights = require('../../middlewares/checkAdminRights');
const validate = require('../../utils/validate');
const errors = require('../../utils/errors');

function makeGetListCondition(params) {
	const condition = {};

	if (params.name){
		condition.name = new RegExp(params.name, 'i');
	}

	return condition;
}
const path = '/api/users';

module.exports = (app) => {
	app.post(path, async (req, res) => {
		const {name, password} = validate(req, {
			name: {
				type: 'string',
				required: true,
				minLength: 3
			},
			password: {
				type: 'string'
			}
		});

		const hash = crypto.createHmac('sha256', config.secret)
			.update(password)
			.digest('hex');

		await db.users.insertOne({name, password: hash, group: 'users'});

		res.sendStatus(200);
	});

	app.patch(path, async (req, res) => {
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

		if (hash !== user.password) {
			throw new Error('Wrong password');
		}

		req.session.auth = true;
		req.session.user = _(user).pick('name', 'group', '_id');
		res.sendStatus(200);
	});

	app.put(
		`${path}/changeGroup`,
		checkLoggedIn(),
		checkAdminRights(),
		async (req, res) => {
			const {_id, group} = validate(req, {
				id: {
					type: 'number',
					required: true
				},
				group: {
					type: 'string',
					required: true
				}
			});

			const user = await db.users.findOne({_id});

			if (!user) {
				throw new errors.NotFoundError();
			}

			await db.users.updateOne({_id}, {$set: {group}});
			res.sendStatus(200);
		}
	);

	app.delete(path, checkLoggedIn(), (req, res) => {
		delete req.session.auth;
		delete req.session.user;

		res.sendStatus(200);
	});
};
