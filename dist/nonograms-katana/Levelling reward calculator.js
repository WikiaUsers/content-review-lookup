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
	// These are listed from Module:Data/levelling.
	var unlocks = document.getElementById('levelling_data').innerHTML.split(',');

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
		if (parseInt(unlocks[u*2]) == level) {
			unlock_string += unlocks[u*2+1] + "<br />";
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