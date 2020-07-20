/**
 * Name:        MoreSocialLinks
 * Version:     v1.0
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Adds Instagram, Twitch and YouTube links to user profiles
 */
require([
    'wikia.window',
    'mw',
    'jquery',
    'wikia.nirvana'
], function(window, mw, $, nirvana) {
    'use strict';
    var $masthead = $('#UserProfileMasthead');
    if (!$masthead.exists() || window.MoreSocialLinksLoaded) {
        return;
    }
    window.MoreSocialLinksLoaded = true;
    if (
        !window.dev || !window.dev.i18n ||
        !window.dev.ui || !window.dev.modal
    ) {
        importArticle({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:I18n-js/code.js',
                'u:dev:MediaWiki:Modal.js',
                'u:dev:MediaWiki:UI-js/code.js'
            ]
        });
    }
    importArticles({
        type: 'style',
        articles: [
            'u:dev:MediaWiki:FandomIcons.css',
            'u:dev:MediaWiki:MoreSocialLinks.css'
        ]
    });
    var MoreSocialLinks = {
        regexes: {
            instagram: /^https?:\/\/(?:m\.|www\.)?instagram\.com\//,
            twitch: /^https?:\/\/twitch\.tv\//,
            twitter: /^https?:\/\/(?:mobile\.)?twitter\.com\//,
            youtube: /^https?:\/\/(?:m\.|www\.)?youtube\.com\/(?:user|channel)\//
        },
        links: {},
        username: $masthead.find('h1[itemprop="name"]').text(),
        toLoad: 3,
        preload: function() {
            if (--this.toLoad === 0) {
                $.when(
                    window.dev.i18n.loadMessages('MoreSocialLinks'),
                    this.nirvana()
                ).then($.proxy(this.init, this));
            }
        },
        nirvana: function() {
            return nirvana.getJson(
                'UserProfilePage',
                'renderUserIdentityBox',
                {
                    title: 'User:' + this.username
                }
            );
        },
        init: function(i18n, data) {
            this.i18n = i18n;
            this.id = data[0].user.id;
            this.canEdit = data[0].canEditProfile;
            this.services().then($.proxy(this.show, this));
        },
        services: function() {
            return $.get(
                'https://services.wikia.com/user-attribute/user/bulk',
                {
                    id: this.id
                }
            );
        },
        show: function(data) {
            var $links = $masthead.find('.links');
            $.each(data.users[this.id], $.proxy(this.eachLink, this));
            var links = window.dev.ui({
                type: 'ul',
                classes: ['links'],
                children: $.map(this.links, $.proxy(this.mapLink, this))
            });
            if ($links.exists()) {
                $links.replaceWith(links);
            } else {
                $masthead.find('.masthead-info-lower').append(links);
            }
            this.initModal();
            $masthead.find('.links > .edit > a')
                .click($.proxy(this.edit, this));
        },
        eachLink: function(k, v) {
            if (!v) {
                return;
            }
            switch (k) {
                case 'fbPage':
                    this.links.facebook = v;
                    break;
                case 'social_instagram':
                    this.links.instagram = 'https://instagram.com/' + v;
                    break;
                case 'social_twitch':
                    this.links.twitch = 'https://twitch.tv/' + v;
                    break;
                case 'social_youtube':
                    if (v.match(this.regexes.youtube)) {
                        this.links.youtube = v;
                    }
                    break;
                case 'twitter':
                    this.links.twitter = 'https://twitter.com/' + v;
                    break;
                case 'website':
                    this.links.website = v;
                    break;
                default:
                    if (this.canEdit) {
                        this.links.edit = '#';
                    }
                    break;
            }
        },
        mapLink: function(v, k) {
            return {
                type: 'li',
                classes: [k],
                children: [
                    {
                        type: 'span',
                        classes: [
                            'fandom-icons',
                            'icon-' + (
                                k === 'website' ?
                                    'earth' :
                                    k === 'edit' ?
                                        'pencil' :
                                        k
                            )
                        ]
                    },
                    {
                        type: 'a',
                        attr: {
                            href: v,
                            rel: 'nofollow'
                        },
                        text: this.msg('link-' + k)
                    }
                ]
            };
        },
        initModal: function() {
            this.modal = new window.dev.modal.Modal({
                buttons: [
                    {
                        event: 'save',
                        primary: true,
                        text: this.msg('save')
                    },
                    {
                        event: 'close',
                        text: this.msg('cancel')
                    }
                ],
                closeTitle: this.msg('cancel'),
                content: {
                    type: 'form',
                    classes: [
                        'MoreSocialLinksForm',
                        'WikiaForm'
                    ],
                    children: $.map(this.links, $.proxy(this.mapGroup, this))
                        .filter(Boolean)
                },
                context: this,
                events: {
                    save: 'save'
                },
                id: 'MoreSocialLinksModal',
                size: 'small',
                title: this.msg('link-edit')
            });
            this.modal.create();
        },
        mapGroup: function(v, k) {
            if (k === 'edit') {
                return false;
            }
            return {
                type: 'div',
                classes: ['input-group'],
                children: [
                    {
                        type: 'label',
                        attr: {
                            'for': k
                        },
                        text: this.msg('link-' + k)
                    },
                    {
                        type: 'input',
                        attr: {
                            id: k,
                            name: k,
                            type: 'text',
                            value: v
                        }
                    }
                ]
            };
        },
        save: function() {
            var data = {};
            $('.MoreSocialLinksForm input').each($.proxy(function(_, el) {
                var $el = $(el),
                    val = $el.val(),
                    name = $el.attr('name'),
                    regex = this.regexes[name];
                if (regex && val.match(regex)) {
                    val = val.replace(regex, '');
                }
                switch (name) {
                    case 'facebook':
                        data.fbPage = val;
                        break;
                    case 'instagram':
                    case 'twitch':
                    case 'youtube':
                        data['social_' + name] = val;
                        break;
                    default:
                        data[name] = val;
                        break;
                }
            }, this));
            $.ajax({
                context: this,
                data: data,
                type: 'PATCH',
                url: 'https://services.wikia.com/user-attribute/user/' +
                     this.id,
                xhrFields: {
                    withCredentials: true
                }
            }).done(this.saved);
        },
        saved: function(d) {
            console.log(d);
            window.location.reload();
        },
        edit: function() {
            this.modal.show();
        },
        msg: function(msg) {
            return this.i18n.msg(msg).plain();
        }
    };
    mw.hook('dev.i18n').add($.proxy(MoreSocialLinks.preload, MoreSocialLinks));
    mw.hook('dev.ui').add($.proxy(MoreSocialLinks.preload, MoreSocialLinks));
    mw.hook('dev.modal').add($.proxy(MoreSocialLinks.preload, MoreSocialLinks));
});