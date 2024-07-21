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

		function raiseError(code, data) {
			console.log(data);
			statuscolor = 'gadget-action-fail';
			$('body').css('cursor', '');
			return $.Deferred().reject(code);
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
				'custom1': overviewPage,
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
	
	function getPlayerRedirects(pageListTouch) {
		if (pageListTouch.length === 0) {
			return Promise.resolve([]);
		}
		
		var wherePageList = pageListTouch.map(function(e) {
			return '"' + e + '"';
		});
		
		return new mw.Api().get({
			action : 'cargoquery',
			tables : 'PlayerRedirects',
			where : 'AllName IN (' + wherePageList.join(", ") + ')',
			fields : 'OverviewPage',
			group_by : 'OverviewPage'
		}).then(function(data) {
			var redirects = [];
			data.cargoquery.forEach(function(page){
				var title = page.title.OverviewPage;
				if (!pageListTouch.includes(title) && !pageListTouch.includes(title.charAt(0).toLowerCase() + title.slice(1))) {
					redirects.push(title);
				};
			});
			return redirects;
		});
	}
	
	function refreshNewsDataPages(e) {
		e.preventDefault();
		e.stopPropagation();
		var $container = $(this).closest('.news-data-ro');
		var $inner = $(this).closest('.popup-content-inner-action');
		
		// get list of pages to touch
		var pageListTouch = [];
		if ($container.attr('data-to-touch')) {
			pageListTouch = $container.attr('data-to-touch').split(',');
		}

		// construct full list of pages to purge
		var pageListPurge = $container.attr('data-to-refresh').split(',');
		$container.find('input').each(function() {
			if (this.checked) {
				pageListPurge.push($(this).attr('name'));
				pageListPurge.push($(this).attr('name') + '/Current Rosters');
			}
		});

		return getPlayerRedirects(pageListTouch)
		.then(function(redirects) {
			redirects.forEach(function(e) {
				pageListTouch.push(e);
				pageListPurge.push(e);
			});
	
			var touches = pageListTouch.map(window.blankEdit);
	
			var purges = pageListPurge.map(window.purgeTitle);
	
			return Promise.all(touches).then(function() {
				return Promise.all(purges);
			}).then(function() {
				return new mw.Api().postWithToken('csrf', {
					action: 'customlogswrite',
					logtype: 'ro-news',
					title: mw.config.get('wgPageName'),
					publish: 1,
					'custom1': $inner.closest('.news-data-sentence-div').find('.news-data-sentence-wrapper').text(),
					'custom2': $container.attr('data-ro-team')
				});
			}).then(function() {
				console.log(pageListTouch);
				console.log(pageListPurge);
				console.log('done!');
				displayResultStatus('gadget-action-success', $inner);
			});
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