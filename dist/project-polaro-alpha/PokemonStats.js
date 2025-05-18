/*
 *	→ Adds a level input box to Pokémon stat tables (via #stat-controls-container).
 *	→ Recalculates stat ranges (min/max values) based on the chosen level input box.
 *	→ Works on both:
 *	↳	→ Pages with <tabber>.
 *	↳	→ Pages without <tabbers>.
 *	→ Re-initializes when a tab is clicked.
 *	→ Automatically skips if the container isn't found in the current context.
 *	→ Applies a visual flash to stat values when level changes (green/red).
 */

$(function () {
  function insertControls($container) {
    const controls = `
      <div id="stat-controls" style="margin-top:1em;">
        <label for="pokemon-level">Level: </label>
        <input type="number" id="pokemon-level" class="pokemon-level-input" placeholder="100" value="100" min="1" max="100">
      </div>
    `;
    $container.html(controls);
  }

  function setupStatLogic($context) {
    const $level = $context.find("#pokemon-level");
    if (!$level.length) return;

    let prevLevel = parseInt($level.val(), 10) || 100;

    function calcHP(base, level, iv, ev) {
      return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
    }

    function calcStat(base, level, iv, ev, nature) {
      return Math.floor((Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5) * nature);
    }

    function flashStats(className) {
      $context.find("#hp_min, #hp_max, #atk_min, #atk_max, #def_min, #def_max, #spa_min, #spa_max, #spd_min, #spd_max, #spe_min, #spe_max")
        .addClass(className)
        .one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
          $(this).removeClass(className);
        });
    }

    function recalcStats() {
      let lvl = parseInt($level.val(), 10) || 100;
      if (lvl > 100) { $level.val(100); lvl = 100; }
      lvl = Math.max(1, lvl);
      $context.find("#stat_range_level").text(lvl);

      if (lvl > prevLevel) flashStats("flash-green");
      else if (lvl < prevLevel) flashStats("flash-red");
      prevLevel = lvl;

      const minIV = 0, minEV = 0, minNature = 0.9;
      const maxIV = 31, maxEV = 252, maxNature = 1.1;

      function get(stat) {
        return parseInt($context.find(`#${stat}_base`).text(), 10);
      }

      $context.find("#hp_min").text(calcHP(get("hp"), lvl, minIV, minEV));
      $context.find("#hp_max").text(calcHP(get("hp"), lvl, maxIV, maxEV));
      $context.find("#atk_min").text(calcStat(get("atk"), lvl, minIV, minEV, minNature));
      $context.find("#atk_max").text(calcStat(get("atk"), lvl, maxIV, maxEV, maxNature));
      $context.find("#def_min").text(calcStat(get("def"), lvl, minIV, minEV, minNature));
      $context.find("#def_max").text(calcStat(get("def"), lvl, maxIV, maxEV, maxNature));
      $context.find("#spa_min").text(calcStat(get("spa"), lvl, minIV, minEV, minNature));
      $context.find("#spa_max").text(calcStat(get("spa"), lvl, maxIV, maxEV, maxNature));
      $context.find("#spd_min").text(calcStat(get("spd"), lvl, minIV, minEV, minNature));
      $context.find("#spd_max").text(calcStat(get("spd"), lvl, maxIV, maxEV, maxNature));
      $context.find("#spe_min").text(calcStat(get("spe"), lvl, minIV, minEV, minNature));
      $context.find("#spe_max").text(calcStat(get("spe"), lvl, maxIV, maxEV, maxNature));
    }

    $level.on("input", recalcStats);
    recalcStats();
  }

  function initIn($context) {
    const $container = $context.find("#stat-controls-container");
    if (!$container.length) return;
    insertControls($container);
    setupStatLogic($context);
  }

  // Run once for the regular page
  initIn($(document));

  // And once for every visible tab panel
  $(".tabber__panel:visible, .wds-tab__content:visible").each(function () {
    initIn($(this));
  });

  // Re-init on tab click
  $(document).on("click", ".wds-tabs__tab", function () {
    setTimeout(() => {
      $(".tabber__panel:visible, .wds-tab__content:visible").each(function () {
        initIn($(this));
      });
    }, 50);
  });
});