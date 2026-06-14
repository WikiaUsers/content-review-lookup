/* === BILSON WIKI PAGE EFFECTS === */

/* ============================================================
   SIN PAGE
   ============================================================ */
(function () {
    if (mw.config.get('wgPageName') !== 'Sin') return;

    var style = document.createElement('style');
    style.textContent = [
        '.sin-flicker{animation:sinFlicker 4s infinite}',
        '@keyframes sinFlicker{0%,95%,100%{opacity:1}96%{opacity:0.1}97%{opacity:0.9}98%{opacity:0.2}99%{opacity:1}}',
        '.sin-glitch{position:relative;display:inline-block}',
        '.sin-glitch::before,.sin-glitch::after{content:attr(data-text);position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}',
        '.sin-glitch::before{color:#ff0000;animation:sinGlitchTop 3s infinite;clip-path:polygon(0 0,100% 0,100% 35%,0 35%);transform:translateX(-3px)}',
        '.sin-glitch::after{color:#00ffff;animation:sinGlitchBottom 3s infinite;clip-path:polygon(0 65%,100% 65%,100% 100%,0 100%);transform:translateX(3px)}',
        '@keyframes sinGlitchTop{0%,80%,100%{transform:translateX(0);opacity:0}81%{transform:translateX(-4px);opacity:0.8}83%{transform:translateX(4px);opacity:0.5}85%{transform:translateX(0);opacity:0}}',
        '@keyframes sinGlitchBottom{0%,85%,100%{transform:translateX(0);opacity:0}86%{transform:translateX(3px);opacity:0.7}88%{transform:translateX(-3px);opacity:0.4}90%{transform:translateX(0);opacity:0}}',
        '.sin-pulse-text{animation:sinPulse 2.5s ease-in-out infinite}',
        '@keyframes sinPulse{0%,100%{text-shadow:0 0 4px #8b0000}50%{text-shadow:0 0 18px #ff0000,0 0 30px #8b0000}}',
        '.sin-scanline{position:relative;overflow:hidden}',
        '.sin-scanline::after{content:"";position:absolute;top:-100%;left:0;width:100%;height:3px;background:rgba(139,0,0,0.4);animation:sinScan 6s linear infinite;pointer-events:none}',
        '@keyframes sinScan{0%{top:-5%}100%{top:105%}}',
        '.sin-shake:hover{animation:sinShake 0.4s ease-in-out}',
        '@keyframes sinShake{0%,100%{transform:translateX(0)}15%{transform:translateX(-4px) rotate(-0.5deg)}30%{transform:translateX(4px) rotate(0.5deg)}45%{transform:translateX(-3px)}60%{transform:translateX(3px)}75%{transform:translateX(-2px)}}',
        '.sin-threat-blink{animation:sinThreatBlink 1.2s step-start infinite}',
        '@keyframes sinThreatBlink{0%,100%{opacity:1;color:#ff4444}50%{opacity:0.3;color:#8b0000}}',
        '.sin-redact{background-color:#8b0000;color:#8b0000;cursor:pointer;border-radius:2px;padding:0 3px;transition:background-color 0.3s,color 0.3s}',
        '.sin-redact:hover{background-color:transparent;color:#c0392b}',
        '.sin-typing::after{content:"|";animation:sinBlink 1s step-start infinite}',
        '@keyframes sinBlink{50%{opacity:0}}',
        '.sin-vhs{animation:sinVHS 8s infinite}',
        '@keyframes sinVHS{0%,93%,100%{filter:none;transform:none}94%{filter:hue-rotate(90deg) saturate(3);transform:skewX(1deg)}95%{filter:none;transform:skewX(-1deg)}96%{filter:saturate(0) brightness(2);transform:none}97%{filter:none}}'
    ].join('');
    document.head.appendChild(style);

    var audio = document.createElement('audio');
    audio.src = 'https://static.wikia.nocookie.net/bilson/images/f/fd/Sin.mp3/revision/latest?cb=20260610192951';
    audio.loop = true;
    audio.volume = 0.6;
    audio.addEventListener('pause', function () { setTimeout(function () { audio.play(); }, 10); });
    audio.addEventListener('volumechange', function () {
        if (audio.volume !== 0.6) audio.volume = 0.6;
        if (audio.muted) audio.muted = false;
    });
    var sinStarted = false;
    function sinStartAudio() {
        if (sinStarted) return; sinStarted = true;
        audio.play().catch(function () { sinStarted = false; });
    }
    document.addEventListener('click', sinStartAudio);
    document.addEventListener('keydown', sinStartAudio);
    document.addEventListener('scroll', sinStartAudio);
    document.addEventListener('mousemove', sinStartAudio);
    document.body.appendChild(audio);

    var whispers = [
        'he already knows you\'re here.','you shouldn\'t have opened this.',
        'he\'s been notified.','close the tab. now.','too late.',
        'he doesn\'t forget faces.','you were logged.','why did you look?',
        'he can see this screen.','you were warned.','there is no safe distance.',
        'he remembered your name.','the records have your name now.',
        'he let them go. he won\'t let you.','you were counted.',
    ];
    var whisperEl = document.createElement('div');
    whisperEl.id = 'sin-whisper';
    whisperEl.setAttribute('style',
        'position:fixed !important;bottom:30px !important;right:30px !important;' +
        'z-index:2147483647 !important;color:#8b0000 !important;font-family:Georgia,serif !important;' +
        'font-size:14px !important;font-style:italic !important;letter-spacing:2px !important;' +
        'pointer-events:none !important;max-width:240px !important;text-align:right !important;' +
        'line-height:1.4 !important;opacity:0;transition:opacity 1.2s ease !important;' +
        'text-shadow:0 0 8px #8b0000 !important;'
    );
    document.body.appendChild(whisperEl);
    function showSinWhisper() {
        whisperEl.textContent = whispers[Math.floor(Math.random() * whispers.length)];
        whisperEl.style.setProperty('opacity', '1', 'important');
        setTimeout(function () { whisperEl.style.setProperty('opacity', '0', 'important'); }, 3500);
        setTimeout(showSinWhisper, Math.random() * 15000 + 10000);
    }
    setTimeout(showSinWhisper, 5000);

    var sinTitle = document.getElementById('firstHeading');
    if (sinTitle) {
        var origSinTitle = sinTitle.textContent;
        setInterval(function () {
            if (Math.random() < 0.15) {
                sinTitle.textContent = origSinTitle.split('').map(function (c) {
                    return Math.random() < 0.2 ? String.fromCharCode(c.charCodeAt(0) + Math.floor(Math.random() * 6 - 3)) : c;
                }).join('');
                setTimeout(function () { sinTitle.textContent = origSinTitle; }, 150);
            }
        }, 3000);
    }

    var sinDots = [];
    document.addEventListener('mousemove', function (e) {
        var dot = document.createElement('div');
        dot.setAttribute('style',
            'position:fixed !important;width:4px !important;height:4px !important;' +
            'border-radius:50% !important;background:#8b0000 !important;pointer-events:none !important;' +
            'z-index:2147483646 !important;opacity:0.7;transition:opacity 0.6s;' +
            'top:' + e.clientY + 'px !important;left:' + e.clientX + 'px !important;'
        );
        document.body.appendChild(dot);
        sinDots.push(dot);
        setTimeout(function () {
            dot.style.setProperty('opacity', '0', 'important');
            setTimeout(function () { if (dot.parentNode) dot.parentNode.removeChild(dot); }, 600);
        }, 100);
        if (sinDots.length > 30) { var old = sinDots.shift(); if (old.parentNode) old.parentNode.removeChild(old); }
    });
})();

