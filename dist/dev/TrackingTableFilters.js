/* jshint undef: true, devel: true, typed: true, jquery: true, strict: true, eqeqeq: true, freeze: true, latedef: true, shadow: outer, varstmt: true, quotmark: single, esversion: 6, futurehostile: true */
/* global importArticles */
mw.hook('wikipage.content').add(()=>{
	'use strict';
	window.dev = window.dev || {};
	
	// Double/bad load protection
	if (window.dev.TrackingTableFilters || !document.querySelector('.mw-parser-output')) { return; }
	else { window.dev.TrackingTableFilters = true; }
	
	// CSS (inline rule bc RL has something against the space in the attribute selector -__-)
	mw.util.addCSS('table.table-progress-tracking.ttf-loaded tbody > tr[style*="display: none;"] {visibility: collapse !important;}');
	importArticles({ type: 'style', articles: ['u:dev:MediaWiki:TrackingTableFilters.css'] });
	
	// The actual code
	let filterNewTables = mw.util.throttle(() => {
		$(`table.table-progress-tracking${window.dev.TrackingTableFilters_only ? ':is('+window.dev.TrackingTableFilters_only.join(',')+')' : ''}:not(.ttf-loaded, .ttf-ignore):has(.table-progress-checkbox-cell):not(:has(.table-progress-checkbox-cell input[disabled]))`).each((__, wrap) => {
			let	$wrap = $(wrap),
				toToggle = $wrap.find('tbody > tr'),
				checkIdx = 0,
				id = $wrap.attr('data-tpt-id');
			$wrap.addClass('ttf-loaded');
			$wrap.on('input change', 'thead td input', mw.util.debounce((e) => {
				if (e.target.getAttribute('type')==='checkbox') { checkIdx = (checkIdx+1) % 3; e.target.setAttribute('idx', checkIdx); }
				let toHide,
					searches = [];
				$wrap.find('thead td').each((i, td) => {
					let 
					$td = $(td),
					filter = {
						txt: ($td.find('.ttf-search').val() || '').toLowerCase(),
						spn: parseInt($td.attr('colspan'))||1
					};
					if (filter.spn<1) {filter.spn=1;}
					searches.push(filter);
				});
				toToggle.each((_, tr) => {
					let hide = false,
						$tr = $(tr),
						idx = 0;
					searches.forEach((val, i) => {
						if (i===0 && checkIdx!==0) {
							if (
								(checkIdx===1 && !$tr.find('input[data-table-id="'+id+'"]:checked').length)
								|| (checkIdx===2 && !$tr.find('input[data-table-id="'+id+'"]:not(:checked)').length)
							) { hide = true; }
						}
						if (i===0 || val.txt.length===0 || hide===true) {idx++; return;}
						let min = idx+1,
							max = idx+(val.spn||1),
							found = 0;
						for (e = min; e <= max; e++) {
							let cell = $tr.children(':nth-child('+e+')');
							if (cell.length > 0 &&
								$tr.children(':nth-child('+e+')')
								.text().toLowerCase()
								.indexOf(val.txt) !== -1
							) { found++; }
							idx++;
						}
						if (found===0) {hide = true;}
					});
					if (hide===true) {toHide = toHide ? toHide.add(tr) : $tr;}
				});
				if (toHide) {
					toToggle.not(toHide).fadeIn(250);
					toHide.fadeOut(250);
				} else {
					toToggle.fadeIn(250);
				}
			}, 500));
			let tr = $('<tr>', {html: 
				[`<td class="table-progress-checkbox-cell"><div class="wds-checkbox"><input type="checkbox" id="${id}" idx="0" /><label for="${id}"></label></div></td>`]
				.concat(
					Array($wrap.find('thead th:not(:first-child)').length).fill('')
					.map((_, i)=>`<td colspan="${$wrap.find('thead th:not(:first-child):nth-child('+(i+2)+')').attr('colspan')||'1'}"><input type="text" placeholder="Filter" class="ttf-search" size="1" /></td>`)
				)
			});
			$wrap.find('thead').append(tr);
		});
	}, 2000);
	
	// Weird initalization so have to constantly check
	filterNewTables();
	let MO = new MutationObserver(filterNewTables);
	MO.observe(document.querySelector('.mw-parser-output'), {attributes:true, childList:true, subtree:true});
});