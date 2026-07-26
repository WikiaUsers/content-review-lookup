// <nowiki>
importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:MassEdit/code.js',
		'u:dev:MediaWiki:AjaxBatchDelete.js',
		'u:dev:MediaWiki:AjaxBatchUndelete.js',
	]
});

window.dev = window.dev || {};

// Ngăn không cho các thẻ hiện có bị ẩn đi.
window.dev.profileTags = { noHideTags: true };

// Cấu hình MessageBlock
window.MessageBlock = {
	title : 'Đã bị cấm',
	message : 'Bạn đã nhận được một lệnh cấm $2 với lý do: \'$1\'. Trừ khi có quy định khác và lệnh cấm của bạn không dưới hai tuần, bạn có thể khiếu nại trên Tường tin nhắn của tôi tại Community Central.',
	autocheck : true
};

// Chỉnh miêu tả tập tin mặc định thành bản mẫu File, bỏ qua khi tải lên lại tập tin
// if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
	// if (mw.util.getParamValue('wpForReUpload') != 1) $('#wpUploadDescription').val('{'// +'{File\n|description = \n|type = \n}}');
	// Ẩn trường giấy phép bổ sung
	// $('.mw-htmlform-field-Licenses').css('display', 'none');
	// Dành cho thành viên sử dụng UploadMultipleFiles
	// mw.config.set('UMFBypassLicenseCheck', true);
// }

// Cài đặt mặc định cho VerifyUser
window.dev.VerifyUser = {
	command: '$verify',
	channel: 'verification'
};

// Chúng tôi có các lùi sửa viên riêng.
window.RollbackWikiDisable = true;

// Thêm thẻ thành viên vào lùi sửa viên
if (mw.config.get('profileUserName')) var rollbackTagLoader = setInterval(function() {
	if ($('.user-identity-box').length) {
		clearInterval(rollbackTagLoader);

		var user = mw.config.get('profileUserName');

		if (user) { // Trang này có một hồ sơ thành viên
			$.getJSON(mw.util.wikiScript('api') + '?action=query&format=json&list=users&usprop=groups&ususers=' + mw.util.rawurlencode(user), // Kiểm tra các nhóm của thành viên
			function(data) {
				if (data.query.users[0].groups.includes('rollback')) { // Thành viên này là một lùi sửa viên
					$span = $('<span />').addClass('user-identity-header__tag tag-rollback').text('Lùi sửa viên');
					$('.user-identity-box .user-identity-header__attributes').append($span, ' ');
				}
			});
		}
	}
}, 100);

// </nowiki>