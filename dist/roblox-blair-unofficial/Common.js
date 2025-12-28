/* MATCH ASSISTANT — FULLY CONNECTED VERSION */
$(document).ready(function () {

    /* =======================
       1. AUDIO
    ======================= */
    window.maAudioCtx = null;
    window.playBeep = function (freq, duration, pulses = 1, vol = 0.1) {
        if (!window.maAudioCtx)
            window.maAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (window.maAudioCtx.state === 'suspended')
            window.maAudioCtx.resume();

        for (let i = 0; i < pulses; i++) {
            setTimeout(() => {
                const osc = window.maAudioCtx.createOscillator();
                const gain = window.maAudioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.value = freq;
                gain.gain.value = vol;
                gain.gain.exponentialRampToValueAtTime(
                    0.0001,
                    window.maAudioCtx.currentTime + duration
                );
                osc.connect(gain);
                gain.connect(window.maAudioCtx.destination);
                osc.start();
                osc.stop(window.maAudioCtx.currentTime + duration);
            }, i * 110);
        }
    };

    /* =======================
       2. ITEMS DATA
    ======================= */
    const itemData = [
        { name: "Crucifix", img: "https://static.wikia.nocookie.net/blair-roblox/images/6/66/CrucifixNew_transparent.png" },
        { name: "Trail Camera", img: "https://static.wikia.nocookie.net/blair-roblox/images/2/24/TrailCameraTransparent.png" },
        { name: "Parabolic Mic", img: "https://static.wikia.nocookie.net/blair-roblox/images/e/e2/ParabolicMicrophone.png" },
        { name: "Glowstick", img: "https://static.wikia.nocookie.net/blair-roblox/images/2/20/GlowstickDesign2.png" },
        { name: "Sanity Soda", img: "https://static.wikia.nocookie.net/blair-roblox/images/7/70/SanitySoda.png" },
        { name: "Incense Burner", img: "https://static.wikia.nocookie.net/blair-roblox/images/7/7c/IncenseBurner.png" }
    ];

    /* =======================
       3. MODAL SKELETON
    ======================= */
    function injectModal() {
        if ($('#ma-modal-overlay').length) return;

        $('body').append(`
            <div id="ma-modal-overlay">
                <div id="ma-modal-content">
                    <div style="text-align:right;">
                        <span id="ma-close-btn" style="color:#f44; cursor:pointer;">[ DISCONNECT ]</span>
                    </div>

                    <h2 style="color:#0cf; letter-spacing:2px;">MATCH_ASSISTANT</h2>

                    <div id="ma-scroll-frame">
                        <div id="ma-module-settings"></div>
                        <div id="ma-module-challenges"></div>
                        <div id="map-area-wrapper"></div>

                        <div id="ma-module-items">
                            <p>> 4. LOADOUT_EXTRAS</p>
                            <div style="display:flex; justify-content:flex-end; gap:10px;">
                                <span id="items-all-btn">All</span>
                                <span id="items-reset-btn">Reset</span>
                            </div>
                            <div class="item-grid" id="items-main-grid"></div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        /* Items grid */
        itemData.forEach(i => {
            $('#items-main-grid').append(`
                <div class="item-card" data-item="${i.name}">
                    <img class="item-icon" src="${i.img}">
                    <span class="item-label">${i.name}</span>
                </div>
            `);
        });

        buildSettingsAndChallenges();
        buildMapHTML();
        initMapSystem();
    }

    /* =======================
       4. SETTINGS + CHALLENGES
    ======================= */
    function buildSettingsAndChallenges() {
        const difficulties = [
            { name: "Easy", color: "#90EE90" },
            { name: "Medium", color: "#FFD580" },
            { name: "Hard", color: "#FF7F7F" },
            { name: "Nightmare", color: "#CBC3E3" }
        ];
        let diffIndex = 0;

        $('#ma-module-settings').html(`
            <p>> 1. MATCH_SETTINGS</p>
            <div style="display:grid; grid-template-columns:1fr 2fr; gap:10px;">
                <input id="player-count-input" type="number" min="1" max="4" value="1">
                <div>
                    <span id="diff-prev">&lt;</span>
                    <span id="diff-display" style="color:${difficulties[0].color}">
                        ${difficulties[0].name}
                    </span>
                    <span id="diff-next">&gt;</span>
                </div>
            </div>
        `);

        $('#ma-module-challenges').html(`
            <p>> 2. CHALLENGES</p>
            <div class="cha-grid">
                <div class="cha-box">-2 Evidences</div>
                <div class="cha-box">-1 Evidence</div>
                <div class="cha-box">No Grace Period</div>
                <div class="cha-box">No Sanity</div>
                <div class="cha-box">No Crucifixes</div>
                <div class="cha-box">No Lights</div>
                <div class="cha-box">No Hiding Spots</div>
                <div class="cha-box">Slow Players</div>
            </div>
        `);

        function updateDiff() {
            $('#diff-display')
                .text(difficulties[diffIndex].name)
                .css('color', difficulties[diffIndex].color);
        }

        $(document).on('click', '#diff-next', () => {
            diffIndex = (diffIndex + 1) % difficulties.length;
            updateDiff();
            playBeep(440, 0.1);
        });

        $(document).on('click', '#diff-prev', () => {
            diffIndex = (diffIndex - 1 + difficulties.length) % difficulties.length;
            updateDiff();
            playBeep(400, 0.1);
        });
    }

    /* =======================
       5. MAP SYSTEM
    ======================= */
    const maps = [
        { name: "Frostwood Cabin", rooms: 11, size: "Small" },
        { name: "School", rooms: 24, size: "Large" },
        { name: "Orphanage", rooms: 25, size: "Large" },
        { name: "Random", rooms: "?", size: "Any" }
    ];

    function buildMapHTML() {
        $('#map-area-wrapper').html(`
            <p>> 3. MAP_SELECTION</p>
            <input id="map-search-input" placeholder="Type map name...">
            <div id="map-suggestions"></div>
        `);
    }

    function initMapSystem() {
        $(document).on('input', '#map-search-input', function () {
            const val = $(this).val().toLowerCase();
            const results = maps.filter(m => m.name.toLowerCase().includes(val));
            $('#map-suggestions').html(
                results.map(m =>
                    `<div class="map-option" data-map="${m.name}">${m.name}</div>`
                ).join('')
            );
        });

        $(document).on('click', '.map-option', function () {
            $('#map-search-input').val($(this).data('map'));
            $('#map-suggestions').empty();
            playBeep(1200, 0.15);
        });
    }

    /* =======================
       6. ITEMS LOGIC
    ======================= */
    $(document).on('click', '.item-card', function () {
        $(this).toggleClass('cha-active');
        playBeep(880, 0.05);
    });

    $(document).on('click', '#items-all-btn', function () {
        const any = $('.item-card').hasClass('cha-active');
        $('.item-card').toggleClass('cha-active', !any);
        playBeep(659, 0.1);
    });

    $(document).on('click', '#items-reset-btn', function () {
        $('.item-card').removeClass('cha-active');
        playBeep(220, 0.2);
    });

    /* =======================
       7. OPEN / CLOSE
    ======================= */
    $(document).on('click', '#start-match-btn', function () {
        injectModal();
        $('#ma-modal-overlay').css('display', 'flex').hide().fadeIn(200);
        playBeep(700, 0.15, 2);
    });

    $(document).on('click', '#ma-close-btn', function () {
        $('#ma-modal-overlay').fadeOut(200);
    });

});