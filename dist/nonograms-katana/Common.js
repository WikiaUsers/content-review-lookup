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
		["5","https://static.wikia.nocookie.net/nonograms-katana/images/6/67/Spikes_%28Makibishi%29.png/revision/latest?cb=20210710190757"],
		["5","https://static.wikia.nocookie.net/nonograms-katana/images/7/7c/Boomerang.png/revision/latest?cb=20210710190854"],
		["5","https://static.wikia.nocookie.net/nonograms-katana/images/3/31/Petard.png/revision/latest?cb=20210710190156"],
		["5","https://static.wikia.nocookie.net/nonograms-katana/images/c/ce/Bomb_%28Horoku%29.png/revision/latest?cb=20210710190341"],
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
		/*lvl. 7*/	["Field lvl. 1","Pagoda lvl. 2","Skill: Logistician lvl. 1","Skill: Weapon Collector lvl. 1","Skill: Treasure Hunter lvl. 1"],
		/*lvl. 8*/	["Furnace lvl. 1","Food Stall lvl. 1"],
		/*lvl. 9*/	["Smithy lvl. 1","Windmill lvl. 1","Class: Rogue"],
		/*lvl. 10*/	["Dungeon lvl. 1","Gong lvl. 1","Pagoda lvl. 3","Skill: Logistician lvl. 2","Skill: Athlete lvl. 1","Skill: Antiquarian lvl. 1"],
		/*lvl. 11*/	["Lumber Mill lvl. 1","Skill: Intellectual lvl. 1"],
		/*lvl. 12*/	["Garden lvl. 1","Class: Monk"],
		/*lvl. 13*/	["Rock Garden lvl. 1","Skill: Logistician lvl. 3","Skill: Weapon Collector lvl. 2","Skill: Treasure Hunter lvl. 2"],
		/*lvl. 14*/	["Pagoda lvl. 4"],
		/*lvl. 15*/	["Chicken Coop lvl. 1","Class: Geologist","Skill: Athlete lvl. 2"],
		/*lvl. 16*/	["Skill: Logistician lvl. 4","Skill: Antiquarian lvl. 2"],
		/*lvl. 17*/	["Skill: Intellectual lvl. 2"],
		/*lvl. 18*/	["Pagoda lvl. 5","Class: Archeologist"],
		/*lvl. 19*/	["Skill: Logistician lvl. 5","Skill: Weapon Collector lvl. 3","Skill: Treasure Hunter lvl. 3"],
		/*lvl. 20*/	["Onsen lvl. 1","Dungeon lvl. 2","Skill: Athlete lvl. 3"],
		/*lvl. 21*/	["Coffee Bonsai lvl. 1","Class: Samurai","Skill: Gardener lvl. 1","Skill: Rock Garden Contemplator lvl. 1"],
		/*lvl. 22*/	["Pier lvl. 1","Ship lvl. 1","Skill: Carpenter lvl. 1","Skill: Metallurgist lvl. 1"],
		/*lvl. 23*/	["Pagoda lvl. 6","Skill: Mechanic lvl. 1","Skill: Blacksmith lvl. 1","Ship: Exploring"],
		/*lvl. 24*/	["Food Stall lvl. 2","Class: Ninja","Skill: Alchemist lvl. 1","Ship: Fishing"],
		/*lvl. 25*/	["Skill: Athlete lvl. 4","Ship: Prospecting"],
		/*lvl. 26*/	["Skill: Gardener lvl. 2","Skill: Rock Garden Contemplator lvl. 2","Skill: Boatswain lvl. 1","Ship: Patrolling"],
		/*lvl. 27*/	["Class: Adventurer","Skill: Carpenter lvl. 2","Skill: Metallurgist lvl. 2"],
		/*lvl. 28*/	["Pagoda lvl. 7","Skill: Mechanic lvl. 2","Skill: Blacksmith lvl. 2"],
		/*lvl. 29*/	["Skill: Alchemist lvl. 2"],
		/*lvl. 30*/	["Bridge lvl. 1","Dungeon lvl. 3","Caravan lvl. 1","Class: Scientist","Skill: Athlete lvl. 5"],
		/*lvl. 31*/	["Outpost lvl. 1","Skill: Boatswain lvl. 2"],
		/*lvl. 32*/	["Alchemist's Hut lvl. 6","Tailor lvl. 1","Skill: Carpenter lvl. 3","Skill: Metallurgist lvl. 3"],
		/*lvl. 33*/	["Skill: Mechanic lvl. 3","Skill: Blacksmith lvl. 3"],
		/*lvl. 34*/	["Skill: Alchemist lvl. 3","Skill: Cameleer lvl. 1"],
		/*lvl. 35*/	["Skill: Athlete lvl. 6","Skill: Intellectual lvl. 3"],
		/*lvl. 36*/	[""],
		/*lvl. 37*/	[""],
		/*lvl. 38*/	[""],
		/*lvl. 39*/	["Skill: Cameleer lvl. 2"],
		/*lvl. 40*/	["Dungeon lvl. 4","Airship lvl. 1"],
		/*lvl. 41*/	[""],
		/*lvl. 42*/	[""],
		/*lvl. 43*/	[""],
		/*lvl. 44*/	["Skill: Aeronaut lvl. 1"],
		/*lvl. 45*/	[""],
		/*lvl. 46*/	[""],
		/*lvl. 47*/	[""],
		/*lvl. 48*/	[""],
		/*lvl. 49*/	["Skill: Aeronaut lvl. 2"],
		/*lvl. 50*/	["Dungeon lvl. 5"]];
	
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
		imgBTram.src = "https://static.wikia.nocookie.net/nonograms-katana/images/2/2f/Battering_ram_%28Kikkosha%29.png/revision/latest?cb=20210710192019";
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
	var mosaic_sizes = [368, 640, 640, 640, 1280, 2560, 2560, 2560, 2560, 2560];
	var mosaics_f = [0];
	var fragment_counter = 0;
	for (i = 0; i < mosaic_sizes.length; i++){
		fragment_counter = fragment_counter + mosaic_sizes[i];
		mosaics_f.push(fragment_counter);
	}
	//var mosaics_f = [0, 368, 1008, 1648, 2288, 3568, 6128, 8688, 11248, 13808, 16368];
	
	var max_fragments = mosaics_f[mosaics_f.length - 1];
	var fragments = document.getElementById("fragments").value;
	
	//If the input is not a number or if the number is not between 0 and last mosaic fragment, clears the table.
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
	if (fragments > max_fragments){
		document.getElementById("wrong_number").innerHTML = "You have enter a number bigger than " + max_fragments + '.';
		delete_table_m();
		return;
	}
	if (fragments == max_fragments){
		document.getElementById("wrong_number").innerHTML = "Congratulations, you have completed all mosaics.";
		delete_table_m();
		return;
	}
	document.getElementById("wrong_number").innerHTML = "";
	
	//Logic of the calculator.
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



