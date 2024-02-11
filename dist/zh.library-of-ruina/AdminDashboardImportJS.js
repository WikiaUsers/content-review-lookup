//代码改编自自AdminDashiboard block/code.js.
//感谢Tatsumaki Up Sinta与KockaAdmiralac两位作者的贡献
(function() {
	if (
		mw.config.get('wgCanonicalSpecialPageName') !== 'AdminDashboard' ||
		window.AdminDashboardImportJSLoaded
	) {
		return;
	}
	window.AdminDashboardImportJSLoaded = true;
	var AdminDashboardImportJS = {
		init: function (i18n) {
			this.$control = $('<li>', {
				'class': 'control',
				'data-tooltip': '导入至本 Wiki 的js文件。'
			}).append(
				$('<a>', {
					'class': 'set',
					href: mw.util.getUrl('MediaWiki:ImportJS')
				}).append(
					$('<span>', {
						'class': 'representation AdminDashboardImportJS'
					}).append(
						$('<div>').append(
							$('<span>', {
								text: '→JS'
							})
						)
					),
					'ImportJS'
				)
			).hover(this.hover.bind(this), this.unhover.bind(this));
			$('section.wiki ul.controls').append(this.$control);
			this.$tooltip = $('.control-section.wiki > header > .dashboard-tooltip');
		},
		hover: function(e) {
			this.$tooltip.text(this.$control.data('tooltip'));
		},
		unhover: function(e) {
			this.$tooltip.text('');
		},
		hook: function(i18n) {
			i18n.loadMessages('AdminDashboardImportJS')
			.then(this.init.bind(this));
		}
	};
	importArticles(
		{
			type: 'script',
			article: 'u:dev:MediaWiki:I18n-js/code.js'
		}
	);
	mw.hook('dev.i18n').add(AdminDashboardImportJS.hook.bind(AdminDashboardImportJS));
})();