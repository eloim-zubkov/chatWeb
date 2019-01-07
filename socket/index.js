const moment = require('moment');
const logger = require('../utils/logger');
const db = require('../db');

module.exports = (app) => {
	const io = require('socket.io')(app);

	io.on('connection', (socket) => {
		socket.on('init', async (username, roomId, password) => {
			const roomDb = await db.rooms.findOne({_id: roomId});

			if (!roomDb.password || roomDb.password === password) {
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

		socket.on('message', async (message) => {
			await db.messages.insertOne({
				message,
				user: socket.username,
				room: socket.room
			});
			socket.broadcast.to(socket.room).emit('message', socket.username, message);
		});

		socket.on('disconnect', () => {
			socket.broadcast.to(socket.room).emit(
				'message', 'SERVER', socket.username + ' отключился'
			);
			socket.leave(socket.room);
		});
	});

	logger('Sockets connected successfully');
};
