/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
/* Reference Popups */
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        "w:c:dev:SpoilerAlert/code.2.js",
        "dev:MediaWiki:RailWAM/code.js",
        "w:c:dev:MediaWiki:Countdown/code.js"
        // ...
    ]
});
 
 
 
/* Adds "purge" option to page controls
 * See w:c:dev:PurgeButton for info & attribution 
 */
ajaxPages = ["Đặc_biệt:Thay_đổi_gần_đây","Đặc_biệt:Hoạt_động_wiki", "Đặc_biệt:Nhật_trình", "Đặc_biệt:Đóng_góp", "Đặc biệt:Đóng góp"];
 
ajaxIndicator = 'https://vignette.wikia.nocookie.net/milomurphyslaw/images/5/53/Loading_bar.gif/revision/latest?cb=20180711135105&path-prefix=vi';
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Tự động refresh trang';
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev');