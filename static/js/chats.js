$(document).ready(function() {
	$('#roomForm').submit(function() {
		const name = $('#name').val();
		const password = $('#password').val();
		$.ajax({
			url: '/api/rooms',
			data: JSON.stringify({name: name, password: password || undefined}),
			contentType: 'application/json',
			type: 'POST',
			success: function(data) {
				window.location.href = '/chats/' + data.room._id;
			}
		});
		return false;
	});
});
