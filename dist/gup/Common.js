/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Auto-refesh WikiActivity // Girls und Panzer Wiki (En) */

window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/gup/images/0/06/Gup.gif';
window.ajaxRefresh = 10000;
window.AjaxRCRefreshText = 'Auto refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');



/*==================================================*/

$(".header-c").click(function ()             {
    $header = $(this);
    $content = $header.next();
    $content.slideToggle(500, function ()   {
    });
});

$(function(c) {
	$('.closebtn').on('click', function(c){
		$(this).parent().fadeOut('slow', function(c){
		});
	});	
});

/*==================================================*/

/********************************************/
/* On click events for the Character Tables */
/* Utilised in Template:CL-Nav              */
/********************************************/

// Hides all pages except for main
// Introduces navigation variable to track current page
$(".CL-Page").hide();
var CL_PageNum=0;
 
// Click events for icons on main page
// Closes main page and shows corresponding character page
$("#CL-Cell1").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page1").show();
    $(window).scroll();
    CL_PageNum=1;
  });
$("#CL-Cell2").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page2").show();
    $(window).scroll();
    CL_PageNum=2;
  });
$("#CL-Cell3").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page3").show();
    $(window).scroll();
    CL_PageNum=3;
  });
$("#CL-Cell4").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page4").show();
    $(window).scroll();
    CL_PageNum=4;
 });
$("#CL-Cell5").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page5").show();
    $(window).scroll();
    CL_PageNum=5;
});
$("#CL-Cell6").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page6").show();
    $(window).scroll();
    CL_PageNum=6;
});
$("#CL-Cell7").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page7").show();
    $(window).scroll();
    CL_PageNum=7;
});
$("#CL-Cell8").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page8").show();
    $(window).scroll();
    CL_PageNum=8;
});
$("#CL-Cell9").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page9").show();
    $(window).scroll();
    CL_PageNum=9;
});
$("#CL-Cell10").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page10").show();
    $(window).scroll();
    CL_PageNum=10;
});
$("#CL-Cell11").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page11").show();
    $(window).scroll();
    CL_PageNum=11;
});
$("#CL-Cell12").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page12").show();
    $(window).scroll();
    CL_PageNum=12;
});
$("#CL-Cell13").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page13").show();
    $(window).scroll();
    CL_PageNum=13;
});
$("#CL-Cell14").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page14").show();
    $(window).scroll();
    CL_PageNum=14;
});
$("#CL-Cell15").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page15").show();
    $(window).scroll();
    CL_PageNum=15;
});
$("#CL-Cell16").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page16").show();
    $(window).scroll();
    CL_PageNum=16;
});
$("#CL-Cell17").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page17").show();
    $(window).scroll();
    CL_PageNum=17;
});
$("#CL-Cell18").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page18").show();
    $(window).scroll();
    CL_PageNum=18;
});
$("#CL-Cell19").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page19").show();
    $(window).scroll();
    CL_PageNum=19;
});
$("#CL-Cell20").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page20").show();
    $(window).scroll();
    CL_PageNum=20;
});
$("#CL-Cell21").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page21").show();
    $(window).scroll();
    CL_PageNum=21;
});
$("#CL-Cell22").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page22").show();
    $(window).scroll();
    CL_PageNum=22;
});
$("#CL-Cell23").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page23").show();
    $(window).scroll();
    CL_PageNum=23;
});
$("#CL-Cell24").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page24").show();
    $(window).scroll();
    CL_PageNum=24;
});
$("#CL-Cell25").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page25").show();
    $(window).scroll();
    CL_PageNum=25;
});
$("#CL-Cell26").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page26").show();
    $(window).scroll();
    CL_PageNum=26;
});
$("#CL-Cell27").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page27").show();
    $(window).scroll();
    CL_PageNum=27;
});
$("#CL-Cell28").click(function(){
    $("#CL-Main").hide();
    $("#CL-Page28").show();
    $(window).scroll();
    CL_PageNum=28;
});
 
