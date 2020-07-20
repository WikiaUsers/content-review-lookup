/*=====Page Load Functions and Variables=====*/
//Load the corresponding menus
$( ".select-rank").append( "<label for='rank'>Rank:</label><select name='rank' id='rank'><option value='0'>Recruit</option><option value='1'>Trooper</option><option value='2'>Veteran</option><option value='3'>Expert</option><option value='4'>Elite</option></select>" );
 
$( ".select-race").append( "<label for='race'>Race:</label><select name='race' id='race'><option value='0'>None</option><option value='1'>Draconian</option><option value='2'>Dwarf</option><option value='3'>Frostling</option><option value='4'>Goblin</option><option value='5'>Halfling</option><option value='6'>High Elf</option><option value='7'>Human</option><option value='8'>Orc</option><option value='9'>Tigran</option></select>" );
 /*Declaration of Race number/name:
0 No race
1 Draconian
2 Dwarf
3 Frostling
4 Goblin
5 Halfling
6 High Elf
7 Human
8 Orc
9 Tigran
*/
$( ".select-upgrade").append( "<label for='upgrade1'>Upgrades:</label><select name='upgrade0' id='upgrade0'><option value='0'>None</option><option value='1'>Arcane Catalyst</option><option value='2'>Altar of Bound Souls</option><option value='3'>Blood Altar</option><option value='12'>Library of the Dark Arts</option><option value='4'>Enchanted Armory</option><option value='5'>Flowrock Citadel</option><option value='6'>Focus Chamber</option><option value='11'>Magic Academy</option><option value='13'>Mariner's Guild</option><option value='7'>Mercenary Camp</option><option value='8'>Pillar of the Stylites</option><option value='9'>Slaughter Pits</option><option value='14'>Solar Spire</option><option value='10'>Stables of Vigor</option></select><select name='upgrade1' id='upgrade1'><option value='0'>None</option><option value='1'>Arcane Catalyst</option><option value='2'>Altar of Bound Souls</option><option value='3'>Blood Altar</option><option value='12'>Library of the Dark Arts</option><option value='4'>Enchanted Armory</option><option value='5'>Flowrock Citadel</option><option value='6'>Focus Chamber</option><option value='11'>Magic Academy</option><option value='13'>Mariner's Guild</option><option value='7'>Mercenary Camp</option><option value='8'>Pillar of the Stylites</option><option value='9'>Slaughter Pits</option><option value='14'>Solar Spire</option><option value='10'>Stables of Vigor</option></select><br/><label for='upgrade2'>Upgrades:</label><select name='upgrade2' id='upgrade1'><option value='0'>None</option><option value='1'>Arcane Catalyst</option><option value='2'>Altar of Bound Souls</option><option value='3'>Blood Altar</option><option value='12'>Library of the Dark Arts</option><option value='4'>Enchanted Armory</option><option value='5'>Flowrock Citadel</option><option value='6'>Focus Chamber</option><option value='11'>Magic Academy</option><option value='13'>Mariner's Guild</option><option value='7'>Mercenary Camp</option><option value='8'>Pillar of the Stylites</option><option value='9'>Slaughter Pits</option><option value='14'>Solar Spire</option><option value='10'>Stables of Vigor</option></select><select name='upgrade3' id='upgrade3'><option value='0'>None</option><option value='1'>Arcane Catalyst</option><option value='2'>Altar of Bound Souls</option><option value='3'>Blood Altar</option><option value='12'>Library of the Dark Arts</option><option value='4'>Enchanted Armory</option><option value='5'>Flowrock Citadel</option><option value='6'>Focus Chamber</option><option value='11'>Magic Academy</option><option value='13'>Mariner's Guild</option><option value='7'>Mercenary Camp</option><option value='8'>Pillar of the Stylites</option><option value='9'>Slaughter Pits</option><option value='14'>Solar Spire</option><option value='10'>Stables of Vigor</option></select>" );
/*Declaration of Upgrades number/name:
0 No upgrade
1 Arcane Catalyst
2 Altar of Bound Souls
3 Blood Altar
4 Enchanted Armory
5 Flowrock Citadel
6 Focus Chamber
7 Mercenary Camp
8 Pillar of the Stylites
9 Slaughter Pits
10 Stables of Vigor
11 Magic Academy 
12 Library of the Dark Arts
13 Mariner's Guild
14 Solar Spire
*/

$( ".select-darkpact").append( "<input type=checkbox id='darkpactcheckbox'><label for='darkpact'>Dark Pact</label>" );


var logging = true;
//Tooltip Variables
var target= document.getElementById("tooltip-wrapper");
//tooltip-wrapper Observer
var observer = null;
//tooltip-loading Observer
var observer2 = null;

//List of template-unit divs
var units = document.getElementsByClassName("template-unit");

//Updates unit values
for(i = 0; i < units.length; i++){
    unit = units[i];
    //var needRefresh = false;
    if (typeof unit.dataset.initupg3 === "undefined") {
        unit.dataset.initupg3 = 0;
    }
    inputs = [unit.dataset.initrank, unit.dataset.race, unit.dataset.initupg0, unit.dataset.initupg1, unit.dataset.initupg2, unit.dataset.initupg3];
    unit.getElementsByClassName("select-rank")[0].getElementsByTagName("select")[0].value = inputs[0];
    unit.getElementsByClassName("select-race")[0].getElementsByTagName("select")[0].value = inputs[1];
    unit.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[0].value = inputs[2];
    unit.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[1].value = inputs[3];
    unit.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[2].value = inputs[4];
    unit.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[3].value = inputs[5];
    refresh(unit);
    //Optimally, this should only refresh if something is actually different. That code caused something to fail to load and has been removed.
  if (unit.dataset.size === "small") {
    var j = unit.getElementsByClassName("col2entry").length;
    for(var c = 0; c < j; c++) {
      var thisability = unit.getElementsByClassName("col2entry")[c];
      if (!$(thisability).hasClass("damage")&&!$(thisability).hasClass("important")) {
          $(thisability).addClass("hidden");
      }
    }
    var limit = unit.getElementsByClassName("size").length;
    for(var c = 0; c < limit; c++) {
      $(unit.getElementsByClassName("size")[c]).addClass("hidden");
    }
}}

//Reduce template size if supplied



/*=====Refresh/Change Function=====*/
$(".template-unit select").change(function() {
    unit = findUnitDiv(this);
    refresh(unit);
});
$(".template-unit input").change(function() {
    unit = findUnitDiv(this);
    refresh(unit);
});

function findUnitDiv(childObj) {
    var testObj = childObj.parentNode;
    while(!$(testObj).hasClass("template-unit")) {
        testObj = testObj.parentNode;
    }
    return testObj;
}

