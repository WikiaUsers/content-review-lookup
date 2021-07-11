// Configuration for the script that replaces the removed welcome bot
window.AutoCreateUserPagesConfig = {
	content: {
		2: "{{sub" + "st:MediaWiki:Welcome-user-page}}",
		3: false,
	},
	summary: "Script: Automatically creating user profile",
};


// Only import these scripts for content mods and admins so we don't waste the
// bandwith of users who can't actually use them.
if (
	mw.config.get("wgUserGroups").includes("content-moderator") ||
	mw.config.get("wgUserGroups").includes("sysop")
) {
	importArticles({
		type: "script",
		articles: [
			"u:dev:MediaWiki:AjaxBatchDelete.js",
			"u:dev:MediaWiki:MassEdit/code.js",
			"u:dev:MediaWiki:MassCategorization/code.js",
			"u:dev:MediaWiki:PowerDelete.js",
		],
	});
}