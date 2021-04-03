// <nowiki>
$(function() {
    if (window.NavigationPopupsLoaded) return;
    window.NavigationPopupsLoaded = true;

	// Import specific version that is compatible with MW 1.33.
	// `importArticle` does not work with `?oldid=` or `Special:Permalink`, so 
	// use jQuery with full URL instead.
	$.getScript("https://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=MediaWiki:Gadget-popups.js&oldid=883914659");
});