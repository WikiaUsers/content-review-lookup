/* jshint undef: true, devel: true, typed: true, jquery: true, strict: true, eqeqeq: true, freeze: true, latedef: true, shadow: outer, varstmt: true, quotmark: single, esversion: 6, futurehostile: true */
mw.loader.using('mediawiki.api', ()=>{
	'use strict';
	window.dev = window.dev || {};
		
	// Double/bad load protection
	if (window.dev.CrossPageTracking || !document.querySelector('.table-progress-tracking')) { return; }
	else { window.dev.CrossPageTracking = true; }
	let 
	config = mw.config.values,
	api = new mw.Api(),
	
	// Cache toggles based on wiki and on unique ID
	checkNewTable = mw.util.throttle((_1, mo) => {
		let only =
			(window.dev.CrossPageTracking_only && Array.isArray(window.dev.CrossPageTracking_only) && window.dev.CrossPageTracking_only.length>0) ? 
				':is('+window.dev.CrossPageTracking_only.join(',')+')'
				: '';
		let excl = 
			(window.dev.CrossPageTracking_exclude && Array.isArray(window.dev.CrossPageTracking_exclude) && window.dev.CrossPageTracking_exclude.length>0) ? 
				':not('+window.dev.CrossPageTracking_exclude.join(',')+')'
				: '';
		$('table.table-progress-tracking:not(.cpt-synced):not(:has(.table-progress-checkbox-cell input[disabled]))'+only+excl).each((_2, wrap) => {
			wrap.classList.add('cpt-synced');
			let	$wrap = $(wrap),
				id = $wrap.attr('data-tpt-id').replace(/ /g, '_'), // user option cant have spaces, apparently
				checks = $wrap.find('.table-progress-checkbox-cell input[data-tpt-row-id]'),
				cache,
				setCache = mw.util.throttle(()=>{ api.saveOption('userjs-CPT-'+config.wgWikiID+'_'+id, JSON.stringify(cache)); }, 500);
			
			// Check for existing cache
			try { cache = JSON.parse(mw.user.options.values['userjs-CPT-'+config.wgWikiID+'_'+id])}
			catch (_3) { cache = {}; }
			
			checks.each((_4, check) => {
				let rowID = check.getAttribute('data-tpt-row-id');
				if (cache[rowID] === undefined) { cache[rowID] = check.checked; }
				else if (check.checked !== cache[rowID]) { check.click(); }
			});
			setCache();
			checks.on('change', (e) => {
				cache[e.target.getAttribute('data-tpt-row-id')] = e.target.checked;
				setCache();
			});
		});
		
		// Stop MO if no tables left to process
		if (mo && $('table.table-progress-tracking'+only+excl).length === $('table.table-progress-tracking.cpt-synced'+only+excl).length) {mo.disconnect;}
	}, 500);

	checkNewTable();
	let MO = new MutationObserver(checkNewTable);
	MO.observe(document.querySelector('.mw-parser-output'), {attributes:true, childList:true, subtree:true});
});