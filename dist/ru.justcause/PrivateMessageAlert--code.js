/* 
 * PrivateMessageAlert
 * @description Alerts when an unread PM is received.
 * Can be used for wiki-wide js or personal.
 * @author Dorumin
 * @update 29/05/2016: changed detection system
 * @update 08/06/2016: Added support for desktop notifications.
 * @update 10/07/2016: Changed the detection system (again). Should be the fastest way to do it as of today.
 * @update 09/12/2017: Adding multiple name notification support, porting to i18n-js, code clean-up.
 */

(function reloadUntilMainRoom() {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat') return;

    if (!window.mainRoom) { // Wait until chat has fully loaded
        setTimeout(reloadUntilMainRoom, 500);
        return;
    }
    
    if (window.PrivateMessageAlert && PrivateMessageAlert.init) return;
    
    // Import i18n-js
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });

    window.PrivateMessageAlert = $.extend({
        name: mw.config.get('wgUserName'),
        oldtitle: document.title,
        notifications: false,
        notification: null,
        interval: 1000, // Please don't make this under 1000
        timeout: 0,
        index: 0,
        users: [],
        random: function() {
            var file = this.beepSound;
            if (!file) return '';
            if (file.constructor === Array) {
                return file[Math.floor(Math.random() * file.length)];
            }
            return file;
        },
        msg: function(user) {
            if (this.message) {
                return this.message.replace(/\$1/g, user);
            }
            return this.i18n.msg('title', user).plain();
        },
        setTitle: function(user) {
            document.title = user ? this.msg(user) : this.oldtitle;
        },
        stop: function() {
            this.users = [];
            clearTimeout(this.timeout);
            this.setTitle();
        },
        blink: function(name) {
            if (name && this.users.indexOf(name) == -1) {
                this.index = this.users.push(name);
            }

            clearTimeout(this.timeout);

            this.setTitle(this.users[this.index++]);
            if (this.index > this.users.length) {
                this.index = -1;
            }

            this.timeout = setTimeout($.proxy(this.blink, this), this.interval);
        },
        alert: function(name, text, icon, room) {
            this.blink(name);

            // Desktop notifications
            if (this.notifications && Notification.permission == 'granted') {
                if (this.notification) this.notification.close();
                this.notification = new Notification(this.msg(name), {
                    body: text,
                    icon: icon
                });
                this.notification.onclick = $.proxy(function() {
                    window.focus();
                    this.notification.close();
                    mainRoom.showRoom(room);
                    this.stop();
                }, this);
            }
            if (!this.beepSound) return; // Do not move past this point if beepSound wasn't set
            new Audio(this.random()).play();
        },
        onMessage: function(room, model) {
            if (
                model.attributes.isInlineAlert ||
                mainRoom.model.blockedUsers.findByName(model.attributes.name) ||
                (!this.alertWhileFocused && document.hasFocus()) ||
                model.attributes.name == this.name ||
                (room.model.privateRoom.attributes.users.length > 2 && this.ignoreGroupPMs)
            ) return;

            var name = model.attributes.name,
            text = model.attributes.text,
            roomId = room.roomId,
            icon = model.attributes.avatarSrc.replace(/28(?!.*28)/, '150');
            this.alert(name, text, icon, roomId);
        },
        init: function(i18n) {
            this.i18n = i18n;

            if (this.notifications && Notification.permission == 'default') {
                Notification.requestPermission();
            }

            $(window).on('blur focus click', $.proxy(this.stop, this));

            mainRoom.model.privateUsers.bind('add', $.proxy(function(user) {
                var room = mainRoom.chats.privates[user.attributes.roomId];
                room.model.chats.bind('afteradd', $.proxy(this.onMessage, this, room));
            }, this));

            $.each(mainRoom.chats.privates, $.proxy(function(id, room) {
                room.model.chats.bind('afteradd', $.proxy(this.onMessage, this, room));
            }, this));
        }
    }, window.PrivateMessageAlert);

    mw.hook('dev.i18n').add(function(lib) {
        lib.loadMessages('PrivateMessageAlert').done(function(i18n) {
            i18n.useUserLang();
            if (typeof PrivateMessageAlert.init == 'function') {
                PrivateMessageAlert.init(i18n);
            }
        });
    });
})();