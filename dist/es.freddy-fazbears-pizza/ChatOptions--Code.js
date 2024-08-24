/* <syntaxhighlight lang="javascript"> */
/**
 * ChatOptions
 * Una modificación al script original
 * Nota de Carlos: Esta es una versión de chat options, en la que solo se incluye la personalización
 * del chat, más no los chat hacks y esas weas
 * tomado de la version 1.3.1
 * @author Callofduty4
 * @author Madnessfan34537
 * @author Sactage <sactage@gmail.com
 * Modificado por PipeDLH
 */
 
 
/**
 * Function to set a cookie
 * @param cookie_name A string representing the cookie's name
 * @param data The value of the cookie to be set
 */
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
//x = x.trim() should be quicker, it is supported by all recent navigators (include IE9)
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
		case "multiPM":
		default:
			return false;
	}
	return (c === "true");
}
 
// Opciones como un objeto
var chatOptions = {
	look: {
		fontColor: getCookie("customisation", 1),
		fontFamily: getCookie("customisation", 3),
		surroundColor: getCookie("customisation", 10),
		selfPostColor: getCookie("customisation", 11),
		backgroundColor: getCookie("customisation", 0),
        modalIcon: "https://images.wikia.nocookie.net/__cb20140531235013/dev/images/c/c0/ChatOptionsIcon.png"
	},
	modules: {
		multiPM: {
			element: "#multiPM",
			enabled: isEnabled("multiPM"),
			loaded: false,
			load: function () {
				importScriptPage("MediaWiki:Multipms.js", "dev");
				this.loaded = true;
			}
		},
	}
}
 
/**
 * Aplica las opciones al chat
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
 * la ventana de opciones
 */
function openOptions() {
	// TODO: Kill this with fire? There has to be a better way to do this - perhaps use $.showModal
	var $optionsWindowHTML = $.showCustomModal( "Opciones", '<form method="" name="" class="WikiaForm "><fieldset><p style="font-size:120%; font-weight:bold; font-style:italic;">Cambios de color</p><p style="font-size:80%;">Introduce el <a href="http://www.w3schools.com/html/html_colornames.asp" target="_blank">nombre de un color</a> o <a href="http://html-color-codes.info/" target="_blank">un codigo hex de un color</a><p>Fondo del chat&nbsp;<input type="text" name="backgroundColourinput" id="backgroundColourinput" value="' + chatOptions.look.backgroundColor + '"/></p><br/><p>Fondo de tus mensajes&nbsp;<input type="text" name="selfPostColourinput" id="selfPostColourinput" value="' + chatOptions.look.selfPostColor + '"/></p><br/><p>Alrededor&nbsp;<input type="text" name="surroundColourinput" id="surroundColourinput" value="' + chatOptions.look.surroundColor + '"/></p><br/><p>Color de las letras&nbsp;<input type="text" name="fontColourinput" id="fontColourinput" value="' + chatOptions.look.fontColor + '"/></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Font</p><p>Font family <select id="fontList"><option value="arial" style="font-family:arial;">Arial</option><option value="courier new" style="font-family:courier new;">Courier new</option><option value="georgia" style="font-family:georgia;">Georgia</option><option value="palatino linotype" style="font-family:palatino linotype;">Palatino linotype</option><option value="Comic Sans MS" style="font-family:Comic Sans MS;">Comic sans</option><option value="tahoma" style="font-family:tahoma;">Tahoma</option><option value="Trebuchet MS" style="font-family:Trebuchet MS;">Trebuchet MS</option><option value="Verdana" style="font-family:Verdana;">Verdana</option><option value="Lucida Console" style="font-family:Lucida Console;">Lucida Console</option></select></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Mps grupales</p><input type="checkbox" name="multiPM" value="multiPM" id="Mp grupal/> Habilitar <a href="http://cod.wikia.com/wiki/MediaWiki:Chat.js/multipms.js" target="_blank">MPs grupales</a></fieldset></form>', {
		id: "optionsWindow",
        width: 600,
        buttons: [
		{
			id: "cancel",
            message: "Cancel",
            handler: function () {
				cancelChanges();
            }
		},
		{
			id: "updateCookie",
			defaultButton: true,
			message: "Update!",
			handler: function () {
				updateCookie();
            }
        }
		]
	});
	$(".close").click(cancelChanges);
	// revisar cambios por el user
	if (chatOptions.modules.multiPM.enabled)
		$("#multiPM").attr("checked",true);
 
	if (typeof window.customFonts !== "undefined" && window.customFonts.length) {
		for (var i = 0; i < window.customFonts.length; i++) {
			var font = window.customFonts[i];
			$("#fontList").append('<option value="' + font+ '" style="font-family:' + font + ';">' + font.slice(0,1).toUpperCase() + font.slice(1) + '</option>');
		}
	}
	// gg
	if (!wgUserGroups.indexOf("chatmoderator") && !wgUserGroups.indexOf("sysop") && !wgUserGroups.indexOf("staff") && !wgUserGroups.indexOf("helper") && !wgUserGroups.indexOf("vstf"))
		$("#multiKick").attr("disabled",true);
	if (wgServer !== "http://callofduty.wikia.com")
		$("#ignoreURL").attr("disabled",true);
 
	$("select option[value='" + chatOptions.look.fontFamily + "']").attr("selected","selected"); // sets the font selector to the one chosen currently
}
 
/**
 * Cerrar la ventana sin guardar cambios
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
	$('.Rail').prepend('<div id="chatOptionsButton" onclick="openOptions();" style="margin:auto; cursor: pointer; font-size:150%; bottom:4px; padding-bottom:2px; border-bottom: 1px solid #CCCCCC; width:90%;" align="center"><img src="' + chatOptions.look.modalIcon + '" width="18px"/>&nbsp;Options</div>'); // Prevent multiple buttons from being appended
}
 
window.onload = updateChatSkin();