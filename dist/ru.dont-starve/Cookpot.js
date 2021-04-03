function timer(){
$('<span style="font-weight:bold;" id="chance2"></span>').prependTo('.cookpotcell');
$('<span style="position: relative;"><img class="hiddeningredientcookpot" id="result2"></span>').prependTo('.cookpotcell');
$('<span style="font-weight:bold;" id="chance1"></span>').prependTo('.cookpotcell');
$('<span style="position: relative;"><img class="ingredientcookpot" id="result1"></span>').prependTo('.cookpotcell');
$('<span style="position: relative;"><img id="arrowcookpot" class="cookpotarrow" src = "https://vignette.wikia.nocookie.net/dont-starve/images/d/d2/Crock_Pot.png/revision/latest?cb=20130110150334&path-prefix=ru"></span>').prependTo('.cookpotcell');
$('<span style="position: relative;"><img class="ingredientcookpot" id="cookpot4" onclick="cookpotDelete(3)"></span>').prependTo('.cookpotcell');
$('<span style="position: relative;"><img class="ingredientcookpot" id="cookpot3" onclick="cookpotDelete(2)"></span>').prependTo('.cookpotcell');
$('<span style="position: relative;"><img class="ingredientcookpot" id="cookpot2" onclick="cookpotDelete(1)"></span>').prependTo('.cookpotcell');
$('<span style="position: relative;"><img class="ingredientcookpot" id="cookpot1" onclick="cookpotDelete(0)"></span>').prependTo('.cookpotcell');
 
$('#cpclear').attr('onclick','cookpotDeleteAll()');
$(".cookpot > div > p > span > a").each(function(){
var src = $(this).children('img').attr('data-src');
var title = $(this).attr('title');
var name = $(this).children('img').attr('data-image-name');
name = name.replace('.png','');
$(this).attr('title', name);
$(this).removeAttr('href');
$(this).removeClass('image-thumbnail image');
$(this).attr('onclick','cookpotAdd("' + title + '","'+src+'")');
});
$(".cookpot > div > div > p > span > a").each(function(){
$(this).removeAttr('href');
$(this).removeClass('image-thumbnail image');
});
$("#foods > p > a").each(function(){
var id = $(this).attr('title');
$(this).attr('id',id);
$(this).removeAttr('href');
$(this).removeClass('image-thumbnail image');
});
$('#description > a,#description2 > a').each(function(){
var src = $(this).children('img').attr('data-src');
$(this).children('img').attr('src',src);
});
}
var cookpot = [];
var cookpotResult;
var dlc = "DS";
var warly = false;
var mode = "None"
var cookpotTimer;
setTimeout(timer,1000);
window.cookpotDeleteResult = function(){
    if((cookpot[0] !== undefined) && (cookpot[1] !== undefined) && (cookpot[2] !== undefined) && (cookpot[3] !== undefined)){
    $('#result1').attr('src',' ');
    $('#arrowcookpot').attr('src',"https://vignette.wikia.nocookie.net/dont-starve/images/d/d2/Crock_Pot.png/revision/latest?cb=20130110150334&path-prefix=ru");
    $('#chance1').text(' ');
    $('#description').css({"display":"none"});
    if(($('#result2').css('display'))!== 'none'){
    $('#chance2').text(' ');
    $('#description2').css({"display":"none"});
    $('#result2').removeClass('ingredientcookpot');
    $('#result2').addClass('hiddeningredientcookpot');
    $('#result2').attr('src',' ');
    }
    clearInterval(cookpotTimer);
    for(var k = 0;k < 10; k++){
    delete cookpotResult[k];
    }
    }
};
 
window.cookpotDelete = function(i){
    cookpotDeleteResult();
    delete cookpot[i];
    $('#cookpot' + (i + 1)).attr('src',' ');
};
 
