/** <nowiki>
 * 
 * @module                  VanguardTools
 * @description             Accelerates Vanguard migration workflow.
 * @author                  Speedit
 * @version                 1.2.2
 * @license                 CC-BY-SA 3.0
 * 
 */
require(['wikia.window', 'jquery', 'mw', 'wikia.nirvana', 'ext.wikia.design-system.loading-spinner'], function (window, $, mw, nirvana, Spinner) {
    'use strict';

    // Script variables and double run protection.
    if (window.vanguardToolsLoaded) {
        return;
    }
    window.vanguardToolsLoaded = true;
    var VAN = {};

    // MediaWiki variables.
    VAN.mw = mw.config.get([
        'wgMessages',
        'wgCityId',
        'wgDBname',
        'wgServer',
        'wgCanonicalNamespace',
        'wgCanonicalSpecialPageName',
        'wgTitle',
        'wgAction',
        'wgArticleId',
        'wgArticlePath',
        'wgLoadScript',
        'wgUserGroups'
    ]);

    // User parrot status.
    VAN.parrot = VAN.mw.wgUserGroups.some(function(ug) {
        return ['vanguard', 'staff', 'helper'].indexOf(ug) > -1;
    });

    // Script configuration.
    VAN.config = $.extend({
        state: true,
        modules: [],
        redirect: true,
        nav: true,
        template: true,
        showdraft: true,
        insights: true,
        pdash: true,
        adminalert: true,
        icons: true,
        create: false
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
        importArticle({ type: 'script', article: 'u:dev:I18n-js/code.js' });
        importArticle({ type: 'script', article: 'u:dev:WDSIcons/code.js' });
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
            nirvana.getJson('PortableInfoboxBuilderController', 'getTemplateExists', {
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
                    'debug': mw.config.get('debug'),
                    'lang': mw.config.get('wgUserLanguage'),
                    'mode': 'articles',
                    'skin': mw.config.get('skin'),
                    'missingCallback': 'importNotifications.importArticleMissing',
                    'articles': mw.util.wikiUrlencode('u:dev:VanguardTools/service-worker.js'),
                    'reviewed': mw.config.get('wgReviewedScriptsTimestamp'),
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
                    cancel: VAN.mw.wgMessages['cancel'],
                    ok: VAN.mw.wgMessages['ok'],
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
                }).html(function() {
                    return new Spinner(38, 2).html
                        .replace('wds-block', 'wds-spinner__block')
                        .replace('wds-path', 'wds-spinner__stroke');
                }).appendTo(document.body);
            // Create infobox.
            nirvana.sendRequest({
                controller: 'PortableInfoboxBuilderController',
                method: 'publish',
                data: {
                    data: VAN.redirect.infobox(),
                    title: VAN.redirect.template,
                    oldTitle: VAN.redirect.template,
                    token: mw.user.tokens.get('editToken')
                },
                callback: VAN.redirect.callback
            });
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
                                return (l === 'portabilitydash') ?
                                    'https://portability.fandom.com' + p:
                                    p;
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
            // Append to menu
            $('.wds-global-navigation__user-menu')
                // Prevent scrollable dropdown.
                .children('.wds-dropdown__content')
                .addClass('wds-is-not-scrollable')
                // Insert dropdown.
                .find('.wds-list > li > a[data-tracking-label="account.profile"]').parent().after($c);
            VAN.nav.$executed.resolve();
        },
        // Create dropdown.
        dropdown: function($l, icon) {
            return $('<li>', {
                'id': 'van-tools-dropdown',
                'class': 'wds-dropdown-level-2'
            }).append(
                $('<a>', {
                    'href': mw.util.getUrl(VAN.nav.uri.insights),
                    'target': '_blank',
                    'rel': 'noopener noreferrer',
                    'class': [
                        'wds-dropdown-level-2__toggle',
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
                        'wds-dropdown-level-2__content',
                        'wds-is-not-scrollable',
                        'van-tools-menu'
                    ].join(' ')
                }).append($l)
            );
        },
        // Global navigation links.
        uri: {
            insights:        'Special:Insights/nonportableinfoboxes',
            infoboxes:       'Special:Templates?type=infobox',
            templates:       'Special:Templates',
            sitecss:         'Special:CSS',
            personalcss:     'Special:MyPage/common.css',
            themescss:       'MediaWiki:Themes.css?action=edit',
            admins:          'Special:ListUsers/sysop',
            wikifeatures:    'Special:WikiFeatures',
            portabilitydash: 'Special:PortabilityDashboard?url=' + VAN.mw.wgServer.match(/\/\/([^.]+)/)[1]
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
            nirvana.getJson(
                'TemplateClassification',
                'getTemplateClassificationEditForm',
                function(d) {
                    // Extract labels.
                    d.templateTypes.forEach(function(dt) {
                        VAN.template.labels[dt.type] = dt.name;
                    });
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
                }
            );
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
            nirvana.postJson(
                'TemplateClassificationApi',
                'classifyTemplate',
                {
                    pageId: mw.config.get('wgArticleId'),
                    type: VAN.template.type,
                    editToken: mw.user.tokens.values.editToken
                },
                VAN.template.success
            );
        },
        // Callback for TemplateClassification controller.
        success: function() {
            $('.template-classification-type-label').text(VAN.template.label);
            var message = VAN.i18n.msg('templatetypechange', VAN.template.label).plain();
                notification = new BannerNotification(message, 'confirm');
            notification.show();
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

    // S:I/NPI utility extension.
    VAN.insights = {
        // Module initialiser.
        init: function() {
            if (
                VAN.config.insights !== true ||
                !$('.insights-nav-item.insights-icon-nonportableinfoboxes.active')
                    .find('.insights-red-dot').exists()
            ) {
                VAN.insights.$executed.resolve();
                return;
            }
            // Data lists.
            VAN.insights.list = {};
            var chunks = [];
            [].slice.call($('.insights-list-item-title')).map(function(e, i) {
                // Template name.
                var t = e.innerText;
                $(e).closest('.insights-list-item')
                    .attr('data-template', t);
                // API data.
                VAN.insights.list[t] = {};
                (
                    chunks[Math.floor(i / 50)] =
                        chunks[Math.floor(i / 50)] ||
                        []
                )[i % 50] = t;
            });
            VAN.insights.api = new mw.Api();
            chunks.forEach(function(c) {
                VAN.insights.api.get({
                    'action': 'query',
                    'prop': 'info',
                    'inprop': 'protection',
                    'titles': c.join('|')
                }).done(VAN.insights.handler);
            });
        },
        // Template list
        list: {},
        // API handler.
        handler: function(d) {
            $.each(d.query.pages, function(id, data) {
                VAN.insights.list[data.title].protection =
                    data.protection.filter(function(obj) {
                        return (obj.type === 'edit');
                    }).length > 0;
            });
            if (Object.keys(VAN.insights.list).every(function(t) {
                return VAN.insights.list[t].hasOwnProperty('protection');
            })) {
                VAN.insights.ui();
            }
        },
        // Interface configuration map for actions.
        map: {
            'viewdraft': {
                icon: 'eye-small'
            },
            'conversion': {
                icon: 'gear-small'
            },
            'rawcode': {
                icon: 'article-small',
                query: {
                    action: 'raw',
                    ctype: 'text/css' // Firefox fix.
                }
            },
            'protected': {
                icon: 'lock-small',
                query: {
                    action: 'history'
                }
            },
            'unprotected': {
                icon: 'unlock-small',
                query: {
                    action: 'history'
                }   
            }
        },
        // UI modification.
        ui: function() {
            // Add page header class (hack for button colors).
            $('.insights-content').addClass('page-header');
            // Button map for WDS icon addition.
            $('.insights-list-cell-altaction .wikia-button').each(function() {
                var $b = $(this),
                    t = $(this).closest('.insights-list-item')
                        .attr('data-template');
                VAN.insights.list[t].$toolbar =
                    $('<div>', {
                        'class': [
                            'wds-button-group',
                            'van-action-button-group'
                        ].join(' ')
                    }).insertBefore($b).append($b);
                // Class addition.
                $b
                    .removeAttr('class')
                    .addClass([
                        'wds-button',
                        'wds-is-squished'
                    ].join(' '))
                    .addClass(function(i, c) {
                        if ($b.attr('href').indexOf('action=edit') > -1) {
                            return [
                                'van-action-button',
                                'van-is-conversion'
                            ].join(' ');
                        } else {
                            return [
                                'wds-is-secondary',
                                'van-action-button',
                                'van-is-viewdraft'
                            ].join(' ');
                        }
                    }).html(function(i, html) {
                        return '<span>' + mw.html.escape(html) + '<span>';
                    });
                // List buttons.
                VAN.insights.list[t].$buttons = [$b];
                // Generate toolbar.
                VAN.insights.tbr(t);
            });
        },
        // Template toolbar generator.
        tbr: function(t) {
            var b = {
                    'unprotected': false,
                    'protected': true
                },
                $t = VAN.insights.list[t].$toolbar;
            // Button creation.
            $.each(VAN.insights.map, function(l, c) {
                // Prevent duplication.
                if (
                    !['conversion', 'viewdraft'].some(function(s) {
                        return l === s;
                    }) &&
                    (
                        Object.keys(b).indexOf(l) === -1 ||
                        VAN.insights.list[t].protection === b[l]
                    )
                ) {
                    // Button element.
                    var $b = $('<a>', {
                            'href': (function() {
                                var uri = new mw.Uri(mw.util.getUrl(t));
                                // Add query
                                if (c.query) {
                                    uri.extend(c.query);
                                }
                                return uri.toString();
                            }()),
                            html: $('<span>', {
                                text: VAN.i18n.msg(l).plain()
                            })
                        })
                        .addClass([
                            'wds-button',
                            'wds-is-squished',
                            'wds-is-secondary',
                            'van-tools-button',
                            'van-is-' + l
                        ].join(' '))
                        .appendTo(VAN.insights.list[t].$toolbar);
                    // Cache button.
                    VAN.insights.list[t].$buttons.push($b);
                }
                // Icon addition.
                $t.children('.van-is-' + l)
                    .prepend(VAN.wds.icon(c.icon));
            });
            VAN.insights.$executed.resolve();
        },
        $executed: $.Deferred()
    };

    // S:PortabilityDashboard utility extension.
    VAN.pdash = {
        init: function() {
            if (
                VAN.config.pdash !== true ||
                VAN.mw.wgCityId !== '1230494' ||
                VAN.mw.wgCanonicalSpecialPageName !== 'PortabilityDashboard'
            ) {
                VAN.pdash.$executed.resolve();
                return;
            }
            // Table elements.
            var $p = mw.util.$content.children('.portability-dashboard-table'),
                $h = $p.find('.headerSort');
            // Table sorting deactivation.
            $h
                .removeAttr('title').removeAttr('class')
                .off('click')
                .children('div').remove();
            // Add index.
            $('<th>', {
                append: $('<span>', {
                    'class': 'tooltip-icon-wrapper',
                    text:    'Rank'
                }),
            }).prependTo('.portability-dashboard-table thead tr');
            $p.find('tbody tr').each(function(i) {
                $('<td>', {
                    text: (i + 1)
                }).prependTo(this);
            });
            // Re-sort table.
            $p.removeClass('jquery-tablesorter').tablesorter();
            VAN.pdash.$executed.resolve();
        },
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
                !['dev', 'communitytest'].includes(VAN.mw.wgDBname) &&
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

    // Replace the create draft button with a link to the page if it is already available.
    VAN.showdraft = {
        init: function () {
            var draftDiv = $('section.templatedraft-module.module');
            var draftAnchor = draftDiv.children('a');
            var draftAnchorHref = draftAnchor.attr('href');

            if (
                VAN.config.showdraft !== true ||
                VAN.mw.wgCanonicalNamespace !== 'Template' ||
                VAN.mw.wgAction !== 'view' ||
                draftDiv.length <= 0 ||
                draftAnchor.length <= 0 ||
                draftAnchorHref.indexOf('action=approvedraft') > 0
            ) {
                VAN.showdraft.$executed.resolve();
                return;
            }

            var draftUrl = draftAnchorHref.slice(0,draftAnchorHref.lastIndexOf('?'));
            $.ajax(draftUrl + '?action=raw').done(function () {
                draftDiv.children('h2').text(VAN.i18n.msg('showdraftheader').plain());
                draftDiv.children('.templatedraft-module-subtitle').remove();
                draftDiv.children('p').text(VAN.i18n.msg('showdraftbody').plain());
                draftAnchor.attr('href', draftUrl);
                draftAnchor.children('button').text(VAN.i18n.msg('showdraftbutton').plain());
            });

            VAN.showdraft.$executed.resolve();
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

            importArticle({ type: 'script', article: 'u:dev:ProtectionIcons.js' });

            VAN.icons.$executed.resolve();
        },
        $executed: $.Deferred()
    };
    
    // Make QuickCreateUserPage and QuickCreateMessageWallGreeting optional script imports
    VAN.create = {
        init: function () {
            if (VAN.config.create !== true) {
                VAN.create.$executed.resolve();
                return;
            }

            importArticle({ type: 'script', article: 'u:dev:QuickCreateMessageWallGreeting/code.js' });
            importArticle({ type: 'script', article: 'u:dev:QuickCreateUserPage/code.js' });

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
        'jquery.tablesorter',
        'ext.bannerNotifications'
    ]).then(VAN.init);

});
/** </nowiki> **/