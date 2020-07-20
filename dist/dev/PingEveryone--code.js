/**
 * PingEveryone
 * Allows for users to ping everyone in the chat
 * @Author Mario&LuigiBowser'sInsideStory
 * Now with the feature of the notifications on the tab
 */
mw.hook('dev.i18n').add(function(i18no) {
    i18no.loadMessages('PingEveryone').then(function(i18n) {
        mw.hook('dev.chat.render').add(function(mainRoom) {
            if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' || window.pingEveryoneLoaded) return;
            window.pingEveryoneLoaded = true;
            // Config variables
            var pingEveryone = $.extend({
                phrase: i18n.msg('everyone').plain(),
                color: '#f4dd2c',
                audio: 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg',
                modsOnly: false,
                titleAlert: i18n.msg('alert').plain(),
            }, (window.pingEveryone || {})),
                ping = new Audio(pingEveryone.audio),
                oldTitle = document.title,
                titleSwitchActive = false,
                titleSwitch;
            mw.util.addCSS('.pinged {' +
                'background-color: ' + pingEveryone.color + ' !important;' +
            '}');
            window.addEventListener('focus', function() {
                clearInterval(titleSwitch);
                document.title = oldTitle;
                titleSwitchActive = false;
            });
            mainRoom.model.chats.bind('afteradd', function(data) {
                if (new RegExp(pingEveryone.phrase, 'i').test(data.attributes.text)) {
                    if (pingEveryone.modsOnly === true) {
                        if (mainRoom.model.users.findByName(data.attributes.name).attributes.isModerator) {
                            mainRoom.viewDiscussion.chatUL.children().last().addClass('pinged');
                            if (document.hasFocus()) return;
                            ping.play();
                            if (titleSwitchActive) return;
                            titleSwitchActive = true;
                            titleSwitch = setInterval(function() {
                                document.title = document.title !== oldTitle ? oldTitle : pingEveryone.titleAlert + ' ' + document.title;
                            }, 1000);
                        }
                    }
                    else {
                        mainRoom.viewDiscussion.chatUL.children().last().addClass('pinged');
                        if (document.hasFocus()) return;
                        ping.play();
                        if (titleSwitchActive) return;
                        titleSwitchActive = true;
                        titleSwitch = setInterval(function() {
                            document.title = document.title !== oldTitle ? oldTitle : pingEveryone.titleAlert + ' ' + document.title;
                        }, 1000);
                    }
                }
            });
        });
    });
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Chat-js.js',
        'u:dev:MediaWiki:I18n-js/code.js'
    ]
});