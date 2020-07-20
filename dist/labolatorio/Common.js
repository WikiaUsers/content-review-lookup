/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

$(function(){
  if( !document.getElementById('icono-header') ) {
 	return;
  }
  var editMargin = null;
 	editMargin = document.getElementById('WikiaPageHeader');
 	editMargin.style.margin = '0 10px 50px 10px';
});


/*<nowiki>
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adapted to es.c by Bola
@ License: CC-BY-NC-SA
*/
 
 
// Variables for later on
// Keep these in an object for organization
var kt = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage'),
    username: mw.config.get('wgUserName')
};
 
 
// Add buttons 
if(kt.pagename === "Hola") {
    var buttonappend = '<a class="wikia-button" id="adoption-submit" onclick="openFormAdoption()">Solicitar una adopción</a>';
    document.getElementById("lang-ES").innerHTML = buttonappend;
    window.dropdown = '<select name="tipo" id="tipo" value="AD">';
    dropdown += '<option value="" selected disabled>Tipo de solicitud</option><option value="AD">Administrador</option><option value="BU">Burócrata</option></select>';
}
 
 
// This opens the form for the users to fill out
 
function openFormAdoption() {
    $.showCustomModal('Solicitud de adopción', '<form class="WikiaForm" method="" name="" id="adoption"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Nombre de la comunidad</span><br><input id="wikiname" type="text" placeholder="Kirbipedia" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Enlace</span><br><span style="color:gray">http://</span><input id="wikiurl" type="text" placeholder="es.kirby" style="width:364px"/><span style="color:gray">.wikia.com</span><br><span style="font-weight:bold">Usuario solicitante:</span><span style="" id="user"> ' + kt.username + '</span><br><span id="br2" /><span style="font-weight:bold">Rango que deseas</span> (' + window.dropdown + ')<br><span id="br2" /><span style="font-weight:bold">Comentarios</span><br><input id="comment" type="text" placeholder="Comentarios que quieres hacer acerca de la solicitud" style="width:400px"/><br><span id="br2" /></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Cancelar",
            handler: function () {
                cancelformAdoption();
            }
        }, {
            id: "submit",
            defaultButton: true,
            message: "Enviar",
            handler: function () {
                submitformAdoption();
            }
        }]
    });
}
 
// Closes the form
 
function cancelformAdoption() {
    $("#requestWindow").closeModal();
}
 
// Submits the form
 
function submitformAdoption() {
console.log('Enviando...');
    var $form = $('#adoption'),
        wikiname = $form.find('#wikiname').val(),
        url = $form.find('#wikiurl').val(),
        user = $form.find('#user').val(),
        tipo = $form.find('#tipo').val(),
        comentarios = $form.find('#comment').val(),
        page = '==' + wikiname + '==\n{{Solicitud de adopción\n|Estado  = <!-- NO EDITAR concedido/declinado/pendiente  -->\n|Wiki	 =' + wikiname + '\n|Enlace  =' + url + '\n|Tipo	 =' + tipo + '\n|Usuario =' + user + '\n|Comentarios =' + comentarios + ' ' + kt.signature + '}}';
    // If url or header is blank, return alerts
    if (!url) {
        alert('¡Olvidaste poner el enlace a tu comunidad!');
        return;
    }
    if (!wikiname) {
        alert('¡Olvidaste poner el nombre de la comunidad!');
        return;
    }
console.log('Comprobaciones realizadas...');
 
    // Ajax URL
    var url = kt.server + '/api.php?action=edit&title=project_talk:Adopción&section=new' + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(kt.edittoken);
console.log('Obteniendo la URL: ',url);
 
    $.post(url, function (r) {
console.log('Ya debería estar hecho:',r);
    cancelformAdoption();
window.location = kt.server + '/wiki/' + 'project:Adopción#' + encodeURIComponent(wikiname);
    });
console.log('Enviando solicitud...');
}
/*</nowiki>*/