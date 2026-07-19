(function() {
      // 要处理的容器（可根据需要替换为更精确的选择器）
      const container = document.getElementById('content');

      // 定义处理函数：在文本节点中，在中英/中数交界处插入薄空格（&#x2009;）
      function insertSpacingBetweenCJKAndLatin(text) {
        // 匹配中文字符（CJK统一表意文字）与英文字母或数字的交界
        // 注意：这里的中文字符范围涵盖常用汉字，可根据实际扩展
        const cjk = '\\u4e00-\\u9fff\\u3400-\\u4dbf\\uf900-\\ufaff\\u3000-\\u303f';
        const latin = 'a-zA-Z';
        const digit = '0-9';

        // 构建正则：中文后跟字母/数字，或字母/数字后跟中文
        // 使用捕获组来保留字符并插入分隔符
        const regex1 = new RegExp(`([${cjk}])([${latin}${digit}])`, 'g');
        const regex2 = new RegExp(`([${latin}${digit}])([${cjk}])`, 'g');

        // 先处理中文→英文/数字，再处理英文/数字→中文
        let result = text.replace(regex1, '$1 $2'); // 使用窄空格 (U+2009)
        result = result.replace(regex2, '$1 $2');
        return result;
      }

      // 递归遍历 DOM 树，仅处理文本节点
      function processTextNodes(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          // 只处理非空文本
          if (node.textContent.trim()) {
            const original = node.textContent;
            const updated = insertSpacingBetweenCJKAndLatin(original);
            if (updated !== original) {
              node.textContent = updated;
            }
          }
        } else {
          // 跳过 <script>、<style> 等内部不需要处理的元素
          const tag = node.tagName ? node.tagName.toLowerCase() : '';
          if (['script', 'style', 'textarea', 'input'].includes(tag)) {
            return;
          }
          // 递归子节点
          const children = node.childNodes;
          for (let i = 0; i < children.length; i++) {
            processTextNodes(children[i]);
          }
        }
      }
      processTextNodes(container);
    })();
    
// 个人页面设计

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

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});

// 折叠功能实现
$(document).ready(function() {
  $('.custom-collapsible .collapsible-header').click(function() {
    const $header = $(this);
    const isOpen = $header.attr('data-state') === 'open';
    
    $header
      .attr('data-state', isOpen ? 'closed' : 'open')
      .closest('.custom-collapsible')
      .find('.collapsible-content')
      .toggleClass('force-show');
  });
});

// 随机页面按钮
$(document).ready(function() {
    $('.random-button').click(function() {
        var container = $(this).closest('.random-container');
        var urls = container.data('urls').split('|');
        var randomIndex = Math.floor(Math.random() * urls.length);
        window.location.href = urls[randomIndex];
    });
});