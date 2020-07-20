if (wgCategories[1] === 'Series') {
function addNewSection( summary, serie, opinion, estado, comment, editToken ) {
	$.ajax({
		url: mw.util.wikiScript( 'api' ),
	data: {
		format: 'json',
		action: 'edit',
		title: 'Wikivisión:Valoraciones/' + wgUserName,
		summary: summary,
		nocreate: true,
		appendtext: '\n{{Valoración|' + serie + '|' + opinion + '|' + estado + '|' + comment + '}}',
		token: editToken
	},
	dataType: 'json',
	type: 'POST',
	success: function( data ) {
		if ( data && data.edit && data.edit.result == 'Success' ) {
			GlobalNotification.show('¡Valoración guardada exitosamente!', 'confirm');
		} else if ( data && data.error ) {
			GlobalNotification.show('Primero debes <a id="crearvaloraciones">crear tu página de valoraciones</a>.', 'error');
		} else {
			alert( 'Error: Unknown result from API.' );
		}
	},
	error: function( xhr ) {
	alert( 'Error: Request failed.' );
		}
	});
}
$('.WikiaRail').prepend('<section class="module modulo-opinion"><b>Estado:</b> <select><option value="Finalizada">Finalizada</option><option value="En progreso">En progreso</option><option value="Por ver">Por ver</option><option value="Pausada">Pausada</option></select> <br /> <b>Opinión:</b> <br /> <div style="text-align: center;"><input type="radio" name="opinion" value="★★★★★" /> Excelente <input type="radio" name="opinion" value="★★★★☆" /> Buena <input type="radio" name="opinion" value="★★★☆☆" /> Regular <br /> <input type="radio" name="opinion" value="★★☆☆☆" /> Mala <input type="radio" name="opinion" value="★☆☆☆☆" /> Pésima</div> <br /> <b>Comentario:</b> <br /> <textarea maxlength="140" cols="35" style="height: 60px;"></textarea> <br /> <span class="button" style="float: right;">Valorar</span></section>');
$('.modulo-opinion span.button').click(function() {
	var appends = {
	    nombre: $('.default-infobox-container #nombre').text(),
		opinion: $('.modulo-opinion input:checked').val(),
		comentario: $('.modulo-opinion textarea').val(),
		estado: $('.modulo-opinion option:selected').val()
	};
	addNewSection('Añadiendo valoración: ' + appends.nombre, appends.nombre, appends.opinion, appends.estado, appends.comentario, mw.user.tokens.values.editToken); 
});
};