/* the code below is needed for combat simulation */

var food_effects = { Ambrosia: {hp:30}, Onigiri:{hp:10}, Flatbread:{ep:10}, Bun:{hp:15,ep:5}, Muffin:{hp:15,ep:7}, Bento:{hp:5,ep:15}, Pasta:{hp:7,ep:20}, Baklava:{hp:12,ep:12}, Eggs:{hp:17,ep:5}, PoHP1:{hp:20}, PoHP2:{hp:25}, PoEP1:{ep:20} }

var boost_list = {
                    'Level':        { 'repl':26, '*':{'hp':'*','ep':'*'} },
                    'Sword':        { '0':{}, '1': {'dmg':3}, '2': {'dmg':5}, '3': {'dmg':7}, '4': {'dmg':9} },
                    'Armor':        { '0':{}, '1': {'def':2}, '2': {'def':4}, '3': {'def':6}, '4': {'def':8,'dmg':1,'ep':10} },
                    'Shield':       { '0':{}, '1': {'def':1}, '2': {'def':2}, '3': {'def':3}, '4': {'def':4,'c2r':10} },
                    'Ring':         { '0':{}, '1': {'dmg':1}, '2': {'dmg':2}, '3': {'dmg':3}, '4': {'dmg':4}, '4+': {'dmg':4,'ep':5} },
                    'Martial Arts': { '0':{}, '1': {'dmg':1}, '2': {'dmg':2}, '3': {'dmg':3} },
                    'Hardening':    { '0':{}, '1': {'def':1}, '2': {'def':2} },
                    'E. preparation':{ '0':{}, '1': {'sck':1}, '2': {'sck':2} },
                    'Agility':      { '0':{}, '1': {'ap':1} },
                    'Smashing blow':{ '0':{}, '1': {}, '2': {} },
                    'Helmet':       { '0':{}, '1':{'hp':5} },
                    'Dagger':       { '0':{}, '1':{'c2c':5} }
                };

