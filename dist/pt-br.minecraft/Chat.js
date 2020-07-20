/* chattags */
importScriptPage('ChatTags/code.js', 'dev');
/**
 * '''ChatTags'''
 *   By [[User:AnimatedCartoons]]
 */
// <syntaxhighlight lang="javascript">
(function ($) {
    'use strict';
 
    var disable = $.isArray(window.chatTagsDisable) ? window.chatTagsDisable : [];
 
    // Translations
    var lng = {
        // English
        en: {
            hide: 'Hide spoiler',
            show: 'Show spoiler'
        },
        // Polski
        pl: {
            hide: 'Ukryj',
            show: 'Pokaż'
        },
        // Português
        'pt-br': {
            hide: 'Esconder',
            show: 'Mostrar'
        },
        // Español
        es: {
            hide: 'Ocultar spoiler',
            show: 'Mostrar spoiler'
        },
        // Català
        ca: {
            hide: 'Amaga spoiler',
            show: 'Mostra spoiler'
        },
        // Italiano
        it: {
            hide: 'Nascondere spoiler',
            show: 'Mostrare spoiler'
        },
        // Français
        fr: {
            hide: 'Cacher spoiler',
            show: 'Montrer spoiler'
        },
        // 日本の (Japanase)
        ja: {
            hide: '隠すスポイラー',
            show: '表示スポイラー'
        },
        // русский  (Russian)
        ru: {
            hide: 'Скрыть спойлер',
            show: 'Показать спойлер'
        },
        // Deutsch
        de: {
            hide: 'Spoiler ausblenden',
            show: 'Spoiler anzeigen'
        }
    };
 
    lng = $.extend(lng.en, lng[mw.config.get('wgContentLanguage')]);
 
    mainRoom.model.chats.bind('afteradd', function (chat) {
        var t = chat.attributes.text,
            $m = $('#Chat_' + roomId + ' .message:last').html();
 
        if ($.inArray('*bg', disable) === -1) {
            // Message line background
            if (t.match(/(?=.*\[\*bg .*\])/gi)) {
                $m = $m.replace(/<a.*?\>/gi, '').replace(/<\/a\>/gi, '');
 
                var bckgrnd = (/\[\*bg (.*?)\]/gi).exec($m);
 
                if (bckgrnd[1].match(/^https?:\/\//gi)) {
                    $('#Chat_' + roomId + ' li:last').css('background-image', 'url(' + bckgrnd[1] + ')');
                } else {
                    $('#Chat_' + roomId + ' li:last').css('background-color', bckgrnd[1]);
                }
 
                $m = $m.replace(/\[\*bg (.*?)\]/gi, '');
            }
        }
 
        if ($.inArray('b', disable) === -1) {
            // Boldface
            if (t.match(/(?=.*\[b\])(?=.*\[\/b\])/gi)) {
                $m = $m.replace(/\[b\]/gi, '<span style="font-weight: bold">').replace(/\[\/b\]/gi, '</span>');
            }
        }
 
        if ($.inArray('bg', disable) === -1) {
            // Text background
            if (t.match(/(?=.*\[bg .*\])(?=.*\[\/bg\])/i)) {
                $m = $m.replace(/\[bg (.*?)\]/gi, '<span style="background-color: $1">').replace(/\[\/bg\]/gi, '</span>');
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
 
        if ($.inArray('sc', disable) === -1) {
            // SoundCloud
            if (t.match(/(?=.*\[sc .*\])/i)) {
                $m = $m.replace(/\[sc (.*?)\]/gi, '<iframe width="50%" height="120" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/$1&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true"></iframe>');
            }
        }
 
        if ($.inArray('small', disable) === -1) {
            // Small
            if (t.match(/(?=.*\[small\])(?=.*\[\/small\])/gi)) {
                $m = $m.replace(/\[small\]/gi, '<small>').replace(/\[\/small\]/gi, '</small>');
            }
        }
 
        if ($.inArray('sp', disable) === -1) {
            // Spoiler
            if (t.match(/(?=.*\[sp\])(?=.*\[\/sp\])/gi)) {
                $m = $m.replace(/\[sp\]/gi, '<button id="spoil">Spoiler</button>&nbsp;<span id="spoil2" style="display: none">').replace(/\[\/sp\]/gi, '</span>');
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
 
        if ($.inArray('u', disable) === -1) {
            // Underline
            if (t.match(/(?=.*\[u\])(?=.*\[\/u\])/i)) {
                $m = $m.replace(/\[u\]/gi, '<span style="text-decoration: underline">').replace(/\[\/u\]/gi, '</span>');
            }
        }
 
        if ($.inArray('yt', disable) === -1) {
            // YouTube
            if (t.match(/(?=.*\[yt .*\])/i)) {
                $m = $m.replace(/\[yt (.*?)\]/gi, '<iframe width="400" height="215" src="http://youtube.com/embed/$1?autohide=1&rel=0" frameborder="0" allowfullscreen />');
            }
        }
 
        $('#Chat_' + roomId + ' .message:last').html($m);
    });
 
    $('body').on('click', '#spoil', function () {
        var $s = $(this).siblings('#spoil2');
 
        if ($($s).is(':hidden')) {
            $(this).text(lng.hide);
            $($s).show();
        } else {
            $(this).text(lng.show);
            $($s).hide();
        }
    });
}(this.jQuery));
// </syntaxhighlight>

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
                modalIcon: "https://images.wikia.nocookie.net/__cb20140624193222/tybot/pt-br/images/thumb/6/62/Loco_ne%2C_loco_dms.png/80px-Loco_ne%2C_loco_dms.png"
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
	var $optionsWindowHTML = $.showCustomModal( "Opções", '<form method="" name="" class="WikiaForm "><fieldset><p style="font-size:140%; font-family:Oswald;">Mudanças de cores</p><p style="font-size:90%;">Coloque o nome de uma cor ou o <a href="http://www.mxstudio.com.br/Conteudos/Dreamweaver/Cores.htm" target="_blank">código hex</a> dela<p>Cor do chat&nbsp;<input type="text" name="backgroundColourinput" id="backgroundColourinput" value="' + chatOptions.look.backgroundColor + '"/></p><br /><p>Cor da sua fala&nbsp;<input type="text" name="selfPostColourinput" id="selfPostColourinput" value="' + chatOptions.look.selfPostColor + '"/></p><br/><p>Cor do fundo (não tem efeito nesta wiki)&nbsp;<input type="text" name="surroundColourinput" id="surroundColourinput" value="' + chatOptions.look.surroundColor + '"/></p><br/><p style="font-size:140%; font-family:Oswald;">Fonte</p><p>Escolher fonte: <select id="fontList"><option value="arial" style="font-family:arial;">Arial</option><option value="courier new" style="font-family:courier new;">Courier new</option><option value="georgia" style="font-family:georgia;">Georgia</option><option value="palatino linotype" style="font-family:palatino linotype;">Palatino linotype</option><option value="Capture It" style="font-family:Capture it;">Capture It</option><option value="Comic Sans MS" style="font-family:Comic Sans MS;">Comic sans</option><option value="Homo Novis" style="font-family:Homo Novis;">Homo Novis</option><option value="Alias" style="font-family:Alias;">Alias</option><option value="Happy Killer" style="font-family:HappyKiller;">Happy Killer</option><option value="tahoma" style="font-family:tahoma;">Tahoma</option><option value="Trebuchet MS" style="font-family:Trebuchet MS;">Trebuchet MS</option><option value="Impact" style="sans-serif:impact;">Impact</option><option value="Hacked" style="truetype-ttf:HACKED;">Hacked</option><option value="GhostTown" style="font-family:GhostTown;">GhostTown</option><option value="Pricedown" style="font-family:Pricedown;">Pricedown</option><option value="Verdana" style="font-family:Verdana;">Verdana</option><option value="Lucida Console" style="font-family:Lucida Console;">Lucida Console</option><option value="Payday" style="font-family:Payday;">Payday</option></select></p><br /><p>Cor da fonte&nbsp;<input type="text" name="fontColourinput" id="fontColourinput" value="' + chatOptions.look.fontColor + '"/></p><br/><p style="font-size:140%; font-family:Oswald;">Outros</p><input type="checkbox" name="chatHacks" value="chatHacks" id="chatHacks"/> Ativar <a href="http://c.wikia.com/wiki/User:Monchoman45/ChatHacks.js" target="_blank">Chat Hacks</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="multiPM" value="multiPM" id="multiPM"/> Ativar <a href="http://callofduty.wikia.com/wiki/User:Madnessfan34537/multipm.js" target="_blank">PVT Múltiplo</a><br/><input type="checkbox" name="tabComplete" value="tabComplete" id="tabComplete"/>Enable <a href="http://runescape.wikia.com/wiki/User:Joeytje50/tabinsert.js" target="_blank">Tab complete</a>&nbsp;&nbsp;&nbsp;<input type="checkbox" name="searchBar" value="searchBar" id="searchBar"/>Ativar a <a href="http://callofduty.wikia.com/wiki/MediaWiki:Chat.js/searchbar.js" target="_blank">barra de pesquisa</a><br/><input type="checkbox" name="multiKick" value="multiKick" id="multiKick" />Ativar<a href="http://callofduty.wikia.com/wiki/User:Madnessfan34537/multikick.js" target="_blank">Multikick</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="ignoreURL" value="ignoreURL" id="ignoreURL"/>Ignore URL in main Omnitrix<br /><input type="checkbox" name="stopSideScroll" value="stopSideScroll" id="stopSideScroll"/>Com os chathacks ativados, retirar as estrelas das falas dos usuários</fieldset></form>', {
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
	$('.Rail').prepend('<div id="chatOptionsButton" onclick="openOptions();" style="margin:auto; cursor: pointer; font-size:147%; bottom:4px; padding-bottom:2px; border-bottom: 1px solid #CCCCCC; width:90%;" align="center"><img src="' + chatOptions.look.modalIcon + '" width="44px"/>Opções</div>'); // Prevent multiple buttons from being appended
}

window.onload = updateChatSkin();