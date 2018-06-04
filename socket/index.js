const moment = require('moment');
const db = require('../db');

module.exports = function(app) {
	const io = require('socket.io')(app);

	io.on('connection', (socket) => {
		socket.on('init', async (username, room, password) => {
			const roomDb = await db.rooms.findOne({_id: room});

			if (!roomDb.password || roomDb.password === password) {
				socket.join(room);

				socket.emit('newMessage', 'SERVER', 'Вы подключились к ' + roomDb.name);

				socket.broadcast.to(room).emit(
					'newMessage', 'SERVER', username + ' присоединился'
				);
				await db.rooms.updateOne(
					{_id: roomDb._id},
					{$set: {}}
				);
			} else {
				socket.emit('newMessage', 'SERVER', 'Неверный пароль');
			}
		});

		socket.on('message', (message, username, room) => {
			socket.broadcast.to(room).emit('newMessage', username, message);
		});

		socket.on('disconnect', () => {
			socket.broadcast.to(socket.room).emit(
				'newMessage', 'SERVER', socket.username + ' отключился'
			);
			socket.leave(socket.room);
		});
	});
};
