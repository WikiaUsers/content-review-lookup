/** <nowiki>
 * 
 * @module                  VanguardTools
 * @description             Accelerates Vanguard migration workflow.
 * @author                  Speedit
 * @version                 1.3.0
 * @license                 CC-BY-SA 3.0
 * 
 */
(function () {
    'use strict';

    // Script variables and double run protection.
    if (window.vanguardToolsLoaded) {
        return;
    }
    window.vanguardToolsLoaded = true;
    var VAN = {};

    // MediaWiki variables.
    VAN.mw = mw.config.get([
        'debug',
        'skin',
        'wgAction',
        'wgArticleId',
        'wgArticlePath',
        'wgCanonicalNamespace',
        'wgCanonicalSpecialPageName',
        'wgCityId',
        'wgDBname',
        'wgLoadScript',
        'wgMessages',
        'wgReviewedScriptsTimestamp',
        'wgServer',
        'wgTemplateClassificationDialogConfig',
        'wgTitle',
        'wgUserGroups',
        'wgUserLanguage',
        'wgVersion'
    ]);

    // User parrot status.
    VAN.parrot = VAN.mw.wgUserGroups.some(function(ug) {
        return ['vanguard', 'staff', 'helper', 'soap', 'wiki-representative', 'wiki-specialist'].indexOf(ug) > -1;
    });

    // Script configuration.
    VAN.config = $.extend({
        state: true,
        modules: [],
        redirect: true,
        nav: true,
        template: true,
        adminalert: true,
        icons: true,
        create: false,
        toolbox: true
    }, window.vanguardToolsConfig);
    if (VAN.config.modules && !$.isArray(VAN.config.modules)) {
        delete VAN.config.modules;
    }

    // Design system integration.
    VAN.wds = {
        // Library handler.
        handler: function(wds) {
            // Cache our design system utils.
            $.extend(VAN.wds, wds);
            // Asset loading done.
            VAN.wds.$loaded.resolve();
        },
        // Asset loading event.
        $loaded: $.Deferred()
    };

    // I18n implementation.
    VAN.i18n = {
        // Message & utility loader.
        handler: function(i18no) {
            i18no.loadMessages('VanguardTools').done(VAN.i18n.store);
        },
        // Message data handler.
        store: function(i18n) {
            // Cache our msg data, utils
            $.extend(VAN.i18n, i18n);
            // Message loading done.
            VAN.i18n.$loaded.resolve();
        },
        // I18n event.
        $loaded: $.Deferred()
    };

    // Main script
    VAN.init = function() {
        if (!VAN.parrot || !VAN.config.state) { return; }
        // Dispatch dependency handlers.
        mw.hook('dev.i18n').add(VAN.i18n.handler);
        mw.hook('dev.wds').add(VAN.wds.handler);
        // Module activator.
        $.when(VAN.i18n.$loaded, VAN.wds.$loaded).then(function() {
            // Run all modules by default.
            VAN.config.modules = VAN.config.modules.length > 0 ?
                VAN.config.modules :
                VAN.modules;
            // Validation for modules.
            $.each(VAN.config.modules, function(i, m) {
                if (VAN.modules.indexOf(m) === -1) { 
                    VAN.modules.splice(i, 1);
                }
            });
            // Initialise all configured modules.
            $.each(VAN.config.modules, function(i, m) {
                VAN[m].init();
            });
            // Post-execution event
            $.when.apply(null, VAN.config.modules.map(function(m) {
                return VAN[m].$executed;
            })).then(function() {
                // Loaded class.
                $(document.body).addClass('van-is-loaded');
                // Fire hook.
                mw.hook('dev.van').fire(VAN);
            });
        });
        // Import dependencies.
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:I18n-js/code.js',
                'u:dev:MediaWiki:WDSIcons/code.js'
            ]
        });
    };

    // Redirect module for S:IB.
    VAN.redirect = {
        init: function() {
            if (
                VAN.config.redirect !== true ||
                VAN.mw.wgCanonicalSpecialPageName !== 'InfoboxBuilder' ||
                VAN.mw.wgTitle.indexOf('/') === -1
            ) {
                VAN.redirect.$executed.resolve();
                return;
            }
            // Template existence check.
            VAN.redirect.template =
                mw.util.wikiUrlencode(VAN.mw.wgTitle.match(/\/([\s\S]+)$/)[1]);
            $.get(mw.util.wikiScript('wikia'), {
                controller: 'PortableInfoboxBuilderController',
                format: 'json',
                method: 'getTemplateExists',
                title: VAN.redirect.template
            }, VAN.redirect.builder);
        },
        // Redirect notification.
        builder: function(t) {
            if (t.exists) {
                VAN.redirect.execute();
                return;
            }
            if (navigator.serviceWorker) {
                // Create notification service worker.
                VAN.redirect.worker = navigator.serviceWorker.register(new mw.Uri(VAN.mw.wgLoadScript).extend({
                    'debug': VAN.mw.debug,
                    'lang': VAN.mw.wgUserLanguage,
                    'mode': 'articles',
                    'skin': VAN.mw.skin,
                    'missingCallback': 'importNotifications.importArticleMissing',
                    'articles': 'u:dev:MediaWiki:VanguardTools/service-worker.js',
                    'reviewed': VAN.mw.wgReviewedScriptsTimestamp,
                    'only': 'scripts'
                }).getRelativePath());
                // Create two-way message channel.
                VAN.redirect.mch = new MessageChannel();
                VAN.redirect.mch.port1.onmessage = VAN.redirect.handler;
                // Post notification data to worker.
                Notification.requestPermission().then(VAN.redirect.post);
            }
        },
        post: function(r) {
            if (r !== 'granted') {
                return;
            }
            navigator.serviceWorker.controller.postMessage({
                command: 'van_send_notif',
                i18n: {
                    cancel: mw.message('ooui-dialog-message-reject').plain(),
                    ok: mw.message('ooui-dialog-message-accept').plain(),
                    source: VAN.i18n.msg('sourceredirect').plain()
                }
            }, [VAN.redirect.mch.port2]);
        },
        // Infobox builder template creation.
        handler: function(e) {
            if (e.data.command !== 'van_create_infobox') { return; }
            // Spinner code.
            VAN.redirect.spinner = 
                $('<div>').css({
                    background:
                        $(document.body).css('background-color')
                            .replace('rgb','rgba').replace(')', ', 0.5)'),
                    position: 'fixed',
                    height: '100%',
                    width: '100%',
                    left: '0',
                    top: '0',
                    'z-index': '1000000000'
                })
                    .html('<svg class="wds-spinner wds-spinner__block" width="78" height="78" viewBox="0 0 78 78" xmlns="http://www.w3.org/2000/svg"><g transform="translate(39, 39)"><circle class="wds-spinner__stroke" fill="none" stroke-width=""stroke-dasharray="238.76104167282426" stroke-dashoffset="238.76104167282426"stroke-linecap="round" r="38"></circle></g></svg>')
                    .appendTo(document.body);
            // Create infobox.
            $.post(mw.util.wikiScript('wikia') + '?' + $.param({
                controller: 'PortableInfoboxBuilderController',
                format: 'json',
                method: 'publish'
            }), {
                data: VAN.redirect.infobox(),
                title: VAN.redirect.template,
                oldTitle: VAN.redirect.template,
                token: mw.user.tokens.get('editToken')
            }, VAN.redirect.callback);
        },
        // Infobox data object.
        infobox: function() {
            return JSON.stringify({
                "data": [
                    {
                        "data": { "defaultValue": "{{PAGENAME}}" },
                        "source": "name",
                        "type": "title"
                    },
                    {
                        "data": { "caption": { "source": "caption" }},
                        "source": "image",
                        "type": "image"
                    },
                    {
                        "data": VAN.i18n.msg('piheader').plain(),
                        "collapsible": false,
                        "type": "section-header"
                    },
                    {
                        "data": {"label": VAN.i18n.msg('pitype').plain() },
                        "source": "type",
                        "type": "row",
                        "sourceFrozen": false
                    }
                ]
            });
        },
        // Infobox builder redirection.
        callback: function(d) {
            VAN.redirect.spinner.remove();
            if (d.success) {
                VAN.redirect.execute();
            } else {
                VAN.redirect.handler();
            }
        },
        execute: function() {
            var uri = new mw.Uri(
                mw.util.getUrl('Template:' + VAN.redirect.template)
            );
            uri.extend({
                action: 'edit',
                useeditor: 'source'
            });
            window.location.href = uri.toString();
            VAN.redirect.$executed.resolve();
        },
        $executed: $.Deferred()
    };

    // Global navigation links module.
    VAN.nav = {
        init: function() {
            if (VAN.config.nav !== true) {
                VAN.nav.$executed.resolve();
                return;
            }
            var $l = $('<ul>').addClass('wds-list wds-is-linked');
            $.each(VAN.nav.uri, function(l, t) {
                $l.append(
                    $('<li>').append(
                        $('<a>', {
                            'href': (function(t) {
                                var p = VAN.mw.wgArticlePath.replace('$1', t);
                                return p;
                            }(t)),
                            text: VAN.i18n.msg(l).plain()
                        })
                    )
                );
            });
            // Icon and dropdown generation.
            var icon = VAN.wds.icon('menu-control-tiny', {
                'class': 'wds-dropdown-chevron'
            });
            var $c = VAN.nav.dropdown($l, icon);
            if (VAN.mw.skin === 'fandomdesktop') {
            	//start at the sign out button (use attr selector to support [[NoGlobalNav]])
                $('li[id="global-navigation-user-signout"]')
                	//go up to the parent
                	.parent()
                	//find the userpage link
                	.find('li > a[data-tracking-label="account.profile"]')
                	//go up to the link's parent
                	.parent()
                	//insert dropdown
                	.before($c)
                	//go up two parents
                	.parent().parent()
                	//prevent scrollable dropdown
                	.addClass('wds-is-not-scrollable');
            } else {
                // Append to menu
                $('.wds-global-navigation__user-menu')
                    // Prevent scrollable dropdown.
                    .children('.wds-dropdown__content')
                    .addClass('wds-is-not-scrollable')
                    // Insert dropdown.
                    .find('.wds-list > li > a[data-tracking-label="account.profile"]').parent().after($c);
            }
            VAN.nav.$executed.resolve();
        },
        // Create dropdown.
        dropdown: function($l, icon) {
            return $('<li>', {
                'id': 'van-tools-dropdown',
                'class': 'wds-dropdown-level-nested'
            }).append(
                $('<a>', {
                    'href': VAN.mw.wgArticlePath.replace('$1', VAN.nav.uri.sitecss), //change back to VAN.nav.uri.infoboxes if/when they come back
                    'target': '_blank',
                    'rel': 'noopener noreferrer',
                    'class': [
                        'wds-dropdown-level-nested__toggle',
                        'van-tools-link'
                    ].join(' ')
                }).append(
                    $('<span>', {
                        text: VAN.i18n.msg('tools').plain()
                    }),
                    icon
                ),
                $('<div>', {
                    'class': [
                        'wds-dropdown-level-nested__content',
                        'wds-is-not-scrollable',
                        'van-tools-menu'
                    ].join(' ')
                }).append($l)
            );
        },
        // Global navigation links.
        uri: {
            //infoboxes:       'Special:Templates?type=infobox', (remember to edit above JS if uncommenting)
            //templates:       'Special:Templates',
            sitecss:         'MediaWiki:Fandomdesktop.css?action=edit',
            personalcss:     'Special:MyPage/common.css',
            themescss:       'MediaWiki:Themes.css?action=edit',
            admins:          'Special:ListUsers/sysop',
            wikifeatures:    'Special:AdminDashboard',
            portabilitydash: 'Special:PortabilityDashboard?url=' + VAN.mw.wgServer.match(/\/\/([^.]+)/)[1],
            tvmh:            'Special:Blankpage/TVMH'
        },
        $executed: $.Deferred()
    };

    // Template reclassification hotkey module.
    VAN.template = {
        init: function() {
            if (
                VAN.config.template !== true ||
                VAN.mw.wgCanonicalNamespace !== 'Template' ||
                VAN.mw.wgAction !== 'view'
            ) {
                VAN.template.$executed.resolve();
                return;
            }
            var $popout = $('<div>', {
                'class': 'van-popout color1'
            }).hide().append(
                $('<b>', {
                    text: VAN.i18n.msg('templatetypeguide').plain()
                }),
                $('<ul>')
            );
            $popout.appendTo(document.body);
            VAN.mw.wgTemplateClassificationDialogConfig
                .templateTypes
                .forEach(function(type) {
                    VAN.template.labels[type] = mw.message(
                        'template-classification-type-' + type
                    ).plain();
            });
            VAN.template.populatePopout($popout);
        },
        // After the labels have been fetched, populate popout.
        populatePopout: function($popout) {
            // Ready the popout.
            $popout.children('ul').append(
                $.map(VAN.template.types, function(o, k) {
                    return $('<li>').append(
                        $('<kbd>', {
                            text: o.key
                        }),
                        $('<span>', {
                            text: VAN.template.labels[o.type]
                        })
                    );
                })
            );
            $popout.show();
            // Delegate keyboard handler.
            $(document).keyup(VAN.template.shortcut);
            VAN.template.$executed.resolve();
        },
        // Shortcut keys.
        shortcut: function(e) {
            if (
                !VAN.template.types.hasOwnProperty(e.which) ||
                !e.altKey
            ) {
                return;
            }
            VAN.template.type = VAN.template.types[e.which].type,
            VAN.template.label = VAN.template.labels[VAN.template.type];
            $.post(mw.util.wikiScript('wikia') + '?' + $.param({
                controller: 'Fandom\\TemplateClassification\\Api\\ClassificationController',
                format: 'json',
                method: 'classifyTemplate'
            }), {
                articleId: VAN.mw.wgArticleId,
                editToken: mw.user.tokens.get('editToken'),
                pageId: VAN.mw.wgArticleId,
                token: mw.user.tokens.get('csrfToken'),
                type: VAN.template.type
            }, VAN.template.success);
        },
        // Callback for TemplateClassification controller.
        success: function() {
            $('.template-classification-type-label, .template-classification-entry-point__toggle a')
                .text(VAN.template.label);
            $('.template-classification-entry-point__wrapper')
                .attr('data-type', VAN.template.type);
            var message = VAN.i18n.msg('templatetypechange', VAN.template.label).plain();
            mw.loader.using('mediawiki.notify').then(function () {
                mw.notify(message);
            });
        },
        // Template type map for keyboard shortkeys.
        types: {
            223: { key: '`', type: 'infobox' },
            49:  { key: '1', type: 'quote' },
            50:  { key: '2', type: 'navbox'},
            51:  { key: '3', type: 'notice' },
            52:  { key: '4', type: 'context-link' },
            53:  { key: '5', type: 'infoicon' },
            54:  { key: '6', type: 'scrollbox' },
            55:  { key: '7', type: 'references' },
            56:  { key: '8', type: 'media' },
            57:  { key: '9', type: 'data' },
            48:  { key: '0', type: 'design' },
            189: { key: '-', type: 'navigation' },
            187: { key: '=', type: 'nonarticle' }
        },
        labels: {},
        $executed: $.Deferred()
    };

    // "You are editing this page without admin" alert.
    VAN.adminalert = {
        init: function() {
            if (VAN.config.adminalert !== true) {
                VAN.adminalert.$executed.resolve();
                return;
            }
            if (
                !['dev'].includes(VAN.mw.wgDBname) &&
                VAN.mw.wgCanonicalNamespace === 'MediaWiki' &&
                !/sysop/.test(VAN.mw.wgUserGroups)
            ) {
                $('#ca-edit')
                    .addClass('van-admin-alert')
                    .attr('title', VAN.i18n.msg('adminalert').plain())
                    .find('svg').before(VAN.wds.icon('alert-small').outerHTML);
            }
            VAN.adminalert.$executed.resolve();
        },
        $executed: $.Deferred()
    };
    
    // Make ProtectionIcons an optional script import
    VAN.icons = {
        init: function () {
            if (VAN.config.icons !== true) {
                VAN.icons.$executed.resolve();
                return;
            }

            importArticle({ type: 'script', article: 'u:dev:MediaWiki:ProtectionIcons.js' });

            VAN.icons.$executed.resolve();
        },
        $executed: $.Deferred()
    };
    
    // Make QuickCreateUserPage an optional script import
    VAN.create = {
        init: function () {
            if (VAN.config.create !== true) {
                VAN.create.$executed.resolve();
                return;
            }

            importArticle({ type: 'script', article: 'u:dev:MediaWiki:QuickCreateUserPage/code.js' });

            VAN.create.$executed.resolve();
        },
        $executed: $.Deferred()
    };
    
    VAN.toolbox = {
        init: function () {
            if (VAN.config.toolbox !== true) {
                VAN.create.$executed.resolve();
                return;
            }

            importArticles({
                type: 'script',
                articles: [
                	'u:dev:MediaWiki:Q.js',
                    'u:dev:MediaWiki:TVMH.js',
                    'u:dev:MediaWiki:DupeArgs.js',
                    'u:dev:MediaWiki:MassNullEdit/code.js',
                    'u:dev:MediaWiki:PortableListUsers.js'
                ]
            });

            VAN.create.$executed.resolve();
        },
        $executed: $.Deferred()
    };

    // Module registry.
    VAN.modules = Object.keys(VAN).filter(function(m) {
        return (
            typeof VAN[m] === 'object' && // class check
            VAN[m].init                   // initializer check
        );
    });

    // Import styling.
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:VanguardTools.css'
    });

    // Script initializer.
    mw.loader.using([
        'mediawiki.util',
        'mediawiki.api',
        'mediawiki.Uri'
    ]).then(VAN.init);

})();
/** </nowiki> **/