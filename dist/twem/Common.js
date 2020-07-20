/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function() {
setInterval(colorChange, 1000);
$(".hpWelcome").siblings().css("display", "none");
$(".hpWelcome").css("display", "block");
number = $(".TWEMTab:last-child").index() + 1;
sliderWidth = 100 / number;
$(".Slider").css("width", sliderWidth + "%");
    $(".TWEMTab").click(function(event) {
        event.preventDefault();
        var tabClass = $(this).attr("id");
        $(tabClass).siblings().css("display", "none");
        $(tabClass).fadeIn();
        tabSection = $(this).index();
        totalTabs = $(".TWEMTab:last-child").index() + 1;
        tabNumber = (tabSection / totalTabs) * 100;
        $(".Slider").css("left", tabNumber + "%");
    });
});
 
function colorChange() {
red = Math.floor((Math.random() * 255) + 0);
green = Math.floor((Math.random() * 255) + 0);
blue = Math.floor((Math.random() * 255) + 0);
color = "rgb(" + red + "," + green + "," + blue + ")";
$(".ColorChange").css("background-color", color + "!important");
}

$(function(){
$("#WikiaArticle").prepend('<div class="TWEMBanner"><div class="TWEMBannerText" id="TWEMText1"></div></div>');
    setInterval(bringOut, 12000);
});
 
function bringOut() {
    var memes = [
'<div class="TWEMBannerText" id="TWEMText1"></div>', 
'<div class="TWEMBannerText" id="TWEMText2"></div>', 
'<div class="TWEMBannerText" id="TWEMText3"></div>',
'<div class="TWEMBannerText" id="TWEMText4"></div>', 
'<div class="TWEMBannerText" id="TWEMText5"></div>', 
'<div class="TWEMBannerText" id="TWEMText6"></div>', 
'<div class="TWEMBannerText" id="TWEMText7"></div>', 
'<div class="TWEMBannerText" id="TWEMText8"></div>', 
'<div class="TWEMBannerText" id="TWEMText9"></div>', 
'<div class="TWEMBannerText" id="TWEMText10"></div>'
    ];
 
    $(".TWEMBanner").html(memes[Math.floor((Math.random() * 20) + 0)]);
    $(".TWEMBannerText").delay(1000).fadeIn();
    $(".TWEMBannerText").delay(10000).fadeOut();
}