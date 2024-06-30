/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
/* 警告：任何人请不要编辑该JavaScript页面，这有可能会导致您的账号甚至整个Wiki崩溃 */
a.tag {
    color: inherit;
}
window.UserTagsJS = {
	modules: {},
	tags: {
		member: { u:'成员' },
		inactive:{ u:'休假中' }
	}
};
.tag.usergroup-bureaucrat {
	background-color: gold !important;
	color: black !important;
}
.tag.usergroup-featured {
	background-color: blue !important;
	color: white !important;
}
UserTagsJS.modules.inactive = {
	days: 20,
	namespaces: [0],
	zeroIsInactive: true // 條目編輯次數為0 = 休假中
};
/** 用户标签临时更改区域（每周末操作）**/
<--！该区域仅限管理员操作，并且现在它已经成为了一个无效版本-->
/** 用户标签样式 **/
window.UserTagsJS = {
	modules: {},
	tags: {
		a: { u: 'member', order:1 },
		b: { u: 'inactive', order:2 },
	},
	oasisPlaceBefore: '> h1'
};
UserTagsJS.modules.custom = {
	'Lunarity': ['a', 'b', 'inactive']
};
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: '> h2' // Place tags before the H2
};
/* 底部模块 */
// 1. AjaxRC configuration option
window.ajaxRefresh = 30000;

// 2. AjaxRC import statement
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxRC.js'
    ]
});
/* 账号创建时间 */
window.customUserAccountAge = {
	showFullDate: true
};
/* 大量分类 */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassCategorization/code.js',
    ]
});
/* 上传未使用许可的文件将触发警告 */
// 添加使用自定义内容而非使用默认消息
window.dev.i18n.overrides['NoLicenseWarning']['warning-text'] = '警告：您没有选择文件的授权协议，请尽量选择以免造成不必要的麻烦！';
window.dev.i18n.overrides['NoLicenseWarning']['rejected-text'] = '由于您没有选择授权协议，我们不能完成您的操作！';
/* 移动版用户列表 */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PortableListUsers.js',
    ]
});
/* 引入CSS */
(function () {
    const eles = document.querySelectorAll('.js-action-play');
    eles.forEach(function (e) {
        const targetId = e.getAttribute('data-media-id');
        if (!targetId) {
            console.error('No data-media-id present on element', e);
            return;
        }
        const target = document.getElementsByClassName('media-id-' + targetId)[0];
        if (!target) {
            console.error('No element found with .media-id-' + targetId, e);
            return;
        }
        e.addEventListener('click', function () {
            console.log(target);
            if (target.paused || target.ended) {
                target.play();
            } else {
                target.pause();
            }
        });
    });
})();

mw.loader.load(["mediawiki.util", "mediawiki.Title"]);
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
    
    $(".sitenotice-tab-container").each(function() {
		var container = $(this);
		function switchTab(offset) {
			return function() {
				var tabs = container.children(".sitenotice-tab").toArray();
				var no = Number(container.find(".sitenotice-tab-no")[0].innerText) + offset;
				var count = tabs.length;
				if (no < 1) no = count;
				else if (no > count) no = 1;
				for (var i = 0; i < count; i++)
					tabs[i].style.display = (i + 1 == no ? null : "none");
				container.find(".sitenotice-tab-no")[0].innerText = no;
			};
		}
		container.find(".sitenotice-tab-arrow.prev").click(switchTab(-1));
		container.find(".sitenotice-tab-arrow.next").click(switchTab(1));
	});
});

$.getJSON(mw.util.wikiScript("index"), {
    title: "MediaWiki:Custom-import-scripts.json",
    action: "raw"
}).done(function (result, status) {
    if (status != "success" || typeof (result) != "object") return;
    var scripts = result[mw.config.get("wgPageName")];
    if (scripts) {
        if (typeof (scripts) == "string") scripts = [scripts];
        importArticles({ type: "script", articles: scripts });
    }
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WallGreeting.js',
    ]
});