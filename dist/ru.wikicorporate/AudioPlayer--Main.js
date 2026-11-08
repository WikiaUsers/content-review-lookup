/* Кастомный аудиоплеер Вики с эквалайзером и голосовыми фильтрами Web Audio API (ES2024) */
(() => {
    'use strict';
    if (window.FandomAudioPlayerMainLoaded) return;
    window.FandomAudioPlayerMainLoaded = true;

    const activePlayers = new Set();
    const urlCache = new Map();
    let sharedAudioCtx = null;

    const formatTime = (sec) => {
        if (!Number.isFinite(sec) || sec < 0) return '0:00';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${String(s).padStart(2, '0')}`;
    };

    const makeDistortionCurve = (amount = 22) => {
        const samples = 22050;
        const curve = new Float32Array(samples);
        const deg = Math.PI / 180;
        for (let i = 0; i < samples; ++i) {
            const x = (i * 2) / samples - 1;
            curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
        }
        return curve;
    };

    // Поиск прямой ссылки на аудиофайл через API, если в DOM нет готового <audio src>
    const resolveFileUrl = async (fileName) => {
        if (urlCache.has(fileName)) return urlCache.get(fileName);
        try {
            const api = `${mw.config.get('wgScriptPath')}/api.php`;
            const params = new URLSearchParams({
                action: 'query',
                titles: `File:${fileName}`,
                prop: 'imageinfo',
                iiprop: 'url',
                format: 'json',
                formatversion: '2'
            });
            const res = await fetch(`${api}?${params.toString()}`);
            const data = await res.json();
            const url = data?.query?.pages?.[0]?.imageinfo?.[0]?.url || '';
            if (url) urlCache.set(fileName, url);
            return url;
        } catch {
            return '';
        }
    };

    const extractAudioSource = async (container) => {
        const audioEl = container.tagName === 'AUDIO' ? container : container.querySelector('audio');
        if (audioEl) {
            const src = audioEl.currentSrc || audioEl.src || audioEl.querySelector('source')?.src || '';
            if (src) return src;
        }
        const fileAttr = container.dataset?.file;
        if (fileAttr) return await resolveFileUrl(fileAttr);
        return '';
    };

    const buildPlayerUI = async (targetEl) => {
        if (targetEl.dataset.apMounted === 'true') return;
        targetEl.dataset.apMounted = 'true';

        const srcUrl = await extractAudioSource(targetEl);
        if (!srcUrl) return;

        const rawTitle = targetEl.dataset.title || '';
        const initialFx = targetEl.dataset.fx || '';
        const isInline = targetEl.classList.contains('t-audio--inline');

        const player = document.createElement('div');
        player.className = `t-audio-player${isInline ? ' is-inline' : ''}`;

        player.innerHTML = `
            <button type="button" class="t-ap__play" aria-label="Воспроизвести">
                <span class="t-ap__icon">▶</span>
            </button>
            <div class="t-ap__main">
                ${rawTitle ? `<div class="t-ap__title">${mw.html.escape(rawTitle)}</div>` : ''}
                <div class="t-ap__track" role="slider" tabindex="0">
                    <canvas class="t-ap__visualizer" height="24"></canvas>
                    <div class="t-ap__progress"></div>
                </div>
            </div>
            <div class="t-ap__meta">
                <span class="t-ap__time">0:00</span>
                <button type="button" class="t-ap__fx${initialFx ? ' is-active' : ''}" title="Голосовой фильтр (Радио 1930-х)">📻</button>
            </div>
        `;

        const audio = new Audio();
        audio.preload = 'metadata';
        audio.crossOrigin = 'anonymous';
        audio.src = srcUrl;

        const playBtn = player.querySelector('.t-ap__play');
        const iconSpan = player.querySelector('.t-ap__icon');
        const trackEl = player.querySelector('.t-ap__track');
        const progressEl = player.querySelector('.t-ap__progress');
        const timeEl = player.querySelector('.t-ap__time');
        const fxBtn = player.querySelector('.t-ap__fx');
        const canvas = player.querySelector('.t-ap__visualizer');
        const ctx2d = canvas.getContext('2d');

        let isRadioFx = Boolean(initialFx === 'radio' || initialFx === 'радио');
        let graphReady = false;
        let sourceNode = null;
        let dryGain = null;
        let wetGain = null;
        let analyser = null;
        let freqData = null;
        let rafId = null;

        const syncFxRouting = () => {
            if (!dryGain || !wetGain) return;
            dryGain.gain.value = isRadioFx ? 0 : 1;
            wetGain.gain.value = isRadioFx ? 1.35 : 0;
        };

        const initWebAudio = () => {
            if (graphReady) return;
            graphReady = true;
            try {
                if (!sharedAudioCtx) {
                    const AudioCtx = window.AudioContext || window.webkitAudioContext;
                    sharedAudioCtx = new AudioCtx();
                }
                sourceNode = sharedAudioCtx.createMediaElementSource(audio);
                analyser = sharedAudioCtx.createAnalyser();
                analyser.fftSize = 64;
                freqData = new Uint8Array(analyser.frequencyBinCount);

                // Чистый канал (Dry)
                dryGain = sharedAudioCtx.createGain();

                // Радио-канал (Wet: срез частот 450-2600 Гц + тёплый перегруз)
                wetGain = sharedAudioCtx.createGain();
                const bandpass = sharedAudioCtx.createBiquadFilter();
                bandpass.type = 'bandpass';
                bandpass.frequency.value = 1250;
                bandpass.Q.value = 1.35;

                const shaper = sharedAudioCtx.createWaveShaper();
                shaper.curve = makeDistortionCurve(20);
                shaper.oversample = '2x';

                sourceNode.connect(dryGain);
                dryGain.connect(analyser);

                sourceNode.connect(bandpass);
                bandpass.connect(shaper);
                shaper.connect(wetGain);
                wetGain.connect(analyser);

                analyser.connect(sharedAudioCtx.destination);
                syncFxRouting();
            } catch {
                // Если браузер заблокировал CORS для аудиопотока, звук продолжит играть напрямую
            }
        };

        // Если сервер статики вернул ошибку на crossOrigin="anonymous", перезагружаем поток без CORS
        audio.addEventListener('error', () => {
            if (audio.crossOrigin) {
                audio.removeAttribute('crossorigin');
                audio.src = srcUrl;
            }
        }, { once: true });

        const drawVisualizer = () => {
            if (audio.paused) return;
            const w = canvas.width = trackEl.clientWidth || 160;
            const h = canvas.height = 24;
            ctx2d.clearRect(0, 0, w, h);

            if (analyser && freqData) {
                analyser.getByteFrequencyData(freqData);
                const st = getComputedStyle(player);
                ctx2d.fillStyle = st.getPropertyValue('--s').trim() || '#dac04d';
                const bars = 24;
                const step = w / bars;
                for (let i = 0; i < bars; i++) {
                    const val = freqData[i] / 255;
                    const bh = Math.max(2, val * (h - 4));
                    ctx2d.globalAlpha = 0.25 + val * 0.55;
                    ctx2d.fillRect(i * step + 1, (h - bh) / 2, step - 2, bh);
                }
            }
            rafId = requestAnimationFrame(drawVisualizer);
        };

        audio.addEventListener('loadedmetadata', () => {
            timeEl.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('timeupdate', () => {
            const dur = audio.duration || 0;
            const cur = audio.currentTime || 0;
            const pct = dur > 0 ? (cur / dur) * 100 : 0;
            progressEl.style.width = `${pct.toFixed(1)}%`;
            timeEl.textContent = `${formatTime(cur)} / ${formatTime(dur)}`;
        });

        audio.addEventListener('play', () => {
            // Останавливаем все остальные плееры на странице
            for (const other of activePlayers) {
                if (other !== audio && !other.paused) other.pause();
            }
            initWebAudio();
            if (sharedAudioCtx?.state === 'suspended') sharedAudioCtx.resume();
            player.classList.add('is-playing');
            iconSpan.textContent = '⏸';
            drawVisualizer();
        });

        const onStop = () => {
            player.classList.remove('is-playing');
            iconSpan.textContent = '▶';
            if (rafId) cancelAnimationFrame(rafId);
        };

        audio.addEventListener('pause', onStop);
        audio.addEventListener('ended', () => {
            onStop();
            progressEl.style.width = '0%';
        });

        playBtn.addEventListener('click', () => {
            if (audio.paused) audio.play();
            else audio.pause();
        });

        trackEl.addEventListener('click', (e) => {
            if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
            const r = trackEl.getBoundingClientRect();
            const ratio = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
            audio.currentTime = ratio * audio.duration;
        });

        fxBtn.addEventListener('click', () => {
            isRadioFx = !isRadioFx;
            fxBtn.classList.toggle('is-active', isRadioFx);
            syncFxRouting();
        });

        activePlayers.add(audio);
        targetEl.replaceWith(player);
    };

    const scanAndMount = () => {
        // 1. Кастомные контейнеры {{Аудио}} (.t-audio)
        document.querySelectorAll('.t-audio:not([data-ap-mounted="true"])').forEach(buildPlayerUI);

        // 2. Стандартные системные аудиоплееры MediaWiki / Fandom в статьях и инфобоксах
        document.querySelectorAll('.mediaContainer, .mw-tmh-player').forEach(wrap => {
            if (wrap.querySelector('audio') && !wrap.querySelector('video') && !wrap.closest('.t-audio')) {
                buildPlayerUI(wrap);
            }
        });
    };

    scanAndMount();
    new MutationObserver((mutations) => {
        if (mutations.some(m => m.addedNodes.length > 0)) scanAndMount();
    }).observe(document.body, { childList: true, subtree: true });
})();