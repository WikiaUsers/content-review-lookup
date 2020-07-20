function crearValoraciones( summary, user, editToken ) {
	$.ajax({
		url: mw.util.wikiScript( 'api' ),
	data: {
		format: 'json',
		action: 'edit',
		title: 'Wikivisión:Valoraciones/' + user,
		summary: summary,
		createonly: true,
		appendtext: '<table class="wikitable" width="100%" style="text-align: center;"><tr><th>Serie</th><th>Opinion</th><th>Estado</th><th>Commentario</th></tr>',
		token: editToken
	},
	dataType: 'json',
	type: 'POST',
	success: function( data ) {
		if ( data && data.edit && data.edit.result == 'Success' ) {
			window.location.reload(); // reload page if edit was successful
			GlobalNotification.show('Tu página de valoraciones ha sido creada.', 'confirm');
		} else if ( data && data.error ) {
			GlobalNotification.show('Tu página de valoraciones ya existe.', 'error');
		} else {
			alert( 'Error: Unknown result from API.' );
		}
	},
	error: function( xhr ) {
	alert('¡No necesitas presionar tantas veces el botón!');
		}
	});
}
$('#crearvaloraciones').click(function() {
	crearValoraciones('Habilitando valoraciones de ' + wgUserName, wgUserName, mw.user.tokens.values.editToken); 
});