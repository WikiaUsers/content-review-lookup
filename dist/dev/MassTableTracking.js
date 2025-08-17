/* jshint undef: true, devel: true, typed: true, jquery: true, strict: true, eqeqeq: true, freeze: true, latedef: true, shadow: outer, varstmt: true, quotmark: single, esversion: 6, futurehostile: true */
/* global importArticles */
mw.hook('dev.i18n').add((i18n) => {
	'use strict';
	window.dev = window.dev || {};
		
	// Double/bad load protection
	if (window.dev.tptMassSelect || !document.querySelector('.table-progress-tracking')) { return; }
	else { window.dev.tptMassSelect = true; }
	mw.util.addCSS(`
		.tptMassSelect-selected { border: 2px solid var(--theme-link-color) !important; }
		.tptMassSelect-dialog {
			text-align: center;
			color-scheme: dark light;
			> div { display: flex; gap: 5px; justify-content: center; }
		}
	`);
	
	let holding = false;
	
	$('.mw-parser-output')
	
	// Start selecting
	.on('mousedown', '.table-progress-checkbox-cell', (e)=>{
		if (!e.altKey) { return; }
		holding = true;
		$(e.target).closest('.table-progress-checkbox-cell').toggleClass('tptMassSelect-selected');
	})
	
	// Multi-select
	.on('mouseover', '.table-progress-checkbox-cell', (e)=>{
		if (!e.altKey) { return; }
		if (holding===false || e.target.closest('.table-progress-checkbox-cell') === e.relatedTarget.closest('.table-progress-checkbox-cell')) {return;}
		if (e.ctrlKey) { // Select the entire table, for when you wanna select most, or all, things
			$(e.target)
			.closest('table.table-progress-tracking')
			.find('tbody > tr').filter((_, tr)=>tr.style.display!=='none')
			.find('.table-progress-checkbox-cell')
			.toggleClass('tptMassSelect-selected', true);
		} else {
			$(e.target)
			.closest('.table-progress-checkbox-cell')
			.toggleClass('tptMassSelect-selected');
		}
		
	})
	
	// End and process selection
	.on('mouseup', (e)=>{
		if (holding===false) {return;}
		i18n.loadMessages('MassTableTracking').done((msgs) => {
			holding = false;
			let sel = $('.tptMassSelect-selected');
			if (sel.length<2) {sel.removeClass('tptMassSelect-selected'); return;}
			let dia = $(`<dialog class="tptMassSelect-dialog">
				<p>${msgs.msg('tptms-alert').plain()}</p>
				<div>
					<button value="check">${msgs.msg('tptms-check').plain()}</button>
					<button value="cross">${msgs.msg('tptms-cross').plain()}</button>
					<button value="cancel">${msgs.msg('tptms-cancel').plain()}</button>
				</div>
			</dialog>`);
			let finish = (ret) => {
				let clck = (_, s)=>{s.click();};
				if (ret === 'cross') { sel.find('input:checked').each(clck); }
				else if (ret === 'check') { sel.find('input:not(:checked)').each(clck); }
				dia.get(0).close();
				sel.removeClass('tptMassSelect-selected');
			};
			dia.find('button').on('click', (c)=>{ c.preventDefault(); finish(c.target.getAttribute('value')); });
			dia.appendTo('.mw-parser-output');
			dia.get(0).showModal();
		});
	});
});

// Start by waiting for i18n
importArticles({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });