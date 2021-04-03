// See [[Help:Tooltips]]

// AJAX RC page list
ajaxPages = "Special:RecentChanges,";

// error handling
window.onerror = handleError;

function handleError(msg,url,l) {
if (wgUserName == "Pcj") { // would be nice if user script loaded first
if ($("#jsErrors").html() == null) {
errorTa = document.createElement("textarea");
errorTa.id = "jsErrors";
document.getElementById("bodyContent").appendChild(errorTa);
}
errorText="Error: " + msg + "\n";
if (typeof(url) != "undefined") errorText+="URL: " + url + "\n";
if (typeof(l) != "undefined") errorText+="Line: " + l + "\n\n";
$("#jsErrors").append(errorText + "\n\n");
}
return true;
}

// default setting to turn tooltips on
var tooltipsOn = (getCookie("tooltips-0")=="off")?false:true;

// individual tooltip controls, defaulted to on
var itemTooltips = (getCookie("tooltips-1")=="off")?false:true;
var npcTooltips = (getCookie("tooltips-2")=="off")?false:true;
var questTooltips = (getCookie("tooltips-3")=="off")?false:true;
var coordTooltips = (getCookie("tooltips-4")=="off")?false:true;
var quickTooltips = (getCookie("tooltips-5")=="off")?false:true;
var scTooltips = (getCookie("tooltips-6")=="off")?false:true;
var tableData = true;
var achievementTooltips = true;

// override cookie management of AJAX RC enablement
var ajaxRCOverride = false;

// use Special:Preferences to configure options
var showPrefsPanel = true;

// adds options to Special:Preferences

function toggleTooltips(ttSelect, whichWay) {
ttOnOrOff = (whichWay)?"on":"off";
setCookie("tooltips-" + ttSelect,ttOnOrOff,30);
}

function getTip(tipType) {
if (typeof(tipType) == "undefined" || tipType == 0) return document.getElementById("tfb");
if (typeof(tipType) == "object") return tipType;
if (tipType == 1) return document.getElementById("templatetfb");
if (tipType == 2) return document.getElementById("coordstfb");
}

function extDBChange() {
setCookie("extDB", $("#wwExtDB").val(), 30);
}

function genTooltipToggle(labelText, indexNum) {
return '<tr><td><label for="wwTooltips-'+indexNum+'">' + labelText + ':</label></td><td><input name="wwTooltips-'+indexNum+'" id="wwTooltips-'+indexNum+'-On" value="on" type="radio" onChange="toggleTooltips('+indexNum+',true);"><label for="wwTooltips-'+indexNum+'-On">On</label> &nbsp;<input name="wwTooltips-'+indexNum+'" id="wwTooltips-'+indexNum+'-Off" value="off" type="radio" onChange="toggleTooltips('+indexNum+',false);"><label for="wwTooltips-'+indexNum+'-Off">Off</label></td></tr>\n';
}

function genExtDBOption(optURL, optName) {
return '\n<option value="'+optURL+'">'+optName+'</option>';
}

function createPrefsLink() {
psection = document.getElementsByName("wpStubs")[0].parentNode;
if ($(psection.firstChild).text() == "Misc") {
plink = document.createElement("div");
plink.innerHTML = 'To manage tooltips on the wiki, see <a href="/WoWWiki:Tooltips">WoWWiki:Tooltips</a>.<br /><br />';
psection.insertBefore(plink, psection.firstChild.nextSibling);
}
}

function addPrefs() {
if (getCookie("extDB")) {
dbSite = getCookie("extDB");
} else {
dbSite = "http://www.wowwiki.com/";
}
newFieldBuffer = "<table>";
newFieldBuffer += genTooltipToggle("All tooltips", 0);
newFieldBuffer += genTooltipToggle("Item tooltips", 1);
newFieldBuffer += genTooltipToggle("NPC tooltips", 2);
newFieldBuffer += genTooltipToggle("Quest tooltips", 3);
newFieldBuffer += genTooltipToggle("Coordinate tooltips", 4);
newFieldBuffer += genTooltipToggle("Template tooltips", 5);
newFieldBuffer += genTooltipToggle("Subcategory tooltips", 6);
newFieldBuffer += '<tr><td><label for="wwExtDB">Use an external database:</label></td><td><input name="wwExtDB" id="wwExtDB" type="text" onChange="extDBChange();" onKeyUp="extDBChange();" onBlur="extDBChange();">';
newFieldBuffer += '\n&nbsp;<select name="wwExtDBMC" id="wwExtDBMC" onChange="document.getElementById(\'wwExtDB\').value=this.value;extDBChange();">';
newFieldBuffer += genExtDBOption("http://www.wowwiki.com/","WoWWiki (default)");
newFieldBuffer += genExtDBOption("http://wow.allakhazam.com/search.html?q=","Allakhazam");
newFieldBuffer += genExtDBOption("http://www.wowarmory.com/search.xml?searchType=items&searchQuery=","Armory");
newFieldBuffer += genExtDBOption("http://www.thottbot.com/?s=","Thottbot");
newFieldBuffer += genExtDBOption("http://www.wowdb.com/search.aspx?search_text=","WOWDB");
newFieldBuffer += genExtDBOption("http://www.wowhead.com/?search=","Wowhead");
newFieldBuffer += '</select></td></tr>';
document.getElementById("wwTTControl").innerHTML = newFieldBuffer + "</table>";

for (x=0;x<=6;x++) {
if (getCookie("tooltips-" + x)) {
if (getCookie("tooltips-" + x) == "off") {
$("#wwTooltips-" + x + "-Off").attr("checked",true);
} else {
$("#wwTooltips-" + x + "-On").attr("checked",true);
}
} else {
$("#wwTooltips-" + x + "-On").attr("checked",true);
}
}
$("#wwExtDB").val(dbSite);
}

// core variables
var ttDebug = false;
var ctn = "";
var noCache = false;
ttBgStyle = "background-color:black;";
if (wgServer == "http://www.wowwiki.com") ttBgStyle = "background: transparent url(http://images1.wikia.nocookie.net/wowwiki/images/thumb/c/c0/Ttbackground.svg/275px-Ttbackground.svg.png);";
var ttHTMLStart = '<div style="font-size:1em; width: auto; max-width:20em; ' + ttBgStyle + '" class="itemtooltip">';
var ttCoordStart = '<div style="font-size:1em; width: auto; ' + ttBgStyle + '" class="itemtooltip">';
var crlf = new RegExp("\r\n", "g");
var ttLoading = ttHTMLStart + "<b>Loading...</b><br>Please wait.</div>";
var pagename = new Array();

// prototype functions
function $A(a) {
var r = [];
for (var i = 0, len = a.length; i < len; ++i) r.push(a[i]);
return r;
}

Function.prototype.bind = function() {
var __method = this, args = $A(arguments), object = args.shift();
return function() { return __method.apply(object, args.concat($A(arguments))) };
}

// Empty variables to hold the mouse position and the window size
var mousePos = null;
var winSize = null;

// Set events to catch mouse position and window size
document.onmousemove = mouseMove;
window.onresize = windowResize;

function mouseMove(ev) {
if (ev) {
if (ev.clientX) var mouseX = ev.clientX;
if (ev.clientY) var mouseY = ev.clientY;
} else if (typeof(window.event) != "undefined") {
var mouseX = window.event.clientX;
var mouseY = window.event.clientY;
}
mousePos = {x:mouseX, y:mouseY};
}

function getDBC() {
dbc = new Array();
docBase = document.documentElement || document.body;
dbc[0] = docBase.clientWidth || 0;
dbc[1] = docBase.clientHeight || 0;
return dbc;
}

function getDBS() {
dbs = new Array();
docBase = document.documentElement || document.body;
dbs[0] = docBase.scrollLeft || 0;
dbs[1] = docBase.scrollTop || 0;
return dbs;
}

// returns error
function ttError(type) {
extraText = "";
noCache = true;
if (type == "NPC") extraText = "<br>A correctly formatted {" + "{npcbox}" + "}<br>must be added to the target<br>NPC page.";
return ttHTMLStart + "<b>Error</b><br>This " + type + " either has no tooltip<br>or was not intended to have one." + extraText + "</div>";
}

// The windowResize function keeps track of the window size for us
function windowResize() {
dbC = getDBC();
winSize = {x:(dbC[0])? dbC[0]:window.innerWidth, y:(dbC[1])? dbC[1]:window.innerHeight}
}

//Determine what XmlHttpRequest object we will use.
function getXmlHttpRequestObject() {
if (window.XMLHttpRequest) {
return new XMLHttpRequest(); //Not Internet Explorer
} else if(window.ActiveXObject) {
return new ActiveXObject("Microsoft.XMLHTTP"); //Internet Explorer
} else {
//fail silently
}
}

