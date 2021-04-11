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

window.rwaOptions = {
    limit : 150,
    namespaces : [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
    autoInit : true,
    themeName : "main",
    showBotEdits : false,
    loadModule : false,
    customRendering : { },
    headerLink : false,
    refresh : false,
    refreshDelay : 0,
    timeout : 0
};