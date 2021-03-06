/* Note to Reviewer

The scripts here are taken from the following sources and modified to not require usage of
the Jacob's Ladder Suite dependency which is awful. 

w:c:d97:
MediaWiki:TitleNotifications.js
MediaWiki:Cg.js (ChatGame)
MediaWiki:StyleSwitcher3.js
MediaWiki:ClientsideCensor.js
MediaWiki:ChatTopic2.js
MediaWiki:D97encryption.js
MediaWiki:TextEmotes.js
MediaWiki:SidebarConsole.js

w:c:shiningarmor:
MediaWiki:ChatTags/code.js

w:c:dev:
MediaWiki:IsTyping/code.js

Sorry this is so long. I've tried to comment it to make it a bit clearer and easier to
review. If you need clarification please message me at animalcrossing.wikia.com :)
*/

/* SETTINGS ZONE
- For admins: define your default settings here. Users can change some of these in chat. */

// Chat welcome message
// welcomeDefault is the message we're gonna display if we can't pull MediaWiki:ChatWelcomeMessage
// preHTML is the html displayed before the CWM
// postHTML is the html displayed after the CWM
// It's displayed in the form preHTML+<welcome message>+postHTML
// Don't use this to load any scripts because it won't pass review if you do.
welcomeDefault = "Welcome to the Animal Crossing Wiki chat!";
preHTML = '<table class="ChatWelcomeTable" style="border: 1px solid #7b3b0a; border-left-width:3px !important; border-right-width:3px !important; border-radius:64px; padding:8px; padding-left:32px; padding-right:32px; margin-left: auto; margin-right: auto; background-color: #fff8e3; font-size: 13px;"><tr><td><big>';
postHTML = '</big><br />Before chatting, don\'t forget to read the rules <u><a href="https://animalcrossing.wikia.com/wiki/Animal Crossing Wiki:Chat Rules">here</a></u>.<br />Reminder: As per <u><a href="https://www.coppa.org">COPPA</a></u>, we reserve the right to permanently ban any user under the age of 13.</td></tr></table>';

// This ugly block will set the default skin to the current season for new users joining the chat
var cM = new Date().getMonth() + 1;
var cD = new Date().getDate();
if (typeof southernHemisphere === "undefined" || southernHemisphere === false) {
    // NORTHERN HEMISPHERE
    if (cM == 1 || cM == 2 || cM == 12) defaultSkin = "3"; // winter
    if (cM == 3 || cM == 4 || cM == 5) defaultSkin = "0"; // spring
    if (cM == 6 || cM == 7 || cM == 8) defaultSkin = "1"; // summer
    if (cM == 9 || cM == 10 || cM == 11) defaultSkin = "2"; // autumn
} else {
    // SOUTHERN HEMISPHERE
    if (cM == 1 || cM == 2 || cM == 12) defaultSkin = "1"; // summer
    if (cM == 3 || cM == 4 || cM == 5) defaultSkin = "2"; // autumn
    if (cM == 6 || cM == 7 || cM == 8) defaultSkin = "3"; // winter
    if (cM == 9 || cM == 10 || cM == 11) defaultSkin = "0"; // spring
}

var pingsList;
var pingsMessageAudio = new Audio('https://vignette.wikia.nocookie.net/d97/images/6/66/Beep.ogg/revision/latest?cb=20170320195135'); // Audio to play when a new message is received in chat.
var pingsUserAudio = new Audio('https://images.wikia.nocookie.net/gamedezyner/images/7/7e/PingSound.ogg'); // Audio to play when a message containing your ping phrases is posted
var pingsPMAudio = new Audio('https://vignette.wikia.nocookie.net/d97/images/6/66/PmPing.ogg/revision/latest?cb=20170502114740');
var pingsIgnored = [];

// Chat Topic items
// TODO: Move to another MediaWiki page to bypass review when items need to be changed
var chatTopicArray = [{
        url: wgServer + "/wiki/Animal_Crossing_Wiki:Chat_Rules",
        text: "rules",
        imgUrl: "https://images.wikia.nocookie.net/__cb20140914153818/d97/images/9/91/Icon_rules.png"
    },
    {
        url: wgServer + "/wiki/Special:RecentChanges",
        text: "recent changes",
        imgUrl: "https://images.wikia.nocookie.net/__cb20140914153816/d97/images/7/7c/Icon_recent_changes.png"
    },
    {
        url: wgServer + "/wiki/MediaWiki:Emoticons",
        text: "emotes",
        imgUrl: "https://images.wikia.nocookie.net/__cb20140914153814/d97/images/6/6c/Icon_emoticons.png"
    },
    {
        url: wgServer + "/wiki/Help:Chat_extensions",
        text: "help",
        imgUrl: "https://images.wikia.nocookie.net/__cb20140914153812/d97/images/3/3a/Icon_chattags.png"
    },
    {
        url: wgServer + "/wiki/Special:MyPage",
        text: "profile",
        imgUrl: "https://images.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg"
    },
    {
        url: wgServer + "/wiki/Special:Chat?action=purge",
        text: "purge",
        imgUrl: "https://images.wikia.nocookie.net/__cb20140914153817/d97/images/8/89/Icon_refresh.png"
    }
];

// Stylesheets
// TODO: Move to another MediaWiki page to bypass review when adding new styles
var stylesheetsArray = [{
        name: "Spring",
        url: "https://d97.wikia.com/index.php?title=MediaWiki:Spring.css&action=raw&ctype=text/css",
        logo: "https://images.wikia.nocookie.net/animalcrossing/images/f/fc/SpringSummerLogo.png/revision/latest?cb=20150901024342.jpg"
    },
    {
        name: "Summer",
        url: "https://d97.wikia.com/index.php?title=MediaWiki:Summer.css&action=raw&ctype=text/css",
        logo: "https://images.wikia.nocookie.net/animalcrossing/images/f/fc/SpringSummerLogo.png/revision/latest?cb=20150901024342.jpg"
    },
    {
        name: "Fall",
        url: "https://d97.wikia.com/index.php?title=MediaWiki:Autumn.css&action=raw&ctype=text/css",
        logo: "https://images.wikia.nocookie.net/animalcrossing/images/4/4c/FallLogo.png/revision/latest?cb=20150901022847.jpg"
    },
    {
        name: "Winter",
        url: "https://d97.wikia.com/index.php?title=MediaWiki:Winter.css&action=raw&ctype=text/css",
        logo: "https://images.wikia.nocookie.net/animalcrossing/images/e/ed/WinterLogo.png/revision/latest?cb=20151125230615.jpg"
    },
    {
        name: "Night",
        url: "https://d97.wikia.com/index.php?title=MediaWiki:Night.css&action=raw&ctype=text/css",
        logo: "https://images.wikia.nocookie.net/__cb20140730190803/animalcrossing/images/9/98/Wiki_wordmark_night.png"
    },
    {
        name: "Twitch",
        url: "https://d97.wikia.com/index.php?title=MediaWiki:Twitch.css&action=raw&ctype=text/css",
        logo: "https://images.wikia.nocookie.net/__cb20141121230158/d97/images/b/b0/Wordmark_twitch_2.png"
    },
    {
        name: "Aurora",
        url: "https://d97.wikia.com/index.php?title=MediaWiki:SpaceAurora.css&action=raw&ctype=text/css",
        logo: "https://images.wikia.nocookie.net/__cb20140730190803/animalcrossing/images/9/98/Wiki_wordmark_night.png",
        clear: true
    },
    {
        name: "DANK.CSS",
        url: "https://d97.wikia.com/index.php?title=MediaWiki:Dank.css&action=raw&ctype=text/css",
        logo: "https://images.wikia.nocookie.net/animalcrossing/images/f/fc/SpringSummerLogo.png/revision/latest?cb=20150901024342.jpg",
        clear: true
    },
    {
        name: "Nebula",
        url: "https://d97.wikia.com/index.php?title=MediaWiki:Nebula.css&action=raw&ctype=text/css",
        logo: "https://i.imgur.com/peuhUqE.png",
        clear: true
    }
];

// Words to censor out
// TODO: Move to another MediaWiki page to prevent needing to wait for review to update censor
var censoredWords = ["fajit", "fegit", "faggot", "fagot", "phaggot", "phag", "fag", "nigger", "nigga", "tranny", "shemale", "she male", "dyke", "kike", "niglet", "nignog", "fgt", "nig-nog", "retard", "retarded", "newfag", "oldfag", "furfag", "gook", "agor.io", "encyclopediadramatica.es/offended", "anne.jpg", "cummy", "cummies", "cuck", "cuckold"];


/* =======================================

Random Functions
@random
Credits to Dragonfree97

======================================  */

// Creates a variable chatroomID to use to load new messages more easily
var chatroomID;
loadChatroomID = function() {
    return "Chat_".concat(mainRoom.roomId);
};

// Shorthand for inline alerts
createInlineAlert = function(msg) {
    mainRoom.model.chats.add(new models.InlineAlert({
        text: msg
        // This does NOT need to be escaped because it is never transmitted to other users
        // Escaping it does nothing apart from break ChatGame
    }));
};

// Tells the browser to open a new page. This is used for the search functions in SidebarConsole
openPage = function(url, text) {
    var win = window.open(url, '_blank');
    if (win) {
        //Browser has allowed it to be opened, we want to look at it
        win.focus();
    } else {
        createInlineAlert("Unable to open page - try modifying your browser settings.");
    }
};

// Creates a modal with no ChatOptions.opt.other than to close. This is for SidebarConsole
buttonlessModal = function(header, text) {
    $.showCustomModal(header, text, {
        id: 'information-modal',
        width: 400,
        buttons: [{
            message: 'Close',
            defaultButton: true,
            handler: function() {
                $('#information-modal').closeModal();
            }
        }]
    });
};

// Creates an array of all users. Used in ChatGame
listAllUsers = function() {
    arr = [];
    for (i = 0; i < mainRoom.model.users.length; i++) {
        arr.push(mainRoom.model.users.toJSON()[i].name);
    }
    return arr;
};

// Check if someone is a chat moderator
isChatModerator = function() {
    if (wgUserGroups.indexOf("chatmoderator") != -1 || wgUserGroups.indexOf("sysop") != -1) {
        return true;
    } else {
        return false;
    }
};

// Manually removes modals fom the screen in case of emergency
forceCloseModals = function() {
    $('.blackout').remove();
    $('.modalWrapper').remove();
};

// Used for the Japanese and Korean input methods in SidebarConsole
messageAppendText = function(text, jumpto) {
    // jumpto is if we want to focus on the message box afterwards
    $("[name='message']").val($("[name='message']").val().concat(text));
    if (jumpto === true) $("#Write > div.message > textarea").focus();
};

// Lets you search an object for a specific value. Use for compatibility with Nicknames
// Thanks StackExchange
searchObj = function(obj, query) {
    for (var key in obj) {
        var value = obj[key];
        if (value === query) {
            return key;
        }
    }
	return false;
};

isModerator = function (username) {
	return mainRoom.model.users.findByName(username).attributes.isModerator;
};

isAdmin = function (username) {
    return (mainRoom.model.users.findByName(username).attributes.groups.indexOf("sysop") != -1);
};
		
kickUser = function (username) {
	if(!isModerator(username)) {
		mainRoom.kick({
			name: username
		});
	} else {
		createInlineAlert ("You can't kick moderators.");
	}
};
		
blockUserIndefinite = function (username, blockReason) {
	if(!isModerator(username)) {
		var blockObj = {
			action: 'block',
			user: username,
			expiry: '4 years',
			reason: blockReason,
			nocreate: '',
			allowusertalk: '',
			autoblock: 0,
			format: 'json',
			token: mw.user.tokens.values.editToken
		};
		
		$.ajax({
			url: mw.util.wikiScript('api'),
			type: "POST",
			dataType: "JSON",
			data: blockObj,
			success: function(d) {
				createInlineAlert(username+" was blocked for reason: "+blockReason);
				kickUser(username);
			},
			error: function() {
				createInlineAlert("There was an error");
			}
		});
	} else {
		createInlineAlert("You can't block moderators.");
	}
};

