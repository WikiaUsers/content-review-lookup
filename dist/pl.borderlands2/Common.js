/* Any JavaScript here will be loaded for all users on every page load. */
var DOCHEAD = document.getElementsByTagName('HEAD')[0];

function createElement(tag,children,props){
var element = document.createElement(tag);
if (!(children instanceof Array)) children=[children];
for(var i=0;i<children.length;i++){
var child=children[i];
if (typeof child=='string') child=document.createTextNode(child);
if (child) element.appendChild(child);
}
if (typeof props=='object') {
for(var k in props){
switch (k) {
case 'styles':
var styles=props.styles;
for (var s in styles) element.style[s]=styles[s];
break;
case 'events':
var events=props.events;
for (var e in events) addHandler(element,e,events[e]);
break;
case 'class':
element.className=props[k];
break;
default:
element.setAttribute(k,props[k]);
}
}
}
return element;
}

function insertCSS(page) {
insertExternalCSS(wgScriptPath + '/index.php?title=' + encodeURIComponent(page.replace(/ /g, '_')) + '&action=raw&ctype=text/css');
}

function insertExternalCSS(sheetURL) {
var styleElem = document.createElement('style');
styleElem.setAttribute('type','text/css');
try {
styleElem.appendChild( document.createTextNode('@import "' + sheetURL + '";'));
} catch (el){ // a hack to fix problem with Internet Explorer
document.createStyleSheet(sheetURL);
}
DOCHEAD.appendChild(styleElem);
}

document.write('<script type="text/javascript" src="' + '/index.php?title=MediaWiki:Functions.js&action=raw&ctype=text/javascript&smaxage=18000"></script>');

// BEGIN Dynamic Navigation Bars (experimental) Script taken from Wikipedia.
// Test if an element has a certain class
// Description: Uses regular expressions and caching for better performance.

function setCookie(c_name,value,expiredays) {
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function getCookie(c_name) {
if (document.cookie.length>0) {
c_start=document.cookie.indexOf(c_name + "=");
if (c_start!=-1) { 
c_start=c_start + c_name.length+1;
c_end=document.cookie.indexOf(";",c_start);
if (c_end==-1) c_end=document.cookie.length;
return unescape(document.cookie.substring(c_start,c_end));
}
}
return "";
}

var hasClass = (function () {
var reCache = {};
return function (element, className) {
return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
};
})();
 
var autoCollapse = 2;
var collapseCaption = "ukryj";
var expandCaption = "pokaż";
 
function collapseTable(tableIndex) {
var Button = document.getElementById("collapseButton" + tableIndex);
var Table = document.getElementById("collapsibleTable" + tableIndex);
if (!Table || !Button) return false;
var Rows = Table.rows;
if (Button.firstChild.data == collapseCaption) {
for (var i = 1; i < Rows.length; i++) Rows[i].style.display = "none";
setCookie("hideTable-" + wgArticleId + "-" + tableIndex,1,30);
Button.firstChild.data = expandCaption;
} else {
for (var i = 1; i < Rows.length; i++) Rows[i].style.display = Rows[0].style.display;
setCookie("hideTable-" + wgArticleId + "-" + tableIndex,0,30);  
Button.firstChild.data = collapseCaption;
}
}
 
function createCollapseButtons() {
var tableIndex = 0;
var NavigationBoxes = new Object();
var Tables = document.getElementsByTagName("table");
for (var i = 0; i < Tables.length; i++) {
if (hasClass(Tables[i], "collapsible")) {
// only add button and increment count if there is a header row to work with
var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
if (!HeaderRow) continue;
var Header = HeaderRow.getElementsByTagName("th")[0];
if (!Header) continue;
NavigationBoxes[tableIndex] = Tables[i];
Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
var Button = document.createElement("span");
var ButtonLink = document.createElement("a");
var ButtonText = document.createTextNode(collapseCaption);
Button.style.styleFloat = "right";
Button.style.cssFloat = "right";
Button.style.fontWeight = "normal";
Button.style.textAlign = "right";
Button.style.width = "6em";
ButtonLink.style.color = Header.style.color;
ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
ButtonLink.appendChild(ButtonText);
Button.appendChild(document.createTextNode("["));
Button.appendChild(ButtonLink);
Button.appendChild(document.createTextNode("]"));
Header.insertBefore(Button, Header.childNodes[0]);
tableIndex++;
}
}
 
for (var i = 0; i < tableIndex; i++) {
if (hasClass(NavigationBoxes[i], "collapsed") || (getCookie("hideTable-" + wgArticleId + "-" + i) == 1) || (tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse"))) collapseTable(i);
}
}

addOnloadHook(createCollapseButtons);


// Dynamic Navigation Bars
// Description: See [[Wikipedia:NavFrame]].
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// shows and hides content and picture (if available) of navigation bars
// Parameter: indexNavigationBar: the index of navigation bar to be toggled

function toggleNavigationBar(indexNavigationBar) {
var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
if (!NavFrame || !NavToggle) return false; 

for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
if (hasClass(NavChild, 'NavPic')) NavChild.style.display = (NavToggle.firstChild.data == NavigationBarHide)?'none':'block';
if (hasClass(NavChild, 'NavContent')) NavChild.style.display = (NavToggle.firstChild.data == NavigationBarHide)?'none':'block';
}
NavToggle.firstChild.data = (NavToggle.firstChild.data == NavigationBarHide)?NavigationBarShow:NavigationBarHide;
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
var indexNavigationBar = 0;
// iterate over all < div >-elements 
var divs = document.getElementsByTagName("div");
for (var i=0; NavFrame = divs[i]; i++) {
// if found a navigation bar
if (hasClass(NavFrame, "NavFrame")) {
indexNavigationBar++;
var NavToggle = document.createElement("a");
NavToggle.className = 'NavToggle';
NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
var NavToggleText = document.createTextNode(NavigationBarHide);
for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) {
if (NavChild.style.display == 'none') {
NavToggleText = document.createTextNode(NavigationBarShow);
break;
}
}
}
NavToggle.appendChild(NavToggleText);
// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
for (var j=0; j < NavFrame.childNodes.length; j++) {
if (hasClass(NavFrame.childNodes[j], "NavHead")) NavFrame.childNodes[j].appendChild(NavToggle);
}
NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
}
}
}
 
