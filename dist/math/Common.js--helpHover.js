// 12:57, December 16, 2013 (UTC)
// <source lang="JavaScript">

// From Destinypedia
// Link DIVs using data-url attribute

$('.HelpHover').click(function() {
	if (($(this).data("url")).match("^/wiki/")) {
		window.location.replace($(this).data("url"));
	}
});

// END Link DIVs using data-url attribute

// </source>