// Functions to save and load cookies
cookiefunctions = {
    save: function(name, value, days) {
        var expires = "";
        var date = new Date();
        if (days && typeof days !== "undefined") {
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        } else {
            date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    load: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    clear: function(name) {
        cookiefunctions.save(name, "", -1);
    }
};

/* =======================================

Pings and Title Notifications
@pings
Credits to Rose (Incongruence) & Ozu
Hooks into ChatOptions.opt.and won't work without it lol

======================================  */

var old = document.title; // So we can modify the title message properly
var unread = 0; // A counter for how many messages we haven't looked at yet
$("head").append('<style>.pinged {color: red;}</style>');

// The main function. This will add +1 to unread messages in the title bar (like when you have a
// notification on Facebook), and it will ping the user if they have the setting enabled.
pingUser = function(e) {
    var message = e.attributes.text.toString();
    if (!document.hasFocus() && message.indexOf("!ChatGame") == -1 && e.attributes.name.toString() != wgUserName.toString()) {
        unread++;
        document.title = "(" + unread + ") " + old;
        
        if (ChatOptions.savable.pingsButtonName === true && typeof e.attributes.isInlineAlert === "undefined" && !!(message.match(pingsRegexp))) {
            pingsUserAudio.play();
            $("#entry-" + e.cid).addClass("pinged");
        } else if (ChatOptions.savable.pingsButtonChat === true) {
            pingsMessageAudio.play();
        }
    }
};

pmPingUser = function(e) {
    if (!document.hasFocus() && ChatOptions.savable.pingsButtonPM === true && e.attributes.name.toString() != wgUserName.toString()) {
        pingsPMAudio.play();
    }
};

// This just lets us return the page title to normal once we click on the page
window.onfocus = function() {
    document.title = old;
    unread = 0;
};

/* =======================================

ChatTopic
@chattopic
Credits to me lol

======================================  */

// This adds links in the header for recent changes, your userpage etc. Configurable
chatTopic = function() {
    // Fixes the logo
    $('#ChatHeader > h1.public.wordmark').css('position', 'absolute');
    $('#ChatHeader > h1.public.wordmark').css('top', '0px');

    // Assuming chat topic isn't already loaded
    if (!$('.chattopic').length) {
        // Adds the container for the chat topic
        $('#ChatHeader').prepend('<div class="chattopic" style="margin-top: 10px; vertical-align: middle; text-align: center; z-index: 0; font-size: 13px; line-height: 145%;"></div>');
        // Adds the topic items
        for (i = 0; i < chatTopicArray.length; i++) {
            if (i < chatTopicArray.length - 1) {
                $("div.chattopic").append('<a class="topiclink topiclink' + String(i) + '" href=' + chatTopicArray[i].url + ' target="_blank"><img src=' + chatTopicArray[i].imgUrl + ' height="12px" class="chattopic-icon" /> ' + chatTopicArray[i].text + '</a> • ');
                if (chatTopicArray[i].url.indexOf(wgServer + "/wiki/Special:Chat") != -1) {
                    $("a.topiclink" + String(i)).attr("target", "");
                }
            } else {
                $("div.chattopic").append('<a class="topiclink topiclink' + String(i) + '" href=' + chatTopicArray[i].url + ' target="_blank"><img src=' + chatTopicArray[i].imgUrl + ' height="12px" class="chattopic-icon" /> ' + chatTopicArray[i].text + '</a>');
                if (chatTopicArray[i].url.indexOf(wgServer + "/wiki/Special:Chat") != -1) {
                    $("a.topiclink" + String(i)).attr("target", "");
                }
            }
        }
    }
    $("#ChatHeader > h1.private").remove(); // Stops the private chat header from causing problems
};

/* =======================================

StyleSwitcher
@styleswitcher
Credits to Roadhawk and myself

======================================  */

// Adds a container to add things to the sidebar
if (!$("#sidebar-top").length) {
    $("#Rail").prepend('<div id="sidebar-top" class="sidebar-top"></div>');
}

StyleSwitcher = {
    circleType: "square",
    alignType: "right",
    loaded: false,
    defaultLogoUrl: "",
    normal: "",
    skinType: 0,
	
	change: function () {
		theme = ChatOptions.savable.styleSwitcher;
		themeId = defaultSkin;
		// Gets the numerical ID of the skin. If there isn't one (theres a problem lol) defaults
		for (i=0; i<stylesheetsArray.length; i++) {
			if (stylesheetsArray[i].name == theme) {
				themeId = i;
			}
		}
		StyleSwitcher.report(themeId);
	},
	
    report: function(styleIDtext) {
        if (styleIDtext != "default") {
            styleID = parseInt(styleIDtext, 10); //Gets the ID of the selected style
            $('#skinBackground').remove(); //Removes old style
            $('#ChatSkins').remove(); //Removes old style
            $('#ChatSkinsAdditional').remove(); //Removes old style
            $('#ChatSkinsTransparent').remove(); //Removes old style
            $('#HeaderLogo').remove(); //Removes old style
            StyleSwitcher.skinType = stylesheetsArray[styleID].name; //Sets page variable StyleSwitcher.skinType to the new skin
            /*$.cookie('StyleSwitcher.skinType', styleID, {
                expires: 5
            });*/ //Sets cookie StyleSwitcher.skinType to the new skin ID

            if (stylesheetsArray[styleID].clear === true) {
                $('head').append('<link href="https://d97.wikia.com/index.php?title=MediaWiki:ClearBase.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsTransparent"/>'); //Adds the clearBase CSS if required (for image-background skins)
            }

            $('head').append('<link href="' + stylesheetsArray[styleID].url + '" rel="stylesheet" type="text/css" id="ChatSkins"/>'); //Adds the new skin CSS
            if (stylesheetsArray[styleID].logo !== null) {
                $('#ChatHeader').append('<a href="' + wgServer + '" style="position:initial;color:#337800;" id="HeaderLogo"><img width="115" height="30" src="' + stylesheetsArray[styleID].logo + '" id="HeaderLogoImg" style="position: absolute;top: 4px;left: 3px;" />'); //If a logo is defined in the stylesheetArray, add it to the header.
            } else {
                $('#ChatHeader').append('<a href="' + wgServer + '" style="position:initial;color:#337800;" id="HeaderLogo"><img width="115" height="30" src="' + StyleSwitcher.normalLogoUrl + '" id="HeaderLogoImg" style="position: absolute;top: 4px;left: 3px;" />'); //If a logo is not defined in the stylesheetArray, use the default.
            }
        } else {
            styleID = parseInt(defaultSkin, 10); //Gets the ID of the default skin
            $('#skinBackground').remove(); //Removes old style
            $('#ChatSkins').remove(); //Removes old style
            $('#ChatSkinsAdditional').remove(); //Removes old style
            $('#ChatSkinsTransparent').remove(); //Removes old style
            $('#HeaderLogo').remove(); //Removes old style
            StyleSwitcher.skinType = stylesheetsArray[styleID].name; //Sets variable StyleSwitcher.skinType to the new skin
            /*$.cookie('StyleSwitcher.skinType', styleID, {
                expires: 5
            });*/ //Sets cookie StyleSwitcher.skinType to the new skin ID

            if (stylesheetsArray[styleID].clear === true) {
                $('head').append('<link href="https://d97.wikia.com/index.php?title=MediaWiki:ClearBase.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsTransparent"/>'); //Adds the clearBase CSS if required (for image-background skins)
            }

            $('head').append('<link href="' + stylesheetsArray[styleID].url + '" rel="stylesheet" type="text/css" id="ChatSkins"/>'); //Adds the new skin CSS
            if (stylesheetsArray[styleID].logo !== null) {
                $('#ChatHeader').append('<a href="' + wgServer + '" style="position:initial;color:#337800;" id="HeaderLogo"><img width="115" height="30" src="' + stylesheetsArray[styleID].logo + '" id="HeaderLogoImg" style="position: absolute;top: 4px;left: 3px;" />'); //If a logo is defined in the stylesheetArray, add it to the header.
            } else {
                $('#ChatHeader').append('<a href="' + wgServer + '" style="position:initial;color:#337800;" id="HeaderLogo"><img width="115" height="30" src="' + StyleSwitcher.normalLogoUrl + '" id="HeaderLogoImg" style="position: absolute;top: 4px;left: 3px;" />'); //If a logo is not defined in the stylesheetArray, use the default.
            }
        }
    },
	
	circle: function () {
		console.log("[SS] Changing circle mode");
		type = ChatOptions.savable.roundedElements;
		if (type == "Rounded (circle mode)") {
			$('head').append('<link href="https://d97.wikia.com/index.php?title=MediaWiki:Round.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsCircle"/>');
            $.cookie('StyleSwitcher.circleType', 'circle', {
                expires: 5
            });
            StyleSwitcher.circleType = "circle";
		} else {
			$('#ChatSkinsCircle').remove();
            $.cookie('StyleSwitcher.circleType', 'square', {
                expires: 5
            });
            StyleSwitcher.circleType = "square";
		}
	},
	
	align: function () {
		console.log("[SS] Changing align mode");
		type = ChatOptions.savable.rightHandChat;
		if (type == "Left-hand side") {
			$('head').append('<link href="https://d97.wikia.com/index.php?title=MediaWiki:LeftChat.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsLeft"/>');
            $.cookie('StyleSwitcher.alignType', 'left', {
                expires: 5
            });
            StyleSwitcher.alignType = "left";
		} else {
			$('#ChatSkinsLeft').remove();
            $.cookie('StyleSwitcher.alignType', 'right', {
                expires: 5
            });
            StyleSwitcher.alignType = "right";
		}
	},

    loadApp: function() {
        $('.ChatWindow').attr('id', 'ChatWindow');
        StyleSwitcher.normalLogoUrl = $("#ChatHeader > h1.public.wordmark > a > img").attr("src");

        if (typeof stylesheetsArray === 'undefined') {
            console.log("[STYLE] ERROR: No styles defined!");
        }

        if (typeof defaultSkin === 'undefined') {
            console.log("[STYLE] ERROR: No default skin defined! Setting to 0");
            var defaultSkin = 0;
        }

        if ($.cookie("StyleSwitcher.skinType") === null) {
            if (typeof defaultSkin != "undefined") {
                StyleSwitcher.skinType = defaultSkin;
            } else {
                console.log("[STYLE] ERROR: No default skin defined. Setting skin to 0");
                StyleSwitcher.skinType = "0";
                StyleSwitcher.normal = "0";
            }
        } else {
            StyleSwitcher.skinType = $.cookie("StyleSwitcher.skinType");
        }

        $('#ChatHeader > h1.public.wordmark > a').remove(); // Removes the default logo

        if (StyleSwitcher.loaded === false) {
            for (i = 0; i < stylesheetsArray.length; i++) {
                $(".stylechanger").append("<option value='" + String(i) + "'>" + stylesheetsArray[i].name + "</option>");
            }
            StyleSwitcher.loaded = true;
        }

        StyleSwitcher.report(StyleSwitcher.skinType);
		StyleSwitcher.circle();
		StyleSwitcher.align();
    }
};

/* =======================================

ClientsideCensor
@censor
Credits to me lol

======================================  */

// Parse our censor list into a regex
if (typeof censoredWords !== "undefined" && censoredWords.length > 0) {
    censoredRegex = "";
    for (i = 0; i < censoredWords.length; i++) {
        censoredRegex = censoredRegex.concat("\\b(" + censoredWords[i].replace("/\//g", "\\/") + "|" + censoredWords[i].replace("/\//g", "\\/") + "s)\\b");
        if (i != censoredWords.length - 1) {
            censoredRegex = censoredRegex.concat("|");
        }
    }
    censoredFilter = new RegExp(censoredRegex, "gi"); // create a new regex

} else {
    console.error("[ClientsideCensor] ERROR: No censored words have been defined! Unable to load.");
}

// This is the replace function
censor = function(e) {
    if (typeof censoredWords !== "undefined" && censoredWords.length > 0) {
        var string = $("#Chat_" + window.mainRoom.roomId + " .message:last").html();
        if (typeof string !== "undefined") {
            string = string.replace(censoredFilter, "***");
            $("#entry-" + e.cid + " > span.message").html(string);
        }
    }
};

/* =======================================

Custom Chat Welcome Message
@cwm
Credits to Dragonfree97

======================================  */

// The following block of code loads us our own Chat Welcome Message. 
// If it freaks out for whatever reason, it'll give us a default.
cWelMsg = "";
try {
    //We're gonna grab the Chat Welcome Message contents
    cWelMsg = $.ajax({
        url: wgServer.toString().slice(5) + '/api.php?action=query&prop=revisions&titles=MediaWiki%3AChat-welcome-message&rvlimit=1&rvprop=content&format=jsonfm',
        data: {
            format: 'json'
        },
        dataType: 'jsonp',
        async: false,
    }).responseText;
    cWelMsg = JSON.parse(cWelMsg.slice(cWelMsg.indexOf("query") - 2, -1)).query.pages[Object.keys(JSON.parse(cWelMsg.slice(cWelMsg.indexOf("query") - 2, -1)).query.pages)[0]].revisions[0]["*"];
} catch (err) {
    console.error("Unable to load the CWM. Using default.");
    cWelMsg = welcomeDefault;
}

/* =======================================

Seconds timestamp
@seconds
Credits to Dragonfree97

======================================  */

// thx to some guy on stackexchange for this one
function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

// Replaces the timestamp on the end of messages with one which has a seconds counter.
function timestamp(e) {
    timeStampMessage = "#entry-" + e.cid;
    if ($(timeStampMessage).hasClass('inline-alert')) {
        timer = new Date();
        hours = timer.getHours();
        minutes = padDigits(timer.getMinutes(), 2);
        seconds = padDigits(timer.getSeconds(), 2);
        formatTime = hours.toString() + ":" + minutes.toString() + ":" + seconds.toString();
        $(timeStampMessage).append("<span class='time' style='font-weight: initial;'>" + formatTime + "</span>");
    } else {
        timeStampTime = new Date(e.attributes.timeStamp);
        formatTime = timeStampTime.getHours().toString() + ":" + padDigits(timeStampTime.getMinutes(), 2).toString() + ":" + padDigits(timeStampTime.getSeconds(), 2).toString();
        $(timeStampMessage + " > span.time").html(formatTime);
    }
}


/* =======================================

Sidebar Console
@sidebarconsole @magicbox
Credits to Dragonfree97

======================================  */

// Imports
importScriptPage("User:Dragonfree97/Japanese.js", "d97");
importScriptPage("User:Dragonfree97/Korean.js", "d97");
importScriptPage("MediaWiki:TabCompleter.js", "d97");

/* This adds the chat console box to the sidebar. */

sidebarConsoleShow = function() {
    
	if (!$("#sidebar-console-wrapper").length) { // prevents doubling
		$("#sidebar-top").append("<div id='sidebar-console-wrapper' style='width: 92%; margin-left: auto; margin-right: auto; padding-top: 5px;'></div>");
	}
	
	if (!$("#sidebar-console-div").length) { // prevents doubling
		$("#sidebar-console-wrapper").append('<div id="sidebar-console-div"><div id="console-label" style="width:92%; color: white;font-size: 8.5pt;padding-left: 6px;padding-right: 6px; padding-top: 1px; border-top-left-radius: 10px; border-top-right-radius: 10px;margin-left: auto;margin-right: auto;text-align: center;">Magic Box</div><input id="sidebar-console" type="text" placeholder="Search &quot;help&quot; for more" name="chatconsole" style="height: initial !important;width: 98%;"></div>');
		
		$('[name="chatconsole"]').keypress(function(e) {
            if (e.which == 13) { // when enter is pressed
                chatCommandBase = this.value;
                var i = chatCommandBase.indexOf(' ');
                this.value = "";
                if (i != -1) {
                    chatCommandNew = chatCommandBase.slice(0, i);
                } else {
                    chatCommandNew = chatCommandBase;
                }
        
                // The following section parses the command for aliases etc
        
                if (typeof eval("chatCommands.".concat(chatCommandNew)) === "undefined") {
                    if (typeof eval("commandAliases.".concat(chatCommandNew)) === "undefined") {
                        chatCommandHead = "error"; // Error if unknown command
                    } else {
                        chatCommandHead = eval("commandAliases.".concat(chatCommandNew));
                    }
                } else {
                    chatCommandHead = chatCommandNew;
                }
        
                // Here we deal with commands with parameters
                if (i != -1) {
        
                    var chatCommandParams = [];
                    evaluatedCommand = eval("chatCommands.".concat(chatCommandHead, ".params"));
                    // console.log("[SC] evaluatedCommand = "+evaluatedCommand);
                    paramAnalysis = chatCommandBase.slice(i + 1).trim();
                    for (j = 0; j < evaluatedCommand; j++) {
                        var i = paramAnalysis.indexOf(' ');
                        if (i == -1 || j == evaluatedCommand - 1) {
                            chatCommandParams.push(paramAnalysis.trim());
                        } else {
        
                            chatCommandParams.push(paramAnalysis.slice(0, i).trim());
                        }
                        paramAnalysis = paramAnalysis.slice(i + 1).trim();
                    }
                    switch (evaluatedCommand) {
                        case 1:
                            eval("var commandFunction = function(){ chatCommands.".concat(chatCommandHead, ".script('", chatCommandParams[0], "'); }"));
                            break;
                        case 2:
                            eval("var commandFunction = function(){ chatCommands.".concat(chatCommandHead, ".script('", chatCommandParams[0], "','", chatCommandParams[1], "'); }"));
                            break;
                        case 3:
                            eval("var commandFunction = function(){ chatCommands.".concat(chatCommandHead, ".script('", chatCommandParams[0], "','", chatCommandParams[1], "','", chatCommandParams[2], "'); }"));
                            break;
                        case 4:
                            eval("var commandFunction = function(){ chatCommands.".concat(chatCommandHead, ".script('", chatCommandParams[0], "','", chatCommandParams[1], "','", chatCommandParams[2], "','", chatCommandParams[3], "'); }"));
                            break;
                        case 5:
                            eval("var commandFunction = function(){ chatCommands.".concat(chatCommandHead, ".script('", chatCommandParams[0], "','", chatCommandParams[1], "','", chatCommandParams[2], "','", chatCommandParams[3], "','", chatCommandParams[4], "'); }"));
                            break;
                    }
                    commandFunction();
        
                } else {
        
                    eval("var commandFunction = function(){ chatCommands.".concat(chatCommandHead, ".script(); }"));
                    commandFunction();
                    // console.log("[SC] The head is '"+chatCommandHead+"'");
                }
        
            }
        });
		
	}
	
	//setting background color
	$("body").append('<a class="wikia-button" id="colorgrab-button">temp</a>'); // this ensures the correct background color
	$("#console-label").css("background-color", $("a.wikia-button").css("background-color"));
	$("#colorgrab-button").remove();
	
	if (ChatOptions.savable.magicBox) {
		$("#sidebar-console-wrapper").css('display','block');
	} else {
		$("#sidebar-console-wrapper").css('display','none');
	}
};

var commandAliases = {};

// Lets us have multiple commands which do the same function 'search', 's' etc are aliases
function newAlias(alias, command) {
    commandAliases[alias] = command;
    if (typeof chatCommands[command].aliases === "undefined") {
        chatCommands[command].aliases = alias;
    } else {
        chatCommands[command].aliases += (", " + alias);
    }
}

if (typeof chatCommands === "undefined") {
    chatCommands = {};
}

function newCommand(command, script, params, name, usage, info) {
    if (typeof chatCommands === "undefined") {
        chatCommands = {};
    }
    chatCommands[command] = {
        "script": script,
        "params": params,
        "name": name,
        "usage": usage,
        "info": info,
    };
}

commands = function() {
    newCommand("error", function() {
            createInlineAlert("Error: this is not a valid console command.");
        },
        0, "Error message", "error", "Displays an error message");

    newCommand("swiggle", function() {
            createInlineAlert("throw me a swiggle honey");
        },
        0, "Test command", "swiggle", "Displays a test message");

    newCommand("list", function() {
        keys = Object.keys(chatCommands);
        listCommands = "";
        for (i = 0; i < keys.length; i++) {
            listCommands = listCommands.concat(keys[i], " - ", eval("chatCommands.".concat(keys[i], ".name")), "<br>");
        }
        buttonlessModal("Command list",
            "<div style='height:200px; overflow-y: auto;'><b>Type <span style='color:red;'>info command</span> for more information on a specific command!</b><br />" + listCommands + "</div>");
    }, 0, "Command list", "list", "Shows a list of commands");

    newCommand("info", function(command) {
        if (typeof command === "undefined") {
            command = "info";
        }
        if (typeof eval("chatCommands.".concat(command)) === "undefined") {
            if (typeof eval("commandAliases.".concat(command)) === "undefined") {
                command = "info";
            } else {
                command = eval("commandAliases.".concat(command))
            }
        }
        if (typeof eval("chatCommands.".concat(command, ".aliases")) === "undefined") {
            aliases = "<i>None</i>";
        } else {
            aliases = eval("chatCommands.".concat(command, ".aliases"));
        }
        buttonlessModal(eval("chatCommands.".concat(command, ".name")),
            "<b>Usage: </b>" + eval("chatCommands.".concat(command, ".usage")) + "<br><b>Info: </b>" + eval("chatCommands.".concat(command, ".info")) + "<br><b>Aliases: </b>" + aliases);
    }, 1, "Command information", "info <span style='color:red;'>command</span>", "Displays information on <span style='color:red;'>command</span>");

    newCommand("about", function() {
        createInlineAlert("ChatConsole version " + ccVersionNumber + " by dragonfree97. This plugin is and will continue to be a work in progress.<br>Please report any and all bugs to Robyn (Dragonfree97).");
    }, 0, "About", "about", "Returns plugin information");

    newCommand("help", function() {
        buttonlessModal("SidebarConsole",
            "<div style='overflow-y:auto;height:200px;'><p>Welcome to the SidebarConsole! This is a plugin that allows you to execute commands in chat for faster navigation, displaying information, running JavaScript code, or even writing text in Japanese.</p><br /><p>A list of commands is available if you type in &quot;list&quot;, and you can get further information on each command by typing in &quot;info command&quot; where &quot;command&quot; is what you're trying to look up. Please note that some commands are for moderators only. All commands that deal with going to individual pages are case-sensitive.</p><br /><p>This script is maintained by HOAFanguying at the Animal Crossing Wiki and D97 Wiki. Thanks go to Dragonfree97 and Incongruence, for without them, this script would have never been created.</p></div>");
    }, 0, "Help window", "help", "Displays a help window.");

    newCommand("s", function(input) {
        if (typeof input === "undefined") {
            input = "Main Page";
        }
        openPage(wgServer + "/wiki/Special:Search?search=" + input + "&fulltext=Search", "Search results for" + input);
    }, 1, "Search local", "s <span style='color:red;'>query</span>", "Searches this wiki for <span style='color:red;'>query</span>");

    newCommand("kr", function(input) {
        messageAppendText(performKConversion(input), true);
    }, 1, "Korean text generator", "kr <span style='color:red;'>text</span>", "Converts <span style='color:red;'>text</span> in the Latin alphabet into Hangul. Credit to Mauvecloud at mauvecloud.net");

    newCommand("jh", function(input) {
        messageAppendText(performHiraConversion(input.replace(/ /g, '')), true);
    }, 1, "Japanese Hiragana text generator", "jh <span style='color:red;'>text</span>", "Converts <span style='color:red;'>text</span> in the Latin alphabet into Hiragana. Credit to Mauvecloud at mauvecloud.net");

    newCommand("jk", function(input) {
        messageAppendText(performKataConversion(input.replace(/ /g, '')), true);
    }, 1, "Japanese Katakana text generator", "jk <span style='color:red;'>text</span>", "Converts <span style='color:red;'>text</span> in the Latin alphabet into Katakana. Credit to Mauvecloud at mauvecloud.net");

    newCommand("chat", function(input) {
        if (typeof input === "undefined") {
            createInlineAlert("Error: invalid parameters. You need to specify a wiki name!");
        } else {
            openPage("https://" + input + ".wikia.com/wiki/Special:Chat", "Link to " + input + " chatroom");
        }
    }, 1, "Quick chat loader", "chat <span style='color:red;'>wiki</chat>", "Loads <span style='color:red;'>wiki</chat>'s chatroom.");

    newCommand("rc", function(input) {
        if (typeof input === "undefined") {
            input = siteUrl;
        }
        openPage("https://" + input + ".wikia.com/wiki/Special:Recentchanges", "Link to " + input + " recent changes");
    }, 1, "Quick recent changes loader", "rc <span style='color:red;'>wiki</span>", "Loads <span style='color:red;'>wiki</chat>'s recent changes. If none specified, loads this wiki's.");

    newCommand("main", function(input) {
        if (typeof input === "undefined") {
            input = siteUrl;
        }
        openPage("https://" + input + ".wikia.com/wiki/Main Page", "Link to " + input + " main page. If none specified, loads this wiki's.");
    }, 1, "Quick main page loader", "main <span style='color:red;'>wiki</span>", "Loads <span style='color:red;'>wiki</span>'s main page");

    newCommand("k", function(user) {
        if (typeof user === "undefined") {
            createInlineAlert("Error: invalid parameters. You need to specify a user to kick!");
        } else {
            kickUser(user);
        }
    }, 1, "Kick (mod only)", "k <span style='color:red;'>user</span>", "Kicks <span style='color:red;'>user</span>. Case-sensitive.");

    newCommand("u", function(input) {
        if (typeof input === "undefined") {
            input = wgUserName;
        }
        openPage(wgServer + "/wiki/User:" + input, "Link to " + input + "'s user page");
    }, 1, "User page loader", "u <span style='color:red;'>user</span>", "Loads <span style='color:red;'>user</span>'s user page. If none specified, loads your own.");

    newCommand("sf", function(wiki, query) {
        console.log("[SC] Attempting to search " + wiki + " wiki for " + query);
        openPage("https://" + wiki + ".wikia.com/wiki/Special:Search?search=" + query + "&fulltext=Search", "Search results on " + wiki + " wiki for " + query);
    }, 2, "Search other wikis", "sf <span style='color:red;'>wiki</span> <span style='color:blue;'>query</span>", "Searches <span style='color:red;'>wiki</span> for <span style='color:blue;'>query</span>");

    newCommand("b", function(time, user) {
        if(!isModerator(user)) {
            if (time > 0) {
                var a = new models.BanCommand({
                    userToBan: user,
                    time: time * 3600,
                    reason: "Misbehaving in chat"
                });
                mainRoom.socket.send(a.xport());
            } else {
                createInlineAlert("Error: Please specify a valid time.");
            }
        } else {
            createInlineAlert("Error: You can't ban other moderators.");
        }
    }, 2, "Banhammer (mod only)", "b <span style='color:red;'>time</span> <span style='color:blue;'>user</span>", "Bans <span style='color:blue;'>user</span> for <span style='color:red;'>time</span>. Case-sensitive.");

    newCommand("bu", function(user) {
        if(!isModerator(user)) {
            var a = new models.BanCommand({
                userToBan: user,
                time: 410313600,
                reason: "User under 13"
            });
            mainRoom.socket.send(a.xport());
        } else {
            createInlineAlert("Error: You can't ban other moderators.");
        }
    }, 1, "COPPA enforcer (mod only)", "bu <span style='color:red;'>user</span>", "Bans <span style='color:red;'>user</span> indefinitely with the reason 'User under 13'. Case-sensitive.");

    newCommand("ba", function(user) {
        if(!isModerator(user)) {
            var a = new models.BanCommand({
                userToBan: user,
                time: 410313600,
                reason: "Alt of a banned user"
            });
            mainRoom.socket.send(a.xport());
        } else {
            createInlineAlert("Error: You can't ban other moderators.");
        }
    }, 1, "Alt banner (mod only)", "ba <span style='color:red;'>user</span>", "Bans <span style='color:red;'>user</span> indefinitely with the reason 'Alt of a banned user'. Case-sensitive.");

    newCommand("id", function() {
        createInlineAlert("This room's ID is " + mainRoom.roomId);
    }, 0, "Room ID lookup", "id", "Returns this chatroom's internal ID number");

    newCommand("afk", function() {
        mainRoom.setAway();
    }, 0, "Go AFK", "afk", "Sets your status to 'away'.");

    newCommand("wall", function(user) {
        if (typeof user === "undefined") {
            user = wgUserName;
        }
        openPage(wgServer + "/wiki/Message_Wall:" + user, "Link to " + user + "'s message wall");
    }, 1, "Quick message wall", "wall <span style='color:red;'>user</span>", "Loads <span style='color:red;'>user</span>'s message wall. If none specified, loads your own.");

    newCommand("ijs", function(wiki, title) {
        $("head").append("<script>importScriptPage('" + title + "','" + wiki + "');</script>");
        createInlineAlert("Importing '" + title + "' from '" + wiki + "'");
    }, 2, "Script importer", "ijs <span style='color:red;'>wiki</span> <span style='color:blue;'>page name</span>", "Imports <span style='color:blue;'>page name</span> from <span style='color:red;'>wiki</span> as a piece of JavaScript code. Advanced users only - don't execute any code on your computer which you don't know what it does.");

    newCommand("icss", function(wiki, title) {
        $("head").append("<script>importStylesheetPage('" + title + "','" + wiki + "');</script>");
        createInlineAlert("Importing '" + title + "' from '" + wiki + "'");
    }, 2, "Stylesheet importer", "icss <span style='color:red;'>wiki</span> <span style='color:blue;'>page name</span>", "Imports <span style='color:blue;'>page name</span> from <span style='color:red;'>wiki</span> as a CSS stylesheet.");

    newCommand("ec", function(user) {
        if (typeof user === "undefined") {
            user = wgUserName;
        }
        openPage(wgServer + "/wiki/Special:EditCount/" + user, "Link to " + user + "'s edit count");
    }, 1, "Quick edit count", "ec <span style='color:red;'>user</span>", "Loads <span style='color:red;'>user</span>'s edit count. If no user is specified, it will load your own.");

    newCommand("ecf", function(wiki, user) {
        openPage("https://" + wiki + ".wikia.com/wiki/Special:EditCount/" + user, "Link to " + user + "'s edit count on " + wiki + " wiki");
    }, 2, "ecf", "ecf <span style='color:red;'>wiki</span> <span style='color:blue;'>user</span>", "Loads <span style='color:blue;'>user</span>'s edit count on <span style='color:red;'>wiki</span>");

    newCommand("cbl", function(user) {
        openPage("https://animalcrossing.wikia.com/wiki/Special:Log/chatban?page=User%3A" + user.replace(/ /g, '+'));
    }, 1, "Chat ban log viewer", "cbl <span style='color:red;'>user</span>", "Loads the chat ban log for <span style='color:red;'>user</span>");

    newCommand("bl", function(user) {
        openPage("https://animalcrossing.wikia.com/index.php?title=Special%3ALog&type=block&user=&page=User%3A" + user.replace(/ /g, '+') + "&year=&month=-1");
    }, 1, "Block log viewer", "bl <span style='color:red;'>user</span>", "Loads the block log for <span style='color:red;'>user</span>");

    newCommand("js", function(code) {
        createInlineAlert("Output: " + eval(code).toString());
    }, 1, "JavaScript executor", "js <span style='color:red;'>code</span>", "Runs <span style='color:red;'>code</span> and outputs the result into the chat. Advanced users only - don't execute any code on your computer which you don't know what it does.");

    newCommand("sb", function() {
        openPage(wgServer + "/wiki/" + wgSiteName + ":Sandbox");
    }, 0, "Sandbox loader", "sb", "Opens the sandbox");

    newCommand("c", function(user) {
        if (typeof user === "undefined") {
            user = wgUserName;
        }
        openPage(wgServer + "/wiki/Special:Contributions/" + user, "Link to " + user + "'s contributions");
    }, 1, "Quick contributions", "c <span style='color:red;'>user</span>", "Loads <span style='color:red;'>user</span>'s contributions. If no user is specified, it will load your own.");

    newCommand("mw", function(page) {
        if (typeof page === "undefined") {
            page = "Chat.js";
        }
        openPage(wgServer + "/wiki/MediaWiki:" + page, "Link to MediaWiki:" + page);
    }, 1, "Quick MediaWiki", "mw <span style='color:red;'>page</span>", "Loads MediaWiki:<span style='color:red;'>page</span>. If no user is specified, it will load Chat.js.");

    newCommand("n", function(page) {
        openPage(wgServer + "/wiki/" + page, "Link to " + page);
    }, 1, "Quick navigation", "n <span style='color:red;'>page</span>", "Opens <span style='color:red;'>page</span>");

    newCommand("nick", function(username) {
        if(username) {
            nicknames[username] = username;
            createInlineAlert("Reset "+username+"'s nickname.");
        } else {
            createInlineAlert("Error: you need to provide a username!");
            console.warn("Attempted to reset nickname, but no username was provided.");
        }
    }, 1, "Reset nickname", "nick <span style='color:red;'>username</span>", "Resets <span style='color:red;'>username</span>'s nickname");

    newAlias("ban", "b");
    newAlias("kickban", "b");
    newAlias("chatban", "b");
    newAlias("kick", "k");
    newAlias("korean", "kr");
    newAlias("hangul", "kr");
    newAlias("kata", "jk");
    newAlias("katakana", "jk");
    newAlias("hiragana", "jh");
    newAlias("hira", "jh");
    newAlias("search", "s");
    newAlias("searchf", "sf");
    newAlias("searchforeign", "sf");
    newAlias("searchother", "sf");
    newAlias("banunder", "bu");
    newAlias("banunderage", "bu");
    newAlias("banalt", "bu");
    newAlias("user", "u");
    newAlias("userpage", "u");
    newAlias("messagewall", "wall");
    newAlias("importscript", "ijs");
    newAlias("importjs", "ijs");
    newAlias("importstylesheet", "icss");
    newAlias("importcss", "icss");
    newAlias("recentchanges", "rc");
    newAlias("mainpage", "main");
    newAlias("roomid", "id");
    newAlias("editcount", "ec");
    newAlias("editcountother", "ecf");
    newAlias("editcountforeign", "ecf");
    newAlias("editcountf", "ecf");
    newAlias("chatbanlog", "cbl");
    newAlias("banlog", "cbl");
    newAlias("log", "cbl");
    newAlias("blocklog", "bl");
    newAlias("sandbox", "sb");
    newAlias("javascript", "js");
    newAlias("script", "js");
    newAlias("contributions", "c");
    newAlias("contribs", "c");
    newAlias("coppa", "bu");
    newAlias("away", "afk");
    newAlias("resetnick", "nick");
};

/* =======================================

ChatGame
@chatgame @cg
Credit to me, but I don't know how it works anymore lol
- This is a truly hideous script
- But for the most part, it works
- TODO: Tidy it up to high hell and back
- It works by transmitting data about the game as a message in chat
- The script can read and understand messages from each client
- They're hidden from the chat so it doesn't interfere with normal chatting

======================================  */

// We have to be able to send messages in chat to do this. Permission is asked from the user before we do it
sendMessage = function(msg) {
    if (!mainRoom.sendCustomMessage) {
        mainRoom.sendCustomMessage = function(t) {
            if (t.length && t.length <= this.maxCharacterLimit) {
                var e = new models.ChatEntry({
                    roomId: this.roomId,
                    name: wgUserName,
                    text: t
                });
                this.isMain() ? this.socket.send(e.xport()) : ((this.afterInitQueue.length < 1 || this.model.users.length < 2) && this.mainController.socket.send(this.model.privateRoom.xport()), this.isInitialized ? this.socket.send(e.xport()) : (this.afterInitQueue.push(e.xport()), e.set({
                    temp: !0,
                    avatarSrc: wgAvatarUrl
                }), this.model.chats.add(e))), $("body").removeClass("warn limit-near limit-reached")
            }
        };
    }
    mainRoom.sendCustomMessage(msg);
}

// TODO: Remove the need for this stupid thing since i never added team games
dEncryption = {
    passGenerate: function(n) {
        a = "";
        for (i = 0; a.length < n; i++) {
            a += (Math.random().toString(36).slice(2));
        }
        a = a.slice(a.length - n);
        return a;
    },

    encrypt: function(text, pass) {
        var encr = "";

        textArr = [];
        passArr = [];
        secretN = [];
        encrypted = [];

        // Splits the text into an array
        for (i = 0; i < text.length; i++) {
            textArr.push(text.charCodeAt(i));
        }

        // Splits the password into an array 
        for (i = 0; i < pass.length; i++) {
            passArr.push(2 * pass.charCodeAt(i));
        }
        // console.log("passArr: "+passArr);

        //Performs the encryption
        for (i = 0; i < textArr.length; i++) {
            secretN[i] = textArr[i] + (3 * passArr[i % pass.length]) - passArr[(i * i) % pass.length];
            secretN[i] = ("00" + secretN[i].toString()).slice(-3);
        }
        // console.log("secretN: "+secretN);

        for (i = 0; i < secretN.length; i++) {
            encrypted[i] = String.fromCharCode(secretN[i]);
        }

        encr = encrypted.join("");
        // console.log(encr);
        return encr;
        // Returns encrypted text as string of numbers
    },

    decrypt: function(text, pass) {
        var decr = "";

        textArrB = [];
        secretNB = [];
        passArr = [];
        decrypted = [];

        // Splits the encrypted text into blocks of three numbers
        // textArrB = text.split( /(?=(?:...)*$)/ );

        for (i = 0; i < text.length; i++) {
            textArrB.push(text.charCodeAt(i));
        }
        // console.log(textArrB);

        // Password into array
        for (i = 0; i < pass.length; i++) {
            passArr.push(2 * pass.charCodeAt(i));
        }
        // console.log(passArr);

        // Decrypts the number
        for (i = 0; i < textArrB.length; i++) {
            secretNB[i] = eval(textArrB[i]) + eval(passArr[(i * i) % pass.length]) - eval((3 * passArr[i % pass.length]))
        }
        // console.log(secretNB);

        // Converts number to text
        for (i = 0; i < textArrB.length; i++) {
            string = "";
            decrypted[i] = String.fromCharCode(secretNB[i]);
        }
        // console.log(decrypted);

        // Outputs decrypted text
        decr = decrypted.join("");
        // console.log(decr);
        return decr;
    }
};

importScriptPage("MediaWiki:JqueryUI.js", "d97"); // Loads some stuff for making the chatgame windows

// Stuff for parsing ChatGame system messages
cgs = {
    givegametype: {
        action: function(name) {
            // Replies to initial connection attempt with gametype
            //console.log("[CG] Alice: I'm here, Bob! Here's the gametype.");
            ChatGame.communicate("cgs-receivegametype-" + ChatGame.currentGameType);
            ChatGame.currentPlayer = "player1";
            //console.log("[CG] Alice: I'm player " + ChatGame.currentPlayer);
            ChatGame.otherPlayerName = name;
            $("#cancel-button").remove();
            clearTimeout(ChatGame.inviteTimeout);
            ChatGame.pingFunction = setTimeout(function() {
                ChatGame.checkConnection();
            }, ChatGame.timeoutSetting * 1000); //connection checker
        },
        params: 1,
    },
    receivegametype: {
        action: function(input) {
            ChatGame.currentGameType = input;
            //console.log("[CG] Bob: Thanks, Alice! Loading the game.");
            ChatGame.communicate("cgs-gameload");
            // Now we know what game we're playing, we know which game to load.
            ChatGame.loadGame(input);
            ChatGame.currentPlayer = "player2";
            //console.log("[CG] Bob: I'm player " + ChatGame.currentPlayer);
            ChatGame.pingFunction = setTimeout(function() {
                ChatGame.checkConnection();
            }, ChatGame.timeoutSetting * 1000); // connection checker
        },
        params: 1,
    },
    gameload: {
        action: function() {
            ChatGame.loadGame(ChatGame.currentGameType);
        },
        params: 0,
    },
    disconnect: {
        action: function() {
            createInlineAlert("The other player disconnected.");
            forceCloseModals();
            clearTimeout(ChatGame.pingFunction);
            ChatGame.reset();
        },
        params: 0,
    },
    ping: {
        action: function() {
            console.log("cgs-ping: We got pinged! Trying to reply");
            ChatGame.communicate("cgs-pingreply");
        },
        params: 0,
    },
    pingreply: {
        action: function() {
            ChatGame.isPinged = true;
            console.log("cgs-pingreply: We got a reply from our ping.");
            ChatGame.pingFunction = setTimeout(function() {
                ChatGame.checkConnection();
            }, ChatGame.timeoutSetting * 1000);
            a = Date.now() - ChatGame.pingTime;
            //console.log("Ping: " + a);
        },
        params: 0,
    }
};

// Plugin code
ChatGame = {
    displayDisclaimer: function() {
        /* We ask for the user's explicit permission to transmit messages under their name.
        If they decline, we inlinealert a link to the explanation of why we need to do this. */
        if (!cookiefunctions.load("ChatGame.accepted")) {
            a = confirm("By clicking 'OK' you agree to give ChatGame permission to send messages in chat on your behalf.\n\nClick 'Cancel' if you want a link to the ChatGame privacy policy and explanation of why this is necessary.");
            if (a === true) {
                cookiefunctions.save("ChatGame.accepted", "true", 7); // one week time out
                return true;
            } else {
                createInlineAlert("ChatGame privacy policy: https://d97.wikia.com/wiki/MediaWiki:Cg.js/doc");
                return false;
            }
        } else {
            return true;
        }
    },

    updateinfo: function() {
        a = document.getElementById("gameSelector").selectedIndex;
        if (ChatGame.gameList[a].mode == "single") {
            $("#options-fieldset").attr("disabled", true);
        } else {
            $("#options-fieldset").attr("disabled", false);
        }
        $("#gameInfo").html(ChatGame.gameList[a].info);
        $("#authorInfo").html(ChatGame.gameList[a].author);
        $("#modeInfo").html(ChatGame.gameList[a].mode);
    },

    communicate: function(command) {
        sendMessage("!ChatGame " + ChatGame.otherPlayerName + " " + dEncryption.encrypt("CG" + ChatGame.currentGameType + ChatGame.currentGameRoom + command, ChatGame.currentGamePass));
    },

    checkConnection: function() {
        ChatGame.isPinged = false;
        setTimeout(function() {
            if (ChatGame.isPinged == false && ChatGame.gameInProgress == true) {
                createInlineAlert("Connection to other player timed out.");
                console.error("[ChatGame] Disconnected from other player because we didn't get pinged in time. Function checkConnection");
                ChatGame.disconnectPlayer();
            }
        }, 10000); // ten second check
        if (ChatGame.gameInProgress == true) {
            console.log("Trying to ping the other player! fn checkConnection");
            ChatGame.communicate("cgs-ping");
            ChatGame.pingTime = Date.now();
        }
    },

    loadGame: function(game) {
        gameNames = [];
        for (i = 0; i < ChatGame.gameList.length; i++) {
            gameNames.push(ChatGame.gameList[i].code);
        }
        console.log(gameNames);
        load = gameNames.indexOf(game);
        console.log(load);

        ChatGame.gameStarted = true; // prevent invite timing out

        importScriptPage(ChatGame.gameList[load].url, ChatGame.gameList[load].wiki); // load the game
        console.log("Imported scripts");
    },

    parse: function(source, encryptedMessage) {
        decryptedMessage = dEncryption.decrypt(encryptedMessage, ChatGame.currentGamePass);
        //console.log("[CG] The message reads '" + decryptedMessage + "'");

        if (source == ChatGame.otherPlayerName) {
            if (decryptedMessage.slice(0, 2) != "CG") {
                console.error("[CG] fn ChatGame.parse: INVALID_DECLARATION: decrypted data is not a ChatGame request");
            } else {
                decryptedHead = decryptedMessage.slice(0, 10);
                decryptedBody = decryptedMessage.slice(10);
                //console.log("[CG] fn ChatGame.parse: The message head is '" + decryptedHead + "' and the message body is '" + decryptedBody + "'");
                //console.log("[CG] fn ChatGame.parse: The user is playing '" + decryptedHead.slice(2, 5) + "' in room number '" + decryptedHead.slice(5) + "'");

                var i = new RegExp("[a-zA-Z0-9-]*");
                if (i.test(decryptedBody) != "true") {

                    // If the message body is a valid connection request, we want to deal with it here. Else, give it to the game script

                    if (decryptedBody.slice(0, 3) == "cgs") {
                        // If we can parse this message, send it to our parser
                        ChatGame.messageParser(decryptedBody);
                    } else {
                        // If we can't, send it to the game's parser
                        gameParser(decryptedBody);
                    }
                } else {
                    console.error("[CG] fn ChatGame.parse: INVALID_COMMAND: received message is not valid command");
                }
            }
        }
    },

    beginConnection: function(roomID, password) {
        createInlineAlert("Attempting to join room " + roomID + " with encryption password " + password);
        //sends out connection request
        ChatGame.communicate("cgs-givegametype-" + wgUserName);
        //console.log("[CG] fn ChatGame.beginConnection: Sending out initial contact request");
        ChatGame.gameInProgress = true;
    },

    reset: function() {
        ChatGame.currentGamePass = "";
        ChatGame.currentGameRoom = "";
        ChatGame.currentGameType = "???";
        ChatGame.currentPlayer = "";
        ChatGame.otherPlayerName = "";
        ChatGame.inviteIdentifier = "";
        ChatGame.gameInProgress = false; // prevents joining multiple games at once
        ChatGame.pingFunction = "";
        ChatGame.timeoutSetting = 60; // time in seconds between ping requests
        ChatGame.isPinged = false; // used to check current connection status
        ChatGame.pingTime = 0; // used to assess the connection to other player
        ChatGame.gameStarted = false;
        ChatGame.inviteTimeout = ''; // used to timeout invites after one minute
        ChatGame.broadcastEnabled = false; // allow games to publish the winner
    },

    invitationDeclined: function(inv) {
        if (ChatGame.displayDisclaimer()) {
            sendMessage("!ChatGame decline " + inv);
            createInlineAlert("Invitation '" + inv + "' declined");
            $("#invite-" + inv).remove();
            ChatGame.gameInProgress = false;
        }
    },

    invitationAccepted: function(inv) {
        if (!ChatGame.gameInProgress) {
            if (ChatGame.displayDisclaimer()) {
                ChatGame.gameInProgress = true;
                $.showCustomModal("Input room password", "<b>Game password: </b><input id='invitedPasswordField' name='invitedPasswordField' style='height: initial;'>" + "<br />" +
                    '<input type="checkbox" style="height: initial;" name="newGameSettings" id="cgBroadcast">Broadcast result', {
                        id: 'chatgame-invite-accepted',
                        width: 400,
                        buttons: [{
                            message: 'Cancel',
                            handler: function() {
                                ChatGame.invitationDeclined(inv);
                                $('#give-chat-mod-prompt').closeModal();
                            }
                        }, {
                            message: 'Accept',
                            defaultButton: true,
                            handler: function() {
                                ChatGame.currentGamePass = $("#invitedPasswordField").val();
                                ChatGame.currentGameRoom = ChatGame.inviteIdentifier.slice(0, 5);
                                ChatGame.currentGameType = ChatGame.inviteIdentifier.slice(5, 8);
                                ChatGame.otherPlayerName = ChatGame.inviteIdentifier.slice(8);
                                if ($("#cgBroadcast").attr('checked') == "checked") {
                                    ChatGame.broadcastEnabled = true;
                                } else {
                                    ChatGame.broadcastEnabled = false;
                                }
                                ChatGame.beginConnection(ChatGame.currentGameRoom, ChatGame.currentGamePass);
                                $("#invite-" + inv).remove();
                                $('#give-chat-mod-prompt').closeModal();
                            }
                        }]
                    });
                $(".blackout").remove(); // make the chat usable with modal open
            }
        } else {
            alert("You can't join a new game now!");
            console.error("[CG] fn creategame: UNABLE_TO_JOIN_GAME - ChatGame.gameInProgress = true");
        }
    },

    cancelInvite: function(inv) {
        sendMessage("!ChatGame cancel " + inv);
        createInlineAlert("Invitation canceled");
        $("#cancel-button").remove();
        ChatGame.reset();
        clearTimeout(ChatGame.inviteTimeout);
    },

    disconnectPlayer: function() {
        ChatGame.communicate("cgs-disconnect");
        forceCloseModals();
        ChatGame.reset();
        clearTimeout(ChatGame.pingFunction);
        createInlineAlert("Disconnected from other player.");
    },

    messageParser: function(input) {
        var paramString = "";
        var inputArray = input.slice(4).split('-');
        //console.log(inputArray);
        var actionParams = eval("cgs.".concat(inputArray[0], ".params"));
        //console.log(actionParams);
        paramString = "";
        for (i = 1; i < actionParams + 1; i++) {
            if (i == actionParams) {
                paramString = paramString.concat("'", inputArray[i], "'");
            } else {
                paramString = paramString.concat("'", inputArray[i], "',");
            }
        }
        //console.log(paramString);
        eval("cgs.".concat(inputArray[0], ".action(" + paramString + ")"))
    },

    listenToIncoming: function(event) {

        c = event.attributes.text.toString();
        nameC = event.attributes.name.toString();
        var d = c.indexOf(' ');
        if (d != -1) {
            var e = c.slice(0, d); // e = first word in message
            if (e == "!ChatGame") { // check it's a message for us
                x = event.cid;
                $("#entry-" + x).remove();
                if (c.slice(10, 16) == "invite" && !ChatGame.gameInProgress) {
                    if (c.slice(c.indexOf("name:") + 5).trim() == wgUserName) {
                        inviteName = nameC; // The username the invite is from
                        inviteGame = c.slice(c.indexOf("game:") + 5, c.indexOf("game:") + 8).trim(); // The three letter code of the game
                        inviteRoom = c.slice(c.indexOf("id:") + 3, c.indexOf("id:") + 8).trim(); // The room ID (used for spectating)
                        ChatGame.inviteIdentifier = inviteRoom + inviteGame + inviteName; // The invite ID for accepting/declining
                        inviteReplyLinks = "(<span class='invite-link' onClick='ChatGame.invitationAccepted(ChatGame.inviteIdentifier)'>accept</span>/<span class='invite-link' onClick='ChatGame.invitationDeclined(ChatGame.inviteIdentifier)'>decline</span>)";
                        gameCodes = [];
                        for (i = 0; i < ChatGame.gameList.length; i++) {
                            gameCodes.push(ChatGame.gameList[i].code);
                        }
                        k = gameCodes.indexOf(inviteGame);
                        createInlineAlert(inviteName + " wants to play " + ChatGame.gameList[k].name + " in room " + inviteRoom + "!<span class='invitationlinks' id='invite-" + ChatGame.inviteIdentifier + "'><br />" + inviteReplyLinks + "</span>");
                    }
                } else if (c.slice(10, 17) == "decline" && ChatGame.gameInProgress) {
                    if (c.slice(26).trim() == wgUserName && ChatGame.otherPlayerName == nameC) {
                        clearTimeout(ChatGame.inviteTimeout);
                        $("#cancel-button").remove(); // Remove the cancel button
                        ChatGame.reset();
                        createInlineAlert(nameC + " declined your game invite.");
                    }
                } else if (c.slice(10, 16) == "cancel" && !ChatGame.gameInProgress) {
                    if (c.slice(25).trim() == wgUserName) {
                        // Damn, we got rejected
                        $("#invite-" + c.slice(17, 25) + nameC).remove();
                        ChatGame.reset();
                        createInlineAlert(nameC + " canceled the invite.");
                    }
                } else {
                    var f = c.lastIndexOf(' ') + 1; // f = the index of the last space in the message
                    var g = c.slice(f); // g = the encrypted data from the message
                    var h = c.slice(d + 1, f - 1); // h = the target in the incoming message
                    if (h == wgUserName) { // if the target is us
                        ChatGame.parse(nameC, g); // send it to the decrypter
                    }
                }
            }
        }

        // Cleaning up continued messages (there must be a better way to do this)
        m = $("#" + loadChatroomID() + " > ul > li")[$("#" + loadChatroomID() + " > ul > li").length - 2];
        n = $("#" + loadChatroomID() + " > ul > li")[$("#" + loadChatroomID() + " > ul > li").length - 1];
        p = $($("#" + loadChatroomID() + " > ul > li")[$("#" + loadChatroomID() + " > ul > li").length - 2]).attr('data-user');
        q = $($("#" + loadChatroomID() + " > ul > li")[$("#" + loadChatroomID() + " > ul > li").length - 1]).attr('data-user');
        if ($(n).hasClass("inline-alert") && $(m).hasClass("inline-alert") && !$(n).hasClass("continued")) {
            $(n).addClass("continued");
        } // Make sure that the inline alerts don't mess up
        if (p == q && !$(n).hasClass("continued")) {
            $(n).addClass("continued");
        } // Check if the usernames are the same. If they are, make n continued
        if (p != q && $(n).hasClass("continued")) {
            $(n).removeClass("continued");
        } // If the usernames aren't the same, we're going to make n not-continued
    },

    openInviteWindow: function() {
        if (!ChatGame.gameInProgress) {
            var optionsDropdownList = "";
            var gameCreateRoomID = Math.floor(Math.random() * (99998 - 10000 + 1)) + 10000;
            var generatedPassword = dEncryption.passGenerate(16);
            for (i = 0; i < ChatGame.gameList.length; i++) {
                optionsDropdownList = optionsDropdownList.concat('<option mode="' + ChatGame.gameList[i].mode + '" value="' + ChatGame.gameList[i].code + '">' + ChatGame.gameList[i].name + '</option>');
            }

            // Creates a dropdown list of every user in chat. Again there's probably a better way to do this
            var newSelectID = 'user-selector-' + $("select").length;
            var userSelectHTML = "<select name='user-selector' id='" + newSelectID + "' style='height: initial;'>";
            for (i = 0; i < Object.keys(mainRoom.model.users._byCid).length; i++) {
                userName = mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name;
                console.log("userName: " + userName + ", nicknames.userName: " + nicknames[userName]);
                if (nicknames[userName]) {
                    if (userName != wgUserName) {
                        userSelectHTML += '<option name="' + userName + '" value="' + userName + '">' + nicknames[userName] + '</option>';
                    }
                } else {
                    if (userName != wgUserName) {
                        userSelectHTML += '<option name="' + userName + '" value="' + userName + '">' + userName + '</option>';
                    }
                }

            }
            userSelectHTML += '</select>';

            // TODO: Improve this window
            $.showCustomModal('Start a new game', "<b>Select game: </b>" +
                "<select id='gameSelector' onChange='ChatGame.updateinfo()' style='height: initial;' name='gameSelector'>" +
                optionsDropdownList + "</select><br />" +
                "<b>Information: </b>" +
                "<span id='gameInfo'></span> (<span id='modeInfo'></span>player, by <span id='authorInfo'></span>)<br />" +
                "<fieldset id='options-fieldset' style='border:2px groove threedface; padding: 7px;'><legend>Multiplayer options</legend><b>Game room ID: </b>" +
                gameCreateRoomID + "<br />" +
                "<b>Room password: </b>" +
                "<input style='height: initial;' name='createGamePassBox' value='" + generatedPassword + "' id='createGamePassBox'>" + "<br />" +
                "You will need to give your room password to the person you wish to play with. <br /> <b>DO <span style='color:red;'>NOT</span> USE YOUR WIKIA PASSWORD.</b> <br />" +
                // NOT YET: '<input type="checkbox" style="height: initial;" name="newGameSettings" id="cgSpectator">Allow spectators' + "<br />" +
                '<input type="checkbox" style="height: initial;" name="newGameSettings" id="cgBroadcast">Broadcast result' + "<br />" +
                "<b>Player to invite: </b>" +
                "<span id='invitePlayerDropdown'>" + userSelectHTML + "</span></fieldset>" +
                "By clicking 'OK' you understand that the ChatGame script will automatically send messages in chat under your name. (<a href='https://d97.wikia.com/wiki/MediaWiki:Cg.js/doc' target='_blank'>more info</a>)", {
                    id: 'chatgame-create-game',
                    width: 400,
                    buttons: [{
                        message: 'Cancel',
                        handler: function() {
                            $('#chatgame-create-game').closeModal();
                            ChatGame.gameInProgress = false;
                        }
                    }, {
                        message: 'Start game',
                        defaultButton: true,
                        handler: function() {
                            if ($("#createGamePassBox").val() !== "") {
                                if (ChatGame.displayDisclaimer()) {

                                    ChatGame.currentGameType = $("#gameSelector").val();
                                    if (ChatGame.gameList[$("select[name='gameSelector'] option:selected").index()].mode == "single") {
                                        console.log("This is a single-player game. No need to send an invite!");
                                        ChatGame.loadGame(ChatGame.currentGameType);
                                    } else {
                                        console.log("This is a multiplayer game. We need to invite the other player!");
                                        ChatGame.otherPlayerName = $("#invitePlayerDropdown > select").val();
                                        ChatGame.currentGamePass = $("#createGamePassBox").val();
                                        if ($("#cgBroadcast").attr('checked') == "checked") {
                                            ChatGame.broadcastEnabled = true;
                                        } else {
                                            ChatGame.broadcastEnabled = false;
                                        }
                                        ChatGame.currentGameRoom = gameCreateRoomID;
                                        ////console.log("[CG] fn startListening: Waiting for player 2 to connect to room " + ChatGame.currentGameRoom);
                                        ChatGame.inviteIdentifier = ChatGame.currentGameRoom + ChatGame.currentGameType + ChatGame.otherPlayerName;
                                        createInlineAlert("Invite sent to " + ChatGame.otherPlayerName + "! Room: " + ChatGame.currentGameRoom + " Password: '" + ChatGame.currentGamePass + "' <span id='cancel-button'>(<span class='invite-link' onClick='ChatGame.cancelInvite(ChatGame.inviteIdentifier)'>cancel</span>)</span>");
                                        sendMessage("!ChatGame invite id:" + ChatGame.currentGameRoom + " game:" + ChatGame.currentGameType + " name:" + ChatGame.otherPlayerName + " ");
                                        // Invitation contains room ID, game name and target
                                        ChatGame.inviteTimeout = setTimeout(function() {
                                            if (ChatGame.gameStarted === false) {
                                                //console.log("[CG] Invitation to " + ChatGame.otherPlayerName + " timed out.");
                                                createInlineAlert(ChatGame.otherPlayerName + "didn't respond.<br />Please try again!");
                                                console.log("[CG] fn creategame - Info: DIDNT_RESPOND - the other player didn't respond within 5 minutes");
                                                ChatGame.cancelInvite(ChatGame.inviteIdentifier);
                                                ChatGame.reset();
                                            }
                                        }, 5 * 60 * 1000); // 5 min
                                    }
                                }
                                $('#chatgame-create-game').closeModal();
                            } else {
                                alert("Please enter a valid password.");
                            }
                        }
                    }],
                    callbackBefore: function() {
                        ChatGame.updateinfo();
                    }
                });

            ChatGame.gameInProgress = true;
            $('.JLform').submit(function() {
                var focusedId = ($("*:focus").attr("id"));
                if (focusedId == 'createGamePassBox') {
                    return false;
                }
            });
        } else {
            alert("You can't start a game now!");
            console.error("[CG] fn creategame: UNABLE_TO_CREATE_GAME - Tried to open a new creategame window when a game or invitation was already in progress");
        }
    },

    loadPlugin: function() {
        if (typeof ChatGame.gameList === "undefined") { // if there's no ChatGame.gameList in chat.js we'll make our own
            ChatGame.gameList = []; // cg.js should load after any definitions in chat.js
        } // This will be used to store all the valid games.

        ChatGame.gameList.push({
            "name": "Tic-tac-toe",
            "author": "Dragonfree97",
            "code": "TTT",
            "info": "Create a line of three squares of your color to win!",
            "url": "MediaWiki:TicTacToe.js",
            "wiki": "d97",
            "mode": "multi",
            "players": 2, // NYI
        });
        ChatGame.gameList.push({
            "name": "Drawing App",
            "author": "Incongruence",
            "code": "DRW",
            "info": "A drawing pad for your masterpieces!",
            "url": "MediaWiki:DrawingApp.js",
            "wiki": "d97",
            "mode": "single",
            "players": 1, // NYI
        });
        ChatGame.gameList.push({
            "name": "Chess",
            "author": "Dragonfree97",
            "code": "CHX",
            "info": "The classic game of strategy! (alpha, buggy)",
            "url": "MediaWiki:Chess.js",
            "wiki": "d97",
            "mode": "multi",
            "players": 2, // NYI
        });

        mainRoom.model.chats.bind("afteradd", function(e) {
            ChatGame.listenToIncoming(e);
        });

        newCommand("game", function() {
            ChatGame.openInviteWindow();
        }, 0, "Start a chat game", "game", "Opens a window to invite another user to a multiplayer game.");

        $("head").append('<style>.invite-link { color: #006400; cursor: pointer; } .invite-link:hover { text-decoration: underline; cursor: pointer; }</style>'); // minor css information

        ChatGame.reset();
    }
};

/* =======================================

ChatTags
@chatags @chattags
Credits to ShiningArmor && whoever wrote the spoiler tag code (rose or shade probs lol)
Modified by Dragonfree97

======================================  */

var chatags = typeof chatags !== 'undefined' ? chatags : {};

chatags.images = typeof chatags.images !== 'undefined' ? chatags.images : false;
chatags.videos = typeof chatags.videos !== 'undefined' ? chatags.videos : false;

chatags.css = '.chatags-image{max-width:300px;max-height:300px;}';

chatags.tags = {
    'b': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/b]', '</span>');
        } else {
            s = s.replace('[b]', '<span style="font-weight:bold;">');
        }
        return s;
    },
    'bg': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/bg]', '</span>');
        } else {
            try {
                s = s.replace('[bg ' + t.slice(t.indexOf(' ') + 1) + ']', '<span style="background-color:' + mw.html.escape(t.slice(t.indexOf(' '))) + ';">');
            } catch (e) {
                console.log(e);
            }
        }
        return s;
    },
    'big': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/big]', '</span>');
        } else {
            s = s.replace('[big]', '<span style="font-size:16pt;">');
        }
        return s;
    },
    'c': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/c]', '</span>');
        } else {
            try {
                s = s.replace('[c ' + t.slice(t.indexOf(' ') + 1) + ']', '<span style="color:' + mw.html.escape(t.slice(t.indexOf(' '))) + ';">');
            } catch (e) {
                console.log(e);
            }
        }
        return s;
    },
    'code': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/code]', '</span>');
        } else {
            s = s.replace('[code]', '<span style="font-family:monospace;">');
        }
        return s;
    },
    'font': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/font]', '</span>');
        } else {
            try {
                s = s.replace('[font ' + t.slice(t.indexOf(' ') + 1) + ']', '<span style="font-family:' + mw.html.escape(t.slice(t.indexOf(' '))) + ';">');
            } catch (e) {
                console.log(e);
            }
        }
        return s;
    },
    'i': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/i]', '</span>');
        } else {
            s = s.replace('[i]', '<span style="font-style:italic;">');
        }
        return s;
    },
    'small': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/small]', '</span>');
        } else {
            s = s.replace('[small]', '<span style="font-size:7pt;">');
        }
        return s;
    },
    's': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/s]', '</span>');
        } else {
            s = s.replace('[s]', '<span style="text-decoration:line-through;">');
        }
        return s;
    },
    'sub': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/sub]', '</sub>');
        } else {
            s = s.replace('[sub]', '<sub>');
        }
        return s;
    },
    'sup': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/sup]', '</sup>');
        } else {
            s = s.replace('[sup]', '<sup>');
        }
        return s;
    },
    'u': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/u]', '</span>');
        } else {
            s = s.replace('[u]', '<span style="text-decoration:underline;">');
        }
        return s;
    },
    'sp': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/sp]', '</div></div></div>');
        } else {
            s = s.replace('[sp]', '<div style="margin-top:5px"><div style="margin-bottom:2px"> <input class="spoilerbutton" type="button" value="Show spoiler" style="margin:0px;padding:0px 7px;height:initial;" onclick="if (this.parentNode.parentNode.getElementsByTagName(\'div\')[1].getElementsByTagName(\'div\')[0].style.display != \'\') { this.parentNode.parentNode.getElementsByTagName(\'div\')[1].getElementsByTagName(\'div\')[0].style.display = \'\';      this.innerText = \'\'; this.value = \'Hide\'; } else { this.parentNode.parentNode.getElementsByTagName(\'div\')[1].getElementsByTagName(\'div\')[0].style.display = \'none\'; this.innerText = \'\'; this.value = \'Show\'; }"></div><div class="alt2" style="border-bottom: 1px dashed grey"><div style="display: none;">');
        }
        return s;
    }
};

