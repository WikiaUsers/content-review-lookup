/* global mw, $, dev, importArticles */

'use strict';

document.title = 'Chat - Steven Universe Wiki';
$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>');
$('body').addClass('user-' + mw.config.get('wgUserName'));
//document.querySelector('.WikiaPage').style.setProperty('background-image', 'var(--chat-background-image)', 'important');

mw.hook('dev.chat').add(function (chat) {
    console.log('[Chat-js] Chat-js loaded');
});

mw.hook('dev.chat.socket').add(function (mainRoom) {
    console.log('[Chat-js] Connected to chat socket');
});

mw.hook('dev.chat.render').add(function (mainRoom) {
    console.log('[Chat-js] Chat UI rendering finished');

    var $messageBox = $('.Write [name="message"]');
    var $sendButton = $('<span class="button" id="sendButton"></span>');
    $sendButton.click(function () {
        $messageBox.trigger({
            type: 'keypress',
            which: 13
        });
    });
    $messageBox.css('width', 'calc(100% - 40px)').after($sendButton);
    
    function mobileChatToolbar() {
        var isMobile = window.matchMedia([
                        'screen and (max-aspect-ratio: 3/4) and (min-resolution: 240dpi)',
                        '(max-aspect-ratio: 3/4) and (max-width: 1080px) and (min-resolution: 200dpi)',
                        '(max-aspect-ratio: 3/4) and (max-width: 720px) and (min-resolution: 150dpi)',
                        '(max-width: 480px)'
                    ].join(', ')).matches;
        if (isMobile) {
            $(window.dev.chat.toolbar).show().insertAfter('#Rail .public');
            $('body').addClass('mobile');
        } else {
            if ($('#ChatHeader').find('.chat-toolbar').length === 0) {
                $(window.dev.chat.toolbar).insertBefore('#ChatHeader .User');
                $('body').removeClass('mobile');
            }
        }
    }
    mobileChatToolbar();
    $(window).resize($.throttle(100, mobileChatToolbar));

    $('[name="message"]').keypress(function (e) {
        if (e.which === 13 && !e.shiftKey) {
            var message = this.value;
            if (!message.trim()) {
                e.preventDefault();
                e.stopImmediatePropagation();
                util.blankMsgTextarea();
            }
            if (/[\/[:]Especial:Chat|Special:Chat/i.test(message)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                util.blankMsgTextarea();
                dev.chat.inlineAlert('Debido a las reglas de la comunidad, no puedes enviar enlaces de chats de Fandom.', mainRoom.activeRoom);
            }
            if (/(http(s)?:\/\/)?(www\.)?(60484617|54176365|794488387260435|kat\.cr|thepiratebay|toonget|worldofsteven|twosu|animeflavor|kisscartoon|gogoanime|beachcitybugle|toonova|watchonlinecartoons|seriesflv|seodiv|ustream|cartooncrazy)/i.test(message)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                util.blankMsgTextarea();
                dev.chat.inlineAlert('Tu mensaje no puede enviarse porque contiene un enlace prohibido por la política de derechos de autor de la comunidad.', mainRoom.activeRoom);
            }
            if (/(http(s)?:\/\/)?(www\.)?((xvideos|pornhub|brazzers|redtube|serviporno|petardas|cerdas)\.com)/i.test(message)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                util.blankMsgTextarea();
                dev.chat.inlineAlert('Tu mensaje no puede enviarse porque contiene un enlace prohibido por las reglas de la comunidad.', mainRoom.activeRoom);
            }
        }
    });

    var mod_alert = new Audio('https://vignette.wikia.nocookie.net/universosteven/es/images/9/9b/Res-mod_alert.ogg');
    var groups = mw.config.get('wgUserGroups').join(' ');
    mainRoom.model.chats.bind("afteradd", function (c) {
        if (typeof mainRoom.roomId === "undefined") return;
        if (mainRoom.userMain.attributes.isModerator || /(moderator|commentcontrol|rollback|contentmoderator|diseñador)/.test(groups)) {
            var user = c.attributes.name,
                msg = c.attributes.text;
            if (user && msg && /^(?:!|@)(?:mod|admin|staff)/i.test(msg)) {
                mod_alert.play();
                if (Notification.permission === 'granted') {
                    if (!document.hasFocus() || !/main|null/.test(mainRoom.activeRoom)) {
                        var notif = new Notification('¡' + user + ' solicita un moderador!', {
                            body: msg
                        });
                        notif.addEventListener('click', function() {
                            if (!document.hasFocus()) {
                                parent.focus();
                                window.focus();    
                            }
                            if (!/main|null/.test(mainRoom.activeRoom)) {
                                mainRoom.showRoom('main');
                            }
                            this.close();
                        });
                    }
                }
            }
        }
    });

});

var util = {
    blankMsgTextarea: function blankMsgTextarea() {
        return $('[name="message"]').val('').removeAttr('disabled').focus();
    }
};

var IsTyping = {
    noStyle: true
};

var ExtendedPrivateMessaging = {
    enableExperimentalGroupIcons: true
};

var Pings = {
    maxRecentPings: 10,
    storage: {
        whitelist: false,
        notifications: true,
        casesensitive: false,
        'word-boundary': false,
        'audio-enabled': true,
        'inline-alerts': false,
        'highlight-ping': true,
        blacklist: '',
        audio: 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg',
        pings: mw.config.get('wgUserName'),
        color: 'red',
    }
};

var PrivateMessageAlert = {
    beepSound: 'https://vignette.wikia.nocookie.net/universosteven/es/images/1/14/Res-pm_alert.ogg',
    notifications: true,
    alertWhileFocused: true
};

var ChatLinkPreview = {
    previewLocalLinks: true
};

/** Load CssVars.js on IE **/
if (/Trident|MSIE/.test(navigator.userAgent)) {
    $.ajax({
        cache: true,
        dataType: "script",
        url: '/es/load.php?mode=articles&only=scripts&articles=MediaWiki:CssVars.js'
    }).done(function() {
        cssVars({
            include: 'style,link[href*="/load.php"]',
            onlyLegacy    : true,
            watch         : true
        });        
    });
}

importArticles({
    type: 'script',
    articles: [
        // libraries
        'u:dev:Chat-js.js',
        'u:dev:UI-js/code.js',
        'u:dev:Modal.js',
        // script imports
        'u:dev:MediaWiki:ChromeToolbarColor.js',
        'MediaWiki:Chat.js/Pings.js',
        'u:dev:EmoticonsWindow/code.js',
        'MediaWiki:Chat.js/ChatRules.js',
        'MediaWiki:Chat.js/CustomChatStatus.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:IsTyping.js',
        'u:dev:ExtendedPrivateMessaging/code.js',
        'u:dev:!kick/code.js',
        'u:dev:!ban/code.js',
        'u:dev:Tabinsert.js',
        'MediaWiki:Chat.js/ChatLinkPreview.js',
        'u:dev:ChatSyntaxHighlight.js',
        'u:es.halflife:Tags-import-SU.js',
        'u:dev:EmoticonDragAndDrop.js',
        'u:dev:FaviconNotifier/code.js',
        'u:dev:FixChatEscaping.js',
        'u:dev:AjaxEmoticons/code.js'
    ]
});