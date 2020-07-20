function wikilistToggleInactive() {
    var showInactive = 'pokaż nieaktywne';
    var hideInactive = 'ukryj nieaktywne';
	
	if($("#wikilist-wrapper").hasClass('init-done')) return;
	
	var div = '<div class="toggle-link-wrapper">[<a href="#" class="toggle-link"></a>]</div>';
    $("#wikilist-wrapper").prepend(div).append(div);
	
	var links = $("#wikilist-wrapper A.toggle-link")
	if($("#wikilist-wrapper").hasClass('hide-inactive')) {
		links.html(showInactive)
	} else {
		links.html(hideInactive)
	}
	links.click(function (e) {
		e.preventDefault();
		var links = $("#wikilist-wrapper A.toggle-link")
		if($("#wikilist-wrapper").hasClass('hide-inactive')) {
			$("#wikilist-wrapper").removeClass('hide-inactive')
			links.html(hideInactive)
		} else {
			$("#wikilist-wrapper").addClass('hide-inactive')
			links.html(showInactive)
		}
	});
	$("#wikilist-wrapper").addClass('init-done')
}
addOnloadHook(wikilistToggleInactive);