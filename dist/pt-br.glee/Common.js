/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
 
// Pop-ups em Referências
importScriptPage('ReferencePopups/code.js', 'dev');

//  Pontuação WAM
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:RailWAM/code.js'
    ]
});