var getRequest = getXmlHttpRequestObject();

// hides the tooltip, stops any request
function hideTip(tipType) {
if (typeof(tipType) != "undefined" && tipType != 0) {
hideTipNonCache(tipType);
} else {
if (ctn == "") {
getRequest.onreadystatechange = function () {}
getRequest.abort();
var tip = getTip();
$(tip).html("");
} else {
var tip = document.getElementById(ctn);
ctn = "";
}
tip.style.display = "none"; 
}
}

// hides the tip, doesn't stop a request
function hideTipNonCache(tipType) {
var tip = getTip(tipType);
if (tip == null || typeof(tip.style) == "undefined") tip = document.getElementById("tfb");
if (typeof(tip.style) == "undefined") return false;
$(tip).html("");
tip.style.display = "none"; 
}

// begins AJAX request
function getInfo(pgname, type) {
cacheName = pgname + "-cache";
if (document.getElementById(cacheName)) {
displayCacheTip(cacheName);
} else {
pnArr = pagename.length;
pagename[pnArr] = pgname;
//Checks to see if XmlHttpRequest object is ready.
if (getRequest.readyState == 4 || getRequest.readyState == 0) {
if (type==1 || type==10) {
getRequest.open("GET", "http://" + location.hostname + "/api.php?action=parse&prop=text&text={{:"+pgname.split("#")[0]+"|mode=home}}&format=json", true);
} else {
getRequest.open("GET", "http://" + location.hostname + "/" + pgname + '?action=render', true);
}
if (type>1 && type != 10) {
getRequest.onreadystatechange = function() { 
pt(type,new Array(pgname, pnArr));
}
} else {
showTT = 1;
if (pgname.indexOf("#") != -1) showTT = pgname.substr(pgname.indexOf("#")+1);
if (type==1) {
getRequest.onreadystatechange = function() {
parseText(new Array(pgname, pnArr, showTT));
}
} else {
getRequest.onreadystatechange = function() {
parseAchText(new Array(pgname, pnArr, showTT));
}
}
}
}

//Makes the request.
getRequest.send(null);
}
}

// switcher for the various parsing functions
function pt(type, tArr) {
ttF = new Array("","","Set","SC","Quest","NPC");
eval("parse"+ttF[type]+"Text(tArr);");
}

// displays the tooltip
function displayTip(tipType) {
var tip = (typeof(tipType)=="object")?tipType:getTip(tipType);
tip.style.position = "absolute";
tip.style.visibility = "hidden";
tip.style.display = "block";
tip.style.zIndex = "999";
moveTip(tip);
tip.style.visibility = "visible";
}

// displays an already-cached tooltip
function displayCacheTip(cachename) {
ctn = cachename;
displayTip(document.getElementById(ctn));
}

// creates a cache for tooltips
function createCache(cpagename, pnArr) {
if (!noCache) {
if (cpagename == pagename[pnArr]) {
cacheDiv = document.createElement("div");
cacheDiv.setAttribute("id", cpagename + "-cache"); 
cacheDiv.style.display = "none";
contentstart.insertBefore(cacheDiv , contentstart.childNodes[0]);
cacheDiv.innerHTML = $("#tfb").html();
}
}
}

// This function moves the tool-tips when our mouse moves
function moveTip(tipType) {
cacheTip = null;
dbS = getDBS();
if (typeof(this)=="object" && this != window) {
var ttLink = this.parentNode;
if (hasClass(this, "itemlink")) {
if (hasClass(this, "pdlink")) ttLink = this.childNodes[1].childNodes[0];
tempName = ttLink.getAttribute("href").replace("http://","").replace("www.","").replace("wowwiki.com","").replace("/index.php?title=", "").replace("&amp;action=edit", "").replace("/","").replace(/_/g," ");
} else {
tempName = this.parentNode.getAttribute("title") || ttLink.lastChild.getAttribute("title");
}
if (document.getElementById(tempName+"-cache")) cacheTip = document.getElementById(tempName+"-cache");
}
tip = (cacheTip != null)?cacheTip:(typeof(tipType)=="object")?tipType:getTip(tipType);
if (tip == null || typeof(tip.style) == "undefined") tip = document.getElementById("tfb");
if (document.getElementById("tfb").style.display != "none") tip = document.getElementById("tfb");
var showTTAtTop   = mousePos.y > (winSize.y / 2);
var showTTAtLeft  = mousePos.x > (winSize.x / 2);
var newTop  = mousePos.y + (showTTAtTop  ? - (tip.clientHeight + 20) : 20);
var newLeft = mousePos.x + (showTTAtLeft ? - (tip.clientWidth  + 20) : 20);
tip.style.position = 'fixed';
tip.style.top = newTop + "px";
tip.style.left = newLeft + "px";
}

// getting the browser ready to accept what we're going to do
windowResize();
var contentstart;

