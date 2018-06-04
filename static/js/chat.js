$(document).ready(function() {
	$('#modal').modal({
		show: true
	});

	$('#enter').click(function() {
		$('#modal').modal('hide');
		init($('#password').val());
	});

	if(!$.find('#modal').length) {
		init();
	}
});

function init(password) {
	$.ajax({
		type: 'GET',
		url: '/api/name',
		success: (username) => {
			let socket = io();

			socket.emit('init', username, $('#messages').data('id'), password);

			socket.on('message', function (username, message) {
				addMessage(message, username);
			});

			$('form').submit(function() {
				const message = $('.message').val();
				socket.emit('message', message);
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
