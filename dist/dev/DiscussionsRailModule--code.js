/**
 * 
 * @module                  DiscussionsRailModule
 * @description             Themed Discussions rail module.
 * @author                  Speedit <speeditwikia@gmail.com>
 * @author                  KockaAdmiralac <1405223@gmail.com>
 * @version                 1.5.0
 * @license                 CC-BY-SA 3.0
 * 
 */
require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
    'use strict';

    // Scope limiting, double-run protection
    window.dev = window.dev || {};
    
    var conf = mw.config.get([
        'wgScriptPath',
        'wgEditorExtraButtons',
        'wgDiscussionsApiUrl',
        'wgCityId',
        'wgSassParams'
    ]);
    
    var scriptPath = conf.wgScriptPath;
    if (
        window.discussionsModuleLoaded ||
        (!$('.wds-community-header a[href="' + scriptPath + '/f"]').length &&
        conf.wgEditorExtraButtons === null)
    ) {
        return;
    }
    window.discussionsModuleLoaded = true;
    window.dev.discussionsModule = {};

    // Module configuration.
    var config = window.discussionsModuleConfig || {},
        embed = window.discussionsModuleEmbed || false,
        options = {};
    options.mostrecent = function(k) {
        var b = Boolean(k).toString();
        return b;
    };
    options.size = function(k) {
        if ([3, 4, 5, 6].indexOf(k) > -1) {
            return k;
        }
    };
    options.catid = function(k) {
        var c = k.join().replace(/\s/g, '');
        return c;
    };
    // Validate the configuration.
    $.each(config, function(k, v) {
        if (!options.hasOwnProperty(k)) {
            delete config[k];
        } else if (typeof options[k](k) === 'undefined') {
            delete config[k];
        } else {
            config[k] = options[k](k);
        }
    });

    // Module styling.
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:DiscussionsRailModule.css'
    });
    (mw.util.addCSS(
        '.skin-oasis .discussions-rail-theme .embeddable-discussions-module .embeddable-discussions-title {' +
            'color: ' + conf.wgSassParams['color-links'] + ';' +
        '}' +
        '.skin-oasis .discussions-rail-theme .embeddable-discussions-module .avatar-container,' +
        '.skin-oasis .discussions-rail-theme .wds-avatar-stack .wds-avatar__image {' +
            'border: 2px solid ' + $('.wds-community-header .wds-dropdown__content').css('border-left-color') + ';' +
        '}'
    )).ownerNode.id = 'discussionsModuleStyles';

    /**
     * Script initializer.
     * @function            init
     */
    function init() {
        window.dev.discussionsModule = new DiscussionsModule();
    }

    /**
     * Main DiscussionsRailModule class.
     * @class               DiscussionsModule
     * @classdesc           Executes load operations.
     * @this                window.dev.discussionsModule
     */
    function DiscussionsModule() {
        // Module translations.
        mw.hook('dev.i18n').add($.proxy(this.i18n.handler, this));

        if (!window.dev || !window.dev.i18n) {
            importArticle({
                type: 'script',
                article: 'u:dev:MediaWiki:I18n-js/code.js'
            });
        }

        // Discussions stack data.
        this.data.fetch.done($.proxy(this.data.async, this));
        // Run module logic once done.
        $.when(
            this.i18n.$loaded,
            this.data.$loaded
        ).done($.proxy(this.init, this));
    }

    /**
     * Script variables.
     * @memberof            DiscussionsModule
     */
    $.extend(DiscussionsModule.prototype, {
        $rail: $('#WikiaRail'),
        $module: $('<section>', {
            'class': 'discussions-rail-theme rail-module'
        }),
        moduleText: mw.html.element('discussions', config)
    });

    /**
     * Module initializer.
     * @method              init
     * @this                window.dev.discussionsModule
     */
    DiscussionsModule.prototype.init = function() {
        // Module post-processing delegation.
        mw.hook('discussionsModule.ui')
            .add($.proxy(this.ui.module, this)) // UI change
            .add($.proxy(this.ui.load, this)); // Load event
        // Post-op module changes.
        mw.hook('wikipage.content')
            .add($.proxy(this.ui.content, this));
        mw.hook('discussionsModule.loaded')
            .add($.proxy(this.ui.posts, this));
        // Fetching Discussions rail module.
        if (!embed && this.$rail.length) {
            this.api = new mw.Api();
            this.api.get({
                action: 'parse',
                disablepp: true,
                text: this.moduleText
            }).done($.proxy(this.call, this));
        }
    };

    /**
     * Module initializer.
     * @method              call
     * @this                window.dev.discussionsModule
     */
    DiscussionsModule.prototype.call = function(d) {
        if (d.error) {
            return;
        }
        // Module building.
        this.$module.html(d.parse.text['*'].replace(/<\/?p>|module\s/g, ''));
        // Rail module event.
        if (this.$rail.hasClass('loaded')) {
            $.proxy(this.rail, this)();
        } else {
            this.$rail.on('afterLoad.rail',
                $.proxy(this.rail, this)
            );
        }
    };

    /**
     * Rail addition callback.
     * @method              rail
     * @this                window.dev.discussionsModule
     */
    DiscussionsModule.prototype.rail = function() {
        if ($('.activity-module').length) {
            this.$rail.find('.activity-module:first')
                .after(this.$module);
        } else if ($('.rail-sticky-module').length) {
            this.$module.insertBefore(
                this.$rail.find('.rail-sticky-module')
            );
        } else {
            this.$rail
                .append(this.$module);
        }
        // Post-append events.
        mw.hook('discussionsModule.ui')
            .fire(this.$module); // change content
        mw.hook('discussionsModule.added')
            .fire(this.$module); // customisation
        // Align module query limit with thread count.
        if (this.threadCount < (config.size || 4)) {
            var $threads = this.$module.find('.embeddable-discussions-threads'),
                truncUrl = 
                    $threads.attr('data-requesturl').replace(
                        /(limit=)(\d)/,
                        '$1' + this.threadCount
                    );
            $threads.attr('data-requesturl', truncUrl);
        }
        // Sideloading module contents.
        mw.hook('wikipage.content').fire(this.$module);
    };

    /**
     * Module UI modifications.
     * @member              ui
     * @this                window.dev.discussionsModule
     */
    DiscussionsModule.prototype.ui = {};
    // Content module embedding.
    DiscussionsModule.prototype.ui.content = function($content) {
        var $modules = $content.find('.discussions-rail-theme');
        $modules.each(function(i, el) {
            var $el = $(el);
            mw.hook('discussionsModule.ui').fire($el);
        });
    };
    // Rail module modifications.
    DiscussionsModule.prototype.ui.module = function($module) {
        // Remove module class.
        $module
            .find('.embeddable-discussions-module')
            .removeClass('module');
        // Button styling.
        $module
            .find('.embeddable-discussions-show-all a[href^="' + scriptPath + '/f"]')
            .addClass('wds-button wds-is-secondary');
        // Add avatar stack.
        $module.find('.embeddable-discussions-show-all')
            .append(this.ui.$stack.clone());
        // Module header translation.
        $module.find('.embeddable-discussions-heading').attr(
            'data-title',
            this.i18n.msg('title').plain()
        );
    };
    // Populating empty post titles.
    DiscussionsModule.prototype.ui.posts = function($module) {
        $module.find('.embeddable-discussions-post-detail').each($.proxy(function(i, $post) {
                $title = $post.find('.embeddable-discussions-title'),
                user = $post.find('.avatar-username').text(),
                defaultPostTitle = this.i18n.msg('post-by', user).plain();
            if ($title.text().length === 0) {
                $title.html(defaultPostTitle);
            }
        }, this));
    };
    // Module sideloading hook.
    DiscussionsModule.prototype.ui.load = function($module) {
        var $threads = $module.find('.embeddable-discussions-threads'),
            thready = new MutationObserver(function() {
                if (!$.contains($module, $('.wikiaThrobber'))) {
                    mw.hook('discussionsModule.loaded').fire($module);
                    thready.disconnect();
                }
            });
        if ($threads.length) {
            thready.observe($threads[0], { childList: true });
        }
    };
    // Avatar stack
    DiscussionsModule.prototype.ui.$stack = $('<div>', {
        'class': 'wds-avatar-stack'
    });

    /**
     * Script i18n loading.
     * @member              i18n
     * @this                window.dev.discussionsModule
     */
    DiscussionsModule.prototype.i18n = {};
    // Message & utility loader.
    DiscussionsModule.prototype.i18n.handler = function(i18no) {
        i18no.loadMessages('DiscussionsRailModule')
            .done($.proxy(this.i18n.store, this));
    };
    // Message data handler.
    DiscussionsModule.prototype.i18n.store = function(i18n) {
        $.extend(this.i18n, i18n);
        this.i18n.$loaded.resolve();
    };
    // I18n dependency event.
    DiscussionsModule.prototype.i18n.$loaded = $.Deferred();

    /**
     * Discussions stack data.
     * @member              data
     * @this                window.dev.discussionsModule
     */
    DiscussionsModule.prototype.data = {};
    // Data loading from Discussions thread service.
    DiscussionsModule.prototype.data.fetch = $.get(
        conf.wgDiscussionsApiUrl + '/' +
        conf.wgCityId + '/' +
        'threads'
    );
    // Async data propagation.
    DiscussionsModule.prototype.data.async = function(d) {
        if (!d._embedded.threads.length) { return; }
        this.threadCount = d._embedded.threads.length;
        $.proxy(this.data.ui, this)(
            d._embedded.contributors[0].userInfo.splice(0,5)
        );
    };
    // Data interfacing for stack avatars.
    DiscussionsModule.prototype.data.ui = function(stackData) {
        this.ui.$stack.html(
            stackData.map(function(u) {
                return $('<a>', {
                    href: mw.util.getUrl('User:' + u.name),
                    'class': 'wds-avatar',
                    title: u.name,
                    html: typeof u.avatarUrl === 'string'
                        ? $('<img>', {
                            'class': 'wds-avatar__image',
                            'src': u.avatarUrl.indexOf('messaging') > -1 ?
                                u.avatarUrl + '/revision/latest/scale-to-width-down/60' :
                                u.avatarUrl
                                    .replace('/scale-to-width-down/100', '') +
                                    '/scale-to-width-down/60'
                        }).prop('outerHTML')
                        : $('<div>', {
                            'class': 'wds-avatar__image embeddable-discussions-default-avatar'
                        }).prop('outerHTML')
                }).prop('outerHTML');
            }).join('')
        );
        this.data.$loaded.resolve();
    };
    // Data dependency event.
    DiscussionsModule.prototype.data.$loaded = $.Deferred();

    // Script initialization.
    mw.loader.using('mediawiki.api').then(init);

});