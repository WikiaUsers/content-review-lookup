/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
/* Back To Top Button */
window.BackToTopModern = true;

/* Display UTCClock in Vietnamese */
window.DisplayClockJS = {
	format: "%{Chủ Nhật;Thứ Hai;Thứ Ba;Thứ Tư;Thứ Năm;Thứ Sáu;Thứ Bảy}w, %2H:%2M:%2S %2d%{/01/;/02/;/03/;/04/;/05/;/06/;/07/;/08/;/09/;/10/;/11/;/12/}m%Y (UTC+7)",
	hoverText: "Indochina Time (ICT)",
	offset: 420, /* Time offset from UTC in minutes */
	fontFamily: "Overpass, Rubik, sans-serif"
};
importArticle ({
	type:'script',
	article:'u:dev:MediaWiki:UTCClock/code.js'
});