var presets = {
                     1: {Sword: 0, Armor: 0, Shield: 0, Ring: 0, 'Martial Arts': 0, 'E. preparation': 0, Hardening: 0, Agility: 0, 'Smashing blow':0 },
                     3: {Sword: 0, Armor: 0, Shield: 0, Ring: 0, 'Martial Arts': 0, 'E. preparation': 0, Hardening: 0, Agility: 0, 'Smashing blow':1 },
                     5: {Sword: 1, Armor: 1, Shield: 1, Ring: 1, 'Martial Arts': 0, 'E. preparation': 0, Hardening: 0, Agility: 0, 'Smashing blow':1 },
                     6: {Sword: 1, Armor: 1, Shield: 1, Ring: 1, 'Martial Arts': 0, 'E. preparation': 0, Hardening: 0, Agility: 0, 'Smashing blow':2 },
                     9: {Sword: 1, Armor: 1, Shield: 1, Ring: 1, 'Martial Arts': 1, 'E. preparation': 0, Hardening: 0, Agility: 0, 'Smashing blow':2 },
                    10: {Sword: 2, Armor: 2, Shield: 2, Ring: 2, 'Martial Arts': 1, 'E. preparation': 0, Hardening: 0, Agility: 0, 'Smashing blow':2 },
                    12: {Sword: 2, Armor: 2, Shield: 2, Ring: 2, 'Martial Arts': 1, 'E. preparation': 1, Hardening: 1, Agility: 0, 'Smashing blow':2 },
                    15: {Sword: 3, Armor: 3, Shield: 3, Ring: 3, 'Martial Arts': 2, 'E. preparation': 1, Hardening: 1, Agility: 1, 'Smashing blow':2 },
                    18: {Sword: 3, Armor: 3, Shield: 3, Ring: 3, 'Martial Arts': 2, 'E. preparation': 2, Hardening: 2, Agility: 1, 'Smashing blow':2 },
                    20: {Sword: 4, Armor: 4, Shield: 4, Ring: 4, 'Martial Arts': 2, 'E. preparation': 2, Hardening: 2, Agility: 1, 'Smashing blow':2 },
                    21: {Sword: 4, Armor: 4, Shield: 4, Ring: 4, 'Martial Arts': 3, 'E. preparation': 2, Hardening: 2, Agility: 1, 'Smashing blow':2 },
                    26: {Sword: 4, Armor: 4, Shield: 4, Ring: 4, 'Martial Arts': 3, 'E. preparation': 2, Hardening: 2, Agility: 1, 'Smashing blow':2 }
                };

var enemy_list = [
                    {name: 'Shapeshifter 3A-3C',      hp: 27,  dmg: 8,  def: 5,  ap: 6},
                    {name: 'Orc chieftain (3A boss)', hp: 55,  dmg: 9,  def: 5,  ap: 4},
                    {name: 'Orc warlord (3B boss)',   hp: 65,  dmg: 9,  def: 5,  ap: 4},
                    {name: 'Bone dragon (3C boss)',   hp: 85,  dmg: 9,  def: 5,  ap: 4},
                    {name: 'Shapeshifter 4A-4C',      hp: 36,  dmg: 12, def: 9,  ap: 6},
                    {name: 'Leviathan (4A boss)',     hp: 84,  dmg: 14, def: 9,  ap: 4},
                    {name: 'Mynd flyer (4B boss)',    hp: 104, dmg: 14, def: 9,  ap: 6},
                    {name: 'Eye tyrant (4C boss)',    hp: 124, dmg: 15, def: 9,  ap: 4},
                    {name: 'Demon kingpin (5A boss)', hp: 130, dmg: 18, def: 12, ap: 4},
                    {name: 'Demon lord (5B boss)',    hp: 170, dmg: 19, def: 13, ap: 4},
                    {name: 'Bone dragon (5C quest)',  hp: 230, dmg: 19, def: 13, ap: 4},
                    {name: 'The dragon (5C boss)',    hp: 230, dmg: 21, def: 14, ap: 4}
                ];

