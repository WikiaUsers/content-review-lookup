$('.ChatHeader .public').append('<div id="trigger" style="position: relative; left: 175px; cursor: pointer;">Trigger</div>');
$('#trigger').click(function(){
    $(this).after('<nav id="menu-wrapper" class="menu-wrapper chat-menu-navigation"><a id="chat-menu-button" class="chat-menu-button" title="Show Chat Menu">Chat Menu<ul class="dropdown"><li id="away"><a href="javascript:toggleAway();" title="Toggle Away">Toggle Away</a></li><li id="theme-options" class="parent"><a class="more">Options &gt;</a><ul class="dropdown-submenu"><li id="options"><form class="WikiaForm" method="" name=""><article><table><tr><td><label for="theme2">Test Theme</label><input type="radio" value="theme2" id="theme2" /></td><td><label for="theme3">Test Theme 2</label><input type="radio" value="theme3" id="theme3" /></td></tr><tr><td><label for="default">Default</label><input type="radio" value="default" id="default" checked /></td></tr></table></article></form></li></ul></li><li id="clear-chat"><a href="javascript:clearChat();">Clear Chat</a></li></ul></a></nav>');
    $('head').append('<style type="text/css"> .menu-wrapper a:hover > .dropdown { display: block;} .menu-wrapper .dropdown { display: none;} .menu-wrapper .dropdown, .menu-wrapper .dropdown ul { list-style: none;} .menu-wrapper .dropdown { background: rgba(45, 0, 80, 0.4); width: 165px; text-align: center; padding: 5px;} .menu-wrapper .dropdown ul { display: none;} .menu-wrapper .dropdown > li:hover > ul { display: block; position: absolute; left: 25%; top: 60%; background: rgba(45, 120, 80, 0.3);}</style>');
});

