/**************************************************************************************

* This 'MediaWiki:Common.js' will be loaded via import as 'site.php', at the *top* of
the page in the actual html 'header'. Contents will load before Wikia contents.

* The 'MediaWiki:Wikia.js' will be loaded via import as 'site.js', at the very *top* of
the page still in the html 'header'.

* The 'importArticles' will be loaded via import as 'load.php', at the very bottom of
the page.

* All files will be checked and minified nearly the same.

* I believe this wiki is pretty set in using one theme, simi-permanently. The 'Common'
is supposed to be theme agnostic, and 'Wikia' is supposed to be theme sensitive and
guaranteed to be last by being at the bottom, to affect state after common and theme have
been applied during client page load. There are significant performance considerations in
just how and where things are place, and WoWWiki is way behind the curve for the moment,
so please be aware :) more later...

***************************************************************************************/

/* TOC fix */
/*Written By Icecreamcaekbot*/
$('<br />').insertBefore('#toc-wrapper');  // need to lessen the number of unchecked DOM searches on load. can use CSS for this
$('<br />').insertAfter('#toc-wrapper');

/*AjaxRC*/
var ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20080505054258/wowwiki/images/0/0e/Progressbar.gif';

// Import Scripts
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:Countdown/code.js',
        'MediaWiki:FloatingToc/code.js',
        'u:dev:InactiveUsers/code.js', // MediaWiki:Wikia.js/userRightsIcons.js appears to override
        'MediaWiki:Wikiaapp.js',
        'MediaWiki:Common.js/Map-Lightbox-Dev.js',
        'MediaWiki:Wikia.js/userRightsIcons.js',
    ]
});


/* Make Wowhead 3D model viewer button links open a new tab when clicked. */
$('a[href*="modelviewer"]').attr({
    target: '_blank'
});

// collapsible tables
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

function collapseTable(i) {
    var Button = $("#collapseButton" + i);
    var Table = $("#collapsibleTable" + i);
    if (Table.length < 1 || Button.length < 1) return false;
    if (Button.text() == collapseCaption) {
        Table.find("tr").not(":has('#collapseButton" + i + "')").hide();
        setCookie("hideTable-" + wgArticleId + "-" + i, 1, 30);
        Button.text(expandCaption);
    } else {
        Table.find("tr").not(":has('#collapseButton" + i + "')").show();
        setCookie("hideTable-" + wgArticleId + "-" + i, 0, 30);
        Button.text(collapseCaption);
    }
}

function createCollapseButtons() {
    var tch = $("table.collapsible tr th:last-child");
    tch.each(function (i) {
        $(this).closest("table").attr("id", "collapsibleTable" + i);
        $(this).prepend('<span style="float:right; font-weight:normal; text-align:right; width:6em">[<a href="javascript:collapseTable(' + i + ');" style="color:' + $(this).css("color") + ';" id="collapseButton' + i + '">' + collapseCaption + '</a>]</span>');
        if ($(this).closest("table").hasClass("collapsed") || (getCookie("hideTable-" + wgArticleId + "-" + i) == 1) || (tch.length >= autoCollapse && $(this).closest("table").hasClass("autocollapse"))) collapseTable(i);
    });
}

var nbh = '[' + collapseCaption + ']';
var nbs = '[' + expandCaption + ']';

function toggleNavigationBar(i) {
    var NavToggle = $("#NavToggle" + i);
    var NavFrame = $("#NavFrame" + i);
    if (NavFrame.length < 1 || NavToggle.length < 1) return false;
    ncd = (NavToggle.text() == nbh) ? 'none' : 'block';
    NavFrame.children(".NavPic,.NavContent").css("display", ncd);
    nct = (NavToggle.text() == nbh) ? nbs : nbh;
    NavToggle.text(nct);
}

// adds show/hide-button to navigation bars

function createNavigationBarToggleButton() {
    $("div.NavFrame").each(function (i) {
        NavToggleText = ($(this).children(".NavPic:visible,.NavContent:visible").length > 0) ? nbh : nbs;
        $(this).children(".NavHead").append('<a href="javascript:toggleNavigationBar(' + i + ');" id="NavToggle' + i + '" class="NavToggle">' + NavToggleText + '</a>');
        $(this).attr("id", "NavFrame" + i);
    });
}

