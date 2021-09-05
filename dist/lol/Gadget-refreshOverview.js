// <nowiki>
$(function () {
	var dataDiv = document.getElementById('data-ns-pageinfo');
	if (! dataDiv) return;
	var $dataDiv = $(dataDiv);
	var overviewPage = $dataDiv.attr('data-overviewpage');
	// add refresh data link
	$(mw.util.addPortletLink('p-views', 'javascript:;', 'Refresh Overview', 'ca-refresh-overview', 'Refresh event overview page', '2')).click(function() {
		$('body').css('cursor', 'wait');
		var a = new mw.Api();
		
		function getWikitextFromTemplateAndSave() {
			if (! flPages.length ) return $.Deferred().resolve();
			var thisFlPage = flPages.pop();
			var thisFlTemplate = flTemplates.pop();
			console.log(thisFlPage);
			return a.postWithToken('csrf',{
				action : 'expandtemplates',
				prop : 'wikitext',
				text : '{{' + thisFlTemplate + '}}'
			}).then(function(data) {
				saveWikitext(data.expandtemplates.wikitext, thisFlPage);
			}, raiseError).then(getWikitextFromTemplateAndSave);
		}
		
		function saveWikitext(wikitext, thisFlPage) {
			if (! wikitext) {
				console.log('wikitext was empty');
				return $.Deferred().resolve();
			}
			console.log('saving wikitext...');
			return a.postWithToken('csrf',{
				action : 'edit',
				title : thisFlPage,
				text : wikitext,
				summary : 'Auto update via Refresh Overview',
				tags: 'refresh_overview'
			}).then(function(data) {
				console.log('saved wikitext to ' + thisFlPage);
			}, raiseError);
		}
		
		// update pickban
		function getPBData() {
			if (! $dataDiv.attr('data-pickban')) return $.Deferred().resolve();
			console.log('Fetching Pick/Ban Data...');
			return a.get({
				action : 'parse',
				text : '{{' + '#invoke:PickBanScore|main|page=' + overviewPage + '}}',
				prop : 'text'
			}).then(function(data) {
				var str = data.parse.text['*'];
				if (str.includes('Lua error')) {
					window.reportError("Error updating pick-ban, it's likely that the order doesn't match the MatchSchedule! Perhaps you need to add a |notab=yes? We will now print the error that was detected.");
					window.reportError(str);
					return $.Deferred().reject();
				}
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
			var templatesToChange = [ makeGameDict(game) ];
			while (tbl.length > 0 && tbl[0][0] == page) {
				templatesToChange.push(makeGameDict(tbl.shift()));
			}
			console.log(templatesToChange);
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
				var listOfTemplates = content.split(/\{\{PicksAndBans(?!\/)/);
				for (i in templatesToChange) {
					var thisgame = templatesToChange[i];
					// don't have to offset by 1 because the first one (0) is before any template
					var template = listOfTemplates[thisgame.N];
					template = template.replace(/\|team1score=\s*\|/, '|team1score=' + thisgame.score1 + ' |')
					template = template.replace(/\|team2score=\s*\|/, '|team2score=' + thisgame.score2 + ' |')
					template = template.replace(/\|winner=(\s*)\|/,'|winner=' + thisgame.winner + ' $1|');
					listOfTemplates[thisgame.N] = template;
					if (thisgame.bestof && thisgame.serieswinner) {
						deleteExtraGames(listOfTemplates, thisgame, template);
					}
				}
				
				var text = listOfTemplates.join('{{PicksAndBans');
				text = text.replace(/\{\{PicksAndBansDELETE/g,'<!-- -->');
				return a.postWithToken('csrf', {
					action : 'edit',
					title : page,
					text : text,
					summary : 'Updating pick-ban results via RefreshOverview',
					tags: 'refresh_overview'
				}).then(function(data) {
					if (tbl.length == 0) {
						return window.purgeTitle(overviewPage + '/Picks and Bans');
					}
					return updatePB(tbl);
				}, raiseError);
			}, raiseError);
		}
		
		function raiseError(code, data) {
			console.log(data);
			statuscolor = 'gadget-action-fail';
			$('body').css('cursor', '');
			return $.Deferred().reject(code);
		}
		
		function makeGameDict(game) {
			return {
				N : parseInt(game[1]),
				score1 : game[2],
				score2 : game[3],
				winner : game[4],
				bestof : parseInt(game[5]),
				serieswinner : parseInt(game[6]),
				team1name: game[7], // only for debugging purposes
				team2name: game[8], // only for debugging purposes
			}
		}
		
		function deleteExtraGames(listOfTemplates, thisgame, template) {
			var score1 = parseInt(thisgame.score1);
			var score2 = parseInt(thisgame.score2);
			score1 = score1 ? score1 : 0;
			score2 = score2 ? score2 : 0;
			var largerScore = Math.max(score1, score2);
			if (largerScore > thisgame.bestof / 2) {
				// console.log('Game to delete found!');
				// console.log(template);
				// console.log(thisgame);
				if (template.toLowerCase().search('box') !== -1) {
					// this means that there's a box|break or box|end immediately after the last pick-ban game
					// this occurs if someone manually prunes some games not using RO
					console.log('It appears deletion has already occurred for this series.');
					return;
				}
				for (j = 1; j <= thisgame.bestof - score1 - score2; j++) {
					var indexToDelete = thisgame.N + j;
					var templateToDelete = listOfTemplates[indexToDelete];
					if (templateToDelete && templateToDelete.match(/game1\s*=\s*Yes/i)) {
						// I'm pretty sure this condition will never occur anymore because the
						// deletion already occurred for this series check is actually the correct
						// check for whether we should be skipping or not, and it supercedes
						// but I'm not about to delete a check that was previously needed when there's
						// no unit tests in place so this is staying here forever lol
						console.log("Won't delete " + indexToDelete + " because it contains a game 1. Score: " + largerScore + ', bestof: ' + thisgame.bestof);
					}
					else if (templateToDelete) {
						console.log('Will delete ' + indexToDelete + ', score: ' + largerScore + ', bestof: ' + thisgame.bestof);
						templateToDelete = templateToDelete.replace(/[^\}]*\}\}/,'DELETE');
						listOfTemplates[indexToDelete] = templateToDelete;
					}
					else {
						console.log('Extra games were already deleted');
					}
				}
			}
		}
		
		// timeline update
		function updateTimeline() {
			if (! $dataDiv.attr('data-timeline')) return $.Deferred().resolve();
			console.log('checking timeline...');
			return getWikitext(overviewPage)
			.then(updateWikitextWithTimeline)
			.then(function(newtext) {
				if (! newtext) return $.Deferred().resolve();
				return new mw.Api().postWithToken('csrf', {
					action : 'edit',
					title : overviewPage,
					text : newtext,
					summary : 'Auto update via Refresh Overview',
					tags : 'refresh_overview'
				});
			});
		}
		
		function updateWikitextWithTimeline(wikitext) {
			console.log('getting timeline args...');
			if (! wikitext.includes('AutoTimeline') || ! wikitext.includes('AutoStandings')) return $.Deferred().resolve();
			console.log('timeline can be checked');
			function getAllMatches(str, regex) {
				try {
					return Array.from(str.matchAll(regex)).map(function(m) { return m[1]; });
				}
				catch (e) {
					alert('Please use the latest version of Firefox or Chrome to support str.matchAll.');
					console.error('matchAll not supported by this browser version');
				}
			}
			var standingsTemplates = getAllMatches(wikitext, /AutoStandings((?:.|\n)+?)\}\}/g);
			var timelineTemplates = getAllMatches(wikitext, /(AutoTimeline(?:.|\n)+?)\}\}/g);
			var appendTemplates = standingsTemplates.map(function(tl) {
				// require that the row has a non-empty value (but it might be padded by a space at the start)
				return getAllMatches(tl, /(\|row\d+=(?:.*[^ \n]+))/g);
			});
			console.log(standingsTemplates.length);
			console.log("standingsTemplates.length");
			if (standingsTemplates.length != timelineTemplates.length) {
				window.reportError('Number of standings templates doesn\'t match number of timeline templates!');
				return $.Deferred().reject();
			}
			return a.get({
				action : 'cargoquery',
				tables : 'MatchSchedule',
				where : 'OverviewPage="' + overviewPage + '" AND Winner IS NOT NULL AND IsTiebreaker != "1"',
				fields : 'Tab',
				group_by : 'N_Page, N_TabInPage'
			}).then(function(data) {
				console.log(data.cargoquery.length + ' tabs counted');
				var repl = 'w' + data.cargoquery.length + 'bg';
				var old_data_re = new RegExp('\\|' + repl + '[^\|\n]*\n', 'g');
				var newtext = wikitext;
				for (i in appendTemplates) {
					var rows = appendTemplates[i].map(function(row) { return row.replace('row', repl); });
					var newText = rows.join('\n');
					var newTimeline = timelineTemplates[i].replace(old_data_re, '');
					console.log(newTimeline);
					if (newText != '') {
						newTimeline = newTimeline.replace('AutoTimeline', 'AutoTimeline\n' + newText);
					}
					console.log(newTimeline);
					newtext = newtext.replace(timelineTemplates[i], newTimeline);
				}
				if (newtext == wikitext) return false;
				alert('Updating timeline, might take some time to finish');
				return newtext;
			});
		}
		
		function logAction() {
			console.log('writing custom log...');
			return new mw.Api().postWithToken('csrf', {
				action: 'customlogswrite',
				logtype: 'ro-tournament',
				title: mw.config.get('wgPageName'),
				publish: 1,
				'custom-1': overviewPage,
			});
		}
		
		clearDisplayColor('ca-refresh-overview');
		// make sure to include : before the template name in the attr if needed
		var flTemplates = $dataDiv.attr('data-template-link') ? $dataDiv.attr('data-template-link').split(',') :[];
		var flPages = $dataDiv.attr('data-page-link') ? $dataDiv.attr('data-page-link').split(',') : [];
		var pagesToPurge = $dataDiv.attr('data-extra-purges') ? $dataDiv.attr('data-extra-purges').split(',') : [];
		pagesToPurge.unshift(overviewPage);
		var statuscolor = 'gadget-action-success';
		window.purgeAll(pagesToPurge)
		//.then(window.blankEdit)
		.then(getWikitextFromTemplateAndSave)
		.then(function() {
			window.purgeAll([mw.config.get('wgMainPageTitle')]);
		})
		.then(getPBData)
		.then(updatePB)
		.then(updateTimeline)
		.then(logAction)
		.then(function() {
			console.log('Done!');
			$('body').css('cursor', '');
			displayColor(statuscolor, 'ca-refresh-overview');
		})
		['catch'](function(code) {
			console.log('failed rip');
			if (code) console.log(code);
			$('body').css('cursor', '');
			displayColor(statuscolor, 'ca-refresh-overview');
		});
	});
	
	// move RO button into place in FandomDesktop
	moveToPViews($('#ca-refresh-overview'));
});

