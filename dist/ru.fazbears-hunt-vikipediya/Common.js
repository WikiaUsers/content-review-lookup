console.log('COMMON.JS ЗАГРУЗИЛСЯ!!!');
// ===== ЧАСТИЦЫ ПЫЛИ, ПЛАВАЮЩИЕ ПО СТРАНИЦЕ =====
$(document).ready(function() {
    var dustContainer = $('<div id="dust-particles" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:hidden;"></div>');
    $('body').append(dustContainer);

    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function animateParticle(particle) {
        var w = window.innerWidth;
        var h = window.innerHeight;

        var targetX = randomRange(0, w);
        var targetY = randomRange(0, h);
        var duration = randomRange(15000, 35000);
        var opacity = randomRange(0.1, 0.4);

        particle.animate({
            left: targetX + 'px',
            top: targetY + 'px'
        }, {
            duration: duration,
            easing: 'linear',
            complete: function() {
                animateParticle(particle);
            }
        });

        setTimeout(function() {
            particle.animate({ opacity: 0 }, 3000);
            setTimeout(function() {
                particle.animate({ opacity: opacity }, 3000);
            }, 3000);
        }, duration - 6000);
    }

    function createDust() {
        var size = randomRange(1, 4);
        var startX = randomRange(0, window.innerWidth);
        var startY = randomRange(0, window.innerHeight);
        var opacity = randomRange(0.1, 0.4);

        var particle = $('<div></div>').css({
            position: 'absolute',
            width: size + 'px',
            height: size + 'px',
            background: 'rgba(200, 80, 80, 1)',
            borderRadius: '50%',
            left: startX + 'px',
            top: startY + 'px',
            boxShadow: '0 0 ' + (size * 2) + 'px rgba(200, 80, 80, 0.5)',
            opacity: opacity
        });

        dustContainer.append(particle);
        animateParticle(particle);
    }

    for (var i = 0; i < 35; i++) {
        createDust();
    }
});

// ===== ИСКРЫ ПО УГЛАМ ИНФОБОКСА =====
$(document).ready(function() {
    $('.ib').each(function() {
        var ib = $(this);
        var corners = [
            { top: '2px', left: '2px' },
            { top: '2px', right: '2px' },
            { bottom: '2px', left: '2px' },
            { bottom: '2px', right: '2px' }
        ];

        corners.forEach(function(pos) {
            var spark = $('<div></div>').css($.extend({
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: '#ff6060',
                borderRadius: '50%',
                boxShadow: '0 0 6px 2px rgba(255, 96, 96, 0.8)',
                opacity: 0,
                zIndex: 10
            }, pos));

            ib.css('position', 'relative');
            ib.append(spark);

            function flicker() {
                var delay = Math.random() * 4000 + 1000;
                setTimeout(function() {
                    spark.css('opacity', 1);
                    setTimeout(function() {
                        spark.css('opacity', 0);
                        flicker();
                    }, Math.random() * 200 + 80);
                }, delay);
            }
            flicker();
        });
    });
});

// ===== ГЛИТЧ-ТЕКСТ =====
$(document).ready(function() {
    var glitchChars = '!<>-_\\/[]{}—=+*^?#________ЖЩЭЪФЫВАПРОЛДЖЭ01';

    function randomChar() {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }

    $('.glitch-text').each(function() {
        var el = $(this);
        var originalText = el.text();
        var chars = originalText.split('');

        function glitchCycle() {
            var glitchedText = chars.map(function(char) {
                if (char === ' ') return ' ';
                if (Math.random() < 0.25) {
                    return randomChar();
                }
                return char;
            }).join('');

            el.text(glitchedText);
            setTimeout(glitchCycle, 60);
        }

        glitchCycle();
    });
});

// ===== ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ ПЛАНШЕТА ГОЛДЕН ФРЕДДИ =====
$(document).ready(function() {
    $('.gf-tablet').each(function() {
        var tablet = $(this);
        var screens = tablet.find('.gf-screen');
        var current = 0;

        function showScreen(index) {
            screens.removeClass('gf-active');
            screens.eq(index).addClass('gf-active');
        }

        tablet.find('.gf-next').on('click', function() {
            current = (current + 1) % screens.length;
            showScreen(current);
        });

        tablet.find('.gf-prev').on('click', function() {
            current = (current - 1 + screens.length) % screens.length;
            showScreen(current);
        });
    });
});

// ===== ЧАСЫ НА ПЛАНШЕТЕ ГОЛДЕН ФРЕДДИ =====
$(document).ready(function() {
    function updateClocks() {
        var now = new Date();
        var h = String(now.getHours()).padStart(2, '0');
        var m = String(now.getMinutes()).padStart(2, '0');
        $('.gf-clock').text(h + ':' + m);
    }
    updateClocks();
    setInterval(updateClocks, 1000 * 10);
});

// ===== ВИЗУАЛЬНЫЙ ГЛЮК КАРТОЧЕК (.visual-glitch) =====
$(document).ready(function() {
    $('.visual-glitch').each(function() {
        var el = $(this);
        el.css('position', 'relative');

        function glitchBurst() {
            var burstCount = Math.floor(Math.random() * 3) + 2;
            var i = 0;

            function doFrame() {
                if (i >= burstCount) {
                    el.css({ transform: 'none', filter: 'none' });
                    el.removeClass('vg-active');
                    scheduleNext();
                    return;
                }

                var offsetX = (Math.random() - 0.5) * 8;
                var skew = (Math.random() - 0.5) * 2;
                var hueRotate = Math.floor(Math.random() * 60) - 30;

                el.addClass('vg-active');
                el.css({
                    transform: 'translateX(' + offsetX + 'px) skewX(' + skew + 'deg)',
                    filter: 'hue-rotate(' + hueRotate + 'deg) contrast(1.1)'
                });

                i++;
                setTimeout(doFrame, 60 + Math.random() * 40);
            }

            doFrame();
        }

        function scheduleNext() {
            var delay = Math.random() * 6000 + 3000;
            setTimeout(glitchBurst, delay);
        }

        scheduleNext();
    });
});

// ===== ДИСКО-ШАР + БЛИКИ ПО ВСЕЙ СТРАНИЦЕ =====
$(document).ready(function() {
    var discoColors = ['#ff4060', '#40c0ff', '#ffe040', '#a040ff', '#40ff90', '#ff9040'];
    var discoInterval = null;
    var discoLightsContainer = $('<div id="disco-lights" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9998;overflow:hidden;"></div>');
    $('body').append(discoLightsContainer);

    function spawnLightFlash() {
        var size = Math.random() * 40 + 15;
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight;
        var color = discoColors[Math.floor(Math.random() * discoColors.length)];
        var duration = Math.random() * 600 + 400;

        var flash = $('<div></div>').css({
            position: 'absolute',
            left: x + 'px',
            top: y + 'px',
            width: size + 'px',
            height: size + 'px',
            background: color,
            borderRadius: '2px',
            opacity: 0,
            filter: 'blur(2px)',
            boxShadow: '0 0 ' + (size * 0.8) + 'px ' + color,
            transform: 'rotate(' + (Math.random() * 360) + 'deg)'
        });

        discoLightsContainer.append(flash);

        flash.animate({ opacity: 0.55 }, duration * 0.3, function() {
            flash.animate({ opacity: 0 }, duration * 0.7, function() {
                flash.remove();
            });
        });
    }

    $('#clown-disco-btn').on('click', function() {
        var container = $('#disco-ball-container');
        container.css('top', '20px');

        discoInterval = setInterval(function() {
            var burst = Math.floor(Math.random() * 3) + 2;
            for (var i = 0; i < burst; i++) {
                spawnLightFlash();
            }
        }, 150);

        setTimeout(function() {
            clearInterval(discoInterval);
            container.css('top', '-220px');
        }, 8000);
    });
});

// ===== ЗВУК ПРИ НАВЕДЕНИИ НА ВКЛАДКИ ТАББЕРА =====
$(document).ready(function() {
    var audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioCtx;
    }

    function playHoverBlip() {
        var ctx = getAudioContext();

        var osc = ctx.createOscillator();
        var gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.06);

        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.08);
    }

    $(document).on('mouseenter', '.wds-tabs__tab-label', function() {
        playHoverBlip();
    });
});

