/* Any JavaScript here will be loaded for all users on every page load. */

/****************************************/
/* sliders using jquery                 */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );


/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's Common.js.
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
  *  Taken from Wikipedia's Common.js.
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
 
     var Rows = Table.rows;
 
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
 
             /* only add button and increment count if there is a header row to work with */
             var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
             if (!HeaderRow) continue;
             var Header = HeaderRow.getElementsByTagName( "th" )[0];
             if (!Header) continue;
 
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
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             Header.insertBefore( Button, Header.childNodes[0] );
             tableIndex++;
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
  *  Taken from Wikipedia's Common.js.
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
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
             for (
                  var NavChild = NavFrame.firstChild;
                  NavChild != null;
                  NavChild = NavChild.nextSibling
                 ) {
                 if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                     if (NavChild.style.display == 'none') {
                         NavToggleText = document.createTextNode(NavigationBarShow);
                         break;
                     }
                 }
             }
 
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
  }
 
  addOnloadHook( createNavigationBarToggleButton );

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

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
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
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

// The source code below is covered by the CC-BY-SA license and this code may be freely used on any Wikia site for any purpose under this license.
// Beyond Wikia, this code must retain the attribution below and this must be easily visible on any page that uses the source code directly or indirectly:
//
// This code was created by Scormus for championsonline.wikia.com, 2010.
//
// Any and all other copyright restriction remain in place.
 
$(function() {
if ($(".mapDiv").length) writeAllMapNotations();
});
 
var mapWorldDX = 0;
var mapWorldDY = 0;
var mapWorldScaleX = 1.;
var mapWorldScaleY = 1.;
var mapParams = {};
 
function writeAllMapNotations() {
  setMapParams();
  var notationCode = "Default";
  var anchorTitle = "";
  var anchorHref = "";
 
  setMapScale();
 
  var i = 1;
  while (mapParams['l' + i] && i < 1000) {
    anchorTitle = mapParams['l' + i];
    anchorHref = "";
    if (mapParams['nc' + i]) {
      notationCode = mapParams['nc' + i];
    }
    if (mapParams['lk' + i]) {
      anchorTitle = mapParams['lk' + i];
    }
    if (mapParams['hr' + i]) {
      anchorHref = mapParams['hr' + i];
    }
    writeMapNotation(mapParams['l' + i], notationCode, anchorTitle, anchorHref);
    i++;
  }
}
 
function setMapScale() {
  var worldGridPoints = getMapWorldGridPoints();
  var imageGridPoints = getMapImageGridPoints();
 
  var worldGridPoint1 = worldGridPoints[0];
  var imageGridPoint1 = imageGridPoints[0];
  var xLocation1 = getXFromMapLocationString(imageGridPoint1);
  var yLocation1 = getYFromMapLocationString(imageGridPoint1);
  var xLocationWorld1 = getXFromMapLocationString(worldGridPoint1);
  var yLocationWorld1 = getYFromMapLocationString(worldGridPoint1);
 
  var worldGridPoint2 = worldGridPoints[1];
  var imageGridPoint2 = imageGridPoints[1];
  var xLocation2 = getXFromMapLocationString(imageGridPoint2);
  var yLocation2 = getYFromMapLocationString(imageGridPoint2);
  var xLocationWorld2 = getXFromMapLocationString(worldGridPoint2);
  var yLocationWorld2 = getYFromMapLocationString(worldGridPoint2);
 
  var xLocationAtZero = ((xLocationWorld1 * xLocation2) - (xLocationWorld2 * xLocation1)) / (xLocationWorld1 - xLocationWorld2);
  var yLocationAtZero = ((yLocationWorld1 * yLocation2) - (yLocationWorld2 * yLocation1)) / (yLocationWorld1 - yLocationWorld2);
 
  mapWorldDX = xLocationAtZero;
  mapWorldDY = yLocationAtZero;
 
  if (xLocation1 != mapWorldDX)  {
    mapWorldScaleX = xLocationWorld1 / (xLocation1 - mapWorldDX);
  } else {
    mapWorldScaleX = xLocationWorld2 / (xLocation2 - mapWorldDX);
  }
  if (yLocation1 != mapWorldDY)  {
    mapWorldScaleY = yLocationWorld1 / (yLocation1 - mapWorldDY);
  } else {
    mapWorldScaleY = yLocationWorld2 / (yLocation2 - mapWorldDY);
  }	
}
 
function writeMapNotation(locationString, notationCode, anchorTitle, anchorHref) {
  var mapNotationURL = getMapNotationURL(notationCode);
  var notationImageSize = getMapNotationSize(notationCode);
 
  var notationImageHeight =getXFromMapLocationString(notationImageSize); 
  var notationImageWidth = getYFromMapLocationString(notationImageSize);
 
  var newX = getScreenXFromMapLocationString(locationString);
  newX = newX - notationImageWidth / 2 ;
  newX = Math.round(newX);
 
  var newY = getScreenYFromMapLocationString(locationString);
  newY = newY - notationImageHeight / 2 ;
  newY = Math.round(newY);
 
  var div1 = document.createElement("div");
  div1.style.position = "absolute";
  div1.style.left = newX + "px";
  div1.style.top = newY + "px";
 
  var ahrf = document.createElement("a");
  ahrf.href = "";
  if (anchorHref) {
    ahrf.href = anchorHref;
  }
//  ahrf.class="image"
  ahrf.title= anchorTitle;
 
  div1.appendChild(ahrf);
 
  var img2 = document.createElement("img");
  img2.src = mapNotationURL;
  ahrf.appendChild(img2);
 
  var mainDiv=document.getElementById("mapDiv");
 
  mainDiv.appendChild(div1);
}
 
