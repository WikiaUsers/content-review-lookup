/* Any JavaScript here will be loaded for all users on every page load. */

/***********************************************************************************

* This 'MediaWiki:Common.js' will be loaded via imported '/site' file, at the *top*
of page in '<head>'. Will load immediately before Wikia.js.

* The 'MediaWiki:Wikia.js' will be loaded via imported '/site' file, at the *top*
of page in '<head>'. Will load immediately after Common.js and before importArticles.

* Common 'importArticles' files will be loaded together via dynamic import as
'/load.php' file, separately appearing at the *bottom* of the page.

* All files will be checked and minified nearly the same.

* 'Common' files are supposed to be theme agnostic, and 'Wikia' files are supposed
to be a part of the default theme and are supposed theme specific. Currently on here,
there is *no* theme specific JS. Please error on the side of placing code in
Common.js rather than Wikia.js. *All* js code should be tolerant of thematic changes
and any degradation on the various devices.

************************************************************************************/

/* ***************************************
     How to Navigate Common.js
   ***************************************

Major section headers look like this:

  *******************************************************************************************

  SECTION   Namespace:File.css

  *******************************************************************************************

There should be several main sections:
1) SECTION Standard Functions - a subset of the standard MediaWiki:Common.js function
2) SECTION Import - code from other files
3) SECTION Extensions - common extensions, or support/fixes for installable ones
4) SECTION Functions - functionality divided-up into functions, that arnt extensions
5) SECTION Startup - code to run on start, page startup event or timer, or inlined

Major startup code is placed here usually calling the 'single use' named functions for each
feature thatneeds to be loaded on page load complete.

*/

/*******************************************************************************************

SECTION  Standard Functions

********************************************************************************************/

function getParamValue(name) {   // Extract a URL parameter. See wikipedia:User:Lupin/autoedit.js
  var regex = RegExp('[&?]' + name + '=([^&]*)');
  var h = document.location.href, m = regex.exec(h);
  if (m) { try { return decodeURIComponent(m[1]); } catch (someError) {} }
  return null;
}

/** name - cookie name, value - 'on' or 'off' or whatever, exdays - expiry of cookie in days */
function setCookie(name, value, exdays) {   // Sets a cookie
  value = name + "=" + escape(value);
  if (exdays !== null) { var d = new Date(); value += ";expires=" + d.setDate(d.getDate() + exdays).toGMTString(); }
  document.cookie = value;
}

/** name - cookie name, @return - cookie or empty string */
function getCookie(name) {    // Gets a cookie
  var c = document.cookie;
  if (c.length > 0) {
    var s = c.indexOf(name + "=");
    if (s !== -1) {
      var e = c.indexOf(";", s = s + name.length + 1);
      return unescape(c.substring(s, (e !== -1) ? e : e = c.length));
    }
  }
  return "";
}

// <IE10 test for bugged wikia right rail code, specifically 'relatedpages'. this is classic horrible fixup
//  must be window, because caller uses 'context.addEventListener'
if (!window.addEventListener) {
  window.addEventListener = window.addEventListener || function (event, callBack) {
    event = (event === "load") ? "onreadystatechange" : "on" + event;
    if (event === "onreadystatechange") {
      callBack.readyStateCheck = callBack.readyStateCheck || function (e) {
        if (self.readyState === "loaded") { callBack(e); }
      };
    }
    this.attachEvent(event, (callBack.readyStateCheck || callBack));
  };
}
if (!window.removeEventListener) {
  window.removeEventListener = window.removeEventListener || function (event, callBack) {
    event = (event === "load") ? "onreadystatechange" : "on" + event;
    this.detachEvent(event, (callBack.readyStateCheck || callBack));
  };
}


/*******************************************************************************************

SECTION  Import

********************************************************************************************/

// needed by AjaxRC before loading script
var ajaxIndicator = 'https://images.wikia.nocookie.net/__cb1/wowwiki/images/0/0e/Progressbar.gif';

