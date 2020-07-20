/**************/
/*Chat options*/
/**************/
 
/*
/Change how chat looks and functions using an interface. 
/Uses cookies to store the changes.
/A potential solution to all your chathacks problems.
/version 1.0.2
/Coded by Callofduty4 and Madnessfan34537
*/
 
/*
/Much thanks to the Call of Duty Wiki Chat,
/who supported and helped this the whole way through.
/It has been much appreciated. Thank you!
*/
 
/*
/WARNING
/Make sure you are not loading MediaWiki:Chat.js/load.js 
/with MediaWiki:Chat-edit-count.
/Load it with MediaWiki:Chat-welcome-message, or this
/will malfunction badly.
*/
 
/*
/To do:
/Improve the interface
*/
 
// function to set a cookie
function setCookie( cookie_name, data ) {
	var splitServer = wgServer.split("//");
	var domain = splitServer[1];
	document.cookie =
		cookie_name + "=" + data +
		"; max-age=" + 60*60*24*150 +
		"; path=/; domain=" + domain ;
}
 
// function to get a cookie
function getCookie( cookie_name, pos ) {
	var i, x, y, cookie_array = document.cookie.split(";");
	for (i=0; i<cookie_array.length; i++) {
		x = cookie_array[i].substr(0,cookie_array[i].indexOf("="));
		y = cookie_array[i].substr(cookie_array[i].indexOf("=")+1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x == cookie_name) {
			var style_objects = y.split(", ");
			return unescape(style_objects[pos]);
		}
	}
}
 
// defining various global variables
var backgroundColour = getCookie("customisation", 0);
var fontColour = getCookie("customisation", 1);
var chatHacksEnabled = getCookie("customisation", 2);
var fontChoice = getCookie("customisation", 3);
var tabCompleteEnabled = getCookie("customisation", 4);
var multiKickEnabled = getCookie("customisation", 5);
var multiPMEnabled = getCookie("customisation", 6);
var searchBarEnabled = getCookie("customisation", 7);
var ignoreURLEnabled = getCookie("customisation", 8);
var stopSideScrollEnabled = getCookie("customisation", 9);
var surroundColour = getCookie("customsation", 10);
 
var chatHacksLoaded = false;
var tabCompleteLoaded = false;
var multiKickLoaded = false;
var multiKickDisplayer = "";
var ignoreURLDisplayer = ""; //to stop non-admins/chatmods being able to load the multikick script
var multiPMLoaded = false;
var searchBarLoaded = false;
var ignoreURLLoaded = false;
var stopSideScrollLoaded = false;
 
// called when chat is loaded to update the skin
function loadChatSkin() {
	$('body').css({"background-color":surroundColour});
	$('.WikiaPage').css({"background-color":backgroundColour, "color":fontColour, "font-family":fontChoice});
	$('.Chat').css({"font-family":fontChoice});
	$('.Rail').css({"font-family":fontChoice}); 
	$('.ChatHeader').css({"background-color":backgroundColour, "font-family":fontChoice});
	if (chatHacksEnabled == "true") {
		importScriptPage('User:Phillycj/chat2.js', 'c');
		chatHacksLoaded = true;
	}
	if (tabCompleteEnabled == "true") {
		importScriptPage("User:Joeytje50/tabinsert.js","rs");
		tabCompleteLoaded = true;
	}	
	if (multiKickEnabled == "true") {
		importScriptPage("User:Madnessfan34537/multikick.js","cod");
		$('<a id="multiKickerButton" class="wikia-button" href="javascript:showPopup()" style="position:absolute; right:55px; top:22px;">Multikick</a>').appendTo('.Write'); // to prevent issues with the button not loading
		multiKickLoaded = true;
	}
	if (multiPMEnabled == "true") {
		importScriptPage("MediaWiki:Chat.js/multipms.js","cod");
		multiPMLoaded = true;
	}
	if (searchBarEnabled == "true") {
		importScriptPage("MediaWiki:Chat.js/searchbar.js","cod");
		searchBarLoaded = true;
	}
	if (ignoreURLEnabled == "true") {
		$('head').append('<style type="text/css">li[data-user="URL"] {display:none;}</style>');
		ignoreURLLoaded = true;
	}
    if (stopSideScrollEnabled == "true") {
		$('head').append('<style type="text/css">#WikiaPage .Chat .message { word-wrap: break-word; }</style>');
		stopSideScrollLoaded = true;
	}
}
 
// function to open the options interface
function openOptions() {
	$("select option[value='" + fontChoice + "']").attr("selected","selected"); // sets the font selector to the one chosen currently
	$('#optionsWindow').show();
	$('body').append('<div style="height: 100%; width: 100%; z-index: 2000000001; opacity: 0.65; display: block;" data-opacity="0.65" class="blackout"></div>');
}
 
function cancelChanges() {
	$('#optionsWindow').hide();
	$('.blackout').hide();
}
 
