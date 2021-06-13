/* Any JavaScript here will be loaded for all users on every page load. */

/* AjaxRC */
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions", "Images", "Videos"];
window.ajaxRefresh = 30000;

/* BackToTopButton */
window.BackToTopModern = true;

/* ArticleRating */
window.ArticleRating = {
  values: ['Kooky', 'Bad', 'Average', 'Good', 'Perfecto'],
  starSize: [28, 28],
};

/* MessageBlock */
window.MessageBlock = {
  title : 'Blocked',
  message : '{'+'{subst:#invoke:BlockMessages|main|reason=$1|expiry=$2}'+'}',
  autocheck : true
};

/* MassCategorization */
window.MassCategorizationGroups = ['sysop', 'content-moderator'];

/* BannerNotification */
importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:BannerNotification.js'
});
mw.hook('dev.banners').add(function(BannerNotification) {
	if(!mw.storage.get('wwd_banner')) {
		new BannerNotification('Join our Discord server, Wow Wow Discord: <a href="https://discord.gg/fWP7a6J">https://discord.gg/fWP7a6J</a>', 'confirm').onClose(function () {
			mw.storage.set("wwd_banner", "true");
		}).show();
	}
	if(!mw.storage.get('community_rules_banner')) {
		new BannerNotification('<span>Please, if you are new by editing on this wiki, check the <a href="https://wubbzy.fandom.com/wiki/Help:Community_rules">rules</a> we have set for the comfort of the community and the reader</span>', 'warn').onClose(function () {
			mw.storage.set("community_rules_banner", "true");
		}).show();
	}
});

/* AddAnnouncement */
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
	try {
		importArticle({
			type: 'script',
			article: 'u:dev:MediaWiki:AddAnnouncement/code.js'
		});
	} catch (err) {
		console.log("AddAnnouncement error: " + err);
	}
}

/* Some scripts for mods */
if (mw.config.get("wgUserGroups").indexOf('sysop', 'content-moderator') > -1) {
	try {
		importArticle({
			type: 'script',
			article: 'MediaWiki:Group-sysop.js'
		});
	} catch(err) {
		console.log("Error when importing scripts for mods: " + err);
	}
}