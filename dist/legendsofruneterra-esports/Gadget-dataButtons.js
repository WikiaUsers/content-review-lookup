$(function() {
	var overviewDiv = document.getElementById('datapage-info');
	var dataDiv = document.getElementById('data-ns-pageinfo');

	if (! (overviewDiv || dataDiv)) return;
	function addLink(text, target, heading) {
		var editlink = document.createElement('a');
		var edittext = document.createTextNode(text);
		var extraClass = heading == '#firstHeading' ? '' : 'mw-editsection';
		editlink.appendChild(edittext);
		editlink.href = wgServer + '/' + target;
		$(editlink).addClass('editlink').addClass(extraClass).appendTo(heading);
	}
	
	function addTitleLink(text, target) {
		addLink(text, target, '#firstHeading');
	}

	if (overviewDiv) {
		var $overviewDiv = $(overviewDiv);
		var overviewPage = $overviewDiv.attr('data-overviewpage');
		var wgServer = mw.config.get('wgServer');
		var maxPages = parseInt($overviewDiv.attr('data-datapages'));
		var firstText = maxPages > 0 ? 'view data' : 'create data';
		addTitleLink(firstText, 'Data:' + overviewPage);
		for (i = 2; i <= maxPages; i++) {
			addTitleLink('page ' + i, 'Data:' + overviewPage + '/' + i);
		}
		if ($overviewDiv.attr('data-has-participants-datapage')) {
			addTitleLink('view data', 'Data:' + overviewPage + '/Participants', $('#Participants').closest('h2'));
		}
		
	}
	else {
		var $dataDiv = $(dataDiv);
		var wgPageName = mw.config.get('wgPageName');
		var wgServer = mw.config.get('wgServer');
		var wgNamespace = mw.config.get('wgCanonicalNamespace');
		var overviewPage = $dataDiv.attr('data-overviewpage');
		
		if (wgNamespace == 'Data') {
			addTitleLink('view event', overviewPage);
		}
		else if (overviewPage) {
			addTitleLink('view data', 'Data:' + overviewPage);
		}
	}
});