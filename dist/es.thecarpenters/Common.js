//<source lang="javascript">
 
/* Import more specific scripts if necessary */
 
if (wgAction == "edit" || wgAction == "submit" || wgPageName == "Special:Upload") //scripts specific to editing pages
{
importScript("MediaWiki:Common.js/edit.js")
}
else if (wgPageName == "Special:Watchlist") //watchlist scripts
{
importScript("MediaWiki:Common.js/watchlist.js")
}
else if (wgPageName == "Special:Search") //scripts specific to Special:Search
{
importScript("MediaWiki:Common.js/search.js")
}
 
 
/** Sysop Javascript *******************************************************
*
*  Description: Allows for sysop-specific Javascript at [[MediaWiki:Sysop.js]].
*/
function sysopFunctions() {
if ( wgUserGroups && !window.disableSysopJS ) {
for ( var g = 0; g < wgUserGroups.length; ++g ) {
if ( wgUserGroups[g] == "sysop" ) {
importScript( "MediaWiki:Sysop.js" );
break;
}
}
}
}
 
addOnloadHook( sysopFunctions );
 
 
/** WikiMiniAtlas *******************************************************
*
*  Description: WikiMiniAtlas is a popup click and drag world map.
*               This script causes all of our coordinate links to display the WikiMiniAtlas popup button.
*               The script itself is located on meta because it is used by many projects.
*               See [[Meta:WikiMiniAtlas]] for more information. 
*  Maintainers: [[User:Dschwen]]
*/
 
if (wgServer == "https://secure.wikimedia.org") {
var metaBase = "https://secure.wikimedia.org/wikipedia/meta";
} else {
var metaBase = "http://meta.wikimedia.org";
}
importScriptURI(metaBase+"/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400")
 
 
/* Scripts specific to Internet Explorer */
 
if (navigator.appName == "Microsoft Internet Explorer")
{
/** Internet Explorer bug fix **************************************************
*
*  Description: Fixes IE horizontal scrollbar bug
*  Maintainers: [[User:Tom-]]?
*/
 
var oldWidth;
var docEl = document.documentElement;
 
function fixIEScroll()
{
if (!oldWidth || docEl.clientWidth > oldWidth)
doFixIEScroll();
else
setTimeout(doFixIEScroll, 1);
 
oldWidth = docEl.clientWidth;
}
 
function doFixIEScroll() {
docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? "hidden" : "";
}
 
document.attachEvent("onreadystatechange", fixIEScroll);
document.attachEvent("onresize", fixIEScroll);
 
 
/**
* Remove need for CSS hacks regarding MSIE and IPA.
*/
 
if (document.createStyleSheet) {
document.createStyleSheet().addRule('.IPA', 'font-family: "Doulos SIL", "Charis SIL", Gentium, "DejaVu Sans", Code2000, "TITUS Cyberbit Basic", "Arial Unicode MS", "Lucida Sans Unicode", "Chrysanthi Unicode";');
}
 
 
//Import scripts specific to Internet Explorer 6
if (navigator.appVersion.substr(22, 1) == "6")
{
importScript("MediaWiki:Common.js/IE60Fixes.js")
}
}
 
 
/* Test if an element has a certain class **************************************
*
* Description: Uses regular expressions and caching for better performance.
* Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
*/
 
var hasClass = (function () {
var reCache = {};
return function (element, className) {
return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
};
})();
 
 
/** Interwiki links to featured articles ***************************************
*
*  Description: Highlights interwiki links to featured articles (or
*               equivalents) by changing the bullet before the interwiki link
*               into a star.
*  Maintainers: [[User:R. Koot]]
*/
 
function LinkFA() 
{
if ( document.getElementById( "p-lang" ) ) {
var InterwikiLinks = document.getElementById( "p-lang" ).getElementsByTagName( "li" );
 
for ( var i = 0; i < InterwikiLinks.length; i++ ) {
if ( document.getElementById( InterwikiLinks[i].className + "-fa" ) ) {
InterwikiLinks[i].className += " FA"
InterwikiLinks[i].title = "This is a featured article in another language.";
}
}
}
}
 
addOnloadHook( LinkFA );
 
 
/** Collapsible tables *********************************************************
*
*  Description: Allows tables to be collapsed, showing only the header. See
*               [[Wikipedia:NavFrame]].
*  Maintainers: [[User:R. Koot]]
*/
 
var autoCollapse = 2;
var collapseCaption = "ocultar";
var expandCaption = "mostrar";
 
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
else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
var element = NavigationBoxes[i];
while (element = element.parentNode) {
if ( hasClass( element, "outercollapse" ) ) {
collapseTable ( i );
break;
}
}
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
for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
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
for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
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
for (var i = 0; NavFrame = divs[i]; i++) {
// if found a navigation bar
if (hasClass(NavFrame, "NavFrame")) {
 
indexNavigationBar++;
var NavToggle = document.createElement("a");
NavToggle.className = 'NavToggle';
NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
var isCollapsed = hasClass( NavFrame, "collapsed" );
/*
* Check if any children are already hidden.  This loop is here for backwards compatibility:
* the old way of making NavFrames start out collapsed was to manually add style="display:none"
* to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
* the content visible without JavaScript support), the new recommended way is to add the class
* "collapsed" to the NavFrame itself, just like with collapsible tables.
*/
for (var NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling) {
if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
if ( NavChild.style.display == 'none' ) {
isCollapsed = true;
}
}
}
if (isCollapsed) {
for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
NavChild.style.display = 'none';
}
}
}
var NavToggleText = document.createTextNode(isCollapsed ? NavigationBarShow : NavigationBarHide);
NavToggle.appendChild(NavToggleText);
 
// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
for(var j=0; j < NavFrame.childNodes.length; j++) {
if (hasClass(NavFrame.childNodes[j], "NavHead")) {
NavFrame.childNodes[j].appendChild(NavToggle);
}
}
NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
}
}
}
 
addOnloadHook( createNavigationBarToggleButton );
 
 
/** Main Page layout fixes *********************************************************
*
*  Description: Adds an additional link to the complete list of languages available.
*  Maintainers: [[User:AzaToth]], [[User:R. Koot]], [[User:Alex Smotrov]]
*/
 
function mainPageAppendCompleteListLink() {
addPortletLink('p-lang', 'http://meta.wikimedia.org/wiki/List_of_Wikipedias',
'Complete list', 'interwiki-completelist', 'Complete list of Wikipedias')
}
 
if ((wgTitle == 'Portada' && wgNamespaceNumber == 0) || (wgTitle == 'Wikipedia' && wgNamespaceNumber == 100)) {
addOnloadHook(mainPageAppendCompleteListLink);
addOnloadHook(dshuf);
}
 
//Shuffle for election candidates.
function dshuf() {
var shufsets=new Object()
var rx=new RegExp('dshuf'+'\\s+(dshufset\\d+)', 'i') 
var divs=document.getElementsByTagName("div")
for (var i=0; i<divs.length; i++) {
	if (rx.test(divs[i].className)) {
	    if (typeof shufsets[RegExp.$1]=="undefined") { 
		shufsets[RegExp.$1]=new Object() 
		shufsets[RegExp.$1].inner=[] 
		shufsets[RegExp.$1].member=[]
	    }
	    shufsets[RegExp.$1].inner.push({key:Math.random(),html:divs[i].innerHTML}) 
	    shufsets[RegExp.$1].member.push(divs[i]) 
	}
}
for (shufset in shufsets) {
	shufsets[shufset].inner.sort(function(a,b) {return a.key-b.key})
	for (var i=0; i<shufsets[shufset].member.length; i++) {
	    shufsets[shufset].member[i].innerHTML=shufsets[shufset].inner[i].html
	    shufsets[shufset].member[i].style.display="block"
	}
}
}
 
 
 
/** "Technical restrictions" title fix *****************************************
*
*  Description: For pages that have something like Template:Wrongtitle, replace
*               the title, but only if it is cut-and-pasteable as a valid
*               wikilink. For instance, "NZR WB class" can be changed to
*               "NZR W<sup>B</sup> class", but [[C#]] is not an equivalent wikilink,
*               so [[C Sharp]] doesn't have its main title changed.
*
*               The function looks for a banner like this: 
*               <div id="RealTitleBanner"> ... <span id="RealTitle">title</span> ... </div>
*               An element with id=DisableRealTitle disables the function.
*  Maintainers: Remember_the_dot
*/
 
if (wgIsArticle) //prevents the "Editing " prefix from disappearing during preview
{
addOnloadHook(function()
{
var realTitle = document.getElementById("RealTitle")
 
if (realTitle)
{
//normalizes a title or a namespace name (but not both)
//trims leading and trailing underscores and converts (possibly multiple) spaces and underscores to single underscores
function normalizeTitle(title)
{
return title.replace(/^_+/, "").replace(/_+$/, "").replace(/[\s_]+/g, "_")
}
 
if (realTitle.textContent) //everyone but IE
{
var realTitleText = realTitle.textContent
}
else //IE
{
var realTitleText = realTitle.innerText
}
 
var normalizedRealTitle
var normalizedPageTitle
var indexOfColon = realTitleText.indexOf(":")
var normalizedNamespaceName = normalizeTitle(realTitleText.substring(0, indexOfColon)).toLowerCase()
 
//make namespace prefix lowercase and uppercase the first letter of the title
if (indexOfColon == -1 || wgCanonicalNamespace.toLowerCase() != normalizedNamespaceName) //no namespace prefix - either no colon or a nonsensical namespace prefix (for example, "Foo" in "Foo: The Story of My Life")
{
normalizedRealTitle = normalizeTitle(realTitleText)
normalizedRealTitle = normalizedRealTitle.charAt(0).toUpperCase() + normalizedRealTitle.substring(1)
normalizedPageTitle = wgPageName.charAt(0).toUpperCase() + wgPageName.substring(1)
}
else //using a namespace prefix
{
var normalizedRealPageTitle = normalizeTitle(realTitleText.substring(indexOfColon + 1))
 
normalizedRealTitle = normalizedNamespaceName
if (normalizedNamespaceName != "") //namespace 0 is a special case where the leading colon should never be shown
{
normalizedRealTitle += ":"
}
normalizedRealTitle += normalizedRealPageTitle.charAt(0).toUpperCase() + normalizedRealPageTitle.substring(1)
normalizedPageTitle = wgPageName.substring(0, wgPageName.indexOf(":") + 1).toLowerCase() + wgPageName.substring(wgPageName.indexOf(":") + 1)
}
 
if (normalizedRealTitle == normalizedPageTitle) //normalized titles match, so we can do full replacement
{
var h1 = document.getElementsByTagName("h1")[0]
 
//remove all child nodes, including text
while (h1.firstChild) 
{
h1.removeChild(h1.firstChild)
}
 
//populate with nodes of real title
while (realTitle.firstChild) //the children are moved to a new parent element
{
h1.appendChild(realTitle.firstChild)
}
 
//delete the real title banner since the problem is solved
var realTitleBanner = document.getElementById("RealTitleBanner")
realTitleBanner.parentNode.removeChild(realTitleBanner)
}
 
//no matter what, correct the page title
document.title = realTitleText + " - Wikipedia, the free encyclopedia"
}
})
}
 
 
/** Table sorting fixes ************************************************
*
*  Description: Disables code in table sorting routine to set classes on even/odd rows
*  Maintainers: [[User:Random832]]
*/
 