//unit is the UnitDiv
function refresh (unit) {
    
    allowedUpgrades = [];
    //Index 0 is not used, since this equals to option 0(No upgrade)
    allowedUpgrades[1] = unit.dataset.summoned;
    allowedUpgrades[2] = unit.dataset.support;
    allowedUpgrades[3] = unit.dataset.support;
    allowedUpgrades[4] = unit.dataset.armored;
    allowedUpgrades[5] = unit.dataset.machine;
    allowedUpgrades[6] = unit.dataset.archer;
    allowedUpgrades[7] = unit.dataset.irregular;
    allowedUpgrades[8] = unit.dataset.pikeman;
    allowedUpgrades[9] = unit.dataset.infantry;
    allowedUpgrades[10] = unit.dataset.mounted;
    allowedUpgrades[11] = unit.dataset.support;
    if(unit.dataset.monster||unit.dataset.infantry) {
    allowedUpgrades[12] = true;
    }//Right here, I don't want to differentiate between summoned/produced infantry.
    allowedUpgrades[100] = unit.dataset.dwarfarmored;
    if(logging === true) {
      console.log("Log: Dwarfarmored", allowedUpgrades[100]);
    }
    if (unit.dataset.race != -1) {
        race = parseInt(unit.getElementsByClassName("select-race")[0].getElementsByTagName("select")[0].value, 10);
    } else {
        // Units that don't have a race
        race = 0;
    }

    rank = parseInt(unit.getElementsByClassName("select-rank")[0].getElementsByTagName("select")[0].value, 10);
    upgradeSpan = unit.getElementsByClassName("select-upgrade")[0];
    upgrade0 = parseInt(upgradeSpan.getElementsByTagName("select")[0].value, 10);
    upgrade1 = parseInt(upgradeSpan.getElementsByTagName("select")[1].value, 10);
    upgrade2 = parseInt(upgradeSpan.getElementsByTagName("select")[2].value, 10);
    upgrade3 = parseInt(upgradeSpan.getElementsByTagName("select")[3].value, 10);

    (unit.getElementsByClassName("medal")[0]).innerHTML = medalselect(rank);
    (unit.getElementsByClassName("health")[0]).innerHTML = healthCalc(parseInt(unit.dataset.basehealth, 10), rank, unit.dataset.tier, upgrade0, upgrade1, upgrade2, upgrade3, allowedUpgrades, race, unit);
    (unit.getElementsByClassName("defense")[0]).innerHTML = defenseCalc(parseInt(unit.dataset.basedefense, 10), rank, upgrade0, upgrade1, upgrade2, upgrade3, allowedUpgrades, race);
    (unit.getElementsByClassName("resistance")[0]).innerHTML = resistanceCalc(parseInt(unit.dataset.baseresistance, 10), rank, upgrade0, upgrade1, upgrade2, upgrade3, allowedUpgrades, race, unit);

    removeabilities(upgrade0, upgrade1, upgrade2, upgrade3, unit, rank, race, allowedUpgrades);

    addabilities(upgrade0, upgrade1, upgrade2, upgrade3, unit, rank, race, allowedUpgrades);

    alterspecificabilities(upgrade0, upgrade1, upgrade2, upgrade3, unit, rank, race, allowedUpgrades);

    //initialize damage
    DamageAmount = $('.damage',unit).length;
    damage = [];
    for (var c = 0; c < DamageAmount; c++) {
        damage[c] = unit.getElementsByClassName("damage")[c];
    }
    
    //Update Damage vals and types
    for (var c = 0; c < DamageAmount ; c++ ) {
      damageCalc(damage[c].getElementsByClassName("writedamage")[0],damage[c],unit);
    }
}


/*=====Tooltip Observer Functions====*/
$('.unit-tooltip').hover( function(){
    if(target == null){
        target = document.getElementById("tooltip-wrapper");
        observer = new MutationObserver(observeFunction);
        var config = {childList: true};
        observer.observe(target, config);
    }
});

function alterspecificabilities(upg0, upg1, upg2, upg3, unit, rank, race, allowedUpgrades){
    //Remove Only
    if (rank == 4 && race ==5){} else {
        for (var c=0 ; c < unit.getElementsByClassName("rank4andhalfling").length;c++){
        $(unit.getElementsByClassName("rank4andhalfling")[c]).addClass('hidden');}
    }
    
    if (rank == 4 && race ==4){} else {
        for (var c=0 ; c < unit.getElementsByClassName("rank4andgoblin").length;c++){
        $(unit.getElementsByClassName("rank4andgoblin")[c]).addClass('hidden');}
    }
    
    if (rank > 1 && race ==9){} else {
        for (var c=0 ; c < unit.getElementsByClassName("rank2andtigran").length;c++){
        $(unit.getElementsByClassName("rank2andtigran")[c]).addClass('hidden');}
    }
    
    if ($(unit).hasClass('assassin')){//Assassins = Headache.
        if (rank == 4 && race != 5){} else {
            for (var c=0 ; c < unit.getElementsByClassName("rank4andnothalfling").length;c++){
                $(unit.getElementsByClassName("rank4andnothalfling")[c]).addClass('hidden');}
        }
        if (rank != 4 && race == 5){} else {
            for (var c=0 ; c < unit.getElementsByClassName("halflingandnotrank4").length;c++){
                $(unit.getElementsByClassName("halflingandnotrank4")[c]).addClass('hidden');}
        }
        if (rank == 4 && race == 9){ } else {
            for (var c=0 ; c < unit.getElementsByClassName("rank4andtigran").length;c++){
                $(unit.getElementsByClassName("rank4andtigran")[c]).addClass('hidden');}
        }
        if (rank == 4 && race != 9){} else {
            for (var c=0 ; c < unit.getElementsByClassName("rank4andnottigran").length;c++){
                $(unit.getElementsByClassName("rank4andnottigran")[c]).addClass('hidden');}
        }
    }
    
    if ($(unit).hasClass('darkpact')){
        if (unit.getElementsByClassName("select-darkpact")[0].getElementsByTagName("input")[0].checked) {
            for (var c=0 ; c < unit.getElementsByClassName("nodarkpact").length;c++){
                $(unit.getElementsByClassName("nodarkpact")[c]).addClass('hidden');}
        } else {
            for (var c=0 ; c < unit.getElementsByClassName("darkpact").length;c++){
                $(unit.getElementsByClassName("darkpact")[c]).addClass('hidden');}
        }
    }
    //Add Abilities
    
    if (rank == 4 && race == 5){//Case: Halfling and Elite (Crusader and others)
        for (var c=0 ; c < unit.getElementsByClassName("rank4andhalfling").length;c++){
        $(unit.getElementsByClassName("rank4andhalfling")[c]).removeClass('hidden');}
    }
    
    if (rank == 4 && race == 4){//Case: Goblin and Elite (Deathbringer and others)
        for (var c=0 ; c < unit.getElementsByClassName("rank4andgoblin").length;c++){
        $(unit.getElementsByClassName("rank4andgoblin")[c]).removeClass('hidden');}
    }
    
    if (rank > 1 && race == 9){//Case: Tigran and rank 2+ (Mounted Archer and others)
        for (var c=0 ; c < unit.getElementsByClassName("rank2andtigran").length;c++){
        $(unit.getElementsByClassName("rank2andtigran")[c]).removeClass('hidden');}
    }
    
    if ($(unit).hasClass('assassin')){//Assassins = Headache.
        if (rank == 4 && race != 5){
            for (var c=0 ; c < unit.getElementsByClassName("rank4andnothalfling").length;c++){
                $(unit.getElementsByClassName("rank4andnothalfling")[c]).removeClass('hidden');}
        } 
        if (rank != 4 && race == 5){
            for (var c=0 ; c < unit.getElementsByClassName("halflingandnotrank4").length;c++){
                $(unit.getElementsByClassName("halflingandnotrank4")[c]).removeClass('hidden');}
        } 
        if (rank == 4 && race == 9){
            for (var c=0 ; c < unit.getElementsByClassName("rank4andtigran").length;c++){
                $(unit.getElementsByClassName("rank4andtigran")[c]).removeClass('hidden');}
        } 
        if (rank == 4 && race != 9){
            for (var c=0 ; c < unit.getElementsByClassName("rank4andnottigran").length;c++){
                $(unit.getElementsByClassName("rank4andnottigran")[c]).removeClass('hidden');}
        } 
    }
    
    if ($(unit).hasClass('darkpact')){
        if (unit.getElementsByClassName("select-darkpact")[0].getElementsByTagName("input")[0].checked) {
            for (var c=0 ; c < unit.getElementsByClassName("darkpact").length;c++){
                $(unit.getElementsByClassName("darkpact")[c]).removeClass('hidden');}
        } else {
            for (var c=0 ; c < unit.getElementsByClassName("nodarkpact").length;c++){
                $(unit.getElementsByClassName("nodarkpact")[c]).removeClass('hidden');}
        }
    }
}

