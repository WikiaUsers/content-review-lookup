/* ----------------------------------------------------------------- */
/* ---------- JAVASCRIPT FILE FOR THE FABLED LEGACY WIKI ----------- */
/* ----------- FABLED LEGACY WIKI EXPERIENCE CALCULATOR ------------ */
/* ----------------------------------------------------------------- */

/* ------------------------Table of Contents------------------------ */
/* 1. Creating the exp calculator ---------------------------------- */
/* 2. Adding the exp calculator ------------------------------------ */
/* 2.1. Options for the select input fields ------------------------ */
/* 2.2. Input fields and checkboxes -------------------------------- */
/* 2.3. Calculator Button ------------------------------------------ */
/* 2.4. Calculation Results ---------------------------------------- */


/* --------- 1 --------- */
/* Creating the exp calculator */
const experienceCalculator = document.getElementById("experienceCalculator");

function createRow(spaceID = '', hidden = false) {
  var rowSpacing = document.createElement('div');
  rowSpacing.className = 'exp-calculator-spacing';
  if (spaceID) rowSpacing.id = spaceID;
  if (experienceCalculator.children.length == 0) {
    rowSpacing.style.marginTop = '15px';
  }
  if (hidden) rowSpacing.style.display = 'none';
  return rowSpacing;
}

function createInputField({ labelText, inputFieldID, type = 'number', min = 1, max = 500, placeholder = '' }) {
  var rowSpacing = createRow();
  var label = document.createElement('label');
  label.textContent = `${labelText}: `;

  var input = document.createElement('input');
  input.type = type;
  input.className = 'exp-calculator-inputField';
  input.id = inputFieldID;
  input.min = min;
  input.max = max;
  input.style.width = '70px';
  if (placeholder) input.placeholder = placeholder;

  rowSpacing.append(label, input);
  experienceCalculator.append(rowSpacing);
}

function createSelectField({ labelText, selectFieldID, options, nameKey = 'label', valueKey = 'value' }) {
  var rowSpacing = createRow();
  var label = document.createElement('label');
  label.textContent = `${labelText}: `;

  var select = document.createElement('select');
  select.className = 'exp-calculator-inputField';
  select.id = selectFieldID;

  options.forEach(opt => {
    var option = document.createElement('option');
    option.value = opt[valueKey];
    option.textContent = opt[nameKey];
    select.append(option);
  });

  rowSpacing.append(label, select);
  experienceCalculator.append(rowSpacing);
}

function createCheckbox({ labelText, checkboxID, boostValue, hidden = false }) {
  var rowSpacing = createRow(`${checkboxID}-exp-calculator-spacing`, hidden);
  
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = checkboxID;
  checkbox.dataset.boost = boostValue;
  checkbox.style.width = 'auto';
  checkbox.style.marginRight = '8px';

  var label = document.createElement('label');
  label.htmlFor = checkboxID;
  label.innerHTML = `${labelText} (+${Math.round(boostValue * 100)}% EXP)`;

  rowSpacing.append(checkbox, label);
  experienceCalculator.append(rowSpacing);
}



/* --------- 2 --------- */
/* Adding the exp calculator */

