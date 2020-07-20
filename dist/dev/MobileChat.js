/** <nowiki>
 * 
 * @module                  MobileChat
 * @description             Mobile skin for FANDOM Chat.
 * @author                  Noreplyz
 * @author                  Speedit <speeditwikia@gmail.com>
 * @version                 1.3.1
 * @license                 CC-BY-SA 3.0
 * 
 */
require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
    // Scope limiting and double-run protection.
    var conf = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgUserName',
        'wgChatMyAvatarUrl'
    ]);
    if (
        (window.dev || {}).hasOwnProperty('mobilechat') ||
        conf.wgCanonicalSpecialPageName !== 'Chat'
    ) {
        return;
    }
    (window.dev = window.dev || {}).mobilechat = {};
    /**
     * Main MobileChat class.
     * @class mc
     */
    var mc = { state: false };
    /**
     * Wait on script dependencies.
     * @method boot
     */
    mc.boot = function() {
        if (++mc.preload === 3) {
           mc.init();
        }
    };
    mc.preload = 0;
    /**
     * Script initialiser.
     * @method init
     */
    mc.init = function() {
        mw.hook('dev.chat.render').add(function(mainRoom) {
            mc.modules.forEach(function(m) {
                mc[m].init(mainRoom);
            });
        });
        $.when.apply($, mc.modules.map(function(m) {
            return mc[m].$executed;
        })).then(function() {
            window.dev.mobilechat = mc;
            mw.hook('dev.mobilechat').fire(mc);
        });
    };
    /**
     * Module activator.
     * @method on
     * @see mc.ui.rd
     */
    mc.on = function() {
        if (!mc.state) {
            mc.modules.forEach(function(m) { mc[m].on(); });
            $(document.body).addClass('mc-is-active');
            mw.hook('dev.mobilechat.statechange')
                .fire((mc.state = true));
        }
    };
    /**
     * Module deactivator.
     * @method off
     */
    mc.off = function() {
        if (mc.state) {
            mc.modules.forEach(function(m) { mc[m].off(); });
            $(document.body).removeClass('mc-is-active').off('.mc');
            mw.hook('dev.mobilechat.statechange')
                .fire((mc.state = false));
        }
    };
    /**
     * Module toggler.
     * @method toggle
     */
    mc.toggle = function() {
        !mc.state ? mc.on() : mc.off();
    };
    /**
     * Mobile chat interface controller.
     * @member {Object} ui
     */
    mc.ui = {
        /**
         * Views initialiser.
         * @method init
         * @param {Object} mainRoom Chatroom controller.
         */
        init: function(mainRoom) {
            $(document.head).append(mc.ui.vpt);
            // Phone menubar styling
            if (!!mc.ui.tbr.length) {
                $(document.head).append(mc.ui.tbr);
            }
            // CSS variables
            mw.util.addCSS(mc.ui.cssvars(window.dev.colors.wikia));
            // Responsive stylesheet injection.
            $(document).ready(mc.ui.rd);
            $(window).resize($.throttle(100, mc.ui.rd));
            // Chat model resolution handlers.
            mainRoom.model.chats.models.forEach(mc.ui.avatar__msg);
            mainRoom.model.chats.bind('afteradd', mc.ui.avatar__msg);
            mainRoom.model.users.models.forEach(mc.ui.avatar__rail);
            mainRoom.model.users.bind('add', mc.ui.avatar__rail);
            mainRoom.model.privateUsers.bind('add', mc.ui.avatar__priv);
            // Static asset resolution modifiers.
            mainRoom.viewDiscussion.el.find('.Write img').attr(
                'srcset',
                mc.ui.avatar__attr(conf.wgChatMyAvatarUrl)
            );
            var wordmark = mainRoom.viewDiscussion.el.find('.public .wordmark');
            wordmark.attr('srcset', function() {
                var src = wordmark.attr('src');
                return src + ' 1x, ' + src.replace(/\/scale-to-width-down\/\d+/, '') + ' 2x';
            });
            // Activation event.
            mc.ui.$executed.resolve();
        },
        on: $.noop,
        off: $.noop,
        /**
         * CSS variables generator.
         * @method cssvars
         * @param {Object} w Wiki theme variables.
         * @returns {String} CSS variable export.
         */
        cssvars: function(w) {
            return ':root { ' + Object.keys(w).map(function(p) {
                return '--mc-color-' + p + ': ' + w[p] + ';';
            }).join(' ') + ' }';
        },
        /**
         * Stylesheet import parameters
         * @member {Object} style
         */
        style: {
            type: 'style',
            article: 'u:dev:MediaWiki:MobileChat.css'
        },
        /**
         * Meta viewport for responsive design
         * @member {String} vpt
         */
        vpt: mw.html.element('meta', {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        }),
        /**
         * Meta coloration for phone status bars.
         * @member {String} tbr
         */
        tbr: (function(n) {
            if (n.indexOf('Android') > -1) {
                return mw.html.element('meta', {
                    name: 'theme-color',
                    content: '#' + $('.Rail .selected')
                         .css('background-color')
                        .match(/\d+/g).slice(0, 3)
                        .map(function(t) {
                            return Number(t).toString(16);
                        }).join('')
                });
            } else if (n.indexOf('iPhone') > -1) {
                return mw.html.element('meta', {
                    name: 'apple-mobile-web-app-status-bar-style',
                    content: 'black-translucent'
                });
            } else {
                return '';
            }
        }(navigator.userAgent)),
        /**
         * Responsive avatar message resolution handler.
         * @method avatar__msg
         * @param {Object} m Message model.
         */
        avatar__msg: function(m) {
            if (m.attributes.isInlineAlert) {
                return;
            }
            mainRoom.viewDiscussion.el.find('#entry-' + m.cid).children('.avatar')
                .attr('srcset', mc.ui.avatar__attr(m.attributes.avatarSrc));
        },
        /**
         * Responsive rail avatar resolution handler.
         * @method avatar__rail
         * @param {Object} m User model.
         */
        avatar__rail: function(m) {
            $((m.view || {}).el).children('img').attr(
                'srcset',
                mc.ui.avatar__attr(m.attributes.avatarSrc)
            );
        },
        /**
         * Responsive avatar private room handler.
         * @method avatar__priv
         * @param {Object} p Private room model collection.
         */
        avatar__priv: function(p) {
            if (!p) { return; }
            var pid = p.attributes.roomId;
            mc.ui.avatar__rail(p);
            mainRoom.chats.privates[pid].model.chats
                .bind('afteradd', mc.ui.avatar__msg);
        },
        /**
         * Responsive avatar chat model setter.
         * @method avatar__attr
         * @param {string} src Static asset URL.
         */
        avatar__attr: function(src) {
            return [1, 2].map(function(r) {
                return src.replace(/(\d+)([^0-9]+)?$/, function(u, n, ext) {
                    return r*Number(n) + (ext || '') + ' ' + r + 'x';
                });
            }).join(', ');
        },
        /**
         * CSS mobile breakpoint tester.
         * @method bpt
         * @returns {Boolean} Whether the view is "mobile".
         */
        bpt: function() {
            return window.matchMedia([
                'screen and (max-aspect-ratio: 3/4) and (min-resolution: 240dpi)',
                '(max-aspect-ratio: 3/4) and (max-width: 1080px) and (min-resolution: 200dpi)',
                '(max-aspect-ratio: 3/4) and (max-width: 720px) and (min-resolution: 150dpi)',
                '(max-width: 480px)'
            ].join(', ')).matches;
        },
        /**
         * Responsive design view handler.
         * @method rd
         */
        rd: function() {
            var m = mc.ui.bpt();
            if (mc.state && !m) {
                mc.off();
            } else if (!mc.state && m) {
                mc.on();
            }
        },
        /**
         * Interface load event (jQuery promise).
         * @member {Object} $executed
         */
        $executed: $.Deferred()
    };
    /**
     * Mobile chat view controller.
     * @member {Object} menu
     */
    mc.views = {
        /**
         * Chat interface initialiser.
         * @method init
         */
        init: function() {
            // Activation event.
            mc.views.$executed.resolve();
        },
        /**
         * Chat interface initialiser.
         * @method on
         */
        on: function() {
            $(window.dev.chat.toolbar).show().insertAfter('#Rail .public');
            $(document.body).on('click.mc', '.Chat li[data-user]', mc.views.menu__on);
            $(document.body).on('animationstart.mc', mc.views.input__off);
            $('textarea[name="message"]').prop('disabled', false);
        },
        /**
         * Chat interface initialiser.
         * @method off
         */
        off: function() {
            $(window.dev.chat.toolbar).insertBefore('#ChatHeader .User');
            $(document.body).off('.mc')
                .removeClass('mc-menu-is-active')
                .find('textarea[name="message"]')
                .prop('disabled', false);
        },
        /**
         * Chat menu activation handler.
         * Enables users to click on messages and see user popouts.
         * @method menu__on
         * @param {Object} e jQuery event data
         */
        menu__on: function(e) {
            var u = $(e.target).closest('li').data('user'),
                m = mainRoom.model.users.findByName(u);
            if (m && u !== conf.wgUserName) {
                $(document.body)
                    .addClass('mc-menu-is-active')
                    .on('click.mc', mc.views.menu__off);
                mainRoom.mainListClick({
                    'name': u,
                    'target': $(m.view.el)
                });
            }
        },
        /**
         * Chat menu deactivation handler.
         * @method menu__off
         * @param {Object} e jQuery event data
         */
        menu__off: function(e) {
            if (!$(e.target).closest('#UserStatsMenu').length) {
                $(document.body)
                    .removeClass('mc-menu-is-active')
                    .off('click.mc', mc.views.menu__off);
            }
        },
        /**
         * Chat messaging deactivation handler.
         * Disables the message textarea for UX reasons.
         * @method input__on
         * @param {Object} e jQuery event data
         */
        input__off: function(e) {
            if (e.originalEvent.animationName !== 'mobilechat__menu') {
                return;
            }
            $(document.body)
                .on('mouseover.mc', mc.views.input__on)
                .find('textarea[name="message"]')
                .prop('disabled', true);
        },
        /**
         * Chat messaging reactivation handler.
         * @method input__on
         * @param {Object} e jQuery event data
         */
        input__on: function(e) {
            if (!$(e.target).closest('.Rail').length) {
                $(document.body)
                    .off('mouseover.mc', mc.views.input__on)
                    .find('textarea[name="message"]')
                    .prop('disabled', false);
            }
        },
        /**
         * View load event (jQuery promise).
         * @member {Object} $executed
         */
        $executed: $.Deferred()
    };
    /**
     * Module registry.
     * @member {Array.<String>} modules
     */
    mc.modules = Object.keys(mc).filter(function(m) {
        return typeof mc[m].init === 'function';
    });
    // Library dependencies.
    $.each({
        'chat':   'u:dev:Chat-js.js',
        'colors': 'u:dev:Colors/code.js'
    }, function(l, s) {
        // Import scripts.
        if (!window.dev.hasOwnProperty(l)) {
            importArticle({ type: 'script', article: s });
        }
        // Fetch dependencies.
        mw.hook('dev.' + l).add(mc.boot);
    });
    // Script bootloader.
    $(importArticle(mc.ui.style)).load(mc.boot);
});