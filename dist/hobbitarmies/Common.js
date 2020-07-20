/* Any JavaScript here will be loaded for all users on every page load. */

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
mw.loader.using( ['jquery.ui.tabs'], function() {
$(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );



/* Test if an element has a certain class **************************************
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();



/************************/
/* tooltip: by Kirkburn */
/************************/
//ttBgStyle = "background: transparent url(picture.png);";
var ttBgStyle = "background-color:transparent;";
var ttHTMLStart = '<div style="font-size:1em; width: auto; max-width:20em; ' + ttBgStyle + '">';

// Empty variables to hold the mouse position and the window size
var mousePos = null;
var winSize = null;

function mouseMove(ev) {
  if (ev) {
    if (ev.clientX) var mouseX = ev.clientX;
    if (ev.clientY) var mouseY = ev.clientY;
  } else if (typeof(window.event) != "undefined") {
    var mouseX = window.event.clientX;
    var mouseY = window.event.clientY;
  }
  mousePos = {x:mouseX, y:mouseY};
}

function getDBC() {
  dbc = new Array();
  docBase = document.documentElement || document.body;
  dbc[0] = docBase.clientWidth || 0;
  dbc[1] = docBase.clientHeight || 0;
  return dbc;
}

function getDBS() {
  dbs = new Array();
  docBase = document.documentElement || document.body;
  dbs[0] = docBase.scrollLeft || 0;
  dbs[1] = docBase.scrollTop || 0;
  return dbs;
}

// The windowResize function keeps track of the window size for us
function windowResize() {
  dbC = getDBC();
  winSize = {x:(dbC[0])? dbC[0]:window.innerWidth, y:(dbC[1])? dbC[1]:window.innerHeight}
}
windowResize();

// Set events to catch mouse position and window size
document.onmousemove = mouseMove;
window.onresize = windowResize;

// displays the tooltip
function displayTip() {
  var tip = document.getElementById("simpletfb");
  tip.style.position = "absolute";
  tip.style.visibility = "hidden";
  tip.style.display = "block";
  tip.style.zIndex = "999";
  moveTip();
  tip.style.visibility = "visible";
}

// This function moves the tooltips when our mouse moves
function moveTip() {
  skinAdjust = new Array();
  dbS = getDBS();
  tip = document.getElementById("simpletfb");
  var showTTAtTop   = mousePos.y > (winSize.y / 2);
  var showTTAtLeft  = mousePos.x > (winSize.x / 2);
  var newTop  = mousePos.y + (showTTAtTop  ? - (tip.clientHeight + 20) : 20);
  var newLeft = mousePos.x + (showTTAtLeft ? - (tip.clientWidth  + 20) : 20);
  tip.style.position = 'fixed';
  tip.style.top = newTop + "px";
  tip.style.left = newLeft + "px";
}

// hides the tip
function hideTip() {
  var tip = document.getElementById("simpletfb");
  if (typeof(tip.style) == "undefined") return false;
  $(tip).html("");
  tip.style.display = "none";
}

// quick tooltips
function showTemplateTip(i) {
  var Tip = document.getElementById("tttc" + i);
  tooltip = ttHTMLStart + Tip.innerHTML + '</div>';
  document.getElementById("simpletfb").innerHTML = tooltip;
  displayTip();
}

function performTooltips() {
  var contentstart = document.getElementById("bodyContent") ? document.getElementById("bodyContent") : document.getElementById("WikiaArticle");
  qttfdiv = document.createElement("div");
  qttfdiv.setAttribute("id", "simpletfb");
  contentstart.insertBefore(qttfdiv, contentstart.childNodes[0]);
  var Spans = document.getElementsByTagName("span");
  for (i=0;i<Spans.length;i++) {
    if (hasClass(Spans[i], "ttlink")) {
      Spans[i].nextSibling.setAttribute("id", "tttc" + i);
      Spans[i].firstChild.setAttribute("title", "");
      Spans[i].onmouseover = showTemplateTip.bind(Spans[i],i);
      Spans[i].onmouseout = hideTip;
      Spans[i].onmousemove = moveTip;
    }
  }
}

var tooltips = true;
function loadTooltips() {
if (tooltips) performTooltips();
}
addOnloadHook(loadTooltips);