/* -------- 2.1 -------- */
/* Options for the select input fields */
var dungeonList = [
  { name: "Raided Village: Normal", baseEXP: 283 },
  { name: "Raided Village: Expert", baseEXP: 416 },
  { name: "Raided Village: Chaos", baseEXP: 672 },
  { name: "Sunken Fortress: Normal", baseEXP: 1923 },
  { name: "Sunken Fortress: Expert", baseEXP: 3390 },
  { name: "Sunken Fortress: Chaos", baseEXP: 8175 },
  { name: "Cursed Marshes: Normal", baseEXP: 23275 },
  { name: "Cursed Marshes: Expert", baseEXP: 46550 },
  { name: "Cursed Marshes: Chaos", baseEXP: 119000 },
  { name: "Ragnarök's Descent: Normal", baseEXP: 341000 },
  { name: "Ragnarök's Descent: Expert", baseEXP: 682000 },
  { name: "Ragnarök's Descent: Chaos", baseEXP: 1820000 },
  { name: "Thundering Peaks: Normal", baseEXP: 5120000 },
  { name: "Thundering Peaks: Expert", baseEXP: 10240000 },
  { name: "Thundering Peaks: Chaos", baseEXP: 30100000 },
  { name: "Fallen Paradise: Normal", baseEXP: 79000000 },
  { name: "Fallen Paradise: Expert", baseEXP: 158000000 },
  { name: "Fallen Paradise: Chaos", baseEXP: 346000000 },
  { name: "Eternal Domain: Normal", baseEXP: 1075000000 },
  { name: "Eternal Domain: Expert", baseEXP: 2150000000 },
  { name: "Eternal Domain: Chaos", baseEXP: 5650000000 },
  { name: "Stardust Citadel: Normal", baseEXP: 15900000000 },
  { name: "Stardust Citadel: Expert", baseEXP: 31800000000 },
  { name: "Stardust Citadel: Chaos", baseEXP: 87400000000 },
  { name: "Ethereal Farlands: Normal", baseEXP: 274000000000 },
  { name: "Ethereal Farlands: Expert", baseEXP: 548000000000 },
  { name: "Ethereal Farlands: Chaos", baseEXP: 1145000000000 },
  { name: "Hellbound Sanctum: Normal", baseEXP: 3000000000000 },
  { name: "Hellbound Sanctum: Expert", baseEXP: 6000000000000 },
  { name: "Hellbound Sanctum: Chaos", baseEXP: 14100000000000 },
  { name: "Forsaken Limbo: Normal", baseEXP: 39300000000000 },
  { name: "Forsaken Limbo: Expert", baseEXP: 78600000000000 },
  { name: "Forsaken Limbo: Chaos", baseEXP: 143000000000000 },
  { name: "Neon District: Normal", baseEXP: 399000000000000 },
  { name: "Neon District: Expert", baseEXP: 798000000000000 },
  { name: "Neon District: Chaos", baseEXP: 1104000000000000 }
];
  
var weaponPerks = [
  { perkName: "None", perkBonus: "0" },
  { perkName: "Arcanist I (+1% EXP)", perkBonus: "0.01" },
  { perkName: "Arcanist II (+2% EXP)", perkBonus: "0.02" },
  { perkName: "Arcanist III (+5% EXP)", perkBonus: "0.05" }
];

var guildLevels = [
  { guildLevel: "None", guildBonus: "0" },
  { guildLevel: "Level 1 (+2% EXP)", guildBonus: "0.02" },
  { guildLevel: "Level 2 (+4% EXP)", guildBonus: "0.04" },
  { guildLevel: "Level 3 (+6% EXP)", guildBonus: "0.06" },
  { guildLevel: "Level 4 (+8% EXP)", guildBonus: "0.08" },
  { guildLevel: "Level 5 (+10% EXP)", guildBonus: "0.1" }
];

var friendBoosts = [
  { friendAmount: "None", friendBonus: "0" },
  { friendAmount: "1 (+1% EXP)", friendBonus: "0.01" },
  { friendAmount: "2 (+2% EXP)", friendBonus: "0.02" },
  { friendAmount: "3 (+3% EXP)", friendBonus: "0.03" },
  { friendAmount: "4 (+4% EXP)", friendBonus: "0.04" },
  { friendAmount: "5 (+5% EXP)", friendBonus: "0.05" },
  { friendAmount: "6 (+6% EXP)", friendBonus: "0.06" },
  { friendAmount: "7 (+7% EXP)", friendBonus: "0.07" },
  { friendAmount: "8 (+8% EXP)", friendBonus: "0.08" },
  { friendAmount: "9 (+9% EXP)", friendBonus: "0.09" },
  { friendAmount: "10 (+10% EXP)", friendBonus: "0.1" }
];

