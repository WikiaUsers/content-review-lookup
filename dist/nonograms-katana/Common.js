/* Any JavaScript here will be loaded for all users on every page load. */

//Changes every output cell in the table to "0" or "".
function delete_table(){
	document.getElementById("xp").innerHTML = "0";
	document.getElementById("coin").innerHTML = "0";
	document.getElementById("ruby").innerHTML = "0";
	document.getElementById("item1").innerHTML = "0";
	document.getElementById("item2").innerHTML = "0";
	document.getElementById("bt_ram").innerHTML = "0";
	document.getElementById("tr_map").innerHTML = "0";
	document.getElementById("unlocks1").innerHTML = "";
	document.getElementById("unlocks2").innerHTML = "";
	document.getElementById("unlocks3").innerHTML = "";
	document.getElementById("unlocks4").innerHTML = "";
	document.getElementById("unlocks5").innerHTML = "";
}
//Calculates rewards for levels on page "Levelling".
function calculate() {
	var level = document.getElementById("level").value;
	//If the input is not a number or if the number is not between 2 and 1000, clears the table.
	if(isNaN(level)){
    	document.getElementById("wrong_number").innerHTML = "Please enter a number.";
		delete_table();
		return;
        }
	if (level < 2){
		document.getElementById("wrong_number").innerHTML = "You have enter a number smaller than 2.";
		delete_table();
		return;
	}
	if (level > 1000){
		document.getElementById("wrong_number").innerHTML = "You have enter a number bigger than 1000.";
		delete_table();
		return;
	}
	document.getElementById("wrong_number").innerHTML = "";
	var xp = 1000, ruby = 1, bt_ram = 1, tr_map = 3;
	var items1 = [
		["5","https://static.wikia.nocookie.net/nonograms-katana/images/f/f0/Arrows.png/revision/latest?cb=20210710185924"],
		["5","https://static.wikia.nocookie.net/nonograms-katana/images/b/b9/Fan.png/revision/latest?cb=20210710185840"],
		["5","https://static.wikia.nocookie.net/nonograms-katana/images/a/ac/Shuriken.png/revision/latest?cb=20210710190109"],
		["5","https://static.wikia.nocookie.net/nonograms-katana/images/e/e9/Katana.png/revision/latest?cb=20210710190010"],
		["5","https://static.wikia.nocookie.net/nonograms-katana/images/9/9a/Spikes.png/revision/latest?cb=20210710190757"],
		["5","https://static.wikia.nocookie.net/nonograms-katana/images/7/7c/Boomerang.png/revision/latest?cb=20210710190854"],
		["5","https://static.wikia.nocookie.net/nonograms-katana/images/3/31/Petard.png/revision/latest?cb=20210710190156"],
		["5","https://static.wikia.nocookie.net/nonograms-katana/images/3/3b/Bomb.png/revision/latest?cb=20210710190341"],
		["5","https://static.wikia.nocookie.net/nonograms-katana/images/c/c9/Steel.png/revision/latest?cb=20210710193716"],
		["5","https://static.wikia.nocookie.net/nonograms-katana/images/a/a7/Iron_sand.png/revision/latest?cb=20210710194025"],
		["2","https://static.wikia.nocookie.net/nonograms-katana/images/6/6d/Sushi.png/revision/latest?cb=20210710194303"],
		["1","https://static.wikia.nocookie.net/nonograms-katana/images/8/83/Mortar.png/revision/latest?cb=20210307192837"]];
	var items2 = [
		["0",""],
		["0",""],
		["0",""],
		["0",""],
		["0",""],
		["0",""],
		["0",""],
		["0",""],
		["5","https://static.wikia.nocookie.net/nonograms-katana/images/4/4f/Charcoal.png/revision/latest?cb=20210710193800"],
		["5","https://static.wikia.nocookie.net/nonograms-katana/images/9/92/Chemicals.png/revision/latest?cb=20210710194109"],
		["0",""],
		["0",""]];
	var unlocks = [["Workshop lvl. 1","","","",""],
					["Shop lvl. 1","Warrior","","",""],
					["Pagoda lvl. 1","","","",""],
					["Warehouse lvl. 1","","","",""],
					["Alchemist's Hut lvl. 1","Wizard","","",""],
					["Pagoda lvl. 2","Logistician lvl. 1","Weapon Collector lvl. 1","Treasure Hunter lvl. 1",""],
					["Furnace lvl. 1","","","",""],
					["Smithy lvl. 1","Rouge","","",""],
					["Gong (building) lvl. 1","Pagoda lvl. 3","Logistician lvl. 2","Athlete lvl. 1","Antiquarian lvl. 1"],
					["Lumber Mill lvl. 1","Intellectual lvl. 1","","",""],
					["Garden lvl. 1","Monk","","",""],
					["Rock Garden lvl. 1","Logistician lvl. 3","Weapon Collector lvl. 2","Treasure Hunter lvl. 2",""],
					["Pagoda lvl. 4","","","",""],
					["Geologist","Athlete lvl. 2","","",""],
					["Logistician lvl. 4","Antiquarian lvl. 2","","",""],
					["Intellectual lvl. 2","","","",""],
					["Pagoda lvl. 5","Archeologist","","",""],
					["Logistician lvl. 5","Weapon Collector lvl. 3","Treasure Hunter lvl. 3","",""],
					["Onsen lvl. 1","Athlete lvl. 3","","",""],
					["Coffee Bonsai lvl. 1","Samurai","Gardener lvl. 1","Rock Garden Contemplator lvl. 1",""],
					["Ship lvl. 1","Pier lvl. 1","Carpenter lvl. 1","Metallurgist lvl. 1",""],
					["Pagoda lvl. 6","Mechanic lvl. 1","Blacksmith lvl. 1","ship expedition type: Exploring",""],
					["Food Stall lvl. 1","Ninja","Alchemist lvl. 1","ship expedition type: Fishing",""],
					["Athlete lvl. 4","ship expedition type: Prospecting","","",""],
					["Gardener lvl. 2","Rock Garden Contemplator lvl. 2","Boatswain lvl. 1","ship expedition type: Patrolling",""],
					["Adventurer","Carpenter lvl. 2","Metallurgist lvl. 2","",""],
					["Pagoda lvl. 7","Mechanic lvl. 2","Blacksmith lvl. 2","",""],
					["Alchemist lvl. 2","","","",""],
					["Scientist","Athlete lvl. 5","","",""],
					["Boatswain lvl. 2","","","",""],
					["Carpenter lvl. 3","Metallurgist lvl. 3","","",""],
					["Mechanic lvl. 3","Blacksmith lvl. 3","","",""],
					["Alchemist lvl. 3","","","",""]];
	
	//Calculates experience.
	for (i = 2; i < level; i++) {
		xp += i*1000; 
	}

	//Logic for Rubies.
	if (level % 5 === 0) {
		ruby = 2;
	}
	if (level % 10 === 0) {
		ruby = 3;
	}

	//Calculates first and second item rewards. "n" is the number of item in the array.
	var n = (level-2)%12;
	
	//Logic for Treasure map fragments.
	if (level == 5) {
		tr_map = 5;
	}
	
	//Adds commas if the xp number is larger than 3 digits.
	var p = 0;
	var xpArray = xp.toString(10).split("");
	for (k = 3; k < xpArray.length-p; k += 3){
		xpArray.splice(-(k+p),0,",");
		p += 1;
	}
	xp = xpArray.join("");
	
	//Displays everything in the table.
	document.getElementById("xp").innerHTML = xp;
	
	document.getElementById("coin").innerHTML = level*2 + " x ";
	var imgCoin = document.createElement("img");
	imgCoin.src = "https://static.wikia.nocookie.net/nonograms-katana/images/6/6d/Coin.png/revision/latest?cb=20210710184706";
	imgCoin.width = "30";
	imgCoin.height = "30";
	document.getElementById("coin").appendChild(imgCoin);
	
	document.getElementById("ruby").innerHTML = ruby + " x ";
	var imgRuby = document.createElement("img");
	imgRuby.src = "https://static.wikia.nocookie.net/nonograms-katana/images/a/a9/Ruby.png/revision/latest?cb=20210710184829";
	imgRuby.width = "30";
	imgRuby.height = "30";
	document.getElementById("ruby").appendChild(imgRuby);
	
	document.getElementById("item1").innerHTML = items1[n][0] + " x ";
	var imgItem1 = document.createElement("img");
	imgItem1.src = items1[n][1];
	imgItem1.width = "30";
	imgItem1.height = "30";
	document.getElementById("item1").appendChild(imgItem1);
	
	if (n == 8 || n == 9){
		document.getElementById("item2").innerHTML = items2[n][0] + " x ";
		var imgItem2 = document.createElement("img");
		imgItem2.src = items2[n][1];
		imgItem2.width = "30";
		imgItem2.height = "30";
		document.getElementById("item2").appendChild(imgItem2);
	} else {
		document.getElementById("item2").innerHTML = "0";
	}
	
	if (level > 13) {
		document.getElementById("bt_ram").innerHTML = bt_ram + " x ";
		var imgBTram = document.createElement("img");
		imgBTram.src = "https://static.wikia.nocookie.net/nonograms-katana/images/0/0e/Battering_ram.png/revision/latest?cb=20210710192019";
		imgBTram.width = "30";
		imgBTram.height = "30";
		document.getElementById("bt_ram").appendChild(imgBTram);
	} else {
		document.getElementById("bt_ram").innerHTML = "0";
	}
	
	if (level > 4) {
		document.getElementById("tr_map").innerHTML = tr_map + " x ";
		var imgTRmap = document.createElement("img");
		imgTRmap.src = "https://static.wikia.nocookie.net/nonograms-katana/images/9/9b/Treasure_map_fragment_lvl._1.png/revision/latest?cb=20210710194412";
		imgTRmap.width = "30";
		imgTRmap.height = "30";
		document.getElementById("tr_map").appendChild(imgTRmap);
	} else {
		document.getElementById("tr_map").innerHTML = "0";
	}
	
	if (level < 35){
		document.getElementById("unlocks1").innerHTML = unlocks[level-2][0];
		document.getElementById("unlocks2").innerHTML = unlocks[level-2][1];
		document.getElementById("unlocks3").innerHTML = unlocks[level-2][2];
		document.getElementById("unlocks4").innerHTML = unlocks[level-2][3];
		document.getElementById("unlocks5").innerHTML = unlocks[level-2][4];
	} else {
		document.getElementById("unlocks1").innerHTML = "";
		document.getElementById("unlocks2").innerHTML = "";
		document.getElementById("unlocks3").innerHTML = "";
		document.getElementById("unlocks4").innerHTML = "";
		document.getElementById("unlocks5").innerHTML = "";
	}
}

//Creates the input box and button on page "Levelling".
if (mw.config.get("wgPageName") === "Levelling") {
	var inputBox = document.createElement("div");
	var input = document.createElement("input");
	input.id = "level";
	var getAnswer = document.createElement("button");
	getAnswer.innerHTML = "Calculate"; 
	getAnswer.addEventListener("click", calculate); 
	inputBox.appendChild(input);
	inputBox.appendChild(getAnswer);
	document.getElementById("reward_calculator").appendChild(inputBox); 
}