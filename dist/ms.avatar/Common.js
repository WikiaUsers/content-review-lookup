////**** jQuery Collapsible Tables (Dantman) ****////

importScriptPage('ShowHide/code.js', 'dev');

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

 /** Title rewrite ********************************************************
  * Rewrites the page's title, used by [[Template:Title]]
  * By [[User:Sikon|Sikon]]
  */
 
 function rewriteTitle()
 {
    if(typeof(SKIP_TITLE_REWRITE) != 'undefined' && SKIP_TITLE_REWRITE)
        return;
 
    var titleDiv = document.getElementById('title-meta');
 
    if(titleDiv == null || titleDiv == undefined)
        return;
 
    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = YAHOO.util.Dom.getElementsByClassName('firstHeading', 'h1', document.getElementById('content') )[0];
    var node = firstHeading.childNodes[0];
 
    // new, then old!
    firstHeading.replaceChild(cloneNode, node);
    cloneNode.style.display = "inline";
 
    var titleAlign = document.getElementById('title-align');
    firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
 }
 
 addOnloadHook(rewriteTitle, false);

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADVANCED AUTO REFRESHING RECENT CHANGES AND WATCHLIST
// Code courtesy of "pcj" of WoWWiki.

// WHAT IT DOES
// The code adds a checkbox at the top of Special:RecentChanges and Special:Watchlist, next to the header.
// Ticking this sets a cookie (specific to each wiki) and starts updating the list.
// This occurs silently every 60 seconds without a full page reload occurring.

///////////////////////////////////////////////////////////////////////////////////////////////////////////


ajaxPages = new Array("Special:RecentChanges", "Special:Watchlist", "Special:Log");

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
var rcRefresh = 60000;
function preloadAJAXRC() {
if (skin == "monaco") {
s = 1;
} else {
s = 0;
}
ajaxRCCookie = (getCookie("ajaxload-"+wgPageName)=="on") ? true:false;
document.getElementsByTagName("h1")[0].innerHTML += '&nbsp;<span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Enable auto-refreshing page loads">AUTO-REFRESH:</span><input type="checkbox" id="ajaxRCtoggle" onClick="toggleRC();">';
document.getElementById("ajaxRCtoggle").checked = ajaxRCCookie;
if (getCookie("ajaxload-"+wgPageName)=="on") loadRCData();
}

function toggleRC() {
if (document.getElementById("ajaxRCtoggle").checked == true) {
setCookie("ajaxload-"+wgPageName, "on", 30);
loadRCData();
} else {
setCookie("ajaxload-"+wgPageName, "off", 30);
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

for (x in ajaxPages) {
if (wgPageName == ajaxPages[x]) addOnloadHook(preloadAJAXRC);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// END OF CODE

///////////////////////////////////////////////////////////////////////////////////////////////////////////

//**************************************************
//Twitter Widget originally by LordTBT, FIXED by Joeyaa 2009
//**************************************************
//Licensed under GNU
/*
<div class="Twitter" style="width:290px; height:350px;">
[http://www.twitter.com/ Twitter]
</div>

You can modify the width, height and href to fit the width, height and location of the movie.
 */
function playTwitter(){
	var divs = document.getElementById('bodyContent').getElementsByTagName('div');
	var twobjcode = '';
	if (window.ActiveXObject){ // IE
		twobjcode += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"  width="{width}" height="{height}" id="TwitterWidget" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0" align="middle">';
	}else{
		twobjcode += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"  width="{width}" height="{height}" id="TwitterWidget" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0" align="middle">';
	}
	twobjcode += '<param name="movie" value="http://static.twitter.com/flash/widgets/profile/TwitterWidget.swf" /><param value="always" name="allowScriptAccess"><param value="false" name="allowFullScreen"><param value="high" name="quality"><param value="#000000" name="bgcolor"><param value="userID=44832025&styleURL=http://static.twitter.com/flash/widgets/profile/revo.xml" name="flashvars"><embed src="http://static.twitter.com/flash/widgets/profile/TwitterWidget.swf" quality="high" bgcolor="#000000" width="{width}" height="{height}" name="TwitterWidget" align="middle" allowScriptAccess="sameDomain" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" FlashVars="userID=44832025&styleURL=http://static.twitter.com/flash/widgets/profile/revo.xml"/></object>';
	for (var i = 0; i < divs.length; i++){
		if ((' Twitter ').indexOf(' '+divs[i].className+' ') != -1){
			try{
				var twdiv = divs[i];
				var width = twdiv.style.width.replace('px','');
				var height = twdiv.style.width.replace('px','');
				var src = twdiv.getElementsByTagName('a')[0].href;
                                var movie = twobjcode.replace(/\{width\}/g,width).replace(/\{height\}/g,height).replace(/\{src\}/g,src);
				twdiv.innerHTML = movie;
			}catch(e){};
		}
	}
}

addOnloadHook(playTwitter);

//**************************************************
//END
//**************************************************