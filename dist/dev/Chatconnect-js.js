// Chatconnect library
require(['mw', 'wikia.nirvana', 'wikia.window'], function(mw, nirvana, context) {
    // Script variables and scope
    if (
        mw.config.get('wgTitle') !== 'Log/chatconnect' ||
        $('select[name="type"]')[0].value !== 'chatconnect' ||
        typeof context.dev !== 'undefined' && typeof context.dev.chatconnect !== 'undefined'
        ) {
        return;
    }
    window.dev = context.dev || {};
    window.dev.chatconnect = {
        delay: 15000,
        reset: false
    };

    // Chatconnect functionality
    var chatconnect = {
        // Script initializer
        init: function() {
            // Script styling
            importArticles({
                type: 'style',
                article: 'u:dev:MediaWiki:Chatconnect-js.css'
            });
            // Script interface
            var util = {
                // Interface styling
                $style: $(mw.util.addCSS('').ownerNode),
                addCSS: function (s) {
                    var css = s.toString();
                    cc.util.$style.append(css);
                },
                // Chatconnect spinner
                $spinner:
                    $('<div>', {
                        'id': 'chatconnect__spinner-tooltip',
                        'html':
                            '<svg id="chatconnect__spinner" class="wds-spinner wds-spinner__block" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">' +
                                '<g transform="translate(20, 20)">' +
                                    '<circle class="wds-spinner__stroke" fill="none" stroke-width="2" stroke-dasharray="119" stroke-dashoffset="119" stroke-linecap="round" r="18"></circle>' +
                                '</g>' +
                            '</svg>',
                        'style': 'display: none;'
                    }).appendTo(document.body),
                // Chatconnect log template
                $cache:
                    $('<script>', {
                        'type': 'text/html',
                        'id': 'chatconnect__cache-log'
                    }).appendTo(document.body),
                // Chatconnect time utility
                time: function(time) {
                    if (typeof time !== "undefined") {
                        return {
                            iso: new Date(time.replace(',', '')).toISOString(),
                            original: time
                        };
                            //.slice(0, -8).replace(/T|-|:/g, '');
                    } else {
                        return new Date().toISOString();
                            //.slice(0, -8).replace(/T|-|:/g, '');
                    }
                }
            };
            util.$style.attr('id', 'chatconnect__styles');
            // Script variable setup
            var cc = {
                models: {
                    events: [ /* [{ .name, .ip, .time, .el }, {}] */ ],
                    user: { /* "user": [{ .ip, .time, .el }, {}] */ },
                    ip: { /* "ip": [{ .name, .time, .el }, {}] */ },
                    duplicates: { /* "ip": [{ .name, .time, .el }, {}] */},
                    banlist: [ /* array of usernames */ ],
                    chatlist: [ /* array of usernames */ ]
                },
                util: util,
                ui: {
                    $items: {},
                    $logs: {},
                    // UI extension
                    extend: function(n, t, a, l) {
                        if (typeof n === 'undefined' ||
                            typeof t === 'undefined' ||
                            typeof a === 'undefined'
                        ) {
                            throw new Error('Not enough arguments supplied to Chatconnect-js: ui.extend.');
                        }
                        if (cc.ui.$items.hasOwnProperty(n)) {
                            throw new Error('Duplicate item name supplied to Chatconnect-js: ui.extend.');
                        }
                        var $el = $(t, a)
                            .addClass('chatconnect__ui-item')
                            .attr('id', 'chatconnect__ui-' + n);
                        if (l) {
                            $('#chatconnect__ui-toolbar').append($('<span>', {
                                'class': 'chatconnect__ui-label',
                                text: l + ':'
                            }));
                        }
                        $('#chatconnect__ui-toolbar').append($el);
                        cc.ui.$items[n] = $el;
                        return $el;
                    },
                    // Log creation
                    createLog: function(a) {
                        if (typeof a !== 'object' ||
                            !a.hasOwnProperty('name') ||
                            !a.hasOwnProperty('header') ||
                            Object.keys(a).length !== 2
                        ) {
                            throw new Error('Malformed configuration object supplied to Chatconnect-js: ui.createLog.');
                        }
                        var n = a.name,
                            h = a.header,
                            $h = $('<h2>', {text: a.header})
                            .addClass('chatconnect__log-header')
                            .attr('id', 'chatconnect__log-header-' + h);
                        var $l = $('<ul>')
                            .addClass('chatconnect__log')
                            .attr('id', 'chatconnect__log-' + n);
                        $('#chatconnect__log-main').before($l);
                        $('#chatconnect__log-main').before($h);
                        cc.ui.$logs[n] = $l;
                        return $l;
                    }
                },
                update: chatconnect.load,
                time: util.time()
            };
            // Spinner initializer
            $(document.body).addClass('chatconnect__is-active');
            cc.util.$spinner.removeAttr('style');
            chatconnect.data(cc, {'isInitialized': false});
        },
        // Chatconnect log data processing
        data: function(cc, d) {
            // Data events
            var dataEvents = {
                    banListLoaded: $.Deferred(),
                    chatListLoaded: $.Deferred()
                };
            // Status data modifiers
            $.when(dataEvents.chatListLoaded, dataEvents.banListLoaded)
                .done(function(c, b) {
                    cc.models.chatlist = c;
                    cc.models.banlist = b;
                    chatconnect.ui(cc, d);
                });
            // Data resetting
            cc.models = {
                'events': [ ],
                'user': { },
                'ip': { },
                'duplicates': { },
                'banlist': [ ],
                'chatlist': [ ]
            };
            // Event processing
            var $log = d.isInitialized ? cc.util.$cache : mw.util.$content;
            $log.find('.mw-logline-chatconnect').each(function() {
                cc.models.events.push({
                    name: this.firstElementChild.innerText,
                    time: cc.util.time(this.firstChild.nodeValue.trim()),
                    ip: this.lastChild.nodeValue.trim().split(' ').pop(),
                    $el: $(this)
                });
            });
            cc.models.events = cc.models.events.reverse();
            // User entry sorting
            cc.models.events.forEach(function(e) {
                if (!cc.models.user.hasOwnProperty(e.name)) {
                    cc.models.user[e.name] = [];
                }
                var eU = {
                    ip: e.ip,
                    time: e.time,
                    $el: e.$el
                };
                cc.models.user[e.name].push(eU);
            });
            // IP entry sorting
            cc.models.events.forEach(function(e) {
                if (!cc.models.ip.hasOwnProperty(e.ip)) {
                    cc.models.ip[e.ip] = [];
                }
                var eIp = {
                    name: e.name,
                    time: e.time,
                    $el: e.$el
                };
                cc.models.ip[e.ip].push(eIp);
            });
            // IP duplicate detection
            Object.keys(cc.models.ip).forEach(function(addr) {
                if (cc.models.ip[addr].length >= 2) {
                    var c = [],
                        u = [];
                    cc.models.ip[addr].reverse().forEach(function(obj) {
                        if (u.indexOf(obj.name) === -1) {
                            c.push(obj);
                        }
                        u.push(obj.name);
                    });
                    if (c.length >= 2) {
                       cc.models.duplicates[addr] = c.reverse();
                    }
                }
            });
            // Ban list loader
            new mw.Api().get({
                action: 'query',
                list: 'logevents',
                letype: 'chatban',
                lelimit: 100,
                format: 'json'
            }).done(function(d) {
                var chatBanList = [];
                d.query.logevents.forEach(function(e) {
                    var user = e.title.substr(5);
                    if (chatBanList.indexOf(user) === -1) {
                        chatBanList.push(user);
                    }
                });
                dataEvents.banListLoaded.resolve(chatBanList);
            });
            // Chat list loader
            nirvana.getJson('Chat', 'executeIndex', function(d) {
                var chatUserList = JSON.parse(
                        d.globalVariablesScript.match(/"wgWikiaChatUsers":\s*(\[[\s\S]+?\])/)[1]
                            .replace(/\\x([0-9a-f]{2})/g, '\\u00$1')
                            .replace(/\\'/g, '\'')
                        // thanks4evilhack Doru (w:c:dev:WorkingMoreUsersCount)
                    ).map(function(e) {
                        return e.username;
                    });
                dataEvents.chatListLoaded.resolve(chatUserList);
            });
        },
        // Chatconnect UI extension
        ui: function(cc, d) {
            if (d.isInitialized) {
                mw.util.$content[0].outerHTML = cc.util.$cache[0].innerHTML;
                mw.util.$content = $('#mw-content-text');
            }
            // Spinner activation
            $(document.body).addClass('chatconnect__is-loading');
            // UI generator
            var tOpt = [
                '10000',
                '15000',
                '30000',
                '60000',
                '300000'
            ];
            // UI objects
            cc.ui.$items = {};
            cc.ui.$logs = {
                main:
                    $('#mw-content-text > ul')
                        .addClass('chatconnect__log')
                        .attr('id', 'chatconnect__log-main')
                        .before($('<h2>', {
                            'class': 'chatconnect__header',
                            'id': 'chatconnect__header-main',
                            text: 'Chat connection log'
                        }))
            };
            cc.ui.$container = $('form[method="get"]').attr('id', 'chatconnect__ui');
            cc.ui.$toolbar = $('<p>', {
                'id': 'chatconnect__ui-toolbar'
            }).appendTo('form[method="get"] fieldset');
            // Move "Go" button
            cc.ui.$items.go = $('input[value="Go"]')
                .addClass('chatconnect__ui-item')
                .attr('id', 'chatconnect__ui-go')
                .appendTo(cc.ui.$toolbar);
            cc.ui.extend('update', '<a>', {
                'class': 'wikia-button',
                text: 'Update',
                click: function(e) {
                    e.preventDefault();
                    // Sideload new log
                    cc.update(cc, d);
                    // Prevent sideloading old delay
                    window.dev.chatconnect.reset = true;
                }
            });
            cc.ui.extend('delay', '<select>', {}, 'Delay options')
                .append(tOpt.map(function(o) {
                    var $el = $('<option>', {
                        'value': o,
                        text: Number(o/1000) + ' seconds'
                    });
                    return $el;
                }))
                .change(function(e) {
                    var t = $(this).val();
                    window.dev.chatconnect.delay = Number(t);
                })
                .children()
                    .prop('selected', false)
                    .filter(function() {
                        var v = $(this).val();
                        return Number(v) === window.dev.chatconnect.delay; 
                    }).prop('selected', true);
            chatconnect.status(cc, d);
        },
        // Chatconnect log status indicators
        status: function(cc, d) {
            $.each(cc.models.events, function(i, e) {
                e.$el.attr({
                    class: 'chatconnect__event-main',
                    id: 'chatconnect__event-main-' + i
                });
            });
            chatconnect.done(cc, d);
        },
        // Chatconnect events
        done: function(cc, d) {
            // Timestamping data object
            cc.time = cc.util.time();
            // Spinner deactivation
            $(document.body).removeClass('chatconnect__is-loading');
            // Chatconnect data & UI hook
            if (!d.isInitialized) {
                mw.hook('dev.chatconnect.init').fire(cc);
            }
            mw.hook('dev.chatconnect.load').fire(cc);
            var eventsModel = cc.models.events.map(function(e) {
                return {
                    name: e.name,
                    ip: e.ip,
                    time: e.time
                };
            });
            window.dev.chatconnect.events = eventsModel;
            window.dev.chatconnect.time = cc.time;
            // Cross-tab communication
            localStorage.chatconnect = JSON.stringify({
                banlist: cc.models.banlist,
                chatlist: cc.models.chatlist,
                events: eventsModel,
                time: cc.time
            });
            // Initiate log updating
            setTimeout(function() {
                if (!(window.dev.chatconnect.reset)) {
                    chatconnect.load(cc, d);
                } else {
                    window.dev.chatconnect.reset = false;
                }
            }, window.dev.chatconnect.delay);
        },
        // Chatconnect sideloader
        load: function(cc, d) {
            // Initiate spinner
            $(document.body).addClass('chatconnect__is-loading');
            // Reload log
            cc.util.$cache.load(window.location.href + ' #mw-content-text', function() {
                // Rebuild interface
                chatconnect.data(cc, {'isInitialized': true});
            });
        }
    };
    // Script bootloader
    mw.loader.using(['mediawiki.util', 'mediawiki.api']).then(chatconnect.init);
});