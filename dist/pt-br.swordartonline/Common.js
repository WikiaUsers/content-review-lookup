/* Códigos JavaScript colocados aqui serão carregados por todos aqueles que acessarem alguma página desta wiki */

window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Top Editores */

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:MediaWiki/TopEditors/code.js'
    ]
});