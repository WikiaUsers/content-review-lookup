$("body.ChatWindow .Chat .message img").attr("width","25px").attr("height","25px");

importArticles({
    type: 'script',
    articles: [
    'u:dev:ExtendedNavigation/code.js'
    ]
});

/* T�tulos no Perfil */
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

//****************
//Auto-Atualiza��o
//****************

var ajaxPages = ["Especial:Mudan�as_recentes", "Especial:Registro", "Especial:Contribui��es", "Especial:WikiActivity"];
var AjaxRCRefreshText = 'Auto-atualiza��o';
importScriptPage('AjaxRC/code.js', 'dev');
 
//********************
//Fim Auto-Atualiza��o
//********************