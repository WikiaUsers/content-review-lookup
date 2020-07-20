importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js",
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:ListUsers/code.js',
        'w:c:dev:SignatureCheck/code.js',
        'u:dev:EditConflictAlert/code.js',
        'w:c:dev:MediaWiki/TopEditors/code.js'
    ]
});

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0, 'Talk', 'User talk', 'Forum'] // Edits must be to articles or talk pages or user talk pages or the forum to count, others don't count
};

UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};