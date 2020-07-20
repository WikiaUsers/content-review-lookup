AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
 if (typeof(mwCustomEditButtons) != 'undefined') {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
     "speedTip": "Código fuente",
     "tagOpen": "<code><nowiki>",
     "tagClose": "</"+ "nowiki></code>",
     "sampleText": "Código fuente"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
     "speedTip": "Plantillas",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Plantilla"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
     "speedTip": "Enlace a usuario",
     "tagOpen": "[[user:",
     "tagClose": "|]]",
     "sampleText": "Usuario"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/6/64/Bot%C3%B3n_categor%C3%ADa.png",
     "speedTip": "Categoría",
     "tagOpen": "[[Category:",
     "tagClose": "|{" + "{PAGENAME}}]]",
     "sampleText": "Nombre categoría"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/7/7a/Bot%C3%B3n_tablas.png",
     "speedTip": "Insertar tabla",
     "tagOpen": '{| {' + '{tablabonita|alineacion=col1izq col2cen col3der|}}\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "!| encabezado 1\n!| encabezado 2\n!| encabezado 3\n|-\n|| fila 1, columna 1\n|| fila 1, columna 2\n|| fila 1, columna 3\n|-\n|| fila 2, columna 1\n|| fila 2, columna 2\n|| fila 2, columna 3"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/70/Button_fusion.png",
     "speedTip": "Pedir que se fusione el artículo a otro",
     "tagOpen": "{{fusionar|",
     "tagClose": "}}",
     "sampleText": "Nombre del artículo con el que se debe fusionar"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/62/Button_desambig.png",
     "speedTip": "Página de desambiguación",
     "tagOpen": "{{desambiguacion}}",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/e/ec/Button_aviso.png",
     "speedTip": "Advertir de vandalismo a un usuario",
     "tagOpen": "{{vandalismo|",
     "tagClose": "}}",
     "sampleText": "Motivo de aviso"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100417162808/es.gta/images/e/ef/Borrar.png",
     "speedTip": "Proponer el artículo para ser borrado",
     "tagOpen": "{{borrar|",
     "tagClose": "}}",
     "sampleText": "Motivo por el que se propone para borrar"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/f3/Button_broom2.png",
     "speedTip": "Pedir que se arregle el artículo",
     "tagOpen": "{{arreglar|",
     "tagClose": "}}",
     "sampleText": "Motivo por el que se pide el arreglo"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100417162634/es.gta/images/d/d1/Sin_foto.png",
     "speedTip": "Advertir de que el artículo necesita imágenes",
     "tagOpen": "{{sinfoto}}",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100417162729/es.gta/images/c/c2/Enobras.png",
     "speedTip": "Advertir de que se está trabajando en el artículo",
     "tagOpen": "{{enobras|",
     "tagClose": "}}",
     "sampleText": "Nick del usuario"};
 }
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}
/***************************************************
ATRIBUCIÓN:
 * @autor - pecoes
 * @modificación - Pintor Kagamine
 * @comunidad - Poképolis
 * @interwiki - es.pokepolis
***************************************************
 * por favor, no uséis el código sin antes
 * contactar con Pintor Kagamine para evitar
 * posibles problemas con respecto al código.
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
        'u:dev:AjaxRC/code.js',
        'u:dev:Countdown/code.js'
    ]
});

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:LastEdited/code.js',
        // ...
    ]
});

window.lastEdited = {
    avatar: true,
    avatarsize: 15,
    size: true,
    diff: true,
    comment: false,
    time: 'timestamp',
    timezone: 'UTC',
    lang: 'es',
    position: {
        element: document.getElementById('WikiaArticle'),
        method: 'prepend'
    },
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};