// extract a URL parameter from the current URL
// From wikipedia:User:Lupin/autoedit.js
// paramName  : the name of the parameter to extract

function getParamValue(paramName) {
    var cmdRe = RegExp('[&?]' + paramName + '=([^&]*)');
    var h = document.location.href;
    var m = cmdRe.exec(h);
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
        $(table).find("tbody").find("tr:odd").removeClass("alt");
        $(table).find("tbody").find("tr:even").addClass("alt");
    }
    window['ts_makeSortable'] = function (table) {
        if ($(table).find("tr").length > 0) firstRow = ($(table).find("th").length > 0) ? $(table).find("tr:has(th)").eq(0) : $(table).find("tr").eq(0);
        if (!firstRow) return;
        firstRow.children(":not('.unsortable')").append('&nbsp;&nbsp;<a href="javascript:;" class="sortheader" onclick="ts_resortTable(this); return false;"><span class="sortarrow"><img src="' + ts_image_path + ts_image_none + '" alt="&darr;"/></span></a>');
        if (ts_alternate_row_colors) ts_alternate(table);
    }
}

function requireImageLicense() {
    if (wgPageName == "Special:Upload" && getParamValue("wpDestFile") == null) {
        $wpu = $("#mw-upload-form").find("[name=wpUpload]").not("#wpUpload");
        $wpu.attr("disabled", "true");
        $("#wpLicense").change(function () {
            if ($("#wpLicense").val()) {
                $wpu.removeAttr("disabled");
            } else {
                $wpu.attr("disabled", "true");
            }
        });
    }
}

function sortDays(a, b) {
    return b.substring(b.indexOf(";") + 1) - a.substring(a.indexOf(";") + 1);
}

function loadGSList() {
    if ($("#gslist").length > 0) {
        var timestamp = 0;
        var today = new Date();
        var tsDate = new Date();
        var dateRE = /(\d{4})-(\d\d)-(\d\d).*/;
        var pArr = new Array();
        $.getJSON("http://www.wowwiki.com/api.php?action=query&generator=categorymembers&gcmlimit=500&gcmsort=timestamp&gcmdir=desc&gcmtitle=Category:Guild_stubs&prop=revisions&rvprop=timestamp&format=json&callback=?", function (data) {
            if (data.query) {
                pages = data.query.pages;
                for (pageID in pages) {
                    timestamp = pages[pageID].revisions[0].timestamp;
                    dateREd = dateRE.exec(timestamp);
                    tsDate.setFullYear(dateREd[1], dateREd[2] - 1, dateREd[3]);
                    daysElapsed = Math.round((today - tsDate) / 86400000);
                    pArr[pArr.length] = pages[pageID].title + ";" + daysElapsed;
                }
                pArr2 = pArr.sort(sortDays);
                gslBuffer = "<ul>";
                for (n in pArr2) {
                    guild = pArr2[n].substring(0, pArr2[n].indexOf(";"));
                    daysE = pArr2[n].substring(pArr2[n].indexOf(";") + 1);
                    daysE = (daysE < 0) ? 0 : daysE;
                    daysE = (daysE > 29) ? '<span style="color:red;">(' + daysE + ' days)</span>' : '(' + daysE + ' days)';
                    gslBuffer += '<li><a href="/' + guild + '" title="' + guild + '">' + guild + '</a> ' + daysE + ' - <a href="/' + guild + '?action=history">History</a> &bull; <a href="/' + guild + '?action=delete">Delete</a></li>';
                }
                gslBuffer += "</ul>";
                $("#gslist").html(gslBuffer);
            }
        });
    }
}

/* this has been inactive since the original set of wmp 'lite' templates. --celess22
// portal switch
var ptabs;

function doPortals() {
    cTab = $("#mptabs>strong").prevAll().length + 1;
    ptabs = $("#mptabs>*");
    ptabs.css("cursor", "pointer");
    ptabs.click(function (event) {
        event.preventDefault();
        target = $(event.target);
        if (target.parent().not("#mptabs").html()) target = target.parent();
        sp = target.prevAll().length;
        ptabs.eq(cTab - 1).children("*").removeClass("activetab").addClass("inactivetab");
        $("#portal" + cTab).hide();
        cTab = sp + 1;
        ptabs.eq(sp).children("*").removeClass("inactivetab").addClass("activetab");
        $("#portal" + cTab).show();
    });
}
*/