//tooltip-wrapper Observer Callback
function observeFunction(){
    var firstChildDiv = target.firstChild;
    if(firstChildDiv != null){                
        var classes = firstChildDiv.getAttribute('class');
        if (classes.match(/\btooltip-loading\b/) != null){
            observer2 = new MutationObserver(observeFunction2);
            var config = {attributes: true};
            observer2.observe(firstChildDiv, config);
        } else if(classes.match(/\btt-unit-tooltip\b/) != null){
            var unit = firstChildDiv.firstChild;
            refreshTooltip(unit);
        }
    }
}

//tooltip-loading Observer Callback
function observeFunction2(){
    observeFunction();
    observer2.disconnect();
}

//Update function for tooltips only
function refreshTooltip(unit){
    //Add menus to loaded unitDiv, this should probably be avoided, but it works.

    if (!$("#tooltip-wrapper").find(".unitSpecs").hasClass("filled")){
        $("#tooltip-wrapper").find(".select-rank").append( "<label for='rank'>Rank:</label><select name='rank' id='rank'><option value='0'>Recruit</option><option value='1'>Trooper</option><option value='2'>Veteran</option><option value='3'>Expert</option><option value='4'>Elite</option></select>" );
 
        $("#tooltip-wrapper").find(".select-race").append( "<label for='race'>Race:</label><select name='race' id='race'><option value='0'>None</option><option value='1'>Draconian</option><option value='2'>Dwarf</option><option value='3'>Frostling</option><option value='4'>Goblin</option><option value='5'>Halfling</option><option value='6'>High Elf</option><option value='7'>Human</option><option value='8'>Orc</option></select>" );
 
        $("#tooltip-wrapper").find(".select-upgrade").append( "<label for='upgrade1'>Upgrades:</label><select name='upgrade0' id='upgrade0'><option value='0'>None</option><option value='1'>Arcane Catalyst</option><option value='2'>Altar of Bound Souls</option><option value='3'>Blood Altar</option><option value='12'>Library of the Dark Arts</option><option value='4'>Enchanted Armory</option><option value='5'>Flowrock Citadel</option><option value='6'>Focus Chamber</option><option value='11'>Magic Academy</option><option value='13'>Mariner's Guild</option><option value='7'>Mercenary Camp</option><option value='8'>Pillar of the Stylites</option><option value='9'>Slaughter Pits</option><option value='14'>Solar Spire</option><option value='10'>Stables of Vigor</option></select><select name='upgrade1' id='upgrade1'><option value='0'>None</option><option value='1'>Arcane Catalyst</option><option value='2'>Altar of Bound Souls</option><option value='3'>Blood Altar</option><option value='12'>Library of the Dark Arts</option><option value='4'>Enchanted Armory</option><option value='5'>Flowrock Citadel</option><option value='6'>Focus Chamber</option><option value='11'>Magic Academy</option><option value='13'>Mariner's Guild</option><option value='7'>Mercenary Camp</option><option value='8'>Pillar of the Stylites</option><option value='9'>Slaughter Pits</option><option value='14'>Solar Spire</option><option value='10'>Stables of Vigor</option></select><br/><label for='upgrade2'>Upgrades:</label><select name='upgrade2' id='upgrade1'><option value='0'>None</option><option value='1'>Arcane Catalyst</option><option value='2'>Altar of Bound Souls</option><option value='3'>Blood Altar</option><option value='12'>Library of the Dark Arts</option><option value='4'>Enchanted Armory</option><option value='5'>Flowrock Citadel</option><option value='6'>Focus Chamber</option><option value='11'>Magic Academy</option><option value='13'>Mariner's Guild</option><option value='7'>Mercenary Camp</option><option value='8'>Pillar of the Stylites</option><option value='9'>Slaughter Pits</option><option value='14'>Solar Spire</option><option value='10'>Stables of Vigor</option></select><select name='upgrade3' id='upgrade3'><option value='0'>None</option><option value='1'>Arcane Catalyst</option><option value='2'>Altar of Bound Souls</option><option value='3'>Blood Altar</option><option value='12'>Library of the Dark Arts</option><option value='4'>Enchanted Armory</option><option value='5'>Flowrock Citadel</option><option value='6'>Focus Chamber</option><option value='11'>Magic Academy</option><option value='13'>Mariner's Guild</option><option value='7'>Mercenary Camp</option><option value='8'>Pillar of the Stylites</option><option value='9'>Slaughter Pits</option><option value='14'>Solar Spire</option><option value='10'>Stables of Vigor</option></select>");
        
        $("#tooltip-wrapper").find(".unitSpecs").addClass("filled");
    }


    if (typeof unit.dataset.initupg3 === "undefined") {
        unit.dataset.initupg3 = 0;
    }
	//Fills the hidden menu with the necessary values
    inputs = [unit.dataset.initrank, unit.dataset.race, unit.dataset.initupg0, unit.dataset.initupg1, unit.dataset.initupg2, unit.dataset.initupg3];

    unit.getElementsByClassName("select-rank")[0].getElementsByTagName("select")[0].value = inputs[0];
    unit.getElementsByClassName("select-race")[0].getElementsByTagName("select")[0].value = inputs[1];
    unit.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[0].value = inputs[2];
    unit.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[1].value = inputs[3];
    unit.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[2].value = inputs[4];
    unit.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[3].value = inputs[5];
    refresh(unit);
    //Currently not supporting the 4th upgrade when pre-supplied, but this needs to be done in the induvidual templates.
}