chatags.parser = function(s) {
    var t = s.match(/\[([^\[\];]*)\]/g); // We detect if there are any tags in the message

    var tg = '';
    var TAG_LIMIT = 9999; // Max number of tags permitted per message

    if (!t) return s; // If there's no tags, don't bother messing around trying to parse tags

    t = t.slice(0, TAG_LIMIT); // Trims down to the tag limit

    for (var i = 0; i < t.length; i++) {
        tg = t[i].match(/\[\/?([^\[\]]*)\]/)[1];

        try {
            tg = tg.split(' ')[0];
        } catch (e) {
            console.log(e);
        }

        if (typeof chatags.tags[tg] == 'function') {
            s = chatags.tags[tg](s, t[i].replace('[', '').replace(']', ''));
        }
    }

    return s;
};

chatags.init = function() {
    if (typeof window.mainRoom !== 'undefined') {
        $('head').append('<style>' + chatags.css + '</style>');

        window.mainRoom.model.chats.bind("afteradd", function(c) {
            if (typeof window.mainRoom.roomId === "undefined") {
                return;
            }
            var string = $("#Chat_" + window.mainRoom.roomId + " .message:last").html();
            if (typeof string !== "undefined" && string !== null) {
                string = chatags.parser(string);
                $("#Chat_" + window.mainRoom.roomId + " .message:last").html(string);
            }
        });

        window.mainRoom.model.privateUsers.bind('add', function(u) {
            var privateRoomId = u.attributes.roomId;
            var privateRoom = mainRoom.chats.privates[privateRoomId];

            privateRoom.model.chats.bind('afteradd', function(chat) {
                if (chat.attributes.isInlineAlert) return;

                var string = $("#Chat_" + privateRoomId + " .message:last").html();
                string = chatags.parser(string);

                $("#Chat_" + privateRoomId + " .message:last").html(string);
            });
        });
    }
};

