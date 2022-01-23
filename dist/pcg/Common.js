/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

window.SpoilerAlertJS = {
    question: 'Spoilers Ahead! Proceed Anyway?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};

importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:CollapsiblePageTools.js',
		]
});