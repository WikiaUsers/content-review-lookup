/* 
Original idea taken from: https://genshin-impact.fandom.com/wiki/MediaWiki:CustomFilters.js
*/
/* jshint undef: true, devel: true, typed: true, jquery: true, strict: true, eqeqeq: true, freeze: true, latedef: true, shadow: outer, varstmt: true, quotmark: single, esversion: 6, futurehostile: true */
mw.hook('wikipage.content').add(() => {
	if(window.dev && window.dev.CustomFilters) {return;}
	(window.dev = window.dev || {}).CustomFilters=true;
	let config = mw.config.get(['wgPageName', 'wgServer']);
	let flc = 0;
	let decodeEntity = (str) => {
		let textarea = document.createElement('textarea');
		textarea.innerHTML = str;
		return textarea.value.trim();
	};
	
	mw.util.addCSS(`
		.fl-sett {
			display: none;
		}
		.fl-filter-wrapper {
			display: flex;
			flex-wrap: wrap;
			gap: 5px;
			margin-bottom: 10px;
			align-items: center;
		}
		.fl-filter-group {
			display: flex;
			gap: 5px;
			flex-wrap: wrap;
			background: var(--theme-page-background-color);
			padding: 5px;
			border-radius: 3px;
			border: 2px solid var(--theme-border-color);
			align-items: center;
			min-height: 44px;
		}
		.fl-checkbox-label {
			display: inline;
			border-radius: 8px;
			padding: 3px;
			cursor: pointer;
			user-select: none;
		}
		.fl-search {
			background: var(--theme-color-6);
			color: var(--theme-page-text-color);
			border: 0;
			border-radius: 4px;
			height: 30px;
			padding: 4px;
		}
		.fl-checkbox { display: none; }
		.fl-toggle-qa-all, .fl-toggle-qa-none { cursor: pointer; }
		.fl-checkbox-label:has(.fl-checkbox:checked) { background: rgba(var(--theme-link-color--rgb), 0.2); }
		.fl-checkbox-label:hover { outline: solid 1px #E9E5DC; }
		.fl-toggle-label { line-height: 1.2; }
		.fl-toggle-qa { font-size: 0.6em; }
	`);
	$('.fl-wrapper:not(.fl-loaded)').each((_, wrapper) => {
		wrapper.classList.add('fl-loaded');
		let $wrap = $(wrapper);
		
		// Verify settings
		let settings;
		try { settings = JSON.parse($wrap.children('.fl-sett').html()); }
		catch (nope) { console.warn('Invalid JSON at filter: ', wrapper); return; }
		
		let queries = { hide: {}, show: {} };
		let filterGroups = {}; // Track queries by group
		let groupHasToggles = {}; // Track which groups have toggles
		let filters = $('<div>').addClass('fl-filter-wrapper');
		let applyFLs = mw.util.debounce(() => {
			let allCards = $wrap.find('.card-container');
			let show = $();
			
			// Collect patterns from each group
			let activeGroups = [];
			for (let groupName in filterGroups) {
				let groupQueries = filterGroups[groupName];
				if (groupQueries.length > 0) {
					// Extract patterns from queries like ".card-container[class*='card-v1-']"
					let patterns = groupQueries.map(q => {
						let match = q.match(/\[class\*=['"]([^'"]+)['"]\]/);
						return match ? match[1] : null;
					}).filter(p => p !== null);
					
					if (patterns.length > 0) {
						activeGroups.push(patterns);
					}
				} else if (groupHasToggles[groupName]) {
					// All toggles unchecked - show nothing
					show = $();
					allCards.each(function() {
						let card = $(this);
						let hide = allCards.not(show);
						hide.fadeOut(250);
					});
					return;
				}
			}
			
			// For each card, check if ANY of its classes matches ALL active group patterns
			allCards.each(function() {
				let card = $(this);
				let classes = (card.attr('class') || '').split(/\s+/);
				
				// Check each class to see if it contains all required patterns from all groups
				let hasMatchingClass = classes.some(className => {
					// For this class, check if it matches at least one pattern from each group
					return activeGroups.every(groupPatterns => {
						return groupPatterns.some(pattern => className.includes(pattern));
					});
				});
				
				if (hasMatchingClass) {
					show = show.add(card);
				}
			});
			
			let hide = allCards.not(show);
			// console.log('Final show:', show.length, 'hide:', hide.length);
			
			if (filters.find('.fl-search')) {
				$wrap.find('.fl-search').each((__, inpt) => {
					if (inpt.value.trim().length===0) {return;}
					let val = new RegExp(decodeEntity(inpt.value), 'i'),
						query = decodeEntity(inpt.getAttribute('data-fl-search-query')),
						attr = decodeEntity(inpt.getAttribute('data-fl-search-attr')),
						source = decodeEntity(inpt.getAttribute('data-fl-search-source')),
						els = $wrap.find(query);
					(source ? els.find(source) : els).each((___, el) => {
						let $el = $(el);
						let elsource = source ? $el.closest(query) : $el;
						if (
							(attr && (!$el.attr(attr) || $el.attr(attr).trim().search(val)===-1) ) ||
							(!attr && $el.text().trim().search(val)===-1)
						) {
							hide = hide.add(elsource[0]);
						}
					});
				});
			}
			show.not(hide).fadeIn(250);
			hide.fadeOut(250);
		}, 500);
		settings.forEach((curr, groupIndex) => {
			if (curr.toggles) {
				let groupName = 'group_' + groupIndex;
				filterGroups[groupName] = [];
				groupHasToggles[groupName] = true;
				
				let togglewrap = $('<div>')
					.addClass('fl-filter-group')
					.attr('data-group', groupName);
				if (curr.class) {
					togglewrap.addClass(curr.class);
				}

				let toggleLabel = $('<div>').addClass('fl-toggle-label');
				if (curr.label) {
					toggleLabel.append(document.createTextNode(curr.label + ':'));
				}
				if (curr.all || curr.none) {
					let quickActions = $('<div>').addClass('fl-toggle-qa');
					if (curr.all) {
						quickActions.append($('<a>').addClass('fl-toggle-qa-all').text('ALL'));
					}
					if (curr.all && curr.none) {
						quickActions.append(document.createTextNode(' — '));
					}
					if (curr.none) {
						quickActions.append($('<a>').addClass('fl-toggle-qa-none').text('NONE'));
					}
					toggleLabel.append(quickActions);
				}
				togglewrap.append(toggleLabel);
				curr.toggles.forEach((toggle) => {
					flc++;
					// console.log('Adding toggle:', toggle.label || 'no-label', 'query:', toggle.query);
					let opt = $('<label>')
						.addClass('fl-checkbox-label')
						.attr('for', 'fl-toggle-' + flc);
					let inpt = $('<input>')
						.attr('id', 'fl-toggle-' + flc)
						.addClass('fl-checkbox')
						.attr('type', 'checkbox')
						.attr('tabindex', '0')
						.prop('checked', true);
					let imageName = null;
					let imageClass = '';
					if (toggle.imgL && $('body[data-theme="light"]').length>0) {
						imageName = toggle.imgL;
						imageClass = toggle.imgLClass || toggle.imgClass || '';
					} else if (toggle.imgD && $('body[data-theme="dark"]').length>0) {
						imageName = toggle.imgD;
						imageClass = toggle.imgDClass || toggle.imgClass || '';
					} else if (toggle.img) {
						imageName = toggle.img;
						imageClass = toggle.imgClass || '';
					}
					if (imageName) {
						let iconTarget = null;
						let img = $('<img>')
							.attr('src', config.wgServer + mw.util.getUrl('Special:Filepath/' + imageName))
							.attr('width', '24px');
						if (imageClass) {
							img.addClass(imageClass);
						}
						if (toggle.pathway) {
							iconTarget = $('<span>')
								.addClass('pathway-tooltip')
								.attr('data-pathway', toggle.pathway)
								.append(img);
						} else {
							iconTarget = img;
						}
						opt.append(iconTarget);
					}
					if (toggle.label) { opt.append(document.createTextNode(toggle.label)); }
					if (toggle.alt) { opt.attr('title', toggle.alt); }
					opt.append(inpt);
					queries.show[toggle.query] = true; // show by default
					filterGroups[groupName].push(toggle.query);
					// console.log('  Added to', groupName, '- now has', filterGroups[groupName].length, 'queries');
					
					inpt.on('change.fls', (e) => {
						// console.log('Toggle changed:', toggle.label || 'no-label', 'checked:', inpt.is(':checked'));
						if (inpt.is(':checked')) {
							queries.show[toggle.query] = true;
							if (filterGroups[groupName].indexOf(toggle.query) === -1) {
								filterGroups[groupName].push(toggle.query);
								console.log('  Added back to', groupName);
							}
						} else {
							delete queries.show[toggle.query];
							let idx = filterGroups[groupName].indexOf(toggle.query);
							if (idx > -1) {
								filterGroups[groupName].splice(idx, 1);
								// console.log('  Removed from', groupName, '- now has', filterGroups[groupName].length, 'queries');
							}
						}
						applyFLs();
					});
					togglewrap.append(opt);
				});
				// reset toggles in group when clicking label
				togglewrap.find('.fl-toggle-qa-all, .fl-toggle-qa-none').on('click.fls', (e) => {
					let checks = togglewrap.find('.fl-checkbox');
					checks.prop('checked', e.currentTarget.classList.contains('fl-toggle-qa-all'));
					checks.trigger('change');
				});
				filters.append(togglewrap);
			} else if (curr.search) {
				flc++;
				let s = curr.search;
				let labl = $('<label>').addClass('fl-search-label fl-filter-group').attr('for', 'fl-search-'+flc);
				if (curr.class) {
					labl.addClass(curr.class);
				}
				let inpt = $('<input>').addClass('fl-search').attr('id', 'fl-search-'+flc).attr('placeholder', s.placeholder || 'Term to filter by');
				inpt.attr('data-fl-search-query', s.query);
				if (s.img) {
					labl.append(
						$('<img>')
							.attr('src', config.wgServer + mw.util.getUrl(s.img).replace(/^\/wiki\//, '/wiki/Special:Filepath/'))
							.attr('width', '24px')
					);
				}
				if (s.source) {inpt.attr('data-fl-search-source', s.source);}
				if (s.attr) {inpt.attr('data-fl-search-attr', s.attr);}
				if (curr.label) {
					labl.append(document.createTextNode(curr.label));
				}
				labl.append(document.createTextNode(': '), inpt);
				inpt.on('change.fls keyup.fls input.fls', applyFLs);
				filters.append(labl);
			}
		});
		$wrap.prepend(filters);
		mw.hook('wikipage.content').fire(filters);
		// Apply filters on initialization to ensure correct initial state
		applyFLs();
	});
});