/* =======================================

Text-based emotes
@textemotes
Thanks to MLP Wiki for the original code

======================================  */

// Grammar fixer

$('[name="message"]').keypress(function(e) {
    if (e.which == 32 || e.which == 13) {
        this.value = this.value.replace(/could of\b/gi, 'could have');
    }
});

$('[name="message"]').keypress(function(e) {
    if (e.which == 32 || e.which == 13) {
        this.value = this.value.replace(/would of\b/gi, 'would have');
    }
});

$('[name="message"]').keypress(function(e) {
    if (e.which == 32 || e.which == 13) {
        this.value = this.value.replace(/should of\b/gi, 'should have');
    }
});

$('[name="message"]').keypress(function(e) {
    if (e.which == 32 || e.which == 13) {
        this.value = this.value.replace(/must of\b/gi, 'must have');
    }
});

// END Grammar

// Text-based emoticons

$('[name="message"]').keypress(function(e) {
    if (e.which == 32 || e.which == 13) {
        this.value = this.value.replace(/\(donger\)/gi, 'ヽ༼ຈل͜ຈ༽ﾉ');
    }
});

$('[name="message"]').keypress(function(e) {
    if (e.which == 32 || e.which == 13) {
        this.value = this.value.replace(/\(lenny\)/gi, '( ͡° ͜ʖ ͡°)');
    }
});

