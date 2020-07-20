$("body").on("DOMNodeInserted", "form#ajaxdeleteform", function() {
	$.getJSON('/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:Mass_Delete&cb=' + new Date().getTime(), function(data) {
		var a = data.query.categorymembers,
			b = [];
		for (var i = 0; i < a.length; i++) {
			if (a[i].ns == 6) {
				b.push(a[i].title);
			}
			if (i + 1 == a.length) {
				$("form#ajaxdeleteform textarea").val(b.join("\n"));
			}
		}
	});
});