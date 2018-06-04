const db = require('../db');
const validate = require('../utils/validate');

module.exports = (app) => {
	app.get('/', (req, res) => {
		if (req.signedCookies.name) {
			res.redirect('/chats');
		} else {
			res.redirect('/login');
		}
	});

	app.get('/chats', async (req, res) => {
		if (req.signedCookies.name) {
			const rooms = await db.rooms.find({}).toArray();

			res.render('chats', {rooms});
		} else {
			res.redirect('/login');
		}
	});

	app.get('/login', (req, res) => {
		if (req.signedCookies.name) {
			res.redirect('/chats');
		} else {
			res.render('cabinet');
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
			const room = await db.rooms.findOne({_id: params._id});
			console.log(room);
			
			res.render('chat', {room});
		} else {
			res.redirect('/login');
		}
	});
};
