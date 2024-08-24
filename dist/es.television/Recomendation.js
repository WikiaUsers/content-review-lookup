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
    button: "Recomendar una página",
  'articulo': "Artículo:",
  'articulo-ejemplo': "Pikachu de Ash",
  'imagen': "Imagen:",
  'imagen-ejemplo': "Pikachu de Ash en ¡El sueño continúa!.png",
  'descripcion': "Descripción:",
  'descripcion-ejemplo': "Pikachu fue el Pokémon inicial de Ash en la serie. Lo ha acompañado en todas sus aventuras, volviéndose un par de amigos inseparables, a pesar de que en un principio Pikachu se comportaba mal con Ash e incluso lo desobedecía."
}
 
if(_tr.pagename === 'Wikivisión:Páginas_recomendadas') {
    var buttonappend = '<a class="wikia-button" id="recomendar" onclick="recomendar()" style="padding: 10px;">' + msg.get('button') + '</a>';
    document.getElementById("recomendar").innerHTML = buttonappend;
 
 
 
// This opens the form for the users to fill out
 
function recomendar() {
    $.showCustomModal('Nominación de páginas recomendadas', '<form class="WikiaForm" method="" name="" id="recomendarPagina"><fieldset><strong>' + msg.get('articulo') + '</strong> <input id="articulo" type="text" placeholder="' + msg.get('articulo-ejemplo') + '" style="width: 450px"/><br/><strong>' + msg.get('imagen') + '</strong> <span style="color: gray;">[[Archivo:</span><input id="imagen" type="text" placeholder="' + msg.get('imagen-ejemplo') + '" style="width: 450px"/><span style="color: gray;">]]</span><br/><strong>' + msg.get('descripcion') + '<strong><br/><textarea name="desc" id="descripcion" cols="50" rows="3" maxlength="250" placeholder="' + msg.get('descripcion-ejemplo') + '"></textarea></fieldset></form>', {
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
        page = '\n== ' + articulo + ' ==\n{{Plantilla:Wikivisión:Recomendación\n|estado= pendiente\n|nominador= ' + _tr.username + '\n|artículo= ' + articulo + '\n|imagen= ' + imagen + '\n|descripción= ' + descripcion + '\n}}';
 
    // Making sure the header isn't blank, and a language has been filled in
    if (!articulo) {
        alert("¡No has puesto el nombre del artículo!");
        return;
    }
  if (!imagen) {
    alert("¡No has colocado la imagen!");
    return;
  }
  if (!descripcion) {
    alert("¡No has colocado la descripción!");
    return;
  }
console.log('Todo listo...');
 
    // Ajax URL
    var url = _tr.server + '/api.php?action=edit&title=Wikivisión_discusión:Páginas_recomendadas&appendtext=' + encodeURIComponent(page) + '&&token=' + encodeURIComponent(_tr.edittoken);
console.log('Dirección obtenida: ',url);
 
    $.post(url, function (r) {
console.log('Tu nominación ha sido enviada:',r);
	cancelar();
        window.location.reload();
    });
console.log('Enviando nominación...');
}
*/