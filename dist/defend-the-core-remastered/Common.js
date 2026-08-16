/**
 * Defend The Core Remastered — Inventory Planning Calculator
 * ------------------------------------------------------------
 * Install: paste this whole file into  MediaWiki:Common.js
 * (or a dedicated page-JS import) on defend-the-core-remastered.fandom.com.
 * It looks for the span placeholders that already live in the
 * "Inventory Planning Calculator" section of the [[Shop]] page:
 *
 *   #modeInput  #waveInput  #itemsInputContainer
 *   #currentCoins  #coinOutput  #coinCalc
 *
 * and wires them up. If those elements aren't on the page, the
 * script does nothing.
 *
 * DATA SOURCES (pulled from the wiki's current pages):
 *  - Item tiers + coin costs: [[Shop]] tier lists + each item's
 *    {{Item|...|buy=}} parameter (Category:Items).
 *  - Mode stats (Coins %, XP %, Speedrun Timer, Waves): each mode's
 *    own page (Easy/Normal/Hard/Expert/Legacy/Onslaught/Mastery Mode).
 *  - Boss waves (for the Boss Bonus helper): each boss's character
 *    page ("...is the Nth boss ... that appears at Wave X").
 *
 * NOTE ON "Current Coins": the wiki documents each mode's Coin %,
 * XP %, and whether the Speedrun Timer is enabled, but it does not
 * publish an exact "coins earned per wave" formula, so that part is
 * an editable "Base Coins / Wave" field you can tune to match live
 * gameplay. Speedrun Timer rewards, however, use the game's real
 * SpeedrunRewards table (per-boss Ultra/Gold/Silver/Bronze payouts)
 * and are summed automatically for every boss reached by the
 * selected wave. XP Boost adds (XP Bonus % \u00d7 4) coins when active.
 * Boss Bonus (a flat per-kill reward, separate from speedrun) isn't
 * modeled yet since that data isn't available.
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------
  // Data: Modes (source: each Mode's wiki page, "Stats:" list)
  // ---------------------------------------------------------------
  var MODES = {
    'Easy Mode':      { waves: 8,  coinPct: 200, xpPct: 50,  speedrun: false },
    'Normal Mode':    { waves: 8,  coinPct: 100, xpPct: 100, speedrun: true  },
    'Hard Mode':      { waves: 8,  coinPct: 90,  xpPct: 125, speedrun: true  },
    // Expert Mode's wave count was left blank on the wiki page ("*  Waves").
    // Assumed 8 to match Easy/Normal/Hard — update MODES['Expert Mode'].waves
    // if/when the wiki page is filled in.
    'Expert Mode':    { waves: 8,  coinPct: 75,  xpPct: 150, speedrun: true,  wavesAssumed: true },
    // Legacy Mode's wave count was also left blank ("*  Waves"), but the
    // DTCR OST page lists Legacy Mode music through "Wave 11" and Gratos
    // (the final boss), so 11 is used here.
    'Legacy Mode':    { waves: 11, coinPct: 100, xpPct: 150, speedrun: true,  wavesAssumed: true },
    'Onslaught Mode': { waves: 22, coinPct: 50,  xpPct: 200, speedrun: false },
    'Mastery Mode':   { waves: 16, coinPct: 60,  xpPct: 250, speedrun: false }
  };

  // Boss wave thresholds, documented on each boss's page. These only
  // apply to modes that share the "standard" boss progression (Easy,
  // Normal, Hard, Expert, Legacy). Onslaught/Mastery bosses aren't
  // pinned to these same wave numbers on the wiki.
  var BOSS_ORDER = ['Elite Conscript', 'Corrupted Guest', 'Floating Fortress', 'Creason', 'Drage', 'The ROBLOXian Destroyer', 'Gratos'];
  var STANDARD_BOSS_WAVES = [5, 6, 7, 8, 9, 10, 11]; // wave-index-matched to BOSS_ORDER
  var STANDARD_BOSS_MODES = ['Easy Mode', 'Normal Mode', 'Hard Mode', 'Expert Mode', 'Legacy Mode'];

  var BOSS_BY_WAVE = {};
  STANDARD_BOSS_WAVES.forEach(function (w, i) { BOSS_BY_WAVE[w] = BOSS_ORDER[i]; });

  // In-game SpeedrunRewards table (from the game's SpeedrunRewards module):
  // per-boss coin reward for hitting each speed tier while beating that boss.
  var SPEEDRUN_REWARDS = {
    'Elite Conscript':        { Ultra: 50,   Gold: 35,  Silver: 20,  Bronze: 10 },
    'Corrupted Guest':        { Ultra: 75,   Gold: 60,  Silver: 45,  Bronze: 20 },
    'Floating Fortress':      { Ultra: 100,  Gold: 80,  Silver: 60,  Bronze: 35 },
    'Creason':                { Ultra: 150,  Gold: 100, Silver: 75,  Bronze: 50 },
    'Drage':                  { Ultra: 200,  Gold: 150, Silver: 100, Bronze: 75 },
    'The ROBLOXian Destroyer':{ Ultra: 400,  Gold: 300, Silver: 200, Bronze: 100 },
    'Gratos':                 { Ultra: 1000, Gold: 750, Silver: 500, Bronze: 250 }
  };
  var SPEEDRUN_TIERS = ['None', 'Bronze', 'Silver', 'Gold', 'Ultra'];

  // Boss Bonus (a separate flat per-boss-kill reward) isn't in yet —
  // left out until that data is available. Speedrun rewards above are
  // the only boss-related coin source currently modeled.

  // ---------------------------------------------------------------
  // Data: Items by tier (source: [[Shop]] tier lists; costs come
  // from each item's {{Item|buy=}} parameter, Category:Items)
  // ---------------------------------------------------------------
  var ITEM_TIERS = {
    'Tier 1': [
      { name: 'AK-47',          cost: 0 },
      { name: 'Pistol',         cost: 0 },
      { name: 'Uzi',            cost: 75 },
      { name: 'Sniper',         cost: 125 },
      { name: 'Shotgun',        cost: 150 },
      { name: 'Bomb',           cost: 200 },
      { name: 'First Aid Kit',  cost: 250 },
      { name: 'Laser AR',       cost: 300 },
      { name: 'Mace',           cost: 375 },
      { name: 'C4 Bucket',      cost: 400 },
      { name: 'Laser Minigun',  cost: 500 }
    ],
    'Tier 2': [
      { name: 'Golden AK',        cost: 400 },
      { name: 'Claymore',         cost: 500 },
      { name: 'Rocket Launcher',  cost: 575 },
      { name: 'Rejuvigun',        cost: 600 },
      { name: 'Lazer-Tron',       cost: 650 },
      { name: 'Katana',           cost: 700 },
      { name: "Ghost Pet",        cost: 750 },
      { name: "Hunter's Mark",    cost: 800 },
      { name: 'M16',              cost: 875 },
      { name: 'Dual Revolvers',   cost: 1000 },
      { name: 'Blackheart Staff', cost: 1250 }
    ],
    'Tier 3': [
      { name: 'Depraved Hammer',     cost: 1200 },
      { name: 'Minigun',             cost: 1500 },
      { name: "Celestial's Spirit",  cost: 1800 },
      { name: 'Gladonious Blade',    cost: 2000 },
      { name: 'Dieftharmeni Elpizo', cost: 2500 }
    ]
  };

  function fmt(n) {
    return Math.round(n).toLocaleString('en-US');
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(init);

  function init() {
    var modeSpan = document.getElementById('modeInput');
    var waveSpan = document.getElementById('waveInput');
    var itemsSpan = document.getElementById('itemsInputContainer');
    var currentCoinsSpan = document.getElementById('currentCoins');
    var coinOutputSpan = document.getElementById('coinOutput');
    var calcBtn = document.getElementById('coinCalc');

    if (!modeSpan || !waveSpan || !itemsSpan || !currentCoinsSpan || !coinOutputSpan || !calcBtn) {
      return; // not on the Shop page (or markup changed) — bail out quietly
    }

    // ---- Mode dropdown -------------------------------------------------
    var modeSelect = document.createElement('select');
    modeSelect.id = 'ipc-mode';
    Object.keys(MODES).forEach(function (name) {
      var opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      modeSelect.appendChild(opt);
    });
    modeSpan.appendChild(modeSelect);

    // ---- Wave dropdown (depends on mode) --------------------------------
    var waveSelect = document.createElement('select');
    waveSelect.id = 'ipc-wave';
    waveSpan.appendChild(waveSelect);

    function rebuildWaves() {
      var mode = MODES[modeSelect.value];
      var prev = parseInt(waveSelect.value, 10) || 1;
      waveSelect.innerHTML = '';
      for (var w = 1; w <= mode.waves; w++) {
        var opt = document.createElement('option');
        opt.value = w;
        opt.textContent = 'Wave ' + w + (STANDARD_BOSS_WAVES.indexOf(w) !== -1 && STANDARD_BOSS_MODES.indexOf(modeSelect.value) !== -1 ? ' (Boss)' : '');
        waveSelect.appendChild(opt);
      }
      waveSelect.value = Math.min(prev, mode.waves);
      updateSettingsForMode();
    }

    // ---- Items dropdown, grouped by tier (checklist inside a toggle) ---
    var itemsWrap = document.createElement('div');
    itemsWrap.className = 'ipc-items-wrap';

    var itemsToggle = document.createElement('button');
    itemsToggle.type = 'button';
    itemsToggle.className = 'ipc-items-toggle';
    itemsToggle.textContent = 'Select items \u25BE';

    var itemsPanel = document.createElement('div');
    itemsPanel.className = 'ipc-items-panel';
    itemsPanel.style.display = 'none';

    var checkboxes = [];

    Object.keys(ITEM_TIERS).forEach(function (tierName) {
      var tierHeader = document.createElement('div');
      tierHeader.className = 'ipc-tier-header';
      tierHeader.textContent = tierName;
      itemsPanel.appendChild(tierHeader);

      ITEM_TIERS[tierName].forEach(function (item) {
        var row = document.createElement('label');
        row.className = 'ipc-item-row';

        var cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.value = item.cost;
        cb.setAttribute('data-name', item.name);
        cb.addEventListener('change', refreshItemsSummary);
        checkboxes.push(cb);

        var text = document.createElement('span');
        text.textContent = ' ' + item.name + ' \u2014 ' + fmt(item.cost) + ' Coins';

        row.appendChild(cb);
        row.appendChild(text);
        itemsPanel.appendChild(row);
      });
    });

    itemsToggle.addEventListener('click', function () {
      itemsPanel.style.display = itemsPanel.style.display === 'none' ? 'block' : 'none';
    });
    document.addEventListener('click', function (e) {
      if (!itemsWrap.contains(e.target)) itemsPanel.style.display = 'none';
    });

    itemsWrap.appendChild(itemsToggle);
    itemsWrap.appendChild(itemsPanel);
    itemsSpan.appendChild(itemsWrap);

    function refreshItemsSummary() {
      var picked = checkboxes.filter(function (cb) { return cb.checked; });
      itemsToggle.textContent = (picked.length === 0 ? 'Select items' : picked.length + ' item' + (picked.length === 1 ? '' : 's') + ' selected') + ' \u25BE';
      var total = picked.reduce(function (sum, cb) { return sum + Number(cb.value); }, 0);
      coinOutputSpan.textContent = fmt(total);
    }

    // ---- Extra "Coin Settings" row, inserted right above Current Coins -
    var currentCoinsRow = currentCoinsSpan.closest ? currentCoinsSpan.closest('tr') : null;
    var settingsRow = document.createElement('tr');
    var settingsHeader = document.createElement('th');
    settingsHeader.textContent = 'Coin Settings:';
    var settingsCell = document.createElement('td');
    settingsCell.className = 'ipc-settings-cell';

    function labeledNumber(labelText, defaultValue, width) {
      var wrap = document.createElement('div');
      wrap.className = 'ipc-setting';
      var label = document.createElement('label');
      label.textContent = labelText + ' ';
      var input = document.createElement('input');
      input.type = 'number';
      input.value = defaultValue;
      input.min = 0;
      input.style.width = (width || 70) + 'px';
      label.appendChild(input);
      wrap.appendChild(label);
      return { wrap: wrap, input: input };
    }

    function labeledCheckbox(labelText, checked) {
      var wrap = document.createElement('div');
      wrap.className = 'ipc-setting';
      var label = document.createElement('label');
      var input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = !!checked;
      label.appendChild(input);
      label.appendChild(document.createTextNode(' ' + labelText));
      wrap.appendChild(label);
      return { wrap: wrap, input: input };
    }
    function labeledSelect(labelText, options) {
      var wrap = document.createElement('div');
      wrap.className = 'ipc-setting';
      var label = document.createElement('label');
      label.textContent = labelText + ' ';
      var select = document.createElement('select');
      options.forEach(function (o) {
        var opt = document.createElement('option');
        opt.value = o; opt.textContent = o;
        select.appendChild(opt);
      });
      label.appendChild(select);
      wrap.appendChild(label);
      return { wrap: wrap, input: select };
    }

    var baseCoins = labeledNumber('Base Coins / Wave:', 50);
    var speedrunTier = labeledSelect('Speedrun Tier:', SPEEDRUN_TIERS);
    var xpBoost = labeledCheckbox('XP Boost active');
    var xpValue = labeledNumber('XP Bonus (%):', MODES[modeSelect.value].xpPct);

    [baseCoins, speedrunTier, xpBoost, xpValue].forEach(function (s) {
      settingsCell.appendChild(s.wrap);
    });

    var speedrunHint = document.createElement('div');
    speedrunHint.className = 'ipc-note';
    settingsCell.appendChild(speedrunHint);

    var note = document.createElement('div');
    note.className = 'ipc-note';
    note.textContent = 'Base Coins / Wave is a placeholder (not published on the wiki) \u2014 edit it to match what you actually earn in-game. Speedrun rewards are the game\u2019s real per-boss values. Boss Bonus isn\u2019t modeled yet.';
    settingsCell.appendChild(note);

    settingsRow.appendChild(settingsHeader);
    settingsRow.appendChild(settingsCell);

    if (currentCoinsRow && currentCoinsRow.parentNode) {
      currentCoinsRow.parentNode.insertBefore(settingsRow, currentCoinsRow);
    }

    function bossesUpTo(wave) {
      return STANDARD_BOSS_WAVES.filter(function (w) { return w <= wave; }).map(function (w) { return BOSS_BY_WAVE[w]; });
    }

    function computeSpeedrunCoins(mode, wave, tier) {
      if (!MODES[mode].speedrun || tier === 'None') return 0;
      if (STANDARD_BOSS_MODES.indexOf(mode) === -1) return 0;
      return bossesUpTo(wave).reduce(function (sum, boss) {
        return sum + SPEEDRUN_REWARDS[boss][tier];
      }, 0);
    }

    function updateSettingsForMode() {
      var mode = modeSelect.value;
      var wave = parseInt(waveSelect.value, 10) || 1;
      xpValue.input.value = MODES[mode].xpPct;
      speedrunTier.input.disabled = !MODES[mode].speedrun;
      if (!MODES[mode].speedrun) speedrunTier.input.value = 'None';

      var bosses = STANDARD_BOSS_MODES.indexOf(mode) !== -1 ? bossesUpTo(wave) : [];
      if (!MODES[mode].speedrun) {
        speedrunHint.textContent = 'Speedrun Timer is disabled in this mode.';
      } else if (bosses.length === 0) {
        speedrunHint.textContent = 'No bosses reached yet at Wave ' + wave + '.';
      } else {
        speedrunHint.textContent = 'Bosses counted (Wave \u2264 ' + wave + '): ' + bosses.join(', ') + '.';
      }
    }

    modeSelect.addEventListener('change', function () {
      rebuildWaves();
      updateSettingsForMode();
    });
    waveSelect.addEventListener('change', updateSettingsForMode);
    speedrunTier.input.addEventListener('change', updateSettingsForMode);

    rebuildWaves();
    updateSettingsForMode();

    // ---- Calculate ------------------------------------------------------
    calcBtn.addEventListener('click', function () {
      var mode = MODES[modeSelect.value];
      var modeName = modeSelect.value;
      var wave = parseInt(waveSelect.value, 10) || 1;

      var wageIncome = wave * Number(baseCoins.input.value) * (mode.coinPct / 100);
      var speedrunCoins = computeSpeedrunCoins(modeName, wave, speedrunTier.input.value);
      var xpCoins = xpBoost.input.checked ? Number(xpValue.input.value) * 4 : 0; // XP Bonus is multiplied by 4

      var total = wageIncome + speedrunCoins + xpCoins;
      currentCoinsSpan.textContent = fmt(total);

      refreshItemsSummary();

      var cost = checkboxes.filter(function (cb) { return cb.checked; })
        .reduce(function (sum, cb) { return sum + Number(cb.value); }, 0);

      currentCoinsSpan.style.color = total >= cost ? '#1a9e46' : '#c0392b';
    });

    refreshItemsSummary();
  }
})();