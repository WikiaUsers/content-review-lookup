/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
window.ajaxPages = ["Đặc biệt:Thay đổi gần đây","Đặc biệt:Danh sách theo dõi","Đặc biệt:Nhật trình","Đặc biệt:Đóng góp","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Tự động làm mới';
window.AjaxRCRefreshHoverText = 'Tự động làm mới trang';
importArticles({
    type: 'script',
    articles: 'u:dev:MediaWiki:UTCClock/code.js',
});
window.DisplayClockJS = {
	format: '%H:%M:%S %{T2;T3;T4;T5;T6;T7;CN}u, %d/%m/%Y (ICT)',
	hoverText: 'Nhấp vào đây để làm mới cache phía máy chủ (purge) cho trang này.',
	offset: 420,
};