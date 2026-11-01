/* Основной движок декларативных @-механик Вики (ES2024+) */
(async () => {
    'use strict';
    if (window.WikiMechanicsMainLoaded) return;
    window.WikiMechanicsMainLoaded = true;

    const RULES_PAGE = 'MediaWiki:Custom-Mechanics';
    const CENTRAL_API = 'https://wikicorporate.fandom.com/ru/index.php';
    const CACHE_KEY = `wiki_mechanics_rules_${mw.config.get('wgCityId') ?? 'global'}`;

    let audioCtx = null;

    const parseDirectives = (rawText = '') => {
        const rules = [];
        const clean = rawText.replace(/\/\*[\s\S]*?\*\//g, '');
        const regex = /@([a-zA-Z0-9_-]+)\s+([^{]+)\{([^}]*)\}/g;

        for (const match of clean.matchAll(regex)) {
            const name = match[1].trim().toLowerCase();
            const selector = match[2].trim();
            const props = {};

            for (const part of match[3].split(';')) {
                const idx = part.indexOf(':');
                if (idx !== -1) {
                    const key = part.slice(0, idx).trim().toLowerCase();
                    const val = part.slice(idx + 1).trim();
                    if (key && val) props[key] = val;
                }
            }
            if (selector) rules.push({ name, selector, props });
        }
        return rules;
    };

    const resolveColor = (el, rawColor, fallback = '#dac04d') => {
        if (!rawColor) return fallback;
        const varMatch = rawColor.match(/var\(\s*(--[a-zA-Z0-9_-]+)/);
        if (varMatch) {
            return getComputedStyle(el).getPropertyValue(varMatch[1]).trim() || fallback;
        }
        return rawColor;
    };

    const playTone = (freq = 520, durationMs = 35, type = 'sine', volume = 0.04) => {
        try {
            if (!audioCtx) {
                const AudioClass = window.AudioContext ?? window.webkitAudioContext;
                if (!AudioClass) return;
                audioCtx = new AudioClass();
            }
            if (audioCtx.state === 'suspended') audioCtx.resume();

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            const now = audioCtx.currentTime;
            const durSec = durationMs / 1000;

            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + durSec);

            gain.gain.setValueAtTime(volume, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + durSec);

            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + durSec);
        } catch {}
    };

    const boundRegistry = new Map();
    const isBound = (mechanicName, el) => {
        let set = boundRegistry.get(mechanicName);
        if (!set) {
            set = new WeakSet();
            boundRegistry.set(mechanicName, set);
        }
        if (set.has(el)) return true;
        set.add(el);
        return false;
    };

    const HANDLERS = {
        'spring-hover'(el, props) {
            if (isBound('spring-hover', el)) return;

            const scale = parseFloat(props.scale) || 1.05;
            const lift = props.lift ?? '-3px';
            const duration = parseInt(props.duration, 10) || 420;
            const bounce = parseFloat(props.bounce) || 1.45;
            const easing = `cubic-bezier(0.34, ${bounce}, 0.64, 1)`;

            el.addEventListener('pointerenter', () => {
                el.animate([
                    { transform: 'translateY(0) scale(1)' },
                    { transform: `translateY(${lift}) scale(${scale})` }
                ], { duration, easing, fill: 'forwards' });
            }, { passive: true });

            el.addEventListener('pointerleave', () => {
                el.animate([
                    { transform: `translateY(${lift}) scale(${scale})` },
                    { transform: 'translateY(0) scale(1)' }
                ], { duration: Math.round(duration * 0.75), easing: 'ease-out', fill: 'forwards' });
            }, { passive: true });
        },

        '3d-card'(el, props) {
            if (isBound('3d-card', el)) return;

            const maxAngle = parseFloat(props['max-angle']) || 10;
            const perspective = props.perspective ?? '900px';
            const glare = props.glare ?? 'color-mix(in srgb, var(--s) 22%, transparent)';

            el.style.transition = 'transform 0.2s ease-out';
            el.style.willChange = 'transform';

            el.addEventListener('pointermove', (e) => {
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                const rx = ((0.5 - py) * maxAngle * 2).toFixed(2);
                const ry = ((px - 0.5) * maxAngle * 2).toFixed(2);

                el.style.transform = `perspective(${perspective}) rotateX(${rx}deg) rotateY(${ry}deg)`;
                if (props.glare !== 'none') {
                    el.style.backgroundImage = `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, ${glare}, transparent 70%)`;
                }
            }, { passive: true });

            el.addEventListener('pointerleave', () => {
                el.style.transform = `perspective(${perspective}) rotateX(0deg) rotateY(0deg)`;
                if (props.glare !== 'none') el.style.backgroundImage = '';
            }, { passive: true });
        },

        magnetic(el, props) {
            if (isBound('magnetic', el)) return;

            const strength = parseFloat(props.strength) || 0.3;
            const duration = props.duration ?? '250ms';
            el.style.transition = `transform ${duration} ease-out`;

            el.addEventListener('pointermove', (e) => {
                const r = el.getBoundingClientRect();
                const dx = (e.clientX - (r.left + r.width / 2)) * strength;
                const dy = (e.clientY - (r.top + r.height / 2)) * strength;
                el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
            }, { passive: true });

            el.addEventListener('pointerleave', () => {
                el.style.transform = 'translate3d(0, 0, 0)';
            }, { passive: true });
        },

        spotlight(el, props) {
            if (isBound('spotlight', el)) return;

            const size = props.size ?? '180px';
            const color = props.color ?? 'color-mix(in srgb, var(--s) 20%, transparent)';

            el.addEventListener('pointermove', (e) => {
                const r = el.getBoundingClientRect();
                const x = (e.clientX - r.left).toFixed(0);
                const y = (e.clientY - r.top).toFixed(0);
                el.style.backgroundImage = `radial-gradient(${size} circle at ${x}px ${y}px, ${color}, transparent 100%)`;
            }, { passive: true });

            el.addEventListener('pointerleave', () => {
                el.style.backgroundImage = '';
            }, { passive: true });
        },

        decrypt(el, props) {
            if (isBound('decrypt', el)) return;

            const originalText = el.textContent.trim();
            if (!originalText) return;

            const chars = (props.charset ?? '▓▒░█01X#%&?@*').replace(/^["']|["']$/g, '');
            const speed = parseInt(props.speed, 10) || 28;
            const trigger = props.trigger ?? 'view';
            let timer = null;

            const run = () => {
                if (timer) clearInterval(timer);
                let step = 0;
                const len = originalText.length;
                timer = setInterval(() => {
                    el.textContent = originalText
                        .split('')
                        .map((ch, idx) => (ch === ' ' || idx < step ? ch : chars[Math.floor(Math.random() * chars.length)]))
                        .join('');
                    step += Math.max(0.5, len / 24);
                    if (step >= len) {
                        clearInterval(timer);
                        el.textContent = originalText;
                    }
                }, speed);
            };

            if (trigger === 'hover') {
                el.addEventListener('pointerenter', run, { passive: true });
            } else {
                const obs = new IntersectionObserver(([entry]) => {
                    if (entry?.isIntersecting) {
                        run();
                        obs.disconnect();
                    }
                }, { threshold: 0.35 });
                obs.observe(el);
            }
        },

        sfx(el, props) {
            if (isBound('sfx', el)) return;

            const hoverFreq = parseFloat(props['hover-freq']) || 0;
            const clickFreq = parseFloat(props['click-freq']) || 560;
            const dur = parseInt(props.duration, 10) || 35;
            const wave = props.waveform ?? 'sine';
            const vol = parseFloat(props.volume) || 0.035;

            if (hoverFreq > 0) {
                el.addEventListener('pointerenter', () => playTone(hoverFreq, dur, wave, vol * 0.7), { passive: true });
            }
            if (clickFreq > 0) {
                el.addEventListener('click', () => playTone(clickFreq, dur * 1.3, wave, vol), { passive: true });
            }
        },

        particles(el, props) {
            if (isBound('particles', el)) return;

            const count = Math.min(100, parseInt(props.count, 10) || 30);
            const speed = parseFloat(props.speed) || 0.8;
            const preset = props.preset ?? 'embers';

            if (getComputedStyle(el).position === 'static') {
                el.style.position = 'relative';
            }

            const canvas = document.createElement('canvas');
            canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;border-radius:inherit;';
            el.prepend(canvas);

            const ctx = canvas.getContext('2d');
            let w = 0, h = 0, visible = false;

            const resize = () => {
                w = canvas.width = el.clientWidth || 300;
                h = canvas.height = el.clientHeight || 150;
            };
            resize();

            const items = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 2.2 + 0.8,
                vx: (Math.random() - 0.5) * 0.5 * speed,
                vy: (preset === 'snow' ? 1 : -1) * (Math.random() * 0.7 + 0.3) * speed,
                a: Math.random() * 0.7 + 0.2
            }));

            const draw = () => {
                if (!visible) return;
                ctx.clearRect(0, 0, w, h);
                ctx.fillStyle = resolveColor(el, props.color ?? 'var(--s)');

                for (const p of items) {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.y < -5) p.y = h + 5;
                    if (p.y > h + 5) p.y = -5;
                    if (p.x < -5) p.x = w + 5;
                    if (p.x > w + 5) p.x = -5;

                    ctx.globalAlpha = p.a;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fill();
                }
                requestAnimationFrame(draw);
            };

            new ResizeObserver(resize).observe(el);
            new IntersectionObserver(([entry]) => {
                const wasVisible = visible;
                visible = Boolean(entry?.isIntersecting);
                if (visible && !wasVisible) requestAnimationFrame(draw);
            }).observe(el);
        }
    };

    const getRulesText = async () => {
        if (typeof window.__wikiMechanicsRules === 'string') {
            return window.__wikiMechanicsRules;
        }
        try {
            const cached = sessionStorage.getItem(CACHE_KEY);
            if (cached !== null) return cached;
        } catch {}

        const urls = [`${CENTRAL_API}?title=${encodeURIComponent(RULES_PAGE)}&action=raw&ctype=text/plain`];
        const localServer = `${mw.config.get('wgServer')}${mw.config.get('wgScript')}`;
        if (!localServer.includes('wikicorporate.fandom.com')) {
            urls.push(`${localServer}?title=${encodeURIComponent(RULES_PAGE)}&action=raw&ctype=text/plain`);
        }

        const settled = await Promise.allSettled(
            urls.map(u => fetch(u).then(r => (r.ok ? r.text() : '')))
        );
        const combined = settled
            .map(r => (r.status === 'fulfilled' ? r.value : ''))
            .filter(Boolean)
            .join('\n');

        try { sessionStorage.setItem(CACHE_KEY, combined); } catch {}
        return combined;
    };

    const rawText = await getRulesText();
    const compiledRules = parseDirectives(rawText);

    const applyAll = (root = document) => {
        for (const { name, selector, props } of compiledRules) {
            const handler = HANDLERS[name];
            if (!handler) continue;
            try {
                root.querySelectorAll(selector).forEach(el => handler(el, props));
            } catch {}
        }
    };

    window.WikiMechanics = {
        apply(customText, root = document) {
            for (const { name, selector, props } of parseDirectives(customText)) {
                const handler = HANDLERS[name];
                if (handler) root.querySelectorAll(selector).forEach(el => handler(el, props));
            }
        },
        register(name, fn) {
            HANDLERS[name.toLowerCase()] = fn;
        }
    };

    if (compiledRules.length > 0) {
        applyAll(document);
        new MutationObserver((mutations) => {
            if (mutations.some(m => m.addedNodes.length > 0)) applyAll(document);
        }).observe(document.body, { childList: true, subtree: true });
    }
})();