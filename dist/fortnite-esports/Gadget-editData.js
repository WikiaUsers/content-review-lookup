// <nowiki>
$( function () {
	var dataDiv = document.getElementById('datapage-info')
	if (! dataDiv) {
		return;
	}
	
	$('#firstHeading').wrapInner("<div style='display:inline-block'></div>");
	
	var $dataDiv = $(dataDiv);
	var overviewPage = $dataDiv.attr('data-overviewpage');
	var wgServer = mw.config.get('wgServer');
	
	function addLink(text, target) {
		var editlink = document.createElement('a');
		var edittext = document.createTextNode(text);
		editlink.appendChild(edittext);
		editlink.href = wgServer + '/Data:' + target;
		$(editlink).addClass('editlink');
		$('#firstHeading').append(editlink);
	}
	
	var maxPages = parseInt($dataDiv.attr('data-datapages'));
	addLink('view data', overviewPage);
	for (i = 2; i <= maxPages; i++) {
		addLink('page ' + i, overviewPage + '/' + i);
	}
});

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
		
		function getPBData() {
			if (! $dataDiv.attr('data-pickban')) return $.Deferred().resolve();
			console.log('Fetching Pick/Ban Data...');
			return a.get({
				action : 'parse',
				text : '{{' + '#invoke:PickBanScore|main|page=' + overviewPage + '}}',
				prop : 'text'
			}).then(function(data) {
				var str = data.parse.text['*'];
				console.log(str);
				var tbl1 = str.split('*****');
				str = tbl1[1];
				console.log(str);
				var tbl = str.split(';');
				for (game in tbl) {
					tbl[game] = tbl[game].split(',');
				}
				return tbl;
			});
		}
		
		function updatePB(tbl) {
			console.log('updatepb');
			if (! tbl || tbl.length == 0 || tbl[0] == '') {
				console.log('No PB to update');
				return $.Deferred().resolve();
			}
			var game = tbl.shift();
			var page = game[0];
			var page_data = [ makeGameDict(game) ];
			while (tbl.length > 0 && tbl[0][0] == page) {
				page_data.push(makeGameDict(tbl.shift()));
			}
			return a.get({
				action : 'query',
				prop : 'revisions',
				titles : page,
				rvprop : 'content'
			}).then(function(data) {
				var content;
				for (p in data.query.pages) {
					content = data.query.pages[p].revisions[0]["*"];
				}
				var str_tbl = content.split('{{PicksAndBansS7');
				for (i in page_data) {
					var g = page_data[i];
					// don't have to offset by 1 because the first one (0) is before any template
					var str = str_tbl[g.N];
					str = str.replace(/\|team1score=\s*\|/, '|team1score=' + g.score1 + ' |')
					str = str.replace(/\|team2score=\s*\|/, '|team2score=' + g.score2 + ' |')
					str = str.replace(/\|winner=(\s*)\|/,'|winner=' + g.winner + ' $1|');
					str_tbl[g.N] = str;
				}
				
				var text = str_tbl.join('{{PicksAndBansS7');
				return a.postWithToken('csrf', {
					action : 'edit',
					title : page,
					text : text,
					summary : 'Updating pick-ban results via RefreshOverview',
					tags: 'refresh_overview'
				}).then(function(data) {
					return updatePB(tbl);
				}, raiseError);
			}, raiseError);
		}
		
		function raiseError(code, data) {
			console.log(code);
			statuscolor = 'gadget-action-fail';
			return $.Deferred().reject(code);
		}
		
		function makeGameDict(game) {
			return { N : parseInt(game[1]), score1 : game[2], score2 : game[3], winner : game[4] }
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
		.then(getPBData)
		.then(updatePB)
		.then(function() {
			console.log('Done!');
			displayColor(statuscolor, 'ca-refresh-overview');
		})
		.fail(function(code) {
			console.log('failed rip');
			if (code) console.log(code);
			displayColor(statuscolor, 'ca-refresh-overview');
		});
	});
	
});
// </nowiki>