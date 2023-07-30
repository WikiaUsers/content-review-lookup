// [[Category:Internal]] Meta-category for internal technical pages

// For [[Module:CSS]]; [[T:CSS]] dependency
var css = mw.util.addCSS($("span.import-css").attr("data-css"));
var exceptions_page = $(".page-MediaWiki_Custom-Exceptions #mw-content-text .mw-parser-output");
var exceptions = exceptions_page.toString().split(" ");

$("span.import-css").each(function () {
	css.disabled = true;
});

$(".css-button").click(function() {
	$("span.import-css").each(function () {
		css.disabled = !css.disabled;
	});
});

mw.hook("wikipage.content").add(function () {
	if (mw.config.get("wgPageName") == "MediaWiki:Custom-Exceptions") {
		var pre = $('<pre>', {
			text: exceptions_page.text().trim()
		});
		exceptions_page.replaceWith(pre);
	}
	else if (exceptions.includes(mw.config.get("wgPageName"))) {
		$("span.import-css").each(function () {
			css.disabled = !css.disabled;
		});
	}
});

// UserTags thingamajigs
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order: -2 },
		bot: { link:'Help:Bots', order: -1 },
		bureaucrat: { order: 0 }, // <- lower order value = will be placed before other tags (in space, not as of which loads first)
		sysop: { order: 1 },
		'content-moderator': { order: 2 },
		threadmoderator: { order: 3 }
	}
};

UserTagsJS.modules.inactive = { days: 90, zeroIsInactive: true }; // no edits for 90 days and/or no edits at all = inactive
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = false;

// fade-in
var fadeinclass = document.getElementsByClassName("fadeintext");
    for(var i = 0; i < fadeinclass.length; i++) {
        var sec = (i/4).toString();
        fadeinclass[i].style.animation = "fadeInAnimation ease 1.5s";
        fadeinclass[i].style.animationDelay = sec.concat("s");
        fadeinclass[i].style.animationIterationCount = "1";
        fadeinclass[i].style.animationFillMode = "forwards";
}