var icons = {
                'Sword-1':  ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/a/a4/Sword_for_a_hero_lvl._1.png">',
                'Sword-2':  ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/b/bc/Sword_for_a_hero_lvl._2.png">',
                'Sword-3':  ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/3/36/Sword_for_a_hero_lvl._3.png">',
                'Sword-4':  ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/0/09/Sword_for_a_hero_lvl._4.png">',
                'Armor-1':  ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/f/f3/Armor_for_a_hero_lvl._1.png">',
                'Armor-2':  ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/a/a6/Armor_for_a_hero_lvl._2.png">',
                'Armor-3':  ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/0/05/Armor_for_a_hero_lvl._3.png">',
                'Armor-4':  ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/a/a3/Armor_for_a_hero_lvl._4.png">',
                'Shield-1': ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/6/6c/Shield_for_a_hero_lvl._1.png">',
                'Shield-2': ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/9/9f/Shield_for_a_hero_lvl._2.png">',
                'Shield-3': ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/c/ca/Shield_for_a_hero_lvl._3.png">',
                'Shield-4': ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/8/80/Shield_for_a_hero_lvl._4.png">',
                'Ring-1':   ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/e/eb/Ring_for_a_hero_lvl._1.png">',
                'Ring-2':   ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/1/18/Ring_for_a_hero_lvl._2.png">',
                'Ring-3':   ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/b/bb/Ring_for_a_hero_lvl._3.png">',
                'Ring-4':   ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/1/10/Ring_for_a_hero_lvl._4.png">',
                'Ring-4+':  ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/a/ac/Ring_for_a_hero_lvl._4%2B.png">',
                'Dagger-1': ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/4/45/Dagger.png">',
                'Helmet-1': ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/3/37/Helmet.png">',
                'HP':       ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/3/31/Dungeon_-_Health.png">',
                'EP':       ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/1/1e/Dungeon_-_Energy.png">',
                'AP':       ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/8/84/Dungeon_-_Action_points.png">',
                'Def':      ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/a/ac/Dungeon_-_Defense.png">',
                'Dmg':      ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/5/59/Dungeon_-_Damage.png">',
                'sck':      ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/6/61/Sack.png">',
                'Ambrosia': '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/e/e9/Potion_Ambrosia.png">',
                'Onigiri':  '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/f/f3/Onigiri.png">',
                'Flatbread':'<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/4/4f/Flatbread.png">',
                'Bun':      '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/9/9a/Cherry_bun.png">',
                'Muffin':   '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/1/1d/Muffin.png">',
                'Bento':    '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/3/34/Mushroom_rice_%28Bento%29.png">',
                'Pasta':    '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/b/bf/Porcini_pasta.png">',
                'Baklava':  '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/3/34/Baklava.png">',
                'Eggs':     '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/3/3f/Marinated_eggs.png">',
                'PoHP1':    '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/3/35/Potion_of_healing.png">',
                'PoHP2':    '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/f/f4/Potion_of_healing_lvl._2.png">',
                'PoEP1':    '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/7/72/Potion_of_energy.png">',
                'fortified':    '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/2/27/Poke.png">',
                'frenzied':     '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/d/d2/Potion_Berserker_rage.png">',
                'demoralized':  '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/8/8e/Demoralization.png">',
                'Smashing blow-1':  ' <img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/d/d4/Smashing_blow.png">',
                'c2c':      '',
                'c2r':      ''
            };

icons['Agility-1'] = icons['AP'];
icons['Hardening-1'] = icons['Def'];
icons['Hardening-2'] = icons['Hardening-1']+icons['Hardening-1'].trim();
icons['Martial Arts-1'] = icons['Dmg'];
icons['Martial Arts-2'] = icons['Martial Arts-1']+icons['Martial Arts-1'].trim();
icons['Martial Arts-3'] = icons['Martial Arts-2']+icons['Martial Arts-1'].trim();
icons['E.Preparation-1'] = icons['sck'];
icons['E.Preparation-2'] = icons['E.Preparation-1']+icons['E.Preparation-1'].trim();
icons['Smashing blow-2'] = icons['Smashing blow-1']+icons['Smashing blow-1'].trim();

function fillHeroFromPreset(event) {
    var id = event.srcElement.innerHTML;
    document.getElementById('Level').value = id;
    for (var boost in presets[id]) {
        var boost_level = presets[id][boost];
        document.getElementById(boost).value = boost_level;
    }
    fillHeroStats();
}

function fillHeroStats() {
    var attr = ['hp', 'ep','dmg','def','ap', 'sck', 'c2c', 'c2r'];
    //reset fields to their initial values
    for (var a in attr) {
        document.getElementById('h'+attr[a]).value = document.getElementById('h'+attr[a]).getAttribute('data-init');
    }
    //iterate fields
    var boost_fields = document.getElementById('h_defi').getElementsByTagName('select');
    for (var f=0; f<boost_fields.length; f++) {
        var boost_name = boost_fields[f].id;
        var boost_value = boost_fields[f].value;
        //show boost's icon
        var icon_ph = document.getElementById(boost_name+'-pic');
        var icon_tag = boost_name+'-'+boost_value
        icon_ph.innerHTML = ( icons[icon_tag] ? icons[icon_tag] : '' );
        //add boost's value to the appropriate hero's stats
        var targets = boost_list[boost_name][boost_value];
        for (var t in targets) {
            var field = document.getElementById('h'+t);
            field.value = parseInt(field.value) + targets[t];
        }
    }
    //prepare food selection
    var es = parseInt(document.getElementById('hsck').value);
    var foodlist = { Onigiri:7+es, Flatbread:7+es, Bun:5+es, Muffin:5+es, Bento:5+es, Pasta:5+es, Baklava:7+es, Eggs:5+es, PoHP1:5+es, PoHP2:5+es, PoEP1:5+es, Ambrosia:1+es };
    for (var food in foodlist) {
        document.getElementById(food).setAttribute('data-limit', foodlist[food]);
    }
    //clear previous results
    document.getElementById('h_calc');
    document.getElementById('e_calc');
}

function fillEnemyStats(event) {
    var index = event.srcElement.getAttribute('data_index');
    var attr = ['hp','dmg','def','ap'];
    for (var a in attr) {
        document.getElementById('e'+attr[a]).value = enemy_list[index][attr[a]];
    }
    document.getElementById('hdemo').checked = (enemy_list[index].name.indexOf('shapeshifter')>=0);
}

