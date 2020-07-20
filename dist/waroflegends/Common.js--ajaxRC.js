/* <pre> */

// ==================================================================
// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Copied from the Development Wiki
// Code courtesy of "pcj" of WoWWiki.
//
// http://dev.wikia.com/index.php?title=AjaxRC/code.js
// Last revision: July 2010
// ==================================================================

ajaxPages = new Array("Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Forum:Legends_Pavilion");

var indicator = 'https://images.wikia.nocookie.net/__cb20100614115522/central/images/2/28/Ajaxloader.gif';
var ajaxTimer;
var ajaxRefresh = 300000; // 300 seconds or 5 minutes
var refreshText = 'AJAX';
var refreshHover = 'Enable auto-refreshing page loads';
var doRefresh = true;

if (typeof AjaxRCRefreshText == "string") {
    refreshText = AjaxRCRefreshText;
}
if (typeof AjaxRCRefreshHoverText == "string") {
    refreshHover = AjaxRCRefreshHoverText;
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function preloadAJAXRL() {
    ajaxRLCookie = (getCookie("ajaxload-" + wgPageName) == "on") ? true : false;
    $(".firstHeading").append('&nbsp;<span style="font-size:xx-small; border-bottom:1px dotted; cursor:help;" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" id="ajaxToggle"><span style="display:none;" id="ajaxLoadProgress"><img src="' + indicator + '" border="0" alt="AJAX operation in progress" /></span>');
    $("#ajaxLoadProgress").bind("ajaxSend", function () {
        $(this).show();
    }).bind("ajaxComplete", function () {
        $(this).hide();
    });
    $("#ajaxToggle").click(toggleAjaxReload);
    $("#ajaxToggle").attr("checked", ajaxRLCookie);
    if (getCookie("ajaxload-" + wgPageName) == "on") loadPageData();
}

function toggleAjaxReload() {
    if ($("#ajaxToggle").attr("checked") == true) {
        setCookie("ajaxload-" + wgPageName, "on", 30);
        doRefresh = true;
        loadPageData();
    } else {
        setCookie("ajaxload-" + wgPageName, "off", 30);
        doRefresh = false;
        clearTimeout(ajaxTimer);
    }
}

function loadPageData() {
    $("#bodyContent").load(location.href + " #bodyContent", function (data) {
        $("#bodyContent").trigger("ajaxPageLoad");
        if (doRefresh) ajaxTimer = setTimeout("loadPageData();", ajaxRefresh);
    });
}

$(document).ready(function() {
    for (x in ajaxPages) {
        if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length == 0 && wgAction == "view") preloadAJAXRL();
    }
});

/* </pre> */