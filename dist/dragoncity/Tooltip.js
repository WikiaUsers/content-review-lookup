<script type="text/javascript">

$('th#h-elemental').append($( "span#Elemental_Dragons.mw-headline" ).parent());
$('th#h-hybrid').append($( "span#Hybrid_Dragons.mw-headline" ).parent());
$('th#h-rare_hybrid').append($( "span#Rare_Hybrid_Dragons.mw-headline" ).parent());
$('th#h-legend').append($( "span#Legend_Dragons.mw-headline" ).parent());
$('th#h-exclusive').append($( "span#Exclusive_Dragons.mw-headline" ).parent());
$('th#h-exclusive_elemental').append($( "span#Exclusive_Elemental_Dragons.mw-headline" ).parent());
$('th#h-exclusive_hybrid').append($( "span#Exclusive_Hybrid_Dragons.mw-headline" ).parent());
$('th#h-exclusive_rare_hybrid').append($( "span#Exclusive_Rare_Hybrid_Dragons.mw-headline" ).parent());

// This tooltip code was written by Pcj
 
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
  if(skin=='oasis') { var BC = '#WikiaArticle'; }
  else { var BC = '#bodyContent'; }
 
  $(BC).mouseover(hideTip);
  $(BC).append('<div id="tfb" class="htt"></div>');
  $tfb = $("#tfb");
  $(BC + " span.ajaxttlink").each(bindTT);
});

</script>