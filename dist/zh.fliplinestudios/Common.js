$('.insertusername').text(mw.config.get('wgUserName'));
/*用戶標籤*/
window.UserTagsJS = {
	modules: {},
	tags: {
	    es: {u:'金牌顧客', link:'http://es.flipline-studios-espanol.wikia.com'},
	    bot: {u:'機器人'},
	    founder: {order:-1/0},
	},
	oasisPlaceBefore: ''
};
UserTagsJS.modules.custom = {
    'Nick2345'   : ['es'],
    'Anthony045' : ['es'],
    'BotWurst'   : ['bot'],
};

UserTagsJS.modules.mwGroups = ['founder', 'bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'chatmoderator', 'rollback', 'vstf', 'global-discussions-moderator'];
/*自動刷新*/
window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb1468579810/common/skins/common/images/ajax.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';