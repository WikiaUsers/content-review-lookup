/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

var tooltipsOn = true;

/* Needed for rewriteTitle function
Source: http://www.dustindiaz.com/getelementsbyclass/

getElementsByClass, which complements getElementById and getElementsByTagName, returns an array of all subelements of
''node'' that are tagged with a specific CSS class (''searchClass'') and are of the tag name ''tag''. If tag is null, it
searches for any suitable elements regardless of the tag name.

Example: getElementsByClass('infobox', document.getElementById('content'), 'div') selects the same elements as the CSS
declaration #content div.infobox
*/


// ==================================================================
// Insert username 
// ==================================================================
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);
 
// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history


/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 addOnloadHook( createCollapseButtons );

 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
  
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
  
  
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
  
     if (!NavFrame || !NavToggle) {
         return false;
     }
  
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
  
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
  
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
  
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
             
             var NavToggleText = document.createTextNode(NavigationBarHide);
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
   
  } 
  addOnloadHook( createNavigationBarToggleButton );

function getElementsByClass(searchClass, node, tag)
{
	var classElements = new Array();

	if(node == null)
		node = document;

	if(tag == null)
		tag = '*';

	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var tester = new ClassTester(searchClass);

	for(i = 0, j = 0; i < elsLen; i++)
	{
		if(tester.isMatch(els[i]))
		{
			classElements[j] = els[i];
			j++;
		}
	}
    
	return classElements;
}
function ClassTester(className)
{
    this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}
ClassTester.prototype.isMatch = function(element)
{
    return this.regex.test(element.className);
}
/*
    end getElementsByClass
*/

/** Title rewrite ********************************************************
 * Rewrites the page's title, used by Template:Title
 * By Sikon
 */

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
//

var DOCHEAD = document.getElementsByTagName('HEAD')[0];

function createElement(tag,children,props){
var element = document.createElement(tag);
if (!(children instanceof Array)) children=[children];
for(var i=0;i<children.length;i++){
var child=children[i];
if (typeof child=='string') child=document.createTextNode(child);
if (child) element.appendChild(child);
}
if (typeof props=='object') {
for(var k in props){
switch (k) {
case 'styles':
var styles=props.styles;
for (var s in styles) element.style[s]=styles[s];
break;
case 'events':
var events=props.events;
for (var e in events) addHandler(element,e,events[e]);
break;
case 'class':
element.className=props[k];
break;
default:
element.setAttribute(k,props[k]);
}
}
}
return element;
}

function insertCSS(page) {
insertExternalCSS(wgScriptPath + '/index.php?title=' + encodeURIComponent(page.replace(/ /g, '_')) + '&action=raw&ctype=text/css');
}

function insertExternalCSS(sheetURL) {
var styleElem = document.createElement('style');
styleElem.setAttribute('type','text/css');
try {
styleElem.appendChild( document.createTextNode('@import "' + sheetURL + '";'));
} catch (el){ // a hack to fix problem with Internet Explorer
document.createStyleSheet(sheetURL);
}
DOCHEAD.appendChild(styleElem);
}

document.write('<script type="text/javascript" src="' + '/index.php?title=MediaWiki:Functions.js&action=raw&ctype=text/javascript&smaxage=18000"></script>');


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
//
// If the date is in the format "x|January 01 2007 00:00:00 PST", then the timer is periodic with period x seconds using the given date as the starting time.
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // reduce modulo period if necessary
  if(timers[i].period > 0){
    if(diff<0) diff = timers[i].period - ((-diff)%timers[i].period); else diff = diff%timers[i].period;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = ' ';
  } else {
    var tpm = ' ';
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
  timers = getElementsByClassName(document, 'span', 'countdowndate');
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    var str = timers[i].firstChild.nodeValue;
    var j = str.indexOf('|');
    if(j == -1) timers[i].period = 0; else {
      timers[i].period = parseInt(str.substr(0, j));
      if(isNaN(timers[i].period) || timers[i].period < 0) timers[i].period = 0;
      str = str.substr(j + 1);
    }
    timers[i].eventdate = new Date(str);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

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
$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
}

// displays the tooltip
function displayTip(e) {
$htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
moveTip(e);
$htt.not(":empty").css("visibility","visible");
}

// moves the tooltip
function moveTip(e) {
var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($htt.not(".hidden").innerHeight()+20):20);
var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($htt.not(".hidden").innerWidth()+20):20);
$htt.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}

