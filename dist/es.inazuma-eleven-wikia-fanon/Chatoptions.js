/**
 * Opciones del Chat
 * Cambia como se ve Special:Chat y las funciones usando una interfaz
 * Emplea "cookies" para guardar los cambios personales
 * Una potencial solución a todos los problemas con el ChatHacks
 *
 * Muchas gracias al chat de Call of Duty Wiki,
 * el cual soportó y ayudo al buen funcionamiento y desarrollo de este código.
 * Apreciamos su colaboración. ¡Gracias!
 *
 * ADVERTENCIA
 * No debe ser cargado en MediaWiki:Chat.js/load.js 
 * con MediaWiki:Chat-edit-count.
 * Añádelo en MediaWiki:Chat-welcome-message, o
 * podría causarse un mal funcionamiento.
 * Generalizando: Improvisa la interfaz del usuario.
 *
 * @versión: 1.3.1
 * @autor: Callofduty4
 * @autor: Madnessfan34537
 * @autor: Sactage <sactage@gmail.com>
 * @traducción al español: Pintor Smeargle
 */
 
 
/**
 * Función para establecer cookies
 * @param cookie_name Representando el nombre de las cookies
 * @param data El valor establecido
 */
function setCookie( cookie_name, data ) {
	var domain = wgServer.split("//")[1];
	document.cookie =
		cookie_name + "=" + data +
		"; max-age=" + 60*60*24*150 +
		"; path=/; domain=" + domain;
}
 
/**
 * Función para obtener el valor de la cookie
 * @param cookie_name Representando el nombre de las cookies
 * @param pos El índice de valor obtenido de la cookie
 * @return Valor de la cookie
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
 * Función para comprobar si el módulo de opciones del chat está habilitado
 * @desde 1.3.0
 * @autor Sactage
 * @param name Nombre del módulo de opciones
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
		case "messageBlocker":
			c = getCookie("customisation", 8);
			break;
		default:
			return false;
	}
	return (c === "true");
}
 
// Guarda las opciones de persoalización del chat como un objeto
var chatOptions = {
	look: {
		fontColor: getCookie("customisation", 1),
		fontFamily: getCookie("customisation", 3),
		surroundColor: getCookie("customisation", 10),
		selfPostColor: getCookie("customisation", 11),
		backgroundColor: getCookie("customisation", 0),
                modalIcon: "https://gabylunac.files.wordpress.com/2010/09/preferencias-del-sistema1.png"
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
				$('<a id="multiKickerButton" class="wikia-button" href="javascript:showPopup()" style="position:absolute; right:55px; top:22px;">Multikick</a>').appendTo('.Write'); // para prevenir que el botón no cargue
				this.loaded = true;
			}
		},
		multiPM: {
			element: "#multiPM",
			enabled: isEnabled("multiPM"),
			loaded: false,
			load: function () {
				importScriptPage("MediaWiki:PM-es.js", "pintorsmeargle");
				this.loaded = true;
			}
		},
		searchBar: {
			element: "#searchBar",
			enabled: isEnabled("searchBar"),
			loaded: false,
			load: function () {
				importScriptPage("MediaWiki:Chat.js/searchbar.js","tobias-laboratory");
				this.loaded = true;
			}
		},
		messageBlocker: {
			element: "#messageBlocker",
			enabled: isEnabled("messageBlocker"),
			loaded: false,
			load: function () {
				importScriptPage("MessageBlocker/code.js", "dev");
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
 * Aplica las configuraciones mejoradas a la piel del chat
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
 * Deshabilita las opciones de la ventana
 */
