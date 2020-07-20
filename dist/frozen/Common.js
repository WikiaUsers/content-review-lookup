/* Any JavaScript here will be loaded for all users on every page load. */
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat', link:'Project:Bureaucrats' },
                sysop: { u:'Administrator', link:'Project:Administrators' },
                chatmoderator: {  },
                rollback: { link:'Project:Rollbacks' },
                founder: { u:'Founder', link:'Project:Bureaucrats' },
                bot: { u:'Bot', link:'Help:Bots' },
	}
};
 
UserTagsJS.modules.custom = {

        'Bella8991': ['founder'],
        'Dragonbot6491': ['bot'],
        
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
UserTagsJS.modules.inactive = 30; // 30 days
 
UserTagsJS.modules.inactive = {
	days: 30,
 
 
};

importArticles({
    type: "script",
    articles: [
        "u:dev:ListFiles/code.js" // ListFiles from Dev Wiki
    ]
});

ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});