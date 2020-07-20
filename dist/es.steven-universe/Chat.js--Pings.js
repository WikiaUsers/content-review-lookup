/* original: https://dev.fandom.com/wiki/MediaWiki:Pings.js
modifications: use wikia.ui.factory modals instead of $.showCustomModal
*/

(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' ||
        !window.Promise ||
        window.Pings && Pings.init
    ) return;

    window.Pings = $.extend({
        unseenPingCount: 0,
        maxRecentPings: 5,
        notifications: [],
        $button: null,
        pings: null,
        style: null,
        name: mw.config.get('wgUserName'),
        settings: [
            ['color', 'input'],
            ['audio', 'input'],
            ['blacklist', 'textarea'],
            ['whitelist', 'checkbox'],
            ['notifications', 'checkbox'],
            ['casesensitive', 'checkbox'],
            ['word-boundary', 'checkbox'],
            ['audio-enabled', 'checkbox'],
            ['inline-alerts', 'checkbox'],
            ['highlight-ping', 'checkbox'],
        ],
        storage: {
            whitelist: false,
            notifications: false,
            casesensitive: false,
            'word-boundary': false,
            'audio-enabled': false,
            'inline-alerts': false,
            'highlight-ping': false,
            blacklist: '',
            audio: 'https://images.wikia.com/monchbox/images/0/01/Beep-sound.ogg',
            pings: mw.config.get('wgUserName'),
            color: 'red',
        },
        ajax: $.extend(new Image(), {
            src: stylepath + '/common/images/ajax.gif'
        }),
        state: {},
        avatars: {},
        regexRegex: /^regex:\/(.+)\/(\w*)$/gm, // :P
        settingsCheck: {
            audio: function(str) {
                var i18n = this.i18n;
                return new Promise(function(resolve) {
                    if (str.trim() == '') {
                        return resolve(true);
                    }
                    var audio = new Audio(str);
                    audio.onerror = resolve.bind(window, i18n.msg('invalid-audio-url').plain());
                    audio.onloadeddata = resolve.bind(window, true);
                });
            },
            color: function(str) {
                var i18n = this.i18n;
                return new Promise(function(resolve) {
                    if (str.trim() == '') {
                        return resolve(true);
                    }
                    var elem = document.createElement('span');
                    elem.style.color = str.split(';')[0];
                    if (elem.style.color == '') {
                        return resolve(i18n.msg('invalid-color').plain());
                    }
                    resolve(true);
                });
            },
            pings: function(str) {
                var i18n = this.i18n,
                regex = this.regexRegex;
                return new Promise(function(resolve) {
                    regex.lastIndex = 0;

                    var match;

                    while ((match = regex.exec(str)) !== null) {
                        try {
                            new RegExp(match[1], match[2]);
                        } catch(e) {
                            var line = str.slice(0, match.index).split('\n').length;
                            resolve(i18n.msg('invalid-regular-expression', line, match[0]).plain());
                            return;
                        }
                    }

                    resolve(true);
                });
            }
        },
        /* Resource handling methods */
        _preload: 0,
        preload: function() {
            if (++this._preload == 4) {
                dev.i18n.loadMessages('Pings').then(this.init.bind(this));
            }
        },
        /* mainRoom model methods */
        bindToUsers: function(room, fn) {
            room.model.users.models.forEach(fn);
            room.model.users.bind('add', fn);
            this.getRecentPings().forEach(function(ping) {
                this.fetchAvatar(ping[1]);
            }, this);
        },
        onUser: function(user) {
            this.avatars[user.attributes.name] = user.attributes.avatarSrc;
        },
        fetchAvatar: function(name) {
            var avatars = this.avatars;
            return new Promise(function(resolve) {
                if (avatars[name]) {
                    return resolve(avatars[name]);
                }
                // Note: Do not batch, usernames with commas will fuck you up
                $.get('/api/v1/User/Details?ids=' + name + '&size=28').then(this.storeAvatar.bind(this, resolve));
            }.bind(this));
        },
        storeAvatar: function(resolve, response) {
            resolve(this.avatars[response.items[0].name] = response.items[0].avatar);
        },
        getAvatar: function(name, size) {
            var avatar = this.avatars[name];
            if (!avatar) return '';
            if (size) {
                avatar = avatar.replace(/(\/scale-to-width-down\/)\d+/, '$1' + size);
            }
            return avatar;
        },
        bindToMessages: function(room, fn) {
            room.model.chats.models.forEach(function(model) {
                fn(model, true);
            });
            room.model.chats.bind('afteradd', fn);
        },
        onMessage: function(model, batched) {
            if (model.attributes.name == this.name) return;
            if (model.attributes.isInlineAlert && !this.storage['inline-alerts']) return;
            var entry = document.getElementById('entry-' + model.cid);
            if (!entry) return;
            this.checkPings(entry, model, batched);
        },
        checkPings: function(entry, model, batched) {
            var message = entry.querySelector('.message');
            if (!message) return;
            var textNodes = this.getTextNodes(message);
            textNodes.forEach(function(node) {
                var indexes = this.matchPings(node.textContent);
                if (indexes.length) {
                    if (!this.pingable(model.attributes.name)) return;
                    this.highlightMessage(entry, node, indexes);
                    if (batched) return;

                    if (!model.attributes.isInlineAlert) {
                        this.addRecentPing(model);
                    }
                    if (this.storage['audio-enabled'] && this.storage.audio) {
                        this.playAudio();
                    }
                    if (this.storage.notifications) {
                        this.notify(model);
                    }
                }
            }, this);
        },
        pingable: function(name) {
            if (!name) return true;

            var list = this.storage.blacklist.split('\n').filter(Boolean),
            whitelist = this.storage.whitelist,
            included = list.indexOf(name) != -1;

            if (!list.length) return true;

            return whitelist
                ? included
                : !included;
        },
        addRecentPing: function(model) {
            var pings = this.getRecentPings(),
            ping = this.createRecentPing(model);
            if (pings.some(this.matchPing.bind(this, ping))) return;
            pings.unshift(ping);
            this.filterSeenPings(pings);
        },
        notify: function(model) {
            if (document.hasFocus()) return;
            var title = model.attributes.isInlineAlert
                ? this.i18n.msg('notification-title-no-name').plain()
                : this.i18n.msg('notification-title', model.attributes.name).plain(),
            notification = new Notification(title, {
                body: this.i18n.msg('notification-body', model.attributes.text).plain(),
                icon: this.getAvatar(model.attributes.name, 150)
            });
            notification.onclick = function() {
                window.focus();
                mainRoom.showRoom('main');
            };
            this.notifications.push(notification);
        },
        clearNotifications: function() {
            this.notifications.forEach(function(notification) {
                notification.close();
            });
            this.notifications = [];
        },
        matchPing: function(ping, find) {
            return find[0] == ping[0] &&
                find[1] == ping[1] &&
                find[2] == ping[2];
        },
        filterSeenPings: function(pings) {
            var i = pings.length;
            if (i > this.maxRecentPings) {
                while (i--) {
                    var ping = pings[i];
                    if (ping[3]) continue;
                    pings.splice(i, 1);
                    if (pings.length <= this.maxRecentPings) break;
                }
            }
            var unseen = pings.filter(this.unseenPingFilter).length;
            pings = pings.sort(this.sortPingTime);
            if (this.$button) {
                this.$button.el.find('.count').remove();
                if (unseen) {
                    this.$button.el.append(
                        $('<span>', {
                            'class': 'count',
                            text: pings.filter(this.unseenPingFilter).length
                        })
                    );
                }
            }
            localStorage.setItem('Pings-recent', JSON.stringify(pings));
        },
        unseenPingFilter: function(ping) {
            return ping[3];
        },
        sortPingTime: function(a, b) {
            return b[0] - a[0];
        },
        // @tedious
        markPingAsSeen: $.throttle(200, function(find) {
            var pings = this.getRecentPings();
            for (var i in pings) {
                var ping = pings[i];
                if (!ping[3]) continue;
                if (find) {
                    if (find == 'visible') {
                        if ([null, 'main', mainRoom.roomId].indexOf(mainRoom.activeRoom) != -1) {
                            var models = mainRoom.model.chats.models,
                            j = models.length,
                            chat = mainRoom.viewDiscussion.chatDiv.get(0);
                            while (j--) {
                                var model = models[j],
                                elem = document.getElementById('entry-' + model.cid);
                                if (!elem) continue;
                                // If it's outside the viewport, yeah it is confusing if you haven't done it 20 times
                                var pos = -chat.scrollTop + elem.offsetHeight + elem.offsetTop;
                                if (pos < 0) break;
                                var match = this.createRecentPing(model);
                                if (pos < chat.clientHeight + elem.offsetHeight && this.matchPing(ping, match)) {
                                    pings[i] = ping.slice(0, 3);
                                }
                            }
                        }
                    } else {
                        if (this.matchPing(ping, find)) {
                            pings[i] = ping.slice(0, 3);
                        }
                    }
                } else {
                    pings[i] = ping.slice(0, 3);
                }
            }
            this.filterSeenPings(pings);
        }),
        createRecentPing: function(model) {
            return [
                model.attributes.timeStamp,
                model.attributes.name,
                model.attributes.text,
                1
            ];
        },
        // @tedious
        highlightMessage: function(entry, node, indexes) {
            entry.classList.add('pinged');
            indexes = indexes.sort(this.sortIndexes);
            if (this.storage['highlight-ping']) {
                var nodes = [],
                i = indexes.length,
                text = node.textContent,
                lastEnd = text.length,
                index;
                while (i--) {
                    index = indexes[i];
                    trailing = text.slice(index[1], lastEnd);
                    if (trailing) {
                        nodes.unshift(trailing);
                    }
                    var span = document.createElement('span');
                    span.className = 'ping';
                    span.textContent = text.slice(index[0], index[1]);
                    nodes.unshift(span);
                    lastEnd = index[0];
                }
                if (index[0] != 0) {
                    nodes.unshift(text.slice(0, index[0]));
                }
                this.replaceNode(node, nodes);
            } else {
                entry.classList.add('pinged-full');
            }
        },
        sortIndexes: function(a, b) {
            return a[0] - b[0];
        },
        replaceNode: function(node, nodes) {
            var parent = node.parentElement;
            for (var i in nodes) {
                var newd = nodes[i];
                if (typeof newd == 'string') {
                    newd = document.createTextNode(newd);
                }
                parent.insertBefore(newd, node);
            }
            parent.removeChild(node);
        },
        getTextNodes: function(elem) {
            var walker = document.createTreeWalker(elem, NodeFilter.SHOW_TEXT),
            nodes = [],
            n;
            while (n = walker.nextNode())
                if (n.textContent.trim())
                    nodes.push(n);
            return nodes;
        },
        getPings: function() {
            if (this.pings && this.pings.pingString == this.storage.pings) return this.pings;

            this.pings = [];
            this.pings.pingString = this.storage.pings;
            var split = this.storage.pings.split('\n');

            split.forEach(function(line) {
                if (!line.trim()) return;
                this.regexRegex.lastIndex = 0;
                var match = this.regexRegex.exec(line);
                if (match) {
                    this.pings.push(new RegExp(match[1], match[2].replace('g', '') + 'g'));
                } else {
                    this.pings.push(line.trim());
                }
            }, this);

            return this.pings;
        },
        // @tedious
        matchPings: function(str) {
            var indexes = [];
            this.getPings().forEach(function(ping) {
                if (typeof ping == 'string') {
                    var index,
                    lastIndex,
                    w = /\w/,
                    s = str;
                    if (!this.storage.casesensitive) {
                        s = s.toLowerCase();
                        ping = ping.toLowerCase();
                    }
                    while ((index = s.indexOf(ping, lastIndex)) !== -1) {
                        lastIndex = index + ping.length;
                        if (this.storage['word-boundary']) {
                            if (
                                s[index - 1] && w.test(s[index]) == w.test(s[index - 1]) ||
                                s[lastIndex] && w.test(s[lastIndex - 1]) == w.test(s[lastIndex] || '')
                            ) {
                                continue;
                            }
                        }
                        indexes.push([index, index + ping.length]);
                    }
                } else {
                    ping.lastIndex = 0;
                    var m;

                    while ((m = ping.exec(str)) !== null) {
                        if (m.index === ping.lastIndex) {
                            ping.lastIndex++;
                        }

                        indexes.push([m.index, m.index + m[0].length]);
                    }
                }
            }, this);
            return this.filterOverlappingIndexes(indexes);
        },
        // DEFINITELY @TEDIOUS
        filterOverlappingIndexes: function(indexes) {
            var i = indexes.length;
            while (i--) {
                var indexTuple = indexes[i];
                var j = indexes.length;
                while (j--) {
                    if (j == i) continue;
                    var compareTuple = indexes[j];
                    if (indexTuple[0] == compareTuple[0]) {
                        if (indexTuple[1] <= compareTuple[1]) {
                            indexes.splice(i, 1);
                            break;
                        }
                    } else if (!(indexTuple[1] < compareTuple[0] || indexTuple[0] > compareTuple[1])) {
                        if (!(indexTuple[0] < compareTuple[0] && indexTuple[1] > compareTuple[0])) {
                            indexes.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            return indexes;
        },
        /* Modal building methods */
        buildPings: function() {
            return [
                {
                    type: 'label',
                    attr: {
                        id: 'PingsHint',
                        'for': 'PingsTextarea'
                    },
                    text: this.i18n.msg('pings-section-hint').plain()
                },
                {
                    type: 'textarea',
                    attr: {
                        id: 'PingsTextarea'
                    },
                    text: this.storage.pings, // Don't ask me why value="" isn't supported
                    events: {
                        input: this.onChangeSetting.bind(this, 'pings')
                    }
                }
            ];
        },
        buildCheckboxes: function() {
            var objects = [];
            for (var i in this.settings) {
                var setting = this.settings[i],
                option = setting[0],
                type = setting[1];
                switch (type) {
                    case 'input':
                        objects.push({
                            type: 'div',
                            classes: ['pings-setting', 'pings-input'],
                            attr: {
                                id: 'PingsSetting-' + option
                            },
                            children: [
                                {
                                    type: 'label',
                                    attr: {
                                        id: 'PingsSettingLabel-' + option,
                                        'for': 'PingsSettingInput-' + option,
                                        style: option == 'color' ? 'color: ' + this.storage.color : ''
                                    },
                                    text: this.i18n.msg('setting-label-' + option).plain()
                                },
                                option == 'audio' ? {
                                    type: 'div',
                                    attr: {
                                        id: 'PingsPlayFloat'
                                    },
                                    children: [
                                        {
                                            type: 'button',
                                            attr: {
                                                id: 'PingsPlayAudio'
                                            },
                                            events: {
                                                click: this.playAudio.bind(this)
                                            },
                                            text: this.i18n.msg('play-audio-button').plain()
                                        },
                                        {
                                            type: 'input',
                                            attr: $.extend({
                                                type: 'checkbox',
                                                id: 'PingsSettingCheckbox-audio-enabled'
                                            }, this.storage['audio-enabled'] ? {
                                                checked: true
                                            } : null),
                                            events: {
                                                input: this.onChangeSetting.bind(this, 'audio-enabled')
                                            }
                                        }
                                    ]
                                } : {},
                                {
                                    type: 'input',
                                    attr: {
                                        id: 'PingsSettingInput-' + option,
                                        type: 'text',
                                        value: this.storage[option]
                                    },
                                    events: {
                                        input: this.onChangeSetting.bind(this, option)
                                    }
                                }
                            ]
                        });
                        break;
                    case 'textarea':
                        objects.push({
                            type: 'div',
                            classes: ['pings-setting', 'pings-textarea'],
                            attr: {
                                id: 'PingsSetting-' + option
                            },
                            children: [
                                {
                                    type: 'label',
                                    attr: {
                                        id: 'PingsSettingLabel-' + option,
                                        'for': 'PingsSettingTextarea-' + option
                                    },
                                    text: this.i18n.msg('setting-label-' + (option == 'blacklist'
                                        ? this.storage.whitelist
                                            ? 'whitelist'
                                            : 'blacklist'
                                        : option)).plain()
                                },
                                {
                                    type: 'textarea',
                                    attr: {
                                        id: 'PingsSettingTextarea-' + option
                                    },
                                    text: this.storage[option],
                                    events: {
                                        input: this.onChangeSetting.bind(this, option)
                                    }
                                }
                            ]
                        });
                        break;
                    case 'checkbox':
                        if (option == 'audio-enabled') break;
                        objects.push({
                            type: 'div',
                            classes: ['pings-setting', 'pings-checkbox'],
                            attr: {
                                id: 'PingsSetting-' + option
                            },
                            children: [
                                {
                                    type: 'input',
                                    attr: $.extend({
                                        type: 'checkbox',
                                        id: 'PingsSettingCheckbox-' + option
                                    }, this.storage[option] ? {
                                        checked: true
                                    } : null),
                                    events: {
                                        input: this.onChangeSetting.bind(this, option)
                                    }
                                },
                                {
                                    type: 'label',
                                    attr: {
                                        id: 'PingsSettingLabel-' + option,
                                        'for': 'PingsSettingCheckbox-' + option
                                    },
                                    text: this.i18n.msg('setting-label-checkbox-' + option).plain()
                                }
                            ]
                        });
                        break;
                }
            }
            return objects;
        },
        buildRecentPings: function() {
            var pings = this.getRecentPings();
            if (!pings.length) return [];
            return [
                {
                    type: 'h2',
                    attr: {
                        id: 'PingsRecentHeader'
                    },
                    text: this.i18n.msg('recent-pings-header').plain()
                },
                {
                    type: 'div',
                    classes: ['Chat', 'FakeChat'],
                    children: [
                        {
                            type: 'ul',
                            children: pings.map(this.buildPingMessage.bind(this))
                        }
                    ]
                }
            ];
        },
        buildPingMessage: function(msg) {
            var model = new models.ChatEntry({
                text: msg[2],
                avatarSrc: this.getAvatar(msg[1]),
                name: msg[1],
                timeStamp: msg[0]
            }),
            message = new ChatView({
                model: model
            }).render().el;

            message.querySelectorAll('a').forEach(function(a) {
                a.target = '_blank';
                a.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            });

            message.addEventListener('click', function(e) {
                var model = this.findModelByPing(msg);
                if (!model) return;
                this.settingsModal.close();
                this.scrollToModel(model);
            }.bind(this));

            this.checkPings(message, model, true);

            if (!this.getAvatar(msg[1])) {
                this.fetchAvatar(msg[1]).then(function(src) {
                    var img = message.querySelector('img');
                    if (!img) return;
                    img.src = src;
                });
            }

            return message;
        },
        findModelByPing: function(ping) {
            var models = mainRoom.model.chats.models,
            i = models.length;
            while (i--) {
                var model = models[i];
                if (
                    this.matchPing(ping, this.createRecentPing(model))
                ) {
                    return model;
                }
            }
            return null;
        },
        scrollToModel: function(model) {
            var elem = document.getElementById('entry-' + model.cid),
            $chat = mainRoom.viewDiscussion.chatDiv;
            if (!elem) return;
            mainRoom.showRoom('main');
            $chat.animate({
                scrollTop: elem.offsetTop + elem.clientHeight / 2 - $chat.height() / 2
            }, 500);
            elem.classList.add('jumped-to');
			setTimeout(elem.classList.remove.bind(elem.classList, 'jumped-to'), 5000);
        },
        getRecentPings: function() {
            var string = localStorage.getItem('Pings-recent');
            if (!string) return [];
            return JSON.parse(string);
        },
        modalSave: function() {
            $('#PingsModalSaveButton')
                .empty()
                .append(this.ajax);
            this.validateSettings(this.state).then(this.afterValidation.bind(this));
        },
        afterValidation: function(failure) {
            $('#PingsModalSaveButton')
                .text(this.i18n.msg('modal-button-save').plain());
            if (failure) {
                this.showInvalidSettingsModal(failure);
            } else {
                $.extend(this.storage, this.state);
                this.settingsModal.close();
                this.saveSettings();
                this.updateStyle(this.getStyle());
                if (this.state.notifications) {
                    Notification.requestPermission();
                }
                this.state = {};
            }
        },
        showInvalidSettingsModal: function(error) {
            this.invalidSettingsModal.setContent(this.i18n.msg('invalid-settings-modal-content', error).escape());
            this.invalidSettingsModal.show();
        },
        playAudio: function() {
            var url = (this.state.audio || this.storage.audio || '').trim();
            if (!url) return;
            new Audio(url)
                // Stupid ResourceLoader
                .play()['catch'](console.log);
        },
        onChangeSetting: function(option, e) {
            var elem = e.target;
            this.state[option] = elem.type == 'checkbox' ? elem.checked : elem.value;
            if (option == 'color') {
                var label = document.querySelector('label[for="PingsSettingInput-color"]');
                if (label) {
                    label.style = '';
                    label.style = 'color: ' + elem.value;
                }
            }
            if (option == 'whitelist') {
                var label = document.getElementById('PingsSettingLabel-blacklist');
                if (label) {
                    label.textContent = this.i18n.msg('setting-label-' + (
                        this.state.whitelist
                            ? 'whitelist'
                            : 'blacklist')
                        ).plain();
                }
            }
        },
        validateSettings: function(state) {
            var checks = this.settingsCheck,
            context = this,
            resolved = false;
            return new Promise(function(resolve) {
                var promises = [];

                for (var key in state) {
                    var value = state[key];
                    if (checks[key]) {
                        promises.push(checks[key].call(context, value));
                        promises[promises.length - 1].then(function(result) {
                            if (result !== true && !resolved) {
                                resolved = true;
                                resolve(result);
                            }
                        });
                    }
                }

                Promise.all(promises).then(function(results) {
                    if (resolved) return;
                    resolve(results.find(function(val) {
                        return val !== true;
                    }));
                });
            });
        },
        saveSettings: function() {
            localStorage.setItem('Pings-storage', JSON.stringify(this.storage));
        },
        loadSettings: function() {
            return new Promise(function(resolve) {
                var jsonString = localStorage.getItem('Pings-storage');

                if (!jsonString) {
                    resolve(null);
                } else {
                    resolve(JSON.parse(jsonString));
                }
            });
        },
        showModal: function() {
            this.settingsModal.setContent(dev.ui({
                type: 'div',
                attr: {
                    id: 'PingsContainer'
                },
                children: [
                    {
                        type: 'div',
                        attr: {
                            id: 'PingsTextboxContainer'
                        },
                        children: this.buildPings()
                    },
                    {
                        type: 'div',
                        attr: {
                            id: 'PingsOptions'
                        },
                        children: this.buildCheckboxes()
                    },
                    {
                        type: 'div',
                        attr: {
                            id: 'PingsRecent'
                        },
                        children: this.buildRecentPings()
                    }
                ]
            }));
            this.settingsModal.show();
            this.markPingAsSeen();
        },
        createModals: function() {
            this.settingsModal = new window.dev.modal.Modal({
                id: 'PingsModal',
                size: 'medium',
                closeTitle: this.i18n.msg('modal-button-close').escape(),
                title: this.i18n.msg('modal-header').escape(),
                content: '',
                buttons: [
                    {
                        event: 'save',
                        id: 'PingsModalSaveButton',
                        primary: true,
                        text: this.i18n.msg('modal-button-save').escape()
                    },
                    {
                        event: 'close',
                        id: 'PingsModalCancelButton',
                        text: this.i18n.msg('modal-button-cancel').escape()
                    }
                ],
                events: {
                    save: function() {
                        this.modalSave();
                    }.bind(this)
                }
            });
            this.settingsModal.create();            
            this.invalidSettingsModal = new window.dev.modal.Modal({
                id: 'PingsInvalidSettingsModal',
                size: 'small',
                closeTitle: this.i18n.msg('modal-button-close').escape(),
                title: this.i18n.msg('invalid-settings-modal-header').escape(),
                content: '',
                buttons: [
                    {
                        event: 'close',
                        id: 'PingsInvalidSettingsModalCloseButton',
                        text: this.i18n.msg('modal-button-close').escape()
                    }                    
                ]
            });
            this.invalidSettingsModal.create();
        },
        addButton: function() {
            this.$button = new dev.chat.Button({
                name: 'Pings',
                attr: {
                    text: this.i18n.msg('button-text').plain(),
                    click: this.showModal.bind(this)
                }
            });
        },
        getStyle: function() {
            return ('.pinged-full .message, .ping {\
                color: ' + this.storage.color +  '\
            }');
        },
        updateStyle: function(css) {
            if (!this.style) {
                this.style = document.createElement('style');
                document.head.appendChild(this.style);
            }
            this.style.textContent = css;
        },
        bindToActivity: function(fn) {
            $(document).on('mousemove keydown focus', fn);
            var chat = mainRoom.viewDiscussion.chatDiv.get(0);
            chat.addEventListener('scroll', function() {
                // One of the few parts that needs explaining:
                // This gets a range check to make sure that the chat div isn't scrolled completely down before firing
                // We even need a scroll listener in the first place because mousemove doesn't fire when dragging the scrollbar
                if (
                    Math.abs(chat.scrollTop + chat.clientHeight - chat.scrollHeight) < 2
                ) return;
                fn();
            }, {
                passive: true
            });
        },
        onLoadSettings: function(settings) {
            $.extend(this.storage, settings);
            this.updateStyle(this.getStyle());
            this.bindToMessages(mainRoom, this.onMessage.bind(this));
            this.bindToUsers(mainRoom, this.onUser.bind(this));
            this.addButton();
            this.createModals();
            this.bindToActivity(this.markPingAsSeen.bind(this, 'visible'));
            this.bindToActivity(this.clearNotifications.bind(this));
        },
        init: function(i18n) {
            this.i18n = i18n;
            this.loadSettings().then(this.onLoadSettings.bind(this));
        }
    }, window.Pings);

    // Libraries and resources
    mw.hook('dev.ui').add(Pings.preload.bind(Pings));
    mw.hook('dev.i18n').add(Pings.preload.bind(Pings));
    mw.hook('dev.chat').add(Pings.preload.bind(Pings));
    mw.hook('dev.modal').add(Pings.preload.bind(Pings));

    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:Pings.css'
    });

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:UI-js/code.js',
            'u:dev:MediaWiki:Chat-js.js',
            'u:dev:Modal.js'
        ]
    });
})();