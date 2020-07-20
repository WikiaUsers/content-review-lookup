/* IsTyping
 *
 * Displays which users are typing on chat.
 * Affects private messages by default.
 *
 * @scope site-wide
 * @author Dorumin
 */

(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' ||
        (window.IsTyping && IsTyping.init)
    ) {
        return;
    }

    window.IsTyping = $.extend({
        // <config>
        // Kill script default styling
        noStyle: false,
        // Kill script auto scroll compensation, not necessary after updated indicator
        doScroll: false,
        // Kill script on main
        mainRoomDisabled: false,
        // Kill script on PMs
        privateRoomDisabled: false,
        // Filter self or not, which I documented for some reason
        filterSelf: true,
        // Indicator jQuery object, defined on init
        $indicator: null,
        // Users whose typing state is hidden from the typing indicator
        ignore: [],
        // Use old configuration
        old: false,
        // </config>, further overrides are possible but not supported
        // Milliseconds to wait before a typing state is invalidated
        statusTTL: 8000,
        // Milliseconds before sending another typing ping to a room
        ownStatusThrottle: 6000,
        // Pixels to scroll by if [this.doScroll] is set to true
        scrollBy: 20,
        // For keeping track of loaded resources
        _preload: 0,
        // Object containing room data mapped by room ID
        data: {},
        // Pushes a function call to the end of the callstack
        setImmediate: function(fn) {
            setTimeout(fn.bind(this), 0);
        },
        // Returns the currently active room
        getCurrentRoom: function() {
            if (mainRoom.activeRoom == 'main' || mainRoom.activeRoom === null) {
                return mainRoom;
            }
            return mainRoom.chats.privates[mainRoom.activeRoom];
        },
        // Gets the corresponding object in [this.data] for a given room
        getRoomState: function(room) {
            return this.data[room.roomId];
        },
        // Sends a typing state to a room
        sendTypingState: function(status, room) {
            room = room || this.getCurrentRoom();
            var state = this.getRoomState(room),
                main = room.isMain();
            if (
                !state ||
                (state.typing.indexOf(wgUserName) == -1 && status === false) ||
                (main  && this.mainRoomDisabled) ||
                (!main && this.privateRoomDisabled)
            ) return;

            state.last = status ? Date.now() : 0;
            room.socket.send(new models.SetStatusCommand({
                statusMessage: 'typingState',
                statusState: status
            }).xport());
        },
        // Adds someone to the typing list of a room
        startTyping: function(name, state, room) {
            if (state.typing.indexOf(name) == -1) {
                state.typing.push(name);
            }

            if (state.timeouts[name]) {
                clearTimeout(state.timeouts[name]);
            }

            state.timeouts[name] = setTimeout(this.stopTyping.bind(this, name, state, room), this.statusTTL);
        },
        // Removes someone from the typing list of a room
        stopTyping: function(name, state, room) {
            var index = state.typing.indexOf(name);

            if (index != -1) {
                state.typing.splice(index, 1);
            }

            if (state.timeouts[name]) {
                clearTimeout(state.timeouts[name]);
                delete state.timeouts[name];
            }

            if (this.getCurrentRoom() == room) {
                this.updateTypingIndicator(this.filterNames(state.typing));
            }
        },
        // Filters self and ignored users before passing into updateTypingIndicator
        filterNames: function(names) {
            return names.filter(function(name) {
                return (name != wgUserName || !this.filterSelf) && this.ignore.indexOf(name) == -1;
            }.bind(this)); // FIXME: ugly
        },
        // Updates the state of a room from a socket event and the indicator if it's currently active
        updateTyping: function(room, name, status) {
            var state = this.getRoomState(room);

            if (status) {
                this.startTyping(name, state, room);
            } else {
                this.stopTyping(name, state);
            }

            if (this.getCurrentRoom() == room) {
                if (
                    (room.isMain()  && this.mainRoomDisabled) ||
                    (!room.isMain() && this.privateRoomDisabled)
                ) {
                    this.updateTypingIndicator([]);
                } else {
                    this.updateTypingIndicator(this.filterNames(state.typing));
                }
            }
        },
        // Sets the text of the indicator element and does other DOM stuff, might have been able to split this one up some more
        updateTypingIndicator: function(names) {
            names = names || this.filterNames(this.getRoomState(this.getCurrentRoom()).typing);
            var $body = $(document.body),
                div = this.doScroll
                    ? this.getCurrentRoom().viewDiscussion.chatDiv.get(0)
                    : null,
                hc = $body.hasClass('is-typing');

            if (!names.length) {
                $body.removeClass('is-typing');
                IsTyping.$indicator.html('');
                if (
                    this.doScroll &&
                    hc &&
                    div.scrollTop + div.clientHeight != div.scrollHeight
                ) {
                    div.scrollHeight; /* trigger reflow */
                    div.scrollTop -= this.scrollBy;
                }
                return;
            }

            var tags = names.map(function(name) {
                    // .parse() does the escaping
                    return '<span class="username">' + name + '</span>';
                }),
                message = names.length > 3
                    ? 'typing-more'
                    : 'typing-' + names.length,
                args = [message].concat(tags);

            $body.addClass('is-typing');
            this.$indicator.html(this.i18n.msg.apply(window, args).parse());
            if (this.doScroll && !hc) {
                div.scrollHeight; /* trigger reflow */
                div.scrollTop += this.scrollBy;
            }
        },
        // Called on socket updateUser messages, bound to a specific room
        socketHandler: function(room, message) {
            var data = JSON.parse(message.data).attrs,
                status = data.statusState,
                name = data.name;

            if (data.statusMessage == 'typingState') {
                this.updateTyping(room, name, status);
            }
        },
        // Called for each new chat the user joins, including main on startup
        initChat: function(room) {
            this.data[room.roomId] = {
                timeouts: {}, // Object mapped by username of timeout IDs
                typing: [],  // Usernames of the people typing, including main user
                last: 0     // Last time when a typing status was sent
            };
            room.socket.on('updateUser', this.socketHandler.bind(this, room));
            room.model.room.bind('change', this.onRoomChange.bind(this, room));
        },
        // Called when a new private room is opened, the roomId will always be accurate even with group PMs
        onPrivateRoom: function(user) {
            var roomId = user.attributes.roomId,
                room = mainRoom.chats.privates[roomId];
            this.initChat(room);
        },
        // Bound to each keydown event on the message textarea
        // It's a keydown event so it can detect backspace events and compare previous and next values with an immediate timeout
        onKeyDown: function(e) {
            var textarea = e.target,
                value = textarea.value,
                state = this.getRoomState(this.getCurrentRoom());

            this.setImmediate(function() {
                if (value == textarea.value) return;
                if (!textarea.value) {
                    this.sendTypingState(false);
                } else if (Date.now() - state.last > this.ownStatusThrottle) {
                    this.sendTypingState(true);
                }
            });
        },
        // Called when the message textarea loses focus
        onBlur: function() {
            this.sendTypingState(false);
        },
        // Called when a private message on the userlist is clicked before rooms are switched
        onPrivateClick: function() {
            if (mainRoom.activeRoom == 'main' || !mainRoom.activeRoom) {
                this.sendTypingState(false, mainRoom);
            }
        },
        // Called when you change in our out of a room, and since it's bound to each NodeRoomController, it calls twice per room change
        // Yep, I managed to find a fancy mainRoom event for it
        onRoomChange: function(room) {
            var roomId = room.isMain() ? 'main' : room.roomId;
            if (mainRoom.activeRoom == roomId) {
                this.updateTypingIndicator();
            } else {
                this.sendTypingState(false, room);
            }
        },
        // Called after each lib is loaded
        preload: function() {
            if (++this._preload == 2) {
                dev.i18n.loadMessages('IsTyping').then(this.init.bind(this));
            }
        },
        // Initialization and double run check property, so don't try to override this one
        init: function(i18n) {
            i18n.useUserLang();
            this.i18n = i18n;
            this.$indicator = this.$indicator || $('<div>', {
                class: 'typing-indicator'
            }).appendTo('body');
            this.initChat(mainRoom);

            mainRoom.model.privateUsers.bind('add', this.onPrivateRoom.bind(this));
            mainRoom.viewDiscussion.getTextInput()
                .on('keydown', this.onKeyDown.bind(this))
                .on('blur', this.onBlur.bind(this));

            if (this.old) {
                this.setupOldConfiguration();
            }
        },
        // For people who like to have their chat jiggle around
        setupOldConfiguration: function() {
            this.$indicator.remove();
            this.$indicator = $('<div>', {
                class: 'typing-indicator'
            }).prependTo('#Write');
            this.doScroll = true;
        }
    }, window.IsTyping);

    mw.hook('dev.i18n').add(IsTyping.preload.bind(IsTyping));
    mw.hook('dev.chat.render').add(IsTyping.preload.bind(IsTyping));

    if (IsTyping.old) {
        // Legacy styles
        // FIME: Move to setupOldConfiguration?
        importArticle({
            type: 'style',
            article: 'u:dev:MediaWiki:IsTyping/code.css'
        });
    } else {
        // some dynamic css for good measure
        mw.util.addCSS('.typing-indicator {\
            color: ' + getComputedStyle(document.getElementById('Write')).color + '\
        }');
        importArticle({
            type: 'style',
            article: 'u:dev:MediaWiki:IsTyping.css'
        });
    }

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Chat-js.js'
        ]
    });
})();

