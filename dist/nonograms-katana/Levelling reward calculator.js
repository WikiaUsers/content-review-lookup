/*
	This code is used to generate levelling rewards from the
	level inputed from the user. It also displays the XP
	needed to reach that level; skills, classes, ship 
	mission types and buildings/building levels that are 
	unlocked with that level.
*/

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
		document.getElementById("wrong_number").innerHTML = "The maximum character level is 1000.";
		delete_table();
		return;
	}
	level = Math.floor(level);
	document.getElementById("level_display").innerHTML = level;
	document.getElementById("wrong_number").innerHTML = "";
	var xp = 1000, ruby = 1, bt_ram = 1, tr_map = 3;
	var image = "https://static.wikia.nocookie.net/nonograms-katana/images/";
	// level, amount, image URL
	var regular_rewards = [
		2,"5","f/f0/Arrows.png",
		3,"5","b/b9/Fan.png",
		4,"5","a/ac/Shuriken.png",
		5,"5","e/e9/Katana.png",
		6,"5","6/67/Spikes_%28Makibishi%29.png",
		7,"5","7/7c/Boomerang.png",
		8,"5","3/31/Petard.png",
		9,"5","c/ce/Bomb_%28Horoku%29.png",
		10,"5","c/c9/Steel.png",
		10,"5","4/4f/Charcoal.png",
		11,"5","a/a7/Iron_sand.png",
		11,"5","9/92/Chemicals.png",
		12,"2","6/6d/Sushi.png",
		13,"1","8/83/Mortar.png",
		];
			
	//Additional rewards for levels: 30, 50, 80 and 100 (and 150, 200, 250, etc.).	
	// level, amount, image
	var additional_rewards = [
		30,"3","2/24/Firework.png",
		50,"1","f/f8/Ramen.png",
		50,"1","d/dd/Curry.png",
		50,"1","1/12/Date_cake.png",
		80,"1","8/85/Kimono.png",
		80,"1","3/3d/Ninja_suit.png",
		80,"1","5/51/Samurai_armor.png",
		100,"3","2/24/Firework.png",
		100,"1","1/12/Date_cake.png",
		100,"1","5/51/Samurai_armor.png",
		];
	
	//Here are listed when buildings, classes (character), skills (character) and ship mission types unlock.
	// level, then everything else
	var unlocks = [
		[2, "Workshop lvl. 1"],
		[3,"Shop lvl. 1","Class: Warrior"],
		[4,"Pagoda lvl. 1"],
		[5,"Warehouse lvl. 1"],
		[6,"Alchemist's Hut lvl. 1","Class: Wizard"],
		[7,"Field lvl. 1","Pagoda lvl. 2","Skill: Logistician lvl. 1","Skill: Weapon Collector lvl. 1","Skill: Treasure Hunter lvl. 1"],
		[8,"Furnace lvl. 1","Food Stall lvl. 1"],
		[9,"Smithy lvl. 1","Windmill lvl. 1","Class: Rogue"],
		[10,"Dungeon lvl. 1","Gong lvl. 1","Pagoda lvl. 3","Skill: Logistician lvl. 2","Skill: Athlete lvl. 1","Skill: Antiquarian lvl. 1"],
		[11,"Lumber Mill lvl. 1","Skill: Intellectual lvl. 1"],
		[12,"Garden lvl. 1","Class: Monk"],
		[13,"Rock Garden lvl. 1","Skill: Logistician lvl. 3","Skill: Weapon Collector lvl. 2","Skill: Treasure Hunter lvl. 2"],
		[14,"Pagoda lvl. 4"],
		[15,"Chicken Coop lvl. 1","Class: Geologist","Skill: Athlete lvl. 2"],
		[16,"Skill: Logistician lvl. 4","Skill: Antiquarian lvl. 2"],
		[17,"Skill: Intellectual lvl. 2"],
		[18,"Pagoda lvl. 5","Class: Archeologist"],
		[19,"Skill: Logistician lvl. 5","Skill: Weapon Collector lvl. 3","Skill: Treasure Hunter lvl. 3"],
		[20,"Onsen lvl. 1","Dungeon lvl. 2","Skill: Athlete lvl. 3"],
		[21,"Coffee Bonsai lvl. 1","Class: Samurai","Skill: Gardener lvl. 1","Skill: Rock Garden Contemplator lvl. 1"],
		[22,"Pier lvl. 1","Ship lvl. 1","Skill: Carpenter lvl. 1","Skill: Metallurgist lvl. 1"],
		[23,"Pagoda lvl. 6","Skill: Mechanic lvl. 1","Skill: Blacksmith lvl. 1","Ship: Exploring"],
		[24,"Food Stall lvl. 2","Class: Ninja","Skill: Alchemist lvl. 1","Ship: Fishing"],
		[25,"Skill: Athlete lvl. 4","Ship: Prospecting"],
		[26,"Skill: Gardener lvl. 2","Skill: Rock Garden Contemplator lvl. 2","Skill: Boatswain lvl. 1","Ship: Patrolling"],
		[27,"Class: Adventurer","Skill: Carpenter lvl. 2","Skill: Metallurgist lvl. 2"],
		[28,"Pagoda lvl. 7","Skill: Mechanic lvl. 2","Skill: Blacksmith lvl. 2"],
		[29,"Skill: Alchemist lvl. 2"],
		[30,"Bridge lvl. 1","Dungeon lvl. 3","Caravan lvl. 1","Class: Scientist","Skill: Athlete lvl. 5"],
		[31,"Outpost lvl. 1","Skill: Boatswain lvl. 2"],
		[32,"Alchemist's Hut lvl. 6","Tailor lvl. 1","Skill: Carpenter lvl. 3","Skill: Metallurgist lvl. 3"],
		[33,"Skill: Mechanic lvl. 3","Skill: Blacksmith lvl. 3"],
		[34,"Skill: Alchemist lvl. 3","Skill: Cameleer lvl. 1"],
		[35,"Skill: Athlete lvl. 6","Skill: Intellectual lvl. 3"],
		[39,"Skill: Cameleer lvl. 2"],
		[40,"Dungeon lvl. 4","Airship lvl. 1"],
		[44,"Skill: Aeronaut lvl. 1"],
		[49,"Skill: Aeronaut lvl. 2"],
		[50,"Dungeon lvl. 5", "Train Station lvl. 1", "Train lvl. 1"],
		[80,"Class: Zen Master"]
		];

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
	
	var reward_string = '';
	
	var coins = level*2;
	if (coins > 200) {coins = 200;}
	reward_string += coins + " x ";
	reward_string += add_image("6/6d/Coin.png");
	reward_string += "<br />";
	
	reward_string += ruby + " x ";
	reward_string += add_image("a/a9/Ruby.png/");
	reward_string += "<br />";
	
	for (i = 0; i < regular_rewards.length; i += 3){
		if (regular_rewards[i] == level%12) {
			reward_string += regular_rewards[i+1] + " x ";
			reward_string += add_image(regular_rewards[i+2]);
			reward_string += "<br />";
		}
	}
	
	if (level > 13) {
		reward_string += bt_ram + " x ";
		reward_string += add_image("2/2f/Battering_ram_%28Kikkosha%29.png");
		reward_string += "<br />";
	}
	
	if (level > 4) {
		reward_string += tr_map + " x ";
		reward_string += add_image("9/9b/Treasure_map_fragment_lvl._1.png");
		reward_string += "<br />";
	}
	
	//This helps with calculating additional rewards.
	var level_a = level;
	if (level%50 == 0 && level > 100) { level_a = 100; }
	
	for (i = 0; i < additional_rewards.length; i += 3){
		if (additional_rewards[i] == level_a) {
			reward_string += additional_rewards[i+1] + " x ";
			reward_string += add_image(additional_rewards[i+2]);
			reward_string += "<br />";
		}
	}
	
	document.getElementById("rewards").innerHTML = reward_string;
	
	var unlock_string = '';
	
	//Writes unlockables into the table.
	for (u = 0; u < unlocks.length; u++) {
		if (unlocks[u][0] == level) {
			for (i = 1; i < unlocks[u].length; i++) {
				unlock_string += unlocks[u][i] + "<br />";
			}
		}
	}

	if (unlock_string == '') { unlock_string = 'Nothing'; }
	
	document.getElementById("unlocks").innerHTML = unlock_string;
}

// Adds image.
function add_image(image_link){
	return "<img src=https://static.wikia.nocookie.net/nonograms-katana/images/" + image_link + " width='40' height='40' >";
}

//Changes every output cell in the table to "0" or "Nothing".
function delete_table(){
	document.getElementById("xp").innerHTML = "0";
	document.getElementById("rewards").innerHTML = "0";
	document.getElementById("unlocks").innerHTML = "Nothing";
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