/*=====Calculation/Alteration Functions=====*/
function damageCalc (WriteSpan, DamageDiv, UnitDiv) {
	type = DamageDiv.dataset.type;
	damageincrease = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
	element = [];
	for (var i = 0 ; i < 6 ; i++ ) {
		for (var c = 0 ; c < 5 ; c++ ) {
			damageincrease[i][c] = 0;
		}
	}
	
	//Set Primary Damage Channel(for irregulars with Mercenary)
	if ($(DamageDiv).attr('data-primary')) {
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
		if (UnitDiv.dataset.race === -2) {
			race = -2;
		} else { 
			race = parseInt(UnitDiv.getElementsByClassName("select-race")[0].getElementsByTagName("select")[0].value, 10);
		} 
	} 
	else { race = 0;}
	
	rank = parseInt(UnitDiv.getElementsByClassName("select-rank")[0].getElementsByTagName("select")[0].value, 10);
	mcu0 = parseInt(UnitDiv.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[0].value, 10);
	mcu1 = parseInt(UnitDiv.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[1].value, 10);
	mcu2 = parseInt(UnitDiv.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[2].value, 10);
	mcu3 = parseInt(UnitDiv.getElementsByClassName("select-upgrade")[0].getElementsByTagName("select")[3].value, 10);
	
	//Start of Mystical City Upgrades
	//Focus Chamber
	if (UnitDiv.dataset.archer && (type == "ranged") && (mcu0 == 6 || mcu1 == 6 || mcu2 == 6 || mcu3 == 6)) {
		if (element[0]) { damageincrease[0][0] = parseInt(damageincrease[0][0], 10) +2; }
		else {damageincrease[0][0] = 2; element[0] = true; }
		
		if (element[5]) { damageincrease[5][0] = parseInt(damageincrease[5][0], 10) +1; }
		else {damageincrease[5][0] = 1; element[5] = true; }
	}
	
	//Mercenary Camp
	if (UnitDiv.dataset.irregular && (type == "ranged") && (mcu0 == 7 || mcu1 == 7 || mcu2 == 7 || mcu3 == 7)) {
                if (element[0]) { damageincrease[0][0] = parseInt(damageincrease[0][0], 10) + 1; }
                if (element[1]) { damageincrease[1][0] = parseInt(damageincrease[1][0], 10) + 1; }
                if (element[2]) { damageincrease[2][0] = parseInt(damageincrease[2][0], 10) + 1; }
                if (element[3]) { damageincrease[3][0] = parseInt(damageincrease[3][0], 10) + 1; }
                if (element[4]) { damageincrease[4][0] = parseInt(damageincrease[4][0], 10) + 1; }
                if (element[5]) { damageincrease[5][0] = parseInt(damageincrease[5][0], 10) + 1; }
	}
	
	//Mercenary Camp
	if (UnitDiv.dataset.irregular && (type == "melee") && (mcu0 == 7 || mcu1 == 7 || mcu2 == 7 || mcu3 == 7)) {
		damageincrease[0][0] = parseInt(damageincrease[0][0], 10) + 1;
	}
	
	//Lost Library (Only Primary channel +1, regardless of Melee/Ranged)
	if (UnitDiv.dataset.support && (mcu0 == 11 || mcu1 == 11 || mcu2 == 11 || mcu3 == 11)) {
		damageincrease[primary][0] = parseInt(damageincrease[primary][0], 10) + 1;
	}
	
	//Pillar of the Stylites
	if (UnitDiv.dataset.pikeman && (type == "melee") && (mcu0 == 8 || mcu1 == 8 || mcu2 == 8 || mcu3 == 8)) {
		if (element[1]) { damageincrease[1][0] = parseInt(damageincrease[1][0], 10) +2; }
		else {damageincrease[1][0] = 2; element[1] = true; }
	}
	
	//Slaughter Pits
	if (UnitDiv.dataset.infantry && (type == "melee") && (mcu0 == 9 || mcu1 == 9 || mcu2 == 9 || mcu3 == 9)) {
		damageincrease[0][0] = parseInt(damageincrease[0][0], 10) + 2;
	}
	
        //Ranged shock damage increase for racial elven archer + focus chamber combination.
        if ($(UnitDiv).hasClass("highelflongbowman") && element[5] && (type == "ranged")) 
           {damageincrease[5][0] = parseInt(damageincrease[5][0], 10) + 1;}
        
    //For Dark Pact-able units, increase all damage channels by 1
    if ($(UnitDiv).hasClass('darkpact')){
        if (UnitDiv.getElementsByClassName("select-darkpact")[0].getElementsByTagName("input")[0].checked) {
            if (element[0]) { damageincrease[0][0] = parseInt(damageincrease[0][0], 10) + 1; }
            if (element[1]) { damageincrease[1][0] = parseInt(damageincrease[1][0], 10) + 1; }
            if (element[2]) { damageincrease[2][0] = parseInt(damageincrease[2][0], 10) + 1; }
            if (element[3]) { damageincrease[3][0] = parseInt(damageincrease[3][0], 10) + 1; }
            if (element[4]) { damageincrease[4][0] = parseInt(damageincrease[4][0], 10) + 1; }
            if (element[5]) { damageincrease[5][0] = parseInt(damageincrease[5][0], 10) + 1; }
        }
    }
    
	switch (race) {
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
				}else {
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
 
function removeabilities (mcu0, mcu1, mcu2, mcu3, UnitDiv, rank, race, allowed) {
	//Arcane Catalyst
	if (allowed[1] && (mcu0 == 1 || mcu1 == 1 || mcu2 == 1 || mcu3 == 1)) {
	} else{
		if ($(UnitDiv.getElementsByClassName("supercharged")[0]).hasClass("hidden") ===false) {
			$(UnitDiv.getElementsByClassName("supercharged")[0]).addClass("hidden");
		}
	}
	
	//Altar of bound Souls
	if (allowed[2] && (mcu0 == 2 || mcu1 == 2 || mcu2 == 2 || mcu3 == 2)) {
	} else{
		if ($(UnitDiv.getElementsByClassName("boundsoul")[0]).hasClass("hidden") ===false) {
			$(UnitDiv.getElementsByClassName("resurgence")[0]).addClass("hidden"); 
			$(UnitDiv.getElementsByClassName("boundsoul")[0]).addClass("hidden");
		}
	}
	
	//Blood Altar
	if (allowed[3] && (mcu0 == 3 || mcu1 == 3 || mcu2 == 3 || mcu3 == 3)) {
	} else{
		if ($(UnitDiv.getElementsByClassName("markbloodsacrifice")[0]).hasClass("hidden") ===false) {
			$(UnitDiv.getElementsByClassName("markbloodsacrifice")[0]).addClass("hidden");
		}
	}

	//Enchanted Armory
	if (allowed[4] && (mcu0 == 4 || mcu1 == 4 || mcu2 == 4 || mcu3 == 4)) {
	} else{
		if ($(UnitDiv.getElementsByClassName("enchantedarmor")[0]).hasClass("hidden") ===false) {
			$(UnitDiv.getElementsByClassName("enchantedarmor")[0]).addClass("hidden");
		}
	}
	
	if(logging === true) {//Testing for Dwarf Armored Supports
      console.log("Removeabilities - Allowed100, mcu 0123 race", allowed[100], mcu0, mcu1, mcu2, mcu3, race);
    }
	
	//Enchanted Armory Dwarven Support Exception
	if (allowed[100] && (mcu0 == 4 || mcu1 == 4 || mcu2 == 4 || mcu3 == 4) && race == 2) {
	} else{
		if ($(UnitDiv.getElementsByClassName("enchantedarmor")[0]).hasClass("hidden") ===false) {
			$(UnitDiv.getElementsByClassName("enchantedarmor")[0]).addClass("hidden");
		}
	}
	
	//Flowrock Citadel
	if (allowed[5] && (mcu0 == 5 || mcu1 == 5 || mcu2 == 5 || mcu3 == 5)) {
	} else{
		if ($(UnitDiv.getElementsByClassName("flowrockmachinery")[0]).hasClass("hidden") ===false) {
			$(UnitDiv.getElementsByClassName("flowrockmachinery")[0]).addClass("hidden");
		}
	}
	
	//Focus Chamber
	if (allowed[6] && (mcu0 == 6 || mcu1 == 6 || mcu2 == 6 || mcu3 == 6)) {
	} else{
		if ($(UnitDiv.getElementsByClassName("focused")[0]).hasClass("hidden") ===false) {
			$(UnitDiv.getElementsByClassName("focused")[0]).addClass("hidden"); 
			$(UnitDiv.getElementsByClassName("mindcontrolimmunity")[0]).addClass("hidden");
		}
	}
	
	//Mercenary Camp
	if (allowed[7] && (mcu0 == 7 || mcu1 == 7 || mcu2 == 7 || mcu3 == 7)) {
	} else{
		if ($(UnitDiv.getElementsByClassName("mercenary")[0]).hasClass("hidden") ===false) {
			$(UnitDiv.getElementsByClassName("mercenary")[0]).addClass("hidden");
		}
	}
	
	//Pillar of the Stylites
	if (allowed[8] && (mcu0 == 8 || mcu1 == 8 || mcu2 == 8 || mcu3 == 8)) {
	} else{
		if ($(UnitDiv.getElementsByClassName("stylite")[0]).hasClass("hidden") ===false) {
			$(UnitDiv.getElementsByClassName("stylite")[0]).addClass("hidden"); 
			$(UnitDiv.getElementsByClassName("projectileresistance")[0]).addClass("hidden");
		}
	}
	
	//Slaughter Pits
	if (allowed[9] && (mcu0 == 9 || mcu1 == 9 || mcu2 == 9 || mcu3 == 9)) {
	} else{
		if ($(UnitDiv.getElementsByClassName("killingmomentum")[0]).hasClass("hidden") ===false) {
			$(UnitDiv.getElementsByClassName("killingmomentum")[0]).addClass("hidden");
		}
	}
	
	//Solar Spire
	if (allowed[8] && (mcu0 == 14 || mcu1 == 14 || mcu2 == 14 || mcu3 == 14)) {
	} else{
		if ($(UnitDiv.getElementsByClassName("blindingaura")[0]).hasClass("hidden") ===false) {
			$(UnitDiv.getElementsByClassName("blindingaura")[0]).addClass("hidden"); 
		}
	}
	
	//Stables of Vigor
	if (allowed[10] && (mcu0 == 10 || mcu1 == 10 || mcu2 == 10 || mcu3 == 10)) {
	} else{
		if ($(UnitDiv.getElementsByClassName("vigorousmount")[0]).hasClass("hidden") ===false) {
			$(UnitDiv.getElementsByClassName("vigorousmount")[0]).addClass("hidden");
			$(UnitDiv.getElementsByClassName("fasthealing")[0]).addClass("hidden");
			$(UnitDiv.getElementsByClassName("freemovement")[0]).addClass("hidden");
			$(UnitDiv.getElementsByClassName("highmorale")[0]).addClass("hidden");
		}
	}
	
	//Lost Library
	if (allowed[11] && (mcu0 == 11 || mcu1 == 11 || mcu2 == 11 || mcu3 == 11)) {
	} else{
		if ($(UnitDiv.getElementsByClassName("magicacademy")[0]).hasClass("hidden") ===false) {
			$(UnitDiv.getElementsByClassName("magicacademy")[0]).addClass("hidden");
		}
	}
	
	//Castle of the Lich King
	if (allowed[12] && (mcu0 == 12 || mcu1 == 12 || mcu2 == 12 || mcu3 == 12)) {
	} else{
		if ($(UnitDiv.getElementsByClassName("fearstrike")[0]).hasClass("hidden") ===false) {
			$(UnitDiv.getElementsByClassName("fearstrike")[0]).addClass("hidden");
		}
	}

	//Remove "Only if Rank"
	count = UnitDiv.querySelectorAll('.rankis0').length;
	for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rankis0")[c]).addClass("hidden");}
	
	count = UnitDiv.querySelectorAll('.rankis1').length;
	for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rankis1")[c]).addClass("hidden");}
	
	count = UnitDiv.querySelectorAll('.rankis2').length;
	for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rankis2")[c]).addClass("hidden");}
	
	count = UnitDiv.querySelectorAll('.rankis3').length;
	for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rankis3")[c]).addClass("hidden");}
	
	count = UnitDiv.querySelectorAll('.rankis4').length;
	for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rankis4")[c]).addClass("hidden");}
	
	switch (rank) {	 
		case 0://                                                       Scope: this unit template
			count = UnitDiv.querySelectorAll('.rank4').length;//    (If it is not:) Count amount of times this class occurs
			//Add hidden to all those occurrences
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank4")[c]).addClass("hidden");}
			 
			  count = UnitDiv.querySelectorAll('.rank3').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank3")[c]).addClass("hidden");}
			 
			count = UnitDiv.querySelectorAll('.rank2').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank2")[c]).addClass("hidden");}
			 
			count = UnitDiv.querySelectorAll('.rank1').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank1")[c]).addClass("hidden");}
			break;		 
		case 1:
			count = UnitDiv.querySelectorAll('.rank4').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank4")[c]).addClass("hidden");}
			 
			count = UnitDiv.querySelectorAll('.rank3').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank3")[c]).addClass("hidden");}
			 
			count = UnitDiv.querySelectorAll('.rank2').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank2")[c]).addClass("hidden");}
			 
			count = UnitDiv.querySelectorAll('.rank1inv').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank1inv")[c]).addClass("hidden");}
			break;		 
		case 2:
			count = UnitDiv.querySelectorAll('.rank4').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank4")[c]).addClass("hidden");}
			 
			count = UnitDiv.querySelectorAll('.rank3').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank3")[c]).addClass("hidden");}
			 
			count = UnitDiv.querySelectorAll('.rank2inv').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank2inv")[c]).addClass("hidden");}
			 
			count = UnitDiv.querySelectorAll('.rank1inv').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank1inv")[c]).addClass("hidden");}
			break;		 
		case 3:
			count = UnitDiv.querySelectorAll('.rank4').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank4")[c]).addClass("hidden");}
			 
			count = UnitDiv.querySelectorAll('.rank3inv').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank3inv")[c]).addClass("hidden");}
			 
			count = UnitDiv.querySelectorAll('.rank2inv').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank2inv")[c]).addClass("hidden");}
			 
			count = UnitDiv.querySelectorAll('.rank1inv').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank1inv")[c]).addClass("hidden");}
			break;		 
		case 4:
			count = UnitDiv.querySelectorAll('.rank4inv').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank4inv")[c]).addClass("hidden");}
			 
			count = UnitDiv.querySelectorAll('.rank3inv').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank3inv")[c]).addClass("hidden");}
			 
			count = UnitDiv.querySelectorAll('.rank2inv').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank2inv")[c]).addClass("hidden");}
			 
			count = UnitDiv.querySelectorAll('.rank1inv').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank1inv")[c]).addClass("hidden");}
			break;
	}//Closing switch statement
	 
	// From here, remove all racial abilities                                           Scope: this unit template
	 
	count = UnitDiv.querySelectorAll('.draconian').length;//(If it is not:) Count amount of times this class occurs
	//Add hidden to all those occurrences
	for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("draconian")[c]).addClass("hidden");}
	 
	count = UnitDiv.querySelectorAll('.dwarf').length;
	for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("dwarf")[c]).addClass("hidden");}
	 
	count = UnitDiv.querySelectorAll('.frostling').length;
	for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("frostling")[c]).addClass("hidden");}
	 
	count = UnitDiv.querySelectorAll('.goblin').length;
	for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("goblin")[c]).addClass("hidden");}
	 
	count = UnitDiv.querySelectorAll('.halfling').length;
	for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("halfling")[c]).addClass("hidden");}
	 
	count = UnitDiv.querySelectorAll('.highelf').length;
	for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("highelf")[c]).addClass("hidden");}
	 
	count = UnitDiv.querySelectorAll('.human').length;
	for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("human")[c]).addClass("hidden");}
	 
	count = UnitDiv.querySelectorAll('.orc').length;
	for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("orc")[c]).addClass("hidden");}
	
	count = UnitDiv.querySelectorAll('.tigran').length;
	for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("tigran")[c]).addClass("hidden");}
	 
	count = UnitDiv.querySelectorAll('.norace').length;
	for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("norace")[c]).addClass("hidden");}
}
 
