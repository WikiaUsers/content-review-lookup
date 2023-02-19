/*<nowiki>*/
//Creditos a CC Español.
 
var form_request = {
    edittoken: mw.user.tokens.values.editToken, 
    namespace: mw.config.get('wgNamespaceNumber'), 
    pagename: mw.config.get('wgPageName'), 
    executeon: 'Furry_Database_World:Chatbots', 
    server: mw.config.get('wgServer'), 
    signature: '~~~~', 
    language: mw.config.get('wgUserLanguage'), 
    username: mw.config.get('wgUserName')
};
if (form_request.pagename === form_request.executeon) {
	var buttonappend = '<a class="wds-is-secondary wds-button" id="request-submit" onclick="openFormRequest()">Solicitar un chatbot</a>';
	document.getElementById("request-chatbot").innerHTML = buttonappend;
}
function cancelformRequest() {
	$("#requestWindow").closeModal();
}
function openFormRequest() {
	$.showCustomModal('Petición de chatbot', '<form class="WikiaForm" method="" name="" id="request"><fieldset><br><span style="font-family:Arial"><span style="font-weight:bold">Nombre de la comunidad</span><br><input id="wikiname" type="text" placeholder="es.itsuki-world (solo interwiki sin w:c:)" style="width:400px"/><br><span style="font-weight:bold">Usuarios en promedio en el chat</span><br><input id="usersinchat" type="text" placeholder="No se acepta que la cantidad sea minima de 5." style="width:500px"/><br><span style="font-weight:bold">Discusión de aprobación del bot</span><br><input id="threadwikibot" type="text" placeholder="Hilo:NúmeroID (ejemplo: Hilo:1662)" style="width:450px"/><br><br><span style="font-weight:bold">Usuario solicitante:</span><span style="" id="usernameWikia"> ' + form_request.username + '</span><br><span id="br2" /><textarea name="" id="desc" style="height: 100px; width: 100%;" placeholder="¿Algun comentario, alguna característica que quieras añadir?"></textarea><br><span id="br2" /></fieldset></form>', {
		id: "requestWindow",
		width: 765,
		buttons: [{
			id: "cancel",
			message: "Cancelar",
			handler: function() {
				cancelformRequest();
			}
		}, {
			id: "submit",
			defaultButton: true,
			message: "Enviar",
			handler: function() {
				submitformRequest();
			}
		}]
	});
}
 
function submitformRequest() {
	console.log('Enviando...');
	var $form = $('#request'),
		desc = $form.find('#desc').val(),
		wikiname = $form.find('#wikiname').val(),
		usersinchat = $form.find('#usersinchat').val(),
		threadwikibot = $form.find('#threadwikibot').val(),
		page = '{{Request/header}}\n' + '\n{{RequestChatbots\n|Estado = En espera... <!-- NO CAMBIAR ESTADO.  -->\n|Usuario =' + form_request.username + '\n|Desc =' + desc + ' ' + form_request.signature + '\n|Sitename =' + wikiname + '\n|Usersinchat =' + usersinchat + '\n|Threadwikibot =' + threadwikibot + '}}',
		pagetitle = 'Petición de Chatbot:' + form_request.username;
	
	if (!wikiname) {
		alert('¡No has puesto nada en donde quieres que el bot esté en tu wiki!');
		return;
	}
	
	if (!usersinchat) {
		alert('¡No has puesto nada en cuantos usuarios hay en promedio en el chat de tu comunidad!');
		return;
	}
	
	if (!threadwikibot) {
		alert('¡No has puesto nada en discusión de aprobación del bot!');
		return;
	}
 
	var url = form_request.server + '/api.php?action=edit&title=' + pagetitle + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(form_request.edittoken);
	alert('La petición ya está siendo enviada...');
	console.log('Obteniendo la URL: ', url);
 
	$.post(url, function(r) {
		console.log('Ya debería estar hecho:', r);
		cancelformRequest();
		window.location = form_request.server + '/wiki/' + pagetitle;
	});
	console.log('Enviando solicitud...');
}
/*</nowiki>*/