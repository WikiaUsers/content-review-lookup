// s o m e t h i n g

// cargar JSON y convertirlo a objeto
var jsonpage = 'Usuario:ElNobDeTfm/test.json';
var userjson;
function loadJSON() {
$.getJSON('/wiki/' + jsonpage + '?action=raw', function(data) {
	userjson = data;
});
}
loadJSON();
function insertarPuntosHTML() { // manipular el HTML sólo cuando esté listo
   $('.puntosusuario').each(function() { // si hay un div de placeholder, entonces escribir los puntos en el documento
	var esc = mw.html.escape,
		$this = $(this);
		usuario = esc('' + $this.data('user')),
		totalpuntos = Number(userjson[usuario]);
		if (isNaN(totalpuntos)) {
			totalpuntos = 0;
			return;
		}
	$this.html('<span class="puntos">' + totalpuntos + '</span>');
});
if ($('table.listaPuntos').length != 0) { // si hay una tabla de puntos, entonces escribir usuarios y puntos en la misma
	$.each(userjson, function(usuario, puntos) {
		$( ".indiceUsuarios" ).after('<tr><td>' + usuario + '</td><td>' + puntos + '</td></tr>');
});
}
}
addOnloadHook(insertarPuntosHTML);

$('<li>', {id: 'user-points-menu'})
.html('<a href="#">Modificar puntos de advertencia</a>')
.appendTo('#my-tools-menu');
$('#user-points-menu').on('click', function(e) {
e.preventDefault();
$.showCustomModal('Modificar puntos', '<input id="nuevoUsuario" type="text" placeholder="Nombre de usuario" />&nbsp;&nbsp;<a class="wikia-button" id="agregarNuevoUsuario">Añadir nuevo usuario</a><br /> \
	<div id="datosPlaceholder">Cargando datos...</div>',
	{id: 'modificarPuntosUsuarios',
buttons: [
		{
			id:'ok',
			defaultButton:true,
			message:'Guardar',
			handler:function() {
				escribirPuntos();
				$('#modificarPuntosUsuarios').closeModal();
			}
		},
		{
			id:'cancel',
			message:'Cancelar',
			handler:function(){$('#modificarPuntosUsuarios').closeModal();}
		}
	]}
);
var placeholder = $('#modificarPuntosUsuarios').find('#datosPlaceholder');
function cargarPuntos () {
		placeholder.html('<table id="tablePuntosUsuarios" cellspacing="5" cellpadding="5"> \
			<tr> \
			<th>Usuario</th> \
			<th>Puntos</th> \
			</tr> \
			</table>');
		$.each(userjson, function(usuario, puntos) {
			$('#tablePuntosUsuarios').append('<tr><td>' + usuario + '</td> \
			<td><input class="puntos" type="number" max="25" data-user="' + usuario + '"  value="' + puntos + '"></td> \
			</tr><br />');
	});
}
cargarPuntos();
var formModificarPuntos = $('#tablePuntosUsuarios');
$('#agregarNuevoUsuario').on('click', (function(event) {
		var nuevoUsuario = $('#nuevoUsuario').val();
		if (nuevoUsuario === "") {
			alert('no hay nombre de usuario');

		} else {
		userjson[nuevoUsuario] = 0;
		actualizarObjeto();
		cargarPuntos();
		$('#nuevoUsuario').val('');
		}
}));

function actualizarObjeto() {
	$("input.puntos").each(function() {
		if ($(this).val() == 0) {
			delete userjson[$(this).attr('data-user')];
		} else if ($(this).val() > 25) {
			alert('Uno o más valores es mayor a 25');
			return false;
		} else {
		userjson[$(this).attr('data-user')] = $(this).val();
		}
	});
}

function escribirPuntos() {
	if (actualizarObjeto()) {
	var newData = JSON.stringify(userjson, null, 1);
	var ds; mw.loader.using('mediawiki.api').then(function() {
		ds = new mw.Api();
		var API = new mw.Api();
		ds.post({
					action: 'edit',
					title: jsonpage,
					text: newData,
					summary: 'actualizando puntos de advertencia',
					token: mw.user.tokens.values.editToken
					});
        });
		alert('Cambios guardados.');
	}
}
});