
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatHacks.js',
    ]
});

importArticles({
type: 'script',
articles: [
'u:dev:MediaWiki:EmoticonsWindow/code.js',
]
});

'use strict';
 
$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>');
$('head').append('<meta name="theme-color" content="#1976D2">');
$('head').append('<link rel="icon" sizes="192x192" href="https://elnobdetfm.cf/files/suwiki/res/icons/icon-192-xxxhdpi.png">');
$('head').append('<link rel="apple-touch-icon" href="https://elnobdetfm.cf/files/suwiki/res/icons/icon-192-xxxhdpi.png">');
document.title = 'Chat - Steven Universe Wiki';
 
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
 
    $('[name="message"]').keypress(function (e) {
        if (e.which === 13 && !e.shiftKey) {
            var message = this.value;
            if (!message.trim()) {
                e.preventDefault();
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
            if (/vocaroo\.com\/i\//i.test(message)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                util.blankMsgTextarea();
                dev.chat.inlineAlert('Para enviar un clip de audio desde Vocaroo, escribe [vocaroo="id del clip"]. Revisa [[Ayuda:Tags|esta página de ayuda]] para más información.', mainRoom.activeRoom);
            }
            if (/(http(s)?:\/\/)?(www\.)?((xvideos|pornhub|brazzers|redtube|serviporno|petardas|cerdas)\.com)/i.test(message)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                util.blankMsgTextarea();
                dev.chat.inlineAlert('Tu mensaje no puede enviarse porque contiene un enlace prohibido por las reglas de la comunidad.', mainRoom.activeRoom);
            }
        }
    });
 
    var mod_alert = new Audio('https://elnobdetfm.cf/files/suwiki/res/sounds/mod_alert.mp3');
    var modAlertText = 'El chat de Steven Universe Wiki necesita de la ayuda de un moderador.';
    var groups = mw.config.get('wgUserGroups').join(' ');
 
    function getYouTubeId(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length === 11) {
            return match[2];
        } else {
            return 'error';
        }
    }
 
    mainRoom.model.chats.bind("afteradd", function (c) {
        if (typeof mainRoom.roomId === "undefined") return;
        var el = $('#entry-' + c.cid);
        el.find('.message').find('a[href*="www.youtube.com/watch?"]:not(.ignore_yt_parser), a[href*="m.youtube.com/watch?"]:not(.ignore_yt_parser), a[href*="youtu.be/"]:not(.ignore_yt_parser)').each(function () {
            var youtubeId = getYouTubeId(this.text);
            $(this).replaceWith('<video class="chat-video" controls preload="auto" poster="https://img.youtube.com/vi/' + youtubeId + '/hqdefault.jpg"><source src="https://elnobdetfm.cf/yt/getvideo.mp4?videoid=' + youtubeId + '"></video><br /><a class="ignore_yt_parser" href="https://www.youtube.com/watch?v=' + youtubeId + '" target="_blank">[Ver en YouTube]</a><br />');
        });
        if (/(sysop|chatmoderator|moderator|commentcontrol|rollback|contentmoderator|diseñador|helper|vstf|staff)/.test(groups)) {
            var msg = c.attributes.text;
            if (msg && msg.substr(0, 5) === '!mods') {
                mod_alert.play();
                if (document.hasFocus() && !/main|null/.test(mainRoom.activeRoom)) {
                    mainRoom.showRoom('main');
                    alert(modAlertText);
                } else if (!document.hasFocus()) {
                    alert(modAlertText);
                }
            }
        }
    });
 
    window.mainRoom.model.privateUsers.bind('add', function (u) {
        var privateRoomId = u.attributes.roomId;
        var privateRoom = mainRoom.chats.privates[privateRoomId];
        privateRoom.model.chats.bind('afteradd', function (c) {
            if (c.attributes.isInlineAlert) return;
            var el = $('#entry-' + c.cid);
            el.find('.message').find('a[href*="www.youtube.com/watch?"]:not(.ignore_yt_parser), a[href*="m.youtube.com/watch?"]:not(.ignore_yt_parser), a[href*="youtu.be/"]:not(.ignore_yt_parser)').each(function () {
                var youtubeId = getYouTubeId(this.text);
                $(this).replaceWith('<video class="chat-video" controls preload="auto" poster="https://img.youtube.com/vi/' + youtubeId + '/hqdefault.jpg"><source src="https://elnobdetfm.cf/yt/getvideo.mp4?videoid=' + youtubeId + '"></video><br /><a class="ignore_yt_parser" href="https://www.youtube.com/watch?v=' + youtubeId + '" target="_blank">[Ver en YouTube]</a><br />');
            });
        });
    });
 
    console.warn('Esta función del navegador está pensada para desarrolladores, úsala sólo si sabes lo que haces. Si alguien te ha indicado pegar código aquí, puede que esté intentando hackear tu cuenta.');
});
 
