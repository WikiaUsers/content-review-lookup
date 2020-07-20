importArticles({
    type: "script",
    articles: [
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:kocka:MediaWiki:Emoticons.js'
    ]
});
var PrivateMessageAlert = {
    beepSound: 'http://soundbible.com/grab.php?id=1645&type=mp3',
    notifications: true,
    alertWhileFocused: true
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
window.kockaEmoticons = {
    vocab: {
        emoticons: "Emoticones",
        close: "Cerrar",
        help: "Para insertar un emoticón, haz clic en él."
    },
};
$(function()
{
    var config = window.ChatRulesConfig || {};
    config.vocab = config.vocab || {};
    $.get(location.origin + "/wiki/" + (config.page || "Project:Reglas/chat") + "?action=render", function(data)
    {
        var modalContent = '<div id="ChatRulesModalContent">' + data + '</div>',
        button = document.createElement("button");
        button.innerHTML = config.vocab.rules || "Reglas";
        button.className = "ChatRulesButton";
        button.onclick = function()
        {
            $.showModal(config.vocab.rules || "Reglas del chat", modalContent,
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
document.title = "Chat - Left 4 Dead Wiki";
$(function () {
    'use strict';
    var $messageBox = $('.Write [name="message"]');
    var $sendButton = $('<span class="button" id="sendButton"></span>');
    $sendButton
        .css({
            border: 'none',
            background: 'transparent',
            position: 'relative',
            bottom: '8px',
            left: '12px',
            width: '4px',
            height: '23px',
        })
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