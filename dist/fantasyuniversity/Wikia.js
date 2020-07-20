/* add contribs to user menu - 2/1/11 */

function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">Contributions</a></li>');
}
  
addOnloadHook(UserContribsMenuItem);

/* change publish to save and rename to move */ 
function PublishToSave() { $('#wpSave').attr('value','Save changes'); $('a[data-id="move"]').html('Move'); }
addOnloadHook(PublishToSave);

function ImagesOnWiki() {

$('.LatestPhotosModule details span.fixedwidth').html('Wikia Images');

}

addOnloadHook(ImagesOnWiki);

PurgeButtonText = 'Cache purge';
importScriptPage('PurgeButton/code.js', 'dev');


// Prompt for an edit summary when clicking a rollback link
 
addOnloadHook(function () {
    var serverRe = wgServer.replace(/([^A-Za-z0-9_])/g, "\\$1"); 
    var scriptRe = wgScript.replace(/([^A-Za-z0-9_])/g, "\\$1"); 
    var rollbackRe = new RegExp ("^(" + serverRe + ")?" + scriptRe + "\\?([^#]*&)?action=rollback(&|$)");
    var promptSummary = function () {
        var summary = prompt("Enter rollback summary (or leave as \"default\" to use default summary):", "default");
        if (summary == null || summary == "") return false;
        if (summary == "default") return true;
        this.href = this.href.replace("?", "?summary=" + encodeURIComponent(summary) + "&");
        return true;
    };
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        if (rollbackRe.test(links[i].href)) links[i].onclick = promptSummary;
    }
});


importScriptPage('Countdown/code.js', 'dev')

// AJAX RC
var ajaxPages = new Array("Special:RecentChanges");
var ajaxRCOverride = false;
var rcTimer;
var doRefresh = true;
var rcRefresh = 60000;
ajaxRCCookie = (getCookie("ajaxRC")=="on"||ajaxRCOverride) ? true:false;

function ajaxRC() {
appTo = ($("#WikiaPageHeader").length)?$("#WikiaPageHeader"):$(".firstHeading");
appTo.append('&nbsp;<span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Enable auto-refreshing page loads">AJAX:</span><input type="checkbox" id="ajaxToggle"><span style="position:relative; top:5px; left:5px;" id="ajaxRCprogress"><img src="https://images.wikia.nocookie.net/__cb20080505054258/wowwiki/images/0/0e/Progressbar.gif" border="0" alt="AJAX operation in progress" /></span>');
$("#ajaxRCprogress").bind("ajaxSend", function (){
$(this).show();
}).bind("ajaxComplete", function (){
$(this).hide();
});
$("#ajaxToggle").click(toggleRC);
$("#ajaxRCprogress").hide();
$("#ajaxToggle").attr("checked", ajaxRCCookie);
if (ajaxRCCookie) loadRCData();
}

function toggleRC() {
if ($("#ajaxToggle").attr("checked") == true) {
setCookie("ajaxRC", "on", 30);
doRefresh = true;
loadRCData();
} else {
setCookie("ajaxRC", "off", 30);
doRefresh = false;
clearTimeout(rcTimer);
}
}

function loadRCData() {
cC = ($("#WikiaArticle").length)?"#WikiaArticle":"#bodyContent";
$(cC).load(location.href + " "+cC, function (data) { 
if (doRefresh) rcTimer = setTimeout("loadRCData();", rcRefresh);
});
}

importScriptPage('DupImageList/code.js', 'dev');