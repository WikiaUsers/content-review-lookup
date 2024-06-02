/*
 * @title       WatchlistTab.js
 * @version     1.2.0
 * @description Adds a tab leading to Special:EditWatchlist to your masthead
 * @author      Himmalerin
 * @license     CC-BY-SA-3.0
 */
(function () {
	"use strict";

	// Only run once even if the user has the script installed in multiple places
	if (window.watchlistTab) return;
	window.watchlistTab = true;

	// Only run on pages where:
	// a) profileUserName is set (pages where the masthead exists)
	// b) profileUserName has the same value as wgUserName (the viewer's pages)
	const conf = mw.config.get(["profileUserName", "wgUserName"]);
	if (conf.profileUserName !== conf.wgUserName) return;

	function main() {
		mw.loader
			.using(["mediawiki.util", "mediawiki.api"])
			.then(function () {
				return new mw.Api().loadMessagesIfMissing(["watchlist"]);
			})
			.then(function () {
				const navigation = document.querySelector(".user-profile-navigation");

				const tab = document.createElement("li");
				tab.className = "user-profile-navigation__link";

				const tabLink = document.createElement("a");
				tabLink.textContent = mw.message("watchlist").plain();
				tabLink.href = mw.util.getUrl("Special:EditWatchlist");

				tab.append(tabLink);
				navigation.append(tab);
			});
	}

	// Run immediately if the script loads late enough that the profile navigation exists already.
	// Otherwise, set up an MO to ensure the script runs as soon as the profile navigation exists.
	if (document.querySelector(".user-profile-navigation")) {
		main();
	} else {
		const observer = new MutationObserver(function () {
			if (document.querySelector(".user-profile-navigation")) {
				main();
				observer.disconnect();
			}
		});

		observer.observe(document.querySelector(".page__main"), {
			childList: true,
			subtree: true,
		});
	}
})();