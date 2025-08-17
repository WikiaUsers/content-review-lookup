/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
/* Any JavaScript here will be loaded for all users on every page load. */
// *********************************************************
// Dead Videos via Special:BlankPage?blankspecial=deadvideos
// *********************************************************
 
if (
  mw.config.get('wgPageName') === 'Special:BlankPage' &&
  mw.util.getParamValue('blankspecial') === 'deadvideos'
) {
    window.deadVideosCategories = ['Videos'];
 
    importArticle({
        type: 'script',
        article: [
            'w:c:mlp:MediaWiki:Common.js/DeadVideos.js'
        ]
    });
}
/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importArticles({
    type: 'script',
    articles: [
        "u:dev:AjaxRC/code.js", /* Auto Refresh */
        "u:dev:BackToTopButton/code.js", /* Add Back To Top Button */
        "w:c:dev:ReferencePopups/code.js",
        "MediaWiki:Common.js/displayTimer.js",
        "MediaWiki:Common.js/Toggler.js"
    ]
});
/* còn lại các code javascript mà wiki này sử dụng đều đã sử dụng hợp lý ở MediaWiki:ImportJS */