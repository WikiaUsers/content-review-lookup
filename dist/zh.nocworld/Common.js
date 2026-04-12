/**
 * 以下代码借鉴自 Backrooms 中文 Wiki
 * 来源：https://backrooms.fandom.com/zh/wiki/MediaWiki:Common.js
 * 
 * 包含功能：
 * 1. 音频播放控制器（单个 + 全部）
 * 2. 动态 CSS 导入（import-css）
 * 3. WallGreeting（留言墙问候语）
 * 4. 用户样式化头衔
 */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WallGreeting.js'           // 留言墙问候语
    ]
});

// ==================== 单个音频播放控制 ====================
(function () {
    'use strict';
    
    const eles = document.querySelectorAll('.js-action-play');
    eles.forEach(function (e) {
        const targetId = e.getAttribute('data-media-id');
        if (!targetId) {
            console.error('No data-media-id present on element', e);
            return;
        }
        
        const container = document.getElementsByClassName('media-id-' + targetId)[0];
        if (!container) {
            console.error('No element found with .media-id-' + targetId, e);
            return;
        }
        
        const target = container.getElementsByClassName('mw-file-element')[0];
        if (!target) {
            console.error('No audio element found within .media-id-' + targetId, e);
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

mw.loader.load(['mediawiki.util', 'mediawiki.Title']);

mw.hook('wikipage.content').add(function () {
    'use strict';
    
    // 动态 CSS 导入（基础版，无触发器功能）
    $('span.import-css').each(function () {
        mw.util.addCSS($(this).attr('data-css'));
    });
    
    // 播放或暂停所有音频
    $('.audio-toggler').click(function () {
        $('audio').get().forEach(function (audio) {
            if (audio.paused || audio.ended) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    });
});