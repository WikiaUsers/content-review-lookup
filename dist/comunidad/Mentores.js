/*<nowiki>
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adapted to es.c by Bola
@ License: CC-BY-NC-SA
*/
 
 
// Variables for later on
// Keep these in an object for organization
var men = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage'),
    username: mw.config.get('wgUserName')
};
 
 
// Add buttons 
if(men.pagename === "Comunidad_Central:Mentores") {
    var buttonappend = '<a class="wikia-button" id="mentor-submit" onclick="openFormMentor()">Solicitar un mentor</a>';
    document.getElementById("lang-ES").innerHTML = buttonappend;
}
 
 
// This opens the form for the users to fill out
 
function openFormMentor() {
    $.showCustomModal('Solicitud de mentor', '<form class="WikiaForm" method="" name="" id="mentor"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Nombre de la comunidad</span><br><input id="wikiname" type="text" placeholder="Kirbipedia" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Enlace</span><br><span style="color:gray">http://</span><input id="wikiurl" type="text" placeholder="es.kirby" style="width:364px"/><span style="color:gray">.wikia.com</span><br><span style="font-weight:bold">Usuario solicitante:</span><span style="" id="user"> ' + men.username + '</span><br><span id="br2" /><span style="font-weight:bold">Razón</span><br><textarea name="" id="comment" style="height: 100px; width: 100%;" placeholder="Razones para solicitar un mentor"></textarea><br><span id="br2" /></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Cancelar",
            handler: function () {
                cancelformMentor();
            }
        }, {
            id: "submit",
            defaultButton: true,
            message: "Enviar",
            handler: function () {
                submitformMentor();
            }
        }]
    });
}
 
// Closes the form
 
function cancelformMentor() {
    $("#requestWindow").closeModal();
}
 
// Submits the form
 
function submitformMentor() {
console.log('Enviando...');
    var $form = $('#mentor'),
        wikiname = $form.find('#wikiname').val(),
        url = $form.find('#wikiurl').val(),
        user = $form.find('#user').val(),
        comentarios = $form.find('#comment').val(),
        page = '==' + wikiname + '==\n{{Solicitud de mentor\n|Estado  = <!-- NO EDITAR concedido/declinado/pendiente  -->\n|Mentor  = <!-- NO EDITAR -->\n|Fecha   = <!-- NO EDITAR -->\n|Wiki	 =' + wikiname + '\n|Enlace  =' + url + '\n|Solicitante =' + men.username + '\n|Razón =' + comentarios + ' ' + men.signature + '}}';
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
    var url = men.server + '/api.php?action=edit&title=project_talk:Mentores&section=new' + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(men.edittoken);
    alert('La solicitud ya está siendo enviada');
    console.log('Obteniendo la URL: ',url);
 
    $.post(url, function (r) {
console.log('Ya debería estar hecho:',r);
    cancelformMentor();
window.location = men.server + '/wiki/' + 'project talk:Mentores#' + encodeURIComponent(wikiname);
    });
console.log('Enviando solicitud...');
}
/*</nowiki>*/