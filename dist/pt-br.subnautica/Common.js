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
 
// needed by AjaxRC beore loading script
var ajaxIndicator = 'https://images.wikia.nocookie.net/__cb1/wowwiki/images/0/0e/Progressbar.gif';
 
// Import Scripts
window.wwImportArticles = {
  type: 'script',
  debug: false,
  articles: [
    'MediaWiki:jquery-ui/jquery.effects.js',  // working version of UI effects. used by 'FloatingToc' and 'SlideShow'
    //'MediaWiki:Test.js',
    'u:dev:AjaxRC/code.js',                   // intended as common ajax dependency for user extensions, like below
    //'MediaWiki:Countdown/code.js',
    //'MediaWiki:FloatingToc/code.js',          // popout TOC. static as is used nearly all pages but portals, etc...
    //'MediaWiki:UserTags/inactiveUsers.js',  // MediaWiki:Wikia.js/userRightsIcons.js appears to override, needs merge
    'MediaWiki:Wikiaapp.js',
    //'MediaWiki:AjaxTables/code.js',           // ajax driven 'show table'. See 'MediaWiki:AjaxTables'
    //'MediaWiki:MapLightbox/code.js',          // on page WoW maps support
    //'MediaWiki:SlideShow/code.js',            // general slide show and rotating banner support. See 'Template:Slideshow'
    //'MediaWiki:UserTags/userRightsIcons.js',// puts things like "ADMINISTRATOR" or "CRAZY PERSON" tags on talk pages
    'MediaWiki:UserTags/code.js',             // user tags like "INACTIVE", "ADMINISTRATOR" or "CRAZY PERSON" on talk pages
  ]
};
 
//if (mw && mw.config && mw.config.set) mw.config.set('debug', true);
 
//****************************************
//****    Tabber                      ****
//****************************************
 
// needs to represent the 'bare minimum' needed to evaluate if needs to load
function wwTabberInit() {
  var tabbers = $(".tabber");
  if (tabbers.length == 0) return;
 
  window.wwImportArticles.articles.push('MediaWiki:Tabber/code.js');
}
 
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
      o = 'http://chart.apis.google.com/chart?' + o;
      $('<a href="' + o + '"><img width="' + w + '" height="' + h + '" src="' + o + '"/></a>').appendTo(chart);
    }
  });
}
 
if (wgUserName != null) { $(".insertusername").html(wgUserName); }
 
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