function setCookie( cookie_name, data ) {
	var domain = wgServer.split("//")[1];
	document.cookie =
		cookie_name + "=" + data +
		"; max-age=" + 60*60*24*150 +
		"; path=/; domain=" + domain;
}
 
/**
 * Function to get a cookie's value
 * @param cookie_name A string representing the cookie's name
 * @param pos The index of the value to get from the cookie
 * @return The string value of the cookie
 */
function getCookie( cookie_name, pos ) {
	var x, y, cookie_array = document.cookie.split(";");
	for (var i=0; i < cookie_array.length; i++) {
		x = cookie_array[i].substr(0,cookie_array[i].indexOf("="));
		y = cookie_array[i].substr(cookie_array[i].indexOf("=")+1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x == cookie_name) {
			var style_objects = y.split(", ");
			return unescape(style_objects[pos]);
		}
	}
}
 
/**
 * Function to check if a chat options module is enabled
 * @since 1.3.0
 * @author Sactage
 * @param name The name of the options module
 * @return boolean
 */
function isEnabled(module) {
	var c;
	switch (module) {
		case "chatHacks":
			c = getCookie("customisation", 2);
			break;
		case "tabComplete":
			c = getCookie("customisation", 4);
			break;
		case "multiKick":
			c = getCookie("customisation", 5);
			break;
		case "multiPM":
			c = getCookie("customisation", 6);
			break;
		case "searchBar":
			c = getCookie("customisation", 7);
			break;
		case "stopSideScroll":
			c = getCookie("customisation", 9);
			break;
		case "ignoreURL":
			c = getCookie("customisation", 8);
			break;
		default:
			return false;
	}
	return (c === "true");
}
 
// Store chat customisation options as an object
var chatOptions = {
	look: {
		fontColor: getCookie("customisation", 1),
		fontFamily: getCookie("customisation", 3),
		surroundColor: getCookie("customisation", 10),
		selfPostColor: getCookie("customisation", 11),
		backgroundColor: getCookie("customisation", 0),
	},
	modules: {
		chatHacks: {
			element: "#chatHacks",
			enabled: isEnabled("chatHacks"),
			loaded: false,
			load: function () {
				if ($("#pingspan").length > 0 || this.loaded)
					return;
				importScriptPage("User:Monchoman45/ChatHacks.js", "c");
				this.loaded = true;
			}
		},
		tabComplete: {
			element: "#tabComplete",
			enabled: isEnabled("tabComplete"),
			loaded: false,
			load: function () {
				importScriptPage("User:Joeytje50/tabinsert.js","rs");
				this.loaded = true;
			}
		},
		multiKick: {
			element: "#multiKick",
			enabled: isEnabled("multiKick"),
			loaded: false,
			load: function () {
				importScriptPage("User:Madnessfan34537/multikick.js","cod");
				$('<a id="multiKickerButton" class="wikia-button" href="javascript:showPopup()" style="position:absolute; right:55px; top:22px;">Multikick</a>').appendTo('.Write'); // to prevent issues with the button not loading
				this.loaded = true;
			}
		},
		multiPM: {
			element: "#multiPM",
			enabled: isEnabled("multiPM"),
			loaded: false,
			load: function () {
				importScriptPage("MediaWiki:Chat.js/multipms.js", "cod");
				this.loaded = true;
			}
		},
		searchBar: {
			element: "#searchBar",
			enabled: isEnabled("searchBar"),
			loaded: false,
			load: function () {
				importScriptPage("MediaWiki:Chat.js/searchbar.js","cod");
				this.loaded = true;
			}
		},
		ignoreURL: {
			element: "#ignoreURL",
			enabled: isEnabled("ignoreURL"),
			loaded: false,
			load: function () {
				$('head').append('<style type="text/css">li[data-user="URL"] {display:none;}</style>');
				this.loaded = true;
			}
		},
		stopSideScroll: {
			element: "#stopSideScroll",
			enabled: isEnabled("stopSideScroll"),
			loaded: false,
			load: function () {
				$('head').append('<style type="text/css">#WikiaPage .Chat .message { word-wrap: break-word; }</style>');
				this.loaded = true;
			}
		}
	}
}
 
/**
 * Applies updated settings to the chat skin
 */
