/* Any JavaScript here will be loaded for all users on every page load. */

window.AddRailModule = [{prepend: true}];

/* dev:LockOldComments.js */
window.lockOldComments = (window.lockOldComments || {});

window.lockOldComments.limit = 62;
window.lockOldComments.addNoteAbove = true;

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.RegExp.ilinks = [RegExp('.*(Special|MediaWiki|Template|User|File|Talk|Help|Forum|GeoJson|Blog|User_blog|Module|Message_Wall|Map)\:.*'), RegExp('.*(Gallery|talk).*')];

mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
});