// Controls for previous button
// Uses variable CL_PageNum to handle navigation
// Defaults to main page on variable error
$(".CL-Previous").click(function(){
    $(".CL-Page").hide();
    switch(CL_PageNum-1){
        case 0:$("#CL-Main").show();CL_PageNum=0;break;
        case 1:$("#CL-Page1").show();CL_PageNum=1;break;
        case 2:$("#CL-Page2").show();CL_PageNum=2;break;
        case 3:$("#CL-Page3").show();CL_PageNum=3;break;
        case 4:$("#CL-Page4").show();CL_PageNum=4;break;
        case 5:$("#CL-Page5").show();CL_PageNum=5;break;
        case 6:$("#CL-Page6").show();CL_PageNum=6;break;
        case 7:$("#CL-Page7").show();CL_PageNum=7;break;
        case 8:$("#CL-Page8").show();CL_PageNum=8;break;
        case 9:$("#CL-Page9").show();CL_PageNum=9;break;
        case 10:$("#CL-Page10").show();CL_PageNum=10;break;
        case 11:$("#CL-Page11").show();CL_PageNum=11;break;
        case 12:$("#CL-Page12").show();CL_PageNum=12;break;
        case 13:$("#CL-Page13").show();CL_PageNum=13;break;
        case 14:$("#CL-Page14").show();CL_PageNum=14;break;
        case 15:$("#CL-Page15").show();CL_PageNum=15;break;
        case 16:$("#CL-Page16").show();CL_PageNum=16;break;
        case 17:$("#CL-Page17").show();CL_PageNum=17;break;
        case 18:$("#CL-Page18").show();CL_PageNum=18;break;
        case 19:$("#CL-Page19").show();CL_PageNum=19;break;
        case 20:$("#CL-Page20").show();CL_PageNum=20;break;
        case 21:$("#CL-Page21").show();CL_PageNum=21;break;
        case 22:$("#CL-Page22").show();CL_PageNum=22;break;
        case 23:$("#CL-Page23").show();CL_PageNum=23;break;
        case 24:$("#CL-Page24").show();CL_PageNum=24;break;
        case 25:$("#CL-Page25").show();CL_PageNum=25;break;
        case 26:$("#CL-Page26").show();CL_PageNum=26;break;
        case 27:$("#CL-Page27").show();CL_PageNum=27;break;
        case 28:$("#CL-Page28").show();CL_PageNum=28;break;
        default:$("#CL-Main").show();CL_PageNum=0;break;
    }
    $(window).scroll();
});
 
// Controls for next button
// Uses variable CL_PageNum to handle navigation
// Defaults to main page on variable error
$(".CL-Next").click(function(){
    $(".CL-Page").hide();
    switch(CL_PageNum+1){
        case 0:$("#CL-Main").show();CL_PageNum=0;break;
        case 2:$("#CL-Page2").show();CL_PageNum=2;break;
        case 3:$("#CL-Page3").show();CL_PageNum=3;break;
        case 4:$("#CL-Page4").show();CL_PageNum=4;break;
        case 5:$("#CL-Page5").show();CL_PageNum=5;break;
        case 6:$("#CL-Page6").show();CL_PageNum=6;break;
        case 7:$("#CL-Page7").show();CL_PageNum=7;break;
        case 8:$("#CL-Page8").show();CL_PageNum=8;break;
        case 9:$("#CL-Page9").show();CL_PageNum=9;break;
        case 10:$("#CL-Page10").show();CL_PageNum=10;break;
        case 11:$("#CL-Page11").show();CL_PageNum=11;break;
        case 12:$("#CL-Page12").show();CL_PageNum=12;break;
        case 13:$("#CL-Page13").show();CL_PageNum=13;break;
        case 14:$("#CL-Page14").show();CL_PageNum=14;break;
        case 15:$("#CL-Page15").show();CL_PageNum=15;break;
        case 16:$("#CL-Page16").show();CL_PageNum=16;break;
        case 17:$("#CL-Page17").show();CL_PageNum=17;break;
        case 18:$("#CL-Page18").show();CL_PageNum=18;break;
        case 19:$("#CL-Page19").show();CL_PageNum=19;break;
        case 20:$("#CL-Page20").show();CL_PageNum=20;break;
        case 21:$("#CL-Page21").show();CL_PageNum=21;break;
        case 22:$("#CL-Page22").show();CL_PageNum=22;break;
        case 23:$("#CL-Page23").show();CL_PageNum=23;break;
        case 24:$("#CL-Page24").show();CL_PageNum=24;break;
        case 25:$("#CL-Page25").show();CL_PageNum=25;break;
        case 26:$("#CL-Page26").show();CL_PageNum=26;break;
        case 27:$("#CL-Page27").show();CL_PageNum=27;break;
        case 28:$("#CL-Page28").show();CL_PageNum=28;break;
        case 29:$("#CL-Page29").show();CL_PageNum=29;break;
        default:$("#CL-Main").show();CL_PageNum=0;break;
    }
    $(window).scroll();
});
 
