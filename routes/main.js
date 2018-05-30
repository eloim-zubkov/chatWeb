const db = require('../db');
const validate = require('../utils/validate');

module.exports = function(app) {
	app.get('/signin', (req, res) => {
		res.render('cabinet');
	});

	app.get('/*', (req, res) => {
		if (req.signedCookies.name) {
			res.render('cabinet');
		} else {
			res.redirect('/signin');
		}
	});

	app.get('/chats', async (req, res, next) => {
		if (req.signedCookies.name) {
			const room = await db.rooms.find().toArray();

			res.json({rooms: rooms});
		} else {
			res.redirect('/signin');
		}
	});

	app.get('/chats/:_id', async (req, res) => {
		const params = validate(req, {
			_id: {
				required: true,
				type: 'number',
				minimum: 0
			}
		});

		if (req.signedCookies.name) {
			const rooms = await db.rooms.findOne({_id: params._id});

			res.json({rooms});
		} else {
			res.redirect('/signin');
		}
	});
};
