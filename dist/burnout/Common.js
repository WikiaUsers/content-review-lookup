/* <pre> */

/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('ShowHide/code.js', 'dev');

/**** Remove Main Page title ****/

if(document.title.indexOf("Main Page - ") == 0) {
   document.write('<style type="text/css">/*<![CDATA[*/ #lastmod, #siteSub, #contentSub, h1.firstHeading { display: none !important; } /*]]>*/</style>');
}

// portal switch
var pspans;
var cTab = 1;
function doPortals() {
  tabs = document.getElementById("mptabs");
  if (tabs) {
    pspans = tabs.getElementsByTagName("span");
    for (x=0;x<pspans.length;x++) {
      if (pspans[x].className == "activetab" || pspans[x].className == "inactivetab") {
        pspans[x].parentNode.onclick = switchTab.bind(pspans[x].parentNode,x/2);
        if (pspans[x].parentNode.tagName.toLowerCase() == "a") { 
          pspans[x].parentNode.setAttribute("href", "javascript:;"); 
        } else {
          pspans[x].parentNode.style.cursor = "pointer";
        }
        if (pspans[x].className == "activetab") cTab = (x/2)+1;
      }
    }
  }
}

function switchTab(x) {
  pspans[2*(cTab-1)].className = "inactivetab";
  document.getElementById("portal"+cTab).style.display = "none";
  cTab = x+1;
  pspans[2*x].className = "activetab";
  document.getElementById("portal"+cTab).style.display = "";
}

if (wgCanonicalNamespace == "Portal") addOnloadHook(doPortals);

//Tooltip Code

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
    $tfb.load("/wiki/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content",function () {
      if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
      $tfb.find(".tooltip-content").css("display","");
      displayTip(e);
    });
  }
}

function bindTT() {
  $t=$(this);
  $p=$t.parent();
  if ($p.hasClass("selflink") == false) $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}

// check to see if it is active then do it
$(function() {
  $("#WikiaMainContent, #bodyContent").mouseover(hideTip);
  $("#WikiaMainContent, #bodyContent").append('<div id="tfb" class="htt"></div>');
  $tfb = $("#tfb");
  $("#WikiaMainContent span.ajaxttlink, #bodyContent span.ajaxttlink").each(bindTT);
});


/* collapsible tables */

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable(i) {
  var Button = $("#collapseButton" + i);
  var Table = $("#collapsibleTable" + i);
  if (Table.length<1 || Button.length<1) return false;
  if (Button.text() == collapseCaption) {
    Table.find("tr").not(":has('#collapseButton"+i+"')").hide();
    setCookie("hideTable-" + wgArticleId + "-" + i,1,30);
    Button.text(expandCaption);
  } else {
    Table.find("tr").not(":has('#collapseButton"+i+"')").show();
    setCookie("hideTable-" + wgArticleId + "-" + i,0,30);  
    Button.text(collapseCaption);
  }
}
 
function createCollapseButtons() {
  var tch = $("table.collapsible tr th");
  tch.each(function (i) {
    $(this).closest("table").attr("id", "collapsibleTable" + i);
    $(this).prepend('<span style="float:right; font-weight:normal; text-align:right; width:6em">[<a href="javascript:collapseTable('+i+');" style="color:'+$(this).css("color")+';" id="collapseButton'+i+'">'+collapseCaption+'</a>]</span>');
    if ($(this).closest("table").hasClass("collapsed") || (getCookie("hideTable-" + wgArticleId + "-" + i) == 1) || (tch.length >= autoCollapse && $(this).closest("table").hasClass("autocollapse"))) collapseTable(i);
  });
}

var nbh = '['+collapseCaption+']';
var nbs = '['+expandCaption+']';

function toggleNavigationBar(i) {
  var NavToggle = $("#NavToggle" + i);
  var NavFrame = $("#NavFrame" + i);
  if (NavFrame.length<1 || NavToggle.length<1) return false; 
  ncd=(NavToggle.text()==nbh)?'none':'block';
  NavFrame.children(".NavPic,.NavContent").css("display",ncd);
  nct=(NavToggle.text()==nbh)?nbs:nbh;
  NavToggle.text(nct);
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
  $("div.NavFrame").each(function (i) {
    NavToggleText = ($(this).children(".NavPic:visible,.NavContent:visible").length>0)?nbh:nbs;
    $(this).children(".NavHead").append('<a href="javascript:toggleNavigationBar('+i+');" id="NavToggle'+i+'" class="NavToggle">'+NavToggleText+'</a>');
    $(this).attr("id","NavFrame"+i);
  });
}

