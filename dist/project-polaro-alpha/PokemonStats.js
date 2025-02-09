$(function(){
  // Insert the level modifier input box into the container (placed in the Lua output above the table)
  var controls = '<div id="stat-controls" style="margin-top:1em;">' +
      '<label for="pokemon-level">Level: </label>' +
      '<input type="number" id="pokemon-level" class="pokemon-level-input" placeholder="100" value="100" min="1" max="100">' +
      '</div>';
  $("#stat-controls-container").html(controls);
  
  var $level = $("#pokemon-level"),
      prevLevel = parseInt($level.val(),10) || 100;
  
  function calcHP(base, level, iv, ev) {
    return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
  }
  function calcStat(base, level, iv, ev, nature) {
    return Math.floor((Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5) * nature);
  }
  
  function flashStats(className) {
    $("#hp_min, #hp_max, #atk_min, #atk_max, #def_min, #def_max, #spa_min, #spa_max, #spd_min, #spd_max, #spe_min, #spe_max")
      .addClass(className)
      .one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
          $(this).removeClass(className);
      });
  }
  
  function recalcStats(){
    var lvl = parseInt($level.val(), 10) || 100;
    if(lvl > 100){ $level.val(100); lvl = 100; }
    lvl = Math.max(1, lvl);
    $("#stat_range_level").text(lvl);
    if(lvl > prevLevel){
      flashStats("flash-green");
    } else if(lvl < prevLevel){
      flashStats("flash-red");
    }
    prevLevel = lvl;
    
    // Fixed parameters.
    var minIV = 0, minEV = 0, minNature = 0.9;
    var maxIV = 31, maxEV = 252, maxNature = 1.1;
    
    var baseHP = parseInt($("#hp_base").text(),10),
        baseAtk = parseInt($("#atk_base").text(),10),
        baseDef = parseInt($("#def_base").text(),10),
        baseSpa = parseInt($("#spa_base").text(),10),
        baseSpd = parseInt($("#spd_base").text(),10),
        baseSpe = parseInt($("#spe_base").text(),10);
    
    var hpMin = calcHP(baseHP, lvl, minIV, minEV),
        hpMax = calcHP(baseHP, lvl, maxIV, maxEV),
        atkMin = calcStat(baseAtk, lvl, minIV, minEV, minNature),
        atkMax = calcStat(baseAtk, lvl, maxIV, maxEV, maxNature),
        defMin = calcStat(baseDef, lvl, minIV, minEV, minNature),
        defMax = calcStat(baseDef, lvl, maxIV, maxEV, maxNature),
        spaMin = calcStat(baseSpa, lvl, minIV, minEV, minNature),
        spaMax = calcStat(baseSpa, lvl, maxIV, maxEV, maxNature),
        spdMin = calcStat(baseSpd, lvl, minIV, minEV, minNature),
        spdMax = calcStat(baseSpd, lvl, maxIV, maxEV, maxNature),
        speMin = calcStat(baseSpe, lvl, minIV, minEV, minNature),
        speMax = calcStat(baseSpe, lvl, maxIV, maxEV, maxNature);
    
    $("#hp_min").text(hpMin); $("#hp_max").text(hpMax);
    $("#atk_min").text(atkMin); $("#atk_max").text(atkMax);
    $("#def_min").text(defMin); $("#def_max").text(defMax);
    $("#spa_min").text(spaMin); $("#spa_max").text(spaMax);
    $("#spd_min").text(spdMin); $("#spd_max").text(spdMax);
    $("#spe_min").text(speMin); $("#spe_max").text(speMax);
  }
  
  $level.on("input", recalcStats);
  recalcStats();
});