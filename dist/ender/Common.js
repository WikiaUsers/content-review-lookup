( function() {
	importArticles({
		type: 'script',
		articles: [
			'u:clodaghelm:MediaWiki:SlideToggle.js'
		]
	}, {
		type: 'style',
		articles: [
			'u:clodaghelm:MediaWiki:BalancedUCX.css'
		]
	});
})();

// dev:UserTags config
window.UserTagsJS = {
	modules: {},
	tags: {
		'founder': { u: 'Priestess of Origin', link:'Wiki of Ender:Administration#Founder' },
		'bureaucrat': { u: 'Priestess of Sovereignty', link:'Wiki of Ender:Administration#Bureaucrat' },
		'administrator': { u: 'Priestess of Principles', link:'Wiki of Ender:Administration#Administrator' }
	}
};
UserTagsJS.modules.custom = {
	'Dralcyon': ['founder', 'bureaucrat', 'administrator'], // [[User:Dralcyon]]
	'Fla1m9C': ['administrator'] // [[User:Fla1m9C]]
};
UserTagsJS.modules.metafilter = {
	'sysop': ['sysop', 'bureaucrat'] // remove "admin" tag from bureaucrats
};