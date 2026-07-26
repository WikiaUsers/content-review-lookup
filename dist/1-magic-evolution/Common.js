/* ============================================================
 * +1 Magic Evolution Wiki — interactive calculators
 * Paste into: MediaWiki:Common.js
 *
 * Builds three calculators inside placeholder elements on the
 * [[Calculators]] page:
 *   #evo-calc-rebirth — next rebirth requirement + grind remaining
 *   #evo-calc-egg     — egg hatch probability
 *   #evo-calc-wands   — Wins progress toward the next wand
 *
 * The form controls are created here rather than in the wikitext
 * because MediaWiki's HTML sanitiser strips <input> and <select>.
 * Each placeholder holds a plain-text fallback that is only
 * replaced once this script runs, so the page stays readable
 * without JavaScript.
 *
 * No external dependencies. All game data below mirrors the
 * tables on [[Rebirth]], [[Pets]] and [[Equipment]] — update both
 * together.
 * ============================================================ */

(function () {
    'use strict';

    /* ---------- game data ---------- */

    // Level you must reach to claim rebirth N (index 0 = rebirth 1).
    var REBIRTH_LEVELS = [
        8, 12, 16, 21, 26, 31, 36, 42, 48, 54,
        60, 67, 74, 81, 88, 96, 104, 112, 120, 128,
        136, 144, 152, 160, 169, 178, 187, 196, 205, 214,
        224, 234, 244, 254, 265, 276, 287, 298, 310, 322,
        334, 346, 358, 371, 384, 397, 410, 423, 437, 451,
        465, 479, 493, 508, 523, 538, 553, 568, 584, 600,
        616, 632, 648, 664, 680, 697, 714, 731, 748, 765,
        783, 801, 819, 837, 855
    ];
    var MAX_REBIRTH = REBIRTH_LEVELS.length; // 75

    // Eggs: cost is in Wins unless robux is true.
    var EGGS = [
        { name: 'Basic Egg', cost: 400, pets: [
            { name: 'Wolf', mult: 1.15, chance: 38.4 },
            { name: 'Flopping Fish', mult: 1.3, chance: 30.7 },
            { name: 'Baby Zombie', mult: 1.45, chance: 19.2 },
            { name: 'Baby Wizard', mult: 1.85, chance: 11.5 }
        ] },
        { name: 'Fire Egg', cost: 12000, pets: [
            { name: 'Fire Ball', mult: 1.55, chance: 37.7 },
            { name: 'Fire Fox', mult: 2, chance: 30.1 },
            { name: 'Phoenix', mult: 2.66, chance: 22.6 },
            { name: 'Dragon', mult: 3.15, chance: 9.4 }
        ] },
        { name: 'Arcane Egg', cost: 225000, pets: [
            { name: 'Elf', mult: 2.85, chance: 37 },
            { name: 'Evil Witch', mult: 3, chance: 29.6 },
            { name: 'Blue Serpent', mult: 3.42, chance: 18.5 },
            { name: 'Unicorn', mult: 3.8, chance: 14.8 }
        ] },
        { name: 'Astral Egg', cost: 6500000, pets: [
            { name: 'Silly Star', mult: 3.15, chance: 62.6 },
            { name: 'The Moon', mult: 3.88, chance: 24.2 },
            { name: 'Star Scorpion', mult: 4.25, chance: 8.8 },
            { name: 'Void Giant', mult: 6.5, chance: 2.2 }
        ] },
        { name: 'Demonic Egg', cost: 200000000, pets: [
            { name: 'Fiend', mult: 6, chance: 55 },
            { name: 'Crimson Imp', mult: 7.5, chance: 32.6 },
            { name: 'Abyssal Eye', mult: 8.45, chance: 12.3 },
            { name: 'Hellhound', mult: 10.1, chance: 3.75 },
            { name: 'Demon King', mult: 15.5, chance: 1 }
        ] },
        { name: 'Cyber Egg', cost: 500000000000, pets: [
            { name: 'Robo Pup', mult: 12.6, chance: 45 },
            { name: 'Bot Bunny', mult: 16, chance: 27 },
            { name: 'Mecha Cat', mult: 24.5, chance: 12 },
            { name: 'Drone Bat', mult: 30, chance: 2 },
            { name: 'Cyborg Dragon', mult: 42.5, chance: 0.5 }
        ] },
        // Time Egg pets are dynamic ("best pet +X%"), so disp overrides the label.
        { name: 'Time Egg', cost: 299, robux: true, pets: [
            { name: 'Dodo Bird', mult: 0, disp: 'best +25%', chance: 51.8 },
            { name: 'T-Rex', mult: 0, disp: 'best +45%', chance: 41.4 },
            { name: 'Pegasus', mult: 0, disp: 'best +70%', chance: 5.1 },
            { name: 'Bone Pterodactyl', mult: 0, disp: 'best +150%', chance: 1.5 }
        ] }
    ];

    // Wands purchasable with Wins, in unlock order.
    var WANDS = [
        { n: 'Twig Wand', click: 1, wins: 0 },
        { n: 'Thorn Wand', click: 2, wins: 1 },
        { n: 'Wooden Staff', click: 5, wins: 3 },
        { n: 'Moonlight Wand', click: 12, wins: 10 },
        { n: 'Crystal Branch Wand', click: 25, wins: 25 },
        { n: 'Magic Lantern Staff', click: 50, wins: 100 },
        { n: 'Mushroom Staff', click: 125, wins: 500 },
        { n: 'Spirit Wand', click: 250, wins: 2000 },
        { n: 'Rune Staff', click: 500, wins: 7500 },
        { n: 'Ember Wand', click: 600, wins: 25000 },
        { n: 'Storm Scepter', click: 1000, wins: 200000 },
        { n: 'Void Scepter', click: 5000, wins: 850000 },
        { n: 'Bone Staff', click: 12500, wins: 1800000 },
        { n: 'Lava Staff', click: 20000, wins: 5000000 },
        { n: 'Celestial Staff', click: 45000, wins: 25000000 },
        { n: 'Frost Staff', click: 90000, wins: 150000000 },
        { n: 'Astral Polearm', click: 150000, wins: 500000000 },
        { n: 'Ancient Wizard Staff', click: 400000, wins: 1000000000 },
        { n: 'Demonic Staff', click: 1250000, wins: 5000000000 },
        { n: 'Angelic Halo Staff', click: 3000000, wins: 40000000000 },
        { n: 'Dragon Wand', click: 15000, wins: 50000000000 }
    ];

    /* ---------- helpers ---------- */

    function el(tag, cls, text) {
        var e = document.createElement(tag);
        if (cls) { e.className = cls; }
        if (text !== undefined) { e.textContent = text; }
        return e;
    }

    // 1234567 -> "1.23M"
    function big(n) {
        var units = [
            [1e15, 'Qa'], [1e12, 'T'], [1e9, 'B'], [1e6, 'M'], [1e3, 'k']
        ];
        for (var i = 0; i < units.length; i++) {
            if (n >= units[i][0]) {
                return (n / units[i][0]).toFixed(2).replace(/\.?0+$/, '') + units[i][1];
            }
        }
        return String(n);
    }

    function field(parent, labelText, inputEl) {
        var wrap = el('label', 'evo-calc__field');
        wrap.appendChild(el('span', 'evo-calc__label', labelText));
        wrap.appendChild(inputEl);
        parent.appendChild(wrap);
        return inputEl;
    }

    function numberInput(value, min, max) {
        var i = document.createElement('input');
        i.type = 'number';
        i.value = value;
        if (min !== undefined) { i.min = min; }
        if (max !== undefined) { i.max = max; }
        i.className = 'evo-calc__input';
        return i;
    }

    function select(options) {
        var s = document.createElement('select');
        s.className = 'evo-calc__input';
        options.forEach(function (o, idx) {
            var opt = document.createElement('option');
            opt.value = String(idx);
            opt.textContent = o;
            s.appendChild(opt);
        });
        if (options.length) { s.value = '0'; }
        return s;
    }

    // Reads a <select> as an index into list, always landing on a real entry.
    function pick(sel, list) {
        var i = parseInt(sel.value, 10);
        return list[i >= 0 && i < list.length ? i : 0];
    }

    // Replaces the placeholder's fallback text with a form + output area.
    function shell(node, buttonLabel) {
        node.textContent = '';
        var form = el('div', 'evo-calc__form');
        var out = el('div', 'evo-calc__out');
        var btn = el('button', 'evo-calc__btn', buttonLabel);
        btn.type = 'button';
        node.appendChild(form);
        node.appendChild(btn);
        node.appendChild(out);
        return { form: form, out: out, btn: btn };
    }

    function row(out, label, value) {
        var r = el('div', 'evo-calc__row');
        r.appendChild(el('span', 'evo-calc__rowlabel', label));
        r.appendChild(el('strong', 'evo-calc__rowvalue', value));
        out.appendChild(r);
    }

    /* ---------- 1. rebirth planner ---------- */

    function rebirthCalc(node) {
        var ui = shell(node, 'Calculate');
        var rb = field(ui.form, 'Current rebirths', numberInput(0, 0, MAX_REBIRTH));
        var lv = field(ui.form, 'Current level', numberInput(1, 0, 900));

        function run() {
            var done = Math.max(0, Math.min(MAX_REBIRTH, parseInt(rb.value, 10) || 0));
            var level = Math.max(0, parseInt(lv.value, 10) || 0);
            ui.out.textContent = '';

            if (done >= MAX_REBIRTH) {
                row(ui.out, 'Status', 'Max rebirth reached (75) — nothing left to claim.');
                row(ui.out, 'Power multiplier', (1 + MAX_REBIRTH) + 'x');
                row(ui.out, 'Base health', (100 + 50 * MAX_REBIRTH) + '');
                return;
            }

            var needed = REBIRTH_LEVELS[done];          // level for the next rebirth
            var missing = Math.max(0, needed - level);

            // Every rebirth resets level to 0, so the remaining grind is the
            // sum of all future thresholds, minus the levels already banked.
            var totalLeft = 0;
            for (var i = done; i < MAX_REBIRTH; i++) { totalLeft += REBIRTH_LEVELS[i]; }
            totalLeft -= Math.min(level, needed);

            row(ui.out, 'Next rebirth', '#' + (done + 1));
            row(ui.out, 'Level required', String(needed));
            row(ui.out, 'Levels to go', missing === 0 ? 'Ready to rebirth now!' : String(missing));
            row(ui.out, 'Power after', (1 + done) + 'x → ' + (2 + done) + 'x');
            row(ui.out, 'Base health after', (100 + 50 * done) + ' → ' + (150 + 50 * done));
            row(ui.out, 'Rebirths remaining', String(MAX_REBIRTH - done));
            row(ui.out, 'Total levels to max (75)', big(totalLeft));
        }

        ui.btn.addEventListener('click', run);
        run();
    }

    /* ---------- 2. egg hatch odds ---------- */

    function eggCalc(node) {
        var ui = shell(node, 'Calculate');
        var eggSel = field(ui.form, 'Egg', select(EGGS.map(function (e) { return e.name; })));
        var petSel = field(ui.form, 'Target pet', select([]));
        var hatches = field(ui.form, 'Number of hatches', numberInput(100, 1, 1000000));

        function fillPets() {
            var egg = pick(eggSel, EGGS);
            petSel.textContent = '';
            egg.pets.forEach(function (p, idx) {
                var o = document.createElement('option');
                o.value = String(idx);
                o.textContent = p.name + ' — ' + (p.disp || (p.mult + 'x')) + ' (' + p.chance + '%)';
                petSel.appendChild(o);
            });
            petSel.value = '0';
        }

        function run() {
            var egg = pick(eggSel, EGGS);
            var pet = pick(petSel, egg.pets);
            var n = Math.max(1, parseInt(hatches.value, 10) || 1);
            var p = pet.chance / 100;

            // Probability of at least one success in n independent hatches.
            var atLeastOne = 1 - Math.pow(1 - p, n);
            var need = function (target) {
                return Math.ceil(Math.log(1 - target) / Math.log(1 - p));
            };

            ui.out.textContent = '';
            row(ui.out, 'Chance per hatch', pet.chance + '%');
            // Never print a flat "100%" — the odds only approach certainty.
            row(ui.out, 'Chance in ' + big(n) + ' hatches',
                atLeastOne > 0.9999 ? '>99.99%' : (atLeastOne * 100).toFixed(2) + '%');
            row(ui.out, 'Average hatches needed', big(Math.ceil(1 / p)));
            row(ui.out, 'Hatches for 50% odds', big(need(0.5)));
            row(ui.out, 'Hatches for 90% odds', big(need(0.9)));
            row(ui.out, 'Hatches for 99% odds', big(need(0.99)));
            if (egg.robux) {
                row(ui.out, 'Cost for ' + big(n) + ' hatches', big(n * egg.cost) + ' Robux');
            } else {
                row(ui.out, 'Cost for ' + big(n) + ' hatches', big(n * egg.cost) + ' Wins');
                row(ui.out, 'Wins for a 90% shot', big(need(0.9) * egg.cost));
            }
        }

        eggSel.addEventListener('change', function () { fillPets(); run(); });
        petSel.addEventListener('change', run);
        ui.btn.addEventListener('click', run);
        fillPets();
        run();
    }

    /* ---------- 3. wins → next wand ---------- */

    function wandCalc(node) {
        var ui = shell(node, 'Calculate');
        var wins = field(ui.form, 'Your Wins', numberInput(0, 0));

        function run() {
            var w = Math.max(0, parseFloat(wins.value) || 0);
            var owned = null, next = null;
            for (var i = 0; i < WANDS.length; i++) {
                // Dragon Wand (last entry) is a novelty: weaker than earlier
                // staffs, so it is reported separately rather than as "best".
                if (i === WANDS.length - 1) { continue; }
                if (WANDS[i].wins <= w) { owned = WANDS[i]; }
                else { next = WANDS[i]; break; }
            }
            ui.out.textContent = '';
            row(ui.out, 'Best wand you can afford',
                owned ? owned.n + ' (+' + big(owned.click) + '/click)' : 'None yet');
            if (next) {
                row(ui.out, 'Next unlock', next.n + ' (+' + big(next.click) + '/click)');
                row(ui.out, 'Wins still needed', big(Math.ceil(next.wins - w)));
                row(ui.out, 'Power gain', owned
                    ? '×' + (next.click / owned.click).toFixed(2) + ' more per click'
                    : '—');
            } else {
                row(ui.out, 'Next unlock', 'All Wins wands unlocked — chase Lunar Crate wands instead.');
            }
        }

        ui.btn.addEventListener('click', run);
        run();
    }

    /* ---------- boot ---------- */

    function init() {
        var map = {
            'evo-calc-rebirth': rebirthCalc,
            'evo-calc-egg': eggCalc,
            'evo-calc-wands': wandCalc
        };
        Object.keys(map).forEach(function (id) {
            var node = document.getElementById(id);
            if (node && !node.getAttribute('data-evo-ready')) {
                node.setAttribute('data-evo-ready', '1');
                try {
                    map[id](node);
                } catch (e) {
                    node.textContent = 'Calculator failed to load.';
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    // Fandom navigates between articles without a full page reload.
    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(init);
    }
}());