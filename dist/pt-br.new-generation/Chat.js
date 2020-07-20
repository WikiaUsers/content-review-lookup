importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:!ban/code.js',
        // ...
    ]
} );
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:!kick/code.js',
        // ...
    ]
} );
importArticles({ type: 'script', articles: [
    'u:dev:MediaWiki:ChatHacks.js'
]});

importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');

importScriptPage('MediaWiki:FixAdminKick/code.js','dev');

importArticles({
	type: "script",
	articles: [
		"u:dev:MediaWiki:ChatStatus/code.js"
	]
});

importScriptPage('MediaWiki:PrivateMessageAlert/code.js', 'dev');