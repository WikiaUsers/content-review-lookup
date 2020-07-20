/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
}); 

(function ($, mw, store) {
    "use strict";
    var articles;
 
    if (store && store.getItem('commonjs')) {
        console.log('You have chosen to disable site-wide JavaScript in MediaWiki:Common.js. Please remove \'commonjs\' from localStorage to re-enable site-wide JavaScript.');
        return;
    }
 
window.UserTagsJS = {
	modules: {},
	tags: {
		a: { u: 'Graphic Designer', order:4 },
                 b: { u: 'YoloSwagLord', order:3 },

	},
	oasisPlaceBefore: '> h4'
};
UserTagsJS.modules.custom = {
        'Infinity323':['a']
        '666JZ666':['B']

};

    UserTagsJS.modules.inactive = 30;
    UserTagsJS.modules.newuser = true;
    UserTagsJS.modules.autoconfirmed = true;
 
    UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
    UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat'],
        rollback: ['sysop', 'bureaucrat']
    };
 
    articles = ['MediaWiki:Common.js/SubNav.js', 'w:c:dev:UserTags/code.js'];
    // Use Wikia's importArticles() function to load JavaScript files
    window.importArticles({
        type: 'script',
        articles: articles
    });
    console.log('Site-wide JavaScript in MediaWiki:Common.js will load the following JavaScript files:', articles);
}(jQuery, mediaWiki, window.localStorage));

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});