ts_alternate_row_colors = false;
 
 
/** Modernista referrer ************************************************
*
*  Description: Adds a notice to pages viewed through modernista.com
*  Maintainers: [[User:Random832]]
*/
 
addOnloadHook(function(){
if(/modernista\.com/.test(document.referrer)) {
	 jsMsg('<table><tr><td><img src="http://upload.wikimedia.org/'
	 +'wikipedia/commons/thumb/d/dc/Nuvola_apps_important_yellow.svg/'
	 +'48px-Nuvola_apps_important_yellow.svg.png" /></td><td><br /><br />You '
	 +'appear to have come here from the Modernista website. They '
	 +'enclose Wikipedia’s content with a frame and overlay their '
	 +'own navigation banner on top. Wikipedia does not endorse '
	 +'Modernista and its appearance here should not be taken to '
	 +'imply this.</td></tr></table>');
}
});
 
/***** uploadwizard_newusers ********
* Switches in a message for non-autoconfirmed users at [[Wikipedia:Upload]]
*
*  Maintainers: [[User:Krimpet]]
****/
function uploadwizard_newusers() {
if (wgNamespaceNumber == 4 && wgTitle == "Upload" && wgAction == "view") {
var oldDiv = document.getElementById("autoconfirmedusers"),
newDiv = document.getElementById("newusers");
if (oldDiv && newDiv) {
if (typeof wgUserGroups == "object" && wgUserGroups) {
for (i = 0; i < wgUserGroups.length; i++) {
if (wgUserGroups[i] == "autoconfirmed") {
oldDiv.style.display = "block";
newDiv.style.display = "none";
return;
}
}
}
oldDiv.style.display = "none";
newDiv.style.display = "block";
return;
}
}
}
addOnloadHook(uploadwizard_newusers);
 
 
/** IPv6 AAAA connectivity testing *******************************************************
*
*  Description: Uses hidden images to measure the possible negative impact of IPv6
*  enabling the Wikimedia sites.
*  This works by adding a hidden div to the footer with several image tags. 
*  The source addresses of the image tags are set to domainnames which have v4, v6 and
*  both address types set.  The script times how long objects take to load.
*  Results are sent back to the server. http://ipv6and4.labs.wikimedia.org/stats.html
*  Based on http://www.braintrust.co.nz/ipv6wwwtest/
*  Contact: [[User:Gmaxwell]], [[User:Mark Bergsma]], [[User:Mindspillage]]
*/
 