var dungeonModifiers = [
  { dungeonModifier: "None", EXPmultiplier: "1" },
  { dungeonModifier: "0.5x EXP", EXPmultiplier: "0.5" },
  { dungeonModifier: "1.25x EXP", EXPmultiplier: "1.25" },
  { dungeonModifier: "1.5x EXP", EXPmultiplier: "1.5" },
  { dungeonModifier: "2x EXP", EXPmultiplier: "2" },
  { dungeonModifier: "3x EXP", EXPmultiplier: "3" },
  { dungeonModifier: "4x EXP", EXPmultiplier: "4" }
];


/* -------- 2.2 -------- */
/* Input fields and checkboxes */

// Dungeons
createSelectField({
  labelText: "Select a Dungeon",
  selectFieldID: "dungeonExp",
  options: dungeonList,
  nameKey: "name",
  valueKey: "baseEXP"
});

// A checker of which dungeons support the calamity mode exp gain
document.getElementById('dungeonExp').onchange = function () {
  var selectedText = this.options[this.selectedIndex].text;
  var calamityRowSpacing = document.getElementById('calamityBoost-exp-calculator-spacing');

  var supportedChaosDungeons = ["Ragnarök's Descent: Chaos", "Thundering Peaks: Chaos", "Fallen Paradise: Chaos", "Eternal Domain: Chaos", "Stardust Citadel: Chaos", "Ethereal Farlands: Chaos", "Hellbound Sanctum: Chaos", "Forsaken Limbo: Chaos", "Neon District: Chaos"]; // Dungeons that support the calamity exp gain

  if (supportedChaosDungeons.includes(selectedText)) {
    calamityRowSpacing.style.display = 'block';
  } else {
    calamityRowSpacing.style.display = 'none';
    document.getElementById('calamityBoost').checked = false;
  }
};

// Current Level
createInputField({ labelText: "Current Level", inputFieldID: "currentLevel" });

// Goal Level
createInputField({ labelText: "Goal Level", inputFieldID: "goalLevel" });

// Run Time
createInputField({
  labelText: "Average Run Time (seconds)",
  inputFieldID: "avgTime",
  min: 25,
  max: 3600,
  placeholder: 60
});

// Boosts
createCheckbox({ labelText: '<span style="font-family: Verdana, Arial;" class="calamity">Calamity</span> Mode Enabled', checkboxID: 'calamityBoost', boostValue: 0.7, hidden: true });

createCheckbox({ labelText: '<span style="font-family: Verdana, Arial;" class="hardcore">Hardcore</span> Mode Enabled', checkboxID: 'hardcoreBoost', boostValue: 0.4, hidden: false });

createCheckbox({ labelText: 'With VIP Gamepass', checkboxID: 'VIPGamepass', boostValue: 0.2, hidden: false });

createCheckbox({ labelText: 'EXP Boost Enabled', checkboxID: 'EXPBoost', boostValue: 0.5, hidden: false });

createCheckbox({ labelText: 'Weekend Boost Enabled', checkboxID: 'weekendBoost', boostValue: 0.5, hidden: false });

createInputField({ labelText: "Bonus EXP on a Ring (%)", inputFieldID: "ringSubstatBoost", min: 0, max: 18, placeholder: "0" });
createSelectField({
  labelText: "Weapon Perk Bonus",
  selectFieldID: "weaponPerkBoost",
  options: weaponPerks,
  nameKey: "perkName",
  valueKey: "perkBonus"
});

createSelectField({
  labelText: "Guild EXP Bonus",
  selectFieldID: "guildExpBoost",
  options: guildLevels,
  nameKey: "guildLevel",
  valueKey: "guildBonus"
});

createSelectField({
  labelText: "Amount of Friends in-game",
  selectFieldID: "friendExpBoost",
  options: friendBoosts,
  nameKey: "friendAmount",
  valueKey: "friendBonus"
});

// Dungeon Modifiers
createSelectField({
  labelText: "Dungeon Modifier Bonus",
  selectFieldID: "dungeonModifierExpBoost",
  options: dungeonModifiers,
  nameKey: "dungeonModifier",
  valueKey: "EXPmultiplier"
});


