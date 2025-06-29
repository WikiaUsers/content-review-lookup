/*
 * @title       LeaderboardTab.js
 * @version     1.0
 * @description Adds a tab leading to Special:Editleaderbaord to your masthead
 * @author      PopularAbbyeet
 * @license     CC-BY-SA-3.0
 */

(function () {
	"use strict";

	// Only run once even if the user has the script installed in multiple places
	if (window.LeaderboardTab) return;
	window.LeaderboardTab = true;

	// Only run on pages where:
	// a) profileUserName is set (pages where the masthead exists)
	// b) profileUserName has the same value as wgUserName (the viewer's pages)
	const conf = mw.config.get([
		"profileUserName",
		"wgUserName"
	]);
	if (conf.profileUserName !== conf.wgUserName) return;

	function main() {
		mw.loader.using([
			"mediawiki.util",
			"mediawiki.api"
		]).then(function () {
			return new mw.Api().loadMessagesIfMissing([
				"Leaderboard"
			]);
		}).then(function () {
			const navigation = document.querySelector(".user-profile-navigation");

			const tab = navigation.appendChild( document.createElement("li") );
			tab.className = "user-profile-navigation__link";

			const tabLink = tab.appendChild( document.createElement("a") );
			tabLink.textContent = mw.message("Leaderboard").plain();
			tabLink.href = mw.util.getUrl("Special:Leaderboard");
		});
	}

	// Run immediately if the script loads late enough that the profile navigation exists already.
	// Otherwise, set up an MO to ensure the script runs as soon as the profile navigation exists.
	if (document.querySelector(".user-profile-navigation")) {
		main();
	} else {
		new MutationObserver(function (_, o) {
			if (document.querySelector(".user-profile-navigation")) {
				main();
				o.disconnect();
			}
		}).observe(document.querySelector(".page__main"), {
			childList: true,
			subtree: true
		});
	}
})();