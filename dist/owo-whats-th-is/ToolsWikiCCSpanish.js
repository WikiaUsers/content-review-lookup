// <syntaxhighlight lang="javascript">
/**
 * This JS is only for PERSONAL USE
 * 
 * 
 * 
 * 
 * Para el uso del script: ver [[MediaWiki:custom-ToolsWikiCCSpanish]]
**/
// ==ProyectPageCCES==
//@author           HumanoidPikachu
//@version          1.6
// ==/ProyectPageCCES==

/*Main function*/
function main_prepend() {
    $.showCustomModal('Encabezado', '<form class="WikiaForm" method="" name="" id="header_descForm"><fieldset><br><span style="font-family:Arial"><span id="br2" />Archivo: <textarea name="" id="unic_file" style="height: 15px; width: 80%;" placeholder="Archivo"></textarea><br/>Descripción: <textarea name="" id="unic_desc" style="height: 80px; width: 100%;" placeholder="Descripción"></textarea></fieldset></form>', {
		id: "header_descFormModal",
		width: 765,
		/*Main function - buttons*/
		buttons: [{
			id: "cancel",
			message: "Cancelar",
			handler: function() {
				cancelHeaderForm();
			}
		}, {
			id: "submit",
			defaultButton: true,
			message: "Continuar",
			handler: function() {
				submitHeaderForm();
			}
		}]
	});
}
/*Main function - close modal form*/
function cancelHeaderForm() {
	$("#header_descFormModal").closeModal();
}
/*Main function - submit modal form*/
function submitHeaderForm() {
    var namepage = mw.config.get('wgTitle');
    var $form = $('#header_descForm'),
       header_desc = $form.find('#unic_desc').val();
       header_file = $form.find('#unic_file').val();
    /*Main function - Check #unic_file and #unic_desc is empty or not*/
    if (!header_desc) {
		alert('¡No has puesto una descripción!');
		return;
	}
	if (!header_file) {
		alert('¡No has puesto un archivo!');
		return;
	}
	console.log('Hecho.');
	$("#header_descFormModal").closeModal();
	/*Main function - Input text*/
    $('#wpTextbox1').prepend('[[Archivo:'+ header_file +'|thumb]]\n\'\'\'' + namepage + '\'\'\' ' + header_desc + '\n\n==Comunidades de ' + namepage + '==\n');
    /*Main function - Input text in summary*/
    document.getElementById('wpSummary').value = 'Añadido el encabezado. ([[w:c:internal.furry:MediaWiki:ToolsWikiCCSpanish.js|Script]] | [[w:c:internal.furry:MediaWiki:Custom-ToolsWikiCCSpanish|doc]])';
}
/*Add Buttons*/
if (wgNamespaceNumber == 0 && wgAction != 'edit') {
    $('.header-tally').append(' <a class="button" href="?action=edit&headerpage=ok">Crear encabezado</a>');
}
if (wgNamespaceNumber == 0 && wgAction == 'edit' && $.getUrlVar( 'headerpage' ) === 'ok') {
    main_prepend();
}
if (wgNamespaceNumber == 0 && wgAction == 'edit') {
    $('.editpage-sourcewidemode-off .preview_box').prepend('<span class="button" onclick="main_prepend()">Añadir encabezado</span>');
}
// ==Herramienta de aviso a usuarios==
//@author           HumanoidPikachu
//@version          1.5
// ==/Herramienta de aviso a usuarios==
var user_wall = mw.config.get('wgTitle');
function avisoMuros() {
    /*Title and message body*/
    $('#WallMessageTitle').prepend('Uso inadecuado de los muros');
    $('#WallMessageBody').prepend('{{Muros|' + user_wall + '}}');
    /*Delete Attr Disabled*/
    $('.Wall .SpeechBubble.new-message #WallMessageSubmit').removeAttr('disabled');
    $('.Wall .SpeechBubble.new-message #WallMessagePreview').removeAttr('disabled');
}
function avisoBlogs() {
    /*Title and message body*/
    $('#WallMessageTitle').prepend('Blogs');
    $('#WallMessageBody').prepend('Hola, ' + user_wall + '\n\nHe visto que has públicado una entrada de blog. Lamentablemente la entrada que has creado no tiene nada que ver con Fandom o tiene contenido inadecuado, te invitamos a crear [http://www.wikia.com/Special:CreateNewWiki?uselang=es un wiki] para mayor comodidad o que [[Lista de comunidades|encuentres una ya existente]].\n\n¡Saludos!');
    /*Delete Attr Disabled*/
    $('.Wall .SpeechBubble.new-message #WallMessageSubmit').removeAttr('disabled');
    $('.Wall .SpeechBubble.new-message #WallMessagePreview').removeAttr('disabled');
}
function avisoArticulo() {
    /*Title and message body*/
    $('#WallMessageTitle').prepend('Artículos / Páginas');
    $('#WallMessageBody').prepend('Hola, ' + user_wall + '\n\nHe visto que has públicado un artículo aquí en {{SITENAME}}. Lamentablemente no es una descripción de un wiki, por lo cual se deberá ser eliminado. Si quieres publicar tus proyectos escolares, tus historias, subir fotos, etc. te invitamos a crear [http://www.wikia.com/Special:CreateNewWiki?uselang=es un wiki] para mayor comodidad o que [[Lista de comunidades|encuentres una ya existente]].\n\n¡Saludos!');
    /*Delete Attr Disabled*/
    $('.Wall .SpeechBubble.new-message #WallMessageSubmit').removeAttr('disabled');
    $('.Wall .SpeechBubble.new-message #WallMessagePreview').removeAttr('disabled');
}
function avisoUserPage() {
    /*Title and message body*/
    $('#WallMessageTitle').prepend('Perfil');
    $('#WallMessageBody').prepend('Hola, ' + user_wall + '\n\nHe visto que has editado tu perfil, ¡excelente! pero no has puesto nada sobre ti. No puedes poner una información no ajena de ti en tu perfil, además de que Comunidad Central es un punto de coordinación entre wikis hispanas. Es común equivocarse. Te invitamos a [http://www.wikia.com/Special:CreateNewWiki?uselang=es crear un wiki] para mayor comodidad o que [[Lista de comunidades|encuentres una ya existente]].\n\n¡Saludos!');
    /*Delete Attr Disabled*/
    $('.Wall .SpeechBubble.new-message #WallMessageSubmit').removeAttr('disabled');
    $('.Wall .SpeechBubble.new-message #WallMessagePreview').removeAttr('disabled');
}

