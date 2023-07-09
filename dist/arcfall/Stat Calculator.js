mw.hook('wikipage.content').add(function() {
	'use strict';
	var table = document.getElementById('statTable');
	if (!table) return;

	var primary_stat_point    = 4; //Increase 1 primary per how many points
	var secondary_stat_point  = 5; //Increase 1 secondary per how many points
	var health_per_stat_point = 10; //Increase health by 10 per point
	var mana_per_stat_point   = 10; //Increase mana by 10 per point
	var weight_per_stat_point = 10; //Increase weight by 10 per point

	//Basic Stats
	var strength        =   15;
	var dexterity       =   10;
	var endurance       =   15;
	var physical        =   5;
	var poison_resist   =   5;
	var potential       =   5;
	var intelligence    =   5;
	var willpower       =   5;
	var fire_resist     =   5;
	var ice_resist      =   5;
	
	//Skill List and their variables | null means not implemented
	var skillArray = {
		alchemy      : [0,"int"],
		archery      : [0,"dex","end"],
		blacksmithing: [0,"str","dex"],
		bowmaking    : [0 , null],
		carpentry    : [0,"end"],
		cartography  : [0,"pot"],
		cooking      : [0,"pot","will"],
		farming      : [0,"str"],
		fishing      : [0,"pot"],
		fletching    : [0 , null],
		gathering    : [0 , null],
		healing      : [0,"end","int"],
		hewing       : [0,"str","dex"],
		leather_works: [0,"str","pot"],
		lockpicking  : [0 , null],
		lumberjack   : [0,"end","dex"],
		magery       : [0,"int","will"],
		mining       : [0,"str","end"],
		refining     : [0,"dex"],
		skinning     : [0 , null],
		stealing     : [0 , null],
		swordsmanship: [0,"str","end"],
		tailoring    : [0,"pot","int"],
		tinkering    : [0 , null]
	};

	var health          = 20; // Default health is 20 not counting the default stats
	var mana            = 20; // Default mana is 20 not counting the default stats
	var weight          = 20; // Default weight is 20 not counting the default stats
	var total_points    = 0;  // Total skills points added up

	var imageLink = 'https://static.wikia.nocookie.net/arcfall_gamepedia_en/images/';
	var statusImageSource = imageLink + "e/ea/Statpage.png";
	var resultImage       = imageLink + "d/d9/Result_border_v3.png";

	function addInput(name) {
		var input = document.createElement('input');
		input.type = 'number';
		//input.name = name;
		//input.id = name;
		input.maxlength = 4;
		input.min = 1;
		input.max = 1000;
		input.value = 1;
		document.getElementById(name).append(input);
		skillArray[name][4] = input;
		//return input;
	}

	function getInput(name) {
		if (!skillArray[name][4]) addInput(name);
		return Number(skillArray[name][4].value);
	}

	function setStats() {
	
		//Set basic stats
		strength        =   15;
		dexterity       =   10;
		endurance       =   15;
		physical        =   5;
		poison_resist   =   5;
		potential       =   5;
		intelligence    =   5;
		willpower       =   5;
		fire_resist     =   5;
		ice_resist      =   5;

		health          =   20;
		mana            =   20;
		weight          =   20;
	
		//Get stats from fields
		skillArray.alchemy[0]             = getInput("alchemy");
		skillArray.archery[0]             = getInput("archery");
		skillArray.blacksmithing[0]       = getInput("blacksmithing");
		skillArray.bowmaking[0]           = getInput("bowmaking");
		skillArray.carpentry[0]           = getInput("carpentry");
		skillArray.cartography[0]         = getInput("cartography");
		skillArray.cooking[0]             = getInput("cooking");
		skillArray.farming[0]             = getInput("farming");
		skillArray.fishing[0]             = getInput("fishing");
		skillArray.fletching[0]           = getInput("fletching");
		skillArray.gathering[0]           = getInput("gathering");
		skillArray.healing[0]             = getInput("healing");
		skillArray.hewing[0]              = getInput("hewing");
		skillArray.leather_works[0]       = getInput("leather_works");
		skillArray.lockpicking[0]         = getInput("lockpicking");
		skillArray.lumberjack[0]          = getInput("lumberjack");
		skillArray.magery[0]              = getInput("magery");
		skillArray.mining[0]              = getInput("mining");
		skillArray.refining[0]            = getInput("refining");
		skillArray.skinning[0]            = getInput("skinning");
		skillArray.stealing[0]            = getInput("stealing");
		skillArray.swordsmanship[0]       = getInput("swordsmanship");
		skillArray.tailoring[0]           = getInput("tailoring");
		skillArray.tinkering[0]           = getInput("tinkering");
	}
	
	function calcStats() {
		for (var i in skillArray) {
			var skill = skillArray[i];

			if (skill[1] != null) {
				switch(skill[1]) {
					case "str":
					    strength += Math.floor(skill[0] / primary_stat_point);                
					break;

					case "dex":
					    dexterity += Math.floor(skill[0] / primary_stat_point);
					break;

					case "end":
					    endurance += Math.floor(skill[0] / primary_stat_point);
					break;

					case "pot":
					    potential += Math.floor(skill[0] / primary_stat_point);
					break;

					case "int":
					    intelligence += Math.floor(skill[0] / primary_stat_point);
					break;

					case "will":
					    willpower += Math.floor(skill[0] / primary_stat_point);
					break;
					}
					if (skill[2] != null) {
					switch(skill[2]) {
						case "str":
							strength += Math.floor(skill[0] / secondary_stat_point);
						break;

						case "dex":
							dexterity += Math.floor(skill[0] / secondary_stat_point);
						break;

						case "end":
							endurance += Math.floor(skill[0] / secondary_stat_point);
						break;

						case "pot":
							potential += Math.floor(skill[0] / secondary_stat_point);
						break;

						case "int":
							intelligence += Math.floor(skill[0] / secondary_stat_point);
						break;

						case "will":
							willpower += Math.floor(skill[0] / secondary_stat_point);
						break;
					}
				}
			}
		}

		//calculate health / mana / weight
		health += (endurance * health_per_stat_point);
		mana += ((intelligence + willpower) * mana_per_stat_point);
		weight += (strength * weight_per_stat_point);   

		total_points = 0;

		for (var j in skillArray) {
			var skill2 = skillArray[j];
			total_points += parseInt(skill2[0]);
		}
	}

	var statCanvas = document.createElement('canvas');
	statCanvas.width = 368;
	statCanvas.height = 530;
	document.getElementById("statCanvas").append(statCanvas);
	var resultCanvas = document.createElement('canvas');
	resultCanvas.width = 180;
	resultCanvas.height = 530;
	document.getElementById("resultCanvas").prepend(resultCanvas);
	document.getElementById('calcButton').addEventListener('click', calculate);
	var statBackground;
	var resultBackground;

	function drawStats(choice , canvas) {
		switch(choice) {
			case "statCanvas":
				var statContext = canvas.getContext("2d");
				statContext.fillStyle = "#D3B76B";
				statContext.font = "Bold 15px Arial";

				//Draw Text
				statContext.fillText(strength,131,426);
				statContext.fillText(dexterity,131,446);
				statContext.fillText(endurance,131,465);
				statContext.fillText(physical,131,487);
				statContext.fillText(poison_resist,131,507);

				statContext.fillText(potential,319,426);
				statContext.fillText(intelligence,319,446);
				statContext.fillText(willpower,319,465);
				statContext.fillText(fire_resist,319,487);
				statContext.fillText(ice_resist,319,507);
			break;

			case "resultCanvas":
				var resultContext = canvas.getContext("2d");
				resultContext.fillStyle = "#A69C81";
				resultContext.font = "Bold 15px Arial";

				//Draw Health and Mana
				resultContext.fillStyle = "#A69C81";
	
				resultContext.fillText("Health:",26,33);
				resultContext.fillText("Mana:",26,53);
				resultContext.fillText("Weight:",26,73);
				resultContext.fillText("Used Points:",26,93);

				resultContext.fillStyle = "#D3B76B";

				resultContext.fillText(health,126,33);
				resultContext.fillText(mana,126,53); 
				resultContext.fillText(weight,126,73);
				resultContext.fillText(total_points,126,93); 
			break;
	
			case "calculate":
				var resultContext2 = resultCanvas.getContext("2d");
				var statContext2 = statCanvas.getContext("2d"); 
				resultContext2.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
				statContext2.clearRect(0, 0, statCanvas.width, statCanvas.height);
				statContext2.drawImage(statBackground,0,0);
				resultContext2.drawImage(resultBackground,0,0);
				drawStats("statCanvas", statCanvas);
				drawStats("resultCanvas", resultCanvas);
			break;
		}
	}
	
	function calculate() {
		setStats();
		calcStats();
		drawStats("calculate");
	}

	var statContext = statCanvas.getContext("2d");
	var resultContext = resultCanvas.getContext("2d");
	statBackground = new Image();
	resultBackground = new Image(); 
	statBackground.src = statusImageSource;
	resultBackground.src = resultImage;

	setStats();
	calcStats();

	statBackground.onload = function() {
		statContext.drawImage(statBackground,0,0);
		drawStats("statCanvas",statCanvas);
	};
	resultBackground.onload = function() {
		resultContext.drawImage(resultBackground,0,0);
		drawStats("resultCanvas",resultCanvas);
	};
});