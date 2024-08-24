$(function() {
	var vault = $('#vault-level');
	if (!vault)
		return;
var capacity = {
	gold:"3000,6000,10000,14000,18000,24000,34000,45000,70000,90000,120000,140000,190000,240000,320000,420000,500000,600000,700000,800000",
	wood:"2000,4000,6000,9000,12000,15000,18000,23000,30000,39000,48000,60000,80000,110000,160000,220000,300.000,360000,410000,450000",
	stone:"0,0,0,0,0,3000,6000,10000,13000,18000,26000,38000,60000,90000,130000,200000,250000,340000,400.000,450000",
	iron:"0,0,0,0,0,0,0,0,4000,8000,13000,19000,27000,40000,60000,100.000,170000,230000,320000,450000",
	pourcentage:"0.25,0.3,0.35,0.4,0.44,0.48,0.52,0.56,0.6,0.63,0.66,0.69,0.72,0.75,0.78,0.80,0.82,0.84,0.86,0.88"
};
$('.ressource-available').each(function() {
	var ids = $(this).attr('id');
	$(this).replaceWith('<input type="number" class="ressource-available" value="0" id="' + ids +'"/>');
});
$('#vault-level').replaceWith('<input type="number" value="1" id="vault-level"/>');
$('#vault-calc').click(function() {
var vaultlevel = $('#vault-level').val();
var last = {
	gold:0,
	wood:0,
	iron:0,
	stone:0
};
$('.ressource-available').each(function() {
	var ressource = $(this).val();
	var ids = $(this).attr('id');
	last[ids] = ressource;
	});
	$('.ressource-available').each(function() {
	var ids = $(this).attr('id');
	var ressource = last[ids];
	var capacitys = Number(capacity[ids].split(',')[vaultlevel - 1]);
	if ( capacitys > ressource) {
		last[ids] = ressource + ":0";
		return;
	}
	last[ids] = Math.ceil(capacitys + ($(this).val() - capacitys) * Number(capacity.pourcentage.split(',')[vaultlevel - 1])) + ":" + Math.floor(($(this).val() - capacitys) * Number(1 - capacity.pourcentage.split(',')[vaultlevel - 1]));
	console.log(last[ids]);
	});
$('.ressource-last').each(function() {
	var ids = $(this).attr('id').substring(0,$(this).attr('id').length - 1);
	var index = $(this).attr('id').substring($(this).attr('id').length - 1);
	index = parseInt(index);
	var ressources = last[ids].toString();
	$(this).html(Number(ressources.split(':')[index - 1]).toLocaleString());
	});
});
});
$(function() {
        $('.jshide').remove();
	var calc = $('.nombre');
	if (!calc.length) {
		return;
	}
var dps = {
	0: [30,32,35,38,41,44,48,52,56,61,66,71,77,84,90,98,106,115,124,134],
	1: [26,28,31,34,37,40,42,48,52,56,62,67,69,80,87,95,103,104,123,134],
	2: [80,88,97,106,117,129,142,156,171,189,207,228,251,276,304,334,368,404,445,489],
	3: [160,169,179,189,200,212,224,237,251,266,281,297,315,333,352,373,394,417],
	4: [140,153,166,181,198,215,235,256,279,304,331,361,394,429,468],
	5: [100,108,116,124,134,144,154,166,178,192],
	6: [350,385,424,466,512,564,620,682]
};
var pv = {
	0: [140,150,160,172,184,196,210,225,241,257,275,295,315,337,361,386,413,442,473,506],
	1: [1000,1080,1166,1260,1360,1469,1587,1714,1851,1999,2159,2332,2518,2720,2937,3172,3426,3700,3996,4316],
	2:[50,54,59,67,70,76,83,90,98,107,116,126,138,150,163,177,193,210,228,248],
	3:[400,424,449,475,503,533,564,597,633,670,710,751,796,843,892,945,1001,1060],
	4:[2000,2156,2320,2510,2700,2910,3140,3380,3650,3930,4240,4570,4930,5310,5720],
	5:[450,477,506,536,568,602,638,680,720,760],
	6:[25000,26800,28600,30600,32800,35000,37500,40000]
};
var cost = {
	0: [20,50,100,150,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
	1: [300,500,800,1100,1300,1700,1700,2500,3000,3500,4000,4500,5000,5500,6000,6500,7000,8000,9000,10000],
	2:[220,330,450,550,700,850,1000,1150,1300,1450,1600,1800,2000,2200,2400,2600,2800,3000,3200,3400],
	3:[800,1000,1200,1400,1600,1800,2000,2200,2400,2600,2800,3000,3200,3400,3600,3800,4000,4200],
	4:[8000,9000,10000,11000,12000,13000,14000,15000,16000,17000,18000,19000,20000,21000,22000],
	5:[8000,9000,10000,11000,12000,13000,14000,15000,16000,17000],
	6:[25000,30000,35000,40000,45000,50000,55000,60000]
};
$('.nombre').replaceWith('<input type="text" value="0" class="nombre"/>');
$('.attack-bonus').replaceWith('<input type="text" value="0" class="attack-bonus"/>');
$('.health-bonus').replaceWith('<input type="text" value="0" class="health-bonus"/>');
$('.level').each(function(index) {
	var classes=$(this).attr("class");
	var selectlevel='<select class="' + classes + '">';
	var troopsinfo=dps[index];
	for(i=0;i<troopsinfo.length;i++){
		selectlevel += '<option value="' + (i + 1) + '">' + (i + 1) +'</option>';
	}
	selectlevel += '</select>';
	$(this).replaceWith(selectlevel);
});
$('.calc-troop').replaceWith('<button class="calc-troop">Calculer</button>');
$('.calc-troop').click(function(){
	$(this).attr('disabled',true);
	$(this).html("Chargement...");
	var pvtotal=0;
	var dpstotal=0;
	var totalcost=0;
	$('.nombre').each(function(index){
		var nombres = $(this).val();
		var levels = $('.level').eq(index).find('option:selected').val();
		var hpinfos = pv[index];
		var troopdps = dps[index];
	    var costinfos = cost[index];
		var pvbonus = parseInt($('.health-bonus').val())+100
		var attackbonus= parseInt($('.attack-bonus').val())+100;
		$('.attack-finalbonus').html(attackbonus+"%");
		$('.pv-finalbonus').html(pvbonus+"%");
		var trooponepv =hpinfos[levels-1] * (pvbonus/100);
		var trooponedps=troopdps[levels-1] * (attackbonus/100);
		pvtotal += Math.floor(trooponepv*nombres);
		dpstotal += Math.floor(trooponedps*nombres);
		totalcost += (parseInt(costinfos[levels - 1]) * nombres);
	});
        $('.dpstotal').html(dpstotal.toLocaleString());
	$('.pvtotal').html(pvtotal.toLocaleString());
	$('.costtotal').html(totalcost.toLocaleString());
	$(this).attr('disabled',false);
	$(this).html("Calculer");
	$('.hidden').toggleClass('hidden');
});
});
$(function () {
    var capacity = [1, 4, 2, 3, 8, 5, 6, 21];
    var formationtime = [1, 6, 4, 3, 24, 10, 15, 50];
    $('.barque-level').each(function (index) {
        $(this).replaceWith('<select class="barque-level" id="barque-level-' + (index + 1) + '"></select>');
        $('#barque-level-' + (index + 1)).append('<option value="0">Aucune</option>');
        for (i = 1; i < 21; i++) {
            $('#barque-level-' + (index + 1)).append('<option value="' + (i + 4) + '">' + i + '</option>');
        }
    });
    $('.barque-troops').each(function (index) {
        $(this).replaceWith('<select class="barque-troops" id="barque-troops-' + (index + 1) + '"><option value="0">Fusilier</option><option value="1">Gros bras</option><option value="2">Zooka</option><option value="3">Guerrier</option><option value="4">Tank</option><option value="5">Infirmier</option><option value="6">Grenadier</option><option value="7">Carboniseur</option></select>');
    });
    $('.barge-button').replaceWith('<button class="barge-button">Calculer</button>');
    $('.barge-button').click(function () {
        if ($('.army-result').length > 0) {
            $('.army-result').remove();
        }
        var troopsnumber = [];
        var highers = [];
        for (i = 0; i < 8; i++) {
            troopsnumber.push(Math.floor($('#barque-level-' + (i + 1) + ' option:selected').val() / capacity[$('#barque-troops-' + (i + 1) + ' option:selected').val()]));
        }
        var content = '<table class="wikitable army-result"><tr><td>Numéro de la barge</td><td>Troupes :</td><td>Nombre de troupes :</td><td>Temps : </td></tr>';
        for (i = 0; i < troopsnumber.length; i++) {
            var time = formationtime[$('#barque-troops-' + (i + 1) + ' option:selected').val()] * troopsnumber[i];
            highers.push(time);
            if (time > 60) {
                time = Math.floor(time / 60) + 'h ' + Math.ceil(((time / 60) - Math.floor(time / 60)) * 60) + 'm';
            } else {
                time = time + 'm';
            }
            content += '<tr><td>Barge n°' + (i + 1) + '</td><td>' + $('#barque-troops-' + (i + 1) + ' option:selected').html() + '</td><td>' + troopsnumber[i] + '</td><td>' + time + '</td></tr>';
        }
        var high = highers[0];
        for (i = 1; i < highers.length; i++) {
            if (high < highers[i]) {
                high = highers[i]
            }
        }
        if (high > 60) {
            high = Math.floor(high / 60) + 'h ' + Math.ceil(((high / 60) - Math.floor(high / 60)) * 60) + 'm';
        } else {
            high = high + 'm';
        }
        content += '<tr><td colspan="4">Temps total : ' + high + '</td></tr>';
        content += '</table>'
        $('#WikiaArticle').append(content);
    });
});
$(function() {
    var calc = $('.user-number');
    if (!calc)
        return;
var offenceinfo = {
	artillery: "3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61",
	flare: "2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31",
	medkit: "6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84,87,90,93",
	shock: "7,12,17,22,27,32,37,42,47,52,57,62,67,72,77,82,87,92,97,102,107,112,117,122,127,132,137,142,147,152",
	barrage: "10,16,22,28,34,40,46,52,58,64,70,76,82,88,94,100,106,112,118,124,130,136,142,148,154,160,166,172,178,184",
	fumigene: "2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31"
};
	$('.user-number').each(function () {
    var classes = $(this).attr('class');
    var ids = $(this).attr('id');
    $(this).replaceWith('<input type="text" value="0" id="' + ids + '"/>');
    $('#' + ids).addClass(classes);
});
$('#calc').click(function () {
    $('.user-number').each(function () {
        if ($(this).val() > 29) {
            alert('Rentrez une valeur plus petite !');
            return;
        }
        if ($(this).val() === 0) return;
        var ids = $(this).attr('id');
        if (ids == "tank") {
            number = $(this).val();
            totalcost = parseInt(2 * number);
        } else if (ids == "scorcher") {
            number = $(this).val();
            totalcost = parseInt(12 * number);
        } else {
            var number = $(this).val();
            var nextcost = offenceinfo[ids].split(',')[number];
            var totalcost = 0
            for (i = 0; i < number; i++) {
                totalcost += parseInt(offenceinfo[ids].split(',')[i]);
            }
        }
        $('#' + ids + 'total').html(number);
        $('#' + ids + '1').html(totalcost);
        $('#' + ids + '2').html(nextcost);
    });
    $('#total').html(0);
    $('#total1').html(0);
    var totalnumber = 0;
    $('.calc-number').each(function () {
        totalnumber += parseInt($(this).html());
    });
    $('#total').html(totalnumber);
    var totalenergie = 0;
    $('.next-energie').each(function () {
        totalenergie += parseInt($(this).html());
    });
    $('#total1').html(totalenergie);
});
});