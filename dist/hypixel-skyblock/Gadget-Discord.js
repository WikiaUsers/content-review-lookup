//To do: Reintroduce the i18n module
(function() {
    if (window.Discord && Discord.init) return;

    var ucpOnRailReadyModuleName = mw.loader.getModuleNames().find(function (name) { return name.startsWith('onRailReady-'); });
    var extendFrom = window.Discord instanceof Node ? {} : window.Discord;

    var ui;

    window.Discord = $.extend({
        $rail: $('#WikiaRail'),
        // Resource managing
        loaded: 6,
        onload: function(type, arg) {
            switch (type) {
                case 'api':
                    this.handleMessages();
                    break;
                case 'dorui':
                    ui = arg;
                    break;
            }
            console.log(this.loaded);
            console.log(type);
            if (--this.loaded) return;
            this.init();
        },
        // Get all necessary mw messages to make the script work
        messages: {},
        handleMessages: function() {
            window.dev = window.dev || {};

            this.messages.branding = "new";
            this.messages.footer = "Server meant for wiki talk, not game help";
            this.messages.header = "Wiki Editor Chat";
            this.messages.invite = "https://hypixel-skyblock.fandom.com/wiki/Hypixel_SkyBlock_Wiki:Discord";
            this.messages.theme = "dark";
        },
        logo: function(data) {
        		// svg source from https://discord.com/branding
			var viewBox = '0 0 73 50';
			var path = 'M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z';
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
        	var classes = ['discord-widget'];
        	if (this.messages.branding === 'new') {
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
                                this.buildFooter(data)
                            ]
                        })
                    })
                })
            ]);

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
                            html: "Wiki Editor Chat"
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
                    })
                ]
            });
        },
        buildFooter: function(data) {
            var invite = data.invite || this.messages.invite || data.instant_invite;
			
            return ui.div({
                classes: ['widget-footer'],
                children: [
                    this.messages.footer && ui.span({
                        classes: ['widget-footer-info'],
                        html: this.messages.footer
                    }),
                    invite && ui.a({
                        classes: ['widget-btn-connect'],
                        href: invite,
                        target: '_blank',
                        html: "Join Now!"
                    })
                ]
            });
        },
        addToRail: function() {
            if (this.$rail.length === 0) return;

            $('.discord-module').remove();

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

            mw.hook('Discord.widget.rail').fire(railModule);
        },
        replaceWidget: function(_, elem) {
            elem.dataset.widgetState = 'loading';
        },
        sortRoleContainers: function(a, b) {
            return b.children.length - a.children.length;
        },
        addCSS: function(styles) {
            mw.util.addCSS(styles);
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
			this.addToRail();

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

    mw.hook('dev.showCustomModal').add(Discord.onload.bind(Discord, 'showCustomModal'));
    mw.hook('doru.ui').add(Discord.onload.bind(Discord, 'dorui'));
    mw.loader.using('mediawiki.api').then(Discord.onload.bind(Discord, 'api'));
    mw.loader.using('mediawiki.util').then(Discord.onload.bind(Discord));

	var style = null;
	mw.loader.using(['mediawiki.util', 'mediawiki.Uri', 'ext.fandom.ContentReview.legacyLoaders.js'], function() {
		importArticles({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:Dorui.js',
				'u:dev:MediaWiki:ShowCustomModal.js',
			]
		});
		
		style = importArticle({
        	type: 'style',
        	article: 'u:dev:MediaWiki:Discord.css'
		})[0];
	});

    if (style) {
        style.onload = Discord.onload.bind(Discord);
    } else {
        Discord.onload();
    }
})();