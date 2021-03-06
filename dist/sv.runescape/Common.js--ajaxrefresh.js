/* <pre> */

/*
 * ADVANCED AJAX AUTO-REFRESHING ARTICLES
 * Code courtesy of "pcj" of Wowpedia.
 */

var indicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif';

if (!window.ajaxPages) ajaxPages = new Array("Special:RecentChanges");

var ajaxTimer;
var ajaxRefresh = 60000;
var refreshText = 'AJAX';

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
    appTo.append('&nbsp;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><label for="ajaxToggle" style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="Enable auto-refreshing page loads">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + indicator + '" style="vertical-align: baseline;" border="0" alt="AJAX operation in progress" /></label></span>');
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

/* </pre> */