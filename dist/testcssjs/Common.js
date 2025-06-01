// Experimental Template JS 
mw.hook("wikipage.content").add(function ($content) {
	$content.find("span.import-js").each(function () {
		const jsCode = $(this).attr("data-js");
		const from = $(this).attr("data-from");
		if (!jsCode) return;

		try {
			console.log("[T:JS] Running JS from:", from);
			new Function(jsCode)();
		} catch (err) {
			console.error("[T:JS] Error in user-injected JS:", err);
		}
	});
});

// T:CSS
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		var css = mw.util.addCSS($(this).attr("data-css"));
		$(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
	});
});