/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// Actividad que se actualiza sola
AjaxRCRefreshText = 'Actividad automatizada';
AjaxRCRefreshHoverText = 'Con la casilla marcada esta página se actualizará automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity", "Especial:PáginasNuevas", "Especial:Seguimiento"];
importScriptPage('AjaxRC/code.js', 'dev');
// Botón para regresar arriba
importScriptPage('BackToTopButton/code.js', 'dev');
// Script para cuenta regresiva
importScriptPage('Countdown/code.js', 'dev');
// Etiqueta para usuarios inactivos
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');
// Referencias en globos
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

window.railWAM = {
    logPage:"Project:WAM Log"
};

// Mostrar IP de anónimos para usuarios con ciertos permisos
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat', 'helper', 'util', 'staff']
};

// Reproductor de YT (Agradecimiento a Steven Universe Wiki)
$(function () {
    $('.youtubeplayer').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            playertype = esc('' + $this.data('playertype')),
            id = esc($this.data('id') || ''),
            width = esc('' + $this.data('width')),
            height = esc('' + $this.data('height')),
            autoplay = esc('' + $this.data('autoplay')),
            args = esc('' + $this.data('args'));
 
        if ( id === '' ) {
            return;
        }
        $this.html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/' + playertype + '/' + id + '?feature=player_embedded&autoplay=' + autoplay + '&' + args + '" frameborder="0" allowfullscreen></iframe>');
    });
});

// Reproductor MP3 (Pedido de los usuarios)

$(function () {
    $('.mp3player').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            width = esc('' + $this.data('width')),
            mp3 = esc('' + $this.data('mp3'));
 
        $this.html('<audio style="width: ' + width + ';" controls><source src="' + mp3 + '" type="audio/mpeg"></audio>');
    });
});
 
/* nombreusuario */
 
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}


$(function() {
    "use strict";
    var newTitle = $('#title-meta').html()
      , edits = $('#user_masthead_since').text();
    if (!newTitle) {
        return;
    }
    $(
    '.firstHeading, #WikiaUserPagesHeader h1, #WikiaPageHeader h1').html(newTitle);
    $('.#user_masthead_head h2').html(newTitle + '<small id="user_masthead_since">' + edits + '</small>');
});