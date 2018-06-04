$(document).ready(function() {
	$('#exit').click(function() {
		$.ajax({
			url: '/api/name',
			type: 'DELETE',
			success: function() {
				window.location.href = '/login';
			}
		});
	});
});