$('[name="message"]').keypress(function(e) {
    if (e.which == 32 || e.which == 13) {
        this.value = this.value.replace(/\(praise\)/gi, '༼ つ ◕_◕ ༽つ');
    }
});

$('[name="message"]').keypress(function(e) {
    if (e.which == 32 || e.which == 13) {
        this.value = this.value.replace(/\(disappointed\)/gi, 'ಠ_ಠ');
    }
});

$('[name="message"]').keypress(function(e) {
    if (e.which == 32 || e.which == 13) {
        this.value = this.value.replace(/\(denko\)/gi, '(´・ω・`)');
    }
});

$('[name="message"]').keypress(function(e) {
    if (e.which == 32 || e.which == 13) {
        this.value = this.value.replace(/\(pointynoseman\)/gi, '(˚ㄥ_˚)');
    }
}); // who added this one lol

$('[name="message"]').keypress(function(e) {
    if (e.which == 32 || e.which == 13) {
        this.value = this.value.replace(/\(tm\)/gi, '™️');
    }
});

$('[name="message"]').keypress(function(e) {
    if (e.which == 32 || e.which == 13) {
        this.value = this.value.replace(/\:thinking\:/gi, '🤔️');
    }
});

/* =======================================

Options dialog
@options
Thanks to Gamedezyner for original implementation, MultiPM code, Multikick code
- This lets the user enable their own pings, whether the chat should bleep if a new message is received, etc
- Also lets users create multi-user PMs, and moderators can kick multiple users at once.

======================================  */

