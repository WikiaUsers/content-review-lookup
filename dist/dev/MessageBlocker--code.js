/** <nowiki>
 * 
 * @module          MessageBlocker
 * @description     User blocking implementation for Special:Chat.
 * @author          Dzylon
 * @author          Speedit
 * @version         1.7
 * @license         CC-BY-SA 3.0
 *  
 */
require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
    // Scope limiting and double-run protection
    window.dev = window.dev || {};
    if (
        window.dev.messageBlocker ||
        mw.config.get('wgCanonicalSpecialPageName') !== 'Chat'
    ) {
        return;
    }
    var mb = window.dev.messageBlocker = {};
    // Import stylesheet.
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:MessageBlocker.css'
    });
    /**
     * Script dependency loader.
     * @method boot
     */
    mb.boot = function() {
        if (++mb.preload < 3) {
            return;
        }
        window.dev.i18n.loadMessages('MessageBlocker')
            .done(mb.init);
    };
    mb.preload = 0;
    /**
     * Script initialiser
     * @method init
     */
    mb.init = function(i18no) {
        mb.i18n = i18no;
        mb.button = new window.dev.chat.Button({
            name: 'MessageBlocker',
            attr: {
                'class': 'mb-button',
                text: 'MB',
                click: mb.modal
            }
        });
        mw.hook('dev.messageblocker').fire(mb);
        mw.hook('dev.chat.socket').add(mb.main);
    };
    /**
     * Blocker setup
     * @method main
     */
    mb.main = function(mainRoom) {
        // Inline styling
        mb.styles = document.createElement('style');
        mb.styles.id = 'mbUserStyles';
        document.head.appendChild(mb.styles);
        // Style addition
        var uc = mb.user.cache();
        mb.util.ifMod(uc, function(m) {
            uc.forEach(function(u) {
                // Check if user is mod/nonexistent
                if (!m.hasOwnProperty(u) || m[u]) {
                    mb.user.unstore(u);
                } else {
                    // Hide user if not mod & real
                    mb.user.hide(u);
                }
            });
        });
        // Status class delegation
        mainRoom.socket.bind('initial', function() {
            mainRoom.model.users.models.forEach(mb.util.mdl);
        });
        mainRoom.model.users.bind('add', mb.util.mdl);
        // UI addition
        mainRoom.viewUsers.bind('mainListClick', mb.ui);
        // Slash commands
        $('textarea[name="message"]').keypress(mb.cli);
    };
    /**
     * Rail interface generator
     * @method ui
     */
    mb.ui = function(u) {
        var mod = mainRoom.model.users.findByName(u.name)
                .attributes.isModerator,
            b = (mb.user.cache().indexOf(u.name) > -1);
        if (!mod && !$('#UserStatsMenu .ignore').exists()) {
            // User label & event
            var $l = mb.util.label(b);
            $l
                .click($.proxy(mb.handler, $l, u.name))
                .appendTo('.regular-actions');
        }
    };
    /**
     * Command-line handler
     * @method cli
     * @param {Object} e key event
     */
    mb.cli = function(e) {
        // Command variables
        var $t = $(this),
            v = $t.val() || '',
            c = v.split(' ')[0].substr(1), // command
            p = '!';                       // prefix
        if (
            e.which == 13 &&
            v.charAt(0) === p &&
            Object.keys(mb.commands).indexOf(c) > -1
        ) {
            // Empty the textarea
            $t.val('');
            // Run command
            mb.commands[c](v);
        }
    };

    /**
     * Chat commands
     * @member {Object} commands
     */
    mb.commands = {};
    /**
     * Command for blocking
     * @method commands.block
     * @param {string} v text input
     */
    mb.commands.block = function(v) {
        if (v.split(' ').length > 1) {
            u = v.split(' ').slice(1).join(' ');
            mb.block(u, { 'ui': true });
        }
    };
    /**
     * Command for unblocking
     * @method commands.unblock
     * @param {string} v text input
     */
    mb.commands.unblock = function(v) {
        if (v.split(' ').length > 1) {
            u = v.split(' ').slice(1).join(' ');
            mb.unblock(u, { 'ui': true });
        }
    };
    /**
     * Command for listing blocked users
     * @method commands.blocklist
     * @param {string} v text input
     */
    mb.commands.blocklist = function(v) {
        if (v.split(' ').length === 1) {
            mb.modal();
        }
    };

    /**
     * Modal generator
     * @method modal
     */
    mb.modal = function() {
        // Modal list
        var uc = mb.user.cache();
        // Modal content
        var ul = uc.length,
            mc =
                $('<dl>', {
                    'class': 'mb-modal__user-list'
                }).append(
                    $('<dt>', {
                        text:
                            ul > 0 ?
                                ul > 1 ?
                                    mb.i18n.msg('list-count', ul).plain() :
                                    mb.i18n.msg('list-count-single').plain() :
                            mb.i18n.msg('list-empty').plain()
                    })
                ).append((function(ul) {
                    if (ul > 0) {
                        return $.map(uc, function(u) {
                            return $('<dd>', { text: u });
                        });
                    }
                }(ul)));
        // List modal generation
        var modal = $.showCustomModal(
            mb.i18n.msg('list-title').plain(), // title
            mc, // content
            { // options
                buttons: [
                    {
                        defaultButton: false,
                        id: 'mb-modal-button__list-clear',
                        message: mb.i18n.msg('list-clear').plain(),
                        handler: function(m) {
                            var uc = mb.user.cache();
                            if (uc.length > 0) {
                                mb.unblock(uc, { 'ui': true });
                                modal.find('.mb-modal__user-list')
                                    .replaceWith(mb.i18n.msg('list-empty').plain());
                            }
                        }
                    },
                    {
                        defaultButton: true,
                        id: 'mb-modal-button__help-link',
                        message: mb.i18n.msg('help-link').plain(),
                        handler: function(m) {
                            window.open('//dev.wikia.com/wiki/MessageBlocker');
                        }
                    }
                ]
            }
        );
        modal.addClass('mb-modal');
    };
    /**
     * Blocking interface
     * @method handler
     * @param u {string} username
     */
    mb.handler = function(u) {
        var $l = this,
            b = (mb.user.cache().indexOf(u) > -1);
        // User menu label swapping
        $l.replaceWith(mb.util.label(!b));
        // Toggle user visibility
        !b ?
            mb.block(u, { 'ui': true }) :
            mb.unblock(u, { 'ui': true });
    };

    /**
     * Blocking handler
     * @method block
     * @param {Array|string} b unblocked user(s)  
     * @param {Object} r configuration
     */
    mb.block = function(b, r) {
        // Block storage check
        var i = function(e) {
                return (
                    mb.user.cache().indexOf(e) === -1 &&
                    mw.config.get('wgUserName') !== e
                );
            },
            uc = $.isArray(b) ?
                b.filter(i) :
                [b].filter(i);
        // Block status check
        if (uc.length === 0) {
            mb.util.error('error-blk', r);
            return;
        }
        // Moderator check
        mb.util.ifMod(uc, function(m) {
            var mods = [];
            uc.forEach(function(u) {
                if (m[u]) {
                    mods.push(u);
                }
            });
            if (mods.length === 0) {
                // Block users if not moderators
                uc.forEach(function(u) {
                    // Check if user doesn't exist
                    if (!m.hasOwnProperty(u)) { return; }
                    // Blocking logic
                    mb.user.hide(u);
                    mb.user.store(u);
                });
            } else {
                // If there's mods, throw error
                mb.util.error('error-mod', r);
            }
        });
    };

    /**
     * Unblocking handler
     * @method unblock
     * @param {Array|string} u blocked user(s)  
     * @param {Object} r configuration
     */
    mb.unblock = function(u, r) {
        // Interface mode for errors
        var r = r || { 'ui': true };
        // Unblock storage check
        var i = function(e) {
                return mb.user.cache().indexOf(e) > -1;
            },
            uc = $.isArray(u) ?
                u.filter(i) :
                [u].filter(i);
        // Unblock status check
        if (uc.length === 0) {
            mb.util.error('error-ublk', r);
            return;
        }
        // Unblocking logic
        uc.forEach(mb.user.show);
        uc.forEach(mb.user.unstore);
    };

    /**
     * Script utilities
     * @member {Object} util
     */
    mb.util = {};
    /**
     * Moderator check
     * @method util.ifMod
     * @param {Array|string} uc user(s)  
     * @param {function} fn callback
     */
    mb.util.ifMod = function(uc, fn) {
        var up = $.isArray(uc) ? // Check users are present
                uc.every(function(u) {
                    return typeof mainRoom.model.users.findByName(u) !== 'undefined';
                }) :
                mainRoom.model.users.findByName(uc),
            mod = {
                b: $.isArray(uc) ? {} : false, // Mod boolean(s)
                c: $.Deferred() // Mod conditional event
            },
            // Usergroups +"chatmoderator"
            ug = [
                'sysop',
                'chatmoderator',
                'discussions-moderator',
                'staff',
                'helper',
                'vstf',
                'wiki-manager'
            ];
        // Dispatch mod conditionals to function
        $.when(mod.c).then(fn);
        // Fetch moderator boolean(s)
        if (up) {
            if ($.isArray(uc)) {
                // Mod status object
                $.each(uc, function(i, u) {
                    mod.b[u] = mainRoom.model.users.findByName(u)
                        .attributes.isModerator;
                });
                mod.c.resolve(mod.b);
            } else {
                // Mod conditional
                mod.b = mainRoom.model.users.findByName(u)
                    .attributes.isModerator;
                mod.c.resolve(mod.b);
            }
        } else {
            // Fetch from API
            mb.api = new mw.Api();
            mb.api.get({
                'action': 'query',
                'list': 'users',
                'usprop': 'groups',
                'ususers': $.isArray(uc) ? uc.join('|'): u,
                'format': 'json'
            }).done(function(d) {
                var ud = d.query.users,
                    un = ud.map(function(u) {
                        return u.name;
                    });
                if ($.isArray(uc)) {
                    // Usergroup data loop
                    $.each(un, function(i, u) {
                        mod.b[u] = ug.some(function(g) {
                            return ud[i].groups.indexOf(g) > -1;
                        });
                    });
                } else if (d.query.users.length > 0) {
                    mod.b = ug.some(function(g) {
                        return ud[0].groups.indexOf(g) > -1;
                    });
                }
                mod.c.resolve(mod.b);
            });
        }
    };
    /**
     * Label generation
     * @method util.label
     * @param {boolean} b block status
     */
    mb.util.label = function(b) {
        var iconname = b ?
                'eye-small' :
                'eye-crossed-small';
        return $('<li>', {
            'class': (function() {
                return b ?
                    'ignore mb-is-ignored' :
                    'ignore';
            }())
        }).append(
            window.dev.wds.icon(iconname),
            $('<span>', {
                'class': 'label',
                text: (function() {
                    return b ?
                        mb.i18n.msg('allow-msg').plain() :
                        mb.i18n.msg('block-msg').plain();
                }())
            })
        );
    };
    /**
     * Error alert generation
     * @method mb.util.error
     * @param {string} m i18n message code
     * @param {boolean} r configuration
     */
    mb.util.error = function(m, r) {
        // Interface mode for errors
        var r = r || { 'ui': true };
        // Fetch error message
        var msg = mb.i18n.msg(m).plain();
        if (!msg.length) { return; }
        // Throw error if there's mods
        if (r.ui) {
            var m = window.dev.chat.inlineAlert(msg);
            window.mainRoom.viewDiscussion.chatUL
                .children('#entry-' + m.cid)
                .addClass('mb-is-error');
        } else {
            console.warn('[MessageBlocker]', msg);
        }
    };
    /**
     * Chat view class iterator
     * @method util.mdl
     * @param {Object} m chat user model
     */
    mb.util.mdl = function(m) {
        var uc = mb.user.cache(),
            u = m.attributes.name,
            mod = m.attributes.isModerator;
        if (uc.indexOf(u) > -1) {
            mod ?
                mb.unblock(u, { 'ui': false }) :
                m.view.el.classList.add('mb-is-blocked');
        }
    };
    /**
     * User functionality
     * @member {Object} user
     */
    mb.user = {};
    /**
     * Local storage access utility
     * @method user.cache
     * @returns {Array} list of blocked users
     */
    mb.user.cache = function() {
        var uc =  localStorage.mbChatIgnoredUsers || JSON.stringify([]);
        try {
            uc = JSON.parse(uc);
        } catch(e) {
            console.warn('[MessageBlocker]', e);
            uc = localStorage.mbChatIgnoredUsers = '[]';
            uc = JSON.parse(uc);
        }
        if ($.isArray(uc)) {
            if (uc.every(function(u) {
                return typeof u === 'string';
            })) {
                return uc;
            }
        } else {
            return [];
        }
    };
    /**
     * User addition to local storage
     * @method user.store
     * @param {string} u user that was blocked
     */
    mb.user.store = function(u) {
        var uc = mb.user.cache();
        uc.push(u);
        localStorage.mbChatIgnoredUsers = JSON.stringify(uc);
    };
    /**
     * User removal from local storage
     * @method user.unstore
     * @param {string} u user that was unblocked
     */
    mb.user.unstore = function(u) {
        var uc = mb.user.cache();
        uc.splice(uc.indexOf(u), 1);
        localStorage.mbChatIgnoredUsers = JSON.stringify(uc);
    };
    /**
     * Hide user messages
     * @method user.hide
     * @param {string} u user that was blocked
     */
    mb.user.hide = function(u) {
        var t = '.Chat li[data-user="' + u + '"] { display: none; }',
            s = document.createTextNode(t),
            m = mainRoom.model.users.findByName(u);
        mb.styles.appendChild(s);
        if (typeof m !== 'undefined') {
            m.view.el.classList.add('mb-is-blocked');
        }
    };
    /**
     * Show user messages
     * @method show
     * @param {string} u user that was unblocked
     */
    mb.user.show = function(u) {
        var uc = mb.user.cache(),
            i = uc.indexOf(u),
            m = mainRoom.model.users.findByName(u);
        if (i > -1) {
            if (uc > 1) {
                mb.styles.childNodes[i].remove();
            } else {
                mb.styles.textContent = '';
            }
            if (typeof m !== 'undefined') {
                m.view.el.classList.remove('mb-is-blocked');
            }
        }
    };
    // Import dependencies.
    $.each({
        'i18n': 'u:dev:I18n-js/code.js',
        'wds':  'u:dev:WDSIcons/code.js',
        'chat': 'u:dev:Chat-js.js'
    }, function(l, s) {
        // Import scripts.
        if (!window.dev.hasOwnProperty(l)) {
            importArticles({ type: 'script', article: s });
        }
        // Register dependency.
        mw.hook('dev.' + l).add(mb.boot);
    });
});
/** </nowiki> **/