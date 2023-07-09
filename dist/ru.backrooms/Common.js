/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
});