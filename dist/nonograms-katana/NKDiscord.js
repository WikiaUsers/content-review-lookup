if (document.getElementById('NKdiscordWidget')) {
	//fetch guild data
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}
	xmlhttp.open('GET', 'https://discord.com/api/guilds/1238437678974898196/widget.json', false);
	xmlhttp.send();
	var widgetData = JSON.parse(xmlhttp.responseText);
	//injecting some fake/missing data here?
	widgetData.channels = [
    	{id:0, name:'#discord-tavern', info:'Like in-game, but with pictures and gifs.'},
    	{id:0, name:'#nonograms-katana-wiki', info:'Share ideas, ask questions, give feedback.'},
    	{id:0, name:'#memes', info:'Fun with pictures and gifs.'}
    ];
	//widget template
	var outHeader = '<a href="https://discord.com/?utm_source=Discord%20Widget&amp;utm_medium=Logo" target="_blank"></a><div class="dwName">' + widgetData.name + '</div>' + '<div class="dwCount"><strong>' + (widgetData.presence_count) + '</strong> Users Online</div>';
	var outBody = '';
    for (var cid in widgetData.channels) {
    	outBody+= '<div>' + widgetData.channels[cid]['name'] + '</div>';
    	if (widgetData.channels[cid]['info']) {
    		outBody+= '<small>' + widgetData.channels[cid]['info'] + '</small>';
    	}
    }	
	var outFooter = '<a href="' + widgetData.instant_invite + '" target="_blank">Join Now!</a>';
	//output widget
	var output = '<div class="dwHeader">' + outHeader + '</div><div class="dwBody">' + outBody + '</div><div class="dwFooter">' + outFooter+ '</div>';
	document.getElementById('NKdiscordWidget').innerHTML = '<div class="dwPanel">' + output + '</div>';
	//fake styles - probably to be placed somewhere in CSS
	var styleSheet = document.createElement("style");
	styleSheet.textContent = '#NKdiscordWidget {width:280px; border-radius: 5px}';
	styleSheet.textContent+= '#NKdiscordWidget div {line-height: 1}';
	styleSheet.textContent+= '#NKdiscordWidget .dwPanel {border: solid 1px gray; border-radius: 5px; overflow: hidden}';
	styleSheet.textContent+= '#NKdiscordWidget .dwHeader {background-color: #5865f2; padding: 20px; color: #fff}';
	styleSheet.textContent+= '#NKdiscordWidget .dwHeader a {background-image: url(https://images.wikia.com/clock-work-planet/images/8/81/Discord_new_logo.svg); height: 34px; width: 124px; display: inline-block; background-size: contain}';
	styleSheet.textContent+= '#NKdiscordWidget .dwCount {font-size: 80%; line-height: 2}';
	styleSheet.textContent+= '#NKdiscordWidget .dwBody {padding: 10px}';
	styleSheet.textContent+= '#NKdiscordWidget .dwBody div {margin: 6px 0 2px 0}';
	styleSheet.textContent+= '#NKdiscordWidget .dwBody small {font-style: italic; margin-left: 20px}';
	styleSheet.textContent+= '#NKdiscordWidget .dwFooter {padding: 5px; display: flex}';
	styleSheet.textContent+= '#NKdiscordWidget .dwFooter a {align-items: center; border-radius: 4px; font-size: 12px; font-weight: 650; height: 33px; justify-content: center; min-width: 120px; margin-left: auto; padding: 12px; text-decoration: none; display: flex; flex-shrink: 0; border: solid 1px gray}';
	document.head.appendChild(styleSheet);
}

/**
 * @version 3.0.0
 * This code is based on: https://dev.fandom.com/wiki/Discord
 */

