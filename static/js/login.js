$(document).ready(() => {
	$('#loginForm').submit(() => {
		const name = $('#usr').val();
		$.ajax({
			url: '/api/name',
			data: JSON.stringify({name}),
			contentType: 'application/json',
			type: 'PATCH',
			success: () => {
				window.location.href = "/chats";
			}
		});
		return false;
	});
});