/* ============================================================
   GL4!TCH PAGE
   ============================================================ */
(function () {
    if (mw.config.get('wgPageName') !== 'GL4!TCH') return;

    // ── INJECT CSS ────────────────────────────────────────────────
    var style = document.createElement('style');
    style.textContent = [
        '.gl-wiggle{display:inline-block;animation:glWiggle 0.08s infinite}',
        '@keyframes glWiggle{0%{transform:translate(0,0) skewX(0deg)}25%{transform:translate(-2px,1px) skewX(-1deg)}50%{transform:translate(2px,-1px) skewX(1deg)}75%{transform:translate(-1px,2px) skewX(-0.5deg)}100%{transform:translate(1px,-2px) skewX(0.5deg)}}',
        '.gl-stretch{display:inline-block;animation:glStretch 0.12s infinite}',
        '@keyframes glStretch{0%,100%{transform:scaleX(1)}50%{transform:scaleX(1.04)}}',
        '.gl-bounce{display:inline-block;animation:glBounce 0.15s infinite}',
        '@keyframes glBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}',
        '.gl-grow{display:inline-block;animation:glGrow 0.2s infinite}',
        '@keyframes glGrow{0%,100%{transform:scale(1)}50%{transform:scale(1.02)}}',

        '#gl-epilepsy{position:fixed !important;top:0 !important;left:0 !important;width:100% !important;' +
        'z-index:2147483647 !important;background:#000 !important;border-bottom:4px solid #ff0000 !important;' +
        'padding:12px 20px !important;text-align:center !important;font-family:monospace !important;' +
        'font-size:13px !important;color:#ff0000 !important;letter-spacing:3px !important;' +
        'text-transform:uppercase !important;box-sizing:border-box !important;}',

        '#gl-flash{position:fixed !important;top:0 !important;left:0 !important;' +
        'width:100% !important;height:100% !important;pointer-events:none !important;' +
        'z-index:2147483645 !important;opacity:0;transition:none !important;}',

        '#gl-scanlines{position:fixed !important;top:0 !important;left:0 !important;' +
        'width:100% !important;height:100% !important;pointer-events:none !important;' +
        'z-index:2147483644 !important;' +
        'background:repeating-linear-gradient(0deg,rgba(0,255,65,0.025) 0px,rgba(0,255,65,0.025) 1px,transparent 1px,transparent 3px);}',

        '@keyframes glSlice{' +
        '0%,100%{clip-path:none;transform:none;filter:none}' +
        '92%{clip-path:polygon(0 0,100% 0,100% 30%,0 30%);transform:translateX(12px);filter:hue-rotate(90deg)}' +
        '93%{clip-path:polygon(0 30%,100% 30%,100% 60%,0 60%);transform:translateX(-18px);filter:hue-rotate(180deg)}' +
        '94%{clip-path:polygon(0 60%,100% 60%,100% 85%,0 85%);transform:translateX(8px);filter:hue-rotate(270deg)}' +
        '95%{clip-path:none;transform:none;filter:none}' +
        '}',

        '@keyframes glSlice2{' +
        '0%,100%{clip-path:none;transform:none;filter:none}' +
        '92%{clip-path:polygon(0 15%,100% 15%,100% 45%,0 45%);transform:translateX(-22px);filter:saturate(8) hue-rotate(120deg)}' +
        '93%{clip-path:polygon(0 50%,100% 50%,100% 75%,0 75%);transform:translateX(14px);filter:saturate(6) hue-rotate(240deg)}' +
        '94%{clip-path:polygon(0 0,100% 0,100% 20%,0 20%);transform:translateX(-6px);filter:invert(1)}' +
        '95%{clip-path:none;transform:none;filter:none}' +
        '}',
    ].join('');
    document.head.appendChild(style);

    var warning = document.createElement('div');
    warning.id = 'gl-epilepsy';
    warning.innerHTML = '⚠ EPILEPSY WARNING ⚠ &nbsp;&nbsp; THIS PAGE CONTAINS RAPID FLASHING LIGHTS AND INTENSE VISUAL EFFECTS &nbsp;&nbsp; ⚠ EPILEPSY WARNING ⚠';
    document.body.insertBefore(warning, document.body.firstChild);
    document.body.style.paddingTop = '50px';

    var audio = document.createElement('audio');
    audio.src = 'https://static.wikia.nocookie.net/bilson/images/GL4!TCHsound.mp3';
    audio.loop = true;
    audio.volume = 0.7;
    audio.addEventListener('pause', function () { setTimeout(function () { audio.play(); }, 10); });
    audio.addEventListener('volumechange', function () {
        if (audio.volume !== 0.7) audio.volume = 0.7;
        if (audio.muted) audio.muted = false;
    });
    var glStarted = false;
    function glStartAudio() {
        if (glStarted) return; glStarted = true;
        audio.play().catch(function () { glStarted = false; });
    }
    document.addEventListener('click', glStartAudio);
    document.addEventListener('keydown', glStartAudio);
    document.addEventListener('scroll', glStartAudio);
    document.addEventListener('mousemove', glStartAudio);
    document.body.appendChild(audio);

    var scanlines = document.createElement('div');
    scanlines.id = 'gl-scanlines';
    document.body.appendChild(scanlines);

    var flash = document.createElement('div');
    flash.id = 'gl-flash';
    document.body.appendChild(flash);

    var flashColors = ['#00ff41','#ff00ff','#00ffff','#ffffff','#ff0000','#ffff00'];
    function doFlash() {
        var seq = Math.floor(Math.random() * 3) + 2;
        var i = 0;
        function nextFlash() {
            if (i >= seq) {
                flash.style.setProperty('opacity', '0', 'important');
                setTimeout(doFlash, Math.random() * 5000 + 4000);
                return;
            }
            flash.style.setProperty('background', flashColors[Math.floor(Math.random() * flashColors.length)], 'important');
            flash.style.setProperty('opacity', (Math.random() * 0.5 + 0.4).toString(), 'important');
            setTimeout(function () {
                flash.style.setProperty('opacity', '0', 'important');
                setTimeout(nextFlash, Math.random() * 60 + 30);
            }, Math.random() * 60 + 30);
            i++;
        }
        nextFlash();
    }
    setTimeout(doFlash, 3000);

    var contentEl = document.getElementById('mw-content-text') || document.getElementById('content') || document.body;

    function doSliceGlitch() {
        var c1 = document.createElement('div');
        c1.setAttribute('style',
            'position:fixed !important;top:0 !important;left:0 !important;' +
            'width:100% !important;height:100% !important;pointer-events:none !important;' +
            'z-index:2147483643 !important;overflow:hidden !important;' +
            'clip-path:polygon(0 ' + (Math.random()*30) + '%,100% ' + (Math.random()*30) + '%,100% ' + (30+Math.random()*30) + '%,0 ' + (30+Math.random()*30) + '%) !important;' +
            'transform:translateX(' + (Math.random()*40-20) + 'px) !important;' +
            'filter:hue-rotate(' + Math.floor(Math.random()*360) + 'deg) saturate(6) !important;' +
            'background:inherit !important;'
        );
        var c2 = document.createElement('div');
        c2.setAttribute('style',
            'position:fixed !important;top:0 !important;left:0 !important;' +
            'width:100% !important;height:100% !important;pointer-events:none !important;' +
            'z-index:2147483642 !important;overflow:hidden !important;' +
            'clip-path:polygon(0 ' + (40+Math.random()*20) + '%,100% ' + (40+Math.random()*20) + '%,100% ' + (65+Math.random()*20) + '%,0 ' + (65+Math.random()*20) + '%) !important;' +
            'transform:translateX(' + (Math.random()*50-25) + 'px) !important;' +
            'filter:hue-rotate(' + Math.floor(Math.random()*360) + 'deg) saturate(8) !important;' +
            'background:inherit !important;'
        );

        var colors = ['#00ff41','#ff00ff','#00ffff','#ff0000','#0000ff','#ffff00'];
        c1.style.setProperty('background', colors[Math.floor(Math.random()*colors.length)], 'important');
        c1.style.setProperty('opacity', '0.15', 'important');
        c2.style.setProperty('background', colors[Math.floor(Math.random()*colors.length)], 'important');
        c2.style.setProperty('opacity', '0.15', 'important');

        document.body.appendChild(c1);
        document.body.appendChild(c2);

        var origTransform = contentEl.style.transform;
        var origFilter = contentEl.style.filter;
        var slices = [
            {transform: 'translateX('+Math.floor(Math.random()*30-15)+'px)', filter: 'hue-rotate('+Math.floor(Math.random()*360)+'deg) saturate(5)'},
            {transform: 'translateX('+Math.floor(Math.random()*40-20)+'px) skewX('+Math.floor(Math.random()*4-2)+'deg)', filter: 'hue-rotate('+Math.floor(Math.random()*360)+'deg) saturate(8) brightness(1.5)'},
            {transform: 'translateX(0) skewX(0)', filter: 'saturate(0) brightness(3)'},
            {transform: origTransform, filter: origFilter},
        ];
        var si = 0;
        function nextSlice() {
            if (si >= slices.length) {
                contentEl.style.transform = origTransform;
                contentEl.style.filter = origFilter;
                if (c1.parentNode) c1.parentNode.removeChild(c1);
                if (c2.parentNode) c2.parentNode.removeChild(c2);
                setTimeout(doSliceGlitch, Math.random() * 6000 + 4000);
                return;
            }
            contentEl.style.transform = slices[si].transform;
            contentEl.style.filter = slices[si].filter;
            si++;
            setTimeout(nextSlice, Math.random() * 80 + 40);
        }
        nextSlice();
    }
    setTimeout(doSliceGlitch, 2000);

    var glitchChars = '▓░▒█▄▀■□▪▫◆◇○●◉⚠⚡✕✗';
    var titleEl = document.getElementById('firstHeading');
    if (titleEl) {
        var origTitle = titleEl.textContent;
        setInterval(function () {
            if (Math.random() < 0.3) {
                titleEl.textContent = origTitle.split('').map(function (c) {
                    return Math.random() < 0.35
                        ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
                        : c;
                }).join('');
                setTimeout(function () { titleEl.textContent = origTitle; }, 120);
            }
        }, 1500);
    }

    var glDots = [];
    var glTrailColors = ['#00ff41','#ff00ff','#00ffff'];
    document.addEventListener('mousemove', function (e) {
        var dot = document.createElement('div');
        var col = glTrailColors[Math.floor(Math.random() * glTrailColors.length)];
        dot.setAttribute('style',
            'position:fixed !important;width:4px !important;height:4px !important;' +
            'border-radius:50% !important;background:' + col + ' !important;pointer-events:none !important;' +
            'z-index:2147483641 !important;opacity:0.8;transition:opacity 0.5s;' +
            'top:' + e.clientY + 'px !important;left:' + e.clientX + 'px !important;' +
            'box-shadow:0 0 4px ' + col + ' !important;'
        );
        document.body.appendChild(dot);
        glDots.push(dot);
        setTimeout(function () {
            dot.style.setProperty('opacity', '0', 'important');
            setTimeout(function () { if (dot.parentNode) dot.parentNode.removeChild(dot); }, 500);
        }, 80);
        if (glDots.length > 40) { var old = glDots.shift(); if (old.parentNode) old.parentNode.removeChild(old); }
    });

})();

