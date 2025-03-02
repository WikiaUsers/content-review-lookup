/**
 * SpoilerAlert
 * documentation at: https://dev.fandom.com/wiki/SpoilerAlert
 * © Peter Coester, 2012
 */
/* jshint curly:false */
(function ($, mw) {
    'use strict';
    var config = mw.config.get([
        'wgArticleId',
        'wgNamespaceNumber',
        'wgScriptPath',
        'wgServer'
    ]), $element = $('#SpoilerAlert');
    if (
        config.wgNamespaceNumber === -1 ||
        config.wgArticleId === 0 ||
        $element.length !== 1
    ) {
        return;
    }
    var SpoilerAlert = {
        config: $.extend({
            fadeDelay: 1600
        }, window.SpoilerAlertJS),
        toLoad: 3,
        preload: function() {
            if (--this.toLoad === 0) {
                window.dev.i18n.loadMessages('SpoilerAlert')
                    .then(this.init.bind(this));
            }
        },
        init: function(i18n) {
            this.ids = JSON.parse(window.localStorage.getItem('SpoilerAlert')) || [];
            ['yes', 'no', 'question'].forEach(function(msg) {
                if (!this.config[msg]) {
                    this.config[msg] = i18n.msg(msg).plain();
                }
            }, this);
            if (this.valid()) {
                this.insertUI();
            }
            this.insertResetButton(i18n);
        },
        valid: function() {
            return $element.height() < $('#mw-content-text').height() / 2 &&
                   this.ids.indexOf(config.wgArticleId) === -1;
        },
        insertUI: function() {
            var pos = $element.position();
            $('#mw-content-text').append(
                window.dev.ui({
                    type: 'div',
                    attr: {
                        id: 'SpoilerAlertCover'
                    },
                    style: {
                        width: $element.width() + 'px',
                        height: $element.height() + 'px',
                        top: pos.top + 'px',
                        left: pos.left + 'px'
                    },
                    children: [
                        {
                            type: 'p',
                            attr: {
                                id: 'SpoilerAlertText'
                            },
                            text: this.config.question
                        },
                        {
                            type: 'span',
                            attr: {
                                id: 'SpoilerAlertYes',
                                'class': 'wds-button'
                            },
                            events: {
                                click: this.yes.bind(this)
                            },
                            text: this.config.yes
                        },
                        {
                            type: 'span',
                            attr: {
                                id: 'SpoilerAlertNo',
                                'class': 'wds-button'
                            },
                            events: {
                                click: this.no.bind(this)
                            },
                            text: this.config.no
                        }
                    ]
                })
            );
        },
        insertResetButton: function(i18n) {
            window.dev.placement.loader.util({
                content: {
                    type: 'li',
                    children: [
                        {
                            type: 'a',
                            attr: {
                                href: '#'
                            },
                            text: i18n.msg('reset').plain(),
                            events: {
                                click: this.reset
                            }
                        }
                    ]
                },
                element: 'tools',
                script: 'SpoilerAlert',
                type: 'append'
            });
        },
        yes: function() {
            this.fadeOut('#SpoilerAlertCover');
            this.ids.push(config.wgArticleId);
            window.localStorage.setItem('SpoilerAlert', JSON.stringify(this.ids));
        },
        no: function() {
            this.fadeOut('#SpoilerAlertText, #SpoilerAlertYes, #SpoilerAlertNo');
            if (this.config.back) {
                if (window.history && window.history.length > 1) {
                    window.history.back();
                } else {
                    location.href = config.wgServer + config.wgScriptPath;
                }
            }
        },
        fadeOut: function(el) {
            $(el).fadeOut(this.config.fadeDelay, function() {
                $(this).remove();
            });
        },
        reset: function(event) {
            event.preventDefault();
            window.localStorage.setItem('SpoilerAlert', JSON.stringify([]));
            window.location.reload();
        }
    };
    if (!window.dev || !window.dev.ui || !window.dev.i18n || !window.dev.placement) {
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:I18n-js/code.js',
                'u:dev:MediaWiki:Placement.js',
                'u:dev:MediaWiki:UI-js/code.js'
            ]
        });
    }
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:SpoilerAlert.css'
    });
    mw.hook('dev.ui').add(SpoilerAlert.preload.bind(SpoilerAlert));
    mw.hook('dev.i18n').add(SpoilerAlert.preload.bind(SpoilerAlert));
    mw.hook('dev.placement').add(SpoilerAlert.preload.bind(SpoilerAlert));
})(window.jQuery, window.mediaWiki);