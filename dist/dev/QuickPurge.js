(function() {
	'use strict';
	if (window.quickPurgeLoaded) return;
	window.quickPurgeLoaded = true;

	var purging = false;
	var indexPath = mw.config.get('wgScript');
	
	function purgePage(page) {
		new mw.Api().post({
			action: 'purge',
			forcelinkupdate: true,
			titles: page,
		}).then(function(res) {
			console.log(page);
			console.log('Purge Result:', res);
			location.replace(mw.util.getUrl(page));
		}, function(_, e) {
			console.warn('API Error in purging the page \"' + page + '\":', e.error.info);
		});
	}
	
	$(function() {
		if (mw.config.get('wgAction') === "purge" || mw.config.get('wgCanonicalSpecialPageName') === "Purge") {
			var page = mw.config.get('wgPageName');
			var link = new URL(location.href);
			
			if (mw.config.get('wgNamespaceNumber') === -1) 
				if (page.split("/").length > 1) page = page.split("/").slice(1).join("/");
				else if (link.searchParams.get('page')) page = link.searchParams.get('page');
			
			purgePage(page);
		}
	});
	
	$(document.body).on("click", 'a[href*="action=purge"], a[href*="action=Purge"], a[href*="Special:Purge"], a[href*="special:Purge"],  a[href*="Special:purge"]', function(e) {
		console.log(e);
		// Don't activate if meta keys are used
		if (e.ctrlKey || e.altKey || e.shiftKey) return;

		// Don't activate if already purging
		if (purging) return;

		purging = true;
		var link = new URL(e.target.href);
		var page;
		// Support all formats described at: https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Short_URL
		if (link.pathname == indexPath) {
			page = decodeURIComponent(link.searchParams.get('title'));
		} else if (link.pathname.startsWith(indexPath + '/')) {
			page = decodeURIComponent(link.pathname).substring(indexPath.length + 1);
		} else {
			page = decodeURIComponent(link.pathname).replace(mw.config.get('wgArticlePath').replace(/\$1/, ''), '');
			var title = new mw.Title(page);

			// If title is `Special:Purge` remove it from the title
			if (title.namespace === -1)
				if (title.title.split("/").length > 1) page = title.title.split("/").slice(1).join("/");
				else if (link.searchParams.get('page')) page = link.searchParams.get('page');
		}

		if (typeof page !== "string") {
			console.error('Failed to find page for "' + link + '"', link);
			return;
		}

		e.preventDefault();
		e.stopImmediatePropagation();
		
		purgePage(page);
	});
})();