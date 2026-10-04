mw.hook('wikipage.content').add(() => {
	if(window.dev && window.dev.CustomFilters || $('.fl-wrapper').length === 0) {return;}
	(window.dev = window.dev || {}).CustomFilters=true;
	let config = mw.config.get(['wgPageName', 'wgServer']);
	let flc = 0;
	let decodeEntity = (str) => {
		let textarea = document.createElement('textarea');
		textarea.innerHTML = str;
		return textarea.value.trim();
	};
	
	$('.fl-wrapper:not(.fl-loaded)').each((_, wrapper) => {
		wrapper.classList.add('fl-loaded');
		let $wrap = $(wrapper);
		
		// Verify settings
		let settings;
		try { settings = JSON.parse($wrap.children('.fl-sett').html()); }
		catch (nope) { console.warn('Invalid JSON at filter: ', wrapper); return; }
		
		let queries = { hide: {}, show: {} };
		let filters = $('<div style="display: none;" class="fl-filter-wrapper"></div>');
		let applyFLs = mw.util.debounce(() => {
			let toggleButtonStatuses = new Map();
			// every query key may have an associated value, which is the name of the radio button that controls the match mode (any/all)
			// many or all of these names may be dups, so use a map to check each just once and store the values for later lookup
			let toggleButtonNames = Object.values(queries.hide).concat(Object.values(queries.show));
			for (const toggleButtonIndex in toggleButtonNames) {
				const toggleButtonName = toggleButtonNames[toggleButtonIndex];
				if (toggleButtonStatuses.get(toggleButtonName) === undefined) {
					let matchAll = false;
					const matchAllRadioButton = document.querySelectorAll(
						'input[id="' + toggleButtonName + '"]'
					);
					if (matchAllRadioButton.length == 1 && matchAllRadioButton[0].checked) {
						matchAll = true;
					}
					toggleButtonStatuses.set(toggleButtonName, matchAll);
				}
			}
			let matchAnyQueries = [];
			let matchAllQueries = [];
			for(queryIndex in queries.show) {
				let toggleButtonName = queries.show[queryIndex];
				if(toggleButtonStatuses.get(toggleButtonName) === true) {
					matchAllQueries.push(queryIndex);
				} else {
					matchAnyQueries.push(queryIndex);
				}
			}
			let hide = $wrap.find(Object.keys(queries.hide).join(','));
			let show = $wrap.find(matchAnyQueries.join(','));
			for(queryIndex in matchAllQueries) {
				let query = matchAllQueries[queryIndex];
				$.merge(hide, show.not(query));
				show = show.filter(query);
			}
			if (filters.find('.fl-search')) {
				$wrap.find('.fl-search').each((__, inpt) => {
					if (inpt.value.trim().length===0) {return;}
					let val = new RegExp(decodeEntity(inpt.value), 'i'),
						query = decodeEntity(inpt.getAttribute('data-fl-search-query')),
						attr = decodeEntity(inpt.getAttribute('data-fl-search-attr')),
						source = decodeEntity(inpt.getAttribute('data-fl-search-source')),
						els = $wrap.find(query);
					if (hide.length===0 && show.length===0) { // default show everything if no toggle filters exist
						show = els;
					}
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
		settings.forEach((curr) => {
			if (curr.toggles) {
				let togglewrap = $(
					'<div class="fl-filter-group '+mw.html.escape(curr.class||'')+'">'+
						'<div class="fl-toggle-label">'+
							mw.html.escape(curr.label ? (curr.label+':') :'')+
							'<div class="fl-toggle-qa">'+
								'<a class="fl-toggle-qa-all">ALL</a>'+
								' &mdash; '+
								'<a class="fl-toggle-qa-none">NONE</a>'+
							'</div>'+
						'</div>'+
					'</div>'
				);
				if (curr.anyAllToggle) {
					curr.toggles.forEach((toggle) => {
					toggle.radioButtonName = curr.label + 'MatchAll';
					});
				}
				curr.toggles.forEach((toggle) => {
					flc++;
					let opt = $('<label for="fl-toggle-'+flc+'" class="fl-checkbox-label">');
					let inpt = $('<input id="fl-toggle-'+flc+'" class="fl-checkbox" checked type="checkbox" tabindex="0" />');
					if (toggle.imgL && $('body[data-theme="light"]').length>0) {
						opt.append(`<img src="${config.wgServer+mw.util.getUrl('Special:Filepath/'+toggle.imgL)}" class="${mw.html.escape(toggle.imgLClass || toggle.imgClass || '')}" width="24px" />`);
					} else if (toggle.imgD && $('body[data-theme="dark"]').length>0) {
						opt.append(`<img src="${config.wgServer+mw.util.getUrl('Special:Filepath/'+toggle.imgD)}" class="${mw.html.escape(toggle.imgDClass || toggle.imgClass || '')}" width="24px" />`);
					} else if (toggle.img) {
						opt.append(`<img src="${config.wgServer+mw.util.getUrl('Special:Filepath/'+toggle.img)}" class="${mw.html.escape(toggle.imgClass || '')}" width="24px" />`);
					}
					if (toggle.label) { opt.append(mw.html.escape(toggle.label)); }
					if (toggle.alt) { opt.attr('title', toggle.alt); }
					opt.append(inpt);
					// store the name of the radio button that determines whether this query is in 'match all' or 'match any' mode in the values
					// applyFLs only uses the keys' presence in either the hide/show object to do the filtering
					queries.show[toggle.query] = toggle.radioButtonName ? toggle.radioButtonName : ''; // show by default
					inpt.on('change.fls', (e) => {
						if (inpt.is(':checked')) {
							delete queries.hide[toggle.query];
							queries.show[toggle.query] = toggle.radioButtonName ? toggle.radioButtonName : '';
						} else {
							delete queries.show[toggle.query];
							queries.hide[toggle.query] = toggle.radioButtonName ? toggle.radioButtonName : '';
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
				if (curr.anyAllToggle) {
					let matchAnyAll = $(
						'<input type="radio" name="' +
						curr.label +
						'MatchAnyAll" id="' +
						curr.label +
						'MatchAny" value="' +
						curr.label +
						'MatchAny" checked></input>' +
						'<label for="' +
						curr.label +
						'MatchAny">Match Any</label>' +
						'<input type="radio" name="' +
						curr.label +
						'MatchAnyAll" id="' +
						curr.label +
						'MatchAll" value="' +
						curr.label +
						'MatchAll"></input>' +
						'<label for="' +
						curr.label +
						'MatchAll">Match All</label>'
					);
					matchAnyAll.on('change.fls', applyFLs);
					// flex break element to put the radio buttons on a new line
					togglewrap.append('<div class="fl-toggle-flex-break"></div>', matchAnyAll);
				}
				filters.append(togglewrap);
			} else if (curr.search) {
				flc++;
				let s = curr.search;
				let labl = $('<label class="fl-search-label fl-filter-group '+mw.html.escape(curr.class||'')+'" for="fl-search-'+flc+'">');
				let inpt = $('<input class="fl-search" id="fl-search-'+flc+'" placeholder="'+mw.html.escape(s.placeholder||'Term to filter by')+'" />');
				inpt.attr('data-fl-search-query', s.query);
				if (s.img) {labl.append('<img src="'+config.wgServer+mw.util.getUrl(s.img).replace(/^\/wiki\//, '/wiki/Special:Filepath/')+'" width="24px" />');}
				if (s.source) {inpt.attr('data-fl-search-source', s.source);}
				if (s.attr) {inpt.attr('data-fl-search-attr', s.attr);}
				labl.append(mw.html.escape(curr.label), ': ', inpt);
				inpt.on('change.fls', applyFLs);
				filters.append(labl);
			}
		});
		$wrap.prepend(filters);
		importArticles({
			type:'style',
			articles: ['MediaWiki:CustomFilters.css']
		}).then(()=>{filters.show()});
	});
});