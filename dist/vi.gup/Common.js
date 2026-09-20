/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
/* Back To Top Button */
window.BackToTopModern = true;

/* Display UTCClock in Vietnamese */
window.DisplayClockJS = {
	format: "%{Chủ Nhật;Thứ Hai;Thứ Ba;Thứ Tư;Thứ Năm;Thứ Sáu;Thứ Bảy}w, %2H:%2M:%2S %2d/%2m/%Y",
	hoverText: "Indochina Time",
	offset: 420,
	fontFamily: "Overpass, Roboto, Rubik, sans-serif"
};
importArticles ({
	type:'script',
	article:'u:dev:MediaWiki:UTCClock/code.js'
});