/* -------- 2.3 -------- */
/* Calculator Button */
var calcBtn = document.createElement('button');
calcBtn.className = "exp-calculator-button";
calcBtn.textContent = "Calculate EXP and Runs";
experienceCalculator.append(calcBtn);


/* -------- 2.4 -------- */
/* Calculation Results */
var resultDiv = document.createElement('div');
resultDiv.id = "result";
resultDiv.className = "exp-calculator-result";
experienceCalculator.append(resultDiv);

// Exp required from current level to goal level
function calculateExp(currentLevel, goalLevel) {
  var exp = 0;
  for (var x = currentLevel; x < goalLevel; x++) {
    exp += Math.round(50 * Math.pow(1.15, x)); // Each level increases required exp by 15%
  }
  return exp;
}

// Shorten long numbers and add suffixes
function shortenNumber(num) {
  if (!isFinite(num)) return "infinite";
  if (num < 1e3) {
    return num.toLocaleString();
  }
  var suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "De"];
  var index = Math.floor(Math.log10(num) / 3);
  var suffixIndex = Math.min(index, suffixes.length - 1);
  var scaledNumber = num / Math.pow(10, suffixIndex * 3);
  var finalNumber = Math.floor(scaledNumber * 100) / 100;
  
  return finalNumber.toFixed(2).replace(/\.?0+$/, "") + suffixes[suffixIndex];
}

// Time formatting
function formatTime(time) {
  var Days = Math.floor(time / 86400);
  var Hours = Math.floor((time % 86400) / 3600);
  var Minutes = Math.floor((time % 3600) / 60);
  var Seconds = time % 60;

  if (Days >= 1) {
    averageTime = `${Days}d ${Hours}h ${Minutes}m ${Seconds}s`;
  } else if (Hours >= 1) {
    averageTime = `${Hours}h ${Minutes}m ${Seconds}s`;
  } else if (Minutes >= 1) {
    averageTime = `${Minutes}m ${Seconds}s`;
  } else {
    averageTime = `${Seconds}s`;
  }

  return averageTime;
}