// AJAX RC variables
getRCDataRO = getXmlHttpRequestObject();
var cr = new RegExp("\r", "gm");
var lf = new RegExp("\n", "gm");
var endText = new RegExp('</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "mi");
var rcTimer;
var rcTO;
var rcTOs = 0;
var doRefresh = true;
var rcRefresh = 60000;
ajaxRCCookie = (getCookie("ajaxload-"+wgPageName)=="on"||ajaxRCOverride) ? true:false;
function ajaxRC() {
$(".firstHeading").append('&nbsp;<span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Enable auto-refreshing page loads">AJAX:</span><input type="checkbox" id="ajaxRCtoggle" onClick="toggleRC();"><span style="position:relative; top:5px; left:5px;" id="ajaxRCprogress"><img src="http://images.wikia.com/wowwiki/images/0/0e/Progressbar.gif" border="0" alt="AJAX operation in progress" /></span>');
$("#ajaxRCprogress").hide();
$("#ajaxRCtoggle").attr("checked", ajaxRCCookie);
if (ajaxRCCookie) loadRCData();
}

function toggleRC() {
if ($("#ajaxRCtoggle").attr("checked") == true) {
setCookie("ajaxload-"+wgPageName, "on", 30);
doRefresh = true;
loadRCData();
} else {
setCookie("ajaxload-"+wgPageName, "off", 30);
doRefresh = false;
clearTimeout(rcTimer);
}
}

function loadRCData() {
if (getRCDataRO.readyState == 4 || getRCDataRO.readyState == 0) {
getRCDataRO.open("GET", "http://" + location.hostname + "/" + wgPageName + location.search, true);
getRCDataRO.onreadystatechange = parseRCdata;
getRCDataRO.send(null);
rcTO = setTimeout("timeOut();", 30000);
}
}

function timeOut() {
getRCDataRO.onreadystatechange = function () {}
getRCDataRO.abort();
if (rcTOs < 3) {
rcTOs++;
loadRCData();
} else {
$("#ajaxRCtoggle").attr("checked", false);
$("#ajaxRCprogress").hide();
alert("The auto-refreshing AJAX RC request timed out multiple times.  AJAX refreshing is now disabled.\n\nCheck your connection and try to refresh the page manually.");
rcTOs = 0;
}
}

function parseRCdata() {
if (getRCDataRO.readyState == 2) {
$("#ajaxRCprogress").show();
}
if (getRCDataRO.readyState == 4) {
clearTimeout(rcTO);
textFilter = new RegExp('<div id="bodyContent">.*?</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "i");
rawRCdata = getRCDataRO.responseText.replace(cr, "").replace(lf, "");
filteredRCdata = textFilter.exec(rawRCdata);
if (filteredRCdata) {
updatedText = filteredRCdata[0].replace('<div id="bodyContent">', "").replace(endText, "");
$("#ajaxRCprogress").hide();
$("#bodyContent").html(updatedText);
$("ul.special>li:has(a[href*='Special:Log/useravatar'])").hide();
if (doRefresh) rcTimer = setTimeout("loadRCData();", rcRefresh);
}
}
}

// item tooltips
var sre = new RegExp('<div[^>]*?class=".*?settip.*?".*?>.*?</ul></div>');
var tre = new RegExp("<div.*?</ul></div>", "g");
var re = new RegExp("1em; float: right; width:", "g");
var re2 = new RegExp('<li[^>]*?class="setdesc req".*?>.*?<li[^>]*?class="setdesc".*?>.*?<li[^>]*?class="setdesc setbonus".*?>.*?<li', "g");
var re3 = new RegExp('<li[^>]*?class="setdesc".*?>.*?<li[^>]*?class="setdesc setbonus".*?>.*?<li', "g");

function parseText(nArr) {
hideTipNonCache(0);
//Check to see if the XmlHttpRequests state is finished.
var tip = $("#tfb");
if (getRequest.readyState == 4) {
if (getRequest.responseText) {
if (getRequest.responseText.indexOf("multival_action")==-1) {
eval("rawText = "+getRequest.responseText+";");
tip.html(ttError("item"));
if (rawText && typeof(rawText.parse)!="undefined") {
tooltips = rawText.parse.text["*"].replace(re, "1em; min-height:34px; " + ttBgStyle + " width:").replace(re2, "<li").replace(re3, "<li");
if (tooltips.indexOf('class="new"')==-1) {
if ((tooltips.indexOf('class="qc-')==-1 && tooltips.indexOf('style="color:white;"')==-1) || (tooltips.indexOf('class="qc-common')!=-1 && tooltips.match('^<div[^>]*class="[^">]* jstip') == null)) {
tip.html(ttHTMLStart + "<b>Error</b><br>The target item's page does not have a<br>properly formatted tooltip.</div>");
} else {
tooltip = tooltips.match(tre);
wTT = ((nArr[2]-1)<tooltip.length)?nArr[2]-1:0;
noCache = false;
tip.html(tooltip[wTT]);
}
} else {
tip.html(ttHTMLStart + "<b>Error</b><br>The target item's page does not exist.<br>The page must be created in order<br>to display a tooltip.</div>");
}
}
createCache(nArr[0], nArr[1]);
displayTip();
} else {
tip.html(ttHTMLStart + "<b>Error</b><br>There is a problem loading the tooltip.<br>Please consult an administrator.</div>");
displayTip();
}
} else {
getInfo(nArr[0],1);
}
} else {
//loading
if (tip) {
tip.html(ttLoading);
displayTip();
}
}
}

function showItemTip(i) {
var Span = document.getElementById("tt" + i);
if (hasClass(Span, "pdlink")) {
var ttLink = Span.childNodes[1].childNodes[0];
} else {
var ttLink = Span.parentNode;
}
if (ttLink.getAttribute("class") != "selflink") {
Span.setAttribute("title", "");
if (ttLink.getAttribute("title")) ttLink.setAttribute("title", "");
itemname = ttLink.getAttribute("href").replace("http://","").replace("www.","").replace("wowwiki.com","").replace("/index.php?title=", "").replace("&amp;action=edit", "").replace("/","").replace(/_/g," ");
getInfo(itemname, 1);
}
}

function showSetTip(i) {
var Span = document.getElementById("stt" + i);
var ttLink = Span.parentNode;
if (ttLink.getAttribute("class") != "selflink") {
Span.setAttribute("title", "");
if (ttLink.getAttribute("title")) {
setname = ttLink.getAttribute("title");
ttLink.setAttribute("title", "");
newSpan = document.createElement("span");
newSpan.setAttribute("title", setname);
ttLink.appendChild(newSpan);
} else {
setname = ttLink.lastChild.getAttribute("title");
}
getInfo(setname, 2);
}
}

function parseSetText(nArr) {
hideTipNonCache(0);
var tip = $("#tfb");
if (getRequest.readyState == 4) {
rawText = getRequest.responseText;
tip.html(ttError("item set"));
if (rawText) {
rawText = rawText.replace(crlf, "");
rawText = rawText.replace(re2, "1em; " + ttBgStyle + " width:");
tooltip = sre.exec(rawText);
if (tooltip != null) {
tip.html(tooltip);
}
}
createCache(nArr[0], nArr[1]);
displayTip();
} else {
//loading
tip.html(ttLoading);
displayTip();
}
}

// npc tooltips
var reR = new RegExp('.*<a[^>]*?title="(.*?)".*');
function parseNPCText(nArr) {
hideTipNonCache(0);
var tip = $("#tfb");
if (getRequest.readyState == 4) {
rawText = getRequest.responseText;
tip.html(ttError("NPC"));
if (rawText) {
if (rawText.indexOf("disambigpage") != -1) { // target is a disambig page
noCache = false;
tip.html(ttHTMLStart + "<b>Error</b><br>This NPC is being linked to<br>through a disambiguation page.<br>You must link directly to the<br>NPC page.</div>");
} 
if (rawText.indexOf("redirectText") != -1) { // target is a redirect
noCache = false;
actualNPC = rawText.replace(reR, "$1");
if (actualNPC) {
getInfo(actualNPC, 5);
return false;
}
}
rawName = "";
rawIcon = "";
rawPicture = "";
rawTitle = "";
rawLevel = "";
rawLoc = "";
rawText = rawText.replace(crlf, "");
nameHTML = new RegExp('<div[^>]*?class="npcname"[^>]*>.*?</div>');
rawNameM = nameHTML.exec(rawText);
if (rawNameM) {
reName = new RegExp('.*<div[^>]*?class="npcname"[^>]*>(.*?)</div>.*');
rawName = rawNameM[0].replace(reName, "$1");
}
iconHTML = new RegExp('<div[^>]*?class="npcicon"[^>]*>.*?</div>');
rawIconM = iconHTML.exec(rawText);
if (rawIconM) {
reIcon = new RegExp('.*<div[^>]*?class="npcicon"[^>]*>(.*?)</div>.*');
rawIcon = '<div style="float:left;">' + rawIconM[0].replace(reIcon, "$1") + '</div>';
}
pictureHTML = new RegExp('<div[^>]*?class="npcpic">.*?</div>');
noPictureHTML = new RegExp('<a[^>]*?class="new"[^>]*?>Image:.*?</a>');
rawPictureM = pictureHTML.exec(rawText);
if (rawPictureM) {
noPicture = noPictureHTML.exec(rawPictureM[0]);
if (!noPicture) {
rePicture = new RegExp('.*<div[^>]*?class="npcpic">.*?<img[^>]*src="(.*?)".*?</div>.*');
rawPicture = '<img src="' + rawPictureM[0].replace(rePicture, "$1") + '" alt="' + rawName + '" style="max-width:95%; max-height:150px;"></div><div align="center">';
}
}
titleHTML = new RegExp('<div[^>]*?class="npctitle">.*?</div>');
rawTitleM = titleHTML.exec(rawText);
if (rawTitleM) {
reTitle = new RegExp('.*<div[^>]*?class="npctitle">(.*?)</div>.*');
rawTitle = "<br />" + rawTitleM[0].replace(reTitle, "$1");
}
levelHTML = new RegExp('<div[^>]*?class="npclevel">.*?</div>');
rawLevelM = levelHTML.exec(rawText);
if (rawLevelM) {
reLevel = new RegExp('.*<div[^>]*?class="npclevel">(.*?)</div>.*');
rawLevel = '<br />Level: ' + rawLevelM[0].replace(reLevel, "$1");
}
locHTML = new RegExp('<div[^>]*?class="npcloc">.*?</div>');
rawLocM = locHTML.exec(rawText);
if (rawLocM) {
reLoc = new RegExp('.*<div[^>]*?class="npcloc">(.*?)</div>.*');
rawLoc = "<br />" + rawLocM[0].replace(reLoc, "$1");
}
tooltip = rawPicture + rawIcon + rawName + rawTitle + rawLevel + rawLoc;
if (tooltip != null && tooltip != "") {
noCache = false;
tip.html(ttHTMLStart + '<div align="center">' + tooltip + '</div>');
}
}
createCache(nArr[0], nArr[1]);
displayTip();
} else {
//loading
tip.html(ttLoading);
displayTip();
}
}

function showNPCTip(i) {
var Span = document.getElementById("npctt" + i);
var ttLink = Span.parentNode;
if (ttLink.getAttribute("class") != "selflink") {
Span.setAttribute("title", "");
if (ttLink.getAttribute("title")) {
npcname = ttLink.getAttribute("title");
ttLink.setAttribute("title", "");
newSpan = document.createElement("span");
newSpan.setAttribute("title", npcname);
ttLink.appendChild(newSpan);
} else {
npcname = ttLink.lastChild.getAttribute("title");
}
getInfo(npcname, 5);
}
}

// quest tooltips
if (wgServer == "http://www.wowwiki.com") {
questStartIcon = "<img src='http://images.wikia.com/wowwiki/images/4/46/AvailableQuestIcon.png'>";
questEndIcon = "<img src='http://images.wikia.com/wowwiki/images/c/c0/ActiveQuestIcon.png'>";
}
else {
questStartIcon = "";
questEndIcon = "";
}
function parseQuestText(nArr) {
hideTipNonCache(0);
var tip = $("#tfb");
if (getRequest.readyState == 4) {
rawText = getRequest.responseText;
tip.html(ttError("quest"));
if (rawText) {
if (rawText.indexOf("disambigpage") != -1 ) { // target is a disambig page
noCache = false;
tip.html(ttHTMLStart + "<b>Error</b><br>This quest is being linked to<br>through a disambiguation page.<br>You must link directly to the<br>quest page.</div>");
}
rawName = "";
rawIcon = "";
rawStart = "";
rawEnd = "";
rawLevel = "";
rawXP = "";
rawRewards = "";
rawType = "";
rawText = rawText.replace(crlf, "");
nameHTML = new RegExp('<span[^>]*?class="questname">.*?</span>');
rawNameM = nameHTML.exec(rawText);
if (rawNameM) {
reName = new RegExp('.*<span[^>]*?class="questname">(.*?)</span>.*');
rawName = rawNameM[0].replace(reName, "$1");
}
iconHTML = new RegExp('<span[^>]*?class="questicon">.*?</span>');
rawIconM = iconHTML.exec(rawText);
if (rawIconM) {
reIcon = new RegExp('.*<span[^>]*?class="questicon">(.*?)</span>.*');
rawIcon = '<div style="float:left;">' + rawIconM[0].replace(reIcon, "$1") + '</div>';
}
startHTML = new RegExp('<div[^>]*?class="queststart">.*?</div>');
rawStartM = startHTML.exec(rawText);
if (rawStartM) {
reStart = new RegExp('.*<div[^>]*?class="queststart">(.*?)</div>.*');
rawStart = "<br />" + questStartIcon + rawStartM[0].replace(reStart, "$1");
}
endHTML = new RegExp('<div[^>]*?class="questend">.*?</div>');
rawEndM = endHTML.exec(rawText);
if (rawEndM) {
reEnd = new RegExp('.*<div[^>]*?class="questend">(.*?)</div>.*');
rawEnd = "<br />" + questEndIcon + rawEndM[0].replace(reEnd, "$1");
}
levelHTML = new RegExp('<div[^>]*?class="questlevel">.*?</div>');
rawLevelM = levelHTML.exec(rawText);
if (rawLevelM) {
reLevel = new RegExp('.*<div[^>]*?class="questlevel">(.*?)</div>.*');
rawLevel = "<br />Level: " + rawLevelM[0].replace(reLevel, "$1");
}
xpHTML = new RegExp('<div[^>]*?class="questxp">.*?</div>');
rawXPM = xpHTML.exec(rawText);
if (rawXPM) {
reXP = new RegExp('.*<div[^>]*?class="questxp">(.*?)</div>.*');
rawXP = "<br />XP: " + rawXPM[0].replace(reXP, "$1");
}
rewardsHTML = new RegExp('<div[^>]*?class="questrewards">.*?</div>');
rawRewardsM = rewardsHTML.exec(rawText);
if (rawRewardsM) {
reRewards = new RegExp('.*<div[^>]*?class="questrewards">(.*?)</div>.*');
rawRewards = "<br />Rewards:<br />" + rawRewardsM[0].replace(reRewards, "$1");
}
typeHTML = new RegExp('<div[^>]*?class="questtype">.*?</div>');
rawTypeM = typeHTML.exec(rawText);
if (rawTypeM) {
reType = new RegExp('.*<div[^>]*?class="questtype">(.*?)</div>.*');
rawType = "<br />Type: " + rawTypeM[0].replace(reType, "$1");
}
tooltip = rawIcon + rawName + rawLevel + rawType + rawStart + rawEnd + rawXP + rawRewards;
if (tooltip != null && tooltip != "") {
noCache = false;
tip.html(ttHTMLStart + '<div align="center">' + tooltip + '</div></div>');
}
}
createCache(nArr[0], nArr[1]);
displayTip();
} else {
//loading
tip.html(ttLoading);
displayTip();
}
}

function showQuestTip(i) {
var Span = document.getElementById("qtt" + i);
var ttLink = Span.parentNode;
if (ttLink.getAttribute("class") != "selflink") {
Span.setAttribute("title", "");
if (ttLink.getAttribute("title")) {
questname = ttLink.getAttribute("title");
ttLink.setAttribute("title", "");
newSpan = document.createElement("span");
newSpan.setAttribute("title", questname);
ttLink.appendChild(newSpan);
} else {
questname = ttLink.lastChild.getAttribute("title");
}
getInfo(questname.replace("?","%3F"), 4);
}
}

//achievement tooltips
function showAchTip(i) {
var Span = document.getElementById("att" + i);
var ttLink = Span.parentNode;
if (ttLink.getAttribute("class") != "selflink") {
Span.setAttribute("title", "");
if (ttLink.getAttribute("title")) ttLink.setAttribute("title", "");
achname = ttLink.getAttribute("href").replace("http://","").replace("www.","").replace("wowwiki.com","").replace("/index.php?title=", "").replace("&amp;action=edit", "").replace("/","").replace(/_/g," ");
getInfo(achname, 10);
}
}

var achcre = new RegExp("<!--.*?-->", "g");
function parseAchText(nArr) {
hideTipNonCache(0);
var tip = $("#tfb");
if (getRequest.readyState == 4) {
if (getRequest.responseText) {
if (getRequest.responseText.indexOf("multival_action")==-1) {
eval("rawText = "+getRequest.responseText+";");
tip.html(ttError("achievement"));
if (rawText && typeof(rawText.parse)!="undefined") {
tooltip = rawText.parse.text["*"].replace(achcre,"").replace("float:right; clear:right;", "min-height:34px; min-width:18em; max-width:75%; " + ttBgStyle);
noCache = false;
tip.html(tooltip);
} else {
tip.html(ttHTMLStart + "<b>Error</b><br>The target item's page does not exist.<br>The page must be created in order<br>to display a tooltip.</div>");
}
createCache(nArr[0], nArr[1]);
displayTip();
} else {
tip.html(ttHTMLStart + "<b>Error</b><br>There is a problem loading the tooltip.<br>Please consult an administrator.</div>");
displayTip();
}
} else {
getInfo(nArr[0],1);
}
} else {
//loading
if (tip) {
tip.html(ttLoading);
displayTip();
}
}
}

// coords tooltips
function getImage(zone) {
var imageTitle = "";
switch (zone) {
case "Ahn'kahet":
case "Ahnkahet":
imageTitle = "2/2d/InstanceMap-Ahnkahet.jpg/300px-InstanceMap-Ahnkahet.jpg";
break;
case "Alterac":
case "Alterac Mountains":
imageTitle = "2/2c/WorldMap-Alterac.jpg/300px-WorldMap-Alterac.jpg";
break;
case "Alterac Valley":
imageTitle = "c/c3/WorldMap-AlteracValley.jpg/300px-WorldMap-AlteracValley.jpg";
break;
case "Arathi":
case "Arathi Highlands":
imageTitle = "8/8d/WorldMap-Arathi.jpg/300px-WorldMap-Arathi.jpg";
break;
case "Arathi Basin":
imageTitle = "d/df/WorldMap-ArathiBasin.jpg/300px-WorldMap-ArathiBasin.jpg";
break;
case "Argent Coliseum1":
case "Crusaders' Coliseum1":
imageTitle = "0/0a/InstanceMap-TheArgentColiseum1.jpg/300px-InstanceMap-TheArgentColiseum1.jpg";
break;
case "Argent Coliseum2":
case "Crusaders' Coliseum2":
imageTitle = "1/14/InstanceMap-TheArgentColiseum2.jpg/300px-InstanceMap-TheArgentColiseum2.jpg";
break;
case "Ashenvale":
imageTitle = "5/55/WorldMap-Ashenvale.jpg/300px-WorldMap-Ashenvale.jpg";
break;
case "Azjol-Nerub":
case "Azjol-Nerub1":
imageTitle = "4/41/InstanceMap-AzjolNerub1.jpg/300px-InstanceMap-AzjolNerub1.jpg";
break;
case "Azjol-Nerub2":
imageTitle = "4/48/InstanceMap-AzjolNerub2.jpg/300px-InstanceMap-AzjolNerub2.jpg";
break;
case "Azjol-Nerub3":
imageTitle = "f/f6/InstanceMap-AzjolNerub3.jpg/300px-InstanceMap-AzjolNerub3.jpg";
break;
case "Aszhara":
case "Azshara":
imageTitle = "d/d7/WorldMap-Aszhara.jpg/300px-WorldMap-Aszhara.jpg";
break;
case "Azeroth":
imageTitle = "b/b3/WorldMap-World.jpg/300px-WorldMap-World.jpg";
break;
case "Azuremyst":
case "Azuremyst Isle":
imageTitle = "6/67/WorldMap-AzuremystIsle.jpg/300px-WorldMap-AzuremystIsle.jpg";
break;
case "Badlands":
imageTitle = "4/40/WorldMap-Badlands.jpg/300px-WorldMap-Badlands.jpg";
break;
case "Barrens":
case "The Barrens":
imageTitle = "4/4d/WorldMap-Barrens.jpg/300px-WorldMap-Barrens.jpg";
break;
case "Blade's Edge":
case "Blade's Edge Mountains":
imageTitle = "d/d4/WorldMap-BladesEdgeMountains.jpg/300px-WorldMap-BladesEdgeMountains.jpg";
break;
case "Blasted Lands":
case "The Blasted Lands":
imageTitle = "7/7c/WorldMap-BlastedLands.jpg/300px-WorldMap-BlastedLands.jpg";
break;
case "Bloodmyst":
case "Bloodmyst Isle":
imageTitle = "f/fe/WorldMap-BloodmystIsle.jpg/300px-WorldMap-BloodmystIsle.jpg";
break;
case "Borean Tundra":
imageTitle = "d/de/WorldMap-BoreanTundra.jpg/300px-WorldMap-BoreanTundra.jpg";
break;
case "Burning Steppes":
imageTitle = "0/01/WorldMap-BurningSteppes.jpg/300px-WorldMap-BurningSteppes.jpg";
break;
case "Crystalsong Forest":
imageTitle = "1/12/WorldMap-CrystalSongForest.jpg/300px-WorldMap-CrystalSongForest.jpg";
break;
case "Culling of Stratholme1":
imageTitle = "5/58/InstanceMap-CoTStratholme1.jpg/300px-InstanceMap-CoTStratholme1.jpg";
break;
case "Culling of Stratholme2":
imageTitle = "7/7b/InstanceMap-CoTStratholme2.jpg/300px-InstanceMap-CoTStratholme2.jpg";
break;
case "Dalaran":
imageTitle = "c/ce/WorldMap-Dalaran2_.jpg/300px-WorldMap-Dalaran2_.jpg";
break;
case "Darkshore":
imageTitle = "e/ea/WorldMap-Darkshore.jpg/300px-WorldMap-Darkshore.jpg";
break;
case "Darnassus":
imageTitle = "1/14/WorldMap-Darnassis.jpg/300px-WorldMap-Darnassis.jpg";
break;
case "Deadwind Pass":
imageTitle = "a/af/WorldMap-DeadwindPass.jpg/300px-WorldMap-DeadwindPass.jpg";
break;
case "Desolace":
imageTitle = "6/6e/WorldMap-Desolace.jpg/300px-WorldMap-Desolace.jpg";
break;
case "Dragonblight":
imageTitle = "3/33/WorldMap-Dragonblight.jpg/300px-WorldMap-Dragonblight.jpg";
break;
case "Drak'Tharon Keep":
case "Drak'Tharon Keep1":
imageTitle = "0/0e/InstanceMap-DrakTharonKeep1.jpg/300px-InstanceMap-DrakTharonKeep1.jpg";
break;
case "Drak'Tharon Keep2":
imageTitle = "a/ac/InstanceMap-DrakTharonKeep2.jpg/300px-InstanceMap-DrakTharonKeep2.jpg";
break;
case "Dun Morogh":
imageTitle = "a/a6/WorldMap-DunMorogh.jpg/300px-WorldMap-DunMorogh.jpg";
break;
case "Durotar":
imageTitle = "a/a8/WorldMap-Durotar.jpg/300px-WorldMap-Durotar.jpg";
break;
case "Duskwood":
imageTitle = "9/9a/WorldMap-Duskwood.jpg/300px-WorldMap-Duskwood.jpg";
break;
case "Dustwallow":
case "Dustwallow Marsh":
imageTitle = "b/b7/WorldMap-Dustwallow.jpg/300px-WorldMap-Dustwallow.jpg";
break;
case "Eastern Kingdoms":
imageTitle = "7/75/WorldMap-Azeroth.jpg/300px-WorldMap-Azeroth.jpg";
break;
case "Eastern Plaguelands":
imageTitle = "6/62/WorldMap-EasternPlaguelands.jpg/300px-WorldMap-EasternPlaguelands.jpg";
break;
case "Elwynn":
case "Elwynn Forest":
imageTitle = "1/1f/WorldMap-Elwynn.jpg/300px-WorldMap-Elwynn.jpg";
break;
case "Eversong":
case "Eversong Woods":
imageTitle = "b/b1/WorldMap-EversongWoods.jpg/300px-WorldMap-EversongWoods.jpg";
break;
case "Exodar":
case "The Exodar":
imageTitle = "e/e3/WorldMap-TheExodar.jpg/300px-WorldMap-TheExodar.jpg";
break;
case "Eye of Eternity":
imageTitle = "7/76/InstanceMap-TheEyeOfEternity.jpg/300px-InstanceMap-TheEyeOfEternity.jpg";
break;
case "Eye of the Storm":
imageTitle = "8/85/WorldMap-NetherstormArena.jpg/300px-WorldMap-NetherstormArena.jpg";
break;
case "Felwood":
imageTitle = "9/9f/WorldMap-Felwood.jpg/300px-WorldMap-Felwood.jpg";
break;
case "Feralas":
imageTitle = "e/ed/WorldMap-Feralas.jpg/300px-WorldMap-Feralas.jpg";
break;
case "Ghostlands":
imageTitle = "0/0c/WorldMap-Ghostlands.jpg/300px-WorldMap-Ghostlands.jpg";
break;
case "Grizzly Hills":
imageTitle = "7/70/WorldMap-GrizzlyHills.jpg/300px-WorldMap-GrizzlyHills.jpg";
break;
case "Gundrak":
imageTitle = "5/5d/InstanceMap-Gundrak.jpg/300px-InstanceMap-Gundrak.jpg";
break;
case "Halls of Lightning":
case "Halls of Lightning1":
imageTitle = "8/82/InstanceMap-HallsofLightning1.jpg/300px-InstanceMap-HallsofLightning1.jpg";
break;
case "Halls of Lightning2":
imageTitle = "c/c4/InstanceMap-HallsofLightning2.jpg/300px-InstanceMap-HallsofLightning2.jpg";
break;
case "Halls of Stone":
imageTitle = "8/80/InstanceMap-Ulduar77.jpg/300px-InstanceMap-Ulduar77.jpg";
break;
case "Hellfire":
case "Hellfire Peninsula":
imageTitle = "8/82/WorldMap-Hellfire.jpg/300px-WorldMap-Hellfire.jpg";
break;
case "Hillsbrad":
case "Hillsbrad Foothills":
imageTitle = "d/db/WorldMap-Hillsbrad.jpg/300px-WorldMap-Hillsbrad.jpg";
break;
case "Hinterlands":
case "The Hinterlands":
imageTitle = "e/e4/WorldMap-Hinterlands.jpg/300px-WorldMap-Hinterlands.jpg";
break;
case "Howling Fjord":
imageTitle = "f/f2/WorldMap-HowlingFjord.jpg/300px-WorldMap-HowlingFjord.jpg";
break;
case "Hrothgar's Landing":
imageTitle = "f/fc/WorldMap-HrothgarsLanding.jpg/300px-WorldMap-HrothgarsLanding.jpg";
break;
case "Icecrown":
case "Icecrown Glacier":
imageTitle = "d/d1/WorldMap-IcecrownGlacier.jpg/300px-WorldMap-IcecrownGlacier.jpg";
break;
case "Ironforge":
imageTitle = "4/4d/WorldMap-Ironforge.jpg/300px-WorldMap-Ironforge.jpg";
break;
case "Isle of Conquest":
imageTitle = "a/ae/WorldMap-IsleofConquest.jpg/300px-WorldMap-IsleofConquest.jpg";
break;
case "Isle of Quel'Danas":
imageTitle = "8/85/WorldMap-IsleOfQuel%27Danas.jpg/300px-WorldMap-IsleOfQuel%27Danas.jpg";
break;
case "Kalimdor":
imageTitle = "1/1f/WorldMap-Kalimdor.jpg/300px-WorldMap-Kalimdor.jpg";
break;
case "Lake Wintergrasp":
case "Wintergrasp":
imageTitle = "e/e5/WorldMap-LakeWintergrasp.jpg/300px-WorldMap-LakeWintergrasp.jpg";
break;
case "Loch Modan":
imageTitle = "d/dd/WorldMap-LochModan.jpg/300px-WorldMap-LochModan.jpg";
break;
case "Moonglade":
imageTitle = "b/b9/WorldMap-Moonglade.jpg/300px-WorldMap-Moonglade.jpg";
break;
case "Mulgore":
imageTitle = "a/af/WorldMap-Mulgore.jpg/300px-WorldMap-Mulgore.jpg";
break;
case "Nagrand":
imageTitle = "8/8a/WorldMap-Nagrand.jpg/300px-WorldMap-Nagrand.jpg";
break;
case "Naxxramas":
case "Naxxramas1":
imageTitle = "f/f0/InstanceMap-Naxxramas1.jpg/300px-InstanceMap-Naxxramas1.jpg";
break;
case "Naxxramas2":
imageTitle = "b/b9/InstanceMap-Naxxramas2.jpg/300px-InstanceMap-Naxxramas2.jpg";
break;
case "Naxxramas3":
imageTitle = "8/8a/InstanceMap-Naxxramas3.jpg/300px-InstanceMap-Naxxramas3.jpg";
break;
case "Naxxramas4":
imageTitle = "e/eb/InstanceMap-Naxxramas4.jpg/300px-InstanceMap-Naxxramas4.jpg";
break;
case "Naxxramas5":
imageTitle = "d/d0/InstanceMap-Naxxramas5.jpg/300px-InstanceMap-Naxxramas5.jpg";
break;
case "Naxxramas6":
imageTitle = "c/c5/InstanceMap-Naxxramas6.jpg/300px-InstanceMap-Naxxramas6.jpg";
break;
case "Netherstorm":
imageTitle = "6/6c/WorldMap-Netherstorm.jpg/300px-WorldMap-Netherstorm.jpg";
break;
case "Nexus":
case "The Nexus":
imageTitle = "5/5e/InstanceMap-TheNexus.jpg/300px-InstanceMap-TheNexus.jpg";
break;
case "Obsidian Sanctum":
case "The Obsidian Sanctum":
imageTitle = "c/c5/InstanceMap-TheObsidianSanctum.jpg/300px-InstanceMap-TheObsidianSanctum.jpg";
break;
case "Oculus":
case "Oculus1":
imageTitle = "a/a1/InstanceMap-Nexus801.jpg/300px-InstanceMap-Nexus801.jpg";
break;
case "Oculus2":
imageTitle = "8/88/InstanceMap-Nexus802.jpg/300px-InstanceMap-Nexus802.jpg";
break;
case "Oculus3":
imageTitle = "2/29/InstanceMap-Nexus803.jpg/300px-InstanceMap-Nexus803.jpg";
break;
case "Oculus4":
imageTitle = "5/50/InstanceMap-Nexus804.jpg/300px-InstanceMap-Nexus804.jpg";
break;
case "Orgrimmar":
imageTitle = "f/fc/WorldMap-Ogrimmar.jpg/300px-WorldMap-Ogrimmar.jpg";
break;
case "Outland":
imageTitle = "7/7d/WorldMap-Expansion01.jpg/300px-WorldMap-Expansion01.jpg";
break;
case "Redridge":
case "Redridge Mountains":
imageTitle = "2/21/WorldMap-Redridge.jpg/300px-WorldMap-Redridge.jpg";
break;
case "Scarlet Enclave":
imageTitle = "2/24/WorldMap-ScarletEnclave.jpg/300px-WorldMap-ScarletEnclave.jpg";
break;
case "Searing Gorge":
imageTitle = "e/e7/WorldMap-SearingGorge.jpg/300px-WorldMap-SearingGorge.jpg";
break;
case "Shadowmoon":
case "Shadowmoon Valley":
imageTitle = "f/f2/WorldMap-ShadowmoonValley.jpg/300px-WorldMap-ShadowmoonValley.jpg";
break;
case "Shattrath":
case "Shattrath City":
imageTitle = "d/db/WorldMap-ShattrathCity.jpg/300px-WorldMap-ShattrathCity.jpg";
break;
case "Sholazar Basin":
imageTitle = "0/0f/WorldMap-SholazarBasin.jpg/300px-WorldMap-SholazarBasin.jpg";
break;
case "Silithus":
imageTitle = "1/1f/WorldMap-Silithus.jpg/300px-WorldMap-Silithus.jpg";
break;
case "Silvermoon":
case "Silvermoon City":
imageTitle = "8/8b/WorldMap-SilvermoonCity.jpg/300px-WorldMap-SilvermoonCity.jpg";
break;
case "Silverpine":
case "Silverpine Forest":
imageTitle = "0/09/WorldMap-Silverpine.jpg/300px-WorldMap-Silverpine.jpg";
break;
case "Stonetalon":
case "Stonetalon Mountains":
imageTitle = "7/7f/WorldMap-StonetalonMountains.jpg/300px-WorldMap-StonetalonMountains.jpg";
break;
case "Storm Peaks":
imageTitle = "1/1c/WorldMap-TheStormPeaks.jpg/300px-WorldMap-TheStormPeaks.jpg";
break;
case "Stormwind":
case "Stormwind City":
imageTitle = "0/07/WorldMap-Stormwind.jpg/300px-WorldMap-Stormwind.jpg";
break;
case "Stranglethorn":
case "Stranglethorn Vale":
imageTitle = "3/3a/WorldMap-Stranglethorn.jpg/300px-WorldMap-Stranglethorn.jpg";
break;
case "Swamp of Sorrows":
imageTitle = "1/1c/WorldMap-SwampOfSorrows.jpg/300px-WorldMap-SwampOfSorrows.jpg";
break;
case "Tanaris":
imageTitle = "b/b1/WorldMap-Tanaris.jpg/300px-WorldMap-Tanaris.jpg";
break;
case "Teldrassil":
imageTitle = "8/8c/WorldMap-Teldrassil.jpg/300px-WorldMap-Teldrassil.jpg";
break;
case "Terokkar":
case "Terokkar Forest":
imageTitle = "0/03/WorldMap-TerokkarForest.jpg/300px-WorldMap-TerokkarForest.jpg";
break;
case "Thousand Needles":
imageTitle = "6/69/WorldMap-ThousandNeedles.jpg/300px-WorldMap-ThousandNeedles.jpg";
break;
case "Thunder Bluff":
imageTitle = "2/2c/WorldMap-ThunderBluff.jpg/300px-WorldMap-ThunderBluff.jpg";
break;
case "Tirisfal":
case "Tirisfal Glades":
imageTitle = "4/4b/WorldMap-Tirisfal.jpg/300px-WorldMap-Tirisfal.jpg";
break;
case "Ulduar":
case "Ulduar1":
imageTitle = "c/ca/InstanceMap-Ulduar.jpg/300px-InstanceMap-Ulduar.jpg";
break;
case "Ulduar2":
imageTitle = "3/30/InstanceMap-Ulduar1.jpg/300px-InstanceMap-Ulduar1.jpg";
break;
case "Ulduar3":
imageTitle = "b/b7/InstanceMap-Ulduar2.jpg/300px-InstanceMap-Ulduar2.jpg";
break;
case "Ulduar4":
imageTitle = "e/ed/InstanceMap-Ulduar3.jpg/300px-InstanceMap-Ulduar3.jpg";
break;
case "Ulduar5":
imageTitle = "d/de/InstanceMap-Ulduar4.jpg/300px-InstanceMap-Ulduar4.jpg";
break;
case "Ulduar6":
imageTitle = "c/cf/InstanceMap-Ulduar5.jpg/300px-InstanceMap-Ulduar5.jpg";
break;
case "Underbelly":
imageTitle = "b/b7/WorldMap-Dalaran1_.jpg/300px-WorldMap-Dalaran1_.jpg";
break;
case "Undercity":
imageTitle = "a/ac/WorldMap-Undercity.jpg/300px-WorldMap-Undercity.jpg";
break;
case "Un'goro":
case "Un'goro Crater":
case "Un'Goro":
case "Un'Goro Crater":
imageTitle = "9/9e/WorldMap-UngoroCrater.jpg/300px-WorldMap-UngoroCrater.jpg";
break;
case "Universe":
imageTitle = "6/6c/WorldMap-Cosmic.jpg/300px-WorldMap-Cosmic.jpg";
break;
case "Utgarde Keep":
case "Utgarde Keep1":
imageTitle = "7/7e/InstanceMap-UtgardeKeep1.jpg/300px-InstanceMap-UtgardeKeep1.jpg";
break;
case "Utgarde Keep2":
imageTitle = "c/cc/InstanceMap-UtgardeKeep2.jpg/300px-InstanceMap-UtgardeKeep2.jpg";
break;
case "Utgarde Keep3":
imageTitle = "9/9b/InstanceMap-UtgardeKeep3.jpg/300px-InstanceMap-UtgardeKeep3.jpg";
break;
case "Utgarde Pinnacle":
case "Utgarde Pinnacle1":
imageTitle = "c/cd/InstanceMap-UtgardePinnacle1.jpg/300px-InstanceMap-UtgardePinnacle1.jpg"
break;
case "Utgarde Pinnacle2":
imageTitle = "8/86/InstanceMap-UtgardePinnacle2.jpg/300px-InstanceMap-UtgardePinnacle2.jpg"
break;
case "Vault of Archavon":
case "Archavon":
imageTitle = "7/7a/InstanceMap-VaultofArchavon.jpg/300px-InstanceMap-VaultofArchavon.jpg";
break;
case "Violet Hold":
imageTitle = "8/84/InstanceMap-VioletHold.jpg/300px-InstanceMap-VioletHold.jpg";
break;
case "Warsong Gulch":
imageTitle = "a/aa/WorldMap-WarsongGulch.jpg/300px-WorldMap-WarsongGulch.jpg";
break;
case "Western Plaguelands":
imageTitle = "d/d4/WorldMap-WesternPlaguelands.jpg/300px-WorldMap-WesternPlaguelands.jpg";
break;
case "Westfall":
imageTitle = "6/63/WorldMap-Westfall.jpg/300px-WorldMap-Westfall.jpg";
break;
case "Wetlands":
imageTitle = "8/88/WorldMap-Wetlands.jpg/300px-WorldMap-Wetlands.jpg";
break;
case "Winterspring":
imageTitle = "8/8e/WorldMap-Winterspring.jpg/300px-WorldMap-Winterspring.jpg";
break;
case "Zangarmarsh":
imageTitle = "d/d8/WorldMap-Zangarmarsh.jpg/300px-WorldMap-Zangarmarsh.jpg";
break;
case "Zul'Drak":
imageTitle = "2/28/WorldMap-ZulDrak.jpg/300px-WorldMap-ZulDrak.jpg";
break;
}
return "http://images.wikia.com/wowwiki/images/thumb/" + imageTitle;
}

function showCoordsTip(i) {
zoneInfo = $("#ctt" + i).attr("class").replace("coordslink ", "");
zone = "Universe";
xPos = 0;
yPos = 0;
if (zoneInfo) {
rawMapInfo = zoneInfo.split("-");
zone = (rawMapInfo[0]=="")?"Universe":rawMapInfo[0];
xPos = (rawMapInfo[1]=="")?0:rawMapInfo[1];
yPos = (rawMapInfo[2]=="")?0:rawMapInfo[2];
}
zoneImage = getImage(zone);
tooltip = ttCoordStart + '<div class="ZoneMap" style="position:relative;width:300px;height:200px;"><img src="' + zoneImage + '" alt=""><div style="position:absolute;left:' + xPos + '%;top:' + yPos + '%;margin:-5px"><img src="http://images.wikia.com/wowwiki/images/f/f4/Blip.png" alt=""></div></div></div>';
$("#coordstfb").html(tooltip);
displayTip(2);
}

// quick tooltips
function showTemplateTip(i) {
tooltip = ttHTMLStart + $("#tttc" + i).html() + '</div>';
$("#templatetfb").html(tooltip);
displayTip(1);
}

// sub-category tooltips

var artRe = new RegExp('.div id="mw-(pages|subcategories)".');
var artRePgs = new RegExp('.div id="mw-pages".');

function parseSCText(nArr) {
hideTipNonCache(0);
//Check to see if the XmlHttpRequests state is finished.
if (getRequest.readyState == 4) {
rawText = getRequest.responseText;
noCache = true;
var tip = $("#tfb");
tip.html(ttError("subcategory"));
if (rawText) {
rawText = rawText.replace(crlf, "");
hasPages = artRe.exec(rawText);
if (hasPages == null) {
hasPages = artRe.exec(rawText);
if (hasPages != null) {
pOrSc = hasPages[0].replace(artRe, "$1");
if (pOrSc == "subcategories") {
reallyHasPages = artRePgs.exec(rawText);
if (reallyHasPages == null) reallyHasPages = artRePgs.exec(rawText);
if (reallyHasPages != null) pOrSc += " and pages";
}
tooltip = "This category contains " + pOrSc + ".";
} else {
tooltip = "This category is empty.";
}
} else {
pOrSc = hasPages[0].replace(artRe, "$1");
if (pOrSc == "subcategories") {
reallyHasPages = artRePgs.exec(rawText);
if (reallyHasPages == null) reallyHasPages = artRePgs.exec(rawText);
if (reallyHasPages != null) pOrSc += " and pages";
}
tooltip = "This category contains " + pOrSc + ".";
}
tip.html(ttHTMLStart + '<div align="center">' + tooltip + '</div>');
}
createCache(nArr[0], nArr[1]);
displayTip();
} else {
//loading
tip.html(ttLoading);
displayTip();
}
}

function showSCTip(i) {
getInfo("Category:" + $("#sctt" + i).text().replace(" ", "_"), 3);
}

function scttMouseOver() {
var subcatslisting = document.getElementById("mw-subcategories");
if (subcatslisting) {
var catLinks = subcatslisting.getElementsByTagName("a");
if (catLinks) {
for (var i = 0; i < catLinks.length; i++) {
catLinks[i].setAttribute("id", "sctt" + i);
catLinks[i].onmouseover = showSCTip.bind(catLinks[i],i);
catLinks[i].onmouseout = hideTipNonCache;
catLinks[i].onmousemove = moveTip;
}
}
}
}

// AJAX tables
getTableDataRO = getXmlHttpRequestObject();
ahClass = new RegExp('class="ajaxHide"', "gim");

function getTableData(tablePage, tableNum) {
if (getTableDataRO.readyState == 4 || getTableDataRO.readyState == 0) {
getTableDataRO.open("GET", 'http://' + location.hostname + '/' + tablePage + '?action=render', true);
getTableDataRO.onreadystatechange = function() {
parseTableData(tablePage, tableNum);
}
getTableDataRO.send(null);
}
}

function parseTableData(tablePage, tableNum) {
if (getTableDataRO.readyState != 4) {
$("body").css("cursor","wait");
} else {
$("body").css("cursor","auto");
rawTable = getTableDataRO.responseText;
if (rawTable) {
rawTable = rawTable.replace(crlf, "").replace(ahClass, 'class="ajaxHide-active"').replace('class="darktable"', "");
thisTable = document.getElementById("ajaxTable" + tableNum);
thisTable.getElementsByTagName("td")[0].innerHTML = rawTable;
ajt = thisTable.getElementsByTagName("td")[0].getElementsByTagName("table");
for (x=0;x<ajt.length;x++) {
if ($(ajt[x]).hasClass("sortable")) {
ts_makeSortable(ajt[x]);
zebraAJAX = $(ajt[x]).find("tr");
if (zebraAJAX.eq(2).css("background-color") == "transparent" && zebraAJAX.eq(3).css("background-color") == "transparent") {
zebraAJAX.find(".sortheader").bind("click",function () {
$("table.zebra > tbody > tr").css("background-color","transparent");
ac = (skin=="monobook")?"#e9e9ff":"#2c2c2c";
$("table.zebra > tbody > tr:nth-child(2n+1)").css("background-color",ac);
});
}
}
}
zebraAJAX = $(".ajax td > table.zebra > tbody > tr");
if (zebraAJAX.eq(1).css("background-color") == "transparent" && zebraAJAX.eq(2).css("background-color") == "transparent") {
$(".ajax td > table.zebra > tbody > tr:nth-child(2n+1)").css("background-color","#2c2c2c");
if (skin == "monobook") $(".ajax td > table.zebra > tbody > tr:nth-child(2n+1)").css("background-color","#e9e9ff");
}
$("#stl" + tableNum).html('[<a href="/'+tablePage+'?action=edit">edit</a>]&nbsp;[<a href="javascript:;" id="htl' + tableNum + '" onClick="hideTable(' + tableNum + ');">hide</a>]');
ttMouseOver();
}
}
}

function hideTable(tableNum) {
thisTable = document.getElementById("ajaxTable" + tableNum);
thisTable.getElementsByTagName("tr")[1].style.display = "none";
document.getElementById("htl" + tableNum).onclick = function() {
showTable(tableNum);
}
$("#htl" + tableNum).text("show");
}

function showTable(tableNum) {
thisTable = document.getElementById("ajaxTable" + tableNum);
thisTable.getElementsByTagName("tr")[1].style.display = "";
document.getElementById("htl" + tableNum).onclick = function() {
hideTable(tableNum);
}
$("#htl" + tableNum).text("hide");
}

function loadTableData(tableNum) {
thisTable = document.getElementById("ajaxTable" + tableNum);
loadPage = thisTable.className.substring(thisTable.className.indexOf("targetPage-") + 11);
getTableData(loadPage, tableNum);
}

function addAjaxDisplayLink() {
tablesList = document.getElementsByTagName("table");
if (tablesList) {
for (x=0;x<tablesList.length;x++) {
if (hasClass(tablesList[x], "ajax")) {
tablesList[x].setAttribute("id", "ajaxTable" + x);
tablesList[x].getElementsByTagName("td")[1].parentNode.style.display = "none";
tablesList[x].getElementsByTagName("td")[0].parentNode.style.display = "";
if (tablesList[x].getElementsByTagName("th").length > 0) tablesList[x].getElementsByTagName("th")[0].innerHTML = '<span style="float:right;" id="stl' + x + '"></span>' + tablesList[x].getElementsByTagName("th")[0].innerHTML;
if (tablesList[x].getElementsByTagName("td")[0].className == "showLinkHere") {
tablesList[x].getElementsByTagName("td")[0].innerHTML = tablesList[x].getElementsByTagName("td")[0].innerHTML.replace("[link]", '<a href="javascript:;" onClick="loadTableData(' + x + ')">').replace("[/link]","</a>");
} else {
document.getElementById("stl" + x).innerHTML = '[<a href="javascript:;" onClick="loadTableData(' + x + ')">show data</a>]';
}
}
}
}
}

// portal switch
var ptabs;
function doPortals() {
cTab = $("#mptabs>strong").prevAll().length + 1;
ptabs = $("#mptabs>*");
ptabs.css("cursor","pointer");
ptabs.bind("click", function (event) {
event.preventDefault();
target = $(event.target);
if (target.parent().not("#mptabs").html()) target = target.parent();
sp = target.prevAll().length;
ptabs.eq(cTab-1).children("*").removeClass("activetab");
ptabs.eq(cTab-1).children("*").addClass("inactivetab");
$("#portal"+cTab).hide();
cTab = sp+1;
ptabs.eq(sp).children("*").removeClass("inactivetab");
ptabs.eq(sp).children("*").addClass("activetab");
$("#portal"+cTab).show();
});
}

// add the tooltip calls to the page
function bindTT(elem) {
elem.onmouseout = function (){
hideTip(0);
}
elem.onmousemove = moveTip;
}
function eLink(db,nm) {
nm = nm.replace(" (page does not exist)","");
el = document.createElement("a");
el.setAttribute("target","_blank");
dbs = new Array("http://www.wowarmory.com/search.xml?searchType=items&searchQuery=","http://www.wowhead.com/?search=","http://www.thottbot.com/?s=","http://wow.allakhazam.com/search.html?q=");
dbTs = new Array("Armory","Wowhead","Thottbot","Allakhazam");
dbHs = new Array("&real; ","&omega; ","&tau; ","&alpha;");
el.href = dbs[db]+nm;
el.setAttribute("title",dbTs[db]);
el.innerHTML = dbHs[db];
return el;
}
function ttMouseOver() {
contentstart = document.getElementById("bodyContent");
ttfdiv = document.createElement("div");
ttfdiv.setAttribute("id", "tfb");
contentstart.insertBefore(ttfdiv, contentstart.childNodes[0]);
cttfdiv = document.createElement("div");
cttfdiv.setAttribute("id", "coordstfb");
contentstart.insertBefore(cttfdiv, contentstart.childNodes[0]);
qttfdiv = document.createElement("div");
qttfdiv.setAttribute("id", "templatetfb");
contentstart.insertBefore(qttfdiv, contentstart.childNodes[0]);
document.body.onmouseover = hideTipNonCache;
var Spans = document.getElementsByTagName("span");
for (i=0;i<Spans.length;i++) {
if (hasClass(Spans[i], "itemlink") && itemTooltips) {
if (hasClass(Spans[i].parentNode, "selflink") == false) { // don't show tooltip if on item page
itemname = Spans[i].parentNode.title.replace(" (not yet written)","");
if (getCookie("extDB")) { // if user wants to use an external database
if (getCookie("extDB") != "http://www.wowwiki.com/") {
fullextURL = getCookie("extDB") + itemname;
Spans[i].parentNode.href = fullextURL;
}
}
Spans[i].setAttribute("id", "tt" + i);
Spans[i].onmouseover = showItemTip.bind(Spans[i],i);
bindTT(Spans[i]);
if (Spans[i].parentNode.className == "new") {
sup = document.createElement("sup");
elinks = document.createElement("span");
elinks.className = "plainlinks";
for (x=0;x<4;x++) eval('elink'+x+'=new eLink('+x+',itemname);');
Spans[i].parentNode.parentNode.insertBefore(sup,Spans[i].parentNode.nextSibling);
sup.appendChild(elinks);
for (x=0;x<4;x++) eval("elinks.appendChild(elink"+x+");");
i++;
}
}
}
if (hasClass(Spans[i], "setlink") && itemTooltips) {
Spans[i].setAttribute("id", "stt" + i);
Spans[i].onmouseover = showSetTip.bind(Spans[i],i);
bindTT(Spans[i]);
}
if (hasClass(Spans[i], "npclink") && npcTooltips) {
Spans[i].setAttribute("id", "npctt" + i);
Spans[i].onmouseover = showNPCTip.bind(Spans[i],i);
bindTT(Spans[i]);
if (Spans[i].parentNode.className == "new") {
npc=$(Spans[i]).text();
sup = document.createElement("sup");
elinks = document.createElement("span");
elinks.className = "plainlinks";
for (x=1;x<4;x++) eval('elink'+x+' = new eLink('+x+',npc);');
Spans[i].parentNode.parentNode.insertBefore(sup,Spans[i].parentNode.nextSibling);
sup.appendChild(elinks);
for (x=1;x<4;x++) eval("elinks.appendChild(elink"+x+");");
i++;
}
}
if (hasClass(Spans[i], "questlink") && questTooltips) {
Spans[i].setAttribute("id", "qtt" + i);
Spans[i].onmouseover = showQuestTip.bind(Spans[i],i);
bindTT(Spans[i]);
if (Spans[i].parentNode.className == "new") {
quest=$(Spans[i]).text();
sup = document.createElement("sup");
elinks = document.createElement("span");
elinks.className = "plainlinks";
for (x=1;x<4;x++) eval('elink'+x+' = new eLink('+x+',quest);');
Spans[i].parentNode.parentNode.insertBefore(sup,Spans[i].parentNode.nextSibling);
sup.appendChild(elinks);
for (x=1;x<4;x++) eval("elinks.appendChild(elink"+x+");");
i++;
}
}
if (hasClass(Spans[i], "achievementlink") && achievementTooltips) {
achname = $(Spans[i]).text().replace(/\[(.*?)\]/, "$1");
if (hasClass(Spans[i].parentNode, "selflink") == false) {
Spans[i].setAttribute("id", "att" + i);
Spans[i].onmouseover = showAchTip.bind(Spans[i],i);
bindTT(Spans[i]);
if (Spans[i].parentNode.className == "new") {
sup = document.createElement("sup");
elinks = document.createElement("span");
elinks.className = "plainlinks";
for (x=1;x<3;x++) eval('elink'+x+' = new eLink('+x+',achname);');
Spans[i].parentNode.parentNode.insertBefore(sup,Spans[i].parentNode.nextSibling);
sup.appendChild(elinks);
for (x=1;x<3;x++) eval("elinks.appendChild(elink"+x+");");
i++;
}
}
}
if (hasClass(Spans[i], "coordslink") && coordTooltips) {
Spans[i].setAttribute("id", "ctt" + i);
Spans[i].onmouseover = showCoordsTip.bind(Spans[i],i);
Spans[i].onmouseout = function () {
hideTip(2);
}
Spans[i].onmousemove = function (){
moveTip(2);
}
}
if (hasClass(Spans[i], "tttemplatelink") && quickTooltips) {
Spans[i].nextSibling.setAttribute("id", "tttc" + i);
Spans[i].onmouseover = showTemplateTip.bind(Spans[i],i);
Spans[i].onmouseout = function (){
hideTip(1);
}
Spans[i].onmousemove = function (){
moveTip(1);
}
}
}
}

// check to see which ones are active then do it
function performTooltips() {
if (wgPageName == "Special:Preferences") createPrefsLink();
if (wgPageName == "WoWWiki:Tooltips") addPrefs();
if (wgCanonicalNamespace == "Portal") doPortals();
if (ajaxPages.indexOf(wgPageName)!=-1) ajaxRC();
if (tooltipsOn && wgCanonicalNamespace != "Special") {
if (scTooltips && wgCanonicalNamespace == "Category") scttMouseOver();
if (tableData) addAjaxDisplayLink();
if (itemTooltips || npcTooltips || questTooltips || coordTooltips || quickTooltips || scTooltips) ttMouseOver();
}
}
addOnloadHook(performTooltips);