importArticles({
    type: "style",
    articles: [
        "w:c:dev:InterlanguageFlags/code.css"
    ]
});
/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat', link:'Special:ListAdmins' },
		inactive: { u: 'Has not edited recently' }
	}
};
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Quiz/code.js',
    ]
});