// AJAX tooltips
function showTip(e) {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink")==false) {
$t.removeAttr("title");
$p.removeAttr("title");
$tfb.load("/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content",function () {
if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
$tfb.find(".tooltip-content").css("display","");
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
function eLink(db,nm) {
dbs = new Array("http://www.wowarmory.com/search.xml?searchType=items&searchQuery=","http://www.wowhead.com/?search=","http://www.thottbot.com/?s=","http://wow.allakhazam.com/search.html?q=");
dbTs = new Array("Armory","Wowhead","Thottbot","Allakhazam");
dbHs = new Array("&real; ","&omega; ","&tau; ","&alpha;");
el = '<a href="'+ dbs[db]+nm + '" target="_blank" title="'+ dbTs[db] +'">'+ dbHs[db] + '</a>';
return el;
}

function bindTT() {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink") == false) {
$t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
if ($p.hasClass("new")) {
els = '<sup><span class="plainlinks">';
y=($t.hasClass("itemlink"))?0:1;
z=($t.hasClass("achievementlink"))?3:4;
for (x=y;x<z;x++) els += eLink(x,$t.data("tt").replace("Quest:",""));
$p.after(els+'</span></sup>');
}
if (extDB != "http://www.wowwiki.com/") { 
fullextURL = extDB + $t.data("tt");
$p.attr("href",fullextURL);
}
}
}

// check to see if it is active then do it
function ttMouseOver() {
if (tooltipsOn && getCookie("wiki-tiploader") != "no") {
$(article).mouseover(hideTip);
$(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"><div>');
$tfb = $("#tfb");
$ttfb = $("#templatetfb");
$htt = $("#tfb,#templatetfb");
$(article+" span.ajaxttlink").each(bindTT);
$(article+" span.tttemplatelink").mouseover(showTemplateTip).mouseout(hideTemplateTip).mousemove(moveTip);
}
}


// =====================================================================
// Pagetitle rewrite
//
    // =====================================================================
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
//
// =====================================================================
 
$(function(){
var newTitle = $("#title-meta").html();
if (!newTitle) return;
var edits = $("#user_masthead_since").text();
$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
$(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});
 

    // ****************
    // Duplicate images
    // ****************
 
    importScriptPage('DupImageList/code.js', 'dev');


// --------------------------------------------------
//  <TT> News ticker 2.0, by Splarka, better version
// --------------------------------------------------

var ticker;
var tickertxt;
var tickerdiv;

function newsticker() {
  if (document.getElementById) {
  if ((document.getElementById('ticker'))&&(document.getElementById('tickerdiv'))&&(document.getElementById('tickertxt'))) {
    ticker = document.getElementById('ticker'); 
    ticker.style.display = 'block';
    tickerdiv = document.getElementById('tickerdiv');
    tickertxt = document.getElementById('tickertxt').offsetWidth; 
    tickerdiv.style.left = parseInt(ticker.style.width) + 10 + 'px';
    lefttime=setInterval("newstickergo()",200);
  }
  }
}

function newstickergo() {
  tickerdiv.style.left = (parseInt(tickerdiv.style.left) > (-10 - tickertxt) ) ? parseInt(tickerdiv.style.left) - 10 + "px" : parseInt(ticker.style.width) + 10 + "px";
} 
addOnloadHook(newsticker);

// --------------------------------------------------
//             End <TT> News ticker 2.0
// --------------------------------------------------

// *********
// IRC Login 
// *********
    $(document).ready(function() {
        if($('#IRClogin')){
            var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
            $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-combatarms&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
        }  
        if($('#CVNIRClogin')){
            var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
            $('#CVNIRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=cvn-wikia-combatarms&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
        }    
    });

    // ***************
    // Easy-remove CVU
    // ***************
 
    // Courtesy of Megan
 
    window.onload = function() {
        var cake = (unescape(wgPageQuery));
        if(cake.indexOf("remove=")>0){
            var mhm = cake.substring(unescape(wgPageQuery).indexOf("remove=")+7,cake.indexOf("&section=1"));
            var oldtext = document.getElementById('wpTextbox1').value;
            if(oldtext.indexOf("{{CVU|"+mhm)>0){
                var cake = oldtext.substring(oldtext.indexOf("{{CVU|"+mhm));
                var cak3 = cake.substring(0,cake.indexOf("}}")+2);
                document.getElementById('wpTextbox1').value = oldtext.replace(cak3,"{{CVU|Example}}");
                document.editform.wpSave.click();
            }
        }
    }
 
    // ************
    // Easy-add CVU
    // ************
 
    // Courtesy of Megan
 
    //importScriptPage('User:Cakemix/QCVUAdder.js', 'callofduty');

//<pre>
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// FIND DUPLICATE IMAGES
// Code courtesy of "pcj" of WoWWiki.
///////////////////////////////////////////////////////////////////////////////////////////////////////////
dil = new Array();
function findDupImages(gf) {
output = "";
url = "/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json";
if (gf) url += "&gaifrom=" + gf;
$.getJSON(url,function (data) {
if (data.query) {
pages = data.query.pages;
for (pageID in pages) {
dils = ","+dil.join();
if (dils.indexOf(","+pages[pageID].title) == -1 && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles) {
output += "<h3><a href='/" + pages[pageID].title + "'>"+pages[pageID].title+"</a></h3>\n<ul>\n";
for (x=0;x<pages[pageID].duplicatefiles.length;x++) {
output += "<li><a href='/File:" + pages[pageID].duplicatefiles[x].name + "'>File:"+pages[pageID].duplicatefiles[x].name+"</a></li>\n";
dil.push("File:"+pages[pageID].duplicatefiles[x].name.replace(/_/g," "));
}
output += "</ul>\n\n"
}
}
$("#mw-dupimages").append(output);
if (data["query-continue"]) setTimeout("findDupImages('"+data["query-continue"].allimages.gaifrom+"');",5000);
}
});
}
$(function () { if ($("#mw-dupimages").length) findDupImages(); });
//</pre>

if (wgCanonicalNamespace === "User_talk" || wgCanonicalNamespace === "User"  ){
	if ( document.getElementById('UserProfileMasthead').getElementsByClassName('group').length === 1 ){
		if (document.getElementById('adm-changetitle') !== null ){
			document.getElementById('UserProfileMasthead').getElementsByClassName('group')[0].innerHTML = document.getElementById('adm-changetitle').innerHTML;
		}
	}
}