var chatRulesModal = {
    init: function init() {
 
        fetch('./Project:Reglas/chat?action=render').then(function (response) {
            if (response.status !== 200) {
                console.log('[ChatRulesModal] API request error. Status Code: ' + response.status);
                return;
            }
            response.text().then(function (data) {
                chatRulesModal.modal = new window.dev.modal.Modal({
                    buttons: [{
                        event: 'close',
                        id: 'ui-modal-rules-close',
                        primary: true,
                        text: 'Cerrar'
                    }],
                    closeTitle: 'Cerrar',
                    content: {
                        type: 'div',
                        attr: {
                            'class': 'ui-modal-rules-main'
                        },
                        html: data
                    },
                    id: 'ui-modal-rules',
                    size: 'medium',
                    title: 'Reglas del chat'
                });
                chatRulesModal.modal.create().done(function () {
                    new dev.chat.Button({
                        name: 'Reglas del chat',
                        attr: {
                            'class': 'ui-button-rules',
                            text: 'Reglas',
                            click: function click() {
                                chatRulesModal.modal.show();
                            }
                        }
                    });
                });
            });
        })['catch'](function (err) {
            console.error('[ChatRulesModal] Fetch Error: ', err);
        });
    }
};
 
var util = {
    blankMsgTextarea: function blankMsgTextarea() {
        return $('[name="message"]').val('').removeAttr('disabled').focus();
    }
};
 
mw.hook('dev.modal').add(chatRulesModal.init);
 
window.IsTyping = {
    noStyle: true
};
 
importArticles({
    type: 'script',
    articles: [
        // libraries
        'u:dev:Chat-js.js',
        'u:dev:MediaWiki:UI-js/code.js',
        'u:dev:MediaWiki:Modal.js',
        'u:dev:MediaWiki:I18n-js/code.js',
        'u:dev:MediaWiki:Modal.js',
        // script imports
        //'MediaWiki:Pings.test.js',
        'MediaWiki:Emoticons.js',
        'u:dev:IsTyping.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:!ban/code.js',
        'u:dev:Tabinsert.js',
        'u:dev:MediaWiki:ChatSyntaxHighlight.js',
        'u:dev:MediaWiki:EmoticonDragAndDrop.js',
        'u:dev:MediaWiki:NewMessageCount.js',
        'u:dev:MediaWiki:FixChatEscaping.js',
        'u:dev:AjaxEmoticons/code.js'
    ]
});
/*Importaciones*/
/**Developers Wiki**/
/***Códigos***/
importArticles({
    type: 'script',
    articles: [
/***Botón de enviar***/
        'u:dev:ChatSendButton.js',
/***Contador de mensajes no leídos al estar en otra pestaña***/
        'u:dev:NewMessageCount.js',
/***Caja de herramientas***/
        'u:dev:ChatToolbox/code.js',
/***Aviso de mensaje privado***/
        'u:dev:PrivateMessageAlert/code.js'
    ]
});
/****Actualizar emoticones sin salir del chat****/
ajaxEmoticonsInterval = 5000;
importScriptPage('MediaWiki:AjaxEmoticons/code.js', 'dev');
/*Remplazo de palabra*/
document.getElementsByName('message')[0].onkeypress = function(e) {
    if ( e.which == 32 ) {
        if ( this.value == 'multifacepalm' ) {
            this.value = '(facepalm) (ckfp) (derpyfp) (lunafp) (lyrafp) (pcfp) (ppfp) (rarefp) (rdfp) (scootfp) (snipsfp) (spikefp) (vinylfp) (extremefacepalm)';
        }
    }
    if ( e.which == 32 ) {
        if ( this.value == 'mane6' ) {
            this.value = '(aj) (shy) (pp) (rarity) (rd) (ts)';
        }
    }
}
/*Filtro de chats de otras wikis*/
$( '[name="message"]' ) .keypress( function(e) {
    if ( e.which == 32 || e.which == 13 ) {
        this.value = this.value.replace (/Especial:Chat|Special:Chat/gi,'w:c:es.mlp No se enlaza a otros chats. (rare¬¬)');
        }
    }
)