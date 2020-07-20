//Unit Adepting table code

//Defenition of Select Menu's.
$( ".select-rank").append( "<label for='rank'>Rank:</label><select name='rank' id='rank'><option value='0'>Recruit</option><option value='1'>Trooper</option><option value='2'>Veteran</option><option value='3'>Expert</option><option value='4'>Elite</option></select>" );
 
$( ".select-race").append( "<label for='race'>Race:</label><select name='race' id='race'><option value='0'>None</option><option value='1'>Draconian</option><option value='2'>Dwarf</option><option value='3'>Frostling</option><option value='4'>Goblin</option><option value='5'>Halfling</option><option value='6'>High Elf</option><option value='7'>Human</option><option value='8'>Orc</option></select>" );
 
$( ".select-upgrade").append( "<label for='rank'>Upgrades:</label><select name='upgrade0' id='upgrade0'><option value='0'>None</option><option value='1'>Arcane Catalyst</option><option value='2'>Altar of Bound Souls</option><option value='3'>Blood Altar</option><option value='4'>Enchanted Armory</option><option value='5'>Flowrock Citadel</option><option value='6'>Focus Chamber</option><option value='7'>Mercenary Camp</option><option value='8'>Pillar of the Stylites</option><option value='9'>Slaughter Pits</option><option value='10'>Stables of Vigor</option></select><select name='upgrade1' id='upgrade1'><option value='0'>None</option><option value='1'>Arcane Catalyst</option><option value='2'>Altar of Bound Souls</option><option value='3'>Blood Altar</option><option value='4'>Enchanted Armory</option><option value='5'>Flowrock Citadel</option><option value='6'>Focus Chamber</option><option value='7'>Mercenary Camp</option><option value='8'>Pillar of the Stylites</option><option value='9'>Slaughter Pits</option><option value='10'>Stables of Vigor</option></select><select name='upgrade2' id='upgrade2'><option value='0'>None</option><option value='1'>Arcane Catalyst</option><option value='2'>Altar of Bound Souls</option><option value='3'>Blood Altar</option><option value='4'>Enchanted Armory</option><option value='5'>Flowrock Citadel</option><option value='6'>Focus Chamber</option><option value='7'>Mercenary Camp</option><option value='8'>Pillar of the Stylites</option><option value='9'>Slaughter Pits</option><option value='10'>Stables of Vigor</option></select>");
 
//prepare arrays of unit variables
UnitAmount = $('.template-unit').length;
unit = [];
unithealth = [];
unitdefense = [];
unitresistance = [];
unitMedal = [];
unitrank = [];
unitrace = [];
unitBaseHealth = [];
unitBaseDefense = [];
unitBaseResistance = [];
unitTier = [];
unitupgrade0 = [];
unitupgrade1 = [];
unitupgrade2 = [];
unitAllowUpgrades = [];
unitArcaneCatalyst = [];
unitAltarofboundSouls = [];
unitBloodAltar = [];
unitEnchantedArmory = [];
unitFlowrockCitadel = [];
unitFocusChamber = [];
unitMercenaryCamp = [];
unitPillaroftheStylites = [];
unitSlaughterPits = [];
unitStablesofVigor = [];
unitsize = [];
damage = [];
damageincrease = [];
DamageAmount = [];
element = [];
debug = [];
for (var c = 0 ; c < 6 ; c++ ) {//Transform damageincrease to an array of arrays, length = 6
damageincrease[c] = [0,0,0,0,0];
}
 
//This loop initializes all unit parameters
for(var i=0 ; i < UnitAmount ; i++ ) {
//Initial values for each unit
unit[i] = document.getElementsByClassName("template-unit")[i];
unithealth[i] = unit[i].getElementsByClassName("health")[0];
unitdefense[i] = unit[i].getElementsByClassName("defense")[0];
unitresistance[i] = unit[i].getElementsByClassName("resistance")[0];
unitMedal[i] = unit[i].getElementsByClassName("medal")[0];
unitBaseHealth[i] = unit[i].dataset.basehealth;
unitBaseDefense[i] = unit[i].dataset.basedefense;
unitBaseResistance[i] = unit[i].dataset.baseresistance;
unitTier[i] = unit[i].dataset.tier;
unitAllowUpgrades[i] = [];
//Index 0 is not used, since this equals to option 0(No upgrade)
unitAllowUpgrades[i][1] = unit[i].dataset.summoned;
unitAllowUpgrades[i][2] = unit[i].dataset.support;
unitAllowUpgrades[i][3] = unit[i].dataset.support;
unitAllowUpgrades[i][4] = unit[i].dataset.armored;
unitAllowUpgrades[i][5] = unit[i].dataset.machine;
unitAllowUpgrades[i][6] = unit[i].dataset.archer;
unitAllowUpgrades[i][7] = unit[i].dataset.irregular;
unitAllowUpgrades[i][8] = unit[i].dataset.pikeman;
unitAllowUpgrades[i][9] = unit[i].dataset.infantry;
unitAllowUpgrades[i][10] = unit[i].dataset.mounted;
unitsize[i] = unit[i].dataset.size;
unitrace[i] = unit[i].dataset.race;
unitrank[i] = unit[i].dataset.initrank;
unitupgrade0[i] = unit[i].dataset.initupg0;
unitupgrade1[i] = unit[i].dataset.initupg1;
unitupgrade2[i] = unit[i].dataset.initupg2;
unit[i].getElementsByClassName("select-rank")[0].getElementsByTagName("select")[0].value = unit[i].dataset.initrank;
unit[i].getElementsByClassName("select-race")[0].getElementsByTagName("select")[0].value = unit[i].dataset.race;
unit[i].getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[0].value = unit[i].dataset.initupg0;
unit[i].getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[1].value = unit[i].dataset.initupg1;
unit[i].getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[2].value = unit[i].dataset.initupg2;
DamageAmount[i] = $('.damage',unit[i]).length;
damage[i] = [];
for (var c = 0; c < DamageAmount[i] ; c++ ) {
  damage[i][c] = unit[i].getElementsByClassName("damage")[c];
  }
if (unitsize[i] === "small") {
  var j = $('.col2entry',unit[i]).length;
  var k = $('.important',unit[i]).length;
  var combo = k + DamageAmount[i];
  for(var c = combo; c < j; c++) {
    $(unit[i].getElementsByClassName("col2entry")[c]).addClass("hidden");
    }
  $(unit[i].getElementsByClassName("size")[0]).addClass("hidden");
  $(unit[i].getElementsByClassName("size")[1]).addClass("hidden");
  }
}
//End of Initializing loops

