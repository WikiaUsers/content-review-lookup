/**
 * Name:        DiscordIntegrator
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Optimized by: Customization for Welcome to NHK Wiki
 * Description: Allows integration with Discord [https://discord.com]
 */
(function () {
    'use strict';

    if (window.DiscordIntegratorLoaded) {
        return;
    }
    window.DiscordIntegratorLoaded = true;

    const mconfig = mw.config.get(['wgContentLanguage', 'wgUserLanguage', 'wgUserName']);
    const $body = $('body');
    const $wikiaRail = $('#WikiaRail');
    const configKeys = ['id', 'title', 'moduleHeight', 'theme', 'width', 'height', 'text', 'logged-in', 'footer', 'username'];

    const DiscordIntegrator = {
        config: (window.DiscordIntegratorConfig || {}).siderail || {},
        i18n: null,
        api: null,
        loadingCount: 0,

        imported: function () {
            $.when(
                window.dev.i18n.loadMessages('DiscordIntegrator', { cacheVersion: 3 }),
                mw.loader.using(['mediawiki.api', 'mediawiki.util'])
            ).then(this.preload.bind(this));
        },

        preload: function (i18n) {
            this.i18n = i18n;
            this.api = new mw.Api();
            mw.hook('wikipage.content').add(this.insertToContent.bind(this));

            const messagesParam = configKeys.map(el => `Custom-DiscordIntegrator-config-${el}`).join('|');
            const langParam = mconfig.wgUserLanguage === 'qqx' ? mconfig.wgContentLanguage : mconfig.wgUserLanguage;

            this.api.get({
                action: 'query',
                meta: 'allmessages',
                ammessages: messagesParam,
                amlang: langParam,
                uselang: 'content',
                smaxage: 300,
                maxage: 300
            }).done((d) => {
                if (!d.error) {
                    d.query.allmessages.forEach(el => {
                        if (el['*']) {
                            this.config[el.name.substring(32)] = el['*'];
                        }
                    });
                    this.loadingCount = 0;
                    ['text', 'title', 'footer'].forEach(this.parse.bind(this));
                    if (this.loadingCount === 0) {
                        this.init();
                    }
                }
            });
        },

        parse: function (msg) {
            if (this.config[msg]) {
                this.loadingCount++;
                this.api.get({
                    action: 'parse',
                    text: this.config[msg],
                    smaxage: 86400,
                    maxage: 86400
                }).done((d) => {
                    if (!d.error) {
                        this.config[msg] = d.parse.text['*'];
                        if (--this.loadingCount === 0) {
                            this.init();
                        }
                    }
                });
            }
        },

        init: function () {
            if (this.config.id && $wikiaRail.length > 0) {
                const railClasses = $wikiaRail.attr('class');
                if (!railClasses || (!railClasses.includes('loaded') && !railClasses.includes('is-ready'))) {
                    $wikiaRail.on('afterLoad.rail', this.insertToSiderail.bind(this));
                } else {
                    this.insertToSiderail();
                }
            }
        },

        insertToSiderail: function () {
            const $filter = $('#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL, .content-review-module').last();
            const $el = $('<div>', { class: 'DiscordIntegratorModule rail-module' });

            if (this.config.title) {
                $el.append($('<h2>', {
                    'class': 'activity-heading',
                    html: this.config.title.trim()
                }));
            }

            if (this.config.text) {
                $el.append($('<p>', {
                    id: 'DiscordIntegratorModuleText',
                    html: this.config.text
                }));
            }

            $el.append(this.generateContent(this.config));

            if (window.location.hostname.includes('fandom.com')) {
                $el.append($('<p>', {
                    css: { fontSize: 'smaller' },
                    text: 'By clicking "Join Discord", you are leaving Fandom to access a third-party site (Discord). Fandom is not responsible for any content, conduct, or policies on external platforms.'
                }));
            }

            if (this.config.footer) {
                $el.append($('<p>', {
                    id: 'DiscordIntegratorModuleFooter',
                    html: this.config.footer
                }));
            }

            if ($filter.length > 0) {
                $el.insertAfter($filter);
            } else {
                $wikiaRail.prepend($el);
            }

            if (this.config.moduleHeight) {
                mw.util.addCSS(`.DiscordIntegratorModule { height: ${Number(this.config.moduleHeight)}px; }`);
            }

            mw.hook('DiscordIntegrator.added').fire($el);
        },

        insertToContent: function ($content) {
            $content.find('.DiscordIntegrator:not(.loaded)').each((i, el) => {
                const $el = $(el);
                $el.html(this.generateContent($el.data())).addClass('loaded');
            });
        },

        determineTheme: function (theme) {
            if (theme === 'dark' || theme === 'light') {
                return theme;
            }
            return $body.hasClass('theme-fandomdesktop-light') ? 'light' : 'dark';
        },

        generateContent: function (config) {
            const serverId = String(config.id);
            if (!serverId.match(/^\d{17,19}$/)) {
                return this.i18n.msg('error').parse();
            }

            const isLoggedIn = config.loggedIn === true ||
                (Boolean(config['logged-in']) === true &&
                    config['logged-in'] !== 'false' &&
                    config['logged-in'] !== '{{{loggedIn}}}');

            if (isLoggedIn && !mconfig.wgUserName) {
                return this.i18n.msg('login').parse();
            }

            let username = mconfig.wgUserName;
            if (config.username === '@disabled') {
                username = '';
            } else if (config.username === '@function' && typeof window.DiscordIntegratorGetUsername === 'function') {
                username = window.DiscordIntegratorGetUsername();
            } else if (config.username) {
                username = config.username;
            }

            const theme = this.determineTheme(config.theme);
            const src = `https://discord.com/widget?id=${serverId}&theme=${theme}&username=${encodeURIComponent(username)}`;

            return mw.html.element('iframe', {
                src,
                width: config.width || '100%',
                height: config.height || '400px',
                allowtransparency: 'true',
                frameborder: '0',
                title: this.i18n.msg('title').plain()
            });
        }
    };

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    }).then(DiscordIntegrator.imported.bind(DiscordIntegrator));
})();