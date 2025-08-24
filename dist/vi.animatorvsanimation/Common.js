/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
importArticles({
    type: 'script',
    articles: 'u:dev:MediaWiki:UTCClock/code.js',
});
window.ajaxPages = ["Đặc biệt:Thay đổi gần đây","Đặc biệt:Danh sách theo dõi","Đặc biệt:Nhật trình","Đặc biệt:Đóng góp","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Tự động làm mới';
window.AjaxRCRefreshHoverText = 'Tự động làm mới trang';
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 90;
window.DisplayClockJS = {};