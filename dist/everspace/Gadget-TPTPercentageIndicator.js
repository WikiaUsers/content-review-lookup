/* Adds a progress percentage bar to secrets tables on ES2 location pages with TPT tables */
mw.hook( 'wikipage.content' ).add( function ( $content ) {
	const TPTcheckboxSelector = 'input[type="checkbox"][data-tpt-row-id][data-table-id]';
	$content.find('.table-progress-tracking').each(function () {
		const $table = $(this);
		const $caption = $('<caption>', { class: 'tpt-percentage-caption progress-percent-background' });
		const $label = $('<b>',{ class: 'tpt-percentage-label', text: 'Progress: ' });
		const $progress = $('<span>',{ class: 'tpt-percentage-value' });
		$caption.append($label,$progress);
		$table.prepend($caption);
		function updateProgress() {
			const $checkboxes = $table.find(TPTcheckboxSelector),
				  total = $checkboxes.length,
				  checked = $checkboxes.filter(':checked').length,
				  percent = total ? Math.round(checked / total * 100) : 0;
			$progress.text(checked + ' of ' + total + ' completed (' + percent + '%)');
			$caption.attr('style','--progress-percent: '+ percent + '%');
		}
		$table.on('change', TPTcheckboxSelector, function () { requestAnimationFrame(updateProgress); });
		const observer = new MutationObserver(function () { requestAnimationFrame(updateProgress); });
		observer.observe($table[0], { subtree: true, attributes: true, attributeFilter: ['data-sort-value'] });
	});
});