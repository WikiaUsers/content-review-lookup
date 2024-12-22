mw.hook('wikipage.content').add(function () {
	if(window.dev && window.dev.CustomFilters) {return;}
	(window.dev = window.dev || {}).CustomFilters=true;
	var config = mw.config.get(['wgPageName', 'wgServer']);
	var flc = 0;
	var decodeEntity = function(str) {
		var textarea = document.createElement('textarea');
		textarea.innerHTML = str;
		return textarea.value.trim();
	};
	
	mw.util.addCSS(
		'.fl-filter-wrapper {display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;align-items: center;}'+
		'.fl-filter-group {display:flex;gap:5px;flex-wrap:wrap;background:var(--theme-page-background-color);padding:5px;border-radius:3px;border:2px solid var(--theme-border-color);align-items: center;min-height: 44px;}'+
		'.fl-checkbox {display:none;}'+
		'.fl-toggle-qa-all, .fl-toggle-qa-none {cursor: pointer;}'+
		'.fl-checkbox-label {display:inline; border-radius: 8px; padding: 3px; cursor: pointer;user-select: none;}'+
		'.fl-checkbox-label:has(.fl-checkbox:checked) {background: rgba(var(--theme-link-color--rgb),0.2); }'+
		'.fl-checkbox-label:hover {outline: solid 1px #E9E5DC;}'+
		'.fl-toggle-label {line-height: 1.2;}'+
		'.fl-toggle-qa {font-size:0.6em;}'+
		'.fl-search {background: var(--theme-color-6); color: var(--theme-page-text-color); border: 0; border-radius: 4px; height: 30px; padding: 4px;}'
	);
	document.querySelectorAll('.fl-wrapper:not(.fl-loaded)').forEach(function(wrapper){
		wrapper.classList.add('fl-loaded');
		var $wrap = $(wrapper);
		var settings = JSON.parse($wrap.children('.fl-sett').html());
		if (!settings) {mw.notify('JSON ไม่ถูกต้อง!'); return;}
		var queries = {
			hide: {},
			show: {}
		};
		var filters = $('<div class="fl-filter-wrapper"></div>');
		var applyFLs = mw.util.debounce(function() {
			var hide = $wrap.find(Object.keys(queries.hide).join(','));
			var show = $wrap.find(Object.keys(queries.show).join(','));
			if (filters.find('.fl-search')) {
				$wrap.find('.fl-search').each(function(_, inpt){
					if (inpt.value.trim().length===0) {return;}
					var val = new RegExp(decodeEntity(inpt.value), 'i');
					var query = decodeEntity(inpt.getAttribute('data-fl-search-query'));
					var attr = decodeEntity(inpt.getAttribute('data-fl-search-attr'));
					var source = decodeEntity(inpt.getAttribute('data-fl-search-source'));
					var els = $wrap.find(query);
					if (hide.length==0 && show.length==0) { // default show everything if no toggle filters exist
						show = els;
					}
					(source ? els.find(source) : els).each(function(_, el){
						var $el = $(el);
						var elsource = source ? $el.closest(query) : $el;
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
		settings.forEach(function(curr) {
			if (curr.toggles) {
				var togglewrap = $(
					'<div class="fl-filter-group '+(curr.class||'')+'">'+
						'<div class="fl-toggle-label">'+
							(curr.label ? (curr.label+':') :'')+
							'<div class="fl-toggle-qa">'+
								'<a class="fl-toggle-qa-all">ทั้งหมด</a>'+
								' &mdash; '+
								'<a class="fl-toggle-qa-none">ไม่มี</a>'+
							'</div>'+
						'</div>'+
					'</div>'
				);
				curr.toggles.forEach(function(toggle){
					flc++;
					var opt = $('<label for="fl-toggle-'+flc+'" class="fl-checkbox-label">');
					var inpt = $('<input id="fl-toggle-'+flc+'" class="fl-checkbox" checked type="checkbox" tabindex="0" />');
					if (toggle.img) {
						opt.append(
							'<img src="'+
								config.wgServer+
								mw.util.getUrl(toggle.img)
									.replace(/^\/wiki\//, '/wiki/Special:Filepath/')+
							'" width="24px" />'
						);
					}
					if (toggle.label) { opt.append(toggle.label); }
					if (toggle.alt) { opt.attr('title', toggle.alt); }
					opt.append(inpt);
					queries.show[toggle.query] = true; // show by default
					inpt.on('change.fls', function(e) {
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
				togglewrap.find('.fl-toggle-qa-all, .fl-toggle-qa-none').on('click.fls', function(e) {
					var checks = togglewrap.find('.fl-checkbox');
					checks.prop('checked', e.currentTarget.classList.contains('fl-toggle-qa-all'));
					checks.trigger('change');
				});
				filters.append(togglewrap);
			} else if (curr.search) {
				flc++;
				var s = curr.search;
				var labl = $('<label class="fl-search-label fl-filter-group '+(curr.class||'')+'" for="fl-search-'+flc+'">');
				var inpt = $('<input class="fl-search" id="fl-search-'+flc+'" placeholder="'+(s.placeholder||'Term to filter by')+'" />');
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