// function to grab all the inputted values and assign them to variables
function updateCookie() {
	backgroundColour = $('#backgroundColourinput').val();
	fontColour = $('#fontColourinput').val();
	fontChoice = $('#fontList').val();
	surroundColour = $('#surroundColourinput').val();
	if (document.getElementById('chatHacks').checked == 1) {
		chatHacksEnabled = "true";
	}
	else {
		chatHacksEnabled = "false";
	}
	if (document.getElementById('tabComplete').checked == 1) {
		tabCompleteEnabled = "true";
	}
	else {
		tabCompleteEnabled = "false";
	}
	if (document.getElementById('multiKick').checked == 1) {
		multiKickEnabled = "true";
	}
	else {
		multiKickEnabled = "false";
	}
	if (document.getElementById('multiPM').checked == 1) {
		multiPMEnabled = "true";
	}
	else {
		multiPMEnabled = "false";
	}
	if (document.getElementById('searchBar').checked == 1) {
		searchBarEnabled = "true";
	}
	else {
		searchBarEnabled = "false";
	}
	if (document.getElementById('ignoreURL').checked == 1) {
		ignoreURLEnabled = "true";
	}
	else {
		ignoreURLEnabled = "false";
	}
	if (document.getElementById('stopSideScroll').checked == 1) {
		stopSideScrollEnabled = "true";
	}
	else {
		stopSideScrollEnabled = "false";
	}
	setDaCookie();
	updateChatSkin();
	$('#optionsWindow').hide();
	$('.blackout').hide();
}
 
// function to update the skin after the settings are saved
function updateChatSkin() {
	$('body').css({"background-color":surroundColour});
	$('.WikiaPage').css({"background-color":backgroundColour, "color":fontColour, "font-family":fontChoice});
	$('.Chat').css({"font-family":fontChoice});
	$('.Rail').css({"font-family":fontChoice});
	$('.ChatHeader').css({"background-color":backgroundColour, "font-family":fontChoice});
	if (chatHacksLoaded == false && chatHacksEnabled == "true" && $('#pingspan').length <= 0) {
		importScriptPage('User:Phillycj/chat2.js', 'c');
		chatHacksLoaded = true;
	}
	if (tabCompleteLoaded == false && tabCompleteEnabled == "true") {
		importScriptPage("User:Joeytje50/tabinsert.js","rs");
	}
	if (multiKickLoaded == false && multiKickEnabled == "true" && $('#multiKickerButton').length <= 0) {
		importScriptPage("User:Madnessfan34537/multikick.js","cod");
	}
	if (multiKickEnabled == "true") { 
		$('<a id="multiKickerButton" class="wikia-button" href="javascript:showPopup()" style="position:absolute; right:55px; top:22px;">Multikick</a>').appendTo('.Write'); // to prevent issues with the button not loading
	}
	if (multiPMLoaded == false && multiPMEnabled == "true") {
		importScriptPage("MediaWiki:Chat.js/multipms.js","cod");
    }
	if (searchBarLoaded == false && searchBarEnabled == "true") {
		importScriptPage("MediaWiki:Chat.js/searchbar.js","cod");
	}
	if (ignoreURLLoaded == false && ignoreURLEnabled == "true") {
		$('head').append('<style type="text/css">li[data-user="URL"] {display:none;}</style>');
	}
	if (stopSideScrollLoaded == false && stopSideScrollEnabled == "true") {
		$('head').append('<style type="text/css">#WikiaPage .Chat .message {word-wrap: break-word; }</style>');
	}
}
 
// function to set the cookie
function setDaCookie() {
	setCookie("customisation", backgroundColour + ", " + fontColour + ", " + chatHacksEnabled + ", " + fontChoice + ", " + tabCompleteEnabled + ", " +  multiKickEnabled + ", " + multiPMEnabled + ", " + searchBarEnabled + ", " + ignoreURLEnabled + ", " + stopSideScrollEnabled + ", " + surroundColour);
}
 
// functions to check if various scripts are loaded, so the buttons can be checked by default
function checkIfChatHacksEnabled() {
	if (chatHacksEnabled == "true") {
		return("checked");
	}
	else { 
		return(""); 
	}
}
 
function checkIfTabCompleteEnabled() {
	if (tabCompleteEnabled == "true") { 
		return("checked");
	}
	else {
		return("");
	}
}
 
function checkIfMultiKickEnabled() {
	if (multiKickEnabled == "true") { 
		return("checked");
	}
	else {
		return("");
	}
}
 
function checkIfMultiPMEnabled() {
    if (multiPMEnabled == "true") {
		return("checked");
	}
	else {
		return("");
	}
}
 
function checkIfSearchBarEnabled() {
	if (searchBarEnabled == "true") {
		return("checked");
	}
	else {
		return("");
	}
}
function checkIfIgnoreURLEnabled() {
	if (ignoreURLEnabled == "true") {
		return("checked");
	}
	else {
		return("");
	}
}
function checkIfStopSideScrollEnabled() {
	if (stopSideScrollEnabled == "true") {
		return("checked");
	}
	else {
		return("");
	}
}

// Variables to check various checkboxes
var chatHacksChecker = checkIfChatHacksEnabled();
var tabCompleteChecker = checkIfTabCompleteEnabled();
var multiKickChecker = checkIfMultiKickEnabled();
var multiPMChecker = checkIfMultiPMEnabled();
var searchBarChecker = checkIfSearchBarEnabled();
var ignoreURLChecker = checkIfIgnoreURLEnabled();
var stopSideScrollChecker = checkIfStopSideScrollEnabled();
 
