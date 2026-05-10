/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

/* --- КОПИРОВАНИЕ ТЕКСТА --- */
$(function() {
    $(document).on('click', '.tg-mono', function() {
        var $target = $(this);
        var textToCopy = $target.text();

        navigator.clipboard.writeText(textToCopy).then(function() {
            $target.css({'color': '#31b545', 'background-color': 'rgba(49, 181, 69, 0.2)'});
            setTimeout(function() {
                $target.css({'color': '', 'background-color': ''});
            }, 600);
        });
    });
});

/* --- УНИКАЛЬНЫЕ ЭФФЕКТЫ LUCKY BLOCK --- */
(function() {
    // Проверяем страницу и то, что мы НЕ в режиме правки
    if (mw.config.get('wgPageName') === 'User:LuckyBlock13fa' && mw.config.get('wgAction') === 'view') {

        const style = document.createElement('style');
        style.innerHTML = `
            /* КУРСОР - только внутри статьи */
            .mw-parser-output, .mw-parser-output a, .mw-parser-output button { 
                cursor: url('https://static.wikia.nocookie.net/telegramm/images/c/cf/Retro_Cursor.png'), crosshair !important; 
            }

            /* CRT ЭФФЕКТЫ */
            .crt-vignette {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                pointer-events: none; z-index: 9999;
                background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 120%);
            }
            .crt-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                pointer-events: none; z-index: 9998;
                background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), 
                            linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02));
                background-size: 100% 3px, 3px 100%;
            }
            .crt-scanline {
                position: fixed; top: 0; left: 0; width: 100%; height: 100px;
                background: linear-gradient(0deg, transparent, rgba(255, 255, 255, 0.05), transparent);
                opacity: 0.1; pointer-events: none; z-index: 10000;
                animation: scanline-move 10s linear infinite;
            }
            @keyframes scanline-move {
                0% { transform: translateY(-100vh); }
                100% { transform: translateY(100vh); }
            }
            @keyframes system-shake {
                0% { transform: translate(0); }
                2% { transform: translate(-2px, 1px); }
                4% { transform: translate(2px, -1px); }
                6% { transform: translate(0); }
            }
            .glitch-active { animation: system-shake 0.3s ease-in-out; }

            /* ОКНА (Win95 Style) */
            .win-draggable { 
                position: fixed; width: 320px; background: #c0c0c0; 
                border: 2px solid; border-color: #dfdfdf #808080 #808080 #dfdfdf;
                padding: 2px; z-index: 10001; font-family: 'Tahoma', sans-serif;
                box-shadow: 4px 4px 0 rgba(0,0,0,0.3); color: black;
            }
            .win-header { 
                background: #000080; color: white; padding: 3px 6px; 
                font-weight: bold; font-size: 11px; cursor: move;
                display: flex; justify-content: space-between;
            }
            .win-btn {
                border: 1px solid black; background: #c0c0c0;
                box-shadow: inset 1px 1px #fff, inset -1px -1px #808080;
                padding: 2px 10px; cursor: pointer; font-size: 11px;
            }
        `;
        document.head.appendChild(style);

        // Создаем слои
        $('body').append('<div class="crt-overlay"></div><div class="crt-vignette"></div><div class="crt-scanline"></div>');

        // Логика Drag & Drop
        function makeDraggable(el) {
            let p1 = 0, p2 = 0, p3 = 0, p4 = 0;
            const h = el.querySelector('.win-header');
            h.onmousedown = (e) => {
                e.preventDefault(); p3 = e.clientX; p4 = e.clientY;
                document.onmouseup = () => { document.onmouseup = null; document.onmousemove = null; };
                document.onmousemove = (e) => {
                    p1 = p3 - e.clientX; p2 = p4 - e.clientY;
                    p3 = e.clientX; p4 = e.clientY;
                    el.style.top = (el.offsetTop - p2) + "px"; el.style.left = (el.offsetLeft - p1) + "px";
                };
                $('.win-draggable').css('z-index', '10001');
                $(el).css('z-index', '10010');
            };
        }

        window.spawnWin = function(text, isMain = false) {
            const win = document.createElement('div');
            win.className = 'win-draggable';
            win.style.left = (Math.random() * 30 + 30) + "%";
            win.style.top = (Math.random() * 30 + 30) + "%";
            win.innerHTML = `
                <div class="win-header">
                    <span>LuckyOS System Error</span>
                    <span style="cursor:pointer;" onclick="this.parentElement.parentElement.remove()">[X]</span>
                </div>
                <div style="padding:15px; font-size:12px; background: #c0c0c0;">${text}</div>
                <div style="padding:10px; display:flex; justify-content:center; gap:10px; background: #c0c0c0;">
                    ${isMain ? '<button class="win-btn" onclick="showBsod()">REBOOT</button>' : ''}
                    <button class="win-btn" onclick="this.parentElement.parentElement.remove()">IGNORE</button>
                </div>
            `;
            document.body.appendChild(win);
            makeDraggable(win);
        };

        // Тряска экрана иногда
        setInterval(() => {
            $('body').addClass('glitch-active');
            setTimeout(() => $('body').removeClass('glitch-active'), 300);
        }, 12000);

        setTimeout(() => spawnWin("Обнаружены битые сектора ностальгии. Выполнить перезагрузку?", true), 4000);

        window.showBsod = function() {
            const b = $('<div id="bsod-screen">')
                .css({
                    "position":"fixed","top":"0","left":"0","width":"100vw","height":"100vh",
                    "background":"#0000aa","color":"#fff","z-index":"999999","padding":"60px",
                    "font-family":"monospace","font-size":"1.4vw","cursor":"pointer"
                })
                .html('<div>A problem has been detected and LuckyOS has been shut down.<br><br>UNMOUNTABLE_BOOT_VOLUME<br><br>Technical information:<br>*** STOP: 0x000000ED<br><br><span style="background: #fff; color: #0000aa; padding: 2px 10px;">Кликни для перезагрузки...</span></div>')
                .click(function() { location.reload(); })
                .appendTo('body');
        };
    }
})();

