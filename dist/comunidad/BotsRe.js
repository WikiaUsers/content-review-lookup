/*<nowiki>
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adapted to es.c by Bola
@ License: CC-BY-NC-SA
*/
 
 
// Variables for later on
// Keep these in an object for organization
var bots = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage'),
    username: mw.config.get('wgUserName')
};
 
 
// Add buttons 
if(bots.pagename === "Comunidad_Central:Rango_de_bot") {
    var buttonappend = '<a class="wikia-button" id="bots-submit" onclick="openFormBots()">Solicitar rango de bot</a>';
    document.getElementById("lang-ES").innerHTML = buttonappend;
    window.dropdown = '<select name="programa" id="programa" value="AWB">';
    dropdown += '<option value="" selected disabled>Programa</option><option value="Pywikipediabot">Pywikipediabot</option><option value="AWB">AWB</option><option value="Otro">Otro (especificar en comentarios)</option></select>';
}
 
 
// This opens the form for the users to fill out
 
function openFormBots() {
    $.showCustomModal('Solicitud de rango de bot', '<form class="WikiaForm" method="" name="" id="bots"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Nombre de la comunidad</span><br><input id="wikiname" type="text" placeholder="Kirbipedia" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Enlace</span><br><span style="color:gray">http://</span><input id="wikiurl" type="text" placeholder="es.kirby" style="width:364px"/><span style="color:gray">.wikia.com</span><br><span id="br2" /><span style="font-weight:bold">Cuenta que recibirá el rango de bot:</span><br><input id="cuentabot" type="text" placeholder="Usuario-bot" style="width:400px"/><br><span style="font-weight:bold">Hilo de aprobación</span><br><input id="hiloapro" type="text" placeholder="Enlace hacia la votación. Ej: http://wiki.com/wiki/Special:Forum" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Programa con el que operará el bot:</span> (' + window.dropdown + ')<br><span id="br2" /><span style="font-weight:bold">Duración del rango de bot:</span><br><input id="dura" type="text" placeholder="Indica el periodo durante el cual operará el bot" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Comentarios</span><br><textarea name="" id="comment" style="height: 100px; width: 100%;" placeholder="Comentarios que quieres hacer acerca de la solicitud o el programa que se usará"></textarea><br><span id="br2" /></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Cancelar",
            handler: function () {
                cancelformBots();
            }
        }, {
            id: "submit",
            defaultButton: true,
            message: "Enviar",
            handler: function () {
                submitformBots();
            }
        }]
    });
}
 
// Closes the form
 
function cancelformBots() {
    $("#requestWindow").closeModal();
}
 
// Submits the form
 
function submitformBots() {
console.log('Enviando...');
    var $form = $('#bots'),
        wikiname = $form.find('#wikiname').val(),
        url = $form.find('#wikiurl').val(),
        cuentabot = $form.find('#cuentabot').val(),
        hiloapro = $form.find('#hiloapro').val(),
        comentarios = $form.find('#comment').val(),
        dura = $form.find('#dura').val(),
        programa = $form.find('#programa option:selected').val(),
        cuentabot = $form.find('#cuentabot').val(),
        page = '==' + wikiname + '==\n{{Solicitud de bot\n|Estado  = <!-- NO EDITAR concedido/declinado/pendiente  -->\n|Nombre-wiki	 =' + wikiname + '\n|Enlace  =' + url + '\n|Cuenta-bot	 = ' + cuentabot + '\n|Hiloaprobación = ' + hiloapro + '\n|Programa = ' + programa + '\n|Duración = ' + dura + '\n|Comentarios = ' + comentarios + ' ' + bots.signature + '}}';
    // If url or header is blank, return alerts
    if (!url) {
        alert('¡Olvidaste poner el enlace a tu comunidad!');
        return;
    }
    if (!wikiname) {
        alert('¡Olvidaste poner el nombre de la comunidad!');
        return;
    }
    if (!cuentabot) {
        alert('¡Olvidaste poner el nombre de usuario de la cuenta que recibirá el rango de bot!');
        return;
    }
    if (!dura) {
        alert('¡Olvidaste poner la duración!');
        return;
    }
    if (!programa) {
        alert('¡No has indicado el programa que usarás!');
        return;
    }
console.log('Comprobaciones realizadas...');
 
    // Ajax URL
    var url = bots.server + '/api.php?action=edit&title=project_talk:Rango_de_bot&section=new' + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(bots.edittoken);
    alert('La solicitud ya está siendo enviada');
    console.log('Obteniendo la URL: ',url);
 
    $.post(url, function (r) {
console.log('Ya debería estar hecho:',r);
    cancelformBots();
window.location = bots.server + '/wiki/' + 'project talk:Rango_de_bot#' + encodeURIComponent(wikiname);
    });
console.log('Enviando solicitud...');
}
/*</nowiki>*/