/* Any JavaScript here will be loaded for all users on every page load. */

$(function () {
    
    var unitInfobox = document.getElementById('unit-infobox');
    if (unitInfobox) var unitValues = RetrieveUnitValuesFromInfobox(unitInfobox);

    var unitStatTable = document.getElementById('unit-stat-table');
    if (unitStatTable) PopulateStatTable(unitStatTable, unitValues);
    
    var shipStatTable = document.getElementById('ship-stat-table');
    if (shipStatTable) PopulateShipTable(shipStatTable, unitValues);
    
}());


function RetrieveUnitValuesFromInfobox(infoboxDiv) {
    var r = [];
    r.size = SStN(infoboxDiv.querySelectorAll('div[data-source="size"]')[0].children[1].innerHTML);
    r.hitPoints = SStN(infoboxDiv.querySelectorAll('div[data-source="hit_points"]')[0].children[1].innerHTML);
    r.movement = SStN(infoboxDiv.querySelectorAll('div[data-source="movement"]')[0].children[1].innerHTML);
    r.cargo = SStN(infoboxDiv.querySelectorAll('div[data-source="cargo"]')[0].children[1].innerHTML);
    r.hangar = SStN(infoboxDiv.querySelectorAll('div[data-source="hangar"]')[0].children[1].innerHTML);
    r.cost = SStN(infoboxDiv.querySelectorAll('div[data-source="cost"]')[0].children[1].innerHTML);
    r.upkeep = SStN(infoboxDiv.querySelectorAll('div[data-source="upkeep"]')[0].children[1].innerHTML);
    r.buildTime = SStN(infoboxDiv.querySelectorAll('div[data-source="const_time"]')[0].children[1].innerHTML);
    r.power = SStN(infoboxDiv.querySelectorAll('div[data-source="power"]')[0].children[1].innerHTML);
    return r;
}


function PopulateStatTable(unitStatTable, unitValues) {
    
  var UNIT_STAT_TABLE_MIN_LEVEL = 1;
  var UNIT_STAT_TABLE_MAX_LEVEL = 10;
  var STAT_STD_MULT = [1, 5, 10, 15, 20, 30, 40, 60, 80, 100];
  var STAT_UPG_COST_MULT = [-1, 4, 5, 5, 5, 10, 10, 20, 20, 20];
  var STAT_UPG_TURN_MULT = [1, 2, 2, 2, 2, 5, 5, 10, 10, 10];
  
  var unitStatTableFirstRow = $('#unit-stat-table-first-row');
  var levelNumber;
  var rowString = "";
  
  for (levelNumber = UNIT_STAT_TABLE_MIN_LEVEL - 1;
       levelNumber < UNIT_STAT_TABLE_MAX_LEVEL;
       levelNumber++)
  {
      var levelText = levelNumber + 1;
      var sizeText = NtSS(unitValues.size * STAT_STD_MULT[levelNumber]);
      var hpText = NtSS(unitValues.hitPoints * STAT_STD_MULT[levelNumber]);
      var mvmtText = unitValues.movement;
      var cargoText = NtSS(unitValues.cargo * STAT_STD_MULT[levelNumber]);
      var costText = NtSS(unitValues.cost * STAT_STD_MULT[levelNumber]);
      var upkeepText = NtSS(unitValues.upkeep * STAT_STD_MULT[levelNumber]);
      var upgTimeText = NtSS(unitValues.buildTime * STAT_UPG_TURN_MULT[levelNumber]);
      var upgCostText = NtSS(unitValues.cost * STAT_UPG_COST_MULT[levelNumber]);
      var powerText = NtSS(unitValues.power * STAT_STD_MULT[levelNumber]);

      rowString += '<tr id="unit-stat-table-row-' + levelText + '">';
      rowString += '<th id="l-' + levelText + '-level" scope="row" style="text-align:center;">' + levelText + '</th>';
      rowString += '<td id="l-' + levelText + '-size" style="text-align:center;">' + sizeText + '</td>';
      rowString += '<td id="l-' + levelText + '-hit-points" style="text-align:center;">' + hpText + '</td>';
      rowString += '<td id="l-' + levelText + '-movement" style="text-align:center;">' + mvmtText + '</td>';
      rowString += '<td id="l-' + levelText + '-cargo" style="text-align:center;">' + cargoText + '</td>';
      rowString += '<td id="l-' + levelText + '-cost" style="text-align:center;">' + costText + '</td>';
      rowString += '<td id="l-' + levelText + '-upkeep" style="text-align:center;">' + upkeepText + '</td>';
      rowString += '<td id="l-' + levelText + '-build-time" style="text-align:center;">' + upgTimeText + ' Turns</td>';
      rowString += '<td id="l-' + levelText + '-upgrade-cost" style="text-align:center;">' + upgCostText + '</td>';
      rowString += '<td id="l-' + levelText + '-power" style="text-align:center;">' + powerText + '</td>';
      rowString += '</tr>';
  }
      unitStatTableFirstRow.after(rowString);
}

