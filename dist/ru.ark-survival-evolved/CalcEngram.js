var level = 0;
var points = 0;
var spent = 0;

var engramTableDiv = document.getElementById('engramTable');
engramTableDiv.innerHTML = '<table class="wikitable"><thead><tr><th>Уровень</th><th>Макс. очков</th><th>Свободные очки</th><th>Потратили очков</th><th>Сбросить очки</th></tr></thead><tbody><tr><td><input type="text" id="level" value="98" onkeyup="levelChanged()" maxlength="4"></td><td><span id="maxPoints">2764</span></td><td><span id="remaining">2764</span></td><td><span id="spent">0</span></td><td><button type="button" onclick="resetPoints()">Сбросить очки</button></td></tr></tbody></table><ul id="engrams">';
    
window.onload = function(){
	setLevel();
	setEngrams();
	setPoints();
}

function setLevel(){
	var l = document.getElementById('level');
	level = l.value;
}

function setEngrams(){
	var e = retrieveEngrams();
	var t = document.getElementById('engrams');
	t.innerHTML = e;
}

function setPoints(){
	calculateEP();
	var mp = document.getElementById('maxPoints');
	var r = document.getElementById('remaining');
	var s = document.getElementById('spent');

	mp.innerHTML = points;
	r.innerHTML = points - spent;
	s.innerHTML = spent;
}

function calculateEP(){
	points = 0;
	var ubound1 = Math.min(level, 59);
	var ubound2 = Math.min(level, 72);
	var ubound3 = Math.min(level, 86);
	var ubound4 = Math.min(level, 98);

	for (var i = 2; i <= ubound1; i++){
		points += 8 + (Math.floor(i/10) * 4);
	}

	for (var i = 60; i <= ubound2; i++){
		points += 40;
	}

	for (var i = 73; i <= ubound3; i++){
		points += 50;
	}
	for (var i = 87; i <= ubound4; i++){
		points += 60;
	}
}

function levelChanged(){
	setLevel();
	setEngrams();
	setPoints();
}

function resetPoints(){
	level = 0;
	points = 0;
	spent = 0;

	setLevel();
	setEngrams();
	setPoints();
}

function selectEngram(engram){
	var e = document.getElementById(engram);
	if(e.className !== 'levelRequired'){
		if(e.className != 'engramRequired'){
			if(e.className === 'engramSelected'){
				e.className = 'engramDetails';
				spent -= engrams[engram].points;
				addEngramRequirement(engram);
			}
			else {
				if((points - spent) - engrams[engram].points >= 0){
					e.className = 'engramSelected';
					spent += engrams[engram].points;
					removeEngramRequirement(engram);
				}
				else {
					alert("У вас нет достаточно EP, чтобы изучить этот инграмму.");
				}
			}
			updatePoints();
		} else {
			var reqEngrams = '';
			for(var i = 0; i < engrams[engram].requires.length; i++){
				reqEngrams += engrams[engram].requires[i] + ', ';
			}
			reqEngrams = reqEngrams.slice(0, - 2);
			alert('Вам сначала необходимо изучить: ' + reqEngrams);
		}
	} else {
		alert('Эта инграмма не доступна для вашего текущего уровня.');
	}
}

function addEngramRequirement(engram){
	var selected = $('.engramSelected');
	var unselected = $('.engramDetails');

	checkEngramReq(engram, selected, unselected);
	checkEngramReq(engram, unselected, selected);
}

function checkEngramReq(engram, array, placeholder){
	var p = 0;
	for(var i = 0; i < array.length; i++){
		var e = array[i].id;
		var reqs = engrams[e].requires;	
		if(reqs.length > 0){
			if(reqs.indexOf(engram) !== -1){
				var engramReq = document.getElementById(e);
				if(engramReq.className == 'engramSelected') //only remove the points if engram was also selected
					p += engrams[e].points;
				engramReq.className = 'engramRequired';
				if(document.getElementById(engramReq.id + "Overlay") === null)
					addOverlay(engramReq);
				checkEngramReq(engramReq.id, array, placeholder);
				checkEngramReq(engramReq.id, placeholder, array);
			}
		}	
	}
	spent -= p;
}

function removeEngramRequirement(engram){
	var req = $('.engramRequired');
	for(var i = 0; i < req.length; i++){
		var e = req[i].id;
		var eList = engrams[e].requires;

		//Only check requirements of those that contained the engram
		if(eList.indexOf(engram) !== -1){
			var j = 0;
			var unlocked = retrieveIDArrayFromElements($('.engramSelected'));

			for(var k = 0; k < eList.length; k++){
				if(unlocked.indexOf(eList[k]) !== -1)
					j++;
			}
			
			if(j == eList.length){
				var u = document.getElementById(e);
				u.className = 'engramDetails';
				removeOverlay(u);
			}
		}		
	}
}

function retrieveIDArrayFromElements(elements){
	var array = [];

	for(var i = 0; i < elements.length; i++){
		array.push(elements[i].id);
	}
	return array;
}

function updatePoints(){
	var r = document.getElementById('remaining');
	var s = document.getElementById('spent');

	spent = +spent || 0;
	r.innerHTML = points - spent;
	s.innerHTML = Math.max(spent, 0);
}

function addOverlay(element){
	var overlay = document.createElement('div');
	//var propImage = element.id.split(" ").join("_");
	var propImage = element.image;
	overlay.id = element.id + 'Overlay';
	overlay.className = 'engramOverlay';
	overlay.style["-webkit-mask"] = 'url(' + propImage + ') top left / cover'
	overlay.onclick = function() { selectEngram(element.id); };

	document.getElementById(element.id).parentNode.appendChild(overlay);
}

function removeOverlay(element){
	var overlay = document.getElementById(element.id + 'Overlay');
	overlay.parentNode.removeChild(overlay);
}

function retrieveEngrams(){
	var h = '';
	for(var prop in engrams){
		var engramClass = 'engramDetails';
		var engramOverlay = '';
		//var propImage = prop.split(" ").join("_");
		var propImage = engrams[prop].image;
		if(engrams[prop].requires.length > 0){
			engramClass = 'engramRequired';
			engramOverlay = '<div class="engramOverlay" id="' + prop + 'Overlay" style="-webkit-mask: url(' + propImage + ') top left / cover;" onclick="selectEngram(\'' + prop + '\')"></div>';
		}
		if(engrams[prop].level > level)
			engramClass = 'levelRequired';	
		h += '<li class="engramEntry"><div class="' + engramClass + '" id="' + prop + '" onclick="selectEngram(\'' + prop + '\')" style="background: rgba(61,72,80,.9) url(' + propImage + ') no-repeat center;"><div class="engramName">' + prop + '</div><div class="engramLevel">Треб. ур.: ' + engrams[prop].level + '</div><div class="engramPoints">Треб. ОИ: ' + engrams[prop].points + '</div> </div>' + engramOverlay + ' </li>'
	}
	return h;
}


