// Enlace para páginas sin patrullar
$('.WikiHeader > nav li:first-child > .subnav-2 > li:last-child').after('<li><a href="/wiki/Special:NewPages?hidepatrolled=1" class="subnav-2a">Patrullaje</a></li>');

// Módulo para habilitar valoraciones a los usuarios
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
			GlobalNotification.show('La página de valoraciones de ' + user + ' ha sido creada.', 'confirm');
		} else if ( data && data.error ) {
			GlobalNotification.show('La página de valoraciones de ' + user + ' ya existe.', 'error');
		} else {
			alert( 'Error: Unknown result from API.' );
		}
	},
	error: function( xhr ) {
	alert( 'Error: Request failed.' );
		}
	});
}
var datos = {
	create: 'Habilitar'
};
$('.WikiaRail').prepend('<section class="module module-opinion"><b>Habilitar valoraciones de:</b> <br /> <input type="text" /> <span class="button" style="float: right;">' + datos.create + '</span></section>');
$('.module-opinion span.button').click(function() {
	var appends = {
		username: $('.module-opinion input').val()
	};
	crearValoraciones('Habilitando valoraciones de ' + appends.username, appends.username, mw.user.tokens.values.editToken); 
});