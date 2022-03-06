/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AddBlockUserTag/code.js',
        'u:dev:MediaWiki:UploadMultipleFiles.js',
        'u:dev:MediaWiki:PageRenameAuto-update/code.js',
    ]
});
// Pop-ups em Referências
importScriptPage('ReferencePopups/code.js', 'dev');