// Short String (10k, 50.5m) to Number (10000, 50500000)
function SStN(numericalString) {
    
    if (numericalString === null || numericalString === undefined || numericalString.length < 1) return -1;
    
    // Not a number at all
    var n = parseFloat(numericalString);
    var returnValue = n;
    if (isNaN(n)) return -1;

    // lc = Last character of string
    var lc = numericalString[numericalString.length - 1];
    
    // Regular number
    if (isNaN(lc) === false) returnValue = n;
    
    // Thousands
    else if (lc == 'k') returnValue = n * 1000;

    // Millions
    else if (lc == 'm') returnValue = n * 1000000;

    // Billions
    else if (lc == 'b') returnValue = n * 1000000000;

    // Trillions
    else if (lc == 't') returnValue = n * 1000000000000;
    
    // console.log(returnValue);
    return returnValue;
}

// Number (10000, 50500000) to Short String (10k, 50.5m)
function NtSS(number, precision) {
    if (precision == null) precision = 0;
    
    if (number === null || number === undefined || parseFloat(number) == 'NaN') return "-1";
    
    if (number < 0) return '--';
    
    if (number < 10000) return number.toFixed(precision);
    
    var suffix = ["", "k", "m", "b", "t"];
    var decimalPos = ("" + number).indexOf('.');
	if (decimalPos == -1) decimalPos = ("" + number).length;
    var numExpCount = Math.floor((("" + number).substring(0, decimalPos).length - 1)/3);
    var shortValue = number / Math.pow(1000, numExpCount);
    
    
    // Single digit strings aren't aesthetically pleasing
    if (("" + shortValue).length == 1) shortValue = shortValue + ".0";
    
    // Handle decimals
    decimalPos = ("" + shortValue).indexOf('.');
    
    // Add leading zero to pure decimal values
    if (decimalPos === 0) {
        shortValue = "0" + shortValue;
        decimalPos++;
    }
    
    // Reduce decimal precision to 2 digits
    if (decimalPos > 0 && decimalPos < ("" + shortValue).length - 2) {
        shortValue = ("" + shortValue).substring(0, decimalPos + 3);
    }

    // console.log(shortValue + suffix[numExpCount]);
    return shortValue + suffix[numExpCount];
}


