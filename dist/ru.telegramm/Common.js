/* --- [1] КОПИРОВАНИЕ ТЕКСТА --- */
$(function() {
    $(document).on('click', '.tg-mono', function() {
        var $target = $(this);
        var textToCopy = $target.text();

        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(function() {
                $target.css({'color': '#31b545', 'background-color': 'rgba(49, 181, 69, 0.2)'});
                setTimeout(function() { $target.css({'color': '', 'background-color': ''}); }, 600);
            });
        }
    });
});

/* --- [2] ЭФФЕКТЫ LUCKY BLOCK --- */
mw.loader.using(['jquery', 'mediawiki.util'], function() {
    const conf = mw.config.get(['wgTitle', 'wgNamespaceNumber', 'wgAction']);
    
    if (conf.wgTitle === 'LuckyBlock13fa' && conf.wgNamespaceNumber === 2 && conf.wgAction === 'view') {
        // Проверка: чтобы не плодить стили в head
        if (!$('#lucky-style').length) {
            $('<style id="lucky-style">')
                .text(`
                    .mw-body, .mw-parser-output { cursor: url('https://static.wikia.nocookie.net/telegramm/images/c/cf/Retro_Cursor.png'), crosshair !important; }
                    #mw-content-text a:not([style]):not(.image):not(.button) { color: #a33131 !important; }
                    .crt-vignette { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999; background: radial-gradient(circle, transparent 55%, rgba(0,0,0,0.3) 120%); }
                    .crt-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9998; background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.02) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.005), rgba(0, 255, 0, 0.002), rgba(0, 0, 255, 0.005)); background-size: 100% 2px, 2px 100%; }
                    .win-draggable { position: fixed; width: 320px; background: #c0c0c0; border: 2px solid; border-color: #dfdfdf #808080 #808080 #dfdfdf; padding: 2px; z-index: 10001; color: black; box-shadow: 4px 4px 0 rgba(0,0,0,0.3); }
                    .win-header { background: #000080; color: white; padding: 3px 6px; font-weight: bold; font-size: 11px; display: flex; justify-content: space-between; cursor: move; }
                    .win-close { cursor: pointer; padding: 0 3px; }
                `).appendTo('head');
        }

        if (!$('.crt-overlay').length) {
            $('body').append('<div class="crt-overlay"></div><div class="crt-vignette"></div>');
        }

        // Безопасное создание окна через jQuery
        window.spawnWin = function(text) {
            const $win = $(`
                <div class="win-draggable" style="left:40%; top:40%;">
                    <div class="win-header"><span>LuckyOS System</span><span class="win-close">[X]</span></div>
                    <div style="padding:15px; font-size:12px; background: #c0c0c0; border: 1px inset #808080; margin: 2px;">${text}</div>
                    <div style="padding:10px; display:flex; justify-content:center;"><button class="win-btn-ok">OK</button></div>
                </div>
            `);

            // Навешиваем события программно — это CSP не заблокирует
            $win.find('.win-close, .win-btn-ok').on('click', function() { $win.remove(); });
            $('body').append($win);
        };

        setTimeout(() => spawnWin("Обнаружена критическая доза ностальгии!"), 3000);
    }
});

/* --- [3] ТУЛТИПЫ (ЗАЩИТА ОТ МАТРЕШЕК) --- */
(function() {
    function initTooltips() {
        // Выбираем только те, где ЕЩЕ НЕТ .tip-box
        $('[class*="w-tip"]:not(.tip-ready)').each(function() {
            const $tip = $(this);
            const tipText = $tip.attr('data-tip');
            
            if (tipText && !$tip.find('.tip-box').length) {
                $tip.append($('<div class="tip-box">').text(tipText));
                $tip.addClass('tip-ready');
            }
        });
    }

    $(initTooltips);
    new MutationObserver(initTooltips).observe(document.body, { childList: true, subtree: true });
})();

