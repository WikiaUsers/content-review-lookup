(function () {

var firstRun = true;

if (mw.config.get('wgCanonicalSpecialPageName') === 'Watchlist') {
	// Polyfill
	if (!String.prototype.includes) {
		String.prototype.includes = function (search, start) {
			'use strict';
			if (typeof start !== 'number') {
				start = 0;
			}
			
			if (start + search.length > this.length) {
				return false;
			} else {
				return this.indexOf(search, start) !== -1;
			}
		};
	}
	
	var SECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
	
	var whenPageLoadedOrUpdated;
	var hideInterfaceCSS, rvOffCSS;
	var sortingDone, allStarsShown, hoverOnTitlesDone;
	
	// ruwiki strings
	var strings = {
		watch: 'Следить',
		unwatch: 'Не следить',
		sortTip: 'Сортировать изменения по пространствам имён',
		sortDone: 'Изменения уже отсортированы',
		unwatchTip: 'Добавить/убрать звёздочки для вычёркивания страниц из списка наблюдения',
		newOnly: 'Только новые',
		newOnlyTip: 'Изменения с момента загрузки этой страницы',
		watchlistTabNewOnlyTip: 'По клику откроются изменения с момента загрузки этой страницы',
		all: 'Все',
		allTip: 'Все изменения',
		expandAll: 'Показать/спрятать все свёрнутые правки',
		switchRevert: 'Спрятать/показать ссылки «откатить»',
		fullPage: 'Спрятать/показать элементы интерфейса',
		error: 'Ошибка',
		unrecognizedReponse: 'ответ не распознан'
	};
	
	mw.hook('wikipage.content').add(function ($content) {
		function main() {
			/* FUNCTIONS */
			
			function addLink(contents, tip, classes, href) {
				return $('<a>')
					.attr('href', href || 'javascript:')
					.attr('title', tip)
					.addClass(classes)
					.append(contents)
					.appendTo($linksIn);
			}
			
			function generateNewEntriesOnlyUrl() {
				var uri = new mw.Uri();
				uri.query.from = whenPageLoadedOrUpdated;
				delete uri.query.days;
				return uri.toString();
			}
			
			function generateAllEntriesUrl() {
				var uri = new mw.Uri();
				delete uri.query.from;
				return uri.toString();
			}
			
			function newEntriesOnly(e) {
				e.target.href = generateNewEntriesOnlyUrl();
			}
			
			function allEntries(e) {
				e.target.href = generateAllEntriesUrl();
			}
			
			function showAllStars(e) {
				if (e) {
					e.preventDefault();
				}
				// cookie set = stars are on
				if (!allStarsShown) {
					$changeslist.find('.mw-title')
						.each(function (i, link) {
							updateStar(getRow($(this)));
						});
					if (e) {
						var cookieDate = new Date($.now() + SECONDS_IN_A_DAY * 90).toGMTString();
						document.cookie = 'wlunw=1; expires=' + cookieDate + '; path=/';
					}
					allStarsShown = true;
				} else {  // otherwise remove
					$changeslist.find('.gadgetWatchlist-unwatchLink').remove();
					document.cookie = 'wlunw=0; expires=' + (new Date()).toGMTString() + '; path=/';
					if (!hoverOnTitlesDone) {
						bindHoverOnTitles();
					}
					allStarsShown = false;
				}
			}
			
			function sortWatchlist(e) {
				e.preventDefault();
				if (sortingDone) {
					alert(strings.sortDone);
					return;
				}
				$changeslist.find('h4').each(function () {  // sort all days separately
					var $container = $(this).next('div, ul');
					var $rows = $container.children('li, table');
					// create sorting keys
					var key;
					$rows.each(function (i) {
						// use built-in class: either li.watchlist-5-<title> or
						// table.mw-changeslist-ns100-<title> in enhanced recent changes
						key = /(\d+)-(\S+)/.exec(this.className) || ['', 0, ' '];  // logs might not have this class
						if (key[1] % 2) {
							key[1]--;  // sort talk page as if it was a base page
						}
						if (window.watchlistSortNamespaceOnly) {
							key[2] = zzz(i);  // keep timestamp order within each NS block
						}
						this.skey = zzz(key[1]) + ':' +  key[2];
					});
					// sort array and then HTML
					$rows.sort(function (a, b) {
						return a.skey > b.skey ? 1 : (a.skey < b.skey ? -1 : 0);
					});
					for (i = 0; i < $rows.length; i++) {
						$container.append($rows.eq(i));
					}
				});
				$('.mw-rcfilters-ui-changesListWrapperWidget-previousChangesIndicator').remove();
				sortingDone = true;
			}
			
			function expandMultipleEdits(e) {
				e.preventDefault();
				var $collapsibles = $('.mw-changeslist .mw-collapsible:not(.mw-changeslist-legend)');
				// If at lease one branch is collapsed, we expand everything.
				$collapsibles
					[$collapsibles.hasClass('mw-collapsed') ? 'filter' : 'not']('.mw-collapsed')
					.find('.mw-enhancedchanges-arrow')
					.click();
			}
			
			function switchRevert(e) {
				if (e) {
					e.preventDefault();
				}
				if (!rvOffCSS) {
					rvOffCSS = mw.util.addCSS('\
						.mw-rollback-link {\
							display: none;\
						}\
					');
				} else {
					rvOffCSS.disabled = !rvOffCSS.disabled;
				}
				if (rvOffCSS.disabled) {
					document.cookie = 'wlrvoff=0; expires=' + (new Date()).toGMTString() + '; path=/';
				} else if (e) {
					var cookieDate = (new Date($.now() + SECONDS_IN_A_DAY * 90)).toGMTString();
					document.cookie = 'wlrvoff=1; expires=' + cookieDate + '; path=/';
				}
			}
			
			function bindHoverOnTitles() {  // find all title links and assign hover event
				if (hoverOnTitlesDone) return;
				$changeslist.find('.mw-title')
					.each(function () {
						getRow($(this))
							.find('.mw-title')
							.children('a')
							.hover(hoverOnTitle);
					});
				hoverOnTitlesDone = true;
			}
			
			function hoverOnTitle(e) {  // on hover: add "unwatch" star after 1 second
				var $link = $(this);
				if (e.type === 'mouseenter') {
					$link.data('unwatchTimeout', setTimeout(function () {
						showStarOnHover($link);
					}, 1000));
				} else {
					clearTimeout($link.data('unwatchTimeout'));
				}
			}
			
			function showStarOnHover($link) {
				var $row = getRow($link);
				updateStar($row);
				// attach mouseleave to remove the star
				if ($row.data('leaveAssigned')) return;
				$row.data('leaveAssigned', true);
				$row.mouseleave(function (e) {
					var $unwatchLink = $(this).find('.gadgetWatchlist-unwatchLink');
					if ($unwatchLink.length &&
						!($unwatchLink.hasClass('gadgetWatchlist-failure') ||
							$unwatchLink.hasClass('gadgetWatchlist-waiting')
						) &&
						!allStarsShown
					) {
						$unwatchLink.remove();
					}
				});
			}
			
			function updateStar($row) {
				var action = $row.hasClass('gadgetWatchlist-unwatchedRow') ? 'watch' : 'unwatch';
				var $star = $row.find('.gadgetWatchlist-unwatchLink, .gadgetWatchlist-watchLink');
				if (!$star.length) {  // create
					var $link = $row.find('.mw-title').children('a');
					if (!$link.length) return;
					$star = $('<a>')
						.attr('href', $link.attr('href').replace(/\/wiki\//, '/w/index.php?title=') + '&action=' +
							action)
						.addClass('gadgetWatchlist-' + action + 'Link gadgetWatchlist-icon')
						.click(changeWatchState)
						.insertBefore($link);
				} else {  // update
					$star
						.attr('href', $star
							.attr('href')
							.replace(/&action=\w+/, '&action=' + action))
						.removeClass('gadgetWatchlist-' + (action === 'unwatch' ? 'watch' : 'unwatch') + 'Link')
						.addClass('gadgetWatchlist-' + action + 'Link');
				}
				$star.attr('title', mw.messages.get(action) || strings[action]);
			}
			
			function getRow($el) {
				return $el.closest(isEnhanced ? 'tr' : 'li');
			}
			
			function changeWatchState(e) {
				var $star = $(this), errorMsg = '';
				var req = {
					token: mw.user.tokens.get('watchToken'),
					title: getLinkTitle($star)
				};
				var action;
				if ($star.attr('href').includes('&action=unwatch')) {
					req.unwatch = '';
					action = 'unwatch';
				} else {
					action = 'watch';
				}
				$star
					.removeClass('gadgetWatchlist-failure')
					.addClass('gadgetWatchlist-waiting');
				$.ajax({
					type: 'POST',
					dataType: 'json',
					url: mw.util.wikiScript('api') + '?action=watch&format=json',
					data: req,
					timeout: 5000,
					success: function (resp) {
						if (resp.error) {
							errorMsg = resp.error.info;
						} else if (!resp.watch) {
							errorMsg = 'empty response';
						} else if (typeof resp.watch.unwatched === 'string') {
							changeWatchStateSuccess(req.title, true);
						} else if (typeof resp.watch.watched === 'string') {
							changeWatchStateSuccess(req.title, false);
						} else {
							errorMsg = strings.unrecognizedReponse;
						}
					},
					error: function (xhr, status, error) {
						errorMsg = status + ':' + error;
					},
					complete: function () {  // update unwatch link
						$star.removeClass('gadgetWatchlist-waiting');
						if (errorMsg) {
							$star
								.attr('title', strings.error + ': ' + errorMsg)
								.addClass('gadgetWatchlist-failure gadgetWatchlist-' + action + 'Link');
						}
					}
				});
				e.preventDefault();
				return false;
			}
			
			function changeWatchStateSuccess(name, isUnwatched) {
				// find full name of associated talk page (or vice versa)
				var ns = getTitleNamespace(name);
				var name2 = name;
				if (ns > 0) {
					name2 = name2.replace(/^.+?:/, '');  // remove old prefix
				}
				ns = ns % 2 ? ns - 1 : ns + 1;  // switch to associated namespace
				if (ns > 0) {
					name2 = mw.config.get('wgFormattedNamespaces')[ns] + ':' + name2;  // add new prefix
				}
				// mark all rows that are either name or name2
				$changeslist.find('.mw-changeslist-title').each(function () {
					var title = getLinkTitle($(this));
					if (title !== name && title !== name2) return;
					var $row = getRow($(this));
					$row.toggleClass('gadgetWatchlist-unwatchedRow', isUnwatched);
					if (!isUnwatched && !allStarsShown) {
						$row.find('.gadgetWatchlist-watchLink').remove();
					} else {
						updateStar($row);
					}
				});
			}
			
			function hideInterface(e) {
				if (e) {
					e.preventDefault();
				}
				
				var hideInterfaceCSSCode = '\
					#firstHeading,\
					div#siteNotice,\
					#contentSub,\
					.mw-wlheader-showupdated,\
					fieldset#mw-watchlist-options,\
					div.mw-rc-label-legend,\
					#mw-fr-watchlist-pending-notice,\
					.mw-indicators,\
					.mw-rcfilters-ui-filterTagMultiselectWidget,\
					.mw-rcfilters-ui-watchlistTopSectionWidget-savedLinksTable,\
					.mw-rcfilters-ui-watchlistTopSectionWidget-editWatchlistButton,\
					.mw-rcfilters-ui-watchlistTopSectionWidget-separator {\
						display: none;\
					}\
					\
					.client-js .mw-special-Watchlist .rcfilters-head.rcfilters-head {\
						min-height: auto;\
					}\
				';
				
				if (!hideInterfaceCSS) {
					// If the new filters are on, wait until the interface is initialized.
					if (!mw.user.options.get('wlenhancedfilters-disable')) {
						hideInterfaceCSS = mw.util.addCSS(hideInterfaceCSSCode);
						$('.mw-rcfilters-ui-markSeenButtonWidget')
							.wrap('<div>')
							.parent()
							.addClass('mw-rcfilters-ui-markSeenButtonWidget-container')
							.appendTo('.mw-rcfilters-ui-watchlistTopSectionWidget-watchlistDetails');
					} else {
						hideInterfaceCSS = mw.util.addCSS(hideInterfaceCSSCode);
					}
				} else {
					hideInterfaceCSS.disabled = !hideInterfaceCSS.disabled;
					if (!mw.user.options.get('wlenhancedfilters-disable')) {
						$('.mw-rcfilters-ui-markSeenButtonWidget-container')
							.appendTo(hideInterfaceCSS.disabled ?
								'.mw-rcfilters-ui-watchlistTopSectionWidget-savedLinksTable .mw-rcfilters-ui-cell:first-child' :
								'.mw-rcfilters-ui-watchlistTopSectionWidget-watchlistDetails');
					}
				}
				
				if (e) {
					if (!hideInterfaceCSS.disabled) {
						var cookieDate = new Date($.now() + SECONDS_IN_A_DAY * 90).toGMTString();
						document.cookie = 'wlmax=1; expires=' + cookieDate + '; path=/';
					} else {
						document.cookie = 'wlmax=0; expires=' + (new Date()).toGMTString() + '; path=/';
					}
				}
			}
			
			function getTitleNamespace(title) {  // returns namespace number
				var prefix = /^(.+?):/.exec(title);
				if (!prefix) {
					return 0;  // no prefix means article
				}
				return mw.config.get('wgNamespaceIds')[ prefix[1].toLowerCase().replace(/ /g, '_') ] || 0;
			}
			
			function getLinkTitle($link) {  // gets title for unwatch/watch links & common page links
				// Titles can be absent for .mw-changeslist-title elements because of Popups extension.
				var title = $link.filter('.mw-changeslist-title').attr('title');
				
				if (!title) {
					title = mw.util.getParamValue('title', $link.attr('href'));
					title = title && title.replace(/_/g, ' ');
				}
				
				if (!title) {
					title = $link.filter('.mw-changeslist-title').text();
				}
				
				return title;
			}
			
			function zzz(s) {  // 5 -> 005
				s = s.toString();
				if (s.length === 1) {
					return '00' + s;
				} else if (s.length === 2) {
					return '0' + s;
				} else {
					return s;
				}
			}
			
			function zeroPad(n, p) {
				return ('0000' + n).slice(-p);
			}
			
			function generateTimestamp(date) {
				return (
					zeroPad(date.getUTCFullYear(), 4) +
					zeroPad(date.getUTCMonth() + 1, 2) +
					zeroPad(date.getUTCDate(), 2) +
					zeroPad(date.getUTCHours(), 2) +
					zeroPad(date.getUTCMinutes(), 2) +
					zeroPad(date.getUTCSeconds(), 2)
				);
			}
			
			
			/* MAIN BLOCK */
			
			// add 5–20 seconds just in case (for example, the scripting could take too much)
			whenPageLoadedOrUpdated = generateTimestamp(new Date(new Date().getTime() - (firstRun ? 20000 : 5000)));
			
			sortingDone = false;
			allStarsShown = false;
			hoverOnTitlesDone = false;
			
			// UNWATCH LINKS
			// on every line
			if (document.cookie.includes('wlunw=1')) {
				showAllStars();
			} else {
				bindHoverOnTitles();  // mouseover on title
			}
			
			if (firstRun) {
				if (document.cookie.includes('wlrvoff=1')) {
					switchRevert();
				}
				
				// find insertion point for links
				$linksIn = $('<div>')
					.addClass('mw-rcfilters-ui-cell gadgetWatchlist-linksContainer')
					.insertBefore($(
						!mw.user.options.get('wlenhancedfilters-disable') ?
							'.mw-rcfilters-ui-watchlistTopSectionWidget-savedLinks' :
							'.wlinfo'
					));
				
				// "show all stars" link
				addLink('', strings.unwatchTip, 'gadgetWatchlist-icon gadgetWatchlist-icon-unwatched')
					.click(showAllStars);
				
				// FUNCTION LINKS
				// "sort" link
				addLink('↑↓', strings.sortTip).click(sortWatchlist);
				
				// "expand all" link
				// Auto-update could be used, so even if there is no $('.mw-enhancedchanges-arrow') elements, we keep
				// the button.
				if (isEnhanced) {
					addLink('±', strings.expandAll).click(expandMultipleEdits);
				}
				
				// "switch revert" link
				if (mw.config.get('wgUserGroups').indexOf('rollbacker') !== -1 ||
					mw.config.get('wgUserGroups').indexOf('sysop') !== -1
				) {
					addLink('⎌', strings.switchRevert).click(switchRevert);
				}
				
				// "new only" link
				addLink(strings.newOnly, strings.newOnlyTip, undefined, generateNewEntriesOnlyUrl())
					.mousedown(newEntriesOnly);
				
				if (mw.util.getParamValue('from') !== null) {
					// "all" link
					addLink(strings.all, strings.allTip, undefined, generateAllEntriesUrl()).mousedown(allEntries);
				}
				
				// TABS
				if (!window.wlNoTabs) {
					var $mainTab = $('#ca-nstab-special').first();  // "Special" tab
					
					// change main tab into "watchlist Δ"
					var watchlistTitle = $.trim($('#firstHeading').text());
					$mainTab
						.find('a')  // replace "Special" with "Watchlist" as tab text
						.text(watchlistTitle + ' △')  // Δ is good but monobook makes is lowercase
						.attr('title', strings.watchlistTabNewOnlyTip)
						.attr('href', generateNewEntriesOnlyUrl())
						.on('mousedown keydown', newEntriesOnly);
					
					// add "hideInterface" tab
					$mainTab
						.clone(true)
							.attr('id', '')
							.attr('href', '')
							.removeClass('selected')
							.click(hideInterface)
							.appendTo($mainTab.parent())
						.find('a')
							.text('↸')
							.attr('title', strings.fullPage)
							.attr('accesskey', '');
				}
				
				
				// OTHER TASKS
				if (document.cookie.includes('wlmax=1')) {
					hideInterface();
				}
				
				mw.util.addCSS('\
					.mw-special-Watchlist .mw-changeslist .mw-rollback-link.mw-rollback-link {\
						visibility: visible;\
					}\
				');
				
				firstRun = false;
			}
			
			return;
		}
		
		// Occurs in watchlist when mediawiki.rcfilters.filters.ui module for some reason fires
		// wikipage.content for the second time with an element that is not in the DOM,
		// fieldset#mw-watchlist-options (in mw.rcfilters.ui.FormWrapperWidget.prototype.onChangesModelUpdate
		// function).
		if (!$content.parent().length) return;
		
		var $changeslist = $('.mw-changeslist');
		
		// Recent changes type in preferences. Don't confuse enhanced recent changes with enhanced filters.
		// mw.user.options.get('usenewrc') shouldn't be used here: RC mode could be set from URL.
		var isEnhanced = !$changeslist.find('ul.special').length;
		
		if (mw.util.getParamValue('from') !== null) {
			$('#mw-watchlist-form input[name="from"]').remove();
		}
		
		if (!mw.user.options.get('wlenhancedfilters-disable')) {
			mw.hook('structuredChangeFilters.ui.initialized').add(main);
		} else {
			if (!navigator.userAgent.toLowerCase().includes('firefox')) {
				main();
			} else {
				// Cure for Firefox
				setTimeout(main, 0);
			}
		}
	});
}

})();