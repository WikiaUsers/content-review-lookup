/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

//Reproductor simple de audio HTML5 para MediaWiki
//@author ElNobDeTfm
//El código debe ser colocado en la página MediaWiki:Common.js para que funcione en todos los skins (pieles), y también puede ser colocado en Vector.js, Monobook.js, etcétera, para que funcione solamente en dicho skin.
//Modo de uso:
//<div class="audio" data-options="opciones" data-src="source" data-type="mime type">Texto alternativo para navegadores que no soporten audio HTML5</div>
//Ejemplo: <div class="audio" data-options="controls" data-src="http://www.w3schools.com/HTML/horse.ogg" data-type="audio/ogg">Tu navegador no soporta audio HTML5.</div>
//Consultar http://www.w3schools.com/HTML/html5_audio.asp para más información sobre el audio HTML5.
 
$(function () {
    $('.audio').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            options = esc('' + $this.data('options')),
            src = esc('' + $this.data('src')),
            type = esc('' + $this.data('type'));
        $this.html('<audio ' + options + '><source src="' + src + '" type="' + type + '"></audio>');
    });
});

// **************************************************
// NOMBRE DEL USUARIO
// **************************************************
// Inserta el nombre del usuario donde esté "<span class="insertusername"></span>"
// o la [[Plantilla:Nombreusuario]]
// Traída desde Creepypasta Wiki corregida
// para que funcione correctamente usando ''class='' en vez de ''id=''.
// **************************************************
 
$(function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
});
 
// *************************************************
// Reescribir título, usada por Plantilla:Titulo (De MLP Wiki)
// *************************************************
 
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});
 
// Refrescar automáticamente WikiActivity y CambiosRecientes
window.AjaxRCRefreshText = 'Act. automát.';
window.AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
window.ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];

// RailWAM
window.railWAM = {
    logPage:"Project:WAM Log"
};