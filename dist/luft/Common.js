/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		bureaucrat: { order: 1 } // Normal order is 0
	}
};

/* mentions user */
$(function($, user) {
    if (user !== '') {
        $('.insertusername').text(user);
    }
}(window.jQuery, (window.mw.config.get('wgUserName') || '')));

/* oasis */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:OasisRevived.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:OldFandomColors.js',
    ]
});