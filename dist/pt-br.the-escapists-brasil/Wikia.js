$("body.ChatWindow .Chat .message img").attr("width","25px").attr("height","25px");

importArticles({
    type: 'script',
    articles: [
    'u:dev:ExtendedNavigation/code.js'
    ]
});

/* Títulos no Perfil */
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

//****************
//Auto-Atualização
//****************

var ajaxPages = ["Especial:Mudanças_recentes", "Especial:Registro", "Especial:Contribuições", "Especial:WikiActivity"];
var AjaxRCRefreshText = 'Auto-atualização';
importScriptPage('AjaxRC/code.js', 'dev');
 
//********************
//Fim Auto-Atualização
//********************