//Onchange event
$( ".template-unit select" ).change(function() {
forcerefresh ();
});

//This function is called by tooltips to assign variables to the unit within.
function processunit (UnitDiv) {
$( ".select-rank").append( "<label for='rank'>Rank:</label><select name='rank' id='rank'><option value='0'>Recruit</option><option value='1'>Trooper</option><option value='2'>Veteran</option><option value='3'>Expert</option><option value='4'>Elite</option></select>" );
$( ".select-race").append( "<label for='race'>Race:</label><select name='race' id='race'><option value='0'>None</option><option value='1'>Draconian</option><option value='2'>Dwarf</option><option value='3'>Frostling</option><option value='4'>Goblin</option><option value='5'>Halfling</option><option value='6'>High Elf</option><option value='7'>Human</option><option value='8'>Orc</option></select>" );
$( ".select-upgrade").append( "<label for='rank'>Upgrades:</label><select name='upgrade0' id='upgrade0'><option value='0'>None</option><option value='1'>Arcane Catalyst</option><option value='2'>Altar of Bound Souls</option><option value='3'>Blood Altar</option><option value='4'>Enchanted Armory</option><option value='5'>Flowrock Citadel</option><option value='6'>Focus Chamber</option><option value='7'>Mercenary Camp</option><option value='8'>Pillar of the Stylites</option><option value='9'>Slaughter Pits</option><option value='10'>Stables of Vigor</option></select><select name='upgrade1' id='upgrade1'><option value='0'>None</option><option value='1'>Arcane Catalyst</option><option value='2'>Altar of Bound Souls</option><option value='3'>Blood Altar</option><option value='4'>Enchanted Armory</option><option value='5'>Flowrock Citadel</option><option value='6'>Focus Chamber</option><option value='7'>Mercenary Camp</option><option value='8'>Pillar of the Stylites</option><option value='9'>Slaughter Pits</option><option value='10'>Stables of Vigor</option></select><select name='upgrade2' id='upgrade2'><option value='0'>None</option><option value='1'>Arcane Catalyst</option><option value='2'>Altar of Bound Souls</option><option value='3'>Blood Altar</option><option value='4'>Enchanted Armory</option><option value='5'>Flowrock Citadel</option><option value='6'>Focus Chamber</option><option value='7'>Mercenary Camp</option><option value='8'>Pillar of the Stylites</option><option value='9'>Slaughter Pits</option><option value='10'>Stables of Vigor</option></select>");
//Reading Parameters
var AllowUpgrades = [];
//Index 0 is not used, since this equals to option 0(No upgrade)
AllowUpgrades[1] = UnitDiv.dataset.summoned;
AllowUpgrades[2] = UnitDiv.dataset.support;
AllowUpgrades[3] = UnitDiv.dataset.support;
AllowUpgrades[4] = UnitDiv.dataset.armored;
AllowUpgrades[5] = UnitDiv.dataset.machine;
AllowUpgrades[6] = UnitDiv.dataset.archer;
AllowUpgrades[7] = UnitDiv.dataset.irregular;
AllowUpgrades[8] = UnitDiv.dataset.pikeman;
AllowUpgrades[9] = UnitDiv.dataset.infantry;
AllowUpgrades[10] = UnitDiv.dataset.mounted;
var Tier = UnitDiv.dataset.tier;
var size = UnitDiv.dataset.size;
var race = UnitDiv.dataset.race;
var rank = UnitDiv.dataset.initrank;
var upgrade0 = UnitDiv.dataset.initupg0;
var upgrade1 = UnitDiv.dataset.initupg1;
var upgrade2 = UnitDiv.dataset.initupg2;
UnitDiv.getElementsByClassName("select-rank")[0].getElementsByTagName("select")[0].value = UnitDiv.dataset.initrank;
UnitDiv.getElementsByClassName("select-race")[0].getElementsByTagName("select")[0].value = UnitDiv.dataset.race;
UnitDiv.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[0].value = UnitDiv.dataset.initupg0;
UnitDiv.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[1].value = UnitDiv.dataset.initupg1;
UnitDiv.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[2].value = UnitDiv.dataset.initupg2;
console.info("Tooltip Init complete, size = ", size);
console.info("Tier = ", Tier);
console.info("race = ", race);
console.info("rank = ", rank);
console.info("Allowed Upgrades: = ", AllowUpgrades);
console.info("Provided Upgrades: = ",upgrade0,upgrade1,upgrade2);
//Preparing Race
if (race === -1) {race = 0;}
console.info("Assigned race:", race);
//Creating Damage Values
var DamageAmount = $('.damage',UnitDiv).length;
console.info(DamageAmount, "Damage abilities detected");
var damage = [];
for (var c = 0; c < DamageAmount ; c++ ) {
  damage[c] = UnitDiv.getElementsByClassName("damage")[c];
  damageCalc(damage[c].getElementsByClassName("writedamage")[0],damage[c],UnitDiv)
  console.info("Damage abiltiy",c,"processed");
  }
if (size === "small") {
  var j = $('.col2entry',UnitDiv).length;
  var k = $('.important',UnitDiv).length;
  var combo = k + DamageAmount;
  for(var c = combo; c < j; c++) {
    $(UnitDiv.getElementsByClassName("col2entry")[c]).addClass("hidden");
    console.info("Ability",c,"hidden");
    }
  $(UnitDiv.getElementsByClassName("size")[0]).addClass("hidden");
  $(UnitDiv.getElementsByClassName("size")[1]).addClass("hidden");
  }
removeabilities (upgrade0, upgrade1, upgrade2, UnitDiv, rank, race, AllowUpgrades);
console.info("RemoveAbilities",upgrade0, upgrade1, upgrade2, UnitDiv, rank, race, AllowUpgrades);
addabilities (upgrade0, upgrade1, upgrade2, UnitDiv, rank, race, AllowUpgrades);
console.info("AddAbilities",upgrade0, upgrade1, upgrade2, UnitDiv, rank, race, AllowUpgrades);
}

