/* jshint undef: true, devel: true, typed: true, jquery: true, strict: true, eqeqeq: true, freeze: true, latedef: true, shadow: outer, varstmt: true, quotmark: single, esversion: 6, futurehostile: true */
/* global importArticles */
mw.hook('wikipage.content').add(()=>{
	'use strict';
	window.dev = window.dev || {};
	
	// Double load protection and load CSS
	if (window.dev.TrackingTableFilters) { return; }
	else { window.dev.TrackingTableFilters = true; }
	// CSS (inline rule bc RL has something against the space in the attribute selector -__-)
	mw.util.addCSS('table.table-progress-tracking.ttf-load tbody > tr[style*="display: none;"] {visibility: collapse !important;}');
	importArticles({
		type: 'style',
		articles: ['u:dev:MediaWiki:TrackingTableFilters.css']
	});

	let MO = new MutationObserver(mw.util.throttle(()=> {
		let $wrap = $('table.table-progress-tracking:not(.ttf-load):has(.table-progress-checkbox-cell):not(:has(.table-progress-checkbox-cell input[disabled]))'),
			toToggle = $wrap.find('tbody > tr'),
			checkIdx = 0,
			id = $wrap.attr('data-tpt-id');
		$wrap.addClass('ttf-load');
		$wrap.on('input change', 'thead td input', mw.util.debounce((e) => {
			if (e.target.getAttribute('type')==='checkbox') { checkIdx = (checkIdx+1) % 3; e.target.setAttribute('idx', checkIdx); }
			console.log(checkIdx);
			let toHide,
				searches = [];
			$wrap.find('thead td').each((_, td) => { searches.push(($(td).find('.ttf-search').val() || '').toLowerCase()); });
			toToggle.each((_, tr) => {
				let hide = false,
					$tr = $(tr);
				searches.forEach((val, i) => {
					if (i===0 && checkIdx!==0) {
						if (
							(checkIdx===1 && !$tr.find('input[data-table-id="'+id+'"]:checked').length)
							|| (checkIdx===2 && !$tr.find('input[data-table-id="'+id+'"]:not(:checked)').length)
						) { hide = true; }
					}
					if (i===0 || val.length===0 || hide===true) {return;}
					if (
						$tr.children(`:nth-child(${i+1})`)
						.text().toLowerCase()
						.indexOf(val) === -1
					) { hide = true; }
				});
				if (hide===true) {toHide = toHide ? toHide.add(tr) : $tr;}
			});
			console.log({
				searches: searches,
				toHide: toHide,
				toToggle: toToggle
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
				Array($wrap.find('thead th:not(:first-child)').length)
				.fill('<td><input type="text" placeholder="Filter" class="ttf-search" size="1" /></td>')
			)
		});
		$wrap.find('thead').append(tr);
	}, 500));
	
	// Weird initalization so have to constantly check
	MO.observe(document.querySelector('.mw-parser-output'), {attributes:true, childList:true, subtree:true});
});