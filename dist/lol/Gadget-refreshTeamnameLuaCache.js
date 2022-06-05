// <nowiki>
$( function () {
	if (mw.config.get('wgPageName') != 'Module:Teamnames') return;
	$(mw.util.addPortletLink('p-views', 'javascript:;', 'Refresh Teamnames', 'ca-refresh-teamnames', 'Refresh Teamnames')).click(function() {
		clearDisplayColor('ca-refresh-teamnames');
		var statuscolor = 'gadget-action-success';
		var a = new mw.Api();
		console.log('Starting...');
		a.get({
			action : 'query',
			prop : 'revisions',
			titles : 'Module:Team',
			rvprop : 'content'
		}).then(function(data) {
			for (p in data.query.pages) {
				content = data.query.pages[p].revisions[0]["*"];
			}
			var prefix = content.match(/PREFIX = '(.+?)'/)[1];
			console.log(prefix);
			a.get({
				action : 'parse',
				text : '{{#invoke:CacheUtil|resetAll|Teamnames|module=Team|f=teamlinkname|prefix=' + prefix + '}}'
			}).then(function(data) {
				console.log('Done!');
				displayColor(statuscolor, 'ca-refresh-teamnames');
			});
		});
	});
	
	moveToPViews($('#ca-refresh-teamnames'));
	
});

$(function() {
	
	if ($('#teamnames-page').length === 0) return;
	
	function refreshTeamnames(elId, page) {
			clearDisplayColor(elId);
			var statuscolor = 'gadget-action-success';
			var a = new mw.Api();
			console.log('Starting...');
			a.get({
				action : 'parse',
				text : '{{#invoke:Teamname|refreshCache|' + page + '}}'
			}).then(function(data) {
				console.log('Done!');
				displayColor(statuscolor, 'ca-refresh-teamnames');
			});
	}
	
	$(mw.util.addPortletLink('p-views', 'javascript:;', 'Refresh Page Teamnames', 'ca-refresh-teamnames-page', 'Refresh Page Teamnames')).click(function() {
			return refreshTeamnames('ca-refresh-teamnames-page', mw.config.get('wgPageName'));
	});
	
	$(mw.util.addPortletLink('p-views', 'javascript:;', '!Refresh All Teamnames', 'ca-refresh-teamnames-all', 'Refresh All Teamnames')).click(function() {
			return refreshTeamnames('ca-refresh-teamnames-all', '');
	});
	
	moveToPViews($('#ca-refresh-teamnames-page'));
	
});

// </nowiki>