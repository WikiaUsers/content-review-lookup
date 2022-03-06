/*<nowiki>
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adapted to es.c by Bola
@ License: CC-BY-NC-SA
*/

// Variables for later on
// Keep these in an object for organization
var des = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage'),
    username: mw.config.get('wgUserName')
};
 
 
// Add buttons 
if(des.pagename === "Comunidad_Central:Diseños_y_portadas") {
    var buttonappend = '<a class="wikia-button" id="design-submit" onclick="openFormDesign()">Solicitar un diseño o portada</a>';
    document.getElementById("lang-ES").innerHTML = buttonappend;
}
 
 
// This opens the form for the users to fill out
 
function openFormDesign() {
    $.showCustomModal('Solicitud de diseño o portada', '<div class="wikiaThrobber" style="display:none"></div><form class="WikiaForm" method="" name="" id="design"><ul><li><strong>Enlace hacia la wikia</strong><span style="color:gray">http://</span><input id="wikiurl" type="text" placeholder="es.kirby" style="width:200px"/> <span style="color:gray">.wikia.com</span></li><li><strong>Nombre de la comunidad</strong><input id="wikiname" type="text" placeholder="Kirbypedia" style="width:350px"/></li><li><strong>Usuario solicitante</strong><span style="" id="user">' + des.username + '</span></li><li><strong>¿Qué quieres cambiar?</strong><input id="tema" type="text" placeholder="Fondo, logo, portada..." style="width:400px"/></li><li><strong>Observaciones</strong><textarea name="" id="comment" style="height: 100px; width: 100%;" placeholder="Puedes dar aquí las indicaciones sobre cómo lo quieres hacer."></textarea></li></ul></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Cancelar",
            handler: function () {
                cancelformDesign();
            }
        }, {
            id: "submit",
            defaultButton: true,
            message: "Enviar",
            handler: function () {
                submitformDesign();
            }
        }, ]
    });
}
 
// Closes the form
 
function cancelformDesign() {
    $("#requestWindow").closeModal();
}
 
// Submits the form
 
function submitformDesign() {
    console.log('Enviando...');
    var $form = $('#design'),
        wikiname = $form.find('#wikiname').val(),
        url = $form.find('#wikiurl').val(),
        user = $form.find('#user').val(),
        tema = $form.find('#tema').val(),
        comentarios = $form.find('#comment').val(),
        page = '==' + wikiname + '==\n{{Solicitud de diseño\n|Estado  = <!-- NO EDITAR aceptada/rechazada/pendiente/revisando  -->\n|Diseñador  = <!-- NO EDITAR -->\n|Tema   = ' + tema + '\n|Wiki	 =' + wikiname + '\n|Enlace  =' + url + '\n|Solicitante =' + des.username + '\n|Observaciones =' + comentarios + ' ' + des.signature + '}}';
    
    // If url or header is blank, return alerts
    if (!url) {
        alert('¡Olvidaste poner el enlace a tu comunidad!');
        return;
    }
    
    if($('#wikiurl').val().indexOf('.wikia.com') > -1) {
        alert('Debes agregar solamente el subdominio de tu wikia. Ejemplo: es.kirby en vez de http://es.kirby.wikia.com');
        return;
    }
    
    if (!wikiname) {
        alert('¡Olvidaste poner el nombre de la comunidad!');
        return;
    }
    if (!tema) {
        alert('¡Olvidaste poner qué es lo que quieres que diseñen! (Fondo, logo, favicon, portada, etc)');
        return;
    }

    $('#requestWindow .wikiaThrobber').show();
    console.log('Comprobaciones realizadas...');
 
    // Ajax URL
    var url = des.server + '/api.php?action=edit&title=project_talk:Diseños_y_portadas&section=new' + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(des.edittoken);
    console.log('Obteniendo la URL: ',url);
 
    $.post(url, function (r) {
        console.log('Ya debería estar hecho:',r);
        cancelformDesign();

        window.location = des.server + '/wiki/' + 'project talk:Diseños_y_portadas#' + encodeURIComponent(wikiname);
    });

    console.log('Enviando solicitud...');
}
/*</nowiki>*/