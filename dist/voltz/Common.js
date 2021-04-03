/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */ 

ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:WikiActivity"]; 
importScriptPage('AjaxRC/code.js', 'dev'); 

var ajaxRefresh = 50; 

// ************************************************** 
// Experimental javascript countdown timer (Splarka) 
// Version 0.0.3 
// ************************************************** 
  
− 
// 
  
− 
// Usage example: 
  
− 
// <span class="countdown" style="display:none;"> 
  
− 
// Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years. 
  
− 
// </span> 
  
− 
// <span class="nocountdown">Javascript disabled.</span> 
  
− 
 
  
− 
function updatetimer(i) { 
  
− 
var now = new Date(); 
  
− 
var then = timers[i].eventdate; 
  
− 
var diff = count=Math.floor((then.getTime()-now.getTime())/1000); 
  
− 
 
  
− 
// catch bad date strings 
  
− 
if(isNaN(diff)) {  
  
− 
timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ; 
  
− 
return; 
  
− 
} 
  
− 
 
  
− 
// determine plus/minus 
  
− 
if(diff<0) { 
  
− 
diff = -diff; 
  
− 
var tpm = ' '; 
  
− 
} else { 
  
− 
var tpm = ' '; 
  
− 
} 
  
− 
 
  
− 
 
  
− 
// calcuate the diff 
  
− 
var left = (diff%60) + ' seconds'; 
  
− 
diff=Math.floor(diff/60); 
  
− 
if(diff > 0) left = (diff%60) + ' minutes ' + left; 
  
− 
diff=Math.floor(diff/60); 
  
− 
if(diff > 0) left = (diff%24) + ' hours ' + left; 
  
− 
diff=Math.floor(diff/24); 
  
− 
if(diff > 0) left = diff + ' days ' + left 
  
− 
timers[i].firstChild.nodeValue = tpm + left; 
  
− 
 
  
− 
// a setInterval() is more efficient, but calling setTimeout() 
  
− 
// makes errors break the script rather than infinitely recurse 
  
− 
timeouts[i] = setTimeout('updatetimer(' + i + ')',1000); 
  
− 
} 
  
− 
 
  
− 
function checktimers() { 
  
− 
//hide 'nocountdown' and show 'countdown' 
  
− 
var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown'); 
  
− 
for(var i in nocountdowns) nocountdowns[i].style.display = 'none' 
  
− 
var countdowns = getElementsByClassName(document, 'span', 'countdown'); 
  
− 
for(var i in countdowns) countdowns[i].style.display = 'inline' 
  
− 
 
  
− 
//set up global objects timers and timeouts. 
  
− 
timers = getElementsByClassName(document, 'span', 'countdowndate'); //global 
  
− 
timeouts = new Array(); // generic holder for the timeouts, global 
  
− 
if(timers.length == 0) return; 
  
− 
for(var i in timers) { 
  
− 
timers[i].eventdate = new Date(timers[i].firstChild.nodeValue); 
  
− 
updatetimer(i); //start it up 
  
− 
} 
  
− 
} 
  
− 
addOnloadHook(checktimers); 
  
− 
 
  
− 
// ************************************************** 
  
− 
// - end - Experimental javascript countdown timer 
  
− 
// ************************************************** 
  
− 
 
  
− 
// ============================================================ 
  
− 
// BEGIN Dynamic Navigation Bars (experimantal) 
  
− 
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history 
  
− 
 
  
− 
 
  
− 
/* Test if an element has a certain class ************************************** 
  
− 
* 
  
− 
* Description: Uses regular expressions and caching for better performance. 
  
− 
* Maintainers: User:The-buster-ZX, User:BlueJay11, User:BrickfilmNut 
  
− 
*/ 
  
− 
 
  
− 
var hasClass = (function () { 
  
− 
var reCache = {}; 
  
− 
return function (element, className) { 
  
− 
return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className); 
  
− 
}; 
  
− 
})(); 
  
− 
 
  
− 
/** Collapsible tables ********************************************************* 
  
− 
* 
  
− 
* Description: Allows tables to be collapsed, showing only the header. See 
  
− 
* [[Wikipedia:NavFrame]]. 
  
− 
* Maintainers: [[User:The-buster-ZX]] 
  
− 
*/ 
  
− 
 
  
− 
var autoCollapse = 2; 
  
− 
var collapseCaption = "hide"; 
  
