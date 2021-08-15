// Configuration for the script that replaces the removed welcome bot
window.AutoCreateUserPagesConfig = {
	content: {
		2: "{{sub" + "st:MediaWiki:Welcome-user-page}}",
		3: false,
	},
	summary: "Script: Automatically creating user profile",
};

// Configuration for [[w:c:dev:NoLicenseWarning]]
// Actually require a license to be picked instead of just making a suggestion
window.NoLicenseWarning = { forceLicense: true };

(function () {
	'use strict';

	const fixSoundcloudIframes = function ($content) {
		const embedVideoIframes = $content.find('.embedvideowrap iframe');
		embedVideoIframes.each(function (_, iframe) {
			if (iframe.src.startsWith('https://w.soundcloud.com/player') && iframe.src.includes('&visual=true')) {
				iframe.src = iframe.src.replace('&visual=true', '');
			}
		});
	};

	mw.hook('wikipage.content').add(function ($content) {
		fixSoundcloudIframes($content);
	});
})();


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