// ===== ЭФФЕКТ ФОНАРИКА НА ДОСКЕ НАВИГАЦИИ =====
$(document).ready(function() {
    var board = $('.probka');
    if (board.length === 0) return;

    board.css('position', 'relative');

    var flashlight = $('<div class="board-flashlight"></div>');
    board.append(flashlight);

    board.on('mousemove', function(e) {
        var rect = this.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        flashlight.css({
            'background': 'radial-gradient(circle 180px at ' + x + 'px ' + y + 'px, transparent 0%, rgba(0,0,0,0.75) 100%)',
            'opacity': 1
        });
    });

    board.on('mouseleave', function() {
        flashlight.css('opacity', 0);
    });

    // ===== 3D-НАКЛОН БУМАЖЕК В СТОРОНУ КУРСОРА =====
    $('.note-bumajka').each(function() {
        var note = $(this);

        note.on('mousemove', function(e) {
            var rect = this.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;

            var rotateY = ((x - centerX) / centerX) * 8;
            var rotateX = ((centerY - y) / centerY) * 8;

            note.css('transform', 'rotate(0deg) scale(1.06) perspective(400px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
        });

        note.on('mouseleave', function() {
            note.css('transform', '');
        });
    });
});

// ===== РАСШИРЕННЫЕ ЗВУКОВЫЕ ЭФФЕКТЫ =====
$(document).ready(function() {
    var audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioCtx;
    }

    // Универсальный генератор звука
    function playTone(freqStart, freqEnd, duration, type, volume) {
        var ctx = getAudioContext();
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();

        osc.type = type || 'square';
        osc.frequency.setValueAtTime(freqStart, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freqEnd, ctx.currentTime + duration);

        gain.gain.setValueAtTime(volume || 0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
    }

    // 1. Вкладки таббера — короткий блип (уже было)
    $(document).on('mouseenter', '.wds-tabs__tab-label', function() {
        playTone(180, 60, 0.08, 'square', 0.06);
    });

    // 2. Карточки аниматроников/предметов — низкий гулкий рокот
    $(document).on('mouseenter', '.animatronic-card', function() {
        playTone(90, 40, 0.15, 'sawtooth', 0.05);
    });

    // 3. Стрелки навигации (планшет, слайдер) — механический щелчок
    $(document).on('click', '.gf-nav-arrow', function() {
        playTone(300, 900, 0.05, 'square', 0.07);
    });

    // 4. Бумажки на доске — лёгкий деревянный стук
    $(document).on('mouseenter', '.note-bumajka', function() {
        playTone(220, 140, 0.06, 'triangle', 0.05);
    });
});

// ===== ЭФФЕКТ ФОНАРИКА НА ДОСКЕ НАВИГАЦИИ =====
$(document).ready(function() {
    var board = $('.stena');
    if (board.length === 0) return;

    board.css('position', 'relative');

    var flashlight = $('<div class="board-flashlight"></div>');
    board.append(flashlight);

    board.on('mousemove', function(e) {
        var rect = this.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        flashlight.css({
            'background': 'radial-gradient(circle 220px at ' + x + 'px ' + y + 'px, transparent 0%, rgba(0,0,0,0.75) 100%)',
            'opacity': 1
        });
    });

    board.on('mouseleave', function() {
        flashlight.css('opacity', 0);
    });

    // ===== 3D-НАКЛОН БУМАЖЕК В СТОРОНУ КУРСОРА =====
    $('.note-bumajka').each(function() {
        var note = $(this);

        note.on('mousemove', function(e) {
            var rect = this.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;

            var rotateY = ((x - centerX) / centerX) * 8;
            var rotateX = ((centerY - y) / centerY) * 8;

            note.css('transform', 'rotate(0deg) scale(1.06) perspective(400px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
        });

        note.on('mouseleave', function() {
            note.css('transform', '');
        });
    });
});


/* ==========================================================
   Случайные "выползающие" гифки — раз в 10–15 минут,
   на любой странице вики, без повторов, пока не покажет все 6.
   Вставить в MediaWiki:Common.js
   ========================================================== */
(function () {
    'use strict';

    // 1. ВСТАВЬ СЮДА ССЫЛКИ НА СВОИ 6 ФАЙЛОВ (гифки .gif ИЛИ видео .mp4/.webm)
    var GIF_URLS = [
        'https://static.wikia.nocookie.net/fazbears-hunt-aktualnaya-vikipediya/images/2/27/2.mp4/revision/latest?cb=20260716212550&path-prefix=ru',
        'https://static.wikia.nocookie.net/fazbears-hunt-aktualnaya-vikipediya/images/7/74/1.mp4/revision/latest?cb=20260716212550&path-prefix=ru',
        'https://static.wikia.nocookie.net/fazbears-hunt-aktualnaya-vikipediya/images/f/f3/3.mp4/revision/latest?cb=20260716212550&path-prefix=ru',
        'https://static.wikia.nocookie.net/fazbears-hunt-aktualnaya-vikipediya/images/2/23/4.mp4/revision/latest?cb=20260716212547&path-prefix=ru',
        'https://static.wikia.nocookie.net/fazbears-hunt-aktualnaya-vikipediya/images/e/e9/5.mp4/revision/latest?cb=20260716212552&path-prefix=ru',
        'https://static.wikia.nocookie.net/fazbears-hunt-aktualnaya-vikipediya/images/7/7f/6.mp4/revision/latest?cb=20260716212548&path-prefix=ru'
    ];

    var MIN_INTERVAL = 10 * 60 * 1000; // 10 минут
    var MAX_INTERVAL = 15 * 60 * 1000; // 15 минут
    var DISPLAY_TIME = 6000;           // для гифок — сколько держится на экране; для видео — запасной таймер, если видео вдруг не закончится само (мс)
    var STORAGE_KEY = 'wikiGifPopupState';

    function randomInterval() {
        return MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);
    }

    function shuffle(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
        return a;
    }

    function loadState() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (raw) return JSON.parse(raw);
        } catch (e) {}
        return null;
    }

    function saveState(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {}
    }

    function initState() {
        var state = {
            queue: shuffle(GIF_URLS.map(function (_, i) { return i; })),
            nextTime: Date.now() + randomInterval()
        };
        saveState(state);
        return state;
    }

    // true = видео (mp4/webm), false = картинка/гиф
    var IS_VIDEO = true;

    function removeOverlay(overlay) {
        overlay.style.opacity = '0';
        setTimeout(function () {
            overlay.remove();
        }, 600);
    }

    // Показ гифки/видео на экране
    function showGif(url) {
        var overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '999999';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.6s ease';
        overlay.style.background = 'transparent';

        var media;
        if (IS_VIDEO) {
            media = document.createElement('video');
            media.src = url;
            media.autoplay = true;
            media.muted = true;      // без этого браузер заблокирует автозапуск
            media.playsInline = true; // важно для мобильных
            media.loop = false;
        } else {
            media = document.createElement('img');
            media.src = url;
        }

        media.style.position = 'absolute';
        media.style.top = '0';
        media.style.left = '0';
        media.style.width = '100%';
        media.style.height = '100%';
        media.style.objectFit = 'fill'; // растягивает на весь экран без сохранения пропорций

        overlay.appendChild(media);
        document.body.appendChild(overlay);

        // плавное появление
        requestAnimationFrame(function () {
            overlay.style.opacity = '1';
        });

        if (IS_VIDEO) {
            // убираем оверлей ровно когда видео закончилось
            media.addEventListener('ended', function () {
                removeOverlay(overlay);
            });
            // страховка: если autoplay почему-то не сработал/завис —
            // всё равно уберём оверлей через запасное время
            setTimeout(function () {
                if (document.body.contains(overlay)) {
                    removeOverlay(overlay);
                }
            }, DISPLAY_TIME);
        } else {
            // для гифок — просто по таймеру
            setTimeout(function () {
                removeOverlay(overlay);
            }, DISPLAY_TIME);
        }
    }

    function triggerGif(state) {
        if (state.queue.length === 0) {
            state.queue = shuffle(GIF_URLS.map(function (_, i) { return i; }));
        }
        var index = state.queue.shift();
        showGif(GIF_URLS[index]);

        state.nextTime = Date.now() + randomInterval();
        saveState(state);
        scheduleNext(state);
    }

    function scheduleNext(state) {
        var delay = Math.max(0, state.nextTime - Date.now());
        setTimeout(function () {
            var fresh = loadState() || state; // подхватываем актуальное состояние
            triggerGif(fresh);
        }, delay);
    }

    // Инициализация при загрузке любой страницы
    var state = loadState();
    if (!state) {
        state = initState();
    }

    if (Date.now() >= state.nextTime) {
        // время уже подошло (например, вкладка была закрыта) — показываем сразу
        triggerGif(state);
    } else {
        scheduleNext(state);
    }

}());