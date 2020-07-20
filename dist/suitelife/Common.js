/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('AjaxBatchDelete/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');

$(document).ready(function() {
	$(".page-Special_RecentChanges").each(function() {
		$("table.mw-enhanced-rc.mw-collapsible").removeClass("mw-collapsible");
		$(".mw-collapsible-toggle").live("mouseover", function() { $(this).unbind().die(); });
		
		/* Sliding enhanced page */
		$("table.mw-enhanced-rc.mw-made-collapsible .mw-rc-openarrow a, table.mw-enhanced-rc.mw-made-collapsible .mw-rc-closearrow a").live("click", function() {
			var $collTable = $(this).closest("table.mw-enhanced-rc.mw-made-collapsible");
			var $openarrow = $collTable.find(".mw-rc-openarrow");
			var $closearrow = $collTable.find(".mw-rc-closearrow");
			
			$openarrow.css("visibility","visible").removeClass("mw-changeslist-hidden mw-changeslist-expanded");
			$closearrow.css("visibility","visible").removeClass("mw-changeslist-hidden mw-changeslist-expanded");
			
			if ($collTable.find("tr:last").is(":hidden")) {
				$openarrow.hide();
				$closearrow.show();
				$collTable.find("tr:not(:first)").show();
			} else {
				$openarrow.show();
				$closearrow.hide();
				$collTable.find("tr:not(:first)").hide();
			}
			
			return false;
		});
	});
});