var __ipv6wwwtest_factor = 100;
var __ipv6wwwtest_done = 0;
if ((wgServer != "https://secure.wikimedia.org") && (Math.floor(Math.random()*__ipv6wwwtest_factor)==42)) {
var __ipv6wwwtest_timeoutMsec = 10000; // Timeout for 'final' result message in milliseconds
var __ipv6wwwtest_hostSuffix = ".labs.wikimedia.org"; // Suffix to go on the IMG hostnames
var __ipv6wwwtest_stopAtTimeout = true; // Whether to stop when the timeout is reached or not
 
var __ipv6wwwtest_pageLoadTime;
var __ipv6wwwtest_timeout = false;
var __ipv6wwwtest_ipv4LoadTime = false;
var __ipv6wwwtest_ipv4relLoadTime = false;
var __ipv6wwwtest_ipv6LoadTime = false;
var __ipv6wwwtest_ipv6bigLoadTime = false;
var __ipv6wwwtest_ipv6and4LoadTime = false;
var __ipv6wwwtest_id = Math.floor(Math.random()*Math.pow(2,31));
 
function __ipv6wwwtest_startTest() {
__ipv6wwwtest_pageLoadTime = new Date();
document.getElementById("__ipv6wwwtest_ipv4Img").src = "http://ipv4" + __ipv6wwwtest_hostSuffix +"/ipv4.gif?id=" + __ipv6wwwtest_id;
document.getElementById("__ipv6wwwtest_ipv4relImg").src = "//ipv4" + __ipv6wwwtest_hostSuffix +"/ipv4.gif?rel=1&id=" + __ipv6wwwtest_id;
document.getElementById("__ipv6wwwtest_ipv6Img").src = "http://ipv6" + __ipv6wwwtest_hostSuffix +"/ipv6.gif?id=" + __ipv6wwwtest_id;
document.getElementById("__ipv6wwwtest_ipv6and4Img").src = "http://ipv6and4" + __ipv6wwwtest_hostSuffix +"/ipv6and4.gif?id=" + __ipv6wwwtest_id;
document.getElementById("__ipv6wwwtest_ipv6bigImg").src = "http://ipv6" + __ipv6wwwtest_hostSuffix +"/ipv6big.gif?id=" + __ipv6wwwtest_id;
}
 
function __ipv6wwwtest_sendResults(stage) {
document.getElementById("__ipv6wwwtest_resultsImg").src = "http://results" + __ipv6wwwtest_hostSuffix +"/results.gif?id=" + __ipv6wwwtest_id + "&stage=" + stage + "&timeout=" + __ipv6wwwtest_timeoutMsec + "&stop_at_timeout=" + __ipv6wwwtest_stopAtTimeout + "&ipv4=" + __ipv6wwwtest_getLoadTime(__ipv6wwwtest_ipv4LoadTime) + "&ipv6=" + __ipv6wwwtest_getLoadTime(__ipv6wwwtest_ipv6LoadTime) + "&ipv6and4=" + __ipv6wwwtest_getLoadTime(__ipv6wwwtest_ipv6and4LoadTime) + "&ipv6big=" + __ipv6wwwtest_getLoadTime(__ipv6wwwtest_ipv6bigLoadTime) +"&ipv4rel="+ __ipv6wwwtest_getLoadTime(__ipv6wwwtest_ipv4relLoadTime) + "&rate=" + __ipv6wwwtest_factor;
};
 
function __ipv6wwwtest_getLoadTime(item) {
if (item == false) {
return "NaN";
} else {
return (item.getTime() - __ipv6wwwtest_pageLoadTime.getTime());
}
}
 
function __ipv6wwwtest_checkFinished() {
if ( (! __ipv6wwwtest_ipv6LoadTime) || (! __ipv6wwwtest_ipv4LoadTime) || (! __ipv6wwwtest_ipv6and4LoadTime) || (! __ipv6wwwtest_ipv6bigLoadTime) || (! __ipv6wwwtest_getLoadTime)) {
if (!__ipv6wwwtest_timeout) {
__ipv6wwwtest_timeout = window.setTimeout('__ipv6wwwtest_sendFinalResults()',__ipv6wwwtest_timeoutMsec);
}
__ipv6wwwtest_sendResults('partial');
} else {
__ipv6wwwtest_sendFinalResults();
}
}
 
function __ipv6wwwtest_sendFinalResults() {
if (__ipv6wwwtest_done==0) {
if (__ipv6wwwtest_timeout) {
window.clearTimeout(__ipv6wwwtest_timeout);
}
__ipv6wwwtest_sendResults('final');
 
if (__ipv6wwwtest_stopAtTimeout) {
document.getElementById("__ipv6wwwtest_ipv4Img").src = "";
document.getElementById("__ipv6wwwtest_ipv4relImg").src = "";
document.getElementById("__ipv6wwwtest_ipv6Img").src = "";
document.getElementById("__ipv6wwwtest_ipv6and4Img").src = "";
document.getElementById("__ipv6wwwtest_ipv6bigImg").src = "";
}
}
__ipv6wwwtest_done=1;
}
addOnloadHook(function() {
v6sub=document.getElementById("footer");
v6sub.innerHTML=v6sub.innerHTML+'<div style="visibility: hidden;"> <img height="1" width="1" src="" id="__ipv6wwwtest_ipv4Img" onload="__ipv6wwwtest_ipv4LoadTime = new Date(); __ipv6wwwtest_checkFinished();" /> <img height="1" width="1" src="" id="__ipv6wwwtest_ipv4relImg" onload="__ipv6wwwtest_ipv4relLoadTime = new Date(); __ipv6wwwtest_checkFinished();" /> <img height="1" width="1" src="" id="__ipv6wwwtest_ipv6and4Img" onload="__ipv6wwwtest_ipv6and4LoadTime = new Date(); __ipv6wwwtest_checkFinished();" /> <img height="1" width="1" src="" id="__ipv6wwwtest_ipv6Img" onload="__ipv6wwwtest_ipv6LoadTime = new Date(); __ipv6wwwtest_checkFinished();" /> <img height="1" width="1" src="" id="__ipv6wwwtest_ipv6bigImg" onload="__ipv6wwwtest_ipv6bigLoadTime = new Date(); __ipv6wwwtest_checkFinished();" /> <img height="1" width="1" src="" id="__ipv6wwwtest_resultsImg" /> </div>';
if (document.getElementById("__ipv6wwwtest_ipv4Img") && document.getElementById("__ipv6wwwtest_ipv6Img") && document.getElementById("__ipv6wwwtest_ipv6and4Img") && document.getElementById("__ipv6wwwtest_ipv6bigImg")) {
__ipv6wwwtest_startTest();
}
});
}
 
/** Disambig editintro ********************************************************
*
*  Description: Adds an editintro on disambiguation pages. Original code
*  located at [[User:RockMFR/disambigeditintro.js]].
*
*  Maintainers: [[User:RockMFR]], [[User:Quiddity]]
*/
 
if (wgNamespaceNumber == 0) addOnloadHook(function(){
if (!document.getElementById('disambig')) return
var el = document.getElementById('ca-edit')
if (el) el = el.getElementsByTagName('a')[0]
if (el) el.href += '&editintro=Template:Disambig_editintro'
})
 
//</source>

/**
 * Metadata assessment script
 * Finds the WP 1.0/WikiProject assessment of every article you go to, then 
 * displays that information in the article header.
 * @author Outriggr - created the script and used to maintain it
 * @author Pyrospirit - currently maintains and updates the script
 */
 
