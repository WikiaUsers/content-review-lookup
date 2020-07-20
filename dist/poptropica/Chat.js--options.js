/**************/
/*Chat options*/
/**************/
 
/*
/Change how chat looks using an interface. Uses cookies to store the changes
/A potential solution to all your chathacks problems
/version 0.4.1.1
/Written by Callofduty4
*/

/*
/To do:
/More colour settings
/Other aesthetic settings
*/

// function to set a cookie
function setCookie( cookie_name, data ) {
	var splitServer = wgServer.split("//");
	var domain = splitServer[1];
	document.cookie =
		cookie_name + "=" + data +
		"; max-age=" + 60*60*24*100 +
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

var chatHacksLoaded = false;
 
// called when chat is loaded to update the skin
function loadChatSkin() {
	$('.WikiaPage').css({"background-color":backgroundColour, "color":fontColour, "font-family":fontChoice});
	$('.ChatHeader').css({"background-color":backgroundColour});
	if (chatHacksEnabled == "true") {
		importScriptPage("User:Monchoman45/ChatHacks.js","c");
		chatHacksLoaded = true;
	}
}
 
function openOptions() {
	$('#optionsWindow').show();
	$('body').append('<div style="height: 100%; width: 100%; z-index: 2000000001; opacity: 0.65; display: block;" data-opacity="0.65" class="blackout"></div>');
}
 
function cancelChanges() {
	$('#optionsWindow').hide();
	$('.blackout').hide();
}
 
function updateCookie() {
	backgroundColour = $('#backgroundColourinput').val();
	fontColour = $('#fontColourinput').val();
	fontChoice = $('#fontList').val(); 
	if (document.getElementById('chatHacks').checked == 1) {
		chatHacksEnabled = "true";
	}
	else {
		chatHacksEnabled = "false";
	}
	setDaCookie();
	updateChatSkin();
	$('#optionsWindow').hide();
	$('.blackout').hide();
}
 
function updateChatSkin() {
	$('.WikiaPage').css({"background-color":backgroundColour, "color":fontColour, "font-family":fontChoice});
	$('.ChatHeader').css({"background-color":backgroundColour});
	if (chatHacksLoaded == false && chatHacksEnabled == "true" && $('#pingspan').length <= 0) {
		importScriptPage("User:Monchoman45/ChatHacks.js","c");
		chatHacksLoaded = true;
	}
}
 
function setDaCookie() {
	setCookie("customisation", backgroundColour + ", " + fontColour + ", " + chatHacksEnabled + ", " + fontChoice);
}

function checkIfChatHacksEnabled() {
	if (chatHacksEnabled == "true") {
		return("checked");
	}
	else { 
		return(""); 
	}
}

var chatHacksChecker = checkIfChatHacksEnabled();
 
/* debug stuff
function alerter() {
	var message = getCookie("customisation");
	alert(message);
}
*/
 
$('body').append('<section style="left:50%; top: 50px; width: 600px; z-index: 2000000002; margin-left:-300px;" class="modalWrapper" id="optionsWindow"><button class="close wikia-chiclet-button" onclick="cancelChanges()"><img src="https://images.wikia.nocookie.net/__cb57523/common/skins/oasis/images/icon_close.png"></button><h1>Options [EXPERIMENTAL]</h1><section class="modalContent"><div><form method="" name="" class="WikiaForm "><fieldset><p style="font-size:120%; font-weight:bold; font-style:italic;">Colour changes</p><p style="font-size:80%;">Enter a <a href="http://www.w3schools.com/html/html_colornames.asp" target="_blank">colour name</a> or <a href="http://html-color-codes.info/" target="_blank">colour hex</a><p>Chat background&nbsp;<input type="text" name="backgroundColourinput" id="backgroundColourinput" value="' + backgroundColour + '"/></p><br/><p>Font colour&nbsp;<input type="text" name="fontColourinput" id="fontColourinput" value="' + fontColour + '"/></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Font</p><p>Font family <select id="fontList"><option value="arial" style="font-family:arial;">Arial (default)</option><option value="courier new" style="font-family:courier new;">Courier new</option><option value="georgia" style="font-family:georgia;">Georgia</option><option value="palatino linotype" style="font-family:palatino linotype;">Palatino linotype</option><option value="Comic Sans MS" style="font-family:Comic Sans MS;">Comic sans</option><option value="tahoma" style="font-family:tahoma;">Tahoma</option><option value="Trebuchet MS" style="font-family:Trebuchet MS;">Trebuchet MS</option><option value="Verdana" style="font-family:Verdana;">Verdana</option><option value="Lucida Console" style="font-family:Lucida Console;">Lucida Console</option></select></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Added functionality</p><input type="checkbox" name="chatHacks" value="chatHacks" id="chatHacks" ' + chatHacksChecker + '/> Enable <a href="http://c.wikia.com/wiki/User:Monchoman45/ChatHacks.js" target="_blank">chathacks</a></fieldset></form><div style="float:right;"><a onclick="updateCookie()" class="wikia-button">Update!</a>&nbsp;<a onclick="cancelChanges()" id="cancel" class="wikia-button secondary">Cancel</a></div></section></section>');
$('#optionsWindow').hide();