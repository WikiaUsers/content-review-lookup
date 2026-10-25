/* Halloween Effects */
$(function () {
    const ASSETS = {
        raven: {
            leftToRight: ['/wiki/Special:FilePath/HE_Raven1.png', '/wiki/Special:FilePath/HE_Raven2.png'],
            rightToLeft: ['/wiki/Special:FilePath/HE_Raven1_Mirror.png', '/wiki/Special:FilePath/HE_Raven2_Mirror.png']
        },
        bat: {
            leftToRight: ['/wiki/Special:FilePath/HE_Bat1.png', '/wiki/Special:FilePath/HE_Bat2.png'],
            rightToLeft: ['/wiki/Special:FilePath/HE_Bat1_Mirror.png', '/wiki/Special:FilePath/HE_Bat2_Mirror.png']
        },
        pumpkin: '/wiki/Special:FilePath/HE_Pumpkin.png',
        ghost: '/wiki/Special:FilePath/HE_Ghost.png',
        webs: {
            topLeft: '/wiki/Special:FilePath/HE_Web_TL.png',
            topRight: '/wiki/Special:FilePath/HE_Web_TR.png',
            bottomLeft: '/wiki/Special:FilePath/HE_Web_BL.png',
            bottomRight: '/wiki/Special:FilePath/HE_Web_BR.png',
            center: '/wiki/Special:FilePath/HE_Web_C.png'
        }
    };
    const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');
    let settings = { enabled: true, frequency: 3, raven: true, pumpkin: true, bat: true, ghost: true, webs: true };
    const WEB_TYPES = Object.keys(ASSETS.webs);
    // Each job stores its spawn function and the minimum/maximum delay between spawns.
    const JOBS = {
        raven: [spawnRaven, 1500, 6000], pumpkin: [spawnPumpkin, 30000, 50000],
        bat: [spawnBat, 1800, 5000], ghost: [spawnGhost, 18000, 36000], webs: [spawnRandomWeb, 2500, 6500]
    };
    const timers = new Map();
    const pumpkinFrames = new Set();
    let effectsLayer = null;
    const randomBetween = (min, max) => min + Math.random() * (max - min);
    // Add an effect element to the shared layer, optionally assigning its image.
    function addElement(className, image) {
        if (!effectsLayer) return null;
        const element = document.createElement('div');
        element.className = className;
        if (image) element.style.backgroundImage = `url("${image}")`;
        effectsLayer.appendChild(element);
        return element;
    }
    const removeOnAnimationEnd = (element) => element && element.addEventListener('animationend', () => element.remove(), { once: true });
    // Configure a flying effect ; CSS handles its animation after these values are set.
    function createFlyer(type, top, duration, direction, size) {
        const flyer = addElement(`halloween-flyer halloween-${type}`);
        if (!flyer) return;
        flyer.style.top = `${top}%`;
        flyer.style.setProperty('--flight-duration', `${duration}s`);
        flyer.style.setProperty('--travel-x', direction === 'leftToRight' ? '145vw' : '-145vw');
        if (direction === 'rightToLeft') flyer.classList.add('halloween-flyer--right-to-left');
        if (size) Object.assign(flyer.style, { width: `${size.width}px`, height: `${size.height}px` });
        if (type === 'raven' || type === 'bat') {
            const [frame1, frame2] = ASSETS[type][direction];
            flyer.style.setProperty('--frame-1', `url("${frame1}")`);
            flyer.style.setProperty('--frame-2', `url("${frame2}")`);
        } else flyer.style.backgroundImage = `url("${ASSETS[type]}")`;
        removeOnAnimationEnd(flyer);
    }
    function spawnRaven() {
        const width = randomBetween(105, 185);
        createFlyer('raven', randomBetween(5, 78), randomBetween(5, 9),
            Math.random() < 0.5 ? 'leftToRight' : 'rightToLeft', { width, height: width * 0.625 });
    }
    function spawnBat() {
        createFlyer('bat', randomBetween(4, 84), randomBetween(0.8, 1.8),
            Math.random() < 0.5 ? 'leftToRight' : 'rightToLeft');
    }
    // Move the pumpkin with requestAnimationFrame, bounce it three times, then let it leave the screen.
    function spawnPumpkin() {
        const pumpkin = addElement('halloween-flyer halloween-pumpkin', ASSETS.pumpkin);
        if (!pumpkin) return;
        const width = pumpkin.offsetWidth;
        const height = pumpkin.offsetHeight;
        let x = randomBetween(0, Math.max(0, innerWidth - width));
        let y = randomBetween(0, Math.max(0, innerHeight - height));
        const angle = randomBetween(0, Math.PI * 2);
        let vx = Math.cos(angle) * randomBetween(100, 150);
        let vy = Math.sin(angle) * randomBetween(100, 150);
        let hits = 0;
        let previousTime = 0;
        let frameId;
        let exiting = false;
        const move = (time) => {
            pumpkinFrames.delete(frameId);
            if (!effectsLayer || !effectsLayer.contains(pumpkin)) return;
            const dt = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
            previousTime = time;
            x += vx * dt;
            y += vy * dt;
            const maxX = Math.max(0, innerWidth - width), maxY = Math.max(0, innerHeight - height);
            const hitLeft = x <= 0;
            const hitRight = x >= maxX;
            const hitTop = y <= 0;
            const hitBottom = y >= maxY;
            if (!exiting && (hitLeft || hitRight || hitTop || hitBottom)) {
                if (++hits >= 4) {
                    exiting = true;
                } else {
                    if (hitLeft || hitRight) { x = hitLeft ? 0 : maxX; vx *= -1; }
                    if (hitTop || hitBottom) { y = hitTop ? 0 : maxY; vy *= -1; }
                }
            }
            pumpkin.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            if (exiting && (x < -width || x > innerWidth || y < -height || y > innerHeight)) return pumpkin.remove();
            frameId = requestAnimationFrame(move);
            pumpkinFrames.add(frameId);
        };
        pumpkin.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        frameId = requestAnimationFrame(move);
        pumpkinFrames.add(frameId);
    }
    function spawnGhost() {
        const ghost = addElement('halloween-ghost', ASSETS.ghost);
        if (!ghost) return;
        ghost.style.left = `${randomBetween(5, 75)}%`;
        ghost.style.top = `${randomBetween(5, 55)}%`;
        removeOnAnimationEnd(ghost);
    }
    const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    // Place corner webs at the matching edge and try non-overlapping positions for the center web.
    function spawnWeb(type) {
        const web = addElement(`halloween-web halloween-web--${type}`, ASSETS.webs[type]);
        if (!web) return;
        if (type.startsWith('top')) web.style.top = '0';
        else if (type.startsWith('bottom')) web.style.bottom = '0';
        if (type.endsWith('Left')) web.style.left = '0';
        else if (type.endsWith('Right')) web.style.right = '0';
        else {
            const width = web.offsetWidth;
            const height = web.offsetHeight;
            let placed = false;
            for (let attempt = 0; attempt < 30; attempt++) {
                web.style.left = `${randomBetween(innerWidth * 0.2, Math.max(innerWidth * 0.2, innerWidth * 0.8 - width))}px`;
                web.style.top = `${randomBetween(innerHeight * 0.2, Math.max(innerHeight * 0.2, innerHeight * 0.8 - height))}px`;
                const rect = web.getBoundingClientRect();
                if (![...effectsLayer.querySelectorAll('.halloween-web')].some((other) =>
                    other !== web && overlaps(rect, other.getBoundingClientRect()))) {
                    placed = true;
                    break;
                }
            }
            if (!placed) return web.remove();
        }
        removeOnAnimationEnd(web);
    }
    function spawnRandomWeb() {
        spawnWeb(WEB_TYPES[Math.floor(Math.random() * WEB_TYPES.length)]);
    }
    const scaleDelay = () => [2.2, 1.6, 1, 0.75, 0.55][settings.frequency - 1];
    const clearTimer = (name) => { window.clearTimeout(timers.get(name)); timers.delete(name); };
    // Run one effect after a random, frequency-adjusted delay, then schedule it again.
    function schedule(name) {
        clearTimer(name);
        const [callback, min, max] = JOBS[name];
        if (!effectsLayer || !settings.enabled || !settings[name]) return;
        timers.set(name, window.setTimeout(() => {
            timers.delete(name);
            if (!document.hidden) callback();
            schedule(name);
        }, randomBetween(min, max) * scaleDelay()));
    }
    function syncFog() {
        const fog = effectsLayer ? effectsLayer.querySelector('.halloween-fog') : null;
        if (settings.webs && !fog) addElement('halloween-fog');
        else if (!settings.webs && fog) fog.remove();
    }

    function clearEffect(name) {
        if (effectsLayer) {
            effectsLayer.querySelectorAll(`.halloween-${name === 'webs' ? 'web' : name}`).forEach((element) => element.remove());
        }
        if (name === 'pumpkin') {
            pumpkinFrames.forEach(cancelAnimationFrame);
            pumpkinFrames.clear();
        }
    }
    // Stop every timer and animation frame before removing the shared effect layer.
    function stopEffects() {
        timers.forEach((timer) => clearTimeout(timer));
        timers.clear();
        pumpkinFrames.forEach(cancelAnimationFrame);
        pumpkinFrames.clear();
        if (effectsLayer) effectsLayer.remove();
        effectsLayer = null;
    }
    function startEffects() {
        if (effectsLayer || !settings.enabled || REDUCED_MOTION.matches) return;
        effectsLayer = document.createElement('div');
        effectsLayer.id = 'halloween-effects';
        document.body.appendChild(effectsLayer);
        syncFog();
        if (settings.pumpkin) spawnPumpkin();
        Object.keys(JOBS).forEach((name) => schedule(name));
    }
    // Only show animations while the Halloween theme is active and motion is allowed.
    const syncEffects = () => document.body.classList.contains('theme-halloween') && settings.enabled && !REDUCED_MOTION.matches ? startEffects() : stopEffects();
    // Apply changes from the settings panel without restarting unrelated effects.
    function updateSettings(next, changed) {
        settings = next;
        if (changed === 'initial' || changed === 'enabled') return syncEffects();
        if (changed === 'frequency') {
            Object.keys(JOBS).forEach((name) => schedule(name));
            return;
        }
        if (changed === 'webs') syncFog();
        if (settings[changed]) {
            if (changed !== 'webs' && JOBS[changed]) JOBS[changed][0]();
            schedule(changed);
        } else {
            clearTimer(changed);
            clearEffect(changed);
        }
    }
    // Wait for the shared controls script, regardless of which script loads first.
    function initialize() {
        const connectControls = () => {
            if (!window.ThemeEffectsControls) {
                window.addEventListener('theme-effects-controls-ready', connectControls, { once: true });
                return;
            }
            window.ThemeEffectsControls.create({
                key: 'ao-wiki-halloween-effects',
                title: 'Halloween',
                themeClass: 'theme-halloween',
                effects: [
                    { id: 'raven', label: 'Ravens' },
                    { id: 'pumpkin', label: 'Pumpkins' },
                    { id: 'bat', label: 'Bats' },
                    { id: 'ghost', label: 'Ghosts' },
                    { id: 'webs', label: 'Webs and fog' }
                ],
                onChange: updateSettings
            });
            new MutationObserver(syncEffects).observe(document.body, {
                attributes: true,
                attributeFilter: ['class']
            });
            REDUCED_MOTION.addEventListener('change', syncEffects);
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden && effectsLayer && settings.raven) {
                    spawnRaven();
                }
            });
        };
        connectControls();
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize, { once: true });
    } else {
        initialize();
    }
});