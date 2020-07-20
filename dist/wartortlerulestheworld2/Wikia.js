/* 
* NavCodeLinks
* Adds Wiki's CSS and JS link to navigation dropdown
* @author Monochromatic Bunny
*/
(function () {
    if (window.NavCodeLinksLoaded) {
        return;
    }
    window.NavCodeLinksLoaded = true;
    $('.wds-global-navigation__user-menu .wds-list').prepend(
        ['css', 'js'].map(function(ext) {
            return $('<li>', {
                append: $('<a>', {
                    'href': mw.util.getUrl('MediaWiki:Wikia.' + ext),
                    text: 'Wikia ' + ext.toUpperCase()
                })
            });
        })
    );
})();

/**
 * NavButtonsDropdown
 * author: Ultragustavo25
 * description: Replaces the Admin Dashboard button with some new buttons inside a dropdown
 */

$(function() {
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('NavButtonsDropdown').done( function(i18n) {
            $('.wds-community-header__wiki-buttons a[data-tracking="add-new-page"] span').remove();
            $('.wds-community-header__wiki-buttons a[data-tracking="admin-dashboard"]').remove();
            $('.wds-community-header__wiki-buttons a[data-tracking="recent-changes"]').attr({'data-tracking': 'wiki-activity'}); // Only if you have some script that changes this

            var activity = '.wds-community-header__wiki-buttons a[data-tracking="wiki-activity"]';
            $(activity).after(
                '<div class="wds-dropdown">' +
                    '<div class="wds-button wds-is-squished wds-is-secondary wds-dropdown__toggle" style="border-left: inherit;border-right: inherit;border-radius: 0;width: 20px;">' +
                        '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron">' +
                            '<path d="M6 9l4-5H2" fill-rule="evenodd"></path>' +
                        '</svg>' +
                    '</div>' +
                    '<div class="wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned">' +
                        '<ul class="wds-list wds-is-linked">' +
                            '<li>' +
                                '<a href="/wiki/Special:AdminDashboard" data-tracking="admin-dashboard">' + i18n.msg('dashboard').escape() + '</a>' +
                            '</li>' +
                            '<li>' +
                                '<a href="/wiki/MediaWiki:Wiki-navigation?action=edit" data-tracking="edit-navigation">' + i18n.msg('navigation').escape() + '</a>' +
                            '</li>' +
                            '<li>' +
                                '<a href="/wiki/Special:CreateBlogPage" data-tracking="create-blog">' + i18n.msg('blog').escape() + '</a>' +
                            '</li>' +
                            '<li>' +
                                '<a href="/wiki/Special:Upload" data-tracking="upload">' + i18n.msg('upload').escape() + '</a>' +
                            '</li>' +
                            '<li>' +
                                '<a href="/wiki/Special:MultipleUpload" data-tracking="multiple-upload">' + i18n.msg('multiupload').escape() + '</a>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>'
            );

        if(wgUserGroups.indexOf('sysop') > -1 || wgUserGroups.indexOf('staff') > -1 || wgUserGroups.indexOf('helper') > -1) {
            return 0;
        } else {
            $('a[data-tracking="admin-dashboard"], a[data-tracking="edit-navigation"]').remove();
        }

        });
    });
    
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxBatchDelete.js',
    ]
    
    window.batchDeleteDelay = 100;
});
    });
});

/* DisableDrafts
 *
 * Completely disables draft saving, and always clears all drafts from localStorage
 * Obviously, it's for personal use
 * I'm sure staff would love to know why you use this and what does the extension lack that drives people to using this kinda stuff
 * But hey, I'm a script hog, not a feedback giver
 * 
 * @author Dorumin
 */

(function() {
    // Remove all saved drafts regardless of whether you're editing or not
    Object.keys(localStorage).forEach(function(key) {
        // Sure hope nobody else uses this naming scheme
        if (key.slice(-6) == '-draft') {
            localStorage.removeItem(key);
        }
    });

    if (!['edit', 'submit'].includes(mw.config.get('wgAction'))) return;

    // Define the module again.
    // This won't override the previously defined module, but will catch message walls
    // They have wgAction === "edit" but don't have the module defined
    // A try..catch around the require call doesn't do the trick, async?
    // Or I dunno, the module could be renamed/deleted, you never know ¯\_(ツ)_/¯
    define('EditDraftSaving', $.noop);

    require(['EditDraftSaving'], function(eds) {
        // Check for our previous mock module that returns undefined
        // We didn't actually use define.mock 'cause it sucks
        if (eds) {
            eds.storeDraft = $.noop;
        }

        // I mean, all keys should have been removed so no actual load attempts could've passed
        // But while we're at it, why not?
        $('#draft-restore-message #discard').click();
    });
})();

(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'AdminDashboard' ||
        window.AdminDashboardBlockLoaded
    ) {
        return;
    }
    window.AdminDashboardBlockLoaded = true;
    var AdminDashboardBlock = {
        init: function(i18n) {
            console.log(i18n);
            this.$control = $('<li>', {
                'class': 'control',
                'data-tooltip': i18n.msg('tooltip').plain()
            }).append(
                $('<a>', {
                    'class': 'set',
                    href: mw.util.getUrl('Special:Block')
                }).append(
                    $('<span>', {
                        'class': 'representation AdminDashboardBlock'
                    }).append(
                        $('<div>').append(
                            $('<span>', {
                                text: 'block'
                            })
                        )
                    ),
                    'Block'
                )
            ).hover($.proxy(this.hover, this), $.proxy(this.unhover, this));
            $('section.wiki ul.controls').append(this.$control);
            this.$tooltip = $('.control-section.wiki > header > .dashboard-tooltip');
        },
        hover: function(e) {
            this.$tooltip.text(this.$control.data('tooltip'));
        },
        unhover: function(e) {
            this.$tooltip.text('');
        },
        hook: function(i18n) {
            i18n.loadMessages('AdminDashboard block')
                .then($.proxy(this.init, this));
        }
    };
    mw.hook('dev.i18n').add($.proxy(AdminDashboardBlock.hook, AdminDashboardBlock));
    importArticle(
        {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        },
        {
            type: 'style',
            article: 'u:dev:MediaWiki:AdminDashboardBlock.css'
        }
    );
})();

/* EditConflictAlert
 *
 * Tells the user when a page that is currently being edited is updated.
 *
 * @author Dorumin
 */

