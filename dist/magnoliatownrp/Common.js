/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage( 'AjaxRC/code.js', 'dev' );
 
var ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity","Blog:Recent_posts"];
 
var AjaxRCRefreshText = 'Auto-refresh';





window.UserTagsJS = {
	modules: {},
	tags: {
		tech: { u: 'Tech Support', m: 'Tech Support', f: 'Tech Support' },
                levelthree: { u: 'Level Three', m: 'Level Three',  f: 'Level Three'},
                ED: { u: 'Events and Development Department', m: 'Events and Development Department', f: 'Events and Development Department' },
                Admin: { u: 'Administration Department', m: 'Administration Department', f: 'Administration Department' },
                User: { u: 'User Support Department', m: 'User Support Department', f: 'User Support Department' },
                EDHead: { u: 'Events and Development Head', m: 'Events and Development Head', f: 'Events and Development Head' },
                AdminHead: { u: 'Administration Head', m: 'Administration Head', f: 'Administration Head' },
                UserHead: { u: 'User Support Head', m: 'User Support Head', f: 'User Support Head' }
                
	}
};

UserTagsJS.modules.custom = {
        'DarknessVoid': ['EDHead']
};

importArticles({
	type:'script',
	articles: [
		'w:c:dev:UserTags/code.js',
                'u:dev:DisableBotMessageWalls/code.js',
                'u:dev:HighlightUsers/code.js',
	]
});