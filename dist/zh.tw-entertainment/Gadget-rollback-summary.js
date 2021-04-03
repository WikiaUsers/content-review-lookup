(function($, mw) {
	mw.messages.set({
		'rollback-summary-custom': '回退[[Special:Contributions/$1|$1]]（[[User talk:$1|' + wgULS('对话', '對話') + ']]）' + wgULS('的编辑：', '的編輯：'),
		'rollback-summary-nouser': wgULS('回退已隐藏用户的编辑：', '回退已隱藏使用者的編輯：')
	});

	var updateLinks = function() {
				$('.mw-rollback-link a').click(function(event) {
					var summary = prompt(wgULS('请输入自定义回退摘要（留空则使用系统默认摘要）', '請輸入自定義回退摘要（留空則使用系統預設摘要）'));
					if (summary === null) {
						event.preventDefault()
					} else {
						if (summary.length === 0) return;
						var username = mw.util.getParamValue('from', this.href);
						username ? summary = mw.message('rollback-summary-custom', username).plain() + summary : summary = mw.message('rollback-summary-nouser').plain() + summary;
						this.href += '&summary=' + encodeURIComponent(summary)
					}
				}).css('color', '#009999')
			};

	if (mw.config.get('wgDiffNewId') || mw.config.get('wgDiffOldId')) {
		// 啟用「互動式瀏覽歷史」，切換差異時重新標記
		mw.hook('wikipage.diff').add(function() { // Reload alongside the revision slider
			updateLinks()
		})
	} else if (['Recentchanges', 'Recentchangeslinked', 'Watchlist'].indexOf(mw.config.get('wgCanonicalSpecialPageName')) !== -1) {
		// 最近/相關更改更新時重新標記
		mw.hook('wikipage.content').add(function(element) {
			if (element.hasClass('mw-changeslist')) updateLinks()
		});
		updateLinks()
	} else {
		$(function() {
			updateLinks()
		})
	}
})(jQuery, mw);