require(['jquery', 'mw', 'BannerNotification'], function($,mw,BannerNotification) {
    if (
        !(wgAction === 'edit' || wgAction === 'submit') ||
        {1201: 1, 1200: 1, 2002: 1}[wgNamespaceNumber] ||
        wgArticleId === 0 ||
        window.EditConflictAlertInit
    )  {
        return;
    }
    window.EditConflictAlertInit = true;
    mw.loader.using('mediawiki.api').then(function() {
        var Api = new mw.Api(),
        help = Object.keys(wgNamespaceIds).filter(function(id) {
            return wgNamespaceIds[id] == 12;
        })[0].replace(/\b./g, function(char) {
            return char.toUpperCase();
        }),
        cur_id,
        old_id,
        diff,
        content,
        i18n;

        if (!window.dev || !window.dev.i18n) { // i18n-js lib
            importArticle({
                type: 'script',
                article: 'u:dev:MediaWiki:I18n-js/code.js'
            });
        }

        function fetch_revs(with_content) {
            return Api.get({
                action: 'query',
                prop: 'revisions',
                rvprop: 'ids|user' + (with_content ? '|content' : ''),
                titles: wgPageName,
                cb: Date.now()
            });
        }

        function load_diff() {
            $.get('/?diffonly=1&diff=' + cur_id + '&oldid=' + old_id, function(page) {
                var $el = $(page).find('.diff');
                diff = $('<div>').append($el.clone()).html();
                $('#ajax-indicator').replaceWith(diff);
            });
        }

        function add_content() {
            $('#diff-modal').closeModal();
            $('.banner-notification .close').click();
            $('#diff, #myedit').remove();
            $('[name="wpStarttime"]').val(new Date().toISOString().replace(/\D/g, '').slice(0, -3));
            var $edit_area = $('#wpTextbox1'),
            your_text = $edit_area.val(),
            $diff = $('<div>', {
                id: 'diff'
            }).append($('<h2>', {
                append: $('<span>', {
                    class: 'mw-headline',
                    id: 'The_differences_.28help.29',
                    append: [
                        i18n.msg('the-differences').escape(),
                        ' (',
                        $('<a>', {
                            target: '_blank',
                            href: '/wiki/' + help + ':Diff',
                            title: help + ':Diff',
                            text: i18n.msg('help').plain()
                        }),
                        ')'
                    ]
                })
            }), $(diff)),
            $myedit = $('<div>', {
                id: 'myedit'
            }).append($('<h2>', {
                append: $('<span>', {
                    class: 'mw-headline',
                    id: 'myedit-header',
                    text: i18n.msg('your-edit').plain()
                })
            }), $('<textarea>', {
                id: 'wpTextbox2',
                name: 'wpTextbox2',
                tabindex: 6,
                readonly: true,
                accesskey: ',',
                cols: 80,
                rows: 25,
                lang: wgContentLanguage,
                dir: document.documentElement.dir,
                val: your_text
            }));
            $edit_area.val(content);
            $('.mw-editTools').after($diff, $myedit);
        }

        function add_ace_content() {
            $('#diff-modal').closeModal();
            $('.banner-notification .close').click();
            $('#diff, #myedit').remove();
            $('[name="wpStarttime"]').val(new Date().toISOString().replace(/\D/g, '').slice(0, -3));
            var $edit_area = $('#wpTextbox1'),
            your_text = $edit_area.val(),
            $diff = $('<div>', {
                id: 'diff'
            }).append($('<h2>', {
                append: $('<span>', {
                    class: 'mw-headline',
                    id: 'The_differences_.28help.29',
                    append: [
                        i18n.msg('the-differences').escape(),
                        ' (',
                        $('<a>', {
                            target: '_blank',
                            href: '/wiki/' + help + ':Diff',
                            title: help + ':Diff',
                            text: i18n.msg('help').plain()
                        }),
                        ')'
                    ]
                })
            }), $(diff)),
            $myedit = $('<div>', {
                id: 'myedit'
            }).append($('<h2>', {
                append: $('<span>', {
                    class: 'mw-headline',
                    id: 'myedit-header',
                    text: i18n.msg('their-edit').plain()
                })
            }), $('<textarea>', {
                id: 'wpTextbox2',
                name: 'wpTextbox2',
                tabindex: 6,
                readonly: true,
                accesskey: ',',
                cols: 80,
                rows: 25,
                lang: wgContentLanguage,
                dir: document.documentElement.dir,
                val: content
            }));
            $('.mw-editTools').after($diff, $myedit);
        }

        function show_diff_modal() {
            $.showCustomModal(i18n.msg('diff-between-revs').escape(), $('<img>').attr({
                id: 'ajax-indicator',
                src: mw.config.get('stylepath') + '/common/images/ajax.gif',
                title: i18n.msg('loading').plain(),
                alt: i18n.msg('loading').plain()
            }).css({
                float: 'center',
                margin: '2em auto',
                display: 'block'
            }), {
                width: Math.min(window.innerWidth - 200, 1000),
                id: 'diff-modal',
                callback: load_diff,
                buttons: [{
                    message: i18n.msg('close').escape(),
                    handler: function() {
                        $('#diff-modal').closeModal();
                    }
                }, {
                    defaultButton: true,
                    message: i18n.msg('update').escape(),
                    handler: window.ace ? add_ace_content : add_content
                }]
            });
        }

        function init() {
            fetch_revs(false).done(function(data) {
                var d = data.query.pages;
                old_id = cur_id = d[Object.keys(d)[0]].revisions[0].revid;
            });

            setInterval(function() {
                fetch_revs(true).done(function(data) {
                    var d = data.query.pages,
                        p = d[Object.keys(d)[0]];
                    if (!p.revisions) {
                        // We are editing a nonexistent page.
                        return;
                    }
                    var r = p.revisions[0];
                    content = r['*'];
                    if (r.revid != cur_id && r.user != wgUserName) {
                        if ($('.banner-notifications-wrapper[data-id="' + r.revid + '"]').length) return;
                        if ($('#diff-modal').length) {
                            $('#diff-modal').closeModal();
                        }
                        $('.banner-notifications-wrapper').remove();
                        cur_id = r.revid;
                        var message = i18n.msg('notification-body').escape()
                            + ' (<a id="view-diff" href="#">'
                            + i18n.msg('diff').escape()
                            + '</a>)';
                        new BannerNotification(
                            message, 
                            'notify', 
                            $('.banner-notifications-placeholder')
                        ).show().$element.parent().attr('data-id', cur_id);
                        $('#view-diff').click(function(e) {
                            e.preventDefault();
                            show_diff_modal();
                        });
                    }
                });
            }, window.EditConflictAlertInterval || 
            window.queryInterval /* DEPRECATED */ ||
            5000);
        }

        mw.hook('dev.i18n').add(function(lib) {
            lib.loadMessages('EditConflictAlert').done(function(lang) {
                i18n = lang;
                i18n.useUserLang();
                init();
            });
        });
        if ($('.banner-notifications-placeholder').length) {
            return;
        }
        $('.wds-global-navigation-wrapper').after($('<div>', {
            class: 'banner-notifications-placeholder',
            append: $('<div>', {
                class: 'banner-notifications-wrapper float'
            }).css('top', 56)
        }).css({
            height: 0,
            position: 'absolute',
            left: 0,
            right: 0
        }));
    });
});

/**
 * Name:        Global edit count script
 * Author:      Noreplyz
 *              KockaAdmiralac
 *              Dorumin (small modifications)
 * Description: Adds a global edit count to user's masthead.
 */

(function() {
    if ($('#UserProfileMasthead').length === 0 || window.GlobalEditcountLoaded) {
        return;
    }
    window.GlobalEditcountLoaded = true;
    var GlobalEditcount = {
        cache: $.storage.get('GlobalEditcount') || {},
        preload: function(i18n) {
            this.user = $('#UserProfileMasthead h1').text();
            this.url = mw.util.getUrl('Special:Editcount/' + this.user);
            $.when(
                i18n.loadMessages('GlobalEditcount'),
                this.editcount()
            ).then($.proxy(this.init, this));
        },
        editcount: function() {
            this.promise = new $.Deferred();
            var cache = this.cache[this.user];
            if (
                cache &&
                cache.timestamp &&
                // 1 hour caching
                Date.now() - cache.timestamp < 60 * 60 * 1000
            ) {
                this.promise.resolve(cache.value);
                return this.promise;
            }
            $.get(this.url, $.proxy(this.cbEditcount, this));
            return this.promise;
        },
        cbEditcount: function(page) {
            var edits = $(page)
                .find('.TablePager th')
                .eq(7)
                .text();
            if (edits) {
                this.cache[this.user] = {
                    timestamp: Date.now(),
                    value: edits
                };
                $.storage.set('GlobalEditcount', this.cache);
                this.promise.resolve(edits);
            }
        },
        init: function(i18n, edits) {
            mw.util.addCSS(
                '.UserProfileMasthead .globaledit-details a:hover {' +
                    'color: ' + mw.config.get('wgSassParams')['color-links'] + ';' +
                '}'
            );
            this.$element = $('<div>', {
                'class': 'globaledit-details discussion-details tally'
            }).append(
                $('<a>', {
                    id: 'globaleditAllEditsByUser',
                    href: window.GlobalEditcountPlain ? '#' : this.url
                }).append(
                    $('<em>', {
                        text: edits
                    }),
                    $('<span>', {
                        'class': 'globaledit-label',
                        'text': i18n.msg('globaleditcount').plain()
                    })
                )
            );
            $('.tally').first().after(this.$element);
            mw.hook('GlobalEditcount.loaded').fire(this);
        }
    };
    mw.hook('dev.i18n').add($.proxy(GlobalEditcount.preload, GlobalEditcount));
    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:GlobalEditcount.css'
    });
})();

