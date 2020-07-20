/* Untick minor edit checkbox after 10 seconds when editing */
mw.loader.using('mediawiki.api', function() {
	var action = mw.config.get('wgAction'),
	delay = window.minorEditTimeout || 10000;
	
	if (["edit","submit"].indexOf(action) != -1) {
		setTimeout(function() {
			if (document.getElementById('wpMinoredit').checked) 
				$('#wpMinoredit').removeAttr('checked');
		}, delay);
	}
});