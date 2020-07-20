/**
 * @version 3.0.0
 */

(function() {
    if (window.Discord && Discord.init) return;

    window.Discord = $.extend({
        $rail: $('#WikiaRail'),
        // Resource managing
        loaded: 8,
        onload: function(type, arg) {
            switch (type) {
                case 'i18n':
                    arg.loadMessages('Discord').then(this.onload.bind(this, 'lang'));
                    break;
                case 'lang':
                    this.i18n = arg;
                    break;
                case 'api':
                    this.api = new mw.Api();
                    this.getMessages();
                    break;
                case 'messages':
                    if (this.messages.id) {
                        this.fetchWidgetData(this.messages.id).done(this.handleWidgetData.bind(this));
                    } else {
                        this.onload();
                    }
                    break;
            }
            if (--this.loaded) return;
            this.init();
        },
        // Map to cache concurrent widget JSON requests
        requests: {},
        // Get all necessary mw messages to make the script work, with some i18n.msg key defaults
        defaults: {
            // Not needed in case you don't want a rail module but do want element widgets?
            // id: new Error('You have to supply a Discord widget ID! Please edit MediaWiki:Custom-Discord-id'),
            theme: 'light',
            roles: {}
        },
        messages: {},
        getMessages: function() {
            this.api.get({
                action: 'query',
                generator: 'allpages',
                gapnamespace: 8,
                gapprefix: 'Custom-Discord-',
                gaplimit: 'max',
                prop: 'revisions',
                rvprop: 'content'
            }).then(this.handleMessages.bind(this));
        },
        handleMessages: function(data) {
            window.dev = window.dev || {};
            dev.i18n = dev.i18n || {};
            dev.i18n.overrides = dev.i18n.overrides || {};
            dev.i18n.overrides.Discord = dev.i18n.overrides.Discord || {};

            if (data.query) {
                for (var pageId in data.query.pages) {
                    var page = data.query.pages[pageId],
                    title = page.title.slice('MediaWiki:Custom-Discord-'.length),
                    content = page.revisions[0]['*'];
                    if (title.indexOf('-') != -1) {
                        var split = title.split('-'),
                        key = split.pop();
                        title = split[0];

                        this.messages[title] = this.messages[title] || {};
                        this.messages[title][key] = content;
                    } else {
                        this.messages[title] = this.messages[title] || content;
                        dev.i18n.overrides.Discord[title] = dev.i18n.overrides.Discord[title] || content;
                    }
                    delete this.defaults[title]
                }
            }
            for (var key in this.defaults) {
                var value = this.defaults[key];
                if (!this.messages[key]) {
                    if (value instanceof Error) {
                        console.error(value);
                        return;
                    }
                    this.messages[key] = value;
                }
            }
            this.onload('messages');
        },
        fetchWidgetData: function(id) {
            if (this.requests[id]) return this.requests[id];
            this.requests[id] = $.getJSON('https://discordapp.com/api/guilds/' + id + '/widget.json');
            return this.requests[id];
        },
        handleWidgetData: function(data) {
            this.railWidgetData = data;
            this.onload();
        },
        // Called on init to turn the role ID lists into arrays
        mapMessages: function() {
            for (var key in this.messages.roles) {
                var value = this.messages.roles[key];
                this.messages.roles[key] = value.match(/\d+/g);
            }
        },
        logo: function() {
            return {
                type: 'svg',
                attr: {
                    viewBox: '0 0 1000 800',
                    height: '18',
                    width: '18'
                },
                children: [
                    {
                        type: 'path',
                        attr: {
                            // Come on, isn't there a saner way to do this?
                            d: 'M 361.9857,0.00138389\
                                C 348.73055,0.05478389 239.07459,3.1670339 123.39327,89.124664 123.39327,89.124664 0,311.06297 0,584.4136\
                                c 0,0 71.978249,123.39208 261.35281,129.39038 0,0 31.70511,-37.7037 57.41206,-70.26582\
                                C 209.93876,610.97599 168.80785,543.28361 168.80785,543.28361\
                                c 0,0 8.5708,5.99726 23.99498,14.56626 0.85689,0 1.71122,0.85558 3.42502,1.7125 2.57069,1.71377\
                                5.1422,2.57081 7.7129,4.28459 21.42246,11.99658 42.84423,21.42368 62.5529,29.13581 35.13283,14.56729\
                                77.12215,27.41951 125.96536,36.84541 64.26736,11.9966 139.67306,16.28044 221.93532,0.85625\
                                40.27424,-7.71208 81.40794,-18.85053 124.25286,-36.84541 29.99142,-11.13969 63.40925,-27.41914\
                                98.54205,-50.55541 0,0 -42.84417,69.40888 -155.09786,101.11413 25.70697,31.70521 56.55581,68.54998\
                                56.55581,68.54998 C 928.02173,706.94949 1000,583.55668 1000,584.4136 1000,311.06297 876.60671,89.124664\
                                876.60671,89.124664 754.07028,-2.5634661 636.67349,0.00803389 636.67349,0.00803389\
                                L 624.67932,13.718014\
                                C 770.35209,57.419834 838.04548,121.6888 838.04548,121.6888 748.92802,73.702484 661.52634,49.707644 580.121,40.281764\
                                c -61.69669,-6.85519 -120.82499,-5.13937 -173.09576,1.71581 -5.14137,0 -9.42484,0.85563 -14.56623,1.7125\
                                -29.99144,3.42762 -102.82721,13.70953 -194.51535,53.98375 -31.70523,13.710366 -50.55871,23.994976\
                                -50.55871,23.994976 0,0 70.26568,-67.697276 224.50739,-111.399106 L 363.32318,0.00803389\
                                c 0,0 -0.4538,-0.0102 -1.33748,-0.007\
                                z M 340.18778,316.20414 c 48.8432,0 88.26098,41.98669 87.40413,94.25746 0,52.27084 -38.56093,94.2608\
                                -87.40413,94.2608 -47.98632,0 -87.40413,-41.98996 -87.40413,-94.2608 0,-52.27077 38.56091,-94.25746 87.40413,-94.25746 z m 312.76778,0\
                                c 47.98631,0 87.40413,41.98669 87.40413,94.25746 0,52.27084 -38.56089,94.2608 -87.40413,94.2608 -47.9863,0 -87.40413,-41.98996 -87.40413,-94.2608 0,-52.27077 38.56091,-94.25746 87.40413,-94.25746 z'
                        }
                    }
                ]
            }
        },
        avatar: function(member, ext, size) {
            if (!member.avatar) return member.avatar_url;
            return 'https://cdn.discordapp.com/avatars/' + member.id + '/' + member.avatar + '.' + ext + '?size=' + size;
        },
        buildWidget: function(data) {
            return dev.ui({
                children: [
                    this.buildTitle(data),
                    {
                        type: 'div',
                        classes: ['discord-widget-container'],
                        style: data.size || {},
                        children: [
                            {
                                type: 'div',
                                classes: ['discord-widget'],
                                children: [
                                    {
                                        type: 'div',
                                        classes: ['widget', 'widget-theme-' + (data.theme || this.messages.theme)],
                                        children: [
                                            this.buildHeader(data),
                                            this.buildBody(data),
                                            this.buildFooter(data)
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
        },
        buildTitle: function(data) {
            return {
                type: 'div',
                classes: ['title-container'],
                children: [
                    {
                        type: 'h2',
                        classes: ['title', 'has-icon'],
                        children: [
                            this.logo(),
                            {
                                type: 'span',
                                html: this.i18n.msg('header', data.name).parse()
                            }
                        ]
                    }
                ]
            }
        },
        buildHeader: function(data) {
            return {
                type: 'div',
                classes: ['widget-header'],
                children: [
                    {
                        type: 'a',
                        classes: ['widget-logo'],
                        attr: {
                            href: 'https://discordapp.com/?utm_source=Discord%20Widget&utm_medium=Logo',
                            target: '_blank'
                        }
                    },
                    {
                        type: 'span',
                        classes: ['widget-header-count'],
                        html: this.i18n.msg('online', data.members.length).parse()
                    }
                ]
            }
        },
        buildBody: function(data) {
            /* TODO: Channels? */
            var roles = this.groupMemberRoles(data.members);
            return {
                type: 'div',
                classes: ['widget-body'],
                children: roles.map(this.buildRoleContainer.bind(this, data))
            };
        },
        buildRoleContainer: function(data, role) {
            var name = role[0],
            members = role[1],
            defaultRole = role[2];
            return {
                type: 'div',
                classes: ['widget-role-container'],
                condition: members.length,
                children: [
                    {
                        type: 'div',
                        classes: ['widget-role-name'],
                        attr: $.extend({
                            'data-name': name
                        }, defaultRole ? {
                            'data-default': 'true'
                        } : {}),
                        html: name
                    }
                ].concat(members.map(this.buildUserChip.bind(this, data)))
            };
        },
        buildUserChip: function(data, member) {
            // TODO: GIF avatars
            return {
                type: 'div',
                classes: ['widget-member'],
                children: [
                    {
                        type: 'div',
                        classes: ['widget-member-avatar'],
                        children: [
                            {
                                type: 'img',
                                attr: {
                                    src: this.avatar(member, 'jpg', 64)
                                }
                            },
                            {
                                type: 'span',
                                classes: ['widget-member-status', 'widget-member-status-' + member.status]
                            }
                        ]
                    },
                    {
                        type: 'span',
                        classes: ['widget-member-name'],
                        text: member.nick || member.username
                    }
                ],
                events: {
                    click: this.showMemberModal.bind(this, data, member)
                }
            };
        },
        buildFooter: function(data) {
            return {
                type: 'div',
                classes: ['widget-footer'],
                children: [
                    {
                        type: 'span',
                        classes: ['widget-footer-info'],
                        html: this.i18n.msg('footer', this.messages.guidelines).parse(),
                        condition: this.messages.guidelines || this.messages.footer
                    },
                    {
                        type: 'a',
                        classes: ['widget-btn-connect'],
                        attr: {
                            href: data.instant_invite,
                            target: '_blank'
                        },
                        html: this.i18n.msg('join').parse()
                    }
                ]
            };
        },
        // Returns Array<[role, members[]]> because objects aren't required to keep assignment order, and maps are horrifying to use
        groupMemberRoles: function(members) {
            var grouped = [],
            indices = {},
            defaultRole = this.i18n.msg('users').plain(),
            roles = Object.keys(this.messages.roles);

            members.sort(function(a, b) {
                return (a.nick || a.username).localeCompare(b.nick || b.username);
            });

            if (this.messages.order) {
                var order = this.messages.order.split(',').map(function(name) {
                    return name.trim();
                });
                roles.sort(function(a, b) {
                    var aIndex = order.indexOf(a);
                    if (aIndex == -1) return 1;
                    var bIndex = order.indexOf(b);
                    if (bIndex == -1) return -1;
                    return aIndex - bIndex;
                });
            }

            for (var i in roles) {
                var role = roles[i];
                indices[role] = grouped.push([ role, [] ]) - 1;
            }
            indices[defaultRole] = grouped.push([ defaultRole, [], true ]) - 1;

            for (var i in members) {
                var member = members[i],
                assigned = false;

                for (var role in this.messages.roles) {
                    var ids = this.messages.roles[role];
                    if (ids.includes(member.id)) {
                        grouped[indices[role]][1].push(member);
                        // I could technically use named loops and break with that, but that's just ew
                        assigned = true;
                        break;
                    }
                }

                if (!assigned) {
                    grouped[indices[defaultRole]][1].push(member);
                }
            }
            return grouped;
        },
        showMemberModal: function(data, member) {
            var game = member.game || {};
            $.showCustomModal(member.nick || member.username,
                dev.ui({
                    type: 'div',
                    children: [
                        {
                            type: 'div',
                            classes: ['avatar-container', 'loading'],
                            children: [
                                {
                                    type: 'a',
                                    classes: ['avatar-link'],
                                    attr: {
                                        href: this.avatar(member, 'png', 2048),
                                        target: '_blank'
                                    },
                                    children: [
                                        {
                                            type: 'img',
                                            classes: ['avatar'],
                                            attr: {
                                                src: this.avatar(member, 'jpg', 256)
                                            },
                                            events: {
                                                load: function() {
                                                    this.parentElement.parentElement.classList.remove('loading');
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'div',
                            classes: ['details'],
                            children: [
                                {
                                    type: 'div',
                                    classes: ['username'],
                                    children: [
                                        {
                                            type: 'span',
                                            classes: ['name'],
                                            text: member.username
                                        },
                                        {
                                            type: 'span',
                                            classes: ['discriminator'],
                                            text: '#' + member.discriminator
                                        }
                                    ]
                                },
                                {
                                    type: 'div',
                                    classes: ['playing'],
                                    html: this.i18n.msg(
                                        game.name == 'Spotify'
                                            ? 'listening'
                                            : 'playing',
                                        game.name
                                    ).parse(),
                                    condition: game.name
                                }
                            ]
                        }
                    ]
                }),
                {
                    id: 'discord-member-modal',
                    width: 'invalid so that the CSS can take over lol',
                    callback: function($modal) {
                        $modal.addClass('discord-member-modal-theme-' + (data.theme || this.messages.theme));
                    }.bind(this)
                }
            );
        },
        addToRail: function() {
            if (!this.railWidgetData) return;

            var module = dev.ui({
                type: 'section',
                classes: ['rail-module'],
                children: [
                    this.buildWidget(this.railWidgetData)
                ]
            }),
            $ads = $('#top-right-boxad-wrapper, #NATIVE_TABOOLA_RAIL').last(),
            $jsrt = $('.content-review-module');

            if ($ads.exists()) {
                $ads.after(module);
            } else if ($jsrt.exists()) {
                $jsrt.after(module);
            } else {
                this.$rail.prepend(module);
            }
        },
        replaceWidget: function(_, elem) {
            var id = elem.getAttribute('data-id') || this.messages.id,
            theme = elem.getAttribute('data-theme') || this.messages.theme,
            // TODO: Make adaptive chip orientation based on width and how many avatars can fit in a row
            width = elem.getAttribute('data-width'),
            height = elem.getAttribute('data-height');
            if (!id) return;
            this.fetchWidgetData(id).then(function(data) {
                data.theme = theme;
                data.size = {};
                if (width) {
                    data.size.width = width;
                }
                if (height) {
                    data.size.height = height;
                }
                elem.appendChild(this.buildWidget(data));
            }.bind(this));
        },
        init: function() {
            this.mapMessages();

            this.addToRail();

            $('.DiscordWidget').each(this.replaceWidget.bind(this));
        }
    }, window.Discord);

    // Resources and hooks
    if (Discord.$rail.hasClass('loaded')) {
        Discord.onload();
    } else {
        Discord.$rail.on('afterLoad.rail', Discord.onload.bind(Discord));
    }

    mw.hook('dev.ui').add(Discord.onload.bind(Discord));
    mw.hook('dev.i18n').add(Discord.onload.bind(Discord, 'i18n'));
    mw.loader.using('mediawiki.api').then(Discord.onload.bind(Discord, 'api'));

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:UI-js/code.js'
        ]
    });

    var style = importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:Discord.css'
    })[0];

    if (style) {
        style.onload = Discord.onload.bind(Discord);
    } else {
        Discord.onload();
    }
})();