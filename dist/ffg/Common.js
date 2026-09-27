

//locks old comments
window.lockOldComments = window.lockOldComments || {};
window.lockOldComments.limit = 240;


 mmw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		var css = mw.util.addCSS($(this).attr("data-css"));
		$(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
	});
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Selector.js'
    ]
});