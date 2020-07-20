/* IsTyping
 *
 * Показывает, какие пользователи набирают текст в чате.
 * Влияет на личные сообщения по умолчанию.
 *
 * @scope site-wide
 * @автор Dorumin
 */

(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' ||
        (window.IsTyping && IsTyping.init)
    ) {
        return;
    }

    window.IsTyping = $.extend({
        // <config>
        // Kill script default styling
        noStyle: false,
        // Kill script auto scroll compensation, not necessary after updated indicator
        doScroll: false,
        // Kill script on main
        mainRoomDisabled: false,
        // Kill script on PMs
        privateRoomDisabled: false,
        // Filter self or not, which I documented for some reason
        filterSelf: true,
        // Indicator jQuery object, defined on init
        $indicator: null,
        // Users whose typing state is hidden from the typing indicator
        ignore: [],
        // Use old configuration
        old: false,
        // </config>, further overrides are possible but not supported
        // Milliseconds to wait before a typing state is invalidated
        statusTTL: 8000,
        // Milliseconds before sending another typing ping to a room
        ownStatusThrottle: 6000,
        // Pixels to scroll by if [this.doScroll] is set to true
        scrollBy: 20,
        // For keeping track of loaded resources
        _preload: 0,
        // Object containing room data mapped by room ID
        data: {},
        // Pushes a function call to the end of the callstack
        setImmediate: function(fn) {
            setTimeout(fn.bind(this), 0);
        },
        // Returns a room from an ID
        getRoom: function(id) {
            return mainRoom.chats.privates[id] || mainRoom;
        },
        // Returns the currently active room
        getCurrentRoom: function() {
            if (mainRoom.activeRoom == 'main' || mainRoom.activeRoom === null || mainRoom.activeRoom == mainRoom.roomId) {
                return mainRoom;
            }
            return mainRoom.chats.privates[mainRoom.activeRoom] || mainRoom;
        },
        // Gets the corresponding object in [this.data] for a given room
        getRoomState: function(room) {
            return this.data[room.roomId];
        },
        // Sends a typing state to a room
        sendTypingState: function(status, room) {
            room = room || this.getCurrentRoom();
            var state = this.getRoomState(room),
                main = room.isMain();
            if (
                (state.typing.indexOf(wgUserName) == -1 && status === false) ||
                (main  && this.mainRoomDisabled) ||
                (!main && this.privateRoomDisabled)
            ) return;

            state.last = status ? Date.now() : 0;
            room.socket.send(new models.SetStatusCommand({
                statusMessage: 'typingState',
                statusState: status
            }).xport());
        },
        // Adds someone to the typing list of a room
        startTyping: function(name, state, room) {
            if (state.typing.indexOf(name) == -1) {
                state.typing.push(name);
            }

            if (state.timeouts[name]) {
                clearTimeout(state.timeouts[name]);
            }

            state.timeouts[name] = setTimeout(this.stopTyping.bind(this, name, state, room), this.statusTTL);
        },
        // Removes someone from the typing list of a room
        stopTyping: function(name, state, room) {
            var index = state.typing.indexOf(name);

            if (index != -1) {
                state.typing.splice(index, 1);
            }

            if (state.timeouts[name]) {
                clearTimeout(state.timeouts[name]);
                delete state.timeouts[name];
            }

            if (this.getCurrentRoom() == room) {
                this.updateTypingIndicator(this.filterNames(state.typing));
            }
        },
        // Filters self and ignored users before passing into updateTypingIndicator
        filterNames: function(names) {
            return names.filter(function(name) {
                return (name != wgUserName || !this.filterSelf) && this.ignore.indexOf(name) == -1;
            }.bind(this)); // FIXME: ugly
        },
        // Updates the state of a room from a socket event and the indicator if it's currently active
        updateTyping: function(room, name, status) {
            var state = this.getRoomState(room);

            if (status) {
                this.startTyping(name, state, room);
            } else {
                this.stopTyping(name, state);
            }

            if (this.getCurrentRoom() == room) {
                if (
                    (room.isMain()  && this.mainRoomDisabled) ||
                    (!room.isMain() && this.privateRoomDisabled)
                ) {
                    this.updateTypingIndicator([]);
                } else {
                    this.updateTypingIndicator(this.filterNames(state.typing));
                }
            }
        },
        // Sets the text of the indicator element and does other DOM stuff, might have been able to split this one up some more
        updateTypingIndicator: function(names) {
            names = names || this.filterNames(this.getRoomState(this.getCurrentRoom()).typing);
            var $body = $(document.body),
                div = this.doScroll
                    ? this.getCurrentRoom().viewDiscussion.chatDiv.get(0)
                    : null,
                hc = $body.hasClass('is-typing');

            if (!names.length) {
                $body.removeClass('is-typing');
                IsTyping.$indicator.html('');
                if (
                    this.doScroll &&
                    hc &&
                    div.scrollTop + div.clientHeight != div.scrollHeight
                ) {
                    div.scrollHeight; /* trigger reflow */
                    div.scrollTop -= this.scrollBy;
                }
                return;
            }

            var tags = names.map(function(name) {
                    // .parse() does the escaping
                    return '<span class="username">' + name + '</span>';
                }),
                message = names.length > 3
                    ? 'typing-more'
                    : 'typing-' + names.length,
                args = [message].concat(tags);

            $body.addClass('is-typing');
            this.$indicator.html(this.i18n.msg.apply(window, args).parse());
            if (this.doScroll && !hc) {
                div.scrollHeight; /* trigger reflow */
                div.scrollTop += this.scrollBy;
            }
        },
        // Called on socket updateUser messages, bound to a specific room
        socketHandler: function(room, message) {
            var data = JSON.parse(message.data).attrs,
                status = data.statusState,
                name = data.name;

            if (data.statusMessage == 'typingState') {
                this.updateTyping(room, name, status);
            }
        },
        // Called for each new chat the user joins, including main on startup
        initChat: function(room) {
            this.data[room.roomId] = {
                timeouts: {}, // Object mapped by username of timeout IDs
                typing: [],  // Usernames of the people typing, including main user
                last: 0     // Last time when a typing status was sent
            };
            room.socket.on('updateUser', this.socketHandler.bind(this, room));
            room.model.room.bind('change', this.onRoomChange.bind(this, room));
        },
        // Called when a new private room is opened, the roomId will always be accurate even with group PMs
        onPrivateRoom: function(user) {
            var roomId = user.attributes.roomId,
                room = mainRoom.chats.privates[roomId];
            this.initChat(room);
        },
        // Bound to each keydown event on the message textarea
        // It's a keydown event so it can detect backspace events and compare previous and next values with an immediate timeout
        onKeyDown: function(e) {
            var textarea = e.target,
                value = textarea.value,
                state = this.getRoomState(this.getCurrentRoom());

            this.setImmediate(function() {
                if (value == textarea.value) return;
                if (!textarea.value) {
                    this.sendTypingState(false);
                } else if (Date.now() - state.last > this.ownStatusThrottle) {
                    this.sendTypingState(true);
                }
            });
        },
        // Called when the message textarea loses focus
        onBlur: function() {
            this.sendTypingState(false);
        },
        // Called when you change in our out of a room, and since it's bound to each NodeRoomController, it calls twice per room change
        // Yep, I managed to find a fancy mainRoom event for it
        onRoomChange: function(room) {
            var roomId = room.isMain() ? 'main' : room.roomId;
            if (mainRoom.activeRoom == roomId) {
                this.updateTypingIndicator();
            } else {
                this.sendTypingState(false, room);
            }
        },
        // Called when an user is kicked or banned
        // Doesn't need to be bound to part or logout events since those are already set to timeouts higher than the typing status TTL
        // 45000 and 10000 milliseconds respectively
        // Also clears everything if you're kicked or banned
        onUserRemoved: function(event) {
            var name = JSON.parse(event.data).attrs.kickedUserName;

            for (var id in this.data) {
                var room = this.getRoom(id);
                if (name == wgUserName) {
                    var users = this.data[id].typing;
                    for (var i in users) {
                        this.updateTyping(room, users[i], false);
                    }
                } else {
                    this.updateTyping(room, name, false);
                }
            }
        },
        // Called after each lib is loaded
        preload: function() {
            if (++this._preload == 2) {
                dev.i18n.loadMessages('IsTyping').then(this.init.bind(this));
            }
        },
        // Initialization and double run check property, so don't try to override this one
        init: function(i18n) {
            i18n.useUserLang();
            this.i18n = i18n;
            this.$indicator = this.$indicator || $('<div>', {
                class: 'typing-indicator'
            }).appendTo('body');
            this.initChat(mainRoom);
            Object.values(mainRoom.chats.privates).forEach(this.initChat.bind(this));

            mainRoom.socket.bind('kick', this.onUserRemoved.bind(this));
            mainRoom.socket.bind('ban', this.onUserRemoved.bind(this));
            mainRoom.model.privateUsers.bind('add', this.onPrivateRoom.bind(this));
            mainRoom.viewDiscussion.getTextInput()
                .on('keydown', this.onKeyDown.bind(this))
                .on('blur', this.onBlur.bind(this));

            if (this.old) {
                this.setupOldConfiguration();
            }
        },
        // For people who like to have their chat jiggle around
        setupOldConfiguration: function() {
            this.$indicator.remove();
            this.$indicator = $('<div>', {
                class: 'typing-indicator'
            }).prependTo('#Write');
            this.doScroll = true;
        }
    }, window.IsTyping);

    mw.hook('dev.i18n').add(IsTyping.preload.bind(IsTyping));
    mw.hook('dev.chat.render').add(IsTyping.preload.bind(IsTyping));

    if (IsTyping.old) {
        // Legacy styles
        // FIME: Move to setupOldConfiguration?
        importArticle({
            type: 'style',
            article: 'u:dev:MediaWiki:IsTyping/code.css'
        });
    } else {
        // some dynamic css for good measure
        mw.util.addCSS('.typing-indicator {\
            color: ' + getComputedStyle(document.getElementById('Write')).color + '\
        }');
        importArticle({
            type: 'style',
            article: 'u:dev:MediaWiki:IsTyping.css'
        });
    }

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Chat-js.js'
        ]
    });
})();