// Import stylesheet with custom classes for header colors
importStylesheet('MediaWiki:Common.css');
 
/**
 * This is the constructor for the script object. All functions this script 
 * defines are inside this.
 * @constructor
 */
MetadataScript = function () {};
MetadataScript.createObject = true; // create an instance of MetadataScript
MetadataScript.autorun = true; // run automatically when the page finishes loading
 
/**
 * Starts the script object running. The main function of the script. If the 
 * getMainType() function can find the assessment, it uses that assessment 
 * for the page, parses it, and displays it in the header. Otherwise, it runs 
 * ajaxMain().
 */
MetadataScript.prototype.init = function () {
    this.initBefore();
    var initialAssessment = this.checkArticle(); // checks for types visible from article page
    if ( initialAssessment.exists ) {
        this.currentAssessment = initialAssessment;
        var data = this.talkAssess(this.currentAssessment);
        this.update(data.newClass, data.slogan, data.info);
    }
    else this.ajaxMain(); // proceed to check the talk page
    this.initAfter();
};
MetadataScript.prototype.initBefore = function () {};
MetadataScript.prototype.initAfter = function () {};
 
/**
 * The main function when an AJAX request is needed to find the assessment. 
 * Creates an AJAX request for the contents of a URL (defaults to the 
 * first section of the article's talk page), then sends the request. After 
 * getting the requested data back, it finds the assessment information in 
 * the data, then uses and displays that assessment in the header.
 * @param {String} arguments[0] - Optional: override the default URL for the 
 *        request.
 */
