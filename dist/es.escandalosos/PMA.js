
(function($, mw) {
    if (!window.mainRoom || mw.config.get('wgCanonicalSpecialPageName') != 'Chat' || window.privateMessageAlertInit) return;
    var PrivateMessageAlert = $.extend({
        translations: {
            'ca': 'Nou missatge de $1',
            'de': 'Neue Nachricht von $1',
            'en': 'New message from $1',
            'es': 'Nuevo mensaje de $1',
            'fr': 'Nouveau message de $1',
            'ja': 'からの新しいメッセージ $1',
            'ko': '새 메시지 $1',
            'nl': 'Nieuw bericht van $1',
            'pl': 'Nowa wiadomość od $1',
            'pt-br': 'Nova mensagem de $1',
            'ru': 'Новое сообщение от $1'
        },
        lang: mw.config.get('wgUserLanguage'),
        interval: window.blinkInterval || 1000,
        throttle: false,
        oldtitle: document.title,
        timeout: 0,
        notif: null,
        blink: function(newMsg) {
            var script = this;
            function step() {
                document.title = (document.title == script.oldtitle) ? newMsg : script.oldtitle;
                script.timeout = setTimeout(step, script.blinkInterval || 1000);
            }
            script.stop(script.timeout);
            step();
        },
        stop: function(script) {
            script = script || this;
            clearTimeout(script.timeout);
            document.title = script.oldtitle;
        },
        random: function() {
            var file = this.beepSound;
            if (file.constructor === Array) {
                return file[Math.floor(Math.random() * file.length)];
            } else if (file.constructor === String) {
                return file;
            } else {
                return '';
            }
        },
        alert: function(usr, text, icon, id) {
            var script = this;
            script.blink(script.message ? script.message.replace(/\$1/g, usr) : script.translations[script.lang].replace(/\$1/g, usr));
            if (script.notifications && Notification.permission == 'granted') {
                if (script.notif !== null) script.notif.close();
                script.notif = new Notification(script.message ? script.message.replace(/\$1/g, usr) : '$1'.replace(/\$1/g, usr), {
                    body: text,
                    icon: icon
                });
                script.notif.onclick = function() {
                    mainRoom.showRoom(id);
                    script.stop();
                };
            }
            if (!script.beepSound) return;
            var ping = document.createElement('audio');
            ping.id = 'mod-ping';
            ping.src = script.random();
            ping.autoplay = true;
        },
        init: function() {
            window.privateMessageAlertInit = true;
            var script = this;
            if (script.translations[script.lang] === undefined) {
                script.lang = 'en';
            }
            if (window.desktopNotifications) script.notifications = true;
            if (window.beepSound) script.beepSound = window.beepSound;
            if (script.notifications && Notification.permission == 'default') {
                Notification.requestPermission();
            }
            window.addEventListener('focus', function() {
                script.stop(script);
            });
            window.addEventListener('click', function() {
                script.stop(script);
            });
            window.addEventListener('blur', function() {
                script.stop(script);
            });
            setTimeout(function() {
                mainRoom.model.privateUsers.bind('add', function(u) {
                    var privateRoomId = u.attributes.roomId;
                    var privateRoom = mainRoom.chats.privates[privateRoomId];
                    privateRoom.model.chats.bind('afteradd', function(chat) {
                        if (chat.attributes.isInlineAlert || (!script.alertWhileFocused && document.hasFocus()) || script.throttle) return;
                        var name = chat.attributes.name;
                        if (name == mw.config.get('wgUserName')) return;
                        var text = chat.attributes.text;
                        var item = mainRoom.model.users.findByName(name);
                        var icon = item ? item.attributes.avatarSrc.replace(/28(?!.*28)/, '150') : '';
                        script.throttle = true;
                        script.alert(name, text, icon, privateRoomId);
                        setTimeout(function() {
                            script.throttle = false;
                        }, 1000);
                    });
                });
            }, 5000);
        }
    }, window.PrivateMessageAlert);
    PrivateMessageAlert.init();
}) (window.jQuery, window.mediaWiki);