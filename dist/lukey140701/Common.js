$("span.image-hover").each(function() {
	var a = [$(this).attr("data-default"), $(this).attr("data-hover")],
		b = /^https{0,1}\:\/\//;
	if (a[0].search(b) + a[1].search(b) == 0) {
		$(this).replaceWith(function() {
			return $("<img />").attr({
				"class": "image-hover",
				"src": a[0].replace(/"/g,"&quot;"),
				"data-a": a[0].replace(/"/g,"&quot;"),
				"data-b": a[1].replace(/"/g,"&quot;")
			}).mouseover(function() {
				$(this).attr(
					"src",
					$(this).attr("data-b")
				);
			}).mouseout(function() {
				$(this).attr(
					"src",
					$(this).attr("data-a")
				);
			});
		});
	}
});




importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:RecentChangesMultiple/code.2.js"
    ]
});