//Версия 2.2
/* Бот. 
 * Создание:
 * Сибирский Смотритель (код) (ru) (en)
 * Annovy (фразы и код) (ru)
 * Бургерпентс (контент) (ru)
 * Mamvik (контент) (en)
 */
importScriptPage('MediaWiki:FutureSpreaderBot.js', 'ru.learnedit');

/**Русифицированные Опции.**/
//Спасибо Lordonio
function setCookie( cookie_name, data ) {
	var domain = wgServer.split("//")[1];
	document.cookie =
		cookie_name + "=" + data +
		"; max-age=" + 60*60*24*150 +
		"; path=/; domain=" + domain;
}
 

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
				$('<a id="multiKickerButton" class="wikia-button" href="javascript:showPopup()" style="position:absolute; right:55px; top:22px;">Multikick</a>').appendTo('.Write'); 
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
 

function openOptions() {

	var $optionsWindowHTML = $.showCustomModal( "Настройки", '<form method="" name="" class="WikiaForm "><fieldset><p style="font-size:120%; font-weight:bold; font-style:italic;">Выбор цвета</p><p style="font-size:80%;">Введите <a href="http://colorscheme.ru/html-colors.html" target="_blank">название цвета</a> или <a href="http://html-color-codes.info/Cvetovye-kody-HTML/" target="_blank">HEX Цвета</a><p>Фон Чата&nbsp;<input type="text" name="backgroundColourinput" id="backgroundColourinput" value="' + chatOptions.look.backgroundColor + '"/></p><br/><p>Цвет фона сообщений&nbsp;<input type="text" name="selfPostColourinput" id="selfPostColourinput" value="' + chatOptions.look.selfPostColor + '"/></p><br/><p>Окружение&nbsp;<input type="text" name="surroundColourinput" id="surroundColourinput" value="' + chatOptions.look.surroundColor + '"/></p><br/><p>Цвет Шрифта&nbsp;<input type="text" name="fontColourinput" id="fontColourinput" value="' + chatOptions.look.fontColor + '"/></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Шрифт</p><p>Семейство Шрифта <select id="fontList"><option value="arial" style="font-family:arial;">Arial</option><option value="courier new" style="font-family:courier new;">Courier new</option><option value="georgia" style="font-family:georgia;">Georgia</option><option value="palatino linotype" style="font-family:palatino linotype;">Palatino linotype</option><option value="Comic Sans MS" style="font-family:Comic Sans MS;">Comic sans</option><option value="tahoma" style="font-family:tahoma;">Tahoma</option><option value="Trebuchet MS" style="font-family:Trebuchet MS;">Trebuchet MS</option><option value="Verdana" style="font-family:Verdana;">Verdana</option><option value="Lucida Console" style="font-family:Lucida Console;">Lucida Console</option></select></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Функции</p><input type="checkbox" name="chatHacks" value="chatHacks" id="chatHacks"/> Включить <a href="http://dev.wikia.com/wiki/MediaWiki:ChatHacks.js" target="_blank">Чатхаки</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="multiPM" value="multiPM" id="multiPM"/> Включить <a href="http://cod.wikia.com/wiki/MediaWiki:Chat.js/multipms.js" target="_blank">Мульти ЛС</a><br/><input type="checkbox" name="tabComplete" value="tabComplete" id="tabComplete"/>Включить <a href="http://dev.wikia.com/wiki/MediaWiki:Tabinsert.js" target="_blank">поиск участников</a>&nbsp;&nbsp;&nbsp;<input type="checkbox" name="searchBar" value="searchBar" id="searchBar"/>Включить <a href="http://callofduty.wikia.com/wiki/MediaWiki:Chat.js/searchbar.js" target="_blank">поисковик</a><br/><input type="checkbox" name="multiKick" value="multiKick" id="multiKick" />Включить <a href="http://dev.wikia.com/wiki/MediaWiki:Multikick.js" target="_blank">Мульти Кик</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="ignoreURL" value="ignoreURL" id="ignoreURL"/>Игнорировать ссылки в главном чате<br /><input type="checkbox" name="stopSideScroll" value="stopSideScroll" id="stopSideScroll"/>Остановить полосу прокрутки после спама</fieldset></form>', {
		id: "optionsWindow",
	    width: 600,
	    buttons: [
		{
			id: "Закрыть",
		    message: "Закрыть",
		    handler: function () {
				cancelChanges();
		    }
		},
		{
			id: "Обновить!",
			defaultButton: true,
			message: "Обновить!",
			handler: function () {
				updateCookie();
		    }
	    }
		]
	});
	$(".close").click(cancelChanges);

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
 
	if (typeof window.customFonts !== "Отсутствует" && window.customFonts.length) {
		for (var i = 0; i < window.customFonts.length; i++) {
			var font = window.customFonts[i];
			$("#fontList").append('<option value="' + font+ '" style="font-family:' + font + ';">' + font.slice(0,1).toUpperCase() + font.slice(1) + '</option>');
		}
	}
	
	if (!wgUserGroups.indexOf("chatmoderator") && !wgUserGroups.indexOf("sysop") && !wgUserGroups.indexOf("staff") && !wgUserGroups.indexOf("helper") && !wgUserGroups.indexOf("vstf"))
		$("#multiKick").attr("disabled",true);
	if (wgServer !== "http://callofduty.wikia.com")
		$("#ignoreURL").attr("disabled",true);
 
	$("select option[value='" + chatOptions.look.fontFamily + "']").attr("selected","selected"); // sets the font selector to the one chosen currently
}
 

function cancelChanges() {
	var dialog = $('#optionsWindow');
	dialog.closeModal();
}
 

