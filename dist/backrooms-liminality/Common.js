/*==== The Middlerooms Wiki Custom Javascripts ====*/
/*==== For use on the Middlerooms Wiki ====*/
/*=== Organized by Khai ===*/
/*== To administrators, please ask permission from Khai before adding/changing javascripts. == */

// T:CSS dependency, borrowed with permission
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		var css = mw.util.addCSS($(this).attr("data-css"));
		$(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
	});
});

// == Configurations ==