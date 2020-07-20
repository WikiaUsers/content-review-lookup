importArticles({
    type: 'script',
    articles: [
        'u:dev:NullEditButton/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:DynamicImages/code.js',
        'u:dev:Tooltips/code.js',
        'u:dev:ExternalImageLoader/code.js',
        'u:dev:CategoryRenameAuto-update/code.js'
    ]
});

batchDeleteDelay = 1000;
importScriptPage('AjaxBatchDelete/code.2.js', 'dev');
 
nullEditDelay = 1000;
importScriptPage('MassNullEdit/code.js', 'dev');