/* ######################################################################## */
/* ### TITLE ICONS (Template:Games)                                     ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Add icons to article title                          ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */
 
$(function addTitleIcons () {
   if (skin == 'monobook' || skin == 'oasis') {
      var insertTarget;
 
      switch (skin) {
         case 'monobook':
            insertTarget = $('#firstHeading');
            break;
         case 'oasis':

            if (wgAction != 'submit' && wgNamespaceNumber != 112 && $('#titleicons').length > 0) {
               if ($('#WikiaPageHeader h2').length == 0) {
                  $('<h2>&nbsp;</h2>').appendTo('#WikiaPageHeader');
               }
               insertTarget = $('#WikiaPageHeader h2');
            }
            break;
      }
 
      if (insertTarget) {
         $('#titleicons').css('display', 'block').prependTo(insertTarget);
         $('#titleicons-more').append('<img width="0" height="0" class="titleicons-chevron" src="' + wgBlankImgUrl + '">');
 
         $('#titleicons').hover(
             function () {
                $(this).addClass('titleicons-hover');
             }, function () {
                $(this).removeClass('titleicons-hover');
             });
      }
   }
});

/*
 * ADVANCED AJAX AUTO-REFRESHING ARTICLES
 * Code courtesy of "pcj" of Wowpedia.
 */
var indicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif';
if (!window.ajaxPages) ajaxPages = new Array("Special:RecentChanges");
if (!window.ajaxCallAgain) ajaxCallAgain = [];
var ajaxTimer;
var ajaxRefresh = 60000;
var refreshText = 'AJAX';

if( typeof AjaxRCRefreshText == "string" ) refreshText = AjaxRCRefreshText;

var refreshHover = 'Enable auto-refreshing page loads';