var engrams = {
	'Костёр': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/01/Campfire.png/90px-Campfire.png',
		level: 2,
		points: 3,
		requires: []
	},
	'Каменный топор': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d6/Stone_Hatchet.png/90px-Stone_Hatchet.png',
		level: 2,
		points: 3,
		requires: []
	},
	'Копьё': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4f/Spear.png/90px-Spear.png',
		level: 2,
		points: 3,
		requires: []
	},
	'Дубинка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c8/Wooden_Club.png/90px-Wooden_Club.png',
		level: 2,
		points: 4,
		requires: []
	},
	'Заметка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cc/Note.png/90px-Note.png',
		level: 2,
		points: 3,
		requires: []
	},
	'Тканевые штаны': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/69/Cloth_Pants.png/90px-Cloth_Pants.png',
		level: 2,
		points: 3,
		requires: []
	},
	'Тканевая рубашка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f0/Cloth_Shirt.png/90px-Cloth_Shirt.png',
		level: 2,
		points: 3,
		requires: []
	},
	'Соломенный фундамент': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/43/Thatch_Foundation.png/90px-Thatch_Foundation.png',
		level: 2,
		points: 3,
		requires: []
	},
	'Соломенный дверной проем': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/ef/Thatch_Doorframe.png/90px-Thatch_Doorframe.png',
		level: 2,
		points: 3,
		requires: []
	},
	'Бурдюк': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/63/Waterskin_%28Empty%29.png/90px-Waterskin_%28Empty%29.png',
		level: 3,
		points: 6,
		requires: []
	},
	'Тканевые перчатки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9e/Cloth_Gloves.png/90px-Cloth_Gloves.png',
		level: 3,
		points: 3,
		requires: []
	},
	'Тканевые ботинки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/36/Cloth_Boots.png/90px-Cloth_Boots.png',
		level: 3,
		points: 3,
		requires: []
	},
	'Тканевая шапка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/42/Cloth_Hat.png/90px-Cloth_Hat.png',
		level: 3,
		points: 3,
		requires: []
	},
	'Деревянный указатель': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/22/Wooden_Sign.png/90px-Wooden_Sign.png',
		level: 3,
		points: 3,
		requires: []
	},
	'Кожаный спальный мешок': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e8/Hide_Sleeping_Bag.png/90px-Hide_Sleeping_Bag.png',
		level: 3,
		points: 3,
		requires: []
	},
	'Соломенная крыша': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/da/Thatch_Roof.png/90px-Thatch_Roof.png',
		level: 3,
		points: 3,
		requires: []
	},
	'Соломенная стена': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/bd/Thatch_Wall.png/90px-Thatch_Wall.png',
		level: 3,
		points: 3,
		requires: []
	}, 
	'Соломенная дверь': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/6d/Thatch_Door.png/90px-Thatch_Door.png',
		level: 3,
		points: 3,
		requires: ['Соломенный дверной проем']
	},
	'Рогатка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/3f/Slingshot.png/90px-Slingshot.png',
		level: 5,
		points: 6,
		requires: []
	},
	'Ящик': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d0/Storage_Box.png/90px-Storage_Box.png',
		level: 5,
		points: 6,
		requires: []
	},
	'Простая кровать': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b1/Simple_Bed.png/90px-Simple_Bed.png',
		level: 5,
		points: 6,
		requires: ['Кожаный спальный мешок']
	},
	'Седло на Фиомию': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/bb/Phiomia_Saddle.png/90px-Phiomia_Saddle.png',
		level: 5,
		points: 6,
		requires: []
	},
	'Ступка и пестик': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f0/Mortar_And_Pestle.png/90px-Mortar_And_Pestle.png',
		level: 5,
		points: 6,
		requires: []
	},
	'Селитра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/56/Sparkpowder.png/90px-Sparkpowder.png',
		level: 5,
		points: 3,
		requires: []
	},
	'Шприц для переливания крови': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/92/Blood_Extraction_Syringe.png/90px-Blood_Extraction_Syringe.png',
		level: 5,
		points: 6,
		requires: ['Бурдюк']
	},
	'Наркотик': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e6/Narcotic.png/90px-Narcotic.png',
		level: 5,
		points: 6,
		requires: []
	},
	'Кисточка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c4/Paintbrush.png/90px-Paintbrush.png',
		level: 5,
		points: 3,
		requires: []
	},
	'Однополотное знамя': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/76/Flag.png/90px-Flag.png',
		level: 5,
		points: 6,
		requires: []
	},
	'Многополотное знамя': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/7d/Multi-Panel_Flag.png/90px-Multi-Panel_Flag.png',
		level: 5,
		points: 6,
		requires: []
	},
	'Стоячий факел': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/60/Standing_Torch.png/90px-Standing_Torch.png',
		level: 5,
		points: 6,
		requires: []
	},
	'Наклоненная влево соломенная стена': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/5e/Sloped_Thatch_Wall_Left.png/90px-Sloped_Thatch_Wall_Left.png',
		level: 5,
		points: 3,
		requires: ['Соломенная стена']
	},
	'Наклоненная вправо соломенная стена': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/dd/Sloped_Thatch_Wall_Right.png/90px-Sloped_Thatch_Wall_Right.png',
		level: 5,
		points: 3,
		requires: ['Соломенная стена']
	},
	'Наклоненная соломенная крыша': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9d/Sloped_Thatch_Roof.png/90px-Sloped_Thatch_Roof.png',
		level: 5,
		points: 3,
		requires: ['Соломенная крыша']
	},
	'Деревянный фундамент': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/fb/Wooden_Foundation.png/90px-Wooden_Foundation.png',
		level: 5,
		points: 6,
		requires: ['Соломенный фундамент']
	},
	'Деревянная стена': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/08/Wooden_Wall.png/90px-Wooden_Wall.png',
		level: 5,
		points: 7,
		requires: ['Соломенная стена', 'Деревянный фундамент']
	},
	'Котелок': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f9/Cooking_Pot.png/90px-Cooking_Pot.png',
		level: 10,
		points: 9,
		requires: ['Костёр']
	},
	'Цемент': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/03/Cementing_Paste.png/90px-Cementing_Paste.png',
		level: 10,
		points: 3,
		requires: []
	},
	'Стимулятор': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e2/Stimulant.png/90px-Stimulant.png',
		level: 10,
		points: 6,
		requires: []
	},
	'Порох': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ae/Gunpowder.png/90px-Gunpowder.png',
		level: 10,
		points: 2,
		requires: ['Селитра']
	},
	'Сигнальный пистолет': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/57/Flare_Gun.png/90px-Flare_Gun.png',
		level: 10,
		points: 6,
		requires: ['Порох']
	},
	'Компас': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/92/Compass.png/90px-Compass.png',
		level: 10,
		points: 5,
		requires: []
	},
	'Подзорная труба': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c1/Spyglass.png/90px-Spyglass.png',
		level: 10,
		points: 2,
		requires: []
	},
	'Маленькая грядка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/59/Small_Crop_Plot.png/90px-Small_Crop_Plot.png',
		level: 10,
		points: 9,
		requires: []
	},
	'Седло на Паразавра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b6/Parasaur_Saddle.png/90px-Parasaur_Saddle.png',
		level: 10,
		points: 9,
		requires: []
	},
	'Седло на Ихтиозавра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/11/Ichthyosaurus_Saddle.png/90px-Ichthyosaurus_Saddle.png',
		level: 10,
		points: 8,
		requires: []
	},
	'Каменная труба - Водозабор': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/68/Stone_Irrigation_Pipe_-_Intake.png/90px-Stone_Irrigation_Pipe_-_Intake.png',
		level: 10,
		points: 5,
		requires: []
	},
	'Каменная труба - Прямая': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/11/Stone_Irrigation_Pipe_-_Straight.png/90px-Stone_Irrigation_Pipe_-_Straight.png',
		level: 10,
		points: 2,
		requires: ['Каменная труба - Водозабор']
	},
	'Каменная труба - Кран': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2b/Stone_Irrigation_Pipe_-_Tap.png/90px-Stone_Irrigation_Pipe_-_Tap.png',
		level: 10,
		points: 5,
		requires: ['Каменная труба - Водозабор']
	},
	'Верёвочная лестница': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e1/Rope_Ladder.png/90px-Rope_Ladder.png',
		level: 10,
		points: 5,
		requires: []
	},
	'Деревянные шипы': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/00/Wooden_Spike_Wall.png/90px-Wooden_Spike_Wall.png',
		level: 10,
		points: 4,
		requires: []
	},
	'Деревянная табличка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cb/Wooden_Wall_Sign.png/90px-Wooden_Wall_Sign.png',
		level: 10,
		points: 2,
		requires: ['Деревянный указатель']
	},
	'Деревянное перекрытие': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cf/Wooden_Ceiling.png/90px-Wooden_Ceiling.png',
		level: 10,
		points: 6,
		requires: ['Соломенная крыша']
	},
	'Наклоненная влево деревянная стена': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9a/Sloped_Wood_Wall_Left.png/90px-Sloped_Wood_Wall_Left.png',
		level: 10,
		points: 3,
		requires: ['Наклоненная влево соломенная стена', 'Деревянная стена']
	},
	'Наклоненная вправо деревянная стена': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/29/Sloped_Wood_Wall_Right.png/90px-Sloped_Wood_Wall_Right.png',
		level: 10,
		points: 3,
		requires: ['Наклоненная вправо соломенная стена', 'Деревянная стена']
	},
	'Наклоненная деревянная крыша': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f6/Sloped_Wooden_Roof.png/90px-Sloped_Wooden_Roof.png',
		level: 10,
		points: 4,
		requires: ['Наклоненная соломенная крыша', 'Деревянный потолок']
	},
	'Деревянный дверной проем': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8c/Wooden_Doorframe.png/90px-Wooden_Doorframe.png',
		level: 10,
		points: 6,
		requires: ['Соломенный дверной проем', 'Деревянная стена']
	},
	'Деревянная дверь': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2c/Wooden_Door.png/90px-Wooden_Door.png',
		level: 10,
		points: 4,
		requires: ['Соломенная дверь', 'Деревянный дверной проем']
	},
	'Деревянные перила': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/7b/Wooden_Railing.png/90px-Wooden_Railing.png',
		level: 10,
		points: 3,
		requires: ['Деревянная стена']
	},
	'Деревянный стул': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/87/Wooden_Chair.png/90px-Wooden_Chair.png',
		level: 10,
		points: 6,
		requires: []
	},
	'Тренировочный манекен': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/49/Training_Dummy.png/90px-Training_Dummy.png',
		level: 10,
		points: 8,
		requires: []
	},
	'Надгробие': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/54/Basic_Gravestone.png/90px-Basic_Gravestone.png',
		level: 10,
		points: 8,
		requires: []
	},
	'Боевые барабаны': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/db/Wardrums.png/90px-Wardrums.png',
		level: 10,
		points: 6,
		requires: []
	},
	'Холст для живописи': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a1/Painting_Canvas.png/90px-Painting_Canvas.png',
		level: 10,
		points: 2,
		requires: ['Деревянное табло']
	},
	'Деревянный щит': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/61/Wooden_Shield.png/90px-Wooden_Shield.png',
		level: 10,
		points: 7,
		requires: []
	},
	'Деревянная клетка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4b/Wooden_Cage.png/90px-Wooden_Cage.png',
		level: 10,
		points: 10,
		requires: ['Деревянный фундамент', 'Деревянная стена']
	},
	'Болас': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ae/Bola.png/90px-Bola.png',
		level: 10,
		points: 8,
		requires: []
	},
	'Деревянное основание для забора': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f3/Wooden_Fence_Foundation.png/90px-Wooden_Fence_Foundation.png',
		level: 15,
		points: 6,
		requires: ['Деревянный фундамент']
	},
	'Кожаные штаны': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/44/Hide_Pants.png/90px-Hide_Pants.png',
		level: 15,
		points: 9,
		requires: ['Тканевые штаны']
	},
	'Кожаная рубашка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f3/Hide_Shirt.png/90px-Hide_Shirt.png',
		level: 15,
		points: 6,
		requires: ['Тканевая рубашка']
	},
	'Лук': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/65/Bow.png/90px-Bow.png',
		level: 15,
		points: 11,
		requires: ['Рогатка']
	},
	'Каменная стрела': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/28/Stone_Arrow.png/90px-Stone_Arrow.png',
		level: 15,
		points: 2,
		requires: []
	},
	'Шкаф': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/1d/Large_Storage_Box.png/90px-Large_Storage_Box.png',
		level: 15,
		points: 9,
		requires: ['Ящик']
	},
	'Деревянный плот': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d8/Wooden_Raft.png/90px-Wooden_Raft.png',
		level: 15,
		points: 11,
		requires: []
	},
	'Парашют': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/86/Parachute.png/90px-Parachute.png',
		level: 15,
		points: 6,
		requires: []
	},
	'Репеллент': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/47/Bug_Repellant.png/90px-Bug_Repellant.png',
		level: 15,
		points: 12,
		requires: ['Ступка и пестик']
	},
	'Седло на Пахицелофозавра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9a/Pachy_Saddle.png/90px-Pachy_Saddle.png',
		level: 15,
		points: 2,
		requires: []
	},
	'Седло на Раптора': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4b/Raptor_Saddle.png/90px-Raptor_Saddle.png',
		level: 15,
		points: 9,
		requires: []
	},
	'Каменная труба - Пересечение': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/96/Stone_Irrigation_Pipe_-_Intersection.png/90px-Stone_Irrigation_Pipe_-_Intersection.png',
		level: 15,
		points: 5,
		requires: ['Каменная труба - Прямая']
	},
	'Каменная труба - Наклоненная': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/fc/Stone_Irrigation_Pipe_-_Inclined.png/90px-Stone_Irrigation_Pipe_-_Inclined.png',
		level: 15,
		points: 3,
		requires: ['Каменная труба - Прямая']
	},
	'Каменная труба - Вертикальная': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d7/Stone_Irrigation_Pipe_-_Vertical.png/90px-Stone_Irrigation_Pipe_-_Vertical.png',
		level: 15,
		points: 3,
		requires: ['Каменная труба - Прямая']
	},
	'Ящик для компоста': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e1/Compost_Bin.png/90px-Compost_Bin.png',
		level: 15,
		points: 6,
		requires: ['Ящик для хранения']
	},
	'Каменное основание для забора': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c0/Stone_Fence_Foundation.png/90px-Stone_Fence_Foundation.png',
		level: 15,
		points: 6,
		requires: ['Деревянное основание для забора']
	},
	'Каменная стена': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/1e/Stone_Wall.png/90px-Stone_Wall.png',
		level: 15,
		points: 8,
		requires: ['Деревянная стена']
	},
	'Резервуар для воды': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2c/Water_Reservoir.png/90px-Water_Reservoir.png',
		level: 15,
		points: 7,
		requires: ['Цемент']
	},
	'Деревянный билборд': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/01/Wooden_Billboard.png/90px-Wooden_Billboard.png',
		level: 15,
		points: 4,
		requires: ['Деревянный указатель']
	},
	'Деревянная рампа': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f4/Wooden_Ramp.png/90px-Wooden_Ramp.png',
		level: 15,
		points: 3,
		requires: ['Деревянный потолок']
	},
	'Большая рама': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a8/Dinosaur_Gateway.png/90px-Dinosaur_Gateway.png',
		level: 15,
		points: 7,
		requires: ['Деревянный дверной проем']
	},
	'Большие ворота': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b7/Dinosaur_Gate.png/90px-Dinosaur_Gate.png',
		level: 15,
		points: 5,
		requires: ['Деревянный проем для динозавров']
	},
	'Деревянная колонна': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/39/Wooden_Pillar.png/90px-Wooden_Pillar.png',
		level: 15,
		points: 9,
		requires: ['Деревянный фундамент']
	},
	'Деревянная рама люка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9a/Wooden_Hatchframe.png/90px-Wooden_Hatchframe.png',
		level: 15,
		points: 9,
		requires: ['Деревянное перекрытие']
	},
	'Деревянная лестница': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c7/Wooden_Ladder.png/90px-Wooden_Ladder.png',
		level: 15,
		points: 6,
		requires: ['Деревянная рама люка']
	},
	'Кормушка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/ec/Feeding_Trough.png/90px-Feeding_Trough.png',
		level: 15,
		points: 12,
		requires: []
	},
	'Деревянная лавочка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/fa/Wooden_Bench.png/90px-Wooden_Bench.png',
		level: 15,
		points: 10,
		requires: ['Деревянный стул']
	},
	'Деревянный стол': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f4/Wooden_Table.png/90px-Wooden_Table.png',
		level: 15,
		points: 7,
		requires: ['Деревянный стул']
	},
	'Кожаные перчатки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/09/Hide_Gloves.png/90px-Hide_Gloves.png',
		level: 20,
		points: 9,
		requires: ['Тканевые перчатки']
	},
	'Кожаные ботинки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/56/Hide_Boots.png/90px-Hide_Boots.png',
		level: 20,
		points: 9,
		requires: ['Тканевые ботинки']
	},
	'Кожаная шапка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/92/Hide_Hat.png/90px-Hide_Hat.png',
		level: 20,
		points: 12,
		requires: ['Тканевая шапка']
	},
	'Транквилизирующая стрела': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/be/Tranquilizer_Arrow.png/90px-Tranquilizer_Arrow.png',
		level: 20,
		points: 15,
		requires: ['Каменная стрела', 'Наркотик']
	},
	'Седло на Жабу': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b2/Beelzebufo_Saddle.png/90px-Beelzebufo_Saddle.png',
		level: 25,
		points: 16,
		requires: []
	},
	'Плавильная печь': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/98/Refining_Forge.png/90px-Refining_Forge.png',
		level: 20,
		points: 21,
		requires: ['Костёр']
	},
	'Седло на Трицератопса': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/de/Trike_Saddle.png/90px-Trike_Saddle.png',
		level: 20,
		points: 7,
		requires: []
	},
	'Натяжная сигнальная ловушка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d5/Tripwire_Alarm_Trap.png/90px-Tripwire_Alarm_Trap.png',
		level: 20,
		points: 12,
		requires: []
	},
	'Постамент для трофеев': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/85/Trophy_Base.png/90px-Trophy_Base.png',
		level: 20,
		points: 10,
		requires: []
	},	
	'Настенное крепление для трофеев': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f3/Trophy_Wall-Mount.png/90px-Trophy_Wall-Mount.png',
		level: 20,
		points: 10,
		requires: ['Деревянный указатель']
	},
	'Слабый антидот': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/84/Lesser_Antidote.png/90px-Lesser_Antidote.png',
		level: 20,
		points: 16,
		requires: []
	},
	'Термошкаф': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/09/Preserving_Bin.png/90px-Preserving_Bin.png',
		level: 20,
		points: 9,
		requires: ['Ящик']
	},
	'Деревянный мостик': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c3/Wooden_Catwalk.png/90px-Wooden_Catwalk.png',
		level: 20,
		points: 12,
		requires: ['Деревянное перекрытие']
	},
	'Деревянный люк': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f1/Wooden_Trapdoor.png/90px-Wooden_Trapdoor.png',
		level: 20,
		points: 9,
		requires: ['Деревянная рама люка']
	},
	'Деревянная оконная рама': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/0b/Wooden_Windowframe.png/90px-Wooden_Windowframe.png',
		level: 20,
		points: 12,
		requires: ['Деревянная стена']
	},
	'Каменный фундамент': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f6/Stone_Foundation.png/90px-Stone_Foundation.png',
		level: 20,
		points: 6,
		requires: ['Деревянный фундамент']
	},
	'Каменное перекрытие': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d0/Stone_Ceiling.png/90px-Stone_Ceiling.png',
		level: 20,
		points: 6,
		requires: ['Деревянное перекрытие']
	},
	'Наклоненная влево каменная стена': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a2/Sloped_Stone_Wall_Left.png/90px-Sloped_Stone_Wall_Left.png',
		level: 20,
		points: 4,
		requires: ['Наклоненная влево деревянная стена', 'Каменная стена']
	},
	'Наклоненная вправо каменная стена': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f6/Sloped_Stone_Wall_Right.png/90px-Sloped_Stone_Wall_Right.png',
		level: 20,
		points: 4,
		requires: ['Наклоненная вправо деревянная стена', 'Каменная стена']
	},
	'Наклоненная каменная крыша': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b9/Sloped_Stone_Roof.png/90px-Sloped_Stone_Roof.png',
		level: 20,
		points: 4,
		requires: ['Наклоненная деревянная крыша', 'Каменный потолок']
	},
	'Каменный дверной проем': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/41/Stone_Doorframe.png/90px-Stone_Doorframe.png',
		level: 20,
		points: 6,
		requires: ['Деревянный дверной проем', 'Каменная стена']
	},
	'Укреплённая деревянная дверь': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/47/Reinforced_Wooden_Door.png/90px-Reinforced_Wooden_Door.png',
		level: 20,
		points: 4,
		requires: ['Деревянная дверь', 'Каменный дверной проем']
	},
	'Каменные перила': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/1b/Stone_Railing.png/90px-Stone_Railing.png',
		level: 20,
		points: 4,
		requires: ['Деревянные перила', 'Каменная стена']
	},
	'Каменная рама': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/6b/Stone_Dinosaur_Gateway.png/90px-Stone_Dinosaur_Gateway.png',
		level: 20,
		points: 9,
		requires: ['Большая рама', 'Каменный дверной проем']
	},
	'Укрепленные ворота': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/0d/Reinforced_Dinosaur_Gate.png/90px-Reinforced_Dinosaur_Gate.png',
		level: 20,
		points: 6,
		requires: ['Большие ворота', 'Каменная рама']
	},
	'Книжный шкаф': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f7/Bookshelf.png/90px-Bookshelf.png',
		level: 20,
		points: 15,
		requires: ['Большой ящик для хранения']
	},
	'Увеличительное стекло': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/5f/Magnifying_Glass.png/90px-Magnifying_Glass.png',
		level: 20,
		points: 16,
		requires: []
	},
	'Верстак': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b9/Smithy.png/90px-Smithy.png',
		level: 25,
		points: 16,
		requires: []
	},
	'Наручники': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/14/Handcuffs.png/90px-Handcuffs.png',
		level: 25,
		points: 16,
		requires: []
	},
	'Металлические шипы': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/3a/Metal_Spike_Wall.png/90px-Metal_Spike_Wall.png',
		level: 25,
		points: 11,
		requires: []
	},
	'Металлическая кирка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9f/Metal_Pick.png/90px-Metal_Pick.png',
		level: 25,
		points: 12,
		requires: []
	},
	'Металлический топор': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a6/Metal_Hatchet.png/90px-Metal_Hatchet.png',
		level: 25,
		points: 12,
		requires: []
	},
	'Пика': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/31/Pike.png/90px-Pike.png',
		level: 25,
		points: 18,
		requires: ['Копьё']
	},
	'Меховые ботинки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/63/Fur_Boots.png/90px-Fur_Boots.png',
		level: 25,
		points: 12,
		requires: ['Кожаные ботинки']
	},
	'Меховые перчатки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c5/Fur_Gauntlets.png/90px-Fur_Gauntlets.png',
		level: 25,
		points: 12,
		requires: ['Кожаные перчатки']
	},
	'Меховая шапка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/fe/Fur_Cap.png/90px-Fur_Cap.png',
		level: 25,
		points: 14,
		requires: ['Кожаная шапка']
	},
	'Меховые штаны': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9c/Fur_Leggings.png/90px-Fur_Leggings.png',
		level: 25,
		points: 16,
		requires: ['Кожаные штаны']
	},
	'Меховой нагрудник': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b3/Fur_Chestpiece.png/90px-Fur_Chestpiece.png',
		level: 25,
		points: 16,
		requires: ['Кожаная рубашка']
	},
	'Арбалет': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/79/Crossbow.png/90px-Crossbow.png',
		level: 25,
		points: 12,
		requires: ['Лук']
	},
	'Натяжная наркотическая ловушка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ab/Tripwire_Narcotic_Trap.png/90px-Tripwire_Narcotic_Trap.png',
		level: 25,
		points: 12,
		requires: []
	},
	'Капкан': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/92/Bear_Trap.png/90px-Bear_Trap.png',
		level: 25,
		points: 9,
		requires: ['Верстак']
	},
	'Большой капкан': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/7c/Large_Bear_Trap.png/90px-Large_Bear_Trap.png',
		level: 25,
		points: 12,
		requires: ['Капкан']
	},
	'Седло на Скорпиона': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/7a/Pulmonoscorpius_Saddle.png/90px-Pulmonoscorpius_Saddle.png',
		level: 25,
		points: 12,
		requires: []
	},
	'Седло на Карбонемиса': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ac/Carbonemys_Saddle.png/90px-Carbonemys_Saddle.png',
		level: 25,
		points: 12,
		requires: []
	},
	'Средняя грядка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d0/Medium_Crop_Plot.png/90px-Medium_Crop_Plot.png',
		level: 25,
		points: 12,
		requires: ['Маленькая грядка']
	},
	'Металлический указатель': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ad/Metal_Sign.png/90px-Metal_Sign.png',
		level: 25,
		points: 15,
		requires: ['Деревянный указатель']
	},
	'Каменная колонна': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/60/Stone_Pillar.png/90px-Stone_Pillar.png',
		level: 25,
		points: 8,
		requires: ['Деревянная колонна', 'Каменный фундамент']
	},
	'Каменная рама люка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ae/Stone_Hatchframe.png/90px-Stone_Hatchframe.png',
		level: 25,
		points: 8,
		requires: ['Деревянная рама люка', 'Каменная стена']
	},
	'Каменная оконная рама': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2c/Stone_Windowframe.png/90px-Stone_Windowframe.png',
		level: 25,
		points: 11,
		requires: ['Деревянная оконная рама', 'Каменная стена']
	},
	'Деревянное окно': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/ca/Wooden_Window.png/90px-Wooden_Window.png',
		level: 25,
		points: 12,
		requires: ['Деревянная оконная рама']
	},
	'Радио': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/31/Radio.png/90px-Radio.png',
		level: 25,
		points: 8,
		requires: []
	},
	'Дымовая граната': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d5/Smoke_Grenade.png/90px-Smoke_Grenade.png',
		level: 25,
		points: 18,
		requires: []
	},
	'Баллиста': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/65/Ballista_Turret.png/90px-Ballista_Turret.png',
		level: 25,
		points: 25,
		requires: []
	},
	'Болт для баллиста': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/99/Ballista_Bolt.png/90px-Ballista_Bolt.png',
		level: 25,
		points: 10,
		requires: []
	},
	'Огромная каменная рама': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/3b/Behemoth_Stone_Dinosaur_Gateway.png/90px-Behemoth_Stone_Dinosaur_Gateway.png',
		level: 25,
		points: 12,
		requires: ['Каменная рама']
	},
	'Огромные укрепленные ворота': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9d/Behemoth_Reinforced_Dinosaur_Gate.png/90px-Behemoth_Reinforced_Dinosaur_Gate.png',
		level: 25,
		points: 16,
		requires: ['Укрепленные ворота', 'Огромная каменная рама']
	},
	'Настенный факел': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c8/Wall_Torch.png/90px-Wall_Torch.png',
		level: 25,
		points: 8,
		requires: ['Стоячий факел']
	},
	'Хитиновые штаны': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/fd/Chitin_Leggings.png/90px-Chitin_Leggings.png',
		level: 30,
		points: 15,
		requires: ['Кожаные штаны']
	},
	'Хитиновый нагрудник': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f1/Chitin_Chestpiece.png/90px-Chitin_Chestpiece.png',
		level: 30,
		points: 18,
		requires: ['Кожаная рубашка']
	},
	'Хитиновый шлем': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/7b/Chitin_Helmet.png/90px-Chitin_Helmet.png',
		level: 30,
		points: 18,
		requires: ['Кожаная шапка']
	},
	'Бутылка для воды': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/47/Water_Jar.png/90px-Water_Jar.png',
		level: 30,
		points: 12,
		requires: ['Бурдюк']
	},
	'Катапульта': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/22/Catapult_Turret.png/90px-Catapult_Turret.png',
		level: 30,
		points: 25,
		requires: ['Баллиста']
	},
	'Седло на Большерогого оленя': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8b/Megaloceros_Saddle.png/90px-Megaloceros_Saddle.png',
		level: 30,
		points: 20,
		requires: []
	},
	'Простой пистолет': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d0/Simple_Pistol.png/90px-Simple_Pistol.png',
		level: 30,
		points: 15,
		requires: ['Сигнальный пистолет']
	},
	'Простая пуля': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/88/Simple_Bullet.png/90px-Simple_Bullet.png',
		level: 30,
		points: 6,
		requires: ['Порох']
	},
	'Снайперский прицел': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/74/Scope.png/90px-Scope.png',
		level: 30,
		points: 13,
		requires: ['Подзорная труба']
	},
	'Металлический серп': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e0/Metal_Sickle.png/90px-Metal_Sickle.png',
		level: 30,
		points: 12,
		requires: ['Металлический топор', 'Металлическая кирка']
	},
	'Седло на Стегозавра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4c/Stego_Saddle.png/90px-Stego_Saddle.png',
		level: 30,
		points: 15,
		requires: []
	},
	'Седло на Дедикуруса': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/64/Doedicurus_Saddle.png/90px-Doedicurus_Saddle.png',
		level: 30,
		points: 20,
		requires: []
	},
	'Седло на Парацератерия': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a8/Paracer_Saddle.png/90px-Paracer_Saddle.png',
		level: 30,
		points: 18,
		requires: []
	},
	'Граната': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/fb/Grenade.png/90px-Grenade.png',
		level: 30,
		points: 20,
		requires: ['Порох']
	},
	'Укреплённый люк': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/72/Reinforced_Trapdoor.png/90px-Reinforced_Trapdoor.png',
		level: 30,
		points: 10,
		requires: ['Деревянный люк', 'Каменная рама люка']
	},
	'Укрепленное окно': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/02/Reinforced_Window.png/90px-Reinforced_Window.png',
		level: 30,
		points: 10,
		requires: ['Деревянное окно', 'Каменная оконная рама']
	},
	'Металлическая табличка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/73/Metal_Wall_Sign.png/90px-Metal_Wall_Sign.png',
		level: 30,
		points: 6,
		requires: ['Деревянная табличка', 'Металлический указатель']
	},
	'Металлический фундамент': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/45/Metal_Foundation.png/90px-Metal_Foundation.png',
		level: 30,
		points: 24,
		requires: ['Каменный фундамент']
	},
	'Металлическая стена': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a9/Metal_Wall.png/90px-Metal_Wall.png',
		level: 30,
		points: 15,
		requires: ['Каменная стена']
	},
	'Наклоненная влево металлическая стена': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/37/Sloped_Metal_Wall_Left.png/90px-Sloped_Metal_Wall_Left.png',
		level: 30,
		points: 7,
		requires: ['Наклоненная влево каменная стена', 'Металлическая стена']
	},
	'Наклоненная вправо металлическая стена': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/29/Sloped_Metal_Wall_Right.png/90px-Sloped_Metal_Wall_Right.png',
		level: 30,
		points: 7,
		requires: ['Наклоненная вправо каменная стена', 'Металлическая стена']
	},
	'Металлический дверной проем': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/db/Metal_Doorframe.png/90px-Metal_Doorframe.png',
		level: 30,
		points: 24,
		requires: ['Каменный дверной проем', 'Металлическая стена']
	},
	'Седло на Диплодока': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/06/Diplodocus_Saddle.png/90px-Diplodocus_Saddle.png',
		level: 35,
		points: 30,
		requires: []
	},
	'Меч': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f9/Metal_Sword.png/90px-Metal_Sword.png',
		level: 30,
		points: 11,
		requires: ['Дубинка']
	},
	'Металлический щит': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/7e/Metal_Shield.png/90px-Metal_Shield.png',
		level: 30,
		points: 9,
		requires: ['Деревянный щит']
	},
	'Каменный камин': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c2/Stone_Fireplace.png/90px-Stone_Fireplace.png',
		level: 30,
		points: 15,
		requires: ['Костёр', 'Каменная стена']
	},
	'Деревянная платформа для дерева': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/1c/Wooden_Tree_Platform.png/90px-Wooden_Tree_Platform.png',
		level: 30,
		points: 15,
		requires: ['Деревянный фундамент', 'Деревянное перекрытие', 'Деревянная стена']
	},
	'Хитиновые перчатки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b9/Chitin_Gauntlets.png/90px-Chitin_Gauntlets.png',
		level: 35,
		points: 15,
		requires: ['Кожаные перчатки']
	},
	'Хитиновые ботинки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/0d/Chitin_Boots.png/90px-Chitin_Boots.png',
		level: 35,
		points: 15,
		requires: ['Кожаные ботинки']
	},
	'Длинная винтовка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a2/Longneck_Rifle.png/90px-Longneck_Rifle.png',
		level: 35,
		points: 18,
		requires: ['Сигнальный пистолет']
	},
	'Пуля простой винтовки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a0/Simple_Rifle_Ammo.png/90px-Simple_Rifle_Ammo.png',
		level: 35,
		points: 6,
		requires: ['Порох']
	},
	'Большая грядка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ad/Large_Crop_Plot.png/90px-Large_Crop_Plot.png',
		level: 35,
		points: 15,
		requires: ['Средняя грядка']
	},
	'Седло на Птеранодона': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/92/Pteranodon_Saddle.png/90px-Pteranodon_Saddle.png',
		level: 35,
		points: 15,
		requires: []
	},
	'Седло на Саркозуха': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a6/Sarco_Saddle.png/90px-Sarco_Saddle.png',
		level: 35,
		points: 15,
		requires: []
	},
	'Дробовик': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/61/Shotgun.png/90px-Shotgun.png',
		level: 35,
		points: 18,
		requires: ['Сигнальный пистолет']
	},
	'Патрон для дробовика': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/18/Simple_Shotgun_Ammo.png/90px-Simple_Shotgun_Ammo.png',
		level: 35,
		points: 6,
		requires: ['Простая пуля']
	},
	'Металлическая колонна': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d8/Metal_Pillar.png/90px-Metal_Pillar.png',
		level: 35,
		points: 18,
		requires: ['Каменная колонна', 'Металлический фундамент']
	},
	'Металлическое перекрытие': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ac/Metal_Ceiling.png/90px-Metal_Ceiling.png',
		level: 35,
		points: 15,
		requires: ['Каменное перекрытие']
	},
	'Наклоненная металлическая крыша': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/3f/Sloped_Metal_Roof.png/90px-Sloped_Metal_Roof.png',
		level: 35,
		points: 10,
		requires: ['Наклоненная каменная крыша', 'Металлический потолок']
	},
	'Металлическая дверь': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cd/Metal_Door.png/90px-Metal_Door.png',
		level: 35,
		points: 12,
		requires: ['креплённая деревянная дверь', 'Металлический дверной проем']
	},
	'Металлические перила': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/85/Metal_Railing.png/90px-Metal_Railing.png',
		level: 30,
		points: 7,
		requires: ['Каменные перила', 'Металлическая стена']
	},
	'Металлическая рампа': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/eb/Metal_Ramp.png/90px-Metal_Ramp.png',
		level: 35,
		points: 12,
		requires: ['Деревянная рампа', 'Металлический потолок']
	},
	'Чудо-удобрение': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/17/Re-Fertilizer.png/120px-Re-Fertilizer.png',
		level: 35,
		points: 20,
		requires: []
	},
	'Пушка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/93/Primitive_Cannon.png/90px-Primitive_Cannon.png',
		level: 35,
		points: 25,
		requires: ['Катапульта']
	},
	'Пушечное ядро': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/93/Primitive_Cannon.png/90px-Primitive_Cannon.png',
		level: 35,
		points: 5,
		requires: ['Простая пуля']
	},	
	'Гилли нагрудник': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8b/Ghillie_Chestpiece.png/90px-Ghillie_Chestpiece.png',
		level: 35,
		points: 11,
		requires: ['Кожаная рубашка']
	},
	'Гилли штаны': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/1a/Ghillie_Leggings.png/90px-Ghillie_Leggings.png',
		level: 35,
		points: 11,
		requires: ['Кожаные штаны']
	},
	'Гилли маска': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f2/Ghillie_Mask.png/90px-Ghillie_Mask.png',
		level: 35,
		points: 13,
		requires: ['Кожаная шапка']
	},
	'Седло на Манту': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/1b/Manta_Saddle.png/90px-Manta_Saddle.png',
		level: 25,
		points: 16,
		requires: ['Кожаная шапка']
	},
	'Кран для древесного сока': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f3/Tree_Sap_Tap.png/90px-Tree_Sap_Tap.png',
		level: 35,
		points: 18,
		requires: ['Кожаная шапка']
	},	
	'Пивная бочка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/bd/Beer_Barrel.png/90px-Beer_Barrel.png',
		level: 35,
		points: 24,
		requires: []
	},
	'Отравляющая граната': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/05/Poison_Grenade.png/90px-Poison_Grenade.png',
		level: 40,
		points: 18,
		requires: ['Дымовая граната', 'Отравляющая ловушка', 'Станок']
	},
	'Станок': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/66/Fabricator.png/90px-Fabricator.png',
		level: 40,
		points: 24,
		requires: ['Верстак']
	},
	'Глушитель': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/43/Silencer.png/90px-Silencer.png',
		level: 40,
		points: 13,
		requires: []
	},
	'Седло на Анкилозавра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/57/Ankylo_Saddle.png/90px-Ankylo_Saddle.png',
		level: 40,
		points: 18,
		requires: []
	},
	'Седло на Мамонта': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/19/Mammoth_Saddle.png/90px-Mammoth_Saddle.png',
		level: 40,
		points: 18,
		requires: []
	},
	'Седло на Аранео': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8b/Araneo_Saddle.png/90px-Araneo_Saddle.png',
		level: 40,
		points: 18,
		requires: []
	},
	'Седло на Дунклеостея': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/04/Dunkleosteus_Saddle.png/90px-Dunkleosteus_Saddle.png',
		level: 40,
		points: 20,
		requires: []
	},	
	'Металлическая труба - Водозабор': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d1/Metal_Irrigation_Pipe_-_Tap%28Intake%29.png/90px-Metal_Irrigation_Pipe_-_Tap%28Intake%29.png',
		level: 40,
		points: 15,
		requires: ['Каменная труба - Водозабор']
	},
	'Металлическая труба - Прямая': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f0/Metal_Irrigation_Pipe_-_Straight.png/90px-Metal_Irrigation_Pipe_-_Straight.png',
		level: 40,
		points: 12,
		requires: ['Каменная труба - Прямая', 'Металлическая труба - Водозабор']
	},
	'Металлическая рама люка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e6/Metal_Hatchframe.png/90px-Metal_Hatchframe.png',
		level: 40,
		points: 18,
		requires: ['Каменная рама люка', 'Металлический потолок']
	},
	'Металлический люк': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e9/Metal_Trapdoor.png/90px-Metal_Trapdoor.png',
		level: 40,
		points: 14,
		requires: ['Укреплённый люк', 'Металлическая рама люка']
	},
	'Металлическое основание для забора': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/3d/Metal_Fence_Foundation.png/90px-Metal_Fence_Foundation.png',
		level: 40,
		points: 12,
		requires: ['Каменное основание для забора', 'Металлический фундамент']
	},
	'Металлический проем для динозавров': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/47/Metal_Dinosaur_Gateway.png/90px-Metal_Dinosaur_Gateway.png',
		level: 40,
		points: 12,
		requires: ['Большая рама', 'Металлический дверной проем']
	},
	'Металлическая рама': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/26/Metal_Dinosaur_Gate.png/90px-Metal_Dinosaur_Gate.png',
		level: 40,
		points: 8,
		requires: ['Укрепленные ворота', 'Металлический проем для динозавров']
	},
	'Полимер': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/81/Polymer.png/90px-Polymer.png',
		level: 40,
		points: 6,
		requires: []
	},
	'Электроника': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/dd/Electronics.png/90px-Electronics.png',
		level: 40,
		points: 6,
		requires: []
	},
	'Гилли перчатки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/bf/Ghillie_Gauntlets.png/90px-Ghillie_Gauntlets.png',
		level: 40,
		points: 11,
		requires: ['Кожаные перчатки']
	},
	'Гилли ботинки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9b/Ghillie_Boots.png/90px-Ghillie_Boots.png',
		level: 40,
		points: 11,
		requires: ['Кожаные ботинки']
	},
	'Металлические штаны': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/07/Flak_Leggings.png/90px-Flak_Leggings.png',
		level: 45,
		points: 15,
		requires: ['Хитиновые штаны']
	},
	'Металлический нагрудник': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/bf/Flak_Chestpiece.png/90px-Flak_Chestpiece.png',
		level: 45,
		points: 18,
		requires: ['Хитиновый нагрудник']
	},
	'Самодельное взрывное устройство': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/15/Improvised_Explosive_Device.png/90px-Improvised_Explosive_Device.png',
		level: 45,
		points: 30,
		requires: ['Граната']
	},
	'Металлическая труба - Пересечение': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/77/Metal_Irrigation_Pipe_-_Intersection.png/90px-Metal_Irrigation_Pipe_-_Intersection.png',
		level: 45,
		points: 18,
		requires: ['Каменная труба - Пересечение', 'Металлическая труба - Прямая']
	},
	'Металлическая труба - Наклоненная': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/19/Metal_Irrigation_Pipe_-_Inclined.png/90px-Metal_Irrigation_Pipe_-_Inclined.png',
		level: 45,
		points: 12,
		requires: ['Каменная труба - Наклоненная', 'Металлическая труба - Прямая']
	},
	'Металлическая труба - Вертикальная': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d9/Metal_Irrigation_Pipe_-_Vertical.png/90px-Metal_Irrigation_Pipe_-_Vertical.png',
		level: 45,
		points: 12,
		requires: ['Каменная труба - Вертикальная', 'Металлическая труба - Прямая']
	},
	'Металлическая труба - Кран': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e4/Metal_Irrigation_Pipe_-_Tap.png/90px-Metal_Irrigation_Pipe_-_Tap.png',
		level: 45,
		points: 18,
		requires: ['Каменная труба - Кран', 'Металлическая труба - Прямая']
	},
	'Металлический резервуар для воды': {
	    image: '',
		level: 45,
		points: 20,
		requires: ['Резервуар для воды']
	},
	'Седло на Мегалодона': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/80/Megalodon_Saddle.png/90px-Megalodon_Saddle.png',
		level: 45,
		points: 18,
		requires: []
	},
	'Седло на Саблезуба': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/33/Sabertooth_Saddle.png/90px-Sabertooth_Saddle.png',
		level: 45,
		points: 18,
		requires: []
	},
	'Седло-платформа на Парацератерия': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/0f/Paracer_Platform_Saddle.png/90px-Paracer_Platform_Saddle.png',
		level: 45,
		points: 24,
		requires: ['Paracer Saddle']
	},
	'Седло на Шерстистого носорога': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/95/Woolly_Rhino_Saddle.png/90px-Woolly_Rhino_Saddle.png',
		level: 45,
		points: 24,
		requires: []
	},	
	'Промышленный гриль': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/90/Industrial_Grill.png/90px-Industrial_Grill.png',
		level: 45,
		points: 40,
		requires: ['Костёр', 'Станок']
	},
	'Металлическая оконная рама': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/68/Metal_Windowframe.png/90px-Metal_Windowframe.png',
		level: 45,
		points: 18,
		requires: ['Каменная оконная рама', 'Металлическая стена']
	},
	'Металлическая лестница': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/5e/Metal_Ladder.png/90px-Metal_Ladder.png',
		level: 45,
		points: 21,
		requires: ['Деревянная лестница']
	},
	'Подствольный фонарик': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4d/Flashlight.png/90px-Flashlight.png',
		level: 45,
		points: 18,
		requires: []
	},
	'GPS': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/72/GPS.png/90px-GPS.png',
		level: 45,
		points: 21,
		requires: ['Компас']
	},
	'Металлический болас': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/25/Chain_Bola.png/90px-Chain_Bola.png',
		level: 45,
		points: 30,
		requires: ['Болас']
	},	
	'Тепличная стена': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/3c/Greenhouse_Wall.png/90px-Greenhouse_Wall.png',
		level: 45,
		points: 30,
		requires: ['Каменная стена']
	},
	'Тепличное перекрытие': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/bf/Greenhouse_Ceiling.png/90px-Greenhouse_Ceiling.png',
		level: 45,
		points: 30,
		requires: ['Каменное перекрытие']
	},	
	'Тепличный дверной проем': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b0/Greenhouse_Doorframe.png/90px-Greenhouse_Doorframe.png',
		level: 45,
		points: 15,
		requires: ['Каменный дверной проем']
	},	
	'Тепличная дверь': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/03/Greenhouse_Door.png/90px-Greenhouse_Door.png',
		level: 45,
		points: 15,
		requires: ['Укреплённая дверь']
	},	
	'Окно': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/35/Greenhouse_Window.png/90px-Greenhouse_Window.png',
		level: 45,
		points: 15,
		requires: ['Укрепленное окно']
	},
	'Металлические ботинки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/77/Flak_Boots.png/90px-Flak_Boots.png',
		level: 50,
		points: 16,
		requires: ['Хитиновые ботинки']
	},
	'Металлические перчатки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f2/Flak_Gauntlets.png/90px-Flak_Gauntlets.png',
		level: 50,
		points: 16,
		requires: ['Хитиновые перчатки']
	},
	'Металлический шлем': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/ec/Flak_Helmet.png/90px-Flak_Helmet.png',
		level: 50,
		points: 20,
		requires: ['Хитиновый шлем']
	},
	'Металлический билборд': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/25/Metal_Billboard.png/90px-Metal_Billboard.png',
		level: 50,
		points: 15,
		requires: ['Деревянный билборд', 'Металлический указатель']
	},
	'Металлическое окно': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/11/Metal_Window.png/90px-Metal_Window.png',
		level: 50,
		points: 18,
		requires: ['Укрепленное окно', 'Металлическая оконная рама']
	},
	'Металлический мостик': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/08/Metal_Catwalk.png/90px-Metal_Catwalk.png',
		level: 50,
		points: 18,
		requires: ['Деревянный мостик', 'Металлический потолок']
	},
	'Седло на Карнотавра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a9/Carno_Saddle.png/90px-Carno_Saddle.png',
		level: 50,
		points: 21,
		requires: []
	},
	'Фляга': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/5e/Canteen.png/90px-Canteen.png',
		level: 50,
		points: 24,
		requires: ['Бутылка для воды', 'Станок']
	},
	'Электрический генератор': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/92/Electrical_Generator.png/90px-Electrical_Generator.png',
		level: 50,
		points: 24,
		requires: []
	},
	'Крюк-кошка':{
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/3d/Grappling_Hook.png/90px-Grappling_Hook.png',
        level: 50,
        points: 40,
        requires: ['Каменная стрела', 'Арбалет']
	},
	'Прямой электрический кабель': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/1d/Straight_Electrical_Cable.png/90px-Straight_Electrical_Cable.png',
		level: 50,
		points: 16,
		requires: ['Электрический генератор']
	},	
	'Электрическая розетка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f3/Electrical_Outlet.png/90px-Electrical_Outlet.png',
		level: 50,
		points: 16,
		requires: ['Прямой электрический кабель']
	},
	'Улучшенный пистолет': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2e/Fabricated_Pistol.png/90px-Fabricated_Pistol.png',
		level: 50,
		points: 18,
		requires: ['Простой пистолет']
	},
	'Улучшенная пуля': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/3e/Advanced_Bullet.png/90px-Advanced_Bullet.png',
		level: 50,
		points: 8,
		requires: ['Простая пуля']
	},
	'Помповое ружье': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a9/Pump-Action_Shotgun.png/90px-Pump-Action_Shotgun.png',
		level: 50,
		points: 18,
		requires: ['Дробовик']
	},
	'Пульт удаленного управления': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9b/Remote_Keypad.png/90px-Remote_Keypad.png',
		level: 50,
		points: 18,
		requires: ['Электроника']
	},
	'Сфокусированный фонарный столб': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b1/Lamppost.png/90px-Lamppost.png',
		level: 50,
		points: 20,
		requires: ['Стоячий факел']
	},
	'Карта войны': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/7a/War_Map.png/90px-War_Map.png',
		level: 50,
		points: 15,
		requires: []
	},
	'Седло на Артроплевру': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/5b/Arthropluera_Saddle.png/90px-Arthropluera_Saddle.png',
		level: 50,
		points: 30,
		requires: []
	},	
	'Фонарный столб': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/31/Omnidirectional_Lamppost.png/90px-Omnidirectional_Lamppost.png',
		level: 50,
		points: 20,
		requires: ['Стоячий факел']
	},	
	'Седло на Прокоптодона': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ae/Procoptodon_Saddle.png/90px-Procoptodon_Saddle.png',
		level: 50,
		points: 35,
		requires: []
	},
	'Наклоненная тепличная крыша': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f4/Sloped_Greenhouse_Roof.png/90px-Sloped_Greenhouse_Roof.png',
		level: 50,
		points: 30,
		requires: ['Наклоненная каменная крыша']
	},
	'Наклоненная влево тепличная стена': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/95/Sloped_Greenhouse_Wall_Left.png/90px-Sloped_Greenhouse_Wall_Left.png',
		level: 50,
		points: 15,
		requires: ['Наклоненная влево каменная стена']
	},
	'Наклоненная вправо тепличная стена': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/12/Sloped_Greenhouse_Wall_Right.png/90px-Sloped_Greenhouse_Wall_Right.png',
		level: 50,
		points: 15,
		requires: ['Наклоненная вправо каменная стена']
	},
	'Седло на Галлимима': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/50/Gallimimus_Saddle.png/90px-Gallimimus_Saddle.png',
		level: 50,
		points: 20,
		requires: []
	},
	'Наклоненный электрический кабель': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c3/Inclined_Electrical_Cable.png/90px-Inclined_Electrical_Cable.png',
		level: 55,
		points: 16,
		requires: ['Прямой электрический кабель']
	},
	'Вертикальный электрический кабель': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d5/Vertical_Electrical_Cable.png/90px-Vertical_Electrical_Cable.png',
		level: 55,
		points: 16,
		requires: ['Прямой электрический кабель']
	},
	'Пересечение электрических кабелей': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d0/Electrical_Cable_Intersection.png/90px-Electrical_Cable_Intersection.png',
		level: 55,
		points: 24,
		requires: ['Прямой электрический кабель']
	},
	'Седло на Аргентависа': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/04/Argentavis_Saddle.png/90px-Argentavis_Saddle.png',
		level: 55,
		points: 21,
		requires: []
	},
	'Седло на Бронтозавра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a2/Bronto_Saddle.png/90px-Bronto_Saddle.png',
		level: 55,
		points: 21,
		requires: []
	},
	'Холодильник': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d8/Refrigerator.png/90px-Refrigerator.png',
		level: 55,
		points: 20,
		requires: ['Большой ящик для хранения']
	},
	'Кондиционер': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/25/Air_Conditioner.png/90px-Air_Conditioner.png',
		level: 55,
		points: 21,
		requires: ['Холодильник']
	},
	'Детонатор С4': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/85/C4_Remote_Detonator.png/90px-C4_Remote_Detonator.png',
		level: 55,
		points: 24,
		requires: ['Электроника']
	},
	'Заряд С4': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/46/C4_Charge.png/90px-C4_Charge.png',
		level: 55,
		points: 12,
		requires: ['Самодельное взрывное устройство']
	},
	'Штурмовая винтовка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e0/Assault_Rifle.png/90px-Assault_Rifle.png',
		level: 55,
		points: 24,
		requires: ['Длинная винтовка']
	},
	'Улучшенная пуля для винтовки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/64/Advanced_Rifle_Bullet.png/90px-Advanced_Rifle_Bullet.png',
		level: 55,
		points: 8,
		requires: ['Пуля простой винтовки']
	},
	'Лазерный прицел': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a1/Laser.png/90px-Laser.png',
		level: 55,
		points: 24,
		requires: ['Подствольный фонарь']
	},
	'Седло на Кастороидеса': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/14/Castoroides_Saddle.png/90px-Castoroides_Saddle.png',
		level: 55,
		points: 50,
		requires: ['Верстак']
	},	
	'Коллиматорный прицел': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/45/Holo-Scope.png/90px-Holo-Scope.png',
		level: 55,
		points: 24,
		requires: ['Снайперский прицел']
	},
	'Огромная металлическая рама': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/49/Behemoth_Gateway.png/90px-Behemoth_Gateway.png',
		level: 55,
		points: 28,
		requires: ['Металлическая рама']
	},
	'Огромные металлические ворота': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/62/Behemoth_Gate.png/90px-Behemoth_Gate.png',
		level: 55,
		points: 15,
		requires: ['Металлические ворота', 'Огромная металлическая рама']
	},
	'Седло на Тираннозавра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/89/Rex_Saddle.png/90px-Rex_Saddle.png',
		level: 60,
		points: 40,
		requires: []
	},
	'Седло на Спинозавра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/97/Spino_Saddle.png/90px-Spino_Saddle.png',
		level: 60,
		points: 40,
		requires: []
	},
	'Седло на Плезиозавра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8e/Plesiosaur_Saddle.png/90px-Plesiosaur_Saddle.png',
		level: 60,
		points: 40,
		requires: []
	},
	'Краскораспылитель': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/38/Spray_Painter.png/90px-Spray_Painter.png',
		level: 60,
		points: 30,
		requires: ['Кисточка', 'Металлический резервуар для воды', 'Станок']
	},
	'Ракетница': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/05/Rocket_Launcher.png/90px-Rocket_Launcher.png',
		level: 60,
		points: 32,
		requires: ['Длинная винтовка']
	},
	'Заряд для Ракетницы': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9e/Rocket_Propelled_Grenade.png/90px-Rocket_Propelled_Grenade.png',
		level: 60,
		points: 8,
		requires: ['Граната']
	},
	'Турель': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f9/Auto_Turret.png/90px-Auto_Turret.png',
		level: 60,
		points: 40,
		requires: ['Штурмовая винтовка']
	},
	'Седло на Кетцалькоатля': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e8/Quetz_Saddle.png/90px-Quetz_Saddle.png',
		level: 60,
		points: 44,
		requires: []
	},
	'Двухъярусная кровать': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/34/Bunk_Bed.png/90px-Bunk_Bed.png',
		level: 60,
		points: 28,
		requires: ['Простая кровать']
	},
	'Металлическая платформа для дерева': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cc/Metal_Tree_Platform.png/90px-Metal_Tree_Platform.png',
		level: 60,
		points: 55,
		requires: ['Деревянная платформа для дерева']
	},	
	'Тяжелый шлем шахтера' : {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9a/Heavy_Miner%27s_Helmet.png/90px-Heavy_Miner%27s_Helmet.png',
		level: 65,
		points: 35,
		requires: ['Металлический шлем']
	},
	'Радиолокатор': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/66/Transponder_Tracker.png/90px-Transponder_Tracker.png',
		level: 65,
		points: 30,
		requires: ['GPS']
	},
	'Радио-маячок': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/59/Transponder_Node.png/90px-Transponder_Node.png',
		level: 65,
		points: 20,
		requires: ['GPS']
	},
	'Сейф': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c9/Vault.png/90px-Vault.png',
		level: 65,
		points: 30,
		requires: ['Шкаф']
	},
	'Направляющая подъемника': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/61/Elevator_Track.png/90px-Elevator_Track.png',
		level: 65,
		points: 40,
		requires: []
	},
	'Маленькая платформа подъемника': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f3/Small_Elevator_Platform.png/90px-Small_Elevator_Platform.png',
		level: 65,
		points: 40,
		requires: []
	},
	'Средняя платформа подъемника': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/80/Medium_Elevator_Platform.png/90px-Medium_Elevator_Platform.png',
		level: 65,
		points: 40,
		requires: []
	},
	'Большая платформа подъемника': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/18/Large_Elevator_Platform.png/90px-Large_Elevator_Platform.png',
		level: 65,
		points: 40,
		requires: []
	},
	'Транквилизирующий дротик': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/56/Tranquilizer_Dart.png/90px-Tranquilizer_Dart.png',
		level: 65,
		points: 30,
		requires: ['Каменная стрела', 'Наркотик', 'Простой патрон для винтовки']
	},
	'Композитный лук': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9e/Compound_Bow.png/90px-Compound_Bow.png',
		level: 70,
		points: 40,
		requires: ['Лук', 'Станок']
	},
	'Металлическая стрела': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/12/Metal_Arrow.png/90px-Metal_Arrow.png',
		level: 70,
		points: 35,
		requires: ['Композитный лук']
	},
	'Седло-платформа на Бронтозавра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/94/Bronto_Platform_Saddle.png/90px-Bronto_Platform_Saddle.png',
		level: 70,
		points: 35,
		requires: ['Седло на Бронтозавра']
	},
	'Снайперская винтовка': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9e/Fabricated_Sniper_Rifle.png/90px-Fabricated_Sniper_Rifle.png',
		level: 70,
		points: 36,
		requires: ['Длинная винтовка']
	},
	'Улучшенная пуля для снайперской винтовки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/6c/Advanced_Sniper_Bullet.png/90px-Advanced_Sniper_Bullet.png',
		level: 70,
		points: 16,
		requires: ['Улучшенная пуля для винтовки']
	},
	'Кислородный баллон': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2d/SCUBA_Top.png/90px-SCUBA_Top.png',
		level: 75,
		points: 35,
		requires: ['Кожаная рубашка', 'Металлический резервуар для воды', 'Станок']
	},
	'Маска для плавания': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/51/SCUBA_Mask.png/90px-SCUBA_Mask.png',
		level: 75,
		points: 25,
		requires: ['Кожаная шапка', 'Снайперский прицел', 'Станок']
	},
	'Ласты': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/42/SCUBA_Flippers.png/90px-SCUBA_Flippers.png',
		level: 75,
		points: 20,
		requires: ['Кожаные ботинки', 'Станок']
	},
	'Штаны для плавания': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/7e/SCUBA_Leggings.png/90px-SCUBA_Leggings.png',
		level: 75,
		points: 35,
		requires: ['Кожаные штаны', 'Станок']
	},
	'Штурмовой щит': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/07/Riot_Shield.png/90px-Riot_Shield.png',
		level: 75,
		points: 45,
		requires: ['Металлический щит']
	},
	'Самонаводная подводная мина': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/03/Homing_Underwater_Mine.png/90px-Homing_Underwater_Mine.png',
		level: 75,
		points: 30,
		requires: ['Самодельное взрывное устройство', 'Металлический резервуар для воды']
	},
	'Промышленная печь': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/91/Industrial_Cooker.png/90px-Industrial_Cooker.png',
		level: 80,
		points: 60,
		requires: ['Котелок']
	},
	'Седло-платформа на Плезиозавра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e5/Plesiosaur_Platform_Saddle.png/90px-Plesiosaur_Platform_Saddle.png',
		level: 80,
		points: 50,
		requires: ['Седло на Плезиозавра']
	},
	'Седло-платформа на Кетцалькоатля': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/bc/Quetz_Platform_Saddle.png/90px-Quetz_Platform_Saddle.png',
		level: 80,
		points: 80,
		requires: []
	},
	'Седло на Мозазавра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/bf/Mosasaurus_Saddle.png/90px-Mosasaurus_Saddle.png',
		level: 80,
		points: 60,
		requires: []
	},
	'Штурмовой шлем': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/3a/Riot_Helmet.png/90px-Riot_Helmet.png',
		level: 80,
		points: 40,
		requires: ['Гилли маска']
	},
	'Штурмовой нагрудник': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/5a/Riot_Chestpiece.png/90px-Riot_Chestpiece.png',
		level: 80,
		points: 40,
		requires: ['Гилли нагрудник']
	},
	'Штурмовые перчатки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d1/Riot_Gauntlets.png/90px-Riot_Gauntlets.png',
		level: 80,
		points: 40,
		requires: ['Гилли перчатки']
	},
	'Штурмовые штаны': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ab/Riot_Leggings.png/90px-Riot_Leggings.png',
		level: 80,
		points: 40,
		requires: ['Гилли штаны']
	},
	'Штурмовые ботинки': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/5a/Riot_Boots.png/90px-Riot_Boots.png',
		level: 80,
		points: 40,
		requires: ['Гилли ботинки']
	},
	'Электрошокер': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/48/Electric_Prod.png/90px-Electric_Prod.png',
		level: 80,
		points: 60,
		requires: []
	},
	'Седло-платформа на Мозазавра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/03/Mosasaurus_Platform_Saddle.png/90px-Mosasaurus_Platform_Saddle.png',
		level: 85,
		points: 80,
		requires: ['Седло на Мозазавра']
	},
	'Седло на Гигантозавра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e2/Giganotosaurus_Saddle.png/90px-Giganotosaurus_Saddle.png',
		level: 85,
		points: 75,
		requires: []
	},
	'Химический стол': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9d/Chemistry_Bench.png/90px-Chemistry_Bench.png',
		level: 85,
		points: 65,
		requires: ['Пивная бочка', 'Станок', 'Ступка и пестик']
	},	
	'Абсорбент': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a8/Absorbent_Substrate.png/90px-Absorbent_Substrate.png',
		level: 85,
		points: 60,
		requires: ['Химический стол']
	},
	'Противогаз': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2e/Gas_Mask.png/90px-Gas_Mask.png',
		level: 85,
		points: 110,
		requires: ['Маска для плавания', 'Кислородный балон', 'Абсорбент']
	},
	'Миниган турель': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b6/Minigun_Turret.png/90px-Minigun_Turret.png',
		level: 85,
		points: 80,
		requires: ['Катапульта', 'Турель']
	},	
	'Промышленная плавильня': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c5/Industrial_Forge.png/90px-Industrial_Forge.png',
		level: 85,
		points: 90,
		requires: ['Плавильная печь', 'Станок']
	},
	'Ракетная турель': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/56/Rocket_Turret.png/90px-Rocket_Turret.png',
		level: 90,
		points: 100,
		requires: ['Миниган турель', 'Ракетница']
	},
	'Седло-платформа на Титанозавра': {
	    image: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/72/Titanosaur_Platform_Saddle.png/90px-Titanosaur_Platform_Saddle.png',
		level: 95,
		points: 170,
		requires: []
	},
}