window.cookpotDeleteAll = function(){
    cookpotDeleteResult();
    for(var i = 0;i < 4; i++){
    delete cookpot[i];
    $('#cookpot' + (i + 1)).attr('src',' ');
    }
};
 
 
window.cookpotAdd = function(title,src){//Добавляет ингридиент в казан, если слот пустой то он добавляет в него, если слот был удалён, также добавляет в него
 if(event.ctrlKey !== true){
  if(cookpot[0] == undefined){
    cookpot[0] = title;
    $('#cookpot1').attr('src',src);
  }else if(cookpot[1] == undefined){
    cookpot[1] = title;
    $('#cookpot2').attr('src',src);
  }else if(cookpot[2] == undefined){
    cookpot[2] = title;
    $('#cookpot3').attr('src',src);
  }else if(cookpot[3] == undefined){
    cookpot[3] = title;
    $('#cookpot4').attr('src',src);
  }
  if((cookpot[0] !== undefined) && (cookpot[1] !== undefined) && (cookpot[2] !== undefined) && (cookpot[3] !== undefined)){
    var api = new mw.Api();
    clearInterval(cookpotTimer);
    api.get( {
    action: 'expandtemplates',
    text: '{{#invoke:Cookpot|cookpotCalculate|'+ dlc +'|'+ warly +'|'+ mode +'|'+ cookpot[0] +'|'+ cookpot[1]+ '|'+ cookpot[2] +'|'+ cookpot[3] +'}}'
     } ).done ( function ( data ) {
    cookpotResult = data.expandtemplates['*'];
    return cookpotResult;
    } );
    if(($('#result1').attr('src') == ' ') || ($('#result1').attr('src') == undefined)){
    src = $('#cookpotatwork').children('img').attr('data-src');
    $('#arrowcookpot').attr('src', src);
    }
    cookpotTimer = setInterval(showResult,700);
  }
}
};
 
window.showResult = function(){
    function returnResult(){
        if((cookpotResult !== undefined) && (cookpotResult[0] !== undefined)){
          clearInterval(cookpotTimer);
          if((cookpotResult.length !== 10) && (cookpotResult !== undefined)){
          cookpotResult = cookpotResult.split(', ');
          }
          if (cookpotResult[5] !== '0'){
          var src = $('#' + cookpotResult[0]).children('img').attr('data-src');
          $('#result1').attr('src',src);
          src = $('#' + cookpotResult[5]).children('img').attr('data-src');
          $('#result2').attr('src',src);
          $('#result2').removeClass('hiddeningredientcookpot');
          $('#result2').addClass('ingredientcookpot');
          $('#arrowcookpot').attr('src',"https://vignette.wikia.nocookie.net/dont-starve/images/d/d2/Crock_Pot.png/revision/latest?cb=20130110150334&path-prefix=ru");
          $('#chance1,#chance2').text('50%');
          $('#name1').text(cookpotResult[1]);
          $('#health1').text(' ' + cookpotResult[2] + ' ');
          $('#hunger1').text(' ' + cookpotResult[3] + ' ');
          $('#sanity1').text(' ' + cookpotResult[4] + ' ');
          $('#name2').text(cookpotResult[6]);
          $('#health2').text(' ' + cookpotResult[7] + ' ');
          $('#hunger2').text(' ' + cookpotResult[8] + ' ');
          $('#sanity2').text(' ' + cookpotResult[9] + ' ');
          $('#description').css({"display":""});
          $('#description2').css({"display":""});
          }else{
          var src = $('#' + cookpotResult[0]).children('img').attr('data-src');
          $('#result1').attr('src',src);      
          $('#arrowcookpot').attr('src',"https://vignette.wikia.nocookie.net/dont-starve/images/d/d2/Crock_Pot.png/revision/latest?cb=20130110150334&path-prefix=ru");
          $('#name1').text(cookpotResult[1]);
          $('#health1').text(' ' + cookpotResult[2] + ' ');
          $('#hunger1').text(' ' + cookpotResult[3] + ' ');
          $('#sanity1').text(' ' + cookpotResult[4] + ' ');
          $('#description').css({"display":""});
          }
      }
    }
    return returnResult();
};
 
$('#buttonds').click(function sortds(){
  $(".ds").css({"display": ""});
  $(".rog, .sw, .h, .dst, .warlydst").css({"display": "none"});
  $("#buttonds").addClass("buttoncb");
  $(".ds").css({"height": "400px"});
  $("#buttonrog, #buttonsw, #buttonh, #buttondst").removeClass("buttoncb");
  cookpotDeleteAll();
  dlc = 'DS';
});
$('#buttonrog').click(function sortrog(){
  $(".rog").css({"display": ""});
  $(".rog").css({"height": "420"});
  $(".ds, .sw, .h, .dst, .warlydst").css({"display": "none"});
  $("#buttonrog").addClass("buttoncb");
  $("#buttonds, #buttonsw, #buttonh, #buttondst").removeClass("buttoncb");
  cookpotDeleteAll();
  dlc = 'RoG';
});
$('#buttonsw').click(function sortsw(){
  $(".sw").css({"display": ""});
  $(".cookpot").css({"height": ""});
  $(".ds, .rog, .h, .dst, .warlydst").css({"display": "none"});
  $("#buttonsw").addClass("buttoncb");
  $("#buttonds, #buttonrog, #buttonh, #buttondst").removeClass("buttoncb");
  cookpotDeleteAll();
  dlc = 'SW';
});
$('#buttonh').click(function sorth(){
  $(".h").css({"display": ""});
  $(".cookpot").css({"height": ""});
  $(".ds, .rog, .sw, .dst, .warlydst").css({"display": "none"});
  $("#buttonh").addClass("buttoncb");
  $("#buttonds, #buttonrog, #buttonsw, #buttondst").removeClass("buttoncb");
  cookpotDeleteAll();
  dlc = 'H';
});
$('#buttondst').click(function sortdst(){
  $(".dst").css({"display": ""});
  $(".cookpot").css({"height": ""});
  $(".ds, .sw, .h, .rog, .warlydst").css({"display": "none"});
  $("#buttondst").addClass("buttoncb");
  $("#buttonds, #buttonsw, #buttonh, #buttonrog").removeClass("buttoncb");
  cookpotDeleteAll();
  dlc = 'DST';
  if ($('#buttonwarly').hasClass('buttonwarly')) {
      $(".warly, .warlydst").css({"display": ""});}
});
 
