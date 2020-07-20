/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
	    twitchmod: {u:'Twitch Moderator', order: 1},
	    wikiadmin: {u:'Wiki Staff', order: 1/0}
	    
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat','twitchmod', 'wikiadmin'];

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxBatchDelete/code.js',
    ]
});