− 
var expandCaption = "show"; 
  
− 
 
  
− 
function collapseTable( tableIndex ) 
  
− 
{ 
  
− 
var Button = document.getElementById( "collapseButton" + tableIndex ); 
  
− 
var Table = document.getElementById( "collapsibleTable" + tableIndex ); 
  
− 
 
  
− 
if ( !Table || !Button ) { 
  
− 
return false; 
  
− 
} 
  
− 
 
  
− 
var Rows = Table.getElementsByTagName( "tr" );  
  
− 
 
  
− 
if ( Button.firstChild.data == collapseCaption ) { 
  
− 
for ( var i = 1; i < Rows.length; i++ ) { 
  
− 
Rows[i].style.display = "none"; 
  
− 
} 
  
− 
Button.firstChild.data = expandCaption; 
  
− 
} else { 
  
− 
for ( var i = 1; i < Rows.length; i++ ) { 
  
− 
Rows[i].style.display = Rows[0].style.display; 
  
− 
} 
  
− 
Button.firstChild.data = collapseCaption; 
  
− 
} 
  
− 
} 
  
− 
 
  
− 
function createCollapseButtons() 
  
− 
{ 
  
− 
var tableIndex = 0; 
  
− 
var NavigationBoxes = new Object(); 
  
− 
var Tables = document.getElementsByTagName( "table" ); 
  
− 
 
  
− 
for ( var i = 0; i < Tables.length; i++ ) { 
  
− 
if ( hasClass( Tables[i], "collapsible" ) ) { 
  
− 
NavigationBoxes[ tableIndex ] = Tables[i]; 
  
− 
Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex ); 
  
− 
 
  
− 
var Button = document.createElement( "span" ); 
  
− 
var ButtonLink = document.createElement( "a" ); 
  
− 
var ButtonText = document.createTextNode( collapseCaption ); 
  
− 
 
  
− 
Button.style.styleFloat = "right"; 
  
− 
Button.style.cssFloat = "right"; 
  
− 
Button.style.fontWeight = "normal"; 
  
− 
Button.style.textAlign = "right"; 
  
− 
Button.style.width = "6em"; 
  
− 
 
  
− 
ButtonLink.setAttribute( "id", "collapseButton" + tableIndex ); 
  
− 
ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" ); 
  
− 
ButtonLink.appendChild( ButtonText ); 
  
− 
 
  
− 
Button.appendChild( document.createTextNode( "[" ) ); 
  
− 
Button.appendChild( ButtonLink ); 
  
− 
Button.appendChild( document.createTextNode( "]" ) ); 
  
− 
 
  
− 
var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0]; 
  
− 
/* only add button and increment count if there is a header row to work with */ 
  
− 
if (Header) { 
  
− 
Header.insertBefore( Button, Header.childNodes[0] ); 
  
− 
tableIndex++; 
  
− 
} 
  
− 
} 
  
− 
} 
  
− 
 
  
− 
for ( var i = 0; i < tableIndex; i++ ) { 
  
− 
if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) { 
  
− 
collapseTable( i ); 
  
− 
} 
  
− 
} 
  
− 
} 
  
− 
addOnloadHook( createCollapseButtons ); 
  
− 
 
  
− 
/** Dynamic Navigation Bars (experimental) ************************************* 
  
− 
* 
  
− 
* Description: See [[Wikipedia:NavFrame]]. 
  
− 
* Maintainers: UNMAINTAINED 
  
− 
*/ 
  
− 
 
  
− 
// set up the words in your language 
  
− 
var NavigationBarHide = '[' + collapseCaption + ']'; 
  
− 
var NavigationBarShow = '[' + expandCaption + ']'; 
  
− 
 
  
− 
// set up max count of Navigation Bars on page, 
  
− 
// if there are more, all will be hidden 
  
− 
// NavigationBarShowDefault = 0; // all bars will be hidden 
  
− 
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden 
  
− 
var NavigationBarShowDefault = autoCollapse; 
  
− 
 
  
− 
 
  
− 
// shows and hides content and picture (if available) of navigation bars 
  
− 
// Parameters: 
  
− 
// indexNavigationBar: the index of navigation bar to be toggled 
  
− 
function toggleNavigationBar(indexNavigationBar) 
  
