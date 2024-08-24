/* Das folgende JavaScript wird für alle Benutzer geladen. */
// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
        mw.util.addCSS($(this).attr("data-css"));
    });
});

/* A+ Wiki Badge */
$('.fandom-community-header__community-name-wrapper').append(
	$('<a>')
	.attr('href', 'https://community.fandom.com/wiki/Admin_Plus')
	.css('height', '30px')
	.append(
		$('<img>')
		.addClass('hover-community-header-wrapper')
		.css('height', '30px')
		.attr('src', 'https://static.wikia.nocookie.net/backrooms/images/a/a7/A%2BWiki.webp/revision/latest?cb=20230828211532&path-prefix=de')
	)
);