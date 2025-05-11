$(function () {
  function getVisibleContext() {
    return $(".tabber__panel:visible, .wds-tab__content:visible").first();
  }

  function init() {
    var $context = getVisibleContext();
    if (!$context.length) return;

    var controls = '<div id="stat-controls" style="margin-top:1em;">' +
      '<label for="pokemon-level">Level: </label>' +
      '<input type="number" id="pokemon-level" class="pokemon-level-input" placeholder="100" value="100" min="1" max="100">' +
      '</div>';
    $context.find("#stat-controls-container").html(controls);

    var $level = $context.find("#pokemon-level"),
        prevLevel = parseInt($level.val(), 10) || 100;

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
      var lvl = parseInt($level.val(), 10) || 100;
      if (lvl > 100) { $level.val(100); lvl = 100; }
      lvl = Math.max(1, lvl);
      $context.find("#stat_range_level").text(lvl);

      if (lvl > prevLevel) {
        flashStats("flash-green");
      } else if (lvl < prevLevel) {
        flashStats("flash-red");
      }

      prevLevel = lvl;

      var minIV = 0, minEV = 0, minNature = 0.9;
      var maxIV = 31, maxEV = 252, maxNature = 1.1;

      var baseHP = parseInt($context.find("#hp_base").text(), 10),
          baseAtk = parseInt($context.find("#atk_base").text(), 10),
          baseDef = parseInt($context.find("#def_base").text(), 10),
          baseSpa = parseInt($context.find("#spa_base").text(), 10),
          baseSpd = parseInt($context.find("#spd_base").text(), 10),
          baseSpe = parseInt($context.find("#spe_base").text(), 10);

      $context.find("#hp_min").text(calcHP(baseHP, lvl, minIV, minEV));
      $context.find("#hp_max").text(calcHP(baseHP, lvl, maxIV, maxEV));
      $context.find("#atk_min").text(calcStat(baseAtk, lvl, minIV, minEV, minNature));
      $context.find("#atk_max").text(calcStat(baseAtk, lvl, maxIV, maxEV, maxNature));
      $context.find("#def_min").text(calcStat(baseDef, lvl, minIV, minEV, minNature));
      $context.find("#def_max").text(calcStat(baseDef, lvl, maxIV, maxEV, maxNature));
      $context.find("#spa_min").text(calcStat(baseSpa, lvl, minIV, minEV, minNature));
      $context.find("#spa_max").text(calcStat(baseSpa, lvl, maxIV, maxEV, maxNature));
      $context.find("#spd_min").text(calcStat(baseSpd, lvl, minIV, minEV, minNature));
      $context.find("#spd_max").text(calcStat(baseSpd, lvl, maxIV, maxEV, maxNature));
      $context.find("#spe_min").text(calcStat(baseSpe, lvl, minIV, minEV, minNature));
      $context.find("#spe_max").text(calcStat(baseSpe, lvl, maxIV, maxEV, maxNature));
    }

    $level.on("input", recalcStats);
    recalcStats();
  }

  // Initial run
  init();

  // Detect tab change
  $(document).on("click", ".wds-tabs__tab", function () {
    setTimeout(init, 50);
  });
});