/* Any JavaScript here will be loaded for all users on every page load. */
/* Table edit button hack */
if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png",
     "speedTip": "Insert a table",
     "tagOpen": '{| class="wikitable"\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"};
}
/* <pre> <nowiki> */

/* Title Hack */
function rewriteTitle()
{
   if(typeof(SKIP_TITLE_REWRITE) != 'undefined' && SKIP_TITLE_REWRITE)
       return;

   var titleDiv = document.getElementById('title-meta');

   if(titleDiv == null || titleDiv == undefined)
       return;

   var cloneNode = titleDiv.cloneNode(true);
   var firstHeading = getElementsByClass('firstHeading', document.getElementById('content'), 'h1')[0];
   var node = firstHeading.childNodes[0];

   // new, then old!
   firstHeading.replaceChild(cloneNode, node);
   cloneNode.style.display = "inline";

   var titleAlign = document.getElementById('title-align');
   firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}
addOnloadHook(rewriteTitle, false);
addOnloadHook(UserNameReplace);

function UserNameReplace() {
if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace) return;
   for(var i=0; UserName = document.getElementsByTagName("span")[i]; i++) {
       if ((document.getElementById('pt-userpage'))&&(UserName.getAttribute('id') == "insertusername")) {
           UserName.innerHTML = wgUserName;
       }
   }
}

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}
/* </nowiki> </pre> */

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADVANCED AUTOMATICALLY REFRESHING RECENT CHANGES AND WATCHLIST JAVASCRIPT
// Code courtesy of "pcj" of WoWWiki.
// Source: http://www.wikia.com/wiki/User:Kirkburn/global.js

// INDIVIDUAL USE
// This is a modified version of the WoWWiki site-wide version.
// This version is designed for Special:Mypage/global.js use.

// WIKI-WIDE USE
// If you add it to a wiki's MediaWiki:Common.js it *should* work - however, this is untested.
// It should not conflict with your own global.js (though you will see two tickboxes)

// WHAT IT DOES
// The code adds a checkbox at the top of Special:RecentChanges and Special:Watchlist, next to the header.
// Ticking this sets a cookie (specific to each wiki) and starts updating the list.
// This occurs silently every 60 seconds without a full page reload occurring.

///////////////////////////////////////////////////////////////////////////////////////////////////////////


ajaxPages="Special:RecentChanges,Special:Watchlist,Special:NewPages,Special:NewImages";

