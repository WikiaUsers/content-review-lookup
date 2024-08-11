/* Any JavaScript here will be loaded for all users on every page load. */

// LOCKOLDCOMMENTS CUSTOMIZATION
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 14;
window.lockOldComments.addNoteAbove = true;
// END LOCKOLDCOMMENTS

// MARKBLOCKED CUSTOMIZATION
window.mbTooltip = 'blocked by $2 for $1 with the reason, \"$3\" ($4 ago)';
// END MARKBLOCKED

// For [[Template:CSS]] to work
//Credits to the backrooms fandom
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		var css = mw.util.addCSS($(this).attr("data-css"));
		$(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
	});
});