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
		var statusColorSuccess = 'gadget-action-success';
		var statusColorError = 'gadget-action-fail';
		var a = new mw.Api();
		console.log('Starting...');

		function queryForDuplicates() {
			console.log('querying for duplicates...');
			return a.get({
				action: "cargoquery",
				format: "json",
				tables: "Teamnames",
				group_by: "Link",
				having: "COUNT(*)>1",
				where: "Exception = '0' AND _pageName = '" + page + "'",
				fields: "_pageName=Page"
			}).then(function(data) {
				if (data.cargoquery.length > 0) {
					return $.Deferred().resolve({ status: true });
				}
				return $.Deferred().resolve({ status: false });
			});
		}
		
		function blankEditIfNeeded(data) {
			console.log(data);
			console.log('blanking if needed...');
			if (data.status === true) {
				return window.blankEdit(page).then(function(code, data) {
					console.log(data.xhr.status);
				});
			}
			return $.Deferred().resolve();
		}

		function doRefresh(data) {
			console.log(data);
			console.log('refreshing...');
			return a.get({
				action : 'parse',
				text : '{{#invoke:Teamname|refreshCache|' + page + '}}'
			});
		}
		
		function logAction() {
			console.log('writing custom log...');
			return new mw.Api().postWithToken('csrf', {
				action: 'customlogswrite',
				logtype: 'ro-teamnames',
				title: mw.config.get('wgPageName'),
				publish: 1,
			});
		}

		function getAndPrintWarnings() {
			console.log("getting warnings")
			return a.get({
				action: "parse",
				text: "{{#invoke:TeamnamesDuplicatesFinder|getWarnings|" + page + "}}",
				prop: "text",
				title: mw.config.get('wgPageName')
			}).then(function(data) {
				var output = data.parse.text["*"];
				window.reportError(output);
				var $parsedOutput = $($.parseHTML(output));
				var $parsedDiv = $parsedOutput.find("#lua-output");
				if ($parsedDiv.hasClass("duplicate-warnings")) {
					return $.Deferred().reject();
				} else {
					return $.Deferred().resolve();
				}
			})
		}

		function reportSuccess() {
			console.log("Done!");
			displayColor(statusColorSuccess, 'ca-refresh-teamnames-page');
		}

		function reportFailure() {
			console.log("failed");
			displayColor(statusColorError, 'ca-refresh-teamnames-page');
		}

		return queryForDuplicates()
			.then(blankEditIfNeeded, reportFailure)
			.then(getAndPrintWarnings, reportFailure)
			.then(doRefresh, reportFailure)
			.then(logAction, reportFailure)
			.then(reportSuccess, reportFailure);
	}
	
	$(mw.util.addPortletLink('p-views', 'javascript:;', 'Refresh Page Teamnames', 'ca-refresh-teamnames-page', 'Refresh Page Teamnames')).click(function() {
			return refreshTeamnames('ca-refresh-teamnames-page', mw.config.get('wgPageName'));
	});
	
	moveToPViews($('#ca-refresh-teamnames-page'));
	
});

// </nowiki>