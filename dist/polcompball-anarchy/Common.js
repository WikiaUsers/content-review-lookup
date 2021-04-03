$.getJSON("/api/v1/Articles/Top?cb=" + new Date().getTime(), function(data) {
	var a = data.items; // array of results
	$("span.mostvisited").each(function() {
		var b = String(Number($(this).attr("data-limit"))) == "NaN" ? a.length : Number($(this).attr("data-limit")) > a.length ? a.length : Number($(this).attr("data-limit")), // limit (if larger than the results length, override with length of results))
			c = [];
		for (var i = 0; i < b; i++) {
			c.push('\t<li><a href="/wiki/' + a[i].title.replace(" ", "_") + '">' + a[i].title + '</a></li>');
			if (i + 1 == b) {
				$(this).replaceWith('<ol>\n' + c.join("\n") + '\n</ol>');
			}
		}
	});
});