(function($){
    'use strict';
    var disable = $.isArray(window.chatTagsDisable) ? window.chatTagsDisable : [];
 
    mainRoom.model.chats.bind('afteradd', function (chat) {
        var t = chat.attributes.text,
            $m = $('#Chat_' + roomId + ' .message:last').html();
 
            if ($.inArray('b', disable) === -1) {
              // Boldface
              if (t.match(/(?=.*\[b\])(?=.*\[\/b\])/gi)) {
                $m = $m.replace(/\[b\]/gi, '<span style="font-weight: bold">').replace(/\[\/b\]/gi, '</span>');
              }
            }
 
            if ($.inArray('bshadow', disable) === -1) {
              // Box Shadow
              if (t.match(/(?=.*\[bshadow .*\])(?=.*\[\/bshadow\])/gi)) {
                $m = $m.replace(/\[bshadow (.*?)\]/gi, '<span style="box-shadow: $1;">').replace(/\[\/bshadow\]/gi, '</span>');
              }
            }
 
            if ($.inArray('big', disable) === -1) {
              // Big
              if (t.match(/(?=.*\[big\])(?=.*\[\/big\])/gi)) {
                $m = $m.replace(/\[big\]/gi, '<span style="font-size: larger">').replace(/\[\/big\]/gi, '</span>');
              }
            }
 
            if ($.inArray('c', disable) === -1) {
              // Color
              if (t.match(/(?=.*\[c .*\])(?=.*\[\/c\])/i)) {
                $m = $m.replace(/\[c (.*?)\]/gi, '<span style="color: $1">').replace(/\[\/c\]/gi, '</span>');
              }
            }
 
            if ($.inArray('f', disable) === -1) {
              // Font
              if (t.match(/(?=.*\[f .*\])(?=.*\[\/f\])/i)) {
                $m = $m.replace(/\[f (.*?)\]/gi, '<span style="font-family: $1">').replace(/\[\/f\]/gi, '</span>');
              }
            }
 
            if ($.inArray('i', disable) === -1) {
              // Italicize
              if (t.match(/(?=.*\[i\])(?=.*\[\/i\])/i)) {
                $m = $m.replace(/\[i\]/gi, '<span style="font-style: italic">').replace(/\[\/i\]/gi, '</span>');
              }
            }
 
            if ($.inArray('img', disable) === -1) {
              // Image
              if (t.match(/(?=.*\[img .*\])/i)) {
                $m = $m.replace(/<a.*?\>/gi, '').replace(/<\/a\>/gi, '').replace(/\[img (.*?)\]/gi, '<a href="$1"><img src="$1" style="max-height: 200px; max-width: 200px" /></a>');
              }
            }

            if ($.inArray('ul', disable) === -1) {
              // List (unordered)
              if (t.match(/(?=.*\[ul\])(?=.*\[\/ul\])/i)) {
                $m = $m.replace(/\[ul\]/gi, '<ul>').replace(/\[\/ul\]/gi, '</ul>');
              }
            }

            if ($.inArray('ol', disable) === -1) {
              // List (ordered)
              if (t.match(/(?=.*\[ol\])(?=.*\[\/ol\])/i)) {
                $m = $m.replace(/\[ol\]/gi, '<ol>').replace(/\[\/ol\]/gi, '</ol>');
              }
            }

            if ($.inArray('li', disable) === -1) {
              // List Item
              if (t.match(/(?=.*\[li\])(?=.*\[\/li\])/i)) {
                $m = $m.replace(/\[li\]/gi, '<li>').replace(/\[\/li\]/gi, '</li>');
              }
            }
 
            if ($.inArray('p', disable) === -1) {
              // Preformatted
              if (t.match(/(?=.*\[p\])(?=.*\[\/p\])/i)) {
                $m = $m.replace(/\[p\]/gi, '<pre>').replace(/\[\/p\]/gi, '</pre>');
              }
            }
 
            if ($.inArray('s', disable) === -1) {
              // Strikethrough
              if (t.match(/(?=.*\[s\])(?=.*\[\/s\])/i)) {
                $m = $m.replace(/\[s\]/gi, '<span style="text-decoration: line-through">').replace(/\[\/s\]/gi, '</span>');
              }
            }
 
            if ($.inArray('small', disable) === -1) {
              // Small
              if (t.match(/(?=.*\[small\])(?=.*\[\/small\])/gi)) {
                $m = $m.replace(/\[small\]/gi, '<small>').replace(/\[\/small\]/gi, '</small>');
              }
            }
 
            if ($.inArray('sub', disable) === -1) {
              // Subscript
              if (t.match(/(?=.*\[sub\])(?=.*\[\/sub\])/i)) {
                $m = $m.replace(/\[sub\]/gi, '<sub>').replace(/\[\/sub\]/gi, '</sub>');
              }
            }
 
            if ($.inArray('sup', disable) === -1) {
              // Superscript
              if (t.match(/(?=.*\[sup\])(?=.*\[\/sup\])/i)) {
                $m = $m.replace(/\[sup\]/gi, '<sup style="vertical-align: top">').replace(/\[\/sup\]/gi, '</sup>');
              }
            }

            if ($.inArray('td', disable) === -1) {
              // Table Cell
              if (t.match(/(?=.*\[td .*\])(?=.*\[\/td\])/i)) {
                $m = $m.replace(/\[td (.*?)\]/gi, '<td style="background: $1;">').replace(/\[\/td\]/gi, '</td>');
              }
            }

            if ($.inArray('th', disable) === -1) {
              // Table Head
              if (t.match(/(?=.*\[th .*\])(?=.*\[\/th\])/i)) {
                $m = $m.replace(/\[th (.*?)\]/gi, '<th style="background: $1;">').replace(/\[\/th\]/gi, '</th>');
              }
            }

            if ($.inArray('tr', disable) === -1) {
              // Table Row
              if (t.match(/(?=.*\[tr\])(?=.*\[\/tr\])/i)) {
                $m = $m.replace(/\[tr\]/gi, '<tr>').replace(/\[\/tr\]/gi, '</tr>');
              }
            }

            if ($.inArray('table', disable) === -1) {
              // Table
              if (t.match(/(?=.*\[table .*\])(?=.*\[\/table\])/i)) {
                $m = $m.replace(/\[table (.*?)\]/gi, '<table style="background: $1;">').replace(/\[\/table\]/gi, '</table>');
              }
            }
 
            if ($.inArray('tshadow', disable) === -1) {
              // Text Shadow
              if (t.match(/(?=.*\[tshadow .*\])(?=.*\[\/tshadow\])/i)) {
                $m = $m.replace(/\[tshadow (.*?)\]/gi, '<span style="text-shadow: $1;">').replace(/\[\/tshadow\]/gi, '</span>');
              }
            }

            if ($.inArray('transform', disable) === -1) {
              // Transform (beta)
              if (t.match(/(?=.*\[transform .*\])(?=.*\[\/transform\])/i)) {
                 $m = $m.replace(/\[transform (.*?)\]/gi, '<span style="-webkit-transform: $1; -moz-transform: $1; -ms-transform: $1; -o-transform: $1; transform: $1;">').replace(/\[\/transform\]/gi, '</span>');
              }
            }

            if ($.inArray('u', disable) === -1) {
              // Underline
              if (t.match(/(?=.*\[u\])(?=.*\[\/u\])/i)) {
                $m = $m.replace(/\[u\]/gi, '<span style="text-decoration: underline">').replace(/\[\/u\]/gi, '</span>');
              }
            }
 
            $('#Chat_' + roomId + ' .message:last').html($m);
     });
}(this.jQuery));

