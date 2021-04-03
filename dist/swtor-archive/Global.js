importScriptPage('AjaxRC/code.js', 'dev');
 
// See [[Help:Tooltips]]
// default setting to turn tooltips on
var tooltipsOn = true;
 
// allow users to specify an external db to change links to
var extDB = "http://swtor.wikia.com/";
 
var $tfb;
var $ttfb;
var $htt;
 
// hides the tooltip
function hideTip() {
  $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
}
 
// displays the tooltip
function displayTip(e) {
  $htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
  moveTip(e);
  $htt.not(":empty").css("visibility","visible");
}
 
// moves the tooltip
function moveTip(e) {
  var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($htt.not(".hidden").innerHeight()+20):20);
  var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($htt.not(".hidden").innerWidth()+20):20);
  $htt.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}
 
// AJAX tooltips
function showTip(e) {
  $t=$(this);
  $p=$t.parent();
  if ($p.hasClass("selflink")==false)
  {
    $t.removeAttr("title");
    $p.removeAttr("title");
    $tfb.load("/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content",
    function ()
    {
      if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
      $tfb.find(".tooltip-content").css("display","");
      displayTip(e);
    });
  }
}
 
// quick tooltips
function hideTemplateTip() {
  $ttfb.html("").removeClass("tooltip-ready").addClass("hidden"); 
}
 
function showTemplateTip(e) {
  $ttfb.html('<div class="tooltip-content">' + $(this).next().html() + '</div>');
  displayTip(e);
}
 
// add the tooltip calls to the page
function eLink(db,nm) {
  dbs = new Array("http://www.torhead.com/search/","http://db.darthhater.com/search.aspx?search_text=", "http://knotor.com/search?q=");
  dbTs = new Array("TORHead","DARTHHATERDB", "KnoTOR");
  dbHs = new Array("T ","D ","K ");
  el = '<a href="'+ dbs[db]+nm + '" target="_blank" title="'+ dbTs[db] +'">' + dbHs[db] + '</a>';
  return el;
}
 
function bindTT() {
  $t=$(this);
  $p=$t.parent();
  if ($p.hasClass("selflink") == false) {
    $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
    if ($p.hasClass("new")) {
      els = '<sup><span class="plainlinks fromCommon">';
      //y=($t.hasClass("itemlink"))?0:1;
      //z=($t.hasClass("codexlink"))?1:2;
      for (x=0;x<2;x++) els += eLink(x,$t.data("tt").replace("Mission:",""));
      $p.after(els+'</span></sup>');
    }
    if (extDB != "http://swtor.wikia.com/")
    { 
      fullextURL = extDB + $t.data("tt");
      $p.attr("href",fullextURL);
    }
  }
}
 
// check to see if it is active then do it
function ttMouseOver(foo) {
  if (tooltipsOn && getCookie("wiki-tiploader") != "no") {
    $("#WikiaArticle").mouseover(hideTip);
    $("#WikiaArticle").append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"><div>');
    $tfb = $("#tfb");
    $ttfb = $("#templatetfb");
    $htt = $("#tfb,#templatetfb");
    if(foo==1){
      $("#WikiaArticle span.ajaxttlink").each(bindTT);
    }
    $("#WikiaArticle span.tttemplatelink").mouseover(showTemplateTip).mouseout(hideTemplateTip).mousemove(moveTip);
  }
}
 
$(function(){
  ttMouseOver(1);
});