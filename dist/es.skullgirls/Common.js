/*Códigos de Wikia Developers*/
/**Auto-refrescar**/
window.ajaxPages = ["Especial:WikiActivity", "Especial:WikiActivity/watchlist", "Especial:WikiActivity/activity"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/skullgirls-es/es/images/f/fd/GIF_Ajax-loader_(Skullgirls).gif';
window.ajaxRefresh = 1000;
window.AjaxRCRefreshText = 'Auto-refrescar';
window.AjaxRCRefreshHoverText = 'Actualiza automáticamente la página';
importScriptPage('AjaxRC/code.js', 'dev');
/**Modificado por última vez**/
/**Ventanas emergentes de referencias**/
/**Botón para editar Bienvenida del Muro**/
/**Botón de edición vacía**/
/**Código de cuenta hacia atrás**/
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:ReferencePopups/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:NullEditButton/code.js'
/*Códigos dentro de Skullgirls Wiki*/
/**Código de nieve**/
        /*'MediaWiki:Nieve.js'*/
    ]
});
/**Hora UTC del Wiki**/
window.DisplayClockJS = '%2I:%2M:%2S %p|%2d de %{Ene;Feb;Mar;Abr;May;Jun;Jul;Ago;Sep;Oct;Nov;Dic}m de %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		'u:dev:DisplayClock/code.js'
	]
});
/*Botones de flechas "Scroll", código original de Fire Emblem Wiki (Inglés)*/
$('.left').click(function () {
    scroll = $('#scroll').scrollLeft();
    $('#scroll').animate({'scrollLeft': scroll-590},800);
});
$('.right').click(function () {
    scroll = $('#scroll').scrollLeft();
    $('#scroll').animate({'scrollLeft': scroll+590},800);
});
/*Los siguientes tres códigos son originados de la Wiki My Little Pony en inglés*/
/*Usado para la plantilla NOMBREUSUARIO */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});


/*Soporte para la Plantilla:Emoticon, código originado de MLP Wiki en Inglés*/
if ($('.emote-template').length || $('#WikiaArticleComments').length) {
    $(function() {
        function emotify($this) {
            var emote = $this.text();
            var url = emotes.match(
              new RegExp('\\n\\*\\s*(.*)\\n(?:\\*\\*.*\\n)*(?=.*' + 
              emote.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1') +
              ')', 'i'));
            if (url) {
                url = url[1];
                $this.html($('<img/>', {'src':url, 'alt':emote, 'width':19, 'height':19}));
            }
        }
 
        var emotes = '';
        $.getJSON('/api.php?action=query&prop=revisions&titles=MediaWiki:Emoticons' + 
          '&rvprop=content&format=json', function(data) {
            emotes = data.query.pages['622'].revisions[0]['*'];
 
            $('.emote-template').each(function() {
                emotify($(this));
            });
        });
 
        $('#WikiaArticleFooter').on('DOMNodeInserted', function() {
            if ($('.emote-template').length === $('.emote-template img').length) {
                return;
            }
 
            $('#WikiaArticleFooter .emote-template').each(function() {
                if (!($(this).children('img').length)) {
                    emotify($(this));
                }
            });
        });
    });
}