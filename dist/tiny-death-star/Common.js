(function ($, mw, store) {
    "use strict";
    var articles;
 
    if (store && store.getItem('commonjs')) {
        console.log('You have chosen to disable site-wide JavaScript in MediaWiki:Common.js. Please remove \'commonjs\' from localStorage to re-enable site-wide JavaScript.');
        return;
    }
 
    window.UserTagsJS = {
	modules: {},
	tags: {}
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
 
    /* Articles are interwiki links so that other wikis can use them. */
    articles =
       ['w:c:dev:UserTags/code.js'];
    // Use Wikia's importArticles() function to load JavaScript files
    window.importArticles({
        type: 'script',
        articles: articles
    });
    console.log('Site-wide JavaScript in MediaWiki:Common.js will load the following JavaScript files:\n   ' + articles.join('\n   '));
}(jQuery, mediaWiki, window.localStorage));