/*==================================================*/
 
/********************************/
/* Click Events for Tank List   */
/* Utilised in Template:TL-Nav  */
/********************************/
 
// Identical Documentation to Character List
 
$(".TL-Page").hide();
var TL_PageNum=0;
$("#TL-Main").show();
 
$("#TL-Cell1").click(function(){
    $("#TL-Main").hide();
    $("#TL-Light").show();
    $(window).scroll();
    TL_PageNum=1;
});
 
$("#TL-Cell2").click(function(){
    $("#TL-Main").hide();
    $("#TL-Medium").show();
    $(window).scroll();
    TL_PageNum=2;
});
 
$("#TL-Cell3").click(function(){
    $("#TL-Main").hide();
    $("#TL-Heavy").show();
    $(window).scroll();
    TL_PageNum=3;
});
 
$("#TL-Cell4").click(function(){
    $("#TL-Main").hide();
    $("#TL-Destroyer").show();
    $(window).scroll();
    TL_PageNum=4;
});
 
$("#TL-Cell5").click(function(){
    $("#TL-Main").hide();
    $("#TL-Super").show();
    $(window).scroll();
    TL_PageNum=5;
});
 
$("#TL-Cell6").click(function(){
    $("#TL-Main").hide();
    $("#TL-MBT").show();
    $(window).scroll();
    TL_PageNum=6;
});
 
$(".TL-Previous").click(function(){
    $(".TL-Page").hide();
    switch(TL_PageNum-1){
        case 0:$("#TL-Main").show();TL_PageNum=0;break;
        case 1:$("#TL-Light").show();TL_PageNum=1;break;
        case 2:$("#TL-Medium").show();TL_PageNum=2;break;
        case 3:$("#TL-Heavy").show();TL_PageNum=3;break;
        case 4:$("#TL-Destroyer").show();TL_PageNum=4;break;
        case 5:$("#TL-Super").show();TL_PageNum=5;break;
        default:$("#TL-Main").show();TL_PageNum=0;break;
    }
    $(window).scroll();
});
 
$(".TL-Next").click(function(){
    $(".TL-Page").hide();
    switch(TL_PageNum+1){
        case 2:$("#TL-Medium").show();TL_PageNum=2;break;
        case 3:$("#TL-Heavy").show();TL_PageNum=3;break;
        case 4:$("#TL-Destroyer").show();TL_PageNum=4;break;
        case 5:$("#TL-Super").show();TL_PageNum=5;break;
        case 6:$("#TL-MBT").show();TL_PageNum=6;break;
        case 7:$("#TL-Main").show();TL_PageNum=0;break;
        default:$("#TL-Main").show();TL_PageNum=0;break;
    }
    $(window).scroll();
});

/*==================================================*/