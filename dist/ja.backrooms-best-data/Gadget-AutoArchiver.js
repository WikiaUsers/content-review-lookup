mw.loader.using('mediawiki.api').then(function() {
	var api = new mw.Api();
	api.get({action: 'parse', page: mw.config.get('wgPageName'), prop: 'wikitext', formatversion: 2})
	.then(data => data.parse.wikitext)
	.then(wikitext => {
		this.$("[data-summary*='AutoArchiver']").attr("data-content", wikitext + "\n[[Category:アーカイブ]]")});
});

window.FCButtons = [
	{
		label: "アーカイブ",
		target: 'User:' + mw.config.get("wgUserName") + "/アーカイブ/" + mw.config.get("wgPageName"),
		summary: "自動アーカイブ: " + mw.config.get("wgPageName") + " のアーカイブ化に成功しました",
		alwaysDisplay: true,
		placement: '.page-header__categories'
	}
];

mw.loader.load("https://dev.fandom.com/wiki/MediaWiki:FastCreate.js?action=raw&ctype=text/javascript");