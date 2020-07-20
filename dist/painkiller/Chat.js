/* <syntaxhighlight lang="javascript"> */
/**
 * ======================================
 * =         Special Thanks To:         =
 * ======================================
 * = @ChatOptions : version 1.3.1       =
 * = @author Callofduty4                =
 * = @author Madnessfan34537            =
 * = @author Sactage                    =
 * ======================================
 * = @EmoticonsWindows : version 1.5    =
 * = @author KockaAdmiralac             =
 * ======================================
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
        modalIcon: "https://images.wikia.nocookie.net/__cb20140531235013/dev/images/c/c0/ChatOptionsIcon.png"
	},
	modules: {
		chatHacks: {
			element: "#chatHacks",
			enabled: isEnabled("chatHacks"),
			loaded: false,
			load: function () {
				if ($("#pingspan").length > 0 || this.loaded)
					return;
				importScriptPage("MediaWiki:ChatHacks.js", "dev");
				this.loaded = true;
			}
		},
		tabComplete: {
			element: "#tabComplete",
			enabled: isEnabled("tabComplete"),
			loaded: false,
			load: function () {
				importScriptPage("MediaWiki:Tabinsert.js","dev");
				this.loaded = true;
			}
		},
		multiKick: {
			element: "#multiKick",
			enabled: isEnabled("multiKick"),
			loaded: false,
			load: function () {
				importScriptPage("MediaWiki:Multikick.js","dev");
				$('<a id="multiKickerButton" class="wikia-button" href="javascript:showPopup()" style="position:absolute; right:55px; top:22px;">Multikick</a>').appendTo('.Write'); // to prevent issues with the button not loading
				this.loaded = true;
			}
		},
		multiPM: {
			element: "#multiPM",
			enabled: isEnabled("multiPM"),
			loaded: false,
			load: function () {
				importScriptPage("MediaWiki:Multipms.js", "dev");
				this.loaded = true;
			}
		},
		searchBar: {
			element: "#searchBar",
			enabled: isEnabled("searchBar"),
			loaded: false,
			load: function () {
				importScriptPage("MediaWiki:ChatSearchbar/code.js","dev");
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
	$('.Write [name="message"]').css({"color":chatOptions.look.fontColor, "font-family":chatOptions.look.fontFamily});
	$('.Write .message').css({"background-color":chatOptions.look.backgroundColor, "font-family":chatOptions.look.fontFamily});
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
	var $optionsWindowHTML = $.showCustomModal( "Options", '<form method="" name="" class="WikiaForm "><fieldset><p style="font-size:120%; font-weight:bold; font-style:italic;">Colour changes</p><p style="font-size:80%;">Enter a <a href="http://www.w3schools.com/html/html_colornames.asp" target="_blank">colour name</a> or <a href="http://html-color-codes.info/" target="_blank">colour hex</a><p>Chat background&nbsp;<input type="text" name="backgroundColourinput" id="backgroundColourinput" value="' + chatOptions.look.backgroundColor + '"/></p><br/><p>Self-post background&nbsp;<input type="text" name="selfPostColourinput" id="selfPostColourinput" value="' + chatOptions.look.selfPostColor + '"/></p><br/><p>Surround&nbsp;<input type="text" name="surroundColourinput" id="surroundColourinput" value="' + chatOptions.look.surroundColor + '"/></p><br/><p>Font colour&nbsp;<input type="text" name="fontColourinput" id="fontColourinput" value="' + chatOptions.look.fontColor + '"/></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Font</p><p>Font family <select id="fontList"><option value="arial" style="font-family:arial;">Arial</option><option value="courier new" style="font-family:courier new;">Courier new</option><option value="georgia" style="font-family:georgia;">Georgia</option><option value="palatino linotype" style="font-family:palatino linotype;">Palatino linotype</option><option value="Comic Sans MS" style="font-family:Comic Sans MS;">Comic sans</option><option value="tahoma" style="font-family:tahoma;">Tahoma</option><option value="Trebuchet MS" style="font-family:Trebuchet MS;">Trebuchet MS</option><option value="Verdana" style="font-family:Verdana;">Verdana</option><option value="Lucida Console" style="font-family:Lucida Console;">Lucida Console</option></select></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Added functionality</p><input type="checkbox" name="chatHacks" value="chatHacks" id="chatHacks"/> Enable <a href="http://dev.wikia.com/wiki/MediaWiki:ChatHacks.js" target="_blank">chathacks</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="multiPM" value="multiPM" id="multiPM"/> Enable <a href="http://cod.wikia.com/wiki/MediaWiki:Chat.js/multipms.js" target="_blank">multi PM</a><br/><input type="checkbox" name="tabComplete" value="tabComplete" id="tabComplete"/>Enable <a href="http://dev.wikia.com/wiki/MediaWiki:Tabinsert.js" target="_blank">tab complete</a>&nbsp;&nbsp;&nbsp;<input type="checkbox" name="searchBar" value="searchBar" id="searchBar"/>Enable <a href="http://callofduty.wikia.com/wiki/MediaWiki:Chat.js/searchbar.js" target="_blank">search bar</a><br/><input type="checkbox" name="multiKick" value="multiKick" id="multiKick" />Enable <a href="http://dev.wikia.com/wiki/MediaWiki:Multikick.js" target="_blank">multi kick</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="ignoreURL" value="ignoreURL" id="ignoreURL"/>Ignore URL in main chat<br /><input type="checkbox" name="stopSideScroll" value="stopSideScroll" id="stopSideScroll"/>Stop the sidescroll bar to appear after someone spams</fieldset></form>', {
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

/* ChatSendButton - add a 'Send' button to the Chat message box */
 