function getMapImageDataFromPage() {
  var refWorldGridPoint1=document.getElementById("worldGridPoint1");
  if (!refWorldGridPoint1) {
    return getDefaultMapImageData();
  }
 
  var refWorldGridPoint2=document.getElementById("worldGridPoint2");
  if (!refWorldGridPoint2) {
    return getDefaultMapImageData();
  }
 
  var refImageGridPoint1=document.getElementById("imageGridPoint1");
  if (!refImageGridPoint1) {
    return getDefaultMapImageData();
  }
 
  var refImageGridPoint2=document.getElementById("imageGridPoint2");
  if (!refImageGridPoint2) {
    return getDefaultMapImageData();
  }
 
  var mapData = new Object();
  mapData["worldGridPoints"]= [refWorldGridPoint1.firstChild.nodeValue, refWorldGridPoint2.firstChild.nodeValue];
  mapData["imageGridPoints"] = [refImageGridPoint1.firstChild.nodeValue, refImageGridPoint2.firstChild.nodeValue];
  return mapData;
}
 
function getDefaultMapImageData() {
  var mapData = new Object();
  mapData["worldGridPoints"]= ["1169 66 1920", "10061 198 -2712"];
  mapData["imageGridPoints"] = ["374,100", "1263,564"];
  return mapData;
}
 
function getMapNotationDataFromPage(notationCode) {
   var refLabel=document.getElementById("refLabel" + notationCode);
 
   if (!refLabel) {
     return getDefaultNotationData();
   }
 
   var refLabelLink =refLabel.childNodes[0];
 
   if (!refLabelLink ) {
     return getDefaultNotationData();
   }
 
   var refImage = refLabelLink.childNodes[0];
 
   if (!refImage) {
     return getDefaultNotationData();
   }
 
   var notationData = new Object();
   notationData["imageURL"] = refImage.src;
   notationData["notationSize"] = refImage.height + "," + refImage.width;
   return notationData;
}
 
function getDefaultNotationData() {
  var notationData = new Object();
  notationData["imageURL"] = "https://images.wikia.nocookie.net/__cb20100413235557/championsonline/images/7/7e/Map_location_highlight_green_circle_30x30.png";
  notationData["notationSize"] = "30,30";
  return notationData;
}
 
function getMapWorldGridPoints() {
  var mapData = getMapImageDataFromPage();
  return mapData["worldGridPoints"];
}
 
function getMapImageGridPoints() {
  var mapData = getMapImageDataFromPage();
  return mapData["imageGridPoints"];
}
 
function getMapNotationURL(notationCode) {
  var notationData = getMapNotationDataFromPage(notationCode);
  return notationData["imageURL"];
}
 
function getMapNotationSize(notationCode) {
  var notationData = getMapNotationDataFromPage(notationCode);
  return notationData["notationSize"];
}
 
function mapUrlDecode(s) {
  if (s) {
    return decodeURIComponent( s.replace( /\+/g, '%20' ).replace( /\%21/g, '!' ).replace( /\%27/g, "'" ).replace( /\%28/g, '(' ).replace( /\%29/g, ')' ).replace( /\%2A/g, '*' ).replace( /\%7E/g, '~' ) );
  }
  return s;
}
 
function setMapParams() {
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++) {
    var hash = hashes[i].split('=');
    var name =  mapUrlDecode(hash[0]);
    var value =  mapUrlDecode(hash[1]);
    mapParams[name] = value;
  }
}
 
function getYFromMapLocationString(str) {
  var lastCommaIndex = str.lastIndexOf(",");
  if (lastCommaIndex > 0) {
    return str.substr(lastCommaIndex + 1);
  }
 
  var lastSpaceIndex = str.lastIndexOf(" ");
  if (lastSpaceIndex > 0) {
    return str.substr(lastSpaceIndex + 1);
  }
  return str;
}
 
function getXFromMapLocationString(str) {
  var firstCommaIndex = str.indexOf(",");
  if (firstCommaIndex > 0) {
    return str.substr(0, firstCommaIndex);
  }
 
  var firstSpaceIndex = str.indexOf(" ");
  if (firstSpaceIndex > 0) {
    return str.substr(0, firstSpaceIndex);
  }
  return str;
}
 
function getScreenXFromMapLocationString(locationString) {
  var worldX = getXFromMapLocationString(locationString);
  return (worldX / mapWorldScaleX) + mapWorldDX;
}
 
function getScreenYFromMapLocationString(locationString) {
  var worldY = getYFromMapLocationString(locationString);
  return (worldY / mapWorldScaleY) + mapWorldDY;
}

/* makes sortable tables add odd/even to each row */

var ts_alternate_row_colors = true;


// tool tips from http://community.wikia.com/wiki/Forum:Wowwiki_tooltips_code with minor extensions by Scormus

var $tfb;

// hides the tooltip
function hideTip() {
$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
}

// displays the tooltip
function displayTip(e) {
$tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
moveTip(e);
$tfb.not(":empty").css("visibility","visible");
}

// moves the tooltip
function moveTip(e) {
var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($tfb.not(".hidden").innerHeight()+20):20);
var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($tfb.not(".hidden").innerWidth()+20):20);
$tfb.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
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

function bindTTText() {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink") == false) $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}

function bindTTImage() {
$t=$(this).find('img');
$p=$(this).find('a');
if ($p.hasClass("selflink") == false) $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}

// check to see if it is active then do it
$(function() {
$("#WikiaArticle").mouseover(hideTip);
$("#WikiaPage").append('<div id="tfb" class="htt"></div>');
$tfb = $("#tfb");
$("#WikiaArticle span.texttooltiplink").each(bindTTText);
$("#WikiaArticle div.imagetooltiplink").each(bindTTImage);
});