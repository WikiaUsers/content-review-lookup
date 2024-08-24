/* <source lang="javascript">
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages) from w:c:wlb
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adapted to es.television by Pintor Kagamine
@ License: CC-BY-NC-SA
*/
var _tr = {
    edittoken: mw.user.tokens.values.editToken,
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    username: mw.config.get('wgUserName')
};
 
var $ = this.jQuery,
    mw = this.mediaWiki,
    i,
    msg = messages = {
        get: function(name) {
    return (messages['ES'])[name];
        },
    };
 
messages['ES'] = {
    button: "Nominar un art�culo",
    "nombre": "Formulario de nominaci�n",
    "articulo": "Nombre del art�culo:",
    "articulo-ejemplo": "Ben Tennyson",
    "imagen": "Imagen:",
    "imagen-ejemplo": "Ben con el Omnitrix en Y fueron 10.png",
    "cita": "Cita:",
    "select-tipo": "Tipo de contenido:",
    "cita-ejemplo": "�Es hora de ser h�roe!",
    "descripcion": "Descripci�n del art�culo:",
    "descripcion-ejemplo": "Escribe la descripci�n del art�culo que se usar� en caso de que la nominaci�n sea concedida.",
}
 
if(_tr.pagename === 'Wikivisi�n:Art�culos_destacados') {
    var buttonappend = '<a class="wikia-button" id="nominar" onclick="openFormTranslate()" style="padding: 10px;">' + msg.get('button') + '</a>';
    document.getElementById("nominacion").innerHTML = buttonappend;
 
 
 
// This opens the form for the users to fill out
 
function openFormTranslate() {
    $.showCustomModal(msg.get('nombre'), '<form class="WikiaForm" method="" name="" id="translationForm"><fieldset><strong>' + msg.get('articulo') + '</strong> <input id="articulo" type="text" placeholder="' + msg.get('articulo-ejemplo') + '" style="width: 450px"/><br/><strong>' + msg.get('imagen') + '</strong> <span style="color: gray;">[[Archivo:</span><input id="imagen" type="text" placeholder="' + msg.get('imagen-ejemplo') + '" style="width: 450px"/><span style="color: gray;">]]</span><br/><table id="tipo" border="0"><tr><td class="mw-label">' + msg.get('select-tipo') + '</td><td class="mw-input"><select name="tipo" id="tipo" value="Tipo"><option value="" selected disabled>Tipo</option><option value="art�culo">Art�culo</option><option value="canci�n">Canci�n</option><option value="imagen">Imagen</option><option value="usuario">Usuario</option></select></td></tr></table><br/><strong>' + msg.get('cita') + '</strong> <input id="cita" type="text" placeholder="' + msg.get('cita-ejemplo') + '" style="width: 450px"/><br/><strong><br><table border="0"><tr><td class="mw-label">' + msg.get('descripcion') + '</td><td class="mw-input"><textarea name="items" id="descripcion" cols="50" rows="3" placeholder="' + msg.get('descripcion-ejemplo') + '"></textarea></td></tr></table></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
    id: "cancel",
    message: "Cerrar",
    handler: function () {
        cancelformTranslate();
    }
        }, {
    id: "Nominar",
    defaultButton: true,
    message: "Submit",
    handler: function () {
        submitformTranslate();
    }
        }]
    });
    }
}
 
// Closes the form
 
function cancelformTranslate() {
    $("#requestWindow").closeModal();
}
 
// Submits the form
 
function submitformTranslate() {
console.log('Guardando...');
    var $form = $('#translationForm'),
        articulo = $form.find('#articulo').val(),
        imagen = $form.find('#imagen').val(),
        tipo = $form.find('#tipo option:selected').val(),
        cita = $form.find('#cita').val(),
        descripcion = $form.find('#descripcion').val(),
        firma = $form.find('#firma').val(),
        page = '\n== ' + articulo + ' ==\n{{Plantilla:Wikivisi�n:Nominaci�n\n|estado= pendiente\n|tipo= ' + tipo + '\n|cita= '+ cita + '\n|nominador= ' + _tr.username + '\n|art�culo= ' + articulo + '\n|imagen= ' + imagen + '\n|descripci�n= ' + descripcion + '\n}}';
 
    // Making sure the header isn't blank, and a language has been filled in
    if (!articulo) {
        alert("�No has puesto el nombre del art�culo!");
        return;
    }
console.log('Nominaci�n revisada...');
 
    // Ajax URL
    var url = _tr.server + '/api.php?action=edit&title=Wikivisi�n_discusi�n:Art�culos_destacados&appendtext=' + encodeURIComponent(page) + '&&token=' + encodeURIComponent(_tr.edittoken);
console.log('Direcci�n obtenida: ',url);
 
    $.post(url, function (r) {
console.log('Tu nominaci�n ha sido publicada:',r);
	cancelformTranslate();
        window.location.reload();
    });
console.log('Enviando nominaci�n...');
}
/* </source> */