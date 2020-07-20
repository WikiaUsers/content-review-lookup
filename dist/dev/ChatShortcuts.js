/* ChatShortcuts
 *
 * Adds customizable shortcuts to switching between private messages and main chat
 * @todo more actions you can do through just the keyboard
 * 
 * @author Dorumin
 */

(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') != 'Chat' ||
        (window.ChatShortcuts && ChatShortcuts.init)
    ) return;

    window.ChatShortcuts = $.extend({
        lastPrivate: null,
        keys: null,
        nextKey: {
            ctrl: true,
            alt: true,
            key: 'ArrowDown'
        },
        prevKey: {
            ctrl: true,
            alt: true,
            key: 'ArrowUp'
        },
        mainKey: {
            ctrl: true,
            alt: true,
            key: 'ArrowRight'
        },
        sortPMs: function(a, b) {
            return a.attributes.name.localeCompare(b.attributes.name);
        },
        getRoom: function(user) {
            return mainRoom.chats.privates[user.attributes.roomId];
        },
        getCurrentRoom: function() {
            if (mainRoom.activeRoom == 'main' || mainRoom.activeRoom === null) {
                return mainRoom;
            }
            return mainRoom.chats.privates[mainRoom.activeRoom];
        },
        getShowId: function(room) {
            if (room.isMain()) return 'main';
            return room.roomId;
        },
        onShortcut: function(type) {
            var rooms = [mainRoom].concat(mainRoom.model.privateUsers.models.sort(this.sortPMs).map(this.getRoom)),
            activeIndex = rooms.indexOf(this.getCurrentRoom());
            switch (type) {
                case 'main':
                    if (!this.lastPrivate) return;
                    if (mainRoom.activeRoom == this.lastPrivate) {
                        mainRoom.showRoom('main');
                    } else {
                        mainRoom.showRoom(this.lastPrivate);
                    }
                    break;
                case 'next':
                    mainRoom.showRoom(this.getShowId(rooms[(activeIndex + 1 + rooms.length) % rooms.length]));
                    break;
                case 'prev':
                    mainRoom.showRoom(this.getShowId(rooms[(activeIndex - 1 + rooms.length) % rooms.length]));
                    break;
            }
        },
        onKeyDown: function(e) {
            for (var k in this.keys) {
                var key = this.keys[k];
                if (
                    e.shiftKey == !!key.shift &&
                    e.ctrlKey == !!key.ctrl &&
                    e.metaKey == !!key.meta &&
                    e.altKey == !!key.alt &&
                    e.key == key.key
                ) {
                    this.onShortcut(k);
                    break;
                }
            }
        },
        onRoomChange: function(event) {
            var roomId = event.attributes.roomId;
            if (roomId == mainRoom.roomId || roomId != mainRoom.activeRoom) return;
            this.lastPrivate = roomId;
        },
        onRoom: function(room) {
            room.model.room.bind('change', this.onRoomChange.bind(this));
        },
        onPM: function(user) {
            this.onRoom(this.getRoom(user));
        },
        init: function() {
            this.keys = {
                next: this.nextKey, 
                prev: this.prevKey,
                main: this.mainKey
            };

            document.addEventListener('keydown', this.onKeyDown.bind(this));

            this.onRoom(mainRoom);
            Object.values(mainRoom.chats.privates).forEach(this.onRoom.bind(this));
            mainRoom.model.privateUsers.bind('add', this.onPM.bind(this));
        }
    }, window.ChatShortcuts);

    mw.hook('dev.chat.render').add(ChatShortcuts.init.bind(ChatShortcuts));

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Chat-js.js'
        ]
    });
})();