/* Any JavaScript here will be loaded for all users on every page load. */
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Birokrat', link:'Project:Pengurus#Birokrat dan Pengurus' },
                sysop: { u:'Pengurus', link:'Project:Pengurus#Birokrat dan Pengurus' },
                chatmoderator: { link:'Project:Pengurus#Rollback dan Moderator Obrolan' },
                rollback: { link:'Project:Pengurus#Rollback dan Moderator Obrolan' },
                founder: { u:'Pendiri', link:'Frozen Wiki:Pengurus' },
	}
};
 
UserTagsJS.modules.custom = {
 
        'Fake_Kage': ['founder'],
 
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