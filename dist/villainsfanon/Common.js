/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxBatchDelete/code.2.js',
        'u:dev:QuickDelete/code.js',
    ]
});
 
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
        mw.util.addCSS($(this).attr("data-css"));
    });
});
window.railWAM = {
    logPage:"Project:WAM Log"
};