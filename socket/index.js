const moment = require('moment');
const db = require('../db');

module.exports = function(app) {
	const io = require('socket.io')(app);

	io.on('connection', function(socket) {
		socket.on('init', async (username, room, password) => {
				room = parseInt(room, 10);

				const roomDb = await db.rooms.findOne({_id: room});

				if (!roomDb.password || roomDb.password == password) {
					socket.username = username;
					socket.room = roomDb._id;
					socket.join(roomDb._id);
					socket.emit('message', 'SERVER', 'вы подключились к ' + roomDb.name);

					socket.broadcast.to(roomDb._id).emit(
						'message', 'SERVER', socket.username + ' присоединился'
					);
					await db.rooms.updateOne(
						{_id: roomDb._id},
						{$set: {updateDate: moment().unix()}}
					);
				} else {
					socket.emit('message', 'SERVER', 'Неверный пароль');
				}
		});

		socket.on('message', (message) => {
			socket.broadcast.to(socket.room).emit('message', socket.username, message);
		});

		socket.on('disconnect', () => {
			socket.broadcast.to(socket.room).emit(
				'message', 'SERVER', socket.username + ' отключился'
			);
			socket.leave(socket.room);
		});
	});
};