afkButtonLoader = function() {
    // Append the button to the chat-topic
    if ($("#afk-wrapper").length === 0) {
        $("div.chattopic").append('<span id="afk-wrapper"> • <a href="#" id="afkButton" class="topiclink" onClick="mainRoom.setAway()"><img src="Icon_afk.png" height="12px" class="chattopic-icon" /> go afk</span></span>');
    }
    if (ChatOptions.savable.afkSettingsButton === false) {
        $("#afk-wrapper").css('display', 'none');
    } else {
        $("#afk-wrapper").css('display', 'initial');
    }
};

generateUserTable = function(classname) {
    multiPMUserTable = "";
    for (i = 0; i < Object.keys(mainRoom.model.users._byCid).length; i++) {
        if (i % 2) {
            multiPMUserTable += '<td style="padding:2px;"><label><input class="' + classname + '" type="checkbox" name="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '" value="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '"/><img src="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.avatarSrc + '" style="vertical-align:middle;padding:2px;" />' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '</label></td>';
            multiPMUserTable += '</tr>';
        } else {
            multiPMUserTable += '<tr>';
            multiPMUserTable += '<td style="padding:2px;"><label><input class="' + classname + '" type="checkbox" name="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '" value="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '"/><img src="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.avatarSrc + '" style="vertical-align:middle;padding:2px;" />' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '</label></td>';
        }
    }
    if ((Object.keys(mainRoom.model.users._byCid).length % 2) != 1) {
        multiPMUserTable += '</tr>';
    }
    return multiPMUserTable;
};

multiKickModal = function() {
    var contents = '<form method="" name="" class="WikiaForm "><fieldset><div id="multiKickHeader">Select the users you would like to kick:</div><div id="multiKickNames" style="height:250px;overflow-y:scroll;"><table id="multiKickUserTable">' + generateUserTable("multiKickUser") + '</div></fieldset></form>';

    var $multiKickWindowHTML = $.showCustomModal("MultiKick", contents, {
        id: "multiKickWindow",
        width: 400,
        buttons: [{
                id: "cancel",
                message: "Cancel",
                handler: function() {
                    $("#multiKickWindow").closeModal();
                }
            },
            {
                id: "multikick-start-button",
                defaultButton: true,
                message: "Kick",
                handler: function() {
                    if ($(".multiKickUser:checked").length === 0) {
                        $("#multiKickHeader").css("color", "red").css("font-weight", "bold");
                        return;
                    } else {
                        users = [];
                        for (i = 0; i < $(".multiKickUser:checked").length; i++) {
                            mainRoom.kick({
                                name: $(".multiKickUser:checked")[i].value
                            });
                        }
                        $("#multiKickWindow").closeModal();
                    }
                }
            }
        ]
    });
}

multiKickLoader = function() {
    // Append the button to the chat-topic
    if ($("#multikick-wrapper").length === 0) {
        $("div.chattopic").append('<span id="multikick-wrapper"> • <a href="#" id="multikickButton" class="topiclink" onClick="multiKickModal()"><img src="Icon_afk.png" height="12px" class="chattopic-icon" /> multi-kick</span></span>');
    }
    if (ChatOptions.savable.multiKickButton === false) {
        $("#multikick-wrapper").css('display', 'none');
    } else {
        $("#multikick-wrapper").css('display', 'initial');
    }
};

multiPMsModal = function() {
    var contents = '<form method="" name="" class="WikiaForm "><fieldset><div id="multiPMHeader">Select the users you would like to PM:</div><div id="multiPMNames" style="height:250px;overflow-y:scroll;"><table id="multiPMUserTable">' + generateUserTable("multiPMUser") + '</div></fieldset></form>';
    var $multiPMWindowHTML = $.showCustomModal("MultiPM", contents, {
        id: "multiPMWindow",
        width: 400,
        buttons: [{
                id: "cancel",
                message: "Cancel",
                handler: function() {
                    $('#multiPMWindow').closeModal();
                }
            },
            {
                id: "multipm-start-button",
                defaultButton: true,
                message: "Start",
                handler: function() {
                    if ($(".multiPMUser:checked").length === 0) {
                        $("#multiPMHeader").css("color", "red").css("font-weight", "bold");
                        return;
                    } else {
                        users = [];
                        for (i = 0; i < $(".multiPMUser:checked").length; i++) {
                            users.push($(".multiPMUser:checked")[i].value);
                        }
                        mainRoom.openPrivateChat(users);
                        $('#multiPMWindow').closeModal();
                    }
                }
            }
        ]
    });
}

multiPMsLoader = function() {
    // Append the button to the chat-topic
    if ($("#multipms-wrapper").length === 0) {
        $("div.chattopic").append('<span id="multipms-wrapper"> • <a href="#" id="multipmsButton" class="topiclink" onClick="multiPMsModal()"><img src="Icon_afk.png" height="12px" class="chattopic-icon" /> multi-pm</span></span>');
    }
    if (ChatOptions.savable.multiPMsButton === false) {
        $("#multipms-wrapper").css('display', 'none');
    } else {
        $("#multipms-wrapper").css('display', 'initial');
    }
};

// Custom pings

morePings = function() {
    var button = $("#pings-form-button");
    var input = '<br><input type="text" class="ping-input">';
    $(button).remove();
    $("#pings-form").append(input);
    $("#pings-form").append(button);
}

loadPings = function() {
    var json_str = cookiefunctions.load("pings");
    var pings = JSON.parse(json_str);
    return pings;
}

savePings = function(pings) {
    var json_str = JSON.stringify(pings);
    cookiefunctions.save("pings", json_str);
}

var pingsModalHTML;
var pingsRegexp;

reloadPings = function() {
    pingsModalHTML = "";
    pingform = "";
    pingsRegexp = "";
    if (loadPings()) {
        pingsList = loadPings();
        var pingform = '<form id="pings-form">';
        for (pingnum = 0; pingnum < pingsList.length; pingnum++) {
            pingform += '<input type="text" class="ping-input" value="' + pingsList[pingnum] + '">';
            if (pingnum == pingsList.length - 1) {
                pingform += ' <button id="pings-form-button" onclick="morePings(); return false;">Add more pings</button></form>';
            } else {
                pingform += "<br>"
            }
        }
        pingsRegexp = new RegExp("\\b" + loadPings().join("\\b|\\b") + "\\b", 'gi'); // Prevents pings in middle of word
    } else if (loadPings() === null) {
        // If we can't load any pings, just insert the user's username as a ping
        pingform = '<form id="pings-form"><input type="text" class="ping-input" value="' + wgUserName + '"> <button id="pings-form-button" onclick="morePings(); return false;">Add more pings</button></form>';
        pingsList = [];
        pingsList.push(wgUserName.toString());
        console.warn("Couldn't load custom pings. Setting to default, which is your username");
        pingsRegexp = new RegExp(wgUserName, 'gi');
    }
    pingsModalHTML = pingform;
    console.log("Ping loading complete: "+pingsRegexp);
}

pingsUserLoader = function() {
    // Append the button to the chat-topic
    if ($("#pings-wrapper").length === 0) {
        $("div.chattopic").append('<span id="pings-wrapper"> • <a href="#" id="pingsButton" onClick="pingsModal()" class="topiclink"><img src="Icon_afk.png" height="12px" class="chattopic-icon" /> pings</span></span>');
    }
    if (ChatOptions.opt.pingsButtonName === false) {
        $("#pings-wrapper").css('display', 'none');
    } else {
        $("#pings-wrapper").css('display', 'initial');
    }

    reloadPings();
};

pingsModal = function() {
    var $multiPMWindowHTML = $.showCustomModal("Set ping phrases", 'Please type the phrases you wish to ping you.<br>' + pingsModalHTML, {
        id: "pingsWindow",
        width: 400,
        buttons: [{
                id: "cancel",
                message: "Cancel",
                handler: function() {
                    $('#pingsWindow').closeModal();
                }
            },
            {
                id: "pings-save-button",
                defaultButton: true,
                message: "Save",
                handler: function() {
                    var pingsArr = [];
                    for (pn = 0; pn < $(".ping-input").length; pn++) {
                        ping = $($(".ping-input")[pn]).val().toString();
                        ping_s = ping.replace(" ", "");
                        if (ping_s) {
                            pingsArr.push(ping);
                        }
                    }
                    if (pingsArr == []) {
                        cookiefunctions.clear("pings");
                    } else {
                        savePings(pingsArr);
                    }
                    reloadPings();
                    $('#pingsWindow').closeModal();
                }
            }
        ]
    });
}

displaySidebarSelf = function() {
    if (typeof $("#user-" + wgUserName).html() === "undefined") {
        sidebarSelfLoader = setInterval(function() {
            if (typeof $("#user-" + wgUserName).html() !== "undefined") {
                if (ChatOptions.savable.sidebarSelf === true) {
                    $("#user-" + wgUserName).css('display', 'list-item');
                } else {
                    $("#user-" + wgUserName).css('display', 'none');
                }
                clearInterval(sidebarSelfLoader);
            }
        }, 50);
    } else {
        cleanedUser = wgUserName.replace(/ /g, "_") // Stops users with spaces in their name breaking everything
        if (ChatOptions.savable.sidebarSelf === true) {
            $("#user-" + cleanedUser).css('display', 'list-item');
        } else {
            $("#user-" + cleanedUser).css('display', 'none');
        }
    }
}

// the actual code
var ChatOptions = {};
ChatOptions.opt = {};

ChatOptions.Option = function (name, category, description, type, myOptions, handler) {
	// Set up basic attributes
	this.name = name;
	this.category = category;
	this.description = description;
	this.type = type
	this.options = myOptions;
	
	if (typeof handler === "function") {
		this.handler = handler;
	}
	
	// Work out the appropriate HTML for the ChatOptions.opt.form
	this.html = function() {
		if (this.type == "checkbox") {
			h = '<input type="checkbox" style="height: initial;" name="'+this.name+'" id="'+this.name+'">'+this.description;
			return h;
			
		} else if (this.type == "dropdown") {
			h = this.description;
			h += ' <select name="'+this.name+'" id="'+this.name+'">' // Open the dropdown
			for (i = 0; i < this.options.list.length; i++) {
				h += '<option value="'+this.options.list[i]+'">'+this.options.list[i]+'</option>'; 
			}
			h += '</select>'
			return h;
			
		} else if (this.type == "radio") {
			h = this.description + "<br>";
			for (i = 0; i < this.options.list.length; i++) {
				h += '<input type="radio" id="'+this.name+'_'+i+'" name="'+this.name+'" value="'+this.options.list[i]+'"> '+this.options.list[i]+" ";
			}
			return h;
			
		} else if (this.type == "text") {
			h = this.description + " ";
			h += '<input name="'+this.name+'" id="'+this.name+'">';
			return h;
		}
	}
	
	ChatOptions.opt[name] = this;
}

// This is what we'll save into cookies to save lots of space
// Can be condensed even further but it's not really necessary
ChatOptions.savable = {};

ChatOptions.saveCookie = function() {
	this.saveOptions();
	cookie = JSON.stringify(this.savable);
	cookiefunctions.save("chatoptions",cookie);
}

ChatOptions.loadCookie = function() {
	cookie = cookiefunctions.load("chatoptions");
	if (cookie == undefined) {
		this.saveOptions();
		return this.savable;
	}
	return JSON.parse(cookie);
}

ChatOptions.loadOptions = function() {
	this.savable = ChatOptions.loadCookie();
	ChatOptions.runHandlers();
}

