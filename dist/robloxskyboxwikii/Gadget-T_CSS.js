/*Hey GlobalJSReviewer guy - this js is optional and is a Gadget not enabled by default*/
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		mw.util.addCSS($(this).attr("data-css"));
	});
});