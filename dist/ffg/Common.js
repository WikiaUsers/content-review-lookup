

//locks old comments
window.lockOldComments = window.lockOldComments || {};
window.lockOldComments.limit = 240;


/* From https://fictional-googology.fandom.com/wiki/MediaWiki:Common.js, it is completely fine, it's for a template we need*/

/* mw.hook("wikipage.content").add(function () {
$("span.import-css").each(function () {
 		var css = mw.util.addCSS($(this).attr("data-css"));
 		$(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
 	});
 }); */  /*keeping just in case*/