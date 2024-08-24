/* C�digos JavaScript colocados aqui ser�o carregados por todos aqueles que acessarem alguma p�gina desta wiki */

// Alerta de Spoilers e N�o Finalizados
window.SpoilerAlertJS = {
    question: 'ATEN��O! Esta �rea cont�m spoilers ou informa��es provis�rias que voc� pode n�o querer ver. Tem certeza que deseja prosseguir?',
    yes: 'Sim, por favor',
    no: 'N�o, ainda n�o',
    fadeDelay: 1600
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AddBlockUserTag/code.js',
        'u:dev:MediaWiki:DiscussionsFeed.js',
        'u:dev:MediaWiki:PageRenameAuto-update/code.js',
        'u:dev:MediaWiki:CategoryQuickRemove.js',
    ]
});

// Pop-ups em Refer�ncias
importScriptPage('ReferencePopups/code.js', 'dev');
 
/* Auto Refresh */
window.AjaxRCRefreshText = 'Carregamento Autom�tico';
window.AjaxRCRefreshHoverText = 'A p�gina recarrega-se automaticamente';
window.ajaxPages = [
    "Especial:Mudan�as_recentes",
    "Especial:WikiActivity",
    "Especial:P�ginas_vigiadas",
    "Especial:Arquivos_novos",
    "Especial:Lista_de_arquivos",
    "Especial:P�ginas_novas",
    "Especial:Contribui��es"
];