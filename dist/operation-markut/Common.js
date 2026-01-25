/**** Any JavaScript here will be loaded for all users on every page load. ****/

/* =================================================
AUTO-REFRESH
================================================= */
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:Watchlist',
    'Special:WikiActivity',
    'Special:Log',
    'Special:Contributions'
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
/* =================================================
USER TAGS
================================================= */
window.UserTagsJS = {
    modules: {},
    tags: {
        blocked: {
            u: 'Banned',
            order: 0
        },
        bureaucrat: {
            u: 'Bureaucrat',
            link: '4Classic Wiki:Staff',
            order: 1
        },
        sysop: {
            u: 'Administrator',
            link: '4Classic Wiki:Staff',
            order: 2
        },
        'content-moderator': {
            u: 'Content Moderator',
            link: '4Classic Wiki:Staff',
            order: 3
        },
        threadmoderator: {
            u: 'Forum Moderator',
            link: '4Classic Wiki:Staff',
            order: 4
        },
        chatmoderator: {
            u: 'Chat Moderator',
            link: '4Classic Wiki:Staff',
            order: 5
        },
        rollback: {
            u: 'Rollback',
            link: '4Classic Wiki:Staff',
            order: 6
        },
        special: {
            u: 'Special'
        }
    }
};

UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = [
    'bannedfromchat',
    'bot',
    'bot-global',
    'bureaucrat',
    'chatmoderator',
    'rollback',
    'sysop',
    'threadmoderator',
    'content-moderator',
    'special'
];

UserTagsJS.modules.metafilter = {
    'sysop': ['bureaucrat'],
    'moderator': ['sysop', 'bureaucrat'],
    'rollback': ['moderator']
};

UserTagsJS.modules.custom = {
    'Zepyhrs': ['special']
};

/* =================================================
IMPORTING FROM DEV
================================================= */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UserTags/code.js',
        'u:dev:MediaWiki:AjaxRC.js',
        'u:dev:MediaWiki:RevealAnonIP.js'
    ]
});

/* =================================================
REVEAL ANON IP
================================================= */
window.RevealAnonIP = {
    permissions: ['bureaucrat', 'sysop', 'moderator']
};

/* =================================================
GAME BOX LINK WRAPPER
================================================= */
$(".game-box").each(function () {
    var $this = $(this),
    anchor = $this.find(".game-name a");
    if (!anchor || $this.parents(".game-box-link").length > 0)
        return;

    $this.wrap($("<a>", {
            class: "game-box-link",
            href: anchor.attr("href"),
            title: anchor.attr("title")
        }));
    $this.find("a").attr("tabindex", "-1");
});

/* =================================================
ECHARTS – DELAYED DISPLAY
================================================= */
(function () {
    var REVEAL_DELAY = 500; // ms

    function wrap(el) {
        if (el._wrapped)
            return;
        var holder = document.createElement('div');
        holder.className = 'echarts-holder';
        el.parentNode.insertBefore(holder, el);
        holder.appendChild(el);
        var overlay = document.createElement('div');
        overlay.className = 'echarts-loading';
        overlay.textContent = 'Loading…';
        holder.appendChild(overlay);
        el._wrapped = true;
    }

    function revealAfterDelay(el) {
        setTimeout(function () {
            el.classList.add('echarts-ready');
            var p = el.parentElement;
            if (p && p.classList.contains('echarts-holder'))
                p.dataset.ready = '1';
        }, REVEAL_DELAY);
    }

    function observe(el) {
        wrap(el);
        var mo = new MutationObserver(function () {
            if (el.querySelector('canvas, svg')) {
                revealAfterDelay(el);
                mo.disconnect();
            }
        });
        mo.observe(el, {
            childList: true,
            subtree: true
        });
        if (el.querySelector('canvas, svg')) {
            revealAfterDelay(el);
            mo.disconnect();
        }
    }

    function initIn($root) {
        var base = $root || document;
        var nodes = base.querySelectorAll('.echarts');
        for (var i = 0; i < nodes.length; i++)
            observe(nodes[i]);
    }

    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(function ($content) {
            initIn($content && $content[0] ? $content[0] : document);
        });
    } else {
        $(initIn);
    }
})();

/* =================================================
MOBILE
================================================= */
mw.hook('wikipage.content').add(function () {
    if (!document.body.classList.contains('page-Main_Page'))
        return;

    var toggle = document.querySelector('h2.collapsible-section');
    var hiddenSection = document.querySelector('section.mobile-hidden');

    if (!toggle || !hiddenSection)
        return;

    if (!toggle.classList.contains('open-section')) {
        toggle.click();
    }
});

