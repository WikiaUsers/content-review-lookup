/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
/*
*Worker Const Optimize
*Author:B10112
*/
//使用新Worker执行线程并优化
const worker = new Worker('data-processor.js');
worker.postMessage(largeDataset); // 发送数据给Worker
worker.onmessage = (e) => {
  console.log('处理结果：', e.data); // 接收处理结果
};

// data-processor.js（Worker文件）
self.onmessage = (e) => {
  const result = heavyCalculation(e.data); // 复杂计算
  self.postMessage(result); // 发送结果回主线程
};
/*
*Load After User Scroll to the widget
*Author:B10112
*/

// 延迟加载图片/视频
document.addEventListener('DOMContentLoaded', function() {
 
  
  // 监听元素是否进入视口
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { // 元素进入视口
        const element = entry.target;
        // 替换真实地址（图片用src，视频用src或poster）
        if (element.tagName === 'IMG') {
          element.src = element.dataset.src;
          // 加载完成后移除占位类（可选）
          element.onload = () => element.classList.remove('lazy-placeholder');
        } else if (element.tagName === 'VIDEO') {
          element.src = element.dataset.src;
          element.load(); // 视频需要手动触发加载
        }
        observer.unobserve(element); // 加载后停止监听
      }
    });
  }, {
    rootMargin: '200px 0px' // 提前200px开始加载，避免用户看到空白
  });

  // 开始监听
  lazyElements.forEach(el => observer.observe(el));
});
/*
*Key Element Load Before Webpage loaded
*Author:B10112
*/
// 预加载关键资源（核心CSS、字体、首屏图片等）
function preloadCriticalResources() {
  const criticalResources = [
    { type: 'style', url: '/critical.css' }, // 核心样式
    { type: 'font', url: '/main-font.woff2', as: 'font', crossOrigin: 'anonymous' }, // 关键字体
    { type: 'image', url: '/hero-banner.jpg', as: 'image' } // 首屏大图
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.url;
    if (resource.as) link.as = resource.as; // 指定资源类型（font/image/style等）
    if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
    
    // 插入到head最前面，优先加载
    document.head.insertBefore(link, document.head.firstChild);
  });
}

// 页面开始解析时就预加载关键资源
preloadCriticalResources();
/*
*DOM Optimize
*Author:B10112
*/
// 批量处理DOM更新
function batchUpdateDOM(updates) {
  // 创建文档片段，临时存放DOM变更，最后一次性插入
  const fragment = document.createDocumentFragment();
  
  // 执行所有更新操作（在片段中进行，不触发实时渲染）
  updates.forEach(update => {
    const element = document.createElement(update.tag);
    if (update.content) element.textContent = update.content;
    if (update.class) element.className = update.class;
    fragment.appendChild(element);
  });
  
  // 一次性将片段插入DOM，只触发一次重绘
  document.getElementById('container').appendChild(fragment);
}

// 使用示例：批量添加10个列表项（代替逐个添加）
batchUpdateDOM([
  { tag: 'li', content: '项目1', class: 'list-item' },
  { tag: 'li', content: '项目2', class: 'list-item' },
  // ...更多项
]);
/* 
 * Script Name: InputUsername
 * Author:Ijohe
 * This Javascript is not my own.B10112 got it and used it.
 */
//用户名模板生效
;(function ($, mw) {
    'use strict';
    var username = mw.config.get('wgUserName');
    if (
        window.disableUsernameReplace ||
        !username
    ) {
        return;
    }
    window.disableUsernameReplace = true;
    var $rail = $('#WikiaRail'),
        customSelector = window.UsernameReplaceSelector
            ? ', ' + window.UsernameReplaceSelector
            : '';
    function inputUsername($content) {
        $content.find('.InputUsername, .insertusername' + customSelector).text(username);
    }
    mw.hook('wikipage.content').add(inputUsername);
    if ($rail.hasClass('loaded')) {
        inputUsername($rail);
    } else if ($rail.length) {
        $rail.on('afterLoad.rail',
            inputUsername.bind(null, $rail)
        );
    }
})(window.jQuery, window.mediaWiki);


/*
 * Script Name: Template CSS
 * Author:B10112
*/
//CSS模板生效
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
/*Every element here is safe and useful.*/