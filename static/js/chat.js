$(document).ready(function() {
	$('#modal').modal({
		show: true
	});

	$('#enter').click(() => {
		$('#modal').modal('hide');
		init($('#password').val());
	});

	if(!$.find('#modal').length && $('#messages').data('id')) {
		init();
	}
});

function init(password = '') {
	$.ajax({
		type: 'GET',
		url: '/api/name',
		success: (username) => {
			const socket = io();

			const room = $('#messages').data('id');
			socket.emit('init', username, room, password);

			socket.on('newMessage', (username, message) => {
				console.log('получил');

				addMessage(message, username);
			});

			$('#chatForm').submit(() => {
				const message = $('.message').val();
				socket.emit('message', message, username, room);
				$('.message').val('');
				addMessage(message, username, 1);
				return false;
			});
		}
	});
};

function addMessage(message, userName, flag = 0) {
	$(`<div class="card m-0 p-0">
		<div class="card-body mb-1">
			<h5 class="card-title">${userName}</h5>
			<p class="card-text">${message}</p>
		</div>
	</div>`).appendTo('#messages');
}
