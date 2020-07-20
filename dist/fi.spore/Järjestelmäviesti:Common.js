/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
  }

  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's Common.js.
  */
 
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();

/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Taken from Wikipedia's Common.js.
  */
 
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.rows;
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
 
             /* only add button and increment count if there is a header row to work with */
             var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
             if (!HeaderRow) continue;
             var Header = HeaderRow.getElementsByTagName( "th" )[0];
             if (!Header) continue;
 
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             Header.insertBefore( Button, Header.childNodes[0] );
             tableIndex++;
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
 addOnloadHook( createCollapseButtons );
 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Taken from Wikipedia's Common.js.
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
 
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
 
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             for (
                  var NavChild = NavFrame.firstChild;
                  NavChild != null;
                  NavChild = NavChild.nextSibling
                 ) {
                 if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                     if (NavChild.style.display == 'none') {
                         NavToggleText = document.createTextNode(NavigationBarShow);
                         break;
                     }
                 }
             }
 
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
  }
 
  addOnloadHook( createNavigationBarToggleButton );

/////////////////////////////
// HOVER TOOLTIPS
// Credit: pcj (wowwiki)
////////////////////////////
var contentstart;

//ttBgStyle = "background: transparent url(picture.png);";
var ttBgStyle = "background-color:black;";
var ttHTMLStart = '<div style="font-size:1em; width: auto; max-width:20em; ' + ttBgStyle + '">';

var hasClass = (function () {
var reCache = {};
return function (element, className) {
return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
};
})();

// prototype functions
function $A(a) {
var r = [];
for (var i = 0, len = a.length; i < len; ++i) r.push(a[i]);
return r;
}

Function.prototype.bind = function() {
var __method = this, args = $A(arguments), object = args.shift();
return function() { return __method.apply(object, args.concat($A(arguments))) };
}

// Empty variables to hold the mouse position and the window size
var mousePos = null;
var winSize = null;

// Set events to catch mouse position and window size
document.onmousemove = mouseMove;
window.onresize = windowResize;

// The mouseMove and mouseCoords function track the mouse position for us
function mouseMove(ev) {
ev = ev || window.event;
mousePos = mouseCoords(ev);
}

function mouseCoords(ev) {
if (ev.pageX || ev.pageY) return {x:ev.pageX, y:ev.pageY};
dbS = getDBS();
return {x:ev.clientX + dbS[0], y:ev.clientY + dbS[1]};
}

function getDBC() {
dbc = new Array();
docBase = document.documentElement || document.body;
dbc[0] = docBase.clientWidth || 0;
dbc[1] = docBase.clientHeight || 0;
return dbc;
}

// The windowResize function keeps track of the window size for us
function windowResize() {
dbC = getDBC();
winSize = {x:(dbC[0])? dbC[0]:window.innerWidth, y:(dbC[1])? dbC[1]:window.innerHeight}
}

windowResize();

function getDBS() {
dbs = new Array();
docBase = document.documentElement || document.body;
dbs[0] = docBase.scrollLeft || 0;
dbs[1] = docBase.scrollTop || 0;
return dbs;
}

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
var newTop = mousePos.y - (tip.clientHeight + 40);
skinAdjust[0] = (tip.clientWidth / 1.5);
skinAdjust[1] = (tip.clientWidth > 300)?(1.5 * tip.clientWidth):(2 * tip.clientWidth);
var newLeft = mousePos.x - skinAdjust[0];
if ((newTop < dbS[1]) || (document.getElementById("adSpace0") && (mousePos.y - tip.clientHeight - 200) < 0)) { 
newTop = mousePos.y + 1;
if (newTop + tip.clientHeight > winSize.y) newTop = dbS[1]; 
}
if (newLeft < dbS[0]) newLeft = dbS[0];
if ((mousePos.x + skinAdjust[0]) >= winSize.x - 150) newLeft = mousePos.x - skinAdjust[1];
tip.style.top = newTop + "px";
tip.style.left = newLeft + "px";
}

// hides the tip
function hideTip() {
var tip = document.getElementById("simpletfb");
if (typeof(tip.style) == "undefined") return false;
tip.innerHTML = "";
tip.style.display = "none";
}

// quick tooltips
function showTemplateTip(i) {
var Span = document.getElementById("tttc" + i);
tooltip = ttHTMLStart + Span.innerHTML + '</div>';
document.getElementById("simpletfb").innerHTML = tooltip;
displayTip();
}

function performTooltips() {
contentstart = document.getElementById("bodyContent");
qttfdiv = document.createElement("div");
qttfdiv.setAttribute("id", "simpletfb");
contentstart.insertBefore(qttfdiv, contentstart.childNodes[0]);
var Spans = document.getElementsByTagName("div");
for (i=0;i<Spans.length;i++) {
if (hasClass(Spans[i], "ttlink")) {
Spans[i].nextSibling.setAttribute("id", "tttc" + i);
Spans[i].onmouseover = showTemplateTip.bind(Spans[i],i);
Spans[i].onmouseout = hideTip;
Spans[i].onmousemove = moveTip;
}
}
}

tooltips = true;
function loadTooltips() {
if (tooltips) performTooltips();
}

addOnloadHook(loadTooltips);
// portal switch
var pspans;
var cTab = 1;
function doPortals() {
tabs = document.getElementById("mptabs");
if (tabs) {
pspans = tabs.getElementsByTagName("span");
for (x=0;x<pspans.length;x++) {
if (pspans[x].className == "activetab" || pspans[x].className == "inactivetab") {
pspans[x].parentNode.onclick = switchTab.bind(pspans[x].parentNode,x/2);
if (pspans[x].parentNode.tagName.toLowerCase() == "a") { 
pspans[x].parentNode.setAttribute("href", "javascript:;"); 
} else {
pspans[x].parentNode.style.cursor = "pointer";
}
if (pspans[x].className == "activetab") cTab = (x/2)+1;
}
}
}
}
function switchTab(x) {
pspans[2*(cTab-1)].className = "inactivetab";
document.getElementById("portal"+cTab).style.display = "none";
cTab = x+1;
pspans[2*x].className = "activetab";
document.getElementById("portal"+cTab).style.display = "";
}


/* </pre> */