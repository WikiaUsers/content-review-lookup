$('.username').text(mw.config.get('wgUserName'));

importArticles({ 
    type: 'script', 
    articles: [ 
        'u:dev:Standard_Edit_Summary/code.js'
]});

importScriptPage('InactiveUsers/code.js', 'dev');