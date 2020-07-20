

window.UserTagsJS = { modules: {}, tags: { rollback: { u:'Spam Team' } } }; 
/* Any JavaScript here will be loaded for all users on every page load. */




importArticles({
    type: "script",
    articles: [
        'u:c:MediaWiki:Snow.js',
    ]
});

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});


importArticles({
	type:'script',
	articles: [
		// ...
		'w:c:dev:UserTags/code.js',
		// ...
	]
});