− 
{ 
  
− 
var NavToggle = document.getElementById("NavToggle" + indexNavigationBar); 
  
− 
var NavFrame = document.getElementById("NavFrame" + indexNavigationBar); 
  
− 
 
  
− 
if (!NavFrame || !NavToggle) { 
  
− 
return false; 
  
− 
} 
  
− 
 
  
− 
// if shown now 
  
− 
if (NavToggle.firstChild.data == NavigationBarHide) { 
  
− 
for ( 
  
− 
var NavChild = NavFrame.firstChild; 
  
− 
NavChild != null; 
  
− 
NavChild = NavChild.nextSibling 
  
− 
) { 
  
− 
if ( hasClass( NavChild, 'NavPic' ) ) { 
  
− 
NavChild.style.display = 'none'; 
  
− 
} 
  
− 
if ( hasClass( NavChild, 'NavContent') ) { 
  
− 
NavChild.style.display = 'none'; 
  
− 
} 
  
− 
} 
  
− 
NavToggle.firstChild.data = NavigationBarShow; 
  
− 
 
  
− 
// if hidden now 
  
− 
} else if (NavToggle.firstChild.data == NavigationBarShow) { 
  
− 
for ( 
  
− 
var NavChild = NavFrame.firstChild; 
  
− 
NavChild != null; 
  
− 
NavChild = NavChild.nextSibling 
  
− 
) { 
  
− 
if (hasClass(NavChild, 'NavPic')) { 
  
− 
NavChild.style.display = 'block'; 
  
− 
} 
  
− 
if (hasClass(NavChild, 'NavContent')) { 
  
− 
NavChild.style.display = 'block'; 
  
− 
} 
  
− 
} 
  
− 
NavToggle.firstChild.data = NavigationBarHide; 
  
− 
} 
  
− 
} 
  
− 
 
  
− 
// adds show/hide-button to navigation bars 
  
− 
function createNavigationBarToggleButton() 
  
− 
{ 
  
− 
var indexNavigationBar = 0; 
  
− 
// iterate over all < div >-elements  
  
− 
var divs = document.getElementsByTagName("div"); 
  
− 
for( 
  
− 
var i=0;  
  
− 
NavFrame = divs[i];  
  
− 
i++ 
  
− 
) { 
  
− 
// if found a navigation bar 
  
− 
if (hasClass(NavFrame, "NavFrame")) { 
  
− 
 
  
− 
indexNavigationBar++; 
  
− 
var NavToggle = document.createElement("a"); 
  
− 
NavToggle.className = 'NavToggle'; 
  
− 
NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar); 
  
− 
NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');'); 
  
− 
 
  
− 
var NavToggleText = document.createTextNode(NavigationBarHide); 
  
− 
NavToggle.appendChild(NavToggleText); 
  
− 
// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) 
  
− 
for( 
  
− 
var j=0;  
  
− 
j < NavFrame.childNodes.length;  
  
− 
j++ 
  
− 
) { 
  
− 
if (hasClass(NavFrame.childNodes[j], "NavHead")) { 
  
− 
NavFrame.childNodes[j].appendChild(NavToggle); 
  
− 
} 
  
− 
} 
  
− 
NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar); 
  
− 
} 
  
− 
} 
  
− 
// if more Navigation Bars found than Default: hide all 
  
− 
if (NavigationBarShowDefault < indexNavigationBar) { 
  
− 
for( 
  
− 
var i=1;  
  
− 
i<=indexNavigationBar;  
  
− 
i++ 
  
− 
) { 
  
toggleNavigationBar(i); 
} 
} 
  
}  
addOnloadHook( createNavigationBarToggleButton ); 

//Automatically refreshes recent changes. 
importScriptPage('', 'dev'); 

/* skin change buttons */ 
$(function CreateSkinChangeButtons() { 
//Oasis buttons 
$('div.buttons .WikiaMenuElement').prepend('<li><a href="/wiki/'+ encodeURIComponent(wgPageName) +'?useskin=monobook" title="Change to Monobook" accesskey="b" id="skinChangeButton" data-id="monobookbutton">Monobook</a></li<|><li><a href="/wiki/'+ encodeURIComponent(wgPageName) +'?useskin=vector" title="Change to Vector" accesskey="v" id="skinChangeButton" data-id="vectorbutton">Vector</a></li>'); 
//Monobook buttons 
$('#p-cactions .pBody ul').append('<li id="ca-nstab-main" class="skinChangeTab" style="margin-left:36px"><a href="/wiki/'+ encodeURIComponent(wgPageName) +'?useskin=wikia" title="Change to Oasis [o]" id="skinChangeButton" accesskey="o">Oasis</a></li><li id="ca-nstab-main" class="skinChangeTab"><a href="/wiki/'+ encodeURIComponent(wgPageName) +'?useskin=vector" title="Change to Vector [v]" id="skinChangeButton" accesskey="o">Vector</a></li>'); 
}); 

