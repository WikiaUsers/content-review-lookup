/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

/* == Da Shadowhunter's Wiki em inglês == */// Alerta de Spoilers e Não Finalizados
window.SpoilerAlertJS = {
    question: 'ATENÇÃO! Esta área contém spoilers ou informações provisórias que você pode não querer ver. Tem certeza que deseja prosseguir?',
    yes: 'Sim, por favor',
    no: 'Não, ainda não',
    fadeDelay: 1600
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscussionsFeed.js',
        'u:dev:MediaWiki:PageRenameAuto-update/code.js',
    ]
});

// Pop-ups em Referências
importScriptPage('ReferencePopups/code.js', 'dev');

/* Auto Refresh */
window.AjaxRCRefreshText = 'Carregamento Automático';
window.AjaxRCRefreshHoverText = 'A página recarrega-se automaticamente';
window.ajaxPages = [
    "Especial:Mudanças_recentes",
    "Especial:Páginas_vigiadas",
    "Especial:Arquivos_novos",
    "Especial:Lista_de_arquivos",
    "Especial:Páginas_novas",
    "Especial:Contribuições"
];