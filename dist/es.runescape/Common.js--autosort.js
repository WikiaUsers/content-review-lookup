/* Any JavaScript here will be loaded for all users on every page load. *//* Any JavaScript here will be loaded for all users on every page load. */
function autosort()
{
	$('table.sortable[class*="autosort="]').each(function() {
		var $this = $(this);
		var matched = /(?:^| )autosort=([0-9]+),(a|d)(?: |$)/.exec($this.attr('class'));
		$this.tablesorter({
			sortList: [[matched[1] - 1, ((matched[2] === 'd')? 1: 0)]],
		});
		/*var row = $this.find('.sortheader').get(matched[1] - 1);
		for(var i = 0; i < ((matched[2] === 'd')? 2: 1); i++) {
			ts_resortTable(row);
		}*/
	});
}
addOnloadHook(autosort);