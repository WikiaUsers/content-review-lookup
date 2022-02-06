window.dev = window.dev || {};
window.dev.profileTags = {
  noHideTags: true
};

if (ug.indexOf('sysop') + ug.indexOf('content-moderator') > -2)
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:Stella.js',
        'u:dev:MediaWiki:RedirectManagement/code.js',
            ]
        });