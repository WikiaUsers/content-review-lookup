(function() {
    'use strict';
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' ||
        window.ChatThemeSwitcherLoaded
    ) {
        return;
    }
    window.ChatThemeSwitcherLoaded = true;
    var ChatThemeSwitcher = {
        _loaded: 0,
        config: $.extend({
            modes: ['day', 'night']
        }, window.ChatThemeSwitcherConfig),
        preload: function() {
            if (++this._loaded === 2) {
                window.dev.i18n.loadMessages('ChatThemeSwitcher').then(
                    $.proxy(this.init, this)
                );
            }
        },
        nextMode: function() {
            if (++this.index === this.modes.length) {
                this.index = 0;
            }
            return this.modes[this.index];
        },
        init: function(i18n) {
            this.$window = $('.ChatWindow');
            this.modes = this.config.modes;
            if (this.config.mode) {
                this.mode = this.config.mode;
                this.index = this.modes.indexOf(this.mode);
            } else {
                this.mode = this.modes[0];
                this.index = 0;
            }
            this.$window.addClass(this.mode);
            this.text = $.extend({
                day: window.night_button || i18n.msg('day').plain(),
                night: window.day_button || i18n.msg('night').plain(),
                defMsg: i18n.msg('default').plain()
            }, this.config.text);
            this.button = new dev.chat.Button({
                name: 'ChatThemeSwitcher',
                attr: {
                    click: $.proxy(this.click, this),
                    text: this.text[this.nextMode()] || this.text.defMsg
                }
            });
            --this.index;
            this.addLegacyStyles();
        },
        // Because somebody thought CSS through JS is a good idea
        addLegacyStyles: function() {
            var css = '';
            if (window.backgroundColor) {
                css += 'body.night {' +
                    'background-color: ' + window.backgroundColor + ';' +
                '}';
            }
            if (window.textColor) {
                css += '.night .username,' +
                    '.night .message,',
                    '.night div.chattopic,' +
                    '.night .info .edits,' +
                    '.night .UserStatsMenu .info .since,' +
                    '.night #ChatHeader h1.private,' +
                    '.night .Write [name="message"] {' +
                        'color: ' + window.textColor + ';' +
                    '}';
            }
            if (window.foregroundColor) {
                css += '.night .WikiaPage,' +
                    '.night .UserStatsMenu,' +
                    '.night .ChatHeader,' +
                    '.night .Write [name="message"] {' +
                        'background-color: ' + window.foregroundColor + ';' +
                    '}';
            }
            if (window.selfTextColor) {
                css += '.night .Chat .you {' +
                    'background-color: ' + window.selfTextColor + ';' +
                '}';
            }
            if (window.linkColor) {
                css += '.night a { color: ' + window.linkColor +';}';
            }
            if (window.userStatsColor) {
                css += '.night .UserStatsMenu .info{' +
                    'background-color:' + window.userStatsColor + ';' +
                '}';
            }
            if (css) {
                mw.util.addCSS(css);
            }
        },
        click: function() {
            this.$window.removeClass(this.mode);
            this.mode = this.nextMode();
            $(this.button.el).text(this.text[this.nextMode()] || this.text.defMsg);
            --this.index;
            this.$window.addClass(this.mode);
        }
    };
    mw.hook('dev.chat').add($.proxy(ChatThemeSwitcher.preload, ChatThemeSwitcher));
    mw.hook('dev.i18n').add($.proxy(ChatThemeSwitcher.preload, ChatThemeSwitcher));
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Chat-js.js',
            'u:dev:MediaWiki:I18n-js/code.js'
        ]
    });
})();