function updateChatSkin() {
	$('body').css({"background-color":chatOptions.look.surroundColor});
	$('.WikiaPage').css({"background-color":chatOptions.look.backgroundColor, "color":chatOptions.look.fontColor, "font-family":chatOptions.look.fontFamily});
	$('.Chat').css({"font-family":chatOptions.look.fontFamily});
	$('.Rail').css({"font-family":chatOptions.look.fontFamily}); 
	$('.ChatHeader').css({"background-color":chatOptions.look.backgroundColor, "font-family":chatOptions.look.fontFamily});
	var selfPostElement = document.createElement('style');
	selfPostElement.innerHTML = '.Chat .you{background:' + chatOptions.look.selfPostColor + ' !important;}';
	$('head').append(selfPostElement);
	$('.Write [name="message"]').css({"color":chatOptions.look.fontColor});
	$('.Write .message').css({"background-color":chatOptions.look.backgroundColor});
	$('.ChatHeader .User .username').css({"color":chatOptions.look.fontColor});
	for (var m in chatOptions.modules) {
		if ( chatOptions.modules.hasOwnProperty( m ) ) {
			var module = chatOptions.modules[m];
			if (typeof module.enabled === 'boolean' && module.enabled && !module.loaded) {
				module.load();
			}
		}
	}
}
 
/**
 * Displays the options window
 */
function openOptions() {
	// TODO: Kill this with fire? There has to be a better way to do this - perhaps use $.showModal
	var $optionsWindowHTML = $.showCustomModal( "Opções", '<form method="" name="" class="WikiaForm "><fieldset><p style="font-size:140%; font-family:Oswald;">Mudanças de cores</p><p style="font-size:90%;">Coloque o nome de uma cor ou o <a href="http://www.mxstudio.com.br/Conteudos/Dreamweaver/Cores.htm" target="_blank">código hex</a> dela<p>Cor do chat&nbsp;<input type="text" name="backgroundColourinput" id="backgroundColourinput" value="' + chatOptions.look.backgroundColor + '"/></p><br /><p>Cor da sua fala&nbsp;<input type="text" name="selfPostColourinput" id="selfPostColourinput" value="' + chatOptions.look.selfPostColor + '"/></p><br/><p style="font-size:140%; font-family:Oswald;">Fonte</p><p>Escolher fonte: <select id="fontList"><option value="arial" style="font-family:arial;">Arial</option><option value="courier new" style="font-family:courier new;">Courier new</option><option value="georgia" style="font-family:georgia;">Georgia</option><option value="palatino linotype" style="font-family:palatino linotype;">Palatino linotype</option><option value="Capture It" style="font-family:Capture it;">Capture It</option><option value="Comic Sans MS" style="font-family:Comic Sans MS;">Comic Sans MS</option><option value="Homo Novis" style="font-family:Homo Novis;">Homo Novis</option><option value="Alias" style="font-family:Alias;">Alias</option><option value="Happy Killer" style="font-family:HappyKiller;">Happy Killer</option><option value="tahoma" style="font-family:tahoma;">Tahoma</option><option value="Trebuchet MS" style="font-family:Trebuchet MS;">Trebuchet MS</option><option value="Impact" style="sans-serif:impact;">Impact</option><option value="Hacked" style="truetype-ttf:HACKED;">Hacked</option><option value="GhostTown" style="font-family:GhostTown;">GhostTown</option><option value="Pricedown" style="font-family:Pricedown;">Pricedown</option><option value="Verdana" style="font-family:Verdana;">Verdana</option><option value="Lucida Console" style="font-family:Lucida Console;">Lucida Console</option><option value="Payday" style="font-family:Payday;">Payday</option><option value="Harlow Solid" style="font-family:Harlow Solid;">Harlow Solid</option></select></p><br /><p>Cor da fonte&nbsp;<input type="text" name="fontColourinput" id="fontColourinput" value="' + chatOptions.look.fontColor + '"/></p><br/><p style="font-size:140%; font-family:Oswald;">Outros</p><input type="checkbox" name="chatHacks" value="chatHacks" id="chatHacks"/> Ativar <a href="http://c.wikia.com/wiki/User:Monchoman45/ChatHacks.js" target="_blank">Chat Hack</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="multiPM" value="multiPM" id="multiPM"/> Ativar <a href="http://callofduty.wikia.com/wiki/User:Madnessfan34537/multipm.js" target="_blank">PVT Múltiplo</a><br/><input type="checkbox" name="searchBar" value="searchBar" id="searchBar"/>Ativar a <a href="http://callofduty.wikia.com/wiki/MediaWiki:Chat.js/searchbar.js" target="_blank">Barra de Pesquisa</a><br/><input type="checkbox" name="multiKick" value="multiKick" id="multiKick" />Ativar <a href="http://callofduty.wikia.com/wiki/User:Madnessfan34537/multikick.js" target="_blank">Kick Múltiplo</a>&nbsp;&nbsp;&nbsp;&nbsp;</fieldset></form>', {
		id: "optionsWindow",
	    width: 600,
	    buttons: [
		{
			id: "cancel",
		    message: "Cancelar",
		    handler: function () {
				cancelChanges();
		    }
		},
		{
			id: "updateCookie",
			defaultButton: true,
			message: "Salvar",
			handler: function () {
				updateCookie();
		    }
	    }
		]
	});
	$(".close").click(cancelChanges);
	// Check if various modules have been enabled by the user, and check their boxes if so
	if (chatOptions.modules.chatHacks.enabled)
		$("#chatHacks").attr("checked",true);
	if (chatOptions.modules.multiPM.enabled)
		$("#multiPM").attr("checked",true);
	if (chatOptions.modules.tabComplete.enabled)
		$("#tabComplete").attr("checked",true);
	if (chatOptions.modules.searchBar.enabled)
		$("#searchBar").attr("checked",true);
	if (chatOptions.modules.multiKick.enabled)
		$("#multiKick").attr("checked",true);
	if (chatOptions.modules.ignoreURL.enabled)
		$("#ignoreURL").attr("checked",true);
	if (chatOptions.modules.stopSideScroll.enabled)
		$("#stopSideScroll").attr("checked",true);
 
	if (typeof window.customFonts !== "undefined" && window.customFonts.length) {
		for (var i = 0; i < window.customFonts.length; i++) {
			var font = window.customFonts[i];
			$("#fontList").append('<option value="' + font+ '" style="font-family:' + font + ';">' + font.slice(0,1).toUpperCase() + font.slice(1) + '</option>');
		}
	}
	// Set certain modules' checkboxes to disabled if specific conditions are not met
	if (!wgUserGroups.indexOf("chatmoderator") && !wgUserGroups.indexOf("sysop") && !wgUserGroups.indexOf("staff") && !wgUserGroups.indexOf("helper") && !wgUserGroups.indexOf("vstf"))
		$("#multiKick").attr("disabled",true);
	if (wgServer !== "http://callofduty.wikia.com")
		$("#ignoreURL").attr("disabled",true);
 
	$("select option[value='" + chatOptions.look.fontFamily + "']").attr("selected","selected"); // sets the font selector to the one chosen currently
}
 
