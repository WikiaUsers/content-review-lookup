/* from EN Genshin Impact wiki: https://genshin-impact.fandom.com/wiki/MediaWiki:CustomFilters.js */
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
		let filters = $('<div class="fl-filter-wrapper"></div>');
		let applyFLs = mw.util.debounce(() => {
			let hide = $wrap.find(Object.keys(queries.hide).join(','));
			let show = $wrap.find(Object.keys(queries.show).join(','));
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
					'<div class="fl-filter-group '+(curr.class||'')+'">'+
						'<div class="fl-toggle-label">'+
							(curr.label ? (curr.label+':') :'')+
							'<div class="fl-toggle-qa">'+
								'<a class="fl-toggle-qa-all">WSZYSTKIE</a>'+
								' &mdash; '+
								'<a class="fl-toggle-qa-none">ŻADNE</a>'+
							'</div>'+
						'</div>'+
					'</div>'
				);
				curr.toggles.forEach((toggle) => {
					flc++;
					let opt = $('<label for="fl-toggle-'+flc+'" class="fl-checkbox-label">');
					let inpt = $('<input id="fl-toggle-'+flc+'" class="fl-checkbox" checked type="checkbox" tabindex="0" />');
					let imgClass = toggle.imgClass || '';
					if (toggle.class) {
						imgClass += ' ' + toggle.class;
					}
					if (toggle.imgL && $('body[data-theme="light"]').length>0) {
						opt.append(`<img src="${config.wgServer+mw.util.getUrl('Special:Filepath/'+toggle.imgL)}" class="${imgClass}" width="24px" />`);
					} else if (toggle.imgD && $('body[data-theme="dark"]').length>0) {
						opt.append(`<img src="${config.wgServer+mw.util.getUrl('Special:Filepath/'+toggle.imgD)}" class="${imgClass}" width="24px" />`);
					} else if (toggle.img) {
						opt.append(`<img src="${config.wgServer+mw.util.getUrl('Special:Filepath/'+toggle.img)}" class="${imgClass}" width="24px" />`);
	}
					if (toggle.label) { opt.append(toggle.label); }
					if (toggle.alt) { opt.attr('title', toggle.alt); }
					opt.append(inpt);
					queries.show[toggle.query] = true; // show by default
					inpt.on('change.fls', (e) => {
						if (inpt.is(':checked')) {
							delete queries.hide[toggle.query];
							queries.show[toggle.query] = true;
						} else {
							delete queries.show[toggle.query];
							queries.hide[toggle.query] = true;
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
				inpt.on('change.fls', applyFLs);
				filters.append(labl);
			}
		});
		$wrap.prepend(filters);
	});
});