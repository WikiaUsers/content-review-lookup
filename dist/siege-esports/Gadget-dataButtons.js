$(function() {
	var overviewDiv = document.getElementById('datapage-info');
	var dataDiv = document.getElementById('data-ns-pageinfo');

	if (! (overviewDiv || dataDiv)) return;
	function addLink(text, target) {
		var editlink = document.createElement('a');
		var edittext = document.createTextNode(text);
		editlink.appendChild(edittext);
		editlink.href = wgServer + '/' + target;
		$(editlink).addClass('editlink').appendTo('#firstHeading');
	}

	if (overviewDiv) {
		var $overviewDiv = $(overviewDiv);
		var overviewPage = $overviewDiv.attr('data-overviewpage');
		var wgServer = mw.config.get('wgServer');
		var maxPages = parseInt($overviewDiv.attr('data-datapages'));
		addLink('view data', 'Data:' + overviewPage);
		for (i = 2; i <= maxPages; i++) {
			addLink('page ' + i, 'Data:' + overviewPage + '/' + i);
		}
	}
	else {
		var $dataDiv = $(dataDiv);
		var wgPageName = mw.config.get('wgPageName');
		var wgServer = mw.config.get('wgServer');
		var wgNamespace = mw.config.get('wgCanonicalNamespace');
		var overviewPage = $dataDiv.attr('data-overviewpage');
		
		if (wgNamespace == 'Data') {
			addLink('view event', overviewPage);
		}
		else if (overviewPage) {
			addLink('view data', 'Data:' + overviewPage);
		}
	}
});