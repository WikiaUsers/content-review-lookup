// Copied from https://valnirrok.gamepedia.com/MediaWiki:Common.js
// default setting to turn tooltips on
var tooltipsOn = true;

var $tfb;
var activeHoverLink = null;
var tipCache = [];

// hides the tooltip
function hideTip() {
  $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
  activeHoverLink = null;
}

// displays the tooltip
function displayTip(e) {
  $tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
  moveTip(e);
  $tfb.not(":empty").css("visibility","visible");
  moveTip(e);
}

// moves the tooltip
function moveTip(e) {
  $ct = $tfb.not(":empty");
  var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($ct.innerHeight()+20):20);
  var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($ct.innerWidth()+20):20);
  $ct.css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}

// AJAX tooltips
function showTip(e) {
  var $t=$(this);
  activeHoverLink = $t;
  var $a=$t.find('.ttlink').parent();
  if ($a.html() == null)
    $a=$t.find(">:first-child");
  var $i=$t.find('.ttlinkicon').parent();
  if ($a.hasClass("selflink")==false) {
    $t.removeAttr("title");
    if($a != null)
      $a.removeAttr("title");
    if($i != null)
      $i.removeAttr("title");
    var url = "/index.php?title="+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"&action=render .tooltip-content";
    if (tipCache[url] != null) {
      $tfb.html(tipCache[url]);
      displayTip(e);
      return;
    }
    $tfb.load(url,function () {
      if ($t != activeHoverLink) return;
      if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
      $tfb.find(".tooltip-content").css("display","");
      tipCache[url] = $tfb.html();
      displayTip(e);
    });
  }
}

function bindTT() {
  var $t=$(this);
  var $a=$t.find('.ttlink').parent();
  if ($a.html() == null)
    $a=$t.find(">:first-child");
  if ($a.hasClass("selflink") == false) {
    $t.data("tt", $a.attr("title").replace(" (page does not exist)","").replace("?","%3F")).hover(showTip,hideTip).mousemove(moveTip);
  }
}

// check to see if it is active then do it
function ttMouseOver() {
  if (tooltipsOn) {
    $('body').append('<div id="tfb" class="htt"></div>');
    $tfb = $("#tfb");
    $('.ajaxttlink').each(bindTT);
  }
}

$(ttMouseOver);