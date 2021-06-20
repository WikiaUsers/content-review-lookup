/* Any JavaScript here will be loaded for all users on every page load. */

//Calculates rewards for levels on page "Levelling".
function calculate() {
	var level = document.getElementById("level").value;
	if (level < 2){
		document.getElementById("wrong_number").innerHTML = "You have enter a number smaller than 2.";
		return;
	}
	document.getElementById("wrong_number").innerHTML = "";
	var xp = 1000, ruby = 1, item1 = 0, bt_ram = 1, tr_map = 3, j = -1, n = -1;
	const items = ["Arrows","Fan","Shuriken","Katana","Spikes","Boomerang","Petard","Bomb","Steel","Iron sand","Sushi","Mortar"];
	const images = [
		"https://static.wikia.nocookie.net/nonograms-katana/images/f/f0/Arrows.png/revision/latest?cb=20210111142621",
		"https://static.wikia.nocookie.net/nonograms-katana/images/b/b9/Fan.png/revision/latest?cb=20210111143226",
		"https://static.wikia.nocookie.net/nonograms-katana/images/a/ac/Shuriken.png/revision/latest?cb=20210111145634",
		"https://static.wikia.nocookie.net/nonograms-katana/images/e/e9/Katana.png/revision/latest?cb=20210111145304",
		"https://static.wikia.nocookie.net/nonograms-katana/images/9/9a/Spikes.png/revision/latest?cb=20210111145700",
		"https://static.wikia.nocookie.net/nonograms-katana/images/7/7c/Boomerang.png/revision/latest?cb=20210111142949",
		"https://static.wikia.nocookie.net/nonograms-katana/images/3/31/Petard.png/revision/latest?cb=20210111145400",
		"https://static.wikia.nocookie.net/nonograms-katana/images/3/3b/Bomb.png/revision/latest?cb=20210111142922",
		"https://static.wikia.nocookie.net/nonograms-katana/images/c/c9/Steel.png/revision/latest?cb=20210111145724",
		"https://static.wikia.nocookie.net/nonograms-katana/images/a/a7/Iron_sand.png/revision/latest?cb=20210111143836",
		"https://static.wikia.nocookie.net/nonograms-katana/images/6/6d/Sushi.png/revision/latest?cb=20210111145817",
		"https://static.wikia.nocookie.net/nonograms-katana/images/8/83/Mortar.png/revision/latest?cb=20210307192837",
		"https://static.wikia.nocookie.net/nonograms-katana/images/4/4f/Charcoal.png/revision/latest?cb=20210111143028",
		"https://static.wikia.nocookie.net/nonograms-katana/images/9/92/Chemicals.png/revision/latest?cb=20210111143103"];
	
	for (i = 2; i < level; i++) {
		xp += i*1000;
	}

	if (level % 5 === 0) {
		ruby = 2;
	}
	if (level % 10 === 0) {
		ruby = 3;
	}

	item1 = items[(level-2)%items.length];
	if (item1 == "Arrows") {
		j = 0;
		n = 5;
	} else if (item1 == "Fan") {
		j = 1;
		n = 5;
	} else if (item1 == "Shuriken") {
		j = 2;
		n = 5;
	} else if (item1 == "Katana") {
		j = 3;
		n = 5;
	} else if (item1 == "Spikes") {
		j = 4;
		n = 5;
	} else if (item1 == "Boomerang") {
		j = 5;
		n = 5;
	} else if (item1 == "Petard") {
		j = 6;
		n = 5;
	} else if (item1 == "Bomb") {
		j = 7;
		n = 5;
	} else if (item1 == "Steel") {
		j = 8;
		n = 5;
	} else if (item1 == "Iron sand") {
		j = 9;
		n = 5;
	} else if (item1 == "Sushi") {
		j = 10;
		n = 2;
	} else if (item1 == "Mortar") {
		j = 11;
		n = 1;
	}
	
	if (level == 5) {
		tr_map = 5;
	}
	

	document.getElementById("xp").innerHTML = xp;
	
	document.getElementById("coin").innerHTML = level*2 + " x ";
	var imgCoin = document.createElement("img");
	imgCoin.src = "https://static.wikia.nocookie.net/nonograms-katana/images/6/6d/Coin.png/revision/latest?cb=20210111143200";
	imgCoin.width = "30";
	imgCoin.height = "30";
	document.getElementById("coin").appendChild(imgCoin);
	
	document.getElementById("ruby").innerHTML = ruby + " x ";
	var imgRuby = document.createElement("img");
	imgRuby.src = "https://static.wikia.nocookie.net/nonograms-katana/images/a/a9/Ruby.png/revision/latest?cb=20210111145432";
	imgRuby.width = "30";
	imgRuby.height = "30";
	document.getElementById("ruby").appendChild(imgRuby);
	
	document.getElementById("item1").innerHTML = n + " x ";
	var imgItem1 = document.createElement("img");
	imgItem1.src = images[j];
	imgItem1.width = "30";
	imgItem1.height = "30";
	document.getElementById("item1").appendChild(imgItem1);
	
	if (j == 8 || j == 9){
		j += 4;
		document.getElementById("item2").innerHTML = n + " x ";
		var imgItem2 = document.createElement("img");
		imgItem2.src = images[j];
		imgItem2.width = "30";
		imgItem2.height = "30";
		document.getElementById("item2").appendChild(imgItem2);
	} else {
		document.getElementById("item2").innerHTML = "0";
	}
	
	if (level > 15) {
		document.getElementById("bt_ram").innerHTML = bt_ram + " x ";
		var imgBTram = document.createElement("img");
		imgBTram.src = "https://static.wikia.nocookie.net/nonograms-katana/images/d/d9/Battering_Ram.png/revision/latest?cb=20210111142838";
		imgBTram.width = "30";
		imgBTram.height = "30";
		document.getElementById("bt_ram").appendChild(imgBTram);
	} else {
		document.getElementById("bt_ram").innerHTML = "0";
	}
	
	if (level > 4) {
		document.getElementById("tr_map").innerHTML = tr_map + " x ";
		var imgTRmap = document.createElement("img");
		imgTRmap.src = "https://static.wikia.nocookie.net/nonograms-katana/images/9/9b/Treasure_map_fragment_lvl._1.png/revision/latest?cb=20210111145859";
		imgTRmap.width = "30";
		imgTRmap.height = "30";
		document.getElementById("tr_map").appendChild(imgTRmap);
	} else {
		document.getElementById("tr_map").innerHTML = "0";
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