$(function() {
	
	var i18n = {
		confirm_not_rumor_resolve: 'Are you sure? This was a "not happening" rumor.'
	}
	
	function pageToDisplay(page) {
		return '<input type="checkbox" name="' + page + '"> ' + page.replace(/.*\/(.*?)$/, '$1');
	}
	
	function getAllRegions() {
		if (! $('#current-portal-list')) return [];
		var list = $('#current-portal-list').attr('data-current-portals');
		if (list == '' || ! list) return [];
		return list.split(',');
	}
	
	function getRegionsText() {
		var buttonList = getAllRegions().map(pageToDisplay);
		if (! buttonList.length) return '';
		return buttonList.join('<br>') + '<br>';
	}
	
	function refreshNewsDataPages(e) {
		e.preventDefault();
		e.stopPropagation();
		var $container = $(this).closest('.news-data-ro');
		var $inner = $(this).closest('.popup-content-inner-action');
		
		// get list of pages to touch
		var pageListTouch = [];
		if ($container.attr('data-to-touch')) {
			pageListTouch = $container.attr('data-to-touch').split(',')
		}
		var touches = pageListTouch.map(window.blankEdit);
		
		// construct full list of pages to purge
		var pageListPurge = $container.attr('data-to-refresh').split(',');
		$container.find('input').each(function() {
			if (this.checked) {
				pageListPurge.push($(this).attr('name'));
				pageListPurge.push($(this).attr('name') + '/Current Rosters');
			}
		});
		var purges = pageListPurge.map(window.purgeTitle);
		
		
		return Promise.all(touches).then(function() {
			return Promise.all(purges);
		}).then(function() {
			return new mw.Api().postWithToken('csrf', {
				action: 'customlogswrite',
				logtype: 'ro-news',
				title: mw.config.get('wgPageName'),
				publish: 1,
				'custom-1': $inner.closest('.news-data-sentence-div').find('.news-data-sentence-wrapper').text(),
				'custom-2': $container.attr('data-ro-team')
			});
		}).then(function() {
			console.log(pageListTouch);
			console.log(pageListPurge);
			console.log('done!');
			displayResultStatus('gadget-action-success', $inner);
		});
	}
	
	$('.news-data-ro').off('click');
	$('.roster-change-data .news-data-ro').click(function(e) {
		e.stopPropagation();
		var $inner = $(this).find('.popup-content-inner-action');
		$inner.click(function(e) { e.stopPropagation(); });
		$inner.html(getRegionsText() + '<button class="submit-ro">RO!</button>');
		$inner.find('.submit-ro').click(refreshNewsDataPages);
		$(this).off('click');
		$(this).click(window.popupButton);
		
		window.popupButton.bind(this)(e);
	});
	
	$('.rumor-data .news-data-ro').click(function(e) {
		e.stopPropagation();
		var $inner = $(this).find('.popup-content-inner-action');
		$inner.click(function(e) { e.stopPropagation(); });
		$inner.html('<button class="submit-ro">RO!</button>');
		$inner.find('.submit-ro').click(function(e) {
			var $button = $(this).closest('.news-data-ro');
			e.stopPropagation();
			e.preventDefault();
			if (
				$button.attr('data-is-no') == 'true' &&
				$button.attr('data-is-over') == 'true' &&
				! confirm(i18n.confirm_not_rumor_resolve)
			) {
				return;
			}
			else {
				refreshNewsDataPages.bind(this)(e);
			}
		});
		$(this).off('click');
		$(this).click(window.popupButton);
		
		window.popupButton.bind(this)(e);
	});
	
	$('.team-members-refresh').click(function(e) {
		e.stopPropagation();
		window.startSpinnerChild(this);
		return window.blankEdit($(this).attr('data-player'))
			.then(function() {
				return window.purgeTitle().then(function() {
					if (confirm('Player refreshed! Would you like to reload?')) {
						location.reload();
					}
					else {
						window.endSpinner();
					}
					return;
				});
			});
	});
});


// </nowiki>