$(".luckPerk").live("change", function() {
// $("#submitLuckCalculator").live("click", function() {
    var items = [];
    var luck = 1;
    var elements = document.getElementsByClassName("luckPerk");
    
    for (var i = 0; i < elements.length; i++) {
    	var perk = parseFloat(elements[i].value);
    	
    	if(!isNaN(perk))
            luck *= (1 - perk/100);
 	}
    
    var chestChances = [
        1 - 0.25 * luck,
        1 - 0.60 * luck,
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
    
    // Chance to open 1st x chance to not open 2nd
    document.getElementById("oneChest").innerHTML = Math.round(chancesForXChests[0] * 10000)/100;
    
    // Chance to open 1st x chance to open 2nd x chance to not open 3rd
    document.getElementById("twoChests").innerHTML = Math.round(chancesForXChests[1] * 10000)/100;
    
    // Chance to open 1st x chance to open 2nd x chance to open 3rd
    document.getElementById("threeChests").innerHTML = Math.round(chancesForXChests[2] * 10000)/100;
    document.getElementById("averageChests").innerHTML = Math.round((chancesForXChests[0] + 2*chancesForXChests[1] + 3*chancesForXChests[2]) *100)/100;
});