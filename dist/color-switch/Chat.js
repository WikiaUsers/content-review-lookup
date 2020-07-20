var defCBanDuration = 7200; // Equals to 20 minutes. Default is 1 day. (86400)

// Import...
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!ban/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:dev:MediaWiki:FasterBanModule/code.js',
        'MediaWiki:FixAdminKick/code.js','dev',
        'MediaWiki:Day/Night chat/code.js', 'dev'
    ]
})