function addabilities (mcu0, mcu1, mcu2, mcu3, UnitDiv, rank, race, allowed) {
	//Arcane Catalyst
	if (allowed[1] && (mcu0 == 1 || mcu1 == 1 || mcu2 == 1 || mcu3 == 1)) {
		if ($(UnitDiv.getElementsByClassName("supercharged")[0]).hasClass("hidden") ===true) {
			$(UnitDiv.getElementsByClassName("supercharged")[0]).removeClass("hidden");
		}
	}

	//Altar of bound Souls
	if (allowed[2] && (mcu0 == 2 || mcu1 == 2 || mcu2 == 2 || mcu3 == 2)) {
		if ($(UnitDiv.getElementsByClassName("boundsoul")[0]).hasClass("hidden") ===true) {
			$(UnitDiv.getElementsByClassName("resurgence")[0]).removeClass("hidden");
			$(UnitDiv.getElementsByClassName("boundsoul")[0]).removeClass("hidden");
		}
	}

	//Blood Altar
	if (allowed[3] && (mcu0 == 3 || mcu1 == 3 || mcu2 == 3 || mcu3 == 3)) {
		if ($(UnitDiv.getElementsByClassName("markbloodsacrifice")[0]).hasClass("hidden") ===true) {
			$(UnitDiv.getElementsByClassName("markbloodsacrifice")[0]).removeClass("hidden");
		}
	}

	//Enchanted Armory
	if (allowed[4] && (mcu0 == 4 || mcu1 == 4 || mcu2 == 4 || mcu3 == 4)) {
		if ($(UnitDiv.getElementsByClassName("enchantedarmor")[0]).hasClass("hidden") ===true) {
			$(UnitDiv.getElementsByClassName("enchantedarmor")[0]).removeClass("hidden");
		}
	} 

	if(logging === true) {//Testing for Dwarf Armored Supports
      console.log("Addabilities - Allowed100, mcu 0123 race", allowed[100], mcu0, mcu1, mcu2, mcu3, race);
    }

	//Enchanted Armory Dwarven Support Exception
	if (allowed[100] && (mcu0 == 4 || mcu1 == 4 || mcu2 == 4 || mcu3 == 4) && race == 2) {
		if ($(UnitDiv.getElementsByClassName("enchantedarmor")[0]).hasClass("hidden") ===true) {
			$(UnitDiv.getElementsByClassName("enchantedarmor")[0]).removeClass("hidden");
		}
	}

	//Flowrock Citadel
	if (allowed[5] && (mcu0 == 5 || mcu1 == 5 || mcu2 == 5 || mcu3 == 5)) {
		if ($(UnitDiv.getElementsByClassName("flowrockmachinery")[0]).hasClass("hidden") ===true) {
			$(UnitDiv.getElementsByClassName("flowrockmachinery")[0]).removeClass("hidden");
		}
	} 

	//Focus Chamber
	if (allowed[6] && (mcu0 == 6 || mcu1 == 6 || mcu2 == 6 || mcu3 == 6)) {
		if ($(UnitDiv.getElementsByClassName("focused")[0]).hasClass("hidden") ===true) {
			$(UnitDiv.getElementsByClassName("focused")[0]).removeClass("hidden");
			$(UnitDiv.getElementsByClassName("mindcontrolimmunity")[0]).removeClass("hidden");
		}
	} 

	//Mercenary Camp
	if (allowed[7] && (mcu0 == 7 || mcu1 == 7 || mcu2 == 7 || mcu3 == 7)) {
		if ($(UnitDiv.getElementsByClassName("mercenary")[0]).hasClass("hidden") ===true) {
			$(UnitDiv.getElementsByClassName("mercenary")[0]).removeClass("hidden");
		}
	} 

	//Pillar of the Stylites
	if (allowed[8] && (mcu0 == 8 || mcu1 == 8 || mcu2 == 8 || mcu3 == 8)) {
		if ($(UnitDiv.getElementsByClassName("stylite")[0]).hasClass("hidden") ===true) {
			$(UnitDiv.getElementsByClassName("stylite")[0]).removeClass("hidden");
			$(UnitDiv.getElementsByClassName("projectileresistance")[0]).removeClass("hidden");
		}
	} 

	//Slaughter Pits
	if (allowed[9] && (mcu0 == 9 || mcu1 == 9 || mcu2 == 9 || mcu3 == 9)) {
		if ($(UnitDiv.getElementsByClassName("killingmomentum")[0]).hasClass("hidden") ===true) {
			$(UnitDiv.getElementsByClassName("killingmomentum")[0]).removeClass("hidden");
		}
	}

	//Solar Spire
	if (allowed[8] && (mcu0 == 14 || mcu1 == 14 || mcu2 == 14 || mcu3 == 14)) {
		if ($(UnitDiv.getElementsByClassName("blindingaura")[0]).hasClass("hidden") ===true) {
			$(UnitDiv.getElementsByClassName("blindingaura")[0]).removeClass("hidden");
		}
	} 

	//Stables of Vigor
	if (allowed[10] && (mcu0 == 10 || mcu1 == 10 || mcu2 == 10 || mcu3 == 10)) {
		if ($(UnitDiv.getElementsByClassName("vigorousmount")[0]).hasClass("hidden") ===true) {
			$(UnitDiv.getElementsByClassName("vigorousmount")[0]).removeClass("hidden");
			$(UnitDiv.getElementsByClassName("fasthealing")[0]).removeClass("hidden");
			$(UnitDiv.getElementsByClassName("freemovement")[0]).removeClass("hidden");
			$(UnitDiv.getElementsByClassName("highmorale")[0]).removeClass("hidden");
		}
	} 

	//Lost Library
	if (allowed[11] && (mcu0 == 11 || mcu1 == 11 || mcu2 == 11 || mcu3 == 11)) {
		if ($(UnitDiv.getElementsByClassName("magicacademy")[0]).hasClass("hidden") ===true) {
			$(UnitDiv.getElementsByClassName("magicacademy")[0]).removeClass("hidden");
		}
	}

	//Castle of the Lich King
	if (allowed[12] && (mcu0 == 12 || mcu1 == 12 || mcu2 == 12 || mcu3 == 12)) {
		if ($(UnitDiv.getElementsByClassName("fearstrike")[0]).hasClass("hidden") ===true) {
			$(UnitDiv.getElementsByClassName("fearstrike")[0]).removeClass("hidden");
		}
	} 
	
		//Castle of the Lich King
	if (allowed[7] && (mcu0 == 13 || mcu1 == 13 || mcu2 == 13 || mcu3 == 13)) {
		if ($(UnitDiv.getElementsByClassName("waterconcealment")[0]).hasClass("hidden") ===true) {
			$(UnitDiv.getElementsByClassName("waterconcealment")[0]).removeClass("hidden");
		}
	} 

	//(Rank ability generation)
	switch (rank) {
		case 0://       Scope: this unit template
			// Is the first member of this class hidden
			if ($(UnitDiv.getElementsByClassName("rank1inv")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank1inv').length;//(If it is:) Count amount of times this class occurs
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank1inv")[c]).removeClass("hidden");}// Remove hidden from all those occurrences
			}
			
			if ($(UnitDiv.getElementsByClassName("rank2inv")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank2inv').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank2inv")[c]).removeClass("hidden");}
			}
			
			if ($(UnitDiv.getElementsByClassName("rank3inv")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank3inv').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank3inv")[c]).removeClass("hidden");}
			}
			
			if ($(UnitDiv.getElementsByClassName("rank4inv")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank4inv').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank4inv")[c]).removeClass("hidden");}
			}
			
			count = UnitDiv.querySelectorAll('.rankis0').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rankis0")[c]).removeClass("hidden");}
			break;
		case 1:
			if ($(UnitDiv.getElementsByClassName("rank1")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank1').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank1")[c]).removeClass("hidden");}
			}
			
			if ($(UnitDiv.getElementsByClassName("rank2inv")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank2inv').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank2inv")[c]).removeClass("hidden");}
			}
			
			if ($(UnitDiv.getElementsByClassName("rank3inv")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank3inv').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank3inv")[c]).removeClass("hidden");}
			}
			
			if ($(UnitDiv.getElementsByClassName("rank4inv")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank4inv').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank4inv")[c]).removeClass("hidden");}
			}
			
			count = UnitDiv.querySelectorAll('.rankis1').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rankis1")[c]).removeClass("hidden");}
			break;
		case 2:
			if ($(UnitDiv.getElementsByClassName("rank1")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank1').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank1")[c]).removeClass("hidden");}
			}
			
			if ($(UnitDiv.getElementsByClassName("rank2")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank2').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank2")[c]).removeClass("hidden");}
			}
			
			if ($(UnitDiv.getElementsByClassName("rank3inv")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank3inv').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank3inv")[c]).removeClass("hidden");}
			}
			
			if ($(UnitDiv.getElementsByClassName("rank4inv")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank4inv').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank4inv")[c]).removeClass("hidden");}
			}
			
			count = UnitDiv.querySelectorAll('.rankis2').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rankis2")[c]).removeClass("hidden");}
			break;
		case 3:
			if ($(UnitDiv.getElementsByClassName("rank1")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank1').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank1")[c]).removeClass("hidden");}
			}
			
			if ($(UnitDiv.getElementsByClassName("rank2")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank2').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank2")[c]).removeClass("hidden");}
			}
			
			if ($(UnitDiv.getElementsByClassName("rank3")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank3').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank3")[c]).removeClass("hidden");}
			}
			
			if ($(UnitDiv.getElementsByClassName("rank4inv")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank4inv').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank4inv")[c]).removeClass("hidden");}
			}
			
			count = UnitDiv.querySelectorAll('.rankis3').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rankis3")[c]).removeClass("hidden");}
			break;
		case 4:
			if ($(UnitDiv.getElementsByClassName("rank1")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank1').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank1")[c]).removeClass("hidden");}
			}
			
			if ($(UnitDiv.getElementsByClassName("rank2")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank2').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank2")[c]).removeClass("hidden");}
			}
			
			if ($(UnitDiv.getElementsByClassName("rank3")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank3').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank3")[c]).removeClass("hidden");}
			}
			
			if ($(UnitDiv.getElementsByClassName("rank4")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.rank4').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rank4")[c]).removeClass("hidden");}
			}
			
			count = UnitDiv.querySelectorAll('.rankis4').length;
			for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("rankis4")[c]).removeClass("hidden");}
			break;
	}//Closing switch statement(Rank ability generation)
	 
	switch (race) {// From here, remove all racial abilities                    Scope: this unit template
		case 0://No race
			if ($(UnitDiv.getElementsByClassName("norace")[0]).hasClass("hidden") ===true) { //Is the first member of this class hidden
				count = UnitDiv.querySelectorAll('.norace').length;// (If it is not:) Count amount of times this class occurs
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("norace")[c]).removeClass("hidden");}//Remove hidden from all those occurrences
			}
			break;
		case 1:
			if ($(UnitDiv.getElementsByClassName("draconian")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.draconian').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("draconian")[c]).removeClass("hidden");}
			}
			break;
		case 2:
			if ($(UnitDiv.getElementsByClassName("dwarf")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.dwarf').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("dwarf")[c]).removeClass("hidden");}
			}
			break;
		case 3:
			if ($(UnitDiv.getElementsByClassName("frostling")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.frostling').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("frostling")[c]).removeClass("hidden");}
			}
			break;
		case 4:
			if ($(UnitDiv.getElementsByClassName("goblin")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.goblin').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("goblin")[c]).removeClass("hidden");}
			}
			break;
		case 5:
			if ($(UnitDiv.getElementsByClassName("halfling")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.halfling').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("halfling")[c]).removeClass("hidden");}
			}
			break;
		case 6:
			if ($(UnitDiv.getElementsByClassName("highelf")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.highelf').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("highelf")[c]).removeClass("hidden");}
			}
			break;
		case 7:
			if ($(UnitDiv.getElementsByClassName("human")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.human').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("human")[c]).removeClass("hidden");}
			}
			break;
		case 8:
			if ($(UnitDiv.getElementsByClassName("orc")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.orc').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("orc")[c]).removeClass("hidden");}
			}
			break;
		case 9:
			if ($(UnitDiv.getElementsByClassName("tigran")[0]).hasClass("hidden") ===true) {
				count = UnitDiv.querySelectorAll('.tigran').length;
				for (var c=0 ; c < count ; c++ ) {$(UnitDiv.getElementsByClassName("tigran")[c]).removeClass("hidden");}
			}
			break;
		default:
			break;
	}//End (race) Switch
}
 
function medalselect (rank) {
	switch(rank) {//This Functions changes the Medal Icon to match the unit's Rank.
		case 0:
			return "<img style=\"width:22px;\" src=https://vignette.wikia.nocookie.net/age-of-wonders-3/images/8/86/No_Medal_Text.png/revision/latest?cb=20140901204353>";
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

function healthCalc (hp, rank, tier, upgrade0, upgrade1, upgrade2, upgrade3, allowed, race, unit) {
	if(rank == 4) {
		a = (2*tier)*5;
	}
	else{
		a = (tier*2)*rank;
	}
	
	if (allowed[5] && (upgrade0 == 5 || upgrade1 == 5 || upgrade2 == 5 || upgrade3 == 5)) {
		b = 10;
	} else {
		b = 0;
	}
	
	switch (race) {
		case 4://If race is goblin, -5 health
			c = -5;
			break;
	    case 6://High Elves
	        //Weird exception for high elf hunters.
		    if ($(unit).hasClass('hunter')) { c = -3;} else {c = 0;}
		    break;
	    case 8://If race is orc, +5 health
			c = 5;
			break;
	default: //Otherwise, don't modify
		c = 0;
		break;
	}

	return hp + a + b + c;
}
 
function defenseCalc (def, rank, upgrade0, upgrade1, upgrade2, upgrade3, allowed, race) {
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
	
	//Enchanted Armory
	if (allowed[4] && (upgrade0 == 4 || upgrade1 == 4 || upgrade2 == 4 || upgrade3 == 4)) {
		b = 2 
	} else {
		b = 0
	}
	
	//Enchanted Armory and Dwarf Only Armored Supports
	if (allowed[100] && race == 2) {
    	if (upgrade0 == 4 || upgrade1 == 4 || upgrade2 == 4 || upgrade3 == 4) {
	    	f = 3 
    	} else {
	    	f = 1
	    }
	} else {
	    f = 0
	}
	
	//Solar Spire
	if (allowed[8] && (upgrade0 == 14 || upgrade1 == 14 || upgrade2 == 14 || upgrade3 == 14)) {
		e = 2 
	} else {
		e = 0
	}
	
	//Mercenary Camp
	if (allowed[7] && (upgrade0 == 7 || upgrade1 == 7 || upgrade2 == 7 || upgrade3 == 7)) {
		c = 1 
	} else {
		c = 0
	}
	
	switch (race) {
		case 2://If race is dwarf, +1 defense
			d = 1;
			break;
		default: //Otherwise, don't modify
			d = 0;
			break;
	}
	
	//Dark Pact
	if ($(unit).hasClass('darkpact')){
        if (unit.getElementsByClassName("select-darkpact")[0].getElementsByTagName("input")[0].checked) {
	        g = 1;
	    } else {
            g = 0
        }
    } else {
        g = 0
    }
	
	return def + a + b + c + d + e + f +g;
}
 
function resistanceCalc (res, rank, upgrade0, upgrade1, upgrade2, upgrade3, allowed, race, unit) {
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
	
	if (allowed[4] && (upgrade0 == 4 || upgrade1 == 4 || upgrade2 == 4 || upgrade3 == 4)) {
		b = 1 
	} else {
		b = 0
	}
	
	//Enchanted Armory and Dwarf Only Armored Supports
	if (allowed[100] && race == 2 && (upgrade0 == 4 || upgrade1 == 4 || upgrade2 == 4 || upgrade3 == 4)) {
		f = 1 
	} else {
		f = 0
	}
	
	if (allowed[2] && (upgrade0 == 2 || upgrade1 == 2 || upgrade2 == 2 || upgrade3 == 2)) {
		c = 1 
	} else {
		c = 0
	}
	
	if (allowed[11] && (upgrade0 == 11 || upgrade1 == 11 || upgrade2 == 11 || upgrade3 == 11)) {
		e = 1 
	} else {
		e = 0
	}
	
	switch (race) {
		case 2://If race is dwarf, +1 resistance
			d = 1;
			break;
		case 5://If race is Halfling, +2 resistance for Mounted Archer
		    if ($(unit).hasClass('mountedarcher')) { d = 2;} else {d = 0;}
		    break;
		case 6://If race is high elf, +1 resistance
			d = 1;
			break;
		case 8://If race is orc, -1 resistance
			d = -1;
			break;
		case 9://If race is tigran, -1 resistance
			d = -1;
			break;
		default: //Otherwise, don't modify
			d = 0;
			break;
	}
	
	return res + a + b + c + d + e +f;
}