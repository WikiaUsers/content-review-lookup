/***************************************************
ATRIBUCIÓN:
 * @autor - pecoes
 * @modificación - Pintor Kagamine
 * @comunidad - Code Labo
 * @interwiki - codelabo
***************************************************
 * por favor, no uséis el código sin antes
 * contactar con Pintor Kagamine/Light of Cosmos para 
 * evitar posibles problemas con respecto al código.
***************************************************/
// SexyUserPage modificado
  // para usar CSS en prácticamente cualquier artículo
;(function (mw, $) {
 
    'use strict';
 
    var skin   = mw.config.get('skin'),
        action = mw.config.get('wgAction'),
        pageName;
 
    function getPageName () {
        var namespace  = mw.config.get('wgNamespaceNumber'),
            title      = mw.config.get('wgPageName'),
            name;
        if (-1 < [0,1,2,3,4,5,12,13,14,15].indexOf(namespace)) {
            name = decodeURIComponent(title.split(/\//).shift().replace(/[&%?=]+/g, ''));
            return encodeURIComponent(name.replace(/ /g, '_'));
        }
        return false;
    }
 
    if (!{oasis:1,wikia:1}[skin] || !{view:1,history:1,edit:1}[action]) return;
 
    if ((pageName = getPageName())) {
        $(document.head || 'head').append('<style>@import url("/index.php?title=' + pageName + '/code.css&action=raw&ctype=text/css");</style>');
        if (window.console && console.log) {
            console.log('intentando cargar CSS de "' + pageName + '/code.css"');
        }
    }
}(mediaWiki, jQuery));
// Lo mismo que el anterior, pero ahora con JavaScript
;(function (mw, $) {
 
    'use strict';
 
    var skin   = mw.config.get('skin'),
        action = mw.config.get('wgAction'),
        pageName;
 
    function getPageName () {
        var namespace  = mw.config.get('wgNamespaceNumber'),
            title      = mw.config.get('wgPageName'),
            name;
        if (-1 < [0,1,2,3,4,5,12,13,14,15].indexOf(namespace)) {
            name = decodeURIComponent(title.split(/\//).shift().replace(/[&%?=]+/g, ''));
            return encodeURIComponent(name.replace(/ /g, '_'));
        }
        return false;
    }
 
    if (!{oasis:1,wikia:1}[skin] || !{view:1,history:1,edit:1}[action]) return;
 
    if ((pageName = getPageName())) {
        $(document.head || 'head').append('<script>importScriptURI("/index.php?title=' + pageName + '/code.js&action=raw&ctype=text/javascript");</script>');
        if (window.console && console.log) {
            console.log('intentando cargar javascript de "' + pageName + '/code.js"');
        }
    }
}(mediaWiki, jQuery));
importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:Countdown/code.js'
    ]
});

/* Soundcloud test */

$('.sc-player').each(function() {
  var soundid     = $(this).data('sc-id');
  var soundwidth  = $(this).data('sc-width') || '100%';
  var soundheight = $(this).data('sc-height') || '450';
  if (soundid) {
    $(this).html('<iframe width="' + soundwidth + '" height="' + soundheight + '" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=http://api.soundcloud.com/tracks/' + soundid + ';auto_play=false;hide_related=false;show_comments=true;show_user=true;show_reposts=false;visual=true"></iframe>');
  } else {
    window.GlobalNotification.show('Este artículo contiene un reproductor de Soundcloud, pero no se ha especificado el archivo.', 'error');
  };
});