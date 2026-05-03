/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

/**
 * --- МОНОШИРИННЫЙ ТЕКСТ ---
 * Эмуляция поведения Telegram
 */
(function() {
    document.addEventListener('click', function(e) {
        // Проверяем, нажат ли элемент с нужным классом
        var target = e.target.closest('.tg-mono');
        
        if (target) {
            var textToCopy = target.innerText || target.textContent;

            // Используем современное API для буфера обмена
            navigator.clipboard.writeText(textToCopy).then(function() {
                // Визуальный фидбек при успехе
                var originalColor = target.style.color;
                var originalBg = target.style.backgroundColor;

                // Подсвечиваем зеленым
                target.style.color = '#31b545';
                target.style.backgroundColor = 'rgba(49, 181, 69, 0.2)';

                // Возвращаем как было через 600мс
                setTimeout(function() {
                    target.style.color = '';
                    target.style.backgroundColor = '';
                }, 600);
                
                // Можно вывести лог в консоль для отладки
                console.log('Copied to clipboard: ' + textToCopy);
            }).catch(function(err) {
                console.error('Could not copy text: ', err);
            });
        }
    });
})();

/* --- УНИКАЛЬНЫЕ ЭФФЕКТЫ СТРАНИЦЫ LUCKY BLOCK --- */
(function() {
    if (mw.config.get('wgTitle') === 'LuckyBlock13fa' && mw.config.get('wgNamespaceNumber') === 2) {

        const style = document.createElement('style');
        style.innerHTML = `
            /* КУРСОР */
            *, body, html, a, button { 
                cursor: url('https://static.wikia.nocookie.net/telegramm/images/c/cf/Retro_Cursor.png'), crosshair !important; 
            }

            /* ЭФФЕКТЫ МОНИТОРА */
            .crt-vignette {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                pointer-events: none; z-index: 1000000;
                background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 120%);
            }
            
            /* Сетка и горизонтальное сканирование */
            .crt-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                pointer-events: none; z-index: 999999;
                background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%), 
                            linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
                background-size: 100% 3px, 3px 100%;
            }

            /* ТПОЛЗУЩАЯ ЛИНИЯ */
            .crt-scanline {
                position: fixed; top: 0; left: 0; width: 100%; height: 100px;
                background: linear-gradient(0deg, transparent, rgba(255, 255, 255, 0.05), transparent);
                opacity: 0.1;
                pointer-events: none;
                z-index: 1000001;
                animation: scanline-move 8s linear infinite;
            }

            @keyframes scanline-move {
                0% { transform: translateY(-100vh); }
                100% { transform: translateY(100vh); }
            }

            /* ГЛИТЧ */
            @keyframes system-shake {
                0% { transform: translate(0); }
                2% { transform: translate(-3px, 1px); }
                4% { transform: translate(3px, -1px); }
                6% { transform: translate(0); }
            }
            .glitch-active { animation: system-shake 0.3s ease-in-out; }

            /* ОКНА */
            .win-draggable { 
                position: fixed; width: 320px; background: #c0c0c0; 
                border: 2px solid; border-color: #dfdfdf #808080 #808080 #dfdfdf;
                padding: 2px; z-index: 1000005; font-family: 'Tahoma', sans-serif;
                box-shadow: 8px 8px 0 rgba(0,0,0,0.4); color: black;
            }
            .win-header { 
                background: #000080; color: white; padding: 3px 6px; 
                font-weight: bold; font-size: 11px; cursor: move;
                display: flex; justify-content: space-between;
            }
            .win-btn {
                border: 1px solid black; background: #c0c0c0;
                box-shadow: inset 1px 1px #fff, inset -1px -1px #808080;
                padding: 2px 12px; cursor: pointer; font-size: 11px; color: black !important;
            }
            .win-btn:active { box-shadow: inset 1.5px 1.5px #808080, inset -1.5px -1.5px #fff; }
        `;
        document.head.appendChild(style);

        // Создаем слои атмосферы
        const overlay = document.createElement('div'); overlay.className = 'crt-overlay'; document.body.appendChild(overlay);
        const vignette = document.createElement('div'); vignette.className = 'crt-vignette'; document.body.appendChild(vignette);
        const scanline = document.createElement('div'); scanline.className = 'crt-scanline'; document.body.appendChild(scanline);

        // DRAG & DROP
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
                document.querySelectorAll('.win-draggable').forEach(w => w.style.zIndex = "1000005");
                el.style.zIndex = "1000010";
            };
        }

        // ОШИБКИ
        function spawnWin(text, isMain = false) {
            const win = document.createElement('div');
            win.className = 'win-draggable';
            win.style.left = (Math.random() * 40 + 20) + "%";
            win.style.top = (Math.random() * 40 + 20) + "%";
            win.innerHTML = `
                <div class="win-header">
                    <span>LuckyOS System Error</span>
                    <span style="cursor:pointer;" onclick="this.parentElement.parentElement.remove()">[X]</span>
                </div>
                <div style="padding:20px; font-size:12px;">${text}</div>
                <div style="padding:10px; display:flex; justify-content:center; gap:10px;">
                    ${isMain ? '<button class="win-btn" id="trigger-bsod">REBOOT</button>' : ''}
                    <button class="win-btn" onclick="this.parentElement.parentElement.remove()">IGNORE</button>
                </div>
            `;
            document.body.appendChild(win);
            makeDraggable(win);
            if(isMain) document.getElementById('trigger-bsod').onclick = () => showBsod();
        }

        // Таймеры эффектов
        setInterval(() => {
            document.body.classList.add('glitch-active');
            setTimeout(() => document.body.classList.remove('glitch-active'), 300);
        }, 9000);

        setTimeout(() => spawnWin("Обнаружены битые сектора ностальгии. Выполнить перезагрузку?", true), 4000);

        // BSoD С ФИКСАМИ
        function showBsod() {
            const b = document.createElement('div');
            b.tabIndex = 0;
            b.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0000aa;color:#fff;z-index:9999999;padding:60px;font-family:monospace;line-height:1.5;font-size:1.4vw;cursor:pointer;outline:none;";
            b.innerHTML = `
                <div>
                    A problem has been detected and LuckyOS has been shut down.<br><br>
                    UNMOUNTABLE_BOOT_VOLUME<br><br>
                    Technical information:<br>
                    *** STOP: 0x000000ED (0x80F128D0, 0xc000009c, 0x00000000)<br><br>
                    <span style="background: #fff; color: #0000aa; padding: 2px 10px;">Нажми ESC или КЛИКНИ для перезагрузки...</span>
                </div>
            `;
            document.body.appendChild(b);
            b.focus();
            
            const reboot = () => location.reload();
            b.onclick = reboot;
            window.addEventListener('keydown', (e) => { if(e.key === 'Escape') reboot(); });
        }
    }
})();

/* --- ТУЛТИПЫ --- */
(function() {
    // Ждем загрузки контента, чтобы скрипт увидел все элементы
    const initTooltips = function() {
        const tooltipSelectors = '.w-tip, .w-tip-top, .w-tip-left, .w-tip-right';
        const elements = document.querySelectorAll(tooltipSelectors);

        elements.forEach(function(el) {
            // Проверяем, не создан ли тултип уже (чтобы избежать дублей)
            if (!el.querySelector('.tip-box')) {
                const text = el.getAttribute('data-tip');
                if (text) {
                    const box = document.createElement('div');
                    box.className = 'tip-box';
                    box.innerText = text;
                    el.appendChild(box);
                }
            }
        });
    };

    // Запуск при загрузке и при динамических изменениях (если нужно)
    initTooltips();
    mw.hook('wikipage.content').add(initTooltips);
})();