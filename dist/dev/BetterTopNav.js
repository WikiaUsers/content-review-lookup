(function(){
	// Double load protection and default settings loadout
	(window.dev = window.dev || {}).betterTopNav = window.dev.betterTopNav || {
		resize: true,
		redirects: true,
		tools: true,
		hovermenu: true
	};
	if (window.dev.betterTopNav._LOADED) {return;}
	else {window.dev.betterTopNav._LOADED=true;}
	
	var config = mw.config.values;
	var api;
	
	// Improvementse
	var bTN = {
		expandSearch: function() {
			var sett = isNaN(window.dev.betterTopNav.results) ? 25 : window.dev.betterTopNav.results;
			switch (typeof sett) {
				case 'boolean':
					sett = [50, {u:2, f:6, p:4, mw:8, t:10, c:14, m:828}];
					break;
				case 'number' || 'string':
					sett = [(sett=='max' ? 50 : sett), {u:2, f:6, p:4, mw:8, t:10, c:14, m:828}];
					break;
				case 'object':
					if (!Array.isArray(sett)) {
						sett = [50, sett];
					}
					break;
			}
			mw.util.addCSS(
				'.search-app__suggestions-box {'+
					'resize: vertical;'+
					'overflow: hidden auto;'+
					'margin-top: 6px;'+
					'border-top-width: 1px;'+
					'max-height: 80vh}'+
				'textarea.search-app__input {'+
					'resize: none;'+
					'padding-top: 7px;'+
					'white-space: nowrap;'+
					'scrollbar-width: thin;'+
					'overflow: auto hidden;'+
				'}'+
				'#community-navigation textarea {'+
					'border: 1px solid var(--fandom-communitybar-search-color);'+
				'}'+
				'.search-app__suggestions-list > li > a {'+
					'white-space: preserve;'+
					'display: block !important;'+
				'}'+
				'.search-app__button-clear {'+
					'position: absolute;'+
					'right: 0;'+
					'top: 2px;'+
					'font-size: 20px;'+
					'width: 10px;'+
					'height: 10px;'+
				'}'+
				'.search-app__suggestions-box:not(:has(>:is(li, p))),'+
				'#global-top-navigation:has(+#community-navigation.is-visible) .search-container,'+
				'#community-navigation:not(.is-visible) .search-container'+
					'{display: none;}'+
				'#community-navigation .search-clear-button {'+
					'color: var(--fandom-communitybar-search-color);'+
					'padding: 8px; '+
				'}'
			);
			
			// Disable default search
			$('.search-app__wrapper input').replaceWith(document.querySelector('.search-app__wrapper input').outerHTML.replace(/^<input/, '<textarea')+'</textarea>');
			
			// References
			var wrap = $('.search-app__wrapper');
			var searchbox = wrap.find('textarea');
			var searchquery = '';
			searchbox.after('<div class="search-app__suggestions-box"></div>');
			var list = $('.search-app__suggestions-box');
			var exmtch = null;
			
			// Search result load
			var loadResults = mw.util.debounce(function() {
				// protection from unnecessary reload
				if (searchquery == searchbox.val()) {return;}
				searchquery = searchbox.val();
				exmtch = null;
				
				// Remove default list if wrongly generated
				if (document.querySelector('.search-app__suggestions-box > .search-app__suggestions-list')) {document.querySelector('.search-app__suggestions-box > .search-app__suggestions-list').remove();}
				
				if (searchquery.length>0) {
					list.empty();
					
					// Add search query clear button
					if (!document.querySelector('.search-clear-button')) {searchbox.after($('<button class="wds-button search-app__button-clear search-clear-button wds-is-text" type="button">×</button>'));}
					
					// Load search results
					var opts = {
						action: 'query',
						list: 'search',
						srlimit: sett[0],
					};
					
					// Check for namespaces
					var namespace = searchquery.includes(':') ? searchquery.split(':')[0].trim().toLowerCase().replace(/ /g, '_') : null;
					var namespaceID = namespace !== null ? (config.wgNamespaceIds[namespace] || sett[1][namespace]) : null;
					if (namespaceID === undefined){namespaceID=null;}
					if (namespace !== null && namespaceID !== null) {
						opts.srsearch = searchquery.replace(/^.*?:\s*/, '');
						searchquery = searchquery.replace(/^.*?:\s*/, config.wgFormattedNamespaces[namespaceID]+':');
						opts.srnamespace = config.wgNamespaceIds[namespace] || sett[1][namespace];
						if (opts.srsearch=='') {return;}
					} else { opts.srsearch=searchquery; opts.srnamespace='*'; }
					var keyword = new RegExp(searchquery.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'), 'i');
					
					// Do search then check for redirects
					api.get(opts).then(function(_d){
						if (_d.query && _d.query.search && _d.query.search.length>0){
							var pages = _d.query.search.map(function(e){return e;});
							var listRes = function () {
								var starts = [];
								var contains = [];
								var extra = [];
								pages.forEach(function(page){
									if (
										page.title.search(keyword)===0 ||
										(page.redirect && page.redirect.search(keyword)===0)
									) { starts.push(page); }
									else if (
										page.title.search(keyword)>0 ||
										(page.redirect && page.redirect.search(keyword)>0)
									) { contains.push(page); }
									else { extra.push(page); }
									
									if (
										page.title.toLowerCase()===searchquery.toLowerCase()
									) { exmtch = page.title; }
									else if (
										page.redirect && page.redirect.toLowerCase()===searchquery.toLowerCase()
									) { exmtch = page.redirect; }
								});
								var entries = [].concat(
									starts,
									contains,
									extra
								);
								entries.forEach(function(page){
									var label = page.title;
									if ( namespaceID == null && page.ns !== 0 ) {
										label = label.replace(/^[^:]+:/, '');
									}
									label = label.replace(keyword, '<b>$&</b>');
									if ( namespaceID == null && page.ns !== 0 ) {
										label = config.wgFormattedNamespaces[page.ns]+':'+label;
									}
									if (page.redirect) {
										label += ' <small><i>'+mw.msg('redirectedfrom', page.redirect.replace(keyword, '<b>$&</b>'))+'</i></small>';
									}
									list.append(
										$('<li>', {
											'class': 'search-app__suggestion'
										}).append(
											$('<a>', {
												'class': 'search-app__suggestion-link',
												href: mw.util.getUrl(page.redirect || page.title)
											}).append(label)
										)
									);
								});
								list.append('<li class="search-app__suggestion search-app__suggestion-all"><a class="search-app__suggestion-link" href="'+new mw.Title('Special:Search').getUrl()+'?scope=internal&query='+encodeURIComponent(searchquery)+'">'+mw.msg('search-modal-see-all-results', searchquery)+'</a></li>');
							};
							if (window.dev.betterTopNav.redirects) {
								api.get({
									action:'query',
									prop:'redirects',
									rdprop:'pageid|title',
									rdlimit:'max',
									titles:_d.query.search.map(function(_i) {return _i.title;}).join('|'),
									redirects: 'false',
								}).then(function(data) {
									pages.forEach(function(page, _i) {
										if (
											page.pageid &&
											data.query.pages[page.pageid] &&
											data.query.pages[page.pageid].redirects
										) {
											var rd = (data.query.pages[page.pageid].redirects||[]).filter(function(elem, index){
												return elem && elem.title && keyword.test(elem.title);
											})[0];
											if (rd) {
												pages[_i].redirect = rd.title;
											}
										}
									});
									listRes();
								});
							} else { listRes(); }
						} else {
							list.append('<p class="<p class="search-app__no-suggestions" dir="ltr">'+mw.msg('fd-global-top-navigation-no-search-results')+'</p>');
						}
					}).catch(console.log);
					
				} else {
					$('.search-clear-button').remove();
					list.empty();
				}
			}, 1000);
			
			// Events
			searchbox.on('keyup keydown', mw.util.debounce(function(event) {
				searchbox.val(event.target.value.replace(/[\r\n\v]+/g, ''));
				if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
					event.preventDefault(); // do not move carat in searchbox
					var selected = document.querySelector('.search-app__suggestions-box .search-app__suggestion--active');
					if (selected) {
						var next = selected.nextElementSibling ? selected.nextElementSibling : null;
						var prev = selected.previousElementSibling ? selected.previousElementSibling : null;
						if (event.key == 'ArrowDown' && next) {
							selected.classList.remove('search-app__suggestion--active');
							next.classList.add('search-app__suggestion--active');
							next.scrollIntoView();
						} else if (event.key == 'ArrowUp' && prev) {
							selected.classList.remove('search-app__suggestion--active');
							prev.classList.add('search-app__suggestion--active');
							prev.scrollIntoView();
						}
					} else if (document.querySelector('.search-app__suggestions-box li > a')) {
						document.querySelector('.search-app__suggestions-box li:first-child').classList.add('search-app__suggestion--active');
					}
				} else if (event.key == 'Enter') {
					if (document.querySelector('.search-app__suggestions-box .search-app__suggestion--active > a')) {
						document.querySelector('.search-app__suggestions-box .search-app__suggestion--active > a').click();
					} else if (exmtch && exmtch.length>0) {
						window.location.href = new mw.Title(exmtch).getUrl();
					} else if (searchbox.val().length>0) {
						var searchquery = searchbox.val();
						var namespace = searchquery.includes(':') ? searchquery.split(':')[0].trim().toLowerCase().replace(/ /g, '_') : null;
						var namespaceID = namespace !== null ? (config.wgNamespaceIds[namespace] || sett[1][namespace]) : null;
						if (namespace !== null && namespaceID !== null) {
							searchquery = searchquery.replace(/^.*?:\s*/, config.wgFormattedNamespaces[namespaceID]+':');
						}
						
						$.getJSON(mw.util.wikiScript('wikia')+'?controller=UnifiedSearchSuggestions&method=getSuggestions&format=json&scope=internal&query='+encodeURIComponent(searchquery)).then(function(d){
							Object.keys(d.redirects).forEach(function(page) {
								if (searchquery.toLowerCase() == page.toLowerCase()) {
									window.location.href = mw.util.getUrl(page);
									searchquery = '';
								}
							});
							if (searchquery!=='') {
								d.suggestions.forEach(function(page) {
									if (searchquery.toLowerCase() == page.toLowerCase()) {
										window.location.href = mw.util.getUrl(page);
										searchquery = '';
									}
								});
							}
							if (searchquery!=='') {
								window.location.href = new mw.Title('Special:Search').getUrl()+'?scope=internal&query='+encodeURIComponent(searchquery);
							}
						});
					}
				} else {
					loadResults();
				}
			}, 150));
			wrap.on('click', '.search-clear-button', function() {
				searchbox.val('');
				exmtch = null;
				list.empty();
				$('.search-clear-button').remove();
			});
			$('.search__button').on('click', function() {
				document.querySelector('#community-navigation textarea').focus();
			});
		},
		
		// Mark redirects in deafult search module
		showRedirects: function() {
			var checkRedirects = function (s) {
				$('.search-app__suggestions-list:first-child:last-child .search-app__suggestion:not(.search-redirectChecked) > a').each(function(_, el) {
					el.parentNode.classList.add('search-redirectChecked');
					var name = el.textContent;
					var keyword = new RegExp(el.closest('.search-app__wrapper').querySelector('input').getAttribute('value').replace(/(^\s*|\s*$)/g, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
					Object.keys(s.redirects).forEach(function(k) {
						if (name == s.redirects[k]) {
							el.setAttribute('href', mw.util.getUrl(k));
							$(el).append(' <small><i>'+mw.msg('redirectedfrom', k.replace(keyword, '<b>$&</b>'))+'</i></small>');
							name = '_';
						}
					});
				});
			};
			
			
			// set up the mutation observer
			var observer = new MutationObserver(function (mutations, me) {
				var targetNode = document.querySelector('.search-app__suggestions-list:first-child:last-child .search-app__suggestion:not(.search-redirectChecked)');
				if (targetNode) {
					$.getJSON(mw.util.wikiScript('wikia')+'?controller=UnifiedSearchSuggestions&method=getSuggestions&format=json&scope=internal&query='+encodeURIComponent(targetNode.closest('.search-app__wrapper').querySelector('.search-app__input').getAttribute('value')))
					.then(checkRedirects);
					return;
				}
			});
			// start observing
			observer.observe(document, { childList: true, subtree: true });
		},
		
		// Allow resizing the search bar to the left
		resizeSearch: function() {
			mw.util.addCSS(
				'.fandom-community-header__local-navigation .wds-tabs { display: flex; }'+
				'.search-container .search-app__icon-search { left: 12px; top: 10px; }'+
				'.search-container { width: unset; max-width: unset !important; min-width: 0 !important; > .search-app__wrapper {margin-left: 26px; padding: 0; transition-duration: 0s !important;} }'+
				'@media only screen and (max-width: 1023px) {'+
					'.fandom-sticky-header .search-container .search-app__wrapper:not(.search-app--expanded) {width:0 !important; overflow: hidden;}'+
					'.fandom-sticky-header .search-container .search-app__wrapper.search-app--expanded {position: fixed; top: 100%; textarea {border-radius: 0; border-top: 0; margin: 0;} }'+
				'}'+
				'.search-resizer {'+
					'width: 20px;'+
					'height: 24px;'+
					'background: transparent;'+
					'position: absolute;'+
					'left: -20px;'+
					'bottom: calc(50% - 12.5px);'+
					'cursor: e-resize;'+
					'user-select: none;'+
					'border: 1px solid;'+
					'border-right: 0;'+
					'border-radius: 30% 0 0 30%;'+
					'padding-left: 1px;'+
					'text-align: center;'+
					'> svg {transform: rotate(90deg);}'+
				'}'+
				'.global-top-navigation .search-resizer { color: var(--fandom-search-color); border-color:var(--fandom-search-color); }'+
				'.fandom-sticky-header .search-resizer { color: var(--theme-sticky-nav-text-color); border-color: var(--fandom-communitybar-search-color); background: var(--theme-sticky-nav-background-color); }'
			);
			$('.search-app__wrapper').append('<div class="search-resizer"><svg class="wds-icon wds-icon-tiny"><use xlink:href="#wds-icons-menu-control-tiny"></use></svg></div>');
			var resizer = $('.search-container .search-resizer'),
				resizable, startX, startWidth;
			
			// Local storage default widths
			if (mw.user.options.values['userjs-betterTopNav']) {
				var _default = JSON.parse(mw.user.options.values['userjs-betterTopNav']);
				$('.global-top-navigation .search-container .search-app__wrapper').css('width', _default['global']+'px');
				$('.fandom-sticky-header .search-container .search-app__wrapper').css('width',  _default['sticky']+'px');
			}
			resizer.on( 'mousedown', initDrag );
			function initDrag(e) {
				startX = e.clientX;
				resizable = $(e.target.closest('.search-app__wrapper'));
				startWidth = parseInt( resizable.outerWidth(), 10);
				document.documentElement.addEventListener('mousemove', doDrag, false);
				document.documentElement.addEventListener('mouseup', stopDrag, false);
			}
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
		},
		
		// Customization of sticky nav tools
		customizeTools: function() {
			var sett = window.dev.betterTopNav.tools;
			if (!Array.isArray(sett)||sett.length==0) {
				mw.util.addCSS('@media only screen and (min-width: 1023px) {'+
					'#community-navigation .wiki-tools > .wds-dropdown {display:none;}'+
					'#community-navigation .wiki-tools > .wds-dropdown:has(li:not(.wiki-tool-in-dropdown)) {display:block;}'+
				'}');
				sett = [];
				$('#community-navigation #wiki-tools-menu li > a').each(function(_, el){
					var item = {
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
			console.log('bTN Custom Tools: ', sett);
			if (Array.isArray(sett) && sett.length>0) {
				$('#community-navigation .wiki-tools > a').remove();
				$('#community-navigation .wiki-tools #wiki-tools-menu li').remove();
				sett.forEach(function(item){
					if (item.link && item.text) {
						$('#community-navigation .wiki-tools > .wds-dropdown ul').append(
							$('<li>', {'class':(item.icon ? 'wiki-tool-in-dropdown' : '')}).append(
								$('<a>', {
									href: item.link,
									'class': item.class,
									title: item.title||item.text||'Unknown',
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
									'class': 'wds-button wds-is-text is-hidden-on-smaller-breakpoints '+(item.class||''),
									title: item.title||item.text||'Unknown',
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
		
		hoverUserMenu: function (customLinks) {
			mw.util.addCSS(
				'.global-action__user > button { margin: 15px 0; }'+
				'.global-action__user .navigation-tab {'+
					'animation: none !important;'+
					'border-radius: 15px 0 15px 15px;'+
					'height: auto;'+
					'padding: 15px 5px;'+
					'right: 100%;'+
					'z-index: 2;'+
					'pointer-events: all !important;'+
					'border: 1px solid var(--theme-border-color);'+
					'> div > :not(ul) { display: none; }'+
				'}'+
				'body:has('+
					'.global-action__user:is(:hover, .wds-is-active),'+
					'.global-action__user #user-tab__content:hover'+
				') .global-action__user .navigation-tab {'+
					'right: 0 !important;'+
				'}'
			);
			// Inert attr makes the popup uninteractable, thx fandom, very cool
			var observer = new MutationObserver(function(){ $('#global-top-navigation .global-action__user .navigation-tab').removeAttr('inert'); });
			observer.observe(document.querySelector('#global-top-navigation .global-action__user'), { attributes: true, subtree: true });
			
			// Render custom list once the init process is done
			bTN.waitFor('#global-top-navigation .global-action__user .navigation-tab ul>li>a', function() {
				
				// Avoid initalization defaults
				$('#global-top-navigation .global-action__user > button').click();
				$('#global-top-navigation .global-action__user .navigation-tab ul').empty();
				$('#global-top-navigation .global-action__user > .global-action__user__tab-container').css('display', '');
				
				// Render new list
				var links = [
					{href: new mw.Title('User:'+mw.user.getName()).getUrl(), text: mw.msg('fd-global-navigation-user-view-profile')},
					{href: new mw.Title('Message_Wall:'+mw.user.getName()).getUrl(), text: mw.msg('fd-global-navigation-user-message-wall')},
					{href: new mw.Title('Special:Contributions/'+mw.user.getName()).getUrl(), text: mw.msg('mycontributions')},
					{href: new mw.Title('Special:Preferences').getUrl(), text: mw.msg('fd-global-navigation-user-my-preferences')},
					{href: 'https://auth.fandom.com/logout?source=mw&redirect='+encodeURIComponent(window.location.href), text: mw.msg('fd-global-navigation-user-sign-out')}
				];
				if (Array.isArray(customLinks) && customLinks.length>0) { links = links.concat(customLinks); }
				console.log(links);
				links.forEach(function(link){
					console.log(link);
					$('#global-top-navigation .global-action__user .navigation-tab ul').append(
						$('<li>', {'class':'user-tab__list-item'}).append(
							$('<a>', link)
						)
					);
				});
			});
			$('#global-top-navigation .global-action__user > .global-action__user__tab-container').css('display', 'none');
			$('#global-top-navigation .global-action__user > button').click();
		},
		
		// Delay until element exists to run function
		waitFor: function(query, callback, extraDelay) {
			if ('function' == typeof callback && 'string' == typeof query) {
				extraDelay = extraDelay || 0;
				if (document.querySelector(query)) {
					setTimeout(callback, extraDelay);
				} else {
					// set up the mutation observer
					var observer = new MutationObserver(function (mutations, me) {
						// mutations is an array of mutations that occurred
						// me is the MutationObserver instance
						var targetNode = document.querySelector(query);
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
	mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.Title'], function(){
		api = new mw.Api();
		var msgs = [
			'redirectedfrom',
			'search-modal-see-all-results',
			'fd-global-top-navigation-no-search-results',
			'fd-global-navigation-user-view-profile',
			'fd-global-navigation-user-message-wall',
			'mycontributions',
			'fd-global-navigation-user-my-preferences',
			'fd-global-navigation-user-sign-out'
		];
		// Load css
		mw.util.addCSS(
			// Fix search results ellipsing
			'.search-app__suggestion {height: unset; min-height: 32px; margin-top: 5px; > a {-webkit-line-clamp: none; word-break: break-word !important;}}'
		);
		api.loadMessagesIfMissing(msgs).then(function() {
			if (window.dev.betterTopNav.results) { bTN.waitFor('#global-top-navigation .search-app__wrapper input', bTN.expandSearch); }
			if (window.dev.betterTopNav.resize) { bTN.waitFor('.search-app__wrapper', bTN.resizeSearch); }
			if (
				window.dev.betterTopNav.redirects &&
				!window.dev.betterTopNav.results // custom search is incompatible with default redirect marking
			) { bTN.waitFor('.search-app__wrapper', bTN.showRedirects); }
			if (window.dev.betterTopNav.tools) { bTN.waitFor('.search-app__wrapper', bTN.customizeTools); }
			if (window.dev.betterTopNav.hovermenu) { bTN.waitFor('#global-top-navigation .global-action__user > button', bTN.hoverUserMenu); }
		});
	});
})();