/**
 * @name        I18nLink
 * @description Adds links to I18n translation pages
 * @author      Rail01
 * @author      TheGoldenPatrik1
 * @license     CC-BY-SA 3.0
 * @status      Stable
 * @version     1.6
 */
mw.loader.using([
    'mediawiki.api',
    'mediawiki.util',
    'mediawiki.user'
]).then(function () {
    var config = mw.config.get([
        'wgCategories',
        'wgCityId',
        'wgNamespaceNumber',
        'wgPageName',
        'wgTitle'
    ]),
        title = config.wgPageName.split('/'),
        isLuaDoc = title[0] === 'Global_Lua_Modules',
        isLuaModule = config.wgNamespaceNumber === 828,
        isLua = isLuaDoc || isLuaModule;
        isMediaWiki = config.wgNamespaceNumber === 8;
        titleText = isLua ? 'Module:' + (isLuaModule ? config.wgTitle.replace(/\/.*/, '') : title[1]) + '/i18n' : 'MediaWiki:Custom-' + config[isMediaWiki ? 'wgTitle' : 'wgPageName'].replace(/\/.*/, '').replace('.js', '') + '/i18n.json',
        api = new mw.Api(),
        list = $('.page-header__contribution-buttons .wds-list'),
        options = $.extend(
            {
                create: true,
                buttons: []
            },
            window.I18nLink
        );
    if (
        !list.exists() ||
        config.wgCityId !== '7931' ||
        (
            isLuaModule &&
            title[1] == 'i18n'
        ) ||
        $(
            '.pi-data-value a[href="/wiki/Help:System_messages"]'
        ).exists() ||
        window.I18nLinkLoaded
    ) { 
        return; 
    }
    window.I18nLinkLoaded = true;
    /**
     * @method click
     * @description Creates the I18n page when clicked
     */
    function click () {
        if (
            confirm(
                i18n.msg('confirm', titleText).plain()
            ) === true
        ) {
            api.post({
                action: 'edit',
                title: titleText,
                watchlist: 'nochange',
                text:
                    isLua ?
                    '-- <nowiki>\nreturn {}' :
                    '/* <syntaxhighlight lang="javascript"> */',
                token: mw.user.tokens.get('editToken'),
                summary: 'Creating via [[I18nLink|Script]]'
            }).done(function (d) {
                window.location.href = mw.util.getUrl(titleText);
            });
        }
    }
    /**
     * @method generateElement
     * @description Creates a list item element
     * @param {String} id - The element's id
     * @param {String} params - The link's parameters
     */
    function generateElement (id, params) {
        list.append(
            $('<li>', {
                id: 'ca-' + id
            }).append(
                $('<a>', params)
            )
        );
    }
    /**
     * @method handleData
     * @description Analyzes the page data and acts accordingly
     * @param {JSON} d - The page data
     */
    function handleData (d) {
        var id = isLua ? 'i18n' : 'json',
            lang = isLua ? 'lua' : 'js';
            text = isLua ? 'I18n' : 'JSON';
        if (!d.query.pages[-1]) {
            generateElement(
                id,
                {
                    text: text,
                    title:
                        i18n.msg(
                            lang + 'Title'
                        ).plain(),
                    href: mw.util.getUrl(titleText)
                }
            );
            $.each(options.buttons, function (k, v) {
                if (['delete', 'protect', 'edit', 'raw', 'history'].indexOf(v) === -1) {
                    return;
                }
                generateElement(
                    v + '-' + id,
                    {
                        text: i18n.msg(v, text).plain(),
                        href: mw.util.getUrl(titleText, { action: v })
                    }
                );
            });
        } else if (options.create) {
            generateElement(
                'create-' + id,
                {
                    text:
                        i18n.msg(
                            'create', text
                        ).plain(),
                    title:
                        i18n.msg(
                            lang + 'Create'
                        ).plain(),
                    click: click
                }
            );
        }
    }
    /**
     * @method getData
     * @description Checks if the page exists
     */
    function getData () {
        api.get({
            cb: Date.now(),
            action: 'query',
            titles: titleText
        }).done(function (d) {
            if (d.error) {
                return;
            } else {
                handleData(d);
            }
        });
    }
    /**
     * @method init
     * @description Initiates the script
     * @param {String} i18nData - Variable for I18n-js
     */
    function init (i18nData) {
        i18n = i18nData;
        if (
            config.wgCategories.indexOf('JavaScript') !== -1 ||
            isLua ||
            (
                isMediaWiki &&
                new mw.Title(config.wgPageName).getExtension() === 'js'
            )
        ) {
            getData();
        }
    }
	mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('I18nLink').then(init);
	});
	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
});

/**
 * @name            LangSwitch
 * @version         v1.2
 * @author          TheGoldenPatrik1
 * @description     Adds a button to quickly switch languages.
 */
(function () {
    if (window.LangSwitchLoaded) {
        return;
    }
    window.LangSwitchLoaded = true;
    var i18n,
        placement,
        preloads = 2;
    /**
     * @method click
     * @description Switches languages when clicked
     * @returns {void}
     */
    function click () {
        var href = prompt(
                i18n.msg('prompt').plain(),
                window.LangSwitchDefault || 'qqx'
            ),
            page = mw.config.get('wgPageName');
        if (href) {
            if (href.startsWith('/')) {
                window.location.href = mw.util.getUrl(
                    page.includes('/') ?
                    page.replace(/\/[^/]+$/, href) :
                    (page + href)
                );
            } else {
                   window.location.href = new mw.Uri().extend({
                    uselang: href
                }).toString();
            }
        }
    }
    /**
     * @method init
     * @description Initiates the script and adds the button
     * @param {String} i18nData - Variable for I18n-js
     * @returns {void}
     */
    function init (i18nData) {
        i18n = i18nData;
        $(placement.element('tools'))[placement.type('prepend')](
            $('<li>').append(
                $('<a>', {
                    id: 'lang',
                    text: i18n.msg('text').plain(),
                    title: i18n.msg('title').plain(),
                    click: click,
                    css: {
                         cursor: 'pointer'
                    }
                })
            )
        );
    }
    /**
     * @method preload
     * @description Loads the hooks
     * @returns {void}
     */
    function preload () {
        if (--preloads === 0) {
            placement = window.dev.placement.loader;
            placement.script('LangSwitch');
            window.dev.i18n.loadMessages('LangSwitch').then(init);
        }
    }
	mw.hook('dev.i18n').add(preload);
	mw.hook('dev.placement').add(preload);
	importArticles({
		type: 'script',
		articles: [
		    'u:dev:MediaWiki:I18n-js/code.js',
		    'u:dev:MediaWiki:Placement.js'
        ]
	});
})();

/**
 * @name            PortableListUsers
 * @version         v1.0
 * @author          TheGoldenPatrik1
 * @author          Ursuul
 * @description     Alternative to Special:ListUsers.
 * @protect         <nowiki>
 */
