/* ExtendedPrivateMessaging (XPM)
 *
 * Adds additional functions to private messages.
 * Working group PMs and alerts when users block and unblock you.
 *
 * @author Dorumin
 */
 
(function xpm_init() {

    var wg = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgUserName',
        'wgScript'
    ]);
    // Scoping and double runs
    if (
        wg.wgCanonicalSpecialPageName !== 'Chat' ||
        (
            window.ExtendedPrivateMessaging &&
            window.ExtendedPrivateMessaging.init
        )
    ) return;

    // Check mainRoom defined
    importArticles({
        type: 'script',
        articles: [
            'u:dev:Chat-js.js',
            'u:dev:MediaWiki:I18n-js/code.js'
        ]
    });
    if (!window.mainRoom || !window.mainRoom.isInitialized) {
        mw.hook('dev.chat.render').add(
            xpm_init
        );
        return;
    }

    var i18n;
    
    // Import styles
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:ExtendedPrivateMessaging.css'
    });

    /********** BLOCK PM INLINE ALERTS**********/
   
    // Query the API for the peeps that blocked your PMs
    function update_blocked_by() {
        $.get(wg.wgScript + '?action=ajax&rs=ChatAjax&method=getPrivateBlocks&kek=' + Date.now()).then(function(d) {
            var blockedBy = d.blockedByChatUsers.sort();
            if (blockedBy.join('|') == xpm.blockedBy.join('|')) return;
            var changed = blockedBy.concat(xpm.blockedBy).filter(function(name, i, ref) {
                return ref.indexOf(name) == ref.lastIndexOf(name);
            });
            xpm.blockedBy = blockedBy;
            mainRoom.model.blockedByUsers.models.forEach(function(model) {
                if (xpm.blockedBy.indexOf(model.attributes.name) == -1) {
                    mainRoom.model.blockedByUsers.remove(model);
                }
            });
            if (!changed.length) return;
            changed.map(function(user) {
                var r = [user, wg.wgUserName].sort();
                r.isBlocked = blockedBy.indexOf(user) != -1;
                return r;
            }).filter(function(users) {
                return xpm.privateChats[users.join('|')];
            }).forEach(update_chat);
        });
    }
   
    function update_chat(users) {
        var room = xpm.privateChats[users.join('|')];
        if (!room || users.length > 2) return;
        var them = users[0] == wg.wgUserName ? users[1] : users[0],
        they_blocked = xpm.blockedBy.indexOf(them) != -1;
        room.model.room.set({
            blockedMessageInput: users.isBlocked
        });
        room.model.chats.add(new models.InlineAlert({
            text: mw.message('chat-user-' + (users.isBlocked ? 'blocked' : 'allow'), they_blocked || !users.isBlocked ? them : wg.wgUserName, they_blocked || !users.isBlocked ? wg.wgUserName : them).escaped()
        }));
    }
   
    function bind_events(room) {
        room.socket.on("updateUser", function(msg) {
            var data = JSON.parse(msg.data).attrs,
                type = data.statusMessage,
                status = data.statusState,
                user = data.name,
                users = room.model.privateRoom.attributes.users.sort();
            if (
                user != wg.wgUserName &&
                type == 'hey-i-just-met-you-and-this-is-crazy-but-heres-my-number-so-block-me-maybe'
            ) {
                users.isBlocked = status;
                update_chat(users);
            }
            else if (
                type == '@~settitle'
            ) {
                room.customTitle = status;
                update_header(room);
                var members = room.model.privateRoom.attributes.users.filter(function(name) {
                    return name != wg.wgUserName;
                });
                room.model.chats.add(new models.InlineAlert({
                    text: i18n.msg('has-changed-title', user, status || mw.message('chat-private-headline', members.join(', ')).text()).escape()
                }));
            } else if (
                type == '@~titlesync' &&
                user != wg.wgUserName
            ) {
                if (status == true) {
                    room.socket.send(new models.SetStatusCommand({
                        statusMessage: '@~titlesync',
                        statusState: room.customTitle || ''
                    }).xport());
                } else if (room.customTitle != status) {
                    room.customTitle = status;
                    update_header(room);
                }
            }
        });
    }
   
    // Declare global variable for debugging
    var xpm = window.ExtendedPrivateMessaging = $.extend({
        blockedBy: mainRoom.model.blockedByUsers.models.map(function(n) {
            return n.attributes.name;
        }).sort(),
        privateChats: {},
        groupIcon: 'https://i.imgur.com/Ib3A8Nl.png',
        enableExperimentalGroupIcons: true,
        init: true
    }, window.ExtendedPrivateMessaging);
   
    // Extend the private chats object
    $.each(mainRoom.chats.privates, function(i, room) {
        var u = room.model.privateRoom.attributes.users.sort();
        if (u.indexOf(undefined) != -1) return; // Socket is stupid
        xpm.privateChats[u.join('|')] = room;
        bind_events(room);
    });
   
    // Bind to new private rooms
    mainRoom.model.privateUsers.bind('add', function(u) {
        var room = mainRoom.chats.privates[u.attributes.roomId],
        users = room.model.privateRoom.attributes.users.sort();
        if (users.indexOf(undefined) != -1) return; // Socket is stupid
        xpm.privateChats[users.join('|')] = room;
        bind_events(room);
    });
   
    // Bind to you blocking others
    mainRoom.model.blockedUsers.bind('add', function(u) {
        var users = [u.attributes.name, wg.wgUserName].sort(),
        room = xpm.privateChats[users.join('|')];
        if (!room) return;
        room.socket.send(new models.SetStatusCommand({
            statusMessage: 'hey-i-just-met-you-and-this-is-crazy-but-heres-my-number-so-block-me-maybe',
            statusState: true
        }).xport());
    });
   
    // Bind to unblocking people
    mainRoom.model.blockedUsers.bind('remove', function(u) {
        var users = [u.attributes.name, wg.wgUserName].sort(),
        room = xpm.privateChats[users.join('|')];
        if (!room) return;
        room.socket.send(new models.SetStatusCommand({
            statusMessage: 'hey-i-just-met-you-and-this-is-crazy-but-heres-my-number-so-block-me-maybe',
            statusState: false
        }).xport());
    });
   
    // Periodically check for new users who blocked you
    setInterval(update_blocked_by, 2500);

    /********** GROUP PMs **********/
    function remove_selection() {
        var sel = window.getSelection ? getSelection() : document.selection;

        if (sel) {
            if (sel.removeAllRanges) {
                sel.removeAllRanges();
            } else if (sel.empty) {
                sel.empty();
            }
        }
    }

    function crop_image(image, options) {
        var canvas = document.createElement('canvas'),
        cx = canvas.getContext('2d'),
        img = new Image();
        canvas.width = options.width;
        canvas.height = options.height;
        cx.drawImage(image, -options.x, -options.y);
        img.src = canvas.toDataURL();
        return img;
    }

    function resize_image(image, height, width) {
        var canvas = document.createElement('canvas'),
        cx = canvas.getContext('2d'),
        img = new Image();
        canvas.width = width;
        canvas.height = height;
        cx.drawImage(image, 0, 0, width, height);
        img.src = canvas.toDataURL();
        return img;
    }

    function get_avatar_vertical_slice(url) {
        return get_avatar_image(url).then(function(image) {
            return crop_image(image, {
                height: image.height,
                width: image.width / 2,
                x: image.width / 4,
                y: 0
            });
        });
    }

    function get_avatar_small_square(url) {
        return get_avatar_image(url).then(function(image) {
            return resize_image(image, 14, 14);
        });
    }

    function get_avatar_image(url) {
        return new Promise(function(res) {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function() {
                res(img);
            };
            img.src = url.replace('.nocookie.net', '.com');
        });
    }

    function generate_avatar_collection(users) {
        return new Promise(function(res) {
            users = users.filter(function(name) {
                return name != wg.wgUserName;
            });
            var images = users.map(function(name) {
                var user = mainRoom.model.users.findByName(name);
                return user && user.attributes.avatarSrc;
            }).filter(Boolean),
            canvas = document.createElement('canvas'),
            cx = canvas.getContext('2d');

            if (images.length > 4 || images.length != users.length) {
                return res(xpm.groupIcon);
            }
            if (images.length == 1) {
                return res(images[0]);
            }

            if (images.length == 2) {
                images = images.map(get_avatar_vertical_slice);
                Promise.all(images).then(function(results) {
                    var canvas = document.createElement('canvas'),
                    cx = canvas.getContext('2d');
                    canvas.height = 28;
                    canvas.width = 28;

                    results.forEach(function(img, i) {
                        cx.drawImage(img, 14 * i, 0);
                    });

                    res(canvas.toDataURL());
                });
            }

            else if (images.length == 3) {
                images[0] = get_avatar_small_square(images[0]);
                images[1] = get_avatar_small_square(images[1]);
                images[2] = get_avatar_vertical_slice(images[2]);
                Promise.all(images).then(function(results) {
                    var canvas = document.createElement('canvas'),
                    cx = canvas.getContext('2d');
                    canvas.height = 28;
                    canvas.width = 28;

                    results.forEach(function(img, i) {
                        cx.drawImage(img, 14 * ~~(i / 2), 14 * (i % 2));
                    });

                    res(canvas.toDataURL());
                });
            }

            else {
                images = images.map(get_avatar_small_square);
                Promise.all(images).then(function(results) {
                    var canvas = document.createElement('canvas'),
                    cx = canvas.getContext('2d');
                    canvas.height = 28;
                    canvas.width = 28;

                    results.forEach(function(img, i) {
                        cx.drawImage(img, 14 * ~~(i / 2), 14 * (i % 2));
                    });

                    res(canvas.toDataURL());
                });
            }
        });
    }

    function update_header(room) {
        var users = room.model.privateRoom.attributes.users.filter(function(name) {
            return name != wg.wgUserName;
        }),
        header = document.querySelector('#ChatHeader .private');
        if (!header) return;

        header.textContent = room.customTitle || mw.message('chat-private-headline', users.join(', ')).text();
        header.classList.remove('no-pointer');

        if (users.length == 1) {
            header.classList.remove('group-header');
            header.title = '';
            header.onclick = null;
        } else {
            header.classList.add('group-header');
            header.title = users.join(', ');
            header.onclick = function() {
                if (!room.active || document.getElementById('private-group-name-choose')) return;
                header_handler(room, users);
            };
        }
        
        var splotch = document.getElementById('MsgCount_' + room.roomId);
        if (!splotch) return;
        var username = 
            splotch
                .previousElementSibling.previousElementSibling
                .firstChild;
        
        username.textContent = room.customTitle || users.join(', ');
    }

    function save_group_title(room) {

        var input = document.getElementById('private-group-name-choose');

        room.socket.send(new models.SetStatusCommand({
            statusMessage: '@~settitle',
            statusState: input ? input.value.trim() : ''
        }).xport());

        update_header(room);
    }

    function header_handler(room, users) {
        var header = document.querySelector('#ChatHeader .private'),
        doc = document;
        if (!header) return;

        header.removeAttribute('title');
        header.innerHTML = '';

        var input = doc.createElement('input'),
        set = doc.createElement('span'),
        cross = doc.createElement('span');

        input.id = 'private-group-name-choose';
        set.className = 'set-name';
        cross.className = 'cancel';

        set.textContent = '✓';
        cross.textContent = '✖';

        set.onclick = _.throttle(function() {
            save_group_title(room);
        }, 0);
        cross.onclick = _.throttle(function() {
            update_header(room);
        }, 0);
        input.onkeydown = function(e) {
            if (e.keyCode == 13) {
                set.onclick();
            }
        };

        header.appendChild(input);
        header.appendChild(set);
        header.appendChild(cross);
        header.classList.add('no-pointer');
        
        input.focus();
    }

    function open_group_private_message() {
        var users = $('#WikiChatList .selected')
            .map(function() {
                return this.getAttribute('data-user');
            })
            .toArray();

        if (users.length) {
            var with_main = users.concat([wg.wgUserName]).sort();
            if (!xpm.privateChats[with_main.join('|')]) {
                mainRoom.openPrivateChat(users);
            }
        }

        close_group_selection();
    }

    function close_group_selection() {
        document.body.classList.remove('picking-group-pm');

        var picker = document.getElementById('GroupPickerInfo'),
        rail = document.getElementById('Rail');
        
        if (!picker) {
            return;
        }

        $('.User.selected').removeClass('selected').removeAttr('style');

        picker.style.animationName = 'none';
        picker.style.animationDirection = 'reverse';
        picker.offsetHeight; /* trigger reflow */
        picker.style.animationName = null;
        
        rail.classList.remove('hovered');

        setTimeout(function() {
            if (picker.parentElement) {
                picker.parentElement.removeChild(picker);
            }
        }, 450);
    }

    function open_group_selection() {
        var doc = document,
        rail    = doc.getElementById('Rail'),
        picker  = doc.createElement('div'),
        start   = doc.createElement('div'),
        cross   = doc.createElement('div');
        
        if (doc.body.classList.contains('picking-group-pm')) return;

        picker.id = 'GroupPickerInfo';
        start.className = 'start';
        cross.className = 'cross';
        
        start.textContent = i18n.msg('help').plain();
        cross.textContent = '✖';

        start.onclick = open_group_private_message;
        cross.onclick = close_group_selection;

        picker.appendChild(start);
        picker.appendChild(cross);

        rail.appendChild(picker);
        rail.classList.add('hovered');

        doc.body.classList.add('picking-group-pm');

        mainRoom.viewUsers.hideMenu();
    }

    function user_click_handler(e) {
        var picker = document.getElementById('GroupPickerInfo'),
        $this = $(this);

        if (!picker) return;
        
        e.preventDefault();
        setTimeout(mainRoom.viewUsers.hideMenu, 0);
        $this.toggleClass('selected');

        if ($this.hasClass('selected')) {
            $this.css('background-color', $this.css('background-color'));
        } else {
            $this.removeAttr('style');
        }
    }

    function new_room_handler(user) {
        var id = user.attributes.roomId,
        room = mainRoom.chats.privates[id],
        members = room.model.privateRoom.attributes.users.filter(function(name) {
            return name != wg.wgUserName;
        });
        
        if (members.length == 1) return;
        
        room.model.room.bind('change', function() {
            if (this.attributes.blockedMessageInput) {
                this.set({
                    blockedMessageInput: false
                });
            }

            update_header(room);
        });

        // Request latest group name
        room.socket.send(new models.SetStatusCommand({
            statusMessage: '@~titlesync',
            statusState: true
        }).xport());

        var $elem = $('#MsgCount_' + id).closest('.User');
        var $img = $elem
            .attr('title', members.join(', '))
            .addClass('group')
            .removeAttr('id')
            .find('img');
        
        if (xpm.enableExperimentalGroupIcons && window.Promise &&  !!window.HTMLCanvasElement) {
            generate_avatar_collection(members).then(function(url) {
                $img
                    .attr('src', url)
                    .removeAttr('srcset');
            });
        } else {
            $img
                .attr('src', xpm.groupIcon)
                .removeAttr('srcset');
        }
        
        $elem.find('.username').get(0).firstChild.textContent = members.join(', ');
    }

    function room_change_handler(e) {
        if (e.target && e.target.hasClass('group')) {
            mainRoom.viewUsers.hideMenu();
        }
        var header = document.querySelector('#ChatHeader .private'),
        id = e.target ? Number(e.target.find('.splotch').attr('id').slice(9)) : mainRoom.activeRoom,
        room = mainRoom.chats.privates[id];
        if (!header || !room) return;
        update_header(room);
    }

    function on_user_add(user) {
        for (var key in xpm.privateChats) {
            var chat = xpm.privateChats[key],
            users = chat.model.privateRoom.attributes.users,
            name = user.attributes.name,
            last = mainRoom.model.chats.last();
            if (
                users.length > 2 &&
                users.indexOf(name) !== -1 &&
                last.attributes.isInlineAlert &&
                last.attributes.text == mw.message('chat-user-joined', name).escaped()                
            ) {
                chat.model.chats.add(new models.InlineAlert({
                    text: mw.message('chat-user-joined', name).escaped(),
                    synthetic: true
                }));
            }
        }
    }

    function on_user_remove(user) {
        for (var key in xpm.privateChats) {
            var chat = xpm.privateChats[key],
            users = chat.model.privateRoom.attributes.users,
            name = user.attributes.name,
            last = mainRoom.model.chats.last();
            if (
                users.length > 2 &&
                users.indexOf(name) !== -1 &&
                last.attributes.isInlineAlert &&
                last.attributes.text == mw.message('chat-user-parted', name).escaped()                
            ) {
                chat.model.chats.add(new models.InlineAlert({
                    text: mw.message('chat-user-parted', name).escaped(),
                    synthetic: true
                }));
            }
        }
    }

    // Wait for i18n to be available
    mw.hook('dev.i18n').add(function(lib) {
        mw.hook('dev.chat').add(function (chat) {
            lib.loadMessages('ExtendedPrivateMessaging').done(function(lang) {
                i18n = lang;
                i18n.useUserLang();
                
                // Add button
                new chat.Button({
                    name: 'ExtendedPrivateMessaging',
                    attr: {
                        text: i18n.msg('group-chat').plain(),
                        click: open_group_selection
                    }
                });
                
                // Bind mainRoom events
                mainRoom.model.users.bind('add', on_user_add);
                mainRoom.model.users.bind('remove', on_user_remove);
                var ref = mainRoom.viewUsers._callbacks.showPrivateMessage.shift();
                mainRoom.viewUsers.bind('showPrivateMessage', function(e) {
                    if (!e.name) {
                        // Hey, I want to have a private chat with .
                        // Code: Yes.
                        return true;
                    }
    
                    if (e.event.shiftKey) {
                        e.event.preventDefault();
    
                        remove_selection();
                        open_group_selection();
    
                        $('#WikiChatList .User[data-user="' + e.name + '"]').click();
                    } else {
                        ref(e);
                    }
                });
    
                // Group PM tooltip
                mainRoom.viewUsers.bind('mainListClick', function() {
                    var li = document.querySelector('#UserStatsMenu .private');
                    if (li) {
                        li.title = i18n.msg('tooltip').plain();
                    }
                });
    
                // Just one isn't enough, because Chat, that's why
                mainRoom.viewUsers.bind('privateListClick', room_change_handler);
                mainRoom.model.room.bind('change', $.debounce(0, room_change_handler));
                mainRoom.model.privateUsers.bind('add', new_room_handler);
    
                // Bind DOM events
                $('#WikiChatList').on('click', '.User', user_click_handler);
            });
        });
    });

    // Override mainRoom functions for proper group messaging
    mainRoom.privateMessage = function(obj) {
        var connectedUser = !1;
        var userData;
        this.model.privateUsers.find(function(userEl) {
            if (userEl.get('name') == obj.name) {
                // <my code>
                if (!userData) {
                    connectedUser = !0;
                    userData = userEl;
                } else {
                    var oldId = userData.get('roomId'),
                    newId = Number(obj.target.find('.splotch').attr('id').slice(9));
                    if (oldId != newId) {
                        userData = userEl;
                    }
                }
                // </my code>
            }
        });
        if (connectedUser) {
            return this.showRoom(userData.get('roomId'));
        } else {
            this.openPrivateChat([obj.name]);
            return true;
        }
    };

    mainRoom.viewUsers._callbacks.mainListClick[0] = $.proxy(function(obj) {
        var user = this.model.users.findByName(obj.name);
        var userMain = this.model.users.findByName(wg.wgUserName);
        var userYouAreBlockedBy = this.model.blockedByUsers.findByName(obj.name);
        // <my code>
        var userPrivate = Object.keys(mainRoom.chats.privates).find(function(key) {
            var users = mainRoom.chats.privates[key].model.privateRoom.attributes.users;
            return users.length == 2 && users.indexOf(obj.name) != -1;
        });
        // </my code>
        var actions = {
            regular: ['profile', 'contribs'],
            admin: []
        };
        if (this.menuHavePrivatBlock(obj.name)) {
            if (typeof (userPrivate) == 'undefined' && typeof (userYouAreBlockedBy) == 'undefined') {
                actions.regular.push('private');
            }
        } else {
            actions.regular.push('private-allow');
        }
        if (this.userMain.get('isModerator') === true && user.get('isModerator') === false) {
            actions.admin.push('kick');
            actions.admin.push('ban');
        }
        if (this.userMain.get('canPromoteModerator') === true && user.get('isStaff') === false && $.inArray('kick', actions.admin) == -1) {
            actions.admin.push('kick');
            actions.admin.push('ban');
        }
        this.viewUsers.showMenu(obj.target, actions);
    }, mainRoom);
    
    
    mainRoom.model.privateUsers.findByName = function(name) {
        var match;
        this.find(function(user) {
            if (!match) {
                // </my code>
                if (user.get('name') == name) {
                    match = user;
                }
                // <my code>
            } else {
                var room = mainRoom.chats.privates[user.get('roomId')],
                users = room && room.model.privateRoom.attributes.users;
                if (room && users.length == 2 && users.indexOf(name) != -1) {
                    match = user;
                }
            }
        });
        return match;
    };
    
    // This isn't even a bug from XPM, but hey, while we're at it, better fix this too.
    mainRoom.baseOpenPrivateRoom = function(data, active) {
        this.chats.privates[data.get('roomId')] = new NodeRoomController(data.get('roomId'));
        this.chats.privates[data.get('roomId')].mainController = this;
        this.chats.privates[data.get('roomId')].model.privateRoom = data;
        var users = data.get('users');
        for (var i in users) {
            if (users[i] != wg.wgUserName) {
                // <my code>
                var user = this.model.users.findByName(users[i]);
                if (!user) continue;
                // </my code>
                var privateUser = new models.PrivateUser(user.attributes);
                privateUser.set({
                    'name': users[i],
                    'active': active,
                    'roomId': data.get('roomId')
                });
                this.model.privateUsers.add(privateUser);
                var roomData = {
                    'privateUser': privateUser
                };
                this.chats.privates[data.get('roomId')].model.room.set(roomData);
                break;
            }
        }
    };
    
    // Look mommy, it's a *hack* until someone comes up with something better 
    if (navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && !navigator.userAgent.match('CriOS')) {
        mw.util.addCSS('#Rail { z-index: auto; } #GroupPickerInfo { z-index: 2; }');
    }
})();