if (wgNamespaceNumber == 1200) {
    $('.Wall .MiniEditorWrapper .toolbar').append('<span class="button" onclick="avisoMuros()">Aviso de los muros</span> <span class="button" onclick="avisoBlogs()">Aviso de blogs</span> <span class="button" onclick="avisoArticulo()">Aviso de artículo</span> <span class="button" onclick="avisoUserPage()">Aviso de perfil</span>');
}

// ==ReplySolicitud==
//@author           HumanoidPikachu
//@version          1.2
// ==/ReplySolicitud==

function replySolicitud() {
    var your_username = mw.config.get('wgUserName');
    $.showCustomModal('Responder solicitud', '<form class="WikiaForm" method="" name="" id="replyForm"><fieldset><br><span style="font-family:Arial"><span style="font-weight:bold">Usuario a responder: </span><span style="">' + your_username + '</span><br><span id="br2" /><textarea name="" id="unic_reply" style="height: 80px; width: 100%;" placeholder="Respuesta"></textarea><br><span id="bs3" /></fieldset></form>', {
		id: "replyFormModal",
		width: 765,
		buttons: [{
			id: "cancel",
			message: "Cancelar",
			handler: function() {
				cancelForm();
			}
		}, {
			id: "submit",
			defaultButton: true,
			message: "Responder",
			handler: function() {
				submitForm();
			}
		}]
	});
}
function cancelForm() {
	$("#replyFormModal").closeModal();
}
function submitForm() {
    var $form = $('#replyForm'),
       unic_reply = $form.find('#unic_reply').val();
    
    if (!unic_reply) {
		alert('¡No has puesto una respuesta!');
		return;
	}
	//<nowiki>
    var sign = "~~~~"; 
    //</nowiki>
	$('#wpTextbox1').append(':' + unic_reply + '--' + sign);
	console.log('Hecho.');
	$("#replyFormModal").closeModal();
}