require([
    'wikia.window',
    'jquery',
    'mw',
    'wikia.browserDetect',
    'ext.wikia.design-system.loading-spinner'
], function (window, $, mw, browserDetect, Spinner) {
    'use strict';
    if (window.PortableListUsersLoaded) {
        return;
    }
    window.PortableListUsersLoaded = true;
    /**
     * @class LU
     * @classdesc Central PortableListUsers class
     */
    var LU = {};
    /**
     * @type {Number}
     * @description Number of script preloads
     */
    LU.preloads = 4;
    /**
     * @type {Object}.{Object}
     * @description User groups
     */
    LU.users = {
        'authenticated': {},
        'bot': {},
        'bot-global': {},
        'bureaucrat': {},
        'chatmoderator': {},
        'content-moderator': {},
        'content-reviewer': {},
        'content-volunteer': {},
        'council': {},
        'fandom-editor': {},
        'global-discussions-moderator': {},
        'helper': {},
        'request-to-be-forgotten-admin': {},
        'restricted-login': {},
        'restricted-long-exempt': {},
        'reviewer': {},
        'staff': {},
        'sysop': {},
        'threadmoderator': {},
        'util': {},
        'vanguard': {},
        'voldev': {},
        'vstf': {}
    };
    /**
     * @type {Object}.{Object}
     * @description Object for storing user data
     */
    LU.data = {};
    /**
     * @type {Object}
     * @description Object for storing cached jQuery values
     */
    LU.$ = {};
    /**
     * @type {Object}
     * @description Script configuration options
     */
    LU.options = $.extend(
        {
            editcount: '0',
            landing: 'sysop',
            storage: false,
            time: 'timeago'
            
        },
        window.PortableListUsers
    );
    /**
     * @type {Boolean}
     * @description Shortcut for mobile or not
     */
    LU.mobile = browserDetect.isMobile();
    /**
     * @method preload
     * @description Preloads the script
     * @returns {void}
     */
    LU.preload = function () {
        if (--this.preloads === 0) {
            this.api = new mw.Api();
            window.dev.i18n.loadMessages('PortableListUsers').then(
                $.proxy(this.init, this)
            );
        }
    };
    /**
     * @method init
     * @description Adds the link
     * @param {Object} i18n - Data from I18n-js
     * @returns {void}
     */
    LU.init = function (i18n) {
        this.i18n = i18n.msg;
        window.dev.placement.loader.util({
            script: 'PortableListUsers',
            element: 'tools',
            type: 'prepend',
            content: $('<li>', {
                'id': 'lu-link'
            }).append(
                $('<a>', {
                    'text': this.i18n('title').plain(),
                    'click': $.proxy(this.click, this)
                })
            )
        });
    };
    /**
     * @method click
     * @description Displays the modal/spinner
     * @returns {void}
     */
    LU.click = function () {
        if (this.modal) {
            this.modal.show();
            this.createContent();
        } else {
            $('<div>', {
                'id': 'lu-throbber',
                'html':
                    new Spinner(38, 2).html
                    .replace('wds-block', 'wds-spinner__block')
                    .replace('wds-path', 'wds-spinner__stroke')
                    .replace('stroke-width=""', 'stroke-width="3"')
            }).appendTo(document.body);
            this.$.spinner = $('#lu-throbber');
            this.getUsers();
        }
    };
    /**
     * @method getUsers
     * @description Gets all members of a usergroup
     * @returns {Function|void}
     */
    LU.getUsers = function () {
        this.$.spinner.show();
        var val1 = $('#lu-group-select').val();
        var sto = localStorage.getItem('PortableListUsers');
        if (val1) {
            this.currentGroup = val1;
        } else {
            if (this.options.storage && sto) {
                this.currentGroup = sto.split('|')[0];
            } else {
                this.currentGroup = this.options.landing;
            }
        }
        var val2 = $('#lu-edits-select').val();
        if (val2) {
            this.currentNumber = val2;
        } else {
            if (this.options.storage && sto) {
                this.currentNumber = sto.split('|')[1];
            } else {
                this.currentNumber = this.options.editcount;
            }
        }
        this.setStorage();
        var obj = this.currentGroup;
        if (this.isObject(this.users[obj])) {
            return this.getData();
        }
        this.api.get({
            action: 'query',
            list: 'groupmembers',
            gmgroups: obj,
            gmlimit: 'max'
        }).done(
            $.proxy(this.getData, this)
        );
    };
    /**
     * @method setStorage
     * @description Resets the localStorage
     * @returns {void}
     */
    LU.setStorage = function () {
        if (this.options.storage) {
            localStorage.setItem(
                'PortableListUsers',
                this.currentGroup + '|' + this.currentNumber
            );
        }
    };
    /**
     * @method isObject
     * @description Tests to see if the object is empty
     * @param {Object} obj - The object to test
     * @returns {Boolean}
     */
    LU.isObject = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @method getData
     * @description Processes usergroup data and gets more data
     * @param {JSON} d - Data from getUsers
     * @returns {Function|void}
     */
    LU.getData = function (d) {
        var obj = this.users[this.currentGroup];
        if (d) {
            if (d.error) {
                return;
            }
            $.each(d.users, $.proxy(function (k, v) {
                obj[v.name] = v.name;
            }, this));
        }
        if (!this.isObject(obj)) {
            return this.loadModal();
        }
        var users = Object.keys(obj).join('|');
        this.api.get({
            action: 'query',
            list: 'users|usercontribs',
            ususers: users,
            usprop: 'groups|editcount|gender|registration',
            ucuser: users,
            uclimit: 'max',
            ucprop: 'timestamp|title'
        }).done(
            $.proxy(this.loadData, this)
        );
    };
    /**
     * @method loadData
     * @description Loads the data from getData
     * @param {JSON} d - The data from getData
     * @returns {void}
     */
    LU.loadData = function (d) {
        if (d.error) {
            return;
        }
        $.each(d.query.users, $.proxy(function (k, v) {
            if (!this.data[v.name]) {
                this.data[v.name] = v;
            }
        }, this));
        $.each(d.query.usercontribs, $.proxy(function (k, v) {
            if (!this.data[v.user]) {
                return;
            }
            if (!this.data[v.user].timestamp) {
                this.data[v.user].timestamp = v.timestamp;
            }
            if (!this.data[v.user].title) {
                this.data[v.user].title = v.title;
            }
        }, this));
        this.loadModal();
    };
    /**
     * @method loadModal
     * @description Updates/creates the modal
     * @returns {void}
     */
    LU.loadModal = function () {
        if (this.modal) {
            this.currentNumber = this.$.edits.val() || this.options.editcount;
            this.setStorage();
            this.$.list.html('');
            this.createRow();
            this.addContent();
        } else {
            this.createModal();
        }
    };
    /**
     * @method createModal
     * @description Creates the script modal
     * @returns {void}
     */
    LU.createModal = function () {
        this.modal = new window.dev.modal.Modal({
            content: $('<div>', {
                'class':
                    'list-users list-users-' +
                    (this.mobile ? 'mobile' : 'desktop')
            }).append(
                this.createSelect('group'),
                this.createSelect('edits'),
                $('<span>', {
                    'id': 'lu-tally'
                }),
                $(this.mobile ? '<ul>' : '<table>', {
                    'class': this.mobile ? '' : 'article-table',
                    'id': this.mobile ? 'lu-list' : 'lu-table'
                })
            ).prop('outerHTML'),
            id: 'list-users',
            size: 'large',
            title: this.i18n('title').plain(),
            buttons: [
                {
                    text: this.i18n('close').plain(),
                    event: 'close'
                }
            ]
        });
        this.modal.create().then(
            $.proxy(this.createContent, this)
        );
        this.modal.show();
    };
    /**
     * @method createContent
     * @description Creates the modal's main content
     * @returns {void}
     */
    LU.createContent = function () {
        this.$.list = $(this.mobile ? '#lu-list' : '#lu-table');
        this.$.group = $('#lu-group-select');
        this.$.group.change(
            $.proxy(this.getUsers, this)
        );
        $.each(this.users, $.proxy(function (k, v) {
            this.$.group.append(
                $('<option>', {
                    'text': k,
                    'value': k,
                    'selected': this.currentGroup === k ? true : false
                })
            );
        }, this));
        this.$.edits = $('#lu-edits-select');
        this.$.edits.change(
            $.proxy(this.loadModal, this)
        );
        $.each([
            '0',
            '1',
            '5',
            '10',
            '20',
            '50',
            '100'
        ], $.proxy(function (k, v) {
            this.$.edits.append(
                $('<option>', {
                    'text': this.i18n('number', v).plain(),
                    'value': v,
                    'selected': this.currentNumber === v ? true : false
                })
            );
        }, this));
        this.createRow();
        this.addContent();
    };
    /**
     * @method addContent
     * @description Adds the user data
     * @returns {void}
     */
    LU.addContent = function () {
        $.each(this.data, $.proxy(function (k, v) {
            if (this.users[this.currentGroup][v.name || k]) {
                var count = v.editcount || '0';
                if (Number(count) < Number(this.currentNumber)) {
                    return;
                }
                this.createRow(
                    v.name || k,
                    v.timestamp,
                    v.title,
                    v.userid,
                    count,
                    v.gender,
                    v.registration,
                    v.groups
                );
            }
        }, this));
        $('#lu-tally').html(
            this.i18n(
                'tally',
                this.mobile ?
                this.$.list.find('li').length :
                (this.$.list.find('tr').length -1)
            ).plain()
        );
        $('img#lu-avatar').each(function () {
            $(this).error(function () {
                $(this).attr(
                    'src',
                    'https://images.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg'
                );
            });
        });
        this.$.spinner.hide();
    };
    /**
     * @method createRow
     * @description Creates a table row or list item
     * @param {String} user
     * @param {String} timestamp
     * @param {String} title
     * @param {String} id
     * @param {Number|String} editcount
     * @param {String} gender
     * @param {String} registration
     * @param {Array} groups
     * @returns {void}
     */
    LU.createRow = function (user, timestamp, title, id, editcount, gender, registration, groups) {
        var item = this.mobile ? '<li>' : '<tr>';
        if (user) {
            this.$.list.append(
                $(item).append(
                    this.createItem(
                        $('<span>').append(
                            this.createLink(user, 'User:' + user),
                            ' (',
                            this.createLink(
                                this.i18n('talk').plain(),
                                'User talk:' + user
                            ),
                            ' | ',
                            this.createLink(
                                this.i18n('contribs').plain(),
                                'Special:Contributions/' + user
                            ),
                            ')'
                        ),
                        'user'
                    ),
                    this.createItem(
                        timestamp ?
                        this.createLink(this.timestamp(timestamp), title)  :
                        (editcount === '0' ? 'N/A' : timestamp),
                        'last-edited'
                    ),
                    this.createItem(
                        editcount ?
                        this.createLink(
                            editcount, 'Special:EditCount/' + user
                        )  :
                        editcount,
                        'editcount'
                    ),
                    this.createItem(gender, 'gender'),
                    this.createItem(
                        registration ?
                        this.timestamp(registration) :
                        registration,
                        'registration'
                    ),
                    this.createItem(
                        groups.join(', ')
                        .replace(', *', '').replace(', user', ''),
                        'groups'
                    ),
                    this.createItem(
                        id ? $('<img>', {
                            'src':
                                'https://services.wikia.com/user-avatar/user/' +
                                id + '/avatar',
                            'id': 'lu-avatar'
                        }) : id,
                        'avatar'
                    )
                )
            );
        } else if (!this.mobile) {
            this.$.list.append(
                $(item, {
                    'id': 'lu-table-first'
                }).append(
                    this.createSpecialItem('user'),
                    this.createSpecialItem('last-edited'),
                    this.createSpecialItem('editcount'),
                    this.createSpecialItem('gender'),
                    this.createSpecialItem('registration'),
                    this.createSpecialItem('groups'),
                    this.createSpecialItem('avatar')
                )
            );
        }
    };
    /**
     * @method createItem
     * @description Creates a div or td item
     * @param {String} html - The item's HTML
     * @param {String} id - The item's id
     * @returns {String}
     */
    LU.createItem = function (html, id) {
        if (this.mobile) {
            return $('<div>', {
                'id': 'lu-list-' + id,
                'html': html || this.i18n('unknown').plain()
            }).prepend(
                /user|groups|avatar/.test(id) ?
                '' :
                ('<b>' + this.i18n(id).escape() + '</b><br/>')
            );
        } else {
            return $('<td>', {
                'html': html || this.i18n('unknown').plain()
            });
        }
    };
    /**
     * @method createSpecialItem
     * @description Creates a different td item
     * @param {String} msg - The text
     * @returns {String}
     */
    LU.createSpecialItem = function (msg) {
        return $('<td>', {
            'html': this.i18n(msg).plain()
        });
    };
    /**
     * @method createSelect
     * @description Creates a select item
     * @param {String} id - The select's id
     * @returns {String}
     */
    LU.createSelect = function (id) {
        return $('<select>', {
            'id': 'lu-' + id + '-select'
        });
    };
    /**
     * @method createLink
     * @description Creates an a item
     * @param {String} text - The link text
     * @param {String} href - The link href
     * @returns {String}
     */
    LU.createLink = function (text, href) {
        return $('<a>', {
            'text': text,
            'href': mw.util.getUrl(href)
        });
    };
    /**
     * @method timestamp
     * @description Processes timestamps
     * @param {String} time - The timestamp to process
     * @returns {String}
     */
    LU.timestamp = function (time) {
        var $time = new Date(time).toString();
        var formattedTime;
        if (this.options.time === 'timeago') {
            formattedTime = $.timeago(
                $time.slice(0, 3) + ', ' +
                $time.slice(4, 15) + ', ' +
                $time.slice(16, 24)
            );
        } else if (this.options.time === 'utc') {
            $time = new Date(time).toUTCString();
            formattedTime = $time.slice(0, 3) + ', ' +
                $time.slice(4, 16) + ', ' +
                $time.slice(17, 25) + ' (' +
                $time.slice(26) + ')';
        } else {
            formattedTime = $time.slice(0, 3) + ', ' +
                $time.slice(4, 15) + ', ' +
                $time.slice(16, 24) + ' ' +
                $time.slice(34);
        }
        return formattedTime;
    };
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.util'
    ]).then(
        $.proxy(LU.preload, LU)
    );
    mw.hook('dev.i18n').add(
        $.proxy(LU.preload, LU)
    );
    mw.hook('dev.modal').add(
        $.proxy(LU.preload, LU)
    );
    mw.hook('dev.placement').add(
        $.proxy(LU.preload, LU)
    );
    importArticles(
        {
            type: 'script',
            articles: [
                'u:dev:MediaWiki:I18n-js/code.js',
                'u:dev:MediaWiki:Modal.js',
                'u:dev:MediaWiki:Placement.js'
            ]
        },
        {
            type: 'style',
            articles: ['u:dev:MediaWiki:PortableListUsers.css']
        }
    );
});

