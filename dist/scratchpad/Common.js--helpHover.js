// 00:03, June 2, 2014 (UTC)
// <source lang="JavaScript">

// From Destinypedia
// Link DIVs using data-url attribute
// Updated by User:Cqm

$('.HelpHover').click(function() {
	if (($(this).data("url")).match("^/wiki/")) {
		window.location.assign($(this).data("url"));
	}
});

// END Link DIVs using data-url attribute

// </source>