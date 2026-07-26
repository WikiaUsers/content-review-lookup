// Kịch bản: [[w:c:dev:PatrolPanel]]

mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function() {
	// Nhập kịch bản nếu ở đúng trang
	if (mw.config.get('wgNamespaceNumber') == -1 && mw.config.get('wgTitle')  == "PatrolPanel") {
		importArticles({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:PatrolPanel.js',
			]
		});
	}

	// Thêm liên kết vào các nút đầu đề cộng đồng
	$(mw.config.get('skin') === 'fandomdesktop' ? '.wiki-tools > .wds-dropdown > .wds-dropdown__content > ul' : '.wds-community-header__wiki-buttons > .wds-dropdown > .wds-dropdown__content > ul').append('<li><a href="' + mw.util.getUrl('Đặc biệt:PatrolPanel') + '">Bảng tuần tra</a></li>');
});