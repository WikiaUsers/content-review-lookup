switch ( mw.config.get('wgPageName') ) {
    case 'Удобрения':
    case 'Шаблон:Nutrients':
    	
var holemode = 9;
var plants = [];
var soil = [];

function Soil(holemode) {
	this.soil = [];
	this.soil.length = holemode;
	this.holemode = holemode;
	
	this.getAllStats = function(){
		var stats = {
		    'growth' : 0,
		    'compost' : 0,
		    'manure' : 0
		};
		
		for (var i = 0; i < this.soil.length; i++){
			if (this.soil[i]) {
				stats.growth = stats.growth + this.soil[i].growth;
				stats.compost = stats.compost + this.soil[i].compost;
				stats.manure = stats.manure + this.soil[i].manure;
			}
		}
		stats.growth = stats.growth * 4;
		stats.compost = stats.compost * 4;
		stats.manure = stats.manure * 4;
		
		return stats;
	};
	
	this.add = function(plant){
		for (var i = 0; i < this.soil.length; i++){
			if (!this.soil[i]) {
				this.soil[i] = plants[plant];
				var imageUrl = $('#' + plant + '_planted').attr('data-src');
				$('#soil_' + this.holemode + '_' + i).css({
					"background": "url(" + imageUrl + ") 100% 100% no-repeat",
					"background-size": "contain",
					"padding-top": "5em"
			    });
				break;
			}
		}
	};
	
	this.remove = function(element){
		$(element).css({
			"background-image": "",
			"padding-top": ""
		});
		delete this.soil[$(element).attr('position')];
	};
	
	this.removeAll = function(){
		$('#soil_' + this.holemode + ' > p > span').css({
			"background-image": "",
			"padding-top": ""
        });
		this.soil = [];
		this.soil.length = this.holemode;
	};
}

soil[4] = new Soil(4);
soil[9] = new Soil(9);
soil[16] = new Soil(16);

function AddPlantValues(name, growth, compost, manure){
	plants[name] = {
	'growth' : growth,
	'compost' : compost,
	'manure' : manure,
	};
}

AddPlantValues('carrot',-4,2,2);
AddPlantValues('corn',2,-4,2);
AddPlantValues('potato',2,2,-4);
AddPlantValues('tomato',-2,-2,4);
AddPlantValues('asparagus',2,-4,2);
AddPlantValues('eggplant',2,2,-4);
AddPlantValues('pumpkin',-4,2,2);
AddPlantValues('watermelon',4,-2,-2);
AddPlantValues('dragonfruit',4,4,-8);
AddPlantValues('durian',4,-8,4);
AddPlantValues('garlic',4,-8,4);
AddPlantValues('onion',-8,4,4);
AddPlantValues('pepper',4,4,-8);
AddPlantValues('pomegranate',-8,4,4);
AddPlantValues('tillweed',-2,-2,-2);
AddPlantValues('forgetmelots',-2,-2,-2);
AddPlantValues('firenettle',-2,-2,-2);
AddPlantValues('ivy',-2,-2,-2);

$(function() {

	$("#holemode").click(function() {
		if (($("#soil_9").css("display")) !== "none") {
			$("#soil_4, #soil_9").css({
				"display": "none"
			});
			$("#soil_16").css({
				"display": ""
			});
			holemode = 16;
		} else if (($("#soil_16").css("display")) !== "none") {
			$("#soil_9, #soil_16").css({
				"display": "none"
			});
			$("#soil_4").css({
				"display": ""
			});
			holemode = 4;
		} else {
			$("#soil_4, #soil_16").css({
				"display": "none"
			});
			$("#soil_9").css({
				"display": ""
			});
			holemode = 9;
		}
		changeNutrientQuantity(1);
	});
	
	$('#digmode').attr('onclick', 'removePlantAll()');
	
	$('#planted > p > a').each(function() {
		var id = $(this).attr('title');
		$(this).children('img').attr('id', (id + '_planted'));
	});
	
	$('#plant > p > img').each(function() {
		var title = $(this).attr('title');
		$(this).attr('id', title);
		$(this).attr('onclick', 'addPlant("' + title + '")');
	});

	var x = 0;
	$('#soil_4 > p > span').each(function() {
		$(this).attr('id', ('soil_4_' + x));
		$(this).attr('position', x);
		$(this).on('click', function(){
		   soil[holemode].remove(this);	
		   changeNutrientQuantity();
		});
		x = x + 1;
		return x;
	});

	x = 0;
	$('#soil_9 > p > span').each(function() {
		$(this).attr('id', ('soil_9_' + x));
		$(this).attr('position', x);
		$(this).on('click', function(){
		   soil[holemode].remove(this);	
		   changeNutrientQuantity();
		});
		x = x + 1;
		return x;
	});

	x = 0;
	$('#soil_16 > p > span').each(function() {
		$(this).attr('id', ('soil_16_' + x));
		$(this).attr('position', x);
		$(this).on('click', function(){
		   soil[holemode].remove(this);	
		   changeNutrientQuantity();
		});
		x = x + 1;
		return x;
	});
});

window.changeNutrientQuantity = function() {
	    var stats = soil[holemode].getAllStats()
	    if (stats.growth < 0 || stats.compost < 0 || stats.manure < 0) {
	    	var cw = Math.max(Math.ceil(stats.growth / -24), Math.ceil(stats.compost / -32),  Math.ceil(stats.manure / -24));
	    	var gf = Math.max(Math.ceil(stats.growth / -8), Math.ceil(stats.compost / -8),  Math.ceil(stats.manure / -8));
	    	var tg = Math.max(Math.ceil(stats.growth / -8), Math.ceil(stats.compost / -32),  Math.ceil(stats.manure / -8));
	    	$('#cw').text('' + cw + '')
			$('#gf').text('' + gf + '');
		  	$('#tg').text('' + tg + '');
		  	$('.secondnut').css({
				'display': ''
			});
	    } else {
	    	$('.secondnut').css({
				'display': 'none'
			});
	    }
	    if (stats.growth < 0) { 
			$('#gr1').text('' + Math.ceil(stats.growth / -8) + '')
			$('#gr2').text('' + Math.ceil(stats.growth / -16) + '');
			$('#gr3').text('' + Math.ceil(stats.growth / -32) / 5 + '');
			$('#growth').css({
				'display': ''
			});
			$('#growthnone').css({
				'display': 'none'
			});
		} else {
			$('#growth').css({
				'display': 'none'
			});
			$('#growthnone').css({
				'display': ''
			});
		}
		if (stats.compost < 0) {
			$('#cm1').text('' + Math.ceil(stats.compost / -8) + '');
			$('#cm2').text('' + Math.ceil(stats.compost / -16) + '');
			$('#cm3').text('' + Math.ceil(stats.compost / -24) + '');
			$('#compost').css({
				'display': ''
			});
			$('#compostnone').css({
				'display': 'none'
			});
		} else {
			$('#compost').css({
				'display': 'none'
			});
			$('#compostnone').css({
				'display': ''
			});
		}
		if (stats.manure < 0) {
			$('#man1').text('' + Math.ceil(stats.manure / -8) + '');
			$('#man2').text('' + Math.ceil(stats.manure / -16) + '');
			$('#man3').text('' + Math.ceil(stats.manure / -16) / 10 + '');
			$('#manure').css({
				'display': ''
			});
			$('#manurenone').css({
				'display': 'none'
			});
		} else {
			$('#manure').css({
				'display': 'none'
			});
			$('#manurenone').css({
				'display': ''
			});
		}
};

window.addPlant = function(plant) {
	soil[holemode].add(plant);
	changeNutrientQuantity();
}

window.removePlantAll = function() {
	soil[holemode].removeAll()
	changeNutrientQuantity();
};

break;
}