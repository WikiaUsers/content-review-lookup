// AJAX tables
$("table.ajax").each(function (i) {
	var table = $(this).attr("id", "ajaxTable" + i);
	table.find(".nojs-message").remove();
	var headerLinks = $('<span style="float: right;">').appendTo(table.find('th').first());
	var cell = table.find("td").first(), needLink = true;
	cell.parent().show();
	if (cell.hasClass("showLinkHere")) {
		var old = cell.html(), rep = old.replace(/\[link\](.*?)\[\/link\]/, '<a href="javascript:;" class="ajax-load-link">$1</a>');
		if (rep != old) {
			cell.html(rep);
			needLink = false;
		}
	}
	if (needLink) headerLinks.html('[<a href="javascript:;" class="ajax-load-link">show data</a>]');
	table.find(".ajax-load-link").parent().andSelf().filter('a').click(function(event) {
		event.preventDefault();
		var sourceTitle = table.data('ajax-source-page'), baseLink = mw.config.get('wgScript') + '?';
		cell.text('Please wait, the content is being loaded...');
		$.get(baseLink + $.param({ action: 'render', title: sourceTitle }), function (data) {
			if (data) {
				cell.html(data);
				cell.find('.ajaxHide').remove();
				cell.find('.terraria').removeClass('terraria');
				if (cell.find("table.sortable").length) {
					mw.loader.using('jquery.tablesorter', function() {
						cell.find("table.sortable").tablesorter();
					});
				}
				headerLinks.text('[');
				headerLinks.append($('<a>edit</a>').attr('href', baseLink + $.param({ action: 'edit', title: sourceTitle })));
				headerLinks.append(document.createTextNode(']\u00A0['));
				var shown = true;
				$("<a href='javascript:;'>hide</a>").click(function() {
					shown = !shown;
					if (shown) {
						cell.show();
					} else {
						cell.hide();
					}
					$(this).text(shown ? "hide" : "show");
				}).appendTo(headerLinks);
				headerLinks.append(document.createTextNode(']'));
			}
		}).error(function() {
			cell.text('Unable to load table; the source article for it might not exist.');
		});
	});
});