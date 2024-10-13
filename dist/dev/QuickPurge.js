(function() {
	if (window.quickPurgeLoaded) return;
	window.quickPurgeLoaded = true;

	var purging = false;
	var indexPath = mw.config.values.wgScript;
	
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
		if (mw.config.values.wgAction == "purge" || mw.config.values.wgCanonicalSpecialPageName === "Purge") {
			var page = mw.config.values.wgPageName;
			var link = new mw.Uri(location.href);
			
			if (mw.config.values.wgNamespaceNumber === -1) 
				if (page.split("/").length > 1) page = page.split("/").slice(1).join("/");
				else if (link.query.page) page = link.query.page;
			
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
		var link = new mw.Uri(e.target.href);
		var page;
		// Support all formats described at: https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Short_URL
		if (link.path == indexPath) {
			page = decodeURIComponent(link.query.title);
		} else if (link.path.startsWith(indexPath + '/')) {
			page = decodeURIComponent(link.path).substring(indexPath.length + 1);
		} else {
			page = decodeURIComponent(link.path).replace(mw.config.values.wgArticlePath.replace(/\$1/, ''), '');
			var title = new mw.Title(page);

			// If title is `Special:Purge` remove it from the title
			if (title.namespace === -1)
				if (title.title.split("/").length > 1) page = title.title.split("/").slice(1).join("/");
				else if (link.query.page) page = link.query.page;
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