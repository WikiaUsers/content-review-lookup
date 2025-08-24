/**
 * Name:        MHBGoogleSpreadsheet
 * Author:      Caburum, modified by MileHighBrendan
 * Description: Allows intergration with Google Spreadsheets
 */
 
mw.hook('wikipage.content').add(function($content) {
	if (!$content) return;

	$content.find('.mhb-googlespreadsheet').each(function() {
		var $this = $(this),
			chartId = $this.attr('data-chart-gid');

		$this.html($('<iframe>', {
			src: 'https://docs.google.com/spreadsheets/d/e/' + encodeURIComponent($this.attr('data-spreadsheet-id')) +
				(chartId ? ('/pubhtml?format=interactive&single=true&gid=' + encodeURIComponent(chartId))
				: ('/pubhtml?widget=' + encodeURIComponent($this.attr('data-widget') || true))),
			css: {
				width: 'inherit',
				height: 'inherit',
				border: 0,
			},
		}));
	});
});