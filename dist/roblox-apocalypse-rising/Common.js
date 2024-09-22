/* Any JavaScript here will be loaded for all users on every page load. */
/* DO NOT TOUCH UNLESS YOU KNOW JAVASCRIPT */
// Core configuration. We add 2 custom tags and change what the built-in sysop tag says.

massProtectDelay = 200;
importArticles({
    type: "script",
    articles: [
        "w:c:dev:UserTags/code.js",
        "w:c:dev:Countdown/code.js",
        'w:c:dev:TopEditors/code.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:MassProtect/code.js',
        'u:dev:AjaxBatchDelete/code.2.js',
        'u:dev:MediaWiki:LastEdited/code.js'
    ]
});
importScriptPage('MassProtect/code.js', 'dev');
window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript' },
		csshelper: { u: 'CSS' },
		editor: { u: 'Editor'}
	}
};

/* Username Template */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

importArticle({
    type: "script",
    article: [
        "w:c:dev:DisplayClock/code.js"
    ]
});

/* Import modules */
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

importScriptPage('MediaWiki:AudioIntegrator/AudioIntegrator.js', 'dev');
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* Event header - Inactive */
/* $('.fandom-community-header__community-name-wrapper').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('The Drying!')
        )
        .attr('href', 'https://roblox-apocalypse-rising.fandom.com/wiki/The Drying (2024)') 
); */

/* LastEdited config */
window.lastEdited = {
	avatar: false,
	size: false,
	comment: false,
	mainpage: false,
	newpage: false,
	timezone: 'locale',
	time: 'timestamp',
	namespaces: {
		exclude: [2]
	},
}