function updateCookie() {
	chatOptions.look.backgroundColor = $('#backgroundColourinput').val();
	chatOptions.look.fontColor = $('#fontColourinput').val();
	chatOptions.look.fontFamily = $('#fontList').val();
	chatOptions.look.surroundColor = $('#surroundColourinput').val();
     chatOptions.look.selfPostColor = $('#selfPostColourinput').val();
	for (var m in chatOptions.modules) {
		if ( chatOptions.modules.hasOwnProperty( m ) ) {
			var module = chatOptions.modules[m];
			if (typeof module.element != 'Отсутствует' && $(module.element).attr("checked")) {
				module.enabled = true;
			} else {
				module.enabled = false;
			}
		}
	}
 
	
	setCookie("customisation", chatOptions.look.backgroundColor + ", " + chatOptions.look.fontColor + ", " + chatOptions.modules.chatHacks.enabled + ", " + chatOptions.look.fontFamily + ", " + chatOptions.modules.tabComplete.enabled + ", " +  chatOptions.modules.multiKick.enabled + ", " + chatOptions.modules.multiPM.enabled + ", " + chatOptions.modules.searchBar.enabled + ", " + chatOptions.modules.ignoreURL.enabled + ", " + chatOptions.modules.stopSideScroll.enabled + ", " + chatOptions.look.surroundColor + ", " + chatOptions.look.selfPostColor);
	updateChatSkin();
	cancelChanges();
}
 
 

if (!$("#chatOptionsButton").length) {
	$('.Rail').prepend('<div id="chatOptionsButton" onclick="openOptions();" style="margin:auto; cursor: pointer; font-size:150%; bottom:4px; padding-bottom:2px; border-bottom: 1px solid #CCCCCC; width:90%;" align="center"><img src="' + chatOptions.look.modalIcon + '" width="18px"/>&nbsp;Опции</div>'); 
}
 
window.onload = updateChatSkin();

/* Смайлы. */
// SpeedEmoticon.js
// Code: KORNiUX
// Additional help: Wildream, Set440, rutes community
// Hosted on "KORNiUX's HUGE SANDBOX WIKI"
 
importStylesheetURI('http://korniux.wikia.com/wiki/SpeedEmoticon/style.css?action=raw&ctype=text/css');
 
$('.ChatWindow .Write').append('<div id="SpeedEmoticon"><img src="https://images.wikia.nocookie.net/central/images/a/ac/Emoticon_laughing.png" style="border: none !important;"/></div>');
$('#SpeedEmoticon').append('<div id="poplist"></div>').mouseenter(function(){
        $('#poplist').css({             
                top: ($('#SpeedEmoticon').offset().top - $('#poplist').height() - 8),
                left: ($('#SpeedEmoticon').offset().left - $('#poplist').width() - 8)
            });
    });
$('#poplist').load('/wiki/MediaWiki:Emoticons?action=render', function(){
    $('#SpeedEmoticon a').each(function() {
        $(this).after('<img src="' + $(this).attr('href') + '"/>');
        $(this).remove();
    });
    $('#poplist img').click(function(){
        var txt = $(this).parent().children('ul').children('li:first-child').text().replace(/\s/g, ''),
            messg = $('.message textarea').val();
        $('.message textarea').val(messg + txt + ' ').focus();
    });
    $('#poplist div').attr('style', '');
    console.log('SpeedEmoticon v1.7')
});

/*Профайл, Блоги */
$('WikiChatList').ready(function() {
$('.WikiChatList').click(function(e) {
    var nickname = encodeURI(e.target.closest('li').dataset.user.replace(/\s/g, '_'));
    $('div.additionalLinks').remove();
    $('.UserStatsMenu .actions').after('<div class="additionalLinks" style="color: white; text-align: center; margin-bottom: 5px;">(<a href="/wiki/User:' + nickname + '" target="_blank">Профайл</a> ♥ <a href="/wiki/User_blog:' + nickname + '" target="_blank">Блог</a>)</div>');
});
});

/*ChatTags*/
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

// Wait until object will be in loaded or in scope.
var checkExist = setInterval(function() {
    if (typeof chatags === 'undefined') {
        return;
    }

    chatags.tags['wd'] = function(s,t) {  
        return (t.charAt(0) === '/') ? 
            s.replace('[/wd]', '</span>') :
            s.replace('[wd]', '<span style="font-family: Wingdings">');
    };
    clearInterval(checkExist);
}, 1000);

/* Эт, крч, ваще ништяк
Цветные сообщения! 
By Сибирский смотритель и Annovy*/
 
(function() {
   if (typeof getCookie("toggleChatMessageColor", 0) === "undefined") setCookie("toggleChatMessageColor", "on");
   var isColorToggled = getCookie("toggleChatMessageColor", 0) === "on" ? true : false;
 
   if (isColorToggled) $('head').append('<link id="color-chat-messages" rel="stylesheet" href="/load.php?lang=ru&mode=articles&articles=MediaWiki:ColorMessages.css&only=styles" />');
 
   $('#ChatHeader').append('<div style="position: absolute;z-index: 10000;text-align: right;width: 100%;top: -74px;font-family: Determination Mono,Monaco,monospace;">' + 
      '<button id="toggle-message-color">Убрать шрифты</button>' + 
   '</div>');
   $('#toggle-message-color')
   .css({
        position: 'relative',
        top: '83px',
        left: '-156px',
        cursor: 'pointer'
   })
   .click(function() {
      if (isColorToggled) {
         $('#color-chat-messages').remove();
         setCookie("toggleChatMessageColor", "off");
      } else {
         $('head').append('<link id="color-chat-messages" rel="stylesheet" href="/load.php?lang=ru&mode=articles&articles=MediaWiki:ColorMessages.css&only=styles" />');
         setCookie("toggleChatMessageColor", "on");
      }
      isColorToggled = !isColorToggled;
   });
 
   //Куки
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
})();