$(function () {
	var dataDiv = document.getElementById('data-ns-pageinfo')
	if (! dataDiv) {
		return;
	}
	var $dataDiv = $(dataDiv);
	$('#firstHeading').wrapInner('<div style="display:inline-block"></div>');
	
	var wgPageName = mw.config.get('wgPageName');
	var wgServer = mw.config.get('wgServer');
	var wgNamespace = mw.config.get('wgCanonicalNamespace');
	
	function addLink(text, target) {
		var editlink = document.createElement('a');
		var edittext = document.createTextNode(text);
		editlink.appendChild(edittext);
		editlink.href = wgServer + '/' + target;
		$(editlink).addClass('editlink');
		$('#firstHeading').append(editlink);
	}
	
	var overviewPage = $(dataDiv).attr('data-overviewpage');
	
	if (wgNamespace == 'Data') {
		addLink('view event', overviewPage);
	}
	else if (overviewPage) {
		addLink('view data', 'Data:' + overviewPage);
	}
	
	// add refresh data link
	$(mw.util.addPortletLink('p-views', 'javascript:;', 'Refresh Overview', 'ca-refresh-overview', 'Refresh event overview page')).click(function() {
		var a = new mw.Api();
		
		function refreshPage(page) {
			if (! overviewPage) {
				return $.Deferred().resolve();
			}
			return a.postWithToken('csrf', {
				action : 'purge',
				titles : page
			}).then(function(data){
				console.log('refreshed');
				return page;
			}, function(code, data){
				console.log(code);
				statuscolor = 'gadget-action-fail';
				return page;
			});
		}
		
		function blankEditPage(page) { // currently we aren't actually using this, hopefully that's k
			return a.postWithToken('csrf',{
				action : 'edit',
				title : page,
				appendtext : ''
			}).then(function(data) {
				console.log('blank edited');
			}, raiseError);
		}
		
		function getWikitext() {
			if (! page ) return $.Deferred().resolve();
			return a.postWithToken('csrf',{
				action : 'expandtemplates',
				prop : 'wikitext',
				text : '{{' + template + '}}'
			}).then(function(data) {
				console.log('got wikitext from ' + template);
				return data.expandtemplates.wikitext;
			}, raiseError);
		}
		
		function saveWikitext(wikitext) {
			if (! wikitext) {
				console.log('wikitext was empty');
				return $.Deferred().resolve();
			}
			console.log('saving wikitext...');
			return a.postWithToken('csrf',{
				action : 'edit',
				title : page,
				text : wikitext,
				summary : 'Auto update via Refresh Overview',
				tags: 'refresh_overview'
			}).then(function(data) {
				console.log('saved wikitext to ' + page);
			}, raiseError);
		}
		
		function raiseError(code, data) {
			console.log(code);
			statuscolor = 'gadget-action-fail';
			return $.Deferred().reject();
		}
		
		clearDisplayColor('ca-refresh-overview');
		// make sure to include : before the template name in the attr if needed
		var template = $dataDiv.attr('data-template-link');
		var page = $dataDiv.attr('data-page-link');
		var statuscolor = 'gadget-action-success';
		refreshPage(overviewPage)
		//.then(blankEditPage)
		.then(getWikitext)
		.then(saveWikitext)
		.then(function() {
			console.log('Done!');
			displayColor(statuscolor, 'ca-refresh-overview');
		})
		.fail(function() {
			console.log('failed rip');
			displayColor(statuscolor, 'ca-refresh-overview');
		});
	});
	
});