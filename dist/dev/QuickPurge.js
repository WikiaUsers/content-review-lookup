(function() {
	if (window.quickPurgeLoaded) return;
	window.quickPurgeLoaded = true;

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
		if (mw.config.get("wgAction") == "purge") {
			var page = mw.config.get("wgPageName");
			purgePage(page);
		}
	});
	
	$(document.body).on('click', 'a[href*="action=purge"], a[href*="action=Purge"]', function(e) {
		// Don't activate if meta keys are used
		if (e.ctrlKey || e.altKey || e.shiftKey) return;
 
		var link = new mw.Uri(decodeURIComponent(e.target.href));
		var page;
		// Support all formats described at: https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Short_URL
		if (link.path == indexPath) {
			page = link.query.title;
		} else if (link.path.startsWith(indexPath + '/')) {
			page = link.path.substring(indexPath.length + 1);
		} else {
			page = link.path.replace(mw.config.get('wgArticlePath').replace(/\$1/, ''), '');
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