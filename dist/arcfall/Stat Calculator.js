/* [[Template:Test]] */
mw.hook('wikipage.content').add(function($content) {
	'use strict';
	var table = $content.find('#statTable:not(.loaded)')[0];
	if (!table) return;
	table.classList.add('loaded');

	var primaryStatPoint   = 4, //Increase 1 primary per how many points
		secondaryStatPoint = 5, //Increase 1 secondary per how many points
		healthPerStatPoint = 10, //Increase health by 10 per point
		manaPerStatPoint   = 10, //Increase mana by 10 per point
		weightPerStatPoint = 10; //Increase weight by 10 per point

	//Basic Stats
	var strength     =   15,
		dexterity    =   10,
		endurance    =   15,
		physical     =   5,
		poisonResist =   5,
		potential    =   5,
		intelligence =   5,
		willpower    =   5,
		fireResist   =   5,
		iceResist    =   5;
	
	//Skill List and their variables | null means not implemented
	var skillArray = {
		alchemy      : [0, 'int'],
		archery      : [0, 'dex', 'end'],
		blacksmithing: [0, 'str', 'dex'],
		bowmaking    : [0, null],
		carpentry    : [0, 'end'],
		cartography  : [0, 'pot'],
		cooking      : [0, 'pot', 'will'],
		farming      : [0, 'str'],
		fishing      : [0, 'pot'],
		fletching    : [0, null],
		gathering    : [0, null],
		healing      : [0, 'end', 'int'],
		hewing       : [0, 'str', 'dex'],
		leatherWorks : [0, 'str', 'pot'],
		lockpicking  : [0, null],
		lumberjack   : [0, 'end', 'dex'],
		magery       : [0, 'int', 'will'],
		mining       : [0, 'str', 'end'],
		refining     : [0, 'dex'],
		skinning     : [0, null],
		stealing     : [0, null],
		swordsmanship: [0, 'str', 'end'],
		tailoring    : [0, 'pot', 'int'],
		tinkering    : [0, null]
	};

	var health      = 20; // Default health is 20 not counting the default stats
	var mana        = 20; // Default mana is 20 not counting the default stats
	var weight      = 20; // Default weight is 20 not counting the default stats
	var totalPoints = 0;  // Total skills points added up

	var imageLink = 'https://static.wikia.nocookie.net/arcfall_gamepedia_en/images/';
	var statusImageSource = imageLink + 'e/ea/Statpage.png';
	var resultImage       = imageLink + 'd/d9/Result_border_v3.png';

	function addInput(name) {
		var input = document.createElement('input');
		input.type = 'number';
		//input.name = name;
		//input.id = name;
		input.maxlength = 4;
		input.min = 1;
		input.max = 1000;
		input.value = 1;
		$content.find('#' + name).append(input);
		skillArray[name][4] = input;
		//return input;
	}

	function getInput(name) {
		if (!skillArray[name][4]) addInput(name);
		return Number(skillArray[name][4].value);
	}

	function setStats() {
		var s = skillArray;

		//Set basic stats
		strength     = 15;
		dexterity    = 10;
		endurance    = 15;
		physical     = 5;
		poisonResist = 5;
		potential    = 5;
		intelligence = 5;
		willpower    = 5;
		fireResist   = 5;
		iceResist    = 5;

		health       = 20;
		mana         = 20;
		weight       = 20;
	
		//Get stats from fields
		s.alchemy[0]       = getInput('alchemy');
		s.archery[0]       = getInput('archery');
		s.blacksmithing[0] = getInput('blacksmithing');
		s.bowmaking[0]     = getInput('bowmaking');
		s.carpentry[0]     = getInput('carpentry');
		s.cartography[0]   = getInput('cartography');
		s.cooking[0]       = getInput('cooking');
		s.farming[0]       = getInput('farming');
		s.fishing[0]       = getInput('fishing');
		s.fletching[0]     = getInput('fletching');
		s.gathering[0]     = getInput('gathering');
		s.healing[0]       = getInput('healing');
		s.hewing[0]        = getInput('hewing');
		s.leatherWorks[0]  = getInput('leatherWorks');
		s.lockpicking[0]   = getInput('lockpicking');
		s.lumberjack[0]    = getInput('lumberjack');
		s.magery[0]        = getInput('magery');
		s.mining[0]        = getInput('mining');
		s.refining[0]      = getInput('refining');
		s.skinning[0]      = getInput('skinning');
		s.stealing[0]      = getInput('stealing');
		s.swordsmanship[0] = getInput('swordsmanship');
		s.tailoring[0]     = getInput('tailoring');
		s.tinkering[0]     = getInput('tinkering');
	}
	
	function calcStats() {
		for (var i in skillArray) {
			if (!skillArray.hasOwnProperty(i)) continue;
			var skill = skillArray[i],
				tmp = Math.floor(skill[0] / primaryStatPoint),
				tmp2 = Math.floor(skill[0] / secondaryStatPoint);
			
			if (skill[1] === null) continue;
			strength += skill[1] === 'str' ? tmp : 0;
			dexterity += skill[1] === 'dex' ? tmp : 0;
			endurance += skill[1] === 'end' ? tmp : 0;
			potential += skill[1] === 'pot' ? tmp : 0;
			intelligence += skill[1] === 'int' ? tmp : 0;
			willpower += skill[1] === 'will' ? tmp : 0;
			
			if (skill[2] === null) continue;
			strength += skill[2] === 'str' ? tmp2 : 0;
			dexterity += skill[2] === 'dex' ? tmp2 : 0;
			endurance += skill[2] === 'end' ? tmp2 : 0;
			potential += skill[2] === 'pot' ? tmp2 : 0;
			intelligence += skill[2] === 'int' ? tmp2 : 0;
			willpower += skill[2] === 'will' ? tmp2 : 0;
		}

		//calculate health / mana / weight
		health += (endurance * healthPerStatPoint);
		mana += ((intelligence + willpower) * manaPerStatPoint);
		weight += (strength * weightPerStatPoint);

		totalPoints = 0;

		for (var j in skillArray) {
			if (skillArray.hasOwnProperty(j)) {
				var skill2 = skillArray[j];
				totalPoints += parseInt(skill2[0]);
			}
		}
	}

	var statCanvas = document.createElement('canvas');
	statCanvas.width = 368;
	statCanvas.height = 530;
	$content.find('#statCanvas')[0].append(statCanvas);
	var resultCanvas = document.createElement('canvas');
	resultCanvas.width = 180;
	resultCanvas.height = 530;
	$content.find('#resultCanvas')[0].prepend(resultCanvas);
	var statBackground,
		resultBackground;

	function drawStats(choice , canvas) {
		switch(choice) {
			case 'statCanvas':
				var statContext = canvas.getContext('2d');
				statContext.fillStyle = '#D3B76B';
				statContext.font = 'Bold 15px Arial';

				//Draw Text
				statContext.fillText(strength, 131, 426);
				statContext.fillText(dexterity, 131, 446);
				statContext.fillText(endurance, 131, 465);
				statContext.fillText(physical, 131, 487);
				statContext.fillText(poisonResist, 131, 507);

				statContext.fillText(potential, 319, 426);
				statContext.fillText(intelligence, 319, 446);
				statContext.fillText(willpower, 319, 465);
				statContext.fillText(fireResist, 319, 487);
				statContext.fillText(iceResist, 319, 507);
			break;

			case 'resultCanvas':
				var resultContext = canvas.getContext('2d');
				resultContext.fillStyle = '#A69C81';
				resultContext.font = 'Bold 15px Arial';

				//Draw Health and Mana
				resultContext.fillStyle = '#A69C81';
	
				resultContext.fillText('Health:', 26, 33);
				resultContext.fillText('Mana:', 26, 53);
				resultContext.fillText('Weight:', 26, 73);
				resultContext.fillText('Used Points:', 26, 93);

				resultContext.fillStyle = '#D3B76B';

				resultContext.fillText(health, 126, 33);
				resultContext.fillText(mana, 126, 53); 
				resultContext.fillText(weight, 126, 73);
				resultContext.fillText(totalPoints, 126, 93); 
			break;
	
			case 'calculate':
				var resultContext2 = resultCanvas.getContext('2d');
				var statContext2 = statCanvas.getContext('2d'); 
				resultContext2.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
				statContext2.clearRect(0, 0, statCanvas.width, statCanvas.height);
				statContext2.drawImage(statBackground, 0, 0);
				resultContext2.drawImage(resultBackground, 0, 0);
				drawStats('statCanvas', statCanvas);
				drawStats('resultCanvas', resultCanvas);
			break;
		}
	}
	
	function calculate() {
		setStats();
		calcStats();
		drawStats('calculate');
	}
	$content.find('#calcButton')[0].addEventListener('click', calculate, false);

	var statContext = statCanvas.getContext('2d'),
		resultContext = resultCanvas.getContext('2d');
	statBackground = new Image();
	resultBackground = new Image(); 
	statBackground.src = statusImageSource;
	resultBackground.src = resultImage;

	setStats();
	calcStats();

	statBackground.addEventListener('load', function() {
		statContext.drawImage(statBackground,0,0);
		drawStats('statCanvas', statCanvas);
	}, false);
	resultBackground.addEventListener('load', function() {
		resultContext.drawImage(resultBackground,0,0);
		drawStats('resultCanvas', resultCanvas);
	}, false);
});