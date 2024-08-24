$('<div class="WikiActivity-1"><span class="WikiActivity-1-text">Hola & Bienvenido, todos los códigos que puedes encontrar aqui puedes usarlos, se te agradeceria dar créditos.</span></div>').insertBefore('#wikiactivity-main');

/*
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adapted to es.c by Bola
@ License: CC-BY-NC-SA
*/
 
 
// Variables for later on
// Keep these in an object for organization
var person = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage'),
    username: mw.config.get('wgUserName'),
};
var date = {
    hours: new Date().getUTCHours(),
    minutes: new Date().getUTCMinutes(),
    day: new Date().getUTCDate(),
    month: new Date().getUTCMonth(),
    year: new Date().getFullYear(),
};
var month = new Array(12);
month[0] = "Enero";
month[1] = "Febrero";
month[2] = "Marzo";
month[3] = "Abril";
month[4] = "Mayo";
month[5] = "Junio";
month[6] = "Julio";
month[7] = "Agosto";
month[8] = "Setiembre";
month[9] = "Octubre";
month[10] = "Noviembre";
month[11] = "Deciembre";
var $month = month[date.month];
var $date = date.day + ' de ' + $month + ' del ' + date.year + ' a las ' + date.hours + ':' + date.minutes + ' (UTC)';
 
 
// Add buttons 
if(person.pagename === "Inicio:Solicitud") {
    var buttonappend = '<a class="wikia-button" id="mentor-submit" onclick="openFormSolicitud()">Solicitar</a>';
    document.getElementById("Solicitud").innerHTML = buttonappend;
}
 
 
// This opens the form for the users to fill out
 
function openFormSolicitud() {
    $.showCustomModal('Solicitud de portabilización', '<form class="WikiaForm" method="" name="" id="vanguard"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Nombre de la comunidad</span><br><input id="wikiname" type="text" placeholder="Kirbipedia" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Enlace</span><br><span style="color:gray">http://</span><input id="wikiurl" type="text" placeholder="es.kirby" style="width:364px"/><span style="color:gray">.wikia.com</span><br><span style="font-weight:bold">Usuario solicitante:</span><span style="" id="user"> ' + person.username + '</span><br><span id="br2" /><span style="font-weight:bold">Razón</span><br><textarea name="" id="comment" style="height: 100px; width: 100%;" placeholder="Razones para solicitar un mentor"></textarea><br><span id="br2" /></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Cancelar",
            handler: function () {
                cancelform();
            }
        }, {
            id: "submit",
            defaultButton: true,
            message: "Enviar",
            handler: function () {
                submitform();
            }
        }]
    });
}
 
// Closes the form
 
function cancelform() {
    $("#requestWindow").closeModal();
}
 
// Submits the form
 
function submitform() {
console.log('Enviando...');
    var $form = $('#vanguard'),
        wikiname = $form.find('#wikiname').val(),
        url = $form.find('#wikiurl').val(),
        user = $form.find('#user').val(),
        comentarios = $form.find('#comment').val(),
        page = '==' + wikiname + '==\n{{Solicitud vanguard\n|Estado  = <!-- NO EDITAR concedido/declinado/pendiente  -->\n|Vanguard  = <!-- NO EDITAR -->\n|Fecha  = ' + '~~'+ '~~' + '~' + '\n|Wiki    =' + wikiname + '\n|Enlace  =' + url + '\n|Solicitante =' + person.username + '\n|Razón =' + comentarios + ' ' + person.signature + '}}';
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
    var url = person.server + '/api.php?action=edit&title=proyect_talk:Solicitud&section=new' + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(person.edittoken);
    alert('La solicitud ya está siendo enviada');
    console.log('Obteniendo la URL: ',url);
 
    $.post(url, function (r) {
console.log('Ya debería estar hecho:',r);
    cancelform();
window.location = person.server + '/wiki/' + 'proyect_talk:Solicitud#' + encodeURIComponent(wikiname);
    });
console.log('Enviando solicitud...');
}

if (typeof(mwCustomEditButtons) != 'undefined') {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile" : "https://vignette.wikia.nocookie.net/eswikia/images/1/18/Propose-delete.png?1",
        "speedTip" : "Proponer el artículo para ser borrado",
        "tagOpen" : "{{Borrar|",
        "tagClose" : "}}",
        "sampleText" : "Motivo",
    };
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile" : "https://vignette.wikia.nocookie.net/eswikia/images/5/52/Alert-icon.png?1",
        "speedTip" : "Aviso de artículo/archivo/blog inadecuado",
        "tagOpen" : "{{Wikiacentral\n",
        "tagClose" : "\n}}",
        "sampleText" : "|Nombre del artículo/archivo/blog que será borrado",
    };
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/eswikia/images/6/6a/Insert-icon.png?1",
        "speedTip": "Insertar Plantilla Wiki",
        "tagOpen": "{{Wiki\r| wiki = ",
        "tagClose": "\r| logo = \r| descripción = \r| fundado = \r| fundador = \r| nombre_solicitado = \r| estado = \r}}",
        "sampleText": "",
    };
}