/*
 * AjaxDiff
 * Allows you to see diff in WikiActivity page
 * Scripts used :
 * https://dev.wikia.com/wiki/WHAM/code.js
 * https://dev.wikia.com/wiki/QuickComments/code.js
 * By Gguigui1
 */
(function ($, mw, AjaxDiff) {
    AjaxDiff = $.extend(AjaxDiff, {});
    AjaxDiff.run = false;
    var lng = {
        // Беларуская
        be: {
            expiry: 'Заканчэнне блакавання: ',
            reason: 'Прычына блакавання: ',
            success: 'Карыстальнік быў заблакаваны',
            emptyvariables: 'Вам трэба пазначыць тэрмін блакавання і нікнэйм карыстальніка.',
            blockbutton: 'Заблакаваць удзельніка',
            cancelbutton: 'Зачыніць',
            rollbacksuccess: 'Праўка была откачена',
            loading: 'Загружаецца. Калі ласка, пачакайце...',
            errorapi: 'Памылка: Вернутая памылка API',
            namebutton: 'Адлюстраваць назву',
            previewbutton: 'Паказаць старонку',
            diffpreviewof: 'Адлюстраванне праўкі на старонцы: ',
            diffpreview: 'Адлюстраванне праўкі',
            pageviewver: 'Прагляд старонкі',
            vandalism: 'Вандалізм'
        },
        // Deutsch
        de: {
            expiry: 'Sperrdauer: ',
            reason: 'Sperrgrund: ',
            success: 'Benutzer wurde gesperrt.',
            emptyvariables: 'Du musst den zu sperrenden Benutzer und die Sperrdauer angeben.',
            blockbutton: 'Sperre den Benutzer',
            cancelbutton: 'Abbrechen',
            rollbacksuccess: 'Bearbeitung wurde zurückgesetzt',
            loading: 'Wird geladen, bitte warten...',
            errorapi: 'Fehler: die API gab einen Fehlercode zurück',
            namebutton: 'Zeige den Namen der Seite',
            previewbutton: 'Zeige Vorschau der Seite',
            diffpreviewof: 'Vorschau der Änderungen von: ',
            diffpreview: 'Vorschau der Änderungen',
            pageviewver: 'Seiten-Anzeiger',
            vandalism: 'Vandalismus'
        },
        // English
        en: {
            expiry: 'Block duration: ',
            reason: 'Block reason: ',
            success: 'User has been blocked',
            emptyvariables: 'You have to enter block\'s expiry and user to block.',
            blockbutton: 'Block the user',
            cancelbutton: 'Cancel',
            rollbacksuccess: 'Edit has been rollbacked',
            loading: 'Loading, please wait...',
            errorapi: 'Error: API returned error code',
            namebutton: 'Display page\'s name',
            previewbutton: 'Preview the page',
            diffpreviewof: 'Diff Preview of: ',
            diffpreview: 'Diff Preview',
            pageviewver: 'Page Viewer',
            vandalism: 'Vandalism'
        },
        // Español
        es: {
            expiry: 'Duración de bloqueo: ',
            reason: 'Razon de bloqueo: ',
            success: 'El usuario há sido bloqueado.',
            emptyvariables: 'Debes definir la duración del bloqueo y el usuario a bloquear.',
            blockbutton: 'Bloquear usuario',
            cancelbutton: 'Cancelar',
            rollbacksuccess: 'La edición ha sido revertida.',
            loading: 'Cargando, por favor espere...',
            errorapi: 'Error: el API devolvio un codigo de error',
            namebutton: 'Mostrar el nombre de la pagina',
            previewbutton: 'Mostrar la pagina',
            diffpreviewof: 'Ver dif de: ',
            diffpreview: 'Demuestración de dif',
            pageviewver: 'Vistazo de la pagina',
            vandalism: 'Vandalismo'
        },
        // Français
        fr: {
            expiry: 'Durée du blocage :',
            reason: 'Motif du blocage :',
            success: 'L\'utilisateur a été bloqué avec succès.',
            emptyvariables: 'Merci de rentrer la durée du blocage ainsi que l\'utilisateur à bloquer',
            blockbutton: 'Bloquer l\'utilisateur',
            cancelbutton: 'Annuler',
            rollbacksuccess: 'La modification a été révoqué',
            loading: 'Chargement, merci de patienter...',
            errorapi: 'Erreur: l\'API a retourné le code d\'erreur',
            namebutton: 'Afficher le nom de la page',
            previewbutton: 'Afficher la page',
            diffpreviewof: 'Diff Preview of: ', // Need translation
            diffpreview: 'Diff Preview', // Need translation
            pageviewver: 'Page Viewer', // Need translation
            vandalism: 'Vandalism' // Need translation
        },
        // Polish
        pl: {
            expiry: 'Czas trwania blokady: ',
            reason: 'Powód blokady: ',
            success: 'Użytkownik został zablokowany',
            emptyvariables: 'Musisz wprowadzić czas trwania i użytkownika, aby zablokować.',
            blockbutton: 'Zablokuj użytkownika',
            cancelbutton: 'Anuluj',
            rollbacksuccess: 'Edycja została cofnięta',
            loading: 'Ładowanie, proszę czekać...',
            errorapi: 'Błąd: API zwróciło błąd',
            namebutton: 'Wyświetl nazwę strony',
            previewbutton: 'Podgląd strony',
            diffpreviewof: 'Podgląd zmian dla: ',
            diffpreview: 'Podgląd zmian',
            pageviewver: 'Podgląd strony',
            vandalism: 'Wandalizm'
        },
        // Русский
        ru: {
            expiry: 'Окончание блокировки: ',
            reason: 'Причина блокировки: ',
            success: 'Пользователь был заблокирован',
            emptyvariables: 'Вам нужно указать срок блокировки и никнейм пользователя.',
            blockbutton: 'Заблокировать участника',
            cancelbutton: 'Закрыть',
            rollbacksuccess: 'Правка была откачена',
            loading: 'Загружается. Пожалуйста, подождите...',
            errorapi: 'Ошибка: Возвращённая ошибка API',
            namebutton: 'Отобразить название',
            previewbutton: 'Показать страницу',
            diffpreviewof: 'Отображение правки на странице: ',
            diffpreview: 'Отображение правки',
            pageviewver: 'Просмотр страницы',
            vandalism: 'Вандализм'
        },
        // Українська
        uk: {
            expiry: 'Закінчення блокування: ',
            reason: 'Причина блокування: ',
            success: 'Користувач був заблокований',
            emptyvariables: 'Вам потрібно вказати термін блокування і нікнейм користувача.',
            blockbutton: 'Заблокувати користувача',
            cancelbutton: 'Закрити',
            rollbacksuccess: 'Редагування було відкочено',
            loading: 'Завантажується. Будь ласка, зачекайте...',
            errorapi: 'Помилка: Повернута помилка API',
            namebutton: 'Відобразити назву',
            previewbutton: 'Показати сторінку',
            diffpreviewof: 'Відображення редагування на сторінці: ',
            diffpreview: 'Відображення редагування',
            pageviewver: 'Переглянути сторінки',
            vandalism: 'Вандалізм'
        },
        // Chinese
        zh: {
            expiry: '封禁期限: ',
            reason: '封禁原因: ',
            success: '封禁用户成功',
            emptyvariables: '您必须输入封禁\'的期限和原因才能封禁',
            blockbutton: '封禁用戶',
            cancelbutton: '取消',
            rollbacksuccess: '编辑已经回退',
            loading: '读取中，请稍候...',
            errorapi: '发生错误: API已返回至错误代码',
            namebutton: '显示页面\'的名称',
            previewbutton: '预览页面',
            diffpreviewof: '预览差异',
            diffpreview: '预览差异',
            pageviewver: '页面查看器',
            vandalism: '破坏行为'
        },
        // Chinese (Traditional)
        'zh-hant': {
            expiry: '封禁期限: ',
            reason: '封禁原因: ',
            success: '封禁用戶成功',
            emptyvariables: '您必須輸入封禁\'的期限和原因才能封禁',
            blockbutton: '封禁用戶',
            cancelbutton: '取消',
            rollbacksuccess: '編輯已經回退',
            loading: '讀取中，請稍候...',
            errorapi: '發生錯誤: API已返回至錯誤代碼',
            namebutton: '顯示頁面\'的名稱',
            previewbutton: '預覽頁面',
            diffpreviewof: '預覽差異',
            diffpreview: '預覽差異',
            pageviewver: '頁面查看器',
            vandalism: '破壞行為'
        }
    };
    AjaxDiff.expiry = AjaxDiff.expiry || '3 days';
    AjaxDiff.reason = AjaxDiff.reason || lng.vandalism;
    lng = $.extend(lng.en, lng[mw.config.get('wgContentLanguage')], lng[mw.config.get('wgUserLanguage')]);
    if (wgCanonicalSpecialPageName !== "WikiActivity" || AjaxDiff.run === true) {
      return false;
    }
    AjaxDiff.run = true;
    function showname() {
      if ($('.mw-rev-head-action > a').eq(0).length > 0) {
          $('#diff-preview > h1').hide().html(lng.diffpreviewof + $('.mw-rev-head-action > a').eq(0).attr('title')).fadeIn(1500);
       }
       var top = $('#diff-preview').css('top').replace('px','');
       $('html, body').animate({scrollTop:top}, 'fast');
    }
    function blockuser(user, expiry, reason) {
        if (!expiry) {
            var expiry = prompt(lng.expiry, AjaxDiff.expiry);
        }
        if (!reason) {
            var reason = prompt(lng.reason, AjaxDiff.reason);
        }
        if (!user || !expiry) {
            alert(lng.emptyvariables);
            return false;
        }
        $.getJSON(mw.util.wikiScript('api'), {
            action: 'query',
            prop: 'info',
            intoken: 'block',
            titles: 'User:' + user,
            format: 'json'
        }, function (data) {
            var pages = data.query.pages;
            $.post(mw.util.wikiScript('api'), {
                action: 'block',
                user: user,
                expiry: expiry,
                reason: reason,
                nocreate: true,
                autoblock: true,
                format: 'json',
                token: data.query.pages[Object.keys(pages)[0]].blocktoken
            }, function (data) {
                if (data.error) {
                    alert(lng.errorapi + " : " + data.error.info);
                    return false;
                } else {
                    alert(lng.success);
                    $('#blockbutton').addClass('disabled');
                }
            });
        });
    }
    function PreviewPageAjax(content) {
        if ($('#DiffView').length === 0) {
            var ajaxform = '\
  <form method="" name="" class="WikiaForm "> \
    <div id="DiffView" style="width:975px; border:3px solid black; word-wrap: break-word;"/> \
  </form>';
            $.showCustomModal(lng.pageviewver, ajaxform, {
                id: 'page-viewer',
                width: 1000,
                buttons: [{
                    message: lng.cancelbutton,
                    handler: function () {
                        $('#page-viewer').closeModal();
                    }
                }]
            });
            $('#DiffView').html(content);
        } else {
            $('#DiffView').html(content);
        }
    }
    function DiffAjax(content) {
        if ($('#diff-preview').length === 0) {
            var ajaxform = '\
  <form method="" name="" class="WikiaForm "> \
    <div id="DiffPreview"/> \
  </form>';
            $.showCustomModal(lng.diffpreview, ajaxform, {
                id: 'diff-preview',
                width: 900,
                buttons: [{
                    message: lng.cancelbutton,
                    handler: function () {
                        $('#diff-preview').closeModal();
                    }
                }, {
                    id: 'shownamebutton',
                    message: lng.namebutton,
                    defaultButton: false,
                    handler: function () {
                      showname();
					}
                }, {
                    id: 'previewpagebutton',
                    message: lng.previewbutton,
                    defaultButton: false,
                    handler: function () {
                      var pagelink = $('#mw-diff-ntitle1 > strong > a').attr('title');
                      getpagecontent(mw.util.getUrl(pagelink));
					}
                }, {
                    id: 'blockbutton',
                    message: lng.blockbutton,
                    defaultButton: true,
                    handler: function () {
                        if (!$(this).hasClass('disabled')) {
                            blockuser($('#mw-diff-ntitle2 > .mw-userlink').html());
                        }
                    }
                }]
            });
            $('#DiffPreview').html(content);

        } else {
            $('#DiffPreview').html(content);
        }
        $('#diff-preview > h1').html(lng.diffpreview);
        if (content == '<img src="https://images.wikia.nocookie.net/common/skins/common/progress-wheel.gif"> ' + lng.loading) {
          return false;
        }
        $('#blockbutton').html(lng.blockbutton + ' (' + $('#mw-diff-ntitle2 > .mw-userlink').html() + ')');
        if (wgUserGroups.indexOf('staff') + wgUserGroups.indexOf('util') + wgUserGroups.indexOf('sysop') + wgUserGroups.indexOf('helper') + wgUserGroups.indexOf('VSTF') === -5) {
          $('#blockbutton').addClass('disabled');
        }
        $('#mw-diff-otitle4').find('a').replaceWith('<a id="diffprev" href="javascript:void(0)" links="' + $('#mw-diff-otitle4').find('a').attr('href') + '">' + $('#mw-diff-otitle4').find('a').html() + '</a>');
        $('#mw-diff-ntitle4').find('a').replaceWith('<a id="diffnext" href="javascript:void(0)" links="' + $('#mw-diff-ntitle4').find('a').attr('href') + '">' + $('#mw-diff-ntitle4').find('a').html() + '</a>');
        $('#mw-diff-otitle1').prepend('<a id="previousedit" href="javascript:void(0)"> ↑ </a>');
        $('#mw-diff-otitle1').prepend('<a id="nextedit" href="javascript:void(0)">↓</a>');
        $('#previousedit').click(function () {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            var value = $('.activityfeed-diff[href*="' + $('span.mw-rev-head-action > a').attr('href').split('oldid=')[1] + '"]').parents('li.activity-type-edit').prevAll('li.activity-type-edit').find('.activityfeed-diff').attr('href');
            if (!value) {
                $(this).addClass('disabled');
                return false;
            }
            getdiffcontent(value);
        });
        $('#nextedit').click(function () {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            var value = $('.activityfeed-diff[href*="' + $('span.mw-rev-head-action > a').attr('href').split('oldid=')[1] + '"]').parents('li.activity-type-edit').nextAll('li.activity-type-edit').find('.activityfeed-diff').attr('href');
            if (!value) {
                $(this).addClass('disabled');
                return false;
            }
            getdiffcontent(value);
        });
        $('#diffprev, #diffnext').click(function () {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            $('#DiffPreview').html('<img src="https://images.wikia.nocookie.net/common/skins/common/progress-wheel.gif"> ' + lng.loading);
            var url = $(this).attr("links");
            setTimeout(getdiffcontent(url), 1000);
        });
        $('.mw-rollback-link > a').replaceWith('<a class="rollbackbutton" title="' + $('.mw-rollback-link > a').attr('title') + '" href="' + $('.mw-rollback-link > a').attr('href') + '">' + $('.mw-rollback-link > a').html() + '</a>');
        $('.rollbackbutton').click(function (event) {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            event.preventDefault();
            $.post($(this).attr('href'));
            alert(lng.rollbacksuccess);
            $(this).removeAttr('href');
            $(this).addClass('disabled');
        });
        importArticle({
            type: 'style',
            article: 'u:dev:MediaWiki:AjaxDiff.css'
        });
        var title = lng.diffpreviewof + $('span.mw-rev-head-action > a').eq(1).attr('title');
    }
    $('.WikiaArticle').on('click', '.activityfeed-diff', function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        getdiffcontent(url);
    });

    function getdiffcontent(url) {
        DiffAjax('<img src="https://images.wikia.nocookie.net/common/skins/common/progress-wheel.gif"> ' + lng.loading);
        $.ajax({
        type: "GET",
        url: url,
        success : function(content) {
            var content = $(content).find('table.diff').html();
            DiffAjax(content);
        },
        error : function (data) {
          alert(lng.errorapi + ' : ' + data.error.info);
        }
        });
    }
    function getpagecontent(url) {
        PreviewPageAjax('<img src="https://images.wikia.nocookie.net/common/skins/common/progress-wheel.gif"> ' + lng.loading);
        $.ajax({
        type: "GET",
        url: url,
        success : function(content) {
            var content = $(content).find('#WikiaArticle').html();
            PreviewPageAjax(content);
        },
        error : function (data) {
          alert(lng.errorapi + ' : ' + data.error.info);
        }
        });
    }
    mw.util.addCSS(
	'div#DiffPreview,\n div#DiffView {\n' +
		'\tmax-height:' + ($(window).height() - 200) + 'px;\n' +
	'}'
    );
    window.AjaxDiff = AjaxDiff;
})(this.jQuery, this.mediaWiki, window.AjaxDiff);

