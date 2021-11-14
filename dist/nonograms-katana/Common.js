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
	document.getElementById("add_reward1").innerHTML = "";
	document.getElementById("add_reward2").innerHTML = "";
	document.getElementById("add_reward3").innerHTML = "";
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
		/*lvl. 3*/	["Shop lvl. 1","Warrior","","",""],
		/*lvl. 4*/	["Pagoda lvl. 1","","","",""],
		/*lvl. 5*/	["Warehouse lvl. 1","","","",""],
		/*lvl. 6*/	["Alchemist's Hut lvl. 1","Wizard","","",""],
		/*lvl. 7*/	["Pagoda lvl. 2","Logistician lvl. 1","Weapon Collector lvl. 1","Treasure Hunter lvl. 1",""],
		/*lvl. 8*/	["Furnace lvl. 1","","","",""],
		/*lvl. 9*/	["Smithy lvl. 1","Rouge","","",""],
		/*lvl. 10*/	["Gong (building) lvl. 1","Pagoda lvl. 3","Logistician lvl. 2","Athlete lvl. 1","Antiquarian lvl. 1"],
		/*lvl. 11*/	["Lumber Mill lvl. 1","Intellectual lvl. 1","","",""],
		/*lvl. 12*/	["Garden lvl. 1","Monk","","",""],
		/*lvl. 13*/	["Rock Garden lvl. 1","Logistician lvl. 3","Weapon Collector lvl. 2","Treasure Hunter lvl. 2",""],
		/*lvl. 14*/	["Pagoda lvl. 4","","","",""],
		/*lvl. 15*/	["Geologist","Athlete lvl. 2","","",""],
		/*lvl. 16*/	["Logistician lvl. 4","Antiquarian lvl. 2","","",""],
		/*lvl. 17*/	["Intellectual lvl. 2","","","",""],
		/*lvl. 18*/	["Pagoda lvl. 5","Archeologist","","",""],
		/*lvl. 19*/	["Logistician lvl. 5","Weapon Collector lvl. 3","Treasure Hunter lvl. 3","",""],
		/*lvl. 20*/	["Onsen lvl. 1","Athlete lvl. 3","","",""],
		/*lvl. 21*/	["Coffee Bonsai lvl. 1","Samurai","Gardener lvl. 1","Rock Garden Contemplator lvl. 1",""],
		/*lvl. 22*/	["Ship lvl. 1","Pier lvl. 1","Carpenter lvl. 1","Metallurgist lvl. 1",""],
		/*lvl. 23*/	["Pagoda lvl. 6","Mechanic lvl. 1","Blacksmith lvl. 1","ship expedition type: Exploring",""],
		/*lvl. 24*/	["Food Stall lvl. 1","Ninja","Alchemist lvl. 1","ship expedition type: Fishing",""],
		/*lvl. 25*/	["Athlete lvl. 4","ship expedition type: Prospecting","","",""],
		/*lvl. 26*/	["Gardener lvl. 2","Rock Garden Contemplator lvl. 2","Boatswain lvl. 1","ship expedition type: Patrolling",""],
		/*lvl. 27*/	["Adventurer","Carpenter lvl. 2","Metallurgist lvl. 2","",""],
		/*lvl. 28*/	["Pagoda lvl. 7","Mechanic lvl. 2","Blacksmith lvl. 2","",""],
		/*lvl. 29*/	["Alchemist lvl. 2","","","",""],
		/*lvl. 30*/	["Bridge lvl. 1","Caravan lvl. 1","Scientist","Athlete lvl. 5",""],
		/*lvl. 31*/	["Outpost lvl. 1","Boatswain lvl. 2","","",""],
		/*lvl. 32*/	["Alchemist's Hut lvl. 6","Tailor lvl. 1","Carpenter lvl. 3","Metallurgist lvl. 3",""],
		/*lvl. 33*/	["Mechanic lvl. 3","Blacksmith lvl. 3","","",""],
		/*lvl. 34*/	["Alchemist lvl. 3","","","",""],
		/*lvl. 35*/	["Athlete lvl. 6","Intellectual lvl. 3","","",""]];
	
	var firework = "https://static.wikia.nocookie.net/nonograms-katana/images/2/24/Firework.png/revision/latest?cb=20211025160230";
	var ramen = "https://static.wikia.nocookie.net/nonograms-katana/images/f/f8/Ramen.png/revision/latest?cb=20210614184327";
	var curry = "https://static.wikia.nocookie.net/nonograms-katana/images/d/dd/Curry.png/revision/latest?cb=20210716171827";
	var date_cake = "https://static.wikia.nocookie.net/nonograms-katana/images/1/12/Date_cake.png/revision/latest?cb=20211025160247";
	var kimono = "https://static.wikia.nocookie.net/nonograms-katana/images/8/85/Kimono.png/revision/latest?cb=20211026102346";
	var ninja_suit = "https://static.wikia.nocookie.net/nonograms-katana/images/3/3d/Ninja_suit.png/revision/latest?cb=20211026102357";
	var samurai_armor = "https://static.wikia.nocookie.net/nonograms-katana/images/5/51/Samurai_armor.png/revision/latest?cb=20211026102409";
	//Additional rewards for levels: 30, 50, 80 and 100.
	var add_level = [30, 50, 80, 100];
	var add_rewards = [["3", firework, "0", "0", "0", "0"],
						["1", ramen, "1", curry, "1", date_cake],
						["1", kimono, "1", ninja_suit, "1", samurai_armor],
						["3", firework, "1", date_cake, "1", samurai_armor]];
	
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
	
	var coins = level*2;
	if (coins > 200){
		coins = 200;
	}
	document.getElementById("coin").innerHTML = coins + " x ";
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
	
	if (level < 36){
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
	if (level == 80){
		document.getElementById("unlocks1").innerHTML = "Zen Master";
	}
	
	var ar = -1;
	for (i = 0; i < add_level.length; i++){
		if (level == add_level[i]){
			var ar = i;
		}
	}
	
	if (ar != -1){
		document.getElementById("add_reward1").innerHTML = add_rewards[ar][0] + " x ";
		var imgAddItem1 = document.createElement("img");
		imgAddItem1.src = add_rewards[ar][1];
		imgAddItem1.width = "30";
		imgAddItem1.height = "30";
		document.getElementById("add_reward1").appendChild(imgAddItem1);
		
		if (add_rewards[ar][2] != "0"){
			document.getElementById("add_reward2").innerHTML = add_rewards[ar][2] + " x ";
			var imgAddItem2 = document.createElement("img");
			imgAddItem2.src = add_rewards[ar][3];
			imgAddItem2.width = "30";
			imgAddItem2.height = "30";
			document.getElementById("add_reward2").appendChild(imgAddItem2);
		} else {
			document.getElementById("add_reward2").innerHTML = "0";
		}
		
		if (add_rewards[ar][4] != "0"){
			document.getElementById("add_reward3").innerHTML = add_rewards[ar][4] + " x ";
			var imgAddItem3 = document.createElement("img");
			imgAddItem3.src = add_rewards[ar][5];
			imgAddItem3.width = "30";
			imgAddItem3.height = "30";
			document.getElementById("add_reward3").appendChild(imgAddItem3);
		} else {
			document.getElementById("add_reward3").innerHTML = "0";
		}
	} else {
		document.getElementById("add_reward1").innerHTML = "0";
		document.getElementById("add_reward2").innerHTML = "0";
		document.getElementById("add_reward3").innerHTML = "0";
	}
}