/**
 * Close the options window without saving any changes
 */
function cancelChanges() {
	var dialog = $('#optionsWindow');
	dialog.closeModal();
}
 
/**
 * Saves user options and stores them in a cookie for persistence across sessions
 */
function updateCookie() {
	chatOptions.look.backgroundColor = $('#backgroundColourinput').val();
	chatOptions.look.fontColor = $('#fontColourinput').val();
	chatOptions.look.fontFamily = $('#fontList').val();
	chatOptions.look.surroundColor = $('#surroundColourinput').val();
     chatOptions.look.selfPostColor = $('#selfPostColourinput').val();
	for (var m in chatOptions.modules) {
		if ( chatOptions.modules.hasOwnProperty( m ) ) {
			var module = chatOptions.modules[m];
			if (typeof module.element != 'undefined' && $(module.element).attr("checked")) {
				module.enabled = true;
			} else {
				module.enabled = false;
			}
		}
	}
 
	// Set the cookies
	setCookie("customisation", chatOptions.look.backgroundColor + ", " + chatOptions.look.fontColor + ", " + chatOptions.modules.chatHacks.enabled + ", " + chatOptions.look.fontFamily + ", " + chatOptions.modules.tabComplete.enabled + ", " +  chatOptions.modules.multiKick.enabled + ", " + chatOptions.modules.multiPM.enabled + ", " + chatOptions.modules.searchBar.enabled + ", " + chatOptions.modules.ignoreURL.enabled + ", " + chatOptions.modules.stopSideScroll.enabled + ", " + chatOptions.look.surroundColor + ", " + chatOptions.look.selfPostColor);
	updateChatSkin();
	cancelChanges();
}
 
 
// Add Options button
if (!$("#chatOptionsButton").length) {
	$('.Rail').prepend('<div id="chatOptionsButton" onclick="openOptions();" style="margin:auto; cursor: pointer; color:black; font-size:120%; font-family:Comic Sans MS; margin-top: 6px; bottom:4px; padding-bottom:2px; border-bottom: solid 4px #FF8C00; width:40%;" align="center">Opções</div>'); // Prevent multiple buttons from being appended
}
 
 
window.onload = updateChatSkin();