//SandboxLink
/* Add a menu item to profile menu with link to user contributions in modernized UI */
(function() {
    if (window.SandboxLinkLoaded) {
        return;
    }
    window.SandboxLinkLoaded = true;
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(function(i18no) {
        $.when(
            i18no.loadMessages('SandboxLink'),
            mw.loader.using('mediawiki.util')
        ).then(function(i18n) {
            var conf = mw.config.get([
                'wgFormattedNamespaces',
                'wgUserName'
            ]);
            $('.wds-global-navigation__user-menu .wds-list').append(
                $('<li>', {
                    id: 'MySandbox'
                }).append(
                    $('<a>', {
                        'class': 'wds-global-navigation__dropdown-link',
                        href: mw.util.getUrl(conf.wgFormattedNamespaces[2] + ':' + conf.wgUserName + '/' + i18n.inContentLang().msg('sandbox-subpage').plain()),
                        text: i18n.msg('sandbox').plain()
                    })
                )
            );
        });
    });
})();

/**
 * Name:        DiscordIntegrator
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Allows intergration with Discord [https://discordapp.com]
 */
(function() {
    'use strict';
    var mconfig = mw.config.get([
        'wgUserLanguage',
        'wgUserName'
    ]);
    if (window.DiscordIntegratorLoaded) {
        return;
    }
    window.DiscordIntegratorLoaded = true;
    /**
     * Main object
     * @static
     */
    var DiscordIntegrator = {
        /**
         * Configuration for the plugin
         * @property config
         * @type {Object}
         */
        config: (window.DiscordIntegratorConfig || {}).siderail || {},
        /**
         * Preloads translations.
         */
        hook: function(i18n) {
            $.when(
                i18n.loadMessages('DiscordIntegrator'),
                mw.loader.using('mediawiki.api')
            ).then($.proxy(this.preload, this));
        },
        /**
         * Preload resources
         */
        preload: function(i18n) {
            this.i18n = i18n;
            mw.hook('wikipage.content').add($.proxy(this.insertToContent, this));
            this.api = new mw.Api();
            this.api.get({
                action: 'query',
                meta: 'allmessages',
                ammessages: [
                    'id',
                    'title',
                    'moduleHeight',
                    'theme',
                    'width',
                    'height',
                    'text',
                    'logged-in',
                    'footer',
                    'username'
                ].map(function(el) {
                    return 'Custom-DiscordIntegrator-config-' + el;
                }).join('|'),
                amlang: mconfig.wgUserLanguage,
                smaxage: 300,
                maxage: 300
            }).done($.proxy(function(d) {
                if (!d.error) {
                    d.query.allmessages.forEach(function(el) {
                        if(el['*']) {
                            this.config[el.name.substring(32)] = el['*'];
                        }
                    }, this);
                    this._loading = 0;
                    ['text', 'title', 'footer'].forEach(this.parse, this);
                    if (this._loading === 0) {
                        this.init();
                    }
                }
            }, this));
        },
        /**
         * Parse the configuration that needs to be parsed
         */
        parse: function(msg) {
            if (this.config[msg]) {
                ++this._loading;
                this.api.get({
                    action: 'parse',
                    text: this.config[msg]
                }).done($.proxy(function(d) {
                    if (!d.error) {
                        this.config[msg] = d.parse.text['*'];
                        if (--this._loading === 0) {
                            this.init();
                        }
                    }
                }, this));
            }
        },
        /**
         * Initializing
         */
        init: function() {
            if (this.config.id && $('#WikiaRail').length > 0) {
                var clas = $('#WikiaRail').attr('class');
                if (clas && clas.split(/\s+/).indexOf('loaded') === -1) {
                    $('#WikiaRail').on('afterLoad.rail', $.proxy(this.insertToSiderail, this));
                } else {
                    this.insertToSiderail();
                }
            }
        },
        /**
         * Inserting the widget to siderail
         */
        insertToSiderail: function() {
            var filter = $('#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL, .content-review-module').last(),
            // TODO: Insert some user configuration here
                el = $('<div>', { class: 'DiscordIntegratorModule rail-module' });
            if (this.config.title) {
                el.append(
                    $('<h2>', {
                        'class': 'activity-heading',
                        html: this.config.title
                    })
                );
            }
            if (this.config.text) {
                el.append(
                    $('<p>', {
                        id: 'DiscordIntegratorModuleText',
                        html: this.config.text
                    })
                );
            }
            el.append(this.generateContent(this.config));
            if(this.config.footer) {
                el.append(
                    $('<p>', {
                        id: 'DiscordIntegratorModuleFooter',
                        html: this.config.footer
                    })
                );
            }
            if (filter.length > 0) {
                el.insertAfter(filter);
            } else {
                $('#WikiaRail').prepend(el);
            }
            if (this.config.moduleHeight) {
                mw.util.addCSS('.DiscordIntegratorModule { height: ' + Number(this.config.moduleHeight) + 'px; }');
            }
            mw.hook('DiscordIntegrator.added').fire(el);
        },
        /**
         * Finding the designated places in content
         * in which to place the widget and placing it
         */
        insertToContent: function($content) {
            $content.find('.DiscordIntegrator:not(.loaded)').each($.proxy(function(cabbage, el) {
                el = $(el);
                el.html(this.generateContent(el.data()))
                  .addClass('loaded');
            }, this));
        },
        /**
         * Generating widget content from an object
         * @todo i18n
         * @return [String] content of the widget
         */
        generateContent: function(config) {
            return config.id ?
                (
                    (
                        config.loggedIn === true ||
                        Boolean(config['logged-in']) === true
                    ) &&
                    !mconfig.wgUserName
                ) ?
            this.i18n.msg('login').parse() :
            mw.html.element('iframe', {
                src: 'https://discordapp.com/widget?id=' +
                     config.id +
                     '&theme=' +
                     (config.theme === 'light' ? 'light' : 'dark') +
                     '&username=' + encodeURIComponent(
                         config.username === '@disabled' ?
                         '' :
                         config.username === '@function' &&
                         typeof window.DiscordIntegratorGetUsername === 'function' ?
                             window.DiscordIntegratorGetUsername() :
                             config.username || mconfig.wgUserName
                     ),
                width: config.width || '100%',
                height: config.height || '400px',
                allowtransparency: 'true',
                frameborder: '0'
            }) : this.i18n.msg('error').escape();
        }
    };
    mw.hook('dev.i18n').add($.proxy(DiscordIntegrator.hook, DiscordIntegrator));
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();
dev:DiscordIntegrator/code.js

<noinclude><!--
 -->{{LangSelect}}
</noinclude>
<includeonly><!--
 -->{{Languages}}
{{Infobox JavaScript
| Image file = {{{image|AjaxBatchDeleteV2.png}}}
| Description = {{{description|Allows deleting a list of pages in a form and protecting them too.}}}
| Status = Stable
| Scope = ps
| Author =
* [[wikipedia:User:Splarka|Splarka (Wikipédia)]]
* [[User:Grunny|Grunny]]
* [[User:Ozank Cx|Ozank Cx]]
* [[User:KockaAdmiralac|KockaAdmiralac]]
| Using code by = [[wikipedia:User:Splarka/ajaxbatchdelete.js|Splarka (Wikipédia)]]
| Updated = {{Updated|MediaWiki:AjaxBatchDelete.js}}
| Code =
* [[MediaWiki:AjaxBatchDelete.js|AjaxBatchDelete.js]]
* [[MediaWiki:AjaxBatchDelete.css|AjaxBatchDelete.css]]
| Languages = auto
| Type = management
}}

'''AjaxBatchDelete''' {{{intro|is based on a script written by [[wikipedia:User:Splarka|Splarka]] [[wikipedia:User:Splarka/ajaxbatchdelete.js|on Wikipedia]]. This code has been rewritten to use jQuery by [[User:Grunny|Grunny]].}}}

== {{{installation|Installation}}} ==
{{Script Install}}

== {{{usage|Usage}}} ==
{{{usageInfo|The option to use the Batch Delete script will appear under your "My Tools" list.

In order to delete a batch of pages, just add the page names ('''not''' page URLs) in the form, each on a new line, and proceed to delete them with a set reason. The script will stop when it reaches an empty line, and it can be terminated early by blanking the list of pages remaining to be deleted.

It also features the ability to protect the pages after deletion (this is optional), as well as loading from a modal on any page with the option to modify the rate at which it deletes/protects. If you'd like to modify the default rate of one delete every 1000 milliseconds (1 second), add the config <code>window.batchDeleteDelay</code> before importing the script with your own number (in milliseconds) instead. For example, using:
<syntaxhighlight lang="javascript">window.batchDeleteDelay = 100;</syntaxhighlight>
will lower the delete rate to 0.1 second.

It also enables the user to grab a whole category's contents and puts them into the text area ready for deletion. Note that the script will only load if the user has access to the delete right (content moderator, administrator, VSTF, staff or helper). Deleting threads is possible, although restoring them properly isn't.}}}
</includeonly>