/* --- СОДЕРЖАНИЕ СТРАНИЦЫ --- */
$(function() {
    var allowedNamespaces = ["", "User_blog"];
    var currentNamespace = mw.config.get('wgCanonicalNamespace');
    var currentAction = mw.config.get('wgAction'); // Получаем текущее действие (view, edit, submit...)

    // Условие: разрешенные пространства И не главная И режим ПРОСМОТРА
    if (allowedNamespaces.indexOf(currentNamespace) !== -1 && 
        !mw.config.get('wgIsMainPage') && 
        currentAction === 'view') {
        
        var storageKey = 'wikigram-panel-collapsed';
        var isCollapsed = localStorage.getItem(storageKey) === 'true';

        var $sidebar = $('<div id="wg-side-panel" class="wg-glass-panel' + (isCollapsed ? ' wg-collapsed' : '') + '">' +
            '<div class="wg-panel-header">' +
                '<div class="wg-header-info"' + (isCollapsed ? ' style="display:none;"' : '') + '>' +
                    '<span id="wg-header-title">Содержание</span>' +
                    '<div id="wg-current-stage">Начало</div>' +
                '</div>' +
                '<button id="wg-panel-toggle" title="Скрыть/Показать">' + (isCollapsed ? '☰' : '✕') + '</button>' +
            '</div>' +
            '<div id="wg-panel-body" class="wg-panel-content"' + (isCollapsed ? ' style="display:none;"' : '') + '>' +
                '<div id="wg-progress-bar"><div id="wg-progress-fill"></div></div>' +
                '<div id="wg-custom-toc"></div>' +
            '</div>' +
        '</div>');

        $('body').append($sidebar);
        $('#toc').appendTo('#wg-custom-toc');

        // Логика сворачивания
        $('#wg-panel-toggle').on('click', function() {
            var $body = $('#wg-panel-body'), $panel = $('#wg-side-panel'), $info = $('.wg-header-info');
            if ($body.is(':visible')) {
                $body.hide(); $info.hide();
                $(this).text('☰'); $panel.addClass('wg-collapsed');
                localStorage.setItem(storageKey, 'true');
            } else {
                $panel.removeClass('wg-collapsed');
                $body.show(); $info.show();
                $(this).text('✕');
                localStorage.setItem(storageKey, 'false');
            }
        });

        // Отслеживание скролла
        var observerOptions = { rootMargin: '-100px 0px -70% 0px', threshold: 0 };
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var sectionTitle = $(entry.target).find('.mw-headline').text();
                    if (sectionTitle) {
                        $('#wg-current-stage').text(sectionTitle);
                        var $tocLinks = $('#wg-custom-toc li a');
                        $tocLinks.removeClass('active-stage');
                        var $activeLink = $tocLinks.filter(function() {
                            return $(this).find('.toctext').text() === sectionTitle || $(this).text() === sectionTitle;
                        });
                        if ($activeLink.length) {
                            $activeLink.addClass('active-stage');
                            $activeLink[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    }
                }
            });
        }, observerOptions);
        $('h2, h3').each(function() { observer.observe(this); });

        $(window).on('scroll', function() {
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (height > 0) {
                var scrolled = (document.documentElement.scrollTop / height) * 100;
                $('#wg-progress-fill').css('width', scrolled + '%');
            }
        });
    }
});

/* --- ТУЛТИПЫ --- */
(function() {
    function initTooltips() {
        // Ищем все элементы подсказок, которые еще не были обработаны
        const tips = document.querySelectorAll('[class*="w-tip"]:not(.tip-ready)');

        tips.forEach(tip => {
            const tipText = tip.getAttribute('data-tip');
            
            if (tipText) {
                // Создаем контейнер для подсказки
                const tipBox = document.createElement('div');
                tipBox.className = 'tip-box';
                tipBox.textContent = tipText;
                
                // Вставляем его внутрь элемента с текстом
                tip.appendChild(tipBox);
                
                // Помечаем, что подсказка готова, чтобы не дублировать при повторном запуске
                tip.classList.add('tip-ready');
            }
        });
    }

    // Запуск при загрузке страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTooltips);
    } else {
        initTooltips();
    }

    // Если на вики используется динамическая подгрузка (например, превью или табы)
    const observer = new MutationObserver(initTooltips);
    observer.observe(document.body, { childList: true, subtree: true });
})();