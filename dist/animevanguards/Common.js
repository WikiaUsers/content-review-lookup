mw.hook('wikipage.content').add(function () {
	var config = mw.config.get(['wgPageName', 'wgServer']);
	function decodeEntity(str) {
		var textarea = document.createElement('textarea');
		textarea.innerHTML = str;
		return textarea.value.trim();
	}
	
	mw.loader.using('jquery.makeCollapsible').then(function(){
		mw.util.addCSS(
			'.fl-toggle-label{color:var(--theme-link-color);border-radius:5px;background:var(--theme-page-background-color);border:1px solid var(--theme-link-color);font-size:24px;padding:3px;}'+
			'.fl-toggle-label:after{content:" ▲"}'+
			'.fl-toggle-label:has(+.mw-collapsed):after{content:" ▼";}'+
			'.fl-toggle-options{display:flex;flex-direction:column;gap:3px;position:absolute;z-index:9999;background:var(--theme-page-background-color);padding:3px;border-radius:3px;border:2px solid var(--theme-border-color);box-shadow:0 20px 30px 0 rgb(0, 0, 0);}'+
			'.fl-filter-wrapper{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;align-items: center;}'+
			'.fl-checkbox{display:none;position:absolute}.fl-checkbox-label{display:inline}.fl-checkbox-label:before{display:inline-flex;content:"\\2800";position:relative;align-items:center;border-style:solid;border-width:2px;color:var(--theme-link-color);height:16px;width:16px;top:0;bottom:0;left:0;margin-right:4px}.fl-checkbox-label:has(.fl-checkbox:checked):before,.fl-checkbox:checked + .fl-checkbox-label:before{content:"\\2714"}'
		);
		document.querySelectorAll('.fl-wrapper').forEach(function(wrapper){
			var $wrap = $(wrapper);
			var settings = JSON.parse($wrap.children('.fl-sett').html());
			if (!settings) {mw.notify('Invalid JSON!'); return;}
			var queries = {
				hide: {},
				show: {}
			};
			var filters = $('<div class="fl-filter-wrapper"></div>');
			var applyFLs = mw.util.debounce(function() {
				var hide = $wrap.find(Object.keys(queries.hide).join(','));
				var show = $wrap.find(Object.keys(queries.show).join(','));
				var showF = function(){if(this.classList.contains('fl-hidden')){this.classList.remove('fl-hidden');} };
				var hideF = function(){if(!this.classList.contains('fl-hidden')){this.classList.add('fl-hidden');} };
				if (filters.find('.fl-search')) {
					$wrap.find('.fl-search').each(function(_, inpt){
						if (inpt.value.trim().length===0) {return;}
						var val = new RegExp(decodeEntity(inpt.value), 'i');
						var query = decodeEntity(inpt.getAttribute('data-fl-search-query'));
						var attr = decodeEntity(inpt.getAttribute('data-fl-search-attr'));
						var source = decodeEntity(inpt.getAttribute('data-fl-search-source'));
						var els = $wrap.find(query);
						(source ? els.find(source) : els).each(function(_, el){
							var $el = $(el);
							var elsource = source ? $el.closest(query) : $el;
							if (
								(attr && (!$el.attr(attr) || $el.attr(attr).trim().search(val)===-1) ) ||
								(!attr && $el.text().trim().search(val)===-1)
							) {
								show = show.not(elsource[0]);
								hide = hide.add(elsource[0]);
							}
						});
					});
				}
				show.not(hide).fadeIn(500, showF);
				hide.fadeOut(500, hideF);
			}, 1000);
			settings.forEach(function(curr) {
				if (curr.toggles) {
					var togglewrap = $('<div class="fl-toggle"><span class="fl-toggle-label">'+curr.label+'</span><div class="fl-toggle-options"></div></div>');
					var optgroup = togglewrap.children('.fl-toggle-options');
					curr.toggles.forEach(function(toggle){
						var opt = $('<label for="fl-toggle-'+curr.label+'-'+toggle.label+'" class="fl-checkbox-label">');
						var inpt = $('<input id="fl-toggle-'+curr.label+'-'+toggle.label+'" class="fl-checkbox" checked type="checkbox" />');
						if (toggle.img) {
							opt.append('<img src="'+config.wgServer+mw.util.getUrl(toggle.img).replace(/^\/wiki\//, '/wiki/Special:Filepath/')+'" width="24px" />');
						}
						opt.append(toggle.label);
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
						optgroup.append(opt);
					});
					optgroup.makeCollapsible({
						collapsed:true,
						$customTogglers: togglewrap.children('.fl-toggle-label')[0],
					});
					filters.append(togglewrap);
				} else if (curr.search) {
					var s = curr.search;
					var labl = $('<label class="fl-search-label" for="fl-search-'+curr.label+'">');
					var inpt = $('<input class="fl-search" id="fl-search-'+curr.label+'" placeholder="'+(s.placeholder||'Term to filter by')+'" />');
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

});