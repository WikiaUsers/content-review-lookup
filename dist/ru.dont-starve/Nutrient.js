var nutrientTimer;
var nutrientAddInterval;
var holemode = 9;
var nutrients = [];
nutrients['4'] = [];
nutrients['9'] = [];
nutrients['16'] = [];

$(function(){

$("#holemode").click(function sortseed(){
clearInterval(nutrientAddInterval);
clearTimeout(nutrientTimer);	
if (($("#soil3").css("display")) !== "none"){
  $("#soil2").css({"display": "none"});
  $("#soil3").css({"display": "none"});
  $("#soil4").css({"display": ""});
  holemode = 16;
  changeNutrientQuantity(1);
  }else if(($("#soil4").css("display")) !== "none"){
  $("#soil4").css({"display": "none"});
  $("#soil3").css({"display": "none"});
  $("#soil2").css({"display": ""});
  holemode = 4;
  changeNutrientQuantity(1);
  }else{
  $("#soil2").css({"display": "none"});
  $("#soil3").css({"display": ""});
  $("#soil4").css({"display": "none"});	
  holemode = 9;
  changeNutrientQuantity(1);
  }
});
$('#digmode').attr('onclick','removePlantAll()');
$('#planted > p > a').each(function(){
var id = $(this).attr('title');
$(this).children('img').attr('id', (id + '_planted'));
});
$('#plant > p > img').each(function(){
var title = $(this).attr('title');
$(this).attr('id', title);
$(this).attr('onclick','nutrientBoofer("' + title + '")');
});

i = 0;
$('#soil2 > p > span').each(function(){
$(this).attr('id' , ('soil_4_' + i));
$(this).attr('onclick','removePlant4("'+ i + '")');
i = i + 1;
return i;
});

i = 0;
$('#soil3 > p > span').each(function(){
$(this).attr('id' , ('soil_9_' + i));
$(this).attr('onclick','removePlant9("'+ i + '")');
i = i + 1;
return i;
});

i = 0;
$('#soil4 > p > span').each(function(){
$(this).attr('id' , ('soil_16_' + i));
$(this).attr('onclick','removePlant16("'+ i + '")');
i = i + 1;
return i;
});

});

var soil4 = [];
for(var i = 0; i < 4; i++){
soil4[i] = 'None';
}

var soil9 = [];
for(i = 0; i < 9; i++){
soil9[i] = 'None';
}

var soil16 = [];
for(i = 0; i < 16; i++){
soil16[i] = 'None';
}

window.nutrientCalc4Add = function(plant){
 clearTimeout(nutrientTimer);
 for (i = 0; i < 4; i++){
  if(soil4[i] == 'None'){
  var imageUrl = $('#' + plant +'_planted').attr('data-src');
  $('#soil_4_' + i).css({"background":"url(" +imageUrl +") 100% 100% no-repeat"});
  $('#soil_4_' + i).css({"background-size":"contain"});
  $('#soil_4_' + i).css({"padding-top":"5em"});
  soil4[i] = plant;
  break;
  }
 }
 nutrientTimer = setTimeout(nutrientLuaCall4,500);
};

window.nutrientCalc9Add = function(plant){
 clearTimeout(nutrientTimer);
 for (i = 0; i < 9; i++){
  if(soil9[i] == 'None'){
  var imageUrl = $('#' + plant +'_planted').attr('data-src');
  $('#soil_9_' + i).css({"background":"url(" +imageUrl +") 100% 100% no-repeat"});
  $('#soil_9_' + i).css({"background-size":"contain"});
  $('#soil_9_' + i).css({"padding-top":"5em"});
  soil9[i] = plant;
  break;
  }
 }
 nutrientTimer = setTimeout(nutrientLuaCall9,500);
};

window.nutrientCalc16Add = function(plant){
 clearTimeout(nutrientTimer);
 for (i = 0; i < 16; i++){
  if(soil16[i] == 'None'){
  var imageUrl = $('#' + plant +'_planted').attr('data-src');
  $('#soil_16_' + i).css({"background":"url(" +imageUrl +") 100% 100% no-repeat"});
  $('#soil_16_' + i).css({"background-size":"contain"});
  $('#soil_16_' + i).css({"padding-top":"5em"});
  soil16[i] = plant;
  break;
  }
 }
 nutrientTimer = setTimeout(nutrientLuaCall16,500);
};

window.removePlant4 = function(i){
clearTimeout(nutrientTimer);
soil4[i] = 'None';
nutrientTimer = setTimeout(nutrientLuaCall4,500);
$('#soil_4_' + i).css({"background-image":""});
$('#soil_4_' + i).css({"padding-top":""});
};

window.removePlant9 = function(i){
clearTimeout(nutrientTimer);	
soil9[i] = 'None';
nutrientTimer = setTimeout(nutrientLuaCall9,500);
$('#soil_9_' + i).css({"background-image":""});
$('#soil_9_' + i).css({"padding-top":""});
};

window.removePlant16 = function(i){
clearTimeout(nutrientTimer);
soil16[i] = 'None';
nutrientTimer = setTimeout(nutrientLuaCall16,500);
$('#soil_16_' + i).css({"background-image":""});
$('#soil_16_' + i).css({"padding-top":""});
};