/*global window, $, mw */
 
$(function () {
    'use strict';
 
    // only run in chat + double-run protection
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' || window.loadedChatSendButton) {
        return;
    }
    window.loadedChatSendButton = true;
 
    // set lang
    var i18n = {
        'en': 'Send',
        'be': 'Адправіць',
        'es': 'Enviar',
        'ko': '보내기',
        'nl': 'Verzend',
        'pl': 'Wyślij',
        'pt': 'Enviar',
        'ru': 'Отправить',
        'uk': 'Відправити'
    };
    i18n = i18n[mw.config.get('wgUserLanguage')] || i18n[mw.config.get('wgContentLanguage')] || i18n.en;
 
 
    mw.util.addCSS(
        '.Write [name="message"] {' +
            'width: calc(100% - 70px);' +
        '}' +
        // give ChatSendButton a large right margin by default
        '#ChatSendButton {' +
            'position: absolute;' +
            'bottom: 13px;' +
            'right: 11px;' +
        '}'
);
 
    var $messageBox = $('.Write [name="message"]');
    var $sendButton = $('<span class="button" id="ChatSendButton"></span>').text(i18n);
 
    $sendButton.click(function () {
        $messageBox.trigger({
            type: 'keypress',
            which: 13  // enter/return key
        });
    });
 
    $('.Write').append($sendButton);
 
});

/**
 * Emoticons Window
 */

