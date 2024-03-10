/**
 * Appends '?format=original' to each HTML img source string. This forces the
 * page to load media sources in their original format, not lossy WEBP.
 */
$(window).on("load", function() {
	$("img").each(function() {
		var newSrc = $(this).attr("src");
		newSrc += newSrc.indexOf("?") !== -1 ? "&format=original" :  "?format=original";
		$(this).attr("src", newSrc);
	});
});