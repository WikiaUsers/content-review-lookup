/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SpoilerAlert/code.js',
    ]
});

// Alerta de Spoilers e Não Finalizados
window.SpoilerAlertJS = {
    question: 'ATENÇÃO! Esta área contém spoilers ou informações provisórias que você pode não querer ver. Tem certeza que deseja prosseguir?',
    yes: 'Sim, por favor',
    no: 'Não, ainda não',
    fadeDelay: 1600
};