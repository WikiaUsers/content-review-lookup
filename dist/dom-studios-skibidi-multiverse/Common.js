/* Any JavaScript here will be loaded for all users on every page load. */
// LOCKOLDCOMMENTS CUSTOMIZATION
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 14;
window.lockOldComments.addNoteAbove = true;
// END LOCKOLDCOMMENTS
// For [[Module:CSS]]; [[T:CSS]] dependency, credits to the Backrooms Wiki
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		mw.util.addCSS($(this).attr("data-css"));
	});
});