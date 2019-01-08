const _ = require('underscore');
const validate = require('../../utils/validate');
const db = require('../../db');
const checkLoggedIn = require('../../middlewares/checkLoggedIn');
const checkAdminRights = require('../../middlewares/checkAdminRights');
const errors = require('../../utils/errors');

function makeGetListCondition(params) {
	const condition = {};

	if (params.textQuery){
		condition.name = new RegExp(params.textQuery, 'i');
	}

	return condition;
}

module.exports = (app) => {
	app.get('/api/rooms', checkLoggedIn(), async (req, res) => {
		const params = validate(req, {
			offset: {
				type: 'number',
				default: 0,
				minimum: 0
			},
			limit: {
				type: 'number',
				default: 20,
				minimum: 1,
				maximum: 100
			},
			textQuery: {
				type: 'string',
				minLength: 0,
				maxLength: 20
			}
		});

		const condition = makeGetListCondition(params);

		const [rooms, total] = await Promise.all([
			db.rooms
				.find(condition, {_id: 1, name: 1, isPassword: 1})
				.limit(params.limit)
				.skip(params.offset)
				.toArray(),
			db.rooms.count(condition)
		]);

		res.json({rooms, total});
	});

	app.get('/api/rooms/:_id', checkLoggedIn(), async (req, res) => {
		const params = validate(req, {
			_id: {
				required: true,
				type: 'number',
				minimum: 0
			}
		});

		const room = await db.rooms.findOne(
			{_id: params._id},
			{
				name: 1,
				withPassword: 1,
				_id: 1
			});

		if (!room) {
			throw new errors.NotFoundError();
		}

		res.json({...room});
	});

	app.post('/api/rooms', checkLoggedIn(), async (req, res) => {
		const params = validate(req, {
			name: {
				type: 'string',
				minLength: 3,
				required: true
			},
			password: {
				type: 'string',
				minLength: 6
			}
		});

		const room = await db.rooms.findOne({name: params.name});

		if (room) {
			throw new Error('Комната с таким именем уже существует');
		}

		params.withPassword = params.password !== undefined;

		await db.rooms.insertOne(params);

		res.json({room: _(room).pick('_id', 'name')});
	});

	app.delete(
		'api/rooms/:id',
		checkLoggedIn(),
		checkAdminRights(),
		async (req, res) => {
			const {_id} = validate(req, {
				_id: {
					required: true,
					type: 'number',
					minimum: 0
				}
			});

			const room = await db.roomd.findOne({_id});

			if (!room) {
				throw new errors.NotFoundError();
			}

			await db.rooms.deleteOne({_id});

			res.send(200);
		}
	);
};
