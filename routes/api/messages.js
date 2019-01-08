const validate = require('../../utils/validate');
const db = require('../../db');
const checkLoggedIn = require('../../middlewares/checkLoggedIn');

module.exports = (app) => {
	app.get('/api/messages', checkLoggedIn(), async (req, res) => {
		const params = validate(req, {
			limit: {
				type: 'number',
				default: 20,
				minimum: 1,
				maximum: 100
			},
			room: {
				type: 'number',
				required: true
			}
		});

		const [messages, total] = await Promise.all([
			db.messages
				.find(params, {_id: 1, name: 1, message: 1, room: 1})
				.limit(params.limit)
				.skip(params.offset)
				.toArray(),
			db.messages.count(params)
		]);

		res.json({rooms: messages, total});
	});
};
