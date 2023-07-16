/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
/* Для Шаблон:CSS */
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
});