$(function() {
	var links = $(".categories .normal a");
	if (links.length <= 1) return;
	links.before('<input type="checkbox" checked="checked" class="intersect-checkbox" />');
	$(".categories").last().append('<li class="intersect-item"><button type="button" id="intersect-button">Find similar pages</button></li>');
	mw.util.addCSS('.categories li .intersect-checkbox { display:inline; width:13px; }');
	$("#intersect-button").click(function() {
		var outList = "", outCount = 0;
		$(".categories .intersect-checkbox:checked + a").each(function() {
			outList += (outCount++ ? '::' : '') + $(this).text();
		});
		if (outCount == 0) {
			alert("You must select at least one category to find similar pages.");
			return;
		} else if (outCount == 1) {
			window.location = mw.util.getUrl('Category:' + outList);
		} else {
			window.location = mw.util.getUrl('Intersection:' + outList);
		}
		$(this).text("Redirecting...");
	});
});