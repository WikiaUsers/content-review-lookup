/*
var _tr = {
    edittoken: mw.user.tokens.values.editToken,
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
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
    button: "Recomendar una p�gina",
  'articulo': "Art�culo:",
  'articulo-ejemplo': "Pikachu de Ash",
  'imagen': "Imagen:",
  'imagen-ejemplo': "Pikachu de Ash en �El sue�o contin�a!.png",
  'descripcion': "Descripci�n:",
  'descripcion-ejemplo': "Pikachu fue el Pok�mon inicial de Ash en la serie. Lo ha acompa�ado en todas sus aventuras, volvi�ndose un par de amigos inseparables, a pesar de que en un principio Pikachu se comportaba mal con Ash e incluso lo desobedec�a."
}
 
if(_tr.pagename === 'Wikivisi�n:P�ginas_recomendadas') {
    var buttonappend = '<a class="wikia-button" id="recomendar" onclick="recomendar()" style="padding: 10px;">' + msg.get('button') + '</a>';
    document.getElementById("recomendar").innerHTML = buttonappend;
 
 
 
// This opens the form for the users to fill out
 
function recomendar() {
    $.showCustomModal('Nominaci�n de p�ginas recomendadas', '<form class="WikiaForm" method="" name="" id="recomendarPagina"><fieldset><strong>' + msg.get('articulo') + '</strong> <input id="articulo" type="text" placeholder="' + msg.get('articulo-ejemplo') + '" style="width: 450px"/><br/><strong>' + msg.get('imagen') + '</strong> <span style="color: gray;">[[Archivo:</span><input id="imagen" type="text" placeholder="' + msg.get('imagen-ejemplo') + '" style="width: 450px"/><span style="color: gray;">]]</span><br/><strong>' + msg.get('descripcion') + '<strong><br/><textarea name="desc" id="descripcion" cols="50" rows="3" maxlength="250" placeholder="' + msg.get('descripcion-ejemplo') + '"></textarea></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
    id: "cancel",
    message: "Cancelar",
    handler: function () {
        cancelar();
    }
        }, {
    id: "submit",
    defaultButton: true,
    message: "Recomendar",
    handler: function () {
        publicar();
    }
        }]
    });
    }
}
 
// Closes the form
 
function cancelar() {
    $("#requestWindow").closeModal();
}
 
// Submits the form
 
function publicar() {
console.log('Guardando...');
    var $form = $('#recomendarPagina'),
        articulo = $form.find('#articulo').val(),
        imagen = $form.find('#imagen').val(),
        descripcion = $form.find('#descripcion').val(),
        page = '\n== ' + articulo + ' ==\n{{Plantilla:Wikivisi�n:Recomendaci�n\n|estado= pendiente\n|nominador= ' + _tr.username + '\n|art�culo= ' + articulo + '\n|imagen= ' + imagen + '\n|descripci�n= ' + descripcion + '\n}}';
 
    // Making sure the header isn't blank, and a language has been filled in
    if (!articulo) {
        alert("�No has puesto el nombre del art�culo!");
        return;
    }
  if (!imagen) {
    alert("�No has colocado la imagen!");
    return;
  }
  if (!descripcion) {
    alert("�No has colocado la descripci�n!");
    return;
  }
console.log('Todo listo...');
 
    // Ajax URL
    var url = _tr.server + '/api.php?action=edit&title=Wikivisi�n_discusi�n:P�ginas_recomendadas&appendtext=' + encodeURIComponent(page) + '&&token=' + encodeURIComponent(_tr.edittoken);
console.log('Direcci�n obtenida: ',url);
 
    $.post(url, function (r) {
console.log('Tu nominaci�n ha sido enviada:',r);
	cancelar();
        window.location.reload();
    });
console.log('Enviando nominaci�n...');
}
*/