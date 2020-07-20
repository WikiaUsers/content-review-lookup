/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* Brizingr5: WeaponInfobox */
var WeaponInfobox_x = false;
 
$('.WeaponInfobox_Parent').mouseenter(function() {
    if(WeaponInfobox_x == false){
         $('.WeaponInfobox_Collapsible').css('height', '24px');
    }
});
 
$('.WeaponInfobox_Parent').mouseleave(function() {
    if(WeaponInfobox_x == false){
         $('.WeaponInfobox_Collapsible').css('height', '0px');
    }
});
 
$('.WeaponInfobox_Parent').click(function() {
    if(WeaponInfobox_x == false){
         WeaponInfobox_x = true;
         $('.WeaponInfobox_Glow').css('box-shadow', '0 0 10px 4px #5AE4DE');
         return;
    }
    if(WeaponInfobox_x == true){
         WeaponInfobox_x = false;
         $('.WeaponInfobox_Glow').css('box-shadow', '3px 3px 2px 0px black');
         return;
    }
});
/* END Brizingr5: WeaponInfobox */

/* AJAX tooltips begin*/
 
var $tfb;
 
// hides the tooltip
function hideTip() {
$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
}
 
// displays the tooltip
function displayTip(e) {
$tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
moveTip(e);
$tfb.not(":empty").css("visibility","visible");
}
 
// moves the tooltip
function moveTip(e) {
var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($tfb.not(".hidden").innerHeight()+20):20);
var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($tfb.not(".hidden").innerWidth()+20):20);
$tfb.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}
 
// AJAX tooltips
function showTip(e) {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink")==false) {
$t.removeAttr("title");
$p.removeAttr("title");
$tfb.load("/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content",function () {
if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
$tfb.find(".tooltip-content").css("display","");
displayTip(e);
});
}
}
 
function bindTT() {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink") == false) $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}
 
// check to see if it is active then do it
$(function() {
$("#bodyContent").mouseover(hideTip);
$("#bodyContent").append('<div id="tfb" class="htt"></div>');
$tfb = $("#tfb");
$("#bodyContent span.ajaxttlink").each(bindTT);
});

/********Proyecto Wam 09.03.2018 **********/
window.railWAM = {
    logPage:"Project:WAM Log"
};