function calculateCombat() {
    var h_out = document.getElementById('h_calc');
    var e_out = document.getElementById('e_calc');
    //get hero stats and apply effects
    var hero = {};
    hero.hpmax = parseInt(document.getElementById('hhp').value);
    hero.epmax = parseInt(document.getElementById('hep').value);
    hero.apmax = parseInt(document.getElementById('hap').value);
    hero.dmg = parseInt(document.getElementById('hdmg').value);
    hero.def = parseInt(document.getElementById('hdef').value);
    if (document.getElementById('hpoke').checked) {
        hero.def+= 4;
    }
    if (document.getElementById('hdemo').checked) {
        hero.def = Math.floor(hero.def * 0.4);
    }
    if (document.getElementById('hberserk').checked) {
        hero.dmg = Math.floor(hero.dmg * 1.4);      //hero's berserk damage rounded down? not confirmed
        hero.apmax+= 2;
    }
    hero.spread = Math.floor(hero.dmg>=15 ? hero.dmg/5 : (hero.dmg>=12 ? 3 : 2));
    hero.critchance = parseInt(document.getElementById('hc2c').value);
    hero.critdmgratio = 2;
    hero.retaliatechance = parseInt(document.getElementById('hc2r').value);
    hero.log = document.getElementById('h_simlog');
    //get enemy stats and apply effects
    var enemy = {};
    enemy.hpmax = parseInt(document.getElementById('ehp').value);
    enemy.apmax = parseInt(document.getElementById('eap').value);
    enemy.dmg = parseInt(document.getElementById('edmg').value);
    enemy.def = parseInt(document.getElementById('edef').value);
    if (document.getElementById('edemo').checked) {
        enemy.def = Math.floor(enemy.def * 0.4);
    }
    enemy.spread = Math.floor(enemy.dmg>=15 ? enemy.dmg/5 : (enemy.dmg>=12 ? 3 : 2));
    enemy.critchance = parseInt(document.getElementById('hc2c').value);
    enemy.critdmgratio = 1.5;
    enemy.log = document.getElementById('e_simlog');
    //output calculations for the hero
    h_out.innerHTML = '<div><small>Effective AP: ' + hero.apmax + ', Def: ' + hero.def + ', Dmg: ' + hero.dmg + ' &#177;'+hero.spread+'</small></div>';
    var ddmgmin = Math.max( hero.dmg-hero.spread , 1);
    var ddmgmax = hero.dmg+hero.spread;
    var ddmgminc = hero.critdmgratio*ddmgmin;
    var ddmgmaxc = hero.critdmgratio*ddmgmax;
    h_out.innerHTML+= '<div>Damage delivered: ' + ddmgmin + '-' + ddmgmax + ' <small>(when critical: ' + ddmgminc + '-' + ddmgmaxc + ')</small></div>';
    var rdmgmin = Math.max(ddmgmin-enemy.def,1);
    var rdmgmax = Math.max(ddmgmax-enemy.def,1);
    var rdmgminc = Math.max(ddmgminc-enemy.def,2);
    var rdmgmaxc = Math.max(ddmgmaxc-enemy.def,2);
    h_out.innerHTML+= '<div>Damage to enemy: ' + rdmgmin + '-' + rdmgmax + ' <small>(when critical: ' + rdmgminc + '-' + rdmgmaxc + ')</small></div>';
    h_out.innerHTML+= '<div><b>Hits to kill the enemy: ' + Math.ceil(enemy.hpmax/rdmgmax) + '-' + Math.ceil(enemy.hpmax/rdmgmin) + '</b></div>';
    h_out.innerHTML+= '<div>(absolute minimum: ' + Math.ceil(enemy.hpmax/rdmgmaxc) + ')</div>';
    //output calculations for the enemy
    e_out.innerHTML = '<div><small>Effective AP: ' + enemy.apmax + ', Def: ' + enemy.def + ', Dmg: ' + enemy.dmg + ' &#177;'+enemy.spread+'</small></div>';
    ddmgmin = Math.max( enemy.dmg-enemy.spread , 1);
    ddmgmax = enemy.dmg+enemy.spread;
    ddmgminc = Math.floor(enemy.critdmgratio*ddmgmin);
    ddmgmaxc = Math.floor(enemy.critdmgratio*ddmgmax);
    e_out.innerHTML+= '<div>Damage delivered: ' + ddmgmin + '-' + ddmgmax + ' <small>(when critical: ' + ddmgminc + '-' + ddmgmaxc + ')</small></div>';
    rdmgmin = Math.max(ddmgmin-hero.def,1);
    rdmgmax = Math.max(ddmgmax-hero.def,1);
    rdmgminc = Math.max(ddmgminc-hero.def,2);
    rdmgmaxc = Math.max(ddmgmaxc-hero.def,2);
    e_out.innerHTML+= '<div>Damage to hero: ' + rdmgmin + '-' + rdmgmax + ' <small>(when critical: ' + rdmgminc + '-' + rdmgmaxc + ')</small></div>';
    e_out.innerHTML+= '<div><b>Hits to kill the hero: ' + Math.ceil(hero.hpmax/rdmgmax) + '-' + Math.ceil(hero.hpmax/rdmgmin) + '</b></div>';
    e_out.innerHTML+= '<div>(absolute minimum: ' + Math.ceil(hero.hpmax/rdmgmaxc) + ')</div>';
    //SIMULATE
    //assume hero's initiative, setup food reserves
    var attacker = hero;
    attacker.hp = attacker.hpmax;
    attacker.ep = attacker.epmax;
    attacker.ap = attacker.apmax;
    attacker.healing = document.getElementById('heal').checked;
    attacker.smashing = document.getElementById('sbuse').checked ? parseInt(document.getElementById('Smashing blow').value) : 0;
    attacker.food = {};    
    if (attacker.healing) {
        for (var fooditem in food_effects) {
            if (document.getElementById(fooditem).checked) {
                attacker.food[fooditem] = parseInt(document.getElementById(fooditem).getAttribute('data-limit'));
            }
        }
    }
    attacker.counter = 0;
    attacker.log.innerHTML = '';
    //setup enemy
    var defender = enemy;
    defender.hp = defender.hpmax;
    defender.ap = 0;
    defender.counter = 0;
    defender.log.innerHTML = '';
    //healing info
    if (attacker.healing) {
        attacker.log.innerHTML+= 'food: ';
        for (var food in attacker.food) {
            if (attacker.food[food]) {
                attacker.log.innerHTML+= ' '+attacker.food[food]+'x'+(icons[food]?icons[food]:food);
            }
        }
        defender.log.innerHTML+= '(unlimited '+icons['EP']+' and no food)';
    }        
    //main loop
    var watchdog = 0;
    var roundno = 1;
    while (defender.hp>0 && attacker.hp>0 && watchdog<1000) {
        watchdog+= 1;
        //update stats, show results
        var alog = 'HP:'+attacker.hp+(attacker.epmax?', EP:'+attacker.ep:'')+', AP:'+attacker.ap;
        var dlog = 'HP:'+defender.hp+(defender.epmax?', EP:'+defender.ep:'')+', AP:'+defender.ap;
        //decision is being made
        var action = 'attack'; //default action to be taken
        //replenish health if necessary
        if (attacker.healing && attacker.hpmax-attacker.hp>=10) {
            //find the best food to use
            var bestheal = 0;
            for (var food in food_effects) {
                if (food!='Ambrosia' && food_effects[food].hp && attacker.food[food]>0 && (!food_effects[food].ep || food_effects[food].hp>bestheal) && attacker.hpmax>=attacker.hp+food_effects[food].hp*0.9) {
                    action = food;
                    bestheal = food_effects[food].hp;
                }
            }
        }
        //replenish energy if necessary
        if (attacker.healing && attacker.epmax && (attacker.smashing && attacker.ep<4 || attacker.ep<1)) {
            //find the best food to use
            for (var food in food_effects) {
                if (food_effects[food].ep && (!food_effects[food].hp || food_effects[food].hp<food_effects[food].ep) && attacker.food[food]>0 && attacker.epmax>=attacker.ep+food_effects[food].ep) {
                    action = food;
                }
            }
        }
        //use the food, if so decided
        if (action!="attack") {
            if (food_effects[action].hp) {
                attacker.hp = Math.min(attacker.hp+food_effects[action].hp, attacker.hpmax);
            }
            if (food_effects[action].ep) {
                attacker.ep = Math.min(attacker.ep+food_effects[action].ep, attacker.epmax);
            }
            attacker.ap-= 2;
            attacker.food[action]-= 1;
            alog+= ' => <b style="color:darkred">consumes</b> '+action+' ('+attacker.food[action]+' left)';
            dlog+= ' => (waits)';
        }
        //attack not possible - out of energy and no healing was possible?
        if (action=='attack' && attacker.epmax && (attacker.smashing && attacker.ep<4 || attacker.ep<1) ) {
            attacker.ap-= 3;
            attacker.ep+= 10;
            alog+= ' => <b style="color:goldenrod">Charge of motivation!</b>';
            dlog+= ' => (waits)';
            action = 'CoM';
        }
        //if no other action was taken, fight
        if (action=='attack') {
            //determine damage: base, delivered, received
            var effdmg = attacker.dmg + Math.floor(Math.random()*(attacker.spread+attacker.spread+1))-attacker.spread;
            var smashing = attacker.smashing && attacker.ep>=4 ? attacker.smashing : 0;
            var crit = smashing ? false : Math.random()*100<attacker.critchance; //normal crit is not possible when SB used
            var dmgdelivered = Math.floor(effdmg * (crit ? attacker.critdmgratio : 1) * (smashing ? 1+smashing*0.5 : 1));        //monster's crit damage rounded down? not confirmed
            var dmgreceived = Math.max(dmgdelivered - defender.def, (crit || smashing ? 2 : 1));
            //update stats
            attacker.counter+= 1;
            defender.hp-= dmgreceived;
            attacker.ap-= smashing ? 4 : 3;
            if (attacker.epmax) {
                attacker.ep-= smashing ? 4 : 1;
            }
            alog+= ' => <b>attacks</b> '+(smashing?' <b style="color:limegreen">SB L'+attacker.smashing+'</b>':'')+(crit?' <b style="color:orange">CRIT!</b>':'');
            dlog+= ' => gets hit for: '+dmgreceived;
            //counter-attack?
            if (defender.retaliatechance && Math.random()*100<defender.retaliatechance) {
                dmgreturned = Math.floor(3+3*Math.random());
                dmgreturned = Math.min(dmgreturned, Math.floor(attacker.hpmax*0.25), attacker.hp-1);
                alog+= ', gets counter-hit for: '+dmgreturned;
                attacker.hp-= dmgreturned;
                dlog+= ', <b style="color:blue">counter-attacks</b>';
            }
        }
        //check if still alive (or rescue if possible)
        if (defender.hp<=0) {
            if (defender.healing && defender.food.Ambrosia>0) {
                defender.hp = Math.min(30, defender.hpmax);
                defender.food.Ambrosia-= 1;
                dlog+= ' <b style="color:red">Ambrosia</b> ('+defender.food.Ambrosia+' left)';
            }
            else {
                dlog+= ' <b style="color:magenta">FALLEN</b><br>- defeated in '+attacker.counter+' hit(s), '+roundno+' turn(s)';
            }
        }
        //update logs
        attacker.log.innerHTML+= '<div>'+alog+'</div>';
        defender.log.innerHTML+= '<div>'+dlog+'</div>';
        //when attacker is out of AP, switch sides
        if (attacker.ap<=0) {
            var swap = attacker;
            attacker = defender;
            defender = swap;
            attacker.ap+= attacker.apmax;
            roundno+= 1;
        }
    }
    //end of main loop
    if (hero.healing) {
        hero.log.innerHTML+= 'Left: ';
        var anyleft = 0;
        for (var food in hero.food) {
            if (hero.food[food]) {
                anyleft+= 1;
                hero.log.innerHTML+= ' '+hero.food[food]+'x '+(icons[food]?icons[food]:food);
            }
        }
        if (anyleft==0) {
            hero.log.innerHTML+= ' NOTHING ';
        }
    }
}

