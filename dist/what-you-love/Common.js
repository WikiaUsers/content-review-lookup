importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName'
) === null) return;
$('span.insertusername').html(mw.config.get('wgUserName'));
});