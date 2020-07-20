(function() {
  //GolemShards
  var myElement = document.getElementById('GolemShards');
  if (myElement !== null) {
    myElement.innerHTML = '<p>Boss Stage: <input type="numbers" id="BossStage" value="1" onkeyup="GolemShards()"/><br>Boss Level: <input type="numbers" id="BossLevel" value="1" onkeyup="GolemShards()"/></p><input type="button" value="calculate" onclick="GolemShards()"/><p id="output"></p>';
  }
  //GolemXP
  var myXP = document.getElementById('XPOutput');
  if (myXP !== null) {
    myXP.innerHTML = '<table><tr><td>Sword Level:</td><td><select name="SwordLevel" id="sLevel"><option value="1">No Bonus by Sword</option><option value="1.2">Level 2</option><option value="1.3">Level 3</option><option value="1.5">Level 4</option><option value="2">Level 5 </option></select></td></tr><tr><td>Hero experience:</td><td><select name="HeroXP" id="HeroXPLVL"><option value="1">No Hero XP Skill</option><option value="1.1">Level 1</option><option value="1.2">Level 2</option><option value="1.3">Level 3</option><option value="1.4">Level 4</option><option value="1.5">Level 5</option><option value="1.6">Level 6</option><option value="1.7">Level 7</option><option value="1.8">Level 8</option><option value="1.9">Level 9</option><option value="2">Level 10</option></select></td></tr><tr><td>Heavenly Light Active ?</td><td><input type="checkbox" id="HL" /></td></tr><tr><td>Golem Level:</td><td><input type="numbers" id="gLevel" value="0" onkeyup="GolemXP()"/></td></tr><tr><td><input type="button" value="calculate" onclick="GolemXP()" /></td></tr></table><br><p id = "XPResult"> </p>';
  }
}());

function GolemShards() {
  var GolemBossStage = parseInt(document.getElementById("BossStage").value);
  var GolemBossLevel = parseInt(document.getElementById("BossLevel").value);
  var GolemBossStageMod;
  var GolemBossLevelMod;
  var GolemResult = 0;

  //StageMultiplier
  if (GolemBossStage >= 4) {
    GolemBossStageMod = GolemBossStage * (GolemBossStage - 1) * (GolemBossStage - 2);
  } else if (GolemBossStage > 1 && GolemBossStage < 5) {
    GolemBossStageMod = Math.pow(2, GolemBossStage);
  } else {
    GolemBossStageMod = 1;
  }
  //BossLevelMulti
  GolemBossLevelMod = Math.floor(GolemBossLevel / 10) * (Math.floor(GolemBossLevel / 10) + 1) / 2;
  GolemBossLevelMod = GolemBossLevelMod + (GolemBossLevel % 10) * (Math.floor((GolemBossLevel / 10) + 1) * 0.1);
  if (GolemBossStage == 3) {
  	GolemResult = GolemBossLevelMod * GolemBossStageMod + GolemBossLevelMod;
  } else {
  GolemResult = GolemBossStageMod * GolemBossLevelMod;
  }
  var OutPut = document.getElementById("output");
  if (GolemBossStage <= 2 || GolemBossStage <= 4) {
    OutPut.innerHTML = "Shards you will get: " + Math.ceil(GolemResult);
  } else {
    OutPut.innerHTML = "Shards you will get: " + Math.round(GolemResult);
  }
}

function GolemXP() {
  var GolemLevel = parseFloat(document.getElementById("gLevel").value);
  var GolemTier = 0;
  var GolemXPCalc = 0;
  var HeroXPLVL = parseFloat(document.getElementById("HeroXPLVL").value);
  var SwordLevel = parseFloat(document.getElementById("sLevel").value);
  var HLactive = document.getElementById("HL").checked;
  //calculation
  GolemTier = Math.floor(((GolemLevel - 1) / 10) + 1);
  GolemXPCalc = Math.floor(Math.pow(2.1, GolemLevel - 1) * GolemTier);
  GolemXPCalc *= SwordLevel;
  GolemXPCalc *= HeroXPLVL;
  if (HLactive === true) {
    GolemXPCalc *= 2;
  }
  GolemXPCalc = Math.floor(GolemXPCalc);

  //output
  var OutPut = document.getElementById("XPResult");
  OutPut.innerHTML = "you will get: " + GolemXPCalc.toExponential(2) + " XP per kill";
}