/* =================================================
MAIN ENTRY POINT – TIMER + UPGRADE SIM
================================================= */
mw.hook('wikipage.content').add(function ($content) {
    var root = ($content && $content[0]) ? $content[0] : document;

    // Init modules independently
    initGameModeTimer(root);
    initUpgradeSimulators(root);
});

/* =================================================
GAME MODE TIMER
================================================= */
function initGameModeTimer(scope) {
    var root = scope.querySelector('[data-fc-event-timer]');
    if (!root)
        return;

    var hoursBlock = root.querySelector('.block.hours');
    var hoursEl = root.querySelector('#fc-hours');
    var minutesEl = root.querySelector('#fc-minutes');
    var secondsEl = root.querySelector('#fc-seconds');
    var labelEl = root.querySelector('#fc-event-label');
    var currentEl = root.querySelector('#fc-current-label');

    if (!hoursBlock || !hoursEl || !minutesEl || !secondsEl || !labelEl) {
        if (labelEl)
            labelEl.textContent = 'Timer: missing HTML elements';
        return;
    }

    var LIVE_MS = 2 * 60 * 1000;

    function now() {
        const parts = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Europe/Berlin',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).formatToParts(new Date());

        const get = t => Number(parts.find(p => p.type === t).value);

        return new Date(
            get('year'),
            get('month') - 1,
            get('day'),
            get('hour'),
            get('minute'),
            get('second'));
    }

    function isWeekend() {
        var d = now().getDay();
        return d === 0 || d === 6;
    }

    function isSunday() {
        return now().getDay() === 0;
    }

    function timeOnDay(hhmm, offset) {
        var p = hhmm.split(':').map(Number);
        var b = now();
        return new Date(
            b.getFullYear(),
            b.getMonth(),
            b.getDate() + offset,
            p[0], p[1], 0, 0);
    }

    var events = [{
            name: 'Champions of Iberia',
            reg: '00:00',
            start: '00:10'
        }, {
            name: 'Mission War',
            reg: '00:40',
            start: '00:50'
        }, {
            name: 'Battle of Iberia',
            reg: '01:30',
            start: '01:40'
        }, {
            name: 'Monster Invasion',
            reg: '02:00',
            start: '02:10'
        }, {
            name: 'Battle of Iberia',
            reg: '03:00',
            start: '03:10'
        }, {
            name: 'Mission War',
            reg: '04:00',
            start: '04:10'
        }, {
            name: 'Mission War',
            reg: '08:00',
            start: '08:10'
        }, {
            name: 'Battle of Iberia',
            reg: '09:00',
            start: '09:10'
        }, {
            name: 'Battle of Iberia',
            reg: '10:00',
            start: '10:10'
        }, {
            name: 'Monster Invasion',
            reg: '11:00',
            start: '11:10'
        }, {
            name: 'Mission War',
            reg: '12:00',
            start: '12:10'
        }, {
            name: 'Battle of Iberia',
            reg: '13:00',
            start: '13:10'
        },
        isWeekend()
         ? {
            name: 'Champions of Iberia',
            reg: '14:00',
            start: '14:10'
        }
         : {
            name: 'Monster Invasion',
            reg: '14:00',
            start: '14:10'
        }, {
            name: 'Mission War',
            reg: '15:00',
            start: '15:10'
        }, {
            name: 'Domination',
            reg: '16:00',
            start: '16:10'
        }, {
            name: 'Monster Invasion',
            reg: '16:30',
            start: '16:40'
        }, {
            name: 'Champions of Iberia',
            reg: '17:00',
            start: '17:10'
        }, {
            name: 'Domination',
            reg: '17:40',
            start: '17:50'
        }, {
            name: 'Mission War',
            reg: '18:10',
            start: '18:20'
        }, {
            name: 'Battle of Worlds',
            reg: '18:50',
            start: '19:00'
        }, {
            name: 'Champions of Iberia',
            reg: '19:30',
            start: '19:40'
        },
        isSunday()
         ? {
            name: 'Castle War',
            start: '21:00'
        }
         : {
            name: 'Territory War',
            start: '21:00'
        }, {
            name: 'World Boss',
            reg: '21:30',
            start: '21:35'
        }, {
            name: 'Champions of Iberia',
            reg: '22:00',
            start: '22:10'
        }, {
            name: 'Domination',
            reg: '22:40',
            start: '22:50'
        }, {
            name: 'Battle of Iberia',
            reg: '23:20',
            start: '23:30'
        }
    ];

    var activeEvents = [{
            name: 'Champions of Iberia',
            start: '00:12',
            end: '00:42'
        }, {
            name: 'Mission War',
            start: '00:52',
            end: '01:22'
        }, {
            name: 'Battle of Iberia',
            start: '01:42',
            end: '02:02'
        }, {
            name: 'Monster Invasion',
            start: '02:12',
            end: '02:30'
        }, {
            name: 'Battle of Iberia',
            start: '03:12',
            end: '03:32'
        }, {
            name: 'Mission War',
            start: '04:12',
            end: '04:42'
        }, {
            name: 'Mission War',
            start: '08:12',
            end: '08:42'
        }, {
            name: 'Battle of Iberia',
            start: '09:12',
            end: '09:32'
        }, {
            name: 'Battle of Iberia',
            start: '10:12',
            end: '10:32'
        }, {
            name: 'Monster Invasion',
            start: '11:12',
            end: '11:30'
        }, {
            name: 'Mission War',
            start: '12:12',
            end: '12:42'
        }, {
            name: 'Battle of Iberia',
            start: '13:12',
            end: '13:32'
        },
        isWeekend()
         ? {
            name: 'Champions of Iberia',
            start: '14:12',
            end: '14:42'
        }
         : {
            name: 'Monster Invasion',
            start: '14:12',
            end: '14:32'
        }, {
            name: 'Mission War',
            start: '15:12',
            end: '15:42'
        }, {
            name: 'Domination',
            start: '16:12',
            end: '16:32'
        }, {
            name: 'Monster Invasion',
            start: '16:42',
            end: '17:00'
        }, {
            name: 'Champions of Iberia',
            start: '17:12',
            end: '17:42'
        }, {
            name: 'Domination',
            start: '17:52',
            end: '18:12'
        }, {
            name: 'Mission War',
            start: '18:22',
            end: '18:52'
        }, {
            name: 'Battle of Worlds',
            start: '19:02',
            end: '19:22'
        }, {
            name: 'Champions of Iberia',
            start: '19:42',
            end: '20:12'
        },
        isSunday()
         ? {
            name: 'Castle War',
            start: '21:02',
            end: '21:45'
        }
         : {
            name: 'Territory War',
            start: '21:02',
            end: '21:30'
        }, {
            name: 'World Boss',
            start: '21:37',
            end: '21:55'
        }, {
            name: 'Champions of Iberia',
            start: '22:12',
            end: '22:42'
        }, {
            name: 'Domination',
            start: '22:52',
            end: '23:12'
        }, {
            name: 'Battle of Iberia',
            start: '23:32',
            end: '23:52'
        }
    ];

    function buildOccurrences(list, withReg) {
        var occ = [];
        for (var i = 0; i < list.length; i++) {
            for (var d = 0; d <= 1; d++) {
                var item = {
                    name: list[i].name
                };
                if (withReg)
                    item.reg = list[i].reg ? timeOnDay(list[i].reg, d) : null;
                item.start = timeOnDay(list[i].start, d);
                if (!withReg)
                    item.end = timeOnDay(list[i].end, d);
                occ.push(item);
            }
        }
        return occ;
    }

    var occurrences = buildOccurrences(events, true);
    var activeOccurrences = buildOccurrences(activeEvents, false);

    function setTime(ms) {
        var t = Math.max(0, Math.floor(ms / 1000));
        var s = t % 60;
        var m = Math.floor(t / 60) % 60;
        var h = Math.floor(t / 3600);

        if (h >= 1) {
            hoursBlock.style.display = '';
            hoursEl.textContent = String(h).padStart(2, '0');
            root.classList.remove('no-hours');
        } else {
            hoursBlock.style.display = 'none';
            hoursEl.textContent = '00';
            root.classList.add('no-hours');
        }

        minutesEl.textContent = String(m).padStart(2, '0');
        secondsEl.textContent = String(s).padStart(2, '0');
    }

    function updateTimer() {
        var current = now();

        // Active events label
        if (currentEl) {
            var actives = [];
            for (var i = 0; i < activeOccurrences.length; i++) {
                var a = activeOccurrences[i];
                if (current >= a.start && current < a.end)
                    actives.push(a.name);
            }
            if (actives.length === 1)
                currentEl.textContent = 'Currently ' + actives[0] + ' is in progress';
            else if (actives.length > 1)
                currentEl.textContent = 'Currently ' + actives.join(', ') + ' are in progress';
            else
                currentEl.textContent = '';
        }

        // Registration window
        var regNow = null;
        for (i = 0; i < occurrences.length; i++) {
            var o = occurrences[i];
            if (o.reg && current >= o.reg && current < o.start) {
                if (!regNow || o.start < regNow.start)
                    regNow = o;
            }
        }
        if (regNow) {
            labelEl.textContent = regNow.name + '\nregistration open';
            setTime(regNow.start - current);
            return;
        }

        // Live window
        var liveNow = null;
        for (i = 0; i < occurrences.length; i++) {
            o = occurrences[i];
            if (current >= o.start && current < new Date(o.start.getTime() + LIVE_MS)) {
                if (!liveNow || o.start < liveNow.start)
                    liveNow = o;
            }
        }
        if (liveNow) {
            labelEl.textContent = liveNow.name + '\nhas started';
            setTime(0);
            return;
        }

        // Next
        var next = null;
        for (i = 0; i < occurrences.length; i++) {
            var target = occurrences[i].reg || occurrences[i].start;
            if (target > current) {
                if (!next || target < (next.reg || next.start))
                    next = occurrences[i];
            }
        }
        if (!next)
            return;

        labelEl.textContent = next.name;
        setTime((next.reg || next.start) - current);
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* =================================================
UPGRADE SIMULATOR
================================================= */
function initUpgradeSimulators(scope) {
    var windows = scope.querySelectorAll('.upgrade-window');
    if (!windows || windows.length === 0)
        return;

    for (var i = 0; i < windows.length; i++) {
        initUpgradeSimulatorOne(windows[i]);
    }
}

function initUpgradeSimulatorOne(root) {
    if (!root)
        return;
    if (root.dataset.init === '1')
        return;
    root.dataset.init = '1';

    var startBtn = root.querySelector('.uw-start');
    var resetBtn = root.querySelector('.uw-reset');
    var fill = root.querySelector('.uw-bar-fill');
    var barText = root.querySelector('.uw-bar-text');
    var levelEl = root.querySelector('.uw-level');
    var chanceWrap = root.querySelector('.uw-chance');
    var frameEl = root.querySelector('.uw-item-frame');

    var wrapper = root.closest('.upgrade-wrapper') || document;
    var potions = wrapper.querySelectorAll('.uw-potion');

    if (!startBtn || !resetBtn || !fill || !barText || !levelEl || !chanceWrap)
        return;

    var MAX_LEVEL = 24;

    var BASE_RATES = {
        0: 1,
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 1,
        10: 1,
        11: 0.6,
        12: 0.2,
        13: 0.35,
        14: 0.13,
        15: 0.12,
        16: 0.05,
        17: 0.07,
        18: 0.035,
        19: 0.01,
        20: 0.005,
        21: 0.008,
        22: 0.005,
        23: 0.02,
        24: 0
    };

    var FRAME_URLS = {
        1: 'https://static.wikia.nocookie.net/operation-markut/images/3/38/Upgrade_frame_1.png',
        2: 'https://static.wikia.nocookie.net/operation-markut/images/b/bf/Upgrade_frame_2.png',
        3: 'https://static.wikia.nocookie.net/operation-markut/images/1/1a/Upgrade_frame_3.png',
        4: 'https://static.wikia.nocookie.net/operation-markut/images/a/a9/Upgrade_frame_4.png',
        5: 'https://static.wikia.nocookie.net/operation-markut/images/1/1e/Upgrade_frame_5.png',
        6: 'https://static.wikia.nocookie.net/operation-markut/images/8/8e/Upgrade_frame_6.png',
        7: 'https://static.wikia.nocookie.net/operation-markut/images/3/31/Upgrade_frame_7.png',
        8: 'https://static.wikia.nocookie.net/operation-markut/images/5/58/Upgrade_frame_8.png',
        9: 'https://static.wikia.nocookie.net/operation-markut/images/d/d7/Upgrade_frame_9.png',
        10: 'https://static.wikia.nocookie.net/operation-markut/images/2/2d/Upgrade_frame_10.png',
        11: 'https://static.wikia.nocookie.net/operation-markut/images/e/e2/Upgrade_frame_11.png',
        12: 'https://static.wikia.nocookie.net/operation-markut/images/5/5f/Upgrade_frame_12.png',
        13: 'https://static.wikia.nocookie.net/operation-markut/images/7/7a/Upgrade_frame_13.png',
        14: 'https://static.wikia.nocookie.net/operation-markut/images/9/9d/Upgrade_frame_14.png',
        15: 'https://static.wikia.nocookie.net/operation-markut/images/2/20/Upgrade_frame_15.png',
        16: 'https://static.wikia.nocookie.net/operation-markut/images/1/1c/Upgrade_frame_16.png',
        17: 'https://static.wikia.nocookie.net/operation-markut/images/a/a5/Upgrade_frame_17.png',
        18: 'https://static.wikia.nocookie.net/operation-markut/images/5/5c/Upgrade_frame_18.png',
        19: 'https://static.wikia.nocookie.net/operation-markut/images/f/f7/Upgrade_frame_19.png',
        20: 'https://static.wikia.nocookie.net/operation-markut/images/1/14/Upgrade_frame_20.png',
        21: 'https://static.wikia.nocookie.net/operation-markut/images/8/8b/Upgrade_frame_21.png',
        22: 'https://static.wikia.nocookie.net/operation-markut/images/1/1e/Upgrade_frame_22.png',
        23: 'https://static.wikia.nocookie.net/operation-markut/images/e/e3/Upgrade_frame_23.png',
        24: 'https://static.wikia.nocookie.net/operation-markut/images/7/76/Upgrade_frame_24.png'
    };

    var running = false;

    var itemLevel = parseInt(String(levelEl.textContent).replace(/[^\d]/g, ''), 10);
    if (isNaN(itemLevel))
        itemLevel = 11;

    var INITIAL_LEVEL = itemLevel;
    var selectedMultiplier = 1.0;

    function getRawChance() {
        return (BASE_RATES[itemLevel] || 0) * selectedMultiplier;
    }

    function getCappedChance() {
        return Math.min(1, Math.max(0, getRawChance()));
    }

    function updateUI() {
        levelEl.textContent = '+' + itemLevel;

        if (itemLevel >= MAX_LEVEL) {
            chanceWrap.textContent = 'Maximum upgrade level reached';
            startBtn.setAttribute('aria-disabled', 'true');
        } else {
            var p = getRawChance() * 100;
            var txt = Number.isInteger(p) ? p : p.toFixed(2).replace(/\.?0+$/, '');
            chanceWrap.innerHTML =
                'Chance of Success: <span class="uw-chanceval">' + txt + '</span>%';
            startBtn.setAttribute('aria-disabled', 'false');
        }

        if (frameEl && FRAME_URLS[itemLevel]) {
            frameEl.style.backgroundImage = 'url("' + FRAME_URLS[itemLevel] + '")';
        }
    }

    function clearPotions() {
        for (var i = 0; i < potions.length; i++)
            potions[i].classList.remove('is-selected');
        selectedMultiplier = 1.0;
        updateUI();
    }

    function resetSimulator() {
        running = false;
        itemLevel = INITIAL_LEVEL;
        clearPotions();
        fill.style.transition = 'none';
        fill.style.width = '0%';
        barText.textContent = '0%';
        startBtn.setAttribute('aria-disabled', 'false');
        updateUI();
    }

    for (var i = 0; i < potions.length; i++) {
        (function (p) {
            var links = p.querySelectorAll('a');
            for (var k = 0; k < links.length; k++) {
                links[k].addEventListener('click', function (e) {
                    e.preventDefault();
                });
            }
            p.addEventListener('click', function (e) {
                e.preventDefault();
                if (running)
                    return;
                if (p.classList.contains('is-selected'))
                    clearPotions();
                else {
                    clearPotions();
                    selectedMultiplier = 1 + parseFloat(p.dataset.bonus || 0);
                    p.classList.add('is-selected');
                    updateUI();
                }
            });
        })(potions[i]);
    }

    function runProgress(ms, done) {
        fill.style.transition = 'none';
        fill.style.width = '0%';
        barText.textContent = '0%';
        fill.offsetHeight;
        fill.style.transition = 'width ' + ms + 'ms linear';
        fill.style.width = '100%';
        var s = Date.now();
        function tick() {
            var f = Math.min(1, (Date.now() - s) / ms);
            barText.textContent = Math.floor(f * 100) + '%';
            if (f < 1)
                requestAnimationFrame(tick);
            else
                done();
        }
        tick();
    }

    function applyResult() {
        if (Math.random() < getCappedChance()) {
            var r = Math.random();
            itemLevel = Math.min(MAX_LEVEL, itemLevel + (r < 0.333 ? 1 : r < 0.666 ? 2 : 3));
        } else if (itemLevel > 11) {
            var rf = Math.random();
            itemLevel -= (rf < 0.333 ? 0 : rf < 0.666 ? 1 : 2);
            if (itemLevel < 0)
                itemLevel = 0;
        }
        fill.style.transition = 'none';
        fill.style.width = '0%';
        barText.textContent = '0%';
        running = false;
        updateUI();
    }

    startBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (running || itemLevel >= MAX_LEVEL)
            return;
        running = true;
        runProgress(1200, applyResult);
    });

    resetBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (running)
            return;
        resetSimulator();
    });

    clearPotions();
    updateUI();
}