// Import Scripts
window.wwImportArticles = {              // allow other code to add imports before committing the list
  type: 'script',
  debug: true,
  articles: [
    'MediaWiki:jquery-ui/jquery.effects.js',  // working version of UI effects. used by 'FloatingToc' and 'SlideShow'
    //'MediaWiki:Test.js',
    'u:dev:MediaWiki:AjaxRC/code.js',                   // intended as common ajax dependency for user extensions, like below
    'MediaWiki:Countdown/code.js',
    'MediaWiki:FloatingToc/code.js',          // popout TOC. static as is used nearly all pages but portals, etc...
    //'MediaWiki:UserTags/inactiveUsers.js',  // MediaWiki:Wikia.js/userRightsIcons.js appears to override, needs merge
    'MediaWiki:Wikiaapp.js',
    'MediaWiki:AjaxTables/code.js',           // ajax driven 'show table'. See 'MediaWiki:AjaxTables'
    'MediaWiki:Map/code.js',                  // on page Map and Map lightbox support
    'MediaWiki:SlideShow/code.js',            // general slide show and rotating banner support See 'Template:Slideshow'
    //'MediaWiki:UserTags/userRightsIcons.js',// puts things like "ADMINISTRATOR" or "CRAZY PERSON" tags on talk pages
    'MediaWiki:UserTags/code.js',             // user tags like "INACTIVE", "ADMINISTRATOR" or "CRAZY PERSON" on talk pages
  ]
};
//if (mw && mw.config && mw.config.set) mw.config.set('debug', true); /* extra debugging facility */

/* Wowhead tooltips */
// As Wikia does not support attributes on links, we need to pass the attribute from a parent span to the child.
// Simply wrap the link ([[Link|Alt]]) in span tags with the "wikia-wowhead-tooltip class, and the "data-rel" attribute which holds the rel the anchor would normally hold. For instance, <span data-rel="gems=23121&amp;ench=2647&amp;pcs=25695:25696:25697" class="wikia-wowhead-tooltip">[[Link|Alt]]</span>
var wowheadLinks = $('.wikia-wowhead-tooltip').length - 1;
$('.wikia-wowhead-tooltip').each(function(index) {
  var rel = $(this).attr('data-rel');
  $('a',this).attr('rel',rel);
  // Once the links are converted, load the Wowhead script
  if (index === wowheadLinks) {
    $.getScript('//static.wowhead.com/widgets/power.js', function() {
      wowhead_tooltips = { "colorlinks": true, "iconizelinks": true, "renamelinks": true };
    });
  }
});

/*******************************************************************************************

SECTION  Extensions

********************************************************************************************/

//****************************************
//****    Tooltips                    ****
//****************************************

// See [[Help:Tooltips]]
// default setting to turn tooltips on
var tooltipsOn = true;

// allow users to specify an external db to change links to
var extDB = "https://www.wowwiki.com/";

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

// add the tooltip calls to the page
function eLink(db, nm) {
  dbs = new Array("https://us.battle.net/wow/en/search?q=", "https://www.wowhead.com/?search=", /*"https://db.mmo-champion.com/search/all/",*/ "https://www.wowdb.com/search?search=");
  dbTs = new Array("Armory", "Wowhead", /*"DB MMO-Champion",*/ "WoWDB");
  dbHs = new Array("&real; ", "&omega; ", /*"&delta; ",*/ "&piv; ");
  el = '<a href="' + dbs[db] + nm + '" target="_blank" title="' + dbTs[db] + '">' + dbHs[db] + '</a>';
  return el;
}

function ttBind() {
  $t = $(this);
  $p = $t.parent();
  if ($p.hasClass("selflink") == false) {
    $t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
    if ($p.hasClass("new")) {
      els = '<sup><span class="plainlinks fromWikia">';
      y = ($t.hasClass("itemlink")) ? 0 : 1;
      z = ($t.hasClass("achievementlink")) ? 3 : 3;
      for (x = y; x < z; x++) els += eLink(x, $t.data("tt").replace("Quest:", ""));
      $p.after(els + '</span></sup>');
    }
    if (extDB != "https://www.wowwiki.com/") {
      fullextURL = extDB + $t.data("tt");
      $p.attr("href", fullextURL);
    }
  }
}

// check to see if it is active then do it
function ttMouseOver(foo) {
  if (tooltipsOn && getCookie("wiki-tiploader") != "no") {
    $("#WikiaArticle").mouseover(hideTip);
    $("#WikiaArticle").append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"><div>');
    $tfb = $("#tfb");
    $ttfb = $("#templatetfb");
    $htt = $("#tfb,#templatetfb");
    if (foo == 1) {
      $("#WikiaArticle span.ajaxttlink").each(ttBind);
    }
    $("#WikiaArticle span.tttemplatelink").mouseover(showTemplateTip).mouseout(hideTemplateTip).mousemove(moveTip);
  }
}

//****************************************
//****    ScribbleMap                 ****
//****************************************
//* BROKEN?

