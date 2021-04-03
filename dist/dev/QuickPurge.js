(function() {
	if (window.quickPurgeLoaded) return;
	window.quickPurgeLoaded = true;
	
	$(document.body).on('click', 'a[href*="action=purge"]', function(e) {
		// Don't activate if meta keys are used
        if (e.ctrlKey || e.altKey || e.shiftKey) return;

		e.preventDefault();
		e.stopImmediatePropagation();
 
		var link = new mw.Uri(e.target.href);
		var page = link.path.replace(mw.config.get('wgArticlePath').replace(/\$1/, ''), '');
		
		new mw.Api().post({
			action: 'purge',
			forcelinkupdate: true,
			titles: page,
		}).then(function(res) {
			 console.log('Purge Result:', res);
			 window.location.replace(link.path);
		}, function(_, e) {
			console.warn('API Error in purging the page \"' + page + '\":', e.error.info);
		});
	});
})();