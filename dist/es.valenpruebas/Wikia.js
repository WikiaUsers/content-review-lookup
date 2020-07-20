// Limpiar el chat
$("#LimpiarChat").click(function() {
	$('#Chat_21 ul li').fadeOut(200,function(){
		$(this).remove();
	});
	$('#Chat_21 ul').append('<div class="inline-alert">Chat limpiado</div>');
	setTimeout(function(){
		$('#Chat_21 ul div').fadeOut(500,function(){
			$(this).remove();
		});
	}, 5000);
});