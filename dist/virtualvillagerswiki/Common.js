//ajax rc config
window.ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];

//Usertags config
window.UserTagsJS = {
	modules: {},
	tags: {
bureaucrat: { u: 'Tribal Chief', link: 'Help:User rights#Bureaucrats', order:1 },
sysop: { u: 'Esteemed Elder', link:'Help:User rights#Administrators', order:2 },
rollback: { u: 'Golden Child', link:'Help:User rights#Rollbacks', order:3 },
chatmoderator: { u: 'Guardian of Isola', 'link:'Help:User rights#Chat Moderators', order:4 },
bot: { link:'Help:Bots' },
}
};
UserTagsJS.modules.isblocked = true;
 
UserTagsJS.modules.mwGroups = ['bot', 'bot-global', 'rollback', 'bureaucrat'];
 
UserTagsJS.modules.inactive = {
	days: 60,
	zeroIsInactive: true
};
UserTagsJS.modules.metafilter = {
	'rollback': ['sysop'],
};
UserTagsJS.modules.autoconfirmed = true;
 
 
UserTagsJS.modules.autoconfirmed = true;
 
UserTagsJS.modules.nonuser = (mediaWiki.config.get('skin') === 'monobook');

//script imports
window.importArticles( {
    type: 'script',
    articles: [
 
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:UserTags/code.js', 
        'w:c:dev:ReferencePopups/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:MessageBlock/code.js',
        'w:c:dev:AntiUnicruft/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:AjaxRC/code.js',
        'w:dev:WallGreetingButton/code.js',
    ]
} );