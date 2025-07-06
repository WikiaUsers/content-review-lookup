/* jshint undef: true, devel: true, typed: true, jquery: true, strict: true, eqeqeq: true, freeze: true, latedef: true, shadow: outer, varstmt: true, quotmark: single, esversion: 6, futurehostile: true */
/* global importArticle */
mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.Title'], () => {
	'use strict';
	
	// Double load protection and default settings loadout
	(window.dev = window.dev || {}).betterTopNav = window.dev.betterTopNav || {
		resize: true,
		tools: true,
		hovermenu: true
	};
	if (window.dev.betterTopNav._LOADED) {return;}
	else {window.dev.betterTopNav._LOADED = true;}
	
	// Load styles
	importArticle({ type:'style', article: 'u:dev:MediaWiki:BetterTopNav.css' });
	
	let
	api = new mw.Api(),
	config = mw.config.values,
	
	// Main class
	bTN = {
		expandSearch: () => {
			let sett = isNaN(window.dev.betterTopNav.results) ? 25 : window.dev.betterTopNav.results;
			switch (typeof sett) {
				case 'boolean':
					sett = [50, {u:2, f:6, p:4, mw:8, t:10, c:14, m:828}];
					break;
				case 'number' || 'string':
					sett = [(sett === 'max' ? 50 : sett), {u:2, f:6, p:4, mw:8, t:10, c:14, m:828}];
					break;
				case 'object':
					if (!Array.isArray(sett)) {
						sett = [50, sett];
					}
					break;
			}
			document.body.classList.add('dev-betterTopNav-expandSearch');
			
			// Check what string is more relevant to `s` between `s1` and `s2`
			// `false` means `s1` is more relevant
			// `true` means `s2` is more relevant
			/// 4th argument can be set to `true` to return the term instead of a boolean
			function relevance(s, s1, s2, rT) {
				function matchRate(a, b) {
					let longer = (a.length > b.length ? a : b).toLowerCase(),
						shorter = (a === longer ? b : a).toLowerCase(),
						longerLength = longer.length,
						matchCount = 0,
						initMatch = null;
					if (longerLength === 0) { return 1.0; }
					for (let i = 0; i < longerLength; i++) {
						if (longer[i] === shorter[i]) { matchCount++; }
						else if (initMatch === null) {initMatch = i;}
					}
					return [(matchCount / longerLength) * 100, initMatch];
				}
				if (s.toLowerCase()===s1.toLowerCase()) {return rT ? s1 : false}
				else if (s.toLowerCase()===s2.toLowerCase()) {return rT ? s2 : true}
				let m1 = matchRate(s, s1),
					m2 = matchRate(s, s2),
					rel = m1[1] !== m2[1] ? m1[1] < m2[1]
							: (m1[0] === m2[0] ? s1.localeCompare(s2) >= 0 : m1[0] < m2[0]);
				if (rT) { return rel ? s2 : s1 ; }
				else { return rel; }
			}
			
			// Detect DOM changes for when to load what
			let search_observer = new MutationObserver(mw.util.throttle((ml)=>{
					const nav = $(ml[0].target);
					if (nav.find('input').length === 0 || nav.find('input').val().length === 0 ) { return; }
					let searchquery = nav.find('input').val();
					if (searchquery.length>0 && nav.is(':has(.search-app__suggestion, .search-app__no-suggestions)') && !nav.is(':has(.search-app__custom-suggestion, .search-app__heading)')) {
						// Load search results
						let opts = {
							action: 'query',
							list: 'search',
							srlimit: sett[0],
						};
						
						// Check for namespaces
						let namespace = searchquery.includes(':') ? searchquery.split(':')[0].trim().toLowerCase().replace(/ /g, '_') : null;
						let namespaceID = namespace !== null ? (config.wgNamespaceIds[namespace] || sett[1][namespace]) : null;
						if (namespaceID === undefined){namespaceID = null;}
						if (namespace !== null && namespaceID !== null) {
							opts.srsearch = searchquery.replace(/^.*?:\s*/, '');
							searchquery = searchquery.replace(/^.*?:\s*/, config.wgFormattedNamespaces[namespaceID]+':');
							opts.srnamespace = config.wgNamespaceIds[namespace] || sett[1][namespace];
							if (opts.srsearch === '') {return;}
						} else {
							opts.srsearch = searchquery;
							opts.srnamespace = 0;
						}
						let keyword = new RegExp(searchquery.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'), 'i');
						
						// Do search then check for redirects
						api.get(opts).then((_d)=>{
							if (_d.query && _d.query.search && _d.query.search.length>0) {
								let pages = _d.query.search.map((e)=>e); // make a copy of search results as we may need to add redirect data
								let listResults = () => {
									let list = nav.is(':has(.search-app__suggestions-list)') ? nav.find('.search-app__suggestions-list') :
											nav.find('.search-app__suggestions-box').append($('<ul>', {'class':'search-app__suggestions-list'}));
									pages.sort((a, b)=>relevance(searchquery,
										a.redirect ? relevance(searchquery, a.title, a.redirect, true) : a.title,
										b.redirect ? relevance(searchquery, b.title, b.redirect, true) : b.title
									));
									if ($('.search-app__heading').length !== 0){return;}
									list.empty(); // Make sure no default results exist
									nav.find('.search-app__suggestions-box').addClass('search-app__custom-suggestions');
									pages.forEach((page)=>{
										let label = page.title;
										mw.Title.exist.set(page.title.toLowerCase());
										let useRD = !page.redirect ? false : relevance(searchquery, page.title, page.redirect);
										if ( namespaceID === null && page.ns !== 0 ) {
											label = label.replace(/^[^:]+:/, '');
										}
										label = label.replace(keyword, '<b>$&</b>');
										if ( namespaceID === null && page.ns !== 0 ) {
											label = config.wgFormattedNamespaces[page.ns]+':'+label;
										}
										if (useRD) {
											label += ' <span class="search-app__suggestion-redirect">'+mw.msg('redirectedfrom', page.redirect.replace(keyword, '<span class="search-app__suggestion-highlight">$&</span>'))+'</span>';
											mw.Title.exist.set(page.redirect.toLowerCase());
										}
										list.append($('<li>', {
											'class': 'search-app__suggestion',
											dir: 'auto',
											html: $('<a>', {
												'class': 'search-app__suggestion-link',
												href: location.origin+new mw.Title(useRD ? page.redirect : page.title).getUrl(),
												html: label
											})
										}));
									});
									list.append($('<li>',{
										'class': 'search-app__suggestion search-app__suggestion-all',
										html: $('<a>', {
											'class': 'search-app__suggestion-link',
											href: location.origin+new mw.Title('Special:Search').getUrl()+'?scope=internal&query='+encodeURIComponent(searchquery),
											text: mw.msg('search-modal-see-all-results', searchquery)
										})
									}));
								};
								api.get({
									action: 'query',
									prop: 'redirects',
									rdprop: 'pageid|title',
									rdlimit: 'max',
									titles: _d.query.search.map((_i)=>_i.title).join('|'),
									redirects: 'false',
								}).then((data)=>{
									pages.forEach((page, _i)=>{
										if (
											page.pageid &&
											data.query.pages[page.pageid] &&
											data.query.pages[page.pageid].redirects
										) {
											let rd = (data.query.pages[page.pageid].redirects || []).filter((elem, index)=>{
												return elem && elem.title && keyword.test(elem.title);
											})[0];
											if (rd) {
												pages[_i].redirect = rd.title;
											}
										}
									});
									listResults();
								});
							} else {
								const noRes = $('<p>', {
									'class': 'search-app__no-suggestions',
									dir: 'auto',
									text: mw.msg('fd-global-top-navigation-no-search-results')
								});
								nav.find('.search-app__suggestions-box').empty().append(noRes);
								nav.find('.search-app__suggestions-box').addClass('search-app__custom-suggestions');
							}
						}).catch(console.log);
					}
				}, 150));
			search_observer.observe(document.querySelector('#global-top-navigation .search-app__wrapper'), {childList: true, subtree: true});
			search_observer.observe(document.querySelector('#community-navigation .search-app__wrapper'), {childList: true, subtree: true});
			
			// Replace default arrow navigation as it's hardcoded to the default results
			$('.search-app__input').on('keydown', (e) => {
				if (e.key === 'Enter') {
					e.stopPropagation(); // Turn off default
					e.preventDefault(); // Dont move caret
					if ($('.search-app__suggestion--active').length>0) {
						document.querySelector('.search-app__suggestions-box .search-app__suggestion--active > a').click();
					} else if ($('.search-app__input').val().length>0) {
						let v = $('.search-app__input').val();
						window.location = mw.Title.exists(v.toLowerCase()) ? new mw.Title(v).getUrl() : 
							location.origin+new mw.Title('Special:Search').getUrl()+'?scope=internal&query='+encodeURIComponent(v);
					}
				} else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
					e.stopPropagation(); // Turn off default
					e.preventDefault(); // Dont move caret
					let opts = $('.search-app__suggestions-box .search-app__suggestion'),
						target = opts.index($('.search-app__suggestion--active'))+{ArrowUp: -1, ArrowDown: +1}[e.key];
					if (target <= -1) {target = opts.length-1;}
					else if (target >= opts.length) {target = 0;}
					opts
						.filter('.search-app__suggestion--active')
						.add(opts.get(target))
						.toggleClass('search-app__suggestion--active');
					opts.filter('.search-app__suggestion--active').focus();
					document.querySelector('.search-app__suggestion--active').scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start'});
					let selPage = opts.filter('.search-app__suggestion--active.search-app__suggestion-all').length>0 ? $('.search-app__input').val() : 
						(()=>{
							let p = $('.search-app__suggestion--active .search-app__suggestion-link').clone();
							p.children('.search-app__suggestion-redirect').remove();
							return p.text().trim();
						})();
					$('.search-app__input').attr('value', selPage);
					$('.search-app__input').val(selPage);
				}
			});
		},
		
		// Allow resizing the search bar to the left
		resizeSearch: () => {
			document.body.classList.add('dev-betterTopNav-resizeSearch');
			$('.search-app__wrapper').append('<div class="search-resizer"><svg class="wds-icon wds-icon-tiny"><use xlink:href="#wds-icons-menu-control-tiny"></use></svg></div>');
			let resizer = $('.search-container .search-resizer'),
				resizable, startX, startWidth;
				
			// Resize functions
			function doDrag(e) { resizable.css('width', (startWidth - e.clientX + startX) + 'px'); }
			function stopDrag(e) {
				document.documentElement.removeEventListener('mousemove', doDrag, false);
				document.documentElement.removeEventListener('mouseup', stopDrag, false);
				api.post({
					action: 'options',
					token: mw.user.tokens.values.csrfToken,
					optionname: 'userjs-betterTopNav',
					optionvalue: JSON.stringify({
						global: parseInt($('.global-top-navigation .search-container .search-app__wrapper').outerWidth(), 10),
						sticky: parseInt($('.fandom-sticky-header .search-container .search-app__wrapper').outerWidth(), 10)
					})
				});
			}
			function initDrag(e) {
				startX = e.clientX;
				resizable = $(e.target.closest('.search-app__wrapper'));
				startWidth = parseInt( resizable.outerWidth(), 10);
				document.documentElement.addEventListener('mousemove', doDrag, false);
				document.documentElement.addEventListener('mouseup', stopDrag, false);
			}
			
			// Local storage default widths
			if (mw.user.options.values['userjs-betterTopNav']) {
				const _default = JSON.parse(mw.user.options.values['userjs-betterTopNav']);
				$('.global-top-navigation .search-container .search-app__wrapper').css('width', _default['global']+'px'); // jshint ignore:line
				$('.fandom-sticky-header .search-container .search-app__wrapper').css('width',  _default['sticky']+'px'); // jshint ignore:line
			}
			resizer.on( 'mousedown', initDrag );
		},
		
		// Customization of sticky nav tools
		customizeTools: () => {
			let sett = window.dev.betterTopNav.tools;
			document.body.classList.add('dev-betterTopNav-customizeTools');
			if (!Array.isArray(sett) || sett.length === 0) {
				sett = [];
				$('#community-navigation #wiki-tools-menu li > a').each((_, el) => {
					let item = {
						'track': el.getAttribute('data-tracking-label'),
						'class': el.getAttribute('class'),
						'link': el.getAttribute('href'),
						'text': el.textContent.trim()
					};
					if (
						el.parentNode.classList.contains('wiki-tool-in-dropdown') ||
						el.classList.contains('wiki-tools__theme-switch')
					) {
						item.icon = $(
							'.wiki-tools > a[data-tracking-label="'+el.getAttribute('data-tracking-label')+'"],'+
							'.wiki-tools > a[data-tracking="'+el.getAttribute('data-tracking-label')+'"]'
						).first().html().trim();
					}
					sett.push(item);
				});
			}
			if (Array.isArray(sett) && sett.length>0) {
				$('#community-navigation .wiki-tools > a').remove();
				$('#community-navigation .wiki-tools #wiki-tools-menu li').remove();
				sett.forEach((item) => {
					if (item.link && item.text) {
						$('#community-navigation .wiki-tools > .wds-dropdown ul').append(
							$('<li>', {'class':(item.icon ? 'wiki-tool-in-dropdown' : '')}).append(
								$('<a>', {
									href: item.link,
									'class': item.class,
									title: item.title || item.text || 'Unknown',
									'data-tracking-label': item.track
								}).append(
									(item.icon ? (item.icon+'&nbsp;') : ''),
									item.text
								)
							)
						);
						if (item.icon) {
							$('#community-navigation .wiki-tools > .wds-dropdown').before(
								$('<a>', {
									href: item.link,
									'class': 'wds-button wds-is-text is-hidden-on-smaller-breakpoints '+(item.class || ''),
									title: item.title || item.text || 'Unknown',
									'data-tracking-label': item.track
								}).append(item.icon)
							);
						}
					}
				});
			}
			
			// Add the tools to global bar too
			if (!document.querySelector('#global-top-navigation .wiki-tools')) {
				$('#global-top-navigation .search-container').after(
					$('#community-navigation .wiki-tools').clone()
				);
			}
		},
		
		hoverUserMenu: () => {
			document.body.classList.add('dev-betterTopNav-hoverUserMenu');
			// Inert attr makes the popup uninteractable, thx fandom, very cool
			let observer = new MutationObserver(() => { $('#global-top-navigation .global-action__user .navigation-panel').removeAttr('inert'); });
			observer.observe(document.querySelector('#global-top-navigation .global-action__user'), { attributes: true, subtree: true });
			
			// Render custom list once the init process is done
			bTN.waitFor('#global-top-navigation .global-action__user .navigation-panel ul>li>a', () => {
				
				// Avoid initalization defaults
				$('#global-top-navigation .global-action__user > button').click();
				$('#global-top-navigation .global-action__user .navigation-panel ul').empty();
				document.body.classList.remove('btn-noflash');
				
				// Render new list
				let links = [
					{href: new mw.Title('User:'+mw.user.getName()).getUrl(), text: mw.msg('fd-global-navigation-user-view-profile')},
					{href: new mw.Title('Message_Wall:'+mw.user.getName()).getUrl(), text: mw.msg('fd-global-navigation-user-message-wall')},
					{href: new mw.Title('Special:Contributions/'+mw.user.getName()).getUrl(), text: mw.msg('mycontributions')},
					{href: new mw.Title('Special:Preferences').getUrl(), text: mw.msg('fd-global-navigation-user-my-preferences')},
					{href: 'https://auth.fandom.com/logout?source=mw&redirect='+encodeURIComponent(window.location.href), text: mw.msg('fd-global-navigation-user-sign-out')}
				];
				if (Array.isArray(window.dev.betterTopNav.hovermenu) && window.dev.betterTopNav.hovermenu.length>0) { links = links.concat(window.dev.betterTopNav.hovermenu); }
				links.forEach((link) => {
					$('#global-top-navigation .global-action__user .navigation-panel ul').append(
						$('<li>', {'class':'user-panel__list-item'}).append(
							$('<a>', link)
						)
					);
				});
			});
			document.body.classList.add('btn-noflash');
			$('#global-top-navigation .global-action__user > button').click();
		},
		
		// Delay until element exists to run function
		waitFor: (query, callback, extraDelay) => {
			if ('function' === typeof callback && 'string' === typeof query) {
				extraDelay = extraDelay || 0;
				if (document.querySelector(query)) {
					setTimeout(callback, extraDelay);
				} else {
					// set up the mutation observer
					let observer = new MutationObserver((mutations, me) => {
						// mutations is an array of mutations that occurred
						// me is the MutationObserver instance
						let targetNode = document.querySelector(query);
						if (targetNode) {
							setTimeout(callback, extraDelay);
							me.disconnect(); // stop observing
							return;
						}
					});
					
					// start observing
					observer.observe(document, {
						childList: true,
						subtree: true
					});
				}
			}
		},
	};
	
	// Load conditions
	const msgs = [
		'redirectedfrom',
		'search-modal-see-all-results',
		'fd-global-top-navigation-no-search-results',
		'fd-global-navigation-user-view-profile',
		'fd-global-navigation-user-message-wall',
		'mycontributions',
		'fd-global-navigation-user-my-preferences',
		'fd-global-navigation-user-sign-out'
	];
	api.loadMessagesIfMissing(msgs).then(() => {
		if (window.dev.betterTopNav.results) { bTN.waitFor('#global-top-navigation .search-app__wrapper input', bTN.expandSearch); }
		if (window.dev.betterTopNav.resize) { bTN.waitFor('.search-app__wrapper', bTN.resizeSearch); }
		if (window.dev.betterTopNav.tools) { bTN.waitFor('.search-app__wrapper', bTN.customizeTools); }
		if (window.dev.betterTopNav.hovermenu) { bTN.waitFor('#global-top-navigation .global-action__user > button', bTN.hoverUserMenu); }
	});
});