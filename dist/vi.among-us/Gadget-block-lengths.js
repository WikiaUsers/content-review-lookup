/**
 * Tên:       block-lengths
 * Phiên bản: v1.0
 * Tác giả:   Caburum
 * Mô tả:     Hiển thị bảng từ [[Wiki Among Us:Quy tắc#Thời hạn cấm]] khi cấm một thành viên
**/

mw.loader.using(['mediawiki.api', 'mediawiki.util'], function() {
	if (mw.config.get('wgCanonicalSpecialPageName') !== 'Block' || window['gadget-block-lengths-loaded']) return;
	window['gadget-block-lengths-loaded'] = true;

	// Hiển thị bảng bên cạnh biểu mẫu
	mw.util.addCSS('\
		.mw-htmlform-ooui-wrapper {\
			display: flex;\
			flex-wrap: wrap;\
			gap: 10px;\
		}\
		.mw-htmlform-ooui-wrapper > .mw-htmlform {\
			min-width: 500px;\
			flex: 1;\
		}\
		.mw-htmlform-ooui-wrapper > .mw-parser-output {\
			max-width: 500px;\
			flex: auto;\
		}\
	');

	// Lấy bảng
	var api = new mw.Api(),
		page = new mw.Title('Quy tắc', 4);
	api.get({
		action: 'parse',
		text: '{{#lst: ' + page.toText() + '|blocklengths}}', // [[mw:Extension:Labeled Section Transclusion]]
		contentmodel: 'wikitext'
	}).done(function (data) {
		var text = data.parse.text['*'];

		// Thêm bảng vào giao diện người dùng
		$('.mw-htmlform-ooui-wrapper').append(text);

		// Thêm liên kết vào quy tắc
		$('.mw-ipb-conveniencelinks').prepend('<a href="' + page.getUrl() + '" title="' + page.toText() + '">Quy tắc</a> | ');
	});
});