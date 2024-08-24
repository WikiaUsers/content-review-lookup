function multiRedirect(desde, hasta, editToken ) {
	$.ajax({
		url: mw.util.wikiScript( 'api' ),
	data: {
		format: 'json',
		action: 'edit',
		title: desde,
		summary: 'Creando redirección',
		createonly: true,
		text: '#REDIRECT [[' + hasta + ']]',
		token: editToken
	},
	dataType: 'json',
	type: 'POST'/*,
	success: function( data ) {
		if ( data && data.edit && data.edit.result == 'Success' ) {
			GlobalNotification.show('Redirección creada', 'confirm');
		} else if ( data && data.error ) {
			GlobalNotification.show('Ha ocurrido un error.', 'error');
		} else {
			alert( 'Error: Unknown result from API.' );
		}
	},
	error: function( xhr ) {
	alert( 'Error: Request failed.' );
		}*/
	});
}
$('.toolbar .tools').append('<li class="redirectmodule"><a href="#">Redirecciones</a></li>');
$('.toolbar .tools .redirectmodule').click(function() {
	$('.WikiaRail').prepend('<section class="module module-redirect"><h1>Crear redirección</h1><table width="100%" align="center"><tr><th>Desde:</th><td><input type="text" id="redireccion-desde1" style="float: right;" /></td></tr><tr><th>A:</th><td><input type="text" id="redireccion-a1" style="float: right;" /></td></tr></table> <hr /> <table width="100%" align="center"><tr><th>Desde:</th><td><input type="text" id="redireccion-desde2" style="float: right;" /></td></tr><tr><th>A:</th><td><input type="text" id="redireccion-a2" style="float: right;" /></td></tr></table> <hr /> <table width="100%" align="center"><tr><th>Desde:</th><td><input type="text" id="redireccion-desde3" style="float: right;" /></td></tr><tr><th>A:</th><td><input type="text" id="redireccion-a3" style="float: right;" /></td></tr></table> <hr /> <table width="100%" align="center"><tr><th>Desde:</th><td><input type="text" id="redireccion-desde4" style="float: right;" /></td></tr><tr><th>A:</th><td><input type="text" id="redireccion-a4" style="float: right;" /></td></tr></table> <hr /> <table width="100%" align="center"><tr><th>Desde:</th><td><input type="text" id="redireccion-desde5" style="float: right;" /></td></tr><tr><th>A:</th><td><input type="text" id="redireccion-a5" style="float: right;" /></td></tr></table> <br /> <span class="button" style="float: right;">Crear</span></section>');
	$('.module-redirect span.button').click(function() {
		var redirect = {
			desde1: $('.module-redirect input#redireccion-desde1').val(),
			a1: $('.module-redirect input#redireccion-a1').val(),
			desde2: $('.module-redirect input#redireccion-desde2').val(),
			a2: $('.module-redirect input#redireccion-a2').val(),
			desde3: $('.module-redirect input#redireccion-desde3').val(),
			a3: $('.module-redirect input#redireccion-a3').val(),
			desde4: $('.module-redirect input#redireccion-desde4').val(),
			a4: $('.module-redirect input#redireccion-a4').val(),
			desde5: $('.module-redirect input#redireccion-desde5').val(),
			a5: $('.module-redirect input#redireccion-a5').val()
		};
		multiRedirect(redirect.desde1, redirect.a1, mw.user.tokens.values.editToken);
		multiRedirect(redirect.desde2, redirect.a2, mw.users.tokens.values.editToken);
		multiRedirect(redirect.desde3, redirect.a3, mw.users.tokens.values.editToken);
		multiRedirect(redirect.desde4, redirect.a4, mw.users.tokens.values.editToken);
		multiRedirect(redirect.desde5, redirect.a5, mw.users.tokens.values.editToken);
		$('.module-redirect').hide();
	});
});