if( typeof AjaxRCRefreshHoverText == "string" ) refreshHover = AjaxRCRefreshHoverText;

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
  appTo = ($("#WikiaPageHeader h2").length)?$("#WikiaPageHeader h2"):$(".firstHeading");
  appTo.append('&nbsp;<span style="margin-left: 20px; font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + indicator + '" style="vertical-align: baseline;" border="0" alt="Refreshing page" /></span></span>');
  $("#ajaxLoadProgress").ajaxSend(function (event, xhr, settings){
    if (location.href == settings.url) $(this).show();
  }).ajaxComplete (function (event, xhr, settings){
  if (location.href == settings.url) {$(this).hide(); for(i in ajaxCallAgain){ajaxCallAgain[i]()};}
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
  var cC = ($("#WikiaArticle").length)?"#WikiaArticle":"#bodyContent";
  $(cC).load(location.href + " " + cC + " > *", function (data) { 
    if (doRefresh) ajaxTimer = setTimeout("loadPageData();", ajaxRefresh);
  });
}

$(function () { 
  for (x in ajaxPages) {
    if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) preloadAJAXRL();
  }
});



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

function FlagChange() {
  var flag = document.getElementById("flag");
  var value = flag.options[flag.selectedIndex].value;
  switch (value) {
    case 'Us':
      $('.clanflag').html('<img width="30" height="30" src="https://images.wikia.nocookie.net/__cb20090721172936/burnoutparadise/images/thumb/2/2f/Us.png/30px-Us.png" alt="Us.png">');
      break;
    case 'It':
      $('.clanflag').html('<img width="30" height="30" src="https://images.wikia.nocookie.net/__cb20090721185125/burnoutparadise/images/thumb/d/dd/It.png/30px-It.png" alt="It.png">');
      break;
    case 'De':
      $('.clanflag').html('<img width="30" height="30" src="https://images.wikia.nocookie.net/__cb20090721185109/burnoutparadise/images/thumb/8/8f/De.png/30px-De.png" alt="De.png">');
      break;
    case 'Gb':
      $('.clanflag').html('<img width="30" height="30" src="https://images.wikia.nocookie.net/__cb20090721180341/burnoutparadise/images/thumb/c/ce/Gb.png/30px-Gb.png" alt="Gb.png">');
      break;
    case 'Jp':
      $('.clanflag').html('<img width="30" height="30" src="https://images.wikia.nocookie.net/__cb20090721181008/burnoutparadise/images/thumb/e/e1/Jp.png/30px-Jp.png" alt="Jp.png">');
      break;
    case 'Hk':
      $('.clanflag').html('<img width="30" height="30" src="https://images.wikia.nocookie.net/__cb20090914155748/burnoutparadise/images/thumb/5/5a/Hk.png/30px-Hk.png" alt="Hk.png">');
      break;
    case 'Fr':
      $('.clanflag').html('<img width="30" height="30" src="https://images.wikia.nocookie.net/__cb20090721191261/burnoutparadise/images/thumb/4/4b/Fr.png/30px-Fr.png" alt="Fr.png">');
      break;
    case 'Au':
      $('.clanflag').html('<img width="30" height="30" src="https://images.wikia.nocookie.net/__cb20091230012061/burnoutparadise/images/thumb/e/e6/Au.png/30px-Au.png" alt="Au.png">');
      break;
    case 'Ph':
      $('.clanflag').html('<img width="30" height="30" src="https://images.wikia.nocookie.net/__cb20100118114223/burnoutparadise/images/thumb/a/a4/Ph.png/30px-Ph.png" alt="Ph.png">');
      break;
    case 'Swe':
      $('.clanflag').html('<img width="38" height="38" src="https://images.wikia.nocookie.net/__cb20100202200729/burnoutparadise/images/7/77/Swe.png" alt="Swe.png">');
      break;
    case 'Ie':
      $('.clanflag').html('<img width="38" height="38" src="https://images.wikia.nocookie.net/__cb20090929195231/burnoutparadise/images/2/23/Ie.png" alt="Ie.png">');
      break;
    case 'Ca':
      $('.clanflag').html('<img width="38" height="38" src="https://images.wikia.nocookie.net/__cb20090916013613/burnoutparadise/images/4/42/Ca.png" alt="Ca.png">');
      break;
    case 'Au':
      $('.clanflag').html('<img width="38" height="38" src="https://images.wikia.nocookie.net/__cb20091230012061/burnoutparadise/images/e/e6/Au.png" alt="Au.png">');
      break;
  }
  return true;
}


$(function() {
  if (wgPageName == 'Burnout_Wiki:Clan_card_maker') {

    $('#Clancard').html('<table width="100%" style="margin-bottom: 30px;" class="wikitable"><tbody><tr><th colspan="8"><span class="mw-headline" id="Custom_Colors">Custom Colors</span></th></tr><tr valign="top"><td width="50%" colspan="4"><dl><dt>Main Border</dt><dd><input type="text" size="30" class="border" value="#000000" default="#000000" name="mborder"> <button class="reset">Default</button></dd><dt>Main Background</dt><dd><input type="text" name="mbackground" value="#333333" default="#333333" class="background" size="30"> <button class="reset">Default</button></dd><dt>Text color</dt><dd><input type="text" name="text" value="#FFFFFF" default="#FFFFFF" class="color" size="30"> <button class="reset">Default</button></dd><dt>Text color2</dt><dd><input type="text" name="text2" value="#000000" default="#000000" class="color" size="30"> <button class="reset">Default</button></dd></dl></td><td colspan="4"><dl><dt>Interior Borders</dt><dd><input type="text" size="30" class="border" value="#000000" default="#000000" name="intborder"> <button class="reset">Default</button></dd><dt>Skills Border</dt><dd><input type="text" name="skillsborder" value="#333333" default="#333333" class="border" size="30"> <button class="reset">Default</button></dd><dt>Interior Background</dt><dd><input type="text" name="intbackground" value="#EC5800" default="#EC5800" class="background" size="30"> <button class="reset">Default</button></dd></dl></td></tr><tr><th colspan="8"><span class="mw-headline" id="Personal">Personal / Miscellaneous</span></th></tr><tr valign="top"><td colspan="4"><dl><dt>Join Date</dt><dd><select><option>Month</option><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option></select> / <select><option>Day</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option></select> / <select><option>Year</option><option>2008</option><option>2009</option><option>2010</option><option>2011</option></select></dd><dt>Clan Rank</dt><dd><select style="width: 20em;"><option value="0">Learner (0)</option><option value="1">Courier (1)</option><option value="2">Commuter (2)</option><option value="3">Cruiser (3)</option><option value="4">Driver (4)</option><option value="5">Navigator (5)</option><option value="6">Stuntman (6)</option><option value="7">Enforcer (7)</option><option value="8">Burnopedia Assistant (8)</option><option value="9">Burnopedia Administrator (9)</option><option value="10">Burnopedia Bureaucrat (10)</option><option value="11">Burnopedia Founder (11)</option></select></dd><dt>Quote</dt><dd><input type="text" value="Catch phrase." size="40" class="textfield" name="quote"></dd></dl></td><td colspan="4"><dl><dt>Timezone (from GMT/UTC)</dt><dd><input type="text" value="EST (-5 UTC)" size="13" class="textfield" name="tz"></dd><dt>Country (More flags available upon request)</dt><dd><select onchange="FlagChange();" id="flag"><option value="Au">Australia</option><option value="Ca">Canada</option><option value="De">Denmark</option><option value="Fr">France</option><option value="Gb">Great Britain</option><option value="Hk">Hong Kong</option><option value="Ie">Ireland</option><option value="It">Italy</option><option value="Jp">Japan</option><option value="Ph">Philippines</option><option value="Swe">Sweden</option><option value="Us" selected>United States</option></select><div style="display: inline; margin-left: 10px;" class="clanflag"><img width="30" height="30" alt="Us.png" src="https://images.wikia.nocookie.net/__cb20090721172936/burnoutparadise/images/thumb/2/2f/Us.png/30px-Us.png"></div></dd></dl></td></tr><tr><th colspan="8"><span class="mw-headline" id="Console_.26_Gameplay">Console &amp; Gameplay</span></th></tr><tr valign="top"><td colspan="4"><dl><dt>Select Platform</dt><dd><input type="radio" name="console" value="PSN"> <img width="30" height="29" src="https://images.wikia.nocookie.net/__cb20090624140420/burnoutparadise/images/thumb/2/28/150px-PSN_logo_color_trans.png/30px-150px-PSN_logo_color_trans.png" alt="150px-PSN logo color trans.png"> <input type="radio" name="console" value="xbox"> <img width="30" height="30" src="https://images.wikia.nocookie.net/__cb20090904231519/burnoutparadise/images/thumb/6/6d/Xbox-logo.png/30px-Xbox-logo.png" alt="Xbox-logo.png"><br/><input type="text" name="handle" class="textfield" size="40" value="Console handle."></dd><dt>Accessories</dt><dd><input type="checkbox" name="camera" value="no_camera"> <img width="20" height="20" src="https://images.wikia.nocookie.net/__cb20090906071708/burnoutparadise/images/thumb/f/fa/Cam_N.png/20px-Cam_N.png" alt="Cam N.png"> Camera <input type="checkbox" name="mic" value="no_mic"> <img width="20" height="20" src="https://images.wikia.nocookie.net/__cb20090823192758/burnoutparadise/images/thumb/b/bd/Mic_N.png/20px-Mic_N.png" alt="Mic N.png"> Microphone<br><input type="checkbox" name="keyboard" value="no_keyboard"> <img width="20" height="20" src="https://images.wikia.nocookie.net/__cb20090823192759/burnoutparadise/images/thumb/c/ce/KBD_N.png/20px-KBD_N.png" alt="KBD N.png"> Keyboard/Keypad</dd></dl></td><td colspan="4"><dl><dt>Availability</dt><dd><input type="text" value="Time of day/week/month you are available." size="40" class="textfield" name="avail"></dd><dt>Skills</dt><dd><input type="text" value="Areas in the game you excel at." size="40" name="skills" class="textfield"></dd></dl></td></tr><tr><th colspan="8"><span id="Burnout_Paradise_DLC" class="mw-headline">Burnout Paradise DLC</span></th></tr><tr valign="top" style="text-align: center;"><td width="13%"><a href="/wiki/Cops_and_Robbers_Pack" title="Cops and Robbers Pack"><img width="48" height="47" alt="Has cops.png" src="https://images.wikia.nocookie.net/__cb20090610163855/burnoutparadise/images/4/44/Has_cops.png"></a><br><input type="checkbox" name="cops">Cops</td><td width="12%"><a title="Toys" href="/wiki/Toys"><img width="48" height="47" src="https://images.wikia.nocookie.net/__cb20090610163923/burnoutparadise/images/4/40/Has_toys1.png" alt="Has toys1.png"></a><br><input type="checkbox" name="toys1">Toys</td><td width="12%"><a href="/wiki/Toys" title="Toys"><img width="48" height="47" alt="Has toys2.png" src="https://images.wikia.nocookie.net/__cb20090610163923/burnoutparadise/images/8/86/Has_toys2.png"></a><br><input type="checkbox" name="toys2">Toys 2</td><td width="12%"><a title="Big Surf Island" href="/wiki/Big_Surf_Island"><img width="48" height="47" src="https://images.wikia.nocookie.net/__cb20090610163856/burnoutparadise/images/d/d5/Has_island.png" alt="Has island.png"></a><br><input type="checkbox" name="bsi">BSI</td><td width="12%"><a title="Legendary Cars" href="/wiki/Legendary_Cars"><img width="48" height="47" src="https://images.wikia.nocookie.net/__cb20090610163856/burnoutparadise/images/5/52/Has_legendary.png" alt="Has legendary.png"></a><br><input type="checkbox" name="legendary">Legend</td><td width="12%"><a href="/wiki/Boost_Specials" title="Boost Specials"><img width="48" height="47" alt="Has boost.png" src="https://images.wikia.nocookie.net/__cb20090610163855/burnoutparadise/images/c/c7/Has_boost.png"></a><br><input type="checkbox" name="boost">Boost</td><td width="13%"><a href="/wiki/Party_Pack" title="Party Pack"><img width="48" height="47" alt="Has party.png" src="https://images.wikia.nocookie.net/__cb20090610163856/burnoutparadise/images/2/27/Has_party.png"></a><br><input type="checkbox" name="partypack">Party</td><td width="13%"><a href="/wiki/Time_Savers_Pack" title="Time Savers Pack"><img width="48" height="47" alt="Has time-savers.png" src="https://images.wikia.nocookie.net/__cb20090610200104/burnoutparadise/images/b/ba/Has_time-savers.png"></a><br><input type="checkbox" name="timesavers">Savers</td></tr></tbody></table><button id="B1" onclick="CardMaker.generate()">Generate Code</button><br><br><label><em>To use this clan card, copy/paste the code below into your <a href="http://burnout.wikia.com/index.php?title=Special:MyPage/card&amp;action=edit" class="text" style="color: white;">user page</a> and save.</em></label><br><br><textarea readonly="readonly" style="width: 100%; height: 300px;" id="card_code">This page is a work-in-progress and not yet complete. However, some of the preview functions above do work to give you an idea of where this project is going. Please direct any suggestions/changes/hate mail to Rappy.</textarea>');

    $('.wikitable button').css('marginLeft','10px');
    $('.border').keyup(function() { $('.'+this.name).css('border','2px solid ' + this.value); });
    $('.color').keyup(function() { $('.'+this.name).css('color',this.value); });
    $('.background').keyup(function() { $('.'+this.name).css('background',this.value); });
    $('.reset').click(function() { var p = $(this).prev(); p.val(p.attr('default')).keyup(); });
    $('.textfield').keyup(function() { $('.' + this.name).html(this.value); });
    $('.userinfo').html('<a title="User:' + wgUserName +'" href="/index.php?title=User:' + wgUserName + '"><span style="color: white;" class="text">' + wgUserName + '</span></a> <small><small><small>(<a title="User talk:' + wgUserName + '" href="/index.php?title=User_talk:' + wgUserName + '"><span style="color: white;" class="text">Talk</span></a> - <a title="Special:Contributions/' + wgUserName + '" href="/wiki/Special:Contributions/' + wgUserName + '"><span style="color: white;" class="text">Contribs</span></a>)</small></small></small>');
    $("input[name='console']").change(function(){
      if ($("input[name='console']:checked").val() == 'PSN') {
        $('.consoleicon').html('<img width="30" height="29" alt="150px-PSN logo color trans.png" src="https://images.wikia.nocookie.net/__cb20090624140420/burnoutparadise/images/thumb/2/28/150px-PSN_logo_color_trans.png/30px-150px-PSN_logo_color_trans.png">');
      } else if ($("input[name='console']:checked").val() == 'xbox') {
        $('.consoleicon').html('<img width="30" height="30" alt="Xbox-logo.png" src="https://images.wikia.nocookie.net/__cb20090904231519/burnoutparadise/images/thumb/6/6d/Xbox-logo.png/30px-Xbox-logo.png">');
      }
    });
  }
});

CardMaker = {};
CardMaker.generate = function() {
  var mainBorder = '\|bordermain = '+document.getElementsByName('mborder')[0].value;
  var mainBackground = '\n\|backgroundmain = '+document.getElementsByName('mbackground')[0].value;
  var intBorder = '\n\|border = '+document.getElementsByName('intborder')[0].value;
  var intBackground = '\n\|background = '+document.getElementsByName('intbackground')[0].value;
  var skillsBorder = '\n\|border2 = '+document.getElementsByName('skillsborder')[0].value;
  var text = '\n\|textmain = '+document.getElementsByName('text')[0].value;
  var text2 = '\n\|text = '+document.getElementsByName('text2')[0].value;
 
  document.getElementById("card_code").value='\{\{clan card\n\|username = '+wgUserName+'\n'+mainBorder+mainBackground+intBorder+intBackground+skillsBorder+text+text2+'\n\}\}';
}