// para el css de los portales
;(function (mw, $) {
 
    'use strict';
 
    var skin   = mw.config.get('skin'),
        action = mw.config.get('wgAction'),
        pageName;
 
    function getTitle () {
        var namespace  = mw.config.get('wgNamespaceNumber'),
            title      = mw.config.get('wgTitle'),
            name;
        if (-1 < [116,117].indexOf(namespace)) {
            name = decodeURIComponent(title.split(/\//).shift().replace(/[&%?=]+/g, ''));
            return encodeURIComponent(name.replace(/ /g, '_'));
        }
        return false;
    }
 
    if (!{oasis:1,wikia:1}[skin] || !{view:1,history:1,edit:1}[action]) return;
 
    if ((pageName = getTitle())) {
        $(document.head || 'head').append('<style>@import url("http://es.television.wikia.com/index.php?title=Portal:' + pageName + '/code.css&ctype=text/css&action=raw");</style>');
        if (window.console && console.log) {
            console.log('trying to load stylesheet "Portal:' + pageName + '/code.css"');
        }
    }
}(mediaWiki, jQuery));
// ahora vamos con el js
;(function (mw, $) {
 
    'use strict';
 
    var skin   = mw.config.get('skin'),
        action = mw.config.get('wgAction'),
        pageName;
 
    function getTitle () {
        var namespace  = mw.config.get('wgNamespaceNumber'),
            title      = mw.config.get('wgTitle'),
            name;
        if (-1 < [116,117].indexOf(namespace)) {
            name = decodeURIComponent(title.split(/\//).shift().replace(/[&%?=]+/g, ''));
            return encodeURIComponent(name.replace(/ /g, '_'));
        }
        return false;
    }
 
    if (!{oasis:1,wikia:1}[skin] || !{view:1,history:1,edit:1}[action]) return;
 
    if ((pageName = getTitle())) {
        $(document.head || 'head').append('<script>importScriptURI("http://es.television.wikia.com/index.php?title=Portal:' + pageName + '/code.js&ctype=text/javascript&action=raw");</script>');
        if (window.console && console.log) {
            console.log('trying to load stylesheet "Portal:' + pageName + '/code.js"');
        }
    }
}(mediaWiki, jQuery));