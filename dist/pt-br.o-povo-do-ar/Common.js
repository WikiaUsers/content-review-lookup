/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */

// Alerta de Spoilers e N�o Finalizados
window.SpoilerAlertJS = {
    question: 'ATEN��O! Esta �rea cont�m spoilers ou informa��es provis�rias que voc� pode n�o querer ver. Tem certeza que deseja prosseguir?',
    yes: 'Sim, por favor',
    no: 'N�o, ainda n�o',
    fadeDelay: 1600
};
importScriptPage('SpoilerAlert/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WikiActivity.js',
        'u:dev:MediaWiki:AddUserRightsTag/code.js',
        'u:dev:MediaWiki:AjaxRename/code.js',
        'u:dev:MediaWiki:DiscussionsFeed.js',
        'u:dev:MediaWiki:UploadMultipleFiles.js',
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]

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