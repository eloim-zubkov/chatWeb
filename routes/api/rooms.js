const _ = require('underscore');
const validate = require('../../utils/validate');
const db = require('../../db');

module.exports = function(app) {
	function makeGetListCondition(params) {
		const condition = {};

		if (params.textQuery){
			condition.text = new RegExp(params.textQuery, 'i');
		}

		return condition;
	}

	app.get('/api/rooms', async (req, res) => {
		const params = validate(req, {
			offset: {
				type: 'number',
				'default': 0,
				minimum: 0
			},
			limit: {
				type: 'number',
				'default': 20,
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
				.find(condition, {_id: 1, name: 1})
				.limit(params.limit)
				.skip(params.offset)
				.toArray(),
			db.rooms.count(condition)
		]);

		res.json({rooms, total});
	});

	app.get('/api/rooms/:_id', async (req, res) => {
		const params = validate(req, {
			_id: {
				required: true,
				type: 'number',
				minimum: 0
			}
		});

		if (req.signedCookies.name) {
			const room = await db.rooms.findOne(
				{_id: params._id},
				{
					name: 1,
					_id: 1
				});

			res.json({...room});
		} else {
			res.redirect('/signin');
		}
	});

	app.post('/api/rooms', async (req, res) => {
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

		const roomDb = await db.rooms.findOne({name: params.name});

		if (roomDb) {
			throw new Error('Комната с таким именем уже существует');
		}

		const room = await db.rooms.insertOne(params);

		res.json({room: _(room).pick('_id', 'name')});
	});
};
