/* Any JavaScript here will be loaded for all users on every page load. */

function handleAutocollapse(root) {
	var $ct = root.find(".mw-collapsible");
	var $es = $ct.filter(".mw-autocollapse").not($ct.first()).not(".mw-collapsed, .mw-uncollapsed, .mw-expanded");
	$es.filter(function() {
		var link = $(this).find(".mw-collapsible-toggle a");
		if (link.length) link.first().click();
		return !link.length;
	}).toggleClass("mw-collapsed mw-autocollapse");
}