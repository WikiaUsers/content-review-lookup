/*<nowiki>
@ Based on MediaWiki:Adopciones.js, 
@ which was created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adapted to es.c by Bola
@ License: CC-BY-SA 3.0 
*/
// Variables for later on
// Keep these in an object for organization
var ado = {
	edittoken: mw.user.tokens.values.editToken,
	namespace: mw.config.get('wgNamespaceNumber'),
	pagename: mw.config.get('wgPageName'),
	executeon: 'Comunidad_Central:Equipo_de_portabilidad',
	server: mw.config.get('wgServer'),
	signature: '~~~~',
	language: mw.config.get('wgUserLanguage'),
	username: mw.config.get('wgUserName')
};

// Add buttons 
if (ado.pagename === ado.executeon) {
	var buttonappend = '<a class="wikia-button" id="portabilidad-submit" onclick="openFormPortabilidad()">Solicitar migración</a>';
	document.getElementById("lang-ES").innerHTML = buttonappend;
	window.dropdown = '<select name="tipo" id="tipo" value="AD">';
	dropdown += '<option value="" selected disabled>Tipo de cargo</option><option value="Administrador">Administrador</option><option value="Burócrata">Burócrata</option><option value="Usuario">Usuario</option></select>';
}


// This opens the form for the users to fill out

function openFormPortabilidad() {
	$.showCustomModal('Solicitud de migración de infoboxes', '<form class="WikiaForm" method="" name="" id="portabilidad"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Nombre de la comunidad</span><br><input id="wikiname" type="text" placeholder="Kirbipedia" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Enlace</span><br><span style="color:gray">http://</span><input id="wikiurl" type="text" placeholder="es.kirby" style="width:364px"/><span style="color:gray">.wikia.com</span><br><span style="font-weight:bold">Usuario solicitante:</span><span style="" id="user"> ' + ado.username + '</span><br><span id="br2" /><span style="font-weight:bold">¿Cuál de estos cargos te describe?</span> ' + window.dropdown + ' <br><span id="br2" /><span style="font-weight:bold">¿Qué nombre tiene la categoría que recopila todas las infoboxes de la comunidad?</span><br>Recuerda que debe existir una donde estén todas. En caso contrario, la solicitud será rechazada.</br><textarea name="" id="infoboxes" style="height: 20px; width: 30%;" placeholder="Plantillas de infobox"></textarea><br><span id="br2" /><span style="font-weight:bold">Comentarios</span><br><textarea name="" id="comment" style="height: 100px; width: 100%;" placeholder="Comentarios que quieres hacer acerca de la solicitud"></textarea><br><span id="br2" /></fieldset></form>', {
		id: "requestWindow",
		width: 650,
		buttons: [{
			id: "cancel",
			message: "Cancelar",
			handler: function() {
				cancelformPortabilidad();
			}
		}, {
			id: "submit",
			defaultButton: true,
			message: "Enviar",
			handler: function() {
				submitformPortabilidad();
			}
		}]
	});
}

// Closes the form
function cancelformPortabilidad() {
	$("#requestWindow").closeModal();
}

// Submits the form
function submitformPortabilidad() {
	console.log('Enviando...');
	var $form = $('#portabilidad'),
		wikiname = $form.find('#wikiname').val(),
		url = $form.find('#wikiurl').val(),
		user = $form.find('#user').val(),
		tipo = $form.find('#tipo').val(),
                infoboxes = $form.find('#infoboxes').val(),
		comentarios = $form.find('#comment').val(),
		page = '{{Solicitud_de_migración/encabezado|Equipo de portabilidad|Migraciones}}\n' + '==' + wikiname + '==\n{{Solicitud de migración\n|Estado  = <!-- NO EDITAR finalizado/declinado/pendiente  -->\n|Wiki	 =' + wikiname + '\n|Enlace  =' + url + '\n|Tipo	 =' + tipo + '\n|Usuario =' + ado.username + '\n|Infoboxes =' + infoboxes + '\n|Voluntario  = <!-- Escribe solamente el nombre de usuario, sin el prefijo. -->\n|Comentarios =' + comentarios + ' ' + ado.signature + '}}',
	
		date = new Date(),
		day = ('0' + date.getDate()).slice(-2),
		month = ('0' + (date.getMonth() + 1)).slice(-2),
		year = date.getFullYear(),
		timestamp = year + '' + month + '' + day,
		pagetitle = 'Solicitud:' + wikiname + ' p' + timestamp;
		
	// If url or header is blank, return alerts
	if (!url) {
		alert('¡Olvidaste poner el enlace a tu comunidad!');
		return;
	}
	if (!wikiname) {
		alert('¡Olvidaste poner el nombre de la comunidad!');
		return;
	}
        if (!tipo) {
                alert('¡Olvidaste poner tu tipo de cargo!');
                return;
        }
        if (!infoboxes) {
                alert('¡Olvidaste poner la categoría de infoboxes!');
                return;
        }
	console.log('Comprobaciones realizadas...'); 
 
	// Ajax URL
	var url = ado.server + '/api.php?action=edit&title=' + pagetitle + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(ado.edittoken);
	// alert('La solicitud ya está siendo enviada');
	console.log('Obteniendo la URL: ', url);

	$.post(url, function(r) {
		console.log('Ya debería estar hecho:', r);
		cancelformPortabilidad();
		window.location = ado.server + '/wiki/' + pagetitle;
	});
	console.log('Enviando solicitud...');
}
/*</nowiki>*/