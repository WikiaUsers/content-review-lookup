/* jshint undef: true, devel: true, typed: true, jquery: true, strict: true, eqeqeq: true, freeze: true, latedef: true, shadow: outer, varstmt: true, quotmark: single, esversion: 6, futurehostile: true */
mw.loader.using('mediawiki.api', ()=>{
	'use strict';
	window.dev = window.dev || {};
		
	// Double/bad load protection
	if (window.dev.SharedTableTracking || !document.querySelector('.table-progress-tracking [data-tpt-share]')) { return; }
	else { window.dev.SharedTableTracking = true; }
	let 
	config = mw.config.values,
	api = new mw.Api(),
	
	// Cache toggles based on wiki and on unique ID
	checkNewTable = mw.util.throttle((_1, mo) => {
		$('table.table-progress-tracking:not(.stt-loaded):has([data-tpt-share])').each((_2, wrap) => {
			let $wrap = $(wrap);
			$wrap.addClass('stt-loaded');
			$wrap
			.find('tr:has([data-tpt-share])')
			.each((_3, row) => {
				let
				$row = $(row),
				shared = $row.find('input[data-tpt-row-id]');
				
				if ($row.find('[data-tpt-share]').length===0 || shared.length===0) {return;}
				
				$row
				.find('[data-tpt-share]')
				.attr('data-tpt-share')
				.split(';')
				.forEach(id => {
					let sh = $wrap.find('tr:has([data-tpt-row-id="'+id+'"])');
					if (sh.length>0) {
						shared = shared.add(
							sh.find('input[data-tpt-row-id]')
						);
						sh.find('[data-tpt-share]').removeAttr('data-tpt-share');
					}
				});
				$row.find('[data-tpt-share]').removeAttr('data-tpt-share');
				let syncShared = mw.util.debounce((e)=>{
					shared
					.remove(e.target)
					.each((_5, ch) => {
						if (ch.checked!==e.target.checked) { ch.click(); }
					});
				}, 250);
				shared.on('change', syncShared);
			});
		});
		
		// Stop MO if no tables left to process
		if (mo && $('table.table-progress-tracking').length === $('table.table-progress-tracking.stt-loaded').length) {mo.disconnect;}
	}, 500);

	checkNewTable();
	let MO = new MutationObserver(checkNewTable);
	MO.observe(document.querySelector('.mw-parser-output'), {attributes:true, childList:true, subtree:true});
});