//Functions
function forcerefresh () {
  for(var i=0 ; i < UnitAmount ; i++ ) {
    if (unit[i].dataset.race != -1) {
      unitrace[i] = parseInt(unit[i].getElementsByClassName("select-race")[0].getElementsByTagName("select")[0].value, 10);
    } else {
      unitrace[i] = 0;
    }
    unitrank[i] = parseInt(unit[i].getElementsByClassName("select-rank")[0].getElementsByTagName("select")[0].value, 10);
    unitupgrade0[i] = parseInt(unit[i].getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[0].value, 10);
    unitupgrade1[i] = parseInt(unit[i].getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[1].value, 10);
    unitupgrade2[i] = parseInt(unit[i].getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[2].value, 10);
    unitMedal[i].innerHTML = medalselect (unitrank[i]);
    unithealth[i].innerHTML = healthCalc (parseInt(unitBaseHealth[i], 10), unitrank[i], unitTier[i], unitupgrade0[i], unitupgrade1[i], unitupgrade2[i], unitAllowUpgrades[i], unitrace[i]);
    unitdefense[i].innerHTML = defenseCalc (parseInt(unitBaseDefense[i], 10), unitrank[i], unitupgrade0[i], unitupgrade1[i], unitupgrade2[i], unitAllowUpgrades[i], unitrace[i]);
    unitresistance[i].innerHTML = resistanceCalc (parseInt(unitBaseResistance[i], 10), unitrank[i], unitupgrade0[i], unitupgrade1[i], unitupgrade2[i], unitAllowUpgrades[i], unitrace[i]);
    removeabilities (unitupgrade0[i], unitupgrade1[i], unitupgrade2[i], unit[i], unitrank[i], unitrace[i], unitAllowUpgrades[i]);
    if (unitsize[i] != "small") {
      addabilities (unitupgrade0[i], unitupgrade1[i], unitupgrade2[i], unit[i], unitrank[i], unitrace[i], unitAllowUpgrades[i]);
    }
    for (var c = 0; c < DamageAmount[i] ; c++ ) {
      damageCalc(damage[i][c].getElementsByClassName("writedamage")[0],damage[i][c],unit[i]);
    }
  }
}

 
function damageCalc (WriteSpan, DamageDiv, UnitDiv) {
type = DamageDiv.dataset.type;
for (var i = 0 ; i < 6 ; i++ ) {
  for (var c = 0 ; c < 5 ; c++ ) {
    damageincrease[i][c] = 0;
  }
}
if ($(DamageDiv).attr('data-primary')) { //Set Primary Damage Channel(for irregulars with Mercenary)
  primary = DamageDiv.dataset.primary;
  } else {primary = 0;} //Default Primary channel
if ($(DamageDiv).attr('data-physical')) {
  element[0] = true;
  damageincrease[0][0] = DamageDiv.dataset.physical;
  damageincrease[0][1] = DamageDiv.dataset.physicaldaminc1;
  damageincrease[0][2] = DamageDiv.dataset.physicaldaminc2;
  damageincrease[0][3] = DamageDiv.dataset.physicaldaminc3;
  damageincrease[0][4] = DamageDiv.dataset.physicaldaminc4;
  } else {element[0] = false;}
if ($(DamageDiv).attr('data-spirit')) {
  element[1] = true;
  damageincrease[1][0] = DamageDiv.dataset.spirit;
  damageincrease[1][1] = DamageDiv.dataset.spiritdaminc1;
  damageincrease[1][2] = DamageDiv.dataset.spiritdaminc2;
  damageincrease[1][3] = DamageDiv.dataset.spiritdaminc3;
  damageincrease[1][4] = DamageDiv.dataset.spiritdaminc4;
  } else {element[1] = false;}
if ($(DamageDiv).attr('data-blight')) {
  element[2] = true;

  damageincrease[2][0] = DamageDiv.dataset.blight;
  damageincrease[2][1] = DamageDiv.dataset.blightdaminc1;
  damageincrease[2][2] = DamageDiv.dataset.blightdaminc2;
  damageincrease[2][3] = DamageDiv.dataset.blightdaminc3;
  damageincrease[2][4] = DamageDiv.dataset.blightdaminc4;
  } else {element[2] = false;}
if ($(DamageDiv).attr('data-fire')) {
  element[3] = true;
  damageincrease[3][0] = DamageDiv.dataset.fire;
  damageincrease[3][1] = DamageDiv.dataset.firedaminc1;
  damageincrease[3][2] = DamageDiv.dataset.firedaminc2;
  damageincrease[3][3] = DamageDiv.dataset.firedaminc3;
  damageincrease[3][4] = DamageDiv.dataset.firedaminc4;
  } else {element[3] = false;}
if ($(DamageDiv).attr('data-frost')) {
  element[4] = true;
  damageincrease[4][0] = DamageDiv.dataset.frost;
  damageincrease[4][1] = DamageDiv.dataset.frostdaminc1;
  damageincrease[4][2] = DamageDiv.dataset.frostdaminc2;
  damageincrease[4][3] = DamageDiv.dataset.frostdaminc3;
  damageincrease[4][4] = DamageDiv.dataset.frostdaminc4;
  } else {element[4] = false;}
if ($(DamageDiv).attr('data-shock')) {
  element[5] = true;
  damageincrease[5][0] = DamageDiv.dataset.shock;
  damageincrease[5][1] = DamageDiv.dataset.shockdaminc1;
  damageincrease[5][2] = DamageDiv.dataset.shockdaminc2;
  damageincrease[5][3] = DamageDiv.dataset.shockdaminc3;
  damageincrease[5][4] = DamageDiv.dataset.shockdaminc4;
  } else {element[5] = false;}
if (UnitDiv.dataset.race != -1) {//Exclude reading race for all non-racial different units.
  if (UnitDiv.dataset.race === -2) { race = -2;
    } else { 
      race = parseInt(UnitDiv.getElementsByClassName("select-race")[0].getElementsByTagName("select")[0].value, 10);
    } 
  } 
else { race = 0;}
rank = parseInt(UnitDiv.getElementsByClassName("select-rank")[0].getElementsByTagName("select")[0].value, 10);
mcu0 = parseInt(UnitDiv.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[0].value, 10);
mcu1 = parseInt(UnitDiv.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[1].value, 10);
mcu2 = parseInt(UnitDiv.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[2].value, 10);
//Start of Mystical City Upgrades
  if (UnitDiv.dataset.archer && (type == "ranged") && (mcu0 == 6 || mcu1 == 6 || mcu2 == 6)) {//Focus Chamber
       if (element[0]) { damageincrease[0][0] = parseInt(damageincrease[0][0], 10) +2; }
       else {damageincrease[0][0] = 2; element[0] = true; }
       if (element[5]) { damageincrease[5][0] = parseInt(damageincrease[5][0], 10) +1; }
       else {damageincrease[5][0] = 1; element[5] = true; }
  }
  if (UnitDiv.dataset.irregular && (type == "ranged") && (mcu0 == 7 || mcu1 == 7 || mcu2 == 7)) {//Mercenary Camp
       damageincrease[primary][0] = parseInt(damageincrease[primary][0], 10) + 1;
  }
  if (UnitDiv.dataset.irregular && (type == "melee") && (mcu0 == 7 || mcu1 == 7 || mcu2 == 7)) {//Mercenary Camp
       damageincrease[0][0] = parseInt(damageincrease[0][0], 10) + 1;
  }
  if (UnitDiv.dataset.pikeman && (type == "melee") && (mcu0 == 8 || mcu1 == 8 || mcu2 == 8)) {//Pillar of the Stylites
       if (element[1]) { damageincrease[1][0] = parseInt(damageincrease[1][0], 10) +2; }
       else {damageincrease[1][0] = 2; element[1] = true; }
  }
  if (UnitDiv.dataset.infantry && (type == "melee") && (mcu0 == 9 || mcu1 == 9 || mcu2 == 9)) {//Slaughter Pits
       damageincrease[0][0] = parseInt(damageincrease[0][0], 10) + 2;
  }
switch (race) {
   case -2://Case: Racial Elven Archer
       if (element[5]) {
         if (type == "ranged") {
            damageincrease[5][0] = parseInt(damageincrease[5][0], 10) + 1;
         } 
       }
   case 5://Case: race = halfling
       if (element[0]) {
           if (type == "melee") {
            damageincrease[0][0] = parseInt(damageincrease[0][0], 10) - 1;
           } else {
            damageincrease[0][0] = parseInt(damageincrease[0][0], 10) + 1;
           }
        }
        break;
   case 6://Race High Elf
       if (element[0]) {
         if (type == "ranged") {
            damageincrease[0][0] = parseInt(damageincrease[0][0], 10) + 1;
         } 
       }
       if (element[5]) {
         if (type == "ranged") {
            damageincrease[5][0] = parseInt(damageincrease[5][0], 10) + 1;
         } 
       }
       break;
   case 8:// Race Orc
       if (element[0]) {
         if (type == "ranged") {
            damageincrease[0][0] = parseInt(damageincrease[0][0], 10) - 1;
         }  else {
            damageincrease[0][0] = parseInt(damageincrease[0][0], 10) + 1;
         }
       }
       break;
   default:
       break;
     }//End Race Switch
if ($(WriteSpan.getElementsByClassName("physical")[0]).hasClass("hidden") && element[0] ) {
  $(WriteSpan.getElementsByClassName("physical")[0]).removeClass("hidden"); 
} else if (element[0] === false) {
  $(WriteSpan.getElementsByClassName("physical")[0]).addClass("hidden"); 
}
if ($(WriteSpan.getElementsByClassName("spirit")[0]).hasClass("hidden") && element[1] ) {
  $(WriteSpan.getElementsByClassName("spirit")[0]).removeClass("hidden"); 
} else if (element[1] === false) {
  $(WriteSpan.getElementsByClassName("spirit")[0]).addClass("hidden"); 
}
if ($(WriteSpan.getElementsByClassName("blight")[0]).hasClass("hidden") && element[2] ) {
  $(WriteSpan.getElementsByClassName("blight")[0]).removeClass("hidden"); 
} else if (element[2] === false) {
  $(WriteSpan.getElementsByClassName("blight")[0]).addClass("hidden"); 
}
if ($(WriteSpan.getElementsByClassName("fire")[0]).hasClass("hidden") && element[3] ) {
  $(WriteSpan.getElementsByClassName("fire")[0]).removeClass("hidden"); 
} else if (element[3] === false) {
  $(WriteSpan.getElementsByClassName("fire")[0]).addClass("hidden"); 
}
if ($(WriteSpan.getElementsByClassName("frost")[0]).hasClass("hidden") && element[4] ) {
  $(WriteSpan.getElementsByClassName("frost")[0]).removeClass("hidden"); 
} else if (element[4] === false) {
  $(WriteSpan.getElementsByClassName("frost")[0]).addClass("hidden"); 
}
if ($(WriteSpan.getElementsByClassName("shock")[0]).hasClass("hidden") && element[5] ) {
  $(WriteSpan.getElementsByClassName("shock")[0]).removeClass("hidden"); 
} else if (element[5] === false) {
  $(WriteSpan.getElementsByClassName("shock")[0]).addClass("hidden"); 
}
if (element[0]) {
  for (var c = temp = 0; c <= rank; c++ ) {
    temp = temp + parseInt(damageincrease[0][c], 10);
  }
  if (temp > 0) {
     WriteSpan.getElementsByClassName("physicalval")[0].innerHTML = temp;
  } else {
     $(WriteSpan.getElementsByClassName("physical")[0]).addClass("hidden"); 
  }
}
if (element[1]) {
  for (var c = temp = 0; c <= rank; c++ ) {
    temp = temp + parseInt(damageincrease[1][c], 10);
  }
  if (temp > 0) {
    WriteSpan.getElementsByClassName("spiritval")[0].innerHTML = temp;
  } else {
     $(WriteSpan.getElementsByClassName("spirit")[0]).addClass("hidden"); 
  }
}
if (element[2]) {
  for (var c = temp = 0; c <= rank; c++ ) {
    temp = temp + parseInt(damageincrease[2][c], 10);
  }
  if (temp > 0) {
    WriteSpan.getElementsByClassName("blightval")[0].innerHTML = temp;
  } else {
     $(WriteSpan.getElementsByClassName("blight")[0]).addClass("hidden"); 
  }
}
if (element[3]) {
  for (var c = temp = 0; c <= rank; c++ ) {
    temp = temp + parseInt(damageincrease[3][c], 10);
  }
  if (temp > 0) {
    WriteSpan.getElementsByClassName("fireval")[0].innerHTML = temp;
  } else {
     $(WriteSpan.getElementsByClassName("fire")[0]).addClass("hidden"); 
  }
}
if (element[4]) {
  for (var c = temp = 0; c <= rank; c++ ) {
    temp = temp + parseInt(damageincrease[4][c], 10);
  }
  if (temp > 0) {
    WriteSpan.getElementsByClassName("frostval")[0].innerHTML = temp;
  } else {
     $(WriteSpan.getElementsByClassName("frost")[0]).addClass("hidden"); 
  }
}
if (element[5]) {
  for (var c = temp = 0; c <= rank; c++ ) {
    temp = temp + parseInt(damageincrease[5][c], 10);
  }
  if (temp > 0) {
    WriteSpan.getElementsByClassName("shockval")[0].innerHTML = temp;
  } else {
     $(WriteSpan.getElementsByClassName("shock")[0]).addClass("hidden"); 
  }
}
}
 
