/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/*tooltip*/
var tooltips_config = {
    waitForImages: true,
    events: ['CustomEvent'],
    noCSS: true,
}

/*Заглавная by Arhat */
$('#bcell').click(function(){
	$('#ccell, #earthballclose').css({"display": ""});
    $('#ccell').animate({opacity: 1}, 200);
    $('#ccell').siblings('.earthtab').css({"display": "none"});
    $('#ccell').siblings('.earthtab').css({"opacity": "0"});
    $('#earthballmain').removeClass();
    $('#earthballmain').addClass('earthballmain1');
});

$('#bcreature').click(function(){
	$('#ccreature, #earthballclose').css({"display": ""});
    $('#ccreature').animate({opacity: 1}, 200);
    $('#ccreature').siblings('.earthtab').css({"display": "none"});
    $('#ccreature').siblings('.earthtab').css({"opacity": "0"});
    $('#earthballmain').removeClass();
    $('#earthballmain').addClass('earthballmain2');
});

$('#btribal').click(function(){
	$('#ctribal, #earthballclose').css({"display": ""});
    $('#ctribal').animate({opacity: 1}, 200);
    $('#ctribal').siblings('.earthtab').css({"display": "none"});
    $('#ctribal').siblings('.earthtab').css({"opacity": "0"});
    $('#earthballmain').removeClass();
    $('#earthballmain').addClass('earthballmain3');
});

$('#bcivilization').click(function(){
	$('#ccivilization, #earthballclose').css({"display": ""});
    $('#ccivilization').animate({opacity: 1}, 200);
    $('#ccivilization').siblings('.earthtab').css({"display": "none"});
    $('#ccivilization').siblings('.earthtab').css({"opacity": "0"});
    $('#earthballmain').removeClass();
    $('#earthballmain').addClass('earthballmain4');
});

$('#bspace').click(function(){
	$('#cspace, #earthballclose').css({"display": ""});
    $('#cspace').animate({opacity: 1}, 200);
    $('#cspace').siblings('.earthtab').css({"display": "none"});
    $('#cspace').siblings('.earthtab').css({"opacity": "0"});
    $('#earthballmain').removeClass();
    $('#earthballmain').addClass('earthballmain5');
});

$('#bcell, #bspace, #bcreature, #btribal, #bcivilization').click(function(){
    $('#earthballmain').animate({left: "60px"}, 200);
    $('#bcell').animate({left: "230px"}, 200);
    $('#bspace').animate({left: "231px"}, 200);
    $('#bcreature').animate({left: "335px"}, 200);
    $('#btribal').animate({left: "378px"}, 200);
    $('#bcivilization').animate({left: "334px"}, 200);
    $('#earthdesc').animate({
    	opacity: 0
    }, 200);
    $('#earthline').animate({
    	width: "200px"
    }, 200);
});

$('#earthballmain').click(function(){
    $('#earthballmain').animate({left: "260px"}, 200);
    $('#bcell').animate({left: "430px"}, 200);
    $('#bspace').animate({left: "431px"}, 200);
    $('#bcreature').animate({left: "535px"}, 200);
    $('#btribal').animate({left: "578px"}, 200);
    $('#bcivilization').animate({left: "534px"}, 200);
    $('#earthdesc').animate({
    	opacity: 1
    }, 200);
    $('#earthline').animate({
    	width: "350px"
    }, 200);
    $('#earthballclose').css({"display": "none"});
    $(this).siblings('.earthtab').css({"display": "none"});
    $(this).siblings('.earthtab').animate({opacity: 0}, 200);
    $('#earthballmain').removeClass();
});