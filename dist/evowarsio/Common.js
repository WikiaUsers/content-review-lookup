/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SeeMoreActivityButton/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AbuseLogRC.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ListAdmins/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:ListUsers/code.js',
        // ...
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassUserRights/code.js',
    ]
});
window.UserTagsJS = {
	modules: {},
	tags: {
		wikievowarsbureaucratsrightsremover: { u: 'Wiki Chief Bureaucrat', order: -1/0 },
		Intern: { u: 'Intern', order: 100 },
	}
};
UserTagsJS.modules.custom = {
	'KevinAlcain, 17nbist': ['wikievowarsbureaucratsrightsremover']
  };