function removeabilities (mcu0, mcu1, mcu2, UnitDiv, rank, race, allowed) {
   if (allowed[1] && (mcu0 == 1 || mcu1 == 1 || mcu2 == 1)) {//Arcane Catalyst
     } else{
           if ($(UnitDiv.getElementsByClassName("supercharged")[0]).hasClass("hidden") ===false) {
             $(UnitDiv.getElementsByClassName("supercharged")[0]).addClass("hidden"); }
     }
   if (allowed[2] && (mcu0 == 2 || mcu1 == 2 || mcu2 == 2)) {//Altar of bound Souls
     } else{
           if ($(UnitDiv.getElementsByClassName("boundsoul")[0]).hasClass("hidden") ===false) {
             $(UnitDiv.getElementsByClassName("resurgence")[0]).addClass("hidden"); 
             $(UnitDiv.getElementsByClassName("boundsoul")[0]).addClass("hidden"); }
     }
   if (allowed[3] && (mcu0 == 3 || mcu1 == 3 || mcu2 == 3)) {//Blood Altar
     } else{
           if ($(UnitDiv.getElementsByClassName("markbloodsacrifice")[0]).hasClass("hidden") ===false) {
             $(UnitDiv.getElementsByClassName("markbloodsacrifice")[0]).addClass("hidden"); }
     }
 
   if (allowed[4] && (mcu0 == 4 || mcu1 == 4 || mcu2 == 4)) {//Enchanted Armory
     } else{
           if ($(UnitDiv.getElementsByClassName("enchantedarmor")[0]).hasClass("hidden") ===false) {
             $(UnitDiv.getElementsByClassName("enchantedarmor")[0]).addClass("hidden"); }
     }
   if (allowed[5] && (mcu0 == 5 || mcu1 == 5 || mcu2 == 5)) {//Flowrock Citadel
     } else{
           if ($(UnitDiv.getElementsByClassName("flowrockmachinery")[0]).hasClass("hidden") ===false) {
             $(UnitDiv.getElementsByClassName("flowrockmachinery")[0]).addClass("hidden"); }
     }
  if (allowed[6] && (mcu0 == 6 || mcu1 == 6 || mcu2 == 6)) {//Focus Chamber
     } else{
           if ($(UnitDiv.getElementsByClassName("focused")[0]).hasClass("hidden") ===false) {
             $(UnitDiv.getElementsByClassName("focused")[0]).addClass("hidden"); 
             $(UnitDiv.getElementsByClassName("mindcontrolimmunity")[0]).addClass("hidden"); }
     }
       if (allowed[7] && (mcu0 == 7 || mcu1 == 7 || mcu2 == 7)) {//Mercenary Camp
     } else{
           if ($(UnitDiv.getElementsByClassName("mercenary")[0]).hasClass("hidden") ===false) {
             $(UnitDiv.getElementsByClassName("mercenary")[0]).addClass("hidden"); }
     }
       if (allowed[8] && (mcu0 == 8 || mcu1 == 8 || mcu2 == 8)) {//Pillar of the Stylites
     } else{
           if ($(UnitDiv.getElementsByClassName("stylite")[0]).hasClass("hidden") ===false) {
             $(UnitDiv.getElementsByClassName("stylite")[0]).addClass("hidden"); 
             $(UnitDiv.getElementsByClassName("projectileresistance")[0]).addClass("hidden"); }
     }
       if (allowed[9] && (mcu0 == 9 || mcu1 == 9 || mcu2 == 9)) {//Slaughter Pits
     } else{
           if ($(UnitDiv.getElementsByClassName("killingmomentum")[0]).hasClass("hidden") ===false) {
             $(UnitDiv.getElementsByClassName("killingmomentum")[0]).addClass("hidden"); }
     }
       if (allowed[10] && (mcu0 == 10 || mcu1 == 10 || mcu2 == 10)) {//Stables of Vigor
     } else{
           if ($(UnitDiv.getElementsByClassName("vigorousmount")[0]).hasClass("hidden") ===false) {
           $(UnitDiv.getElementsByClassName("vigorousmount")[0]).addClass("hidden");
           $(UnitDiv.getElementsByClassName("fasthealing")[0]).addClass("hidden");
           $(UnitDiv.getElementsByClassName("freemovement")[0]).addClass("hidden");
           $(UnitDiv.getElementsByClassName("highmorale")[0]).addClass("hidden");}
     }
//Remove "Only if Rank"
count = UnitDiv.querySelectorAll('.rankis0').length;
  for (var c=0 ; c < count ; c++ ) {
  $(UnitDiv.getElementsByClassName("rankis0")[c]).addClass("hidden");}
count = UnitDiv.querySelectorAll('.rankis1').length;
  for (var c=0 ; c < count ; c++ ) {
  $(UnitDiv.getElementsByClassName("rankis1")[c]).addClass("hidden");}
count = UnitDiv.querySelectorAll('.rankis2').length;
  for (var c=0 ; c < count ; c++ ) {
  $(UnitDiv.getElementsByClassName("rankis2")[c]).addClass("hidden");}
count = UnitDiv.querySelectorAll('.rankis3').length;
  for (var c=0 ; c < count ; c++ ) {
  $(UnitDiv.getElementsByClassName("rankis3")[c]).addClass("hidden");}
count = UnitDiv.querySelectorAll('.rankis4').length;
  for (var c=0 ; c < count ; c++ ) {
  $(UnitDiv.getElementsByClassName("rankis4")[c]).addClass("hidden");}
switch (rank) {
 
    case 0://                                                                              Scope: this unit template
        count = UnitDiv.querySelectorAll('.rank4').length;//               (If it is not:) Count amount of times this class occurs
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank4")[c]).addClass("hidden");}//               Add hidden to all those occurrences
 
        count = UnitDiv.querySelectorAll('.rank3').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank3")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.rank2').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank2")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.rank1').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank1")[c]).addClass("hidden");}
      break;
 
    case 1:
        count = UnitDiv.querySelectorAll('.rank4').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank4")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.rank3').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank3")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.rank2').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank2")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.rank1inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank1inv")[c]).addClass("hidden");}
      break;
 
    case 2:
        count = UnitDiv.querySelectorAll('.rank4').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank4")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.rank3').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank3")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.rank2inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank2inv")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.rank1inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank1inv")[c]).addClass("hidden");}
      break;
 
    case 3:
        count = UnitDiv.querySelectorAll('.rank4').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank4")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.rank3inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank3inv")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.rank2inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank2inv")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.rank1inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank1inv")[c]).addClass("hidden");}
      break;
 
    case 4:
        count = UnitDiv.querySelectorAll('.rank4inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank4inv")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.rank3inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank3inv")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.rank2inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank2inv")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.rank1inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank1inv")[c]).addClass("hidden");}
      break;
       }  //Closing switch statement
      //   From here, remove all racial abilities                                           Scope: this unit template
 
        count = UnitDiv.querySelectorAll('.draconian').length;//            (If it is not:) Count amount of times this class occurs
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("draconian")[c]).addClass("hidden");}//            Add hidden to all those occurrences
 
        count = UnitDiv.querySelectorAll('.dwarf').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("dwarf")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.frostling').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("frostling")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.goblin').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("goblin")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.halfling').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("halfling")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.highelf').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("highelf")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.human').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("human")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.orc').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("orc")[c]).addClass("hidden");}
 
        count = UnitDiv.querySelectorAll('.norace').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("norace")[c]).addClass("hidden");}
}
 
