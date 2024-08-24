 
/* Enlaces en el menú de usuario */
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario_Blog:'+ encodeURIComponent(wgUserName) +'" title="Mis entradas de blog">Entradas de Blog</a></li>');$('.WikiaHeader nav ul li:first-child');}addOnloadHook(subeEnlacesUtiles);
 
// Etiqueta para usuarios inactivos por más de 3 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');

// Plantilla:MPC
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