dil = new Array();

function findDupImages(gf) {
    output = "";
    url = "/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json";
    if (gf) url += "&gaifrom=" + gf;
    $.getJSON(url, function (data) {
        if (data.query) {
            pages = data.query.pages;
            for (pageID in pages) {
                dils = "," + dil.join();
                if (dils.indexOf("," + pages[pageID].title) == -1 && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles) {
                    output += "<h3><a href='/" + pages[pageID].title + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";
                    for (x = 0; x < pages[pageID].duplicatefiles.length; x++) {
                        output += "<li><a href='/File:" + pages[pageID].duplicatefiles[x].name + "'>File:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
                        dil.push("File:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
                    }
                    output += "</ul>\n\n"
                }
            }
            $("#mw-dupimages").append(output);
            if (data["query-continue"]) setTimeout("findDupImages('" + data["query-continue"].allimages.gaifrom + "');", 5000);
        }
    });
}


$(function () {
/*
    if (wgAction == "view" && wgArticleId == 0 && wgNamespaceNumber == 0 && document.referrer.indexOf("search") == -1) document.location = "/Special:Search?search=" + wgTitle;
*/
    // Part of AJAX RC
    // Comment out when using dev.wikia.com version
    //for (x in ajaxPages) { if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) ajaxRC(); }

    /* this has been inactive since the original set of wmp 'lite' templates. --celess22
    if (wgCanonicalNamespace == "Portal") doPortals();
    */

    createCollapseButtons();
    createNavigationBarToggleButton();
    changeTS();
    requireImageLicense();
    loadGSList();
    if ($("#mw-dupimages").length) findDupImages();
    if (wgUserName != null) $("span.insertusername").html(wgUserName);
    $(".mw-mpt-link").html("<a href='/Special:WhatLinksHere/" + $(".firstHeading").text().replace("Move ", "").replace(/'/g, "%27") + "'>Links to the old page title</a>");
});

/* *****************************************************************
    NO LONGER APPLICABLE

//FIXME: make sure then remove

    All below are duplicates, until you get to another message like this.

// auto-zebra stripe for tables
function zebraStripe() {
    if ($("table.zebra > tbody > tr").eq(1).css("background-color") == "transparent" && $("table.zebra > tbody > tr").eq(2).css("background-color") == "transparent") {
        $("table.zebra > tbody > tr:nth-child(2n+1)").not(".nozebra").css("background-color", "#2c2c2c");
        $(".sortheader").bind("click", function () {
            $("table.zebra > tbody > tr").not(".nozebra").css("background-color", "transparent");
            $("table.zebra > tbody > tr:nth-child(2n+1)").not(".nozebra").css("background-color", "#2c2c2c");
        });
    }
}

// See [[Help:Tooltips]]
// default setting to turn tooltips on
var tooltipsOn = true;

// allow users to specify an external db to change links to
var extDB = "http://www.wowwiki.com/";

var $tfb;
var $ttfb;
var $htt;

// hides the tooltip

function hideTip() {
    $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
}

// displays the tooltip

function displayTip(e) {
    $htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
    moveTip(e);
    $htt.not(":empty").css("visibility", "visible");
}

// moves the tooltip

function moveTip(e) {
    var newTop = e.clientY + ((e.clientY > ($(window).height() / 2)) ? -($htt.not(".hidden").innerHeight() + 20) : 20);
    var newLeft = e.clientX + ((e.clientX > ($(window).width() / 2)) ? -($htt.not(".hidden").innerWidth() + 20) : 20);
    $htt.not(".hidden").css({
        "position": "fixed",
        "top": newTop + "px",
        "left": newLeft + "px"
    });
}

// AJAX tooltips

function showTip(e) {
    $t = $(this);
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.removeAttr("title");
        $p.removeAttr("title");
        $tfb.load("/" + $t.data("tt").replace(/ /g, "_").replace(/\?/g, "%3F") + "?action=render div.tooltip-content", function () {
            if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
            $tfb.find(".tooltip-content").css("display", "");
            displayTip(e);
        });
    }
}

// quick tooltips

function hideTemplateTip() {
    $ttfb.html("").removeClass("tooltip-ready").addClass("hidden");
}

function showTemplateTip(e) {
    $ttfb.html('<div class="tooltip-content">' + $(this).next().html() + '</div>');
    displayTip(e);
}


    Newer in Wikia.js

// add the tooltip calls to the page
function eLink(db, nm) {
    dbs = new Array("http://us.battle.net/wow/en/search?q=", "http://www.wowhead.com/?search=", "http://db.mmo-champion.com/search/all/");
    dbTs = new Array("Armory", "Wowhead", "DB MMO-Champion");
    dbHs = new Array("&real; ", "&omega; ", "&Delta; ");
    el = '<a href="' + dbs[db] + nm + '" target="_blank" title="' + dbTs[db] + '">' + dbHs[db] + '</a>';
    return el;
}
    Duplicate in Wikia.js
function bindTT() {
    $t = $(this);
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
        if ($p.hasClass("new")) {
            els = '<sup><span class="plainlinks fromCommon">';
            y = ($t.hasClass("itemlink")) ? 0 : 1;
            z = ($t.hasClass("achievementlink")) ? 2 : 3;
            for (x = y; x < z; x++) els += eLink(x, $t.data("tt").replace("Quest:", ""));
            $p.after(els + '</span></sup>');
        }
        if (extDB != "http://www.wowwiki.com/") {
            fullextURL = extDB + $t.data("tt");
            $p.attr("href", fullextURL);
        }
    }
}

 There is no more #bodyContent, was very prior version of Wikia
 Was fixed in Wikia.js version

// check to see if it is active then do it
function ttMouseOver(foo) {
    if (tooltipsOn && getCookie("wiki-tiploader") != "no") {
        $("#bodyContent").mouseover(hideTip);
        $("#bodyContent").append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"><div>');
        $tfb = $("#tfb");
        $ttfb = $("#templatetfb");
        $htt = $("#tfb,#templatetfb");
        if (foo == 1) {
            $("#bodyContent span.ajaxttlink").each(bindTT);
        }
        $("#bodyContent span.tttemplatelink").mouseover(showTemplateTip).mouseout(hideTemplateTip).mousemove(moveTip);
    }
}

 Was fixed in Wikia.js version

// add scribblemap processing
function wwScribbleMaps() {
    $("#bodyContent div.wwSM").each(function () {
        mapID = $(this).attr("class").replace("wwSM map-", "");
        if (mapID.length > 20) mapID = "";
        $(this).html('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="550" height="400" id="smwidget" align="middle"><param name="allowFullScreen" value="true" /><param name="FlashVars" value="id=' + mapID + '&p=true&mt=false&d=true&z=true" /><param name="movie" value="http://widgets.scribblemaps.com/wowsmwidget.swf"/><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><embed src="http://widgets.scribblemaps.com/wowsmwidget.swf" FlashVars="id=' + mapID + '&p=true&mt=false&d=true&z=true" "quality="high" bgcolor="#000000" width="550" height="400" name="smwidget" align="middle" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>');
    });
}

 Was fixed in Wikia.js version. May still need to be removed there

// Long since obsolete with switch to battle.net
function aCharLoad() {
 $("#bodyContent .aChar").each(function () {
    data = $(this).text().split(";");
    realm = data[0];
    loc = (data[1].toLowerCase()=="eu")?"eu":"www";
    character = data[2];
    height = (data[3])?588:444;
    $(this).html('<iframe src="http://'+loc+'.wowarmory.com/character-model-embed.xml?r='+realm+'&amp;cn='+character+'&amp;rhtml=true" scrolling="no" height="'+height+'" width="321" frameborder="0"></iframe>');
 });
 $("#bodyContent .aChar").css("display","block");
}
//

 Was fixed in Wikia.js version.

// AJAX tables
ahClass = new RegExp('class="ajaxHide"', "gim");
crlf = new RegExp("\r\n", "g")

function getTableData(tablePage, tableNum) {
    $("body").bind("ajaxSend", function () {
        $(this).css("cursor", "wait");
    }).bind("ajaxComplete", function () {
        $(this).css("cursor", "auto");
    });
    $.get('http://' + location.hostname + '/' + tablePage + '?action=render', function (data) {
        if (data) {
            data = data.replace(crlf, "").replace(ahClass, 'class="ajaxHide-active"').replace('class="darktable"', "");
            $("#ajaxTable" + tableNum).find("td").eq(0).html(data);
            $("#ajaxTable" + tableNum).find("td").eq(0).find("table.sortable").each(function (i) {
                ts_makeSortable($(this));
                zebraAJAX = $(this).find("tr");
                if (zebraAJAX.eq(2).css("background-color") == "transparent" && zebraAJAX.eq(3).css("background-color") == "transparent") {
                    zebraAJAX.find(".sortheader").click(function () {
                        $("#bodyContent table.zebra > tbody > tr").css("background-color", "transparent");
                        ac = (skin == "monobook") ? "#e9e9ff" : "#2c2c2c";
                        $("#bodyContent table.zebra > tbody > tr:nth-child(2n+1)").css("background-color", ac);
                    });
                }
            });
            zebraAJAX = $("#bodyContent .ajax td > table.zebra > tbody > tr");
            if (zebraAJAX.eq(1).css("background-color") == "transparent" && zebraAJAX.eq(2).css("background-color") == "transparent") {
                $("#bodyContent .ajax td > table.zebra > tbody > tr:nth-child(2n+1)").css("background-color", "#2c2c2c");
                if (skin == "monobook") $("#bodyContent .ajax td > table.zebra > tbody > tr:nth-child(2n+1)").css("background-color", "#e9e9ff");
            }
            $("#stl" + tableNum).html('[<a href="/' + tablePage + '?action=edit">edit</a>]&nbsp;[<a href="javascript:;" id="htl' + tableNum + '" onClick="hideTable(' + tableNum + ');">hide</a>]');
            ttMouseOver(0);
        }
    });
}

 Was fixed in Wikia.js version.
function hideTable(tableNum) {
    $("#ajaxTable" + tableNum).find("tr").eq(1).hide();
    $("#htl" + tableNum).click(function () {
        showTable(tableNum);
    });
    $("#htl" + tableNum).text("show");
}

 Is duplicate. Is in Wikia.js.
function showTable(tableNum) {
    $("#ajaxTable" + tableNum).find("tr").eq(1).show();
    $("#htl" + tableNum).click(function () {
        hideTable(tableNum);
    });
    $("#htl" + tableNum).text("hide");
}

 Is duplicate. Is in Wikia.js.
function loadTableData(tableNum) {
    thisTable = document.getElementById("ajaxTable" + tableNum);
    loadPage = thisTable.className.substring(thisTable.className.indexOf("targetPage-") + 11);
    getTableData(loadPage, tableNum);
}

 Was fixed in Wikia.js version.

function addAjaxDisplayLink() {
    $("#bodyContent table.ajax").each(function (i) {
        $(this).attr("id", "ajaxTable" + i);
        $(this).find("td").eq(1).parent().hide();
        $(this).find("td").eq(0).parent().show();
        if (this.getElementsByTagName("th").length > 0) this.getElementsByTagName("th")[0].innerHTML = '<span style="float:right;" id="stl' + i + '"></span>' + this.getElementsByTagName("th")[0].innerHTML;
        if ($(this).find("td").eq(0).hasClass("showLinkHere")) {
            $(this).find("td").eq(0).html($(this).find("td").eq(0).html().replace("[link]", '<a href="javascript:;" onClick="loadTableData(' + i + ')">').replace("[/link]", "</a>"));
        } else {
            $("#stl" + i).html('[<a href="javascript:;" onClick="loadTableData(' + i + ')">show data</a>]');
        }
    });
}

 Is duplicate. Is in Wikia.js.
function toggleSMWFacts() {
    if ($("#SMWFactToggle").text() == "hide") {
        $("#mw-data-after-content table.smwfacttable tr").hide();
        setCookie("hideSMWFacts", "true");
        $("#SMWFactToggle").text("show");
    } else {
        $("#mw-data-after-content table.smwfacttable tr").show();
        setCookie("hideSMWFacts", "false");
        $("#SMWFactToggle").text("hide");
    }
}

 Was fixed in Wikia.js version.
$(function () {
    zebraStripe();
    if ($("#mw-data-after-content table.smwfacttable tr").length == 0) {
        $("#mw-data-after-content div.smwfact").hide();
    } else {
        $("#mw-data-after-content span.smwrdflink").after('<span style="float:right;">[<a href="javascript:;" onClick="toggleSMWFacts();" id="SMWFactToggle">hide</a>] &nbsp;</span>');
    }
    if (getCookie("hideSMWFacts") == "true") toggleSMWFacts();
    ttMouseOver(1);
    addAjaxDisplayLink();
    wwScribbleMaps();
    aCharLoad();
    $("#bodyContent .quote").prepend("<span class='quotemark' style='float:right;'>&#8221;</span><span class='quotemark' style='float:left;'>&#8220;</span>").css("max-width", "75%").after("<br clear='left' />");
});

    NO LONGER APPLICABLE
***************************************************************** */

/* New Coords template support - by Pecoes */
(function (mw, $) {

    'use strict';

    if (window.sessionStorage && window.sessionStorage.getItem('noMapLinks')) return;

    $(function () {
        var $body = $('body.mediawiki'),
            $window = $(window),

            distance = 20,
            mapWidth = 300,
            mapHeight = 200,
            blip = 'https://images.wikia.nocookie.net/__cb20070820231857/wowwiki/images/f/f4/Blip.png',
            blipWidth = 11,
            blipHeight = 11;

        mw.util.addCSS('\
            .map-img {\
                display: none;\
                position: absolute;\
                width: ' + mapWidth + 'px;\
                height: ' + mapHeight + 'px;\
                z-index: 2147483647;\
                margin: 0;\
            }\
            .map-img.map-img-show {\
                display: block;\
            }\
            .map-img-blip {\
                position: relative;\
                background-image: url("' + blip + '");\
                width: ' + blipWidth + 'px;\
                height: ' + blipHeight + 'px;\
                margin-left: -' + blipWidth / 2 + 'px;\
                margin-top: -' + blipHeight / 2 + 'px;\
            }\
            .map-img.map-img-left {\
                margin-left: ' + distance + 'px;\
            }\
            .map-img.map-img-right {\
                margin-left: -' + (mapWidth + distance) + 'px;\
            }\
            .map-img.map-img-bottom {\
                margin-top: ' + distance + 'px;\
            }\
            .map-img.map-img-top{\
                margin-top: -' + (mapHeight + distance) + 'px;\
            }\
        ');

        $('.map-link')
            .each(function () {
                var $mapLink = $(this),
                    $magImg = $('<div/>')
                        .appendTo($body)
                        .addClass('map-img')
                        .css('background-image', 'url(' + $mapLink.data('map') + ')')
                        .append(
                            $('<div/>')
                            .addClass('map-img-blip')
                            .css({
                                left: $mapLink.data('left') + '%',
                                top: $mapLink.data('top') + '%',
                            })
                    );
                $mapLink
                    .click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    })
                    .mouseenter(function () {
                        var width = $window.width(),
                            height = $window.height(),
                            scrollLeft = $window.scrollLeft(),
                            scrollTop = $window.scrollTop();
                        $mapLink
                            .on('mousemove', function (e) {
                                $magImg
                                    .css({
                                        left: scrollLeft + e.clientX,
                                        top: scrollTop + e.clientY
                                    })
                                    .removeClass('map-img-left map-img-right map-img-top map-img-bottom')
                                    .addClass(
                                        width - e.clientX > mapWidth + distance ?
                                        'map-img-left' : 'map-img-right'
                                )
                                    .addClass(
                                        height - e.clientY > mapHeight + distance ?
                                        'map-img-bottom' : 'map-img-top'
                                );
                            });
                        $magImg
                            .addClass('map-img-show')
                    })
                    .mouseleave(function () {
                        $mapLink
                            .off('mousemove');
                        $magImg
                            .removeClass('map-img-show map-img-left map-img-right map-img-top map-img-bottom')
                    });
            });
    });
}(mediaWiki, jQuery));