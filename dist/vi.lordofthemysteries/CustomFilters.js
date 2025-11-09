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
		let filters = $('<div class="fl-filter-wrapper"></div>');
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
				
				let togglewrap = $(
					'<div class="fl-filter-group '+(curr.class||'')+'" data-group="'+groupName+'">'+
						'<div class="fl-toggle-label">'+
							(curr.label ? (curr.label+':') :'')+
							(curr.all || curr.none ? '<div class="fl-toggle-qa">' : '')+
								(curr.all ? '<a class="fl-toggle-qa-all">ALL</a>' : '')+
								(curr.all && curr.none ? ' &mdash; ' : '')+
								(curr.none ? '<a class="fl-toggle-qa-none">NONE</a>' : '')+
							(curr.all || curr.none ? '</div>' : '')+
						'</div>'+
					'</div>'
				);
				curr.toggles.forEach((toggle) => {
					flc++;
					// console.log('Adding toggle:', toggle.label || 'no-label', 'query:', toggle.query);
					let opt = $('<label for="fl-toggle-'+flc+'" class="fl-checkbox-label">');
					let inpt = $('<input id="fl-toggle-'+flc+'" class="fl-checkbox" checked type="checkbox" tabindex="0" />');
					if (toggle.imgL && $('body[data-theme="light"]').length>0) {
						opt.append(`<img src="${config.wgServer+mw.util.getUrl('Special:Filepath/'+toggle.imgL)}" class="${toggle.imgLClass || toggle.imgClass || ''}" width="24px" />`);
					} else if (toggle.imgD && $('body[data-theme="dark"]').length>0) {
						opt.append(`<img src="${config.wgServer+mw.util.getUrl('Special:Filepath/'+toggle.imgD)}" class="${toggle.imgDClass || toggle.imgClass || ''}" width="24px" />`);
					} else if (toggle.img) {
						opt.append(`<img src="${config.wgServer+mw.util.getUrl('Special:Filepath/'+toggle.img)}" class="${toggle.imgClass || ''}" width="24px" />`);
					}
					if (toggle.label) { opt.append(toggle.label); }
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
				let labl = $('<label class="fl-search-label fl-filter-group '+(curr.class||'')+'" for="fl-search-'+flc+'">');
				let inpt = $('<input class="fl-search" id="fl-search-'+flc+'" placeholder="'+(s.placeholder||'Term to filter by')+'" />');
				inpt.attr('data-fl-search-query', s.query);
				if (s.img) {labl.append('<img src="'+config.wgServer+mw.util.getUrl(s.img).replace(/^\/wiki\//, '/wiki/Special:Filepath/')+'" width="24px" />');}
				if (s.source) {inpt.attr('data-fl-search-source', s.source);}
				if (s.attr) {inpt.attr('data-fl-search-attr', s.attr);}
				labl.append(curr.label, ': ', inpt);
				inpt.on('change.fls keyup.fls input.fls', applyFLs);
				filters.append(labl);
			}
		});
		$wrap.prepend(filters);
		// Apply filters on initialization to ensure correct initial state
		applyFLs();
	});
});