/**
 * ChatOptions
 * Change how Special:Chat looks and functions using an interface.
 * Uses cookies to store the changes.
 * A potential solution to all your chathacks problems.
 *
 * Many thanks to the Call of Duty Wiki Chat,
 * who supported and helped this the whole way through.
 * It has been much appreciated. Thank you!
 *
 * WARNING
 * Make sure you are not loading MediaWiki:Chat.js/load.js 
 * with MediaWiki:Chat-edit-count.
 * Load it with MediaWiki:Chat-welcome-message, or this
 * will malfunction badly.
 * TODO: Improve user interface
 *
 * @version 1.3.1
 * @author Callofduty4
 * @author Madnessfan34537
 * @author Sactage <sactage@gmail.com>
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
                modalIcon: "http://www.derehamreclaim.co.uk/_images-pages/icon-hammerSpanner.jpg"
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
	var $optionsWindowHTML = $.showCustomModal( "Options", '<form method="" name="" class="WikiaForm "><fieldset><p style="font-size:120%; font-weight:bold; font-style:italic;">Colour changes</p><p style="font-size:80%;">Enter a <a href="http://www.w3schools.com/html/html_colornames.asp" target="_blank">colour name</a> or <a href="http://html-color-codes.info/" target="_blank">colour hex</a><p>Chat background&nbsp;<input type="text" name="backgroundColourinput" id="backgroundColourinput" value="' + chatOptions.look.backgroundColor + '"/></p><br/><p>Self-post background&nbsp;<input type="text" name="selfPostColourinput" id="selfPostColourinput" value="' + chatOptions.look.selfPostColor + '"/></p><br/><p>Surround&nbsp;<input type="text" name="surroundColourinput" id="surroundColourinput" value="' + chatOptions.look.surroundColor + '"/></p><br/><p>Font colour&nbsp;<input type="text" name="fontColourinput" id="fontColourinput" value="' + chatOptions.look.fontColor + '"/></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Font</p><p>Font family <select id="fontList"><option value="arial" style="font-family:arial;">Arial</option><option value="courier new" style="font-family:courier new;">Courier new</option><option value="georgia" style="font-family:georgia;">Georgia</option><option value="palatino linotype" style="font-family:palatino linotype;">Palatino linotype</option><option value="Comic Sans MS" style="font-family:Comic Sans MS;">Comic sans</option><option value="tahoma" style="font-family:tahoma;">Tahoma</option><option value="Trebuchet MS" style="font-family:Trebuchet MS;">Trebuchet MS</option><option value="Verdana" style="font-family:Verdana;">Verdana</option><option value="Lucida Console" style="font-family:Lucida Console;">Lucida Console</option></select></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Added functionality</p><input type="checkbox" name="chatHacks" value="chatHacks" id="chatHacks"/> Enable <a href="http://c.wikia.com/wiki/User:Monchoman45/ChatHacks.js" target="_blank">chathacks</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="multiPM" value="multiPM" id="multiPM"/> Enable <a href="http://callofduty.wikia.com/wiki/User:Madnessfan34537/multipm.js" target="_blank">multi PM</a><br/><input type="checkbox" name="tabComplete" value="tabComplete" id="tabComplete"/>Enable <a href="http://runescape.wikia.com/wiki/User:Joeytje50/tabinsert.js" target="_blank">tab complete</a>&nbsp;&nbsp;&nbsp;<input type="checkbox" name="searchBar" value="searchBar" id="searchBar"/>Enable <a href="http://callofduty.wikia.com/wiki/MediaWiki:Chat.js/searchbar.js" target="_blank">search bar</a><br/><input type="checkbox" name="multiKick" value="multiKick" id="multiKick" />Enable <a href="http://callofduty.wikia.com/wiki/User:Madnessfan34537/multikick.js" target="_blank">multi kick</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="ignoreURL" value="ignoreURL" id="ignoreURL"/>Ignore URL in main chat<br /><input type="checkbox" name="stopSideScroll" value="stopSideScroll" id="stopSideScroll"/>Stop the sidescroll bar to appear after someone spams</fieldset></form>', {
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
	$('.Rail').prepend('<div id="chatOptionsButton" onclick="openOptions();" style="margin:auto; cursor: pointer; font-size:150%; bottom:4px; padding-bottom:2px; border-bottom: 1px solid #CCCCCC; width:90%;" align="center"><img src="' + chatOptions.look.modalIcon + '" width="18px"/>&nbsp;Options</div>'); // Prevent multiple buttons from being appended
}
 
window.onload = updateChatSkin();