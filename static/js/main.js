$(function (){
	$('#add').click(function (){
		$.ajax({
			url: '/add',
			method: 'post',
			data: $("#add-form").serialize()
		})
		.done(function(data, status, request) {
			$('#list').load('/list');
			$('#message').text('');
		})
		.fail(function(jqXHR, status, error){
			$('#message').text(jqXHR.responseText);
		});				
	});
});