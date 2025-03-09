/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
/* 来自Back Rooms 中文 Wiki */
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
				console.log('CSS已成功加载。');
			},
			error: function () {
				console.error('CSS加载失败，请尝试刷新或检查CSS页面。');
			}
		});
	}
})(mediaWiki, jQuery);

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WallGreeting.js',
    ]
});
/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
ExtremelyInactive: {u: '不活跃'}
}
};
UserTagsJS.modules.custom = {
	'Lovsnow_Ry': ['ExtremelyInactive']
};
UserTagsJS.modules.custom = {
	'Lomoon': ['ExtremelyInactive']
};
};
/* ---- */
/* 黑幕相关JS */
/*  console.log('黑幕元素数量:',document.querySelectorAll('.black-curtain').length); // 确认元素存在
document.querySelectorAll('.black-curtain').forEach(element => {
  console.log('绑定元素:', element); // 输出每个被绑定的元素
  // ...原有代码...
});
document.querySelectorAll('.black-curtain').forEach(element => {
  let pressTimer;
  
  // 将计时器直接绑定到元素对象上
  element._resetTimer = null; // 自定义属性存储计时器

  // 点击触发（桌面+移动短按）
  element.addEventListener('click', function() {
    triggerReveal(this);
  });

  // 移动端长按触发
  element.addEventListener('touchstart', function(e) {
    pressTimer = setTimeout(() => {
      triggerReveal(this);
      e.preventDefault();
    }, 500);
  });

  // 清理长按计时器
  ['touchend', 'touchcancel'].forEach(evt => {
    element.addEventListener(evt, () => clearTimeout(pressTimer));
  });

  // 核心逻辑：显示后自动重置
  function triggerReveal(target) {
    // 清除该元素之前的计时器
    if (target._resetTimer) {
      clearTimeout(target._resetTimer);
    }
    
    // 激活显示状态
    target.classList.add('active');
    
    // 设置专属计时器（绑定到当前元素）
    target._resetTimer = setTimeout(() => {
      target.classList.remove('active');
      target._resetTimer = null; // 清理引用
    }, 3000);
  }
});  */
document.querySelectorAll('.heimu').forEach(heimu => {
  heimu.addEventListener('click', function() {
    this.classList.toggle('heimu-touch'); // 添加临时激活类
    setTimeout(() => this.classList.remove('heimu-touch'), 3000); // 3秒后自动关闭
  });
});ive'), 3000);
}
/* 黑幕相关JS（结束） */
/* ---- */