function wwScribbleMaps() {           // see Template:ScribbleMap
  $("#WikiaArticle div.wwSM").each(function () {
    var mapID = $(this).attr("class").replace("wwSM map-", ""), width = $(this).width(), height = $(this).height();
    if (mapID.length > 20) mapID = ""; if (width <= 0) width = 550; if (height <= 0) height = Math.floor(width / 11 * 8);
    $(this).html('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + width + '" height="' + height + '" id="smwidget" align="middle"><param name="allowFullScreen" value="true" /><param name="FlashVars" value="id=' + mapID + '&p=true&mt=false&d=true&z=true" /><param name="movie" value="https://widgets.scribblemaps.com/wowsmwidget.swf"/><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><embed src="https://widgets.scribblemaps.com/wowsmwidget.swf" FlashVars="id=' + mapID + '&p=true&mt=false&d=true&z=true" "quality="high" bgcolor="#000000" width="' + width + '" height="' + height + '" name="smwidget" align="middle" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="https://www.macromedia.com/go/getflashplayer" /></object>');
  });
}

//****************************************
//****    Semantic Mediawiki          ****
//****************************************

// this is pretty much ineffective, as I think there is no more 'mw-data-after-content' id.  i cant find one.
function smwToggleFacts() {
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

// setup for fast on demand init, only if page contains tag
function smwInitPage() {
  if ($("#mw-data-after-content table.smwfacttable tr").length == 0) {
    $("#mw-data-after-content div.smwfact").hide();
  } else {
    $("#mw-data-after-content span.smwrdflink").after('<span style="float:right;">[<a href="javascript:;" onClick="smwToggleFacts();" id="SMWFactToggle">hide</a>] &nbsp;</span>');
  }
  if (getCookie("hideSMWFacts") == "true") { smwToggleFacts(); }
}

//****************************************
//****    Tabber                      ****
//****************************************
/* NOTE: needs to be reconciled with updated tabber extension
// needs to represent the 'bare minimum' needed to evaluate if needs to load
function wwTabberInit() {
  var tabbers = $(".tabber");
  if (tabbers.length == 0) return;

  window.wwImportArticles.articles.push('MediaWiki:Tabber/code.js');
}
*/

//****************************************
//****    TwitterFeed                 ****
//****************************************

// needs to represent the 'bare minimum' needed to evaluate if needs to load
function wwTwitterFeedInit() {
  var twitters = $(".twitter-timeline");
  if (twitters.length == 0) return;

  twitters.each(function () { // fix the stupid twitter api attribute thing
    var feed = $(this);
    var w = feed.data('tt-width'); if (w) feed.attr('width', w);
    var h = feed.data('tt-height'); if (h) feed.attr('height', h);
    var a = feed.data('tt-id'); if (a) feed.attr('href', 'https://twitter.com/' + a);
  });
  if ($("#twitter-wjs").length == 0) { $(window.document.head)
    .append('<script id="twitter-wjs" src="https://platform.twitter.com/widgets.js"></script>'); }
}

//****************************************
//****    GoogleChart                 ****
//****************************************

// augment removed media wiki #imagelink functionality to allow embeded googlecharts
function wwGoogleChartInit() {
  var charts = $(".ww-googlechart");
  if (charts.length == 0) return;

  charts.each(function () {
    var chart = $(this);
    var w = chart.data('gc-width');
    var h = chart.data('gc-height');
    var o = chart.data('gc-options');
    if (o) {
      o = 'https://chart.apis.google.com/chart?' + o;
      $('<a href="' + o + '"><img width="' + w + '" height="' + h + '" src="' + o + '"/></a>').appendTo(chart);
    }
  });
}


/*******************************************************************************************

SECTION  Functions

********************************************************************************************/

// fix Special:Upload to require license - relatively inexpensive as scoped to particular page.
function wwRequireImageLicense() {
  if (wgPageName != "Special:Upload" || getParamValue("wpDestFile") != null) return;

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

function wwDuplicateImages(gf) {
  if ($("#mw-dupimages").length == 0) return;
  var dil = window.ww.dil = window.ww.dil || [];
  $.getJSON('/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json' + ((gf) ? ('&gaifrom=' + gf) : ''), function (data) {
    if (!data.query) return;
    var pages = data.query.pages, output = "";
    for (pageID in pages) {
      var dils = "," + dil.join();
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
    if (data["query-continue"]) setTimeout("wwDuplicateImages('" + data["query-continue"].allimages.gaifrom + "');", 5000);
  });
}

function wwGuildList() {
  if ($("#gslist").length == 0) return;
  function sortDays(a, b) { return b.substring(b.indexOf(";") + 1) - a.substring(a.indexOf(";") + 1); }
  var dateRE = /(\d{4})-(\d\d)-(\d\d).*/, tsDate = new Date(), today = new Date();
  var pArr = [];
  $.getJSON("https://www.wowwiki.com/api.php?action=query&generator=categorymembers&gcmlimit=500&gcmsort=timestamp&gcmdir=desc&gcmtitle=Category:Guild_stubs&prop=revisions&rvprop=timestamp&format=json&callback=?", function (data) {
    if (!data.query) return;
    var pages = data.query.pages;
    for (pageID in pages) {
      var timestamp = pages[pageID].revisions[0].timestamp;
      var dateREd = dateRE.exec(timestamp);
      tsDate.setFullYear(dateREd[1], dateREd[2] - 1, dateREd[3]);
      var daysElapsed = Math.round((today - tsDate) / 86400000);
      pArr[pArr.length] = pages[pageID].title + ";" + daysElapsed;
    }
    var pArr2 = pArr.sort(sortDays);
    var gslBuffer = "<ul>";
    for (n in pArr2) {
      var guild = pArr2[n].substring(0, pArr2[n].indexOf(";"));
      var daysE = pArr2[n].substring(pArr2[n].indexOf(";") + 1);
      daysE = (daysE < 0) ? 0 : daysE;
      daysE = (daysE > 29) ? '<span style="color:red;">(' + daysE + ' days)</span>' : '(' + daysE + ' days)';
      gslBuffer += '<li><a href="/' + guild + '" title="' + guild + '">' + guild + '</a> ' + daysE + ' - <a href="/' + guild + '?action=history">History</a> &bull; <a href="/' + guild + '?action=delete">Delete</a></li>';
    }
    gslBuffer += "</ul>";
    $("#gslist").html(gslBuffer);
  });
}

/*******************************************************************************************

SECTION  Startup

********************************************************************************************/

// Startup Now
(function () {
  window.ww = window.ww || {};      // ensure has ww JS table, as curtesy for funcs on this page

  /* wwTabberInit(); */
  wwTwitterFeedInit();
  wwGoogleChartInit();
}());

// Startup on DOM ready
//   Needs cleanup badly.
$(function () {
  // wut

/*
  if (wgAction == "view" && wgArticleId == 0 && wgNamespaceNumber == 0 && document.referrer.indexOf("search") == -1)
    document.location = "/Special:Search?search=" + wgTitle;
*/

  // Part of AJAX RC Comment out when using dev.wikia.com version
  //for (x in ajaxPages) { if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) ajaxRC(); }

  if (wgPageName == "Special:Upload") { wwRequireImageLicense(); }
  if (wgPageName == "WoWWiki:Guild_list") { wwGuildList(); }
  if (wgPageName == "WoWWiki:Duplicate_image_search") { wwDuplicateImages(); }

  if (wgUserName != null) { $(".insertusername").html(wgUserName); }

  /* *********************
    NO LONGER APPLICABLE

    // Is now fixed inline

  $(".mw-mpt-link").html("<a href='/Special:WhatLinksHere/" + $(".firstHeading").text().replace("Move ", "")
    .replace(/'/g, "%27") + "'>Links to the old page title</a>");

    NO LONGER APPLICABLE
  * **********************/

  /*
  if ($(".smwfacttable").length > 0) { console.log("found: .smwfacttable"); }
  if ($("#mw-data-after-content").length > 0) { console.log("found: #mw-data-after-content"); }
  if ($("#SMWFactToggle").length > 0) { console.log("found: #SMWFactToggle"); }
  if ($(".smwrdflink").length > 0) { console.log("found: .smwrdflink"); }
  if ($(".smwfact").length > 0) { console.log("found: .smwfact"); }
  */
  if ($("#mw-data-after-content").length > 0) { smwInitPage(); }

  ttMouseOver(1);

  wwScribbleMaps();

  // Make Wowhead 3D model viewer button links open a new tab when clicked.
  $('a[href*="modelviewer"]').attr({ target: '_blank' });
});


//****************************************
//****    Loaders                     ****
//****************************************

/* Load Loaders that were registered and just waiting for mw and jq to run their own
   boot-strap functionality. There's a very long detailed reason for yet another loader. */
(function() {
  var loaders = window.wwLoaders;
  if (!loaders) return;

  for (var i=0, l=loaders.length; i < l; i++)
  {
    var loader = loaders[i];
    if (typeof loader == 'function') { loader(); }
  }
}());

/* Load collected imports */
(function() {
  var imports = window.wwImportArticles;
  if (!imports) return;
  var articles = imports.articles;
  if (!articles || articles.length == 0) return;

  importArticles( imports );
}());