//Adds Social Media Buttons 
var SocialMediaButtons = {  
position: "top", 
colorScheme: "color", 
buttonSize: "25px" 
}; 
importScriptPage('SocialIcons/code.js','dev'); 

var messageWallUserTags = { 
'username': 'usergroup', 
'Mdann52': 'Admin & Bureaucrat', 
'Rinzler135': 'Admin & Bureucrat', 
'KennyKatsu': 'Founder', 
'Doodo 1': 'Admin & Bureucrat', 
'Dracky3k': 'Bureaucrat', 
'Wingstrike': 'Admin', 
}; 
window.messageWallTagColor = '#2D4AEF'; 
  
importArticles({ 
type: 'script', 
articles: [ 
'u:dev:MessageWallUserTags/code.js' 
] 
 
}); 
  
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'}); 

/* UserTags */ 
window.UserTagsJS = { 
modules: {}, 
tags: { 
// group: { associated tag data } 
templates: { u: 'Template Specialist', order:2 }, 
templatesh: { u: 'Template Helper', order:1 }, 
css: { u: 'CSS Specialist', order:2 }, 
cssh: { u: 'CSS Helper', order:1 }, 
java: { u: 'Java Specialist', order:2 },
javah: { u: 'Java Helper', order:1 }, 
inactive: { u: 'Inactive', order:1 }, 
xsysop: { u: 'X-Admin', order:0 }, 
newuser: { u: 'Rookie' }, 
sysop: { u: 'Admin', link:'Voltz Wiki:Staff', order:0 }, 
superadmin: { u: 'Super Admin', link:'Voltz Wiki:Staff', order:0 }, 
superuser: { u: 'Super User', link:'Voltz Wiki:Staff', order:0 }, 
COC: {u: 'COC Player', link:'http://clashofclans.wikia.com/wiki/Clash_of_Clans_Wiki', order:3 }, 
}; 
  
UserTagsJS.modules.inactive = { 
days: 31, 
namespaces: [0], 
zeroIsInactive: true // 0 article edits = inactive 
}; 
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat']; 
  
UserTagsJS.modules.newuser = { 
days: 5, // Must have been on the Wiki for 5 days 
edits: 10, // And have at least 10 edits to remove the tag 
namespace: 0 // Edits must be made to articles to count 
};  

UserTagsJS.modules.custom = { //Tags users with custom templates tag 
'Doodo 1': ['COC', 'cssh', 'javah'], 
'Wingstrike' : ['css', 'java'],
'JeterNYY' : ['xsysop'], 
'Finnik33' : ['COC'] 
}; 
 
UserTagsJS.modules.implode = { 

'superadmin': ['bureaucrat', 'sysop'], // Combines bureaucrat and sysop tags together into superadmin tag 
 
'superuser': ['rollback', 'chatmoderator'], // Combines rollback and chat moderator tags together into superuser tag 
};  
  
UserTagsJS.modules.metafilter = { 
'rollback': ['sysop'], // Remove rollback tag from all admins (redundant, rollback is inclusive in sysop) 
}; 
  
/* Purge Button */ 
PurgeButtonText = 'Purge'; 
importScriptPage('PurgeButton/code.js', 'dev'); 
  
/* Article Import */ 
importArticles({ 
type: 'script', 
articles: [ 
'u:dev:WallGreetingButton/code.js', //Adds Wall Greeting Edit Button 
'u:dev:Voice_Dictation/voice.js', //Adds Voice Dictation 
'MediaWiki:Common.js/StandardEditSummaries.js', //Adds Edit Summaries Dropdown 
'u:dev:DynamicImages/code.js', //Fixes GIFs in thumbnails 
'u:dev:CategoryRenameAuto-update/code.js', 
'u:dev:NullEditButton/code.js', //Adds a function like purging, but better 
'u:dev:AjaxRC/code.js', //Auto refreshes Wiki Activity and Recent Changes 
'u:dev:UserTags/code.js', //UserTags 
] 
});