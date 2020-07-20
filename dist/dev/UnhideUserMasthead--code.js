/**
 * Name:        UnhideUserMasthead
 * Description: Unhides user information in masthead on wikis where the user's
 *              masthead doesn't exist.
 * Version:     v1.4
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Notes:       The original version of this script located in my userspace on
 *              [[w:c:kocka]] was also able to unhide the user's birthday.
 *              By request of Staff, this option has been commented out.
 */
(function() {
    'use strict';
    if (
        $('#UserProfileMasthead').length === 0 ||
        (window.UnhideUserMasthead && window.UnhideUserMasthead.loaded)
    ) {
        return;
    }
    window.UnhideUserMasthead = $.extend({
        loaded: true,
        properties: [
            'location',
            // 'UserProfilePagesV3_birthday',
            'occupation',
            'UserProfilePagesV3_gender',
            'website',
            'twitter',
            'fbPage',
            'discordHandle',
            'name'
        ],
        i18nMsg: [
            'aka-label',
            'location',
            'my-website',
            'my-twitter',
            'my-fb-page',
            'my-discord-handle',
            'occupation',
            'was-born-on'
        ],
        i18n: {},
        propMessageMap: {
            location: 'location',
            occupation: 'occupation',
            UserProfilePagesV3_gender: '',
            // UserProfilePagesV3_birthday: 'was-born-on',
            website: 'my-website',
            fbPage: 'my-fb-page',
            twitter: 'my-twitter',
            discordHandle: 'my-discord-handle'
        },
        websiteInfo: {
            website: [
                'website',
                '',
                /^https?:\/\/(?:www\.)?(.*)\/*/
            ],
            twitter: [
                'twitter',
                'https://twitter.com/',
                /^https?:\/\/(?:mobile\.)?twitter\.com\/(.*)\/*$/
            ],
            fbPage: [
                'facebook',
                '',
                /^https?:\/\/(?:www\.|m\.|web\.)?facebook\.com\/(.*)\/*/
            ]
        },
        init: function(ui) {
            this.ui = ui;
            new mw.Api().get({
                action: 'query',
                meta: 'allmessages',
                ammessages: this.i18nMsg.map(function(msg) {
                    return 'user-identity-box-' + msg;
                }).join('|') + '|user-identity-i-am'
            }).done($.proxy(this.i18nCallback, this));
        },
        i18nCallback: function(d) {
            if (!d.error) {
                d.query.allmessages.forEach(function(msg) {
                    this.i18n[msg.name.substring(18)] = msg['*'];
                }, this);
                $.nirvana.getJson('UserProfilePage', 'renderUserIdentityBox', {
                    title: 'User:' + $('.masthead-info hgroup h1').text()
                }, $.proxy(this.detailsCallback, this));
            }
        },
        detailsCallback: function(d) {
            var user = d.user;
            if (user && !user.registration && user.id) {
                $.get(
                    'https://services.fandom.com/user-attribute/user/' + user.id,
                    $.proxy(this.callbackProp, this)
                );
            }
        },
        callbackProp: function(d) {
            d._embedded.properties.sort($.proxy(this.sortProps, this)).forEach($.proxy(this.prop, this));
            $('.details .bio, #bio-toggler').appendTo('.details ul');
            if (d._embedded.properties.some(this.isMapped, this)) {
                $('#UserProfileMasthead').removeClass('zero-state');
            }
        },
        isMapped: function(prop) {
            return prop.value && this.propMessageMap[prop.name];
        },
        sortProps: function(a, b) {
            return this.properties.indexOf(a.name) - this.properties.indexOf(b.name);
        },
        prop: function(d) {
            if (!d.value) {
                return;
            }
            switch (d.name) {
                case 'name':
                    if (!$('.masthead-info hgroup h2').exists()) {
                        $('.masthead-info hgroup h1').after(this.ui({
                            type: 'h2',
                            html: this.i18n['aka-label']
                                .replace('$1', mw.html.escape(d.value))
                        }));
                    }
                    break;
                case 'UserProfilePagesV3_gender':
                case 'location':
                case 'occupation':
                    this.ui({
                        type: 'li',
                        html: this.i18n[this.propMessageMap[d.name]]
                            .replace('$1', mw.html.escape(d.value)),
                        parent: '.masthead-info .details ul'
                    });
                    break;
                /*
                case 'UserProfilePagesV3_birthday':
                    var s = d.value.split('-');
                    this.ui({
                        type: 'li',
                        html: this.i18n[this.propMessageMap.UserProfilePagesV3_birthday]
                            .replace('$1', mw.config.get('wgMonthNames')[s.shift()])
                            .replace('$2', Number(s.shift()) || 0),
                        parent: '.masthead-info .details ul'
                    });
                    break;
                */
                case 'website':
                case 'twitter':
                case 'fbPage':
                    var info = this.websiteInfo[d.name],
                        className = info[0],
                        message;
                    if ($('.masthead-info-lower .links .' + className).exists()) {
                        break;
                    }
                    if (this.unhideLinks) {
                        var match = d.value.match(info[2]);
                        if (match && match[1]) {
                            message = decodeURIComponent(match[1]);
                        } else {
                            message = d.value;
                        }
                    } else {
                        message = this.i18n[this.propMessageMap[d.name]];
                    }
                    this.ui({
                        type: 'li',
                        classes: [
                            className
                        ],
                        children: [
                            {
                                type: 'a',
                                attr: {
                                    href: info[1] + (
                                        info[1] === '' ?
                                            d.value :
                                            encodeURIComponent(d.value)
                                    )
                                },
                                children: [
                                    {
                                        type: 'img',
                                        attr: {
                                            'class': className + ' icon'
                                        }
                                    },
                                    // Don't blame me, Fandom does it this way too
                                    '             ' +
                                    message
                                ]
                            }
                        ],
                        parent: '.masthead-info-lower .links'
                    });
                    break;
                case 'discordHandle':
                    // TODO
                    break;
            }
        }
    }, window.UnhideUserMasthead);
    // Preload resources
    if (!window.dev || !window.dev.ui) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:UI-js/code.js'
        });
    }
    mw.loader.using('mediawiki.api').done(function() {
        mw.hook('dev.ui').add($.proxy(UnhideUserMasthead.init, UnhideUserMasthead));
    });
})();