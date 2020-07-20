// FloatingTableHeader.js
// From https://archive.is/zJzTe, 
// with very slight modifications
// ported and adapted for Wikia Oasis by mfaizsyahmi

$("table.floatheader").each(function() {
	$(this).wrap("<div class=\"divTableWithFloatingHeader\" style=\"position:relative\"></div>");
	
	// CHG: deliberately put cloned row to second row,
	//      to try make sort buttons stay on page
	var originalHeaderRow = $("tr:first", this);
	var clonedHeaderRow = originalHeaderRow.clone();
	clonedHeaderRow.insertAfter(originalHeaderRow);
	
	clonedHeaderRow.addClass("tableFloatingHeader");
	clonedHeaderRow.css("position", "absolute");
	clonedHeaderRow.css("top", "0");
	clonedHeaderRow.css("left", $(this).css("margin-left"));
	clonedHeaderRow.css("visibility", "hidden");
	
	originalHeaderRow.addClass("tableFloatingHeaderOriginal");
});
UpdateTableHeaders();
$(window).scroll(UpdateTableHeaders).resize(UpdateTableHeaders);

function UpdateTableHeaders() {
	$("div.divTableWithFloatingHeader").each(function() {
		var originalHeaderRow = $(".tableFloatingHeaderOriginal", this);
		var floatingHeaderRow = $(".tableFloatingHeader", this);
		var offset = $(this).offset();
		var scrollTop = $(window).scrollTop();
		var globalNavOffset = $('#globalNavigation').height();
		if ((scrollTop > offset.top - globalNavOffset) && (scrollTop + globalNavOffset < offset.top + $(this).height())) {
			floatingHeaderRow.css("visibility", "visible");
			floatingHeaderRow.css("top", Math.min(scrollTop - offset.top + globalNavOffset, $(this).height() - floatingHeaderRow.height()) + "px");
 
			// Copy cell widths from original header
			$("th", floatingHeaderRow).each(function(index) {
				var cellWidth = $("th", originalHeaderRow).eq(index).css('width');
				$(this).css('width', cellWidth);
			});
 
			// Copy row width from whole table
			floatingHeaderRow.css("width", $(this).css("width"));
		} else {
			floatingHeaderRow.css("visibility", "hidden");
			floatingHeaderRow.css("top", "0");
		}
	});
}