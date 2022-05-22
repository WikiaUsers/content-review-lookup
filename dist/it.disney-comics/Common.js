/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */

/* Template espandibile */
// ShowHide - Tabelle espandibili (da http://dev.wikia.com/wiki/ShowHide )
importScriptPage('ShowHide/code.js', 'dev');
// END of ShowHide

// Import Copyright //
importScript('MediaWiki:Common.js/copyright.js');

/* Configuration for LinkPreview (from Dev Wiki) */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

//default/missing images -> wiki logo
window.pPreview.noimage = 'https://static.wikia.nocookie.net/paperpedia/images/e/e6/Site-logo.png/revision/latest?cb=20210517130749&format=original&path-prefix=it';
window.pPreview.defimage = 'https://static.wikia.nocookie.net/paperpedia/images/e/e6/Site-logo.png/revision/latest?cb=20210517130749&format=original&path-prefix=it';
//ignore templates in preview
window.pPreview.RegExp.noinclude = ['.quote', ".notice", ".noprint", ".disambigua", ".vedi_anche"];
//text length
window.pPreview.tlen = 500;