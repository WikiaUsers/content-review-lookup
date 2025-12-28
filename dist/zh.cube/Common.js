/* 这里的任何JavaScript将为所有桌面用户在每次页面加载时加载。 */

/* {{CSS}}模板脚本 */
(function () {
    const eles = document.querySelectorAll('.js-action-play');
    eles.forEach(function (e) {
        const targetId = e.getAttribute('data-media-id');
        if (!targetId) {
            console.error('No data-media-id present on element', e);
            return;
        }
        const target = document.getElementsByClassName('media-id-' + targetId)[0].getElementsByClassName("mw-file-element")[0];
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