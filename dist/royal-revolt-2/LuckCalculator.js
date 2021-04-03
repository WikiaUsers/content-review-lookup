/* Adds the form for the luck calculator to the page as described here: http://community.wikia.com/wiki/Thread:942109*/
if ($('#luckCalculatorDiv').length) {
    document.getElementById('luckCalculatorDiv').innerHTML =
        '<div style="display: table;	margin-left: auto;	margin-right: auto; margin-bottom:10px"><div style="display: table-cell;">' +
'<span style="float:left"><b>Helmet</b><br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% <br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% </span>' +
'<span style="float:left"><b>Cape</b><br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% <br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% </span>' +
'<span style="float:left; padding:10px"></span>' +
'<span style="float:left"><b>Armor</b><br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% <br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% </span>' +
'<span style="float:left"><b>Pauldron</b><br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% <br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% </span>' +
'<span style="float:left; padding:10px"></span>' +
'<span style="float:left"><b>Weapon</b><br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% <br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% </span>' +
'<span style="float:left"><b>Gauntlets</b><br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% <br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% </span>' +
'</div></div>' +
'<div style="display: table;	margin-left: auto;	margin-right: auto;"><div style="display: table-cell;">' +
'<span style="float:left"><b>Ring</b><br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% <br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% </span>' +
'<span style="float:left"><b>Belt</b><br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% <br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% </span>' +
'<span style="float:left"><b>Boots</b><br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% <br><input type="number" class="luckPerk" step="0.01" max="17" min="0">% </span>' +
'</div></div>';
}
        
/* Calculates the results for the luck calculator */
$(".luckPerk").on("change", function() {
    var items = [];
    var luck = 1;
    var elements = document.getElementsByClassName("luckPerk");
    for (var i = 0; i < elements.length; i++) {
    	var perk = parseFloat(elements[i].value);
      if(!isNaN(perk)) luck *= (1 - perk/100);
 		}
    
    var chestChances = [
    	1 - 0.25 * luck,
        1 - 0.6 * luck,
        1 - 0.75 * luck
    ];
    
    var chancesForXChests = [
    	chestChances[0] * (1 - chestChances[1]),
    	chestChances[0] * chestChances[1] * (1 - chestChances[2]),
        chestChances[0] * chestChances[1] * chestChances[2]
    ];
    
    document.getElementById("badLuck").innerHTML = Math.round(10000*(1 - luck))/100 + "%";
    
    document.getElementById("1stChest").innerHTML = Math.round(10000*chestChances[0])/100;
    document.getElementById("2ndChest").innerHTML = Math.round(10000*chestChances[1])/100;
    document.getElementById("3rdChest").innerHTML = Math.round(10000*chestChances[2])/100;
    
    /* Chance to open not open 1st */
    document.getElementById("zeroChests").innerHTML = Math.round(0.25 * luck * 10000)/100;
    
    /* Chance to open 1st x chance to not open 2nd  */
    document.getElementById("oneChest").innerHTML = Math.round(chancesForXChests[0] * 10000)/100;
    
    /* Chance to open 1st x chance to open 2nd x chance to not open 3rd */
    document.getElementById("twoChests").innerHTML = Math.round(chancesForXChests[1] * 10000)/100;
    
    /* Chance to open 1st x chance to open 2nd x chance to open 3rd */
    document.getElementById("threeChests").innerHTML = Math.round(chancesForXChests[2] * 10000)/100;
    document.getElementById("averageChests").innerHTML = Math.round((chancesForXChests[0] + 2*chancesForXChests[1] + 3*chancesForXChests[2]) *100)/100;
});