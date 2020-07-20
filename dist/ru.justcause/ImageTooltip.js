// Этот код подсказки был написан Pcj
// Адаптировано под Warframe Wikia CristiMirt и после этого адаптировано под Just Cause вики Shadow of the Corporation eDEN (Вот такая интересная длинная история)

var $tfb;

// скрыть подсказку
function hideTip() {
$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
}

// показать подсказку
function displayTip(e) {
$tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
moveTip(e);
$tfb.not(":empty").css("visibility","visible");
}

// переместить подсказку
function moveTip(e) {
var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($tfb.not(".hidden").innerHeight()+20):20);
var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($tfb.not(".hidden").innerWidth()+20):20);
$tfb.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}

// AJAX подсказки
function showTip(e) {
$t=$(this);
//$p=$t.parent();
if ($t.hasClass("selflink")===false) {
$t.removeAttr("title");
//$p.removeAttr("title");
$tfb.load("/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render table.infobox td.image a",function () {
//$tfb.html('<div class="tooltip-content">' + $tfb.html().closest('tr').find('.image').text() + '</div>');    
if ($tfb.html() === "") $tfb.html('<div class="tooltip-content no-tooltip"><b>Ошибка</b><br />Этот объект не имеет не одной всплывающей подсказки<br />или не была установлена.</div>');
$tfb.find(".tooltip-content").css("display","");
displayTip(e);
});
}
}

function bindTT() {
$t=$(this);
//$p=$t.parent();
if ($t.hasClass("selflink") === false) $t.data("tt", $t.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}

// проверьте, активен ли он, затем сделайте это
$(function() {
  var BC;
  if(skin=='oasis') { BC = '.WikiaSiteWrapper'; }
  else { BC = '#bodyContent'; }
  $(BC).mouseover(hideTip);
  $(BC).append('<div id="tfb" class="htt"></div>');
  $tfb = $("#tfb");
  $(BC + " span.ajaxttlink a").each(bindTT);
});