/* End of the IsTyping Script */


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
 * TODO: Improve user interface
 *
 * @version 1.3.1
 * @author Callofduty4
 * @author Madnessfan34537
 * @author Sactage <sactage@gmail.com>
 */

// Used files: [[File:ChatOptionsIcon.png]]

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
		x = x.trim();
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
		modalIcon: "https://images.wikia.nocookie.net/dev/images/c/c0/ChatOptionsIcon.png"
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
};

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
	var $optionsWindowHTML = $.showCustomModal( "Options", '<form method="" name="" class="WikiaForm "><fieldset><p style="font-size:120%; font-weight:bold; font-style:italic;">Colour changes</p><p style="font-size:80%;">Enter a <a href="https://www.w3schools.com/colors/colors_names.asp" target="_blank">colour name</a> or <a href="https://html-color-codes.info/" target="_blank">colour hex</a><p>Chat background&nbsp;<input type="text" name="backgroundColourinput" id="backgroundColourinput" value="' + chatOptions.look.backgroundColor + '"/></p><br/><p>Self-post background&nbsp;<input type="text" name="selfPostColourinput" id="selfPostColourinput" value="' + chatOptions.look.selfPostColor + '"/></p><br/><p>Surround&nbsp;<input type="text" name="surroundColourinput" id="surroundColourinput" value="' + chatOptions.look.surroundColor + '"/></p><br/><p>Font colour&nbsp;<input type="text" name="fontColourinput" id="fontColourinput" value="' + chatOptions.look.fontColor + '"/></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Font</p><p>Font family <select id="fontList"><option value="arial" style="font-family:arial;">Arial</option><option value="courier new" style="font-family:courier new;">Courier new</option><option value="georgia" style="font-family:georgia;">Georgia</option><option value="palatino linotype" style="font-family:palatino linotype;">Palatino linotype</option><option value="Comic Sans MS" style="font-family:Comic Sans MS;">Comic sans</option><option value="tahoma" style="font-family:tahoma;">Tahoma</option><option value="Trebuchet MS" style="font-family:Trebuchet MS;">Trebuchet MS</option><option value="Verdana" style="font-family:Verdana;">Verdana</option><option value="Lucida Console" style="font-family:Lucida Console;">Lucida Console</option></select></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Added functionality</p><input type="checkbox" name="chatHacks" value="chatHacks" id="chatHacks"/> Enable <a href="//dev.wikia.com/wiki/MediaWiki:ChatHacks.js" target="_blank">chathacks</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="multiPM" value="multiPM" id="multiPM"/> Enable <a href="//dev.wikia.com/wiki/MediaWiki:Multipms.js" target="_blank">multi PM</a><br/><input type="checkbox" name="tabComplete" value="tabComplete" id="tabComplete"/>Enable <a href="//dev.wikia.com/wiki/MediaWiki:Tabinsert.js" target="_blank">tab complete</a>&nbsp;&nbsp;&nbsp;<input type="checkbox" name="searchBar" value="searchBar" id="searchBar"/>Enable <a href="//dev.wikia.com/wiki/MediaWiki:ChatSearchbar/code.js" target="_blank">search bar</a><br/><input type="checkbox" name="multiKick" value="multiKick" id="multiKick" />Enable <a href="//dev.wikia.com/wiki/MediaWiki:Multikick.js" target="_blank">multi kick</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="ignoreURL" value="ignoreURL" id="ignoreURL"/>Ignore URL in main chat<br /><input type="checkbox" name="stopSideScroll" value="stopSideScroll" id="stopSideScroll"/>Stop the sidescroll bar to appear after someone spams</fieldset></form>', {
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
	if (wgCityId !== "3125") // callofduty.wikia.com
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
	setCookie("customisation", chatOptions.look.backgroundColor + ", " + chatOptions.look.fontColor + ", " + chatOptions.modules.chatHacks.enabled + ", " + chatOptions.look.fontFamily + ", " + chatOptions.modules.tabComplete.enabled + ", " + chatOptions.modules.multiKick.enabled + ", " + chatOptions.modules.multiPM.enabled + ", " + chatOptions.modules.searchBar.enabled + ", " + chatOptions.modules.ignoreURL.enabled + ", " + chatOptions.modules.stopSideScroll.enabled + ", " + chatOptions.look.surroundColor + ", " + chatOptions.look.selfPostColor);
	updateChatSkin();
	cancelChanges();
}


// Add Options button
if (!$("#chatOptionsButton").length) {
	$('.Rail').prepend('<div id="chatOptionsButton" onclick="openOptions();" style="margin:auto; cursor: pointer; font-size:150%; bottom:4px; padding-bottom:2px; border-bottom: 1px solid #CCCCCC; width:90%;" align="center"><img src="' + chatOptions.look.modalIcon + '" width="18px"/>&nbsp;Options</div>'); // Prevent multiple buttons from being appended
}

window.onload = updateChatSkin();

/* End of the ChatOptions Script */