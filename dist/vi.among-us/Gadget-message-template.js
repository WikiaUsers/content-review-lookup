// Tin nhắn: [[Wiki Among Us:Tin nhắn nhân viên]]
// Kịch bản: [[w:c:dev:DiscussionTemplates]]

mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function() {
	if(mw.config.get('wgNamespaceNumber') == 1200) { // Tường tin nhắn
		window.DiscussionTemplates = {
			templates: {},
			allowedGroups: ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'wiki-representative']
		};
		
		$.getJSON('/index.php?title=MediaWiki:Gadget-message-template.json&action=raw&ctype=application/json', function(templateData) {
			window.DiscussionTemplates.templates = templateData;
		});
		
		// Ghi đè tin nhắn
		window.dev = window.dev || {};
		window.dev.i18n = window.dev.i18n || {};
		window.dev.i18n.overrides = window.dev.i18n.overrides || {};
		window.dev.i18n.overrides['DiscussionTemplates'] = window.dev.i18n.overrides['DiscussionTemplates'] || {};
		
		window.dev.i18n.overrides['DiscussionTemplates']['title-not-supported'] = 'Tiêu đề của bản mẫu này đã được sao chép vào bảng nhớ tạm của bạn, vì vậy hãy nhớ thêm nó vào tin nhắn.\n\n Ngoài ra, đừng quên thêm số cảnh báo (nếu có) và bất kỳ liên kết nào đến nơi xảy ra sự cố.';
		window.dev.i18n.overrides['DiscussionTemplates']['title-not-supported-nocopy'] = 'Đừng quên thêm tiêu đề bài đăng và số cảnh báo (nếu có). Đồng thời bao gồm bất kỳ liên kết nào đến nơi xảy ra sự cố.';
		window.dev.i18n.overrides['DiscussionTemplates']['title'] = 'Bản mẫu tin nhắn';
		
		// Nhập
		importArticles({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:DiscussionTemplates.js',
			]
		});
	};
});