if (wgCanonicalNamespace == "Solicitud") {
    if (wgAction == "edit") {
        $('.module_content nav.buttons').append('<span class="button" onclick="replySolicitud()">Responder</span>');
    }
}

// ==RevUserpage==
//@author           HumanoidPikachu
//@version          1.0
// ==/RevUserpage==
function revUserpage() {
    var inputEditor = document.getElementById('wpTextbox1');
    inputEditor.innerHTML = "==Sobre mí==\n''Esta es tu página de usuario. ¡Edítala y cuéntanos en que otros wikis dentro de Fandom participas para que la comunidad sepa de ti!''\n\n==Mis contribuciones==\n* [[Special:Contributions/{{PAGENAME}}|Contribuciones del usuario]]\n\n==Mis páginas favoritas==\n* ¡Añade aquí los vínculos a las páginas favoritas del wiki!\n* Página favorita #2\n* Página favorita #3";
    document.getElementById('wpSummary').value = 'Revertido a la versión original. ([[w:c:internal.furry:MediaWiki:ToolsWikiCCSpanish.js|Script]] | [[w:c:internal.furry:MediaWiki:Custom-ToolsWikiCCSpanish|doc]])';
}
if (wgNamespaceNumber == 2) {
    $('.editpage-sourcewidemode-off .preview_box').prepend('<span class="button" onclick="revUserpage()">Revertir a la versión original</span>');
}
// ==FastMarkDelete==
//@author           HumanoidPikachu
//@version          1.2
// ==/FastMarkDelete==
/*Add Buttons and functions*/
if (wgNamespaceNumber == 0 && wgAction != 'edit') { 
$('#WikiaPageHeader > .wikia-menu-button > .WikiaMenuElement > li:last-child').after(
    $('<li/>').append('<a style="cursor:pointer" id="ca-markdelete1" href="?action=edit&deletemark=1">Marcar como inadecuado</a>')
    );
}
if (wgNamespaceNumber == 0 && wgAction != 'edit') { 
$('#WikiaPageHeader > .wikia-menu-button > .WikiaMenuElement > li:last-child').after(
    $('<li/>').append('<a style="cursor:pointer" id="ca-markdelete1" href="?action=edit&deletemark=2">Marcar como wiki casi vacía</a>')
    );
}
/*Functions*/
if (wgNamespaceNumber == 0 && wgAction == 'edit' && $.getUrlVar( 'deletemark' ) === '1') {
    $('#wpTextbox1').prepend('{{Borrar|Inadecuado para la central.}}\n');
    document.getElementById('wpSummary').value = 'Página marcada para borrar. ([[w:c:internal.furry:MediaWiki:ToolsWikiCCSpanish.js|Script]] | [[w:c:internal.furry:MediaWiki:Custom-ToolsWikiCCSpanish|doc]])';
}
if (wgNamespaceNumber == 0 && wgAction == 'edit' && $.getUrlVar( 'deletemark' ) === '2') {
    $('#wpTextbox1').prepend('{{Borrar|La comunidad no tiene más de 10 páginas}}\n');
    document.getElementById('wpSummary').value = 'Página marcada para borrar. ([[w:c:internal.furry:MediaWiki:ToolsWikiCCSpanish.js|Script]] | [[w:c:internal.furry:MediaWiki:Custom-ToolsWikiCCSpanish|doc]])';
}

/** File Licence **/
console.log('Loading QuickLicence...');

$('.module_page_controls .buttons').append('<a class="addLicence" href="#">Añadir Licencia</a>');
function addLic(lic) {
    $('#wpTextbox1').append('==Licencia==\n{{Licencia|'+lic+'}}');
    $("#moduleLicence").closeModal();
}
$('.addLicence').click(function() {
    $.showCustomModal('Añadir licencia', '<div class="addLicence-fallback" onclick="addLic(\'fallback\')">Fallback</div><div class="addLicence-community" onclick="addLic(\'comunidades\')">Comunidades</div><div class="addLicence-blogs" onclick="addLic(\'blogs\')">Blogs</div><div class="addLicence-help" onclick="addLic(\'ayuda\')">Ayuda</div>', {id: "moduleLicence", width: 700});
});
console.log('Done.');
//</syntaxhighlight>