function PopulateShipTable(shipStatTable, unitValues) {
    
  var SHIP_MIN_LEVEL = 0;
  var SHIP_MAX_LEVEL = 50;
  var SHIP_LEVEL_MULTIPLIER = 0.2;
  var SHIP_COST_MULTIPLIER = 0.1;
  var allDropDownParents = document.getElementsByClassName('leveldropdown');
  
  document.getElementById('ship-base-size').innerHTML = NtSS(unitValues.size);
  document.getElementById('ship-base-hit-points').innerHTML = NtSS(unitValues.hitPoints);
  document.getElementById('ship-base-movement').innerHTML = unitValues.movement;
  document.getElementById('ship-base-attack').innerHTML = '1.00x';
  document.getElementById('ship-base-cargo').innerHTML = NtSS(unitValues.cargo);
  document.getElementById('ship-base-hangar').innerHTML = NtSS(unitValues.hangar);
  document.getElementById('ship-base-cost').innerHTML = NtSS(unitValues.cost);
  document.getElementById('ship-base-upkeep').innerHTML = NtSS(unitValues.upkeep);
  document.getElementById('ship-base-build-time').innerHTML = NtSS(unitValues.buildTime);
  document.getElementById('ship-base-power').innerHTML = NtSS(unitValues.power);

  document.getElementById('ship-stat-size').innerHTML = NtSS(unitValues.size);
  document.getElementById('ship-stat-hit-points').innerHTML = NtSS(unitValues.hitPoints);
  document.getElementById('ship-stat-movement').innerHTML = unitValues.movement;
  document.getElementById('ship-stat-attack').innerHTML = '1.00x';
  document.getElementById('ship-stat-cargo').innerHTML = NtSS(unitValues.cargo);
  document.getElementById('ship-stat-hangar').innerHTML = NtSS(unitValues.hangar);
  document.getElementById('ship-stat-cost').innerHTML = NtSS(unitValues.cost);
  document.getElementById('ship-stat-upkeep').innerHTML = NtSS(unitValues.upkeep);
  document.getElementById('ship-stat-build-time').innerHTML = NtSS(unitValues.buildTime);
  document.getElementById('ship-stat-power').innerHTML = NtSS(unitValues.power);
  
  for (var c = 0; c < allDropDownParents.length; c++) {
      var thisDropDown = allDropDownParents[c];
      var dropdownID = thisDropDown.id.replace('ldd', 'ddl');
      if (dropdownID == 'ddl-hangar' && unitValues.hangar < 1) continue;
      
      var selectElement = CreateLevelDropdown(dropdownID, SHIP_MIN_LEVEL, SHIP_MAX_LEVEL);
      thisDropDown.innerHTML = selectElement;
      
      document.getElementById(dropdownID).onchange = function(e) {
        
        var selectID = e.srcElement.id;
        var baseID = selectID.replace('ddl', 'ship-base');
        var linkedID = selectID.replace('ddl', 'ship-stat');
        
        var selectedLevel = document.getElementById(selectID).value;
        var baseValue = SStN(document.getElementById(baseID).innerHTML);

        var displayElement = document.getElementById(linkedID);
        
        if (selectID.includes('attack')) {
            var newValue = NtSS(baseValue * (1 + (selectedLevel * SHIP_LEVEL_MULTIPLIER)), 2) + 'x';
            displayElement.innerHTML = newValue;
        } else {
            var newValue = baseValue * (1 + (selectedLevel * SHIP_LEVEL_MULTIPLIER));
            displayElement.innerHTML = NtSS(newValue);
        }
          
        
        var totalLevel = 0;
        for (var c = 0; c < allDropDownParents.length; c++) {
            var thisDropDownChildren = allDropDownParents[c].children;
            if (thisDropDownChildren.length > 0) {
                var thisDropDown = thisDropDownChildren[0];
                totalLevel += parseInt(thisDropDown.value);
            }    
        }
        
        var baseUpkeep = SStN(document.getElementById('ship-base-upkeep').innerHTML);
        var basePower = SStN(document.getElementById('ship-base-power').innerHTML);
        
        document.getElementById('ship-stat-upkeep').innerHTML = NtSS(baseUpkeep * (1 + (totalLevel * SHIP_COST_MULTIPLIER)));
        document.getElementById('ship-stat-power').innerHTML = NtSS(basePower * (1 + (totalLevel * SHIP_COST_MULTIPLIER)));
      }
   }
}

function CreateLevelDropdown(dropdownID, minLevel, maxLevel) {
    if (maxLevel < minLevel) {
        var hold = maxLevel;
        maxLevel = minLevel;
        minLevel = hold;
    }
     
    var rString = '';
    rString += '<select id="' + dropdownID + '">';
    for (var c = minLevel; c <= maxLevel; c++) {
        rString += '<option value="' + c + '">' + c + '</option>';
    }
    rString += '</select>';
    return rString;
}