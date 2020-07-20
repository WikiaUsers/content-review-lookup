// Variable definitions
var chatIsLoaded = false; // whether the chat is loaded or not
var cwmLoaded = false;
 
// The following block of code loads us our own Chat Welcome Message. 
// If it freaks out for whatever reason, it'll give us a default.
cWelMsg = "";
try {
    //We're gonna grab the Chat Welcome Message contents
    cWelMsg = $.ajax({
        url: '//ru.terraria.wikia.com/api.php?action=query&prop=revisions&titles=MediaWiki%3AChat-welcome-message&rvlimit=1&rvprop=content&format=jsonfm',
        data: {
            format: 'json'
        },
        dataType: 'jsonp',
        async: false,
    }).responseText;
    cWelMsg = JSON.parse(cWelMsg.slice(cWelMsg.indexOf("query")-2,-1)).query.pages["86269"].revisions[0]["*"];
}
catch(err) {
    console.error("Unable to load the CWM. Using default.");
    cWelMsg = "Добро пожаловать в чат Террария вики!";
}
 
// Custom inline alerts
function inlineAlert(msg) {
    mainRoom.model.chats.add(new models.InlineAlert({text:msg}));
    $('[name="message"]').val('').removeAttr('disabled').focus();  
}
 
// Function for message input
$('[name="message"]').keypress(function(e) {
    if (e.which == 13 && !e.shiftKey) {
 
        var message = this.value;
 
        // Stop posting of whitespace
        if (!message.trim()) {
            e.preventDefault();
            $('[name="message"]').val('').removeAttr('disabled').focus();  
        }
        // Prevent other wiki chats being linked in main chat
        if (/[\/[:]Special:Chat/i.test(message) && mainRoom.active === true) {
            e.preventDefault();
            inlineAlert('Вы не можете постить ссылки на другие вики-чаты в основном канале.');
        }
        if (/[\/[:]Служебная:Chat/i.test(message) && mainRoom.active === true) {
            e.preventDefault();
            inlineAlert('Вы не можете постить ссылки на другие вики-чаты в основном канале.');
        }
        if (/[\/[:]%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:Chat/i.test(message) && mainRoom.active === true) {
            e.preventDefault();
            inlineAlert('Вы не можете постить ссылки на другие вики-чаты в основном канале.');
        }
         if (/[\/[:]%D0%A1%D0%BF%D0%B5%D1%86%D1%96%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0:Chat/i.test(message) && mainRoom.active === true) {
            e.preventDefault();
            inlineAlert('Вы не можете постить ссылки на другие вики-чаты в основном канале.');
        }
        if (/[\/[:]Спеціальна:Chat/i.test(message) && mainRoom.active === true) {
            e.preventDefault();
            inlineAlert('Вы не можете постить ссылки на другие вики-чаты в основном канале.');
        }
        

    }
});
 
/* Custom links */
CustomLinks = {};
 
// Links
CustomLinks.commons = 'http://commons.wikimedia.org/wiki/';
CustomLinks.wikimedia = 'http://wikimediafoundation.org/wiki/';
CustomLinks.wikipedia = 'http://en.wikipedia.org/wiki/';
CustomLinks.ruwikipedia = 'http://ru.wikipedia.org/wiki/';
CustomLinks.youtube = 'https://www.youtube.com/watch?v=';
CustomLinks.skype = 'skype:';
CustomLinks.steam = 'steam://';
CustomLinks.banlog = '/wiki/Special:Log/chatban?page=User:';
 
// Aliases
CustomLinks.mw = wgServer + '/wiki/MediaWiki:';
CustomLinks.wp = CustomLinks.wikipedia;
CustomLinks.ruwp = CustomLinks.ruwikipedia;
CustomLinks.yt = CustomLinks.youtube;
CustomLinks.en = 'http://terraria.wikia.com/wiki/';
CustomLinks.gp = 'http://terraria.gamepedia.com/';
CustomLinks.rugp = 'http://terraria-ru.gamepedia.com/';
 
// Detect new messages
var afterMessage = function(e) {
	$('#entry-' + e.cid).find('a[href]').each(function() {
        var actualLink = $(this).attr('href').slice((wgServer + '/wiki/').length);
        if (!CustomLinks.hasOwnProperty(actualLink.split(':')[0])) return;
        if (actualLink.split(':')[0] == 'skype') {
            actualLink = actualLink.replace(/%3F/g, '?');
        }
		var newLink = actualLink.replace(new RegExp('^(' + Object.keys(CustomLinks).join('|') + '):', 'i'), function(m) {
			var nonColon = m.slice(0, -1).toLowerCase();
			return CustomLinks[nonColon];
		});
		$(this).attr('href', newLink);
	});
};
 
/* ChatTags parsing on Private Messages */
setTimeout(function() {
    // This is for the custom links
    mainRoom.model.chats.bind('afteradd', afterMessage);
    mainRoom.model.privateUsers.bind('add', function(u) {
        mainRoom.chats.privates[u.attributes.roomId].model.chats.bind('afteradd', afterMessage);
    });
    // And this is for ChatTags
    mainRoom.model.privateUsers.bind('add', function(u) {
        var privateRoomId = u.attributes.roomId;
        var privateRoom = mainRoom.chats.privates[privateRoomId];
        privateRoom.model.chats.bind('afteradd', function(chat) {
            if (chat.attributes.isInlineAlert) return;
            var string = $("#Chat_" + privateRoomId + " .message:last").html();
            string = chatags.parser(string);
            $("#Chat_" + privateRoomId + " .message:last").html(string);
        });
    });
}, 5000);
 
/**************/
/*** Смайлы ***/
/**************/
// SpeedEmoticon.js
// Code: KORNiUX
// Additional help: Wildream, Set440, rutes community
// Hosted on "KORNiUX's HUGE SANDBOX WIKI"
importStylesheetURI('http://korniux.wikia.com/wiki/SpeedEmoticon/style.css?action=raw&ctype=text/css');
 
$('.ChatWindow .Write').append('<div id="SpeedEmoticon"><img src="https://images.wikia.nocookie.net/terraria/ru/images/d/d6/SkeletronPrimeEmoticon.png" style="border: none !important;"/></div>');
$('#SpeedEmoticon').append('<div id="poplist"></div>').mouseenter(function(){
		$('#poplist').css({				
				top: ($('#SpeedEmoticon').offset().top - $('#poplist').height() - 8),
				left: ($('#SpeedEmoticon').offset().left - $('#poplist').width() - 8)
			});
	});
$('#poplist').load('/wiki/MediaWiki:Emoticons?action=render', function(){
	$('#poplist img')	.click(function(){
		var txt = $(this).parent().children('ul').children('li:first-child').text().replace(/\s/g, ''),
			messg = $('.message textarea').val();
		$('.message textarea').val(messg + txt + ' ').focus();
	});
	$('#poplist div').attr('style', '');
	console.log('SpeedEmoticon v1.7');
});
/**************/

 
window.ChatStatus = {
	statuses: {
		"afk": "Нет на месте",
		"studies": "На учёбе",
		"work": "На работе",
		"donotdisturb": "Не беспокоить",
		"sleep": "Спит",
		"edit": "Редактирует",
		"game": "Играет",
		"food": "Ест",
		"book": "Читает",
		"code": "Программирует"
	},
	debug: false
};
 
var loadedTester = setInterval(function() {
   if(typeof mainRoom !== "undefined") {
       importScriptPage("MediaWiki:JacobsLadderSuite.js","d97"); // import the API
       setTimeout(function() {
			importArticles({
				type: "script",
				articles: [
				"w:c:d97:MediaWiki:TitleNotifications.js",
				"w:c:dev:MediaWiki:ChatObject/code.js",
				"w:c:dev:MediaWiki:ChatOptions/code.js",
				"w:c:dev:MediaWiki:PrivateMessageAlert/code.js",
				"w:c:dev:MediaWiki:ChatAnnouncements/code.js",
				"w:c:dev:MediaWiki:ChatStatus/code.js",
				"MediaWiki:Options.js",
				"MediaWiki:CustomChatTags.js",
				"MediaWiki:SpamLimit.js",
				"MediaWiki:Badwords.js"
				]});
            mainRoom.maxCharacterLimit = 5000; // custom max character limit
            $("#join-alert").remove();
            chatIsLoaded = true;
       },500);
       clearInterval(loadedTester);
       console.log("[CHAT.JS] Chat.js loading complete.");
   } 
},100);
 
var stylesheetsArray = [
    {name:"Style1",url:"http://ru.terraria.wikia.com/index.php?title=MediaWiki:Chat.css&action=raw&ctype=text/css",logo:"https://images.wikia.nocookie.net/terraria/ru/images/8/89/Wiki-wordmark.png"},
    {name:"Style2",url:"http://ru.terraria.wikia.com/index.php?title=MediaWiki:Chat.css&action=raw&ctype=text/css",logo:"https://images.wikia.nocookie.net/terraria/ru/images/8/89/Wiki-wordmark.png"}
];
 
StyleSwitcher = {
    VERSION: "3.0.3",
 
    circleType: "square",
    alignType: "right",
    loaded: false,
    defaultLogoUrl: "",
    normal: "",
    skinType: 0,
 
    report: function(styleIDtext) {
        if (styleIDtext != "default") {
            styleID = parseInt(styleIDtext, 10); //Gets the ID of the selected style
            $('#skinBackground').remove(); //Removes old style
            $('#ChatSkins').remove(); //Removes old style
            $('#ChatSkinsAdditional').remove(); //Removes old style
            $('#ChatSkinsTransparent').remove(); //Removes old style
            $('#HeaderLogo').remove(); //Removes old style
            StyleSwitcher.skinType = stylesheetsArray[styleID].name; //Sets page variable StyleSwitcher.skinType to the new skin
            $.cookie('StyleSwitcher.skinType', styleID, {
                expires: 5
            }); //Sets cookie StyleSwitcher.skinType to the new skin ID
 
            if (stylesheetsArray[styleID].clear === true) {
                $('head').append('<link href="http://d97.wikia.com/index.php?title=MediaWiki:ClearBase.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsTransparent"/>'); //Adds the clearBase CSS if required (for image-background skins)
            }
 
            $('head').append('<link href="' + stylesheetsArray[styleID].url + '" rel="stylesheet" type="text/css" id="ChatSkins"/>'); //Adds the new skin CSS
            if (stylesheetsArray[styleID].logo !== null) {
                $('#ChatHeader').append('<a href="' + wgServer + '" style="position:initial;color:#337800;" id="HeaderLogo" target="_blank"><img width="115" height="30" src="' + stylesheetsArray[styleID].logo + '" id="HeaderLogoImg" style="position: absolute;top: 4px;left: 3px;" />'); //If a logo is defined in the stylesheetArray, add it to the header.
            } else {
                $('#ChatHeader').append('<a href="' + wgServer + '" style="position:initial;color:#337800;" id="HeaderLogo" target="_blank"><img width="115" height="30" src="' + StyleSwitcher.normalLogoUrl + '" id="HeaderLogoImg" style="position: absolute;top: 4px;left: 3px;" />'); //If a logo is not defined in the stylesheetArray, use the default.
            }
        } else {
            styleID = parseInt(defaultSkin, 10); //Gets the ID of the default skin
            $('#skinBackground').remove(); //Removes old style
            $('#ChatSkins').remove(); //Removes old style
            $('#ChatSkinsAdditional').remove(); //Removes old style
            $('#ChatSkinsTransparent').remove(); //Removes old style
            $('#HeaderLogo').remove(); //Removes old style
            StyleSwitcher.skinType = stylesheetsArray[styleID].name; //Sets page variable StyleSwitcher.skinType to the new skin
            $.cookie('StyleSwitcher.skinType', styleID, {
                expires: 5
            }); //Sets cookie StyleSwitcher.skinType to the new skin ID
 
            if (stylesheetsArray[styleID].clear === true) {
                $('head').append('<link href="http://d97.wikia.com/index.php?title=MediaWiki:ClearBase.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsTransparent"/>'); //Adds the clearBase CSS if required (for image-background skins)
            }
 
            $('head').append('<link href="' + stylesheetsArray[styleID].url + '" rel="stylesheet" type="text/css" id="ChatSkins"/>'); //Adds the new skin CSS
            if (stylesheetsArray[styleID].logo !== null) {
                $('#ChatHeader').append('<a href="' + wgServer + '" style="position:initial;color:#337800;" id="HeaderLogo" target="_blank"><img width="115" height="30" src="' + stylesheetsArray[styleID].logo + '" id="HeaderLogoImg" style="position: absolute;top: 4px;left: 3px;" />'); //If a logo is defined in the stylesheetArray, add it to the header.
            } else {
                $('#ChatHeader').append('<a href="' + wgServer + '" style="position:initial;color:#337800;" id="HeaderLogo" target="_blank"><img width="115" height="30" src="' + StyleSwitcher.normalLogoUrl + '" id="HeaderLogoImg" style="position: absolute;top: 4px;left: 3px;" />'); //If a logo is not defined in the stylesheetArray, use the default.
            }
        }
    },
 
    circleToggle: function() {
        if (StyleSwitcher.circleType == "circle") {
            $('#ChatSkinsCircle').remove();
            $.cookie('StyleSwitcher.circleType', 'square', {
                expires: 5
            });
            StyleSwitcher.circleType = "square";
            $("a.circle-button").text("Круги");
        } else {
            $('head').append('<link href="http://d97.wikia.com/index.php?title=MediaWiki:Round.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsCircle"/>');
            $.cookie('StyleSwitcher.circleType', 'circle', {
                expires: 5
            });
            StyleSwitcher.circleType = "circle";
            $("a.circle-button").text("Углы");
        }
    },
 
    alignToggle: function() {
        if (StyleSwitcher.alignType == "left") {
            $('#ChatSkinsLeft').remove();
            $.cookie('StyleSwitcher.alignType', 'right', {
                expires: 5
            });
            StyleSwitcher.alignType = "right";
            $("a.align-button").text("Слева");
        } else {
            $('head').append('<link href="http://d97.wikia.com/index.php?title=MediaWiki:LeftChat.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkinsLeft"/>');
            $.cookie('StyleSwitcher.alignType', 'left', {
                expires: 5
            });
            StyleSwitcher.alignType = "left";
            $("a.align-button").text("Справа");
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
            if (typeof StyleSwitcher.normal != "undefined") {
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
 
        if (!$(".stylechanger").length) {
            $('#sidebar-top').prepend('<table id="StyleButtons" style="margin-left:auto;margin-right:auto;width:95%;"><tr><td><div class="circles-div" onclick="StyleSwitcher.circleToggle()" style="text-align: center; cursor: pointer;"><a class="circle-button wikia-button" style="width:47px; border-top-left-radius: 10px; border-bottom-left-radius: 10px;"> Круги </a></div></td><td><div class="align-div" onclick="StyleSwitcher.alignToggle()" style="text-align: center; cursor: pointer;"><a class="align-button wikia-button" style="width:47px; border-bottom-right-radius: 10px; border-top-right-radius: 10px;"> Слева </a></div></td></tr></table>');
        }
 
        if (StyleSwitcher.loaded === false) {
            for (i = 0; i < stylesheetsArray.length; i++) {
                $(".stylechanger").append("<option value='" + String(i) + "'>" + stylesheetsArray[i].name + "</option>");
            }
            StyleSwitcher.loaded = true;
        }
 
        StyleSwitcher.report(StyleSwitcher.skinType);
        if ($.cookie("StyleSwitcher.alignType") == "left") {
            StyleSwitcher.alignToggle();
        }
 
        if ($.cookie("StyleSwitcher.circleType") == "circle") {
            StyleSwitcher.circleToggle();
        }
 
        console.log("[StyleSwitcher] StyleSwitcher "+ StyleSwitcher.VERSION +" loaded!");
    }
};
 
styleSwitcherTimeout = setInterval(function() {
    if($("#sidebar-top").length) {
        StyleSwitcher.loadApp();
        clearInterval(styleSwitcherTimeout);
    }
}, 1000);
 
var cwmLoader = setInterval(function() {
    if(typeof $(".Chat > ul > .inline-alert")[0] !== "undefined") {
        welcomeMessage = $(".Chat > ul > .inline-alert")[0]; // Selects the first inline alert.
        $(welcomeMessage).html('Добро пожаловать в чат Террария вики! Не забывайте про <a href=http://ru.terraria.wikia.com/wiki/%D0%A2%D0%B5%D1%80%D1%80%D0%B0%D1%80%D0%B8%D1%8F_%D0%B2%D0%B8%D0%BA%D0%B8:%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0>правила</a>, и будьте вежливы! ~<br>~ <a href=http://ru.terraria.wikia.com/wiki/%D0%A1%D0%B5%D1%80%D0%B2%D0%B5%D1%80%D1%8B#WikiaArticleComments>Здесь</a> вы можете поискать напарников, а <a href=http://ru.terraria.wikia.com/wiki/%D0%91%D0%B0%D1%80%D0%B0%D1%85%D0%BE%D0%BB%D0%BA%D0%B0#WikiaArticleComments>здесь</a> — поторговаться. ~<br>~ Все доступные смайлы можно посмотреть <a href=http://ru.terraria.wikia.com/wiki/MediaWiki:Emoticons>здесь</a>. ~<br>~ Также ознакомьтесь с командами чата <a href=http://ru.terraria.wikia.com/wiki/%D0%A2%D0%B5%D1%80%D1%80%D0%B0%D1%80%D0%B8%D1%8F_%D0%B2%D0%B8%D0%BA%D0%B8:%D0%A7%D0%B0%D1%82>здесь</a>.');
        clearInterval(cwmLoader);
        console.log("CWM loaded, tried to change it");
        cwmLoaded = true;
        mainRoom.model.chats.bind("afteradd", function() {
            appendTimestamps();
        });
    } else {
        console.log("CWM isn't loaded");
    }
},50);
 
function appendTimestamps() {
    if(cwmLoaded === true) {
        timer = new Date();
        hours = timer.getHours() % 12;
        if (hours === 0) { hours = 12; }
        minutes = timer.getMinutes();
        seconds = timer.getSeconds();
        if($("#entry-"+JLAPI.mostRecentMessage.cid()).hasClass('inline-alert')) {
            $("#entry-"+JLAPI.mostRecentMessage.cid()).append("<span class='time' style='font-weight: initial;'>"+hours+":"+padDigits(minutes,2)+":"+padDigits(seconds,2)+"</span>");
        } else {
            $("#entry-"+JLAPI.mostRecentMessage.cid()+" > span.time").html(hours+":"+padDigits(minutes,2)+":"+padDigits(seconds,2));
        }
    }
}
 
function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

(function(window, mediaWiki) {
	var document = window.document,
		data = {
			animations: []
		};
 
	function $(selector, find) {
		if (!selector) {
			return [];
		}
		if (selector.nodeType && selector.nodeName && find && typeof find == 'string') {
			return Array.prototype.slice.call(selector.querySelectorAll(find));
		} else if (selector.nodeType && selector.nodeName) {
			return [selector];
		}
		if (selector.match(/^#(?:[^\d\.\+\>\=\]\[\+\~\{\}])?(\w|[-_])+$/)) {
			selector = document.getElementById(selector.replace('#', ''));
			return [selector][0] && [selector] || [];
		} else if (selector.match(/^(?:[^\d\.\+\>\=\]\[\+\~\{\}])?([a-zA-Z]|[-_])+$/i)) {
			selector = document.getElementsByTagName(selector);
			return selector.length >= 1 && Array.prototype.slice.call(selector) || [];
		} else if (selector.match(/^\.(?:[^\d\.\+\>\=\]\[\+\~\{\}])?(\w|[-_])+$/)) {
			selector = document.getElementsByClassName(selector.replace('.', ''));
			return selector.length >= 1 && Array.prototype.slice.call(selector) || [];
		} else {
			selector = document.querySelectorAll(selector);
			return selector.length >= 1 && Array.prototype.slice.call(selector) || [];
		}
	}
 
	function serializeString() {
		var serialize = function() {
				var x = !x,
					string = '';
				for (var key in arguments[0]) {
					if (x) {
						string += '?' + key + '=' + arguments[0][key];
						x = !x;
						continue;
					}
					string += '&' + key + '=' + arguments[0][key];
				}
				return string;
			},
			string = '';
		if (!arguments[0] && !arguments[1]) {
			return window.decodeURIComponent(window.location.pathname);
		}
		if (!arguments[0] && arguments[1]) {
			return window.decodeURIComponent(window.location.pathname) + serialize(arguments[1]);
		}
		if (arguments[0] && !arguments[1]) {
			if (typeof arguments[0] == 'object') {
				return serialize(arguments[0]);
			}
			return arguments[0];
		}
		if (typeof arguments[0] == 'string' && typeof arguments[1] == 'object') {
			return arguments[0] + serialize(arguments[1]);
		}
	}
 
	function $ajax() {
		var xhr = new XMLHttpRequest(),
			options = (typeof arguments[0] == 'object' && arguments[0] !== null) && arguments[0] || {},
			query = serializeString(options.url || '', options.params),
			async = options.async === undefined ? true : options.async,
			type = options.type || 'GET',
			selector = options.selector || null,
			insert = $(options.insertTo || null),
			callback = typeof options.callback == 'function' && options.callback || !options.callback && typeof arguments[1] == 'function' && arguments[1] || function() {},
			extended = options.extended || {};
		xhr.timeout = options.timeout || 0;
		xhr.onload = function() {
			var responseText = xhr.responseText,
				status = xhr.status,
				html = [],
				container,
				_JSON = !!_JSON,
				called,
				i;
			try {
				_JSON = !_JSON;
				responseText = JSON.parse(responseText);
			} catch (e) {
				_JSON = !_JSON;
			}
			if (selector && Array.isArray(insert) && !_JSON) {
				container = document.createElement('div');
				container.innerHTML = responseText;
				html = $(container, selector);
				!insert[0] && callback.call(window, xhr, responseText, html);
				container = null;
				if (insert.length >= 1) {
					for (i = 0; i < insert.length; i++) {
						insert[i].innerHTML = html[0] && html[0].innerHTML;
						callback.call(insert[i], xhr, responseText, html[0] && html[0].innerHTML);
					}
				}
				called = !called;
			}!called && callback.call(window, xhr, responseText, null);
		};
		xhr.onerror = function() {
			callback.call(window, xhr, xhr.responseText, null);
		};
		xhr.onloadend = extended.onloadend == 'function' && extended.onloadend;
		xhr.open(type, query, async);
		xhr.send();
		return xhr;
	}
 
	function $extend(target) {
		if (!target) {
			return {};
		}
		var extend = (function() {
			var x = [];
			for (var i = 1; i < arguments[0].length; i++) {
				if (!arguments[0][i] || typeof arguments[0][i] == 'boolean') {
					continue;
				}
				x.push(arguments[0][i]);
			}
			return x;
		})(arguments);
		if (target instanceof Function || target instanceof Object && !(target instanceof Array)) {
			for (var i = 0; i < extend.length; i++) {
				if (extend[i] instanceof Function && extend[i].name) {
					target[extend[i].name] = extend[i];
					continue;
				}
				if (extend[i] instanceof Array) {
					continue;
				}
				for (var key in extend[i]) {
					target[key] = extend[i][key];
				}
			}
		}
		return target;
	}
 
	function $toggle() {
		var fns = [],
			target = arguments[0],
			fn = 0;
		for (var i = 1; i < arguments.length; i++) {
			if (typeof arguments[i] == 'function') {
				fns.push(arguments[i]);
			}
		}!$isEmptyArray(fns) && fns.length != 1 && target.addEventListener('click', function() {
			fns[fn].apply(this, arguments);
			fn++;
			fn = fn > fns.length - 1 ? 0 : fn;
		});
	}
 
	function $trigger(target, type) {
		var event = new CustomEvent(type);
		target.dispatchEvent(event);
	}
 
	function $next(element) {
		var next = element.nextSibling;
		if (!next) {
			return null;
		}
		if (next.nodeType != 1) {
			while (true) {
				next = next.nextSibling;
				if (!next || next.nodeType == 1) {
					break;
				}
			}
		}
		return next;
	}
 
	function $prev(element) {
		var prev = element.previousSibling;
		if (!prev) {
			return null;
		}
		if (prev.nodeType != 1) {
			while (true) {
				prev = prev.previousSibling;
				if (!prev || prev.nodeType == 1) {
					break;
				}
			}
		}
		return prev;
	}
 
	function $fadeOut(target, time, reject) {
		if (reject) {
			return false;
		}
		if (!target.nodeType || !target.nodeName || window.getComputedStyle(target, null).display == 'none' || !!(~data.animations.indexOf(target))) {
			if (!!(~data.animations.indexOf(target))) {
				var interval = window.setInterval(function() {
					if (!(~data.animations.indexOf(target))) {
						$fadeOut(target, time, true);
						window.clearInterval(interval);
					}
				}, 34);
			}
			return;
		}
		time = time && typeof time == 'number' && time > 0 && time != Infinity ? time : typeof time !== 'string' ? 1000 : !window.isNaN(time) ? +time : 1000;
		data.animations.push(target);
		target.style.animation = 'fadeOut ' + (time / 1000) + 's ' + 'linear 0s forwards';
		window.setTimeout(function() {
			target.style.animation = null;
			target.style.display = 'none';
			data.animations.splice(data.animations.indexOf(target));
		}, time);
	}
 
	function $fadeIn(target, time, display, reject) {
		if (reject) {
			return false;
		}
		if (!target.nodeType || !target.nodeName || window.getComputedStyle(target, null).display != 'none' || !!(~data.animations.indexOf(target))) {
			if (!!(~data.animations.indexOf(target))) {
				var interval = window.setInterval(function() {
					if (!(~data.animations.indexOf(target))) {
						$fadeIn(target, time, display, true);
						window.clearInterval(interval);
					}
				}, 34);
			}
			return;
		}
		data.animations.push(target);
		target.style.animation = 'fadeIn ' + (time / 1000) + 's ' + 'linear 0s';
		target.style.display = display && typeof display == 'string' && display || 'block';
		window.setTimeout(function() {
			target.style.animation = null;
			data.animations.splice(data.animations.indexOf(target));
		}, time);
	}
 
	function $closest(element, target) {
		while (element) {
			if (element.webkitMatchesSelector && element.webkitMatchesSelector(target) || element.matches && element.matches(target) && element != element) {
				return element;
			} else {
				element = element.parentElement;
			}
		}
		return null;
	}
 
	function $remove(target) {
		var parent;
		if (target.nodeType || target.nodeName) {
			if (target.remove) {
				target.remove();
			} else {
				parent = target.parentNode;
				parent && parent.removeChild(target);
			}
			return;
		}
		target = $(target)[0];
		parent = target.parentElement;
		parent.removeChild(target);
	}
 
	function $isEmptyArray(array) {
		for (var i = 0; i < array.length; i++) {
			return false;
		}
		return true;
	}
 
	function $isEmptyObject(object) {
		if (object instanceof Array) {
			return $isEmptyArray(object);
		}
		for (var key in object) {
			return false;
		}
		return true;
	}
	//Последнее обновление функций от 16/12/2016; Last fn. update 15/12/2016;
	function warframe() {
		this.init = function() {
			this.loaded = {};
			this.auto();
			this.tags();
			this.smiles();
		};
	}
	warframe.prototype = {
		fn: {
			$ajax: $ajax,
			$: $,
			$toggle: $toggle,
			serializeString: serializeString,
			$prev: $prev,
			$next: $next,
			$fadeOut: $fadeOut,
			$fadeIn: $fadeIn,
			$trigger: $trigger,
			$remove: $remove,
			$isEmptyArray: $isEmptyArray,
			$isEmptyObject: $isEmptyObject,
			$extend: $extend,
			$closest: $closest
		},
		modalWindow: function(content, append, callback) {
			if (typeof arguments[0] == 'string') {
				switch (arguments[0].toLowerCase()) {
					case 'delete':
					case 'close':
					case 'remove':
						{
							$('.modalWindowWrapper').forEach(function() {
								$remove(arguments[0]);
							});
						}
						break;
					case 'hide':
						{
							$('.modalWindowWrapper').forEach(function() {
								arguments[0].style.display = 'none';
							});
						}
						break;
					default:
						{
							alert('Неверное значение:' + arguments[0]);
						}
				}
				return;
			}
			append = append || false;
			content = content || {};
			var _ = this,
				actions = function(event) {
					var target = event.target;
					if (target.getAttribute('data-modal') == 'close' || target.getAttribute('data-modal') == 'wrapper') {
						event.preventDefault();
						_.modalWindow('close');
					}
				},
				html = '<div data-modal="wrapper" ' + (content.id && 'id="' + content.id + '"') + ' class="modalWindowWrapper"><div class="modalWindow"><header><a data-modal="close" class="closeModalWindow"></a><h3>' + (content.title || '') + '</h3></header><section class="WikiaArticle">' + (content.section || '') + '</section><footer>' + (content.footer || '') + '</footer></div></div>';
			document.body.insertAdjacentHTML('beforeend', html);
			this.loaded.modalWindow = {
				active: true
			};
			if (!content.footer) {
				$('.modalWindow > footer').forEach(function() {
					$remove(arguments[0]);
				});
			}
			$('.modalWindowWrapper')[0].addEventListener('click', function() {
				actions.apply(this, arguments);
			});
			if (append) {
				$('.modalWindowWrapper')[0].style.display = 'flex';
			}
			if (callback && typeof callback == 'function') {
				callback();
			}
			if (!this.loaded.modalWindow.loaded) {
				this.loaded.modalWindow.loaded = true;
			}
		},
		globalHandler: function(event, target) {
			if (event.type == 'click') {
				var action = target.getAttribute('data-action');
				switch (action) {
					case 'reload':
						{
							window.location.reload();
						}
						break;
					case 'ajax_blocks':
						{
							this.ajaxBlocks();
						}
						break;
					case 'ignore':
						{
							this.ignore();
						}
						break;
					case 'tags':
						{
							this.tags_i();
						}
				}
			}
			if (event.type == 'keydown') {
				if (target.nodeName == 'TEXTAREA' && event.which == 13 && target.getAttribute('name') == 'message' && (target.value.match(/^\s*$/g) || target.value.match(/^\n*$/) || target.value.match(/(&nbsp(;)?){1,}/g))) {
					target.value = null;
					event.preventDefault();
					return;
				}
				this.filter(event, target);
			}
		},
		auto: function() {
			var _ = this;
			$('#WikiaPage')[0].insertAdjacentHTML('beforeend', '<div id="chat-actions-wrapper" class="chat-actions-wrapper fa fa-chevron-up"><div id="chat-actions" class="chat-actions"><ul><li data-action="ignore">Игнорировать</li><li data-action="reload">Обновить</li><li data-action="tags">Теги</li><li data-action="ajax_blocks">Блокировки</li></ul></div></div>');
			$ajax({
				url: '/index.php',
				params: {
					title: 'MediaWiki:Emoticons',
					action: 'render'
				},
				selector: 'div',
				callback: function(xhr, html, elements) {
					elements[0] && elements.forEach(function(element) {
						element.removeAttribute('style');
						$('#smiles-list')[0].insertAdjacentHTML('beforeend', element.outerHTML);
					});
				}
			});
			document.body.addEventListener('click', function(event) {
				_.globalHandler.call(_, event, event.target);
			});
			document.body.addEventListener('keydown', function(event) {
				_.globalHandler.call(_, event, event.target);
			});
			document.head.appendChild(document.createElement('style'));
			var ignored = JSON.parse(window.localStorage.getItem('warframe-wiki-chat')) || [],
				css = document.styleSheets[document.styleSheets.length - 1];
			for (var i = 0; i < ignored.length; i++) {
				css.insertRule('#Chat_' + window.mainRoom.roomId + ' li[data-user="' + ignored[i] + '"] { display: none !important; opacity: 0 !important; visibility: hidden !important; }', css.cssRules.length);
			}
		},
		ajaxBlocks: function() {
			var params = {
					url: '/index.php',
					params: {
						action: 'ajax',
						rs: 'ChatAjax',
						method: 'getPrivateBlocks'
					}
				},
				elements = {},
				change = {
					by: function() {
						if (this.classList.contains('selected')) {
							return;
						}
						this.classList.add('selected');
						elements.blockedByMeButton.classList.remove('selected');
						elements.blockedByList.innerHTML = null;
						elements.blockedByMeList.style.display = 'none';
						elements.blockedByList.style.display = 'block';
						elements.footerText.innerHTML = 'Список участников, заблокировавших ваши личные сообщения';
						$ajax(params, function(xhr, data) {
							for (var i = 0; i < data.blockedByChatUsers.length; i++) {
								elements.blockedByList.insertAdjacentHTML('beforeend', '<li><span data-name="' + data.blockedByChatUsers[i] + '">' + data.blockedByChatUsers[i] + '</span></li>');
							}
						});
					},
					me: function() {
						if (this.classList.contains('selected')) {
							return;
						}
						this.classList.add('selected');
						elements.blockedByButton.classList.remove('selected');
						elements.blockedByMeList.innerHTML = null;
						elements.blockedByList.style.display = 'none';
						elements.blockedByMeList.style.display = 'block';
						elements.footerText.innerHTML = 'Список участников, личные сообщения которых вы заблокировали';
						$ajax(params, function(xhr, data) {
							for (var i = 0; i < data.blockedChatUsers.length; i++) {
								elements.blockedByMeList.insertAdjacentHTML('beforeend', '<li><span data-name="' + data.blockedChatUsers[i] + '">' + data.blockedChatUsers[i] + '</span></li>');
							}
						});
					}
				};
			this.modalWindow({
				id: 'ajaxBlocksModal',
				title: 'Блокировки личных сообщений',
				section: '<ul data-section="blocked_by"></ul><ul data-section="blocked"></ul>',
				footer: '<span data-footer="text">Список участников, заблокировавших ваши личные сообщения</span><div data-footer="ajxbb-wrapper"><span class="fa fa-ban" data-footer="blocked"></span><span data-footer="blocked_by" class="selected fa fa-eye-slash"></span></div>'
			}, true, function() {
				$extend(elements, {
					blockedByButton: $('#ajaxBlocksModal span[data-footer="blocked_by"]')[0],
					blockedByMeButton: $('#ajaxBlocksModal span[data-footer="blocked"]')[0],
					footerText: $('#ajaxBlocksModal span[data-footer="text"]')[0],
					blockedByList: $('#ajaxBlocksModal ul[data-section="blocked_by"]')[0],
					blockedByMeList: $('#ajaxBlocksModal  ul[data-section="blocked"]')[0]
				});
				elements.blockedByButton.addEventListener('click', function(event) {
					change.by.call(this, event);
				});
				elements.blockedByMeButton.addEventListener('click', function(event) {
					change.me.call(this, event);
				});
				$ajax(params, function(xhr, data) {
					for (var i = 0; i < data.blockedByChatUsers.length; i++) {
						elements.blockedByList.insertAdjacentHTML('beforeend', '<li><span data-name="' + data.blockedByChatUsers[i] + '">' + data.blockedByChatUsers[i] + '</span></li>');
					}
				});
			});
		},
		tags_i: function() {
			var _ = this;
			if (this.loaded.tags_i) {
				this.modalWindow({
					id: 'ajaxTagsModal',
					title: 'Теги',
					section: _.loaded.tags_i
				}, true);
				return;
			}
			this.modalWindow({
				id: 'ajaxTagsModal',
				title: 'Теги',
				section: '<div id="ajax-onload" style="position: static;"><div><img src="//images.wikia.com/warframe/ru/images/0/05/Ajax.gif"><br><span>Идёт загрузка...</span></div></div>'
			}, true, function() {
				$ajax({
					url: '/index.php',
					params: {
						title: 'Террария_вики:Чат/Теги',
						action: 'render'
					},
					selector: '#ajax-load',
					callback: function(xhr, data, elements) {
						_.loaded.tags_i = elements[0].innerHTML;
						$fadeOut($('#ajax-onload')[0], 300);
						$remove($('#ajax-onload')[0]);
						$('#ajaxTagsModal section')[0].innerHTML = elements[0].innerHTML;
					}
				});
			});
		},
		ignore: function(call) {
			var css = document.styleSheets[document.styleSheets.length - 1],
				_ = this,
				item = 'warframe-wiki-chat',
				ignored = JSON.parse(window.localStorage.getItem(item)) || [],
				elements = {},
				change = {
					joined: function() {
						if (this.classList.contains('selected')) {
							return;
						}
						this.classList.add('selected');
						elements.modalTitle.innerHTML = 'Список участников в чате';
						elements.insertName.disabled = true;
						elements.insertName.focus();
						elements.ignoredButton.classList.remove('selected');
						elements.joinedList.innerHTML = null;
						elements.ignoredList.style.display = 'none';
						var blocked = JSON.parse(window.localStorage.getItem(item)) || [],
							joined = $('#WikiChatList > li');
						for (var i = 0; i < joined.length; i++) {
							if (!(~blocked.indexOf(joined[i].getAttribute('data-user'))) && joined[i].getAttribute('data-user') != mediaWiki.userName) {
								elements.joinedList.insertAdjacentHTML('beforeend', '<li><span data-name="' + joined[i].getAttribute('data-user') + '">' + joined[i].getAttribute('data-user') + '</span><span class="fa fa-plus" data-action="add"></span></li>');
							}
						}
						elements.joinedList.style.display = 'block';
					},
					ignored: function() {
						if (this.classList.contains('selected')) {
							return;
						}
						this.classList.add('selected');
						elements.modalTitle.innerHTML = 'Список игнорируемых';
						elements.insertName.disabled = false;
						elements.insertName.focus();
						elements.joinedButton.classList.remove('selected');
						elements.ignoredList.innerHTML = null;
						elements.joinedList.style.display = 'none';
						for (var i = 0; i < ignored.length; i++) {
							elements.ignoredList.insertAdjacentHTML('beforeend', '<li><span data-name="' + ignored[i] + '">' + ignored[i] + '</span><span class="fa fa-times" data-action="remove"></span></li>');
						}
						elements.ignoredList.style.display = 'block';
					}
				};
 
			function addUser(name) {
				if (!!(~ignored.indexOf(name)) || name.match(/["'&\\@]+/g)) {
					return false;
				}
				ignored = ignored.concat(name);
				css.insertRule('#Chat_' + window.mainRoom.roomId + ' li[data-user="' + name + '"] { display: none !important; opacity: 0 !important; visibility: hidden !important; }', css.cssRules.length);
				this.value && elements.ignoredList.insertAdjacentHTML('beforeend', '<li><span data-name="' + name + '">' + name + '</span><span class="fa fa-times" data-action="remove"></span></li>');
				window.localStorage.setItem(item, JSON.stringify(ignored));
				this.value && (this.value = null);
				return true;
			}
 
			function removeUser(name) {
				if (!(~ignored.indexOf(name))) {
					return false;
				}
				for (var i = 0; i < css.cssRules.length; i++) {
					if (new RegExp('li\\[data\\-user=("|\')' + name + '("|\')]$').test(css.cssRules[i].selectorText)) {
						css.deleteRule(i);
						ignored.splice(ignored.indexOf(name), 1);
						window.localStorage.setItem(item, JSON.stringify(ignored));
						return true;
					}
				}
			}
			this.modalWindow({
				id: 'ignoreModal',
				title: 'Список игнорируемых',
				section: '<ul data-section="ignored"></ul><ul data-section="joined"></ul><input data-section="insert_name" type="text" placeholder="Игнорировать" />',
				footer: '<span data-footer="text">Нажмите <b>Enter</b> для добавления участника в список.</span><div data-footer="ign-wrapper"><span class="fa fa-users" data-footer="joined"></span><span data-footer="ignored" class="fa fa-list selected"></span></div>'
			}, true, function() {
				$extend(elements, {
					ignoredButton: $('#ignoreModal span[data-footer="ignored"]')[0],
					joinedButton: $('#ignoreModal span[data-footer="joined"]')[0],
					ignoredList: $('#ignoreModal ul[data-section="ignored"]')[0],
					joinedList: $('#ignoreModal ul[data-section="joined"]')[0],
					insertName: $('#ignoreModal input[data-section="insert_name"]')[0],
					modalTitle: $('#ignoreModal header > h3')[0]
				});
				elements.insertName.focus();
				for (var i = 0; i < ignored.length; i++) {
					elements.ignoredList.insertAdjacentHTML('beforeend', '<li><span data-name="' + ignored[i] + '">' + ignored[i] + '</span><span class="fa fa-times" data-action="remove"></span></li>');
				}
				elements.joinedButton.addEventListener('click', function(event) {
					change.joined.call(this, event);
				});
				elements.ignoredButton.addEventListener('click', function(event) {
					change.ignored.call(this, event);
				});
				elements.insertName.addEventListener('keyup', function(event) {
					if (event.which == 13 && this.value.length && this.value != mediaWiki.userName && !(~ignored.indexOf(this.value))) {
						addUser.call(this, this.value);
					}
				});
				elements.ignoredList.addEventListener('click', function(event) {
					if (event.target.getAttribute('data-action') == 'remove') {
						removeUser.call(this, $prev(event.target).getAttribute('data-name')) && $remove($closest(event.target, 'li'));
					}
				});
				elements.joinedList.addEventListener('click', function(event) {
					if (event.target.getAttribute('data-action') == 'add') {
						addUser.call(this, $prev(event.target).getAttribute('data-name')) && $remove($closest(event.target, 'li'));
					}
				});
			});
		},
		tags: function() {
			var replacement = {
					img: [/\[(img|image)\]\s*<.+">/, '<img class="chatags-image" src="', /(\[\/(img|image)\]<\/a>|<\/a>\s*\[\/img\])/, '"></img>'],
					soundcloud: [/\[(soundcloud|sc)\]\s*?(&lt;|<).+"<a\s*?href="/gi, '<iframe class="chat-soundCloud" scrolling="no" frameborder="no" src="', /("\s*?(&gt;&lt;="").+\[\/(sc|soundcloud)\]<\/a>|"\s*&gt;&lt;.+<\/a>\s*?\[\/(sc|soundcloud)\])/gi, '">Отсутствует поддержка video</iframe>'],
				},
				room = $('#Chat_' + window.mainRoom.roomId)[0];
 
			function exec(content) {
				if (!content) {
					return '';
				}
				for (var key in replacement) {
					key == 'soundcloud' ? (content = content.replace('visual=true', 'visual=false').replace('auto_play=true', 'auto_play=false')) : false;
					content = content.replace(replacement[key][0], replacement[key][1]).replace(replacement[key][2], replacement[key][3]);
				}
				return content;
			}
			room.addEventListener('click', function fn(event) {
				if (event.target.className == 'chat-image' && (event.target.offsetWidth > 175 && event.target.offsetHeight > 175)) {
					window.open(event.target.getAttribute('src'));
				}
			});
			$(room, 'ul > li[data-user] > span.message').forEach(function(target) {
				target.innerHTML = exec(target.innerHTML);
			});
			var msgHtml;
			window.mainRoom.model.chats.bind('afteradd', function() {
				msgHtml = $(room, 'ul > li[data-user]:last-child > span.message')[0];
				msgHtml && (msgHtml.innerHTML = exec(msgHtml.innerHTML || ''));
			});
		},
		notificator: function() {
			var msgs = 0,
				onended = function() {
					$remove(this);
				};
			window.mainRoom.model.chats.bind('afteradd', function() {
				document.body.insertAdjacentHTML('beforeend', '<audio id="notification_' + (++msgs) + '" controls=""><source src="//images.wikia.com/warframe/ru/images/9/9d/Уведомление.ogg" type="audio/ogg; codecs=vorbis"></audio>');
				$('#notification_' + msgs)[0].onended = onended;
				$('#notification_' + msgs)[0].play();
			});
		}
	};
	document.addEventListener('DOMContentLoaded', function(event) {
		window.warframe = new warframe();
		window.warframe.init();
	});
})(this, {
	userName: window.mediaWiki.config.get('wgUserName')
});

var chatTopic = '<a href="/wiki/%D0%A2%D0%B5%D1%80%D1%80%D0%B0%D1%80%D0%B8%D1%8F_%D0%B2%D0%B8%D0%BA%D0%B8:%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0" style="text-decoration:none;" style="text-decoration:none;" target="_blank">Правила</a> <span style="color:#000;">•</span> <a href="/wiki/%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:RecentChanges" style="text-decoration:none;" style="text-decoration:none;" target="_blank">Свежие правки</a> <span style="color:#000;">•</span> <a href="/wiki/MediaWiki:Emoticons" style="text-decoration:none;" style="text-decoration:none;" target="_blank">Смайлики</a></font> <span style="color:#000;">•</span> <a href="/wiki/%D0%A2%D0%B5%D1%80%D1%80%D0%B0%D1%80%D0%B8%D1%8F_%D0%B2%D0%B8%D0%BA%D0%B8:%D0%A7%D0%B0%D1%82" style="text-decoration:none;" style="text-decoration:none;" target="_blank">Справка</a></font> <br /> <a href="/wiki/%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:MyPage" style="text-decoration:none;" style="text-decoration:none;" target="_blank">Профиль</a> <span style="color:#000;">•</span> <a href="/wiki/%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:Chat?action=purge" style="text-decoration:none;" style="text-decoration:none;" target="_blank">Обновить</a> <span style="color:#000;">•</span> <a href="http://81.177.142.164/" style="text-decoration:none;" style="text-decoration:none;" target="_blank">Логи</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; z-index: 0; position:absolute; font-size: 11px !important; margin-left: 25%; color:#3A3A3A; line-height: 80%; margin-top: 0.65% !important; padding-left: 60px; vertical-align: middle;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:none;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
/* 
* Custom Chat Pings
* Advanced chat pings with flexibility to customise various properties
* Includes blacklist for unwanted false positives
* Can also set to ping for alerts too (e.g. join/leave/ban)
* @author Ozank Cx
*/
 
$(function() {
 
if (mw.config.get('wgCanonicalSpecialPageName') !== "Chat") return;
 
var config = JSON.parse(localStorage.getItem('custom-chat-pings-config')) || {},
object,
objectText,
pingFinished,
formHTML = '\
<form method="" name="" class="WikiaForm "> \
	<fieldset> \
		<p>Mode: \
			<select id="select-pings-mode"> \
				<option value="0">Messages</option> \
				<option value="1">Alerts</option> \
				<option value="2">All</option> \
			</select> \
		</p> \
		<p>Audio: \
			<input style="width: 80%" type="text" id="text-pings-audio" placeholder="https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg"/> \
		</p> \
		<p>Color: \
			<input type="text" id="text-pings-color" placeholder="red"/> \
		</p> \
		<br/> \
		<p>For each field, seperate each entry with a <b>comma</b>. All entries are case insensitive.</p> \
		<br/> \
			<h2><span class="mw-headline">Messages</span></h2> \
				<h3><span class="mw-headline">List:</span></h3> \
					<input style="width: 80%" id="text-pings-messages-list"/> \
				<h3><span class="mw-headline">Blacklist:</span></h3> \
					<input style="width: 80%" id="text-pings-messages-blacklist"/> \
				<h3><span class="mw-headline">Ignored Users:</span></h3> \
					<input style="width: 80%" id="text-pings-messages-ignore"/> \
			<br/><br/> \
			<h2><span class="mw-headline">Alerts</span></h2> \
				<h3><span class="mw-headline">List:</span></h3> \
					<input style="width: 80%" id="text-pings-alerts-list"/> \
				<h3><span class="mw-headline">Blacklist:</span></h3> \
					<input style="width: 80%" id="text-pings-alerts-blacklist"/> \
			<p>To report bugs or suggestions, do so <a href="http://dev.wikia.com/wiki/Talk:CustomChatPings" target="_blank">here</a>.</p> \
	</fieldset> \
</form>',
self = {
		init: function() {
 
			//add audio object to page
			$('body').append('<span id="custom-ping-sound" style="display:none;"></span>');
 
			//add button for loading GUI
			$('#Write').append('<span style="position: absolute; top: 0px; right: 47px" class="button" id="btn-custom-ping">Pings</span>');
 
			//set event listener to load the GUI 
			$('#btn-custom-ping').click(function() { 
				self.loadGUI();
			});
 
			//start the chat event listener we'll be using
			//@param the child object being added
			mainRoom.model.chats.bind("afteradd", function (child) {
				//select child object
				object = $('#entry-' + child.cid);
 
				//set ping boolean to false
				pingFinished = false;
 
				if (config.messageList || config.alertList) {
					if (object.hasClass('inline-alert')) {
						if (config.mode != 0) {
							objectText = object.text().toLowerCase().trim();
							$.each(config.alertList.split(','), function(i,v) {
								$.each(config.alertBlacklist.split(','), function(i2,v2) {
									if (objectText.indexOf(v.toLowerCase()) !== -1 && (objectText.indexOf(v2.toLowerCase()) === -1 || !v2)) {
										self.processPing();
										if (pingFinished) return;
									}
								});
								if (pingFinished) return;
							});
						}
					}
					else if ($('div.User > span:nth-child(2)').text() !== object.attr('data-user')) {
						if (config.mode != 1) {
							objectText = object.children('.message').text().toLowerCase().trim();
							$.each(config.messageList.split(','), function(i,v) {
								$.each(config.messageBlacklist.split(','), function(i2,v2) {
									$.each(config.ignore.split(','), function(i3,v3) {
										if (objectText.indexOf(v.toLowerCase()) !== -1 && (objectText.indexOf(v2.toLowerCase()) === -1 || !v2) && (object.attr('data-user').toLowerCase().indexOf(v3.toLowerCase()) === -1 || !v3)) {
											self.processPing();
											if (pingFinished) return;
										}
									});
									if (pingFinished) return;
								});
								if (pingFinished) return;
							});
						}
					}
				}
			});
		},
		loadGUI: function() {
			$.showCustomModal('Custom Chat Pings', formHTML, {
				id: 'form-custom-ping',
				width: '30%',
				buttons: [{  
				    message: 'Cancel',
				    handler: function() {
						$('#form-custom-ping').closeModal();
				    }
				},  {
				    message: 'Reset',
				    defaultButton: true,
				    handler: function() {
						$.showCustomModal('Confirmation', 'Are you sure you want to reset the values?', {
							id: 'form-custom-ping-clear',
							width: '20%',
							buttons: [{  
								message: 'Yes',
								defaultButton: true,
								handler: function() {
									$('#select-pings-mode').val(0);
									$('#text-pings-audio,#text-pings-color,#text-pings-messages-list,#text-pings-messages-blacklist,#text-pings-messages-ignore,#text-pings-alerts-list,#text-pings-alerts-blacklist').val('');
									$('#form-custom-ping-clear').closeModal();
								}
							},  {
								message: 'No',
								defaultButton: true,
								handler: function() {
									$('#form-custom-ping-clear').closeModal();
								}
							}]
						});
				    }
				},  {
				    message: 'Update',
				    defaultButton: true,
				    handler: function() {
						config.mode = $('#select-pings-mode').val();
						config.audio = $('#text-pings-audio').val() || $('#text-pings-audio').attr('placeholder');
						config.color = $('#text-pings-color').val() || $('#text-pings-color').attr('placeholder');
						config.messageList = $('#text-pings-messages-list').val();
						config.messageBlacklist = $('#text-pings-messages-blacklist').val();
						config.ignore = $('#text-pings-messages-ignore').val();					
						config.alertList = $('#text-pings-alerts-list').val();
						config.alertBlacklist = $('#text-pings-alerts-blacklist').val();
 
						localStorage.setItem('custom-chat-pings-config', JSON.stringify(config));
						$('#form-custom-ping').closeModal();
				    }
				}]
			});
 
			//load stored values after GUI loads
			if (config.mode) $('#select-pings-mode').val(config.mode);
			if (config.audio) $('#text-pings-audio').val(config.audio);
			if (config.color) $('#text-pings-color').val(config.color);
			if (config.messageList) $('#text-pings-messages-list').val(config.messageList);
			if (config.messageBlacklist) $('#text-pings-messages-blacklist').val(config.messageBlacklist);
			if (config.ignore) $('#text-pings-messages-ignore').val(config.ignore);
			if (config.alertList) $('#text-pings-alerts-list').val(config.alertList);
			if (config.alertBlacklist) $('#text-pings-alerts-blacklist').val(config.alertBlacklist);			
		},
		processPing: function () {
			//change text color
			object.css('color', config.color);
 
			//play sound
			$('#custom-ping-sound').html('<audio src="' + config.audio + '" autoplay=""></audio>');
 
			//stop all loops
			pingFinished = true;		
		}
};
 
self.init();
 
});