$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>');
if (navigator.userAgent.match(/Crosswalk/i) !== null) {
    var css = document.createElement('link');
    css.type = "text/css";
    css.rel = "stylesheet";
    css.href = "http://es.steven-universe.wikia.com/wiki/MediaWiki:Chat-MobileApp.css?action=raw&ctype=text/css";
    var h = document.getElementsByTagName('head')[0];
    h.appendChild(css);
}
else {
    importArticles({
	type: "script",
	articles: [
		'u:dev:Tabinsert.js',
	]
});
setInterval(function(){
$('a[href*="youtu.be"]').on('click', function(){
    if ($(".blackout")[0]){
        return false;
    } else {
        var id = $(this).attr('href').split('.be/')[1].split('?')[0];
        $('body').prepend('<div class="blackout"><span id="youtube-modal-close" class="material-icons">close</span></div><div class="youtube-modal" style="width: 800px; height: 450px;  background: black"><iframe style="width:100%; height:100%" src="http://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" allowfullscreen></iframe></div>');
        $('#youtube-modal-close').on('click', function() {
            $(".blackout, .youtube-modal").remove();
        });
        return false;
    }
});
$('a[href*="youtube.com/watch"]').on('click', function(){
    if ($(".blackout")[0]){
        return false;
    } else {
        var id = $(this).attr('href').split('?v=')[1].split('&')[0];
        $('body').prepend('<div class="blackout"><span id="youtube-modal-close" class="material-icons">close</span></div><div class="youtube-modal" style="width: 800px; height: 450px;  background: black"><iframe style="width:100%; height:100%" src="http://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" allowfullscreen></iframe></div>');
        $('#youtube-modal-close').on('click', function() {
            $(".blackout, .youtube-modal").remove();
        });
        return false;
    }
});
}, 500);
document.title = "Chat - Steven Universe Wiki";
}
setTimeout (function() {
if (typeof allowCustomChatCSS === 'undefined'){
$('link[href*="%2Fchat.css"]').prop('href',' '+ wgServer + '/load.php?lang=en&mode=articles&articles=MediaWiki%3AChat.css&only=styles');
} else if (allowCustomChatCSS != '1') {
$('link[href*="%2Fchat.css"]').prop('href',' '+ wgServer + '/load.php?lang=en&mode=articles&articles=MediaWiki%3AChat.css&only=styles');
}},3000);
var PrivateMessageAlert = {
	beepSound: 'http://dl.dropboxusercontent.com/s/syc8v48aueofh0a/pm_alert.mp3',
	notifications: true,
	alertWhileFocused: true
};
window.EmoticonsWindowVocab = {
        emoticons: "Emoticonos",
		close: "Cerrar",
		help: "Para insertar un emoticono, haz clic en él."
};
 $('.message textarea').keypress(function(e) {
	if (e.which == 13 && !e.shiftKey && mainRoom.active) {
		var val = $(this).val().replace(/https?:\/\/\S*?\.(?:[^\s\/]){2,6}(?:\/\S*|)|(.)\1{5,}/g, function(match, capt) {
			if (!capt) return match;
			else return capt + capt + capt;
		});
		$(this).val(val);
	}
});
function inlineAlert(msg) {
    if (mainRoom.activeRoom === "main") {
        mainRoom.model.chats.add(new models.InlineAlert({
            text: msg
        }));
    } else {
        mainRoom.chats.privates[mainRoom.activeRoom].model.chats.add(new models.InlineAlert({
            text: msg
        }));
    }
    $('[name="message"]').val('').removeAttr('disabled').focus();
}
$('[name="message"]').keypress(function(e) {
    if (e.which == 13 && !e.shiftKey) {
        var message = this.value;
        if (!message.trim()) {
            e.preventDefault();
            $('[name="message"]').val('').removeAttr('disabled').focus();
        }
        if (/[\/[:]Especial:Chat|Special:Chat/i.test(message)) {
            e.preventDefault();
            inlineAlert('Debido a las reglas de la comunidad, no puedes enviar enlaces de chats de Fandom.');
        }
        if (/60484617|54176365|794488387260435|kat\.cr|thepiratebay|toonget|worldofsteven|twosu|animeflavor|kisscartoon|gogoanime|beachcitybugle|toonova|watchonlinecartoons|seriesflv|seodiv|cartooncrazy/i.test(message)) {
            e.preventDefault();
            inlineAlert('No puedes enviar este enlace, debido a que violaría la política de derechos de autor.');
        }
        if (/vocaroo\.com\/i\//i.test(message)) {
            e.preventDefault();
            inlineAlert('Para enviar un clip de audio desde Vocaroo, escribe [vocaroo="id del clip"]. Revisa [[Ayuda:Tags|esta página de ayuda]] para más información.');
        }
    }
});
$(function(ShowRulesModal)
{
	var config = window.ChatRulesConfig || {};
	config.vocab = config.vocab || {};
	$.get(location.origin + "/wiki/" + (config.page || "Project:Reglas/chat") + "?action=render", function(data)
	{
		mw.util.addCSS("#ChatRulesModalContent{height:400px;overflow-y:auto}.ChatRulesButton{float:right}#ChatRulesModalContent ul{list-style-type:square;margin-left:15px}");
		var modalContent = '<div id="ChatRulesModalContent">' + data + '</div>',
		button = document.createElement("button");
		button.innerHTML = config.vocab.rules || "Reglas";
		button.className = "ChatRulesButton";
		button.onclick = function(ShowRulesModal)
		{
			$.showModal(config.vocab.rules || "Reglas", modalContent,
			{
				id: "ChatRulesModal",
				width: config.modalWidth || 500,
				buttons: [{
					id: "ChatRulesCloseButton",
					defaultButton: true,
					message: config.vocab.close || "Cerrar",
					handler: function(){ $("#ChatRulesModal").closeModal(); }
				}]
			});
		};
		$('.public.wordmark').first().append(button);
	});
});
$(function() {
	if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
		var groups = mw.config.get('wgUserGroups').join(' ');
		if ((groups.indexOf('sysop') + groups.indexOf('chatmoderator') + groups.indexOf('moderator') + groups.indexOf('commentcontrol') + groups.indexOf('rollback') + groups.indexOf('contentmoderator') + groups.indexOf('diseñador') + groups.indexOf('helper') + groups.indexOf('vstf') + groups.indexOf('staff')) > -6) {
			$('.Chat').on('DOMNodeInserted', function(e) {
				var msg = $.parseHTML(e.target.innerHTML)[7];
				if (msg !== void 0 && msg.innerHTML.substr(0, 5) == '!mods') {
					$('<audio>', {
						id: 'mod-ping',
						src: 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg',
						autoplay: true
					}).appendTo('body');
					setTimeout(function() {
						if ($('#mod-ping').length) $('#mod-ping').remove();
					}, 1000);
				}
			});
		}
	}
});
$(function () {
	'use strict';
	var $messageBox = $('.Write [name="message"]');
	var $sendButton = $('<span class="button" id="sendButton"></span>');
	$sendButton
		.click(function () {
			$messageBox.trigger({
				type: 'keypress',
				which: 13
			});
		});
	$messageBox
		.css('width', 'calc(100% - 40px)')
		.after($sendButton);
});
;(function($, mw) {
if (mw.config.get("wgCanonicalSpecialPageName") === "Chat" && mw.config.get("wgUserGroups").indexOf('sysop') !== -1) {
  $("#WikiChatList li").click(function() {
    $('.UserStatsMenu').on('DOMNodeInserted', function () {
      if ($('.give-chat-mod').length) {
        mw.util.addCSS('.UserStatsMenu .actions ul li.give-chat-mod-custom .icon { background-position: -304px 0px}');
        $('.give-chat-mod').addClass('give-chat-mod-custom').removeClass('give-chat-mod');
	$(".give-chat-mod-custom").click(function() {
          var name = $(this).parents().eq(2).children('.info').children('ul').children('.username').text();
        $(this).remove();
          $.showCustomModal('A punto de convertir a ' + name + ' en moderador de chat', '<p>¿Estás seguro de que deseas convertir a ' + name + ' en moderador de chat?</p>', {
              id: 'give-chat-mod-prompt',
              width: 400,
              buttons: [{
                  message: 'Cancelar',
                  handler: function () {
                    $('#give-chat-mod-prompt').closeModal();
                  }
              }, {
                  message: 'Confirmar',
                  defaultButton: true,
                  handler: function() {
                    mainRoom.giveChatMod({
                      name: name
                    });
                    $('#give-chat-mod-prompt').closeModal();
                  }
              }]
          });
        });
      }
    });
  });
}
}) (this.jQuery, this.mediaWiki);
function addNewStyle(newStyle) {
	var styleElement = document.getElementById('styles_js');
	if (!styleElement) {
		styleElement = document.createElement('style');
		styleElement.type = 'text/css';
		styleElement.id = 'styles_js';
		document.getElementsByTagName('head')[0].appendChild(styleElement);
	}
	styleElement.appendChild(document.createTextNode(newStyle));
}
addNewStyle('body.ChatWindow,body.ChatWindow .WikiaPage,.Chat{background:}body.ChatWindow .message img[alt]{width:30px;height:30px}');
setTimeout(function(){
if (document.cookie.indexOf("HasEnteredChatBefore") >= 0) {
} else if (mainRoom.userMain.attributes.editCount < '10') {
    var newuseralert = '¡Hola, ' + wgUserName + '! Parece que esta es tu primera visita al chat. ¡Bienvenido!<br />Por favor, lee las [[Project:Reglas|reglas de la comunidad]] para evitar problemas y tener una buena convivencia con el resto de los usuarios. Si tienes alguna duda, o experimentas algún problema, puedes consultar a uno de los [[Project:Administradores|miembros del staff]] de esta comunidad. ¡Diviértete!<br />Otros enlaces que podrían serte útiles: [[Ayuda:Contenido|centro de ayuda]] - [[Ayuda:Tags|etiquetas del chat]].';
        mainRoom.model.chats.add(new models.InlineAlert({
            text: newuseralert
        }));
    document.cookie = "HasEnteredChatBefore=1;max-age=31536000";
    }
},10000);
var options = {
	osVersion: true,
	minorBrowserVersion: true
};
var browserData = {
	browsers: {
		chrome: uaMatch(/Chrome\/([0-9\.]*)/),
		firefox: uaMatch(/Firefox\/([0-9\.]*)/),
		safari: uaMatch(/Version\/([0-9\.]*).*Safari/),
		opera: uaMatch(/Opera\/.*Version\/([0-9\.]*)/, /Opera\/([0-9\.]*)/),
		msie: uaMatch(/MSIE ([0-9\.]*)/, /Trident.*rv:([0-9\.]*)/)
	},
	engines: {
		webkit: uaContains('AppleWebKit'),
		trident: uaMatch(/(MSIE|Trident)/),
		gecko: uaContains('Gecko'),
		presto: uaContains('Presto')
	},
	platforms: {
		win: uaMatch(/Windows NT ([0-9\.]*)/),
		mac: uaMatch(/Mac OS X ([0-9_\.]*)/),
		linux: uaContains('X11', 'Linux')
	}
};
var ua = navigator.userAgent;
var detectData = {
	platform: detectItem(browserData.platforms),
	browser: detectItem(browserData.browsers),
	engine: detectItem(browserData.engines)
};
function uaMatch(regExp, altReg) {
	return function() {
		var result = regExp.exec(ua) || altReg && altReg.exec(ua);
		return result && result[1];
	};
}
function uaContains(word) {
	var args = Array.prototype.slice.apply(arguments);
	return function() {
		for(var i = 0; i < args.length; i++) {
			if(ua.indexOf(args[i]) < 0) {
				return;
			}
		}
		return true;
	};
}
function detectItem(items) {
	var detectedItem = null, itemName, detectValue;
	for(itemName in items) {
		if(items.hasOwnProperty(itemName)) {
			detectValue = items[itemName]();
			if(detectValue) {
				return {
					name: itemName,
					value: detectValue
				};
			}
		}
	}
}
var mainVer = detectData.browser.value.split('.');
console.log(mainVer[0]);
if ((detectData.browser.name === 'chrome' && mainVer[0] <= 50) || (detectData.browser.name === 'safari' && mainVer[0] <= 8) || (detectData.browser.name === 'firefox' && mainVer[0] <= 47) || (detectData.browser.name === 'opera' && mainVer[0] <= 39) || (detectData.browser.name === 'msie' && mainVer[0] <= 10)) {
    alert('La versión de tu navegador ya no es compatible con el chat. Por favor actualiza tu navegador.');
    window.location = 'https://www.browser-update.org/es/update.html';
}
if (navigator.userAgent.match(/Crosswalk\/22/i) == "Crosswalk/22") {
document.addEventListener('deviceready', function () {
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };
  window.plugins.OneSignal
    .startInit("001180eb-8149-4870-a376-c6805eb5f648")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
}, false);
}
(function(){var a,b,c,d,e,f,g;d=function(a,b){var c,d,e,f;e=[];for(d in b.prototype)try{f=b.prototype[d],null==a[d]&&"function"!=typeof f?e.push(a[d]=f):e.push(void 0)}catch(g){c=g}return e},a={},null==a.options&&(a.options={}),c={checks:{xhr:{url:function(){return"/favicon.ico?_="+Math.floor(1e9*Math.random())},timeout:5e3},image:{url:function(){return"/favicon.ico?_="+Math.floor(1e9*Math.random())}},active:"xhr"},checkOnLoad:!1,interceptRequests:!0,reconnect:!0},e=function(a,b){var c,d,e,f,g,h;for(c=a,h=b.split("."),d=e=0,f=h.length;f>e&&(g=h[d],c=c[g],"object"==typeof c);d=++e);return d===h.length-1?c:void 0},a.getOption=function(b){var d,f;return f=null!=(d=e(a.options,b))?d:e(c,b),"function"==typeof f?f():f},"function"==typeof window.addEventListener&&window.addEventListener("online",function(){return setTimeout(a.confirmUp,100)},!1),"function"==typeof window.addEventListener&&window.addEventListener("offline",function(){return a.confirmDown()},!1),a.state="up",a.markUp=function(){return a.trigger("confirmed-up"),"up"!==a.state?(a.state="up",a.trigger("up")):void 0},a.markDown=function(){return a.trigger("confirmed-down"),"down"!==a.state?(a.state="down",a.trigger("down")):void 0},f={},a.on=function(b,c,d){var e,g,h,i,j;if(g=b.split(" "),g.length>1){for(j=[],h=0,i=g.length;i>h;h++)e=g[h],j.push(a.on(e,c,d));return j}return null==f[b]&&(f[b]=[]),f[b].push([d,c])},a.off=function(a,b){var c,d,e,g,h;if(null!=f[a]){if(b){for(e=0,h=[];e<f[a].length;)g=f[a][e],d=g[0],c=g[1],c===b?h.push(f[a].splice(e,1)):h.push(e++);return h}return f[a]=[]}},a.trigger=function(a){var b,c,d,e,g,h,i;if(null!=f[a]){for(g=f[a],i=[],d=0,e=g.length;e>d;d++)h=g[d],b=h[0],c=h[1],i.push(c.call(b));return i}},b=function(a,b,c){var d,e,f,g,h;return h=function(){return a.status&&a.status<12e3?b():c()},null===a.onprogress?(d=a.onerror,a.onerror=function(){return c(),"function"==typeof d?d.apply(null,arguments):void 0},g=a.ontimeout,a.ontimeout=function(){return c(),"function"==typeof g?g.apply(null,arguments):void 0},e=a.onload,a.onload=function(){return h(),"function"==typeof e?e.apply(null,arguments):void 0}):(f=a.onreadystatechange,a.onreadystatechange=function(){return 4===a.readyState?h():0===a.readyState&&c(),"function"==typeof f?f.apply(null,arguments):void 0})},a.checks={},a.checks.xhr=function(){var c,d;d=new XMLHttpRequest,d.offline=!1,d.open("HEAD",a.getOption("checks.xhr.url"),!0),null!=d.timeout&&(d.timeout=a.getOption("checks.xhr.timeout")),b(d,a.markUp,a.markDown);try{d.send()}catch(e){c=e,a.markDown()}return d},a.checks.image=function(){var b;return b=document.createElement("img"),b.onerror=a.markDown,b.onload=a.markUp,void(b.src=a.getOption("checks.image.url"))},a.checks.down=a.markDown,a.checks.up=a.markUp,a.check=function(){return a.trigger("checking"),a.checks[a.getOption("checks.active")]()},a.confirmUp=a.confirmDown=a.check,a.onXHR=function(a){var b,c,e;return e=function(b,c){var d;return d=b.open,b.open=function(e,f,g,h,i){return a({type:e,url:f,async:g,flags:c,user:h,password:i,xhr:b}),d.apply(b,arguments)}},c=window.XMLHttpRequest,window.XMLHttpRequest=function(a){var b,d,f;return f=new c(a),e(f,a),d=f.setRequestHeader,f.headers={},f.setRequestHeader=function(a,b){return f.headers[a]=b,d.call(f,a,b)},b=f.overrideMimeType,f.overrideMimeType=function(a){return f.mimeType=a,b.call(f,a)},f},d(window.XMLHttpRequest,c),null!=window.XDomainRequest?(b=window.XDomainRequest,window.XDomainRequest=function(){var a;return a=new b,e(a),a},d(window.XDomainRequest,b)):void 0},g=function(){return a.getOption("interceptRequests")&&a.onXHR(function(c){var d;return d=c.xhr,d.offline!==!1?b(d,a.markUp,a.confirmDown):void 0}),a.getOption("checkOnLoad")?a.check():void 0},setTimeout(g,0),window.Offline=a}).call(this),function(){var a,b,c,d,e,f,g,h,i;if(!window.Offline)throw new Error("Offline Reconnect brought in without offline.js");d=Offline.reconnect={},f=null,e=function(){var a;return null!=d.state&&"inactive"!==d.state&&Offline.trigger("reconnect:stopped"),d.state="inactive",d.remaining=d.delay=null!=(a=Offline.getOption("reconnect.initialDelay"))?a:3},b=function(){var a,b;return a=null!=(b=Offline.getOption("reconnect.delay"))?b:Math.min(Math.ceil(1.5*d.delay),3600),d.remaining=d.delay=a},g=function(){return"connecting"!==d.state?(d.remaining-=1,Offline.trigger("reconnect:tick"),0===d.remaining?h():void 0):void 0},h=function(){return"waiting"===d.state?(Offline.trigger("reconnect:connecting"),d.state="connecting",Offline.check()):void 0},a=function(){return Offline.getOption("reconnect")?(e(),d.state="waiting",Offline.trigger("reconnect:started"),f=setInterval(g,1e3)):void 0},i=function(){return null!=f&&clearInterval(f),e()},c=function(){return Offline.getOption("reconnect")&&"connecting"===d.state?(Offline.trigger("reconnect:failure"),d.state="waiting",b()):void 0},d.tryNow=h,e(),Offline.on("down",a),Offline.on("confirmed-down",c),Offline.on("up",i)}.call(this),function(){var a,b,c,d,e,f;if(!window.Offline)throw new Error("Requests module brought in without offline.js");c=[],f=!1,d=function(a){return Offline.trigger("requests:capture"),"down"!==Offline.state&&(f=!0),c.push(a)},e=function(a){var b,c,d,e,f,g,h,i,j;j=a.xhr,g=a.url,f=a.type,h=a.user,d=a.password,b=a.body,j.abort(),j.open(f,g,!0,h,d),e=j.headers;for(c in e)i=e[c],j.setRequestHeader(c,i);return j.mimeType&&j.overrideMimeType(j.mimeType),j.send(b)},a=function(){return c=[]},b=function(){var b,d,f,g,h,i;for(Offline.trigger("requests:flush"),h={},b=0,f=c.length;f>b;b++)g=c[b],i=g.url.replace(/(\?|&)_=[0-9]+/,function(a,b){return"?"===b?b:""}),h[g.type.toUpperCase()+" - "+i]=g;for(d in h)g=h[d],e(g);return a()},setTimeout(function(){return Offline.getOption("requests")!==!1?(Offline.on("confirmed-up",function(){return f?(f=!1,a()):void 0}),Offline.on("up",b),Offline.on("down",function(){return f=!1}),Offline.onXHR(function(a){var b,c,e,f,g;return g=a.xhr,e=a.async,g.offline!==!1&&(f=function(){return d(a)},c=g.send,g.send=function(b){return a.body=b,c.apply(g,arguments)},e)?null===g.onprogress?(g.addEventListener("error",f,!1),g.addEventListener("timeout",f,!1)):(b=g.onreadystatechange,g.onreadystatechange=function(){return 0===g.readyState?f():4===g.readyState&&(0===g.status||g.status>=12e3)&&f(),"function"==typeof b?b.apply(null,arguments):void 0}):void 0}),Offline.requests={flush:b,clear:a}):void 0},0)}.call(this),function(){var a,b,c,d,e;if(!Offline)throw new Error("Offline simulate brought in without offline.js");for(d=["up","down"],b=0,c=d.length;c>b;b++)e=d[b],(document.querySelector("script[data-simulate='"+e+"']")||localStorage.OFFLINE_SIMULATE===e)&&(null==Offline.options&&(Offline.options={}),null==(a=Offline.options).checks&&(a.checks={}),Offline.options.checks.active=e)}.call(this),function(){var a,b,c,d,e,f,g,h,i,j,k,l,m;if(!window.Offline)throw new Error("Offline UI brought in without offline.js");b='<div class="offline-ui"><div class="offline-ui-content"></div></div>',a='<a href class="offline-ui-retry"></a>',f=function(a){var b;return b=document.createElement("div"),b.innerHTML=a,b.children[0]},g=e=null,d=function(a){return k(a),g.className+=" "+a},k=function(a){return g.className=g.className.replace(new RegExp("(^| )"+a.split(" ").join("|")+"( |$)","gi")," ")},i={},h=function(a,b){return d(a),null!=i[a]&&clearTimeout(i[a]),i[a]=setTimeout(function(){return k(a),delete i[a]},1e3*b)},m=function(a){var b,c,d,e;d={day:86400,hour:3600,minute:60,second:1};for(c in d)if(b=d[c],a>=b)return e=Math.floor(a/b),[e,c];return["now",""]},l=function(){var c,h;return g=f(b),document.body.appendChild(g),null!=Offline.reconnect&&Offline.getOption("reconnect")&&(g.appendChild(f(a)),c=g.querySelector(".offline-ui-retry"),h=function(a){return a.preventDefault(),Offline.reconnect.tryNow()},null!=c.addEventListener?c.addEventListener("click",h,!1):c.attachEvent("click",h)),d("offline-ui-"+Offline.state),e=g.querySelector(".offline-ui-content")},j=function(){return l(),Offline.on("up",function(){return k("offline-ui-down"),d("offline-ui-up"),h("offline-ui-up-2s",2),h("offline-ui-up-5s",5)}),Offline.on("down",function(){return k("offline-ui-up"),d("offline-ui-down"),h("offline-ui-down-2s",2),h("offline-ui-down-5s",5)}),Offline.on("reconnect:connecting",function(){return d("offline-ui-connecting"),k("offline-ui-waiting")}),Offline.on("reconnect:tick",function(){var a,b,c;return d("offline-ui-waiting"),k("offline-ui-connecting"),a=m(Offline.reconnect.remaining),b=a[0],c=a[1],e.setAttribute("data-retry-in-value",b),e.setAttribute("data-retry-in-unit",c)}),Offline.on("reconnect:stopped",function(){return k("offline-ui-connecting offline-ui-waiting"),e.setAttribute("data-retry-in-value",null),e.setAttribute("data-retry-in-unit",null)}),Offline.on("reconnect:failure",function(){return h("offline-ui-reconnect-failed-2s",2),h("offline-ui-reconnect-failed-5s",5)}),Offline.on("reconnect:success",function(){return h("offline-ui-reconnect-succeeded-2s",2),h("offline-ui-reconnect-succeeded-5s",5)})},"complete"===document.readyState?j():null!=document.addEventListener?document.addEventListener("DOMContentLoaded",j,!1):(c=document.onreadystatechange,document.onreadystatechange=function(){return"complete"===document.readyState&&j(),"function"==typeof c?c.apply(null,arguments):void 0})}.call(this);
importArticles({
	type: "script",
	articles: [
        'u:kocka:MediaWiki:Emoticons.js',
        'u:es.steven-universe:MediaWiki:ChatPings.js',
		'u:es.steven-universe:MediaWiki:PMA.js',
		'u:es.steven-universe:MediaWiki:Tags.js',
		'u:dev:ChatInterwikiLinks/code.js',
		'u:dev:!kick/code.js',
		'u:dev:AjaxEmoticons/code.js',
	]
});
console.warn('Esta función del navegador está pensada para desarrolladores, úsala sólo si sabes lo que haces. Si alguien te ha indicado pegar código aquí, puede que esté intentando hackear tu cuenta.');