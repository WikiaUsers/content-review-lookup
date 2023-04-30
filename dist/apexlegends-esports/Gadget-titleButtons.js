$(function() {
	var el = document.createElement('div')
	$(el).attr('id', 'title-copy-outer').html('<div id="title-copy-content" title="Copy Only Title (No Namespace)"></div><div id="title-copy-all" title="Copy Full Title (Incl Namespace)"></div>');
	$('#firstHeading').wrapInner('<div id="first-heading-text"></div>');
	$(el).insertAfter(document.getElementById('first-heading-text'));
	$('#title-copy-content').click(function() {
		var text = mw.config.get('wgTitle');
		text = text.replace(/WhatLinksHere\/(.+?:)?/,'');
		text = text.replace(/MovePage\/(.+?:)?/,'');
		var copyEl = document.createElement('textarea');
		copyEl.value = text.replace(/_/g,' ');
		document.body.appendChild(copyEl);
		copyEl.select();
		document.execCommand('copy');
		document.body.removeChild(copyEl);
		$('#title-copy-content').css('color','green');
		setTimeout(function() {
			$('#title-copy-content').css('color','');
		}, 2000);
	});
	$('#title-copy-all').click(function() {
		var text = mw.config.get('wgPageName');
		text = text.replace(/Special:WhatLinksHere\//,'');
		text = text.replace(/Special:MovePage\//,'');
		var copyEl = document.createElement('textarea');
		copyEl.value = text.replace(/_/g,' ');
		document.body.appendChild(copyEl);
		copyEl.select();
		document.execCommand('copy');
		document.body.removeChild(copyEl);
		document.execCommand('copy');
		$('#title-copy-all').css('color','green');
		setTimeout(function() {
			$('#title-copy-all').css('color','');
		}, 2000);
	});
	var overviewDiv = document.getElementById('datapage-info');
	var dataDiv = document.getElementById('data-ns-pageinfo');
	
	if (overviewDiv || dataDiv) {
	
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
			var firstText = maxPages > 0 ? 'edit data' : 'create data';
			addTitleLink(firstText, 'Data:' + overviewPage);
			for (i = 2; i <= maxPages; i++) {
				addTitleLink('page ' + i, 'Data:' + overviewPage + '/' + i);
			}
			if ($overviewDiv.attr('data-has-participants-datapage')) {
				addLink('edit data', 'Data:' + overviewPage + '/Participants', $('#Participants').closest('h2'));
				addLink('edit data', 'Data:' + overviewPage + '/Participants', $('#Notable_Participants').closest('h2'));
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
	}
	var replaceDomain = window.location.href.includes('gamepedia.com') ? 'gamepedia.io' : 'gamepedia.com';
	var stagingLink = window.location.href.replace(/gamepedia\.(com|io)/, replaceDomain);
	var stagingEl = document.createElement('a');
	stagingEl.href = stagingLink;
	$(stagingEl).addClass('staging-link-outer').html('<div id="staging-link"></div>').appendTo('#firstHeading');
});