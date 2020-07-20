importScriptPage('PowerPageMaker/code.js', 'dev');
 
/*Nombre de usuario - usado por Plantilla:NOMBREUSUARIO*/
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

// Etiqueta de Inactivo
InactiveUsers = {
    texto: 'Inactivo'
};
importScriptPage('InactiveUsers/code.js', 'dev');
 
/* End of the {{USERNAME}} replacement */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:GlobalEditcount/code.js',
    ]
});

window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};