//Changes every output cell in the table to "0" or "".
function delete_table_m(){
	document.getElementById("mosaic").innerHTML = "#0";
	document.getElementById("collected").innerHTML = "0";
	document.getElementById("needed").innerHTML = "0";
	document.getElementById("percent").innerHTML = "0";
}

//Calculates how many fragments are still needed to complete a mosaic, plus some other useful information.
function mosaic_calculator_f(){
	var fragments = document.getElementById("fragments").value;
	//If the input is not a number or if the number is not between 0 and 13,808, clears the table.
	if(isNaN(fragments)){
    	document.getElementById("wrong_number").innerHTML = "Please enter a number.";
		delete_table_m();
		return;
        }
	if (fragments < 0){
		document.getElementById("wrong_number").innerHTML = "You have enter a number smaller than 0.";
		delete_table_m();
		return;
	}
	if (fragments > 13808){
		document.getElementById("wrong_number").innerHTML = "You have enter a number bigger than 13,808.";
		delete_table_m();
		return;
	}
	if (fragments == 13808){
		document.getElementById("wrong_number").innerHTML = "Congratulations, you have completed all mosaics.";
		delete_table_m();
		return;
	}
	document.getElementById("wrong_number").innerHTML = "";
	
	//Logic of the calculator..
	var mosaics_f = [0, 368, 1008, 1648, 2288, 3568, 6128, 8688, 11248, 13808];
	for (i = 1; i < mosaics_f.length; i++){
		if (fragments < mosaics_f[i]){
			document.getElementById("mosaic").innerHTML = "#" + i;
			var collected = document.getElementById("collected").innerHTML = fragments - mosaics_f[i-1];
			document.getElementById("needed").innerHTML = mosaics_f[i] - fragments;
			document.getElementById("percent").innerHTML = Math.round((collected/(mosaics_f[i] - mosaics_f[i-1])) * 10000)/100 + "%";
			break;
		}
	}
}

//Creates the input box and button on page "Levelling".
if (mw.config.get("wgPageName") === "Levelling") {
	var inputBox = document.createElement("div");
	var input = document.createElement("input");
	input.id = "level";
	var getAnswer = document.createElement("button");
	getAnswer.innerHTML = "Calculate"; 
	getAnswer.id = "myBtn";
	getAnswer.addEventListener("click", calculate); 
	inputBox.appendChild(input);
	inputBox.appendChild(getAnswer);
	inputBox.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("myBtn").click();
		}
	});
	document.getElementById("reward_calculator").appendChild(inputBox); 
}

//Creates the input box and button on page "Mosaic".
if (mw.config.get("wgPageName") === "Mosaic") {
	var inputBox = document.createElement("div");
	var input = document.createElement("input");
	input.id = "fragments";
	var getAnswer = document.createElement("button");
	getAnswer.innerHTML = "Calculate"; 
	getAnswer.id = "myBtn";
	getAnswer.addEventListener("click", mosaic_calculator_f); 
	inputBox.appendChild(input);
	inputBox.appendChild(getAnswer);
	inputBox.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("myBtn").click();
		}
	});
	document.getElementById("mosaic_calculator").appendChild(inputBox); 
}