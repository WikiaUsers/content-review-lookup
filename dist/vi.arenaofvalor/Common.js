/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */

/* Back To Top Button */
window.BackToTopModern = true;

/* UTCClock */
window.DisplayClockJS = {
	format: "%{Chủ Nhật;Thứ Hai;Thứ Ba;Thứ Tư;Thứ Năm;Thứ Sáu;Thứ Bảy}w, %2H:%2M:%2S %2d%{/01/;/02/;/03/;/04/;/05/;/06/;/07/;/08/;/09/;/10/;/11/;/12/}m%Y",
	hoverText: "Giờ Đông Dương",
	offset: 420, /* Time offset from UTC in minutes */
	fontFamily: "Roboto, sans-serif"
};
importArticle ({
	type:'script',
	article:'u:dev:MediaWiki:UTCClock/code.js'
});