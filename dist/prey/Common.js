/* ######################################################################## */
/* ### AJAX RC                                                          ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Automatically refresh "Recent changes" via AJAX     ### */
/* ### Credit:      User:pcj (http://www.wowpedia.org)                  ### */
/* ###              User:Porter21 (fallout.wikia.com)                   ### */
/* ######################################################################## */

var indicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif';
var ajaxPages = new Array("Special:RecentChanges", "Special:WikiActivity", "Prey Wiki:WikiActivity");
var ajaxTimer;
var ajaxRefresh = 60000;
var refreshText = 'Auto-refresh';
if (typeof AjaxRCRefreshText == "string") {
    refreshText = AjaxRCRefreshText;
}
var refreshHover = 'Enable auto-refreshing page loads';
if (typeof AjaxRCRefreshHoverText == "string") {
    refreshHover = AjaxRCRefreshHoverText;
}
var doRefresh = true;

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
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
    appTo = ($('#WikiaPageHeader').length) ? $('#WikiaPageHeader') : ($('#AdminDashboardHeader').length ? $('#AdminDashboardHeader > h1') : $('.firstHeading'));
    appTo.append(' <span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + indicator + '" style="vertical-align: baseline;" border="0" alt="Refreshing page" /></span></span>');
    $("#ajaxLoadProgress").ajaxSend(function(event, xhr, settings) {
        if (location.href == settings.url) $(this).show();
    }).ajaxComplete(function(event, xhr, settings) {
        if (location.href == settings.url) $(this).hide();
    });
    $("#ajaxToggle").click(toggleAjaxReload);
    $("#ajaxToggle").attr("checked", ajaxRLCookie);
    if (getCookie("ajaxload-" + wgPageName) == "on") loadPageData();
}

function toggleAjaxReload() {
    if ($("#ajaxToggle").prop("checked") === true) {
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
    cC = ($("#WikiaArticle").length) ? "#WikiaArticle" : "#bodyContent";
    $(cC).load(location.href + " " + cC + " > *", function(data) {
        if (doRefresh) ajaxTimer = setTimeout("loadPageData();", ajaxRefresh);
    });
}
addOnloadHook(function() {
    for (var x in ajaxPages) {
        if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length === 0) preloadAJAXRL()
    }
});

// ================================================================
// BEGIN - Collapsible tables
//  *  Description: Allows tables to be collapsed
//     showing only the header. See [[Wikipedia:NavFrame]].
//  *  Maintainers: [[User:R. Koot]]
// ================================================================

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);

    if (!Table || !Button) {
        return false;
    }

    var Rows = Table.getElementsByTagName("tr");

    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");

    for (var i = 0; i < Tables.length; i++) {
        if ($(Tables[i]).hasClass("collapsible")) {
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

            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);

            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));

            var Header = Tables[i].getElementsByTagName("tr")[0].getElementsByTagName("th")[0];
            /* only add button and increment count if there is a header row to work with */
            if (Header) {
                Header.insertBefore(Button, Header.childNodes[0]);
                tableIndex++;
            }
        }
    }

    for (var i = 0; i < tableIndex; i++) {
        if ($(NavigationBoxes[i]).hasClass("collapsed") || (tableIndex >= autoCollapse && $(NavigationBoxes[i]).hasClass("autocollapse"))) {
            collapseTable(i);
        }
    }
}

addOnloadHook(createCollapseButtons);