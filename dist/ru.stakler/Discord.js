/** Adaptation from https://dev.fandom.com/wiki/Discord
 * @version 3.0.0
 */

(function() {
    if (window.Discord && Discord.init) return;

    var isUCP = mw.config.get('wgVersion').startsWith('1.33.');
    var ucpOnRailReadyModuleName = isUCP
        ? mw.loader.getModuleNames().find(function (name) { return name.startsWith('onRailReady-'); })
        : undefined;

    var blankImgUrl = mw.config.get('wgBlankImgUrl');
    var canNativelyLazyLoadImages = window.HTMLImageElement.prototype.hasOwnProperty('loading');
    var shouldPolyfillLazyLoadImages = !canNativelyLazyLoadImages && window.hasOwnProperty('IntersectionObserver');
    var extendFrom = window.Discord instanceof Node ? {} : window.Discord;
    
    var ui;

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
                case 'dorui':
                    ui = arg;
                    break;
                // case 'messages':
                //     if (this.messages.id) {
                //         this.fetchWidgetData(this.messages.id).done(this.handleWidgetData.bind(this));
                //     } else {
                //         this.onload();
                //     }
                //     break;
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
                list: 'allpages',
                apnamespace: 8,
                apprefix: 'Custom-Discord-',
                aplimit: 'max'
            })
            .then(this.onPagesLoaded.bind(this))
            .then(this.handleMessages.bind(this));
        },
        onPagesLoaded: function(data) {
            var first = data.query.allpages[0],
            index = first ? first.title.indexOf(':') + 1 : null,
            allpages = data.query.allpages.map(function(page) {
                return page.title.slice(index);
            });

            return this.api.get({
                action: 'query',
                meta: 'allmessages',
                amlang: mw.config.get('wgUserLanguage'),
                ammessages: allpages.join('|')
            });
        },
        handleMessages: function(data) {
            window.dev = window.dev || {};
            dev.i18n = dev.i18n || {};
            dev.i18n.overrides = dev.i18n.overrides || {};
            dev.i18n.overrides.Discord = dev.i18n.overrides.Discord || {};

            if (data.query) {
                for (var i in data.query.allmessages) {
                    var message = data.query.allmessages[i],
                    title = message.name.slice('Custom-Discord-'.length),
                    content = message['*'];

                    if (message.missing === '') continue;

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
                    delete this.defaults[title];
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
            var widgetResource = '/api/guilds/' + id + '/widget.json';
            // If configured, `Discord.apiProxyBaseUrl` would look something like "https://[FQDN]".
            if (window.Discord && Discord.apiProxyBaseUrl && Discord.apiProxyBaseUrl.startsWith('https://')) {
                this.requests[id] = $.ajax(Discord.apiProxyBaseUrl + widgetResource, {
                    dataType: 'json',
                    headers: {
                        // To differentiate between language wikis from the same origin, we'll pass along the wiki's unique ID.
                        // We will not use the referrer header, as it may not be reliably present.
                        'X-City-Id': mw.config.get('wgCityId')
                    }
                }).then(null, function () {
                    // If the configured API proxy endpoint errors out, then fall back to the official API endpoint.
                    return $.getJSON('https://discord.com' + widgetResource);
                });
            } else {
                this.requests[id] = $.getJSON('https://discord.com' + widgetResource);
            }
            return this.requests[id];
        },
        handleWidgetData: function(data) {
            this.railWidgetData = data;
            // this.onload();
            this.addToRail();
        },
        // Called on init to turn the role ID lists into arrays
        mapMessages: function() {
            for (var key in this.messages.roles) {
                var value = this.messages.roles[key];
                // Regex notes:
                //   - Why word boundaries? If editors choose to add usernames to help identify snowflakes, then the chances of a username being just 17+ digits should be pretty low.
                //   - Why no leading zero(es)? Because that's silly.
                //   - Why 17+ digits? Because that's how many digits there'd need to be for snowflakes created after 2015-01-28T14:16:25.791Z (which is about a month after Discord's epoch and a few months before Discord's public launch).
                //   - Why 20- digits? Because that's how many digits it takes to represent the biggest uint64.
                this.messages.roles[key] = value.match(/\b[1-9]\d{16,19}\b/g);
            }
        },
        logo: function() {
            return ui.svg({
                viewBox: '0 0 28 20',
                height: '18',
                width: '18',
                child: ui.path({
                    // Come on, isn't there a saner way to do this?
                    d: 'm20.6644 20s-0.863-1.0238-1.5822-1.9286c3.1404-0.8809 4.339-2.8333 4.339-2.8333-0.9828 0.6429-1.9178 1.0953-2.7568 1.4048-1.1986 0.5-2.3493 0.8333-3.476 1.0238-2.3014 0.4286-4.411 0.3095-6.2089-0.0238-1.36649-0.2619-2.54114-0.6429-3.52402-1.0238-0.55137-0.2143-1.15069-0.4762-1.75-0.8095-0.07192-0.0477-0.14384-0.0715-0.21575-0.1191-0.04795-0.0238-0.07192-0.0476-0.09589-0.0714-0.43151-0.2381-0.67124-0.4048-0.67124-0.4048s1.15069 1.9048 4.19521 2.8095c-0.71918 0.9048-1.60617 1.9762-1.60617 1.9762-5.29794-0.1667-7.31164-3.619-7.31164-3.619 0-7.6666 3.45205-13.8808 3.45205-13.8808 3.45206-2.5714 6.73635-2.49997 6.73635-2.49997l0.2397 0.285711c-4.31509 1.23808-6.30481 3.11902-6.30481 3.11902s0.52739-0.28572 1.41438-0.69047c2.56507-1.11904 4.60273-1.42856 5.44183-1.49999 0.1438-0.02381 0.2637-0.04762 0.4075-0.04762 1.4623-0.190471 3.1164-0.23809 4.8425-0.04762 2.2773 0.26191 4.7226 0.92857 7.2157 2.2857 0 0-1.8938-1.7857-5.9692-3.02378l0.3356-0.380948s3.2843-0.0714279 6.7363 2.49997c0 0 3.4521 6.21423 3.4521 13.8808 0 0-2.0377 3.4523-7.3356 3.619zm-11.1473-11.1189c-1.36644 0-2.4452 1.19044-2.4452 2.64284s1.10274 2.6428 2.4452 2.6428c1.36648 0 2.44518-1.1904 2.44518-2.6428 0.024-1.4524-1.0787-2.64284-2.44518-2.64284zm8.74998 0c-1.3664 0-2.4452 1.19044-2.4452 2.64284s1.1028 2.6428 2.4452 2.6428c1.3665 0 2.4452-1.1904 2.4452-2.6428s-1.0787-2.64284-2.4452-2.64284z'
                })
            });
        },
        avatar: function(member, ext, size) {
            // For `widget.json`s returned by the API proxy, we have an obfuscated URL that returns a (limited) resizable image.
            if (member.alt_avatar_url) return member.alt_avatar_url + '?size=' + size;
            // For `widget.json`s returned by Discord proper, we have an obfuscated URL that returns a non-resizable image.
            if (!member.avatar) return member.avatar_url;
            // This is a fossil from a bygone era. We no longer expect to hit this case. Someday, these two lines will be lost to the sands of time.
            return 'https://cdn.discordapp.com/avatars/' + member.id + '/' + member.avatar + '.' + ext + '?size=' + size;
        },
        getRandomId: function(prefix, i) {
            var charset = '1234567890abcdef',
            len = charset.length;
            while (i--) {
                prefix += charset[Math.floor(Math.random() * len)];
            }
            return prefix;
        },
        buildWidget: function(data) {
            var widget = ui.frag([
                this.buildTitle(data),
                ui.div({
                    classes: ['discord-widget-container'],
                    id: this.getRandomId('discord-widget-', 64),
                    role: 'complementary',
                    style: data.size || {},
                    child: ui.div({
                        classes: ['discord-widget'],
                        child: ui.div({
                            classes: [
                                'widget',
                                'widget-theme-' + (data.theme || this.messages.theme)
                            ],
                            children: [
                                this.buildHeader(data),
                                this.buildBody(data),
                                this.buildFooter(data)
                            ]
                        })
                    })
                })
            ]);

            if (shouldPolyfillLazyLoadImages) {
                var avatarLazyLoadIntersectionObserver = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.intersectionRatio === 1) {
                            entry.target.src = entry.target.dataset.src; delete entry.target.dataset.src;
                            if (entry.target.dataset.srcset) {
                                entry.target.srcset = entry.target.dataset.srcset; delete entry.target.dataset.srcset;
                            }
                            avatarLazyLoadIntersectionObserver.unobserve(entry.target);
                        }
                    });
                }, {
                    root: widget.querySelector('.widget-body'),
                    rootMargin: '46px 0px',  // TODO: Calculate this as root padding + chip height.
                    threshold: 1
                });
                widget.querySelectorAll('.widget-member-avatar-img').forEach(function (img) {
                    avatarLazyLoadIntersectionObserver.observe(img);
                });
            }
            return widget;
        },
        buildTitle: function(data) {
            return data.header != '0' && ui.div({
                classes: ['title-container'],
                child: ui.h2({
                    classes: ['title', 'has-icon'],
                    children: [
                        this.logo(),
                        ui.span({
                            html: this.i18n.msg('header', data.name).parse()
                        })
                    ]
                })
            });
        },
        buildHeader: function(data) {
            return ui.div({
                classes: ['widget-header'],
                children: [
                    ui.a({
                        classes: ['widget-logo'],
                        href: 'https://discord.com/?utm_source=Discord%20Widget&utm_medium=Logo',
                        target: '_blank'
                    }),
                    data.members && ui.span({
                        classes: ['widget-header-count'],
                        html: this.i18n.msg('online',
                            data.presence_count || data.members && data.members.length
                        ).parse()
                    })
                ]
            });
        },
        buildBody: function(data) {
            /* TODO: Channels? */
            var roles = data.members
                ? this.groupMemberRoles(data.members)
                : null;

            return ui.div({
                classes: {
                    'widget-body': true,
                    'body-loading': !data.members
                },
                children: data.members
                    ? roles.map(this.buildRoleContainer.bind(this, data))
                    : []
            });
        },
        buildRoleContainer: function(data, role) {
            var name = role[0],
            members = role[1],
            defaultRole = role[2];

            return members.length && ui.div({
                classes: ['widget-role-container'],
                'data-name': name,
                children: [
                    ui.div({
                        classes: ['widget-role-name'],
                        attrs: {
                            'data-name': name,
                            'data-default': defaultRole
                                ? 'true'
                                : false
                        },
                        html: name
                    })
                ].concat(members.map(this.buildUserChip.bind(this, data)))
            });
        },
        buildUserChip: function(data, member) {
            // TODO: GIF avatars
            var avatarAttrs = {
                // TODO: Caculate appropriate ceilings based on effective dimensions of loaded stylesheet(s); for now we're assuming the default of 28. The [docs](https://github.com/discordapp/discord-api-docs/blob/24f892b7de66c102c0c199e41a1bbe8577eddb9f/docs/Reference.md) say this "can be any power of two between 16 and 2048" though empirically other resolutions like 20 also work.
                src: this.avatar(member, 'png', 32)
            };
            // This rephrases predicates from `Discord.avatar`.
            if (member.alt_avatar_url || member.avatar) {
                avatarAttrs.srcset = this.avatar(member, 'png', 64) + ' 2x';
            }

            if (canNativelyLazyLoadImages) {
                avatarAttrs.loading = 'lazy';
            } else if (shouldPolyfillLazyLoadImages) {
                avatarAttrsSrcset = avatarAttrs.srcset;
                avatarAttrs = {
                    'src': blankImgUrl,
                    'data-src': avatarAttrs.src
                };

                if (avatarAttrsSrcset) {
                    avatarAttrs['data-srcset'] = avatarAttrsSrcset;
                }
            }

            return ui.div({
                classes: ['widget-member'],
                children: [
                    ui.div({
                        classes: ['widget-member-avatar'],
                        children: [
                            ui.img({
                                classes: ['widget-member-avatar-img'],
                                attrs: avatarAttrs
                            }),
                            ui.span({
                                classes: [
                                    'widget-member-status',
                                    'widget-member-status-' + member.status
                                ]
                            })
                        ]
                    }),
                    ui.span({
                        classes: ['widget-member-name'],
                        text: member.nick || member.username
                    })
                ],
                events: {
                    click: this.showMemberModal.bind(this, data, member)
                }
            });
        },
        buildFooter: function(data) {
            var invite = data.invite || this.messages.invite || data.instant_invite
            var footer = this.messages.guidelines || this.messages.footer;

            return ui.div({
                classes: ['widget-footer'],
                children: [
                    footer && ui.span({
                        classes: ['widget-footer-info'],
                        html: this.i18n.msg('footer', this.messages.guidelines).parse()
                    }),
                    invite && ui.a({
                        classes: ['widget-btn-connect'],
                        href: invite,
                        target: '_blank',
                        html: this.i18n.msg('join').parse()
                    })
                ]
            });
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
                ui.div({
                    classes: ['discord-member-modal-content'],
                    children: [
                        ui.div({
                            classes: ['avatar-container', 'loading'],
                            child: ui.a({
                                classes: ['avatar-link'],
                                href: this.avatar(member, 'png', 2048),
                                target: '_blank',
                                child: ui.img({
                                    classes: ['avatar'],
                                    src: this.avatar(member, 'png', 256),
                                    events: {
                                        load: function() {
                                            this.parentElement.parentElement.classList.remove('loading');
                                        }
                                    }
                                })
                            })
                        }),
                        ui.div({
                            classes: ['details'],
                            children: [
                                // Why 17+ digits? Because that's how many digits there'd need to be for snowflakes created after 2015-01-28T14:16:25.791Z (which is about a month after its epoch and a few months before its public launch).
                                // The remaining anonymized users will get faux IDs starting at zero.
                                // Guilds have a default max presence count of 5000, so we usually won't be returning more than that many members.
                                // Even _if_ we're serving for a guild with a bumped max presence count, it's unlikely we'll be returning 10,000,000,000,000,000 (ten quadrillion) members such that the faux IDs would collide with genuine snowflakes (that we support).
                                member.id.length >= 17 && ui.div({
                                    classes: ['username'],
                                    children: [
                                        ui.span({
                                            classes: ['name'],
                                            text: member.username
                                        }),
                                        ui.span({
                                            classes: ['discriminator'],
                                            text: '#' + member.discriminator
                                        })
                                    ]
                                }),
                                game.name && ui.div({
                                    classes: ['playing'],
                                    html: this.i18n.msg(
                                        game.name == 'Spotify'
                                            ? 'listening'
                                            : 'playing',
                                        game.name
                                    ).parse()
                                })
                            ]
                        })
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
        addToRail: function(data) {
            if (this.$rail.length === 0) return;

            $('.discord-module').remove();

            if (!this.railWidgetData) {
                this.fetchWidgetData(this.messages.id).then(this.handleWidgetData.bind(this));
            }

            var widget = this.buildWidget(this.railWidgetData || {}),
            railModule = ui.section({
                classes: ['rail-module', 'discord-module'],
                'data-widget-state': 'loading',
                child: widget
            }),
            $ads = $('#top-right-boxad-wrapper, #NATIVE_TABOOLA_RAIL').last(),
            $jsrt = $('.content-review-module');

            if ($ads.length !== 0) {
                $ads.after(railModule);
            } else if ($jsrt.length !== 0) {
                $jsrt.after(railModule);
            } else {
                this.$rail.prepend(railModule);
            }

            this.onRenderedWidget(railModule);
            mw.hook('Discord.widget.rail').fire(railModule);
        },
        replaceWidget: function(_, elem) {
            elem.dataset.widgetState = 'loading';
            var id = elem.getAttribute('data-id') || this.messages.id,
            theme = elem.getAttribute('data-theme') || this.messages.theme,
            // TODO: Make adaptive chip orientation based on width and how many avatars can fit in a row
            width = elem.getAttribute('data-width'),
            height = elem.getAttribute('data-height'),
            invite = elem.getAttribute('data-invite'),
            header = elem.getAttribute('data-header');
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
                if (invite) {
                    data.invite = invite;
                } else {
                    data.invite = data.instant_invite;
                }
                if (header) {
                    data.header = header;
                }
                var widget = this.buildWidget(data);
                $(elem).empty().append(widget);

                this.onRenderedWidget(elem);
            }.bind(this));
        },
        onRenderedWidget: function(widget) {
            var container = widget.querySelector('.discord-widget-container'),
            discord = container.querySelector('.discord-widget'),
            body = discord.querySelector('.widget-body'),
            largest = Array.from(body.children).sort(this.sortRoleContainers.bind(this))[0];
            if (!largest) return;

            var members = largest.querySelectorAll('.widget-member'),
            initial = members[0].offsetTop,
            count = 0;

            for (var i = 0; i < members.length; i++) {
                if (members[i].offsetTop > initial) break;
                count++;
            }
            
            discord.classList.add('resolved-columns');

            this.addCSS(this.createNameDirectionStyles(count, container.id));
            
            widget.dataset.widgetState = 'loaded';
            mw.hook('Discord.widget').fire(widget);
        },
        sortRoleContainers: function(a, b) {
            return b.children.length - a.children.length;
        },
        addCSS: function(styles) {
            mw.util.addCSS(styles);
        },
        createNameDirectionStyles: function(count, id) {
            var half = Math.floor(count / 2),
            i = half,
            selectors = [];

            while (i--) {
                selectors.push(this.createDirectionSelector(count, id, i - half + 2));
            }

            return selectors.join(',\n') + '{\n\tpadding: 0 32px 0 8px;\n\tright: 4px;\n}';
        },
        createDirectionSelector: function(count, id, half) {
            var n = half == 0
                ? ''
                : half > 0
                    ? '+' + half
                    : '-' + Math.abs(half);
            return '#' + id + ' .widget-member:nth-child(' + count + 'n' + n + ') .widget-member-name';
        },
        replaceWidgets: function($container) {
            $container.find('.DiscordWidget:not([data-widget-state])').each(this.replaceWidget.bind(this));
        },
        getHeight: function(elem) {
            var style = getComputedStyle(elem);
            return elem.clientHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);
        },
        reflow: function(elem, columns, force) {
            if (this.reflowing) {
                this.reflowing = false;
                if (!force) {
                    return;
                }
            }
            this.reflowing = true;

            var full = 0,
            sum = 0,
            overhead = 5,
            children = elem.children,
            i = children.length;

            elem.style.maxHeight = '';

            if (innerWidth > 1023) return;
        
            while (i--) {
                full += this.getHeight(children[i]);
            }
        
            var partition = full / columns;
        
            for (var i = 0; i < children.length; i++) {
                sum += this.getHeight(children[i]);
                if (sum > partition) {
                    break;
                }
            }

            elem.style.maxHeight = (sum + overhead) + 'px';
        },
        patchStupidRail: function() {
            if (!this.$rail || !window.MutationObserver || navigator.maxTouchPoints === 0) return;

            var rail = this.$rail.get(0);

            rail.parentElement.style.columnCount = 'auto';

            rail.style.display = 'flex';
            rail.style.flexDirection = 'column';
            rail.style.flexWrap = 'wrap';

            this.reflow(rail, 2, true);

            new MutationObserver(this.reflow.bind(this, rail, 2, false))
                .observe(rail, {
                    childList: true,
                    subtree: true,
                    attributes: true
                });
        },
        init: function() {
            this.mapMessages();

            if (this.messages.id) {
                this.addToRail();
            }

            this.replaceWidgets(mw.util.$content);
            mw.hook('wikipage.content').add(this.replaceWidgets.bind(this));

            this.patchStupidRail();
        }
    }, extendFrom);

    // Resources and hooks
    if (
        Discord.$rail.length === 0 ||                          // There _is_ no rail, probably because we're on the main page.
        Discord.$rail.hasClass(isUCP ? 'is-ready' : 'loaded')  // ... because of course.
    ) {
        Discord.onload();
    } else {
        if (ucpOnRailReadyModuleName != null) {
            mw.loader.using(ucpOnRailReadyModuleName, function(require) {
                require(ucpOnRailReadyModuleName).onRailReady(Discord.onload.bind(Discord));
            });
        } else {
            Discord.$rail.on('afterLoad.rail', Discord.onload.bind(Discord));
        }
    }

    mw.hook('dev.i18n').add(Discord.onload.bind(Discord, 'i18n'));
    mw.hook('doru.ui').add(Discord.onload.bind(Discord, 'dorui'));
    mw.loader.using('mediawiki.api').then(Discord.onload.bind(Discord, 'api'));
    mw.loader.using('mediawiki.util').then(Discord.onload.bind(Discord));

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Dorui.js'
        ]
    });

    var style = importArticle({
        type: 'style',
        article: 'MediaWiki:Discord.css'
    })[0];

    if (style) {
        style.onload = Discord.onload.bind(Discord);
    } else {
        Discord.onload();
    }
})();