window.removePlantAll = function(){
	clearTimeout(nutrientTimer);
	if(holemode == 4){
	for(var i = 0; i < 4; i++){
	soil4[i] = 'None'
	$('#soil_4_' + i).css({"background-image":""});
    $('#soil_4_' + i).css({"padding-top":""});
	}
	}else if(holemode == 9){
	for(var i = 0; i < 9; i++){
	soil9[i] = 'None'
	$('#soil_9_' + i).css({"background-image":""});
    $('#soil_9_' + i).css({"padding-top":""});
	}
	}else if(holemode == 16){
	for(var i = 0; i < 16; i++){
	soil16[i] = 'None'
	$('#soil_16_' + i).css({"background-image":""});
    $('#soil_16_' + i).css({"padding-top":""});
	}
	}
	delete nutrients[holemode];
	changeNutrientQuantity(0);
};

window.nutrientLuaCall4 = function(){
	delete nutrients[holemode];
	var api = new mw.Api();
    api.get( {
    action: 'expandtemplates',
    text: '{{#invoke:Nutrients|nutrients4|'+ soil4[0] +'|'+ soil4[1] +'|'+ soil4[2] +'|'+ soil4[3] + '}}'
     } ).done ( function ( data ) {
    nutrients['4'] = data.expandtemplates['*'];
    return nutrients['4'];
    });
    nutrientAddInterval = setInterval(changeNutrientQuantity,700,1);
};

window.nutrientLuaCall9 = function(){
	delete nutrients[holemode];
	var api = new mw.Api();
    api.get( {
    action: 'expandtemplates',
    text: '{{#invoke:Nutrients|nutrients9|'+ soil9[0] +'|'+ soil9[1] +'|'+ soil9[2] +'|'+ soil9[3] +'|'+ soil9[4] +'|'+ soil9[5] +'|'+ soil9[6] +'|'+ soil9[7] +'|'+ soil9[8] +'}}'
     } ).done ( function ( data ) {
    nutrients['9'] = data.expandtemplates['*'];
    return nutrients['9'];
    });
    nutrientAddInterval = setInterval(changeNutrientQuantity,700,1);
};

window.nutrientLuaCall16 = function(){
	delete nutrients[holemode];
	var api = new mw.Api();
    api.get( {
    action: 'expandtemplates',
    text: '{{#invoke:Nutrients|nutrients16|'+ soil16[0] +'|'+ soil16[1] +'|'+ soil16[2] +'|'+ soil16[3] +'|'+ soil16[4] +'|'+ soil16[5] +'|'+ soil16[6] +'|'+ soil16[7] +'|'+ soil16[8] +'|'+ soil16[9] +'|'+ soil16[10] +'|'+ soil16[11] +'|'+ soil16[12] +'|'+ soil16[13] +'|'+ soil16[14] +'|'+ soil16[15] +'}}'
     } ).done ( function ( data ) {
    nutrients['16'] = data.expandtemplates['*'];
    return nutrients['16'];
    });
    nutrientAddInterval = setInterval(changeNutrientQuantity,700,1);
};

window.changeNutrientQuantity = function(controlNumber){
if((nutrients[holemode] !== undefined) && ((nutrients[holemode].includes(',')) || (nutrients[holemode].length == 13))){
 if(nutrients[holemode].length !== 13){
 nutrients[holemode] = nutrients[holemode].split(',')
 }
 if(nutrients[holemode][1] > 0){
 $('#gr1').text(''+nutrients[holemode][1]+'')
 $('#gr2').text(''+nutrients[holemode][2]+'')
 $('#gr3').text(''+nutrients[holemode][3]+'')
 $('#growth').css({'display':''})
 $('#growthnone').css({'display':'none'})
 }else{
 $('#growth').css({'display':'none'})
 $('#growthnone').css({'display':''})
 }
 if(nutrients[holemode][4] > 0){
 $('#cm1').text(''+nutrients[holemode][4]+'')
 $('#cm2').text(''+nutrients[holemode][5]+'')
 $('#cm3').text(''+nutrients[holemode][6]+'')
 $('#compost').css({'display':''})
 $('#compostnone').css({'display':'none'})
 }else{
 $('#compost').css({'display':'none'})
 $('#compostnone').css({'display':''})
 }
 if(nutrients[holemode][7] > 0){
 $('#man1').text(''+nutrients[holemode][7]+'')
 $('#man2').text(''+nutrients[holemode][8]+'')
 $('#man3').text(''+nutrients[holemode][9]+'')
 $('#manure').css({'display':''})
 $('#manurenone').css({'display':'none'})
 }else{
 $('#manure').css({'display':'none'})
 $('#manurenone').css({'display':''})
 }
 clearInterval(nutrientAddInterval)
}else if((controlNumber == 0) || (nutrients[holemode].length == 0)){
 $('#growth').css({'display':'none'})
 $('#growthnone').css({'display':''})
 $('#compost').css({'display':'none'})
 $('#compostnone').css({'display':''})
 $('#manure').css({'display':'none'})
 $('#manurenone').css({'display':''})
 clearInterval(nutrientAddInterval)
}
};

window.nutrientBoofer = function(plant){
if(holemode == 4){
nutrientCalc4Add(plant);
}else if(holemode == 9){
nutrientCalc9Add(plant);
}else{
nutrientCalc16Add(plant);
}
};