addOnloadHook( createNavigationBarToggleButton );

// tooltips
if (getCookie("wiki-tiploader") != "no") document.write('<scr'+'ipt type="text/javascript" src="http://borderlands.wikia.com/index.php?title=MediaWiki:Tooltips.js&action=raw&ctype=text/javascript&dontcountme=s&smaxage=18000"></scr'+'ipt>');

// edit summaries
// function fillEditSummaries() {
// var label = document.getElementById("wpSummaryLabel");
// if (label == null) return;
// var comboString = "Standard summaries: <select id='stdSummaries' onchange='onStdSummaryChange()'>";
// comboString += "</select><br />";
// label.innerHTML = comboString + label.innerHTML;
// requestComboFill('stdSummaries', 'Template:Stdsummaries');
// }
// 
// function onStdSummaryChange() {
// var combo = document.getElementById("stdSummaries");
// var value = combo.options[combo.selectedIndex].value;
// if (value != "") document.getElementById("wpSummary").value = value;
// }
// 
// addOnloadHook(fillEditSummaries);

// extract a URL parameter from the current URL
// From wikipedia:User:Lupin/autoedit.js
// paramName  : the name of the parameter to extract

function getParamValue(paramName) {
var cmdRe=RegExp( '[&?]' + paramName + '=([^&]*)' );
var h = document.location.href;
var m=cmdRe.exec(h);
if (m) {
try {
return decodeURIComponent(m[1]);
} catch (someError) {}
}
return null;
}

// &withJS= URL parameter
// Allow to try custom scripts on the MediaWiki namespace without
// editing [[Special:Mypage/myskin.js]]
// from Wikipedia

{
var extraJS = getParamValue("withJS");
if (extraJS) importScript(extraJS);
}

// patching in changes to table sorting and alt rows
function changeTS() {
window['ts_alternate'] = function (table) {
var tableBodies = table.getElementsByTagName("tbody");
for (var i = 0; i < tableBodies.length; i++) {
var tableRows = tableBodies[i].getElementsByTagName("tr");
for (var j = 0; j < tableRows.length; j++) {
var oldClasses = tableRows[j].className.split(" ");
var newClassName = "";
for (var k = 0; k < oldClasses.length; k++) {
if (oldClasses[k] != "" && oldClasses[k] != "alt") newClassName += oldClasses[k] + " ";
}
tableRows[j].className = newClassName + (j%2 == 0?"alt":"");
}
}
}
}

addOnloadHook(changeTS);

// add scribblemap processing
function wwScribbleMaps() {
divs = $("div.wwSM");
for (x=0;x<divs.length;x++) {
mapID = divs.eq(x).attr("class").replace("wwSM map-","");
if (mapID.length > 20) mapID = "";
divs.eq(x).html('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="550" height="400" id="smwidget" align="middle"><param name="allowFullScreen" value="true" /><param name="FlashVars" value="id='+mapID+'&p=true&mt=false&d=true&z=true" /><param name="movie" value="http://widgets.scribblemaps.com/wowsmwidget.swf"/><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><embed src="http://widgets.scribblemaps.com/wowsmwidget.swf" FlashVars="id='+mapID+'&p=true&mt=false&d=true&z=true" "quality="high" bgcolor="#000000" width="550" height="400" name="smwidget" align="middle" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>');
}
}
addOnloadHook(wwScribbleMaps);

// turn off useravatar log spam in RecentChanges
function noRCUA() {
$("ul.special>li:has(a[href*='Special:Log/useravatar'])").hide();
}
addOnloadHook(noRCUA);

/** Username replace function ([[template:USERNAME]]) *******************************
  * Inserts user name into <span class="insertusername"></span>
  * Originally by [[wikia:User:Splarka|Splarka]]
  * New version by [[User:Spang|Spang]]
  */
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

$(function() {
	var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-bl&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
});
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

/*
 * ADVANCED AJAX AUTO-REFRESHING ARTICLES 
 */

/* Import from the Developers Wiki */

importScriptPage('AjaxRC/code.js', 'dev');

/* Additional variables */

ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:Watchlist"];

var ajaxRefresh = 30000;

AjaxRCRefreshText = 'Auto-Refresh';

AjaxRCRefreshHoverText = 'Enable auto-refreshing of this page';

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************