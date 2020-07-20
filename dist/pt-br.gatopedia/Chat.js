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