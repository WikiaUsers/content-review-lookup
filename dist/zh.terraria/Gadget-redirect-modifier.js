$(function() {
	$("a,a *").click(function(event) { 
		if (!event.altKey) return;
		if ($(event.target).hasClass("external")) return;
		h = $(event.target).attr("href");
		if (h.indexOf("?")==-1) h+="?redirect=no";
		else h+= "&redirect=no";
		$(event.target).attr("href", h);
		location.href = h;
	});
});