(function() {
    if (window.Discord && Discord.init) return;

    var ucpOnRailReadyModuleName = mw.loader.getModuleNames().find(function (name) { return name.startsWith('onRailReady-'); });
    var blankImgUrl = mw.config.get('wgBlankImgUrl');
    var canNativelyLazyLoadImages = window.HTMLImageElement.prototype.hasOwnProperty('loading');
    var shouldPolyfillLazyLoadImages = !canNativelyLazyLoadImages && window.hasOwnProperty('IntersectionObserver');
    var extendFrom = window.Discord instanceof Node ? {} : window.Discord;

    var ui;

    window.Discord = $.extend({
        $rail: $('#WikiaRail'),
        // Resource managing
        loaded: 9,
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
            theme: 'auto',
            branding: 'old',
            roles: {}
        },
        messages: {},
        getMessages: function() {
            this.api.get({
                action: 'query',
                list: 'allpages',
                apnamespace: 8,
                apprefix: 'Custom-Discord-',
                aplimit: 'max',
                uselang: 'content', // T97096
                maxage: 300,
                smaxage: 300
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
                ammessages: allpages.join('|'),
                uselang: 'content', // T97096
                maxage: 300,
                smaxage: 300
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
        logo: function(data) {
        	var path = 'm20.6644 20s-0.863-1.0238-1.5822-1.9286c3.1404-0.8809 4.339-2.8333 4.339-2.8333-0.9828 0.6429-1.9178 1.0953-2.7568 1.4048-1.1986 0.5-2.3493 0.8333-3.476 1.0238-2.3014 0.4286-4.411 0.3095-6.2089-0.0238-1.36649-0.2619-2.54114-0.6429-3.52402-1.0238-0.55137-0.2143-1.15069-0.4762-1.75-0.8095-0.07192-0.0477-0.14384-0.0715-0.21575-0.1191-0.04795-0.0238-0.07192-0.0476-0.09589-0.0714-0.43151-0.2381-0.67124-0.4048-0.67124-0.4048s1.15069 1.9048 4.19521 2.8095c-0.71918 0.9048-1.60617 1.9762-1.60617 1.9762-5.29794-0.1667-7.31164-3.619-7.31164-3.619 0-7.6666 3.45205-13.8808 3.45205-13.8808 3.45206-2.5714 6.73635-2.49997 6.73635-2.49997l0.2397 0.285711c-4.31509 1.23808-6.30481 3.11902-6.30481 3.11902s0.52739-0.28572 1.41438-0.69047c2.56507-1.11904 4.60273-1.42856 5.44183-1.49999 0.1438-0.02381 0.2637-0.04762 0.4075-0.04762 1.4623-0.190471 3.1164-0.23809 4.8425-0.04762 2.2773 0.26191 4.7226 0.92857 7.2157 2.2857 0 0-1.8938-1.7857-5.9692-3.02378l0.3356-0.380948s3.2843-0.0714279 6.7363 2.49997c0 0 3.4521 6.21423 3.4521 13.8808 0 0-2.0377 3.4523-7.3356 3.619zm-11.1473-11.1189c-1.36644 0-2.4452 1.19044-2.4452 2.64284s1.10274 2.6428 2.4452 2.6428c1.36648 0 2.44518-1.1904 2.44518-2.6428 0.024-1.4524-1.0787-2.64284-2.44518-2.64284zm8.74998 0c-1.3664 0-2.4452 1.19044-2.4452 2.64284s1.1028 2.6428 2.4452 2.6428c1.3665 0 2.4452-1.1904 2.4452-2.6428s-1.0787-2.64284-2.4452-2.64284z';
        	var viewBox = '0 0 28 20';
        	var branding = data.branding || this.messages.branding;
        	
        	if (branding === 'new') {
        		// svg source from https://discord.com/branding
        		viewBox = '0 0 73 50';
        		path = 'M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z';
        	}
            return ui.svg({
                viewBox: viewBox,
                height: '18',
                width: '18',
                child: ui.path({
                    d: path
                })
            });
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
console.log(data);
			//injecting some fake/missing data here?
        	data.channels = [
            	{id:0, name:'#discord-tavern', info:'Like in-game, but with pictures and gifs.'},
            	{id:0, name:'#nonograms-katana-wiki', info:'Share ideas, ask questions, give feedback.'},
            	{id:0, name:'#memes', info:'Fun with pictures and gifs.'}
            ];
        	//core
        	var classes = ['discord-widget'];
        	var branding = data.branding || this.messages.branding;
        	if (branding === 'new') {
        		classes.push('new-branding');
        	}
            var widget = ui.frag([
                this.buildTitle(data),
                ui.div({
                    classes: ['discord-widget-container'],
                    id: this.getRandomId('discord-widget-', 64),
                    role: 'complementary',
                    style: data.size || {},
                    child: ui.div({
                        classes: classes,
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
                        this.logo(data),
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
            var blocks = [];
            for (var cid in data.channels) {
            	blocks.push(ui.div({ html: data.channels[cid]['name'] }));
            	if (data.channels[cid]['info']) {
            		blocks.push(ui.small({ html: data.channels[cid]['info'] }));
            	}
            }
            //ready
            return ui.div({
                classes: {
                    'widget-body': true,
                    'page': true, 
                },
                children: blocks
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
                    if (ids && ids.includes(member.id)) {
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
        addToRail: function() {
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
            branding = elem.getAttribute('data-branding') || this.messages.branding,
            // TODO: Make adaptive chip orientation based on width and how many avatars can fit in a row
            width = elem.getAttribute('data-width'),
            height = elem.getAttribute('data-height'),
            invite = elem.getAttribute('data-invite'),
            header = elem.getAttribute('data-header');
            if (!id) return;
            this.fetchWidgetData(id).then(function(data) {
            	data.branding = branding;
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
                var stylehack = '.widget-body.page div {font-size:120%; margin: 6px 0 2px 0}';
                stylehack+= '.widget-body.page small {font-style: italic; margin-left: 20px}';
                
                $(elem).html('<style>'+stylehack+'</style>').append(widget);

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
            if (this.$rail.length === 0 || !window.MutationObserver || navigator.maxTouchPoints === 0) return;

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
        Discord.$rail.length === 0 ||      // There _is_ no rail, probably because we're on the main page.
        Discord.$rail.hasClass('is-ready')
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
    mw.hook('dev.showCustomModal').add(Discord.onload.bind(Discord, 'showCustomModal'));
    mw.hook('doru.ui').add(Discord.onload.bind(Discord, 'dorui'));
    mw.loader.using('mediawiki.api').then(Discord.onload.bind(Discord, 'api'));
    mw.loader.using('mediawiki.util').then(Discord.onload.bind(Discord));

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Dorui.js',
            'u:dev:MediaWiki:ShowCustomModal.js',
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