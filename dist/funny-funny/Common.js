/* Any JavaScript here will be loaded for all users on every page load. */
/* code by many contributors on the glagglepedia, this is not my code */ 

// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		mw.util.addCSS($(this).attr("data-css"));
	});
});