function enviarValoracion(serie, opinion, estado, comment, editToken) {
	$.ajax({
		url: mw.util.wikiScript( 'api' ),
	data: {
		format: 'json',
		action: 'edit',
		title: 'Wikivisión:Valoraciones/' + wgUserName,
		summary: 'Valoración nueva: ' + serie,
		nocreate: true,
		appendtext: '\n{{Valoración|' + serie + '|' + opinion + '|' + estado + '|' + comment + '}}',
		token: editToken
	},
	dataType: 'json',
	type: 'POST',
	success: function( data ) {
		if ( data && data.edit && data.edit.result == 'Success' ) {
			GlobalNotification.show('¡Valoración guardada exitosamente!', 'confirm');
		}
	},
	error: function( xhr ) {
	alert( 'Error: Request failed.' );
		}
	});
}
function crearPagina(user, editToken) {
	$.ajax({
		url: mw.util.wikiScript( 'api' ),
	data: {
		format: 'json',
		action: 'edit',
		title: 'Wikivisión:Valoraciones/' + user,
		summary: 'Valoración nueva: ' + serie,
		createonly: true,
		appendtext: '<table class="wikitable" width="100%" style="text-align: center;"><tr><th>Serie</th><th>Opinion</th><th>Estado</th><th>Commentario</th></tr>',
		token: editToken
	},
	dataType: 'json',
	type: 'POST',
	success: function( data ) {
		if ( data && data.edit && data.edit.result == 'Success' ) {
			window.location.reload(); // reload page if edit was successful
			GlobalNotification.show('¡Valoración guardada exitosamente!', 'confirm');
		}
	},
	error: function( xhr ) {
	alert( 'Error: Request failed.' );
		}
	});
}
$('.WikiaRail').prepend('<section class="module modulo-opinion"><b>Serie:</b> <span id="modulo-nombre"></span> <br /> <b>Géneros:</b> <span id="modulo-generos"></span> <br /> <b>Creador:</b> <span id="modulo-creadores"></span> <hr /> <b>Estado:</b> <select><option value="Finalizada">Finalizada</option><option value="En progreso">En progreso</option><option value="Por ver">Por ver</option><option value="Pausada">Pausada</option></select> <br /> <b>Opinión:</b> <br /> <div style="text-align: center;"><input type="radio" name="opinion" value="★★★★★" /> Excelente <input type="radio" name="opinion" value="★★★★☆" /> Buena <input type="radio" name="opinion" value="★★★☆☆" /> Regular <br /> <input type="radio" name="opinion" value="★★☆☆☆" /> Mala <input type="radio" name="opinion" value="★☆☆☆☆" /> Pésima</div> <br /> <b>Comentario:</b> <br /> <textarea maxlength="140" cols="35" style="height: 60px;"></textarea> <br /> <span class="button" style="float: right;">Valorar</span></section>');
$('.modulo-opinion span.button').click(function() {
	var appends = {
		opinion: $('.modulo-opinion input:checked').val(),
		comentario: $('.modulo-opinion textarea').val(),
		estado: $('.modulo-opinion option:selected').val()
	};
	crearPagina(wgUserName, mw.user.tokens.values.editToken);
	enviarValoracion(wgPageName, appends.opinion, appends.estado, appends.comentario, mw.user.tokens.values.editToken); 
});