/* ============================================================
   FANART GALLERY PAGE
   ============================================================ */
(function () {
    if (mw.config.get('wgPageName') !== 'Fanart_Gallery') return;

    var style = document.createElement('style');
    style.textContent = [
        '#fg-brush{position:fixed !important;width:70px !important;z-index:2147483647 !important;' +
        'pointer-events:none !important;transition:left 1.8s ease,top 1.8s ease,transform 1.8s ease !important;' +
        'filter:drop-shadow(0 0 6px rgba(255,51,102,0.7)) !important;}',

        '.fg-splat{position:fixed !important;pointer-events:none !important;z-index:2147483646 !important;' +
        'opacity:0;transform:scale(0.3) rotate(0deg);' +
        'animation:fgSplatIn 0.5s ease-out forwards;}',
        '@keyframes fgSplatIn{0%{opacity:0;transform:scale(0.2) rotate(var(--r,0deg))}' +
        '60%{opacity:0.95;transform:scale(1.15) rotate(var(--r,0deg))}' +
        '100%{opacity:0.85;transform:scale(1) rotate(var(--r,0deg))}}',

        '#fg-title{animation:fgGlow 3s ease-in-out infinite}',
        '@keyframes fgGlow{0%,100%{text-shadow:0 0 12px #ff3366,0 0 24px #aa0033}' +
        '50%{text-shadow:0 0 25px #ff5588,0 0 45px #ff0044}}',

        '.fg-drip{position:fixed !important;width:6px !important;border-radius:0 0 4px 4px !important;' +
        'pointer-events:none !important;z-index:2147483645 !important;' +
        'animation:fgDrip 2.5s ease-in forwards;}',
        '@keyframes fgDrip{0%{height:0;opacity:0.9}100%{height:120px;opacity:0}}'
    ].join('');
    document.head.appendChild(style);

    var title = document.getElementById('firstHeading');
    if (title) title.setAttribute('id', 'fg-title');

    var brush = document.createElement('img');
    brush.id = 'fg-brush';
    brush.src = 'https://static.wikia.nocookie.net/bilson/images/Brush.png';
    document.body.appendChild(brush);

    var splatColors = ['#ff3366','#ff0044','#cc0033','#ff6699','#990022'];

    function randomPos() {
        return {
            x: Math.random() * (window.innerWidth - 70),
            y: Math.random() * (window.innerHeight - 70)
        };
    }

    function spawnSplat(x, y) {
        var splat = document.createElement('img');
        splat.className = 'fg-splat';
        splat.src = 'https://static.wikia.nocookie.net/bilson/images/Paint.png';
        var size = Math.random() * 50 + 50;
        var rot = Math.floor(Math.random() * 360);
        splat.style.width = size + 'px';
        splat.style.left = (x + 35 - size/2) + 'px';
        splat.style.top = (y + 35 - size/2) + 'px';
        splat.style.setProperty('--r', rot + 'deg');
        splat.style.filter = 'drop-shadow(0 0 8px ' + splatColors[Math.floor(Math.random()*splatColors.length)] + ')';
        document.body.appendChild(splat);

        if (Math.random() < 0.5) {
            var drip = document.createElement('div');
            drip.className = 'fg-drip';
            drip.style.left = (x + 35 + (Math.random()*20-10)) + 'px';
            drip.style.top = (y + 60) + 'px';
            drip.style.background = splatColors[Math.floor(Math.random()*splatColors.length)];
            document.body.appendChild(drip);
            setTimeout(function () { if (drip.parentNode) drip.parentNode.removeChild(drip); }, 2600);
        }

        setTimeout(function () {
            splat.style.transition = 'opacity 1.5s';
            splat.style.opacity = '0';
            setTimeout(function () { if (splat.parentNode) splat.parentNode.removeChild(splat); }, 1500);
        }, 6000);
    }

    function moveBrush() {
        var pos = randomPos();
        var rot = Math.floor(Math.random() * 40 - 20);
        brush.style.left = pos.x + 'px';
        brush.style.top = pos.y + 'px';
        brush.style.transform = 'rotate(' + rot + 'deg)';

        setTimeout(function () {
            spawnSplat(pos.x, pos.y);
            moveBrush();
        }, 1800);
    }

    var start = randomPos();
    brush.style.left = start.x + 'px';
    brush.style.top = start.y + 'px';
    setTimeout(moveBrush, 600);
})();
// Subtle flicker effect on the main title, like a glitching signal
document.addEventListener('DOMContentLoaded', function () {
    var title = document.querySelector('.bilson-title');
    if (!title) return;

    setInterval(function () {
        var glow = 8 + Math.random() * 12;
        var glow2 = 18 + Math.random() * 20;
        title.style.textShadow =
            '0 0 ' + glow + 'px #6a4a9c, 0 0 ' + glow2 + 'px #6a4a9c, 0 0 30px rgba(106,74,156,0.4)';
    }, 250);
});