$(function() {
    if(mw.config.get('wgCanonicalSpecialPageName') !== 'Chat') {
        return;
    }
    /**
     * Main object
     */
    var EmoticonsWindow = {
        // Plugin configuration
        config: $.extend({
            // If button should be integrated with ChatOptions
            chatOptionsIntegration: (mw.config.get('wgCityId') === '621556')
        }, window.EmoticonsWindowConfig),
        // List of emoticons
        emoticons: {},
        // Cached list element
        emoticonsList: $(mw.html.element('div', { id: 'EmoticonsWindowList' })),
        /**
         * Preloads i18n data
         */
        preload: function() {
            $.get(mw.util.wikiScript('load'), {
                mode: 'articles',
                articles: 'u:kocka:MediaWiki:Custom-plugin-i18n/EmoticonsWindow.json',
                only: 'styles'
            }, $.proxy(function(d) {
                var i18n = JSON.parse(d.replace(/\/\*.*\*\//g, '')),
                    lang = mw.config.get('wgUserLanguage');
                this.i18n = $.extend(i18n.en, i18n[lang.split('-')], i18n[lang], window.EmoticonsWindowVocab);
                this.init();
            }, this));
        },
        /**
         * Initialize and parse emoticons
         */
        init: function() {
            this.parseEmoticons();
            this.insertUI();
        },
        /**
         * Parse emoticons
         * EmoticonMapping is used because that's a way Wikia parses
         * emoticons in the default system.
         */
        parseEmoticons: function() {
            var mapping = new EmoticonMapping();
            mapping.loadFromWikiText(mw.config.get('wgChatEmoticons'));
            Object.keys(mapping._settings).forEach(function(key) {
                this.emoticons[mapping._settings[key][0]] = key;
            }, this);
        },
        /**
         * Initialize UI elements
         */
        insertUI: function() {
            mw.util.addCSS('.EmoticonsWindowIcon{width:19px;height:19px;border:1px solid black;padding:10px;border-radius:5px;background:#5F2C60;}.EmoticonsWindowIcon:hover{background:#823C83;}#EmoticonsWindowList{height:400px;overflow-y:auto;}.EmoticonsWindowButton{left:auto !important;right: -45px;}' + (this.config.chatOptionsIntegration ? '' : '.EmoticonsWindowButton{position:absolute;bottom:3px;height: 40px; width: 40px;}'));
            this.insertElements();
            this.insertButton();
            },
        /**
         * Create elements to be displayed in the modal
         */
        insertElements: function() {
            this.mainElement = $('<div id="EmoticonsWindowModalMain">' + mw.html.element('span', { class: 'EmoticonsWindowHelp' }, this.i18n.help) + '</div>');
            $.each(this.emoticons, $.proxy(function(k, v) {
                this.emoticonsList.append(mw.html.element('img', {
                    class: 'EmoticonsWindowIcon',
                    src: v,
                    title: k
                }));
            }, this));
            this.mainElement.append(this.emoticonsList);
        },
        /**
         * Insert the Emoticons button
         */
        insertButton: function() {
            var button = $(mw.html.element('img', { class: 'wikia-button EmoticonsWindowButton', src: 'https://vignette.wikia.nocookie.net/painkiller/images/6/63/Painkiller_Hell_and_Damnation_Emoticon_02.png', title: 'Emoticons'}));

            button.click($.proxy(function() {
                try {
                    this.showModal();
                } catch(e) {
                    console.log("An error occurred in EmoticonsWindow.showModal:\n\n" + e.stack);
                }
                this.setHandlers();
            }, this));
            if(this.config.chatOptionsIntegration) {
                var chatOptionsIntegrationInterval = setInterval(function() {
                    if($('#chatOptionsButton').length > 0) {
                        $('#chatOptionsButton').after(button);
                        $('.EmoticonsWindowButton').wrap(mw.html.element('div', { class: 'chat-button' }));
                        clearInterval(chatOptionsIntegrationInterval);
                    }
                }, 250);
            } else {
                $('.Write').first().append(button);
            }
        },
        /**
         * Show the emoticons window
         */
        showModal: function() {
            $.showCustomModal(this.i18n.emoticons, this.mainElement.prop('outerHTML'), {
                id: 'EmoticonsWindowModal',
                buttons: [{
                    id: 'EmoticonsWindowClose',
                    defaultButton: true,
                    message: this.i18n.close,
                    handler: function() {
                        try {
                            $('#EmoticonsWindowModal').closeModal();
                        } catch(e) {
                            console.log("An error occurred in $().closeModal:\n\n" + e.stack);
                        }
                    }
                }]
            });
        },
        /**
         * Set the handlers for clicking on the emoticon in the list
         */
        setHandlers: function() {
            $('.EmoticonsWindowIcon').click(function(e) {
                var ap = $('.message textarea').last();
                ap.val(ap.attr('value') + ' ' + e.target.title);
                try {
                    $('#EmoticonsWindowModal').closeModal();
                } catch(e) {
                    console.log("An error occurred in $().closeModal:\n\n" + e.stack);
                }
            });
        }
    };
    $($.proxy(EmoticonsWindow.preload, EmoticonsWindow));
});