function openOptions() {
	// GENERALIZANDO: ¿Matar esto con fuego? Esa fue la mejor manera de hacer esto - pero usa $.showModal
	var $optionsWindowHTML = $.showCustomModal( "Opciones", '<form method="" name="" class="WikiaForm "><fieldset><p style="font-size:120%; font-weight:bold; font-style:italic;">Cambios en el color</p><p style="font-size:80%;">Ingresa el <a href="http://www.w3schools.com/html/html_colornames.asp" target="_blank">nombre del color</a> o <a href="http://html-color-codes.info/" target="_blank">su código</a><p>Fondo del chat&nbsp;<input type="text" name="backgroundColourinput" id="backgroundColourinput" value="' + chatOptions.look.backgroundColor + '"/></p><br/><p>Fondo de tus propios mensajes&nbsp;<input type="text" name="selfPostColourinput" id="selfPostColourinput" value="' + chatOptions.look.selfPostColor + '"/></p><br/><p>Fondo&nbsp;<input type="text" name="surroundColourinput" id="surroundColourinput" value="' + chatOptions.look.surroundColor + '"/></p><br/><p>Color de la letra&nbsp;<input type="text" name="fontColourinput" id="fontColourinput" value="' + chatOptions.look.fontColor + '"/></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Font</p><p>Letra fuente <select id="fontList"><option value="arial" style="font-family:arial;">Arial</option><option value="courier new" style="font-family:courier new;">Courier new</option><option value="georgia" style="font-family:georgia;">Georgia</option><option value="palatino linotype" style="font-family:palatino linotype;">Palatino linotype</option><option value="Comic Sans MS" style="font-family:Comic Sans MS;">Comic sans</option><option value="tahoma" style="font-family:tahoma;">Tahoma</option><option value="Trebuchet MS" style="font-family:Trebuchet MS;">Trebuchet MS</option><option value="Verdana" style="font-family:Verdana;">Verdana</option><option value="Lucida Console" style="font-family:Lucida Console;">Lucida Console</option></select></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Añadir funcionalidades</p><input type="checkbox" name="chatHacks" value="chatHacks" id="chatHacks"/> Habilitar <a href="http://c.wikia.com/wiki/User:Monchoman45/ChatHacks.js" target="_blank">ChatHacks</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="multiPM" value="multiPM" id="multiPM"/> Habilitar <a href="http://pintorsmeargle.wikia.com/wiki/MediaWiki%3APM-es.js" target="_blank">privado grupal</a><br/><input type="checkbox" name="tabComplete" value="tabComplete" id="tabComplete"/>Habilitar <a href="http://runescape.wikia.com/wiki/User:Joeytje50/tabinsert.js" target="_blank">tab complete</a>&nbsp;&nbsp;&nbsp;<input type="checkbox" name="searchBar" value="searchBar" id="searchBar"/>Habilitar <a href="http://pintorkagamine.wikia.com/wiki/MediaWiki:Searchbar.js" target="_blank">barra de búsqueda</a><br/><input type="checkbox" name="multiKick" value="multiKick" id="multiKick" />Habilitar <a href="http://callofduty.wikia.com/wiki/User:Madnessfan34537/multikick.js" target="_blank">multi expulsión</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="messageBlocker" value="messageBlocker" id="messageBlocker"/>Habilitar <a href="http://dev.wikia.com/wiki/MessageBlocker" target="_blank">bloqueador de mensajes</a><br /><input type="checkbox" name="stopSideScroll" value="stopSideScroll" id="stopSideScroll"/>Detener el scroll lateral después de que alguien hace spam</fieldset></form>', {
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
			message: "¡Mejorado!",
			handler: function () {
				updateCookie();
		    }
	    }
		]
	});
	$(".close").click(cancelChanges);
	// Revisa si varios módulos han sido habilitados por el usuario, y consulta si las funciones lo están
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
	if (chatOptions.modules.messageBlocker.enabled)
		$("#messageBlocker").attr("checked",true);
	if (chatOptions.modules.stopSideScroll.enabled)
		$("#stopSideScroll").attr("checked",true);
 
	if (typeof window.customFonts !== "undefined" && window.customFonts.length) {
		for (var i = 0; i < window.customFonts.length; i++) {
			var font = window.customFonts[i];
			$("#fontList").append('<option value="' + font+ '" style="font-family:' + font + ';">' + font.slice(0,1).toUpperCase() + font.slice(1) + '</option>');
		}
	}
	// Posiciona ciertos módulos "checkboxes" para deshabilitar una condición específica que no se reconoce
	if (!wgUserGroups.indexOf("chatmoderator") && !wgUserGroups.indexOf("sysop") && !wgUserGroups.indexOf("staff") && !wgUserGroups.indexOf("helper") && !wgUserGroups.indexOf("vstf"))
		$("#multiKick").attr("disabled",true);
 
	$("select option[value='" + chatOptions.look.fontFamily + "']").attr("selected","selected"); // establece la fuente seleccionada
}
 
/**
 * Cierra la ventanilla de opciones sin guardar ningún cambioClose the options window without saving any changes
 */
function cancelChanges() {
	var dialog = $('#optionsWindow');
	dialog.closeModal();
}
 
/**
 * Guarda las opciones del usuario y las deposita en una cookie para que se mantenga cada vez que el usuario entre al chat
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
 
	// Establece las cookies
	setCookie("customisation", chatOptions.look.backgroundColor + ", " + chatOptions.look.fontColor + ", " + chatOptions.modules.chatHacks.enabled + ", " + chatOptions.look.fontFamily + ", " + chatOptions.modules.tabComplete.enabled + ", " +  chatOptions.modules.multiKick.enabled + ", " + chatOptions.modules.multiPM.enabled + ", " + chatOptions.modules.searchBar.enabled + ", " + chatOptions.modules.messageBlocker.enabled + ", " + chatOptions.modules.stopSideScroll.enabled + ", " + chatOptions.look.surroundColor + ", " + chatOptions.look.selfPostColor);
	updateChatSkin();
	cancelChanges();
}
 
 
// Agrega el botón de opciones
if (!$("#chatOptionsButton").length) {
	$('.Rail').prepend('<div id="chatOptionsButton" onclick="openOptions();" style="margin:auto; cursor: pointer; font-size:150%; bottom:4px; padding-bottom:2px; border-bottom: 1px solid #CCCCCC; width:90%;" align="center"><img src="' + chatOptions.look.modalIcon + '" width="18px"/>&nbsp;Opciones</div>'); // Previene que aparezcan muchos botones
}
 
window.onload = updateChatSkin();