ChatOptions.saveOptions = function() {
	// Saves the ChatOptions.opt.from the form, and saves them into ChatOptions.savable	
	for(keys in this.opt) {
		type = this.opt[keys].type;
		name = this.opt[keys].name;
		
		if (type == "dropdown" || type == "text") {
			set = $("[name='"+name+"']").val();
			console.log(keys+": "+set);
			this.savable[name] = set;
			
		} else if (type == "radio") {
			sel = $('input[name=' + name + ']:checked').val();
			if (sel == undefined) {
				sel = this.opt[keys].options.list[this.opt[keys].options.def];
			}
			this.savable[name] = sel;
			console.log(keys+": "+sel);
			
		} else if (type == "checkbox") {
			chk = $("[name='"+name+"']").attr('checked');
			if (chk == undefined) { chk = false; } else { chk = true; }
			this.savable[name] = chk;
			console.log(keys+": "+chk);
		}
	}
	
	ChatOptions.runHandlers();
}

ChatOptions.runHandlers = function() {
	// Iterates through the handlers in case we need to update something
	for (keys in this.opt) {
		opt = this.opt[keys];
		if (typeof opt.handler === "function") {
			opt.handler();
		}
	}
}

// Stores the ChatOptions.opt.into the modal
ChatOptions.populate = function() {
	for (keys in this.opt) {
		type = this.opt[keys].type;
		name = this.opt[keys].name;
		
		if (type == "dropdown" || type == "text") {
			$("[name='"+name+"']").val(this.savable[name]);
			
		} else if (type == "radio") {
			selected_radio = this.savable[name];
			index = $.inArray(selected_radio, this.opt[keys].options.list);
			if (index != -1) {
				$("#"+name+"_"+index).prop("checked", true)
			} else {
				console.error("Error: Invalid property for option. Attempted: "+selected_radio);
			}
			
		} else if (type == "checkbox") {
			if (this.savable[name] == true) {
				$("[name='"+name+"']").attr('checked', true);
			}
		}
	}		
}

ChatOptions.modal = function() {
	// 1. Create a list of the different groups of settings that there are
	cats = []; // nya
	for (keys in ChatOptions.opt) {
		if (cats.indexOf(ChatOptions.opt[keys].category) == -1) {
			cats.push(ChatOptions.opt[keys].category);
		}
	}
	 
	// 2. Sort the ChatOptions.opt.into each settings
	opts = []
	for (i=0; i<cats.length; i++) { // loop over categories
		for (keys in ChatOptions.opt) {
			if (ChatOptions.opt[keys].category == cats[i]) {
				opts.push(ChatOptions.opt[keys].name);
			}
		}
	}
	
	// 3. Grab the HTML from each option now they're in order
	catcounter = 0; // how many nyas
	html = "";
	html += '<span class="option-header" style="font-weight: bold">'+cats[catcounter]+'</span><br>'
	for (j=0; j<opts.length; j++) {
		// make new category if needed
		if (ChatOptions.opt[opts[j]].category != cats[catcounter]) {
			catcounter++;
			html += '<span class="option-header" style="font-weight: bold">'+cats[catcounter]+'</span><br>'
		}
		html += ChatOptions.opt[opts[j]].html() + '<br>'
	}
	
	// 4. Display the modal 
	$.showCustomModal('Chat Options', html, {
		id: 'chat-options-window',
		width: 500,
		buttons: [{
			message: 'Cancel',
			handler: function() {
				$('#chat-options-window').closeModal();
			}
		}, {
			message: 'Save',
			defaultButton: true,
			handler: function() {
				ChatOptions.saveCookie();
				$('#chat-options-window').closeModal();
			}
		}],
		callback: function(modal) {
			ChatOptions.populate();
		}
	});
}

ChatOptions.buttonHTML = '<div id="options-button-wrapper" onClick="ChatOptions.modal()" style="text-align: center;padding-bottom: 1px; padding-top:5px;"><a class="options-button wikia-button" style="width: 120px; margin-left: auto; margin-right: auto; border-radius:10px">Options</a></div>';
 
ChatOptions.init = function() {
	// These should not be modified by any code! Weird things may happen if you do
	// Pings
	new ChatOptions.Option("pingsButtonName","Pings","Play a sound when someone says your name","checkbox",{enabled: false},pingsUserLoader);
	new ChatOptions.Option("pingsButtonChat","Pings","Play a sound when someone posts in chat","checkbox",{enabled: false});
	new ChatOptions.Option("pingsButtonPM","Pings","Play a sound when you receive a new private message","checkbox",{enabled: false});
	// Features
	new ChatOptions.Option("afkSettingsButton","Features","Add a button to set your status as away","checkbox",{enabled: false},afkButtonLoader);
	new ChatOptions.Option("imageDisplay","Features","Display image links as the full image in chat","checkbox",{enabled: false});
	new ChatOptions.Option("videoDisplay","Features","Display mp4, webm and gifv videos in chat","checkbox",{enabled: false});
	new ChatOptions.Option("multiPMsButton","Features","Add a button to open group PMs","checkbox",{enabled: false},multiPMsLoader);
	new ChatOptions.Option("typingSuppressor","Features","Hide when you're typing to other users","checkbox",{enabled: false});
	new ChatOptions.Option("hideTypingBar","Features","Hide other users typing","checkbox",{enabled: false});
	// Display
	new ChatOptions.Option("sidebarSelf","Display","Show yourself in the sidebar","checkbox",{enabled: true},displaySidebarSelf);
	new ChatOptions.Option("rightHandChat","Display","Display the user-list on which side of the window?","radio",{list: ["Right-hand side","Left-hand side"], def: 0},StyleSwitcher.align);
	new ChatOptions.Option("roundedElements","Display","Display the chat with rounded corners and avatars?","radio",{list: ["Not rounded (square mode)","Rounded (circle mode)"], def: 0},StyleSwitcher.circle);
	new ChatOptions.Option("styleSwitcher","Display","Change the design of chat","dropdown",{list: ["Spring","Summer","Fall","Winter","Night","Twitch","Aurora","Nebula"], def: defaultSkin},StyleSwitcher.change);
	// Advanced
	new ChatOptions.Option("magicBox","Advanced","Show the 'Magic Box' command console","checkbox",{enabled: false}, sidebarConsoleShow);
	// Moderator
	new ChatOptions.Option("multiKickButton","Moderator","Add a button to kick multiple users at once","checkbox",{enabled: false},multiKickLoader);
	
	this.loadOptions();
	
	// Add our button to the sidebar
	$("#sidebar-top").append(this.buttonHTML);
}

/* =======================================

Nicknames
@nicknames @nicks
Credits to Dragonfree97, Ozuzanna

======================================= */

// This script allows users to save nicknames for other users.
// These nicknames are never shown to other users.
// It replaces how usernames display in inline alerts, chat messages, and the user list.
// Hovering over a nickname will display the user's actual username.
// Dependent on Cookie Functions (above).

var nicknames = {};

findByNick = function (nick) {
	for (user in nicknames) {
		if (nicknames[user] == nick) {
			return user;
		}
	}
	return false;
}

// Saves nicknames and reloads them after modification
nickSaver = function(name) {
    // Work out what the current setting is for this user
    var currentNick;
    if (nicknames[name]) {
        currentNick = nicknames[name];
    } else {
        currentNick = name;
    }

    // Display dialog box
    nameGenForm = "";
    if (name.substr(name.length - 1) == "s") {
        nameGenForm = name + "'";
    } else {
        nameGenForm = name + "'s";
    }

    $.showCustomModal("Change " + nameGenForm + " nickname", "<input id='nicknameField' name='nicknameField' onkeydown = 'if (event.keyCode == 13) { document.getElementById(\"save-nickname\").click() }' style='height: initial;'>", {
        id: 'nickname-change-window',
        width: 400,
        buttons: [{
            message: 'Cancel',
            handler: function() {
                $('#nickname-change-window').closeModal();
                return;
            }
        }, {
            message: 'Reset nickname',
            id: "reset-nickname",
            handler: function() {
                nicknames[name] = name;
                nickCookieSave();
                sidebarModify();
                $('#nickname-change-window').closeModal();
                
            }
        }, {
            message: 'Save',
            defaultButton: true,
            id: "save-nickname",
            handler: function() {
                var newNickname = $("#nicknameField").val();
                nickExists = findByNick(newNickname);
                if (nickExists !== false && nickExists !== wgUserName) {
                    alert("Error: "+nickExists+" already has this nickname! Please choose another.");
                } else {
                    nicknames[name] = newNickname;
                    nickCookieSave();
                    sidebarModify();
                    $('#nickname-change-window').closeModal();
                }
            }
        }],
        callback: function () {
            $("#nicknameField").val(nicknames[name]);
        }
    });
};

nickCookieSave = function() {
    // We can't natively save objects to cookies, so we have to change them to strings.
    var bakedCookie;
    try {
        bakedCookie = JSON.stringify(nicknames); // make the cookie into a savable format
        cookiefunctions.save("chat-nicknames", bakedCookie, 1000) // save the cookie for ages and ages
    } catch (e) {
        console.err(e)
        alert("An error was encountered saving the nickname. Please contact Dragonfree97 with the contents of your console (press f12)");
    }
};

nickCookieLoad = function() {
    // Loads in the nicknames, assuming they exist. If not, nicknames is left blank
    if (cookiefunctions.load("chat-nicknames") !== null) {
        nicknames = JSON.parse(cookiefunctions.load("chat-nicknames"));
    }
    sidebarModify();
};

// Displays the extra menu item in the user menu list thingy.
// Credit to Ozank Cx on dev.wikia.com for old implementation
nickInit = function() {
    nickCookieLoad();
};

// Changes the nicknames in the sidebar
sidebarModify = function() {
    for (i = 0; i < $("#WikiChatList > li").length; i++) {
        var name = $($("#WikiChatList > li")[i]).attr("data-user");
        if (nicknames[name] !== null && typeof nicknames[name] !== "undefined") {
            var badge = $($("#WikiChatList > li > span > .badge")[i]).html();
            $($("#WikiChatList > li > span")[i]).html(nicknames[name] + "<span class='badge'>" + badge + "</span>");
            $($("#WikiChatList > li")[i]).attr("title", name);
        } else {
            var badge = $($("#WikiChatList > li > span > .badge")[i]).html();
            $($("#WikiChatList > li > span")[i]).html(name + "<span class='badge'>" + badge + "</span>");
            $($("#WikiChatList > li")[i]).attr("title", name);
        }
    }
};

// Changes the username attached to the message
nickParse = function(e) {
    if (e.attributes.name) { // Make sure it's not an inline alert
        if (nicknames[e.attributes.name.toString()]) { // Make sure we actually have a user with that nickname
            $("#Chat_" + mainRoom.roomId + " .username:last").html(nicknames[e.attributes.name.toString()]); // Change the text
            // We're also going to add a 'title' attribute so you can hover on people's nicks to see their original username
            $("#Chat_" + mainRoom.roomId + " .username:last").attr("title", e.attributes.name.toString());
        }
    } else {
        // It's an inline alert!! Woo!! We're going to replace any usernames in these with the nickname.
        // This will modify kick/ban messages and so on.
        alertText = e.attributes.text.toString();
        $.each(nicknames, function(index, value) {
            var magicRegex = new RegExp(index, "gi");
            $("#Chat_" + mainRoom.roomId + " .inline-alert:last").html($("#Chat_" + mainRoom.roomId + " .inline-alert:last").html().replace(magicRegex, value));
        });
    }
    // Someone might have joined. Better reset the sidebar
    sidebarModify();
};

/* =======================================
 
Avatar Display
@avatardisplay
Credits to Dragonfree97
 
======================================  */

// Adds a slash-command to display a larger version of another user's avatar in chat. 
// Saves you going to their profile if they change it lol
// Usage: type /avatar then a user's name. Ezpz

avatarDisplay = function(e) {
    if (e.attributes.name.toString() == wgUserName && e.attributes.text.toString().slice(0,8) == "/avatar ") {
        oldMessage = e.attributes.text.toString();
		name = oldMessage.slice(8);
		
		// proper grammar please
		var gen;
		if(name.slice(-1) == "s") {
			gen = name+"'";
		} else {
			gen = name+"'s";
		}
		
		// First of all: is the name given a nickname?
		isNickOf = searchObj(nicknames,name);
		if(typeof isNickOf == "string" && typeof mainRoom.model.users.findByName(isNickOf) !== "undefined") {
			avaUrl = mainRoom.model.users.findByName(isNickOf).attributes.avatarSrc.toString().slice(0,-23);
			$("#Chat_" + window.mainRoom.roomId + " .message:last").html(gen+" avatar:<br /><img style='height: 200px; width: 200px; max-height: initial;' src='"+avaUrl+"' />");
		} else if (typeof mainRoom.model.users.findByName(name) !== "undefined") {
			// Is the name just a straight-up username?
			avaUrl = mainRoom.model.users.findByName(name).attributes.avatarSrc.toString().slice(0,-23);
			$("#Chat_" + window.mainRoom.roomId + " .message:last").html(gen+" avatar:<br /><img style='height: 200px; width: 200px; max-height: initial;' src='"+avaUrl+"' />");
		} else {
			createInlineAlert("Error: "+name+" is not a person in chat! Please check your spelling.");
		}
    }
};

/* =======================================
 
Image Display
@imagedisplay @inlineimages @img
Credits to Dragonfree97
 
======================================  */

// Hooks into Options -- user must enable this to see inline images!
// There are two seperate options for displaying videos and displaying images.

imageDisplay = {
    // The extensions we're going to allow
	img: ["png","jpeg","jpg","gif"],
	vid: ["gifv","webm","mp4"],
	// The things we'll attempt to look for to see if our link is an image
	prefixes: ["wiki/file:", "wiki/image:"], 
	
	// Gets the extension from a given url
	ext: function(url) {
		if (url.lastIndexOf(".") == -1) {
			return false;
		}
		return url.slice(url.lastIndexOf(".")+1).toLowerCase();
	},
	
	// Returns true if the input appears to be a file page on a wiki
	wiki: function(url) {
	    for (var i = 0; i < this.prefixes.length; i++) {
    		if (url.toLowerCase().indexOf(this.prefixes[i]) != -1) {
    			return true;
    		}
    	}
    	return false;
	},
	
	// Main function
	parse: function(e) {
		var len = $("#Chat_" + window.mainRoom.roomId + " .message:last > a").length;
		for (i=len-1; i>-1; i--) {
			var imagelink = $($("#Chat_" + window.mainRoom.roomId + " .message:last > a")[i]).attr("href");
			if (typeof imagelink !== "undefined") {
				var imageID = "image-" + e.attributes.timeStamp.toString();
				var ext = this.ext(imagelink);
				
				if (this.img.indexOf(ext) != -1 && ChatOptions.savable.imageDisplay == true && !this.wiki(imagelink)) {
					var imagehtml = "<img class='chat-image' id='"+imageID+"' src='"+imagelink+"' style='max-height: 160px;' />";
					
				} else if (this.vid.indexOf(ext) != -1 && ChatOptions.savable.videoDisplay == true && !this.wiki(imagelink)) {
					// gifv must be converted to mp4
					if (ext == "gifv") {
						ext = "mp4";
						imagelink = imagelink.slice(0,imagelink.lastIndexOf("gifv")) + "mp4";
					}
					var imagehtml = "<video class='chat-video' id='"+imageID+"' style='max-height: 160px' autoplay='autoplay'><source src='"+imagelink+"' type='video/"+ext+"'></video>";
				} else {
					return;
				}
				
				$($("#Chat_" + window.mainRoom.roomId + " .message:last > a")[i]).html(imagehtml);
				$($("#Chat_" + window.mainRoom.roomId + " .message:last > a")[i]).wrap( "<div class='chat-image-wrapper'></div>" );
				
				if (this.vid.indexOf(ext) != -1) {
					var video = document.getElementById(imageID);
					video.loop = true;
				}
			}
		}
	}
}

/* =======================================

Custom menu items
@userstatsmenu @custommenu @menu
Because doing it the old way really is lame

======================================= */