MetadataScript.prototype.ajaxMain = function () {
    if ( arguments[0] && arguments[0].match(/^https?:\/\//i) ) // optional url override
        this.url = arguments[0];
    else this.url = wgServer + wgScript + '?title=Talk:' + encodeURIComponent(wgPageName)
        + '&action=raw&section=0';
    this.request = sajax_init_object();
    if ( this.request ) {
        var self = this; // store value of 'this'
        this.request.onreadystatechange = function () {
            self.stateChangeFunction.call(self);
        }
        this.request.open('GET', this.url, true);
        this.request.send(null);
    }
};
 
/**
 * This function is passed as a parameter to ajaxMain. It is called each time 
 * this.request updates, and the code inside the conditional runs when the 
 * data is available.
 */
MetadataScript.prototype.stateChangeFunction = function () {
    if ( this.request.readyState == 4 && this.request.status == 200 ) {
        this.text = this.request.responseText;
        var rating = this.getRating(this.text);
        this.currentAssessment = this.getAssessment(this.text, rating);
        var data = this.talkAssess(this.currentAssessment);
        this.update(data.newClass, data.slogan, data.info);
        this.onCompletedRequest();
    }
};
MetadataScript.prototype.onCompletedRequest = function () {};
 
/**
 * Checks for various objects on the article page that indicate a certain 
 * assessment, such as a featured star or disambiguation page notice. If this 
 * function can find the assessment, AJAX is not needed for this page.
 * @return {Object} assess - the assessment in an easily readable format
 * @static
 */
MetadataScript.prototype.checkArticle = function () {
    var assess = {};
    assess.extra == '';
    assess.exists = true;
    if ( document.getElementById('disambig') )
        assess.rating = 'dab';
    else if ( document.getElementById('setindexbox') )
        assess.rating = 'setindex';
    else if ( document.getElementById('contentSub').innerHTML == 'Redirect page' )
        assess.rating = 'redir';
    else if ( document.getElementById('ca-talk').className == 'new' ) // no talk page
        assess.rating = 'none';
    else assess.exists = false; // none of the above, no assessment found
    return assess;
};
 
/**
 * Searches the provided wikicode for the rating part of an assessment and 
 * returns it as a string.
 * Note that a higher assessment takes priority, and less-used assessments 
 * such as "list", "current", or "future" are used only if nothing else can 
 * be found.
 * @param {String} text - some wikitext to be searched for assessment info
 * @return {String} rating - the article's current assessment
 */
MetadataScript.prototype.getRating = function (text) {
    this.getRatingBefore();
    if ( text.match(/\b(class|currentstatus) *= *fa\b/i) ) rating = 'fa';
    else if ( text.match(/\b(class|currentstatus) *= *fl\b/i) ) rating = 'fl';
    else if ( text.match(/\bclass *= *a\b/i) ) {
        if ( text.match(/\bclass *= *ga\b|\bcurrentstatus *= *(ffa\/)?ga\b/i) )
            rating = 'a/ga'; // A-class articles that are also GA's
        else rating = 'a';
    } else if ( text.match(/\bclass *= *ga\b|\bcurrentstatus *= *(ffa\/)?ga\b|\{\{ *ga *\|/i)
               && !text.match(/\bcurrentstatus *= *dga\b/i) ) rating = 'ga';
    else if ( text.match(/\bclass *= *b\b/i) ) rating = 'b';
    else if ( text.match(/\bclass *= *bplus\b/i) ) rating = 'bplus'; // used by WP Math
    else if ( text.match(/\bclass *= *c\b/i) ) rating = 'c';
    else if ( text.match(/\bclass *= *start/i) ) rating = 'start';
    else if ( text.match(/\bclass *= *stub/i) ) rating = 'stub';
    else if ( text.match(/\bclass *= *list/i) ) rating = 'list';
    else if ( text.match(/\bclass *= *(dab|disambig)/i) ) rating = 'dab';
    else if ( text.match(/\bclass *= *cur(rent)?/i) ) rating = 'cur';
    else if ( text.match(/\bclass *= *future/i) ) rating = 'future';
    else rating = 'none';
    this.getRatingAfter();
    return rating;
}
MetadataScript.prototype.getRatingBefore = function () {};
MetadataScript.prototype.getRatingAfter = function () {};
 
/**
 * Searches the provided wikicode for data on the article's current and past 
 * featured or good status and returns an object that contains this data 
 * along with some miscellaneous other bits of information.
 * @param {String} text - some wikitext to be searched for assessment info
 * @return {Object} assess - the assessment data for the page
 */
MetadataScript.prototype.getAssessment = function (text, rating) {
    this.getAssessmentBefore();
    var assess = {};
    var actionNumber = 0; // action number in ArticleHistory template
    var reviewMatch; // temporarily stores match objects
    assess.rating = rating;
    assess.pageLink = null;
 
    // Current nominations (FAC, FLC, or GAN)
    if ( (assess.reg = text.match(/\{\{ *fac *[\|\}]/i)) ) {
        assess.extra = 'fac';
    } else if ( (assess.reg = text.match(/\{\{ *flc *\}\}/i)) ) {
        assess.extra = 'flc';
    } else if ( (assess.reg = text.match(/\{\{ *ga ?nominee *[\|\}]/i)) ) {
        assess.extra = 'gan';
    }
    // Current reviews of a status (FAR, FLRC, or GAR)
    else if ( (assess.reg = text.match(/\{\{ *far(ce?)? *[\|\}]/i)) ) {
        assess.extra = 'far';
    } else if ( (assess.reg = text.match(/\{\{ *flrc *[\|\}]/i)) ) {
        assess.extra = 'flrc';
    } else if ( (assess.reg = text.match(/\{\{ *gar\/link *[\|\}]/i)) ) {
        assess.extra = 'gar';
    }
    // Former statuses (FFA, FFL, or DGA)
    else if ( (assess.reg = text.match(/\bcurrentstatus *= *ffa\b/i)) ) {
        reviewMatch = text.match(/\baction(\d+) *= *far\b/gi);
        actionNumber = reviewMatch[reviewMatch.length - 1].match(/\d+/);
        assess.pageLink = true;
        assess.extra = 'ffa';
    } else if ( (assess.reg = text.match(/\{\{ *formerfa2?\b/i)) ) {
        assess.extra = 'ffa';
    } else if ( (assess.reg = text.match(/\bcurrentstatus *= *ffl\b/i)) ) {
        assess.extra = 'ffl';
    } else if ( (assess.reg = text.match(/\{\{ *ffl *[\|\}]/i)) ) {
        assess.extra = 'ffl';
    } else if ( (assess.reg = text.match(/\bcurrentstatus *= *dga\b/i)) ) {
        reviewMatch = text.match(/\baction(\d+) *= *gar\b/gi);
        actionNumber = reviewMatch[reviewMatch.length - 1].match(/\d+/);
        assess.pageLink = true;
        assess.extra = 'dga';
    } else if ( (assess.reg = text.match(/\{\{ *d(elisted)?ga *[\|\}]/i)) ) {
        assess.extra = 'dga';
    }
    // Former nominations (former FAC, FLC, or GAN)
    else if ( (assess.reg = text.match(/\baction(\d+) *= *fac\b/gi))
            && !assess.rating.match(/f[al]/i) ) {
        actionNumber = assess.reg[assess.reg.length - 1].match(/\d+/);
        assess.pageLink = true;
        assess.extra = 'ffac';
    } else if ( (assess.reg = text.match(/\{\{ *fac?(failed|(\-| \()?contested\)?) *[\|\}]/i)) ) {
        assess.extra = 'ffac';
    } else if ( (assess.reg = text.match(/\baction(\d+) *= *flc\b/gi))
            && !assess.rating.match(/f[al]/i) ) {
        actionNumber = assess.reg[assess.reg.length - 1].match(/\d+/);
        assess.pageLink = true;
        assess.extra = 'fflc';
    } else if ( (assess.reg = text.match(/\baction(\d+) *= *gan\b/gi))
            && !assess.rating.match(/f[al]|(a\/)?ga/i) ) {
        actionNumber = assess.reg[assess.reg.length - 1].match(/\d+/);
        assess.pageLink = true;
        assess.extra = 'fgan';
    } else if ( (assess.reg = text.match(/\{\{ *f(ailed ?)?ga *[\|\}]/i)) ) {
        assess.extra = 'fgan';
    } else assess.extra = 'none';
 
    // Looks for currently active peer reviews
    var peerReview;
    if ( (peerReview = text.match(/\{\{ *peer[_ ]?review *\| *archive *= *(\d+)\b/i)) ) {
        assess.review = 'Wikipedia:Peer_review/' + wgPageName + '/archive'
            + peerReview[1];
    } else assess.review = null;
 
    // Scans for the link associated with an action in ArticleHistory
    if ( assess.pageLink ) {
        var linkPattern = RegExp('\\baction' + actionNumber + 'link *= *([^\\n\\|]+)\\s*\\|');
        var linkMatch = text.match(linkPattern);
        assess.pageLink = linkMatch ? linkMatch[1] : null;
    }
 
    assess.exists = true;
    this.getAssessmentAfter();
    return assess;
}
MetadataScript.prototype.getAssessmentBefore = function () {};
MetadataScript.prototype.getAssessmentAfter = function () {};
 
/**
 * Parses an assessment object into the HTML and CSS code needed to update 
 * the article header. If it doesn't recognize a part of the information 
 * given, it will simply ignore it and mark as unassessed.
 * @param {Object} assess - assessment information for this article
 * @return {String} newClass - the CSS class corresponding to its assessment
 * @return {String} slogan - HTML giving (with a link) the main assessment
 * @return {String} info - HTML giving (with a link) additional information
 */
MetadataScript.prototype.talkAssess = function (assess) {
    this.talkAssessBefore();
 
    var path = wgArticlePath.replace('$1', '');
    var assessLink = path + 'Wikipedia:Version_1.0_Editorial_Team/Assessment';
    if ( typeof assess.extra === 'undefined' ) assess.extra = '';
    var extra = assess.extra.toLowerCase();
    var rating = assess.rating.toLowerCase();
    var pageLink = this.encodePageName(assess.pageLink);
    var peerReview = this.encodePageName(assess.review);
 
    var info = this.getExtraInfo(extra, pageLink);
    info = this.addPeerReview(info, peerReview);
 
    if ( rating == 'a' || rating == 'a/ga' ) {
        newClass = 'assess-A-text';
        slogan = 'An <a href="' + assessLink + '">A-class</a> article';
        if ( rating == 'a/ga' ) {
            if ( info.length == 0 ) info += '.';
            info += ' Also a <a href="' + path + 'Wikipedia:Good_Articles">good article</a>.'
        }
    } else if ( rating == 'ga' ) {
        newClass = 'assess-GA-text';
        slogan = 'A <a href="' + path + 'Wikipedia:Good_Articles">good article</a>'
    } else if ( rating == 'b' ) {
        newClass = 'assess-B-text';
        slogan = 'A <a href="' + assessLink + '">B-class</a> article';
    } else if ( rating == 'bplus' ) {
        newClass = 'assess-Bplus-text';
        slogan = 'A <a href="' + path + 'Wikipedia:WikiProject_Mathematics/Wikipedia_1.0'
            + '/Grading_scheme">B-plus-class</a> article';
    } else if ( rating == 'c' ) {
        newClass = 'assess-C-text';
        slogan = 'A <a href="' + assessLink + '">C-class</a> article';
    } else if ( rating == 'start' ) {
        newClass = 'assess-Start-text';
        slogan = 'A <a href="' + assessLink + '">start-class</a> article';
    } else if ( rating == 'stub' ) {
        newClass = 'assess-Stub-text';
        slogan = 'A <a href="' + assessLink + '">stub-class</a> article';
    } else if ( rating == 'list' ) {
        newClass = 'assess-List-text';
        slogan = 'A <a href="' + path + 'Wikipedia:Lists">list-class</a> article';
    } else if ( rating == 'dab' ) {
        newClass = 'assess-Dab-text';
        slogan = 'A <a href="' + path + 'Wikipedia:Disambiguation">disambiguation page</a>';
    } else if ( rating == 'setindex' ) {
        newClass = 'assess-Setindex-text';
        slogan = 'A <a href="' + path + 'Wikipedia:Disambiguation#Set_index_articles">'
            + 'set index article</a>';
    } else if ( rating == 'redir' ) {
        newClass = 'assess-Redir-text';
        slogan = 'A <a href="' + path + 'Help:Redirect">redirect page</a>';
    } else if ( rating == 'fl' ) {
        newClass = 'assess-FL-text';
        slogan = 'A <a href="' + path + 'Wikipedia:Featured_lists">featured list</a>';
    } else if ( rating == 'fa' ) {
        newClass = 'assess-FA-text';
        slogan = 'A <a href="' + path + 'Wikipedia:Featured_articles">featured article</a>';
    } else if ( rating == 'cur' ) {
        newClass = 'assess-Cur-text';
        slogan = 'A <a href="' + path + 'Portal:Current_events">current-class</a> article';
    } else if ( rating == 'future' ) {
        newClass = 'assess-Future-text';
        slogan = 'A <a href="' + path + 'Category:Future-Class_articles">future-class</a>'
            + ' article';
    } else {
        newClass = '';
        slogan = 'An <a href="' + assessLink + '">unassessed</a> article';
    }
 
    // Add CSS classes to allow for customization
    slogan = '<span class="assess-article-rating">' + slogan + '</span>';
    info = '<span class="assess-info-all">' + info + '</span>';
 
    this.talkAssessAfter();
    return {newClass: newClass, slogan: slogan, info: info};
};
MetadataScript.prototype.talkAssessBefore = function () {};
MetadataScript.prototype.talkAssessAfter = function () {};
 
/**
 * Creates an info string based on the assessment info and a page link.
 */
MetadataScript.prototype.getExtraInfo = function (extra, pageLink) {
    var info = '';
    var page = this.encodePageName(wgPageName);
    if ( extra == 'fac' ) {
        info = this.makeInfoString('Currently a', pageLink, 'Wikipedia:Featured_article_candidates/'
            + page, 'featured article candidate', null);
    } else if ( extra == 'flc' ) {
        info = this.makeInfoString('Currently a', pageLink, 'Wikipedia:Featured_list_candidates/'
            + page, 'featured list candidate', null);
    } else if ( extra == 'gan' ) {
        info = this.makeInfoString('Currently a', pageLink, 'Wikipedia:Good_article_nominations',
            'good article nominee', null);
    } else if ( extra == 'far' ) {
        info = this.makeInfoString('Currently undergoing', pageLink, 'Wikipedia:Featured_article_review/'
            + page, 'review', 'of its featured status');
    } else if ( extra == 'flrc' ) {
        info = this.makeInfoString('Currently a', pageLink, 'Wikipedia:Featured_list_removal_candidates/'
            + page, 'candidate', 'for removal as a featured list');
    } else if ( extra == 'gar' ) {
        info = this.makeInfoString('Currently undergoing a', pageLink, 'Wikipedia:Good_article_reassessment',
            'reassessment', 'of its status as a good article');
    } else if ( extra == 'ffa' ) {
        info = this.makeInfoString('A', pageLink, 'Wikipedia:Featured_article_review/' + page,
            'former', 'featured article');
    } else if ( extra == 'ffl' ) {
        info = this.makeInfoString('A', pageLink, 'Wikipedia:Featured_list_removal_candidates/'
            + page, 'former', 'featured list');
    } else if ( extra == 'dga' ) {
        info = this.makeInfoString('A', pageLink, 'Wikipedia:Good_article_reassessment',
            'delisted', 'good article');
    } else if ( extra == 'ffac' ) {
        info = this.makeInfoString('A former', pageLink, 'Wikipedia:Featured_article_candidates/'
            + page, 'featured article candidate', null);
    } else if ( extra == 'fflc' ) {
        info = this.makeInfoString('A former', pageLink, 'Wikipedia:Featured_list_candidates/'
            + page, 'featured list candidate', null);
    } else if ( extra == 'fgan' ) {
        info = this.makeInfoString('A former', pageLink, 'Wikipedia:Good_article_nominations',
            'good article nominee', null);
    }
    return info;
};
 
/**
 * Adds the peer review text to an info string, if a peer review was detected earlier.
 */
MetadataScript.prototype.addPeerReview = function (info, peerReview) {
    var path = wgArticlePath.replace('$1', '');
    if ( peerReview ) {
        if ( info.length == 0 ) info += '.'; // the period is omitted if there's no extra info
        info += '<span class="assess-info-review"> Currently being <a href="' + path
            + peerReview + '">peer reviewed</a>.</span>';
    }
    return info;
};
 
/**
 * Updates article header with new assessment information by giving it a new 
 * class (for style information such as color) and altering the tagline below 
 * it to state the assessment found.
 * @param {String} newClass - the CSS class name added to the article header
 * @param {String} slogan - italicized text prepended to the tagline, showing 
 *        the article's main assessment
 * @param {String} info - additional assessment info appended to the tagline
 * @static
 */
MetadataScript.prototype.update = function (newClass, slogan, info) {
    var firstHeading = document.getElementsByTagName('h1')[0];
    firstHeading.className += ' ' + newClass; // add newClass as an additional class
    document.getElementById('siteSub').innerHTML = slogan
        + ' from Wikipedia, the free encyclopedia' + info;
};
 
/**
 * Creates a string formatted for the 'info' parameter in the update method.
 * @param start - text at the beginning of the string, before the link
 * @param pageLink - a link to the target page
 * @param defLink - the backup page link if !pageLink
 * @param linkText - the text of the link
 * @param end - text after the link
 * @return {String} output - the info string
 * @static
 */
MetadataScript.prototype.makeInfoString = function (start, pageLink, defLink, linkText, end) {
    var output;
    // path is usually just '/wiki/', but it's different on secure.wikimedia.org
    var path = wgArticlePath.replace('$1', '');
    var page = pageLink ? path + pageLink : (defLink ? path + defLink : null);
    start = start ? '. ' + start.toString() + ' ' : '';
    linkText = linkText ? linkText.toString() : '';
    end = end ? ' ' + end.toString() + '.' : '.';
    output = start + (page ? '<a href="' + page + '"' + (linkText ? '>' : ' \/>') : '')
        + linkText + ((page && linkText) ? '<\/a>' : '') + end;
    return output;
};
 
/**
 * Encodes the URL of a Wikipedia page for use in the talkAssess method.
 * @param {String} inputText - the unencoded full page name
 * @return {String} outputText - the encoded page name
 * @static
 */
MetadataScript.prototype.encodePageName = function (inputText) {
    if ( !inputText ) return null;
    var outputText = encodeURIComponent(inputText);
    while ( outputText != null && outputText.match(/(\%20|\%2F)/i) ) {
        outputText = outputText.replace(/\%20/i, '_'); // unescape spaces for readability
        outputText = outputText.replace(/\%2F/i, '\/'); // %2F must be unescaped
    }
    return outputText;
};
 
/**
 * Creates the global MetadataObject as an instance of MetadataAssessmentScript, then 
 * calls the init() method of MetadataObject to start the script.
 */
if ( wgNamespaceNumber == 0 && (wgAction == 'view' || wgAction == 'purge')
        && document.location.href.search(/\?(.+\&)?printable=[^&]/i) == -1
        && wgPageName != 'Portada' ) {
    addOnloadHook(function () {
        if ( !MetadataScript.createObject ) return;
        if ( typeof MetadataObject === 'undefined' ) // only load object once
            MetadataObject = new MetadataScript();
        if ( MetadataScript.autorun )
            MetadataObject.init();
    });
}