// Show results by using the button
calcBtn.onclick = function () {
  var currentLevel = parseInt(document.getElementById('currentLevel').value);
  var goalLevel = parseInt(document.getElementById('goalLevel').value);
  var baseDungeonExp = parseInt(document.getElementById('dungeonExp').value);
  var weaponPerkBoost = parseFloat(document.getElementById('weaponPerkBoost').value) || 0;
  var ringSubstatBoost = parseFloat(document.getElementById('ringSubstatBoost').value) || 0;
  var guildExpBoost = parseFloat(document.getElementById('guildExpBoost').value) || 0;
  var friendExpBoost = parseFloat(document.getElementById('friendExpBoost').value) || 0;
  var dungeonModifierExpBoost = parseFloat(document.getElementById('dungeonModifierExpBoost').value) || 0;
  
  var avgTime = parseInt(document.getElementById('avgTime').value || document.getElementById('avgTime').placeholder) || 0;
  
  // Error messages
  if (isNaN(currentLevel) || isNaN(goalLevel)) {
    resultDiv.className = "exp-calculator-result-error";
    resultDiv.innerHTML = `<b>Error!</b> Both current level and goal level must contain numbers.`;
    return;
  } else if (currentLevel < 1 || goalLevel < 1) {
    resultDiv.className = "exp-calculator-result-error";
    resultDiv.innerHTML = `<b>Error!</b> Levels cannot be lower than 1.`;
    return;
  } else if (currentLevel > 500 || goalLevel > 500) {
    resultDiv.className = "exp-calculator-result-error";
    resultDiv.innerHTML = `<b>Error!</b> Exceeded level cap! Levels cannot be higher than 500.`;
    return;
  } else if (currentLevel >= goalLevel) {
    resultDiv.className = "exp-calculator-result-error";
    resultDiv.innerHTML = `<b>Error!</b> Your goal level (${goalLevel}) cannot be equal or lower than your current level (${currentLevel}).`;
    return;
  } else if (avgTime < 25) {
    resultDiv.className = "exp-calculator-result-error";
    resultDiv.innerHTML = `<b>Error!</b> Average run time cannot be shorter than 25 seconds.`;
    return;
  } else if (avgTime > 3600) {
    resultDiv.className = "exp-calculator-result-error";
    resultDiv.innerHTML = `<b>Error!</b> Average run time cannot be longer than 1 hour.`;
    return;
  } else if (ringSubstatBoost > 18) {
    resultDiv.className = "exp-calculator-result-error";
    resultDiv.innerHTML = `<b>Error!</b> The Bonus EXP cannot be higher than 18%.`;
    return;
  } else if (ringSubstatBoost < 0) {
    resultDiv.className = "exp-calculator-result-error";
    resultDiv.innerHTML = `<b>Error!</b> The Bonus EXP cannot be lower than 0%.`;
    return;
  }

  var boostExp = 0;
  var expBoostBonus = 0;

  // Calamity mode Bonus
  var dungeonName = document.getElementById('dungeonExp').options[document.getElementById('dungeonExp').selectedIndex].text;
  var calamityCheckbox = document.getElementById('calamityBoost');
  if (calamityCheckbox && calamityCheckbox.checked) {
    if (dungeonName == "Ethereal Farlands: Chaos") {
      baseDungeonExp += 15000000000; // Add 3 additional "Crystalline Ballista" XP values (only spawn in calamity)
    } else if (dungeonName == "Forsaken Limbo: Chaos") {
      baseDungeonExp += 20000000000000; // Add "The Destined Death" XP value (only spawns in calamity)
    }
    boostExp += baseDungeonExp * parseFloat(calamityCheckbox.dataset.boost);
  }

  // Other boost Bonuses
  var boostCheckboxes = [
    'hardcoreBoost',
    'VIPGamepass',
    'weekendBoost'
  ];
  boostCheckboxes.forEach(checkboxID => {
    var checkbox = document.getElementById(checkboxID);
    if (checkbox && checkbox.checked) {
      boostExp += baseDungeonExp * parseFloat(checkbox.dataset.boost);
    }
  });

  // Experience Boost Bonus
  var expBoostCheckbox = document.getElementById('EXPBoost');
  if (expBoostCheckbox && expBoostCheckbox.checked) {
    expBoostBonus = baseDungeonExp * parseFloat(expBoostCheckbox.dataset.boost);
  }

  // Guild and Friend Bonuses
  boostExp += baseDungeonExp * guildExpBoost;
  boostExp += baseDungeonExp * friendExpBoost;


  /* Total Exp - Boosts stack like this:
  Base > Calamity > VIP > Hardcore > Weekend > Guild > Friend > Ring Substats + Weapon Perk > Experience Boost > Dungeon Modifier */
  var totalExp = ((baseDungeonExp + boostExp) * (1 + (ringSubstatBoost / 100) + weaponPerkBoost) + expBoostBonus) * dungeonModifierExpBoost;
  var requiredExp = calculateExp(currentLevel, goalLevel);
  var runsNeeded = Math.ceil(requiredExp / totalExp);
  
  // Total Required Time
  var totalAvgTime = runsNeeded * avgTime;

  // Publish the results if the calculation is successful
  var runText = runsNeeded == 1 ? "run" : "runs"; // Change "runs" to "run" if there's only one run needed
  resultDiv.className = "exp-calculator-result-success";
  resultDiv.innerHTML = `Experience needed from level ${currentLevel} to level ${goalLevel}: <b>${shortenNumber(requiredExp)}</b>.<br>The total experience gain from 1 run: <b>${shortenNumber(totalExp)}</b>.<br>You will need to complete at least <b>${runsNeeded.toLocaleString()}</b> ${runText} to reach your goal level.<br>You will need to take an average of <b>${formatTime(totalAvgTime)}</b> to reach your goal level.`;
};