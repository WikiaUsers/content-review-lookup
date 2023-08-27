/**
 * Name:        MoreSocialLinks
 * Version:     v1.1
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Adds Instagram, Twitch and YouTube links to user profiles
 */
(function() {
    'use strict';
    var config = mw.config.get([
        'profileUserId',
        'profileUserName',
        'wgUserId'
    ]);
    if (!config.profileUserName || window.MoreSocialLinksLoaded) {
        return;
    }
    window.MoreSocialLinksLoaded = true;
    var MoreSocialLinks = {
        regexes: {
            instagram: /^https?:\/\/(?:m\.|www\.)?instagram\.com\//,
            twitch: /^https?:\/\/twitch\.tv\//,
            twitter: /^https?:\/\/(?:mobile\.)?twitter\.com\//,
            youtube: /^https?:\/\/(?:m\.|www\.)?youtube\.com\/(?:user|channel)\//
        },
        linkFields: [
            'facebook',
            'instagram',
            'twitch',
            'twitter',
            'website',
            'youtube'
        ],
        links: {},
        loaded: function() {
            $.when(
                window.dev.i18n.loadMessages('MoreSocialLinks'),
                this.findContainer()
            ).then(this.init.bind(this));
        },
        findContainer: function() {
	        var promise = $.Deferred();
	        var interval = setInterval(function() {
                var $element = $('#userProfileApp .user-identity-social');
                if ($element.length) {
                    clearInterval(interval);
                    promise.resolve($element);
                }
            }, 300);
	        return promise;
	    },
        init: function(i18n, $links) {
            this.i18n = i18n;
            this.$links = $links;
            $.get('https://services.fandom.com/user-attribute/user/bulk', {
                cb: Date.now(),
                id: config.profileUserId
            }).then(this.show.bind(this));
        },
        show: function(data) {
            $.each(data.users[config.profileUserId], this.eachLink.bind(this));
            if (Number(config.wgUserId) === Number(config.profileUserId)) {
                this.links.edit = '#';
            }
            var links = window.dev.ui({
                type: 'ul',
                classes: ['user-identity-social'],
                children: $.map(this.links, this.mapLink.bind(this))
            });
            $(links).append(this.$links.find('.user-identity-social__icon.wds-dropdown'));
            this.$links.replaceWith(links);
            this.initModal();
            $(links).find('.edit > a')
                .click(this.edit.bind(this))
                .removeAttr('target');
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
                    } else {
                        this.links.youtube = 'https://youtube.com/user/' + v;
                    }
                    break;
                case 'twitter':
                    this.links.twitter = 'https://twitter.com/' + v;
                    break;
                case 'website':
                    this.links.website = v;
                    break;
            }
        },
        mapLink: function(v, k) {
            return {
                type: 'li',
                classes: [k],
                children: [
                    {
                        type: 'a',
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
                            }
                        ],
                        classes: ['user-identity-social__icon'],
                        attr: {
                            href: v,
                            rel: 'noopener noreferrer',
                            target: '_blank'
                        },
                        title: this.msg('link-' + k)
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
                    }
                ],
                content: {
                    type: 'form',
                    classes: [
                        'MoreSocialLinksForm'
                    ],
                    children: $.map(this.linkFields, this.mapGroup.bind(this))
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
        mapGroup: function(k) {
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
                            value: this.links[k] || ''
                        }
                    }
                ]
            };
        },
        save: function() {
            var data = {};
            $('.MoreSocialLinksForm input').each((function(_, el) {
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
            }).bind(this));
            $.ajax({
                context: this,
                data: data,
                type: 'PATCH',
                url: 'https://services.fandom.com/user-attribute/user/' +
                     config.profileUserId,
                xhrFields: {
                    withCredentials: true
                }
            }).done(this.saved);
        },
        saved: function(d) {
            window.location.reload();
        },
        edit: function() {
            this.modal.show();
        },
        msg: function(msg) {
            return this.i18n.msg(msg).plain();
        }
    };
    importArticle({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:UI-js/code.js',
            'u:dev:MediaWiki:Modal.js'
        ]
    });
    importArticles({
        type: 'style',
        articles: [
            'u:dev:MediaWiki:FandomIcons.css',
            'u:dev:MediaWiki:MoreSocialLinks.css'
        ]
    });
    // I18n-js and UI-js fire their hooks immediately after loading, while Modal
    // needs to wait for ooui-js-windows to load, so it is guaranteed to load
    // last.
    mw.hook('dev.modal').add(MoreSocialLinks.loaded.bind(MoreSocialLinks));
})();