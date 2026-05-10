(function() {
    "use strict";

    const CONFIG = {
        prime: {
			swipeSpeed: 10000,
			swipeGap: 3000,
            starSpawnRate: 1250,
            starLifespan: 2000,
            starRounds: 1.5
        },
        glitch: {
            intervalMin: 140,
            intervalMax: 280,
            jitterCount: 2,
            glitchChance: 0.70
        }
    };

    // Owner (contraband only)
    const owner = 'a[href$=":Mozzzzy" i]';

    // Staff (ONLY used to assign .is-prime)
    const staff = [
        'a[href$=":DrippedChonk" i]',
        'a[href$=":Curtis_2012_OP" i]',
        'a[href$=":Curtis%202012%20OP" i]',
        'a[href$=":YeetusMcCleetus1" i]',
        'a[href$=":Magmapro" i]',
        'a[href$=":LeeBi2000_TW" i]',
        'a[href$=":Edward1237" i]',
        'a[href$=":DumplingOnRIVALS" i]',
        'a[href$=":Daveyalt" i]',
        'a[href$=":MaxGOAT" i]',
        'a[href$=":NoPartyThisTime" i]'
    ];

    // ==================== PRIME SYSTEM ====================

    function initPrime() {
        document.querySelectorAll('.prime, .prime-bp, .is-prime').forEach(el => {
            if (el.dataset.primeReady) return;
            el.dataset.primeReady = 'true';

            el.setAttribute('data-text', el.textContent.trim());
            el.style.setProperty('--swipe-speed', `${CONFIG.prime.swipeSpeed}ms`);

            const triggerSwipe = () => {
                el.classList.remove('is-swiping');
                void el.offsetWidth;
                el.classList.add('is-swiping');
            };

            triggerSwipe();
            setInterval(triggerSwipe, CONFIG.prime.swipeSpeed + CONFIG.prime.swipeGap);

            setInterval(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'p-sparkle';
                sparkle.style.left = `${Math.random() * el.offsetWidth}px`;
                sparkle.style.top = `${Math.random() * el.offsetHeight}px`;

                const totalRot = CONFIG.prime.starRounds * 360;
                sparkle.style.setProperty('--total-rot', `${totalRot}deg`);
                sparkle.style.animation =
                    `star-slow-rotate ${CONFIG.prime.starLifespan}ms linear forwards`;

                el.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), CONFIG.prime.starLifespan);
            }, CONFIG.prime.starSpawnRate);
        });
    }

    // ==================== STAFF → .is-prime MARKER ====================

    function applyStaffPrime() {
        document.querySelectorAll(staff.join(',')).forEach(el => {
            el.classList.add('is-prime');
            el.setAttribute('data-text', el.textContent.trim());
        });
    }

    // ==================== CONTRABAND ====================

    function spawnGlitch(el) {
        if (Math.random() > CONFIG.glitch.glitchChance) return;

        const g = document.createElement('div');
        g.className = `contraband-glitch ${['black','blue','purple'][Math.floor(Math.random()*3)]}`;

        const w = 6 + Math.random() * 26;
        const h = 2 + Math.random() * 9;

        g.style.width = `${w}px`;
        g.style.height = `${h}px`;
        g.style.left = `${Math.random() * (el.offsetWidth - w + 4)}px`;
        g.style.top = `${Math.random() * (el.offsetHeight - h)}px`;

        el.appendChild(g);
        setTimeout(() => g.remove(), 150);
    }

    function jitterText(el) {
        for (let i = 0; i < CONFIG.glitch.jitterCount; i++) {
            setTimeout(() => {
                const x = (Math.random() * 7) - 3.5;
                const y = (Math.random() * 3.5) - 1.75;
                el.style.transform = `translate(${x}px, ${y}px)`;
                setTimeout(() => el.style.transform = 'translate(0,0)', 50);
            }, i * 55);
        }
    }

    function startGlitch(el) {
        if (el.dataset.glitchActive) return;
        el.dataset.glitchActive = 'true';

        if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
        el.style.overflow = 'visible';

        function loop() {
            spawnGlitch(el);
            jitterText(el);

            const delay =
                CONFIG.glitch.intervalMin +
                Math.random() * (CONFIG.glitch.intervalMax - CONFIG.glitch.intervalMin);

            setTimeout(loop, delay);
        }

        loop();
    }

    function initContraband() {
        document.querySelectorAll('.contraband, .contraband-bp, ' + owner)
            .forEach(startGlitch);
    }

    // ==================== INIT ====================

    function initializeAll() {
        applyStaffPrime();
        initPrime();
        initContraband();
    }

    if (typeof $ !== 'undefined') $(document).ready(initializeAll);
    else window.addEventListener('load', initializeAll);

    if (typeof mw !== 'undefined' && mw.hook)
        mw.hook('wikipage.content').add(initializeAll);

})();

mw.loader.load('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');