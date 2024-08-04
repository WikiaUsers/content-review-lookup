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

// A+ Wiki Badge
// Credits to https://backrooms.fandom.com/wiki/MediaWiki:Common.js
$('.fandom-community-header__community-name-wrapper').append(
	$('<a/>').addClass('compass-wiki-badge').attr('href', '//community.fandom.com/wiki/Admin_Plus').append(
		$('<img/>').css('height', '60px').css('position', 'relative').css('top', '10px')
		.attr('src', 'https://static.wikia.nocookie.net/speedstorm/images/2/26/Admin_wiki_1A.png/revision/latest/scale-to-width-down/60?cb=20230728141822&format=original').attr('title', 'This wiki is an A+ Wiki')
));