// some important CSS
$("head").append('<style>.customAction { cursor: pointer; } .customLabel { padding-left: 8px !important; }</style>');

// variable declaratiions
var customActions = {};
var clickedUser;

// store SVGs here because we use them over and over again
menuSVGs = {
	speech_bubble: '<svg xmlns="https://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-reply-small"><path d="M18 8.273c0 4.01-4.037 7.272-9 7.272-.752 0-1.508-.078-2.252-.233l-4.22 1.636a.77.77 0 0 1-.732-.096.719.719 0 0 1-.291-.66l.395-3.45C.672 11.47 0 9.896 0 8.273 0 4.263 4.037 1 9 1s9 3.263 9 7.273z" fill-rule="evenodd"></path></svg>',
	person: '<svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="wds-icon wds-icon-small" id="wds-icons-userpage"><path d="M12 14c3.309 0 6-2.691 6-6V6c0-3.309-2.691-6-6-6S6 2.691 6 6v2c0 3.309 2.691 6 6 6zm5 2H7c-3.86 0-7 3.14-7 7a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1c0-3.86-3.14-7-7-7z" fill-rule="evenodd"></path></svg>',
	pencil: '<svg xmlns="https://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-pencil-small"><path d="M9.1 4.5l-7.8 7.8c-.2.2-.3.4-.3.7v3c0 .6.4 1 1 1h3c.3 0 .5-.1.7-.3l7.8-7.8-4.4-4.4zm7.6-.2l-3-3c-.4-.4-1-.4-1.4 0l-1.8 1.8 4.4 4.4 1.8-1.8c.4-.4.4-1 0-1.4z" fill-rule="evenodd"></path></svg>',
	cross: '<svg xmlns="https://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-userpage"><rect width="18" height="4" x="-9" y="11" style="stroke-width:1" transform="matrix(0.70750182,-0.70671152,0.7056407,0.70856983,0,0)"></rect><rect width="18" height="4" x="-22" y="-2" style="stroke-width:1" transform="matrix(-0.70671152,-0.70750182,0.70856983,-0.7056407,0,0)"></rect></svg>'
}

MenuItem = function(name, handler, description, mod, admin, svg, display) {
    this.name = name;
    this.handler = handler;
    this.description = description;
    this.mod = mod;
    this.admin = admin;
    this.svg = svg;
    
    if (typeof display == "function") {
        this.display = display;
    } else {
        this.display = function() { return true; }
    }
    
    this.html = function() {
        j = "<li class='"+this.identifier+" customAction'>"+this.svg+"<span class='label customLabel'>"+this.description+"</span></li>"
        j = $(j).click(mainRoom.viewUsers.hideMenu).click(this.handler);
        return j;
    }
    
    customActions[name] = this;
}

menuInit = function() {
    new MenuItem(
        "userpage",
        function() { openPage("https://animalcrossing.wikia.com/wiki/User:"+clickedUser.name) },
        "View user page",
        false,
        false,
        menuSVGs.person
    );
        
    new MenuItem(
        "nickname",
        function() { nickSaver(clickedUser.name) },
        "Change nickname",
        false,
        false,
        menuSVGs.pencil
    );
        
    new MenuItem(
        "blockUnderage",
        function() { blockUserIndefinite(clickedUser.name,"User under 13") },
        "Block underage user",
        true,
        true,
        menuSVGs.cross
    );
    
    new MenuItem(
        "blockAlt",
        function() { blockUserIndefinite(clickedUser.name,"Alternate account of a banned user") },
        "Block alternate account",
        true,
        true,
        menuSVGs.cross
    );
}

/* Other ideas for menu buttons: 
- pull Twitter etc link off userpage and link that?
- mute/ignore button
- invite to a game
- Mod-only: warn
*/

customList = function(e) {
    clickedUser = e;
    for (var keys in customActions) {
        action = customActions[keys];
		
		if(action.display()) {
			// Regular actions for everybody!!
			if(action.admin == false && action.mod == false) {
				$(".regular-actions").append($(action.html()));
			
			// Admin actions for admins only!!
			} else if (action.admin == true && !isAdmin(clickedUser.name) && isAdmin(wgUserName)) {
				$(".admin-actions").append($(action.html()));
			
			// Mods deserve rights too!
			}  else if (action.mod == true && !isModerator(clickedUser.name) && isModerator(wgUserName)) {
				$(".admin-actions").append($(action.html()));
			}
		}
    }
    
    // Stops overflow when the menu is super low down on the screen for whatever reason (tiny window size maybe lol)
    if(parseInt($("#UserStatsMenu").css('top')) + $("#UserStatsMenu").outerHeight() > $(window).height()) {
        $("#UserStatsMenu").css('top',$(window).height() - $("#UserStatsMenu").outerHeight() - 12);
    }
}

/* =======================================

TYPING INDICATOR
@typing
Basically entirely created by Dorumin

======================================  */

// Dorumin's typing script frmo https://dev.wikia.com/wiki/IsTyping
// Modified to fit in with our options and nicknames and et cetera

var lastRequestTimestamp = 0,

i18n = { // i18n, add your translations here
    en: {
        1: '$1 is typing...',
        2: '$1 and $2 are typing...',
        3: '$1, $2, and $3 are typing...',
        more: 'Several people are typing...'
    },
    be: {
        1: '$1 друкуе...',
        2: '$1 і $2 друкуюць...',
        3: '$1, $2, і $3 друкуюць...',
        more: 'Некалькі чалавек друкуюць...'
    },
    de: {
        1: '$1 schreibt...',
        2: '$1 und $2 schreiben...',
        3: '$1, $2 und $3 schreiben...',
        more: 'Mehrere Personen schreiben...'
    },
    es: {
        1: '$1 está escribiendo..',
        2: '$1 y $2 estan escribiendo...',
        3: '$1, $2 y $3 estan escribiendo...',
        more: 'Varias personas estan escribiendo...'
    },
    fr: {
        1: '$1 est en train d\'écrire...',
        2: '$1 et $2 sont en train d\'écrire...',
        3: '$1, $2, et $3 sont en train d\'écrire...',
        more: 'Plusieurs personnes sont en train d\'écrire...'
    },
    pl: {
        1: '$1 pisze..',
        2: '$1 i $2 piszą...',
        3: '$1, $2 i $3 piszą...',
        more: 'Kilka osób pisze...'
    },
    'pt-br': {
        1: '$1 está digitando...',
        2: '$1 e $2 estão digitando...',
        3: '$1, $2 e $3 estão digitando...',
        more: 'Várias pessoas estão digitando...'
    },
    ru: {
        1: '$1 печатает...',
        2: '$1 и $2 печатают...',
        3: '$1, $2, и $3 печатают...',
        more: 'Несколько человек печатают...'
    },
    uk: {
        1: '$1 друкує...',
        2: '$1 та $2 друкують...',
        3: '$1, $2, та $3 друкують...',
        more: 'Декілька людей друкують...'
    },
    zh: {
        1: '$1正在输入...',
        2: '$1與$2正在输入...',
        3: '$1、$2、與$3正在输入...',
        more: '有许多人正在输入...'
    },
    'zh-hant': {
        1: '$1正在輸入...',
        2: '$1與$2正在輸入...',
        3: '$1、$2、與$3正在輸入...',
        more: '有許多人正在輸入...'
    }
}; // You probably shouldn't edit after this if you don't know what you're doing
i18n.msg = function(msg, arr) {
    var lang = i18n[mw.config.get('wgUserLanguage')] || i18n[mw.config.get('wgContentLanguage')] || i18n.en;
    if (!lang[msg]) return 'N/A';
    return lang[msg].replace(/\$(\d)/g, function(x, n) {
        return '<span class="username">' + mw.html.escape(arr[n - 1]) + '</span>';
    });
};
currentState = false
	
// Get the room object for the active room
function getCurrentRoom() {
	if (mainRoom.activeRoom == 'main' || mainRoom.activeRoom === null) {
		return mainRoom;
	}
	return mainRoom.chats.privates[mainRoom.activeRoom];
}

function sendTypingState(state) {
	if (ChatOptions.savable.typingSuppressor) { return; }
	currentState = state;
	getCurrentRoom().socket.send(new models.SetStatusCommand({
			statusMessage: "typingState",
			statusState: state
		}).xport());
}

// Update the typing indicator
function showUsersTyping(id, user, status) {
	if (ChatOptions.savable.hideTypingBar) { return; }
	if (!IsTyping.data[id]) {
		IsTyping.data[id] = [];
		IsTyping.data[id].timeouts = {};
	}
	var pointer = IsTyping.data[id],
	curRoom = getCurrentRoom(),
	$body = $(document.body);
	if (user) {
		if (status === true) {
			if (pointer.timeouts[user]) {
				clearTimeout(pointer.timeouts[user]);
			}
			pointer.timeouts[user] = setTimeout(function () {
					var i = pointer.indexOf(user);
					pointer.splice(i, 1);
					showUsersTyping(id);
					delete pointer.timeouts[user];
				}, 10000);
			if (pointer.indexOf(user) == -1) {
				pointer.push(user);
			}
		} else {
			var i = pointer.indexOf(user);
			pointer.splice(i, 1);
			delete pointer.timeouts[user];
		}
	}
	if (curRoom.roomId != id)
		return; // No need to update; the change was for another room
	var hasIndicator = $body.hasClass('is-typing'),
	div = curRoom.viewDiscussion.chatDiv.get(0);
	if (!pointer.length) {
		$body.removeClass('is-typing');
		IsTyping.$indicator.html('');
		if (
			IsTyping.doScroll &&
			hasIndicator &&
			div.scrollHeight - div.clientHeight != div.scrollTop) {
			div.scrollTop -= 20;
		}
	} else {
		$body.addClass('is-typing');
		IsTyping.$indicator.html(i18n.msg(pointer.length > 3 ? 'more' : pointer.length, pointer));
		if (IsTyping.doScroll && !hasIndicator) {
			div.scrollTop += 20;
		}
	}
}

isTypingInit = function() {
    // Bind your typing to the socket requests
    $(document.getElementsByName('message')).keydown(function(e) {
        var that = this,
            oldVal = this.value;
        setTimeout(function() {
            if (oldVal != that.value && !that.value) {
                lastRequestTimestamp = 0;
                sendTypingState(false);
                return;
            }
            if (oldVal != that.value && Date.now() - lastRequestTimestamp > 8000) { // if more than 8 seconds have passed
                lastRequestTimestamp = Date.now();
                sendTypingState(true);
            }
        }, 0);
    }).blur(function() {
        lastRequestTimestamp = 0;
        sendTypingState(false);
    });

    // Update the typing list when you switch rooms accordingly
    $(document).click('#PrivateChatList .User, #Rail .wordmark', function() {
        showUsersTyping(mainRoom.activeRoom == 'main' || mainRoom.activeRoom === null ? mainRoom.roomId : mainRoom.activeRoom);
    });

    // Bind socket updates to showUsersTyping
    mainRoom.socket.on("updateUser", function(msg) {
        var data = JSON.parse(msg.data).attrs,
            status = data.statusState,
            user = data.name,
            roomId = this.roomId;
        if (user != wgUserName && data.statusMessage == "typingState") {
            showUsersTyping(roomId, user, status);
        }
    });

    // Now for private messages!
    mainRoom.model.privateUsers.bind('add', function(u) {
        var privateRoomId = u.attributes.roomId,
            privateRoom = mainRoom.chats.privates[privateRoomId];
        privateRoom.socket.on("updateUser", function(msg) {
            var data = JSON.parse(msg.data).attrs,
                status = data.statusState,
                user = data.name,
                roomId = this.roomId;
            if (user != wgUserName && data.statusMessage == "typingState") {
                showUsersTyping(roomId, user, status);
            }
        });
    });

    // Declare a global variable for debugging
    window.IsTyping = $.extend({
        sendTypingState: sendTypingState,
        showUsersTyping: showUsersTyping,
        getCurrentRoom: getCurrentRoom,
        $indicator: (window.IsTyping && IsTyping.$indicator) || $('<div>', {
            class: 'typing-indicator'
        }).prependTo('#Write'),
        data: {},
        doScroll: true
    }, window.IsTyping);

    if (!IsTyping.noStyle) {
        // Add the css that makes it all look nice
        mw.util.addCSS('body.is-typing .Chat {  \
            margin-bottom: 20px;                \
        }                                       \
        body.is-typing .typing-indicator {      \
            display: block;                     \
        }                                       \
        .typing-indicator {                     \
            display: none;                      \
            position: absolute;                 \
            left: 5px;                          \
            top: -25px;                         \
            right: 5px;                         \
            line-height: 25px;                  \
        }                                       \
        .typing-indicator .username {           \
            font-weight: bold;                  \
        }                                       \
        body.warn .typing-indicator {           \
            top: -45px;                         \
        }');
    }
};



/* =======================================

INITIALIZATION ZONE
@initialization
This is where you add your init funcitons for each script.

======================================  */

// Here's where you put scripts which run when each new message comes in.
loadAfterAddScripts = function(e) {
    pingUser(e); // pings
    censor(e); // censor
    timestamp(e); // seconds timestamps
    nickParse(e); // Nicknames
    avatarDisplay(e); // Avatar display
    imageDisplay.parse(e); // Image display
}

// Here's where you put everything else
loadNormalScripts = function() {
    chatTopic(); // chat header
    loadChatroomID(); // minor thing to save time
    StyleSwitcher.loadApp(); // style switcher
    commands(); // sidebar console
    ChatGame.loadPlugin(); // chatgame (note must come after sidebar console)
    ChatOptions.init(); // chat options
    chatags.init() // chattags
    nickInit(); // Nicknames
    menuInit();
    isTypingInit();
}

// Here's where you put scripts which run when you get a new private message
loadPMscripts = function(e) {
    pmPingUser(e);
}

// Here's where we put scripts which run when you open the menu. Probs will only ever be this one
loadMenuOpenScripts = function(e) {
    customList(e);
}

loadSidebarModifyScripts = function(e) {
    displaySidebarSelf();
    sidebarModify(); // stupid name
}

/* =======================================

LOADER ZONE
@backend @loader
Don't touch anything in here else it'll break

======================================  */

// Time to load everything in (thx to ozu for this snippet)
var loader = setInterval(function() {
    if (typeof mainRoom !== "undefined") {
        mainRoom.model.chats.bind("afteradd", function(e) {
            loadAfterAddScripts(e);
        });
        loadNormalScripts();
        // Credit to Dorumin for this bit
        mainRoom.model.privateUsers.bind('add', function(u) {
            var privateRoomId = u.attributes.roomId;
            var privateRoom = mainRoom.chats.privates[privateRoomId];
            privateRoom.model.chats.bind('afteradd', function(e) {
                loadPMscripts(e);
            });
        });
        mainRoom.viewUsers.bind('mainListClick',function(e) { 
            loadMenuOpenScripts(e);
        });
        mainRoom.model.users.bind("add", function(e) {
            loadSidebarModifyScripts();
        });
        mainRoom.model.users.bind("remove", function(e) {
            loadSidebarModifyScripts();
        });
        clearInterval(loader);
    }
}, 200);

// We use a seperate loader for the CWM because it doesn't necessarily spawn at the same time as mainRoom.
var cwmLoader = setInterval(function() {
    if (typeof $(".Chat > ul > .inline-alert")[0] !== "undefined") {
        welcomeMessage = $(".Chat > ul > .inline-alert")[0]; // Selects the first inline alert.
        $(welcomeMessage).html(preHTML + mw.html.escape(cWelMsg) + postHTML);
        clearInterval(cwmLoader);
    }
}, 50);