// **** Stuff to do as soon as chat is loaded ****
// Check if user is chatmod or admin
if ( $.inArray('chatmoderator', wgUserGroups) > -1 || $.inArray('sysop', wgUserGroups) > -1 ) {
	multiKickDisplayer = '';
}
else {
	multiKickDisplayer = 'disabled="disabled"';
}

if ( wgServer == 'http://callofduty.wikia.com' ) {
	ignoreURLDisplayer = '';
}
else {
	ignoreURLDisplayer = 'disabled="disabled"';
}
 
// Add HTML for the interface
$('body').append('<section style="left:50%; top: 50px; width: 600px; z-index: 2000000002; margin-left:-300px;" class="modalWrapper" id="optionsWindow"><button class="close wikia-chiclet-button" onclick="cancelChanges()"><img src="https://images.wikia.nocookie.net/__cb57523/common/skins/oasis/images/icon_close.png"></button><h1>Options</h1><section class="modalContent"><div><form method="" name="" class="WikiaForm "><fieldset><p style="font-size:120%; font-weight:bold; font-style:italic;">Colour changes</p><p style="font-size:80%;">Enter a <a href="http://www.w3schools.com/html/html_colornames.asp" target="_blank">colour name</a> or <a href="http://html-color-codes.info/" target="_blank">colour hex</a><p>Chat background&nbsp;<input type="text" name="backgroundColourinput" id="backgroundColourinput" value="' + backgroundColour + '"/></p><br/><p>Surround&nbsp;<input type="text" name="surroundColourinput" id="surroundColourinput" value="' + surroundColour + '"/></p><br/><p>Font colour&nbsp;<input type="text" name="fontColourinput" id="fontColourinput" value="' + fontColour + '"/></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Font</p><p>Font family <select id="fontList"><option value="arial" style="font-family:arial;">Arial</option><option value="courier new" style="font-family:courier new;">Courier new</option><option value="georgia" style="font-family:georgia;">Georgia</option><option value="palatino linotype" style="font-family:palatino linotype;">Palatino linotype</option><option value="Comic Sans MS" style="font-family:Comic Sans MS;">Comic sans</option><option value="tahoma" style="font-family:tahoma;">Tahoma</option><option value="Trebuchet MS" style="font-family:Trebuchet MS;">Trebuchet MS</option><option value="Verdana" style="font-family:Verdana;">Verdana</option><option value="Lucida Console" style="font-family:Lucida Console;">Lucida Console</option></select></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Added functionality</p><input type="checkbox" name="chatHacks" value="chatHacks" id="chatHacks" ' + chatHacksChecker + '/> Enable <a href="http://c.wikia.com/wiki/User:Monchoman45/ChatHacks.js" target="_blank">chathacks</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="multiPM" value="multiPM" id="multiPM" ' + multiPMChecker + '/> Enable <a href="http://callofduty.wikia.com/wiki/User:Madnessfan34537/multipm.js" target="_blank">multi PM</a><br/><input type="checkbox" name="tabComplete" value="tabComplete" id="tabComplete" ' + tabCompleteChecker + '/>Enable <a href="http://runescape.wikia.com/wiki/User:Joeytje50/tabinsert.js" target="_blank">tab complete</a>&nbsp;&nbsp;&nbsp;<input type="checkbox" name="searchBar" value="searchBar" id="searchBar" ' + searchBarChecker + '/>Enable <a href="http://callofduty.wikia.com/wiki/MediaWiki:Chat.js/searchbar.js" target="_blank">search bar</a><br/><input type="checkbox" name="multiKick" value="multiKick" id="multiKick" '  + multiKickDisplayer +  multiKickChecker + '/>Enable <a href="http://callofduty.wikia.com/wiki/User:Madnessfan34537/multikick.js" target="_blank">multi kick</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="ignoreURL" value="ignoreURL" id="ignoreURL" ' + ignoreURLDisplayer + ignoreURLChecker + '/>Ignore URL in main chat<br /><input type="checkbox" name="stopSideScroll" value="stopSideScroll" id="stopSideScroll" ' + stopSideScrollChecker + '/>Stop the sidescroll bar to appear after someone spams</fieldset></form><div style="float:right;"><a onclick="updateCookie()" class="wikia-button">Update!</a>&nbsp;<a onclick="cancelChanges()" id="cancel" class="wikia-button secondary">Cancel</a></div></section></section>');
$('#optionsWindow').hide(); // Hide it to start with
 
// Add Options button
$('.Rail').prepend('<div onclick="openOptions()" style="margin:auto; cursor: pointer; font-size:150%; bottom:4px; padding-bottom:2px; border-bottom: 1px solid #CCCCCC; width:90%;" align="center"><img src="https://images.wikia.nocookie.net/mysims/images/0/04/Uberness.png" width="18px"/>&nbsp;Options</div>');
 
window.onload=loadChatSkin() // Load the current configuration