function setCookie(c_name,value,expiredays) {
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function getCookie(c_name) {
if (document.cookie.length>0) {
c_start=document.cookie.indexOf(c_name + "=")
if (c_start!=-1) { 
c_start=c_start + c_name.length+1 
c_end=document.cookie.indexOf(";",c_start)
if (c_end==-1) c_end=document.cookie.length
return unescape(document.cookie.substring(c_start,c_end))
} 
}
return ""
}

function getXmlHttpRequestObject() {
if (window.XMLHttpRequest) {
return new XMLHttpRequest(); //Not Internet Explorer
} else if(window.ActiveXObject) {
return new ActiveXObject("Microsoft.XMLHTTP"); //Internet Explorer
} else {
//fail silently
}
}
getRCDataRO = getXmlHttpRequestObject();
var cr = new RegExp("\r", "gm");
var lf = new RegExp("\n", "gm");
var endText = new RegExp('</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "mi");
var rcTimer;
var rcRefresh = 10000;
function preloadAJAXRC() {
if (skin == "monaco") {
s = 1;
} else {
s = 0;
}
ajaxRCCookie = (getCookie("ajaxload-"+wgPageName)=="on") ? true:false;
document.getElementsByTagName("h1")[0].innerHTML += '&nbsp;<span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Enable auto-refreshing page loads">AJAX:</span><input type="checkbox" id="ajaxRCtoggle" checked="checked" onClick="toggleRC();">';
document.getElementById("ajaxRCtoggle").checked = ajaxRCCookie;
if (getCookie("ajaxload-"+wgPageName)=="on") loadRCData();
}

function toggleRC() {
if (document.getElementById("ajaxRCtoggle").checked == true) {
setCookie("ajaxload-"+wgPageName, "on", 10);
loadRCData();
} else {
setCookie("ajaxload-"+wgPageName, "off", 10);
clearTimeout(rcTimer);
}
}

function loadRCData() {
if (getRCDataRO.readyState == 4 || getRCDataRO.readyState == 0) {
if (location.href.indexOf("/wiki/")) {
rcURL = "http://" + location.hostname + "/wiki/" + wgPageName + location.search;
} else {
rcURL = "http://" + location.hostname + "/" + wgPageName + location.search;
}
getRCDataRO.open("GET", rcURL, true);
getRCDataRO.onreadystatechange = parseRCdata;
getRCDataRO.send(null);
}
}

function parseRCdata() {
if (getRCDataRO.readyState == 4) {
textFilter = new RegExp('<div id="bodyContent">.*?</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "i");
rawRCdata = getRCDataRO.responseText.replace(cr, "").replace(lf, "");
filteredRCdata = textFilter.exec(rawRCdata);
updatedText = filteredRCdata[0].replace('<div id="bodyContent">', "").replace(endText, "");
document.getElementById("bodyContent").innerHTML = updatedText;
rcTimer = setTimeout("loadRCData();", rcRefresh);
}
}

if (ajaxPages.indexOf(wgPageName)!=-1) addOnloadHook(preloadAJAXRC);

/** Username replace function ([[template:USERNAME]]) *******************************
  * Inserts user name into <span class="insertusername"></span>
  * Originally by [[wikia:User:Splarka|Splarka]]
  * New version by [[User:Spang|Spang]]
  */
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    var n = YAHOO.util.Dom.getElementsByClassName('insertusername', 'span', document.getElementById('bodyContent'));
    for ( var x in n ) {
       n[x].innerHTML = wgUserName;
    }
 }
 addOnloadHook(UserNameReplace);


///////////////////////////////////////////////////////////////////////////////////////////////////////////

// END OF AJAX CODE

///////////////////////////////////////////////////////////////////////////////////////


/* Per-skin CSS hack. Note that the resulting names will be lower-case: e.g. MediaWiki:monaco_gaming.css */

function fowAddThemedCSS() {
  if (typeof(themename) != "undefined") {
    var cssref=document.createElement('link');
    cssref.setAttribute("rel", "stylesheet");
    cssref.setAttribute("type", "text/css");
    cssref.setAttribute("href", "http://funorb.wikia.com/index.php?title=MediaWiki:"+skin+"_"+themename+".css&action=raw&ctype=text/css");
    document.getElementsByTagName("head")[0].appendChild(cssref);
  }
}
addOnloadHook(fowAddThemedCSS);

/* Dungeon Assault probability calculator */
if (wgPageName == "Dungeon_Assault/Probabilities") {
  var fileref=document.createElement('script');
  fileref.setAttribute("type","text/javascript");
  fileref.setAttribute("src", "http://funorb.wikia.com/index.php?title=FunOrb Wiki:DACalc.js&action=raw&ctype=text/javascript");
  document.getElementsByTagName("head")[0].appendChild(fileref);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Sortable achievement tables. "sortkey" parameter must be fed to Infobox achievement. */

function fowAchTableSort() {
  var results = document.evaluate("id('Ach_OrderHeader')/a", document, null, XPathResult.ANY_TYPE, null);
  var aResult;
  if (aResult = results.iterateNext()) {
    aResult.onclick();
    return aResult;
  }
  return null;
}

function fowAchTableSortSetup() {
  var defaultOrderIt = document.evaluate("id('fowDefaultOrderBtn')", document, null, XPathResult.ANY_TYPE, null);
  if (defaultOrderIt.iterateNext()) return;

  var aResult = fowAchTableSort();
  if (aResult) {
    var tbl = aResult;
    while (tbl.nodeName.toLowerCase() != "table") {
      tbl = tbl.parentNode;
      if (tbl == null) return;
    }
    var p = document.createElement('p');
    p.appendChild(document.createTextNode('['));
    var btn = document.createElement('a');
    btn.setAttribute("id", "fowDefaultOrderBtn");
    btn.setAttribute("onclick", "fowAchTableSort();return false;");
    btn.setAttribute("href", "#");
    btn.appendChild(document.createTextNode("Default order"));
    p.appendChild(btn);
    p.appendChild(document.createTextNode(']'));
    tbl.parentNode.insertBefore(p, tbl);
  }
}
addOnloadHook(fowAchTableSortSetup);

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