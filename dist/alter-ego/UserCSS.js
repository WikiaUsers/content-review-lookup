// taken from https://backrooms.fandom.com/wiki/Template:CSS
// For [[Module:CSS]]; [[Template:CSS]] dependency
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
});