function addabilities (mcu0, mcu1, mcu2, UnitDiv, rank, race, allowed) {
       if (allowed[1] && (mcu0 == 1 || mcu1 == 1 || mcu2 == 1)) {//Arcane Catalyst
           if ($(UnitDiv.getElementsByClassName("supercharged")[0]).hasClass("hidden") ===true) {
           $(UnitDiv.getElementsByClassName("supercharged")[0]).removeClass("hidden");}
     }  
       if (allowed[2] && (mcu0 == 2 || mcu1 == 2 || mcu2 == 2)) {//Altar of bound Souls
           if ($(UnitDiv.getElementsByClassName("boundsoul")[0]).hasClass("hidden") ===true) {
           $(UnitDiv.getElementsByClassName("resurgence")[0]).removeClass("hidden");
           $(UnitDiv.getElementsByClassName("boundsoul")[0]).removeClass("hidden");}
     }  
       if (allowed[3] && (mcu0 == 3 || mcu1 == 3 || mcu2 == 3)) {//Blood Altar
           if ($(UnitDiv.getElementsByClassName("markbloodsacrifice")[0]).hasClass("hidden") ===true) {
           $(UnitDiv.getElementsByClassName("markbloodsacrifice")[0]).removeClass("hidden");}
     }
       if (allowed[4] && (mcu0 == 4 || mcu1 == 4 || mcu2 == 4)) {//Enchanted Armory
           if ($(UnitDiv.getElementsByClassName("enchantedarmor")[0]).hasClass("hidden") ===true) {
           $(UnitDiv.getElementsByClassName("enchantedarmor")[0]).removeClass("hidden");}
     } 
       if (allowed[5] && (mcu0 == 5 || mcu1 == 5 || mcu2 == 5)) {//Flowrock Citadel
           if ($(UnitDiv.getElementsByClassName("flowrockmachinery")[0]).hasClass("hidden") ===true) {
           $(UnitDiv.getElementsByClassName("flowrockmachinery")[0]).removeClass("hidden");}
     } 
       if (allowed[6] && (mcu0 == 6 || mcu1 == 6 || mcu2 == 6)) {//Focus Chamber
           if ($(UnitDiv.getElementsByClassName("focused")[0]).hasClass("hidden") ===true) {
           $(UnitDiv.getElementsByClassName("focused")[0]).removeClass("hidden");
           $(UnitDiv.getElementsByClassName("mindcontrolimmunity")[0]).removeClass("hidden");}
     } 
       if (allowed[7] && (mcu0 == 7 || mcu1 == 7 || mcu2 == 7)) {//Mercenary Camp
           if ($(UnitDiv.getElementsByClassName("mercenary")[0]).hasClass("hidden") ===true) {
           $(UnitDiv.getElementsByClassName("mercenary")[0]).removeClass("hidden");}
     } 
       if (allowed[8] && (mcu0 == 8 || mcu1 == 8 || mcu2 == 8)) {//Pillar of the Stylites
           if ($(UnitDiv.getElementsByClassName("stylite")[0]).hasClass("hidden") ===true) {
           $(UnitDiv.getElementsByClassName("stylite")[0]).removeClass("hidden");
           $(UnitDiv.getElementsByClassName("projectileresistance")[0]).removeClass("hidden");}
     } 
       if (allowed[9] && (mcu0 == 9 || mcu1 == 9 || mcu2 == 9)) {//Slaughter Pits
           if ($(UnitDiv.getElementsByClassName("killingmomentum")[0]).hasClass("hidden") ===true) {
           $(UnitDiv.getElementsByClassName("killingmomentum")[0]).removeClass("hidden");}
     }
       if (allowed[10] && (mcu0 == 10 || mcu1 == 10 || mcu2 == 10)) {//Stables of Vigor
           if ($(UnitDiv.getElementsByClassName("vigorousmount")[0]).hasClass("hidden") ===true) {
           $(UnitDiv.getElementsByClassName("vigorousmount")[0]).removeClass("hidden");
           $(UnitDiv.getElementsByClassName("fasthealing")[0]).removeClass("hidden");
           $(UnitDiv.getElementsByClassName("freemovement")[0]).removeClass("hidden");
           $(UnitDiv.getElementsByClassName("highmorale")[0]).removeClass("hidden");}
     } 
switch (rank) {//(Rank ability generation)
    case 0://                                                                              Scope: this unit template
      if ($(UnitDiv.getElementsByClassName("rank1inv")[0]).hasClass("hidden") ===true) {// Is the first member of this class hidden
        count = UnitDiv.querySelectorAll('.rank1inv').length;//                (If it is:) Count amount of times this class occurs
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank1inv")[c]).removeClass("hidden");}//         Remove hidden from all those occurrences
        }
      if ($(UnitDiv.getElementsByClassName("rank2inv")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank2inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank2inv")[c]).removeClass("hidden");}
        }
      if ($(UnitDiv.getElementsByClassName("rank3inv")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank3inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank3inv")[c]).removeClass("hidden");}
        }
      if ($(UnitDiv.getElementsByClassName("rank4inv")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank4inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank4inv")[c]).removeClass("hidden");}
        }
      count = UnitDiv.querySelectorAll('.rankis0').length;
      for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rankis0")[c]).removeClass("hidden");}
      break;
    case 1:
      if ($(UnitDiv.getElementsByClassName("rank1")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank1').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank1")[c]).removeClass("hidden");}
        }
      if ($(UnitDiv.getElementsByClassName("rank2inv")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank2inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank2inv")[c]).removeClass("hidden");}
        }
      if ($(UnitDiv.getElementsByClassName("rank3inv")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank3inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank3inv")[c]).removeClass("hidden");}
        }
      if ($(UnitDiv.getElementsByClassName("rank4inv")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank4inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank4inv")[c]).removeClass("hidden");}
        }
      count = UnitDiv.querySelectorAll('.rankis1').length;
      for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rankis1")[c]).removeClass("hidden");}
      break;
    case 2:
      if ($(UnitDiv.getElementsByClassName("rank1")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank1').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank1")[c]).removeClass("hidden");}
        }
      if ($(UnitDiv.getElementsByClassName("rank2")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank2').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank2")[c]).removeClass("hidden");}
        }
      if ($(UnitDiv.getElementsByClassName("rank3inv")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank3inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank3inv")[c]).removeClass("hidden");}
        }
      if ($(UnitDiv.getElementsByClassName("rank4inv")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank4inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank4inv")[c]).removeClass("hidden");}
        }
      count = UnitDiv.querySelectorAll('.rankis2').length;
      for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rankis2")[c]).removeClass("hidden");}
      break;
    case 3:
      if ($(UnitDiv.getElementsByClassName("rank1")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank1').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank1")[c]).removeClass("hidden");}
        }
      if ($(UnitDiv.getElementsByClassName("rank2")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank2').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank2")[c]).removeClass("hidden");}
        }
      if ($(UnitDiv.getElementsByClassName("rank3")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank3').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank3")[c]).removeClass("hidden");}
        }
      if ($(UnitDiv.getElementsByClassName("rank4inv")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank4inv').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank4inv")[c]).removeClass("hidden");}
        }
      count = UnitDiv.querySelectorAll('.rankis3').length;
      for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rankis3")[c]).removeClass("hidden");}
      break;
    case 4:
      if ($(UnitDiv.getElementsByClassName("rank1")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank1').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank1")[c]).removeClass("hidden");}
        }
      if ($(UnitDiv.getElementsByClassName("rank2")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank2').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank2")[c]).removeClass("hidden");}
        }
      if ($(UnitDiv.getElementsByClassName("rank3")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank3').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank3")[c]).removeClass("hidden");}
        }
      if ($(UnitDiv.getElementsByClassName("rank4")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.rank4').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rank4")[c]).removeClass("hidden");}
        }
      count = UnitDiv.querySelectorAll('.rankis4').length;
      for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("rankis4")[c]).removeClass("hidden");}
      break;
       }//Closing switch statement(Rank ability generation)
  switch (race) {//   From here, remove all racial abilities                                Scope: this unit template
     case 0://No race
      if ($(UnitDiv.getElementsByClassName("norace")[0]).hasClass("hidden") ===true) {   //Is the first member of this class hidden
        count = UnitDiv.querySelectorAll('.norace').length;//               (If it is not:) Count amount of times this class occurs
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("norace")[c]).removeClass("hidden");}//            Remove hidden from all those occurrences
        }
        break;
     case 1:
      if ($(UnitDiv.getElementsByClassName("draconian")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.draconian').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("draconian")[c]).removeClass("hidden");}
        }
        break;
     case 2:
      if ($(UnitDiv.getElementsByClassName("dwarf")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.dwarf').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("dwarf")[c]).removeClass("hidden");}
        }
        break;
     case 3:
      if ($(UnitDiv.getElementsByClassName("frostling")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.frostling').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("frostling")[c]).removeClass("hidden");}
        }
        break;
     case 4:
      if ($(UnitDiv.getElementsByClassName("goblin")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.goblin').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("goblin")[c]).removeClass("hidden");}
        }
        break;
     case 5:
      if ($(UnitDiv.getElementsByClassName("halfling")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.halfling').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("halfling")[c]).removeClass("hidden");}
        }
        break;
     case 6:
      if ($(UnitDiv.getElementsByClassName("highelf")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.highelf').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("highelf")[c]).removeClass("hidden");}
        }
        break;
     case 7:
      if ($(UnitDiv.getElementsByClassName("human")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.human').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("human")[c]).removeClass("hidden");}
        }
        break;
     case 8:
      if ($(UnitDiv.getElementsByClassName("orc")[0]).hasClass("hidden") ===true) {
        count = UnitDiv.querySelectorAll('.orc').length;
        for (var c=0 ; c < count ; c++ ) {
        $(UnitDiv.getElementsByClassName("orc")[c]).removeClass("hidden");}
        }
        break;
     default:
        break;
     }//End (race) Switch
}
 
function medalselect (rank) {
  switch(rank) {//This Functions changes the Medal Icon to match the unit's Rank.
     case 0:
         return "<img src=https://vignette.wikia.nocookie.net/age-of-wonders-3/images/8/86/No_Medal_Text.png/revision/latest?cb=20140901204353>";
         break;
     case 1:
         return "<img src=https://vignette.wikia.nocookie.net/age-of-wonders-3/images/b/bc/Iron_Medal_Text.png/revision/latest?cb=20140901204353>";
         break;
     case 2:
         return "<img src=https://vignette.wikia.nocookie.net/age-of-wonders-3/images/6/6a/Bronze_Medal_Text.png/revision/latest?cb=20140901204352>";
         break;
     case 3:
         return "<img src=https://vignette.wikia.nocookie.net/age-of-wonders-3/images/f/f0/Silver_Medal_Text.png/revision/latest?cb=20140901204353>";
         break;
     case 4:
         return "<img src=https://vignette.wikia.nocookie.net/age-of-wonders-3/images/6/6b/Gold_Medal_Text.png/revision/latest?cb=20140901204352>";
         break;
     default:
         return "";//No valid rank specified
     }
}
function healthCalc (hp, rank, tier, upgrade0, upgrade1, upgrade2, allowed, race) {
   if(rank == 4) {
       a = (2*tier)*5;
       }
   else  {
       a = (tier*2)*rank;
       }
    if (allowed[5] && (upgrade0 == 5 || upgrade1 == 5 || upgrade2 == 5)) {
       b = 10;
    } else {
       b = 0;
    }
    switch (race) {
      case 4://If race is goblin, -5 health
           c = -5;
           break;
      case 8://If race is orc, +5 health
           c = 5;
           break;
      default://Otherwise, don't modify
           c = 0;
           break;
    }
   return hp + a + b + c;
}
 
function defenseCalc (def, rank, upgrade0, upgrade1, upgrade2, allowed, race) {
    switch(rank) {
       case 2:
           a = 1;
           break;
       case 3:
           a = 1;
           break;
       case 4:
           a = 2;
           break;
       default:
           a = 0;
           break;
   }
    if (allowed[4] && (upgrade0 == 4 || upgrade1 == 4 || upgrade2 == 4)) {
       b = 2 
    } else {
       b = 0
    }
    if (allowed[7] && (upgrade0 == 7 || upgrade1 == 7 || upgrade2 == 7)) {
       c = 1 
    } else {
       c = 0
    }
    switch (race) {
      case 2://If race is dwarf, +1 defense
           d = 1;
           break;
      default://Otherwise, don't modify
           d = 0;
           break;
    }
   return def + a + b + c + d;
}
 
function resistanceCalc (res, rank, upgrade0, upgrade1, upgrade2, allowed, race) {
    switch(rank) {
       case 3:
           a = 1;
           break;
       case 4:
           a = 1;
           break;
       default:
           a = 0;
           break;
   }
    if (allowed[4] && (upgrade0 == 4 || upgrade1 == 4 || upgrade2 == 4)) {
       b = 1 
    } else {
       b = 0
    }
    if (allowed[2] && (upgrade0 == 2 || upgrade1 == 2 || upgrade2 == 2)) {
       c = 1 
    } else {
       c = 0
    }
    switch (race) {
      case 2://If race is dwarf, +1 resistance
           d = 1;
           break;
      case 6://If race is high elf, +1 resistance
           d = 1;
           break;
      case 8://If race is orc, -1 resistance
           d = -1;
           break;
      default://Otherwise, don't modify
           d = 0;
           break;
    }
   return res + a + b + c + d;
}

forcerefresh();