/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AddBlockUserTag/code.js',
        'u:dev:MediaWiki:PageRenameAuto-update/code.js',
    ]
});
// Pop-ups em Refer�ncias
importScriptPage('ReferencePopups/code.js', 'dev');