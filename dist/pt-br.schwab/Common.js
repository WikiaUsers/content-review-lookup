/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
// Alerta de Spoilers e Não Finalizados
window.SpoilerAlertJS = {
    question: 'ATENÇÃO! Esta área contém spoilers ou informações provisórias que você pode não querer ver. Tem certeza que deseja prosseguir?',
    yes: 'Sim, por favor',
    no: 'Não, ainda não',
    fadeDelay: 1600
};
importScriptPage('SpoilerAlert/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WikiActivity.js',
        'u:dev:MediaWiki:AddBlockUserTag/code.js',
        'u:dev:MediaWiki:AjaxRename/code.js',
        'u:dev:MediaWiki:DiscussionsFeed.js',
        'u:dev:MediaWiki:UploadMultipleFiles.js',
    ]
});

// Pop-ups em Referências
importScriptPage('ReferencePopups/code.js', 'dev');