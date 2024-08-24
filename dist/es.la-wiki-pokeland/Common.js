/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
 

// Nombre de usuario
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "InsertUserName");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
} 
addOnloadHook(UserNameReplace);
// AjaxRC
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
// Botones de edición adicionales 
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
     "speedTip": "Redirijir Articulo",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insertar texto"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/f/f0/BotonDegradado.png",
     "speedTip": "Insertar Degradado en Tablas",
     "tagOpen": " background:-moz-linear-gradient(top, COLOR ARRIBA 0%, COLOR ABAJO 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,COLOR ARRIBA), color-stop(100%,COLOR ABAJO)); ",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/0/0d/Box-shadow.png",
     "speedTip": "Insertar Sombra en Tablas",
     "tagOpen": "-moz-box-shadow:0.1em 0.1em 1em COLOR DE SOMBRA; -webkit-box-shadow:0.1em 0.1em 1em COLOR DE SOMBRA;",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/d/d3/En_construccion.png",
     "speedTip": "Advertir de que este articulo esta en contrucción",
     "tagOpen": "{{En construcción|",
     "tagClose": "}}",
     "sampleText": "Nick del usuario"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
     "speedTip": "Texto Tachado",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Texto a tachar"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fd/Button_underline.png",
     "speedTip": "Subrayar",
     "tagOpen": "<u>",
     "tagClose": "</u>",
     "sampleText": "Texto a Subrayar"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020113954/central/images/5/56/Button_big.png",
     "speedTip": "texto Grande",
     "tagOpen": "<big>",
     "tagClose": "</big>",
     "sampleText": "Texto Grande"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/8/89/Letra_Peque%C3%B1a.png",
     "speedTip": "Texto Pequeño",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Texto Pequeño"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
     "speedTip": "Centrar",
     "tagOpen": "<center>",
     "tagClose": "</center>",
     "sampleText": "Centrar Texto"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20070329065453/central/images/3/3b/Button_template_alt.png",
     "speedTip": "Plantilla",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Nombre de la Plantilla"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20081020123837/central/images/c/ce/Button_no_include.png",
     "speedTip": "No Incluir",
     "tagOpen": "<noinclude>",
     "tagClose": "</noinclude>",
     "sampleText": "No Incluir"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
     "speedTip": "Espacio en Fuente",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/3/31/Mensaje_oculto.png",
     "speedTip": "Insertar Comentario Oculto",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Comentario"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
     "speedTip": "Insertar tabla",
     "tagOpen": '{| class="wikitable"\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"}; 
 
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
        'u:dev:FloatingToc/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:Countdown/code.js'
    ]
});