/**
 * Skrypt do automatycznego zwijania tabeli i navboxów umieszczonych jedna za drugą.
 * 
 * @author  MGRINZ
 */

$(function () {
	var selector = ".mw-collapsible.autocollapse";
	$(selector).each(function () {
		var table = $(this);
		var nextTable = table.next(selector);
 
		if(nextTable.length) {
			if(!table.hasClass("mw-collapsed"))
				table.find(".mw-collapsible-toggle").click();
			if(!nextTable.hasClass("mw-collapsed"))
				nextTable.find(".mw-collapsible-toggle").click();
		}
	});
});