/* --- [4] СОДЕРЖАНИЕ (ТОЛЬКО ЕСЛИ НУЖНО) --- */
$(function() {
    const $nativeToc = $('#toc');
    const config = mw.config.get(['wgCanonicalNamespace', 'wgIsMainPage', 'wgAction']);

    // ПРОВЕРКА: Если нет родного TOC — не рисуем стекло вообще!
    if (!$nativeToc.length || config.wgIsMainPage || config.wgAction !== 'view') return;

    let isCollapsed = false;
    try { isCollapsed = localStorage.getItem('wg-collapsed') === 'true'; } catch(e) {}

    const $sidebar = $(`
        <div id="wg-side-panel" class="wg-glass-panel ${isCollapsed ? 'wg-collapsed' : ''}">
            <div class="wg-panel-header">
                <div class="wg-header-info" ${isCollapsed ? 'style="display:none;"' : ''}>
                    <span id="wg-header-title">Содержание</span>
                    <div id="wg-current-stage">Начало</div>
                </div>
                <button id="wg-panel-toggle">${isCollapsed ? '☰' : '✕'}</button>
            </div>
            <div id="wg-panel-body" class="wg-panel-content" ${isCollapsed ? 'style="display:none;"' : ''}>
                <div id="wg-progress-bar"><div id="wg-progress-fill"></div></div>
                <div id="wg-custom-toc"></div>
            </div>
        </div>
    `);

    $('body').append($sidebar);
    $nativeToc.appendTo('#wg-custom-toc');

    $('#wg-panel-toggle').on('click', function() {
        const $panel = $('#wg-side-panel'), $body = $('#wg-panel-body'), $info = $('.wg-header-info');
        const isNowCollapsing = $body.is(':visible');
        
        $body.toggle(!isNowCollapsing);
        $info.toggle(!isNowCollapsing);
        $(this).text(isNowCollapsing ? '☰' : '✕');
        $panel.toggleClass('wg-collapsed', isNowCollapsing);
        
        try { localStorage.setItem('wg-collapsed', isNowCollapsing); } catch(e) {}
    });

    // Скролл-трекер (только если есть заголовки)
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const title = $(entry.target).find('.mw-headline').text();
                    if (title) $('#wg-current-stage').text(title);
                }
            });
        }, { rootMargin: '-100px 0px -70% 0px' });
        $('h2, h3').each(function() { observer.observe(this); });
    }
});

/* --- СКРЫВАЕМЫЕ ЗАГОЛОВКИ --- */
/* --- СКРЫВАЕМЫЕ ЗАГОЛОВКИ --- */
mw.hook('wikipage.content').add(function($content) {
    const excluded = ["WikiGram", "Правила_WikiGram", "WikiGram:О_проекте", "Заявки"];
    const currentPage = mw.config.get('wgPageName');
    if (excluded.includes(currentPage) || mw.config.get('wgAction') !== 'view') return;

    var $parseroutput = $content.children('.mw-parser-output');
    if (!$parseroutput.length) return;

    // Сначала чистим старые обертки, если вдруг скрипт сработал дважды
    $parseroutput.find('.wg-outer-wrapper').contents().unwrap();
    $parseroutput.find('.wg-inner-wrapper').contents().unwrap();
    $parseroutput.find('.wg-toggle').remove();

    ['h6', 'h5', 'h4', 'h3', 'h2'].forEach(function(tag) {
        $parseroutput.find(tag).each(function() {
            var $header = $(this);
            if ($header.closest('.portable-infobox, .navbox, #toc, .it-infobox, aside').length) return;

            var level = parseInt(tag.substring(1));
            var contentEls = [];
            var $next = $header.next();

            while ($next.length) {
                if ($next.is('h2, h3, h4, h5, h6')) {
                    var nextLevel = parseInt($next.prop('tagName').substring(1));
                    if (nextLevel <= level) break;
                }
                
                if ($next.is('.portable-infobox, .it-infobox, aside, .infobox')) {
                    $next = $next.next();
                    continue;
                }

                contentEls.push($next[0]);
                $next = $next.next();
            }

            if (contentEls.length === 0) return;

            // БОЛЬШЕ НИКАКИХ ИНЛАЙН СТИЛЕЙ ТУТ
            var $outer = $('<div class="wg-outer-wrapper"></div>');
            var $inner = $('<div class="wg-inner-wrapper"></div>');

            $header.after($outer);
            $outer.append($inner);
            $inner.append(contentEls);

            var $toggle = $('<span>')
                .addClass('wg-toggle')
                .text('▼')
                .on('click', function() {
                    var isCollapsed = $outer.hasClass('wg-outer--collapsed');
                    
                    if (isCollapsed) {
                        $outer.removeClass('wg-outer--collapsed');
                        $(this).text('▼');
                    } else {
                        $outer.addClass('wg-outer--collapsed');
                        $(this).text('▶');
                    }
                });

            $header.prepend($toggle);
        });
    });
});