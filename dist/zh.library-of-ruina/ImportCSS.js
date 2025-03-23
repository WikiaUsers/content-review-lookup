// 确保加载 mediawiki.util 模块
mw.loader.load(["mediawiki.util", "mediawiki.Title"]);
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
});
(function (mw, $) {
	"use strict";
	if (mw.config.get('wgPageName').toLowerCase().endsWith('.css')) {
		$.ajax({
			url: mw.config.get('wgArticlePath').replace('$1', mw.config.get('wgPageName')) + '?action=raw&text/css',
			dataType: 'text',
			success: function (cssContent) {
				var styleElement = document.createElement('style');
				styleElement.type = 'text/css';
				styleElement.textContent = cssContent;
				document.head.appendChild(styleElement);
				console.log('CSS已成功加载');
			},
			error: function () {
				console.error('CSS加载失败，请尝试刷新或检查CSS页面');
			}
		});
	}
})(mediaWiki, jQuery);