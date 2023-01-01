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
	document.getElementById("level_display").innerHTML = level;
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
	//Here are listed when buildings, classes (character), skills (character) and ship mission types unlock.
	var unlocks = [["Workshop lvl. 1"],
		/*lvl. 3*/	["Shop lvl. 1","Class: Warrior"],
		/*lvl. 4*/	["Pagoda lvl. 1"],
		/*lvl. 5*/	["Warehouse lvl. 1"],
		/*lvl. 6*/	["Alchemist's Hut lvl. 1","Class: Wizard"],
		/*lvl. 7*/	["Pagoda lvl. 2","Field lvl. 1","Skill: Logistician lvl. 1","Skill: Weapon Collector lvl. 1","Skill: Treasure Hunter lvl. 1"],
		/*lvl. 8*/	["Furnace lvl. 1","Food Stall lvl. 1"],
		/*lvl. 9*/	["Smithy lvl. 1","Windmill lvl. 1","Class: Rogue"],
		/*lvl. 10*/	["Gong lvl. 1","Pagoda lvl. 3","Dungeon lvl. 1","Skill: Logistician lvl. 2","Skill: Athlete lvl. 1","Skill: Antiquarian lvl. 1"],
		/*lvl. 11*/	["Lumber Mill lvl. 1","Skill: Intellectual lvl. 1"],
		/*lvl. 12*/	["Garden lvl. 1","Class: Monk"],
		/*lvl. 13*/	["Rock Garden lvl. 1","Skill: Logistician lvl. 3","Skill: Weapon Collector lvl. 2","Skill: Treasure Hunter lvl. 2"],
		/*lvl. 14*/	["Pagoda lvl. 4"],
		/*lvl. 15*/	["Class: Geologist","Skill: Athlete lvl. 2"],
		/*lvl. 16*/	["Skill: Logistician lvl. 4","Skill: Antiquarian lvl. 2"],
		/*lvl. 17*/	["Skill: Intellectual lvl. 2"],
		/*lvl. 18*/	["Pagoda lvl. 5","Class: Archeologist"],
		/*lvl. 19*/	["Skill: Logistician lvl. 5","Skill: Weapon Collector lvl. 3","Skill: Treasure Hunter lvl. 3"],
		/*lvl. 20*/	["Onsen lvl. 1","Skill: Athlete lvl. 3"],
		/*lvl. 21*/	["Coffee Bonsai lvl. 1","Class: Samurai","Skill: Gardener lvl. 1","Skill: Rock Garden Contemplator lvl. 1"],
		/*lvl. 22*/	["Ship lvl. 1","Pier lvl. 1","Skill: Carpenter lvl. 1","Skill: Metallurgist lvl. 1"],
		/*lvl. 23*/	["Pagoda lvl. 6","Skill: Mechanic lvl. 1","Skill: Blacksmith lvl. 1","Ship: Exploring"],
		/*lvl. 24*/	["Class: Ninja","Skill: Alchemist lvl. 1","Ship: Fishing"],
		/*lvl. 25*/	["Skill: Athlete lvl. 4","Ship: Prospecting"],
		/*lvl. 26*/	["Skill: Gardener lvl. 2","Skill: Rock Garden Contemplator lvl. 2","Skill: Boatswain lvl. 1","Ship: Patrolling"],
		/*lvl. 27*/	["Class: Adventurer","Skill: Carpenter lvl. 2","Skill: Metallurgist lvl. 2"],
		/*lvl. 28*/	["Pagoda lvl. 7","Skill: Mechanic lvl. 2","Skill: Blacksmith lvl. 2"],
		/*lvl. 29*/	["Skill: Alchemist lvl. 2"],
		/*lvl. 30*/	["Bridge lvl. 1","Caravan lvl. 1","Class: Scientist","Skill: Athlete lvl. 5"],
		/*lvl. 31*/	["Outpost lvl. 1","Skill: Boatswain lvl. 2"],
		/*lvl. 32*/	["Alchemist's Hut lvl. 6","Tailor lvl. 1","Skill: Carpenter lvl. 3","Skill: Metallurgist lvl. 3"],
		/*lvl. 33*/	["Skill: Mechanic lvl. 3","Skill: Blacksmith lvl. 3"],
		/*lvl. 34*/	["Skill: Alchemist lvl. 3","? Skill: Cameleer lvl. 1"],
		/*lvl. 35*/	["Skill: Athlete lvl. 6","Skill: Intellectual lvl. 3"],
		/*lvl. 36*/	[""],
		/*lvl. 37*/	[""],
		/*lvl. 38*/	[""],
		/*lvl. 39*/	["Skill: Cameleer lvl. 2"],
		/*lvl. 40*/	["Airship lvl. 1"],
		/*lvl. 41*/	[""],
		/*lvl. 42*/	[""],
		/*lvl. 43*/	[""],
		/*lvl. 44*/	["Skill: Aeronaut lvl. 1"],
		/*lvl. 45*/	[""],
		/*lvl. 46*/	[""],
		/*lvl. 47*/	[""],
		/*lvl. 48*/	[""],
		/*lvl. 49*/	["Skill: Aeronaut lvl. 2"]];
	
	//Images for additional rewards.
	var firework = "https://static.wikia.nocookie.net/nonograms-katana/images/2/24/Firework.png/revision/latest?cb=20211025160230";
	var ramen = "https://static.wikia.nocookie.net/nonograms-katana/images/f/f8/Ramen.png/revision/latest?cb=20210614184327";
	var curry = "https://static.wikia.nocookie.net/nonograms-katana/images/d/dd/Curry.png/revision/latest?cb=20210716171827";
	var date_cake = "https://static.wikia.nocookie.net/nonograms-katana/images/1/12/Date_cake.png/revision/latest?cb=20211025160247";
	var kimono = "https://static.wikia.nocookie.net/nonograms-katana/images/8/85/Kimono.png/revision/latest?cb=20211026102346";
	var ninja_suit = "https://static.wikia.nocookie.net/nonograms-katana/images/3/3d/Ninja_suit.png/revision/latest?cb=20211026102357";
	var samurai_armor = "https://static.wikia.nocookie.net/nonograms-katana/images/5/51/Samurai_armor.png/revision/latest?cb=20211026102409";
	//Additional rewards for levels: 30, 50, 80 and 100 (and 150, 200, 250, etc.).
	var add_level = [30, 50, 80, 100];
	var add_rewards = [["3", firework, "0", "", "0", ""],
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
	
	//Writes unlockables into the table.
	for (j = 0; j < 6; j += 1){
		try {
			if (unlocks[level-2][j]){
				document.getElementById("unlocks"+(j+1)).innerHTML = unlocks[level-2][j];
			} else {
				document.getElementById("unlocks"+(j+1)).innerHTML = "";
			}
		}
		catch (TypeError){
			document.getElementById("unlocks"+(j+1)).innerHTML = "";
		}
		
	}

	if (level == 80){
		document.getElementById("unlocks1").innerHTML = "Class: Zen Master";
	}
	
	//This helps with calculating additional rewards.
	var ar = -1;
	for (i = 0; i < add_level.length; i++){
		if (level == add_level[i]){
			var ar = i;
		}
	}
	//Displays additional rewards for jubilee levels.
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
	
	//Displays additional rewards for levels above 150.
	} else if (level%50 == 0 && level >= 150) {
		document.getElementById("add_reward1").innerHTML = add_rewards[3][0] + " x ";
		var imgAddItem1 = document.createElement("img");
		imgAddItem1.src = add_rewards[3][1];
		imgAddItem1.width = "30";
		imgAddItem1.height = "30";
		document.getElementById("add_reward1").appendChild(imgAddItem1);
		
		document.getElementById("add_reward2").innerHTML = add_rewards[3][2] + " x ";
		var imgAddItem2 = document.createElement("img");
		imgAddItem2.src = add_rewards[3][3];
		imgAddItem2.width = "30";
		imgAddItem2.height = "30";
		document.getElementById("add_reward2").appendChild(imgAddItem2);
		
		document.getElementById("add_reward3").innerHTML = add_rewards[3][4] + " x ";
		var imgAddItem3 = document.createElement("img");
		imgAddItem3.src = add_rewards[3][5];
		imgAddItem3.width = "30";
		imgAddItem3.height = "30";
		document.getElementById("add_reward3").appendChild(imgAddItem3);
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