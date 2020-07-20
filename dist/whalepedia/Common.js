/* Any JavaScript here will be loaded for all users on every page load. */

 // ***************************************
 // * Code for the Halo 4 Countdown Timer *
 // * Template by User:Halo4master        *
 // * Code credit to its original author, Splarka  *
 // ***************************************
 
    function updatetimer(i) {
        var now = new Date();
        var then = timers[i].eventdate;
        var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);
 
        // catch bad date strings
        if (isNaN(diff)) {
            timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
            return;
        }
 
        // determine plus/minus
        if (diff < 0) {
            diff = -diff;
            var tpm = 'T plus ';
        } else {
            var tpm = 'Only ';
        }
 
        // calcuate the diff
        var left = (diff % 60) + ' seconds';
        diff = Math.floor(diff / 60);
        if (diff > 0) left = (diff % 60) + ' minutes ' + left;
        diff = Math.floor(diff / 60);
        if (diff > 0) left = (diff % 24) + ' hours ' + left;
        diff = Math.floor(diff / 24);
        if (diff > 0) left = diff + ' days ' + left
        timers[i].firstChild.nodeValue = tpm + left;
 
        // a setInterval() is more efficient, but calling setTimeout()
        // makes errors break the script rather than infinitely recurse
        timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
    }
 
    function checktimers() {
        //hide 'nocountdown' and show 'countdown'
        var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
        for (var i in nocountdowns) nocountdowns[i].style.display = 'none'
        var countdowns = getElementsByClassName(document, 'span', 'countdown');
        for (var i in countdowns) countdowns[i].style.display = 'inline'
 
        //set up global objects timers and timeouts.
        timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
        timeouts = new Array(); // generic holder for the timeouts, global
        if (timers.length == 0) return;
        for (var i in timers) {
            timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
            updatetimer(i); //start it up
        }
    }
    addOnloadHook(checktimers);
 
 // End for Halo 4 Countdown code

// Code courtesy of "pcj" of WoWpedia. Updated by Grunny of Wookiepedia for Oasis.
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////
 
var indicator = 'https://images.wikia.nocookie.net/__cb20100617113125/dev/images/8/82/Facebook_throbber.gif';
if (!window.ajaxPages) ajaxPages = new Array("Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:NewFiles");
var ajaxTimer;
var ajaxRefresh = 60000;
var refreshText = 'Automatically refresh';
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
var refreshHover = 'Enable auto-refreshing page loads';
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}
var doRefresh = true;
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
 
function preloadAJAXRL() {
ajaxRLCookie = (getCookie("ajaxload-"+wgPageName)=="on") ? true:false;
appTo = ($("#WikiaPageHeader").length)?$("#WikiaPageHeader"):$(".firstHeading");
appTo.append(' <span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + indicator + '" style="vertical-align: baseline;" border="0" alt="AJAX operation in progress" /></span></span>');
$("#ajaxLoadProgress").bind("ajaxSend", function (){
$(this).show();
}).bind("ajaxComplete", function (){
$(this).hide();
});
$("#ajaxToggle").click(toggleAjaxReload);
$("#ajaxToggle").attr("checked", ajaxRLCookie);
if (getCookie("ajaxload-"+wgPageName)=="on") loadPageData();
}
 
function toggleAjaxReload() {
if ($("#ajaxToggle").attr("checked") == true) {
setCookie("ajaxload-"+wgPageName, "on", 30);
doRefresh = true;
loadPageData();
} else {
setCookie("ajaxload-"+wgPageName, "off", 30);
doRefresh = false;
clearTimeout(ajaxTimer);
}
}
 
function loadPageData() {
cC = ($("#WikiaArticle").length)?"#WikiaArticle":"#bodyContent";
$(cC).load(location.href + " " + cC, function (data) { 
$(cC).trigger("ajaxPageLoad");
if (doRefresh) ajaxTimer = setTimeout("loadPageData();", ajaxRefresh);
});
}
 
$(function () { 
for (x in ajaxPages) {
if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) preloadAJAXRL();
}
});
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////
 
// END OF AJAX AUTO-REFRESH
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////