$('#buttonwarly').click(function sortwarly(){
  cookpotDeleteAll();
  if (!$(this).hasClass('buttonwarly')) {
      $(".warly, .warlydst").css({"display": ""});
      $("#buttonwarly").addClass("buttonwarly");
      warly = true;
} else {
      $(".warly, .warlydst").css({"display": "none"});
      $(".buttonwarly").removeClass("buttonwarly");
      warly = false;
}
});
 
$('#bmeat').click(function meat(){
    $(".meat, .meatfish").addClass("light");
    $(".veggie, .fish, .fruit, .other").removeClass("light");
    $("#bmeat").css({"background-color": "#b99557"});
    $("#bveggie, #bfish, #bfruit, #bother").css({"background-color": "#0000"});
});
 
$('#bfish').click(function fish(){
    $(".fish, .meatfish").addClass("light");
    $(".veggie, .meat, .fruit, .other").removeClass("light");
    $("#bfish").css({"background-color": "#b99557"});
    $("#bveggie, #bmeat, #bfruit, #bother").css({"background-color": "#0000"});
});

$('#bveggie').click(function veggie(){
    $(".veggie").addClass("light");
    $(".meat, .fish, .meatfish, .fruit, .other").removeClass("light");
    $("#bveggie").css({"background-color": "#b99557"});
    $("#bmeat, #bfish, #bfruit, #bother").css({"background-color": "#0000"});
});
 
$('#bfruit').click(function fruit(){
    $(".fruit").addClass("light");
    $(".veggie, .meat, .meatfish, .fish, .other").removeClass("light");
    $("#bfruit").css({"background-color": "#b99557"});
    $("#bveggie, #bfish, #bmeat, #bother").css({"background-color": "#0000"});
});
 
$('#bother').click(function other(){
    $(".other").addClass("light");
    $(".veggie, .meat, .fruit, .fish, .meatfish").removeClass("light");
    $("#bother").css({"background-color": "#b99557"});
    $("#bveggie, #bmeat, #bfruit, #bfish").css({"background-color": "#0000"});
});
 
$('#bclear').click(function clear(){
    $(".veggie, .meat, .fruit, .fish, .meatfish, .other").removeClass("light");
    $("#bveggie, #bmeat, #bfruit, #bfish, #bother").css({"background-color": "#0000"});
});
 
    $('#buttonds, #buttonrog, #buttonsw, #buttonh, #buttondst, #buttonwarly').click(function() {
       $(function() {
    $(".cookpot img.lzy, .cookpotbutton img.lzy").each(function() {
        var dataSrc = $(this).attr('data-src');
        if (dataSrc) {
            $(this).attr('src', dataSrc);
        }
    });
  });
});

$('.cookpot > div > p > span > a > img').on('click', function() {
    if(event.ctrlKey == true){
    var href = $(this).attr('data-image-name').replace('.png', '');
    window.open(href, '_blank').focus();
}
});
 
intervalCookpotResult = setInterval(timerCookpotResult,1000);
function timerCookpotResult(){
if(($('#result1').attr('src') !== undefined)){
$('#result1').on('click', function() {
    if(event.ctrlKey == true){
    if(mode = "None"){
    var href = cookpotResult[1];
    window.open(href, '_blank');
    }else{
    }
}
});
$('#result2').on('click', function() {
    if(event.ctrlKey == true){
    if(mode = "None"){
    var href = cookpotResult[6];
    window.open(href, '_blank');
    }else{
    }
}
});
$('#name1').on('click', function() {
    if(mode = "None"){
    var href = cookpotResult[1];
    window.open(href, '_blank');
    }else{
    }
});
$('#name2').on('click', function() {
    if(mode = "None"){
    var href = cookpotResult[6];
    window.open(href, '_blank');
    }else{
    }
});
clearInterval(intervalCookpotResult);
}
}