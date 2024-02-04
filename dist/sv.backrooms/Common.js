mw.hook("wikipage.content").add(function () {
    $("span.import-content").each(function () {
        eval($(this).attr("data-content"));
    });
});