function togglefood() {
    var foodsack = document.getElementById('foodsack');
    if (foodsack.style.display=='none') {
        foodsack.style.display = null;
    }
    else {
        foodsack.style.display = 'none';
    }
}

function setupCombatForm(placeholderId) {
    var target = document.getElementById(placeholderId);
    //general form structure
    var table = document.createElement('table');
    table.border = 1;
    table.cellSpacing = 0;
    table.cellPadding = 2;
    table.innerHTML = '<tr valign="top"><td id="h_defi">Hero configuration:</td><td id="e_defi">Enemy selection:</td></tr>';
    table.innerHTML+= '<tr valign="top"><td id="h_stat"></td><td id="e_stat"></td></tr>';
    table.innerHTML+= '<tr><td id="h_buff"></td><td id="e_buff"></td></tr>';
    var foodsack = '';
    for (var food in food_effects) {
        foodsack+= ' <input type="checkbox" id="'+food+'" data-limit="0" checked="checked">'+(icons[food]?icons[food]:food);
    }
    table.innerHTML+= '<tr><td colspan="2" align="left"><input type="checkbox" id="heal" />Allow healing<span id="foodsack" style="display:none">: '+foodsack+'</span><br><input type="checkbox" id="sbuse" />Use Smashing blow whenever possible.</td></tr>';
    table.innerHTML+= '<tr valign="top"><td id="h_calc"></td><td id="e_calc"></td></tr>';
    table.innerHTML+= '<tr><td colspan="2" align="center"><button id="emu_run">CALCULATE</button></td></tr>';
    table.innerHTML+= '<tr valign="top" style="font-size: 66%"><td id="h_simlog"></td><td id="e_simlog"></td></tr>';
	target.appendChild(table);
    document.getElementById('heal').addEventListener('click', togglefood);    
    document.getElementById('emu_run').addEventListener('click', calculateCombat);    
    //stats forms
    document.getElementById('h_stat').innerHTML = '<input size="1" id="hhp" data-init="19"/>'+icons['HP']+' HP &nbsp; &nbsp; &nbsp; <input size="1" id="hep" data-init="29"/>'+icons['EP']+' EP<br>';
    document.getElementById('h_stat').innerHTML+= '<input size="1" id="hdmg" data-init="5"/>'+icons['Dmg']+' Dmg<br>';
    document.getElementById('h_stat').innerHTML+= '<input size="1" id="hdef" data-init="2"/>'+icons['Def']+' Def<br>';
    document.getElementById('h_stat').innerHTML+= '<input size="1" id="hap" data-init="4"/>'+icons['AP']+' AP<br>';
    document.getElementById('h_stat').innerHTML+= '<input size="1" id="hc2c" data-init="5"/>'+icons['c2c']+' % chance to crit<br>';
    document.getElementById('h_stat').innerHTML+= '<input size="1" id="hc2r" data-init="0"/>'+icons['c2r']+' % chance to retaliate<br>';
    document.getElementById('h_stat').innerHTML+= '<input size="1" id="hsck" data-init="0"/>'+icons['sck']+' extra space';
    document.getElementById('e_stat').innerHTML = '<input size="1" id="ehp"/>'+icons['HP']+' HP<br>';
    document.getElementById('e_stat').innerHTML+= '<input size="1" id="edmg"/>'+icons['Dmg']+' Dmg<br>';
    document.getElementById('e_stat').innerHTML+= '<input size="1" id="edef"/>'+icons['Def']+' Def<br>';
    document.getElementById('e_stat').innerHTML+= '<input size="1" id="eap"/>'+icons['AP']+' AP<br>';
    document.getElementById('e_stat').innerHTML+= '<input size="1" id="ec2c" value="5"/>'+icons['c2c']+' % chance to crit';
    //buffs forms
    document.getElementById('h_buff').innerHTML = '<input type="checkbox" id="hpoke"/>'+(icons['fortified']?icons['fortified']+' ':'')+'fortified (Poke)<br><input type="checkbox" id="hberserk"/>'+(icons['frenzied']?icons['frenzied']+' ':'')+'frenzied (Potion "Berserker rage")<br><input type="checkbox" id="hdemo"/>'+(icons['demoralized']?icons['demoralized']+' ':'')+'demoralized';
    document.getElementById('e_buff').innerHTML = '<input type="checkbox" id="edemo"/>'+(icons['demoralized']?icons['demoralized']+' ':'')+'demoralized';
    //hero setup form
    var hero_setup = document.getElementById('h_defi');
    //... first preset buttons...
    var preset_bar = document.createElement('div');
    preset_bar.innerHTML = '<small>Presets: </small>';
    for (var p in presets) {
        var p_btn = document.createElement('button');
        p_btn.innerHTML = p;
        p_btn.style = 'font-size: 8pt; padding: 0; margin: 1px';
        p_btn.addEventListener('click', fillHeroFromPreset);
        preset_bar.appendChild(p_btn);
    }
    hero_setup.appendChild(preset_bar);
    hero_setup.appendChild(document.createElement('hr'));
    //... then individual gear/skill entries
    for (var boostname in boost_list) {
        //first, unpack a short definition
        if (boost_list[boostname]['repl']) { 
            for (var r=1; r<=boost_list[boostname]['repl']; r++) {
                boost_list[boostname][r] = {};
                for (var attr in boost_list[boostname]['*']) {
                    boost_list[boostname][r][attr] = boost_list[boostname]['*'][attr]=='*' ? r : boost_list[boostname]['*'][attr];
                }
            }
            delete boost_list[boostname]['repl'];
            delete boost_list[boostname]['*'];
        }
        //process the form
        if (boostname=='Helmet') {
            hero_setup.appendChild(document.createElement('hr'));
        }
        var attr_row = document.createElement('div');
        attr_row.innerHTML = (icons[boostname] ? icons[boostname]+' ' : '')+boostname+': ';
        var attr_sel = document.createElement('select');
        attr_sel.id = boostname;
        attr_sel.addEventListener('change', fillHeroStats);
        //introduce list elements
        for (var boost_level in boost_list[boostname]) {
            var option = document.createElement('option');
            option.value = boost_level;
            option.innerHTML = boost_level!=0 ? boost_level : 'no';
            attr_sel.appendChild(option);
        }
        attr_row.appendChild(attr_sel);
        //icon placeholder
        var attr_sel_pic = document.createElement('span');
        attr_sel_pic.id = boostname+'-pic';
        attr_row.appendChild(attr_sel_pic);
        //atribute ready
        hero_setup.appendChild(attr_row);
    }
    //enemy selection form
    var enemy_selection = document.getElementById('e_defi');
    for (var f in enemy_list) {
        var btn = document.createElement('button');
        btn.setAttribute('data_index', f);
        btn.innerHTML = enemy_list[f].name;
        btn.addEventListener('click', fillEnemyStats);
        enemy_selection.appendChild(document.createElement('br'));
        enemy_selection.appendChild(btn);
    }
    //quick fill
    btn.click();
    fillHeroStats();
}

/* above combat simulator is now executed on a page that is ready to accept it */

if (document.getElementById("combat_calc")) {
    setupCombatForm("combat_calc");
}